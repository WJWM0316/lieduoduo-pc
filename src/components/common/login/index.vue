<template>
  <div id="loginForm">
    <div class="inner">
      <div class="login_cont" :class="{ toggleType: !toggleType}">
        <!-- 切换登录方式type -->
        <div class="login_type" v-if="toggleType && (type === 'msgLogin' || type === 'qrcodeLogin')" v-show="!guideCreateRecruiter">
          <div class="login_text" @click="changetype">{{type === 'msgLogin' ? '二维码登录' : '短信验证登录'}}</div>
          <div class="login-img">
            <img :src="cdnPath + (type === 'msgLogin' ? 'loginimg.png': 'loginimg_sms.png')" @click="changetype" />
          </div>
        </div>
        <!-- 二维码登录 -->
        <template v-if="type === 'qrcodeLogin' && toggleType">
          <div class="logind">
            <h3 class="cont_tit" style="margin-bottom:24px">扫码登录</h3>
            <div class="cont_p">使用「猎多多小程序」扫码登录</div>

            <div class="cont_help">
              <div class="cont_help_left" @click="openHelp = !openHelp">
                <span>?</span>
              </div>
              <span class="cont_help_right" @click="openHelp = !openHelp">扫码帮助</span>
            </div>
            <div class="login_pic_warp">
              <img class="loginCode" :src="codeData.image" />
              <div class="pastDue" v-if="isPast">
                <p>请重新刷新二维码</p>
                <div class="pastBtn" @click="refreshCode">刷新</div>
              </div>
              <div class="bottom_text bottom_bnt">
                没有账号
                <span @click="changetypeto">立即注册</span>
              </div>
            </div>
          </div>
          <!-- 左侧引导图 -->
          <div class="help_cont" v-show="openHelp">
            <h3>扫码帮助</h3>
            <div class="help_type">
              <div :class="{ helptype: !helptype}" @click="helptype = !helptype">求职者</div>
              <div :class="{ helptype: helptype}" @click="helptype = !helptype">招聘者</div>
            </div>
            <p class="help_text">我的 > 右上角「扫码」登录</p>

            <div class="help_img">
              <img :src="!helptype ? cdnPath + 'scanhelp.png' : cdnPath + 'scanhelptoo.png'" />
            </div>
          </div>
        </template>
        <!-- 短信登录 或者 注册 -->
        <div class="logind" :class="{ cont_ti: imgcode }" v-if="type === 'msgLogin' || type === 'register' || !toggleType" v-show="!guideCreateRecruiter">
          <ul class="sign_type" v-if="type === 'register'">
            <li :class="{ active:identity === 1 }" @click="toggle(1)">我是求职者</li>
            <li :class="{ active:identity === 2 }" @click="toggle(2)">我是面试官</li>
          </ul>

          <h3 v-if="type === 'msgLogin' || !toggleType" class="cont_tit" style="margin-bottom: 40px;">{{toggleType ? '短信登录' : '登录/注册猎多多'}}</h3>
          <div class="logind_form">
            <div class="input_wrap">
              <div class="input_box">
                <i class="input_img iconfont icon-shoujihaoma" />
                <input placeholder="请输入手机号码" maxlength="11" v-model="mobile" />
              </div>
              <div class="input_box" v-if="imgcode">
                <i class="input_img iconfont icon-anquan_huaban" />
                <input placeholder="请输入图片验证码"  v-model="captchaValue" />
                <img :src="imgcode" class="imgcode"/>
              </div>
              <div class="input_box">
                <i class="input_img input_i iconfont icon-duanxinyanzheng" />
                <input placeholder="请输入短信验证码" maxlength="4" v-model="cValue" />
                <span class="msgText" @click="sms">{{text + (text !== '发送验证码' ? ' s' : '') }}</span>
              </div>
            </div>
          </div>
          <el-button type="primary" class="login_button" @click="logintoo" :loading="loading">{{type === 'register' ? '注册' : type === 'msgLogin' && toggleType ? '登录' : '登录/注册' }}</el-button>
          <div class="bottom_text" v-if="toggleType">
            {{type === 'msgLogin' ? '没有账号' : '已有账号' }}
            <span @click="changetypeto">{{ type === 'msgLogin' ? '立即注册' : '马上登录' }}</span>
          </div>
          <div class="bottom_txt" v-if="!toggleType">
            <a href="https://www.lieduoduo.com/userAgreement" class="login_text" target="_blank">注册代表你已同意 猎多多用户协议&隐私政策</a>
            <p class="login_href" @click="$router.push('/login')">企业登录/注册</p>
          </div>
        </div>

        <!-- 登录/注册猎多多c端引导 -->
        <div class="guide" v-if="!toggleType">
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
                    <span>4000+知名企业</span>
                </div>
                <div class="guide_text">
                    <i class="iconfont icon-weixin" style="font-size: 14px;"></i>
                    <span>一键约面，急速入职</span>
                </div>
            </div>
        </div>

        <!-- 登录成功引导图 -->
        <div class="login_after" v-if="guideCreateRecruiter">
          <h3 class="after_title">登录注册成功</h3>
          <p class="after_text">尚未是认证面试官，微信「扫一扫」认证</p>
          <img class="after_img" :src="cdnPath + 'bIndex.jpg'"/>
        </div>
      </div>

      <div class="overlayout" v-if="showError">
        <div class="box">
          <i class="el-icon-close" @click="closeMask"></i>
          <div class="header">
            <i class="el-icon-warning"></i>
            登录失败
          </div>
          <ul>
            <li class="h10">可能是由于以下原因导致：</li>
            <li>1、未注册猎多多小程序；</li>
            <li>2、招聘官身份尚未审核通过；</li>
            <li>3、招聘官身份尚未加入该公司；</li>
            <li>4、招聘官身份所属公司尚未通过审核。</li>
          </ul>
          <div class="code-tips">
            <img class="pic_3" src="@/assets/images/inf_qrcode@2x.png" />
            <div class="text10">
              使用「微信」扫描小程序码，
              <br />进入猎多多小程序解决以上问题
            </div>
          </div>
          <div class="login-next">
            <span>重新登录>></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Component from 'vue-class-component'
