<template>
  <div class="testrecord">
    <div class="default-width result-regin" v-if="testResult.status === '9'"><h2>检测结果</h2>
      <ul>
        <li><span>
          <a-popover overlayClassName="testrecordpop">
            <template slot="content">
              活跃用户
            </template>
            <strong style="border-color: rgb(73, 146, 255);">实号包</strong> <h3>{{testResult.realCount}}</h3>
          </a-popover>
          </span><p style="cursor: pointer"
          @click="downloadTxt(testResult, '活跃号(实号).txt')">下载</p></li>
        <li><span>
          <a-popover overlayClassName="testrecordpop">
            <template slot="content">
              超过六个月未激活的空号，近三个月平均流量低于30M的用户，建议当成无效处理。
            </template>
            <strong style="border-color: rgb(246, 179, 127);">沉默包</strong> <h3>{{testResult.silentCount}}</h3>
          </a-popover>
        </span> <p style="cursor: pointer" @click="downloadTxt(testResult, '沉默号.txt')">下载</p></li>
        <li><span>
          <a-popover overlayClassName="testrecordpop">
            <template slot="content">
              停机空号
            </template>
            <strong style="border-color: rgb(162, 162, 160);">空号包</strong> <h3>{{testResult.emptyCount}}</h3>
          </a-popover>
          </span><p style="cursor: pointer"
          @click="downloadTxt(testResult, '空号.txt')">下载</p></li>
        <li><span>
           <a-popover overlayClassName="testrecordpop">
            <template slot="content">
              长时间关机或未开通语音服务以及易投诉的用户
            </template>
            <strong style="border-color: rgb(255, 0, 0);">风险包</strong> <h3>{{testResult.riskCount}}</h3>
          </a-popover>
         </span><p style="cursor: pointer"
          @click="downloadTxt(testResult, '风险号.txt')">下载</p></li>
      </ul>
    </div>

    <div class="default-width download-regin"><h3>
      一键下载全部状态</h3> <a v-if="testResult.status === '9'" @click="downloadTxt(testResult)"
      class="el-button el-button--default el-button--small">下载</a></div>

    <div class="default-width echart-regin"><h2>历史检测/月</h2>
      <div class="echart-handle"><span>选择月份：</span>
        <a-month-picker placeholder="选择月份" @change="onMounthChange" v-model="month"/>
        <button type="button" class="el-button el-button--primary" v-if="false"><!----><i
          class="el-icon-download"></i><span>下载报表</span></button>
      </div>
      <div class="echart-title">{{moment(month).format('YYYY-MM')}}月检测结果展示</div>
      <div v-if="echartsData">
        <div id="mainMore"></div>
      </div>
      <div class="month-nodata" v-else>此月无检测数据!</div>
    </div>
    <div class="default-width order-regin">
      <h2>历史检测记录</h2>
      <div class="history-handle">
        <span class="demonstration">日期：</span>
        <a-range-picker @change="onDatePickerChange"/>
        <button type="button" class="el-button el-button--default" @click="handleChangeQuery"><span>查询</span></button>
        <button type="button" class="el-button el-button--default" v-if="false"><span>导出</span></button>
        <a-dropdown placement="bottomLeft">
          <a-button>批量操作
            <a-icon type="down"/>
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="downloadBatch()">批量下载</a>
            </a-menu-item>
            <a-menu-item v-if="false">
              批量删除
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="orderlist"
        :loading="loading"
        :pagination="false"
        :rowSelection="rowSelection"
      >
        <span slot="size" slot-scope="text, record">
          {{parseInt(record.size/1000)}}KB
        </span>
        <span slot="realNumber" slot-scope="text, record">
          <a @click="downloadTxt(record, '活跃号(实号).txt')">{{record.realNumber}}</a>
        </span>
        <span slot="silentNumber" slot-scope="text, record">
          <a @click="downloadTxt(record, '沉默号.txt')">{{record.silentNumber}}</a>
        </span>
        <span slot="emptyNumber" slot-scope="text, record">
          <a @click="downloadTxt(record, '空号.txt')">{{record.emptyNumber}}</a>
        </span>
        <span slot="riskNumber" slot-scope="text, record">
          <a @click="downloadTxt(record, '风险号.txt')">{{record.riskNumber}}</a>
        </span>
        <span slot="totalNumber" slot-scope="text, record">
          {{Number(record.realNumber) + Number(record.silentNumber) + Number(record.emptyNumber) + Number(record.riskNumber)}}
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="downloadTxt(record)">下载</a>
          <a style="margin-left: 16px"
             @click="deleteEmptyById(record.id)">删除</a>
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
  </div>
