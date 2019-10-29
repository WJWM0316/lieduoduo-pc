<template>
  <div id="login">
    <div class="loginBox">
      <login-form id="loginForm" :loginType="loginType"></login-form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import loginForm from '@/components/common/login'
@Component({
  name: 'login',
  components: {
    loginForm
  }
})
export default class login extends Vue {
  loginType = 'qrcodeLogin'
  mounted () {
    let query = this.$route.query
    if (query.type) this.loginType = query.type
    this.loginType 
    // 百度统计
    let _hmt = _hmt || [];
    (function () {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?f7fe68c0039c09911deef47214587f2f'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }
}
</script>
<style lang="less">
#login {
  min-width: 1200px;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
  background: #652791 url("https://lieduoduo-uploads-test.oss-cn-shenzhen.aliyuncs.com/front-assets/web/images/bg_loginpage.png") no-repeat;
  background-size: auto 100%;
  background-position: center;
  display: flex;
  align-items: center;
  .loginBox {
    width: 1200px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
    #loginForm {
      float: right;
    }
  }
}
  
</style>
