<template>
  <a-modal
    class="changephone"
    title=""
    style="top: 15%;height: 502px"
    width="440px"
    :visible="modal1Visible"
    :closable="false"
    :maskClosable="false"
    :footer="null"
  >
    <a-icon @click="closelogin" class="closebtn" type="close"/>
    <div class="el-dialog__header">
      <span class="el-dialog__title">重新绑定手机号</span>
    </div>
    <a-form :form="form">
      <a-form-item label="原手机号">
      <span class="ant-form-text">
        {{phone}}
      </span>
      </a-form-item>
      <a-form-item
        label="短信验证码"
        style="margin-bottom:0;"
        class="codeInput"
        required
      >
        <a-form-item :style="{ display: 'inline-block', width: '50%' }">
          <a-input style="width: 100%" @blur="checkOldPhone" v-decorator="[ 'code', codeRules]"/>
        </a-form-item>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' ,marginLeft: '10px'}">
          <button data-v-bfb0dc60="" type="button" class="el-button cl-code-butt el-button--primary is-plain"
                  @click="getoldcode">
            <span>{{waitingtime ?
              `${waitingtime}秒后可重发`: '获取验证码'}}</span></button>
        </a-form-item>
      </a-form-item>
      <a-form-item
        label="新手机号"
        class="newphone"
      >
        <a-input style="width: 100%" v-decorator="[ 'newPhone', newPhoneRules]" :disabled="notChange"/>
      </a-form-item>
      <a-form-item
        label="短信验证码"
        style="margin-bottom:0;"
        class="codeInput"
        required
      >
        <a-form-item :style="{ display: 'inline-block', width: '50%'}">
          <a-input style="width: 100%" @blur="checkNewPhone" v-decorator="[ 'newCode', newCodeRules]"/>
        </a-form-item>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)',marginLeft: '10px'  }">
          <button data-v-bfb0dc60="" type="button" class="el-button cl-code-butt el-button--primary is-plain"
                  @click="getcode1">
            <span>{{waitingtime1 ?
              `${waitingtime1}秒后可重发`: '获取验证码'}}</span></button>
        </a-form-item>
      </a-form-item>
      <a-form-item class="vertical-form" v-if="isShowVerticalCode" label="图片验证码">
        <a-input
          style="display: inline-block;"
          v-decorator="[ 'imageCode', imageCodeRules]"
          placeholder="请输入"
          ref="verInput">
        </a-input>
        <div class="getVcodebtn" @click="getBase64Image">
          <img v-if="base64Image" :src="base64Image" alt="" style="margin-top: -6px;cursor: pointer">
          <span v-else>获取图片验证码</span>
        </div>
      </a-form-item>
      <a-form-item class="changephonebtn">
        <button :disabled="submitLoading" type="button" class="el-button cl-submit-butt el-button--primary" @click="handleSubmit">
          <span>{{ submitLoading ? '处理中...' : '确定' }}</span>
        </button>
      </a-form-item>
    </a-form>
    <div class="form-tips">提示：根据《网络安全法》相关规定，请个人认证用户绑定与认证信息匹配的手机号。</div>
  </a-modal>
</template>
<script>
import server from '../server/index'

