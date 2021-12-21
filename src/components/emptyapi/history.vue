<template>
  <div class="history-view">
    <a-table
      :columns="columns"
      :rowKey="(record) => record.id"
      :dataSource="tableData"
      :loading="tableloading"
      :pagination="pagination"
      @change="onTableChange"
    >
      <template slot="name" slot-scope="text">
        <span>{{ text.indexOf('_') === -1 ? text : text.split('_')[1] }}</span>
      </template>
    </a-table>
  </div>
</template>
<script>
import server from '../../server/index'

export default {
  props: {
    historyUrl: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tableData: [],
      tableloading: false,
      pagination: {
        // 表格分页
        current: 1,
        pageSize: 10,
        total: 0,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: true
      }
    }
  },
  computed: {},
  mounted () {
    // console.log(this.historyUrl)
    this.getPageByMobile()
  },
  methods: {
    onTableChange (pagination) {
      this.pagination = {
        ...this.pagination,
        pageSize: pagination.pageSize,
        current: pagination.current
      }
      this.getPageByMobile()
    },
    getPageByMobile () {
      this.tableloading = true
      // console.log(server[this.historyUrl])
      server[this.historyUrl]({
        page: this.pagination.current,
        size: this.pagination.pageSize
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list || []
            this.pagination = {
              ...this.pagination,
              total: Number(res.data.data.total) || 0
            }
          } else {
            this.tableData = []
          }
          this.tableloading = false
        })
        .catch((error) => {
          console.log(error)
          this.tableData = []
          this.tableloading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.history-view {
  padding: 5px 10px;
}
.pages-regin {
  text-align: right;
  padding-top: 30px;
  padding-bottom: 15px;
}
</style>
