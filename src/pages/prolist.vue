<template>
  <div class="prolist">
    <a-tabs defaultActiveKey="all" @change="callback">
      <a-tab-pane :tab="item.name" :key="item.key" v-for="item in allProcudt">
        <ul class="list-box">
          <li
            v-for="child in item.children"
            :key="child.key"
            @click="gotoPath(child.path)"
          >
            <img
              data-v-6674de2a=""
              height="100"
              :src="child.img"
              :alt="child.name"
            />
            <h3>{{ child.name }}</h3>
            <p>{{ child.description }}</p>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  name: 'prolist',
  data () {
    return {
      proGrouplist: [],
      prolist: [],
      allProcudt: [
        // 所有产品类别
        {
          key: 'all',
          name: '全部',
          children: [
            {
              key: 'empty_test',
              name: '空号检测',
              path: '/empty',
              img: require('../assets/index/empty_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的空号、实号、风险号和沉默号'
            },
            {
              key: 'empty_api',
              name: '空号检测API',
              path: '/emptyapi',
              img: require('../assets/index/empty_api.png'),
              description:
                '空号检测的另一种检测方式。提供api接口，直接调用接口文档进行检测，客户可以直接集成到项目中使用。'
            },
            {
              key: 'realtime_test',
              name: '实时检测',
              path: '/realtime',
              img: require('../assets/index/realtime_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的正常、携号转网、空号、通话中、关机、疑似关机、停机、号码错误、未知'
            },
            {
              key: 'realtime_api',
              name: '实时检测API',
              path: '/realtimeapi',
              img: require('../assets/index/realtime_api.png'),
              description:
                '实时检测的另一种检测方式。提供api接口，直接调用接口文档进行检测，客户可以直接集成到项目中使用。'
            },
            {
              key: 'international_test',
              name: '国际号码检测',
              path: '/international',
              img: require('../assets/index/international_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的已激活、未激活和未注册'
            },
            {
              key: 'direct_test',
              name: '定向检测',
              path: '/direct',
              img: require('../assets/index/international_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的已激活和未注册'
            }
          ]
        },
        {
          key: 'empty',
          name: '空号检测',
          children: [
            {
              key: 'empty_test',
              name: '空号检测',
              path: '/empty',
              img: require('../assets/index/empty_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的空号、实号、风险号和沉默号'
            },
            {
              key: 'empty_api',
              name: '空号检测API',
              path: '/emptyapi',
              img: require('../assets/index/empty_api.png'),
              description:
                '空号检测的另一种检测方式。提供api接口，直接调用接口文档进行检测，客户可以直接集成到项目中使用。'
            }
          ]
        },
        {
          key: 'realtime',
          name: '实时检测',
          children: [
            {
              key: 'realtime_test',
              name: '实时检测',
              path: '/realtime',
              img: require('../assets/index/realtime_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的正常、携号转网、空号、通话中、关机、疑似关机、停机、号码错误、未知'
            },
            {
              key: 'realtime_api',
              name: '实时检测API',
              path: '/realtimeapi',
              img: require('../assets/index/realtime_api.png'),
              description:
                '实时检测的另一种检测方式。提供api接口，直接调用接口文档进行检测，客户可以直接集成到项目中使用。'
            }
          ]
        },
        {
          key: 'international',
          name: '国际号码检测',
          children: [
            {
              key: 'international_test',
              name: '国际号码检测',
              path: '/international',
              img: require('../assets/index/international_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的已激活、未激活和未注册'
            }
          ]
        },
        {
          key: 'direct',
          name: '定向检测',
          children: [
            {
              key: 'direct_test',
              name: '定向检测',
              path: '/direct',
              img: require('../assets/index/international_test.png'),
              description:
                '根据客户提供的手机号，分类筛选出其中的已激活和未注册'
            }
          ]
        }
      ]
    }
  },
  mounted () {},
  methods: {
    callback (key) {
      // console.log(key)
    },
    // 登录跳转（无接口）
    gotoPath (path) {
      if (this.getSessionToken()) {
        this.$router.push(path)
      } else {
        this.$root.$emit('showlogin', true)
      }
    }
  }
}
</script>
<style lang="less">
.prolist {
  padding-top: 30px;
  padding-bottom: 50px;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;

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
    width: 580px;
    height: 160px;
    padding: 30px;
    vertical-align: top;
    margin: 30px 8px 8px 18px;
    box-shadow: 1px 2px 17px 4px rgba(223, 230, 239, 0.5);
    transition: all 0.4s ease-in-out;
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
