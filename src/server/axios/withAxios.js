import axios from './index'

var withAxios = serverConfig => {
  var serverMap = {}
  Object.keys(serverConfig).map(_ => {
    var _option = serverConfig[_]
    serverMap[_] = async function (params = {}, config = {}) {
      let url = _option.url
      var reg = new RegExp('[^{]+(?=})', 'g')
      var _dynamicParams = url.match(reg) || []
      _dynamicParams.forEach(v => {
        if (params[v] !== undefined) {
          url = url.replace(`{${v}}`, params[v])
        } else {
          console.log(`error,param ${v} is not exit`)
        }
      })

      let key = 'data'
      if (_option.method.toLowerCase() === 'get') {
        key = 'params'
      }

      return axios.request({
        ..._option,
        ...config,
        url,
        [key]: params
      })
    }
  })
  return serverMap
}

export default withAxios
