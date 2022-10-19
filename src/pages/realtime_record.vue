<template>
  <div class="testrecord">
    <!-- <ul class="mini-width swiper-regin">
      <li class="mini-width">
        <div class="default-width swiper-button">
          <a-button @click="$router.push('/realtime')">立即接入</a-button>
        </div>
      </li>
    </ul> -->
    <!-- 空号检测结果 -->
    <div class="empty-test-record">
      <div class="default-width realtime-result-regin" v-if="isTestResultShow">
        <h2>检测结果</h2>
        <ul>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 正常用户 </template>
                <strong style="border-color: rgb(73, 146, 255)">正常</strong>
                <h3>{{ testResult.normal || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.normal ? 'none' : 'auto'
              }"
              style="cursor: pointer"
              @click="downloadTxt(testResult, '正常.txt', 'normalFilePath')"
            >
              <a
                :style="{
                  'pointer-events': !testResult.normal ? 'none' : 'auto'
                }"
                class="download-btn"
                >下载</a
              >
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 正常(携号转网) </template>
                <strong style="border-color: rgb(246, 179, 127)"
                  >正常(携号转网)</strong
                >
                <h3>{{ testResult.numberPortability || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.numberPortability
                  ? 'none'
                  : 'auto'
              }"
              style="cursor: pointer"
              @click="downloadTxt(testResult, '携号转网.txt', 'mnpFilePath')"
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content">
                  近一个月内出现过空号、停机状态的号码
                </template>
                <strong style="border-color: rgb(162, 162, 160)">空号</strong>
                <h3>{{ testResult.empty || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{ 'pointer-events': !testResult.empty ? 'none' : 'auto' }"
              style="cursor: pointer"
              @click="downloadTxt(testResult, '空号.txt', 'emptyFilePath')"
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 通话中 </template>
                <strong style="border-color: rgb(0 241 255)">通话中</strong>
                <h3>{{ testResult.onCall || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.onCall ? 'none' : 'auto'
              }"
              style="cursor: pointer"
              @click="downloadTxt(testResult, '通话中.txt', 'oncallFilePath')"
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 不在网(空号) </template>
                <strong style="border-color: rgb(124 120 120)"
                  >不在网(空号)</strong
                >
                <h3>{{ testResult.onlineButNotAvailable || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.onlineButNotAvailable
                  ? 'none'
                  : 'auto'
              }"
              style="cursor: pointer"
              @click="
                downloadTxt(testResult, '不在网(空号).txt', 'notOnlineFilePath')
              "
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 关机号码 </template>
                <strong style="border-color: rgb(255 132 0)">关机</strong>
                <h3>{{ testResult.shutdown || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.shutdown ? 'none' : 'auto'
              }"
              style="cursor: pointer"
              @click="downloadTxt(testResult, '关机.txt', 'shutdownFilePath')"
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 长时间关机的用户 </template>
                <strong style="border-color: rgb(255 190 0)">疑似关机</strong>
                <h3>{{ testResult.suspectedShutdown || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.suspectedShutdown
                  ? 'none'
                  : 'auto'
              }"
              style="cursor: pointer"
              @click="
                downloadTxt(testResult, '疑似关机.txt', 'likeShutdownFilePath')
              "
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 停机 </template>
                <strong style="border-color: rgb(218 0 255)">停机</strong>
                <h3>{{ testResult.serviceSuspended || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.serviceSuspended ? 'none' : 'auto'
              }"
              style="cursor: pointer"
              @click="downloadTxt(testResult, '停机.txt', 'tingjiFilePath')"
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content"> 号码错误 </template>
                <strong style="border-color: rgb(255, 0, 0)">号码错误</strong>
                <h3>{{ testResult.unknown || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.unknown ? 'none' : 'auto'
              }"
              style="cursor: pointer"
              @click="
                downloadTxt(testResult, '号码错误.txt', 'unknownFilePath')
              "
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
          <li>
            <span>
              <a-popover overlayClassName="testrecordpop">
                <template slot="content">
                  号码状态未知(不计费), 可下载重新检测
                </template>
                <strong style="border-color: rgb(255 0 210)">未知</strong>
                <h3>{{ testResult.exceptionFailCount || 0 }}</h3>
              </a-popover>
            </span>
            <p
              :style="{
                'pointer-events': !testResult.exceptionFailCount
                  ? 'none'
                  : 'auto'
              }"
              style="cursor: pointer"
              @click="
                downloadTxt(
                  testResult,
                  '未知.txt',
                  'exceptionFailCountFilePath'
                )
              "
            >
              <a class="download-btn">下载</a>
            </p>
          </li>
        </ul>
      </div>

      <div class="default-width download-regin">
        <h3>一键下载全部状态</h3>
        <a
          v-if="isTestResultShow"
          :disabled="!isDownloadAll"
          @click="downloadZip(testResult)"
          class="el-button el-button--default el-button--small"
          >下载</a
        >
      </div>

      <div class="default-width echart-regin">
        <h2>历史检测/月</h2>
        <div class="echart-handle">
          <span>选择月份：</span>
          <a-month-picker
            placeholder="选择月份"
            @change="onMounthChange"
            v-model="month"
            :allowClear="false"
          />
          <button
            type="button"
            class="el-button el-button--primary"
            v-if="false"
          >
            <!----><i class="el-icon-download"></i><span>下载报表</span>
          </button>
        </div>
        <div class="echart-title">
          {{ moment(month).format('YYYY-MM') }}月检测结果展示
        </div>
        <div v-if="echartsData">
          <div id="realtimeMainMore"></div>
        </div>
        <div class="month-nodata" v-else>此月无检测数据!</div>
      </div>
      <div class="default-width order-regin">
        <h2>历史检测记录</h2>
        <div class="history-handle">
          <span class="demonstration">日期：</span>
          <a-range-picker
            :default-value="searchTimeVal"
            :allowClear="false"
            @change="onDatePickerChange"
          />
          <button
            type="button"
            class="el-button el-button--primary"
            @click="handleChangeQuery"
          >
            <span>查询</span>
          </button>
          <button
            type="button"
            class="el-button el-button--default"
            v-if="false"
          >
            <span>导出</span>
          </button>
          <a-dropdown placement="bottomLeft">
            <a-button
              >批量操作
              <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="downloadBatch()">批量下载</a>
              </a-menu-item>
              <a-menu-item v-if="false"> 批量删除 </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <a-table
          :columns="columns"
          :rowKey="(record) => record.id"
          :dataSource="orderlist"
          :loading="loading"
          :pagination="false"
          :rowSelection="rowSelection"
          :scroll="{ x: xScroll }"
        >
          <span slot="name" slot-scope="text, record">
            {{ record.isOldData ? text : record.zipName }}
          </span>
          <span slot="size" slot-scope="text, record">
            {{
              record.isOldData
                ? computeFileSize(record.size)
                : computeFileSize(record.zipSize)
            }}
          </span>
          <span slot="normal" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.normal || record.normal == '0' ? 'none' : 'auto'
              }"
              @click="downloadTxt(record, '正常.txt', 'normalFilePath')"
              >{{ record.normal || 0 }}</a
            >
          </span>
          <span slot="numberPortability" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.numberPortability || record.numberPortability == '0'
                    ? 'none'
                    : 'auto'
              }"
              @click="downloadTxt(record, '携号转网.txt', 'mnpFilePath')"
              >{{ record.numberPortability || 0 }}</a
            >
          </span>
          <span slot="empty" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.empty || record.empty == '0' ? 'none' : 'auto'
              }"
              @click="downloadTxt(record, '空号.txt', 'emptyFilePath')"
              >{{ record.empty || 0 }}</a
            >
          </span>
          <span slot="onCall" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.onCall || record.onCall == '0' ? 'none' : 'auto'
              }"
              @click="downloadTxt(record, '通话中.txt', 'oncallFilePath')"
              >{{ record.onCall || 0 }}</a
            >
          </span>
          <span slot="onlineButNotAvailable" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.onlineButNotAvailable ||
                  record.onlineButNotAvailable == '0'
                    ? 'none'
                    : 'auto'
              }"
              @click="
                downloadTxt(record, '不在网(空号).txt', 'notOnlineFilePath')
              "
              >{{ record.onlineButNotAvailable || 0 }}</a
            >
          </span>
          <span slot="shutdown" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.shutdown || record.shutdown == '0' ? 'none' : 'auto'
              }"
              @click="downloadTxt(record, '关机.txt', 'shutdownFilePath')"
              >{{ record.shutdown || 0 }}</a
            >
          </span>
          <span slot="suspectedShutdown" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.suspectedShutdown || record.suspectedShutdown == '0'
                    ? 'none'
                    : 'auto'
              }"
              @click="
                downloadTxt(record, '疑似关机.txt', 'likeShutdownFilePath')
              "
              >{{ record.suspectedShutdown || 0 }}</a
            >
          </span>
          <span slot="serviceSuspended" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.serviceSuspended || record.serviceSuspended == '0'
                    ? 'none'
                    : 'auto'
              }"
              @click="downloadTxt(record, '停机.txt', 'tingjiFilePath')"
              >{{ record.serviceSuspended || 0 }}</a
            >
          </span>
          <span slot="unknown" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.unknown || record.unknown == '0' ? 'none' : 'auto'
              }"
              @click="downloadTxt(record, '号码错误.txt', 'unknownFilePath')"
              >{{ record.unknown || 0 }}</a
            >
          </span>
          <span slot="exceptionFailCount" slot-scope="text, record">
            <a
              :style="{
                'pointer-events':
                  !record.exceptionFailCount || record.exceptionFailCount == '0'
                    ? 'none'
                    : 'auto'
              }"
              @click="
                downloadTxt(record, '未知.txt', 'exceptionFailCountFilePath')
              "
              >{{ record.exceptionFailCount || 0 }}</a
            >
          </span>
          <span slot="totalNumber" slot-scope="text, record">
            {{ Number(record.totalNumber) }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a @click="downloadZip(record)">下载</a>
            <a style="margin-left: 16px" @click="deleteRealtimeById(record)"
              >删除</a
            >
          </span>
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
    </div>
  </div>
</template>
<script>
import { computeFileSize } from '../utils'
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
    width: '200px',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: '100px',
    scopedSlots: { customRender: 'size' }
  },
  {
    title: '日期',
    dataIndex: 'createTime',
    width: '180px'
  },
  {
    title: '正常',
    dataIndex: 'normal',
    width: '100px',
    scopedSlots: { customRender: 'normal' }
  },
  {
    title: '正常(携号转网)',
    dataIndex: 'numberPortability',
    width: '150px',
    scopedSlots: { customRender: 'numberPortability' }
  },
  {
    title: '空号',
    dataIndex: 'empty',
    width: '100px',
    scopedSlots: { customRender: 'empty' }
  },
  {
    title: '通话中',
    dataIndex: 'onCall',
    width: '100px',
    scopedSlots: { customRender: 'onCall' }
  },
  {
    title: '不在网(空号)',
    dataIndex: 'onlineButNotAvailable',
    width: '150px',
    scopedSlots: { customRender: 'onlineButNotAvailable' }
  },
  {
    title: '关机',
    dataIndex: 'shutdown',
    width: '100px',
    scopedSlots: { customRender: 'shutdown' }
  },
  {
    title: '疑似关机',
    dataIndex: 'suspectedShutdown',
    width: '100px',
    scopedSlots: { customRender: 'suspectedShutdown' }
  },
  {
    title: '停机',
    dataIndex: 'serviceSuspended',
    width: '100px',
    scopedSlots: { customRender: 'serviceSuspended' }
  },
  {
    title: '号码错误',
    dataIndex: 'unknown',
    width: '100px',
    scopedSlots: { customRender: 'unknown' }
  },
  {
    title: '未知',
    dataIndex: 'exceptionFailCount',
    width: '100px',
    scopedSlots: { customRender: 'exceptionFailCount' }
  },
  {
    title: '总条数',
    dataIndex: 'totalNumber',
    width: '100px',
    scopedSlots: { customRender: 'totalNumber' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '220px',
    scopedSlots: { customRender: 'action' }
  }
]

