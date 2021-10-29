<template>
  <div class="news">
    <ul data-v-0ab713d7="" class="default-width news-regin">
      <li v-for="item in newslist" :key="item.id">
        <h2>{{ (item.createTime||'').substring(8,10) }}<span>{{(item.createTime||'').substring(5,7) }}</span></h2>
        <h3><a @click="showDetail(item.id)"
               class="">{{item.title}}</a></h3>
        <p><a @click="showDetail(item.id)" v-html="escapeCharacter(item.content)"></a></p>
      </li>
    </ul>
    <div class="default-width pages-regin" v-if="false">
      <a-pagination :total="pagination.total" :defaultCurrent="pagination.current" :pageSize.sync="pagination.pageSize"
                    showSizeChanger showQuickJumper
                    @showSizeChange="onShowSizeChange"
                    @change="onChange" :showTotal="total => `共 ${total} 条`"/>
    </div>
  </div>
</template>
<script>
import server from '../server/index'
import escapeCharacter from '../utils/escapeCharacter'
export default {
  name: 'news',
  data () {
    return {
      escapeCharacter: escapeCharacter,
      newslist: [],
      pagination: {
        total: 100,
        current: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.newsList()
  },
  methods: {
    showDetail (id) {
      this.$router.push({path: '/news/details', query: {id}})
    },
    onShowSizeChange (current, pageSize) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.newsList()
    },
    onChange (pageNumber) {
      this.pagination.current = pageNumber
      this.newsList()
    },
    async newsList () {
      var params = {
        // pageNo: this.pagination.current,
        // pageSize: this.pagination.pageSize
      }
      var {data} = await server.newsList(params)
      if (data.code === 200) {
        this.newslist = data.data
        this.pagination = {
          total: data.data.totalPages,
          current: data.data.currentPage,
          pageSize: data.data.numPerPage
        }
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less">
  .news {

    .news-regin {
      min-height: 50vh;
    }

    .default-width {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    .news-regin li {
      min-height: 126px;
      padding: 30px 0 30px 120px;
      border-bottom: 1px solid #e1e4ea;
      word-wrap: break-word;
      word-break: break-all;
      position: relative;
    }

    .news-regin li h2 {
      width: 120px;
      color: #3a7cff;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      left: 0;
      top: 22px;
      position: absolute;
    }

    .news-regin li h2 span {
      color: #999;
      font-size: 16px;
      margin-top: 5px;
      font-weight: 400;
      display: block;
    }

    .news-regin li h3 {
      font-size: 16px;
    }

    .news-regin li h3 a {
      color: #212737;
    }

    .news-regin li p {
      margin-top: 15px;
      line-height: 20px;
    }

    .news-regin li p a {
      color: #7f7f7f;
    }

    .pages-regin {
      text-align: right;
      padding-top: 30px;
      padding-bottom: 50px;
    }
  }
</style>
