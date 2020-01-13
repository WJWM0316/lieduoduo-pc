<template>
  <div id="login">
    <div class="loginBox">
      <div class="login_left">
        <img class="login_left_logo" :src="cdnPath + 'login_left_logo.png'"  @click="$router.push('/index')" />
        <img class="loginpage_left" :src=" identity === 1 ? cdnPath + 'loginpage_left.png?' : cdnPath + 'loginpage_left_recruiter.png' " />
      </div>
      <div class="login_right">
        <login-form id="loginForm" @login-identity='loginIdentity' :loginType="loginType"></login-form>
        <p class="loginForm-text">BOSS直聘战略投资 高端人才招聘平台</p>
      </div>
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
  identity = 1
  loginIdentity (data) {
    this.identity = data
  }
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
  background: #00C4CD url(#{$image-cdn-url}/images/bg_loginpage.jpg) no-repeat;
  background-size: 2163px 900px;
  background-position: center center;
  display: flex;
  align-items: center;
  background-clip: padding-box;
  /*background-attachment:fixed;*/
  .loginBox {
    width: 1200px;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .login_left{
      width: 616px;
      height: 610px;
      position: relative;
      .login_left_logo{
        cursor: pointer;
        width: 158px;
        position: absolute;
        left: 50%;
        top: 76px;
        transform: translateX(-50%);
      }
      .loginpage_left{
        width: 616px;
      }
    }
    .login_right{
      height: 458px;
      position: relative;
      .loginForm-text{
        font-size: 14px;
        line-height: 24px;
        color: #ffffff;
        position: absolute;
        left: 50%;
        bottom: -30px;
        transform: translateX(-50%);
      }
    }
  }
}

</style>
