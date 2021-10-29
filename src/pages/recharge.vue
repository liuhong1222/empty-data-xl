<template>
  <div class="recharge content-regin">
    <div class="recharge-top">
      <h2>充值页面</h2>
      <p><span>空号检测</span></p>
      <div style="margin-top: 10px;padding-left: 40px;"><strong>选择套餐扫码充值</strong></div>
      <div class="el-row">
        <div class="el-col el-col-8" style="margin-top: 16px;" v-for="(item, index) in goodsList"
             :key="index" v-show="item.type !== 1">
          <div class="grid-content bg-purple" :class="{active: select === item.id}" @click="selectTar(item)">
            <ul>
              <li :class="{active: select === item.id}"><h3>{{item.name}}</h3></li>
              <li><span>￥</span><span>{{item.minPayAmount}}</span>/<span
              >{{item.specifications/10000}}万条</span></li>
              <li style="color: #F44336">{{item.remark}}</li>
              <li></li>
              <li class="choose" v-if="select === item.id"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="custom-reg" v-if="cus"><span><strong>自定义充值</strong></span>
        <div class="el-input el-input--suffix">
          <input v-model="cusPay" type="text" autocomplete="off" placeholder="请输入自定义充值金额（元）" maxlength="10"
                 class="el-input__inner">
        </div>
        <button type="button" class="el-button el-button--primary" @click="gotoCz">
          <span>确认</span>
        </button>
        <span v-if="cus.minPayAmount">（{{changeToWAN(cus.unitPrice)}}元/万，最低充值{{cus.minPayAmount}}元，必须为整数）</span></div>
    </div>
    <div class="recharge-bottom" v-show="qrCodeString">
      <div class="close">
        <a href="javascript:void(0)" @click="close">关闭</a>
      </div>
      <h2>支付宝扫一扫付款</h2>
      <div>应付金额：<span>{{selectPay}}</span>元
      </div>
      <div>
        <div class="qrcode" id="qrcode" style="width:175px; height:175px; margin-top:15px;">
        </div>
      </div>
      <div class="aliPay">支付宝支付</div>
      <div>如需其他充值方式，或充值过程中遇到任何问题，请与<label style="color: rgb(41, 131, 248);">客服人员联系</label></div>
    </div>
  </div>
</template>
<script>
import server from '../server/index'
import Decimal from 'decimal.js'

