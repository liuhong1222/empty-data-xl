<template>
  <!-- <div class="login-wrap"> -->
  <a-modal
    title=""
    width="320px"
    wrapClassName="loginWrap"
    :visible="modal1Visible"
    :closable="false"
    :maskClosable="false"
    :footer="null"
  >
    <a-icon @click="closelogin" class="closebtn" type="close" />
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="快捷登录" key="1">
        <a-form :form="form" class="login-form" @submit="handleSubmit">
          <a-form-item>
            <a-input
              v-decorator="['userName', userNameRules]"
              placeholder="请输入手机号"
              oninput="value=value.replace(/[^\d]/g,'')"
              @blur="checkPhone"
              ref="userNameInput"
            >
              <a-icon slot="prefix" type="mobile" />
            </a-input>
          </a-form-item>
          <a-form-item class="vertical-form" v-if="isShowVerticalCode">
            <a-input
              v-decorator="['verticalCode', verticalCodeRules]"
              placeholder="请输入图片验证码"
              ref="verInput"
            >
              <a-icon slot="prefix" type="safety-certificate" />
            </a-input>
            <div class="getVcodebtn" @click="getBase64Image">
              <img
                v-if="base64Image"
                :src="base64Image"
                alt=""
                style="margin-top: -14px; cursor: pointer"
              />
              <span v-else>获取图片验证码</span>
            </div>
          </a-form-item>
          <a-form-item class="password-form">
            <a-input
              v-decorator="['password', passwordRules]"
              placeholder="请输入验证码"
              ref="passwordInput"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
            <a-button
              class="getcodebtn"
              :class="{ 'is-disabled': waitingtime }"
              type="link"
              @click="showSlide"
              >{{ waitingtime ? `${waitingtime}秒后可重发` : '获取验证码' }}
            </a-button>
          </a-form-item>
          <a-form-item class="button-form">
            <a-button
              :disabled="submitLoading"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              {{ submitLoading ? '处理中...' : '登录' }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="微信登录" key="2" v-if="false">
        <div id="qrcode"></div>
        <p class="weixin-remarks">微信扫一扫即可登录</p>
      </a-tab-pane>
      <a-tab-pane tab="账号登录" key="3">
        <a-form :form="userform" class="login-form" @submit="userhandleSubmit">
          <a-form-item>
            <a-input
              v-decorator="['userName', userNameRules]"
              placeholder="请输入账号/手机号/邮箱"
              ref="userNameInput"
            >
              <a-icon slot="prefix" type="mobile" />
            </a-input>
          </a-form-item>
          <a-form-item class="password-form">
            <a-input
              type="password"
              v-decorator="['password', userpasswordRules]"
              placeholder="请输入密码"
              ref="passwordInput"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <div class="forgetpassword" v-if="false">
            <a-button type="link" @click="forgotPwd">忘记密码</a-button>
          </div>
          <a-form-item class="button-form">
            <a-button
              :disabled="submitLoading"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              {{ submitLoading ? '处理中...' : '登录' }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
import server from '../server/index'

export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      waitingtime: 0,
      modal1Visible: false,
      form: this.$form.createForm(this, { name: 'normal_login' }),
      userform: this.$form.createForm(this, { name: 'user_login' }),
      base64Image: '',
      verifyToken: '',
      verifysmstoken: '',
      isShowVerticalCode: false,
      userNameRules: {
        rules: [
          {
            required: true,
            message: '请输入手机号'
          }
        ]
      },
      passwordRules: {
        rules: [
          {
            required: true,
            message: '请输入验证码'
          }
        ]
      },
      userpasswordRules: {
        rules: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      },
      verticalCodeRules: {
        rules: [
          {
            required: true,
            message: '请输入图片验证码'
          }
        ]
      },
      submitLoading: false
    }
  },
  mounted () {
    this.$root.$on('showlogin', this.setModal1Visible)
  },
  methods: {
    forgotPwd () {},
    isPhone (value) {
      const re = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (re.test(value)) {
        return true
      }
      return false
    },
    checkPhone () {
      var phone = this.form.getFieldValue('userName')
      if (!phone) {
        this.$message.error('请输入手机号码')
        return
      }
      if (!this.isPhone(phone)) {
        this.$message.error('手机号码格式不正确')
      }
    },
    showSlide () {
      if (this.waitingtime) return
      var phone = this.form.getFieldValue('userName')
      if (!phone) {
        this.$message.error('请输入手机号码')
        return
      }
      if (!this.isPhone(phone)) {
        this.$message.error('手机号码格式不正确')
        return
      }
      this.captChaClick()
    },
    // 定义验证码触发事件
    captChaClick () {
      try {
        // 生成一个验证码对象
        // CaptchaAppId：登录验证码控制台，从【验证管理】页面进行查看。如果未创建过验证，请先新建验证。注意：不可使用客户端类型为小程序的CaptchaAppId，会导致数据统计错误。
        // captChaCallback：定义的回调函数
        // 创蓝图文验证码：
        // appId：pa1Ji2dT
        // appKey：U82xVQXX
        // CaptchaAppId：199229427
        // AppSecretKey：0qSrQXgWWKWyHxZjEC1LG9XsH
        var captcha = new window.TencentCaptcha('199229427', this.captChaCallback, {})
        // 调用方法，显示验证码
        captcha.show()
      } catch (error) {
        // 加载异常，调用验证码js加载错误处理函数
        this.loadErrorCallback()
      }
    },
    // 定义验证码js加载错误处理函数
    loadErrorCallback () {
      var appid = 'pa1Ji2dT'
      // 生成容灾票据或自行做其它处理
      var ticket = 'terror_1001_' + appid + Math.floor(new Date().getTime() / 1000)
      this.captChaCallback({
        ret: 0,
        randstr: '@' + Math.random().toString(36).substr(2),
        ticket,
        errorCode: 1001,
        errorMessage: 'jsload_error'
      })
    },
    // 定义回调函数
    captChaCallback (res) {
      // 第一个参数传入回调结果，结果如下：
      // ret         Int       验证结果，0：验证成功。2：用户主动关闭验证码。
      // ticket      String    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
      // CaptchaAppId       String    验证码应用ID。
      // bizState    Any       自定义透传参数。
      // randstr     String    本次验证的随机串，后续票据校验时需传递该参数。
      // console.log('callback:', res)
      if (res.ret === 0 && res.randstr && res.ticket) {
        this.sendSmsAndVerifyJyCode(res.randstr, res.ticket)
      }
    },
    async sendSmsAndVerifyJyCode (randStr, ticket) {
      var params = {
        code: this.form.getFieldValue('verticalCode'),
        verifyToken: this.verifyToken,
        phone: this.form.getFieldValue('userName'),
        randStr: randStr,
        ticket: ticket
      }
      var result = await server.sendSmsAndVerifyJyCode(params)
      var { data } = result
      if (data.code === 200) {
        this.countdown()
        this.verifysmstoken = result.headers.verifysmstoken
        this.$message.success('获取验证码成功')
      } else if (data.code === 5107) {
        this.isShowVerticalCode = true
        this.getBase64Image()
        this.captChaClick() // 触发验证码滑块
      } else {
        this.$message.error(data.msg)
      }
    },
    async getBase64Image () {
      var params = {}
      var { data } = await server.getBase64Image(params)
      if (data.code === 200) {
        this.base64Image = data.data.image
        this.verifyToken = data.data.verifyToken
      } else {
        this.$message.error(data.msg)
      }
    },
    countdown () {
      if (this.waitingtime === 0) {
        this.waitingtime = 60
      } else {
        this.waitingtime--
      }

      this.timer = setInterval(() => {
        this.waitingtime--
        if (this.waitingtime <= 0) {
          this.waitingtime = 0
          clearInterval(this.timer)
        }
      }, 1e3)
    },
    setModal1Visible (modal1Visible) {
      this.modal1Visible = modal1Visible
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        // console.log(values)
        if (!this.verifysmstoken) {
          this.$message.error('请点击获取验证码')
          return
        }
        if (!err) {
          this.submitLoading = true
          var params = {
            phone: this.form.getFieldValue('userName'),
            code: this.form.getFieldValue('password'),
            verifySmsToken: this.verifysmstoken
          }
          // if (this.isShowVerticalCode) {
          //   params.verifySmsToken = this.verifysmstoken
          // }
          var { data } = await server.userLogin(params)
          // debugger
          if (data.code === 200) {
            var token = data.data.token || ''
            var customer = data.data.customer || {}
            this.setSessionToken(token)
            this.setUserInfo(customer)
            this.showAgreement()
            // window.location.reload()
            window.location.href = '/empty'
          } else {
            this.$message.error(data.msg)
          }
          this.submitLoading = false
        }
      })
    },
    userhandleSubmit (e) {
      e.preventDefault()
      this.userform.validateFields(async (err, values) => {
        // console.log(values)
        if (!err) {
          this.submitLoading = true
          var params = {
            username: this.userform.getFieldValue('userName'),
            password: this.userform.getFieldValue('password')
          }
          var { data } = await server.login(params)
          // debugger
          if (data.code === 200) {
            var token = data.data.token || ''
            var customer = data.data.customer || {}
            this.setSessionToken(token)
            this.setUserInfo(customer)
            this.showAgreement()
            // window.location.reload()
            window.location.href = '/empty'
          } else {
            this.$message.error(data.msg)
          }
          this.submitLoading = false
        }
      })
    },
    showAgreement () {
      sessionStorage.setItem('isShowAgreement', 'true')
    },
    closelogin () {
      this.setModal1Visible(false)
    }
  }
}
</script>
<style lang="less">
#qrcode {
  width: 280px;
  height: 200px;
  background-color: #939599;
}

