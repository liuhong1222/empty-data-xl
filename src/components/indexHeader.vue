<template>
  <section class="indexHeader">
    <header class="default-width">
      <div class="header-logo">
        <a @click="goto(getSessionToken()?'/empty':'/')">
          <img height="36" :src="siteInfo.agentLogo" :alt="siteInfo.agentName">
        </a>
      </div>
      <ul class="header-navig-list">
        <li><a :class="{'active': path.indexOf('empty') > -1 }"
               @click="goto(getSessionToken()?'/empty':'/')">首页</a></li>
        <li><a :class="{'active': path.indexOf('prolist') > -1 }" @click="goto('/prolist')">产品大全</a></li>
        <li><a :class="{'active': path.indexOf('question') > -1}" @click="goto('/question')">常见问题</a></li>
        <li><a :class="{'active': path.indexOf('news') > -1}" @click="showlogin">号码魔方</a></li>
        <li><a :class="{'active': path.indexOf('aboutwe') > -1}" @click="goto('/aboutwe')">关于我们</a></li>
      </ul>
      <div class="header-right">
        <template v-if="!getSessionToken()">
          <a-button type="link" @click="showlogin">
            <span><span class="white-text">无需注册，</span>快速登录</span>
          </a-button>
        </template>
        <template v-else>
          <a-dropdown :trigger="['click']" placement="bottomRight">
            <a class="ant-dropdown-link" href="#">
              个人中心
              <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="showCertification">
                认证资料
              </a-menu-item>
              <a-menu-item @click="goto('/account')">
                个人账户
              </a-menu-item>
              <a-menu-item @click="goto('/testrecord')">
                历史检测
              </a-menu-item>
              <a-menu-item @click="goto('/message')">
                我的消息
              </a-menu-item>
              <a-menu-item @click="goto('/phonematch')">
                号码匹配
              </a-menu-item>
              <a-menu-item @click="logout">
                退出登录
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <button type="button" class="el-button button-recharge el-button--danger el-button--small"
                  @click="goto('/recharge')">
            <span>充值</span>
          </button>
          <span class="c-text c-text-danger c-gap-icon-left-small opr-toplist1-new">优惠中</span>
        </template>
      </div>
    </header>
  </section>
</template>
<script>
import server from '../server/index'

