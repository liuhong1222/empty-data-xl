import md5 from 'js-md5'

export const uploadByPieces = ({
  file,
  fileUpload,
  mergeFile,
  customerId = 0,
  pieceSize = 2,
  productCodeType,
  progress,
  success,
  error
}) => {
  // extend FileReader
  FileReader.prototype.readAsBinaryString = function (fileData) {
    var binary = ''
    var pt = this
    var reader = new FileReader()
    reader.onload = function (e) {
      var bytes = new Uint8Array(reader.result)
      var length = bytes.byteLength
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      // pt.result  - readonly so assign binary
      pt.content = binary
      // 页面内data取pt.content文件内容
      pt.onprogress(pt)
    }
    reader.readAsArrayBuffer(fileData)
  }

  // if (!file || !file.length) return
  // 上传过程中用到的变量
  let fileMD5 = '' // 总文件列表
  const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
  const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
  // 获取md5
  const readFileMD5 = () => {
    if (file.size > 40 * 1024 * 1024) {
      error && error('上传文件不能超过40M，请重新上传')
      return
    }
    // 读取视频文件的md5
    console.log('获取文件的MD5值')
    const fileRederInstance = new FileReader()
    fileRederInstance.readAsBinaryString(file)
    fileRederInstance.onprogress = function (data) {
      const fileBolb = data.content
      fileMD5 = md5(fileBolb)
      console.log('文件未被上传，将分片上传')
      readChunkMD5()
    }
  }
  const getChunkInfo = (file, currentChunk, chunkSize) => {
    const start = currentChunk * chunkSize
    const end = Math.min(file.size, start + chunkSize)
    const chunk = file.slice(start, end)
    return { start, end, chunk }
  }
  // 针对每个文件进行chunk处理
  const readChunkMD5 = () => {
    // 针对单个文件进行chunk上传
    for (var i = 0; i < chunkCount; i++) {
      const { chunk } = getChunkInfo(file, i, chunkSize)
      console.log('总片数' + chunkCount)
      console.log('分片后的数据---：' + i)
      console.log(chunk)
      uploadChunk({ chunk, currentChunk: i, chunkCount })
    }
  }
  const uploadChunk = (chunkInfo) => {
    // progressFun()
    // debugger
    const fetchForm = new FormData()
    fetchForm.append('customerId', customerId)
    fetchForm.append('chunkNumber', chunkInfo.currentChunk)
    fetchForm.append('chunkSize', chunkSize)
    fetchForm.append('totalChunks', chunkInfo.chunkCount)
    fetchForm.append('file', chunkInfo.chunk)
    fetchForm.append('identifier', fileMD5)
    fetchForm.append('fileRealName', file.name)
    fileUpload(fetchForm)
      .then((res) => {
        console.log('分片上传返回信息：' + res.data)
        if (res.data.code === 200) {
          // debugger
          console.log(chunkInfo)
          console.log(file.size)
          // const completed = (chunkInfo.chunk.size / file.size * 100 | 0) + '%'
          // console.log(completed)
          const completed = Number(
            (chunkInfo.currentChunk / chunkInfo.chunkCount) * 100
          ).toFixed(2)
          console.log(completed)
          progress && progress(completed)
          if (chunkInfo.currentChunk < chunkInfo.chunkCount - 1) {
            console.log('分片上传成功' + chunkInfo.currentChunk)
          } else {
            // 当总数大于等于分片个数的时候
            if (chunkInfo.currentChunk >= chunkInfo.chunkCount - 1) {
              progress && progress(100)
              uploadStatus()
            }
          }
        } else {
          error && error(res.data.msg)
          console.log(res.data.msg)
        }
      })
      .catch((e) => {
        error && error(e)
      })
  }

  const uploadStatus = () => {
    const statusForm = new FormData()
    statusForm.append('md5', fileMD5)
    statusForm.append('chunks', chunkCount)
    statusForm.append('fileName', file.name)
    statusForm.append('fileSize', file.size)
    // 区分空号检测/实时检测
    if (productCodeType === 'empty') {
      statusForm.append('productCode', 0) // 空号
    } else if (productCodeType === 'realtime') {
      statusForm.append('productCode', 1) // 实时
    }
    console.log(statusForm)
    mergeFile(statusForm)
      .then((res) => {
        let timer
        if (res.data.code === 200) {
          // 上传成功
          clearTimeout(timer)
          // debugger
          console.log(res.data.data)
          success && success(res.data)
        } else if (res.data.code === 5205) {
          // 正在上传中
          // progress && progress('文件上传完成，数据处理中...')
          timer = setTimeout(() => {
            uploadStatus()
          }, 3000)
        } else {
          clearTimeout(timer)
          error && error(res.data.msg)
        }
      })
      .catch((e) => {
        console.log('文件合并错误' + e)
        error && error(e)
      })
  }
  readFileMD5() // 开始执行代码
}
