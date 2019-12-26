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
              @click="handleChangeCity(city)">{{city.areaName}}
            </li>
          </template>
        </ul>
      </div>
      <div class="main-center">
        <div class="header-24-banner">
          <img :src="$cdnPath + '/images/24h_banner.png'" alt="">
        </div>
        <div class="header-24h-keywords">
          <div>精选年薪20W+职位</div>
          <div>职业顾问1V1服务</div>
          <div>BOSS约面对面沟通</div>
        </div>
        <div class="bubble-wrapper header-24h-bubble">
          <p ref="bubble">{{bubbleList[bubbleIndex]}}</p>
        </div>
        <el-popover
          placement="top"
          popper-class="position-24h-share-wechat"
          :width="100">
          <img style="max-width:100%; max-height:100%" :src="mp24hQr" alt="">
          <div class="header-wechat-shart"  slot="reference">
            <i class="iconfont icon-weixin"></i> 微信分享
          </div>
        </el-popover>
      </div>
    </div>
    <div class="page-loading" v-if="getLoading" v-loading="getLoading" />
    <div class="main-center position-24h-content" v-show="!getLoading">
      <template v-for="(position, index) in positions">
        <item :key="index" :positions="position" :count-down="listCountDown[index]" :type="positionTypes[index]" />
      </template>
      <div class="position-types" :class="{'fixed-position-citys': fixedCity}" v-if="positionTypes.length">
        <div class="position-nav-top-image"></div>
        <ul>
          <template v-for="(position, index) in positionTypes">
            <li
              :key="position.id"
              :class="{active: currentType === index}"
              @click="handleScrollToView(index)">{{position.name}}</li>
          </template>
          <li v-if="fixedCity" @click="handleToTop" class="scroll-to-top">
            <span class="iconfont icon-arrow-top"></span>
            顶部
          </li>
        </ul>
        <div class="position-nav-end-image"></div>
      </div>
    </div>
    <!-- 底部分享 -->
    <div class="position-bottom">
      <div class="position-bottom-header">
        <img src="../../../assets/images/activity/24h/24h_footer_title.png"  />
        <p>更多酷公司已加入24小时极速面试</p>
      </div>
      <div class="position-bottom-logo" style="width: 764px">
        <img :src="$cdnPath + '/images/24h_footer_logo.png'"  />
      </div>
      <div class="position-bottom-qrcode">
        <img :src="appQrcodeUrl" alt="">
        <p><span class="icon-arrowtop"></span><span>扫码开抢</span><span class="icon-arrowtop"></span></p>
      </div>
    </div>
    <!-- 背景图 -->
    <div class="bg-24h-images" :style="{'height': bgWrapperHeight + 'px'}" style="padding-top: 50px;">
      <div class="bg1" style="height: 393px"></div>
      <div class="bg2" style="height: 375px "></div>
      <div class="bg3" style="height: 511px"></div>
      <div class="bg4" style="height: 876px"></div>
      <div class="bg5" style="height: 876px"></div>
      <div class="bg6" style="height: 1120px"></div>
      <div class="division" :style="{'height': discoverHeight + 'px'}"></div>
      <div class="bg bg7" style="height: 1200px"></div>
    </div>
    <div style="display: none">
      <scroll-top ref="scrollTop" />
    </div>
  </div>
