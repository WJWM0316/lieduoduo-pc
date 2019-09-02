<template>

<div class="putIn">
  <header id="putInHeader" >
    <section>
      <img class="left_logo" src="../../../assets/images/activity/putIn/logo_lieduodou@2x.png" />
      <div class="headerBtn">
        <span class="btn_blo" @click="openMask('login')">高薪职位</span>
        <div class="btn_blo2" @click="setAnimate">求职者登录</div>
      </div>
    </section>
  </header>
  <div class="middle">
    <div class="contain clearfix">
      <div class="lp_left">
        <div class="lp_left_content">
          <div class="search-bar">
            <div class="search-bar-top">
              <img class="i-search" src="../../../assets/images/activity/putIn/search.png" />
              <input class="search-input" placeholder="搜索职位" maxlength="64" v-model="searchJobData.keyword">
              <div class="search-bar-btn" @click="searchJob">搜索职位</div>
            </div>
            <div class="select-main" v-if="isShowSelect">
              <div class="select-none" v-if="selectList.length<1">
                <img class="bloSel" src="../../../assets/images/clo.png" @click="isShowSelect = false" />

                <img class="empty-icon" src="../../../assets/images/activity/putIn/live_icon_question.png" />
                <p>暂时没有符合该搜索条件的职位</p>
              </div>
              <div class="select_cont" v-else>
                <div class="select_list">
                  <div class="job_blo" @click="openMask('login')" v-for="(item,index) in selectList">
                    <div class="job_blo_left ellipsis">{{item.companyShortname}}</div>
                    <div class="job_blo_center ellipsis">{{item.positionName}}</div>
                    <div class="job_blo_right">{{item.emolumentMin}}K-{{item.emolumentMax}}K<span v-if="item.annualSalary>12">·{{item.annualSalary}}薪</span></div>
                  </div>
                </div>
                <div class="select_op">
                  <div class="op_left" @click="isShowSelect = false">关闭</div>
                  <div class="op_right" @click="openMask('login')">
                    查看更多
                    <span>{{searchJobData.keyword}}</span>岗位
                    <img class="arrowsR" src="../../../assets/images/activity/putIn/arrowsR.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="select-content">
            <div class="select-search-lab">
              <span class="search-lab" @click="selectLab(item.positionType)" :class="{'active': labType === item.positionType }" v-for="(item, index) in positionTypeList" v-if="">{{item.positionTypeName}}</span>
            </div>
            <div class="select-search-content" >
              <template v-for="(item, index) in advList " v-if="index<9">
                <div class="select_info"  @click="setAdv(item)"
                v-if="index<4">
                  <img class="banner" :src="item.cardCompanyLogo.middleUrl">
                </div>

                <div class="select_info info_type2 ellipsis"  @click="setAdv(item)"
                v-else-if="index>3&&index<7">
                  <img class="banner" :src="item.cardCompanyLogo.middleUrl">
                  <p class="positionName ellipsis">{{item.positionName}}</p>
                  <p class="emolument ellipsis">{{item.emolumentMin}}k-{{item.emolumentMax}}k<template v-if="item.annualSalary > 12">·{{item.annualSalary}}薪</template></p>
                </div>

                <div class="select_info info_type3"  @click="setAdv(item)"
                v-if="index>6&&index<9">
                  <div class="info_cont ellipsis">
                    <p class="positionName ellipsis">{{item.positionName}}</p>
                    <p class="emolument ellipsis">{{item.emolumentMin}}k-{{item.emolumentMax}}k<template v-if="item.annualSalary > 12">·{{item.annualSalary}}薪</template></p>
                    <p class="companyInfo ellipsis" v-if="item.companyBrief">{{item.companyBrief}}</p>
                  </div>
                  <img class="banner" :src="item.companyLogo.middleUrl">

                </div>
              </template>
            </div>
          </div>
        </div>
        
      </div>
      <div class="lp-login" :class="{'fixed':messagePop.isShow ,'cake':loginModelAnimale}">
        <img class="icon-pointer" :class="{'companyType': messagePop.type==='job' }" src="../../../assets/images/activity/putIn/arrows.gif" v-if="messagePop.isShow && !isFocus" />
        <p class="lp-login-title">
          <span class="green">7秒</span>注册 1000+高薪职位任你选
        </p>
        <form id="phone_form" method="post" action="javascript:;">
          <ul>
            <li>
              <img class="input_icon" src="../../../assets/images/activity/putIn/icon_number.png" />
              <input placeholder="请输入常用手机号"  maxlength="11" v-model="form.mobile" @focus="setFocus"></li>
            <li>
              <img class="input_icon" src="../../../assets/images/activity/putIn/icon_note.png" />
              <input placeholder="请输入手机验证码"  maxlength="4" v-model="form.code" >
              <span class="getcode" @click="getCode" v-if="codeStatus">获取验证码</span>
              <span class="getcode false" v-else>{{timer}}s</span>
            </li>
            <li v-if="codePic.img">
              <img class="input_icon" src="../../../assets/images/activity/putIn/icon_photo.png" />
              <input placeholder="请输入图片验证码" maxlength="4" v-model="form.captchaValue" >
              <img class="codePic" :src="codePic.img" @click="getPicCode" />
            </li>
          </ul>
          <div class="submitBtn" @click="submit">求职者注册/登录</div>
          <div class="lp_agreeNotice_box">
            <p>注册代表你已同意
              <span @click="toAgreement">猎多多用户协议&隐私政策</span>
            </p>
          </div>
        </form>
        <div class="login_btn">
          <p @click="toPcLogin" >企业注册/登录</p>
        </div>
        <div class="formHint" v-if="formHint.isShow">
          <img class="" src="../../../assets/images/activity/putIn/live_icon_question2.png" />
          {{formHint.text}}
        </div>
      </div>
    </div>
  </div>
  <div class="companyBabels">
    <section>
      <div class="babel_blo">
        <img class="blo_icon" src="../../../assets/images/activity/putIn/icon_jishufankui@2x.png" />
        <div class="blo_cont">
          <p class="cont_text">急速反馈</p>
          <p class="cont_text2">24小时急速反馈</p>
        </div>
      </div>
      <div class="babel_blo">
        <img class="blo_icon" src="../../../assets/images/activity/putIn/icon_kugongsi@2x.png" />
        <div class="blo_cont">
          <p class="cont_text">酷公司</p>
          <p class="cont_text2">1000+知名企业</p>
        </div>
      </div>
      <div class="babel_blo">
        <img class="blo_icon" src="../../../assets/images/activity/putIn/icon_haozhiwei@2x.png" />
        <div class="blo_cont">
          <p class="cont_text">好职位</p>
          <p class="cont_text2">大量精选高薪职位</p>
        </div>
      </div>
      <div class="babel_blo">
        <img class="blo_icon" src="../../../assets/images/activity/putIn/icon_yuedaka@2x.png" />
        <div class="blo_cont">
          <p class="cont_text">约大咖</p>
          <p class="cont_text2">行业大咖在线招聘</p>
        </div>
      </div>
    </section>
  </div>

  <div class="message" v-if="messagePop.isShow" @click="cloMask">
    <div class="register-modal modal" @click.stop="" v-if="messagePop.type==='login'">
      <img class="icon-close" src="../../../assets/images/clo.png" @click.stop="cloMask" />
      <p class="register-text">立即注册</p>
      <p class="register-text2">即可查看更多职位信息</p>
    </div>

    <div class="company-modal modal" @click.stop="" v-if="messagePop.type==='job' && advList.length>0 && selectAdv">
      <div class="modal-content" >
        <img class="icon-close" src="../../../assets/images/clo.png" @click.stop="cloMask" />
        <div class="company-content">
          <div class="modal-top">
             <img class="company-logo" :src="selectAdv.cardCompanyLogo.middleUrl" />
              <div class="top-right">
                <div class="modal-top-title">
                  {{selectAdv.companyName}}
                </div>
                <div class="modal-top-emolumentMax" v-if="selectAdv.emolumentMin">
                  {{selectAdv.emolumentMin}}k~{{selectAdv.emolumentMax}}<template v-if="selectAdv.annualSalary > 12">·{{selectAdv.annualSalary}}</template>
                </div>
                <div class="modal-top-des ellipsis" v-if="selectAdv.companyBrief">
                  {{selectAdv.companyBrief}}
                </div>
              </div>
          </div>
          <div class="modal-body" v-if="selectAdv.type === 1 && selectAdv.hotPositions.length>0">
            <h3 class="modal-category"> 
              热招职位
            </h3>
            <div class="hot-position">
              <div class="hot-lab" v-for="(item,index) in selectAdv.hotPositions">
                {{item}}
              </div>
            </div>
          </div>

          <div class="modal-body" v-if="selectAdv.type === 2 && selectAdv.positionDemand.length>0">
            <h3 class="modal-category"> 
              职位要求
            </h3>
            <div class="hot-position">
              <div class="hot-lab" v-for="(item,index) in selectAdv.positionDemand">
                {{item}}
              </div>
            </div>
          </div>

          <div class="modal-body benefit">
            <h3 class="modal-category"> 
              福利
            </h3>
            <div class="modal-walfare">
              <!-- hotPositions -->
              <div class="walfare-lab" v-for="(item,index) in selectAdv.benefit">
                {{item}}
              </div>
            </div>
          </div>
        </div>

        <div class="bottom_hint">
          注册后可查看更多职位信息
          <img class="" src="../../../assets/images/activity/putIn/arrowsR.png" />
        </div>
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
  import { loginPutInApi, getCodeApi, scanApi, getCaptchaApi, getQrCodeApi } from '../../../api/auth'
  import { schJobApi, getPositionTypesApi, getAdvListApi, getUserRoleInfo } from '../../../api/putIn'
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
    isFocus = false
    userInfo = {}
    formHint = {    //form提示框
      isShow: false,
      text: ''
    }
    messagePop = {
      isShow: false,
      type: 'help'
    }
    selectList = []  //搜索结果
    codePic = {
      key:'',
      img: ''
    }
    isShowSelect = false
    form = {
      mobile: '',
      code: '',
      captchaKey: '',  //验证码Key
      captchaValue: ''  //验证码
    }
    augustInterval = null
    hintSetTime = null
    isShowMask = false
    showError = false
    timer = 60
    codeStatus = true
    searchJobData = {    //搜索职位
      page: 1,
      count: 6,
      keyword: ''
    }
    labType = 1
    positionTypeList = [] //职位类型列表
    advList = []   //广告列表
    selectAdv = {}  //点击logo参数

    loginModelAnimale = false //登录框动画显示
    mounted () {
      let query = this.$route.query
      this.getPositionTypes()
    }

    init () {

    }
    toAgreement() {
      this.$router.push({name: 'userAgreement'})
    }
    toPcLogin () {
      this.$router.push({name: 'login'})
    }

    setHint (text) {
      this.formHint = {    //form提示框
        isShow: true,
        text: text
      }
      clearTimeout(this.hintSetTime) 
      this.hintSetTime = setTimeout(()=> {
        this.formHint.isShow = false
      }, 1500);
    }

    //职位类型列表
    getPositionTypes() {
      getPositionTypesApi().then(res => {
        this.positionTypeList = res.data.data
        this.labType = res.data.data[0].positionType
        this.getAdvList(this.labType)
      })
    }

    //广告列表 - 公司职位
    getAdvList(type) {
      getAdvListApi({
        positionType: type,
        count: 10
      }).then(res => {
        this.advList = res.data.data
      })
    }

    selectLab(type) {
      if(this.labType === type) return
      this.labType = type
      this.getAdvList(type)
    }

    searchJob() {
      schJobApi({...this.searchJobData}).then(res => {
        this.selectList = res.data.data
        this.isShowSelect = true
      })
    }

    setAnimate(){
      this.loginModelAnimale = true
      setTimeout(()=>{
        this.loginModelAnimale = false
      },2000)
    }

    submit () {
      this.isFocus = true
      if(this.validate()){
        loginPutInApi({
          isChangeHost: true,
          ...this.form
        }).then(res => {
            this.$store.commit('LOGIN',res.data.data)
            this.$store.dispatch('setUserInfo', res.data.data)
            getUserRoleInfo().then(res => {
              if(res.data.data.isJobhunter === 1) {
                this.$router.push({name: 'applyIndex'})
              }else {
                this.$router.push({name: 'resumeFirstPost'})
              }
            })
          // console.log(res.data.data)
        }).catch(e=>{
          this.setHint(e.data.msg || '')
          if(e.data.code && e.data.code === 419) {
            this.codePic = e.data.data
            this.form.captchaKey = e.data.data.key
          } else if (e.data.code === 440){
            this.getPicCode()
          }
        })
      }
    }

    validate() {
      if(!this.checkMobile()) return false
      if(!this.checkCode()) return false
      return true
    }

    getCode() {
      this.isFocus = true
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
      })
    }

    checkCode() {
      var pattern = /^[0-9A-Za-z]{4}$/
      if(!pattern.test(this.form.code)){
        this.setHint('请填写四位数字验证码')
        return false
      }else {
        return true
      }
    }

    getPicCode() {
      getCaptchaApi().then(res => {
        this.codePic = res.data.data
        this.form.captchaKey = res.data.data.key
      })
    }

    checkMobile() {
      var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
      if(!pattern.test(this.form.mobile)){
        this.setHint('请填写格式正确的手机号码')
        return false
      }else {
        return true
      }
    }

    cloMask() {
      this.messagePop.isShow = false
    }

    setAdv(item) {
      this.selectAdv = item
      this.openMask('job')

      this.setAnimate()
    }

    openMask(type) {
      this.messagePop.isShow = true
      this.messagePop.type = type
    }

    closeMask() {
      this.showError = !this.showError
    }
    setFocus() {
      this.isFocus = true
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
    padding: 40px;
    box-sizing: border-box;
    top: 139px;
    left: 50%;
    margin-left: -500px;
    display: block;
    transition: opacity .3s,top .3s;
    -moz-transition: opacity .3s,top .3s;
    -webkit-transition: opacity .3s,top .3s;
    -o-transition: opacity .3s,top .3s;
    text-align: left;
    .company-content {
      .modal-top {
        margin-bottom: 36px;
        overflow: hidden;
        .company-logo {
          width: 122px;
          padding: 15px 14px;
          background:rgba(255,255,255,1);
          border-radius:4px;
          border:1px solid rgba(239,233,244,0.8);
          margin-right: 16px;
          display: block;
          float: left;
        }
        .top-right {
          min-height:82px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .modal-top-title {
            font-size:20px;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:28px;
            margin-bottom: 4px;
          }
          .modal-top-emolumentMax{
            font-size: 18px;
            color: #FF7F4C;
          }
          .modal-top-des {
            font-size:16px;
            font-weight:300;
            color:rgba(51,51,51,1);
            line-height:22px;
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
        overflow: hidden;
        &.benefit {
          margin-top: 24px;
        }
        .modal-category {
          display: block;
          font-size: 16px;
          color: #333;
          letter-spacing: 0;
          font-weight: 600;
          margin: 0 0 20px;
          padding-left: 12px;
          position: relative;
          height: 25px;
          line-height: 25px;
          &::after {
            position: absolute;
            left: 0;
            top: 50%;
            content: '';
            width:4px;
            height:20px;
            background:rgba(101,39,145,0.8);
            border-radius:2px;
            transform: translateY(-50%);
          }
        }
        .hot-position {
          .hot-lab {
            display: inline-block;
            // width: 151px;
            margin-right: 15px;
            margin-bottom: 8px;
            box-sizing: border-box;
            font-size: 14px;
            color: #666;
            letter-spacing: 0;
            height: 20px;
            line-height: 20px;
          }
        }
        .modal-walfare {
          .walfare-lab {
            display: inline-block;
            color: #666;
            letter-spacing: 0;
            padding: 0px 16px;
            box-sizing: border-box;
            text-align: center;
            margin-right: 10px;
            font-size:14px;
            font-weight:400;
            color:rgba(101,39,145,1);
            height:28px;
            line-height:28px;
            background:rgba(255,255,255,1);
            border-radius:56px;
            border:1px solid rgba(101,39,145,0.8);
            margin-bottom: 10px;
          }
        }
        .register-detail {
          font-size: 14px;
          color: #666;
          letter-spacing: 0;
          margin: 47px 0 0;
        }
      }
      
    }
    .bottom_hint {
      width: 100%;
      height:76px;
      background:rgba(101,39,145,0.03);
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size:16px;
      font-weight:400;
      color:rgba(101,39,145,1);
      line-height:22px;
      img {
        display: block;
        width: 14px;
        height: auto;
      }
    }
    .icon-close {
      width: 15px;
      height: 15px;
      display: inline-block;
      background-size: contain;
      position: absolute;
      right: 15px;
      top: 15px;
    }
  }
  .register-modal {
    width:354px;
    height:176px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    position: absolute;
    top: 296px;
    left: 50%;
    margin-left: -400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .register-text {
      font-size:22px;
      font-family:PingFangSC;
      font-weight:600;
      color:rgba(101,39,145,1);
      line-height:30px;
    }
    .register-text2 {
      font-size:16px;
      font-family:PingFangSC;
      font-weight:300;
      color:rgba(51,51,51,1);
      line-height:22px;
      margin-top: 12px;
    }
    .icon-close {
      width: 15px;
      height: 15px;
      display: inline-block;
      background-size: contain;
      position: absolute;
      right: 15px;
      top: 15px;
    }
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
    height:64px;
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
      height:64px;
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
    .left_logo {
      width:160px;
      height:auto;
      display: block;
    }
  }
  .companyBabels {
    height:178px;
    width: 100%;
    background:rgba(251,251,255,1);
    section {
      width: 1000px;
      margin: 0 auto;
      height:178px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .babel_blo {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .blo_icon {
          width: 68px;
          height: 68px;
          display: block;
          margin-right: 20px;
        }
        .blo_cont {
          text-align: left;
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
    margin-top: 64px;
    position: relative;
    height: 660px;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
    display: flex;
    align-items: center;
    .contain {
      width: 1000px;
      margin: 0 auto;
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
                  margin: 0 11px 0 16px;
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
                  padding-left: 45px;
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
                border-radius:4px;
                cursor: pointer;
              }
            }
            .select-main {
              width:564px;
              height:436px;
              
              background:rgba(255,255,255,1);
              border-radius:4px;
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
                position: relative;
                .bloSel {
                  position: absolute;
                  top: 15px;
                  right: 15px;
                  width: 20px;
                  height: 20px;
                }
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
                  margin: -30px 0 30px 0;

                }
              }
              .select-cont {
              }
              .select_list {
                height: 382px;
                overflow-y: auto;
                .job_blo {
                  padding: 0 40px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 60px;
                  border-bottom: 1px solid #E8E9EB;
                  text-align: left;
                  &:hover {
                    background: rgba(101, 39, 145, 0.1);
                  }
                  .job_blo_left {
                    width: 160px;
                    font-size:16px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                  }
                  .job_blo_center {
                    font-size:14px;
                    font-weight:400;
                    color:rgba(92,86,93,1);
                    flex: 1;
                    margin-right: 20px;
                  }
                  .job_blo_right {
                    text-align: right;
                    font-size:18px;
                    font-weight:400;
                    color:#FF7F4C;
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
                  cursor: pointer;
                }
                .op_right {
                  font-size:14px;
                  font-weight:400;
                  color:rgba(101,39,145,1);
                  display: flex;
                  span {
                    color: #FF7F4C;
                    margin-right: 5px;
                  }
                }
                .arrowsR {
                  width:16px;
                  height:16px;
                  margin-left: 6px;
                  display: block;
                  position: relative;
                  top: -1px;
                }
              }
            }
          }
          .select-content {
            margin-top: 10px;
            width:564px;
            // height:436px;
            // display: flex;
            .select-search-lab {
              width: 100%;
              padding: 0 20px;
              box-sizing: border-box;
              display: flex;
              margin-bottom: 18px;
              background:rgba(0,0,0,0.2);
              border-radius:4px;
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
                  border-radius:0px 0px 4px 4px;
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
              .select_info {
                width:137px;
                height:78px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 10px;
                &.info_type2 {
                  flex-direction: column;
                  width:184px;
                  height:141px;
                  background:rgba(255,255,255,1);
                  border-radius:4px;
                  padding: 0 15px;
                  box-sizing: border-box;
                  .positionName {
                    margin-top: 12px;
                    margin-bottom: 7px;
                  }
                }
                &.info_type3 {
                  width:279px;
                  height:104px;
                  background:rgba(255,255,255,1);
                  border-radius:4px;
                  padding: 15px;
                  box-sizing: border-box;
                  text-align: left;
                  justify-content: space-between;
                  .banner {
                    width: 70px;
                    height: 70px;
                  }
                  .positionName {
                    line-height: 16px;
                    margin-bottom: 6px;

                  }
                }
                .positionName {
                  width: 100%;
                  font-size:16px;
                  font-family:PingFangSC;
                  font-weight:500;
                  color:rgba(51,51,51,1);
                }
                .emolument {
                  width: 100%;
                  font-size:18px;
                  font-family:PingFangSC;
                  font-weight:500;
                  color:rgba(255,127,76,1);
                  line-height:18px;
                }
                .companyInfo {
                  font-size:12px;
                  font-family:PingFangSC;
                  font-weight:300;
                  color:rgba(92,86,93,1);
                  line-height:17px;
                  margin-top: 12px;
                }
              }
              .banner {
                width:  122px;
                height: 52px;
                border-radius:4px;
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
          z-index: 1003;
          top: 139px;
          left: 50%;
          margin-left: 90px;
        }
        .icon-pointer {
          width: 152px;
          height: 48px;
          display: block;
          position: absolute;
          left: -120px;
          top: 50%;
          margin-top: -28px;
          position: absolute;
          -webkit-animation-duration: 1s;
          animation-duration: 1s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          &.companyType {
            left: -90px;
            margin-top: 5px;
          }
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
          cursor: pointer;
          p{
            text-decoration: underline;
            color: #652791;
          }
        }
        #phone_form {
          width: 328px;
          position: relative;
          ul {
            margin-bottom: 48px;
            li {
              width:328px;
              height:50px;
              background:rgba(255,255,255,1);
              border-radius:4px;
              border:1px solid rgba(216,220,230,1);
              padding: 0 15px;
              box-sizing: border-box;
              position: relative;
              margin-bottom: 22px;
              display: flex;
              align-items: center;
              .codePic {
                width:88px;
                height:38px;
              }
              .input_icon {
                width: 18px;
                height: 18px;
                display: block;
                margin-right: 10px;
              }
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
              span {
                color: #555;
                text-decoration: underline;
                cursor: pointer;
                color: #652791;
              }
            }
          }
        }
        .formHint {
          height:34px;
          background:rgba(255,244,244,1);
          border-radius:4px;
          padding: 0 27px;
          position: absolute;
          left: 50%;
          top: 10px;
          transform: translate(-50%,0);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size:14px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(237,92,92,1);
          white-space:nowrap;
          img {
            width: 14px;
            height: 14px;
            margin-right: 8px;
            display: block;
          }
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
.ellipsis {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
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

.cake{
  animation:move 1s 1;
  -webkit-animation:move 1s 1;
  transform-origin:bottom;
  -webkit-transform-origin:bottom;
}

@keyframes move
{
    0%{ 
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
    20% {  
      -webkit-transform:rotate(-6deg);
      transform:rotate(-6deg);
    }
    40% {  
      -webkit-transform:rotate(6deg);
      transform:rotate(6deg);
    }
    60% {  
      -webkit-transform:rotate(-6deg);
      transform:rotate(-6deg);
    }
    80% {  
      -webkit-transform:rotate(6deg);
      transform:rotate(6deg);
    }
    100% {  
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
}

@-webkit-keyframes move
{
    0%{ 
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
    20% {  
      -webkit-transform:rotate(-6deg);
      transform:rotate(-6deg);
    }
    40% {  
      -webkit-transform:rotate(6deg);
      transform:rotate(6deg);
    }
    60% {  
      -webkit-transform:rotate(-6deg);
      transform:rotate(-6deg);
    }
    80% {  
      -webkit-transform:rotate(6deg);
      transform:rotate(6deg);
    }
    100% {  
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
}
</style>