<template>
  <div class="account">
    <div class="default-width info-regin">
      <div class="default-width" @click="browseButt">
        <h2>号码匹配</h2>
        <div class="p20">
          <div class="uploader white">
            <input
              type="text"
              class="filename"
              id="filename"
              readonly
              placeholder="请上传需要匹配的文件"
              accept=".csv, application/vnd.ms-excel"
            />
            <input type="button" name="file" class="button" value="选择文件" />
            <input
              type="file"
              id="file"
              ref="excelFile"
              @change="uploadExcel"
              accept=".csv, application/vnd.ms-excel"
            />
          </div>
          <div class="f12 c3">
            注:支持2003版本的excel(.xls)和.csv文件/文件大小最大为15M
          </div>
        </div>
        <div class="p20" style="padding-top: 0px">
          <div class="uploader white">
            <input
              type="text"
              class="filename"
              id="filenametxt"
              readonly
              placeholder="请上传待匹配的号码"
            />
            <input type="button" name="file" class="button" value="选择文件" />
            <input
              type="file"
              id="fileTxt"
              ref="txtFile"
              @change="uploadTxt"
              accept="text/plain"
            />
          </div>
          <div class="f12 c3">
            注:只支持txt文件（一行一个号码）/文件大小最大15M
          </div>
        </div>
        <div
          class="p20"
          style="padding-top: 0px; padding-left: 200px; padding-bottom: 40px"
        >
          <a
            href="javascript:void(0)"
            @click="execute"
            id="A1"
            class="btn btn-success"
            >立即匹配</a
          >
        </div>
      </div>
    </div>
    <div class="download_box" v-show="showDialog">
      <span class="layui-layer-setwin" style="top: 10px; right: 10px">
        <a
          class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:void(0);"
          @click="close"
        ></a>
      </span>
      <div class="download_tit">
        <p>数据匹配成功</p>
      </div>
      <div class="shang_info">
        <p>
          本次成功匹配到了<span>{{ count }}</span
          >行
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <a
          :href="downloadDomain + url"
          class="btn btn-danger"
          download=""
          style="padding: 7px 30px; font-size: 14px"
          >下载文件</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import server from '../server/index'
import { uploadByPieces } from '../utils/uploadByPieces'

