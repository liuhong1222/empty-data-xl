<template>
  <a-modal
    class="changePwd"
    title=""
    style="top: 15%;height: 502px"
    width="440px"
    :visible="modal1Visible"
    :closable="false"
    :maskClosable="false"
    :footer="null"
    @cancel="cancelHandler"
  >
    <a-icon @click="closelogin" class="closebtn" type="close"/>
    <div class="el-dialog__header">
      <span class="el-dialog__title">设置解压密码</span>
    </div>
    <a-form
      :form="form">
      <a-form-item
        label="密码"
        class="newphone"
      >
        <a-input style="width: 100%" v-decorator="[ 'userName', userNameRules]"/>
      </a-form-item>
      <div class="nuzip-tips">注：解压密码设置完成之后，您的检测结果将需该密码解压才能打开查看，请您牢记您的密码，以免无法查看检测结果。</div>
      <a-form-item class="changephonebtn">
        <button type="button" class="el-button cl-submit-butt el-button--primary" @click="handleSubmit"><span>确定</span>
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
    return {
      modal1Visible: false,
      form: this.$form.createForm(this, {name: 'normal_pwd'}),
      userNameRules: {
        rules: [{
          required: true, message: '请输入'
        }]
      }
    }
  },
  methods: {
    cancelHandler () {
      this.setModal1Visible(false)
    },
    setModal1Visible (modal1Visible) {
      this.modal1Visible = modal1Visible
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err) => {
        if (!err) {
          var userInfo = this.getUserInfo()
          var params = {
            customerId: userInfo.id,
            password: this.form.getFieldValue('userName')
          }
          console.log(this.form.getFieldValue('userName'))
          var {data} = await server.unzipPassword(params)
          if (data.code === 200) {
            this.setModal1Visible = false
          } else {
            this.$message.error(data.msg)
          }
        }
      })
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

  .login-form {
    padding: 20px 0;

    .ant-input {
      padding-right: 100px;
      display: inline-block;
      line-height: 40px;
      height: 40px;
      border: 0;
      border-bottom: 1px solid #dcdee2;
      border-radius: 0;

      &:focus {
        border-bottom: 1px solid #dcdee2;
        box-shadow: none;
      }

      &:hover {
        border-bottom: 1px solid #dcdee2;
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

    .has-error .ant-form-explain, .has-error .ant-form-split {
      color: #f56c6c;
    }

    .has-error .ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper .ant-input:hover {
      border-color: #dcdee2;
    }

    .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
      border-color: #dcdee2;
    }

    .password-form {
      position: relative;
    }

    .getcodebtn {
      position: absolute;
      right: 0;
      top: -6px;
    }

    .ant-btn-link.is-disabled, .ant-btn-link.is-disabled:focus, .ant-btn-link.is-disabled:hover {
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
      width: 300px;
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
