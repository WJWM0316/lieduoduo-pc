<template>
  <!-- 24 活动页 -->
  <div class="position-24h">
    <div class="position-first-content">
      <div class="city-lists" :class="{'fixed-citys': fixedCity}">
        <ul>
          <template v-for="city in citys">
            <li
              :key="city.areaId"
              :class="{active: city.areaId === currentCity}"
              @click="handleChangeCity(city)">{{city.name}}
            </li>
          </template>
        </ul>
      </div>
      <div class="main-center">
        <div class="header-24h-keywords">
          <div>精选年薪20W+职位</div>
          <div>职业顾问1V1服务</div>
          <div>BOSS约面对面沟通</div>
        </div>
        <div class="header-24h-bubble">
          <p>陈明 成功抢占 产品经理 约面席位！</p>
        </div>
        <div class="header-wechat-shart">
          <i class="iconfont icon-weixin"></i> 微信分享
        </div>
      </div>
    </div>
    <div class="main-center position-24h-content">
      <template v-for="(position, index) in positions">
        <item :key="index" :positions="position" :type="positionTypes[index]" />
      </template>
      <ul class="position-types" :class="{'fixed-position-citys': fixedCity}" v-if="positionTypes.length">
        <template v-for="(position, index) in positionTypes">
          <li
            :key="position.id"
            :class="{active: currentType === index}"
            @click="handleScrollToView(index)">{{position.name}}</li>
        </template>
        <li>顶部</li>
      </ul>
    </div>
    <!-- 背景图 -->
    <div class="bg-24h-images" :style="{'height': bgWrapperHeight + 'px'}">
      <div style="height: 393px"></div>
      <div style="height: 375px "></div>
      <div style="height: 511px"></div>
      <div style="height: 876px"></div>
      <div style="height: 876px"></div>
      <div style="height: 1120px"></div>
    </div>
    <div style="display: none">
      <scroll-top />
    </div>
  </div>
