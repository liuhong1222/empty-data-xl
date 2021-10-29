<template>
  <div class="product">
    <div class="pro-details">
<!--      <img src="../assets/index/product.jpg" alt="">-->
      <div id="web_bg" class="web_bg_nullcode"></div>
      <section>
        <div class="w1200 proAdu">
          <p>产品优势</p>
          <ul class="clearfix pro-advant">
            <li>
              <a href="javascript:;" @click="showlogin" class="fl">
                <img src="../assets/product/chengben.png" alt="">
              </a>
              <div>
                <p>极低的检测成本</p>
                <span>每条数据检测费用不足2厘（0.002元）。根据服务结果分析，企业只需花费8%的检测费用，便可节省35%的无效推广费用。</span>
              </div>
            </li>
            <li>
              <a href="javascript:;" @click="showlogin" class="fl">
                <img src="../assets/product/gaoxiao.png" alt="">
              </a>
              <div>
                <p>检测更高效</p>
                <span>每小时百万数据检测效率，即使您有几亿条数据，也不过几天的时间就可以完成一轮检测，检测后的数据按照结果分类打包反馈至客户，让客户营销无需再走弯路，快速高效。</span>
              </div>
            </li>
            <li>
              <a href="javascript:" @click="showlogin" class="fl">
                <img src="../assets/product/quan.png" alt="">
              </a>
              <div>
                <p>精准检测互联网用户</p>
                <span>空号检测可根据用户对流量的使用情况，判断其是否为互联网公司公司目标用户，让营销更精准。</span>
              </div>
            </li>
            <li>
              <a href="javascript:" @click="showlogin" class="fl">
                <img src="../assets/product/true.png" alt="">
              </a>
              <div>
                <p>检测更真实</p>
                <span>作为三大通信运营商的战略合作伙伴，我们可以直接调用他们的接口进行数据对照，让检测结果更真实可靠。</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="userEmpty">
          <div class="w1200 userEmptyInfo">
            <p>为什么使用空号检测</p>
            <p>产能剩余时代，产品已经不是绝对的制胜因素，谁拥有最多有效用户资源，谁就有可能获得最大的胜利</p>
            <div class="clearfix emptyViewInfo">
              <a href="javascript:" @click="showlogin" class="fl">
                <img src="../assets/product/views_icon.png" alt="">
              </a>
              <div class="fr">
                <div class="emptyEdit">

                  根据我们对10000个数据结果进行分析，有接近5500个数据是完全不具备推广结果的。其中有2700个号码
                  一直处于休眠状态（非智能机，老年人手机，小号等对移动互联网不感兴趣的用户），有接近800个号码从未被使用过 。而你的推广费用却一直在这些用户中消耗。
                </div>
                <div class="view-ident clearfix">
                  <ul>
                    <li>
                      <label class="label1"></label>
                      <span>实号</span>
                    </li>
                    <li>
                      <label class="label2"></label>
                      <span>资料被清空</span>
                    </li>
                    <li>
                      <label class="label3"></label>
                      <span>空号</span>
                    </li>
                    <li>
                      <label class="label4"></label>
                      <span>流量消耗过低</span>
                    </li>
                    <li>
                      <label class="label5"></label>
                      <span>停机</span>
                    </li>
                    <li>
                      <label class="label6"></label>
                      <span>从未激活</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="w1200 checkGood">
          <p>空号检测的优势</p>
          <ul class="clearfix">
            <li>
              <a href="javascript:">
                <img src="../assets/product/shu_icon.png" alt="">
              </a><br>
              <span>真实</span>
            </li>
            <li>
              <a href="javascript:">
                <img src="../assets/product/sss_icon.png" alt="">
              </a><br>
              <span>全量</span>
            </li>
            <li>
              <a href="javascript:">
                <img src="../assets/product/fff_icon.png" alt="">
              </a><br>
              <span>安全</span>
            </li>
            <li>
              <a href="javascript:">
                <img src="../assets/product/kong_iconss.png" alt="">
              </a><br>
              <span>实时</span>
            </li>
            <li>
              <a href="javascript:">
                <img src="../assets/product/yun_icon.png" alt="">
              </a><br>
              <span>公正</span>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="low-cost">
          <div class="w1200 Extremely-low-cost">
            <img src="../assets/product/lowicon.png" alt="">
            <p><span>极低的检测成本</span></p>
          </div>
        </div>
      </section>
    </div>
    <div class="banner-access">
      <a-button class="button-login" @click="showlogin">立即体验</a-button>
    </div>
    <div class="foot-access">
      <a-button class="button-login" @click="showlogin">立即接入</a-button>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'

