<template>
  <section>
    <div class="fixed-view" ref="fixedView">
      <section class="body-regin">
        <div class="center-box">
          <img
            height="100"
            src="../assets/index/empty_gjjc.png"
            alt="国际号码-高效检测"
          />
          <div class="country-code">
            <a-select
              style="width: 100%; height: 50px"
              placeholder="请选择国码（必选）"
              v-model="countryCodeValue"
              :disabled="countryCodeDisabled"
            >
              <a-select-option
                :key="item.id"
                v-for="item in countryCodeList"
                :value="item.code"
                >+{{ item.code }} - {{ item.name }} -
                {{ item.desc }}</a-select-option
              >
            </a-select>
          </div>
          <div class="file-box">
            <div class="file-input">
              {{
                this.fileObj['name'] ||
                ('请上传文件进行检测（当前可用余额：' +
                  (userInfo.directBalance
                    ? userInfo.directBalance
                    : 0) +
                  '条）')
                  | formatName
              }}
            </div>
            <div
              v-if="fileInfObj['minshow']"
              class="file-butt file-butt-layouts"
              @click="dialogIndex = 2"
            >
              <img height="20" src="../assets/index/loading.png" />{{
                mobileObj['stateDesc']
              }}
            </div>
            <div
              v-else
              class="file-butt file-butt-select"
              @click="browseButt($event, 'directSingleFile')"
            >
              <img height="18" src="../assets/index/folder.png" />浏览
            </div>
          </div>
          <p class="form-remark">
            注:
            1、号码文件中号码不管有没有带国码都<strong>必须选择国码</strong>；每批上传的号码只能同一个国家的号码，不支持一次性筛查多个国家的号
            <span style="margin-left: 36px"
              >码；筛查完下载的号码系统都已带上了国码</span
            >
          </p>
          <p class="form-remark1">
            <strong
              >2、文件格式仅支持TXT格式文件/每行一个手机号/支持最低2000条-200W条号码包上传/txt文件小于30MB</strong
            >
          </p>
          <div if="stepIndex > 0" class="handle-regin">
            <!-- <a-button v-if='stepIndex == 1' @click='clickSingleUpload'>点击上传</a-button> -->
            <a-progress
              v-if="stepIndex == 2"
              :text-inside="true"
              :strokeWidth="18"
              :percent="singleProgressVal"
            ></a-progress>
            <a-button v-if="stepIndex == 3" @click="clickTesting"
              >立即检测</a-button
            >
          </div>
        </div>
      </section>
      <form ref="formelem">
        <input
          class="file-hidden"
          name="empty"
          id="directSingleFile"
          ref="directSingleFile"
          type="file"
          accept="text/plain,application/vnd.ms-excel"
          @change="singlefilePreview($event)"
        />
      </form>
      <!-- <footerinfo></footerinfo> -->
    </div>
    <!-- 单文件分片上传弹窗 -->
    <!-- <a-modal width='300px' wrapClassName='dialog-reset dialog-loading' :destroyOnClose='true' :maskClosable='false' :closable='false' :visible='isUploadShow'>
      <img height='30' src='../assets/index/loading.png' />
      <p>{{uploadCompleted}}</p>
    </a-modal> -->
    <!-- 单文件上传 -->
    <a-modal
      width="300px"
      :zIndex="9999"
      wrapClassName="dialog-reset dialog-loading"
      :destroyOnClose="true"
      :maskClosable="false"
      :closable="false"
      :visible="dialogIndex == 1"
    >
      <img height="30" src="../assets/index/loading.png" />
      <p>文件读取中，请勿离开...</p>
    </a-modal>
    <a-modal
      width="880px"
      :zIndex="9999"
      wrapClassName="dialog-reset dialog-conduct"
      :destroyOnClose="true"
      :maskClosable="false"
      :dialogStyle="dialogStyle"
      :visible="dialogIndex == 2"
      @cancel="dialogIndex = 0"
    >
      <template slot="title">
        <span>国际号码检测</span>
      </template>
      <div class="loading-regin">
        <div class="loading1" :style="testingPosition">{{ testingScale }}%</div>
        <div class="loading2">
          <img width="100%" src="../assets/index/circle1.png" />
        </div>
        <div class="loading3">
          <img width="100%" src="../assets/index/circle2.png" />
        </div>
        <div class="loading4">
          <img width="100%" src="../assets/index/circle3.png" />
        </div>
      </div>
      <div class="conduct-scaling">
        <span>{{ mobileObj['stateDesc'] }}</span
        >({{ mobileObj['testCounts'] }}/{{ mobileObj['fileCounts'] }})
      </div>
      <ul class="conduct-order">
        <li
          v-for="(item, index) in mobileObj['mobileList']"
          :class="item.color"
          :key="index"
        >
          <span>{{ item.mobile }}</span>
          <a-icon
            type="exclamation-circle"
            v-if="item['color'] == 'red'"
            class="a-icon-warning"
          />
          <a-icon
            type="check-circle"
            v-else-if="item['color'] == 'blue'"
            class="a-icon-success"
          />
          <a-icon
            type="close-circle"
            v-else-if="item['color'] == 'gray'"
            class="a-icon-error"
          />
          <a-icon
            type="question-circle"
            v-else-if="item['color'] == 'yellow'"
            class="a-icon-question"
          />
        </li>
      </ul>
      <p class="conduct-remarks">无需等待，系统后台自动执行......</p>
    </a-modal>
    <a-modal
      width="450px"
      :zIndex="9999"
      wrapClassName="dialog-reset dialog-suspend"
      :destroyOnClose="true"
      :maskClosable="false"
      :dialogStyle="dialogStyle"
      :visible="dialogIndex == 3"
      @cancel="dialogIndex = 0"
    >
      <template slot="title">
        <span>提示</span>
      </template>
      <p class="text-desc">根据您的需求，此次检测已经被终止！</p>
      <template slot="footer">
        <a-button type="primary" size="small" @click="dialogIndex = 0"
          >确定</a-button
        >
      </template>
    </a-modal>
    <a-modal
      width="450px"
      :zIndex="9999"
      wrapClassName="dialog-reset dialog-success"
      :destroyOnClose="true"
      :dialogStyle="dialogStyle"
      :closable="false"
      :visible="dialogIndex == 4"
    >
      <img src="../assets/index/success.png" alt="" />
      <h3>恭喜！检测完成</h3>
      <!-- <h4>
        本次检测提交条数：<span class="red">{{ fileRows }}条</span>
      </h4> -->
      <h4>
        {{ countDown }}s后进入检测结果页面，或点击<a
          @click="goto('/testrecord')"
          >直接进入</a
        >
      </h4>
    </a-modal>
  </section>
