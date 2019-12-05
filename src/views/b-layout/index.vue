<template>
  <section class="b-app">
    <page-aside />
    <div class="b-wrapper">
      <page-header />
      <div class="contain">
      <router-view class="pages" />
      </div>
    </div>
    <div class="service" @mouseover="isService = true" @mouseout="isService = false">
      <i class="iconfont icon-kefu service_icon"></i>
      客服咨询
      <div class="service_pop" v-show="isService">
        <div class="pop_tit">联系我们</div>
        <div class="pop_cont">
          <h3 class="pop_text">请拨打全国咨询热线</h3>
          <p class="pop_text2">400-065-5788</p>
          <img class="pop_code" src="@/assets/images/qrcode.png" alt="">
          <p class="pop_text3">猎多多公众号</p>
          <p class="pop_text4">微信扫描二维码，关注官方公众号</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageHeader from './header/index'
import PageAside from './side/index.vue'

@Component({
  name: 'App',
  components: {
    PageHeader,
    PageAside
  },
  watch: {
  }
})

export default class App extends Vue {
  cdnPath = `${process.env.VUE_CDN_PATH}/front-assets/`
  isService = false;

  // // 下面路由显示管理页面顶部的导航栏
  // shouldTopShown() {
  //   return [
  //     'applyIndex',
  //   ].includes(this.$store.state.pageName)
  // }

  // // 下面路由不显示管理页面的侧边栏,和顶部的导航栏
  // shouldTopShown2() {
  //   return [
  //     'candidate',
  //     'postJob',
  //     'recruiterIndex'
  //   ].includes(this.$store.state.pageName)
  // }

  // 下面路由不显示管理页面的侧边栏,和顶部的导航栏
  /* shouldBottomShown () {
    return [
      'login',
      'postJob',
      'candidate',
      'recruiterIndex',
      'resumeFirstPost',
      'resumeSecondPost',
      'resumeThirdPost',
      'resumeFourthPost',
      '404'
    ].includes(this.$store.state.pageName)
  } */
}
</script>
<style lang="scss" scoped>
.b-app .pages {
  // height: calc(100vh - #{$page-b-header-height});
  // min-width: $page-width;
  // padding-top: 30px;
  // box-sizing: border-box;
  // overflow-y: auto;
  margin: 32px auto 0;
  padding: 0px 30px 30px 30px;
}
.b-wrapper {
  margin-left: $page-b-side-width;
  overflow: hidden;
  background: $bg-color-1;
}
.contain{
  margin: 0 auto;
  padding-top: 60px;
  min-width: 960px;
  max-width: 1200px;
}
.b-app .main-center {
  width: $page-width;
  margin:0 auto;
}
@media screen and (max-width: 1440px)  {
  .b-app .main-center {
    width: 1240px;
    padding: 0 20px;
    box-sizing: border-box;
    overflow-x: scroll;
  }
}
</style>
