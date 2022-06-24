import axios from 'axios'
import qs from 'querystring'
import { setSessionStorage } from '../../utils'
import { httpMessage } from './httpMessage'
import showModel from '../../components/showDialog/index'

export var showStatus = (status) => {
  let code = ''
  switch (status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 408:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
    default:
      code = status
  }
  return code
}

var baseURL = ''
var server = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? baseURL : `/apis${baseURL}`,
  headers: {
    domain: window.location.hostname, // 在请求头传域名(域名访问)
    // domain: 'test.xunlong.com', // 在请求头传域名(9999端口号访问) xybb
    // domain: 'test.liuhong.com',
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  },
  withCredentials: true,
  timeout: 1800000,
  transformRequest: [
    function (params) {
      return JSON.stringify(params)
      // return qs.stringify(params)
    }
  ],
  paramsSerializer: function (params) {
    return qs.stringify(params)
  },
  validateStatus: function () {
    return true
  },
  transformResponse: [
    function (data) {
      if (typeof data === 'string' && data[0] === '{') {
        data = JSON.parse(data)
      }
      return data
    }
  ]
})

server.interceptors.request.use(
  function (config) {
    // debugger
    // 统一为get请求URL，添加
    const time = new Date().getTime()
    if (config.method === 'get') {
      if (config.url.indexOf('?') > -1) {
        config.url += '&time=' + time
      } else {
        config.url += '?time=' + time
      }
    } else if (config.method === 'post') {
      if (config.data) {
        if (config.data instanceof FormData) {
          config.data.append('time', time)
        } else {
          config.data.time = time
        }
      }
    }
    return config
  },
  function (error) {
    console.log(error)
    error.data = {}
    error.data.msg = '请求失败'
    return Promise.resolve(error)
  }
)

server.interceptors.response.use(
  function (response) {
    var status = response.status
    let code = ''
    if (status < 200 || status >= 300) {
      code = showStatus(status)
      if (typeof response.data === 'string') {
        response.data = {
          msg: httpMessage[code]
        }
      } else {
        response.data.msg = httpMessage[code]
      }
    }
    if (response.data.code === 5104 || response.data.code === 5103) {
      setSessionStorage('token', '')
      setSessionStorage('userInfo', '')
      // window.location.reload()
    }

    if (response.data.code === 5106) {
      showModel({
        url: response.data.data
      })
      throw Error('')
    }
    // debugger
    if (
      (response.data.code === 500 &&
        response.data.msg === 'token验证信息异常') ||
      response.data.code === 400007
    ) {
      // token失效，退出登录
      setSessionStorage('token', '')
      setSessionStorage('userInfo', '')
      window.location.href = '/'
      // window.location.reload()
      // return
    }

    return response
  },
  function (error) {
    error.response = {}
    error.response.data = {}
    error.response.data.msg = '响应错误'
    // 判断请求超时
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      error.response.data.msg = '网络超时'
    }

    return Promise.resolve(error.response)
  }
)

export default server
