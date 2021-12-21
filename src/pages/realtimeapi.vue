<template>
  <section class="view-regin">
    <div class="banner-view"></div>
    <div class="emptyapi-wrap">
      <div class="default-width info-regin">
        <div class="info-list">
          <h2>基本信息</h2>
          <div>当前余额（条）</div>
          <h3>{{ personalInfo.realtimeBalance | thousandbit }}</h3>
          <a-button
            size="small"
            class="button-recharge"
            type="danger"
            @click="$router.push('/recharge')"
          >
            <img
              src="../assets/index/chongzhi.png"
              alt=""
              srcset=""
              style="vertical-align: top"
            />
            <span style="font-size: 14px; margin-left: 6px; line-height: 18px"
              >充值</span
            >
          </a-button>
        </div>
        <div class="info-list">
          <h2>API接口</h2>
          <div style="margin-bottom: 20px">
            API账号：{{ findAccountInfo.name }}
          </div>
          <div style="margin-bottom: 20px">
            <span>API密码：</span>
            <div class="eyes-box" v-if="eyesbool">
              {{ findAccountInfo.password
              }}<img @click="eyesButt" src="../assets/index/closeEye.png" />
            </div>
            <div class="eyes-box" v-else>
              <span>************</span
              ><img @click="eyesButt" src="../assets/index/eyes.png" />
            </div>
          </div>
          <a-button
            size="small"
            class="button-recharge"
            type="primary"
            @click="downloadDoc"
          >
            <img
              src="../assets/index/xiqazai.png"
              alt=""
              srcset=""
              style="vertical-align: top"
            />
            <span style="font-size: 14px; margin-left: 6px; line-height: 18px"
              >对接文档</span
            >
          </a-button>
        </div>
      </div>
      <div class="default-width test-regin">
        <div class="test-wrap">
          <a-form-model
            ref="form"
            :model="formTest"
            :rules="rulesTest"
            style="width: 35%; margin-right: 15px"
          >
            <p style="margin-bottom: 15px">在线检测</p>
            <a-form-model-item prop="mobiles">
              <a-input
                type="textarea"
                :rows="5"
                v-model="formTest.mobiles"
                placeholder="请输入手机号码"
              ></a-input>
              <p style="line-height: 18px; margin-top: 10px">
                注:仅支持单个号码，不要有空格（否则无效）
              </p>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                ref="testBtn"
                type="primary"
                @click="testChecking($event)"
                :loading="testLoading"
                >测试</a-button
              >
            </a-form-model-item>
          </a-form-model>
          <testdialog-view
            :data="testResList"
            ref="testdialog"
            :historyRef="$refs['historyRef']"
          ></testdialog-view>
        </div>
        <div class="test-line"></div>
      </div>
      <div class="default-width history-regin">
        <h2>检测结果</h2>
        <history-view
          ref="historyRef"
          :historyUrl="'realtimeApiTestRecord'"
          :columns="columns"
        ></history-view>
      </div>
    </div>
  </section>
