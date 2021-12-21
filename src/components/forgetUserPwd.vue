<template>
  <a-modal
    class="changePwd"
    title=""
    style="top: 15%; height: 502px"
    width="440px"
    :visible="modal1Visible"
    :closable="false"
    :maskClosable="false"
    :footer="null"
    @cancel="cancelHandler"
  >
    <a-icon @click="closelogin" class="closebtn" type="close" />
    <div class="el-dialog__header">
      <span class="el-dialog__title">忘记登录密码</span>
    </div>
    <a-form :form="form" class="forget-form">
      <a-form-item class="newphone">
        <a-input
          placeholder="手机号（登录时使用的手机号码）"
          style="width: 100%"
          oninput="value=value.replace(/[^\d]/g,'')"
          v-decorator="['phone', phoneRules]"
        />
      </a-form-item>
      <a-form-item class="newphone">
        <a-input
          placeholder="验证码"
          style="width: 60%"
          v-decorator="['code', codeRules]"
        />
        <a-button
          class="getcode-btn"
          :class="{ 'is-disabled': waitingtime }"
          type="button"
          @click="getCode"
        >
          {{ waitingtime ? `${waitingtime}秒后可重发` : '获取验证码' }}
        </a-button>
      </a-form-item>
      <a-form-item class="newphone">
        <a-input
          type="password"
          placeholder="请输入新密码"
          style="width: 100%"
          v-decorator="['newpassword', newpasswordRules]"
        />
      </a-form-item>
      <a-form-item class="changephonebtn">
        <button
          :disabled="submitLoading"
          type="button"
          class="el-button cl-submit-butt el-button--primary"
          @click="handleSubmit"
        >
          <span>{{ submitLoading ? '处理中...' : '确定' }}</span>
        </button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import server from '../server/index'

export default {
  name: 'login',
  data () {
    // 校验手机号是否有误
    var validatePhone = async (rule, value, callback) => {
      // console.log(value)
      if (value === this.phone) {
        callback()
      } else {
        callback(new Error('手机号输入有误'))
      }
    }
    // 校验验证码是否有误
    var validateCode = async (rule, value, callback) => {
      // console.log(value)
      const params = {
        code: value,
        verifyToken: this.verifyToken
      }
      var result, data
      if (value.length === 6) {
        result = await server.checkCode(params)
        data = result.data
        if (data.code === 200) {
          callback()
        } else {
          callback(new Error('验证码输入有误'))
        }
      } else {
        callback(new Error('请输入正确的验证码'))
      }
    }
    return {
      modal1Visible: false,
      form: this.$form.createForm(this, { name: 'normal_pwd' }),
      phoneRules: {
        rules: [
          { required: true, message: '请输入手机号' },
          { validator: validatePhone }
        ]
      },
      codeRules: {
        rules: [
          { required: true, message: '请输入验证码' },
          { validator: validateCode }
        ]
      },
      newpasswordRules: {
        rules: [
          {
            required: true,
            message: '请输入新密码'
          }
        ]
      },
      waitingtime: 0,
      verifyToken: '',
      submitLoading: false
    }
  },
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 获取验证码
    async getCode () {
      if (this.waitingtime !== 0) return
      const phone = this.form.getFieldValue('phone')
      if (!phone) {
        this.$message.error('请先输入手机号')
        return
      }
      var params = {
        phone: phone
      }
      var { data } = await server.sendSms(params)
      if (data.code === 200) {
        this.verifyToken = data.data
        this.countdown()
        this.$message.success('获取验证码成功')
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
    cancelHandler () {
      this.setModal1Visible(false)
    },
    setModal1Visible (modal1Visible) {
      this.modal1Visible = modal1Visible
      this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err) => {
        if (!err) {
          this.submitLoading = true
          var result, data
          const params = {
            // customerId: userInfo.id,
            phone: this.form.getFieldValue('phone'),
            code: this.form.getFieldValue('code'),
            password: this.form.getFieldValue('newpassword'),
            verifySmsToken: this.verifyToken
          }
          // console.log(params)
          result = await server.forgetPassword(params)
          this.submitLoading = false
          data = result.data
          if (data.code === 200) {
            this.closelogin()
            this.$emit('changeUserPwdFlag')
            // 重新登录
            this.logout()
          } else {
            this.$message.error(data.msg)
          }
        }
      })
    },
    async logout () {
      var params = {}
      var { data } = await server.logout(params)
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
.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.forget-form {
  padding: 20px 0;

  .ant-input {
    // padding-right: 100px;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    border: 0;
    // border-bottom: 1px solid #40a9ff;
    border-radius: 0;

    &:focus {
      // border-bottom: 1px solid #40a9ff;
      box-shadow: none;
    }

    &:hover {
      // border-bottom: 1px solid #40a9ff;
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

  .forget-form-button {
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

  .getcode-btn {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    width: calc(40% - 12px);
    height: 42px;
    margin-left: 10px;
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

.changePwd {
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
    width: 80px;
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
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
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
    transition: 0.1s;
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
    width: 100%;
  }

  .newphone > .ant-form-item-control-wrapper {
    width: 100%;
  }

  .changephonebtn button {
    width: 110px;
    height: 40px;
    margin-left: 146px;
  }

  .changephonebtn {
    margin-bottom: 0;
  }

  .nuzip-tips {
    color: #999;
    font-size: 12px;
    line-height: 20px;
    padding: 20px;
  }
}
</style>
