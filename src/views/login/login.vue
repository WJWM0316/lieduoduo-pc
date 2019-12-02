<template>
  <div id="login">
    <div class="loginBox">
      <div class="login_left">
        <img :src=" cdnPath + 'loginpage_left.png'" @click="$router.push('/index')" />
      </div>
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
  },
  beforeRouteLeave (to, form, next) {
    this.$message.closeAll()
    next()
  }
})
export default class login extends Vue {
  loginType = 'msgLogin'
  cdnPath = `${process.env.VUE_APP_CDN_PATH}/images/`
  mounted () {
    let query = this.$route.query
    if (query.type) this.loginType = query.type
    // this.loginType
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
<style lang="scss">
#login {
  min-width: 1200px;
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
  background: #652791 url(#{$image-cdn-url}/images/bg_loginpage.png) no-repeat;
  background-size: 100% auto;
  background-position: center;
  display: flex;
  align-items: center;
  .loginBox {
    width: 1200px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .login_left{
      width: 539px;
      cursor: pointer;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}

</style>
