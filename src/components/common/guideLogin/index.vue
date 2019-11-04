<template>
  <div class="loginBox">
    <p class="desc">10W+优质机会任你选</p>
    <el-button class="login" @click="openPop">登录</el-button>
    <el-button class="register" @click="openPop">注册</el-button>
    <loginPop ref="loginPop"></loginPop>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import loginPop from '@/components/common/loginPop'
@Component({
  name: 'guideLogin',
  components: {
    loginPop
  }
})
export default class login extends Vue {
  show = false
  openPop () {
    this.$refs.loginPop.showLoginPop = true
  }
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.loginBox {
  width:298px;
  height:215px;
  background: url('https://attach.lieduoduo.ziwork.com/front-assets/web/images/bg_login_banner.png') no-repeat;
  background-size: 100% 100%;
  box-shadow:0px 0px 13px 0px rgba(22,39,77,0.04);
  padding: 45px 0px 36px;
	box-sizing: border-box;
	text-align: center;
  .desc {
    font-size:20px;
    font-weight:700;
    color:$font-color-3;
    line-height:28px;
  }
  .login, .register {
    width: 222px;
    height:36px;
    background:$main-color-1;
    border-radius:4px;
    margin: 0;
    border: none;
    transition: width 400ms;
    &.login {
      margin: 23px 0 10px;
      color: #fff;
    }
    &.register {
      background:$sub-color-1;
      color: $font-color-3;
    }
  }
  .login:hover, .register:hover {
    width: 250px;
  }
}
</style>
