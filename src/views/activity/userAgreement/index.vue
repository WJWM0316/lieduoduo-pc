<template>

<div class="putIn">
  <header id="putInHeader" >
    <section>
      <div class="left">
        <img class="logo" src="../../../assets/images/logo_white.png" @click="refresh" />
        <div class="companyMsg">
          <p>精英人才招聘神器</p>
          <p>www.lieduoduo.co</p>
        </div>
      </div>  
      <div class="headerBtn">
        <span class="btn_blo">高薪职位</span>
        <div class="btn_blo2">求职者登录</div>
      </div>
    </section>
  </header>
  <div class="middle">
    <div class="contain clearfix">
      <div class="lp_left">
        <div class="lp_left_content">
          <div class="search-bar">
            <div class="search-bar-top">
              <i class="i-search"></i>
              <input class="search-input" placeholder="搜索职位" tabindex="1" maxlength="64">
              <button class="search-bar-btn">搜索职位</button>
            </div>
            <div class="select-main" v-if="isShowSelect">
              <div class="select-none" v-if="selectList.length<1">
                <i class="empty-icon"></i>
                <p>暂时没有符合该搜索条件的职位</p>
              </div>
              <div class="select_cont" v-else>
                <div class="select_list">
                  <div class="job_blo">
                    <div class="job_blo_left">12312</div>
                    <div class="job_blo_center">123</div>
                    <div class="job_blo_right">312313</div>
                  </div>
                </div>
                <div class="select_op">
                  <div class="op_left" @click="isShowSelect = false">12312</div>
                  <div class="op_right">
                    <span>123123</span>123
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="select-content">
            <div class="select-search-lab">
              <span class="search-lab active">技术</span>
              <span class="search-lab">产品</span>
              <span class="search-lab">设计</span>
              <span class="search-lab">市场</span>
              <span class="search-lab">运营</span>
              <span class="search-lab">销售</span>
            </div>
            <div class="select-search-content" @click="openMask('job')">
              <img alt="百度" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/0D/CgoB5lyZz_iAP3lEAAARZjW66CE243.png">
              <img alt="美团点评" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/0D/CgoB5lyZ0AuAc_hKAAAT2ScFv40003.png">
              <img alt="网易" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/31/CgotOVyZ0cSAZ1xfAAAR-7bVFi0762.png">
              <img alt="新东方" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/12/CgoB5lyZ0lGARfM9AAATkKfurJk459.png">
              <img alt="好未来" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/0E/CgoB5lyZ0DyAGQmZAAAmLMeG-yQ826.png">
              <img alt="贝壳" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/2E/CgotOVyZ0FOAPt7pAAAY1ZpZkZo069.png">
              <img alt="招商银行" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/0E/CgoB5lyZ0EiAGlFSAAAmjZCWHDk271.png">
              <img alt="趣头条" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/0E/CgoB5lyZ0GGAMSfPAAAlGMjnQkw947.png">
              <img alt="Bilibili" class="banner" src="https://www.lgstatic.com/i/image2/M01/45/BC/CgoB5l0Afv6AT-tiAAAVE32Bpvg346.png">
              <img alt="滴滴出行" class="banner" src="https://www.lgstatic.com/i/image2/M01/09/0D/CgoB5lyZ0CWACn8DAAASZGAJ-Jk086.png">
            </div>
          </div>
        </div>
        
      </div>
      <div class="lp-login animated-base" :class="{'fixed':messagePop.isShow }">
        <p class="lp-login-title">
          <span class="green">7秒</span>注册 1000+高薪职位任你选</p>
        <form id="phone_form" method="post" action="javascript:;">
          <ul>
            <li>
              
              <input placeholder="请输入常用手机号" v-model="form.mobile" id="lp_phone"></li>
              <!-- <li class="yzmli" >
                <img src="https://passport.lagou.com/vcode/create?from=register&refresh=1451121012510" alt="点击重试" class="yzm" width="98" height="35">
                <a href="javascript:;" class="reflash"></a>
              </li> -->
            <li class="coderli">
              <input placeholder="请输入手机验证码" v-model="form.code" id="lp_coder" >
              <span class="getcode" @click="getCode" v-if="codeStatus">获取验证码</span>
              <span class="getcode false" v-else>{{timer}}s</span>
            </li>
          </ul>
          <div class="submitBtn" @click="submit">求职者注册/登录</div>
          <div class="lp_agreeNotice_box">
            <p>注册代表你已同意
              <a rel="nofollow" href="http://www.lagou.com/privacy.html" >猎多多用户协议&隐私政策</a></p>
          </div>
        </form>
        <div class="login_btn">
          <a href="https://passport.lagou.com/login/login.html?service=https%3a%2f%2fwww.lagou.com%2f" target="_blank" data-lg-tj-id="1kxx" data-lg-tj-no="0004" data-lg-tj-cid="idnull">企业注册/登录</a></div>
      </div>
    </div>
  </div>
  <div class="companyBabels">
    <section>
      <div class="babel_blo">
        <img class="blo_icon" src="../../../assets/images/logo_white.png" @click="refresh" />
        <div class="blo_cont">
          <p class="cont_text">精英人才招聘神器</p>
          <p class="cont_text2">www.lieduoduo.co</p>
        </div>
        <img class="blo_icon" src="../../../assets/images/logo_white.png" @click="refresh" />
        <div class="blo_cont">
          <p class="cont_text">精英人才招聘神器</p>
          <p class="cont_text2">www.lieduoduo.co</p>
        </div>
        <img class="blo_icon" src="../../../assets/images/logo_white.png" @click="refresh" />
        <div class="blo_cont">
          <p class="cont_text">精英人才招聘神器</p>
          <p class="cont_text2">www.lieduoduo.co</p>
        </div>
        <img class="blo_icon" src="../../../assets/images/logo_white.png" @click="refresh" />
        <div class="blo_cont">
          <p class="cont_text">精英人才招聘神器</p>
          <p class="cont_text2">www.lieduoduo.co</p>
        </div>
      </div>
    </section>
  </div>

  <div class="message" v-if="messagePop.isShow" @click="cloMask">
    <div class="register-modal modal" @click.stop="cloMask" v-if="messagePop.type==='login'">
      <div class="modal-content" >
        <i class="icon-close"></i>
        <div class="company-content">
          <p class="modal-title">立即注册</p>
          <span class="modal-des">即可免费获取简历模板</span></div>
        <i class="icon-pointer"></i>
      </div>
    </div>

    <div class="company-modal modal" @click.stop="cloMask" v-if="messagePop.type==='job'">
      <div class="modal-content" >
        <i class="icon-close"></i>
        <div class="company-content">
          <div class="modal-top">
             <img class="company-logo" src="../../../assets/images/logo_white.png" />
              <div class="top-right">
                <div class="modal-top-title">
                  网易游戏
                </div>
                <div class="modal-top-des">
                  以匠心，至创新
                </div>
              </div>
          </div>
          <div class="modal-body">
            <h3 class="modal-category"> 
              热招职位
            </h3>
            <div class="hot-position">
              <div class="hot-lab">
                前端开发工程师
              </div>
              <div class="hot-lab">
                前端开发工程师
              </div>
            </div>
          </div>
          <div class="modal-body">
            <h3 class="modal-category"> 
              热招职位
            </h3>
            <div class="modal-walfare">
              <div class="walfare-lab">
                前端开发工程师
              </div>
              <div class="walfare-lab">
                前端开发工程师
              </div>
            </div>
          </div>
        </div>
        <i class="icon-pointer"></i>
      </div>
    </div>

    <div class="successBlo" @click.stop="" v-if="messagePop.type==='success'">
      <!-- <img class="bloClo" src="../../../assets/images/clo.png" @click.stop="cloMask" /> -->
      <h3 class="bloTit">恭喜你</h3>
      <div class="bloText">您已成功提交！请添加专属招聘助理微信确认申请信息，领取8800元产品体验福利吧！</div>
      <!-- <img class="bloCode" src="../../../assets/images/activity/augustCode.png" /> -->
      <div class="bloText2">请长按识别二维码，添加微信号</div>
    </div>
  </div>
