<template>
  <div class="index" id="index">
    <div class="index-header">
      <indexHeader></indexHeader>
    </div>
    <div class="router-pages">
      <div
        class="header-bgcolor"
        :class="{ transparent: path.indexOf('question') > -1 }"
      ></div>
      <router-view class="routerPage" />
    </div>
    <div
      class="main-footer"
      v-if="
        path !== '/empty' && path !== '/realtime' && path !== '/international'
      "
    >
      <ul class="default-width menu-navig">
        <li>
          <h3>帮助中心</h3>
          <p><a @click="goto('/question')">常见问题</a></p>
          <p><a @click="goto('/howrecharge')">怎么充值</a></p>
        </li>
        <li>
          <h3>走进我们</h3>
          <p><a @click="goto('/aboutwe')">关于我们</a></p>
        </li>
        <li>
          <h3>联系我们</h3>
          <p>客服热线：{{ siteInfo.hotline }}</p>
          <p>客服qq：{{ siteInfo.qq }}</p>
          <p>商务合作：{{ siteInfo.businessCode }}</p>
        </li>
      </ul>
      <ul class="copy-right">
        <footerinfo></footerinfo>
      </ul>
    </div>
    <a-back-top :target="() => target">
      <div></div>
    </a-back-top>
  </div>
</template>
<script>
import IndexHeader from '../components/indexHeader'
import footerinfo from '../components/footerinfo'

export default {
  name: 'Index',
  components: {
    IndexHeader,
    footerinfo
  },
  data () {
    return {
      target: window,
      path: ''
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (path) {
        this.path = path
        // console.log(this.path)
      }
    }
  },
  mounted () {
    this.target = document.querySelector('#index')
  },
  methods: {
    goto (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less">
.index {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;

  .index-header {
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    position: absolute;
    border-bottom: 1px solid #1a213b;
  }

  .header-bgcolor {
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    position: absolute;
    background-color: #080f2b;
  }

  .router-pages {
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    padding-top: 60px;
    width: 100%;
    height: auto;
  }

  .main-footer .copy-right {
    position: relative;
    text-align: center;
    margin-top: 65px;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #12161b;
    height: 180px;
    margin-bottom: 0;
  }

  .main-footer {
    padding-top: 65px;
    background-color: #000;
  }

  .menu-navig {
    font-size: 0;
    text-align: center;
  }

  .menu-navig li {
    font-size: 14px;
    text-align: center;
    padding-right: 165px;
    vertical-align: top;
    display: inline-block;
  }

  .menu-navig li h3 {
    color: #dddcdc;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 30px;
  }

  .menu-navig li p {
    color: #939599;
    margin-bottom: 10px;
  }

  .menu-navig li a {
    color: #939599;
  }

  .menu-navig li:last-child {
    text-align: left;
    padding-right: 0;
    max-width: 500px;
  }

  .ant-back-top {
    width: 50px;
    height: 50px;
    background: url(../assets/index/H05.png) no-repeat 50% #fff;
    border-radius: 3px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    right: 20px;
    bottom: 100px;

    &:hover {
      background-image: url(../assets/index/H06.png);
    }
  }

  .transparent {
    background-color: transparent;
  }
}
</style>
