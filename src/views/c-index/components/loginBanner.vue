<template>
  <div class="index-login">
    <div class="login-bg">
      <div class="main-center index-login-wrapper">
        <div class="position-number">
          <div class="position-number-wrapper">
            <p><span>{{total.coolCompanyNum}}</span>酷公司 <i>|</i> <span>{{total.goodChanceNum}}</span>好机会</p>
          </div>
        </div>
        <div class="login-wrapper">
          <el-input class="login-phone-input el-input-radius2px" maxlength="11" placeholder="请输入手机号码" v-model="loginForm.mobile" size="medium" />
          <el-input  class="login-code-input el-input-radius2px" placeholder="验证码" v-model="loginForm.code" size="medium">
            <span class="code-span" slot="suffix"  @click="getCode">{{text}}</span>
          </el-input>
          <div class="login-btn" @click="login">登录/注册</div>
        </div>
      </div>
    </div>
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
.login-bg {
  width: 1200px;
  margin: 0 auto;
  background-image: url(#{$image-cdn-url}/images/index_banner.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: $index-login-height;
}
.index-login {
  height: $index-login-height;
  width: 100%;
  background: $bg-color-4;
}
.index-login-wrapper {
  @include flex-v-center;
  height: 100%;
}
.position-number {
  flex: 1;
  text-align: center;
  .position-number-wrapper {
    margin-left: 350px;
    width: 280px;
    text-align: left;
    display: inline-block;
    img {
      max-width: 100%;
    }
  }
  p {
    color: #fff;
    font-size: 14px;
    margin-top: 6px;
    span {
      color: $sub-color-1;
      padding-right: 6px;
    }
    i {
      padding: 0 6px;
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
  width:143px;
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
  width:85px;
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
  width: 460px;
  @include flex-v-center;
  justify-content: flex-end;
}

</style>