</div>

</template>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { loginPutInApi, getCodeApi, scanApi, getQrCodeApi } from '../../../api/auth'
  import { getUserIdentity, switchId } from '../../../../config.js'
  @Component({
    name: 'lighthouse-list',
    methods: {
    },
    computed: {},
    watch: {
      '$route': {
        handler() {
          this.init()
        },
        immediate: true
      }
    },
    components: {}
  })
  export default class CourseList extends Vue {
    userInfo = {}
    messagePop = {
      isShow: false,
      type: 'help'
    }
    selectList = [1,2]
    isShowSelect = false
    form = {
      mobile: '',
      code: '',
      captchaKey: '',  //验证码Key
      captchaValue: ''  //验证码
    }
    augustInterval = null
    status = 'login' 
    isShowMask = false
    showError = false
    timer = 60
    codeStatus = true

    /**
     * 初始化表单、分页页面数据
     */
    refresh(){}
    submit () {
      if(this.validate()){
        console.log(1)
        loginPutInApi({
          isChangeHost: true,
          ...this.form
        }).then(res => {
          console.log(res)
        })
      }
    }

    validate() {
      if(!this.checkMobile()) return false
      if(!this.checkCode()) return false
      return true
    }

    getCode() {
      if(!this.checkMobile()) return false
      if(!this.codeStatus) return false
      this.codeStatus = false
      let that = this

      clearInterval(this.augustInterval) 
      this.timer = 60
      this.augustInterval = setInterval(function(){
          that.timer -= 1
          if(that.timer < 1){    
            clearInterval(this.augustInterval);    
            that.codeStatus = true
            that.timer = 60
          }
      }, 1000);

      getCodeApi({ 
        mobile: this.form.mobile 
      }).then(res => {
        console.log(res)
      }).catch(e=>{
        console.log(e)
      })
    }

    checkCode() {
      var pattern = /^[0-9A-Za-z]{4}$/
      if(!pattern.test(this.form.code)){
        this.$message({
          type: 'info',
          message: '请填写四位数字验证码'
        })
        return false
      }else {
        return true
      }
    }

    checkMobile() {
      var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
      if(!pattern.test(this.form.mobile)){
        this.$message({
          type: 'info',
          message: '请填写格式正确的手机号码'
        })
        return false
      }else {
        return true
      }
    }

    cloMask() {
      this.messagePop.isShow = false
    }

    openMask(type) {
      this.messagePop.isShow = true
      this.messagePop.type = type
    }

    mounted () {
      let query = this.$route.query
    }

    closeMask() {
      this.showError = !this.showError
    }

    init () {
    }
  }
