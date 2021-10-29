/* 设置Cookie */
export var setCookie = (name, value, expiredays, path, domain, secure) => {
  var exdate = new Date() // 获取当前时间
  exdate.setDate(exdate.getDate() + expiredays) // 过期时间
  document.cookie = name + '=' + // cookie名称
    escape(value) + // 将cookie值进行编码
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + // 设置过期时间
    ((path == null) ? '' : ';path=' + path) + // 设置访问路径
    ((domain == null) ? '' : ';domain=' + domain) + // 设置访问域
    ((secure == null) ? '' : ';secure=' + secure) // 设置是否加密
}
// setCookie('test', 'name=sheng;sex=men;lancer=dullbear', 30);
// setCookie('bb', 'name=sheng;sex=men', 30);/*获取Cookie*/
export var getCookie = (name, index) => {
  var cookies = document.cookie // 获取cookie值
  var cookieLen = cookies.length // 获取cookie长度
  if (cookieLen > 0) { // cookie不为空时
    let start = cookies.indexOf(name + '=') // 查找需要cookie值在cookie中序号
    if (start > -1) { // cookie值存在时
      start += name.length + 1 // 获取cookie值开始序列号
      let end = cookies.indexOf(';', start) // 获取cookie值结束序列号
      if (end === -1) { // 当cookie是最后一个时
        end = cookieLen // 设置cookie值结束序列号为cookie长度
      }
      var cookieStr = unescape(cookies.substring(start, end)) // 获取解码cookie值
      var cookieObj = cookieStr.split(';') // 分割cookie值
      index = ((index === undefined) ? 0 : index) // 判断index是否传值
      var goalObj = cookieObj[index] // 索引数组
      return goalObj
      // var goalStr = goalObj.split('=')
      // var getcook = goalStr[1] // 获取需要取的cookie值
      // return getcook
    }
  } else {
    return ''
  }
}
// 设置sessionStorage
export var getSessionStorage = (name) => {
  return window.sessionStorage.getItem(name)
}
// 设置sessionStorage
export var setSessionStorage = (name, value) => {
  return window.sessionStorage.setItem(name, value)
}
