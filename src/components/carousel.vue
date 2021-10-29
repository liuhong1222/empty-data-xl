<template>
  <a-carousel effect="fade" autoplay :dots="false">
    <div class="list1 list"></div>
    <div class="list2 list"></div>
    <div class="list3 list"></div>
  </a-carousel>
</template>
<script>
export default {
  name: 'carousel'
}
</script>
<style lang="less">
  .ant-carousel {
    width: 100%;
    height: 100%;
  }

  .ant-carousel .slick-slider {

    width: 100%;
    height: 100%;
    overflow: hidden;

    .slick-list {
      width: 100%;
      height: 100%;
    }

    .list {
      width: 100%;
      height: 100vh;
      min-width: 1200px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
    }

    .list1 {
      background-image: url("../assets/home/bg1.jpg");
    }

    .list2 {
      background-image: url("../assets/home/bg2.jpg");
    }

    .list3 {
      background-image: url("../assets/home/bg3.jpg");
    }
  }
</style>
