<template>
  <a-modal
    class="agreement"
    :width="800"
    :title="`${siteInfo.agentName}-空号检测服务协议`"
    :visible="showAgreement"
    :closable="false"
    :maskCloseable="false"
    @ok="handleOk"
  >
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleOk">
        我已阅读并同意该协议
      </a-button>
    </template>
    <div
      class="details-content"
      v-html="escapeCharacter(siteInfo.agreement)"
    ></div>
  </a-modal>
</template>
<script>
import escapeCharacter from '../utils/escapeCharacter'
export default {
  name: 'AgreementModal',
  data () {
    return {
      showAgreement: false,
      escapeCharacter: escapeCharacter,
      siteInfo: this.siteInfo
    }
  },
  created () {
    // console.log(escapeCharacter(this.siteInfo.agreement))
    const showAgreement = sessionStorage.getItem('isShowAgreement') === 'true'
    if (showAgreement) {
      sessionStorage.setItem('isShowAgreement', 'false')
    }
    // console.log(this.siteInfo.agreement)
    this.showAgreement = this.siteInfo?.agreement ? showAgreement : false
  },
  methods: {
    handleOk () {
      this.showAgreement = false
    }
  }
}
</script>
<style lang="less">
.details-content {
  max-height: 400px;
  overflow-x: auto;
}
</style>