export default {
  name: 'login',
  data () {
    return {
      imageCode1: '',
      verifyToken1: '',
      base64Image1: '',
      isShowOldVerticalCode: false,
      imageCode: '',
      verifyToken: '',
      base64Image: '',
      isShowVerticalCode: false,
      waitingtime: 0,
      waitingtime1: 0,
      modal1Visible: false,
      form: this.$form.createForm(this, {name: 'normal_login'}),
      codeRules: {
        rules: [{
          required: true, message: '请输入验证码'
        }]
      },
      newPhoneRules: {
        rules: [{
          required: true, message: '请输入新手机号'
        }]
      },
      newCodeRules: {
        rules: [{
          required: true, message: '请输入验证码'
        }]
      },
      imageCodeRules: {
        rules: [{
          required: true, message: '请输入'
        }]
      },
      notChange: false, // 能否修改新手机号
      submitLoading: false
    }
  },
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$root.$on('showlogin', this.setModal1Visible)
  },
  methods: {
    async getoldcode () {
      if (this.waitingtime !== 0) return
      if (!this.phone) return
      var params = {
        phone: this.phone
      }
      var {data} = await server.sendSms(params)
      if (data.code === 200) {
        this.verifyToken = data.data
        this.countdown()
        this.$message.success('获取验证码成功')
      } else {
        this.$message.error(data.msg)
      }
    },
    async getcode1 () {
      if (this.waitingtime1 !== 0) return
      if (!this.form.getFieldValue('newPhone').trim()) return
      var params = {
        phone: this.form.getFieldValue('newPhone').trim()
      }
      var {data} = await server.sendSms(params)
      if (data.code === 200) {
        this.verifyToken1 = data.data
        this.countdown1()
        this.$message.success('获取验证码成功')
        this.notChange = true
      } else {
        this.$message.error(data.msg)
      }
    },
    async getBase64Image () {
      var params = {}
      var {data} = await server.getBase64Image(params)
      if (data.code === 200) {
        this.base64Image1 = data.data.image
        this.verifyToken1 = data.data.verifyToken
      } else {
        this.$message.error(data.msg)
      }
    },
    async checkOldPhone () {
      var code = this.form.getFieldValue('code')
      if (!code || !this.verifyToken) return
      var params = {
        verifyToken: this.verifyToken,
        code: this.form.getFieldValue('code')
      }
      var {data} = await server.verifySmsCode(params)
      if (data.code === 200) {
        this.countdown()
        this.$message.success('验证成功')
      } else {
        this.$message.error(data.msg)
      }
    },
    async checkNewPhone () {
      var code = this.form.getFieldValue('newCode')
      if (!code || !this.verifyToken) return
      var params = {
        verifyToken: this.verifyToken,
        code: this.form.getFieldValue('code')
      }
      var {data} = await server.verifySmsCode(params)
      if (data.code === 200) {
        this.countdown1()
        this.$message.success('验证成功')
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
    countdown1 () {
      if (this.waitingtime1 === 0) {
        this.waitingtime1 = 60
      } else {
        this.waitingtime1--
      }

      this.timer1 = setInterval(() => {
        this.waitingtime1--
        if (this.waitingtime1 <= 0) {
          this.waitingtime1 = 0
          clearInterval(this.timer1)
        }
      }, 1e3)
    },
    setModal1Visible (modal1Visible) {
      this.modal1Visible = modal1Visible
      this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.submitLoading = true
          var params = {
            newCode: values.newCode,
            newPhone: values.newPhone.trim(),
            newVerifyToken: this.verifyToken1,
            oldCode: values.code,
            oldPhone: this.phone,
            oldVerifyToken: this.verifyToken
          }
          var {data} = await server.modifyMobile(params)
          this.submitLoading = false
          if (data.code === 200) {
            this.$message.success('手机号修改成功，稍后重新登录')
            this.logout()
          } else {
            this.$message.error(data.msg)
          }
        }
      })
    },
    async logout () {
      var params = {}
      var {data} = await server.logout(params)
      if (data.code === 200) {
        this.setSessionToken('')
        this.setUserInfo('')
        setTimeout(() => {
          this.$router.push('/')
          window.location.reload()
        }, 2500)
      } else {
        this.$message.error(data.msg)
      }
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

  .weixin-remarks {
    text-align: center;
  }

  .closebtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .changephone {
    .el-dialog__header {
      text-align: center;
      padding-top: 35px;
    }

    .el-dialog__header {
      padding: 5px 20px 25px;
    }

    .el-dialog__title {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
    }

    .form-tips {
      color: #999;
      padding-left: 15px;
      padding-bottom: 10px;
    }

    .ant-row {
      display: flex;
    }

    .ant-form-item-label {
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
      width: 130px;
    }

    .ant-form-item-control {
      line-height: 40px;
      position: relative;
      font-size: 14px;
    }

    .ant-input {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: 135px;
    }

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

    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }

    .el-button--primary.is-plain {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }

    .el-form-item .cl-code-butt {
      float: right;
      width: 120px;
      padding-left: 0;
      padding-right: 0;
    }

    .codeInput > .ant-form-item-control-wrapper {
      width: 270px;
    }

    .newphone > .ant-form-item-control-wrapper {
      width: 258px;
    }

    .changephonebtn button {
      width: 110px;
      height: 40px;
      margin-left: 130px;
    }
  }

  .getVcodebtn {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
  }
</style>
