<template>
  <div class="index-login">
    <div class="main-center index-login-wrapper">
      <div class="position-number">
        <div class="position-number-wrapper">
          <h3>找高薪工作 就上猎多多</h3>
          <p><span>{{total.coolCompanyNum}}</span>酷公司 <i>|</i> <span>{{total.goodChanceNum}}</span>好机会</p>
        </div>
      </div>
      <div class="login-wrapper">
        <el-input class="login-phone-input" placeholder="请输入手机号码" v-model="loginForm.phone" size="medium" />
        <el-input  class="login-code-input" placeholder="验证码" v-model="loginForm.code" size="medium">
            <span class="code-span" slot="suffix">获取</span>
        </el-input>
        <div class="login-btn">登陆/注册</div>
      </div>
    </div>
  </div>
</template>
<script>
// :style="{'background-image': `url(${require('../../../assets/images/index/banner.gif')})`}"
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
      loginForm: {
        phone: '',
        code: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$index-login-height: 120px;
.index-login {
  background: $bg-color-4;
  height: $index-login-height;
  width: 100%;
  background-image: url('https://attach.lieduoduo.ziwork.com/front-assets/web/images/index-banner.gif');
  background-size: cover;
  background-repeat: no-repeat;
}
.index-login-wrapper {
  @include flex-v-center;
  height: 100%;
}
.position-number {
  flex: 1;
  text-align: center;
  h3 {
    font-size: 26px;
    color: #fff;
  }
  .position-number-wrapper {
    width: 280px;
    text-align: left;
    display: inline-block;
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
.login-phone-input {
  width:183px;
}
.login-code-input {
  width:143px;
  margin: 0 15px 0 6px;
  .code-span {
    line-height: 36px;
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
