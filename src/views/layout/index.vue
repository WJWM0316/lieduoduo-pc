<template>
  <section id="app">
    <!-- <page-header v-if="shouldTopShown()" /> -->
    <page-header />
    <!-- <page-header2 v-if="shouldTopShown2()" /> -->
    <router-view class="pages" />

    <page-footer />
    <page-aside v-if="shouldSaideShown()" />
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageFooter from '@/views/layout/footer/index.vue'
// import PageHeader from './components/pageHeader/index.vue'
import PageHeader from '@/views/layout/header/'
import PageAside from '@/views/layout/side/'
// import PageHeader2 from './components/pageHeader2/index.vue'

@Component({
  name: 'App',
  components: {
    PageFooter,
    PageHeader,
    // PageHeader2,
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

  // 下面路由显示管理页面的侧边栏
  shouldSaideShown() {
    return [
      'candidate',
      'postJob',
      'recruiterIndex'
    ].includes(this.$store.state.pageName)
  }

  // 下面路由不显示管理页面的侧边栏,和顶部的导航栏
  shouldBottomShown() {
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
.pages {
  min-height: calc(100vh - #{$page-header-height} - #{$page-footer-height});
}
.page .main-center {
  width: $page-width;
  margin:0 auto;
}
</style>