export default {
  name: 'phonematch',
  data () {
    return {
      loading: false,
      showDialog: false,
      count: 0,
      url: '',
      formData: null,
      fileExcel: null,
      fileTxt: null,
      md5Excel: '',
      md5Txt: ''
    }
  },
  async mounted () {},
  methods: {
    goto (path) {
      this.$router.push(path)
    },
    async browseButt (event) {
      let userInfo = this.getUserInfo()
      if (!this.getSessionToken()) {
        event.preventDefault()
        this.$root.$emit('showlogin', true)
        return
      }
      if (this.getSessionToken()) {
        userInfo = this.getUserInfo()
        const params = {
          customerId: userInfo.id
        }
        const { data } = await server.getPersonalInfo(params)
        if (data.code === 200) {
        } else {
          this.$message.error(data.msg)
        }
      } else {
        this.$root.$emit('showlogin', true)
      }
    },
    uploadExcel (event) {
      const self = this
      const types = event.target.files[0].name.substring(
        event.target.files[0].name.lastIndexOf('.') + 1
      )
      const fileType = ['xls', 'csv'].some((item) => {
        return item === types
      })
      if (!fileType) {
        self.$message.error('文件格式错误，请重新选择文件！')
        this.$refs.excelFile.value = ''
        return
      }
      self.fileExcel = event.target.files[0]
      const maxSize = 1024 * 1024 * 15
      if (self.fileExcel.size > maxSize) {
        this.$message.error('文件大小最大为15M')
        this.$refs.excelFile.value = ''
        return
      }
      document.getElementById('filename').value = this.fileExcel.name
      this.$refs.excelFile.value = ''
    },
    uploadTxt (event) {
      const types = event.target.files[0].name.substring(
        event.target.files[0].name.lastIndexOf('.') + 1
      )
      const fileType = ['txt'].some((item) => {
        return item === types
      })
      if (!fileType) {
        this.$message.error('文件格式错误，请重新选择文件！')
        this.$refs.txtFile.value = ''
        return
      }
      const maxSize = 1024 * 1024 * 15
      if (event.target.files[0].size > maxSize) {
        this.$message.error('文件大小最大为15M')
        this.$refs.txtFile.value = ''
        return
      }
      this.fileTxt = event.target.files[0]
      document.getElementById('filenametxt').value = this.fileTxt.name
      this.$refs.txtFile.value = ''
    },
    execute () {
      if (this.fileExcel === null) {
        this.$message.error('请上传需要匹配的文件')
        return
      }
      if (this.fileTxt === null) {
        this.$message.error('请上传待匹配的号码')
        return
      }
      var userInfo = this.getUserInfo()
      if (this.fileExcel) {
        // 显示loading
        this.bus.$emit('loading', true)
        uploadByPieces({
          file: this.fileExcel,
          fileUpload: server.fileUploadMatching,
          mergeFile: server.mergeFileMatching,
          customerId: userInfo.id,
          pieceSize: 0.5,
          success: (data) => {
            console.log('文件上传成功--------' + data.data.name)
            if (data.code === 200) {
              this.md5Excel = data.data.md5Name
              this.downloadMatchingFile()
            } else {
              this.bus.$emit('loading', false)
              this.$message.error(data.msg)
            }
          },
          progress: (completed) => {
            console.log('分片上传进度：' + completed)
          },
          error: (e) => {
            console.log('分片上传失败')
            this.bus.$emit('loading', false)
            this.$message.error(e)
          }
        })
      }

      if (this.fileTxt) {
        uploadByPieces({
          file: this.fileTxt,
          fileUpload: server.fileUploadMatching,
          mergeFile: server.mergeFileMatching,
          customerId: userInfo.id,
          pieceSize: 0.5,
          success: (data) => {
            console.log('文件上传成功--------' + data.data.name)
            if (data.code === 200) {
              this.md5Txt = data.data.md5Name
              this.downloadMatchingFile()
            } else {
              this.bus.$emit('loading', false)
              this.$message.error(data.msg)
            }
          },
          progress: (completed) => {
            console.log('分片上传进度：' + completed)
          },
          error: (e) => {
            console.log('分片上传失败')
            this.bus.$emit('loading', false)
            this.$message.error(e)
          }
        })
      }
    },
    async downloadMatchingFile () {
      if (this.md5Excel !== '' && this.md5Txt !== '') {
        var userInfo = this.getUserInfo()
        var params = {
          md5Excel: this.md5Excel,
          md5Txt: this.md5Txt,
          customerId: userInfo.id
        }
        var { data } = await server.downloadMatchingFile(params)
        // 关闭loading
        this.bus.$emit('loading', false)
        if (data.code === 200) {
          this.url = data.data.fileAccessPath
          this.count = data.data.count
          this.showDialog = true
          this.reset()
        } else {
          this.$message.error(data.msg)
        }
      }
    },
    reset () {
      this.md5Excel = ''
      this.md5Txt = ''
      document.getElementById('filenametxt').value = ''
      document.getElementById('filename').value = ''
    },
    close () {
      this.showDialog = false
    }
  }
}
</script>
<style lang="less">
.p20 {
  padding: 20px;
  .uploader {
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: default;
    padding: 0;
    margin: 10px 0px;
    -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  .filename {
    float: left;
    display: inline-block;
    outline: 0 none;
    height: 45px;
    width: 400px;
    margin: 0;
    padding: 8px 10px;
    overflow: hidden;
    cursor: default;
    border: 1px solid;
    border-right: 0;
    font-size: 12px;
    color: #777;
    text-shadow: 1px 1px 0px #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-border-radius: 5px 0px 0px 5px;
    -webkit-border-radius: 5px 0px 0px 5px;
    border-radius: 5px 0px 0px 5px;
    background-color: #fff;
    border-color: #e9ecef;
    -moz-box-shadow: 0px 0px 1px #fff inset;
    -webkit-box-shadow: 0px 0px 1px #fff inset;
    box-shadow: 0px 0px 1px #fff inset;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .white .button {
    color: #fff;
    background: #6699ff;
    border-color: #6699ff;
    -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  }
  .button {
    float: left;
    height: 45px;
    display: inline-block;
    outline: 0 none;
    padding: 8px 30px;
    margin: 0;
    cursor: pointer;
    border: 1px solid;
    font-size: 14px;
    -moz-border-radius: 0px 5px 5px 0px;
    -webkit-border-radius: 0px 5px 5px 0px;
    border-radius: 0px 5px 5px 0px;
    -moz-box-shadow: 0px 0px 1px #fff inset;
    -webkit-box-shadow: 0px 0px 1px #fff inset;
    box-shadow: 0px 0px 1px #fff inset;
  }
  .uploader input[type='file'] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border: 0;
    padding: 0;
    margin: 0;
    height: 45px;
    cursor: pointer;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
  }
  .btn-success {
    -webkit-box-shadow: 0 2px 6px 0 rgba(10, 207, 151, 0.5);
    box-shadow: 0 2px 6px 0 rgba(10, 207, 151, 0.5);
  }
  .btn-success {
    color: #fff;
    background-color: #0acf97;
    border-color: #0acf97;
    padding: 9px 30px;
    font-size: 14px;
  }
  .btn-success:hover {
    color: #fff;
    background-color: #08ab7c;
    border-color: #089e74;
  }
  .btn-success.focus,
  .btn-success:focus {
    -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 214, 167, 0.5);
    box-shadow: 0 0 0 0.2rem rgba(47, 214, 167, 0.5);
  }
  .f12 {
    font-size: 12px;
  }
  .c3 {
    color: rgba(0, 0, 0, 0.3);
  }
  .btn {
    display: inline-block;
    cursor: pointer;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    line-height: 24px;
    border-radius: 3px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
      -webkit-box-shadow 0.15s ease-in-out;
  }
  a {
    text-decoration: none;
  }
}
.download_box {
  width: 300px;
  height: 200px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  position: fixed;
  z-index: 1000;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
  border: 1px dotted #dedede;
  // display: none;
}
.download_tit {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 50px;
  color: #333;
  font-size: 16px;
  margin-top: 7px;
  margin-right: 2px;
}
.shang_info {
  clear: both;
}
.shang_info p,
.shang_info a {
  color: #c3c3c3;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  line-height: 2em;
}
.btn-danger {
  -webkit-box-shadow: 0 2px 6px 0 rgba(250, 92, 124, 0.5);
  box-shadow: 0 2px 6px 0 rgba(250, 92, 124, 0.5);
}
.btn-danger {
  color: #fff;
  background-color: #fa5c7c;
  border-color: #fa5c7c;
  padding: 3px 12px;
}
.btn-danger:hover {
  color: #fff;
  background-color: #f9375e;
  border-color: #f82b54;
}
.layui-layer-setwin {
  position: absolute;
  font-size: 0;
  line-height: initial;
}
.layui-layer-setwin .layui-layer-close1 {
  background-position: 1px -40px;
  cursor: pointer;
}
.layui-layer-setwin a {
  position: relative;
  width: 16px;
  height: 16px;
  margin-left: 10px;
  font-size: 12px;
  _overflow: hidden;
  color: #333;
  text-decoration: none;
}
.layui-layer-btn a,
.layui-layer-dialog .layui-layer-ico,
.layui-layer-setwin a {
  display: inline-block;
  vertical-align: top;
}
.layui-layer-ico {
  background: url(../assets/icon.png) no-repeat;
}
</style>