import { scanApi, getQrCodeApi, getCodeApi, getCaptchaApi } from '@/api/auth'
import { mobileReg } from '@/util/fieldRegular.js'
import { mapState } from 'vuex'
@Component({
  name: 'loginForm',
  methods: {},
  props: {
    toggleType: {
      type: Boolean,
      default: true
    },
    loginType: {
      type: String,
      default: ''
    }
  },
  computed: mapState({
    guideCreateRecruiter: state => state.guideCreateRecruiter
  })
})

export default class loginForm extends Component {
  mobile = '' // 手机号
  cValue = '' // 验证码
  imgcode = '' // base64图片
  captchaKey = '' // 传回来的key
  captchaValue = '' // 图片验证码的value
  text = '发送验证码'
  type = 'msgLogin' // msgLogin 短信登录, qrcodeLogin 二维码登录, register 注册
  helptype = false
  openHelp = false
  loading = false
  // cdn图片地址
  cdnPath = `${process.env.VUE_APP_CDN_PATH}/images/`
  identity = 1 // 1 求职者 2 招聘官
  codeData = {} // 二维码信息
  userInfo = {}
  isPast = true;
  timer = null;
  num = 1;
  showError = false;

  beforeDestroy () {
    clearInterval(this.timer)
  }
  created () {
    this.init()
  }
  closeMask () {
    this.showError = !this.showError
  }

  init () {
    if (this.loginType) this.type = this.loginType
    if (this.$route.name === 'login' && !this.$route.query.type) this.type = 'qrcodeLogin'
    if (this.$route.query.type) this.type = this.$route.query.type
    if (this.type === 'qrcodeLogin') this.getCode()
  }