export default {
  name: 'indexHeader',
  data () {
    return {
      path: '',
      islogin: true
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (path) {
        this.path = path
      }
    }
  },
  methods: {
    showlogin () {
      if (!this.getSessionToken()) {
        this.$root.$emit('showlogin', true)
      } else {
        if (this.siteInfo.domain === 'shenghay.com') {
          window.location.href = '/resource/生蚝号码魔方.rar'
        } else if (this.siteInfo.domain === 'yfeifei.com') {
          window.location.href = '/resource/肥肥号码魔方.rar'
        } else if (this.siteInfo.domain === 'jinghaoshuju.com') {
          window.location.href = '/resource/精号号码魔方.rar'
        } else if (this.siteInfo.domain === 'shihaoy.com') {
          window.location.href = '/resource/实号号码魔方.rar'
        } else if (this.siteInfo.domain === 'wckhjc.com') {
          window.location.href = '/resource/微尘号码魔方.rar'
        } else if (this.siteInfo.domain === '51ckh.com') {
          window.location.href = '/resource/云信通号码魔方.rar'
        } else if (this.siteInfo.domain === 'buzheny.com') {
          window.location.href = '/resource/步正号码魔方.rar'
        } else if (this.siteInfo.domain === 'haomajc.com') {
          window.location.href = '/resource/众之号码魔方.rar'
        } else if (this.siteInfo.domain === 'khkjc.com') {
          window.location.href = '/resource/讯龙号码魔方.rar'
        } else if (this.siteInfo.domain === 'sp10010.com' || this.siteInfo.domain === '39kh.com') {
          window.location.href = '/resource/龙之杰号码魔方.rar'
        } else if (this.siteInfo.domain === 'www.dameipr.com' || this.siteInfo.domain === 'dameipr.com') {
          window.location.href = '/resource/龙之杰号码魔方.rar'
        } else {
          window.location.href = '/resource/号码魔方.rar'
        }
      }
    },
    goto (path) {
      this.$router.push(path)
    },
    async showCertification () {
      var params = {}
      var {data} = await server.isCertified(params)
      if (data.code === 200) {
        if (data.data) {
          this.$router.push('/business')
        } else {
          this.$root.$emit('showCertification', { source: 'indexHeader', flag: true })
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    async getCustomerInfoById () {
      var userInfo = this.getCustomerInfo()
      var params = {
        id: userInfo.id
      }
      var {data} = await server.getCustomerInfoById(params)
      if (data.code === 200) {
        console.log(data)
      } else {
        this.$message.error(data.msg)
      }
    },
    async logout () {
      var params = {}
      var {data} = await server.logout(params)
      if (data.code === 200) {
        this.setSessionToken('')
        this.setUserInfo('')
        await this.$router.push('/')
        window.location.reload()
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less">
  .indexHeader {
    width: 100%;
    height: 100%;
    /*background-color: #080f2b;*/

    .default-width {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    .header-logo {
      padding-top: 12px;
      margin-right: 45px;
      vertical-align: top;
      display: inline-block;
    }

    .header-navig-list {
      font-size: 0;
      vertical-align: top;
      display: inline-block;
    }

    .header-navig-list li {
      margin: 0 16px;
      display: inline-block;
    }

    .header-navig-list li a {
      color: #fff;
      font-size: 16px;
      line-height: 58px;
      border-bottom: 2px solid transparent;
      display: block;
    }

    .header-navig-list li a.active {
      border-bottom-color: #f3d900;
    }

    .header-right {
      float: right;
      padding-top: 14px;
    }

    .header-right .button-login {
      width: 86px;
      color: #fff;
      font-size: 14px;
      border-radius: 0;
      transition: all .3s;
      background-color: transparent;

      &:hover {
        color: #333;
        background-color: #fff;
        border-color: #ffffff;
      }
    }

    .ant-dropdown-link {
      color: #ffffff;
      line-height: 32px;
      height: 42px;
      display: inline-block;
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

    .el-button--danger {
      color: #fff;
      background-color: #f56c6c;
      border-color: #f56c6c;
    }

    .el-button--mini, .el-button--small {
      font-size: 12px;
      border-radius: 3px;
    }

    .el-button--small, .el-button--small.is-round {
      padding: 9px 15px;
    }

    .button-recharge {
      width: 86px;
      font-size: 14px;
      margin-left: 30px;
    }

    .el-button--danger:focus, .el-button--danger:hover {
      background: #f78989;
      border-color: #f78989;
      color: #fff;
    }

    .el-button--danger:active {
      outline: 0;
    }

    .el-button--danger.is-active, .el-button--danger:active {
      background: #dd6161;
      border-color: #dd6161;
      color: #fff;
    }

    .c-text {
      display: inline-block;
      padding: 2px;
      text-align: center;
      vertical-align: text-bottom;
      font-size: 10px;
      line-height: 100%;
      font-style: normal;
      font-weight: 400;
      color: #fff;
      overflow: hidden
    }
    .c-text-danger {
       background-color: #FF0000
    }
    .c-gap-icon-left-small {
        margin-left: -25px
    }
    .opr-toplist1-new {
         position: relative;
         top: -18px
    }
  }

  .ant-dropdown-placement-bottomRight {
    .ant-dropdown-menu {
      background-color: #080f2b;
      border: 1px solid #080f2b;

      li {
        list-style: none;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        outline: 0;
      }

      li:hover {
        background-color: #131b38;
        color: #66b1ff;
      }

      li:focus, li:not(.is-disabled):hover {
        /*background-color: #ecf5ff;*/
        color: #66b1ff;
      }
    }
  }
</style>
