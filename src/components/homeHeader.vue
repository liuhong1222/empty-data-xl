<template>
  <header class="mini-width header-regin">
    <a-button type="link" @click="showlogin" v-if="!getSessionToken()">
      <span><span class="white-text">无需注册，</span>快速登录</span>
    </a-button>
    <div class="logo-show">
      <img height="36" :src="downloadDomain + siteInfo.agentLogo" :alt="siteInfo.agentName">
    </div>
  </header>
</template>

<script>
export default {
  name: 'homeHeader',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    showlogin () {
      this.$root.$emit('showlogin', true)
    }
  }
}
</script>

<style lang="less">
  .header-regin {
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    height: 81px;
  }

  .header-regin button {
    float: right;
    color: #4985fc;
    line-height: 36px;
    padding: 0;
  }

  .white-text {
    color: #ffffff !important;
  }
</style>
