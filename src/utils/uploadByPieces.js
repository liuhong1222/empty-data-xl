import md5 from 'js-md5'

export const uploadByPieces = ({ file, fileUpload, mergeFile, customerId = 0, pieceSize = 2, progress, success, error }) => {
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
  let fileMD5 = ''// 总文件列表
  const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
  const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
  // 获取md5
  const readFileMD5 = () => {
    if (file.size > 20 * 1024 * 1024) {
      error && error('上传文件不能超过20M，请重新上传')
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
    const fetchForm = new FormData()
    fetchForm.append('customerId', customerId)
    fetchForm.append('chunk', chunkInfo.currentChunk)
    fetchForm.append('chunkSize', chunkSize)
    fetchForm.append('chunks', chunkInfo.chunkCount)
    fetchForm.append('file', chunkInfo.chunk)
    fetchForm.append('md5', fileMD5)
    fetchForm.append('name', file.name)
    fileUpload(fetchForm).then(res => {
      console.log('分片上传返回信息：' + res.data)
      if (res.data.code === 200) {
        const completed = (res.data.data.uploadedSize / file.size * 100 | 0) + '%'
        progress && progress(completed)
        if (chunkInfo.currentChunk < chunkInfo.chunkCount - 1) {
          console.log('分片上传成功' + chunkInfo.currentChunk)
        } else {
          // 当总数大于等于分片个数的时候
          if (chunkInfo.currentChunk >= chunkInfo.chunkCount - 1) {
            mergeFile({ md5: fileMD5, customerId: customerId, chunks: chunkCount, name: file.name, fileSize: file.size }).then(res => {
              success && success(res.data)
            }).catch((e) => {
              console.log('文件合并错误' + e)
              error && error(e)
            })
          }
        }
      } else {
        error && error(res.data.msg)
        console.log(res.data.msg)
      }
    }).catch((e) => {
      error && error(e)
    })
  }
  readFileMD5() // 开始执行代码
}
