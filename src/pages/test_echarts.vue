<template>
  <div>
    <div class="default-width echart-regin">
      <h2>历史检测/月</h2>
      <div class="echart-handle">
        <span>选择月份：</span>
        <el-date-picker type="month" value-format="yyyy-MM" v-model="monthval" :clearable="false" :picker-options="pickerOptions" placeholder="选择月"></el-date-picker>
        <el-button type="primary" :disabled="!echartshow" icon="el-icon-download" @click="$refs.historydown.submit()">下载报表</el-button>
      </div>
      <div class="echart-title">{{monthval}}月检测结果展示</div>
      <div v-show="echartshow" id="mainMore" style="height: 450px;"></div>
      <div v-show="!echartshow" class="month-nodata">此月无检测数据!</div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import TestingOption from '@/assets/testingoption.js'
export default {
  data () {
    return {
      monthval: null,
      echartshow: true,
      pickerOptions: {
        disabledDate: (value) => {
          return this.moment().isBefore(value) || this.moment('2017-09-01').isAfter(value)
        }
      }
    }
  },
  computed: {
    baseUrl () {
      return process.env.baseUrl
    },
    downloadUrl () {
      return process.env.downloadUrl
    }
  },
  mounted () {
    this.monthval = this.moment().format('YYYY-MM')
    this.testingChart = echarts.init(document.getElementById('mainMore'))
  },
  methods: {
    getTestHistoryReport () {
      this.$axios.post('/report/getTestHistoryReport', {
        month: this.monthval,
        userId: this.userinfo.id,
        mobile: this.logininfo.username
      }).then(({ resultCode, resultObj }) => {
        if (resultCode === '000000') {
          this.renderingChart(resultObj || [])
        } else {
          this.renderingChart([])
        }
      }).catch(() => {
        this.renderingChart([])
      })
    },
    renderingChart (resultobj = []) {
      if (resultobj.length) {
        this.echartshow = true
      } else {
        this.echartshow = false
      }
      this.testingChart.setOption(TestingOption(resultobj) || {})
    }
  },
  watch: {
    monthval () {
      this.getTestHistoryReport()
    }
  },
  beforeDestroy () {
    clearInterval(this.times)
    this.testingChart.dispose()
  }
}
</script>

<style lang="less">
</style>
