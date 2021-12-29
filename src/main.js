import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'
import NotFound from './views/404.vue'
import toast from './components/toast/index.js'
import router from './router'
import store from './store'
import server from './server/index'
import SlideVerify from 'vue-monoplasty-slide-verify'

// Carousel
import * as Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { getCookie, getSessionStorage, setSessionStorage } from './utils'

Vue.use(toast)
Vue.use(Antd)
Vue.use(SlideVerify)

Vue.config.productionTip = false

Vue.prototype.moment = moment

Vue.prototype.bus = new Vue()

// 统一下载域名
Vue.prototype.downloadDomain = 'http://test.haifou.com:8088/' // stable
// Vue.prototype.downloadDomain = 'http://tp.xlhmjc.com/' // 正式上线 tp.xlhmjc.com
// 批量下载前缀
Vue.prototype.batchDownload = 'batch_download' // nginx配置批量下载前缀

/* 原方法 */
Vue.prototype.getLoginFlag = () => {
  return getCookie('loginflag') || 'false'
}
Vue.prototype.getToken = () => {
  return getCookie('token') || ''
}
Vue.prototype.getUser = () => {
  return getCookie('username') || ''
}
Vue.prototype.getDomain = () => {
  return 'kh.shzhzh.cn'
}
/* end */

Vue.prototype.siteInfo = {}

Vue.prototype.getSessionToken = () => {
  return getSessionStorage('token') || ''
}
Vue.prototype.setSessionToken = (token) => {
  setSessionStorage('token', token)
}

Vue.prototype.getUserInfo = () => {
  return JSON.parse(getSessionStorage('userInfo') || '{}')
}
Vue.prototype.setUserInfo = (info) => {
  setSessionStorage('userInfo', JSON.stringify(info))
}

// Vue.prototype.getCustomerInfo = () => {
//   return JSON.parse(getSessionStorage('customerInfo'))
// }
// Vue.prototype.setCustomerInfo = (info) => {
//   setSessionStorage('customerInfo', JSON.stringify(info))
// }

function loadJS (src) {
  var hm = document.createElement('script')
  hm.src = src
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
}

function dealIE (data) {
  var theUA = window.navigator.userAgent.toLowerCase()
  if (
    (theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) ||
    (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])
  ) {
    var ieVersion =
      theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] ||
      theUA.match(/trident\s?\d+/)[0]
    if (ieVersion < 11) {
      console.log('data---' + data)
      var str = '你的浏览器版本太low了,已经和时代脱轨了 :'
      var str2 =
        "推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>谷歌</a>," +
        "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>火狐</a>," +
        '其他双核极速模式'
      var str3 = '联系方式：' + data.data.domainContactWay || ''
      document.writeln(
        "<pre style='text-align:center;color:#fff;background-color:rgb(56, 120, 172); height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
          "<h2 style='padding-top:200px;margin:0'><strong>" +
          str +
          '<br/></strong></h2><h2>' +
          str2 +
          "</h2><h2 style='margin:0'><strong>如果你使用的是双核浏览器,请切换到极速(高速)模式 / 兼容模式访问，如果仍然不能访问，请考虑以上两条建议<br/></strong></h2><h2><strong>" +
          str3 +
          '</h2></strong></pre>'
      )
      document.execCommand('Stop')
    }
  }
}

// 查看代理商网站设置
server
  .siteInfo({})
  .then(({ data }) => {
    if (data.code === 200) {
      var siteInfo = data.data || {}
      Vue.prototype.siteInfo = siteInfo
      // 处理ie11以下
      dealIE(data)

      document.title = siteInfo.siteName || ''
      // document.querySelector("link[rel*='icon']").href =
      //   Vue.prototype.downloadDomain + siteInfo?.agentIcon || ''
      // icon
      const agentIconUrl =
        Vue.prototype.downloadDomain + siteInfo?.agentIcon || ''
      const link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = agentIconUrl
      document.getElementsByTagName('head')[0].appendChild(link)

      document.querySelector("meta[name='description']").content =
        siteInfo?.seoDescription || ''
      document.querySelector("meta[name='keywords']").content =
        siteInfo?.seoKeywords || ''
      if (siteInfo?.la51Src) {
        const srcList = siteInfo?.la51Src.split(',')
        srcList.map((src) => loadJS(src))
      }
      if (siteInfo?.baiduSrc) {
        window._hmt = window._hmt || []
        loadJS(siteInfo?.baiduSrc)
      }
      new Vue({
        router,
        store,
        render: (h) => h(App, { ref: 'app' })
      }).$mount('#app')
    } else {
      if (process.env.NODE_ENV === 'production') {
        new Vue({
          render: (h) => h(NotFound)
        }).$mount('#app')
      } else {
        new Vue({
          router,
          store,
          render: (h) => h(App, { ref: 'app' })
        }).$mount('#app')
      }
    }
  })
  .catch((err) => {
    console.log(err)
  })
