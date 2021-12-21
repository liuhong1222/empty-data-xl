<template>
  <!-- <a-modal title="检测结果" width="720px" :visible.sync="visible" @cancel="dialogClose">
    <json-view :data="data" />
    <span slot="footer" class="dialog-footer">
      <a-button type="primary" @click="dialogClose">关闭</a-button>
    </span>
  </a-modal> -->
  <div class="test-dialog">
    <div class="title">
      <p>检测结果</p>
    </div>
    <div class="test-result">
      <json-view v-if="JSON.stringify(data) !== '{}'" :data="data" />
      <span class="txt" v-else>点击测试后获取检测结果</span>
    </div>
  </div>
</template>
<script>
import jsonView from 'vue-json-views'
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    historyRef: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    jsonView
  },
  methods: {
    dialogClose () {
      if (this.historyRef) {
        this.visible = false
        this.historyRef.getPageByMobile()
      }
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="less" scoped>
.test-dialog {
  width: 65%;
  margin-left: 20px;
  .title {
    background-color: #f6f7f9;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    p {
      margin: 0;
    }
  }
}
.test-result {
  border: 1px solid #d9d9d9;
  padding: 10px 15px;
  height: 260px;
  overflow: auto;
  .txt {
    color: #bbb;
  }
}
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-button {
    background-color: #ddd;
  }
  ::-webkit-scrollbar-track {
    background: #ddd;
  }
  ::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 4px;
  }
</style>
