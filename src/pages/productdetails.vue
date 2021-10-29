<template>
  <div class="details">
    <div class="default-width details-regin">
      <div class="details-header"><h1>{{msg.name}}</h1>
        <p>发布时间：{{msg.createTime}}</p></div>
      <div class="details-content" v-html="escapeCharacter(msg.content)"></div>
    </div>
  </div>
</template>
<script>
import server from '../server/index'
import escapeCharacter from '../utils/escapeCharacter'

export default {
  name: 'detailss',
  data () {
    return {
      msg: {},
      escapeCharacter: escapeCharacter
    }
  },
  mounted () {
    this.readNews(this.$route.query.id)
  },
  methods: {
    async readNews (id) {
      var params = {
        id
      }
      var {data} = await server.productInfoById(params)
      this.msg = data.data
    }
  }
}
</script>
<style lang="less">
  .details {

    .details-regin {
      padding: 60px 140px;
      margin-top: 35px;
      margin-bottom: 35px;
      background-color: #fff;
    }

    .default-width {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    .details-header {
      text-align: center;
    }

    .details-header h1 {
      font-size: 24px;
      color: #20273c;
      font-weight: 400;
    }

    .details-header p {
      margin-top: 30px;
      color: #7f7f7f;
      text-align: center;
    }

    .details-content {
      min-height: 350px;
      margin-top: 50px;
      padding-top: 50px;
      padding-bottom: 50px;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }

    .details-content p {
      color: #333;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 15px;
      text-indent: 28px;
    }
  }
</style>