</template>
<script>
import Item from './components/items'
import { getActivityPositionList, getActivityCity } from '@/api/common'
import ScrollTop from '@/components/scrollToTop/index.vue'
import { app_qrcode } from '@/assets/images/image'
// const clientHeight = window.innerWidth || (document.body && document.body.clientHeight)
export default {
  components: { Item, ScrollTop },
  data () {
    return {
      fixedCity: false,
      currentCity: 0, // 位置id
      positionTypes: [], // 职位类型
      currentType: 0,
      positions: [],
      bgWrapperHeight: 300,
      discoverHeight: 0,
      getLoading: false,
      appQrcodeUrl: app_qrcode,
      mp24hQr: `${this.$cdnPath}/images/24hoursyuemian.jpg`,
      listCountDown: [], // 倒计时数据
      bubbleList: [],
      citys: [],
      bubbleIndex: 0
    }
  },
  created () {
    this.getCitys().then(() => {
      this.getLists()
    })
  },
  methods: {
    async getCitys () {
      await getActivityCity().then(({ data }) => {
        this.citys = data.data.cityList || []
        // eslint-disable-next-line no-ternary
        const cityId = this.$route.query.city ? +this.$route.query.city : this.$store.state.cityId
        // eslint-disable-next-line no-ternary
        this.currentCity = this.citys.find(val => val.areaId === cityId) ? cityId : this.citys[0].areaId
      })
    },
    getLists () {
      this.getLoading = true
      getActivityPositionList({ city: this.currentCity }).then(({ data }) => {
        const { positionTypes, positions, toastTips } = data.data
        this.positionTypes = positionTypes || []
        this.positions = positions
        this.getLoading = false
        // 执行倒计时计算
        this.startCountDown()
        if (this.bubbleDownTimer === undefined) this.bubbleList = toastTips
        this.$nextTick(() => {
          if (this.bubbleDownTimer === undefined) this.bubbleDown()
          const dom = document.querySelector('.position-24h-content')
          const domBottom = document.querySelector('.position-bottom')
          if (dom) {
            const domBounding = dom.getBoundingClientRect()
            const domBottomBounding = domBottom.getBoundingClientRect()
            // 内容高度
            this.bgWrapperHeight = domBounding.height + domBottomBounding.height
            // 隔层高度 = 内容高度 - 背景图高度
            // const bgImageHeight  = document.querySelectorAll('.position-24h-content .bg')
            const bgImageHeight = 393 + 375 + 511 + 876 + 876 + 1120 + 1200
            this.discoverHeight = this.bgWrapperHeight - bgImageHeight
          }
        })
      }).catch(() => {
        this.getLoading = false
      })
    },
    startCountDown () {
      this.listCountDown = this.positions.map(val => {
        return val.items.map(item => ({
          endTime: item.endTime,
          days: '',
          hours: '',
          mins: '',
          seconds: ''
        }))
      })
      if (!this.listCountDown.length) return
      this.setCountDown()
    },
    setCountDown (data) {
      this.listCountDown.forEach(val => {
        val.forEach(item => {
          const results = this.$util.setTimeDown(item.endTime)
          Object.assign(item, results)
        })
      })
      clearTimeout(this.countDownTimer)
      this.countDownTimer = setTimeout(() => {
        this.setCountDown()
      }, 1000)
    },
    bubbleDown () {
      if (!this.bubbleList.length) return
      if (!this.$refs.bubble) {
        // un mounted
        window.clearTimeout(this.cryExecTimer)
        this.cryExecTimer = setTimeout(() => {
          this.bubbleDown()
        }, 500)
        return
      } else {
        window.clearTimeout(this.cryExecTimer)
        if (!this.$refs.bubble.querySelector('animation')) this.$refs.bubble.classList.add('animation')
      }
      this.bubbleDownTimer = setTimeout(() => {
        this.$refs.bubble.classList.remove('animation')
        if (this.bubbleIndex >= this.bubbleList.length - 1) {
          this.bubbleIndex = 0
        } else {
          this.bubbleIndex++
        }
        setTimeout(() => {
          this.bubbleDown()
        }, 50)
      }, 4000)
    },
    // 切换城市
    handleChangeCity (city) {
      if (this.currentCity === city.areaId) return
      this.currentCity = city.areaId
      if (this.fixedCity) {
        this.handleToTop()
      }
      this.$router.push({
        name: 'position24h',
        query: {
          city: this.currentCity
        }
      })
      this.getLists()
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
    },
    // 滚动到顶部
    handleToTop () {
      if (this.$refs.scrollTop) this.$refs.scrollTop.toTop()
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
    clearTimeout(this.countDownTimer)
    clearTimeout(this.bubbleDownTimer)
    window.removeEventListener('scroll', this.handleScroll)
    window.clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
$page-bg-color: #0B1538;
$gradient-map: (
  0: url('../../../assets/images/activity/24h/24h_star_blue.png') linear-gradient(140deg,rgba(32,193,243,1) 0%,rgba(71,115,196,1) 100%),
  1: url('../../../assets/images/activity/24h/24h_star_green.png') linear-gradient(140deg,rgba(188,246,179,1) 0%,rgba(22,193,164,1) 100%),
  2: url('../../../assets/images/activity/24h/24h_star_orange.png') linear-gradient(137deg,rgba(255,203,159,1) 0%,rgba(255,142,156,1) 100%),
  3: url('../../../assets/images/activity/24h/24h_star_yelow.png') linear-gradient(140deg,rgba(247,211,101,1) 0%,rgba(252,170,127,1) 100%),
  4: url('../../../assets/images/activity/24h/24h_star_pick.png') linear-gradient(140deg,rgba(158,194,255,1) 0%,rgba(244,142,198,1) 100%),
  5: url('../../../assets/images/activity/24h/24h_star_purple.png') linear-gradient(137deg,rgba(93,157,214,1) 0%,rgba(108,129,214,1) 49%,rgba(124,99,215,1) 100%),
  6: url('../../../assets/images/activity/24h/24h_star_blue.png') linear-gradient(140deg,rgba(32,193,243,1) 0%,rgba(71,115,196,1) 100%),
  7: url('../../../assets/images/activity/24h/24h_star_green.png') linear-gradient(140deg,rgba(188,246,179,1) 0%,rgba(22,193,164,1) 100%),
);
$bg-map: (
  0: url(#{$image-cdn-url}/images/24h_bg1.png),
  1: url(#{$image-cdn-url}/images/24h_bg2.png),
  2: url(#{$image-cdn-url}/images/24h_bg3.png),
  3: url(#{$image-cdn-url}/images/24h_bg4.png),
  4: url(#{$image-cdn-url}/images/24h_bg5.png),
  5: url(#{$image-cdn-url}/images/24h_bg6.png),
  6: url(#{$image-cdn-url}/images/24h_bg_end.png)
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
  @for $i from 0 through 6 {
    .bg#{$i+1}{
      background-image: map-get($bg-map, $i)
    }
  }
}
.bg-24h-images .division {
  background-image: url(#{$image-cdn-url}/images/24h_stars.png);
  background-repeat: repeat;
  background-position: 0 0;
  background-size: auto auto;
}
.page-loading {
  height: 360px;
  & /deep/ .el-loading-mask {
    background-color: transparent;
  }
}
.position-24h-content {
  position: relative;
  padding-top: 60px;
  z-index: 1;
  min-height: 300px;
  .position-item-wrapper {
    position: relative;
  }
  .position-item-wrapper::after {
    content: "";
    position: absolute;
    width: 226px;
    height: 226px;
    z-index: -1;
    background-size: 50% auto;
    background-repeat: no-repeat;
  }
  .position-item-wrapper:nth-child(1n) {
    &::after {
      top: 400px;
      left: -100px;
      background-image: url(#{$image-cdn-url}/images/24h_ufo.png);
    }
  }
  .position-item-wrapper:nth-child(2n) {
    &::after {
      top: inherit;
      bottom: -200px;
      left: 200px;
      background-image: url(#{$image-cdn-url}/images/24h_star.png);
    }
  }
  .position-item-wrapper:nth-child(3n) {
    &::after {
      top: inherit;
      left: inherit;
      bottom: -226px;
      right: 0px;
      background-image: url('../../../assets/images/activity/24h/24h_rocket.png');
    }
  }
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
  background: url(#{$image-cdn-url}/images/24h_bg_banner.png) no-repeat;
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
.bubble-wrapper{
  overflow: hidden;
  p {
    transform: translateY(32px);
    opacity: 0;
  }
  p.animation {
    animation: bubble 4s 1;
  }
}
.header-24-banner {
  width: 685px;
  height: 215px;
  text-align: center;
  padding: 97px 0 20px;
  margin: 0 auto;
  img {
    max-width: 100%;
  }
}
.header-24h-keywords {
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
    color: rgba(#fff, .8);
    position: relative;
    margin-left: -1px;
    margin-right: -1px;
  }
  li:hover {
    color: #fff;
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
    color: #fff;
    font-weight: bold;
    background-color: $bg-color-4;
  }
}
.fixed-citys.city-lists {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
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
  position: absolute;
  z-index: 10;
  top: 138px;
  right: -84px;
  max-width: 60px;
  box-shadow: $shadow-1;
  .position-nav-top-image,  .position-nav-end-image{
    width: 58px;
    height: 39px;
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    z-index: -1;
  }
  .position-nav-top-image {
    background-image: url('../../../assets/images/activity/24h/24h_nav_top.png');
    top: -28px;
    left: 20px;
  }
   .position-nav-end-image {
      background-image: url('../../../assets/images/activity/24h/24h_nav_end.png');
      bottom: -10px;
      left: -20px;
   }
  ul {
    z-index: 1;
    background-color: #fff;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  li {
    padding: 20px 10px;
    // min-height: 60px;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    line-height: 20px;
    position: relative;
    margin-top: -1px;
    margin-bottom: -1px;
    color: $title-color-2;
    min-width: 60px;
  }
  li::before {
    content: "";
    // height: 1px;
    width: 44px;
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 10px;
    border-bottom: 1px solid $border-color-1;
  }
  li:last-child::before {
    border-color: transparent;
  }
  li:hover, .active {
    &::before {
      background: transparent;
    }
    color: #fff;
    background: linear-gradient(180deg,rgba(255,158,64,1) 0%,rgba(255,120,44,1) 100%);
    span {
      color: #fff;
    }
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
  .scroll-to-top {
    display: block;
    span{
      font-size: 14px;
      display: inline-block;
      padding: 0 12px;
      font-weight: bold;
      color: $title-color-2;
    }
  }
}
.position-bottom {
  text-align: center;
  padding: 90px 0 64px;
  .position-bottom-header{
    p {
      margin-bottom: 17px;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
    }
    img{
      width: 70%;
    }
  }
  .position-bottom-logo {
    margin-bottom: 90px;
  }
  .position-bottom-logo img {
    max-width: 100%;
  }
  .position-bottom-header {
    width: 250px;
  }
}
.position-bottom-header, .position-bottom-logo {
  margin: 0 auto;
}
.position-bottom-qrcode {
  color: #fff;
  max-width: 136px;
  display:inline-block;
  position: relative;
  span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 4px;
  }
  p {
    margin-top: 14px;
  }
  img {
    max-width: 100%;
    z-index: 2;
    position: relative;
  }
  .icon-arrowtop {
    width: 13px;
    height: 13px;
    background-size: cover;
    background-image: url('../../../assets/images/activity/24h/24h_icon_footer.png');
    background-repeat: no-repeat;
  }
  &::after,&::before {
    content: "";
    position: absolute;
    background-repeat: no-repeat;
    z-index: 1;
  }
  &::before {
    width: 72px;
    height: 78px;
    top: -23px;
    left: -38px;
    background-size: 100% auto;
    background-image: url('../../../assets/images/activity/24h/24h_nav_top.png');
  }
  &::after {
    width: 145px;
    height: 106px;
    bottom: -39px;
    right: -117px;
    background-image: url('../../../assets/images/activity/24h/24h_rocket.png');
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
@keyframes bubble{
  0% {
    transform: translateY(30px);
  }
  20% {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
<style>
.position-24h-share-wechat.el-popper {
  min-width: 105px;
  height: 105px;
  padding: 5px;
  box-sizing: border-box;
}
</style>
