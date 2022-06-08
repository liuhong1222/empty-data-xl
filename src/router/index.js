import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { getSessionStorage } from '../utils'
import indexComponent from '../views/Index.vue'
import productComponent from '../pages/product.vue'
import productdetailsComponent from '../pages/productdetails.vue'
import prolistComponent from '../pages/prolist.vue'
import questionComponent from '../pages/question.vue'
import newsComponent from '../pages/news.vue'
import aboutweComponent from '../pages/aboutwe.vue'
import howrechargeComponent from '../pages/howrecharge.vue'
import detailsComponent from '../pages/details.vue'
import businessComponent from '../pages/business.vue'
import rechargeComponent from '../pages/recharge.vue'
import accountComponent from '../pages/account.vue'
import emptyComponent from '../pages/empty.vue'
import realtimeComponent from '../pages/realtime.vue'
import internationalComponent from '../pages/international.vue'
import emptyapiComponent from '../pages/emptyapi.vue'
import realtimeapiComponent from '../pages/realtimeapi.vue'
import testrecordComponent from '../pages/testrecord.vue'
import messageComponent from '../pages/message.vue'
import NotFound from '../views/404.vue'
import phonematchComponent from '../pages/phonematch'

var originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

var routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: ''
  },
  {
    path: '',
    name: 'Index',
    component: indexComponent,
    children: [
      {
        path: '/product',
        name: 'product',
        component: productComponent,
        alias: ['', '/']
      },
      {
        path: '/prolist/details',
        name: 'productdetails',
        component: productdetailsComponent
      },
      {
        path: '/prolist',
        name: 'prolist',
        component: prolistComponent
      },
      {
        path: '/question',
        name: 'question',
        component: questionComponent
      },
      {
        path: '/news',
        name: 'news',
        component: newsComponent
      },
      {
        path: '/aboutwe',
        name: 'aboutwe',
        component: aboutweComponent
      },
      {
        path: '/howrecharge',
        name: 'howrecharge',
        component: howrechargeComponent
      },
      {
        path: '/news/details',
        name: 'details',
        component: detailsComponent
      },
      {
        path: '/business',
        name: 'business',
        component: businessComponent
      },
      {
        path: '/recharge',
        name: 'recharge',
        component: rechargeComponent
      },
      {
        path: '/account',
        name: 'account',
        component: accountComponent
      },
      {
        path: '/empty',
        name: 'empty',
        component: emptyComponent
      },
      {
        path: '/realtime',
        name: 'realtime',
        component: realtimeComponent
      },
      {
        path: '/international',
        name: 'international',
        component: internationalComponent
      },
      {
        path: '/emptyapi',
        name: 'emptyapi',
        component: emptyapiComponent
      },
      {
        path: '/realtimeapi',
        name: 'realtimeapi',
        component: realtimeapiComponent
      },
      {
        path: '/testrecord',
        name: 'testrecord',
        component: testrecordComponent
      },
      {
        path: '/message',
        name: 'message',
        component: messageComponent
      },
      {
        path: '/phonematch',
        name: 'phonematch',
        component: phonematchComponent
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

var router = new VueRouter({
  base: '/',
  fallback: false,
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  var path = [
    '/message',
    '/testrecord',
    '/empty',
    '/account',
    '/recharge',
    '/business',
    'phonematch'
  ]
  if (path.indexOf(to.path) > -1) {
    if (!getSessionStorage('token')) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
