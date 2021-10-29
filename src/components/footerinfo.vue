<template>
  <div class="home-footer">
    <section class="footer-regin"><span>{{siteInfo.domainCopyright}} &nbsp;&nbsp; 版权所有</span>
      <span>公司地址：{{siteInfo.domainCompanyAddress}}&nbsp;&nbsp;&nbsp;&nbsp;<a>联系方式：{{siteInfo.domainContactWay}}</a></span>
      <span><label>增值电信业务经营许可证：{{siteInfo.telecomCertification}} &nbsp;</label><a
        href="http://www.beian.miit.gov.cn" target="_blank" style="color:#939599"
      >{{siteInfo.icp}} &nbsp;</a><label>{{siteInfo.publicSecurityFiling}}</label></span></section>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
  .home-footer {
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    text-align: center;
    padding: 30px;
    z-index: 10;
  }

  .footer-regin {
    width: 100%;
    height: 100%;
  }

  .footer-regin span {
    color: #939292;
    margin: 10px 15px;
    display: block;
  }

  .footer-regin a {
    color: #939292;
    margin: 0 10px;
    display: inline-block;
  }
</style>
