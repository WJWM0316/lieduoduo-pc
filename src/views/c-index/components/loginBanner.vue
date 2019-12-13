<template>
  <div class="index-login" :class="{'is-index-login': isLogin, 'no-banner': isLogin && !banner[0]}">
    <div class="login-bg" v-if="!isLogin">
      <div class="main-center index-login-wrapper">
        <p class="position-number">
          <span class="banner-text">{{total.coolCompanyNum}} 酷公司</span>
          <span class="banner-number">{{total.goodChanceNum}} 好机会</span>
        </p>
        <div class="login-wrapper">
          <el-input class="login-phone-input el-input-radius2px" maxlength="11" placeholder="请输入手机号码" v-model="loginForm.mobile" />
          <el-input  class="login-code-input el-input-radius2px" placeholder="验证码" v-model="loginForm.code">
            <span class="code-span" slot="suffix"  @click="getCode">{{text}}</span>
          </el-input>
          <div class="login-btn" @click="login">登录/注册</div>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="is-login-bg" v-if="banner[0]" :style="{'backgroundImage': `url(${banner[0].bigImgUrl})`, color: '#fff'}" @click="handleOpenUrl" />
    </template>
  </div>
</template>
<script>
import { getCodeApi } from '@/api/auth'
import { mobileReg } from '@/util/fieldRegular.js'

export default {
  props: {
    banner: {
      type: Array,
      default: () => ([])
    },
    total: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      text: '获取',
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.userInfo.id
    }
  },
  methods: {
    checkMobile () {
      if (!mobileReg.test(this.loginForm.mobile)) {
        this.$message.error('手机号码格式不正确')
        return false
      } else {
        return true
      }
    },
    // 登录短信验证码倒计时
    smstime () {
      this.text = 60
      clearInterval(this.timeout)
      this.timeout = setInterval(() => {
        this.text--
        if (this.text === 0) {
          clearInterval(this.timeout)
          this.text = '获取'
        }
      }, 1000)
    },
    getCode () {
      if (!this.loginForm.mobile || this.text !== '获取' || !this.checkMobile()) {
        return
      }
      getCodeApi({ mobile: this.loginForm.mobile }).then(res => {
        this.$message({
          message: '发送成功',
          type: 'success'
        })
        this.code = res.data.data
        this.smstime()
      })
    },
    login () {
      let parmas = {
        ...this.loginForm,
        isBusiness: 0,
        refresh: true
      }
      this.$store.dispatch('login', parmas)
    },
    handleOpenUrl () {
      window.open(this.banner[0].targetUrl, '_blank')
    }
  },
  destroyed () {
    window.clearTimeout(this.timeout)
  }
}
</script>
<style lang="scss" scoped>
$index-login-height: 130px;
.index-login {
  height: $index-login-height;
  width: 100%;
  background: $bg-color-4;
}
.index-login.is-index-login {
  height: 70px;
}
.index-login.no-banner {
  height: 0;
}
.login-bg, .is-login-bg {
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
}
.login-bg {
  width: $page-width;
  background-image: url(#{$image-cdn-url}/images/index_banner.png);
  height: $index-login-height;
}
.is-login-bg {
  height: 70px;
  max-width: 1400px;
  width: 100%;
  background-position: center center;
}
.index-login-wrapper {
  height: 100%;
  text-align: right;
}
.position-number {
  span {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
  }
  .banner-text,.banner-number {
    text-align: center;
    height: 34px;
    width: 230px;
    line-height: 34px;
    margin: 20px 0 12px;
  }
  .banner-text {
    position: relative;
  }
  .banner-text::after {
    content: "";
    position: absolute;
    height: 20px;
    top: 7px;
    opacity: 0.5;
    width: 1px;
    background-color: #fff;
    right: 0;
  }
}
.el-input /deep/ .el-input__inner {
    padding: 0 14px;
}
.login-phone-input {
  width:183px;
}
.login-code-input {
  width:152px;
  margin: 0 15px 0 6px;
  .code-span {
    padding:0px 8px 0 3px;
    line-height: 40px;
    height: 100%;
    background: #fff;
    cursor: pointer;
    color: $main-color-1;
  }
}
.login-btn {
  width:100px;
  cursor: pointer;
  text-align: center;
  height: 36px;
  border:1px solid #fff;
  line-height: 36px;
  border-radius: 2px;
  color: #fff;
  font-size:14px;
}
.login-btn:hover {
  background: rgba(#fff, 0.2);
}
.login-wrapper {
  width: 100%;
  @include flex-v-center;
  justify-content: flex-end;
  & /deep/ .el-input__inner {
    border: none;
  }
}

</style>
