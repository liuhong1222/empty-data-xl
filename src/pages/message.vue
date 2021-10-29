<template>
  <div class="message">
    <div class="default-width cl-breadcrumb"><span>
            当前位置：消息列表
        </span>
    </div>
    <div class="default-width order-regin">
      <h2>消息</h2>
      <div class="history-handle">
        <span class="demonstration">选中状态：</span>
        <a-select defaultValue="" v-model="isRead" @change="handleChange">
          <a-select-option value="">
            全部
          </a-select-option>
          <a-select-option value="1">
            已读
          </a-select-option>
          <a-select-option value="0">
            未读
          </a-select-option>
        </a-select>
      </div>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="orderlist"
        :loading="loading"
        :pagination="false"
      >
         <span slot="haveRead" slot-scope="text, record">
          <span v-if="record.haveRead===0">未读</span>
          <span v-else>已读</span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="read(record)">查看</a>
          <a href="javascript:;" @click="deleteItem(record)" style="margin-left: 16px">删除</a>
        </span>
      </a-table>
      <div class="pages-regin">
        <a-pagination
          :total="pagination.total" :defaultCurrent="pagination.current"
          :pageSize.sync="pagination.pageSize"
          showSizeChanger showQuickJumper
          @showSizeChange="onShowSizeChange"
          @change="onChange" :showTotal="total => `共 ${total} 条`"/>
      </div>
    </div>
    <a-modal title="查看消息" v-model="visible" @ok="handleOk" cancelText="" wrapClassName="showmessage">
      <p>{{content}}</p>
    </a-modal>
  </div>
</template>
<script>
import server from '../server/index'
// import getUserData from '../mixin/getUserData'

var columns = [
  {
    title: '时间',
    dataIndex: 'createTime',
    width: '20%'
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: '60%'
  },
  {
    title: '状态',
    dataIndex: 'haveRead',
    width: '10%',
    scopedSlots: {customRender: 'haveRead'}
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: {customRender: 'action'}
  }
]
export default {
  name: 'message',
  data () {
    return {
      content: '',
      visible: false,
      isRead: '',
      columns,
      loading: false,
      orderlist: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      }
    }
  },
  // mixins: [getUserData],
  async mounted () {
    await this.getUserData
    this.messageList()
  },
  methods: {
    goto (path) {
      this.$router.push(path)
    },
    onShowSizeChange (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.messageList()
    },
    onChange (pageNumber) {
      this.pagination.current = pageNumber
      this.messageList()
    },
    handleChange () {
      this.messageList()
    },
    deleteItem ({id}) {
      var that = this
      this.$confirm({
        title: '删除',
        content: '确认删除该项？',
        async onOk () {
          return new Promise((resolve, reject) => {
            var params = {
              id: id
            }
            server.delete(params).then(({data}) => {
              if (data.code === 200) {
                that.messageList()
              } else {
                that.$message.error(data.msg)
              }
              resolve()
            })
          })
        },
        onCancel () {
        }
      })
    },
    async read ({id, content}) {
      var params = {
        id: id
      }
      var {data} = await server.setRead(params)
      if (data.code === 200) {
        this.messageList()
        this.visible = true
        this.content = content
      } else {
        this.$message.error(data.msg)
      }
    },
    async messageList () {
      var userInfo = this.getUserInfo()
      var params = {
        current: this.pagination.current,
        customerId: userInfo.id,
        keyword: '',
        orders: [
          {
            asc: true,
            column: ''
          }
        ],
        read: this.isRead,
        size: this.pagination.pageSize
      }
      var {data} = await server.messageList(params)
      if (data.code === 200) {
        this.orderlist = data.data.records
        this.pagination.total = parseInt(data.data.total)
      } else {
        this.$message.error(data.msg)
      }
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.visible = false
    }
  }
}
</script>
<style lang="less">
  .message {
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
      transition: .1s;
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

    .ant-calendar-picker-input {
      height: 40px;
    }

    .pages-regin {
      text-align: right;
      padding-top: 30px;
      padding-bottom: 30px;
    }

    .ant-table-thead > tr > th div {
      color: #000000;
      font-weight: 500;
    }

    .history-handle {
      .el-button {
        margin-left: 16px;
      }
    }

    .ant-dropdown-trigger {
      float: right;

      &:after {
        clear: both;
      }
    }

    .ant-dropdown-trigger {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      width: 120px;
      height: 40px;
    }

    .result-regin {
      margin-top: 35px;
      padding: 20px 30px 0;

      .swiper-pagination li.active {
        background-color: #fff;
      }

      h2 {
        font-size: 14px;
        font-weight: 400;
      }

      ul {
        font-size: 0;
        padding-top: 60px;
        padding-bottom: 30px;
      }

      ul li:first-child {
        border-left: none;
      }

      ul li {
        width: 25%;
        font-size: 14px;
        text-align: center;
        vertical-align: top;
        padding-bottom: 30px;
        display: inline-block;
        border-left: 1px solid #e7e7e7;
      }

      ul strong {
        font-size: 22px;
        color: #615f5f;
        padding-bottom: 10px;
        border-bottom-width: 4px;
        border-bottom-style: solid;
        display: inline-block;
      }

      ul h3 {
        color: #afb0b0;
        font-size: 42px;
        padding-top: 15px;
        padding-bottom: 20px;
      }
    }

    .download-regin {
      text-align: center;
      padding-top: 50px;
      padding-bottom: 50px;
      background-color: #233379;
    }

    .download-regin h3 {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
    }

    .download-regin .el-button {
      color: #fff;
      margin-top: 30px;
      padding: 10px 50px;
      transition: all .3s;
      background-color: transparent;
    }

    .echart-regin {
      margin-top: 35px;
      padding: 20px 30px;
      background-color: #fff;
    }

    .echart-regin h2 {
      font-size: 14px;
      font-weight: 400;
    }

    .echart-regin .echart-handle {
      text-align: right;
      padding-top: 20px;
      padding-bottom: 40px;
    }

    .echart-regin .echart-handle .el-button {
      margin-left: 15px;
      width: 117px;
      height: 40px;
    }

    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }

    .echart-regin .echart-title {
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      padding-bottom: 30px;
    }

    .echart-regin .month-nodata {
      color: #a8a8a8;
      font-size: 16px;
      height: 300px;
      line-height: 160px;
      text-align: center;
    }

    .history-handle {
      text-align: right;

      .ant-select-selection__rendered {
        width: 140px;
        height: 40px;
        line-height: 40px;
      }

      .ant-select-selection--single {
        width: 140px;
        height: 40px;
        line-height: 40px;
        margin-right: 16px;
      }
    }

    .cl-breadcrumb {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .cl-breadcrumb .el-button {
      padding: 0;
    }

    .cl-content-message .handle-regin .el-button[data-v-bedeef6e] {
      margin-left: 15px;
      vertical-align: top;
    }

    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }

    .anticon-delete {
      margin-right: 4px;
    }
  }

  .showmessage .ant-modal-footer button:first-of-type {
    display: none;
  }
</style>
