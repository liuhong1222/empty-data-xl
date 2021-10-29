import withAxios from './axios/withAxios'

export var commonConfig = {
  sendSmsAndVerifyJyCode: {
    url: '/login/sendSmsAndVerifyJyCode',
    method: 'post'
  },
  userLogin: {
    url: '/login/userLogin',
    method: 'get'
  },
  isLogout: {
    url: '/login/isLogout',
    method: 'get'
  },
  logout: {
    url: '/login/logout',
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
  subUserAuthByBusiness: {
    url: '/user/subUserAuthByBusiness',
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
  productInfoList: {
    url: '/product/productInfoList',
    method: 'get'
  },
  newsList: {
    url: '/news/newsList',
    method: 'post'
  },
  readNews: {
    url: '/news/readNews',
    method: 'post'
  },
  messageList: {
    url: '/message/messageList',
    method: 'post'
  },
  getPageByMobile: {
    url: '/credit/getPageByMobile',
    method: 'post'
  },
  getTestHistoryReport: {
    url: '/report/getTestHistoryReport',
    method: 'post'
  },
  fileUpload: {
    url: '/file/upload',
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
  theTestNew: {
    url: '/credit/theTestNew',
    method: 'post'
  },
  getTestProcessMobile: {
    url: '/credit/getTestProcessMobile',
    method: 'post'
  }
}
export default withAxios(commonConfig)