</script>
<style lang="less">
.message {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1001;
  .successBlo {
    position: absolute;
    left: 50%;
    top: 50%;
    width:305px;
    height:366px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    border:2px solid rgba(40,40,40,1);
    margin: -183px 0 0 -153px;
    text-align: center;
    padding-top: 30px;
    box-sizing: border-box;
    .bloTit {
      font-size:20px;
      font-weight:600;
      color:rgba(40,40,40,1);
      line-height:28px;
    }
    .bloText {
      width: 236px;
      font-size:14px;
      font-weight:400;
      color:rgba(40,40,40,1);
      line-height:20px;
      margin: 8px auto 20px auto;
    }
    .bloCode {
      width:170px;
      height:170px;
      display: block;
      margin: 0 auto;
    }
    .bloText2 {
      font-size:13px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:18px;
    }
    .bloClo {
      width:14px;
      height:14px;
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
  .company-modal {
    width:564px;
    height:500px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    position: absolute;
    top: 134px;
    left: 40px;
    display: block;
    transition: opacity .3s,top .3s;
    -moz-transition: opacity .3s,top .3s;
    -webkit-transition: opacity .3s,top .3s;
    -o-transition: opacity .3s,top .3s;
    .company-content {
      .modal-top {
        .company-logo {
          width: 100px;
          height: 60px;
          margin-right: 16px;
          display: block;
          float: left;
          border: 1px solid #ededed;
        }
        .top-right {
          .modal-top-title {
            font-size: 19px;
            color: #333;
            letter-spacing: 0;
            font-weight: 600;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 6px;
          }
          .modal-top-des {
            font-size: 13px;
            color: #999;
            letter-spacing: 0;
            line-height: normal;
            max-height: 40px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .modal-top-right  {
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .modal-body {
        .modal-category {
          display: block;
          font-size: 16px;
          color: #333;
          letter-spacing: 0;
          font-weight: 600;
          margin: 30px 0 12px;
        }
        .hot-position {
          .hot-lab {
            display: inline-block;
            width: 151px;
            margin-bottom: 8px;
            box-sizing: border-box;
            font-size: 14px;
            color: #666;
            letter-spacing: 0;
          }
        }
        .modal-walfare {
          .walfare-lab {
            display: inline-block;
            border: 1px solid #d5dadf;
            border-radius: 3px;
            font-size: 12px;
            color: #666;
            letter-spacing: 0;
            padding: 3px 9px;
            box-sizing: border-box;
            margin-right: 6px;
          }
        }
        .register-detail {
          font-size: 14px;
          color: #666;
          letter-spacing: 0;
          margin: 47px 0 0;
        }
      }
      .icon-pointer {
        width: 53px;
        height: 38px;
        display: inline-block;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAmCAYAAABkpNNFAAAAAXNSR…KTbDI9H7CA39JGjsv2APlEiLcjlMm+03oalMn9KVPPFo1/A2XXfs+LqZGsAAAAAElFTkSuQmCC) no-repeat;
        right: -68px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        position: absolute;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }
    }
    .icon-close {
      width: 15px;
      height: 15px;
      display: inline-block;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR…Z2JhXot0ixZ9jv89aY5XKZosxbyoAder5er6cBTfqZ+gUjhLke/BXnHQAAAABJRU5ErkJggg==) no-repeat;
      background-size: contain;
      position: absolute;
      right: 20px;
      top: 20px;
      
    }
  }
  .register-modal {
  }
}

.putIn {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #652791;
  // background: url(../../../assets/images/bg.png) 100% repeat #652791;
  #putInHeader {
    height:60px;
    background: #fff;
    text-align: right;
    font-size: 14px;
    box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;

    section {
      height:60px;
      width: 1000px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }
    .headerBtn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn_blo {
        font-size:14px;
        font-weight:400;
        color:rgba(110,31,150,1);
      }
      .btn_blo2 {
        width:113px;
        height:34px;
        background:rgba(101,39,145,1);
        border-radius:84px;
        font-size:14px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:34px;
        text-align: center;
        margin-left: 20px;
      }
    }
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      .logo {
        width:40px;
        height:40px;
        display: block;
        margin-right: 10px;
      }
      .companyMsg {
        p {
          font-size:14px;
          font-weight:500;
          color:rgba(110,31,150,1);
          line-height:20px;
        }
      }
    }
  }
  .companyBabels {
    height:178px;
    width: 100%;
    section {
      height:178px;
      background:rgba(251,251,255,1);
      display: flex;
      justify-content: center;
      align-items: center;
      .babel_blo {
        display: flex;
        justify-content: center;
        align-items: center;
        .blo_icon {
          width: 50px;
          height: auto;
          margin-right: 20px;
        }
        .blo_cont {
          .cont_text {
            font-size:18px;
            font-weight:600;
            color:rgba(0,0,0,1);
            line-height:25px;
            margin-bottom: 4px;
          } 
          .cont_text2 {
            font-size:14px;
            font-weight:300;
            color:rgba(0,0,0,1);
            line-height:20px;
          }
        }
      }
    }
  }
  .middle {
    padding-top: 130px;
    position: relative;
    height: 660px;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
    .contain {
      width: 1000px;
      margin: 0 auto;
      overflow: hidden;
      .lp_left {
        width: 564px;
        float: left;
        position: relative;
        .lp_left_content {
          width: 564px;
          .search-bar {
            height:54px;;
            position: relative;
            .search-bar-top {
              z-index: 2;
              display: flex;
              padding: 5px 5px 5px 0;
              box-sizing: border-box;
              background: #fff;
              border-radius: 4px;
              align-items: center;
              .i-search {
                  width: 16px;
                  height: 16px;
                  display: block;
                  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR…ZbaEiozwiyXiMVzL4zYZBoA4kuQLL1I4FNNEvncrl1kEQ+AUN0uixckH2jAAAAAElFTkSuQmCC) no-repeat;
                  margin: 0 11px 0 22px;
                  position: absolute;
              }
              .ui-helper-hidden-accessible {
                  border: 0;
                  clip: rect(0 0 0 0);
                  height: 1px;
                  margin: -1px;
                  overflow: hidden;
                  padding: 0;
                  position: absolute;
                  width: 1px;
              }
              input {
                  font-size: 14px;
                  color: #666;
                  letter-spacing: 0;
                  width: 440px;
                  padding-left: 49px;
                  flex: 1;
                  line-height: 35px;
                  border: none;
                  outline: none;
                  padding-right: 10px;
              }
              .search-bar-btn {
                font-size:14px;
                font-weight:500;
                color:rgba(255,255,255,1);
                width:101px;
                height:40px;
                line-height:40px;
                background:rgba(101,39,145,1);
                border-radius:8px;
              }
            }
            .select-main {
              width:564px;
              height:436px;
              
              background:rgba(255,255,255,1);
              border-radius:8px;
              position: absolute;
              top: 65px;
              left: 0;
              z-index: 10;
              .select-none {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p {
                    font-size:16px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:22px;
                }
                .empty-icon {
                  width:68px;
                  height:68px;
                  display: block;
                  margin: 0 0 30px 0;
                }
              }
              .select-cont {
              }
              .select_list {
                padding: 0 40px;
                box-sizing: border-box;
                height: 382px;
                .job_blo {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 60px;
                  border-bottom: 1px solid #E8E9EB;
                  overflow-y: auto;
                  .job_blo_left {
                    width: 160px;
                    text-align: left;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                  }
                  .job_blo_center {
                    font-size:14px;
                    font-weight:400;
                    color:rgba(92,86,93,1);
                    flex: 1;
                  }
                  .job_blo_right {
                    width: 100px;
                    text-align: right;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(92,86,93,1);
                  }
                }
              }
              .select_op {
                padding: 0 40px;
                box-sizing: border-box;
                height:54px;
                background:rgba(101,39,145,0.1);
                border-radius:0px 0px 8px 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .op_left {
                  font-size:14px;
                  font-weight:400;
                  color:rgba(101,39,145,1);
                }
                .op_right {
                  font-size:14px;
                  font-weight:400;
                  color:rgba(101,39,145,1);
                  span {
                    color: #FF7F4C;
                    margin-right: 5px;
                  }
                }
              }
            }
          }
          .select-content {
            margin-top: 10px;
            // display: flex;
            .select-search-lab {
              width: 100%;
              padding: 0 20px;
              box-sizing: border-box;
              display: flex;
              margin-bottom: 20px;
              background:rgba(0,0,0,0.2);
              border-radius:8px;
              .search-lab {
                display: block;
                font-size: 16px;
                color: #fff;
                letter-spacing: 0;
                text-align: center;
                width: 102px;
                height: 75px;
                margin: auto;
                line-height: 75px;
                font-weight: 400;
                &.active {
                  font-weight: 600;
                  color: #fff;
                  background:rgba(121,84,149,1);
                  border-radius:0px 0px 8px 8px;
                }
              }
            }
            .select-search-content {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: flex-end;
              position: relative;
              // height: 424px;
              img {
                border-radius:4px;
                margin-bottom: 10px;
              }
            }
          }
          
        }
        
      }
      .lp-login {
        width: 410px;
        height: 500px;
        float: right;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px #12a591;
        padding: 58px 0 0 0;
        box-sizing: border-box;
        position: relative;
        z-index: 101;
        box-shadow: unset;
        -webkit-animation-duration: .49s;
        animation-duration: .49s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: flex;
        flex-direction: column;
        align-items: center;
        &.fixed {
          position: fixed;
          top: 134px;
          left: 50%;
          margin-left: 205px;
          z-index: 1003;
        }
        .lp-login-title {
          font-size: 24px;
          text-align: center;
          font-weight: 600;
          position: relative;
          line-height: 26px;
          margin-bottom: 47px;
          color: #333333;
          .green {
            color: #652791;
          }
        }
        .login_btn {
          text-align: center;
          margin-top: 44px;
          a{
            color: #652791;
          }
        }
        #phone_form {
          width: 328px;
          ul {
            margin-bottom: 48px;
            li {
              width:328px;
              height:40px;
              background:rgba(255,255,255,1);
              border-radius:4px;
              border:1px solid rgba(216,220,230,1);
              padding: 0 15px;
              box-sizing: border-box;
              position: relative;
              margin-bottom: 22px;
              display: flex;
              input {
                flex: 1;
                display: block;
                height: 38px;
                box-sizing: border-box;
                font-size:14px;
                color: #333;
                border: none;
                outline: none;
              }
            }
            .getcode {
              height: 38px;
              line-height: 38px;
              font-size: 14px;
              line-height: 38px;
              color: #652791;
              text-align: center;
              text-decoration: none;
              border-radius: 3px;
              cursor: pointer;
              &.false {
                cursor: inherit;
                line-height: 38px;
                color: rgba(146,146,146,1);
              }
            }
          }
          
          .submitBtn {
            display: block;
            height: 54px;
            line-height: 54px;
            margin: 0 auto;
            margin-bottom: 16px;
            font-size:18px;
            font-weight:500;
            color:rgba(255,255,255,1);
            text-align: center;
            width:328px;
            background:rgba(101,39,145,1);
            border-radius:100px;
          }
          .lp_agreeNotice_box {
            font-size: 12px;
            line-height: 20px;
            color: #999;
            text-align: center;
            p {
              font-size: 14px;
              color: #999;
              a {
                color: #652791;
              }
            }
          }
        }
      }

      .animated-base{
        a {
          font-size: 14px;
          text-decoration: underline;
        }
      }
    }
  }
  .clearfix {
      zoom: 1;
  }
  a {
    color: #555;
    text-decoration: none;
    text-decoration: underline;
    cursor: pointer;
    -webkit-transition: background-color 0.2s ease-out, color 0.1s ease-out;
    -moz-transition: background-color 0.2s ease-out, color 0.1s ease-out;
    -ms-transition: background-color 0.2s ease-out, color 0.1s ease-out;
    transition: background-color 0.2s ease-out, color 0.1s ease-out;
  }
}

.triangle_border_left{
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
.triangle_border_left span{
    display:block;
    width:0;
    height:0;
    border-width:28px 28px 28px 0;
    border-style:solid;
    border-color:transparent #fc0 transparent transparent;/*透明 黄 透明 透明 */
    position:absolute;
    top:0px;
    left:0px;
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