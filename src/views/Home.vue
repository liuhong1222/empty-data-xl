<template>
  <div class="home">
    <div class="home-background">
      <carouselPart/>
    </div>
    <div class="home-header">
      <HomeHeader></HomeHeader>
    </div>
    <div class="home-main">
      <section class="mini-width main-regin">
        <img height="148" src="../assets/home/newbanner_zi.png" alt="开启大数据时代">
        <div class="menu-navig">
          <ul class="menu-list">
            <li>
              <img height="22"
                   src="../assets/home/icon.png">空号检测
            </li>
            <li>
              <a @click="goto">空号检测</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <footerinfo></footerinfo>
  </div>
</template>

<script>

import carouselPart from '../components/carousel'
import HomeHeader from '../components/homeHeader'
import footerinfo from '../components/footerinfo'

export default {
  name: 'Home',
  components: {
    carouselPart,
    HomeHeader,
    footerinfo
  },
  data () {
    return {
    }
  },
  methods: {
    goto () {
      if (this.getSessionToken()) {
        this.$router.push('/empty')
      } else {
        this.$router.push('/product')
      }
    }
  }
}
</script>

<style lang="less">
  .home {
    position: relative;
    width: 100%;
    height: 100%;

    .home-background {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;
    }

    .home-header {
      position: absolute;
      width: 100%;
      height: 81px;
      z-index: 10;
      top: 0;
      left: 0
    }

    .home-main {
      width: 100%;
      height: 282px;
      position: absolute;
      left: 0;
      top: 20%;
      z-index: 10;
      text-align: center;
    }

    .menu-navig {
      padding-top: 80px;
    }

    .menu-list {
      top: 0;
      width: 180px;
      height: 50px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      transition: all .3s;
      margin: 0 28px;
      display: inline-block;
      vertical-align: top;
      transition: all .5s ease-in-out;

      &:hover {
        li:first-child {
          display: none;
        }
      }
    }

    .menu-list li:first-child {
      height: 50px;
      color: #fff;
      line-height: 22px;
      padding-top: 14px;
      padding-bottom: 14px;
    }

    .menu-list li:first-child img {
      margin-right: 10px;
      vertical-align: top;
    }

    .menu-list li:last-child {
      border-bottom: none;
    }

    .menu-list li {
      cursor: pointer;
      background-color: #00a3ee;
      border-bottom: 1px solid hsla(0, 0%, 100%, .1);
      display: list-item;
    }

    .menu-list li a {
      height: 50px;
      color: #fff;
      line-height: 22px;
      padding-top: 14px;
      padding-bottom: 14px;
      transition: all .3s;
      display: block;
    }
  }
</style>
