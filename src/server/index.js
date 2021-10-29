import withAxios from './axios/withAxios'

import {commonConfig} from './common'

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
    baseURL: mockURL
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
    url: '/front/personal/isCertified',
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
    baseURL: mockURL
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
    url: '/front/empty/delete/{id}',
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
  }
}

export default withAxios(serverConfig)