</template>
<script>
import server from '../server/index'
import historyView from '../components/emptyapi/history.vue'
import testdialogView from '../components/emptyapi/testdialog'
export default {
  data () {
    return {
      eyesbool: false,
      formTest: {
        mobiles: ''
      },
      rulesTest: {
        mobiles: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1[0-9]{10}(,1[0-9]{10}){0,49}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      testResList: {},
      testLoading: false,
      personalInfo: {}, // 取余额
      findAccountInfo: {
        // API接口
        name: '',
        password: ''
      },
      columns: [
        {
          title: '手机号',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          width: '10%'
        },
        {
          title: '日期',
          dataIndex: 'createTime',
          width: '10%'
        },
        {
          title: '正常',
          dataIndex: 'normal',
          width: '6%',
          customRender: (text) => text || 0
        },
        {
          title: '正常(携号转网)',
          dataIndex: 'numberPortability',
          width: '10%',
          customRender: (text) => text || 0
        },
        {
          title: '空号',
          dataIndex: 'empty',
          width: '6%',
          customRender: (text) => text || 0
        },
        {
          title: '通话中',
          dataIndex: 'onCall',
          width: '8%',
          customRender: (text) => text || 0
        },
        {
          title: '不在网(空号)',
          dataIndex: 'onlineButNotAvailable',
          width: '10%',
          customRender: (text) => text || 0
        },
        {
          title: '关机',
          dataIndex: 'shutdown',
          width: '6%',
          customRender: (text) => text || 0
        },
        {
          title: '疑似关机',
          dataIndex: 'suspectedShutdown',
          width: '8%',
          customRender: (text) => text || 0
        },
        {
          title: '停机',
          dataIndex: 'serviceSuspended',
          width: '6%',
          customRender: (text) => text || 0
        },
        {
          title: '号码错误',
          dataIndex: 'unknown',
          width: '8%',
          customRender: (text) => text || 0
        },
        {
          title: '未知',
          dataIndex: 'exceptionFailCount',
          width: '6%',
          customRender: (text) => text || 0
        }
      ]
    }
  },
  components: {
    historyView,
    testdialogView
  },
  mounted () {
    this.getCertifiedInfo()
    this.getPersonalInfo()
    this.getApiSettings()
  },
  computed: {},
  filters: {
    thousandbit (value = '0') {
      return String(value).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
    }
  },
  methods: {
    // 获取认证信息
    async getCertifiedInfo () {
      var params = {}
      var { data } = await server.isCertified(params)
      if (data.code === 200) {
        this.isCertified = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    // 获取用户信息
    async getPersonalInfo () {
      var params = {}
      var { data } = await server.getPersonalInfo(params)
      if (data.code === 200) {
        this.personalInfo = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    // 获取api接口信息
    async getApiSettings () {
      var userInfo = this.getUserInfo()
      var params = {
        customerId: userInfo.id
      }
      var { data } = await server.apiSettings(params)
      if (data.code === 200) {
        this.findAccountInfo.name = data.data.appId
        this.findAccountInfo.password = data.data.appKey
      } else {
        this.$message.error(data.msg)
      }
    },
    eyesButt () {
      this.eyesbool = !this.eyesbool
    },
    downloadDoc () {
      window.location.href = this.downloadDomain + '/pdf/号码状态接口文档.pdf'
    },
    testChecking (event) {
      // 1.登录 2.认证 3.余额
      // 先判断是否登录
      // debugger
      if (!this.getSessionToken()) {
        event.preventDefault()
        this.$root.$emit('showlogin', true)
        return false
      }

      // 判断是否认证
      if (!this.isCertified) {
        if (this.personalInfo.authenticationLimitLevel === 1) {
          event.preventDefault()
          this.$root.$emit('showCertification', {
            source: { url: 'emptyapi', type: 'testBtn' },
            flag: true
          })
        } else if (this.personalInfo.authenticationLimitLevel === 2) {
          event.preventDefault()
          this.$root.$emit('showCertification', {
            source: { url: 'emptyapiNot', type: 'testBtn' },
            flag: true
          })
        } else {
          this.$message.error('请先完成认证')
          return false
        }
        // 判断是否有余额
        if (
          !this.personalInfo.realtimeBalance ||
          this.personalInfo.realtimeBalance === '0'
        ) {
          event.preventDefault()
          this.$message.error('余额不足')
          return
        }
        this.$root.$on('closeCertification', this.dealCertification)
      } else {
        // 判断是否有余额
        if (
          !this.personalInfo.realtimeBalance ||
          this.personalInfo.realtimeBalance === '0'
        ) {
          event.preventDefault()
          this.$message.error('余额不足')
          return
        }
        this.testSubmit()
      }
    },
    // 暂不认证后处理
    dealCertification ({ source, flag }) {
      // console.log(source, flag)
      if (source === 'certification' && flag === true) {
        this.testSubmit()
      }
    },
    testSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.testLoading = true
          this.testAjax()
        }
      })
    },
    testAjax () {
      const testForm = new FormData()
      testForm.append('mobile', this.formTest.mobiles)
      server
        .realtimeApiTest(testForm)
        .then((res) => {
          this.testLoading = false
          this.testResList = res.data || {}
          this.$refs.testdialog.visible = true
        })
        .catch(() => {
          this.testLoading = false
          this.$message.error('检测失败')
        })
    }
  }
}
</script>
<style lang="less" scoped>
.view-regin {
  overflow: hidden;
  background-color: #f1f1f1;
}
.banner-view {
  height: 530px;
  min-width: 1000px;
  background: url('../assets/index/realtimeAPI.jpg') no-repeat center;
  background-size: cover;
}
.emptyapi-wrap {
  width: 1200px;
  margin: 0 auto;
}
.button-recharge {
  padding: 9px 15px;
  height: 38px;
}
.info-regin {
  padding: 20px 30px 50px;
  margin-top: 35px;
  margin-bottom: 35px;
  background-color: #fff;
  color: #585f68;

  .info-list {
    h2 {
      font-size: 14px;
      font-weight: normal;
      padding-bottom: 30px;
    }
    h3 {
      height: 60px;
      font-size: 24px;
      font-weight: normal;
      line-height: 60px;
    }

    vertical-align: top;
    display: inline-block;

    &:first-child {
      width: 380px;
    }
  }

  .eyes-box {
    img {
      margin-left: 15px;
      vertical-align: top;
      cursor: pointer;
    }
    display: inline-block;
  }
}

.test-regin {
  margin-top: 35px;
  padding: 20px 30px;
  background-color: #fff;
  position: relative;
  .test-line {
    border: 1px solid #d9d9d9;
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 36%;
  }
}

.test-wrap {
  display: flex;
}

.history-regin {
  margin-top: 35px;
  margin-bottom: 35px;
  background-color: #fff;
  overflow: hidden;
  padding: 20px 30px;
}

.default-width {
  h2 {
    font-size: 14px;
    font-weight: normal;
    padding-bottom: 30px;
  }
}
</style>
