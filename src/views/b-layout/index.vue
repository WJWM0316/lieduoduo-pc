<template>
  <section class="b-app">
    <page-aside />
    <div class="b-wrapper">
      <page-header />
      <router-view class="pages" />
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
<style lang="scss">
.b-app .pages {
  height: calc(100vh - #{$page-b-header-height});
  min-width: $page-width;
  padding-top: 30px;
  box-sizing: border-box;
  overflow-y: auto;
}
.b-wrapper {
  margin-left: $page-b-side-width;
  overflow: hidden;
  background: $bg-color-1;
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
