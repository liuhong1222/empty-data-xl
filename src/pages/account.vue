<template>
  <div class="account">
    <div class="default-width info-regin">
      <div class="account-list" style="width: 35%">
        <h2>账号信息</h2>
        <ul>
          <li>
            <button
              type="button"
              class="el-button el-button--default el-button--mini"
              @click="changephone"
            >
              <span>修改</span>
            </button>
            <img src="../assets/index/P026.png" />
            <h3>{{ userInfo.phone }}</h3>
          </li>
          <li>
            <button
              type="button"
              class="el-button el-button--default el-button--mini"
              @click="changeEmail"
            >
              <span>{{ userInfo.email ? '修改' : '添加' }}</span>
            </button>
            <img src="../assets/index/P027.png" />
            <h3>
              {{ userInfo.email ? userInfo.email : '(接收通知的邮箱为空)' }}
            </h3>
          </li>
          <li>
            <button
              type="button"
              class="el-button el-button--default el-button--mini"
              @click="changeUserPwd"
            >
              <span>{{ !userInfo.password ? '添加' : '修改' }}账号密码</span>
            </button>
            <img src="../assets/index/P028.png" />
            <p>{{ !userInfo.password ? '(请添加登录密码)' : '●●●●●●' }}</p>
          </li>
          <li>
            <button
              type="button"
              class="el-button el-button--default el-button--mini"
              @click="changeZipPwd"
            >
              <!-- 是否已经设置解压密码 -->
              <span
                >{{ !userInfo.unzipPassword ? '添加' : '修改' }}解压密码</span
              >
            </button>
            <img src="../assets/index/zip_pass.svg" />
            <p>{{ !userInfo.unzipPassword ? '(请添加解压密码)' : '●●●●●●' }}</p>
          </li>
        </ul>
      </div>
      <div class="balance-list" style="width: 12%">
        <h2>空号检测</h2>
        <p>当前余额（条）</p>
        <ul>
          <li>
            <strong>{{ userInfo.remainNumberTotal | thousandbit }}</strong>
          </li>
          <li>
            <strong>{{ userInfo.remainNumberTotal / 10000 }}W</strong>
          </li>
        </ul>
      </div>
      <div class="balance-list" style="width: 12%">
        <h2>实时检测</h2>
        <p>当前余额（条）</p>
        <ul>
          <li>
            <strong>{{ userInfo.realtimeBalance | thousandbit }}</strong>
          </li>
          <li>
            <strong
              >{{
                userInfo.realtimeBalance > 0
                  ? userInfo.realtimeBalance / 10000
                  : 0
              }}W</strong
            >
          </li>
        </ul>
      </div>
      <div class="data-list" style="width: 40%">
        <h2>数据中心</h2>
        <ul>
          <li class="first" style="width: 50%">
            <button
              type="button"
              class="el-button el-button--primary"
              @click="goto('/testrecord')"
            >
              <span>检测记录</span>
            </button>
          </li>
          <li class="last">
            <button
              type="button"
              class="el-button el-button--danger"
              @click="goto('/recharge')"
            >
              <span>充值</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="default-width order-regin">
      <h2>订单记录</h2>
      <a-row style="margin-bottom: 10px">
        <label style="margin-right: 10px">产品类型</label>
        <a-select
          :default-value="searchOptions.defaultSearch"
          style="width: 160px"
          @change="handleSearch"
        >
          <a-select-option
            :key="item.id"
            v-for="item in searchOptions.options"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-row>
      <a-table
        :columns="columns"
        :rowKey="(record) => record.id"
        :dataSource="orderlist"
        :loading="loading"
        :pagination="false"
        :scroll="{ x: xScroll }"
      >
        <span slot="payType" slot-scope="text, record">
          {{ remark[record.payType] || record.payType }}
        </span>
        <span slot="remark"> 充值 </span>
        <span slot="state"> 成功 </span>
      </a-table>
      <div class="pages-regin">
        <a-pagination
          :total="pagination.total"
          :defaultCurrent="pagination.current"
          :pageSize.sync="pagination.pageSize"
          showSizeChanger
          showQuickJumper
          @showSizeChange="onShowSizeChange"
          @change="onChange"
          :showTotal="(total) => `共 ${total} 条`"
        />
      </div>
    </div>
    <changephone
      ref="changephone"
      :phone="userInfo.phone"
      @changeUserPwdFlag="changeUserPwdFlag"
    ></changephone>
    <changeEmail
      ref="changeEmail"
      @getNewPersonalInfo="getNewPersonalInfo"
    ></changeEmail>
    <changePwd ref="changePwd"></changePwd>
    <changeUserPwd
      ref="changeUserPwd"
      :haspassword="!!userInfo.password"
      @changeUserPwdFlag="changeUserPwdFlag"
      @forgetPassShow="forgetPassShow"
    ></changeUserPwd>
    <forgetUserPwd
      ref="forgetUserPwd"
      :phone="userInfo.phone"
      @changeUserPwdFlag="changeUserPwdFlag"
    ></forgetUserPwd>
    <changeZipPwd
      ref="changeZipPwd"
      :haspassword="!!userInfo.unzipPassword"
      @changeZipPwdFlag="changeZipPwdFlag"
      @forgetZipPassShow="forgetZipPassShow"
    ></changeZipPwd>
    <forgetZipPwd
      ref="forgetZipPwd"
      :phone="userInfo.phone"
      @changeZipPwdFlag="changeZipPwdFlag"
    ></forgetZipPwd>
  </div>
