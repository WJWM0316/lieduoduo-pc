<template>
  <div id="login">
    <div class="_wrap"></div>
    <div class="login_cont">

      <!-- 切换登录方式type -->
      <div class="login_type" v-if="type === 'msgLogin' || type === 'qrcodeLogin'" v-show="!loginsuccess">
        <div class="login_text" @click="changetype">{{type === 'msgLogin' ? '二维码登录' : '短信验证登录'}}</div>
        <div class="login-img">
          <img :src="cdnPath + 'loginimg.png'" @click="changetype" />
        </div>
      </div>

      <!-- 二维码登录 -->
      <template v-if="type === 'qrcodeLogin'">
        <div class="logind" v-show="!loginsuccess">
          <h3 class="cont_tit" style="margin-bottom:24px">扫码登录</h3>
          <div class="cont_p">使用「猎多多小程序」扫码登录</div>

          <div class="cont_help">
            <div class="cont_help_left">
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
          <p class="help_text">职位管理 > 发布职位 > 扫码上传</p>

          <div class="help_img">
            <img :src="!helptype ? cdnPath + 'scanhelp.png' : cdnPath + 'scanhelptoo.png'" />
          </div>
        </div>
      </template>

      <!-- 短信登录 或者 注册 -->
      <div class="logind" :class="{ logindtoo: false }" v-if="type === 'msgLogin' || type === 'register'" v-show="!loginsuccess">

        <ul class="sign_type" v-if="type === 'register'">
          <li :class="{ active : !identity }" @click="toggle(0)">我是求职者</li>
          <li :class="{ active : identity }" @click="toggle(1)">我是招聘官</li>
        </ul>

        <h3 v-if="type === 'msgLogin'" class="cont_tit cont_ti" style="margin-bottom: 40px;">短信登录</h3>
        <div class="logind_form">
          <div class="input_wrap input_to">
            <div class="input_box">
              <i class="input_img iconfont icon-shoujihao" />
              <input placeholder="请输入手机号码" maxlength="11" v-model="mobile" />
            </div>
            <div class="input_box" v-if="imgcode">
              <i class="input_img iconfont icon-anquan_huaban" />
              <input placeholder="请输入图片验证码"  v-model="captchaValue" />
              <img :src="imgcode" class="imgcode"/>
            </div>
            <div class="input_box">
              <i class="input_img iconfont icon-yanzhengma" />
              <input placeholder="请输入短信验证码" maxlength="4" v-model="cValue" />
              <span class="msgText" @click="sms">{{text}}</span>
            </div>
          </div>
        </div>
        <el-button class="login_button login_bnt" @click="logintoo">登录</el-button>
        <div class="bottom_text">
          {{ this.type === 'msgLogin' ? '没有账号' : '已有账号' }}
          <span @click="changetypeto">{{ this.type === 'msgLogin' ? '立即注册' : '马上登录' }}</span>
        </div>
      </div>

      <!-- 引导图 -->
      <div class="login_after" v-show="loginsuccess">
        <h3 class="after_title">登录注册成功</h3>
        <p class="after_text">尚未是认证面试官，微信「扫一扫」认证</p>
        <img class="after_img"/>
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
          <img class="pic_3" src="../../assets/images/inf_qrcode@2x.png" />
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
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { loginApi, scanApi, getQrCodeApi, loginPutInApipc, getCodeApi, getCaptchaApi } from '@/api/auth'
import { getUserIdentity, switchId } from '../../../config.js'
import { changeBaseURL } from '@/api/index'
import { mobileReg } from '@/util/fieldRegular.js'
import { saveAccessToken } from '@/api/cacheService'