</template>
<script>
import Item from './components/items'
import { getActivityPositionList } from '@/api/common'
import ScrollTop from '@/components/scrollToTop/index.vue'
// const clientHeight = window.innerWidth || (document.body && document.body.clientHeight)
export default {
  components: { Item, ScrollTop },
  data () {
    return {
      fixedCity: false,
      currentCity: 0, // 位置id
      positionTypes: [], // 职位类型
      currentType: null,
      positions: [],
      bgWrapperHeight: 0
    }
  },
  computed: {
    citys () {
      return this.$store.getters.areaList || []
    }
  },
  created () {
    this.currentCity = this.$store.state.cityId
    this.getLists()
  },
  methods: {
    getLists () {
      getActivityPositionList({ city: this.currentCity }).then(({ data }) => {
        const { positionTypes, positions } = data.data
        this.positionTypes = positionTypes
        this.positions = positions
        this.$nextTick(() => {
          const dom = document.querySelector('.position-24h-content')
          if (dom) {
            const domBounding = dom.getBoundingClientRect()
            this.bgWrapperHeight = domBounding.height
          }
        })
      })
    },
    // 切换城市
    handleChangeCity (city) {
      this.currentCity = city.areaId
    },
    // 让职位滚动到可视区域
    handleScrollToView (index) {
      const dom = document.querySelectorAll('.position-item-wrapper')
      this.$util.scrollToView(dom[index])
    },
    // 滚动条监听
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 部分不加入节流
      this.fixedCity = scrollTop > this.cityWrapperTop
      // 简单节流
      if (this.timer) window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        let index = 0
        const listDom = document.querySelectorAll('.position-item-wrapper')
        listDom.forEach((dom, i) => {
          const bounding = dom.getBoundingClientRect()
          // - clientHeight / 2
          if (bounding.top <= 0) index = i
        })
        this.currentType = index
      }, 20)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    // 记录位置city dom加载完成位置
    const dom = document.querySelector('.city-lists')
    const domBounding = dom.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    this.cityWrapperTop = domBounding.top + scrollTop
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
$page-bg-color: #0B1538;
$gradient-map: (
  0: url('../../../assets/images/activity/24h/star_blue.png') linear-gradient(140deg,rgba(32,193,243,1) 0%,rgba(71,115,196,1) 100%),
  1: url('../../../assets/images/activity/24h/star_green.png') linear-gradient(140deg,rgba(188,246,179,1) 0%,rgba(22,193,164,1) 100%),
  2: url('../../../assets/images/activity/24h/star_orange.png') linear-gradient(137deg,rgba(255,203,159,1) 0%,rgba(255,142,156,1) 100%),
  3: url('../../../assets/images/activity/24h/star_pick.png') linear-gradient(140deg,rgba(247,211,101,1) 0%,rgba(252,170,127,1) 100%),
  4: url('../../../assets/images/activity/24h/star_yelow.png') linear-gradient(140deg,rgba(158,194,255,1) 0%,rgba(244,142,198,1) 100%),
  5: url('../../../assets/images/activity/24h/star_purple.png') linear-gradient(137deg,rgba(93,157,214,1) 0%,rgba(108,129,214,1) 49%,rgba(124,99,215,1) 100%),
  6: url('../../../assets/images/activity/24h/star_blue.png') linear-gradient(140deg,rgba(32,193,243,1) 0%,rgba(71,115,196,1) 100%),
  7: url('../../../assets/images/activity/24h/star_green.png') linear-gradient(140deg,rgba(188,246,179,1) 0%,rgba(22,193,164,1) 100%),
);
$bg-map: (
  0: url('../../../assets/images/activity/24h/24h_bg1.png'),
  1: url('../../../assets/images/activity/24h/24h_bg2.png'),
  2: url('../../../assets/images/activity/24h/24h_bg3.png'),
  3: url('../../../assets/images/activity/24h/24h_bg4.png'),
  4: url('../../../assets/images/activity/24h/24h_bg5.png'),
  5: url('../../../assets/images/activity/24h/24h_bg6.png')
);
.position-24h {
  background-color: $page-bg-color;
}
.bg-24h-images {
  position: absolute;
  overflow: hidden;
  top: 486px;
  left: 0;
  z-index: 0;
  width: 100%;
  div {
    background-position: top center;
    background-repeat: no-repeat;
  }
  @for $i from 0 through 5 {
    div:nth-child(#{$i + 1}) {
      background-image: map-get($bg-map, $i)
    }
  }
}
.position-24h-content {
  position: relative;
  padding-top: 60px;
  z-index: 1;
}
.header-wechat-shart {
  position: absolute;
  background: rgba( #fff, 0.2);
  color: #fff;
  border-radius: 4px;
  right: 0;
  top: 52px;
  padding: 7px 20px;
  cursor: pointer;
}
.position-first-content {
  position: relative;
  height: 486px;
  background: url('../../../assets/images/activity/24h/banner.png') no-repeat;
  background-position: top center;
  .main-center {
    position: relative;
    text-align: center;
    font-size: 12px;
    i {
      font-size: 12px;
    }
  }
}
.header-24h-keywords {
  padding-top: 330px;
  padding-bottom: 24px;
  opacity: .5;
  & > div {
    padding: 10px 28px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 13px;
    display: inline-block;
    vertical-align: top;
    transform: skewX(-15deg);
  }
  div + div {
    margin-left: 8px;
  }
}
.header-24h-bubble {
  width: 521px;
  height:32px;
  background:linear-gradient(90deg,rgba(10,23,58,1) 0%,rgba(8,60,87,1) 29%,rgba(75,62,51,1) 82%,rgba(14,22,61,1) 100%);
  opacity:0.48;
  display: inline-block;
  line-height: 32px;
  color: #fff;
}
.city-lists {
  text-align: center;
  position: absolute;
  width: $page-width;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  bottom: -60px;
  height: 56px;
  line-height: 56px;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(#fff, 0.1);
  ul {
    width: 100%;
    height: 100%;
    display: flex;
  }
  li {
    flex: 1;
    box-sizing: border-box;
    cursor: pointer;
    color: #fff;
    position: relative;
    margin-left: -1px;
    margin-right: -1px;
  }
  li::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    height: 30px;
    opacity: 0.16;
    top: 13px;
    border-left: 1px solid #fff;
  }
  li:first-child::after {
    opacity: 0;
  }
  .active {
    font-weight: bold;
    background-color: $bg-color-4;
  }
}
.fixed-citys.city-lists {
  position: fixed;
  width: 100%;
  top: 0;
  background: #212628;
  border-radius: 0;
  ul {
    width: $page-width;
    margin: 0 auto;
  }
  .active {
    background-color: #2A3436;
    color: $main-color-1;
  }
}
.position-types.fixed-position-citys {
  position: fixed;
  top: 138px;
  right: 50%;
  margin-right: -684px;
}
.position-types {
  border-radius: 4px;
  position: absolute;
  z-index: 2;
  top: 138px;
  right: -84px;
  max-width: 60px;
  background-color: #fff;
  box-shadow: $shadow-1;
  &::after {
    content: "";
    width: 58px;
    height: 39px;
    background-image: url('../../../assets/images/activity/24h/nav_top.png');
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    top: -28px;
    left: 20px;
    z-index: -1;
  }
  li {
    padding: 20px 10px;
    min-height: 60px;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    line-height: 20px;
    position: relative;
  }
  li::before {
    content: "";
    height: 1px;
    width: 44px;
    position: absolute;
    bottom: 0;
    left: 10px;
    background: $border-color-1;
  }
  li:hover, .active {
    &::before {
      background: transparent;
    }
    margin-top: -1px;
    margin-bottom: 1px;
    color: #fff;
    background: linear-gradient(180deg,rgba(255,158,64,1) 0%,rgba(255,120,44,1) 100%);
  }
  li:hover {
    background-color: linear-gradient(180deg,rgba(255,171,96,1) 0%,rgba(255,151,84,1) 100%);
  }
  li:last-child:hover{
    margin-bottom: 0px !important;
  }
  .active {
    font-weight: bold;
  }
}
@for $i from 1 through 8 {
  .position-item-wrapper:nth-child(#{$i}n) {
    & /deep/ {
      .header-24h-title {
        background: nth(map-get($gradient-map, $i - 1), 2)
      }
      .header-24h-image {
        background-image: nth(map-get($gradient-map, $i - 1), 1);
      }
    }
  }
}
</style>
