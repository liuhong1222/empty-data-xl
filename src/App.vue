<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
      <loading></loading>
      <onlineService/>
      <login/>
      <certification/>
      <agreement-modal/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import loading from './components/loading'
import onlineService from './components/onlineService'
import login from './components/login'
import certification from './components/certification'
import axios from './server/axios'
import agreementModal from './components/agreementModal'
// import server from './server'

export default {
  name: 'App',
  components: {
    loading,
    onlineService,
    login,
    certification,
    agreementModal
  },
  data () {
    return {
      locale: zhCN
    }
  },
  created () {
    this.getSToken()
  },
  mounted () {
    document.getElementById('loading').style.display = 'none'
  },
  methods: {
    getSToken () {
      var token = this.getSessionToken()
      if (token) {
        axios.defaults.headers.token = token
      }
    }
  }
}
</script>

<style lang="less">
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1250px;
    /*min-height: 540px;*/
    overflow: hidden;
    background-color: #ffffff;
  }
</style>

<style lang="less">
  /* reset */
  * {
    margin: 0;
    padding: 0;
    outline: none;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    margin: 0;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-variant: tabular-nums;
    /*line-height: 1.5;*/
    background-color: #f1f1f1;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    color: #585f68;
    /*font-size: 14px;*/
    /*font-family: Microsoft Yahei,微软雅黑,PingFangSC-Regular;*/
  }

  a, area, button, [role='button'], input:not([type='range']), label, select, summary, textarea {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  li {
    list-style: none;
  }

  p {
    display: block;
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  .ant-popover .ant-popover-inner-content {
    padding: 12px;
  }

  .ant-modal-wrap {
    min-width: 320px;
    z-index: 99999;
  }

  .ant-message-notice-content {
    padding: 15px 22px !important;
  }
</style>