.forgetpassword {
  text-align: right;
}

.weixin-remarks {
  text-align: center;
}

.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.ant-tabs-content {
  height: auto;
}

.login-form {
  padding-top: 20px;

  .ant-input {
    // padding-right: 100px;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    border: 0;
    border-bottom: 1px solid #40a9ff !important;
    border-radius: 0;

    &:focus {
      border-bottom: 1px solid #40a9ff !important;
      box-shadow: none;
    }

    &:hover {
      border-bottom: 1px solid #40a9ff !important;
      box-shadow: none;
    }
  }

  .ant-input-affix-wrapper .ant-input-prefix {
    font-size: 20px;
    left: 1px;
  }

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 32px;
  }

  .login-form-button {
    width: 100%;
    margin-top: 24px;
    background-color: #3a7cff;
    height: 40px;
  }

  .ant-form-explain {
    padding-left: 32px;
  }

  .has-error .ant-form-explain,
  .has-error .ant-form-split {
    color: #f56c6c;
  }

  .has-error .ant-input-affix-wrapper .ant-input,
  .has-error .ant-input-affix-wrapper .ant-input:hover {
    border-color: #dcdee2;
  }

  .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
    border-color: #dcdee2;
  }

  .password-form {
    position: relative;
  }

  .vertical-form {
  }

  .button-form {
    margin-bottom: 0;
  }

  .getcodebtn {
    position: absolute;
    right: 0;
    top: -6px;
    line-height: 32px;
  }

  .getVcodebtn {
    position: absolute;
    right: 0;
    top: -6px;
    line-height: 32px;

    & > span {
      cursor: pointer;
      color: #1890ff;
    }
  }

  .ant-btn-link.is-disabled,
  .ant-btn-link.is-disabled:focus,
  .ant-btn-link.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
}

.has-error .ant-input-affix-wrapper .ant-input:focus {
  box-shadow: none;
}

@media (min-width: 769px) {
  .loginWrap {
    /*top: 15%;*/
    left: 64% !important;
    /*position: absolute;*/
  }
}
@media (max-width: 768px) {
  .loginWrap {
  }
}
</style>
