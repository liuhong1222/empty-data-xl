<template>
  <div class="empty">
    <div class="fixed-view">
      <section class="body-regin">
        <div class="center-box"><img height="100" src="../assets/index/index_title.png"
                                     alt="空号检测-全网数据">
          <div class="file-box">
            <div class="file-input">{{fileInfObj.fileName ? fileInfObj.fileName:'请上传文件进行检测（当前可用余额：' + userInfo.remainNumberTotal + '条）'}}</div>
            <div class="file-butt file-butt-select" @click="browseButt" v-if="visible4 || fileRows.length === 0">
              <img height="18"
                   src="../assets/index/folder.png">浏览
              <form ref="formelem" class="formelem">
                <input
                  id="singlefilea"
                  name="img" type="file"
                  multiple
                  accept="text/plain,application/vnd.ms-excel" class="file-hidden" ref="singlefile"
                  @change="uploadAxios">
              </form>
            </div>
            <div class="file-butt file-butt-select backgrounde5" @click="showvisible4" v-else>
              <img height="18"
                   src="../assets/index/folder.png">检测中
            </div>
          </div>
          <p class="form-remark">注: 1、待检测文件格式<strong>仅支持TXT文本文档格式（每行一个手机号码）</strong>
          </p>
          <p class="form-remark1">2、支持最低3001—150W条号码(20M)上传，并支持批量上传，最多上传30个文件</p>
          <p class="form-remark1">3、检测完成后，请点击右上角<strong>【个人中心】>【历史检测】</strong>查看检测报告</p>
          <div v-if="false" class="handle-regin">
            <button type="button" class="el-button el-button--default" @click="processButtonClick">
              <span>立即检测</span>
            </button>
          </div>
        </div>
      </section>
      <ul class="copy-right">
        <footerinfo></footerinfo>
      </ul>
    </div>
    <a-modal v-model="visible1" :footer="null" title="" class="dialog-loading" :closable="false" width="300px"
             style="top: 30%">
      <img class="img" height="30" src="../assets/index/loading.png">
      <p class="loadingp">文件读取中，请勿离开...</p>
    </a-modal>
    <a-modal v-model="visible2" :footer="null" title="" class="checkdialog" width="880px" style="top: 15%"
             @cancel="cancelHandler">
      <div class="el-dialog__header">
        <span data="">空号检测</span>
      </div>
      <div class="el-dialog__body">
        <div data="" class="loading-regin">
          <div data="" class="loading1" style="background-position-y: 0px;"></div>
          <div data="" class="loading2"><img data="" width="100%"
                                             src="../assets/index/circle1.png"></div>
          <div data="" class="loading3"><img data="" width="100%"
                                             src="../assets/index/circle2.png"></div>
          <div data="" class="loading4"><img data="" width="100%"
                                             src="../assets/index/circle3.png"></div>
        </div>
        <p data="" class="conduct-remarks">无需等待，系统后台自动执行......</p></div>
    </a-modal>
    <a-modal v-model="visible3" :footer="null" title="" class="success-loading" width="450px"
             style="top: 15%"
             @cancel="backcancel">
      <div class="el-dialog__body"><img src="../assets/index/success.png" alt="">
        <h3>恭喜！检测完成</h3>
        <h4>{{time}}s后进入检测结果页面，或点击<a href="javascript:" class="" @click="goto('/testrecord')">直接进入</a>
        </h4></div>
    </a-modal>

    <a-modal v-model="visible4" :footer="null" title="" class="dialog-showlist easy_upload-container" width="888px"
             style="top: 30%"
             :maskClosable="false"
             :keyboard="false"
             @cancel="backcancel"
    >
      <div class="checktitle">检测列表</div>
      <ul class="item-cantainer easy_upload_queue">
        <li class="easy_upload_queue_item queue_check_allow_true" data-index="0" v-for="(item, index) in fileRows"
            :key="index">
          <div class="easy_upload_preview queue_item-section" style="color: #cde1fa;font-size: 16px;font-weight:bold">
            {{ 9 >= (index+1) ? ('0'+(index+1)):index+1}}
          </div>
          <div class="easy_upload_file1 queue_item-section">
            <p class="easy_upload_filename">{{item.name}}</p>
            <p class="easy_upload_fiesize">{{item.size/1000}}KB</p>
            <p class="easy_upload_progress"><span class="easy_upload_bar">
              <span class="easy_upload_bar_guang" data-index="" style="display:none"></span></span></p>
          </div>
          <div class="easy_upload_file2 queue_item-section"><p class="easy_upload_percent" style="color: #8996a6;"></p>
          </div>
          <div class="easy_upload_file2 queue_item-section">
            <p class="easy_check_percent" style="color: #8996a6;display:none"></p></div>
          <div class="easy_upload_status queue_item-section">
            <p class="status status1" v-if="item.status == '1'">等待上传</p>
            <p class="status status3" v-else-if="item.status == '3'">上传中{{item.progress ? ('(' + item.progress + ')') : '...'}}</p>
            <p class="status status4" v-else-if="item.status == '4'">上传失败</p>
            <p class="status status5" v-else-if="item.status == '5'">上传完成</p>
            <p class="status status7" style="margin-top: -3px;" v-else-if="item.status == '7'">检测中</p>
            <p class="status status20" style="color:red" v-else-if="item.status == '-1'">最低上传3001条</p>
            <p class="status status21" style="color:red" v-else-if="item.status == '-4'">最大检测150万条</p>
            <p class="status status8" style="color:#bee8fb" v-else-if="item.status == '9'">检测完成<img
              src="../assets/index/wanc.png"
              style="position: relative; right: -10px;">
            </p>
            <p class="status status9" style="color:red" v-else-if="item.status == '-2'">余额不足</p>
            <p class="status status9" style="color:red" v-else-if="item.status == '-3'">代理商余额不足</p>
            <p class="easy_upload_delbtn btn noselect" style="margin-left:13px;cursor:pointer" v-if="item.status == '1'"
               @click="deleteThis(index)"><img
              src="../assets/index/delUpload.png"></p>
          </div>
          <div class="easy_upload_btn queue_item-section"></div>
        </li>
      </ul>
      <template v-if="running">
        <span class="easy_upload_head_btn1 uploadBtn noselect" style="" @click="showUploadDialogBtn">立即上传检测</span>
        <span class="continueAdd" style="display:block" @click="browseButtt"><img src="../assets/index/uploadPlus.png"
                                                                                  style="margin-right: 6px;vertical-align: sub;">添加文件</span>
        <p class="waringTips"><span style="color:#4a568a;margin: 20px auto;width:300px;display: block;">注：您已添加{{fileRows.length}}个文件，最多可检测30个文件</span>
        </p>
      </template>
    </a-modal>
    <div class="notice-pop-up" v-show="showUploadDialog">
      <p>文档上传后会自动进行检测,</p>
      <p>该过程无法暂停或取消，是否立即上传</p>
      <button id="notice-pop-upBtnTrue" @click="gotofileUpload">是</button>
      <button id="notice-pop-upBtnClear" @click="hideUploadDialogBtn">否</button>
    </div>
  </div>
