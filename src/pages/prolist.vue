<template>
  <div class="prolist">
    <a-tabs defaultActiveKey="" @change="callback">
      <a-tab-pane tab="全部" key="">
        <ul class="list-box">
          <li v-for="(item) in prolist" :key="item.id" @click="goto(item)">
            <img data-v-6674de2a="" height="100"
                 :src="item.icon" :alt="item.name">
            <h3 data-v-6674de2a="">{{item.name}}</h3>
            <p data-v-6674de2a="">{{item.description}}</p>
          </li>
        </ul>
      </a-tab-pane>
      <a-tab-pane v-for="product in proGrouplist" :tab="product.name" :key="product.id">
        <ul class="list-box">
          <li v-for="(item) in prolist" :key="item.id" @click="goto(item)">
            <img data-v-6674de2a="" height="100"
                 :src="item.icon" :alt="item.name">
            <h3 data-v-6674de2a="">{{item.name}}</h3>
            <p data-v-6674de2a="">{{item.description}}</p>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import server from '../server/index'

export default {
  name: 'prolist',
  data () {
    return {
      proGrouplist: [],
      prolist: []
    }
  },
  mounted () {
    this.getProductGroupList()
  },
  methods: {
    callback (key) {
      this.productInfoList(key)
    },
    goto ({externalLinks: path, id}) {
      if (this.getSessionToken()) {
        this.$router.push('/empty')
      } else {
        if (path) {
          // this.$router.push(path)
          window.location.href = path
        } else {
          this.$router.push({path: '/prolist/details', query: {id}})
        }
      }
    },
    gotoPage (page) {
      if (page) {
        window.location.href = page
      }
    },
    async getProductGroupList () {
      var {data} = await server.getProductGroupList()
      if (data.code === 200) {
        this.proGrouplist = data.data
        this.productInfoList()
      } else {
        this.$message.error(data.msg)
      }
    },
    async productInfoList (id) {
      var params = {}
      if (id) {
        params.productGroupId = id
      }
      var {data} = await server.productInfoList(params)
      if (data.code === 200) {
        this.prolist = data.data
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less">
  .prolist {
    padding-top: 30px;
    padding-bottom: 80px;

    .ant-tabs-content {
      min-height: 500px;
    }

    .ant-tabs-bar {
      margin-bottom: 0;
    }

    .ant-tabs-nav-container {
      font-size: 18px;
      color: #595f68;
      font-weight: 700;
      text-align: center;
    }

    .list-box {
      font-size: 0;
      margin-left: -10px;
      margin-right: -10px;
      min-height: 500px;
    }

    .list-box li {
      width: 590px;
      height: 160px;
      padding: 30px;
      vertical-align: top;
      margin: 30px 10px 0;
      box-shadow: 1px 2px 17px 4px rgba(223, 230, 239, .5);
      transition: all .4s ease-in-out;
      display: inline-block;
      cursor: pointer;
    }

    .list-box li:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px #e5e5e5;
    }

    .list-box li img {
      float: left;
      margin-right: 30px;
      vertical-align: top;
    }

    .list-box li h3 {
      font-size: 18px;
      color: #595f68;
      font-weight: 700;
      padding-top: 15px;
    }

    .list-box li p {
      font-size: 14px;
      color: #a7abb0;
      margin-top: 10px;
      line-height: 20px;
    }

    .ant-tabs-tab {
      width: auto;
      min-width: 120px;
      text-align: center;
    }
  }
</style>