export default {
  name: 'recharge',
  data () {
    return {
      qrCodeString: '',
      goodsList: [],
      select: '',
      cusPay: '',
      selectPay: 0,
      qrcode: null,
      cus: {},
      timer: null
    }
  },
  mounted () {
    this.getGoodsList()
    this.qrcode = new window.QRCode(document.getElementById('qrcode'), {
      width: 175,
      height: 175
    })
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    selectTar ({id, minPayAmount}) {
      this.getQrCodeString(id, minPayAmount)
    },
    gotoCz () {
      var cus = this.goodsList.find(v => v.type === 1)
      if (!cus.id) {
        this.$message.info('无自定义套餐')
        return
      }
      if (!/^\d+$/.test(this.cusPay)) {
        this.$message.info('钱数必须为整数')
        return
      }
      if (parseInt(cus.minPayAmount) > parseInt(this.cusPay)) {
        this.$message.info(`最低充值${cus.minPayAmount}元`)
        return
      }
      this.select = ''
      this.getQrCodeString(cus.id, this.cusPay)
    },
    async getGoodsList () {
      var params = {}
      var {data} = await server.getGoodsList(params)
      if (data.code === 200) {
        this.goodsList = data.data
        this.cus = this.goodsList.find(v => v.type === 1)
      } else {
        this.$message.error(data.msg)
      }
    },
    async getQrCodeString (id, amount) {
      this.selectPay = amount
      this.select = id
      var params = {
        id,
        amount
      }
      var {data} = await server.qrCodeString(params)
      if (data.code === 200) {
        this.qrCodeString = data.data.qrCodeString
        this.qrcode.makeCode(this.qrCodeString)

        this.orderNo = data.data.orderNo

        this.getQrCodePayState(this.orderNo)
      } else {
        this.$message.error(data.msg)
      }
    },
    async getQrCodePayState (orderNo) {
      var params = {
        orderNo
      }
      var {data} = await server.getQrCodePayState(params)
      if (data.code === 200) {
        if (data.data === 0) {
          this.timer = setTimeout(() => {
            this.getQrCodePayState(orderNo)
          }, 5000)
        } else {
          clearTimeout(this.timer)
          this.$router.push('/account')
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    close () {
      this.qrCodeString = ''
    },
    changeToWAN (unitPrice) {
      return new Decimal(unitPrice).mul(new Decimal(10000))
    }
  }
}
</script>
<style lang="less">
  .recharge {
    margin: 0px auto 32px;
    position: relative;
    width: 1200px;

    .recharge-top {
      background-color: #fff;
      padding: 21px 51px 0 22px;
    }

    h2 {
      font-size: 14px;
      font-weight: 400;
    }

    .recharge-top p {
      margin-top: 0px;
      border-bottom: 1px solid #edf2f5;
    }

    .recharge-top p span {
      font-weight: 700;
      border-bottom: 2px solid #4985fc;
      display: inline-block;
      height: 32px;
      line-height: 32px;
    }

    .recharge-top .el-row {
      padding: 0 1px 0 28px;
      box-sizing: border-box;
    }

    .el-row {
      position: relative;
      box-sizing: border-box;
    }

    .el-row:after, .el-row:before {
      display: table;
      content: "";
    }

    .el-row:after {
      clear: both;
    }

    .recharge-top .custom-reg {
      padding: 45px 45px 0;
    }

    [class*=el-col-] {
      float: left;
      box-sizing: border-box;
    }

    .el-col-8 {
      width: 33.33333%;
    }

    .recharge-top .el-col {
      border-radius: 4px;
      position: relative;
    }

    .recharge-top .bg-purple.active {
      border: 1px solid #f3bb02;
    }

    .recharge-top .grid-content {
      border-radius: 4px;
      min-height: 36px;
      width: 346px;
      height: 155px;
    }

    .recharge-top .bg-purple {
      background: transparent;
      border: 1px solid #e7e7e7;
      text-align: center;
      padding: 5px;
      cursor: pointer;
    }

    .recharge-top .bg-purple li:first-child.active {
      border-bottom: 3px solid #f3bb02;
    }

    .recharge-top .bg-purple li:first-child {
      width: auto;
      margin: 0 auto 10px;
      height: 32px;
      border-bottom: 3px solid #4b92ff;
      display: inline-block;
    }

    .recharge-top .bg-purple li {
      margin-bottom: 10px;
    }

    .recharge-top .bg-purple li.choose {
      position: absolute;
      bottom: -10px;
      right: 20px;
      width: 39px;
      height: 39px;
      background: url(../assets/index/choose.png) 50% no-repeat;
    }

    .recharge-top .bg-purple li {
      margin-bottom: 10px;
    }

    .recharge-top .bg-purple li:first-child h3 {
      font-size: 18px;
      color: #666;
      font-weight: 400;
    }

    .recharge-top .bg-purple li:nth-child(2) span:first-child {
      color: #f3bb02;
    }

    .recharge-top .bg-purple li:nth-child(2) span:nth-child(2) {
      color: #f3bb02;
      font-size: 36px;
    }

    .recharge-top .bg-purple li:nth-child(3) span:first-child {
      color: #f55f6a;
      margin-right: 10px;
      padding-left: 20px;
      background: url(../assets/index/tag.png) 0 no-repeat;
    }

    .recharge-top .bg-purple li:nth-child(3) span:last-child {
      text-decoration: line-through;
    }

    .recharge-top .custom-reg {
      padding: 45px 45px 0;
    }

    .recharge-top .custom-reg > span:first-child {
      display: block;
      margin-bottom: 15px;
    }

    .recharge-top .el-input {
      width: 30% !important;
    }

    .el-input__inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: 100%;
    }

    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
    }

    .el-input--suffix .el-input__inner {
      padding-right: 30px;
    }

    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }

    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;

      margin-left: 6px;
    }

    .recharge-bottom {
      background-color: #fff;
      padding: 10px 20px 20px 20px;
      margin-top: 30px;
      width: 320px;
      height: 415px;
      box-sizing: border-box;
      border: 1px solid #273B87;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 5px;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 100000;

      h2 {
        font-size: 16px;
        font-weight: 800;
        text-align: center;
      }
    }

    .recharge-bottom div:nth-child(2) {
      margin-top: 30px;
      height: 50px;
      line-height: 46px;
      text-align: center;
      border: 1px dashed #e5e5e5;
      color: #989898;
    }

    .recharge-bottom div {
      text-align: center;
    }

    .recharge-bottom div span {
      font-size: 24px;
      color: #f34653;
    }

    .recharge-bottom .qrcode {
      width: 175px;
      height: 175px;
      border: 1px solid #ccc;
      margin: 41px auto 10px;

      img {
        width: 175px;
        height: 175px;
        display: inline-block;
        vertical-align: top;
      }
    }
    .recharge-bottom .close {
      float: right;
    }

    .recharge-bottom div {
      text-align: center;
    }

    .recharge-bottom .aliPay {
      width: 175px;
      height: 34px;
      background-color: #2983f8;
      border-radius: 2px;
      line-height: 34px;
      text-align: center;
      margin: 0 auto;
      color: #fff;
    }

    .recharge-bottom div {
      text-align: center;
    }

    .recharge-bottom div:last-child {
      margin-top: 30px;
      padding-top: 0px;
      color: #999;
      text-align: center;
      border-top: 1px solid #e5e5e5;
    }
  }
</style>