</template>
<script>
import footerinfo from '../components/footerinfo'
import server from '../server/index'
import { uploadByPieces } from '../utils/uploadByPieces'

export default {
  name: 'empty',
  components: {
    footerinfo
  },
  data () {
    return {
      checkList: [],
      errList: [],
      visible4: false,
      formData: null,
      time: 10,
      stepIndex: 0,
      fileRows: [], // 条数
      progressVal: 0,
      fileInfObj: {},
      timersecond: '',
      timerInterval: '',
      mobileList: [],
      checkStatus: '',
      showUploadDialog: false,
      running: true,
      visible3: false,
      userInfo: {},
      isCertified: false
    }
  },
  computed: {
    visible1 () {
      return this.stepIndex === 2
    },
    visible2 () {
      return this.stepIndex === 3
    }
  },
  watch: {
    stepIndex (val) {
      if (val === 4) {
        this.visible3 = true
      } else {
        this.visible3 = false
      }
    }
  },
  mounted () {
    this.getRunningList()
    this.getPersonalInfo()
    this.getCertifiedInfo()
  },
  beforeDestroy () {
    clearTimeout(this.timersecond)
    clearInterval(this.timerInterval)
  },
  methods: {
    cancelHandler () {
      clearTimeout(this.timersecond)
      this.stepIndex = 0
    },
    goto (path) {
      this.$router.push(path)
    },
    browseButtt () {
      document.getElementById('singlefilea').click()
    },
    async browseButt (event) {
      this.running = true
      var userInfo = this.getUserInfo()
      if (!this.getSessionToken()) {
        event.preventDefault()
        this.$root.$emit('showlogin', true)
        return
      }
      if (!this.isCertified) {
        event.preventDefault()
        this.$root.$emit('showCertification', { source: 'empty', flag: true })
        return
      }

      if (this.getSessionToken()) {
        userInfo = this.getUserInfo()
        var params = {
          customerId: userInfo.id
        }
        var {data} = await server.isCertified(params)
        if (data.code === 200) {
          if (data.data) {
            // document.getElementById('singlefilea').click()
          } else {
            this.$root.$emit('showCertification', true)
          }
        } else {
          this.$message.error(data.msg)
        }
      } else {
        this.$root.$emit('showlogin', true)
      }
    },
    resetFrom () {
      this.$refs.formelem.reset()
    },
    showvisible4 () {
      this.visible4 = true
    },
    testingSuccess () {
      this.stepIndex = 4
      this.timerInterval = setInterval(() => {
        if (this.time <= 0) {
          this.goto('/testrecord')
          clearInterval(this.timerInterval)
          return
        }
        this.time--
      }, 1e3)
    },
    async getRunningList () {
      var params = {}
      var {data} = await server.getRunningList(params)
      if (data.code === 200) {
        // console.log(data)
        this.fileRows = data.data.map(v => {
          if (v.status === 3) v.status = 7
          return v
        })

        if (this.fileRows.length > 0) {
          this.checkList = this.fileRows.map(v => v.id)
          this.loopTestProcess()
          this.running = false
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    async getTestProcessMobile () {
      if (this.fileRows?.length > 0 && this.fileRows.find(v => v.status === 3 || v.status === 1) !== undefined) {
        console.log('多文件上传未完成，暂不获取检测状态')
        return
      }
      if (this.checkList.length === 0) {
        clearTimeout(this.timersecond)
        if (this.fileRows?.length > 0 && this.fileRows.every(v => v.status === 9)) {
          this.testingSuccess()
        }
        return
      }
      var params = {
        ids: this.checkList.map(v => v)
      }
      var {data} = await server.getTestProcessMobile(params)
      if (data.code === 200) {
        data.data.map(v => {
          var formDatass = this.fileRows.map((vv, i) => {
            if (vv.id === v.id) {
              if ([0, 1, 2, 3].indexOf(v.status) === -1) {
                vv.status = v.status
              } else {
                vv.status = 7
              }
            }
            return vv
          })
          this.fileRows = formDatass
          if ([0, 1, 2, 3].indexOf(v.status) === -1) {
            var index = this.checkList.indexOf(v.id)
            // 删除已检测成功或失败的id
            this.checkList.splice(index, 1)
            if (v.status < 0) {
              // 记录检测失败的id
              this.errList.push(v.id)
            }
          }
        })
      } else {
        this.$message.error(data.msg)
      }
    },
    loopTestProcess () {
      this.timersecond = setInterval(() => {
        this.getTestProcessMobile()
      }, 5000)
    },
    async uploadAxios (file) {
      console.log(file.target.files)
      // var userInfo = this.getUserInfo()
      // this.formData = new FormData()
      if (this.fileRows) {
        this.fileRows = this.fileRows.concat(Array.from(file.target.files))
      }
      this.fileRows = this.fileRows.map(v => {
        v.status = '1'
        return v
      })
      // this.fileRows.forEach(v => {
      //   this.formData.append('img', v)
      // })
      // this.formData.append('customerId', userInfo.id)
      // this.fileInfObj = {
      //   fileName: Array.from(this.fileRows).map(v => v.name).join(',')
      // }
      // this.stepIndex = 1
      this.visible4 = true
      this.resetFrom()
    },
    showUploadDialogBtn () {
      if (this.fileRows.length > 30) {
        this.$message.error('最多可检测30个文件')
        return
      }
      this.showUploadDialog = true
    },
    hideUploadDialogBtn () {
      this.showUploadDialog = false
    },
    gotofileUpload () {
      this.hideUploadDialogBtn()
      this.processButtonClick(this.fileRows, 0)
    },
    backcancel () {
      this.stepIndex = 0
      this.visible4 = false
      clearInterval(this.timerInterval)
      this.$nextTick(() => {
        this.fileRows = []
        this.errList = []
      })
    },
    deleteThis (index) {
      this.fileRows.splice(index, 1)
    },
    async processButtonClick (formData, index) {
      this.running = false
      var userInfo = this.getUserInfo()
      var formDatass = formData.map((v, i) => {
        if (index === i) {
          v.status = '3'
        }
        return v
      })
      console.log(Object.assign([], formDatass))
      this.fileRows = formDatass
      uploadByPieces({
        file: formData[index],
        fileUpload: server.fileUpload,
        mergeFile: server.mergeFile,
        customerId: userInfo.id,
        pieceSize: 0.25,
        success: data => {
          console.log('文件上传成功--------' + data.data.name)
          if (data.code === 200) {
            this.checkList.push(data.data.emptyId)
            formDatass = formData.map((v, i) => {
              if (index === i) {
                v.status = '5'
                v.id = data.data.emptyId
              }
              return v
            })
            this.fileRows = formDatass
            if (index === 0) {
              this.loopTestProcess()
            }
            if (this.checkList.length === 0) {
              this.loopTestProcess()
            }
          } else {
            // this.stepIndex = 1
            // this.resetFrom()
            // this.progressVal = 0
            formDatass = formData.map((v, i) => {
              if (index === i) {
                v.status = '4'
              }
              return v
            })
            this.fileRows = formDatass
            this.$message.error(data.msg)
          }
        },
        progress: completed => {
          console.log('分片上传进度：' + completed)
          formDatass = formData.map((v, i) => {
            if (index === i) {
              v.progress = completed
            }
            return v
          })
          this.fileRows = formDatass
        },
        error: e => {
          console.log('分片上传失败')
          formDatass = formData.map((v, i) => {
            if (index === i) {
              v.status = '4'
              v.msg = e
            }
            this.$message.error(v.msg)
            return v
          })
          this.fileRows = formDatass
        }
      })
      if (index >= formData.length - 1) {} else {
        setTimeout(() => {
          this.processButtonClick(formData, index + 1)
        }, 500)
      }
    },
    async fileUpload (formData, index) {
      this.running = false
      var formDatas = new FormData()
      var userInfo = this.getUserInfo()
      formDatas.append('customerId', userInfo.id)
      formDatas.append('img', formData[index])

      var formDatass = formData.map((v, i) => {
        if (index === i) {
          v.status = '3'
        }
        return v
      })
      console.log(Object.assign([], formDatass))
      this.fileRows = formDatass
      // this.stepIndex = 2
      var {data} = await server.fileUpload(formDatas, {
        onUploadProgress: (e) => {
          console.log(e)
        }
      })

      if (data.code === 200) {
        // this.fileInfObj.id = data.data.emptyId
        this.checkList.push(data.data.emptyId)
        formDatass = formData.map((v, i) => {
          if (index === i) {
            v.status = '5'
            v.id = data.data.emptyId
          }
          return v
        })
        this.fileRows = formDatass
        if (index === 0) {
          this.loopTestProcess()
        }
        if (this.checkList.length === 0) {
          this.loopTestProcess()
        }
      } else {
        // this.stepIndex = 1
        // this.resetFrom()
        // this.progressVal = 0
        formDatass = formData.map((v, i) => {
          if (index === i) {
            v.status = '4'
          }
          return v
        })
        this.fileRows = formDatass
        // this.$message.error(data.msg)
      }
      if (index >= formData.length - 1) {
        // var formDatass = formData.map((v) => {
        //   if (!v.errortype) v.status = '正在检测'
        //   return v
        // })
        // this.fileRows = formDatass
        // this.loopTestProcess()
      } else {
        setTimeout(() => {
          this.fileUpload(formData, index + 1)
        }, 500)
      }
    },
    async getPersonalInfo () {
      var params = {}
      var {data} = await server.getPersonalInfo(params)
      if (data.code === 200) {
        this.userInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    async getCertifiedInfo () {
      var params = {}
      var {data} = await server.isCertified(params)
      if (data.code === 200) {
        this.isCertified = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less">
  .empty {

    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }

    .handle-regin .el-button {
      color: #fff;
      border-radius: 0;
      padding: 15px 60px;
      transition: all .3s;
      background-color: #09102c;
    }

    .fixed-view {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      background: url(../assets/index/B01.jpg) no-repeat 50%;
      background-size: cover;
    }

    .body-regin {
      top: 20%;
      padding-top: 60px;
      position: relative;
      z-index: 1250;
    }

    .center-box {
      width: 700px;
      margin: 0 auto;
      text-align: center;
    }

    .file-box {
      height: 50px;
      margin-top: 80px;
      background-color: #fff;
      position: relative;
    }

    .form-remark, .form-remark1 {
      margin-top: 18px;
      color: #676e87;
      font-size: 12px;
      text-align: left;
    }

    .form-remark1 {
      margin-top: 10px;
      text-indent: 1.5em;
    }

    .handle-regin {
      padding-top: 50px;
    }

    .file-box .file-input {
      float: left;
      line-height: 50px;
      padding: 0 20px;
      width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }

    .file-box .file-butt-select {
      background-color: #ffb03f;
    }

    .file-box .file-butt {
      float: right;
      min-width: 140px;
      height: 50px;
      color: #fff;
      font-size: 16px;
      line-height: 20px;
      padding: 15px 20px;
      cursor: pointer;
      position: relative;
    }

    .file-box .file-butt img {
      vertical-align: top;
      margin-right: 15px;
    }

    .form-remark1 strong, .form-remark strong {
      color: #98abcf;
    }

    .file-hidden {
      position: absolute;
      top: 0;
      left: 0;
      /* visibility: hidden; */
      width: 140px;
      height: 50px;
      opacity: 0;
      cursor: pointer;
    }
  }

  .dialog-loading {
    width: 300px;
    height: 140px;

    .ant-modal-content {
      border: 1px solid #273b87;
      background-color: #09102c;
      box-shadow: 0 0 5px #273b87;
    }

    .img {
      -webkit-animation: rotate-data 1s linear infinite;
      animation: rotate-data 1s linear infinite;
    }

    .loadingp {
      color: #fff;
      font-size: 16px;
      margin-top: 15px;
    }

    .ant-modal-body {
      text-align: center;
    }
  }

  @keyframes water-data {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -180px;
    }
  }

  @keyframes rotate-data {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }

  .checkdialog {
    .ant-modal-close-x {
      color: #fff;
    }

    .ant-modal-body {
      padding-top: 20px;
    }

    .ant-modal-content {
      border: 1px solid #273b87;
      background-color: #09102c;
      box-shadow: 0 0 5px #273b87;
    }

    .el-dialog__header {
      text-align: center;
      padding: 0px 20px 10px;
    }

    .el-dialog__header span {
      color: #fff;
      font-size: 26px;
    }

    .el-dialog__body {
      padding: 20px 20px 30px;
    }

    .el-dialog__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }

    .loading-regin {
      width: 180px;
      height: 180px;
      position: relative;
      margin: 0 auto;
    }

    .conduct-scaling {
      color: #fff;
      margin-top: 15px;
      text-align: center;
    }

    .conduct-order {
      font-size: 0;
      margin-top: 30px;
    }

    .conduct-remarks {
      color: #bee8fb;
      text-align: center;
      margin-top: 30px;
    }

    .loading-regin .loading1 {
      width: 148px;
      height: 148px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 148px;
      border-radius: 124px;
      margin: 16px;
      background-color: rgba(17, 62, 169, .4);
      background-image: url(../assets/index/water.png);
      background-repeat: repeat-x;
      background-position-y: 138px;
      -webkit-animation: water-data 2s linear infinite;
      animation: water-data 2s linear infinite;
      transition: all 1s linear;
      display: inline-block;
    }

    .loading-regin .loading2, .loading-regin .loading3 {
      top: 0;
      width: 180px;
      height: 180px;
      overflow: hidden;
      position: absolute;
    }

    .loading-regin .loading2 {
      -webkit-animation: rotate-data 1s linear infinite;
      animation: rotate-data 1s linear infinite;
    }

    .loading-regin .loading3 {
      -webkit-animation: rotate-data 1.5s linear infinite;
      animation: rotate-data 1.5s linear infinite;
    }

    .loading-regin .loading2, .loading-regin .loading3 {
      top: 0;
      width: 180px;
      height: 180px;
      overflow: hidden;
      position: absolute;
    }

    .loading-regin .loading4 {
      top: 0;
      width: 180px;
      height: 180px;
      overflow: hidden;
      position: absolute;
      -webkit-animation: rotate-data 2s linear infinite;
      animation: rotate-data 2s linear infinite;
    }
  }

  .success-loading {
    height: 286px;

    .ant-modal-content {
      border: 1px solid #273b87;
      background-color: #09102c;
      box-shadow: 0 0 5px #273b87;
    }

    .el-dialog__body {
      text-align: center;
      color: #ffffff;
    }

    .el-dialog__body h3 {
      color: #cbe1fa;
      font-size: 16px;
      margin-top: 30px;
      margin-bottom: 25px;
    }

    .el-dialog__body h4 {
      margin-bottom: 10px;
      color: #e6e6e6;
    }

    .el-dialog__body h4 span {
      color: #f55f6a;
    }

    .el-dialog__body h4 a {
      color: #f7bd7f;
    }
  }

  .dialog-showlist {
    .ant-modal-body {
      background-color: #09102c;
    }

    .checktitle {
      color: #d3d6df;
      text-align: center;
    }

    .item {
      height: 60px;
      color: #d3d6df;
      border-bottom: 1px solid #1b2445;
      position: relative;
    }

    .checktitle-index {
      display: inline-block;
      width: 40px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 16px;
      text-align: center;
    }

    .checktitle-name {
      display: inline-block;
      width: 400px;
      height: 24px;
      line-height: 24px;
      position: absolute;
      top: 6px;
      left: 50px;
      font-size: 16px;
      text-align: left;
    }

    .checktitle-size {
      display: inline-block;
      width: 400px;
      height: 24px;
      line-height: 24px;
      position: absolute;
      top: 30px;
      left: 50px;
      font-size: 14px;
      text-align: left;
      color: #848daa;;
    }

    .checktitle-status {
      display: inline-block;
      width: 100px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      top: 0;
      right: 8px;
      font-size: 12px;
      text-align: right;

      &.red {
        color: #be2537;
      }
    }

    .item-cantainer {
      max-height: 400px;
      overflow-y: auto;
      min-height: 200px;
    }

    .uploadBtn {
      width: 140px;
      height: 36px;
      background-color: #283b87;
      line-height: 36px;
      color: #cde1fa;
      font-size: 14px;
      cursor: pointer;
      margin: 65px auto 0px;
      text-align: center;
      display: block;
    }

    .continueAdd {
      position: relative;
      bottom: 95px;
      float: right;
      right: 40px;
      width: 100px;
      height: 32px;
      border: solid 1px #283b87;
      display: block;
      line-height: 31px;
      text-align: center;
      color: #6f8cff;
      margin-top: 15px;
      cursor: pointer;
    }

    .easy_upload-container p, .easy_upload-container ul {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #fff;
    }
  }

  .formelem {
    position: absolute;
    top: 0;
    left: 0;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .queue_item-section {
    display: inline-block;
    margin-right: 15px;
  }

  .dialog-showlist .ant-modal-body {
    padding: 30px 20px 10px 20px;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item {
    display: flex;
    align-items: center;
    font-size: 14px;
    position: relative;
    border-bottom: 1px solid #16214d;
    width: 97%;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_preview {
    width: 15%;
    height: 65px;
    line-height: 65px;
    position: absolute;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -32px;
    top: 0;
  }

  .easy_upload-container p, .easy_upload-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: #fff;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file1 .easy_upload_filename {
    font-size: 16px;
    width: 150px;
    margin-bottom: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    margin-top: -10px;
    margin-left: 70px;
    color: #cde1fa;
  }

  .easy_upload-container p, .easy_upload-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: #fff;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file1 .easy_upload_fiesize {
    width: 150px;
    position: absolute;
    margin-top: 12px;
    margin-left: 70px;
    color: #8996a6;
    font-size: 12px;
  }

  .easy_upload-container p, .easy_upload-container ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: #fff;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file1 .easy_upload_progress {
    width: 100%;
    height: 65px;
    border-bottom: 1px solid #16214d;
    display: flex;
    align-items: center;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file1 .easy_upload_progress .easy_upload_bar {
    position: relative;
    display: inline-block;
    width: 0%;
    height: 1px;
    margin-top: 64px;
    background: #273b87;
    opacity: .5;
    border-radius: 5px;
    margin-left: 10px;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file1 .easy_upload_progress .easy_upload_bar_guang {
    position: absolute;
    top: -1px;
    right: -8px;
    width: 30px;
    height: 14px;
    background: url(../assets/index/guang.png) no-repeat -2px -1px;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file2 {
    width: 34px;
    position: absolute;
    right: 15px;
    margin: 5px 0;
    color: #8996a6;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status {
    display: flex;
    font-size: 12px;
    /*position: absolute;*/
    right: 39px;
    margin: 0px 3px;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status1 {
    display: block;
    color: #cde1fa;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status {
    width: 70px;
    text-align: center;
    white-space: nowrap;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status2, .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status3 {
    /*display: none;*/
    color: #bee8fb;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status4 {
    /*display: none;*/
    color: red;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status5 {
    /*display: none;*/
    color: #bee8fb;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_status .status7 {
    /*display: none;*/
    color: #bee8fb;
  }

  .easy_upload_delbtn {
    color: #98abcf;
    font-weight: 700;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_btn {
    margin-right: 10px;
  }

  .easy_upload-container .easy_upload_queue .easy_upload_queue_item .easy_upload_file1 {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    line-height: 65px;
    width: 100%;
  }

  .item-cantainer::-webkit-scrollbar {
    width: 5px;
    /* height: 10px; */
  }

  .item-cantainer::-webkit-scrollbar-button {
    background-color: #0e1c54;
  }

  .item-cantainer::-webkit-scrollbar-thumb {
    background: #273b87;
    border-radius: 4px;
  }

  .item-cantainer::-webkit-scrollbar-track {
    background: #0e1c54;
  }

  .ant-modal-close-x {
    color: #ffffff;
  }

  .notice-pop-up {
    width: 456px;
    height: 278px;
    box-sizing: border-box;
    padding: 69px 64px 45px 70px;
    background-color: #09102C;
    border: 1px solid #273B87;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 100000;
  }

  .notice-pop-up p {
    font-size: 16px;
    color: #fefefe;
    font-weight: bold;
    text-align: center;
  }

  .notice-pop-up button {
    width: 124px;
    height: 44px;
    text-align: center;
    background-color: #273B87;
    color: #fff;
    outline: none;
    margin-top: 60px;
    margin-right: 17px;
    font-size: 16px;
    margin-left: 15px;
    border: none;
    cursor: pointer;
  }

  .notice-pop-up button {
    width: 124px;
    height: 44px;
    text-align: center;
    background-color: #273B87;
    color: #fff;
    outline: none;
    margin-top: 60px;
    margin-right: 17px;
    font-size: 16px;
    margin-left: 15px;
    border: none;
    cursor: pointer;
  }

  .empty .file-box .file-butt-select.backgrounde5 {
    background-color: #e5e5e5;
    color: #333;
  }
</style>
