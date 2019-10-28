<template>
<div class="box">
    <div class="inner" v-if="visibleDialog">
        <div class="guide">
            <i class="iconfont icon-danchuang-guanbi open" @click="handleClose"></i>
            <div class="guide_header">
                <img :src="cdnPath + 'guide_logo.png'"/>
                <p>精英人才招聘神器</p>
            </div>
            <div class="text_wrap">
                <div class="guide_text">
                    <i class="iconfont icon-haojihui"></i>
                    <span>100000+好机会</span>
                </div>
                <div class="guide_text">
                    <i class="iconfont icon-qiye"></i>
                    <span>300+知名企业</span>
                </div>
                <div class="guide_text">
                    <i class="iconfont icon-weixin"></i>
                    <span>一键约面，急速入职</span>
                </div>
            </div>
        </div>

        <div class="login">
            <h3 class="login_title">登录/注册猎多多</h3>
            <div class="login_input">
                <el-input placeholder="请输入手机号码" prefix-icon= "iconfont icon-shoujihao" maxlength="11" v-model="mobile"></el-input>
                <el-input placeholder="请输入短信验证码" prefix-icon= "iconfont icon-yanzhengma" maxlength="4" v-model="code"></el-input>
                <div class="code" @click="sms">{{text}}</div>
            </div>
            <el-button type="primary" class="login_buttom" round @click="logintoo">登录/注册</el-button>
            <a href="https://sao.lieduoduo.com/userAgreement" class="login_text">注册代表你已同意 猎多多用户协议&隐私政</a>
            <p class="login_href" @click="$router.push('login')">企业登录/注册</p>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { mobileReg } from '@/util/fieldRegular.js'
import { getCodeApi, loginPutInApipc } from '@/api/auth'

@Component({
  name: 'loginalert',
  methods: {},
  computed: {},
  components: {},
  watch: {
    visible (value) {
      if (value) {
        this.visibleDialog = value
      }
    }
  }
})

export default class loginAlret extends Vue {
    props = {
      visible: Boolean
    }
    data () {
      return {
        visibleDialog: true,
        mobile: '', // 手机号
        code: '', // 验证码
        text: '发送验证码',
        cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/` // cdn图片地址
      }
    }
    checkMobile () {
      if (!mobileReg.test(this.mobile)) {
        this.$message.error('手机号码格式不正确')
        return false
      } else {
        return true
      }
    }
    // 发送短信验证码
    sms () {
      if (!this.checkMobile()) {
        return
      }
      getCodeApi({ mobile: this.mobile }).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.smstime()
      })
    }

    // 登录短信验证码倒计时
    smstime () {
      this.text = 60
      let timeout = setInterval(() => {
        this.text--
        if (this.text === 0) {
          clearInterval(timeout)
          this.text = '发送验证码'
        }
      }, 1000)
    }

    // 提交
    logintoo () {
      if (!this.checkMobile()) {
        return null
      }
      let params = {
        mobile: this.mobile,
        code: this.code,
        isBusiness: 0
      }
      this.$store.dispatch('login', params).then(() => {
        console.log(111111111111)
      })
    }
    // 关闭当前组件传出数据
    handleClose () {
      this.visibleDialog = false
      this.$emit('update:visible', false)
    }
}
</script>

<style lang="scss">
.el-input__inner{
    height: 46px;
    padding-left: 49px !important;
}
.el-input__prefix{
    left: 16px;
}
</style>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.5);

    .inner{
        width: 650px;
        height: 440px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        overflow: hidden;
        font-family:PingFangSC-Medium,PingFang SC;
        border-radius: 8px;
        .guide{
            width: 179px;
            height: 440px;
            background: #FBFBFF;
            float: left;
            .open{
                position: absolute;
                top: 16px;
                right: 16px;
                cursor: pointer;
            }
            .guide_header{
                text-align: center;
                margin: 68px auto 36px auto;
                img{
                    width: 46px;
                }
                p{
                    color: #652791;
                    font-weight: 500;
                    margin-top: 13px;
                }
            }
            .text_wrap{
                width: 146px;
                height: 104px;
                margin-left: 25px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                i{
                    font-size: 16px;
                    color: #652791;
                    margin-right: 3px;
                }
                span{
                    font-size: 12px;
                    color: #6D696E;
                }
            }
        }

        .login{
            width: 471px;
            height: 440px;
            background: #FFFFFF;
            float: left;
            .login_title{
                font-size: 22px;
                line-height: 30px;
                color: #652791;
                margin: 40px 0 0 0;
                text-align: center;
                font-weight: 500;
            }
            .login_input{
                width: 354px;
                height: 122px;
                margin: 40px auto 40px auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                input{
                    padding-left: 49px !important;
                }
                .code{
                    width: 70px;
                    height: 46px;
                    color: #652791;
                    font-weight: 400;
                    line-height: 46px;
                    position: absolute;
                    right: 15px;
                    bottom: 0;
                    text-align: right;
                    cursor: pointer;
                }
            }
            .login_buttom{
                width: 354px;
                height: 46px;
                display: block;
                margin: 0 auto 34px auto !important;
                font-weight: 500;
            }
            .login_text{
                text-align: center;
                font-size: 12px;
                color: #A29CA6;
                margin: 0 auto 20px auto;
                line-height: 17px;
                font-weight: 400;
                display: block;
            }
            .login_href{
                font-weight: 400;
                color: #652791;
                text-align: center;
                cursor: pointer;
            }
        }
    }
}
</style>
