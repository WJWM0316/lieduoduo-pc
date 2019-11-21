<template>
  <section id="b-app" class="c-app">
    <page-header />
    <router-view class="pages" />
    <page-footer />
    <guide-qrcode-pop></guide-qrcode-pop>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageFooter from '@/views/layout/footer/index.vue'
import PageHeader from '@/views/layout/header/'
import GuideQrcodePop from 'COMPONENTS/common/guideQrcodePop'

@Component({
  name: 'App',
  components: {
    PageFooter,
    PageHeader,
    GuideQrcodePop
  },
  watch: {
  }
})

export default class App extends Vue {
  cdnPath = `${process.env.VUE_CDN_PATH}/front-assets/`

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
  shouldBottomShown () {
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
  }
}
</script>
<style lang="scss">
.c-app .pages {
  min-height: calc(100vh - #{$page-header-height} - #{$page-footer-height});
  min-width: $page-width;
}
.c-app .pages .main-center, .c-app .pages.main-center {
  width: $page-width;
  margin:0 auto;
}
@media screen and (max-width: 1263px)  {
  .c-app {
    overflow-x: scroll;
    min-width: calc(#{$page-width} + 20px);
  }
}
</style>
