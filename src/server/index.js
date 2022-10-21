import withAxios from './axios/withAxios'

import { commonConfig } from './common'

var mockURL = process.env.NODE_ENV === 'production' ? '' : '/apis'
export var serverConfig = {
  ...commonConfig,
  isLogout: {
    url: '/login/isLogout',
    method: 'get'
  },
  authPictureUpload: {
    url: '/file/authPictureUpload',
    method: 'post'
  },
  findbyMobile: {
    url: '/userAccount/findbyMobile',
    method: 'get'
  },
  findByCreUserId: {
    url: '/feign/apiAccountInfo/findByCreUserId',
    method: 'post'
  },
  pageFindTrdOrderByCreUserId: {
    url: '/userAccount/pageFindTrdOrderByCreUserId',
    method: 'post'
  },
  findUserbyMobile: {
    url: '/user/findbyMobile',
    method: 'get'
  },
  getUserAuthInfo: {
    url: '/user/getUserAuthInfo',
    method: 'get'
  },
  getPageByMobile: {
    url: '/credit/getPageByMobile',
    method: 'post'
  },
  // 产品常见问题管理分页列表
  getFagList: {
    url: '/front/faq/getList',
    method: 'post',
    baseURL: mockURL
  },
  // 新闻管理分页列表
  newsList: {
    url: '/front/news/getList',
    method: 'POST',
    baseURL: mockURL
  },
  // 查看新闻管理
  readNews: {
    url: '/front/news/info/{id}',
    method: 'GET',
    baseURL: mockURL
  },
  // 产品管理分页列表
  productInfoList: {
    url: '/front/product/getList',
    method: 'POST',
    baseURL: mockURL
  },
  // 查看产品管理
  getProductInfoById: {
    url: '/front/product/info/{id}',
    method: 'GET',
    baseURL: mockURL
  },
  // 产品线管理分页列表
  getProductGroupList: {
    url: '/front/productGroup/getList',
    method: 'POST',
    baseURL: mockURL
  },
  // 查看代理商网站设置
  siteInfo: {
    url: '/front/siteInfo',
    method: 'GET',
    baseURL: mockURL
  },
  // 代理商网站登录
  userLogin: {
    url: '/front/login',
    method: 'POST',
    baseURL: mockURL
  },
  login: {
    url: '/front/userlogin',
    method: 'POST',
    baseURL: mockURL
  },
  // 登离
  logout: {
    url: '/front/logout',
    method: 'POST',
    baseURL: mockURL
  },
  // 发送短信验证码
  sendSmsAndVerifyJyCode: {
    url: '/front/sendCode',
    method: 'POST',
    baseURL: mockURL
  },
  // 获取图片Base64验证码
  getBase64Image: {
    url: '/verificationCode/getBase64Image',
    method: 'GET',
    baseURL: mockURL
  },
  // 获取验证码
  getImage: {
    url: '/verificationCode/getImage',
    method: 'GET',
    baseURL: mockURL
  },
  // 上传
  fileUpload: {
    url: '/front/customer/upload',
    method: 'post',
    headers: {
      fetchtype: 'file',
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 上传文件合并
  mergeFile: {
    url: '/front/customer/mergeFile',
    method: 'post',
    baseURL: mockURL
  },
  // 国际号码检测-所有国码
  getCountryCode: {
    url: '/front/country/codeList',
    method: 'post',
    baseURL: mockURL
  },
  // 上传
  fileUploadMatching: {
    url: '/front/customer/uploadMatching',
    method: 'post',
    headers: {
      fetchtype: 'file',
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 上传文件合并
  mergeFileMatching: {
    url: '/front/customer/mergeFileMatching',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 下载已匹配文件
  downloadMatchingFile: {
    url: '/front/customer/downloadMatchingFile',
    method: 'post',
    baseURL: mockURL
  },
  // 查看客户认证信息
  getCustomerInfoById: {
    url: '/front/info/{id}',
    method: 'GET',
    baseURL: mockURL
  },
  // 查看客户管理
  getPersonalInfo: {
    url: '/front/personal/personalInfo',
    method: 'GET',
    baseURL: mockURL
  },
  // 获取客户认证信息
  isCertified: {
    url: '/front/personal/isPermission',
    method: 'GET',
    baseURL: mockURL
  },
  subUserAuthByBusiness: {
    url: '/front/personal/add',
    method: 'post',
    baseURL: mockURL
  },
  getPersonalInfoById: {
    url: '/front/personal/info/{customerId}',
    method: 'GET',
    baseURL: mockURL
  },
  getTestProcessMobile: {
    url: '/front/empty/getStatusList',
    method: 'post',
    baseURL: mockURL
  },
  getTestHistoryReport: {
    url: '/front/empty/getPageList',
    method: 'post',
    baseURL: mockURL
  },
  getLatestEmpty: {
    url: '/front/empty/getLatestEmpty',
    method: 'GET',
    baseURL: mockURL
  },
  getGoodsList: {
    url: '/front/personal/goodsList',
    method: 'post',
    baseURL: mockURL
  },
  qrCodeString: {
    url: '/front/personal/qrCodeString/{id}/{amount}',
    method: 'get',
    baseURL: mockURL
  },
  messageList: {
    url: '/front/myNotice/getPageList',
    method: 'post',
    baseURL: mockURL
  },
  setRead: {
    url: '/front/myNotice/setRead/{id}',
    method: 'get',
    baseURL: mockURL
  },
  delete: {
    url: '/front/myNotice/delete/{id}',
    method: 'post',
    baseURL: mockURL
  },
  aboutus: {
    url: '/front/aboutUs',
    method: 'post',
    baseURL: mockURL,
    headers: {
      fetchtype: 'file',
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  unzipPassword: {
    url: '/front/personal/unzipPassword/{customerId}/{password}',
    method: 'POST',
    baseURL: mockURL
  },
  addEmail: {
    url: '/front/personal/addEmail/{customerId}/{email}',
    method: 'POST',
    baseURL: mockURL
  },
  statistics: {
    url: '/front/empty/statistics/{year}/{month}',
    method: 'get',
    baseURL: mockURL
  },
  getRecharge: {
    url: '/front/recharge/getPageList',
    method: 'post',
    baseURL: mockURL
  },
  deleteEmptyById: {
    url: '/front/empty/delete/{id}/{isOldData}',
    method: 'post',
    baseURL: mockURL
  },
  productInfoById: {
    url: '/front/product/info/{id}',
    method: 'GET',
    baseURL: mockURL
  },
  getRunningList: {
    url: '/front/empty/getRunningList',
    method: 'post',
    baseURL: mockURL
  },
  getQrCodePayState: {
    url: '/front/personal/getQrCodePayState/{orderNo}',
    method: 'get',
    baseURL: mockURL
  },
  addPassword: {
    url: '/front/personal/addPassword',
    method: 'post',
    baseURL: mockURL
  },
  updatePassword: {
    url: '/front/personal/updatePassword',
    method: 'post',
    baseURL: mockURL
  },
  emailIsUsed: {
    url: '/front/personal/emailIsUsed/{email}',
    method: 'post',
    baseURL: mockURL
  },
  validOldPassword: {
    url: '/front/personal/validOldPassword/{customerId}/{oldPassword}',
    method: 'post',
    baseURL: mockURL
  },
  sendSms: {
    url: '/front/customer/sendSms',
    method: 'post',
    baseURL: mockURL
  },
  verifySmsCode: {
    url: '/front/customer/verifySmsCode/{verifyToken}/{code}',
    method: 'get',
    baseURL: mockURL
  },
  modifyMobile: {
    url: '/front/customer/modifyMobile',
    method: 'post',
    baseURL: mockURL
  },
  // 忘记密码-校验验证码
  checkCode: {
    url: '/front/customer/checkCodePwd/{verifyToken}/{code}',
    method: 'get',
    baseURL: mockURL
  },
  // 忘记密码-修改密码
  forgetPassword: {
    url: '/front/customer/forgetPassword',
    method: 'post',
    baseURL: mockURL
  },
  // 空号检测-分片上传文件
  chunkUpload: {
    url: '/front/chunk/chunkUpload',
    method: 'post',
    headers: {
      fetchtype: 'file',
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 空号检测-查询分片上传状态
  uploadStatus: {
    url: '/front/chunk/uploadStatus',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 空号检测-执行空号检测
  checkFile: {
    url: '/front/empty/emptyCheckByFile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 空号检测-获取空号检测进度
  checkFileProgress: {
    url: '/front/empty/getTestProcessMobile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 实时检测-执行实时检测
  realtimeCheckFile: {
    url: '/front/realtime/realtimeCheckByFile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 实时检测-获取实时检测进度
  realtimeCheckFileProgress: {
    url: '/front/realtime/getTestProcessMobile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 国际检测-执行国际检测
  internationalCheckFile: {
    url: '/front/international/checkByFile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 国际检测-获取国际检测进度
  internationalCheckFileProgress: {
    url: '/front/international/getTestProcessMobile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 定向检测-执行定向检测
  directCheckFile: {
    url: '/front/intDirect/checkByFile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 定向检测-获取定向检测进度
  directCheckFileProgress: {
    url: '/front/intDirect/getTestProcessMobile',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 获取api接口账密
  apiSettings: {
    url: '/front/apiSettings/info/{customerId}',
    method: 'get',
    baseURL: mockURL
  },
  // 空号检测api
  emptyApiTest: {
    url: '/front/empty/batchCheckNew',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 空号检测api-检测记录
  emptyApiTestRecord: {
    url: '/front/empty/getTestRecord',
    method: 'get',
    baseURL: mockURL
  },
  // 实时检测api
  realtimeApiTest: {
    url: '/front/realtime/mobileStatusStatic',
    method: 'post',
    headers: {
      // fetchtype: 'file',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (params) {
        return params
      }
    ]
  },
  // 空号检测api-检测记录
  realtimeApiTestRecord: {
    url: '/front/realtime/getTestRecord',
    method: 'get',
    baseURL: mockURL
  },
  // 历史检测-实时检测
  // 获取最新的一条实时检测记录
  getLatestRealtime: {
    url: '/front/realtime/getLatestRealtime',
    method: 'GET',
    baseURL: mockURL
  },
  // 实时检测-分页列表
  getRealtimePageList: {
    url: '/front/realtime/getRealtimePageList',
    method: 'post',
    baseURL: mockURL
  },
  // 删除实时检测记录
  deleteRealtimeById: {
    url: '/front/realtime/delete/{id}/{isOldData}',
    method: 'post',
    baseURL: mockURL
  },
  realtimeStatistics: {
    url: '/front/realtime/statistics/{year}/{month}',
    method: 'get',
    baseURL: mockURL
  },
  addZipPassword: {
    url: '/front/personal/addUnzipPassword',
    method: 'post',
    baseURL: mockURL
  },
  updateZipPassword: {
    url: '/front/personal/updateUnzipPassword',
    method: 'post',
    baseURL: mockURL
  },
  // 历史记录-国际号码检测
  getInternationalPageList: {
    url: '/front/international/getInternationalPageList',
    method: 'post',
    baseURL: mockURL
  },
  // 历史记录-国际号码检测-删除
  deleteInternationalById: {
    url: '/front/international/delete/{id}',
    method: 'post',
    baseURL: mockURL
  },
  // 历史记录-国际号码检测-获取最新的一条检测记录
  getLatestInternational: {
    url: '/front/international/getLatestInternational',
    method: 'GET',
    baseURL: mockURL
  },
  // 历史记录-国际号码检测-统计
  internationalStatistics: {
    url: '/front/international/statistics/{year}/{month}',
    method: 'get',
    baseURL: mockURL
  },
  // 定向检测
  // 表格
  getDirectPageList: {
    url: '/front/intDirect/getIntDirectPageList',
    method: 'post',
    baseURL: mockURL
  },
  // 统计
  directStatistics: {
    url: '/front/intDirect/statistics/{year}/{month}',
    method: 'get',
    baseURL: mockURL
  },
  // 获取最新的一条检测记录
  getLatestDirect: {
    url: '/front/intDirect/getLatestIntDirect',
    method: 'GET',
    baseURL: mockURL
  },
  // 删除
  deleteDirectById: {
    url: '/front/intDirect/delete/{id}',
    method: 'post',
    baseURL: mockURL
  },
  // 忘记密码-修改密码
  forgetZipPassword: {
    url: '/front/personal/updateUnzipPassword',
    method: 'post',
    baseURL: mockURL
  },
  // 号码魔方
  getMobileCubePath: {
    url: '/front/getMobileCubePath ',
    method: 'post',
    baseURL: mockURL
  }
}

export default withAxios(serverConfig)