  // 获取二维码
  getCode () {
    getQrCodeApi().then(res => {
      // console.log('==>',res)
      this.codeData = res.data.data
      this.isPast = false
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.num += 1
        if (this.num > 40) {
          this.num = 1
          clearInterval(this.timer)
          this.isPast = true
        } else {
          this.scan()
        }
      }, 3000)
    })
  }
  // 判断扫码登录
  scan () {
    scanApi({
      uuid: this.codeData.uuid
    }).then(res => {
      if (res.data.data && res.data.data.id) {
        clearInterval(this.timer)
        this.$store.dispatch('scanLogin', res.data.data)
      }
    })
  }

  // 刷新获取二维码
  refreshCode () {
    this.getCode()
  }

  // 左侧引导栏切换
  helpto () {
    this.helptype = !this.helptype
  }

  // 登录方式切换
  changetype () {
    if (this.type === 'msgLogin') {
      this.type = 'qrcodeLogin'
      this.getCode()
    } else {
      this.type = 'msgLogin'
      clearInterval(this.timer)
    }
  }

  // 短信登录注册切换
  changetypeto () {
    this.type =
      this.type === 'msgLogin' ||
      this.type === 'qrcodeLogin'
        ? 'register'
        : 'msgLogin'
  }

  // 注册角色切换type
  toggle (type) {
    this.identity = type
  }
  checkMobile () {
    if (!mobileReg.test(this.mobile)) {
      this.$message.error('手机号码格式不正确')
      return false
    } else {
      return true
    }
  }

  // 刷新验证码图片
  getCaptcha () {
    getCaptchaApi({}).then(res => {
      this.imgcode = res.data.data.img
      this.captchaKey = res.data.data.key
    })
  }

  // 发送短信验证码
  sms () {
    if (!this.checkMobile()) {
      return
    }
    if (this.text !== '发送验证码') {
      return
    }
    getCodeApi({ mobile: this.mobile }).then(res => {
      this.$message.success('验证码发送成功')
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

  // 短信登录提交   //注册提交
  logintoo () {
    if (this.loading) return
    if (!this.checkMobile()) {
      return
    }
    let params = {
      mobile: this.mobile,
      code: this.cValue,
      curInUseRole: this.identity,
      captchaKey: this.captchaKey,
      captchaValue: this.captchaValue
    }
    if (!this.toggleType) params.refresh = true
    if (this.$route.query.needBack) params.needBack = true
    this.loading = true
    this.$store.dispatch('login', params)
      .then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
  }
}
</script>
<style lang="scss" scoped>
.inner {
  text-align: center;
  .logind {
    .logind_form {
      width: 560px;
      margin-bottom: 41px;
    }
  }
  .overlayout {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.3);
    .box {
      width: 432px;
      height: 384px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: 32px 32px 32px 70px;
    }
    .el-icon-close {
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;
    }
    .header {
      text-align: left;
      height: 24px;
      font-size: 16px;
      font-weight: 700;
      color: rgba(53, 64, 72, 1);
      line-height: 24px;
      position: relative;
    }
    .el-icon-warning {
      color: #ff7f4c;
      position: absolute;
      left: -24px;
      top: 50%;
      transform: translateY(-50%);
    }
    ul {
      text-align: left;
      line-height: 1.5;
    }
    li {
      color: #5c565d;
    }
    .h10 {
      height: 24px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(92, 86, 93, 1);
      line-height: 24px;
      margin-bottom: 8px;
      margin-top: 16px;
    }
    .text10 {
      flex: 1;
      text-align: left;
      font-size: 14px;
      font-weight: 400;
      color: rgba(92, 86, 93, 1);
      line-height: 22px;
    }
    .code-tips {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 18px;
    }
    .pic_3 {
      width: 96px;
      height: 96px;
      margin-right: 16px;
    }
    .login-next {
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: $main-color-1;
      line-height: 22px;
      text-align: left;
      margin-top: 24px;
      span {
        cursor: pointer;
      }
    }
  }
  .login_cont {
    width: 560px;
    height: 458px;
    background: #fff;
    box-shadow: 0px 8px 12px 0px rgba(40, 40, 40, 0.2);
    border-radius: 8px;
    position: relative;
    box-sizing: border-box;
    .login_type {
      width: 200px;
      position: absolute;
      right: 0;
      height: 83px;
      text-align: right;
      vertical-align: top;
      .login_text {
        font-size: 12px;
        color: #929292;
        width: 86px;
        height: 20px;
        background: #f6f6f6;
        line-height: 20px;
        border-radius: 8px;
        margin-top: 15px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
      }
      .login-img {
        width: 83px;
        height: 83px;
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
        img {
          width: 83px;
        }
      }
    }
    .bottom_text {
      font-weight: 400;
      color: #626262;
      span {
        color: $main-color-1;
        cursor: pointer;
      }
    }
    .bottom_txt{
      .login_text{
        font-size: 12px;
        color: #A29CA6;
        line-height: 17px;
        font-weight: 400;
      }
      .login_href{
        font-weight: 400;
        color: $main-color-1;
        cursor: pointer;
        margin-top: 20px;
        text-decoration: underline;
      }
    }

    .bottom_bnt {
      margin-top: 34px;
    }

    .help_cont::after {
      content: " ";
      position: absolute;
      left: 310px;
      top: 228px;
      width: 0px;
      height: 0px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent #fff;
    }
    .help_cont {
      position: absolute;
      width: 310px;
      height: 458px;
      right: 570px;
      background: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      top: 0;
      box-shadow: 0px 8px 12px 0px rgba(40, 40, 40, 0.2);
      .help_type {
        width: 168px;
        height: 34px;
        margin: 16px auto 13px auto;
        border: 1px solid rgba(239, 233, 244, 1);
        border-radius: 17px;
        color: $main-color-1;
        font-size: 14px;
        font-weight: 400;
        div {
          display: inline-block;
          font-size: 14px;
          width: 84px;
          line-height: 34px;
          border-radius: 17px;
          cursor: pointer;
        }
        .helptype {
          background: #efe9f4;
        }
      }

      .help_text {
        color: #5c565d;
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
      }
      .help_img {
        margin-top: 13px;
        img {
          width: 230px;
          height: 270px;
        }
      }
      h3 {
        font-size: 20px;
        font-weight: Medium;
        color: #282828;
        line-height: 28px;
        margin-top: 50px;
        margin-bottom: 16px;
      }
    }
    .cont_tit {
      font-size: 30px;
      font-weight: 700;
      color: $main-color-1;
      line-height: 30px;
      padding-top: 50px;
      box-sizing: border-box;
    }
    .cont_ti {
      margin-bottom: 32px !important;

      .input_to {
      height: 190px;
      }
    }
    .cont_p {
      font-size: 14px;
      font-weight: 700;
      color: #626262;
      line-height: 20px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      flex-direction: row;

      .help {
        color: $main-color-1;
        margin-left: 8px;
        cursor: pointer;
      }
      .ques {
        width: 14px;
        height: 14px;
        line-height: 14px;
        background: $bg-color-4;
        color: #fff;
        margin-left: 6px;
        border-radius: 50%;
        display: block;
        margin-top: 4px;
      }
    }

    .cont_help {
      margin-bottom: 28px;

      .cont_help_left {
        background: $bg-color-4;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        display: inline-block;
        color: #ffffff;
        font-size: 8px;
        line-height: 18px;
        cursor: pointer;

        span {
          position: relative;
          top: -2px;
        }
      }
      .cont_help_right {
        color: $main-color-1;
        font-size: 14px;
        margin-left: 6px;
        display: inline-block;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
        line-height: 18px;
      }
    }
    .login_pic_warp {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      margin-bottom: 42px;
      position: relative;
      border-radius: 4px;
      border: 1px dashed rgba(48, 50, 51, 0.4);
      .loginCode {
        display: block;
        width: 180px;
        height: 180px;
        margin: 10px auto 10px auto;
      }
      .pastDue {
        width: 200px;
        height: 200px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          font-size: 16px;
          font-weight: 700;
          color: $main-color-1;
          margin-bottom: 33px;
        }
        .pastBtn {
          width: 98px;
          height: 38px;
          background: $bg-color-4;
          border-radius: 19px;
          margin-bottom: 14px;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 1);
          line-height: 38px;
          text-align: center;
        }
      }
    }

    .input_wrap {
      width: 406px;
      height: 132px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 0 auto;
    }

    .input_box {
      width: 406px;
      height: 50px;
      border-radius: 4px;
      border: 1px solid $border-color-1;
      box-sizing: border-box;
      text-align: left;
      line-height: 46px;
      font-size: 0;
      .input_img {
        margin: 0 12px 0 29px;
        font-size: 18px;
        color: $font-color-10;
      }
      .input_i{
        font-size: 14px !important;
      }

      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #d8dce6;
        font-weight: 400;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #d8dce6;
        font-weight: 400;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #d8dce6;
        font-weight: 400;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #d8dce6;
        font-weight: 400;
      }

      input {
        width: 220px;
        height: 48px;
        font-size: 16px;
        font-weight: 500;
        color: $title-color-1;
        background: none;
      }
      .msgText {
        color: $main-color-1;
        font-weight: 700;
        font-size: 16px;
        line-height: 48px;
        display: inline-block;
        float: right;
        cursor: pointer;
        margin-right: 26px;
      }

      .imgcode {
        width: 102px;
        height: 41px;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
    .login_butto {
      margin: 0 auto 24px auto !important;
    }
    .login_button {
      width: 406px;
      height: 50px;
      margin: 0 auto 58px auto;
      color: #fff;
      font-size: 20px;
      border: 0;
      span {
        color: #fff;
        font-weight: 700;
        font-size: 20px;
      }
    }
    .guide{
      width: 179px;
      height: 440px;
      background: #FBFBFF;
      position: absolute;
      top:0;
      left: -178px;
      border-radius: 8px 0 0 8px;
      .guide_header{
          text-align: center;
          margin: 68px auto 36px auto;
          img{
              width: 46px;
          }
          p{
              color: $main-color-1;
              font-weight: 700;
              margin-top: 13px;
          }
      }
      .text_wrap{
          width: 146px;
          height: 104px;
          margin-left: 26px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          i{
              font-size: 16px;
              color: $main-color-1;
              margin-right: 6px;
          }
          span{
              font-size: 12px;
              color: #6D696E;
          }
        }
      }
      .login_after{
        height: 316px;
        padding: 50px 0 92px 0;
        .after_title{
          font-size: 30px;
          color: $main-color-1;
          font-weight:700;
        }
        .after_text{
          font-size: 18px;
          line-height: 26px;
          color: #333333;
          font-weight:700;
          margin: 48px 0 38px 0;
        }
        .after_img{
          width: 188px;
          height: 174px;
        }
      }

    .sign {
      .logind_form {
        width: 560px;
        margin-bottom: 40px;
      }
    }
    .sign_type {
      width: 460px;
      height: 38px;
      margin: 0 auto 32px auto;
      padding-top: 50px;

      li {
        display: inline-block;
        width: 203px;
        height: 40px;
        font-size: 20px;
        color: #929292;
        font-weight: 400;
        font-family: PingFangSC-Regular, PingFang SC;
        border-bottom: 2px solid #e8e9eb;
        position: relative;
        cursor: pointer;
      }
      .active::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -5px;
        margin: auto;
        width: 8px;
        height: 8px;
        background: white;
        border: solid 2px $border-color-2;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
      }
      .active {
        border-color: $border-color-2;
        color: $main-color-1;
        font-weight: 550;
      }
    }
  }

  .toggleType{
    width: 471px;
    height: 440px;
    border-radius: 0 8px 8px 0;
    .logind_form{
      width: 471px;
      height: 124px;
      .input_wrap{
        width: 354px;
        height: 124px;
        .input_box{
          width: 354px;
          height: 46px;
          .input_img{
            color: $border-color-1;
            margin-left: 14px;
          }

          input::-webkit-input-placeholder {
            /* WebKit browsers */
            font-size: 14px;
          }
          input:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            font-size: 14px;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 14px;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            font-size: 14px;
          }

          input{
            width: 200px;
            height: 44px;
            color: $title-color-1;
          }
          .msgText{
            margin-right: 15px;
            font-size: 14px;
          }
        }
      }
    }
    .login_button{
      width: 354px;
      height: 46px;
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 14px;
    }
  }
}
</style>
