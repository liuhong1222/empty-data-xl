<template>
  <div>
    <a-modal
      class="resetDialog"
      title=""
      v-model="visible"
      :footer="null"
      :closable="false"
      :maskClosable="false"
      :keyboard="false"
      :width="635"
    >
      <p>温馨提示</p>
      <img style="margin-top: 20px;" src="../../assets/index/cry.png" alt="" height="100" width="100">
      <p style="margin-top: 30px;font-weight: 700">登录失败</p>
      <p style="font-size: 24px">系统检测您上次的登录地址为{{url}}</p>
      <p style="font-size: 24px">{{time}}秒后将自动进入到原来的地址，或点击<span style="cursor:pointer;color: rgb(13, 145, 219);white-space: nowrap"
                                        @click="goto">立即进入</span></p>

    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: true,
      time: 10
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const timer = setInterval(() => {
      this.time--
      if (this.time <= 0) {
        this.goto()
        clearInterval(timer)
      }
    }, 1000)
  },
  methods: {
    goto () {
      window.open(this.url, '_self')
    }
  }
}
</script>
<style>
  .resetDialog .ant-modal-content {
    width: 635px;
    height: 490px;
    background: rgba(9, 4, 45, 0.8);
    color: #ffffff;
    text-align: center;
  }

  .resetDialog .ant-modal-body {
    font-size: 30px;
  }
</style>
