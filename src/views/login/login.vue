<template>
  <div id="login">
    <div class="_wrap"></div>
    <div class="login_cont">
      <el-alert
        v-if="formalert.alertone"
        class="alert_warning"
        :class="{alert_two: formalert.alertstyle }"
        :title="formalert.text"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>

      <!-- 切换登录方式type -->
      <div class="login_type" v-if="logintype.type !== '注册'">
        <div class="login_text" @click="changetype">{{logintype.type}}</div>
        <div class="login-img">
          <img :src="cdnPath + 'loginimg.png'" @click="changetype" />
        </div>
      </div>
      <!-- 二维码登录 -->
      <div class="logind" v-if="logintype.type == '短信验证登录'">
        <h3 class="cont_tit" style="margin-bottom:24px">扫码登录</h3>
        <div class="cont_p">使用「猎多多小程序」扫码登录</div>

        <div class="cont_help">
          <div class="cont_help_left">
            <span>?</span>
          </div>
          <span class="cont_help_right">扫码帮助</span>
        </div>
        <div class="login_pic_warp">
          <img class="loginCode" v-bind:src="codeData.image" />
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
      <div class="help_cont" v-if="logintype.type == '短信验证登录'">
        <h3>扫码帮助</h3>
        <div class="help_type">
          <div :class="{ helptype: !helptype}" @click="helpto">求职者</div>
          <div :class="{ helptype: helptype}" @click="helpto">招聘者</div>
        </div>
        <p class="help_text">职位管理 > 发布职位 > 扫码上传</p>

        <div class="help_img">
          <img :src="cdnPath + 'scanhelp.png'" />
        </div>
      </div>

      <!-- 短信登录 -->
      <div class="logind" v-if="logintype.type == '二维码登录'">
        <h3 class="cont_tit" style="margin-bottom: 40px;" :class="{ cont_ti: loginto.captcha }">短信登录</h3>
        <form method="post" action="javascript:;" class="logind_form">
          <div class="input_wrap" :class="{ input_to: loginto.captcha }">
            <div class="input_box">
              <i class="input_img iconfont icon-shoujihao" />
              <input placeholder="请输入手机号码" maxlength="11" v-model="loginto.mobile" />
            </div>
            <!-- 图片验证码 -->
            <div class="input_box" v-if="loginto.captcha">
              <i class="input_img iconfont icon-shoujihao" />
              <input placeholder="请输入图片验证码" maxlength="5" v-model="captchaimg.captchaValue" />
              <img :src="captchaimg.imgcode" class="imgcode" />
            </div>
            <div class="input_box">
              <i class="input_img iconfont icon-yanzhengma" />
              <input placeholder="请输入短信验证码" maxlength="4" v-model="loginto.cValue" />
              <span v-if="loginto.type" @click="sms(loginto.mobile)">发送验证码</span>
              <span v-if="!loginto.type" style="margin-left:40px">{{loginto.text}}s</span>
            </div>
          </div>
        </form>
        <div
          class="login_button"
          :class="{ login_butto: loginto.captcha }"
          @click="logintoo(
      loginto.mobile,
      loginto.cValue,
      registered.entrance,
      captchaimg.captchaKey,
      captchaimg.captchaValue)"
        >
          <span>登录</span>
        </div>
        <div class="bottom_text">
          没有账号
          <span @click="changetypeto">立即注册</span>
        </div>
      </div>

      <!-- ！！！注册 -->
      <div class="sign" v-if="logintype.type == '注册'">
        <ul class="sign_type">
          <li :class="{ active : registered.entrance == 0 }" @click="typeto(0)">我是求职者</li>
          <li :class="{ active : registered.entrance == 1 }" @click="typeto(1)">我是招聘官</li>
        </ul>
        <form method="post" action="javascript:;" class="logind_form">
          <div class="input_wrap" :class="{ input_to: registered.captcha }">
            <div class="input_box">
              <i class="input_img iconfont icon-shoujihao" />
              <input placeholder="请输入手机号码" maxlength="11" v-model="registered.mobile" />
            </div>
            <!-- 图片验证码 -->
            <div class="input_box" v-if="registered.captcha">
              <i class="input_img iconfont icon-shoujihao" />
              <input placeholder="请输入图片验证码" maxlength="6" v-model="captchaimg.captchaValue" />
              <img :src="captchaimg.imgcode" class="imgcode" />
            </div>
            <div class="input_box">
              <i class="input_img iconfont icon-yanzhengma" />
              <input placeholder="请输入短信验证码" maxlength="4" v-model="registered.cValue" />
              <span v-if="registered.type" @click="sms(registered.mobile)">发送验证码</span>
              <span v-if="!registered.type" style="margin-left:40px">{{registered.text}}s</span>
            </div>
          </div>
        </form>
        <div
          class="login_button"
          :class="{ login_butto: registered.captcha }"
          @click="logintoo(
      registered.mobile,
      registered.cValue,
      registered.entrance,
      captchaimg.captchaKey,
      captchaimg.captchaValue)"
        >
          <span>注册</span>
        </div>
        <div class="bottom_text">
          已有账号
          <span @click="changetypeto">马上登录</span>
        </div>
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
    <!-- <div class="login_btn" @click="login">模拟登陆</div> -->
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import {
  loginApi,
  scanApi,
  getQrCodeApi,
  loginPutInApipc,
  getCodeApi,
  getCaptchaApi
} from "../../api/auth";
import { getUserIdentity, switchId } from "../../../config.js";
import { changeBaseURL } from "../../api/index";
import { mobileReg } from "../../util/fieldRegular.js";

