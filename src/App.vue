<template>
  <section id="app">
    <page-header v-if="shouldTopShown()" />
    <page-header2 v-if="shouldTopShown2()" />
    <router-view class="pages" />

    <page-footer v-if="!shouldBottomShown()" />
    <page-aside v-if="shouldSaideShown()" />
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageFooter from './components/pageFooter/index.vue'
import PageHeader from './components/pageHeader/index.vue'
import PageAside from './components/pageAside/index.vue'
import PageHeader2 from './components/pageHeader2/index.vue'

@Component({
  name: 'App',
  components: {
    PageFooter,
    PageHeader,
    PageHeader2,
    PageAside
  },
  watch: {
    '$route': {
      handler() {
        // let userInfo = this.$store.state.userInfo
        // if(!userInfo) {
        //   this.$router.push({name: 'login'})
        // }
      },
      immediate: true
    }
  }
})

export default class App extends Vue {

  // 下面路由显示管理页面顶部的导航栏
  shouldTopShown() {
    return [
      'applyIndex',
    ].includes(this.$store.state.pageName)
  }

  // 下面路由不显示管理页面的侧边栏,和顶部的导航栏
  shouldTopShown2() {
    return [
      'candidate',
      'postJob',
      'recruiterIndex'
    ].includes(this.$store.state.pageName)
  }

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

<style lang="less">


body,p,h1,h2,h3,h4,h5,h6,ul,ol,dl,li,dt,dd{
    /* 默认有边距，都要清除 */
    margin: 0;
    padding: 0;
    /*字体设置*/
    font-size: 14px;
    //font-family: "Microsoft Yahei",sans-serif;
    color: #ccc;
    /* 去掉列表的原点 */
    list-style: none;
    /* 默认鼠标 */
    cursor: default;
}

 
/*行内块元素*/
input,img{
    margin: 0;
    padding: 0;
    border: 0 none;
    outline-style: none;
    vertical-align: bottom; 
}
 
/*行内元素*/
a,a:active,a:visited{
    /*下划线和颜色*/
    text-decoration: none;
    color: #ccc;
}
 
a:hover{
    color:#333;
}
 
textarea{
    /* 边框清零 */
    border:none;
    /* 轮廓线清零 */
    outline: none;
    /* 防止文本域被随意拖拽 */
    resize: none;
}
 
i{
    /*文字样式*/
    font-style: normal; 
}
 
table{
    /*边框合并*/
    border-collapse:collapse;
    border-spacing:0;
}
 
 
/* 使用伪元素清除浮动 */
.clearfix::before,
.clearfix::after{
    content:"";
    height: 0;
    line-height: 0;
    display: block;
    visibility: none;
    clear: both;
}
 
.clearfix {
    *zoom: 1;
}
 

 
/*可选*/
/*单选框和复选框的配置，一般是分开的*/
input[type="radio"],input[type="checkbox"]{
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    display: none;
}
 
label{
    display: inline-block;
    cursor: pointer;
}


 
label input[type="radio"]:checked~i,label input[type="checkbox"]:checked~i{
    color: #38d6ff;
}
 
/*可选*/
/* 自定义数字框配置 */
input[type="number"]{
    width: 76px;
    height: 36px;
    background-color: rgba(5,45,82,0.4);
    border: 2px solid #ccc;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    padding: 0 10px;
}
 
input[type="number"]::-webkit-inner-spin-button{
    -webkit-appearance: none;
}
 
input[type="number"]+div{
    width: 30px;
    height: 40px;
    padding-left: 2px;
    cursor: pointer;
}
.pages {
  // position: fixed;
  // z-index: 2;
  // left: 0;
  // right: 0;
  // top: 60px;
  // bottom: 230px;
  background: #FBFBFF;
  // margin-top: 60px;

  padding: 100px 0 230px 0px;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: #FBFBFF;
}
.hidden {
  display: none;
}

.textEllipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.service {
    font-size:16px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(101,39,145,1);
    line-height:18px;
    position: fixed;
    top: 50%;
    height: 120px;
    margin-top: -60px;
    right: 0;
    width:36px;
    height:120px;
    background:rgba(239,233,244,1);
    border-radius:4px 0px 0px 4px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    z-index: 100;
    .service_icon {
      width:16px;
      height:16px;
      margin-bottom: 8px;
    }
    .service_pop {
      width:300px;
      height:440px;
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 12px 0px rgba(48,50,51,0.1);
      border-radius:4px;
      position: absolute;
      left: -320px;
      top: 50%;
      margin-top: -220px;
      .pop_tit {
        width:300px;
        height:58px;
        line-height:58px;
        background:rgba(101,39,145,1);
        border-radius:4px 4px 0px 0px;
        font-size:20px;
        font-family:PingFang-SC-Regular;
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
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(98,98,98,1);
          margin: 48px 0 20px 0;
        }
        .pop_text2 {
          font-size:24px;
          font-family:DINAlternate-Bold;
          font-weight:bold;
          color:rgba(40,40,40,1);
        }
        .pop_text3 {
          font-size:18px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(53,64,72,1);
          margin-bottom: 24px;
        }
        .pop_text4 {
          font-size:14px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(98,98,98,1);
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