</template>
<script>
import changephone from '../components/changephone'
import changeEmail from '../components/changeEmail'
import changePwd from '../components/changePwd'
import changeUserPwd from '../components/changeUserPwd'
import forgetUserPwd from '../components/forgetUserPwd'
import changeZipPwd from '../components/changeZipPwd'
import forgetZipPwd from '../components/forgetZipPwd'

import server from '../server/index'
import getUserData from '../mixin/getUserData'

var columns = [
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    width: '220px',
    scopedSlots: { customRender: 'orderNo' }
  },
  {
    title: '产品类别',
    dataIndex: 'category',
    width: '150px',
    customRender: (text, record) =>
      `${text === 0 ? '空号检测产品' : '实时检测产品'}`
  },
  {
    title: '产品名',
    dataIndex: 'goodsName',
    width: '150px'
  },
  {
    title: '订单金额（元）',
    dataIndex: 'paymentAmount',
    width: '100px'
  },
  {
    title: '条数',
    dataIndex: 'rechargeNumber',
    width: '100px'
  },
  {
    title: '订单类型',
    dataIndex: 'remark',
    width: '120px',
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: '100px',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '充值日期',
    dataIndex: 'createTime',
    width: '150px'
  },
  {
    title: '支付方式',
    dataIndex: 'payType',
    width: '150px',
    scopedSlots: { customRender: 'payType' }
  }
]

