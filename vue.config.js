const internalIp = require('internal-ip')
const lIP = internalIp.v4.sync()
const time = new Date().getTime()

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
  // 修改打包后js文件名
  configureWebpack: {
    // webpack 配置
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
      filename: `js/[name].${time}.js`,
      chunkFilename: `js/[name].${time}.js`
    }
  },
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
    port: 80, // 域名访问
    // port: 9999, // xybb-9999端口号访问
    https: false,
    open: true,
    openPage: '/',
    disableHostCheck: true,
    proxy: {
      '/apis/*': {
        // target: 'http://172.18.3.134:8883', // xybb
        // target: 'http://172.18.109.31:8883', // lh
        target: 'http://172.16.43.37:8883', // stable
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
