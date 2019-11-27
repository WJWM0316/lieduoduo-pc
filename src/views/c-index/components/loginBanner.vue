<template>
  <div class="index-login" :class="{'is-index-login': isLogin}">
    <div class="login-bg" v-if="!isLogin">
      <div class="main-center index-login-wrapper">
        <p class="position-number">
          <span class="banner-text">高薪工作，就在猎多多</span>
          <span class="banner-number"><span>{{total.coolCompanyNum}} 酷公司</span><span>{{total.goodChanceNum}} 好机会</span></span>
        </p>
        <div class="login-wrapper">
          <el-input class="login-phone-input el-input-radius2px" maxlength="11" placeholder="请输入手机号码" v-model="loginForm.mobile" size="medium" />
          <el-input  class="login-code-input el-input-radius2px" placeholder="验证码" v-model="loginForm.code" size="medium">
            <span class="code-span" slot="suffix"  @click="getCode">{{text}}</span>
          </el-input>
          <div class="login-btn" @click="login">登录/注册</div>
        </div>
      </div>
    </div>
    <div class="is-login-bg" :style="{'backgroundImage': `url(${banner[0] && banner[0].bigImgUrl})`, color: '#fff'}" v-else />
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
    }
  },
  destroyed () {
    window.clearTimeout(this.timeout)
  }
}
</script>
<style lang="scss" scoped>
$index-login-height: 120px;
.login-bg, .is-login-bg {
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
}
.login-bg {
  background-image: url(#{$image-cdn-url}/images/index_banner.png);
  height: $index-login-height;
}
.is-login-bg {
  height: 70px;
  max-width: 1400px;
  width: 100%;
  background-position: center center;
}
.index-login {
  width: 1200px;
  height: $index-login-height;
  width: 100%;
  background: $bg-color-4;
}
.index-login.is-index-login {
  height: 70px;
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
    line-height: 34px;
    margin: 20px 0 12px;
  }
  .banner-text {
    width: 196px;
  }
  .banner-number {
    width: 258px;
    span + span {
      padding-left: 12px;
    }
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
    padding:0 3px 0 3px;
    line-height: 36px;
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
  border-radius:2px;
  color: #fff;
  font-size:14px;
}
.login-wrapper {
  width: 100%;
  @include flex-v-center;
  justify-content: flex-end;
}

</style>
