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

// Carousel
import * as Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import {getCookie, getSessionStorage, setSessionStorage} from './utils'

Vue.use(toast)
Vue.use(Antd)

Vue.config.productionTip = false

Vue.prototype.moment = moment

Vue.prototype.bus = new Vue()

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

// 查看代理商网站设置
server.siteInfo({}).then(({data}) => {
  if (data.code === 200) {
    var siteInfo = data.data || {}
    Vue.prototype.siteInfo = siteInfo
    document.title = siteInfo.siteName || ''
    document.querySelector("link[rel*='icon']").href = siteInfo?.agentIcon || ''
    document.querySelector("meta[name='description']").content = siteInfo?.seoDescription || ''
    document.querySelector("meta[name='keywords']").content = siteInfo?.seoKeywords || ''
    if (siteInfo?.la51Src) {
      const srcList = siteInfo?.la51Src.split(',')
      srcList.map(src => loadJS(src))
    }
    if (siteInfo?.baiduSrc) {
      window._hmt = window._hmt || []
      loadJS(siteInfo?.baiduSrc)
    }
    new Vue({
      router,
      store,
      render: h => h(App, {ref: 'app'})
    }).$mount('#app')
  } else {
    if (process.env.NODE_ENV === 'production') {
      new Vue({
        render: h => h(NotFound)
      }).$mount('#app')
    } else {
      new Vue({
        router,
        store,
        render: h => h(App, {ref: 'app'})
      }).$mount('#app')
    }
  }
}).catch((err) => {
  console.log(err)
})
