<template>
  <a-modal
    class="changeEmail"
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
      <span class="el-dialog__title">绑定邮箱</span>
    </div>
    <a-form
      :form="form">
      <a-form-item
        label="邮箱"
        class="newphone"
      >
        <a-input style="width: 100%" v-decorator="[ 'userName', userNameRules]" @blur="emailIsUsed"/>
      </a-form-item>
      <a-form-item class="changephonebtn">
        <button :disabled="submitLoading" type="button" class="el-button cl-submit-butt el-button--primary" @click="handleSubmit">
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
    return {
      modal1Visible: false,
      form: this.$form.createForm(this, {name: 'normal_pwd'}),
      userNameRules: {
        rules: [{
          required: true, message: '请输入'
        }]
      },
      submitLoading: false
    }
  },
  mounted () {
    // this.$toast('修改邮箱失败，该邮箱已被使用', '5000')
  },
  methods: {
    cancelHandler () {
      this.setModal1Visible(false)
    },
    setModal1Visible (modal1Visible) {
      this.modal1Visible = modal1Visible
      this.form.resetFields()
    },
    async emailIsUsed () {
      var params = {
        email: this.form.getFieldValue('userName')
      }
      if (!params.email) return
      var {data} = await server.emailIsUsed(params)
      if (data.code === 200) {
        // this.closelogin()
      } else if (data.code === 500) {
        this.$message.error(data.msg)
      } else {
        this.$message.error(data.msg)
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.submitLoading = true
          var userInfo = this.getUserInfo()
          var params = {
            customerId: userInfo.id,
            email: this.form.getFieldValue('userName')
          }
          var {data} = await server.addEmail(params)
          this.submitLoading = false
          if (data.code === 200) {
            this.$message.success('邮箱绑定成功')
            this.closelogin()
            this.$emit('getNewPersonalInfo')
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

  .changeEmail {
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
  }
</style>