@Component({
  name: "lighthouse-list",
  methods: {},
  computed: {},
  watch: {
    $route: {
      handler() {
        this.init();
      },
      immediate: true
    }
  },
  components: {}
})
export default class CourseList extends Vue {
  //注册表单数据
  registered = {
    mobile: "", //手机号
    cValue: "", //验证码
    entrance: 0, //注册身份识别
    //发送短信后的文案状态
    text: "发送验证码",
    type: true,
    timerto: 0, //发送短信次数累加
    captcha: false //显示图片验证输入框
  };
  //登录表单数据
  loginto = {
    mobile: "", //手机号
    cValue: "", //验证码
    //发送短信后的文案状态
    text: "发送验证码",
    type: true,
    timerto: 0, //发送短信次数累加
    captcha: false
  };
  //表单弹窗
  formalert = {
    alertone: false,
    text: "",
    alertstyle: false
  };
  //登录方式切换变量存放
  logintype = {
    type: "二维码登录"
  };
  //左侧引导栏
  helptype = true;
  //验证码图片
  captchaimg = {
    imgcode: "", //base64图片
    captchaKey: "", //传回来的key
    captchaValue: "" //图片验证码的value
  };

  //cdn图片地址
  cdnPath = `${process.env.VUE_APP_CDN_PATH}/images/`;

  codeData = {}; // 二维码信息
  userInfo = {};
  pop = {
    isShow: true,
    type: "help"
  };
  status = "login";
  identitystatus = "qiuzhi"; // 引导图 状态
  isPast = true;
  timer = null;
  num = 1;
  identity = ""; //身份
  showError = false;
  /**
   * 初始化表单、分页页面数据
   */

  returnHome() {
    window.location.href = `${process.env.VUE_APP_WEB_INDEX}`;
  }

  mounted() {
    let query = this.$route.query;
    //百度统计
    let _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?f7fe68c0039c09911deef47214587f2f";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    if (!query.type) {
      this.status = "login";
    } else {
      this.status = query.type;
    }