export default {
  name: 'account',
  data () {
    return {
      remark: {
        0: '对公转账',
        1: '支付宝扫码付',
        2: '注册赠送',
        3: '赠送',
        4: '对公支付宝转账',
        5: '对私支付宝',
        6: '对私微信',
        7: '对私转账'
      },
      columns,
      loading: false,
      orderlist: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      userInfo: {},
      searchOptions: {
        // select搜索框
        defaultSearch: '全部',
        options: [
          {
            id: '',
            name: '全部'
          },
          {
            id: 0,
            name: '空号检测产品'
          },
          {
            id: 1,
            name: '实时检测产品'
          }
        ]
      },
      category: ''
    }
  },
  async mounted () {
    this.getPersonalInfo()
    // await this.getUserData()
    // this.findUserbyMobile()
    this.pageFindTrdOrderByCreUserId()
  },
  components: {
    changephone,
    changeEmail,
    changePwd,
    changeUserPwd,
    forgetUserPwd,
    changeZipPwd,
    forgetZipPwd
  },
  mixins: [getUserData],
  filters: {
    thousandbit (value = '0') {
      return String(value).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
    }
  },
  computed: {
    xScroll: () => {
      return columns.reduce((pre, curr) => {
        return pre + curr.width
      }, 0)
    }
  },
  methods: {
    changeUserPwdFlag () {
      this.getPersonalInfo()
    },
    getNewPersonalInfo () {
      this.getPersonalInfo()
    },
    forgetPassShow () {
      this.$refs.changeUserPwd.setModal1Visible(false)
      this.$refs.forgetUserPwd.setModal1Visible(true)
    },
    changephone () {
      this.$refs.changephone.setModal1Visible(true)
    },
    changeEmail () {
      this.$refs.changeEmail.setModal1Visible(true)
    },
    changePwd () {
      this.$refs.changePwd.setModal1Visible(true)
    },
    changeUserPwd () {
      this.$refs.changeUserPwd.setModal1Visible(true)
    },
    changeZipPwd () {
      this.$refs.changeZipPwd.setModal1Visible(true)
    },
    changeZipPwdFlag () {
      this.getPersonalInfo()
    },
    forgetZipPassShow () {
      this.$refs.changeZipPwd.setModal1Visible(false)
      this.$refs.forgetZipPwd.setModal1Visible(true)
    },
    // forgetUserPwd () {
    //   this.$refs.forgetUserPwd.setModal1Visible(true)
    // },
    goto (path) {
      this.$router.push(path)
    },
    async getPersonalInfo () {
      var params = {}
      var { data } = await server.getPersonalInfo(params)
      if (data.code === 200) {
        this.userInfo = data.data
        // console.log(this.userInfo)
      } else {
        this.$message.error(data.msg)
      }
    },
    onShowSizeChange (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.pageFindTrdOrderByCreUserId()
    },
    onChange (pageNumber) {
      this.pagination.current = pageNumber
      this.pageFindTrdOrderByCreUserId()
    },
    async pageFindTrdOrderByCreUserId () {
      var params = {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        category: this.category
      }
      var { data } = await server.getRecharge(params)
      if (data.code === 200) {
        this.orderlist = data.data.list
        this.pagination.total = parseInt(data.data.total)
      } else {
        this.$message.error(data.msg)
      }
    },
    handleSearch (val) {
      // console.log(val)
      this.category = val
      this.pageFindTrdOrderByCreUserId()
    }
  }
}
</script>
<style lang="less">
.account {
  .mini-width {
    min-width: 1200px;
  }

  .default-width {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
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
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .swiper-regin {
    li {
      height: 530px;
      background: url(../assets/index/bg4.jpg) no-repeat 50%;
    }

    .swiper-button {
      text-align: center;
      padding-top: 450px;
    }

    .swiper-button .el-button {
      color: #fff;
      border-radius: 0;
      padding: 12px 40px;
      background-color: transparent;
    }
  }

  .info-regin {
    min-height: 215px;
    padding: 20px 30px;
    margin-top: 35px;
    margin-bottom: 35px;
    background-color: #fff;
    color: #585f68;

    .account-list {
      width: 35%;
      float: left;
      vertical-align: top;
    }

    .balance-list {
      width: 25%;
      float: left;
      vertical-align: top;
      text-align: left;
      h2,
      p,
      ul {
        text-align: center;
      }
    }

    .data-list,
    .data-list ul li {
      float: left;
      vertical-align: top;
    }

    .data-list {
      width: 40%;
      padding-left: 40px;
    }

    h2 {
      font-size: 14px;
      font-weight: 400;
      padding-bottom: 30px;
    }

    .account-list ul {
      padding-right: 40px;
      border-right: 1px solid #dcdcdc;
    }

    .account-list ul li {
      height: 28px;
      line-height: 28px;
      margin-bottom: 20px;
    }

    .el-button--mini,
    .el-button--small {
      font-size: 12px;
      border-radius: 3px;
    }

    .el-button--mini,
    .el-button--mini.is-round {
      padding: 7px 15px;
    }

    .account-list ul li .el-button {
      float: right;
    }

    .account-list ul li img {
      margin-right: 10px;
      vertical-align: top;
    }

    .account-list ul li h3 {
      font-size: 18px;
      display: inline-block;
    }

    .account-list ul li p {
      font-size: 14px;
      display: inline-block;
    }

    .balance-list ul {
      height: 80px;
      border-right: 1px solid #dcdcdc;
    }

    .balance-list ul li {
      font-size: 18px;
      line-height: 28px;
      margin-bottom: 20px;
    }

    .data-list {
      width: 40%;
      padding-left: 40px;
    }

    .data-list,
    .data-list ul li {
      float: left;
      vertical-align: top;
    }

    .data-list ul li {
      width: 50%;
      padding-top: 15px;
      text-align: center;
    }

    .data-list ul li.first {
      height: 80px;
    }

    .data-list ul li.last {
      border-left: 1px solid #dcdcdc;
    }

    .data-list ul .el-button {
      width: 120px;
      border-radius: 0;
    }

    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }

    .el-button--danger {
      color: #fff;
      background-color: #f56c6c;
      border-color: #f56c6c;
    }

    .data-list ul .el-button {
      width: 120px;
      border-radius: 0;
    }

    .data-list ul li p {
      font-size: 14px;
      margin-top: 5px;
    }
  }

  .order-regin {
    padding: 20px 30px;
    margin-bottom: 35px;
    background-color: #fff;

    h2 {
      font-size: 14px;
      font-weight: 400;
      padding-bottom: 15px;
    }
  }

  .pages-regin {
    text-align: right;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .ant-table-thead > tr > th div {
    color: #909399;
    font-weight: 500;
  }
}
</style>