</template>
<script>
import echarts from 'echarts'
import server from '../server/index'
import getUserData from '../mixin/getUserData'
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

var columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: '10%',
    scopedSlots: {customRender: 'size'}
  },
  {
    title: '日期',
    dataIndex: 'createTime',
    width: '10%'
  },
  {
    title: '实号包（条）',
    dataIndex: 'realNumber',
    width: '10%',
    scopedSlots: {customRender: 'realNumber'}
  },
  {
    title: '沉默包（条）',
    dataIndex: 'silentNumber',
    width: '10%',
    scopedSlots: {customRender: 'silentNumber'}
  },
  {
    title: '空号包（条）',
    dataIndex: 'emptyNumber',
    width: '10%',
    scopedSlots: {customRender: 'emptyNumber'}
  },
  {
    title: '风险包（条）',
    dataIndex: 'riskNumber',
    width: '10%',
    scopedSlots: {customRender: 'riskNumber'}
  },
  {
    title: '总条数',
    dataIndex: 'totalNumber',
    width: '10%',
    scopedSlots: {customRender: 'totalNumber'}
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '220px',
    scopedSlots: {customRender: 'action'}
  }
]

const getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob'
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error.toString())
      })
  })
}

export default {
  name: 'testrecord',
  data () {
    return {
      testResult: {},
      month: this.moment(),
      data: {thereCount: {}, shutCount: {}, unknownSize: {}, sixCount: {}},
      columns,
      loading: false,
      orderlist: [],
      selectedRows: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.selectedRows = selectedRows
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows)
          this.selectedRows = selectedRows
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows)
          this.selectedRows = selectedRows
        }
      },
      endDate: '',
      startDate: '',
      echartsData: null
    }
  },
  async mounted () {
    this.getTestHistoryReport()
    this.getPageByMobile()
    this.getLatestEmpty()
  },
  mixins: [getUserData],
  methods: {
    downloadBatch () {
      if (this.selectedRows !== null) {
        if (this.selectedRows.length === 1) {
          this.downloadTxt(this.selectedRows[0])
        } else {
          const zip = new JSZip()
          const cache = {}
          const promises = []
          this.selectedRows.forEach(item => {
            var userInfo = this.getUserInfo()
            var customerId = userInfo.id
            var url = `/front/customer/${customerId}/${item.id}/${item.name + '.zip'}`
            const promise = getFile(encodeURI(url)).then(data => {
              let fileName = item.name + '.zip'
              if (cache[item.name] !== undefined) {
                fileName = item.name + Date.now() + '.zip'
              }
              // 下载文件, 并存成ArrayBuffer对象
              zip.file(fileName, data, { binary: true }) // 逐个添加文件
              cache[item.name] = data
            })
            promises.push(promise)
          })
          Promise.all(promises).then(() => {
            zip.generateAsync({ type: 'blob' }).then(content => {
              // 生成二进制流
              FileSaver.saveAs(content, '批量下载.zip') // 利用file-saver保存文件  自定义文件名
            })
          })
        }
      }
    },
    downloadTxt ({id, name}, names = '') {
      var userInfo = this.getUserInfo()
      var customerId = userInfo.id
      var url = `/front/customer/${customerId}/${id}/${names || (name + '.zip')}`
      // window.open(encodeURI(url))

      const iframe = document.createElement('iframe')
      iframe.style.display = 'none' // 防止影响页面
      iframe.style.height = 0 // 防止影响页面
      iframe.src = encodeURI(url)
      document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(() => {
        iframe.remove()
      }, 5 * 60 * 1000)
    },
    onMounthChange (date) {
      this.month = date
      this.getTestHistoryReport()
    },
    onDatePickerChange (date, dateString) {
      this.endDate = dateString[1]
      this.startDate = dateString[0]
    },
    goto (path) {
      this.$router.push(path)
    },
    onShowSizeChange (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.getPageByMobile()
    },
    onChange (pageNumber) {
      this.pagination.current = pageNumber
      this.getPageByMobile()
    },
    handleChangeQuery () {
      this.pagination.current = 1
      this.getPageByMobile()
    },
    handleChange () {
      this.getPageByMobile()
    },
    deleteEmptyById (id) {
      var that = this
      this.$confirm({
        title: '删除',
        content: '删除后，您将无法再下载删除的检测结果包，请确认是否删除?',
        onOk () {
          return new Promise((resolve, reject) => {
            var params = {id}
            server.deleteEmptyById(params).then(({data}) => {
              if (data.code === 200) {
                that.getPageByMobile()
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
    async getLatestEmpty () {
      var params = {}
      var {data} = await server.getLatestEmpty(params)
      if (data.code === 200) {
        this.testResult = data.data || {}
      } else {
        this.$message.error(data.msg)
      }
    },
    async getTestHistoryReport () {
      var params = {
        year: this.moment(this.month).format('YYYY'),
        month: parseInt(this.moment(this.month).format('MM'))
      }
      var {data} = await server.statistics(params)
      if (data.code === 200) {
        this.echartsData = null
        if (data.data) {
          var day = new Date(params.year, params.month, 0)
          var len = day.getDate()
          this.echartsData = this.formatData(data.data, len, params.year, params.month)
          this.$nextTick(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('mainMore'))
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.echartsData)
          })
        }
      } else {
        this.$message.error(data.resultMsg)
      }
    },
    async getPageByMobile () {
      var userInfo = this.getUserInfo()
      if (this.startDate > this.endDate) {
        var t = this.startDate
        this.startDate = this.endDate
        this.endDate = t
      }
      var params = {
        createTimeEnd: this.endDate ? this.moment(this.endDate).format('YYYY-MM-DDT23:59:59.000') + 'Z' : '',
        createTimeFrom: this.startDate ? this.moment(this.startDate).format('YYYY-MM-DDT00:00:00.000') + 'Z' : '',
        current: this.pagination.current,
        customerId: userInfo.id,
        keyword: '',
        orders: [
          {
            asc: true,
            column: ''
          }
        ],
        size: this.pagination.pageSize
      }
      var {data} = await server.getTestHistoryReport(params)
      if (data.code === 200) {
        this.orderlist = data.data.records
        this.pagination.total = parseInt(data.data.total)
        this.pagination.current = 1
      } else {
        this.$message.error(data.resultMsg)
      }
    },
    formatData (t, len, y, m) {
      var e = []
      var n = []
      var o = []
      var r = []
      var l = []
      var d = []
      var tt = {}
      t.forEach((v) => {
        tt[new Date(v.day).getDate()] = v
      })
      for (let h = 1; h <= len; h++) {
        if (!tt[h]) {
          e.push(`${y}-${m}-${h}`)
          n.push(0)
          o.push(0)
          r.push(0)
          l.push(0)
          d.push(0)
          continue
        }
        e.push(tt[h].day)
        n.push(tt[h].emptyNumber)
        o.push(tt[h].realNumber)
        r.push(tt[h].silentNumber)
        l.push(tt[h].riskNumber)
        d.push(tt[h].totalNumber)
      }

      return {
        title: {
          top: '10',
          text: '检测包数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#4992ff', '#f6b37f', '#A2A2A0', '#ff0000', '#67C23A'],
        legend: {
          top: '10',
          data: ['实号包', '沉默包', '空号包', '风险包', '总条数']
        },
        toolbox: {
          feature: {
            mark: {
              show: !0
            },
            dataView: {
              show: !0,
              readOnly: !0,
              optionToContent: (t) => {
                var e = t.xAxis[0].data
                var n = t.series
                let table = '<table class="el-table"><thead class="is-group"><tr><th><div class="cell">日期</div></th><th><div class="cell">' + n[0].name + '</div></th><th><div class="cell">' + n[1].name + '</div></th><th><div class="cell">' + n[2].name + '</div></th><th><div class="cell">' + n[3].name + '</div></th><th><div class="cell">' + n[4].name + '</div></th></tr></thead><tbody>'
                for (let i = 0, o = e.length; i < o; i++) {
                  table += '<tr class="el-table__row"><td><div class="cell">' + e[i] + '</div></td><td><div class="cell">' + n[0].data[i] + '</div></td><td><div class="cell">' + n[1].data[i] + '</div></td><td><div class="cell">' + n[2].data[i] + '</div></td><td><div class="cell">' + n[3].data[i] + '</div></td><td><div class="cell">' + n[4].data[i] + '</div></td></tr>'
                }
                table = table += '</tbody></table>'
                return table
              }
            },
            magicType: {
              show: !0,
              type: ['line', 'bar']
            },
            restore: {
              show: !0
            },
            saveAsImage: {
              show: !0
            }
          }
        },
        grid: {
          top: '60',
          left: '30',
          right: '30',
          bottom: '30',
          containLabel: !0
        },
        xAxis: {
          type: 'category',
          boundaryGap: !1,
          data: e
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '实号包',
          type: 'line',
          data: o
        }, {
          name: '沉默包',
          type: 'line',
          data: r
        }, {
          name: '空号包',
          type: 'line',
          data: n
        }, {
          name: '风险包',
          type: 'line',
          data: l
        }, {
          name: '总条数',
          type: 'line',
          data: d
        }]
      }
    }
  }
}
</script>
<style lang="less">
  .testrecord {
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
  }

  .testrecordpop {
    max-width: 200px;
  }

  #mainMore {
    width: 1140px;
    height: 450px;

    .el-table {
      position: relative;
      box-sizing: border-box;
      flex: 1;
      width: 100%;
      max-width: 100%;
      font-size: 14px;
      color: #606266;
    }

    .el-table:before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
    }

    .el-table--border:after, .el-table--group:after, .el-table:before {
      content: "";
      position: absolute;
      background-color: #ebeef5;
      z-index: 1;
    }

    .el-table thead {
      font-size: 14px;
      color: #333;
    }

    .el-table thead {
      color: #909399;
      font-weight: 500;
    }

    .el-table .cell {
      box-sizing: border-box;
      white-space: normal;
      word-break: break-all;
      line-height: 23px;
    }

    .el-table th > .cell, .el-table th div {
      display: inline-block;
      box-sizing: border-box;
    }

    .el-table th > .cell {
      position: relative;
      word-wrap: normal;
      text-overflow: ellipsis;
      vertical-align: middle;
      width: 100%;
    }

    .el-table td, .el-table th.is-leaf {
      border-bottom: 1px solid #ebeef5;
    }

    .el-table td, .el-table th {
      padding: 12px 0;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: left;
    }

    .el-table .cell, .el-table th div {
      text-overflow: ellipsis;
      padding-right: 10px;
      overflow: hidden;
    }

    .el-table--border td:first-child .cell, .el-table--border th:first-child .cell, .el-table .cell, .el-table th div {
      padding-left: 10px;
    }

    .el-table .cell {
      box-sizing: border-box;
      white-space: normal;
      word-break: break-all;
      line-height: 23px;
    }
  }
</style>