    //  console.log(this.registered.entrance)
  }

  closeMask() {
    this.showError = !this.showError;
  }

  login() {
    let data = {
      email: "302982210@qq.com",
      password: 123456
    };
    this.$store
      .dispatch("testLogin", data)
      .then(res => {
        this.$store.dispatch("setUserInfo", res.data.data);
        this.userInfo = this.$store.state.userInfo;
        this.$router.push({
          name: this.userInfo.isBusiness === 1 ? "candidate" : "applyIndex"
        });
      })
      .catch(error => {
        setTimeout(() => {
          //console.log(`${error.msg}~`);
        });
      });
  }

  init() {
    this.getCode();
  }

  getCode() {
    let that = this;
    getQrCodeApi().then(res => {
      //console.log('==>',res)
      this.codeData = res.data.data;
      this.isPast = false;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.num += 1;
        if (this.num > 40) {
          this.num = 1;
          clearInterval(this.timer);
          this.isPast = true;
        } else {
          this.scan();
        }
      }, 3000);
    });
  }

  scan() {
    if(this.logintype.type == '二维码登录'){ return }
    scanApi({
      uuid: this.codeData.uuid
    }).then(res => {
      //isBusiness==1 b
      //console.log('==>',res.data)
      if (res.data.data && res.data.data.id) {
        clearInterval(this.timer);
        this.identity = res.data.data.isBusiness === 1 ? "zhaopin" : "qiuzhi";
        switchId(this.identity);
        changeBaseURL();
        this.isPast = false;

        this.$store.dispatch("setUserIdentity", this.identity);
        this.$store.dispatch("setUserInfo", res.data.data);
        this.$store.dispatch("login", res.data.data);

        this.userInfo = this.$store.state.userInfo;
        this.$router.push({
          name: this.identity === "qiuzhi" ? "applyIndex" : "candidate"
        });
      }
    });
  }

  refreshCode() {
    this.getCode();
  }

  clickHelp() {
    this.pop.isShow = !this.pop.isShow;
  }

  changeStatus() {
    this.status = this.status === "login" ? "register" : "login";
    // this.pop.isShow = !this.pop.isShow
  }

  identitySelect(status) {
    this.identitystatus = status;
  }

  todoAction(type, id) {
    if (!id) {
      return;
    }
    switch (type) {
      case "detail":
        this.$router.push({
          name: "teacherDetail",
          query: {
            id: id
          }
        });
        break;
      default:
        break;
    }
  }

  //左侧引导栏切换
  helpto() {
    this.helptype = !this.helptype;
  }

  // 登录方式切换
  changetype() {
    this.logintype.type =
      this.logintype.type == "二维码登录" ? "短信验证登录" : "二维码登录";
  }
  //短信登录注册切换
  changetypeto() {
    this.logintype.type =
      this.logintype.type == "二维码登录" ||
      this.logintype.type == "短信验证登录"
        ? "注册"
        : "二维码登录";
    this.getCaptcha();
  }

  // 注册角色切换type
  typeto(type) {
    this.registered.entrance = type;
  }

  //手机号校验
  checkMobile(phonenumber) {
    if (!mobileReg.test(phonenumber)) {
      this.fromPop("请填写格式正确的手机号码");
      return false;
    } else {
      return true;
    }
  }

  //验证码校验
  checkCode(captcha) {
    var pattern = /^[0-9A-Za-z]{4}$/;
    if (!pattern.test(captcha)) {
      this.fromPop("短信验证码错误");
      return false;
    } else {
      return true;
    }
  }

  //表单弹窗
  fromPop(text) {
    this.formalert = {
      alertone: true,
      text: text,
      alertstyle: false
    };
    if (
      this.formalert.text == "短信验证码发送成功！" ||
      this.formalert.text == "操作成功！"
    ) {
      this.formalert.alertstyle = true;
    }
    clearTimeout(this.hintSetTime);
    this.hintSetTime = setTimeout(() => {
      this.formalert.alertone = false;
      this.formalert.alertstyle = false;
    }, 1500);
  }

  // 刷新验证码图片
  getCaptcha() {
    getCaptchaApi({}).then(res => {
      this.captchaimg.imgcode = res.data.data.img;
      this.captchaimg.captchaKey = res.data.data.key;
      // console.log(res.data.data)
    });
  }

  //短信登录提交   //注册提交
  logintoo(mobile, code, isBusiness, captchaKey, captchaValue) {
    if (!this.checkMobile(mobile)) {
      return;
    } else if (!this.checkCode(code)) {
      return;
    }
    loginPutInApipc({
      mobile: mobile,
      code: code,
      isBusiness: isBusiness,
      captchaKey: captchaKey,
      captchaValue: captchaValue
    })
      .then(res => {
        this.fromPop(res.data.msg);
        console.log(res.data)
        
        if(res.data.isBusiness == 0) {
          
        }
        
      })
      .catch(res => {
        this.fromPop(res.data.msg);
      });
  }

  //发送短信验证码
  sms(mobile) {
    if (!this.checkMobile(mobile)) {
      return;
    }
    getCodeApi({
      mobile: mobile
    }).then(res => {
      // console.log(res.data)
      this.formalert.text = res.data.msg;
      // console.log(this.formalert.text)
      this.fromPop(this.formalert.text);
    });
    //判断是登录注册页执行不同的倒计时
    if (this.logintype.type == "二维码登录") {
      this.loginto.timerto++; // 累加器

      // console.log(this.registered.timerto)
      this.getCaptcha();
      if (this.loginto.timerto > 3) {
        this.loginto.captcha = true;
      }
      this.loginto.type = false;
      this.smstime();
    } else {
      this.registered.timerto++; // 累加器

      this.getCaptcha();
      if (this.registered.timerto > 3) {
        this.registered.captcha = true;
      }
      this.registered.type = false;
      this.smstimer();
    }
  }

  //登录短信验证码倒计时
  smstime() {
    this.loginto.text = 60;
    let timeout = setInterval(() => {
      this.loginto.text--;
      if (this.loginto.text == 0) {
        clearInterval(timeout);
        this.loginto.text = "发送验证码";
        this.loginto.type = true;
      }
    }, 1000);
  }
  //注册短信验证码倒计时
  smstimer() {
    this.registered.text = 60;
    let timeout = setInterval(() => {
      this.registered.text--;
      if (this.registered.text == 0) {
        clearInterval(timeout);
        this.registered.text = "发送验证码";
        this.registered.type = true;
      }
    }, 1000);
  }

  //ajax 请求函数，
  ajax_request() {
    i++;
    //如果已经请求20此没有请求成功，则强制结束，给出提示信息，因为每3s调用一次，供调用20次，大概就是一分钟的时间
    if (i > 20) {
      clearInterval(timer);
      this.isPast = true;
      return;
    }
    $.ajax({
      type: "post",
      url: "{:U('User/login_qrcode')}",
      timeout: 3000,
      data: { scene_id: $("#scene_id").val() },
      success: function(msg) {
        if (1 == msg.status) {
          $(".login_info1").html(
            '<span style="color:#0C9;">' + msg.info + "</span>"
          );
          setTimeout(refresh, 3000);
          return;
        }
      },
      error: function() {}
    });
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

    //弹窗
    .alert_warning {
      position: absolute;
      left: 50%;
      top: 10px;
      width: 210px;
      height: 36px;
      transform: translateX(-50%);
      background: #fff4e5 !important;
      border-radius: 4px;
      box-shadow: 0px 2px 12px 0px rgba(75, 72, 71, 0.06);
      color: #ff7f4c;
      span {
        color: #6d696e;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
      }
    }
    .alert_two {
      background: #f4ffee !important;
      color: #52c41a;
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
      .identitySelect {
        width: 158px;
        height: 34px;
        border-radius: 17px;
        border: 1px solid rgba(239, 233, 244, 1);
        margin: 24px auto 0px auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .addJob {
          width: 84px;
          height: 34px;
          border-radius: 17px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(101, 39, 145, 1);
          line-height: 34px;
          box-sizing: border-box;
          &.select {
            background: rgba(239, 233, 244, 1);
          }
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
    .cont_ti {
      margin-bottom: 32px !important;
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
    .input_to {
      height: 190px;
    }

    .input_box {
      width: 406px;
      height: 50px;
      border-radius: 4px;
      border: 1px solid #d8dce6;
      box-sizing: border-box;
      text-align: left;
      line-height: 46px;

      .input_img {
        margin: 0 12px 0 29px;
        vertical-align: middle !important;
        width: 18px;
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
        height: 38px;
        vertical-align: middle !important;
        font-size: 16px;
        font-weight: 500;
      }

      span {
        color: #652791;
        font-weight: 500;
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 16px;
        line-height: 47px;
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
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
      background: #652791;
      border-radius: 100px;
      cursor: pointer;
      margin: 0 auto 58px auto;

      span {
        color: #fff;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        font-size: 20px;
        line-height: 50px;
      }
    }

    // 注册
    .sign {
      .logind_form {
        width: 560px;
        margin-bottom: 40px;
      }
    }
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
  .login_btn {
    width: 200px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ccc;
    margin: 0 auto;
    background: #fff;
    margin-top: 30px;
  }
}

.triangle_border_left {
  width: 0;
  height: 0;
  border-width: 8px 11px 8px 0;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  left: -10px;
  top: 50%;
  margin-top: -20px;
}
.triangle_border_left span {
  display: block;
  width: 0;
  height: 0;
  border-width: 28px 28px 28px 0;
  border-style: solid;
  border-color: transparent #fc0 transparent transparent; /*透明 黄 透明 透明 */
  position: absolute;
  top: 0px;
  left: 0px;
}
#auth {
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgb(20, 26, 72);
  }
  .login-box {
    width: 400px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: white;
    position: fixed;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>