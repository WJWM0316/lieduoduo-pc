<template>
  <section id="app">
    <page-header v-if="!shouldFloatingBoxShown()" />

    <router-view class="pages" />

    <page-footer v-if="!shouldFloatingBoxShown()" />
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageFooter from './components/pageFooter/index.vue'
import PageHeader from './components/pageHeader/index.vue'

@Component({
  name: 'App',
  components: {
    PageFooter,
    PageHeader
  },
  watch: {
    '$route': {
      handler() {

        // let userInfo = this.$store.state.userInfo
        //  //console.log('userInfo==>',this.$store.state.userInfo)
        // if(!userInfo) {
        //   console.log('to-login')
        //   this.$router.push({name: 'login'})
        // }
      },
      immediate: true
    }
  },
  computed: {
    /*...mapGetters([
      'token'
    ])*/
  }
})

export default class App extends Vue {

  // 白名单模式，下面路由不显示管理页面的侧边栏,和顶部的导航栏
  shouldFloatingBoxShown() {
    return false
    // return [
    //   '/login'
    // ].includes(this.$route.path)
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
    font-family: "Microsoft Yahei",sans-serif;
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
  // bottom: 200px;
  background: #FBFBFF;
  // margin-top: 60px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.hidden {
  display: none;
}


</style>
