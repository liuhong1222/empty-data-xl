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
        <ul class="menu-list" v-for="item in productLine" :key="item['id']" @mouseenter="mouseOver($event, item['children'])" @mouseleave="mouseOut($event)">
            <li><img height="22" src="../assets/home/icon.png">空号检测</li>
            <li v-for="flag in item.children" :key="flag['id']">
              <a @click="goto">
                {{flag.productName}}</a>
            </li>
            <!-- <li>
              <a @click="goto">空号检测</a>
            </li> -->
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
      productLine: [
        {
          id: 11,
          productName: '空号检测',
          children: [
            {
              id: 12,
              productName: '空号检测'
            },
            {
              id: 13,
              productName: '实时检测'
            }
          ]
        }
      ]
    }
  },
  methods: {
    mouseOver (event, item = []) {
      const leng = item.length
      const elem = event.target
      elem.style.top = -(leng - 1) * 25 + 'px'
      elem.style.height = leng * 50 + 'px'
      elem.children[0].style.display = 'none'
    },
    mouseOut (event) {
      const elem = event.target
      elem.style.top = '0px'
      elem.style.height = '50px'
      elem.children[0].style.display = 'list-item'
    },
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
      top: 0px;
      width: 180px;
      height: 50px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      transition: all 0.3s;
      margin: 0px 28px;
      display: inline-block;
      vertical-align: top;
      transition: all 0.5s ease-in-out;

      li {
        a {
          height: 50px;
          color: #fff;
          line-height: 22px;
          padding-top: 14px;
          padding-bottom: 14px;
          transition: all 0.3s;
          display: block;

          &:hover {
            background-color: #16aef0;
          }
        }

        &:first-child {
          height: 50px;
          color: #fff;
          line-height: 22px;
          padding-top: 14px;
          padding-bottom: 14px;

          img {
            margin-right: 10px;
            vertical-align: top;
          }
        }

        &:last-child {
          border-bottom: none;
        }

        background-color: #00a3ee;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
</style>