export default {
  name: 'product',
  // mounted() {
  //   var siteInfo = Vue.prototype.siteInfo
  //
  //   function loadJS (src) {
  //     var hm = document.createElement('script')
  //     hm.src = src
  //     var s = document.getElementsByTagName('script')[0]
  //     s.parentNode.insertBefore(hm, s)
  //   }
  //
  //   if (siteInfo?.la51Src) {
  //     const srcList = siteInfo?.la51Src.split(',')
  //     srcList.map(src => loadJS(src))
  //   }
  //   if (siteInfo?.baiduSrc) {
  //     window._hmt = window._hmt || []
  //     loadJS(siteInfo?.baiduSrc)
  //   }
  // },
  methods: {
    showlogin () {
      if (!this.getSessionToken()) {
        this.$root.$emit('showlogin', true)
      } else {
        this.$router.push('/empty')
      }
    }
  }
}
</script>
<style lang="less">
  .product {
    position: relative;

    .pro-details {
      max-width: 1920px;
      margin: 0 auto;
    }

    .banner-access .button-login {
      top: 17%;
    }

    .foot-access .button-login {
      bottom: 2%;
    }

    .ant-btn {
      width: 140px;
      position: absolute;
      z-index: 999;
      left: 50%;
      border-radius: 0;
      transition: all .3s;
      margin-left: -70px;
      color: #fff;
      background-color: transparent;
      height: 40px;

      &:hover {
        color: #333;
        background-color: #fff;
        border-color: #ffffff;
      }
    }

    #web_bg {
      width: 100%;
      height: 530px;
      min-width: 1000px;
      background-color: #fff;
      background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
      background-position: center 0;
      margin-top: -60px;
    }
    .web_bg_nullcode {
      background-image: url(../assets/product/nullcode.jpg);
    }
    .w1200 {
      width: 1200px;
      margin: 0 auto;
    }
    .proAdu {
      text-align: center;
    }
    .proAdu>p {
      font-size: 32px;
      color: #595f68;
      margin-top: 40px;
    }
    .pro-advant {
      margin-bottom: 40px;
      li {
        width: 570px;
        height: 175px;
        padding: 23px 40px 20px 20px;
        box-sizing: border-box;
        text-align: left;
        margin-right: 30px;
        margin-top: 65px;
        box-shadow: 1px 2px 17px 4px rgba(198,219,250,.5);
        float: left;
        a {
          display: inline-block;
          width: 109px;
          height: 109px;
          background-color: #F3F3FE;
          border-radius: 50%;
          text-align: center;
          line-height: 140px;
        }
        div {
          margin-left: 150px;
          margin-top: 16px;
          p {
            font-size: 18px;
            color: #393939;
            margin-bottom: 5px;
          }
          span {
            color: #a7abb0;
            line-height: 25px;
          }
        }
      }
      img {
        vertical-align: baseline;
      }
    }
    .clearfix {
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .userEmpty {
      margin-top: 50px;
      height: 764px;
      background-color: #EEF5F8;
    }
    .userEmptyInfo {
      padding-top: 40px;
      padding-bottom: 85px;
      box-sizing: border-box;
      p:first-child {
        font-size: 32px;
        color: #595f68;
      }
      p {
        color: #a7abb0;
        text-align: center;
        margin-bottom: 15px;
      }
      .emptyEdit {
        width: 600px;
        line-height: 30px;
        color: #94989d;
        padding: 40px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 85px;
        margin-bottom: 35px;
      }
      .view-ident {
        width: 600px;
        padding-left: 50px;
        li {
          width: 250px;
          line-height: 70px;
          float: left;
          span {
            margin-top: -27px;
            margin-left: 10px;
            float: left;
            color: #a3a7ab;
          }
        }
        label {
          width: 16px;
          height: 16px;
          float: left;
          display: inline-block;
          border-radius: 5px;
        }
        .label1 {
          background-color: #3A7CFF;
        }
        .label2 {
          background-color: #B6C1EE;
        }
        .label3 {
          background-color: #3E5CEE;
        }
        .label4 {
          background-color: #9DACE9;
        }
        .label5 {
          background-color: #0125E9;
        }
        .label6 {
          background-color: #697FEC;
        }
      }
    }
    .checkGood {
      p {
        text-align: center;
        font-size: 32px;
        color: #595f68;
        margin-top: 70px;
        margin-bottom: 90px;
      }
      li:last-child {
        margin-right: 0;
      }
      li {
        float: left;
        text-align: center;
        margin-right: 185px;
        margin-bottom: 120px;
        span {
          font-size: 24px;
          color: #595f68;
        }
      }
    }
    .low-cost {
      background-color: #09102c;
      text-align: center;
      padding-top: 40px;
      padding-bottom: 60px;
      color: #fff;
      span {
        font-size: 18px;
        display: inline-block;
        margin-bottom: 45px;
        margin-top: 40px;
        margin-right: 20px;
      }
      #immediate-access-low {
        width: 184px;
        height: 40px;
        margin: 0 auto;
        border: 1px solid #fff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
