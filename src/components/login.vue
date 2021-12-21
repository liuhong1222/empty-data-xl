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
    <div class="slideverify" v-show="isShowSlide" @mouseleave="hideSlide">
      <slide-verify
        ref="slideblock"
        @success="sendSmsAndVerifyJyCode"
      ></slide-verify>
    </div>
  </a-modal>
  <!-- </div> -->
</template>
<script>
import server from '../server/index'
import SlideVerify from './slideVerify'

export default {
  name: 'login',
  components: {
    SlideVerify
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
      isShowSlide: false,
      submitLoading: false
    }
  },
  mounted () {
    this.$root.$on('showlogin', this.setModal1Visible)
  },
  methods: {
    hideSlide () {
      setTimeout(() => {
        this.isShowSlide = false
        this.$refs.slideblock.onReset() // 重置滑块
      }, 500)
    },
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
      this.isShowSlide = true
    },
    async sendSmsAndVerifyJyCode () {
      var params = {
        code: this.form.getFieldValue('verticalCode'),
        verifyToken: this.verifyToken,
        phone: this.form.getFieldValue('userName')
      }
      var result = await server.sendSmsAndVerifyJyCode(params)
      var { data } = result
      if (data.code === 200) {
        this.countdown()
        this.verifysmstoken = result.headers.verifysmstoken
        this.$message.success('获取验证码成功')
        // todo
      } else if (data.code === 5107) {
        this.isShowVerticalCode = true
        this.getBase64Image()
        this.isShowSlide = true
        // console.log(this.isShowSlide)
      } else {
        this.$message.error(data.msg)
      }
      this.isShowSlide = false // 隐藏滑块
      this.$refs.slideblock.onReset() // 重置滑块
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
.slideverify {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000000000;
}
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
