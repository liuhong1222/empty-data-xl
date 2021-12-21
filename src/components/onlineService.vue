<template>
  <div class="tools">
      <span class="online-service" v-if="siteInfo.browserRightDisplay">
      <a-popover
        placement="left"
        trigger="hover"
        :overlayStyle="{width:'290px'}"
        :arrowPointAtCenter="true">

          <template slot="content">
            <ul class="online-regin">
              <li><h3><img height="26" src="../assets/home/H01.png">客服热线
              </h3>
                <p>{{siteInfo.hotline}}</p></li>
              <li><h3><img height="26" src="../assets/home/H02.png">客服QQ
              </h3>
                <p>{{siteInfo.qq}}<a target="_blank" :href="`http://wpa.qq.com/msgrd?V=3&uin=${siteInfo.qq}&Site=qq&Menu=yes`">
                <img border="0"
                     :src="`http://wpa.qq.com/pa?p=2:${siteInfo.qq}:51`"
                     alt="点击这里给我发消息"
                     title="点击这里给我发消息"/></a></p>
              </li>
              <li><h3><img height="26" src="../assets/home/H03.png">商务合作
              </h3>
                <p>{{siteInfo.businessCode}}</p></li>
              <li style="text-align:center;"><img
                :src="downloadDomain + siteInfo.wechatQrcode" alt="微信二维码">
                <div>微信扫描二维码进行咨询</div>
              </li>
            </ul>
          </template>
          <img src="../assets/home/online.jpg">
        </a-popover>
      </span>
  </div>
</template>
<script></script>
<style lang="less">
  .tools {
    top: 36%;
    right: 20px;
    font-size: 0;
    position: fixed;
    z-index: 2000;
    border-radius: 3px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .2);
    overflow: hidden;
    cursor: pointer;
  }

  .online-service {
    width: 100%;
    height: 100%;
  }

  /*body*/
  .online-regin {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 0 10px;
  }

  .online-regin li {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .online-regin li h3 {
    height: 26px;
    font-size: 14px;
    line-height: 26px;
    font-weight: 400;
  }

  .online-regin li img {
    vertical-align: top;
    margin-right: 10px;
    display: inline-block;
  }

  .online-regin li p {
    color: #4985fc;
    line-height: 24px;
    padding: 5px 5px 5px 32px;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .ant-modal-body {
    padding: 30px 20px;
  }

  .ant-tabs-tab {
    width: 120px;
    text-align: center;
  }

  .ant-tabs-content {
    width: 280px;
    height: 224px;
  }
</style>