const getFile = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob'
    })
      .then((data) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error.toString())
      })
  })
}

export default {
  name: 'RealtimeRecord',
  components: {},
  data () {
    return {
      testResult: {},
      month: this.moment(),
      data: { thereCount: {}, shutCount: {}, unknownSize: {}, sixCount: {} },
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
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
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
      endDate: this.moment().format('YYYY-MM-DDT00:00:00.000') + 'Z',
      startDate: this.moment().format('YYYY-MM-DDT00:00:00.000') + 'Z',
      echartsData: null,
      searchTimeVal: [
        this.moment(this.moment().format('YYYY-MM-DD')),
        this.moment(this.moment().format('YYYY-MM-DD'))
      ],
      isDownloadAll: false,
      computeFileSize
    }
  },
  props: {
    personalInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {},
  async mounted () {
    this.getRealtimePageList()
    this.getPageByMobile()
    this.getLatestRealtime()
  },
  mixins: [getUserData],
  computed: {
    isTestResultShow () {
      // 老数据需要status为9才展示，新数据不需要
      if (this.testResult.isOldData) {
        console.log(this.testResult)
        if (this.testResult.status === 9) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    xScroll: () => {
      return columns.reduce((pre, curr) => {
        return pre + curr.width
      }, 0)
    }
  },
  methods: {
    // 批量下载
    downloadBatch () {
      if (this.selectedRows !== null) {
        if (this.selectedRows.length === 1) {
          this.downloadZip(this.selectedRows[0])
        } else {
          const zip = new JSZip()
          const cache = {}
          const promises = []
          this.selectedRows.forEach((item) => {
            var userInfo = this.getUserInfo()
            var customerId = userInfo.id
            let url
            if (item.isOldData) {
              url = `${this.batchDownload}/realtime/${customerId}/${item.id}/${
                item.name + '.zip'
              }`
            } else {
              url = `${this.batchDownload}/actual/${item.zipPath}`
            }
            const promise = getFile(encodeURI(url)).then((data) => {
              let fileName = (item.name || item.zipName) + '.zip'
              if (cache[item.name || item.zipName] !== undefined) {
                fileName = (item.name || item.zipName) + Date.now() + '.zip'
              }
              // 下载文件, 并存成ArrayBuffer对象
              zip.file(fileName, data, { binary: true }) // 逐个添加文件
              cache[item.name || item.zipName] = data
            })
            promises.push(promise)
          })
          Promise.all(promises).then(() => {
            zip.generateAsync({ type: 'blob' }).then((content) => {
              // 生成二进制流
              FileSaver.saveAs(content, '批量下载.zip') // 利用file-saver保存文件  自定义文件名
            })
          })
        }
      }
    },
    // 下载单个压缩包
    downloadZip (rows) {
      const { isOldData, customerId, id, name, zipPath } = rows
      console.log(isOldData, customerId, id, name, zipPath)
      let url = ''
      if (isOldData) {
        // console.log('老数据')
        if (rows.zip_url) {
          // 检测结果会直接返回这个URL
          url = `${this.downloadDomain}/actual/${rows.zip_url}`
        } else {
          url = `${this.downloadDomain}/realtime/${
            customerId || this.getUserInfo().id
          }/${id}/${name + '.zip'}`
        }
      } else {
        // console.log('新数据')
        url = `${this.downloadDomain}/actual/${zipPath}`
      }
      this.downloadfunc(url)
    },
    downloadTxt (rows, names = '', newUrl) {
      if (this.personalInfo.unzipPassword) {
        this.$message.warning('已设置解压密码，无法直接下载单个文件')
        return
      }
      const { customerId, id, name, isOldData } = rows
      console.log(id, name, isOldData, names)
      // 还需判断新数据/老数据，新数据直接使用返回的URL，老数据继续拼接
      let url = ''
      if (isOldData) {
        // console.log('老数据')
        url = `${this.downloadDomain}/realtime/${
          customerId || this.getUserInfo().id
        }/${id}/${names}`
      } else {
        // console.log('新数据')
        url = `${this.downloadDomain}/actual/${rows[newUrl]}`
      }
      // console.log(url)

      this.downloadfunc(url)
    },
    // 下载方法
    downloadfunc (url) {
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
      this.getRealtimePageList()
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
    deleteRealtimeById (record) {
      var that = this
      this.$confirm({
        title: '删除',
        content: '删除后，您将无法再下载删除的检测结果包，请确认是否删除?',
        onOk () {
          return new Promise((resolve, reject) => {
            var params = {
              id: record.id,
              isOldData: record.isOldData
            }
            server.deleteRealtimeById(params).then(({ data }) => {
              if (data.code === 200) {
                that.getPageByMobile()
              } else {
                that.$message.error(data.msg)
              }
              resolve()
            })
          })
        },
        onCancel () {}
      })
    },
    async getLatestRealtime () {
      var params = {}
      var { data } = await server.getLatestRealtime(params)
      // debugger
      if (data.code === 200) {
        this.testResult = data.data || {}
        if (data.data) {
          this.isDownloadAll = true
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    async getRealtimePageList () {
      var params = {
        year: this.moment(this.month).format('YYYY'),
        month: parseInt(this.moment(this.month).format('MM'))
      }
      var { data } = await server.realtimeStatistics(params)
      if (data.code === 200) {
        this.echartsData = null
        if (data.data && data.data.length > 0) {
          var day = new Date(params.year, params.month, 0)
          var len = day.getDate()
          this.echartsData = this.formatData(
            data.data,
            len,
            params.year,
            params.month
          )
          this.$nextTick(() => {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(
              document.getElementById('realtimeMainMore')
            )
            // 使用刚指定的配置项和数据显示图表。
            myChart.clear()
            myChart.setOption(this.echartsData, true)
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
        createTimeEnd: this.endDate
          ? this.moment(this.endDate).format('YYYY-MM-DDT23:59:59.000') + 'Z'
          : '',
        createTimeFrom: this.startDate
          ? this.moment(this.startDate).format('YYYY-MM-DDT00:00:00.000') + 'Z'
          : '',
        page: this.pagination.current,
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
      var { data } = await server.getRealtimePageList(params)
      if (data.code === 200) {
        this.orderlist = data.data.list
        this.pagination.total = parseInt(data.data.total)
        this.pagination.current = 1
      } else {
        this.$message.error(data.resultMsg)
      }
    },
    formatData (t, len, y, m) {
      var e = []
      var zc = []
      var xhzw = []
      var kh = []
      var thz = []
      var bzw = []
      var gj = []
      var ysgj = []
      var tj = []
      var cw = []
      var wz = []
      var total = []

      var tt = {}
      t.forEach((v) => {
        tt[new Date(v.day).getDate()] = v
      })
      for (let h = 1; h <= len; h++) {
        if (!tt[h]) {
          e.push(`${y}-${m}-${h}`)
          zc.push(0)
          xhzw.push(0)
          kh.push(0)
          thz.push(0)
          bzw.push(0)
          gj.push(0)
          ysgj.push(0)
          tj.push(0)
          cw.push(0)
          wz.push(0)
          total.push(0)
          continue
        }
        e.push(tt[h].day)
        zc.push(tt[h].normal)
        xhzw.push(tt[h].numberPortability)
        kh.push(tt[h].empty)
        thz.push(tt[h].onCall)
        bzw.push(tt[h].onlineButNotAvailable)
        total.push(tt[h].totalNumber)
      }

      return {
        title: {
          top: '10',
          text: '检测包数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: [
          'rgb(73, 146, 255)',
          'rgb(246, 179, 127)',
          'rgb(162, 162, 160)',
          'rgb(0 241 255)',
          'rgb(124 120 120)',
          'rgb(255 132 0)',
          'rgb(255 190 0)',
          'rgb(218 0 255)',
          'rgb(255, 0, 0)',
          'rgb(255 0 210)',
          '#67C23A'
        ],
        legend: {
          top: '10',
          data: [
            '正常',
            '正常(携号转网)',
            '空号',
            '通话中',
            '不在网(空号)',
            '关机',
            '疑似关机',
            '停机',
            '号码错误',
            '未知',
            '总条数'
          ]
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
                var zc = t.series
                let table = `<table class="el-table">
                  <thead class="is-group">
                    <tr>
                      <th><div class="cell">日期</div></th>
                      <th><div class="cell">${zc[0].name}</div></th>
                      <th><div class="cell">${zc[1].name}</div></th>
                      <th><div class="cell">${zc[2].name}</div></th>
                      <th><div class="cell">${zc[3].name}</div></th>
                      <th><div class="cell">${zc[4].name}</div></th>
                      <th><div class="cell">${zc[5].name}</div></th>
                      <th><div class="cell">${zc[6].name}</div></th>
                      <th><div class="cell">${zc[7].name}</div></th>
                      <th><div class="cell">${zc[8].name}</div></th>
                      <th><div class="cell">${zc[9].name}</div></th>
                      <th><div class="cell">${zc[10].name}</div></th>
                    </tr>
                  </thead>
                <tbody>`
                for (let i = 0, xhzw = e.length; i < xhzw; i++) {
                  console.log(zc)
                  table += `<tr class="el-table__row">
                    <td><div class="cell">${e[i]}</div></td>
                    <td><div class="cell">${zc[0].data[i]}</div></td>
                    <td><div class="cell">${zc[1].data[i]}</div></td>
                    <td><div class="cell">${zc[2].data[i]}</div></td>
                    <td><div class="cell">${zc[3].data[i]}</div></td>
                    <td><div class="cell">${zc[4].data[i]}</div></td>
                    <td><div class="cell">${zc[5].data[i]}</div></td>
                    <td><div class="cell">${zc[6].data[i]}</div></td>
                    <td><div class="cell">${zc[7].data[i]}</div></td>
                    <td><div class="cell">${zc[8].data[i]}</div></td>
                    <td><div class="cell">${zc[9].data[i]}</div></td>
                    <td><div class="cell">${zc[10].data[i]}</div></td>
                  </tr>`
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
        series: [
          {
            name: '正常',
            type: 'line',
            data: zc
          },
          {
            name: '正常(携号转网)',
            type: 'line',
            data: xhzw
          },
          {
            name: '空号',
            type: 'line',
            data: kh
          },
          {
            name: '通话中',
            type: 'line',
            data: thz
          },
          {
            name: '不在网(空号)',
            type: 'line',
            data: bzw
          },
          {
            name: '关机',
            type: 'line',
            data: gj
          },
          {
            name: '疑似关机',
            type: 'line',
            data: ysgj
          },
          {
            name: '停机',
            type: 'line',
            data: tj
          },
          {
            name: '号码错误',
            type: 'line',
            data: cw
          },
          {
            name: '未知',
            type: 'line',
            data: wz
          },
          {
            name: '总条数',
            type: 'line',
            data: total
          }
        ]
      }
    }
  }
}
</script>
<style lang="less">
.testrecord {
  background: #f1f1f1;
  .mini-width {
    min-width: 1200px;
  }

  .default-width {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-regin {
    margin-top: -60px;
    li {
      height: 530px;
      background: url('../assets/index/bg4.jpg') no-repeat center;
    }
  }

  .download-btn {
    border: 1px solid #dcdfe6;
    color: #606266;
    cursor: pointer;
    padding: 10px 25px;
    border-radius: 3px;
  }

  .swiper-button {
    .ant-btn {
      color: #fff;
      border-radius: 0px;
      padding: 0 40px;
      background-color: transparent;
      height: 40px;
      line-height: 40px;
      text-align: center;

      &:hover {
        color: #333;
        background-color: #fff;
        border: #fff;
      }
    }

    text-align: center;
    padding-top: 450px;
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

  .realtime-result-regin {
    padding: 20px 30px 0;
    background-color: #fff;

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
      width: 20%;
      font-size: 14px;
      text-align: center;
      vertical-align: top;
      padding-bottom: 30px;
      display: inline-block;
      border-left: 1px solid #e7e7e7;
      &:nth-child(6) {
        border-left: none;
      }
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
    transition: all 0.3s;
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

#realtimeMainMore {
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

  .el-table--border:after,
  .el-table--group:after,
  .el-table:before {
    content: '';
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

  .el-table th > .cell,
  .el-table th div {
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

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5;
  }

  .el-table td,
  .el-table th {
    padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }

  .el-table .cell,
  .el-table th div {
    text-overflow: ellipsis;
    padding-right: 10px;
    overflow: hidden;
  }

  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell,
  .el-table .cell,
  .el-table th div {
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
