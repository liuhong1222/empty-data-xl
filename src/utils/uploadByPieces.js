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
  const batchDealNum = 20 // promise并发请求数量
  const sliceCount = 3 // 失败片数重新上传次数
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
      // readChunkMD5()
      createFileChunk()
      batchUpload(0)
    }
  }

  const fileChunkList = []
  let fileChunkLength = 0
  // 循环分解文件
  const createFileChunk = () => {
    let count = 0
    const fileKey = file.name + '_' + +new Date()
    while (count < file.size) {
      fileChunkList.push({
        key: fileKey,
        chunk: file.slice(count, count + chunkSize),
        index: fileChunkLength,
        isLast: count + chunkSize > file.size
      })
      fileChunkLength++
      count += chunkSize
    }
  }

  // 分片上传，设置并发
  const batchUpload = (currIndex) => {
    const isLast = currIndex + batchDealNum >= chunkCount
    const currChunks = fileChunkList.slice(currIndex, currIndex + batchDealNum)
    console.log(currChunks)
    const uploadTaskArr = currChunks.map((ele, index) => {
      return creatUploadTask(ele, currIndex + index)
    })
    Promise.all(uploadTaskArr)
      .then((chunkInfo) => {
        const completed = Number(
          ((currIndex + batchDealNum) / chunkCount) * 100
        ).toFixed(2)
        console.log(completed)
        progress && progress(completed)
        if (isLast) {
          if (currIndex + batchDealNum < chunkCount - 1) {
            console.log('分片上传成功' + (currIndex + batchDealNum))
          } else {
            // 当总数大于等于分片个数的时候
            if (currIndex + batchDealNum >= chunkCount - 1) {
              progress && progress(100)
              uploadStatus()
            }
          }
        } else {
          batchUpload(currIndex + batchDealNum)
        }
      })
      .catch((err) => {
        console.log('分片上传失败：-----------------' + err)
        error && error(err)
      })
  }
  // promise同步，每次并发数量20分片上传
  const creatUploadTask = (chunkInfo, index) => {
    return new Promise((resolve, reject) => {
      const fetchForm = new FormData()
      fetchForm.append('customerId', customerId)
      fetchForm.append('chunkNumber', index)
      fetchForm.append('chunkSize', chunkSize)
      fetchForm.append('totalChunks', chunkCount)
      fetchForm.append('file', chunkInfo.chunk)
      fetchForm.append('identifier', fileMD5)
      fetchForm.append('fileRealName', file.name)
      // 区分空号检测/实时检测/国际检测
      if (productCodeType === 'empty') {
        fetchForm.append('fileType ', 0) // 空号
      } else if (productCodeType === 'realtime') {
        fetchForm.append('fileType ', 1) // 实时
      } else if (productCodeType === 'international') {
        fetchForm.append('fileType ', 2) // 国际
      }
      console.log(fetchForm)
      fileUpload(fetchForm)
        .then((res) => {
          console.log('分片上传返回信息：' + res.data)
          if (res.data.code === 200) {
            resolve({ ...chunkInfo })
          } else {
            rejectFn(chunkInfo, index, resolve, reject, 0)
          }
        })
        .catch((err) => {
          console.log(err)
          // 分片上传某片失败时，重传该片3次
          rejectFn(chunkInfo, index, resolve, reject, 0)
        })
    })
  }

  const rejectFn = (
    chunkInfo,
    index,
    parentResolve,
    parentReject,
    tryCount
  ) => {
    tryCount++
    new Promise((resolve, reject) => {
      const fetchForm = new FormData()
      fetchForm.append('customerId', customerId)
      fetchForm.append('chunkNumber', index)
      fetchForm.append('chunkSize', chunkSize)
      fetchForm.append('totalChunks', chunkCount)
      fetchForm.append('file', chunkInfo.chunk)
      fetchForm.append('identifier', fileMD5)
      fetchForm.append('fileRealName', file.name)
      // 区分空号检测/实时检测/国际检测
      if (productCodeType === 'empty') {
        fetchForm.append('fileType ', 0) // 空号
      } else if (productCodeType === 'realtime') {
        fetchForm.append('fileType ', 1) // 实时
      } else if (productCodeType === 'international') {
        fetchForm.append('fileType ', 2) // 国际
      }
      console.log(fetchForm)
      fileUpload(fetchForm)
        .then((res) => {
          console.log('分片上传返回信息：' + res.data)
          if (res.data.code === 200) {
            resolve('子分片重传成功')
          } else {
            reject(res.data.msg)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
      .then(() => {
        parentResolve({ ...chunkInfo })
      })
      .catch((err) => {
        console.log('子error----当前片重传尝试第' + tryCount + '次')
        if (tryCount === sliceCount) {
          parentReject(err)
        } else {
          rejectFn(chunkInfo, index, parentResolve, parentReject, tryCount)
        }
      })
  }

  const uploadStatus = () => {
    const statusForm = new FormData()
    statusForm.append('md5', fileMD5)
    statusForm.append('chunks', chunkCount)
    statusForm.append('fileName', file.name)
    statusForm.append('fileSize', file.size)
    // 区分空号检测/实时检测/国际检测
    if (productCodeType === 'empty') {
      statusForm.append('productCode', 0) // 空号
      statusForm.append('fileType ', 0)
    } else if (productCodeType === 'realtime') {
      statusForm.append('productCode', 1) // 实时
      statusForm.append('fileType ', 1)
    } else if (productCodeType === 'international') {
      statusForm.append('productCode', 2) // 国际
      statusForm.append('fileType ', 2)
    }
    console.log(statusForm)
    mergeFile(statusForm)
      .then((res) => {
        let timer
        if (res.data.code === 200) {
          // 上传成功
          clearTimeout(timer)
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
