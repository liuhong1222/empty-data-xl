<template>
  <div class="question">
    <div class="form-regin">
      <h2>我们随时为您服务</h2>
      <div class="center-box">
        <div class="form-input">
          <input type="text" placeholder="请输入搜索关键词" v-model="keyword" />
          <div type="button" class="file-butt" @click="matchcontent">
            <img height="18" src="../assets/index/search.png" />浏览
          </div>
        </div>
        <p class="form-remark">热门关键词：空号检测的原理，各个包的具体含义</p>
      </div>
    </div>
    <div class="question-wrap">
      <div data-v-940d8b7a="" class="default-width content-regin">
        <ul data-v-940d8b7a="" class="left-navig">
          <li data-v-940d8b7a=""><h3 data-v-940d8b7a="">常见产品问题</h3></li>
          <li data-v-940d8b7a="" v-for="item in fagList" :key="item.id">
            <a
              data-v-940d8b7a=""
              class="nuxt-link-exact-active"
              :class="{ 'nuxt-link-active': item.id === selectId }"
              @click="selectquestion(item)"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
        <div data-v-940d8b7a="" class="question-html" style="min-height: 360px">
          <div v-html="escapeWord"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import server from '../server/index'
import escapeCharacter from '../utils/escapeCharacter'

export default {
  name: 'question',
  data () {
    return {
      fagList: [],
      questioncontent: '',
      selectId: '',
      keyword: '',
      refresh: ''
    }
  },
  mounted () {
    this.getFagList()
  },
  computed: {
    escapeWord () {
      return escapeCharacter(this.refresh)
    }
  },
  methods: {
    matchcontent () {
      if (!this.keyword) {
        this.refresh = this.questioncontent
        return
      }
      var regEx = new RegExp(this.keyword, 'g')
      this.refresh = this.questioncontent.replace(
        regEx,
        `<span style="color: #f3bb02">${this.keyword}</span>`
      )
    },
    async getFagList () {
      var params = {}
      var { data } = await server.getFagList(params)
      if (data.code === 200) {
        for (let i = 0; i < data.data.length; i++) {
          const content = data.data[i].content
          console.log(content)
          // debugger
          // if (content.indexOf('\\"') !== -1) {
          //   content.replace(/\\"/g, '"')
          // }
        }
        this.fagList = data.data
        if (this.fagList.length > 0) {
          this.selectquestion(this.fagList[0])
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    selectquestion (question) {
      this.refresh = this.questioncontent = question.content
      this.selectId = question.id
    }
  }
}
</script>
<style lang="less">
.question {
  margin-top: -60px;
  /*padding-bottom: 60px;*/

  .form-regin {
    height: 364px;
    padding-top: 60px;
    background: url(../assets/index/B02.jpg) no-repeat 50%;
    overflow: hidden;
  }

  .form-regin h2 {
    color: #fff;
    font-size: 36px;
    font-weight: 200;
    padding-top: 55px;
    text-align: center;
  }

  .center-box {
    width: 820px;
    margin: 0 auto;
    padding-top: 35px;
  }

  .center-box .form-input {
    height: 50px;
    padding-right: 140px;
    background-color: #fff;
    position: relative;
  }

  .center-box .form-remark {
    margin-top: 10px;
    color: #f8f8f8;
    font-size: 12px;
  }

  .center-box .form-input input {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 0 20px;
  }

  .center-box .form-input .file-butt img {
    margin-right: 10px;
    vertical-align: top;
  }

  .center-box .form-input .file-butt {
    width: 120px;
    height: 50px;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 16px;
    position: absolute;
    text-align: center;
    line-height: 18px;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #4985fc;
    cursor: pointer;
  }

  .question-wrap {
    width: 100%;
    background-color: #f1f1f1;
    margin: -35px 0;
  }

  .content-regin {
    margin-top: 35px;
    margin-bottom: 35px;
    position: relative;
    background-color: #fff;
    padding: 60px 70px 50px 280px;
  }

  .default-width {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .content-regin .left-navig {
    width: 210px;
    text-align: center;
    background-color: #f3f6f9;
    left: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: 0;
  }

  .content-regin .left-navig h3 {
    color: #333;
    font-size: 18px;
    line-height: 65px;
  }

  .content-regin .left-navig a.nuxt-link-active {
    color: #fff;
    background-color: #4985fc;
  }

  .content-regin .left-navig a {
    color: #333;
    font-size: 16px;
    line-height: 46px;
    display: block;
  }

  .question-html {
    li:first-child {
      border-top: none;
      padding-bottom: 0;
    }

    li {
      padding-top: 30px;
      padding-bottom: 30px;
      border-top: 1px solid #eee;
      word-break: break-all;
      word-wrap: break-word;
    }

    h2 {
      color: #333;
      font-size: 18px;
      line-height: 18px;
      padding-bottom: 15px;
    }

    h2 label {
      color: #4985fc;
      font-size: 14px;
      margin-right: 10px;
      vertical-align: top;
    }

    p {
      color: #8d8d8d;
      padding-top: 16px;
      line-height: 30px;
    }
  }
}
</style>