@Component({
  name: 'lighthouse-list',
  methods: {},
  computed: {},
  watch: {
    $route: {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
  components: {}
})
export default class CourseList extends Vue {
  mobile = '' // 手机号
  cValue = '' // 验证码
  imgcode = '' // base64图片
  captchaKey = '' // 传回来的key
  captchaValue = '' // 图片验证码的value
  text = '发送验证码'
  type = 'msgLogin' // msgLogin 短信登录, qrcodeLogin 二维码登录, register 注册
  helptype = false
  openHelp = false
  loginsuccess = false // 登录成功引导页
  // cdn图片地址
  cdnPath = `${process.env.VUE_APP_CDN_PATH}/images/`
  identity = 0 // 0 求职者 1 招聘官
  codeData = {} // 二维码信息
  userInfo = {}
  pop = {
    isShow: true,
    type: 'help'
  };
  status = 'login';
  identitystatus = 'qiuzhi'; // 引导图 状态
  isPast = true;
  timer = null;
  num = 1;
  showError = false;
  /**
   * 初始化表单、分页页面数据
   */

  returnHome () {
    window.location.href = `${process.env.VUE_APP_WEB_INDEX}`
  }

  mounted () {
    let query = this.$route.query
    // 百度统计
    let _hmt = _hmt || [];
    (function () {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?f7fe68c0039c09911deef47214587f2f'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
    if (!query.type) {
      this.status = 'login'
    } else {
      this.status = query.type
    }
  }

  closeMask () {
    this.showError = !this.showError
  }

  login () {
    let data = {
      email: '302982210@qq.com',
      password: 123456
    }
    this.$store
      .dispatch('testLogin', data)
      .then(res => {
        this.$store.dispatch('setUserInfo', res.data.data)
        this.userInfo = this.$store.state.userInfo
        this.$router.push({
          name: this.userInfo.isBusiness === 1 ? 'candidate' : 'applyIndex'
        })
      })
  }

  init () {
    if (!this.$route.query.type) this.type = 'qrcodeLogin'
    if (this.type === 'qrcodeLogin') this.getCode()
  }

  // 获取二维码
  getCode () {
    let that = this
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
      // isBusiness==1 b
      // console.log('==>',res.data)
      if (res.data.data && res.data.data.id) {
        clearInterval(this.timer)
        this.identity = res.data.data.isBusiness === 1 ? 1 : 0
        switchId(this.identity)
        changeBaseURL()
        this.isPast = false

        this.$store.dispatch('setUserIdentity', this.identity)
        this.$store.dispatch('setUserInfo', res.data.data)
        this.$store.dispatch('login', res.data.data)

        this.userInfo = this.$store.state.userInfo
        this.$router.push({
          name: this.identity === 0 ? 'applyIndex' : 'candidate'
        })
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
      this.type == 'msgLogin' ||
      this.type == 'qrcodeLogin'
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

  // 短信登录提交   //注册提交
  logintoo () {
    if (!this.checkMobile()) {
      return
    }
    let params = {
      mobile: this.mobile,
      code: this.cValue,
      isBusiness: this.identity,
      captchaKey: this.captchaKey,
      captchaValue: this.captchaValue
    }
    this.$store.dispatch('login', params).then(() => {
      console.log(111111111111)
    })
  }
}
</script>
<style lang="less">
#login {
  height: 100vh;
  box-sizing: border-box;
  min-width: 1100px;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: url("https://lieduoduo-uploads-test.oss-cn-shenzhen.aliyuncs.com/front-assets/web/images/bg_loginpage.png")
    no-repeat;
  background-size: cover;
  background-position: center;
  .logind {
    height: 400px;

    .logind_form {
      width: 560px;
      margin-bottom: 41px;
    }
  }
  .logo {
    cursor: pointer;
  }
  ._wrap {
    width: 50%;
    height: 460px;
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
      font-weight: 500;
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
      color: rgba(101, 39, 145, 1);
      line-height: 22px;
      text-align: left;
      margin-top: 24px;
      span {
        cursor: pointer;
      }
    }
  }
  .title_p {
    font-size: 24px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
    margin: 14px 0 66px 0;
  }
  .login_cont {
    width: 560px;
    height: 458px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 12px 0px rgba(40, 40, 40, 0.2);
    border-radius: 8px;
    position: relative;
    box-sizing: border-box;

    //切换登录方式
    .login_type {
      width: 180px;
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
        display: inline-block;
        vertical-align: top;
        img {
          width: 83px;
        }
      }
    }

    .bottom_text {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #626262;
      span {
        color: #652791;
        cursor: pointer;
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
        color: #652791;
        font-family: PingFangSC-Regular, PingFang SC;
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
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 12px;
      }
      .help_img {
        margin-top: 13px;
        img {
          width: 233px;
          height: 278px;
        }
      }
      h3 {
        font-size: 20px;
        font-weight: Medium;
        color: #282828;
        line-height: 28px;
        margin-top: 50px;
        margin-bottom: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
    .cont_tit {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #652791;
      line-height: 30px;
      margin-top: 50px;
      margin-bottom: 44px;
      box-sizing: border-box;
    }
    .logindtoo{

      .cont_ti {
        margin-bottom: 31px !important;
      }
      .input_to {
      height: 190px;
      }
      .login_bnt{
        margin-bottom: 22px;
      }
    }
    .cont_p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: Regular;
      color: #626262;
      line-height: 20px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      flex-direction: row;

      .help {
        color: rgba(101, 39, 145, 1);
        margin-left: 8px;
        cursor: pointer;
      }
      .ques {
        width: 14px;
        height: 14px;
        line-height: 14px;
        background: rgba(101, 39, 145, 1);
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
        background: #652791;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        display: inline-block;
        color: #ffffff;
        font-size: 8px;
        line-height: 18px;

        span {
          position: relative;
          top: -2px;
        }
      }
      .cont_help_right {
        color: #652791;
        font-size: 14px;
        margin-left: 6px;
        display: inline-block;
        font-weight: 400;
        line-height: 20px;
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
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(101, 39, 145, 1);
          margin-bottom: 33px;
        }
        .pastBtn {
          width: 98px;
          height: 38px;
          background: rgba(101, 39, 145, 1);
          border-radius: 19px;
          margin-bottom: 14px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
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
      border: 1px solid #d8dce6;
      box-sizing: border-box;
      text-align: left;
      // line-height: 46px;
      font-size: 0;
      .input_img {
        margin: 0 12px 0 29px;
        font-size: 18px
      }

      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #d8dce6;
        font-weight: 500;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #d8dce6;
        font-weight: 500;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #d8dce6;
        font-weight: 500;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #d8dce6;
        font-weight: 500;
      }

      input {
        width: 220px;
        height: 48px;
        font-size: 16px;
        font-weight: 500;
      }

      .msgText {
        color: #652791;
        font-weight: 500;
        font-family: PingFangSC-Medium, PingFang SC;
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
        // margin-left: 5px;
        margin: -12px 0 0 5px;
      }
    }
    .login_butto {
      margin: 0 auto 24px auto !important;
    }
    .login_button {
      width: 406px;
      height: 50px;
      background: #652791;
      border-radius: 100px;
      cursor: pointer;
      margin: 0 auto 58px auto;

      span {
        color: #fff;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        font-size: 20px;
      }
    }
    // 引导图
    .login_after{
      width: 560px;
      height: 400px;
      font-weight:500;
      font-family:PingFangSC-Medium,PingFang SC;
      padding-top: 50px;
      .after_title{
        font-size: 30px;
        color: #652791;
      }
      .after_text{
        color: #333333;
        font-size: 18px;
        margin: 40px auto 50px auto;
      }
      .after_img{
        width: 188px;
        height: 188px;
      }
    }

    // 注册
    .sign_type {
      width: 460px;
      height: 38px;
      margin: 50px auto 32px auto;

      li {
        display: inline-block;
        width: 203px;
        height: 40px;
        font-size: 24px;
        font-weight: 400;
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
        border: solid 2px#652791;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
      }
      .active {
        border-color: #652791;
        color: #652791;
      }
    }
  }
}
</style>
