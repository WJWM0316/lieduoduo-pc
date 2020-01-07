<template>
  <section id="b-app" class="c-app">
    <page-header />
    <div class="pages">
      <router-view />
    </div>
    <page-footer v-if="shouldBottomShown"/>
    <guide-qrcode-pop></guide-qrcode-pop>
    <floating-bar v-if="shouldBottomShown"/>
  </section>
</template>
<script>
import PageFooter from '@/views/layout/footer/index.vue'
import PageHeader from '@/views/layout/header/'
import GuideQrcodePop from 'COMPONENTS/common/guideQrcodePop'
import FloatingBar from 'COMPONENTS/floatingBar'
const cdnPath = `${process.env.VUE_CDN_PATH}/front-assets/`
export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader,
    GuideQrcodePop,
    FloatingBar
  },
  computed: {
    shouldBottomShown () {
      return !['position24h', 'marketOriginality', 'dreamDisco'].includes(this.$route.name)
    }
  },
  data () {
    return {
      cdnPath
    }
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
