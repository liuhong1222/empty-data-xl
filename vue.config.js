const internalIp = require('internal-ip')
const lIP = internalIp.v4.sync()

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: false,
  productionSourceMap: false,
  transpileDependencies: [
    /[/\\]node_modules[/\\]test[/\\]/,
    /[/\\]node_modules[/\\][@\\]test2[/\\]test3[/\\]/
  ],
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.module.rule('images').use('url-loader').loader('url-loader').tap(options => {
  //       options.publicPath = '/front'
  //       return options
  //     })
  //   }
  // },
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    host: lIP, // can be overwritten by process.env.HOST
    port: 9999, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    https: false,
    open: true,
    openPage: '/',
    proxy: {
      '/apis/*': {
        target: 'http://172.18.109.136:8802',
        // target: 'http://khkjc.com/',
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        },
        headers: {
          Referer: 'http://127.0.0.1:8802',
          // Referer: 'http://khkjc.com/',
          Cookie: ''
        }
      },
      '/mock/*': {
        target: 'http://127.0.0.1:9000',
        // target: 'http://khkjc.com/',
        pathRewrite: {
          '^/mock': ''
        }
      }
    }
  }
}
