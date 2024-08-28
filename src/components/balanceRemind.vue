<template>
  <a-modal
    class='balanceRemind'
    title='设置余额提醒'
    style='top: 15%; height: 502px'
    width='540px'
    :visible='modal1Visible'
    :closable='false'
    :maskClosable='false'
    @ok='handleOk'
    @cancel='cancelHandler'
  >
    <a-form-model
      ref='form'
      :model='form'
      :rules='rules'
      :label-col='{ span: 6 }'
      :wrapper-col='{ span: 17 }'
    >
      <a-form-model-item label='提醒余额' prop='warningCount'>
        <a-input-number style='width: 150px;' v-model='form.warningCount' default-value='1' :min='1' :precision='0' placeholder='请输入提醒余额' />
        <span class='count-unit'>条</span>
        <p class='count-note'>产品余额低于该值时，系统会发送提醒信息到联系人手机号</p>
      </a-form-model-item>
      <a-form-model-item label='联系人手机号' prop='informMobiles'>
        <a-input
          v-model='form.informMobiles'
          type='textarea'
          placeholder='请输入联系人手机号，多个号码以英文逗号分隔'
          style='width: 400px; min-height: 120px;'
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
import server from '../server/index'

export default {
  name: 'balanceRemind',
  data () {
    return {
      modal1Visible: false,
      initData: {},
      form: {
        informMobiles: '',
        warningCount: ''
      },
      rules: {
        informMobiles: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            // 多个手机号用英文逗号隔开
            pattern: /^1[3456789][0-9]{9}(,1[3456789][0-9]{9})*$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        warningCount: [{ required: true, message: '请输入提醒余额', trigger: 'blur' }]
      }
    }
  },
  methods: {
    setModal1Visible (modal1Visible, record) {
      this.modal1Visible = modal1Visible
      this.resetForm()
      this.initData = record
      this.getBalanceRemind()
    },
    resetForm () {
      this.form = {
        informMobiles: '',
        warningCount: ''
      }
    },
    cancelHandler () {
      this.modal1Visible = false
    },
    async getBalanceRemind () {
      const paramsForm = new FormData()
      paramsForm.append('productType', this.initData.productTypeCode)
      var {data} = await server.getBalanceRemind(paramsForm)
      this.submitLoading = false
      if (data.code === 200) {
        if (data.data) {
          this.form = {
            informMobiles: data.data.informMobiles,
            warningCount: data.data.warningCount
          }
          this.initData = {...this.initData, id: data.data.id}
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    handleOk () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.submitLoading = true
          var params = {
            id: this.initData.id || undefined,
            productType: this.initData.productTypeCode,
            warningCount: this.form.warningCount,
            informMobiles: this.form.informMobiles
          }
          var {data} = await server.setBalanceRemind(params)
          this.submitLoading = false
          if (data.code === 200) {
            this.$message.success('设置余额提醒成功')
            this.cancelHandler()
          } else {
            this.$message.error(data.msg)
          }
        }
      })
    }
  }
}
</script>
<style lang='less'>
.balanceRemind {
  .count-unit {
    margin-left: 8px;
  }
  .count-note {
    margin-bottom: 0;
    color: #8C8C8C;
    font-size: 12px;
    padding: 0;
    line-height: 20px;
  }
}
</style>
