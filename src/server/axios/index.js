import axios from 'axios'
import qs from 'querystring'
import {setSessionStorage} from '../../utils'
import {httpMessage} from './httpMessage'
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
  transformResponse: [function (data) {
    if (typeof data === 'string' && data[0] === '{') {
      data = JSON.parse(data)
    }
    return data
  }]
})

server.interceptors.request.use(function (config) {
  return config
}, function (error) {
  console.log(error)
  error.data = {}
  error.data.msg = '请求失败'
  return Promise.resolve(error)
})

server.interceptors.response.use(function (response) {
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
  return response
}, function (error) {
  console.log(error)
  error.response = {}
  error.response.data = {}
  error.response.data.msg = '响应错误'
  // 判断请求超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    error.response.data.msg = '网络超时'
  }

  return Promise.resolve(error.response)
})

export default server
