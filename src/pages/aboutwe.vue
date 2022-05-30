<template>
  <div class="aboutwe">
    <div class="default-width details-regin">
      <div class="details-header" v-if="content.title">
        <h1>{{ content.title }}</h1>
        <p v-if="content.updateTime">发布时间：{{ content.updateTime }}</p>
      </div>
      <div v-if="content.content" class="grey-line"></div>
      <div
        class="details-content"
        v-html="escapeCharacter(content.content)"
      ></div>
      <div v-if="content.content" class="grey-line"></div>
    </div>
  </div>
</template>
<script>
import server from '../server/index'
import escapeCharacter from '../utils/escapeCharacter'
export default {
  name: 'aboutwe',
  data () {
    return {
      content: {},
      escapeCharacter: escapeCharacter
    }
  },
  mounted () {
    this.aboutus()
  },
  methods: {
    async aboutus () {
      const params = new FormData()
      // 此接口使用form-data传参，body里面要传domain
      params.append('domain', window.location.hostname)
      var { data } = await server.aboutus(params)
      if (data.code === 200) {
        this.content = data.data || {}
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style lang="less">
.aboutwe {
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
    // border-top: 1px solid #e5e5e5;
    // border-bottom: 1px solid #e5e5e5;
  }

  .grey-line {
    height: 1px;
    background-color: #e5e5e5;
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
