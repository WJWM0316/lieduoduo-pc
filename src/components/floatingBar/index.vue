<template>
  <div id="adsorption">
    <ul class="top">
      <li v-for="(item, index) in asideBar.topNav" :key="index" class="li-item1">
        <router-link
          class="item"
          target="_blank" :to="{name: item.routeName, query: item.query}">
          <div class="icon">
            <i class="iconfont" :class="item.iconClass"></i>
            <div class="circle" v-if="item.reddot || (!isLogin && item.id !== 'applay')"></div>
          </div>
          <div class="describe describe2">{{item.text}}</div>
        </router-link>
      </li>
    </ul>
    <ul class="bottom">
      <li class="back" @click="scroll" ref="backTop" v-show="showScrollTopBtn">
        <i class="iconfont icon-arrow-top"></i>
      </li>
      <li v-for="(item, index) in asideBar.bottomNav" :key="index" class="li-item2">
        <el-popover
          placement="left"
          popper-class="qr-box-sidebar"
          :open-delay="200"
          trigger="hover">
          <div class="box">
            <div><img :src="item.url"/></div>
            <div class="tooltips" v-html="item.tooltips"></div>
          </div>
          <div slot="reference">
            <div class="icon">
              <i class="iconfont" :class="item.iconClass"></i>
              <div class="circle" v-if="item.reddot"></div>
            </div>
            <div class="describe">{{item.name}}</div>
          </div>
        </el-popover>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    ...mapGetters([
      'asideBar'
    ]),
    isLogin () {
      return !!this.$store.state.userInfo.id
    }
  },
  watch: {
    '$route': {
      handler (route) {
        if (!['jobhunterInterview'].includes(route.name)) {
          this.getInterviewRedDotInfoApi()
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      showScrollTopBtn: false
    }
  },
  methods: {
    ...mapActions([
      'getInterviewRedDotInfoApi'
    ]),
    scroll () {
      this.$util.scrollToView(document.documentElement || document.body)
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.showScrollTopBtn = scrollTop > 200
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss">
#adsorption {
  position: fixed;
  top: 160px;
  right: 0;
  background-color: white;
  bottom: 160px;
  z-index: 1004;
  width: 40px;
  transition: .2s width;
  box-shadow:0px 0px 20px 0px rgba(22,39,77,0.07);
  border-radius:8px 0px 0px 8px;
  min-height: 435px;
  &:hover{
  	width:64px;
  	.describe {
      opacity: 1;
      display: block
    }
  }
  .top{
    width: 100%;
    padding-top: 43px;
    text-align: center;
    display: inline-block;
  }
  .circle{
    width:4px;
    height:4px;
    background:$nav-color-hover;
    border-radius: 50%;
    position: absolute;
    top: -2px;
    right: -3px;
  }
  .icon {
    width: 18px;
    height: 18px;
    display: inline-block;
    position: relative;
  }
  i {
    font-size: 17px;
    color: $iconFont-gray;
  }
  .icon-arrow-top, .icon-xiaochengxu_huaban {
    font-size: 16px;
  }
  .li-item1{
    display: block;
    position: relative;
    font-size: 12px;
    text-align: center;
    height: 65px;
  }
  .li-item2{
    display: block;
    position: relative;
    font-size: 12px;
    color: #9fa3b0;
    text-align: center;
    margin-bottom: 26px;
  }
  .describe {
    opacity: 0;
    transition: .2s opacity;
    padding-top: 4px;
    color: #99999B;
    line-height: 14px;
  }
  .describe2 {
    position: absolute;
    width: 100%;
    text-align: center
  }
  li{
    display: block;
    transition: .2s all;
    &:hover {
      color: $main-color-1;
      a {
        color: $main-color-1;
      }
      .iconfont {
        color: $bg-color-4;
      }
      .describe {
        color: $main-color-1;
      }
    };
  }
  .bottom{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .qr-box-sidebar{
    position: absolute;
    right:64px;
    top: -80px;
    width: 196px;
    height: 196px;
    border: 1px #eee solid;
    background: #fff;
    z-index: 10;
  }
  .back{
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    margin-bottom: 15px;
  }
}
.qr-box-sidebar{
  text-align: center !important;
  min-width: unset !important;
  padding: 11px;
  .box {
    max-width: 130px;
  }
  img{
    width: 100%;
    display: inline-block;
  }
  .tooltips {
    font-size:12px;
    font-weight:400;
    color:$font-color-9;
    line-height:15px;
    letter-spacing:1px;
  }
}
</style>
