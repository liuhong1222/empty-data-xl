<template>
  <!-- <div class="bg-mask"> -->
  <slide-verify
    :l="68"
    :r="3"
    :w="360"
    :h="260"
    :imgs="imgList"
    :accuracy="accuracy"
    slider-text="向右滑动完成验证"
    ref="slideverify"
    @success="onSuccess"
    @fail="onFail"
    @refresh="onRefresh"
  ></slide-verify>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'SliderVerify',
  data () {
    return {
      imgList: [
        require('../assets/verify/verify1.jpg'),
        require('../assets/verify/verify2.jpg'),
        require('../assets/verify/verify3.jpg'),
        require('../assets/verify/verify4.jpg'),
        require('../assets/verify/verify5.jpg')
      ],
      accuracy: 6
    }
  },
  mounted () {},
  methods: {
    onSuccess () {
      // 往父级传递验证通过的函数
      this.$emit('success')
    },
    onReset () {
      // 重置图片验证组件
      this.$refs.slideverify.reset()
    },
    onFail () {},
    onRefresh (e) {}
  }
}
</script>

<style lang="less">
.bg-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #000;
  opacity: .5;
  z-index: 2000000000;
}
#slideverify {
  position: fixed;
  width: 360px;
  height: 360px;
  top: 288px;
  left: 393px;
  transition: opacity 0.3s ease 0s;
  opacity: 1;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 3px;
}
.slide-verify {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000000002;
  opacity: 1;
}
</style>
