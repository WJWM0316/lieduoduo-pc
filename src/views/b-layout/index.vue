<template>
  <section class="b-app">
    <page-aside />
    <div class="b-wrapper">
      <page-header />
      <div class="b-app-contain">
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
  mounted () {
    this.$store.dispatch('redDotfun')
  }
}
</script>
<style lang="scss" scoped>
.b-app .pages {
  box-sizing: border-box;
  min-width: 960px;
  width: 100%;
  max-width: $page-width;
  margin: 30px auto;
}
.b-wrapper {
  margin-left: $page-b-side-width;
  overflow: hidden;
  background: $bg-color-1;
}
.b-app-contain {
  width: 100%;
  height: calc(100vh - #{$page-b-header-height});
  overflow-y: auto;
}
.service {
  font-size:16px;
  font-weight:700;
  color:#03B3BB;
  line-height:18px;
  position: fixed;
  top: 50%;
  height: 120px;
  margin-top: -60px;
  right: 0;
  width:36px;
  height:120px;
  background:#E5F9FA;
  border-radius:4px 0px 0px 4px;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  z-index: 100;
  .service_icon {
    display: block;
    margin-bottom: 8px;
  }
  .service_pop {
    width:300px;
    height:440px;
    background:rgba(255,255,255,1);
    box-shadow:0px 8px 12px 0px rgba(48,50,51,0.1);
    border-radius:8px;
    position: absolute;
    left: -320px;
    top: 50%;
    margin-top: -220px;
    .pop_tit {
      width:300px;
      text-align: center;
      height:58px;
      line-height:58px;
      background:#00C4CD;
      border-radius:8px 8px 0px 0px;
      font-size:20px;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .pop_cont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pop_code {
        width: 112px;
        height: 112px;
        margin: 48px auto 10px auto;
      }
      .pop_text {
        font-size:20px;
        font-weight:400;
        color:#333333;
        margin: 48px 0 20px 0;
      }
      .pop_text2 {
        font-size:24px;
        font-weight:bold;
        color:#00C4CD;;
      }
      .pop_text3 {
        font-size:18px;
        font-weight:400;
        color:#333333;
        margin-bottom: 24px;
      }
      .pop_text4 {
        font-size:14px;
        font-weight:400;
        color:#66666E;
      }
    }
  }
  .triangle_border_right{
    width: 0;
    height: 0;
    border-width:10px 0  10px 14px ;
    border-style: solid;
    border-color: transparent transparent transparent #fff ;
    position: absolute;
    right: -12px;
    top: 50%;
    margin-top: -20px;
  }
}
</style>
