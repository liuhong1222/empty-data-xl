# 连接后台/stable 调试

## 启动项目，使用 ip 端口号访问

1.vue.config.js 文件，连接后台 ip，设置访问 port
2.\server\axios\index.js 请求头设置 domain，设置为固定 domain
3.main.js 文件设置统一下载域名为：http://test.haifou.com:8088/  
4.启动服务后访问 ip+port 即可

## 启动项目，使用域名访问

1.vue.config.js 文件，连接后台 ip，设置访问 port 为：80
2.\server\axios\index.js 请求头设置 domain，设置为动态 domain：window.location.hostname
3.main.js 文件设置统一下载域名为：http://test.haifou.com:8088/  
4.在本地 hosts 文件配置域名映射：172.18.111.236 test.xunlong.com  
5.启动服务后访问 test.xunlong.com 即可

# stable 环境-发版

1.\server\axios\index.js 请求头设置 domain，设置为动态 domain：window.location.hostname
2.main.js 文件设置统一下载域名为：http://test.haifou.com:8088/  
3.npm run build 打包

# 线上环境-发版

1.\server\axios\index.js 请求头设置 domain，设置为动态 domain：window.location.hostname
2.main.js 文件设置统一下载域名为：http://tp.xlhmjc.com/  
3.npm run build 打包