</template>

<script>
import server from '../server/index'
// import footerinfo from '../components/footerinfo'
import { uploadByPieces } from '../utils/uploadByPieces'
export default {
  components: {
    // footerinfo
  },
  data () {
    return {
      fileObj: {},
      fileRows: 0, // 条数
      fileInfObj: {
        id: null,
        sendID: null,
        minshow: false
      },
      stepIndex: 0,
      singleProgressVal: 0,
      dialogIndex: 0, // dialog状态
      mobileObj: {
        // 循环检测结果
        fileCounts: 0,
        testCounts: 0,
        mobileList: [],
        stateDesc: ''
      },
      countDown: 10, // 完成10秒倒计时
      timersecond: null, // 倒计时对象
      fileBtnShow: false, // 是否展示可选上传按钮
      userInfo: {},
      isCertified: false,
      checkList: [],
      isSingleFile: true, // 单文件上传/多文件上传
      fileObjList: [], // 所有上传文件对象
      dialogVisible: false, // 多文件上传弹窗
      dialogStyle: {
        'margin-top': '5vh'
      },
      isUploadShow: false, // 分片上传弹窗
      uploadCompleted: '文件上传中，请勿离开...', // 分片上传进度
      checkId: '', // 文件检测id（唯一id）
      sendID: '', // 外部文件id
      countryCodeList: [], // 国码下拉框列表
      countryCodeValue: undefined, // 选中的国码
      countryCodeDisabled: false // 检测时不可选择国码
    }
  },
  head () {
    return { title: '国际号码检测' }
  },
  computed: {
    testingScale () {
      const { testCounts = 0, fileCounts = 1 } = this.mobileObj || {}
      return parseInt((Number(testCounts) / (Number(fileCounts) || 1)) * 100)
    },
    testingPosition () {
      const { testCounts = 0, fileCounts = 1 } = this.mobileObj || {}
      return {
        'background-position-y':
          138 - (Number(testCounts) / (Number(fileCounts) || 1)) * 138 + 'px'
      }
    }
  },
  filters: {
    formatName (filename) {
      if (filename) {
        return filename.replace(/^(^.{12})(.+)(.{5}\.+\w+$)$/g, '$1...$3')
      }
      return filename
    },
    formatSize (filesize) {
      let size = ''
      if (filesize < 1 * 1024 * 1024) {
        size = (filesize / 1024).toFixed(2) + 'KB'
      } else {
        size = (filesize / (1024 * 1024)).toFixed(2) + 'MB'
      }
      return size
    }
  },
  mounted () {
    this.getCountryCode()
    this.getPersonalInfo()
    this.getCertifiedInfo()
    try {
      const directTestingID = sessionStorage.getItem(
        'directTestingID'
      )
      const directTestingsendID = sessionStorage.getItem(
        'directTestingsendID'
      )
      const countryCodeValue = sessionStorage.getItem('countryCodeValue')
      const directTestingRows = sessionStorage.getItem(
        'directTestingRows'
      )
      if (directTestingID) {
        this.fileInfObj = {
          id: directTestingID,
          sendID: directTestingsendID,
          minshow: true
        }
        this.countryCodeValue = countryCodeValue
        this.countryCodeDisabled = true
        this.getTestProcessMobile('fromMounted')
      }
      if (directTestingRows) {
        this.fileRows = directTestingRows
      }
    } catch (err) {
      this.fileInfObj = {
        id: null,
        sendID: null,
        minshow: false
      }
      this.countryCodeDisabled = false
      sessionStorage.removeItem('directTestingID')
      sessionStorage.removeItem('directTestingsendID')
      sessionStorage.removeItem('countryCodeValue')
    }
  },
  methods: {
    // 是否展示文件上传可选按钮
    showFileBtn () {
      clearTimeout(this.fileBtnTimer)
      this.fileBtnShow = true
    },
    hideFileBtn () {
      this.fileBtnTimer = setTimeout(() => {
        this.fileBtnShow = false
      }, 500)
    },
    // 点击预览
    async browseButt (event, dom) {
      // 先判断是否登录
      if (!this.getSessionToken()) {
        event.preventDefault()
        this.$root.$emit('showlogin', true)
        return
      }
      if (!this.countryCodeValue) {
        event.preventDefault()
        this.$message.error('请先选择国码')
        return
      }
      // 判断是否认证
      if (!this.isCertified) {
        switch (this.userInfo.authenticationLimitLevel) {
          case 1: // 可关（对应等级二）
            event.preventDefault()
            this.$root.$emit('showCertification', {
              source: {
                url: 'empty',
                type: dom,
                balance: this.userInfo.directBalance
              },
              flag: true
            })
            break
          case 2: // 不可关（对应等级三）
            event.preventDefault()
            this.$root.$emit('showCertification', {
              source: { url: 'emptyapiNot', type: 'testBtn' },
              flag: true
            })
            break
          default:
            this.$message.error('请先完成认证')
            return false
        }
      } else {
        // 判断是否有余额
        if (
          !this.userInfo.directBalance ||
          this.userInfo.directBalance === '0' ||
          this.userInfo.directBalance < 0
        ) {
          event.preventDefault()
          this.$message.error('余额不足')
          return
        }

        document.getElementById(dom).click()
      }
    },
    // 验证预览文件1:点击上传 2：显示进度 3：立即检测
    // 单文件上传
    singlefilePreview ({ target }) {
      const file = target.files[0]
      if (file.size === 0) {
        this.$message.error('上传文件有误，请重新上传！')
        this.$refs.directSingleFile.value = ''
        return
      }
      if (file) {
        if (file.name.substr(-4) !== '.txt') {
          this.$message.warning('仅支持txt格式文件')
          this.$refs.directSingleFile.value = ''
        } else if (file.size >= 31457280) {
          this.$message.warning('文件大小不能超过30M')
          this.$refs.directSingleFile.value = ''
        } else {
          this.fileObj = file || {}
          this.stepIndex = 2
          this.uploadAxios(file)
        }
      }
    },
    // 文件上传Ajax
    uploadAxios (file) {
      // 获取所有上传文件
      this.fileObjList = [file]
      console.log(this.fileObjList)
      this.fileObjList = this.fileObjList.map((v) => {
        v.status = '1'
        return v
      })
      // 分片上传
      this.processButtonClick(this.fileObjList, 0)
    },
    // 验证检测
    clickTesting () {
      let runCount = 3
      this.stepIndex = 0
      this.dialogIndex = 1
      this.timersecond = setInterval(() => {
        runCount--
        if (runCount <= 0) {
          this.testingAxios()
          clearInterval(this.timersecond)
        }
      }, 1000)
    },
    // 准备检测数据
    testingAxios () {
      const testForm = new FormData()
      testForm.append(
        'fileId',
        this.checkId || sessionStorage.getItem('directTestingID')
      )
      testForm.append('countryCode', this.countryCodeValue)
      server
        .directCheckFile(testForm)
        .then((res) => {
          if (res.data.code === 200) {
            // 请求成功，关闭定时器
            clearInterval(this.timersecond)
            this.testingSuccess(
              res.data.data.runCount ? res.data.data.runCount : 3
            )
            this.sendID = res.data.data.sendID
            sessionStorage.setItem('directTestingID', res.data.data.code)
            sessionStorage.setItem(
              'directTestingsendID',
              res.data.data.sendID
            )
            sessionStorage.setItem('countryCodeValue', this.countryCodeValue)
            sessionStorage.setItem('directTestingRows', this.fileRows)
            this.countryCodeDisabled = true
          } else {
            this.dialogIndex = ''
            this.$message.warning(res.data.msg)
            this.resetFrom()
          }
        })
        .catch(() => {
          this.$message.error('检测失败')
          this.resetFrom()
        })
    },
    // 缓冲后台数据读取延迟
    testingSuccess ({ runCount = 3 }) {
      console.log(runCount)
      this.timersecond = setInterval(() => {
        runCount--
        if (runCount <= 0) {
          this.dialogIndex = 2
          this.getTestProcessMobile()
          this.fileInfObj.minshow = true
          clearInterval(this.timersecond)
        }
      }, 4000)
    },
    //  200进行中，999979已完成
    getTestProcessMobile (type) {
      const testForm = new FormData()
      const fileId = this.checkId || sessionStorage.getItem('directTestingID')
      const sendID = this.sendID || sessionStorage.getItem('directTestingsendID')
      testForm.append('fileId', fileId)
      testForm.append('sendID', sendID)
      if (fileId && sendID) {
        server
          .directCheckFileProgress(testForm)
          .then((res) => {
            console.log(res)
            // debugger
            if (res.data.code === 200) {
              // 检测中
              const { testCounts = '36', fileCounts } = res.data.data || {}
              if (testCounts === '36') {
                this.mobileObj = {
                  ...res.data.data,
                  testCounts: '0',
                  stateDesc: '准备检测'
                }
              } else {
                if (testCounts === fileCounts) {
                  this.mobileObj = { ...res.data.data, stateDesc: '文件解析中' }
                } else {
                  this.mobileObj = { ...res.data.data, stateDesc: '正在检测' }
                }
              }
              if (type === 'fromMounted') {
                this.dialogIndex = 2
              }
              this.fileRows = res.data.data.fileCounts
              this.loopTestProcess(4000)
            } else if (res.data.code === 999979) {
              // 检测完成
              this.fileInfObj = {}
              this.dialogIndex = 4
              this.countryCodeDisabled = false
              sessionStorage.removeItem('directTestingID')
              sessionStorage.removeItem('directTestingsendID')
              sessionStorage.removeItem('countryCodeValue')
              sessionStorage.removeItem('directTestingRows')
              this.handleDoneDown()
            } else {
              // 检测失败
              this.dialogIndex = 0
              this.$message.warning(res.data.msg)
              this.countryCodeDisabled = false
              sessionStorage.removeItem('directTestingID')
              sessionStorage.removeItem('directTestingsendID')
              sessionStorage.removeItem('countryCodeValue')
              sessionStorage.removeItem('directTestingRows')
            }
          })
          .catch(() => {
            this.fileInfObj = {}
            this.loopTestProcess(4000)
          })
      }
    },
    // 循环数据检测进度
    loopTestProcess (times) {
      this.timersecond = setTimeout(() => {
        this.getTestProcessMobile()
      }, times)
    },
    // 完成倒计时
    handleDoneDown () {
      this.timersecond = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          clearInterval(this.timersecond)
          this.goto('/testrecord')
        }
      }, 1000)
    },
    goto (path) {
      this.$router.push({
        path: path,
        name: 'testrecord',
        params: { index: 2 }
      })
    },
    // 重置文件选择
    resetFrom () {
      this.fileObj = {}
      this.stepIndex = 0
      this.$refs.formelem.reset()
    },
    // 分片上传
    async processButtonClick (formData, index) {
      console.log(formData, index)
      var userInfo = this.getUserInfo()
      var formDatass = formData.map((v, i) => {
        if (index === i) {
          v.status = '3'
        }
        return v
      })
      console.log(Object.assign([], formDatass))
      this.fileObjList = formDatass
      uploadByPieces({
        file: formData[index],
        fileUpload: server.chunkUpload,
        mergeFile: server.uploadStatus,
        customerId: userInfo.id,
        pieceSize: 0.25,
        productCodeType: 'direct', // 0-空号检测  1-实时检测 2-国际号码检测
        success: (data) => {
          console.log('文件上传成功--------' + data)
          if (data.code === 200) {
            this.isUploadShow = false
            this.$message.success('文件上传成功')
            this.stepIndex = 3 // 立即检测
            // debugger
            this.checkId = data.data
            this.checkList.push(data.data)
            formDatass = formData.map((v, i) => {
              if (index === i) {
                v.status = '5'
                v.id = data.data
              }
              return v
            })
            this.fileObjList = formDatass
          } else {
            formDatass = formData.map((v, i) => {
              if (index === i) {
                v.status = '4'
              }
              return v
            })
            this.fileObjList = formDatass
            this.$message.error(data.msg)
            this.resetFrom()
          }
        },
        progress: (completed) => {
          console.log('分片上传进度：' + completed)
          this.isUploadShow = true // 文件上传弹窗
          // if (completed.indexOf('%') === -1) {
          //   this.uploadCompleted = completed
          // }
          this.singleProgressVal = completed
          formDatass = formData.map((v, i) => {
            if (index === i) {
              v.progress = completed
            }
            return v
          })
          this.fileObjList = formDatass
        },
        error: (e) => {
          console.log('分片上传失败' + e)
          this.isUploadShow = false
          this.$refs.directSingleFile.value = ''
          formDatass = formData.map((v, i) => {
            if (index === i) {
              v.status = '4'
              v.msg = e
            }
            this.$message.error(v.msg)
            return v
          })
          this.fileObjList = formDatass
          this.resetFrom()
        }
      })
      if (index >= formData.length - 1) {
      } else {
        setTimeout(() => {
          this.processButtonClick(formData, index + 1)
        }, 500)
      }
    },
    // 获取国码列表
    async getCountryCode () {
      var params = {}
      var { data } = await server.getCountryCode(params)
      if (data.code === 200) {
        this.countryCodeList = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    // 获取用户信息
    async getPersonalInfo () {
      var params = {}
      var { data } = await server.getPersonalInfo(params)
      if (data.code === 200) {
        this.userInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    // 获取认证信息
    async getCertifiedInfo () {
      var params = {}
      var { data } = await server.isCertified(params)
      if (data.code === 200) {
        this.isCertified = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timersecond)
    clearInterval(this.timersecond)
  }
}
</script>
<style lang="less" scoped>
.fixed-view {
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: fixed;
  background: url('../assets/index/B01.jpg') no-repeat center;
  background-size: cover;
  overflow: auto;
}

.body-regin {
  top: 20%;
  padding-top: 60px;
  position: relative;
  z-index: 1250;
}

.center-box {
  width: 700px;
  margin: 0px auto;
  text-align: center;
}

.country-code {
  margin-top: 80px;
  /deep/ .ant-select-selection--single {
    height: 50px;
    line-height: 50px;
    border-radius: 0;
  }
  /deep/ .ant-select-selection__rendered {
    line-height: 50px;
  }
  /deep/ .ant-select-selection__placeholder,
  .ant-select-search__field__placeholder {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #585f68;
  }
  /deep/ .ant-select-selection:hover,
  .ant-select-open .ant-select-selection {
    border-color: #09102c;
  }
}

.file-box {
  height: 50px;
  margin-top: 20px;
  background-color: #fff;
  position: relative;

  .file-input {
    float: left;
    line-height: 50px;
    padding: 0px 20px;
  }

  .file-butt {
    float: right;
    min-width: 140px;
    height: 50px;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    padding: 15px 20px;
    cursor: pointer;

    img {
      vertical-align: top;
      margin-right: 15px;
    }
  }

  .file-butt-select {
    background-color: #ffb03f;
  }

  .file-butt-choose {
    position: absolute;
    right: 0;
    top: 50px;
    height: 80px;
    padding: 0;
    background-color: white;
    ul {
      margin: 0;
      padding: 0;
      height: 80px;
      li {
        color: #585f68;
        height: 40px;
        line-height: 40px;
        &:first-child {
          border-bottom: 1px solid #dcdcdc;
        }
      }
    }
  }

  .file-butt-layouts {
    img {
      animation: rotate 1s linear infinite;
    }

    background-color: #999;
  }
}

.form-remark,
.form-remark1 {
  margin-top: 18px;
  color: #676e87;
  font-size: 12px;
  text-align: left;

  strong {
    color: #98abcf;
  }
}

.form-remark1 {
  margin-top: 10px;
  text-indent: 1.5em;
}

.handle-regin {
  padding-top: 50px;

  .ant-btn {
    color: #fff;
    border-radius: 0px;
    padding: 0 60px;
    transition: all 0.3s;
    background-color: #09102c;
    height: 46px;
    line-height: 46px;
    &:hover {
      color: #333;
      background-color: #fff;
      border-color: #fff;
    }
  }
}

.file-hidden {
  display: none;
}

// 基本样式
/deep/ .dialog-reset {
  .ant-modal-content {
    border: 1px solid #273b87;
    background-color: #09102c;
    box-shadow: 0px 0px 5px #273b87;
    .ant-modal-close-x {
      color: #909399;
      font-size: 14px;
    }
  }
  .ant-modal-header {
    background-color: #09102c;
    border-bottom: none;
    text-align: center;
    span {
      color: #fff;
      font-size: 26px;
    }
  }
  .ant-modal-body {
    padding: 20px 20px 30px;
    p {
      color: #fff;
      font-size: 16px;
    }
  }
  .ant-modal-footer {
    display: none;
  }
}

// 正在检测中弹窗
/deep/ .dialog-loading {
  .ant-modal {
    margin-top: 15vh;
  }
  .ant-modal-body {
    text-align: center;
    padding: 38px;
    p {
      margin-top: 15px;
    }
    img {
      animation: rotate 1s linear infinite;
    }
  }
}

// 国际号码检测进度弹窗
/deep/.dialog-conduct {
}

// 检测终止弹窗
/deep/.dialog-suspend {
  .ant-modal-content {
    margin-top: 10vh;
  }
}

// 检测完成弹窗
/deep/.dialog-success {
  text-align: center;

  h3 {
    color: #cbe1fa;
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 25px;
  }

  h4 {
    margin-bottom: 10px;
    color: rgb(230, 230, 230);

    a {
      color: #f7bd7f;
    }

    span {
      color: #f55f6a;
    }
  }
}

.conduct-scaling {
  color: #fff;
  margin-top: 15px;
  text-align: center;

  span {
    margin-right: 8px;
  }
}

.conduct-order {
  li {
    width: 33.33%;
    font-size: 12px;
    line-height: 14px;
    padding: 3px 60px;
    display: inline-block;

    i {
      float: right;
    }

    &.red {
      color: #f55f6a;
    }

    &.blue {
      color: #4b92ff;
    }

    &.gray {
      color: #888888;
    }

    &.yellow {
      color: #f3bb02;
    }
  }

  font-size: 0px;
  margin-top: 30px;
}

.conduct-remarks {
  color: #bee8fb;
  text-align: center;
  margin-top: 30px;
}

.clock {
  border-radius: 60px;
  border: 3px solid #fff;
  height: 80px;
  width: 80px;
  position: relative;
}

.clock:after {
  content: '';
  position: absolute;
  background-color: #fff;
  top: 2px;
  left: 48%;
  height: 38px;
  width: 4px;
  border-radius: 5px;
  transform-origin: 50% 97%;
  animation: grdAiguille 2s linear infinite;
}

@keyframes grdAiguille {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.clock:before {
  content: '';
  position: absolute;
  background-color: #fff;
  top: 6px;
  left: 48%;
  height: 35px;
  width: 4px;
  border-radius: 5px;
  transform-origin: 50% 94%;
  animation: ptAiguille 12s linear infinite;
}

@keyframes ptAiguille {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-regin {
  .loading1 {
    width: 148px;
    height: 148px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 148px;
    border-radius: 124px;
    margin: 16px 16px;
    background-color: rgba(17, 62, 169, 0.4);
    background-image: url(../assets/index/water.png);
    background-repeat: repeat-x;
    background-position-y: 138px;
    animation: water 2s linear infinite;
    transition: all 1s linear;
    display: inline-block;
  }

  .loading2 {
    top: 0px;
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: absolute;
    animation: rotate 1s linear infinite;
  }

  .loading3 {
    top: 0px;
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: absolute;
    animation: rotate 1.5s linear infinite;
  }

  .loading4 {
    top: 0px;
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: absolute;
    animation: rotate 2s linear infinite;
  }

  width: 180px;
  height: 180px;
  position: relative;
  margin: 0px auto;
}

@keyframes water {
  from {
    background-position-x: 0;
  }

  to {
    background-position-x: -180px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

// 多文件上传弹窗
/deep/ .dialog-batch {
  .ant-modal-wrap {
    z-index: 2000;
  }
  .ant-modal-header {
    background-color: #09102c;
    border-bottom: none;
  }
  .ant-modal-content {
    border: 1px solid #273b87;
    background-color: #09102c;
    box-shadow: 0px 0px 5px #273b87;
    .ant-modal-close-x {
      font-size: 14px;
      color: #909399;
    }
  }
  .ant-modal-title {
    text-align: center;
    span {
      color: #cde1fa;
      font-size: 20px;
    }
    .anticon-close {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 0;
      background: 0 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .ant-modal-body {
    min-height: 400px;
    .file-select {
      height: 60px;
      color: #cde1fa;
      .list1 {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        line-height: 60px;
      }
      .list2 {
        padding-top: 10px;
        h3 {
          height: 20px;
          font-size: 16px;
          font-weight: normal;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #cde1fa;
        }
        p {
          color: #8996a6;
          font-size: 12px;
          margin-top: 3px;
        }
      }
      .list3 {
        padding-top: 20px;
        text-align: right;
        /deep/ label {
          margin-left: 10px;
          color: rgb(137, 150, 166);
        }
        i {
          margin-left: 15px;
          cursor: pointer;
        }
        /deep/ .el-icon-success {
          color: #027fff;
          margin-left: 10px;
        }
        /deep/ .el-icon-loading {
          margin-right: 6px;
        }
      }
    }
    .ant-progress-inner {
      background-color: #16214d;
    }
    .add-file {
      text-align: right;
      margin-top: 20px;
      padding: 0px 20px;
      .ant-btn-primary {
        color: #6f8cff;
        border-color: #283b87;
        background-color: transparent;
      }
    }
    .upload-file {
      margin-top: 15px;
      text-align: center;
      p {
        color: #4a568a;
        margin-top: 20px;
      }
      .ant-btn-primary {
        color: #cde1fa;
        padding: 0 40px;
        border-color: #283b87;
        background-color: #283b87;
        height: 36px;
        line-height: 36px;
        text-align: center;
      }
    }
  }
  .ant-modal-footer {
    border-top: none;
    display: none;
  }
  .vue-scroll {
    max-height: 360px;
    overflow-y: scroll;
    padding-right: 20px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-button {
    background-color: #0e1c54;
  }
  ::-webkit-scrollbar-track {
    background: #0e1c54;
  }
  ::-webkit-scrollbar-thumb {
    background: #273b87;
    border-radius: 4px;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  .ant-progress-success-bg {
    background-color: #409eff;
  }
  .ant-progress-status-success .ant-progress-text {
    color: #409eff;
  }
}
// 立即上传弹窗
/deep/.dialog-confirm {
  .ant-modal-content {
    border: 1px solid #273b87;
    background-color: #09102c;
    box-shadow: 0px 0px 5px #273b87;
  }
  .ant-modal-body {
    text-align: center;
    padding: 50px 20px 50px;
    p {
      color: #fefefe;
      font-size: 16px;
      line-height: 28px;
      padding-bottom: 50px;
    }
    .ant-btn {
      color: #cde1fa;
      margin: 0px 20px;
      padding: 0 40px;
      border-color: #283b87;
      background-color: #283b87;
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
  }
  .ant-modal-footer {
    display: none;
  }
}
</style>
