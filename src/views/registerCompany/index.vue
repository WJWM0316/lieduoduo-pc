<template>
<div class="register-all">
  <div id="register" class="register">
      <div class="b-title">猎多多</div>
      <div class="l-title">精英人才招聘神器</div>
      <!-- 创建公司模块 -->
      <div class="registerBox" v-show="0">
        <div class="box-title">填写个人信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="真实姓名" prop="real_name">
            <el-input :value="ruleForm.real_name" placeholder="请填写真实姓名" @input="bindInput($event, 'real_name')"></el-input>
          </el-form-item>
          <el-form-item label="公司全称" prop="company_name" @click="selectcompany()">
            <el-input :value="ruleForm.company_name" placeholder="请填写公司全称" @input="bindInput($event, 'company_name')"></el-input>
            <option-list :option="companylist" :visible="companyshow" @selectchange="changecompany"></option-list>
          </el-form-item>
          <el-form-item label="职位所属类型" prop="position_name">
            <div class="positon-box" @click="selectposition()"></div>
            <el-input :value="ruleForm.position_name" placeholder="请选择职位所属类型" @input="bindInput($event, 'position_name')"></el-input>
          </el-form-item>
          <el-form-item label="担任的职务" prop="user_position">
            <el-input :value="ruleForm.user_position" placeholder="请填写担任的职务" @input="bindInput($event, 'user_position')"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="user_email">
            <el-input :value="ruleForm.user_email" placeholder="请输入公司邮箱地址" @input="bindInput($event, 'user_email')"></el-input>
          </el-form-item>
        </el-form>
        <div :class="['nextstep', ischeck ? 'cansubmit' : '']" @click="submitForm('ruleForm')">下一步</div>
        <div class="handler">
          <div class="goqiuzhi" @click="gotowhere('qiuzhi')">前往求职端</div>
          <div class="line"></div>
          <div class="changeaccount" @click="gotowhere('account')">更换账号</div>
        </div>
      </div>
      <!-- 创建公司提交后状态 -->
      <div class="registerBox" v-show="0">
        <div class="auth-title">创建公司申请已提交</div>
        <div class="sub-desc">我们将在1个工作日内，协助你开通招聘服务</div>
        <div class="authentication">
          <div class="head">根据人力资源相关法规要求，我们将联系你完成：</div>
          <div class="center">
            <div class="center-l">
              <span>1 . 资质认证</span>
              <span>2 . 身份信息认证</span>
            </div>
            <div class="center-r">
              <span><i class="iconfont icon-shengchenghaibao"></i></span>
              <span><i class="iconfont icon-shengchenghaibao"></i></span>
            </div>
          </div>
        </div>
        <div class="auth-btn">
          <span>等不及了，在线自主完成认证</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="handler">
          <div class="goqiuzhi" @click="gotowhere('qiuzhi')">前往求职端</div>
          <div class="line"></div>
          <div class="changeaccount" @click="gotowhere('account')">更换账号</div>
        </div>
      </div>
      <!-- 创建公司审核状态 -->
      <div class="registerBox">
        <div class="topicon">
          <img v-if="(companyInfo.status === 0 || companyInfo.status === 3)" src="@/assets/images/adopt.png" />
          <img v-else src="@/assets/images/notadopt.png" />
          </div>
        <div class="status-title">加入公司申请审核中</div>
        <div class="status-tip">该申请将通知公司管理员审核，审核通过后即可开始招聘</div>
        <!-- 公司审核通过了 -->
        <div class="adoptcontent">
          <div class="tips">
            <div class="tips-l">
              <div class="tips-line"></div>
              <div class="tips-box"></div>
            </div>
            <div class="tips-c">获得权益</div>
            <div class="tips-r">
              <div class="tips-box"></div>
              <div class="tips-line"></div>
            </div>
          </div>
          <div class="canfree clearfix">
            <div class="freeitem">
              <div class="item">
              <div class="images"></div>
              </div>
            <div class="item">
            <div class="text">免费发布职位</div>
            </div>
            </div>
            <div class="freeitem">
              <div class="item">
              <div class="images marleft"></div>
              </div>
            <div class="item">
            <div class="text tmarleft">免费查看简历</div>
            </div>
            </div>
          </div>
          <div class="startrecruiting">开始招聘</div>
        </div>
        <!-- 公司审核不通过或者审核中 -->
        <div v-show="0">
        <div class="status-line"></div>
        <div class="apply-info">
          <div class="info-item">
            <span>您的申请</span>
            <span>申请信息有误？去更改</span>
          </div>
          <div class="info-item">
            <span>公司全称</span>
            <span>广州老虎信息科技有限公司</span>
          </div>
          <div class="info-item">
            <span>姓名</span>
            <span>张思言</span>
          </div>
          <div class="info-item">
            <span>担任职务</span>
            <span>产品经理</span>
          </div>
          <div class="info-item">
            <span>接收简历邮箱</span>
            <span>15353636@qq.com</span>
          </div>
          <div class="info-admin">
            <div class="avarat">
              <img src="" alt="">
            </div>
            <div class="name">张思言</div>
            <div class="admin">管理员</div>
            <div class="notice">通知管理员</div>
          </div>
        </div>
        <div class="status-line"></div>
        <div class="contact">
          <div class="contact-l">
          <div class="title">快速通道权益</div>
          <div class="desc">助你创建公司更快捷，欢迎体验～</div>
          </div>
          <div class="contact-btn">联系体验</div>
        </div>
        <div class="gotoqiuzhi" @click="gotowhere('qiuzhi')">前往求职</div>
        </div>
      </div>
  </div>
  <!-- 职位弹窗 -->
  <MyModel @resultEvent="resultEvent" v-model="showPositionModel" :data="positiondata"></MyModel>
  <message-diggle :visible="msg.messageshow" @clicksure="msgsure" @clickcancle="msgcancel" :title="msg.msgtitle" :desc="msg.msgdesc"></message-diggle>
</div>
</template>
<script>
import { realNameReg, companyNameReg, emailReg } from '@/util/fieldRegular.js'
import { SubmitpersonalApi, SearchcompanylistApi, applycompanyApi } from 'API/register'
import OptionList from '../registerCompany/components/option.vue'
import MessageDiggle from '../registerCompany/components/message.vue'
import MyModel from '@/components/model/index.vue'
export default {
  components: {
    OptionList,
    MyModel,
    MessageDiggle
  },
  data () {
    var validateRealname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写真实姓名'))
      } else if (!(value.match(realNameReg))) {
        callback(new Error('姓名需为2-20个中文字符'))
      } else {
        callback()
      }
    }
    var validateCompanyname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写公司全称'))
      } else if (!(value.match(companyNameReg))) {
        callback(new Error('公司名称需为2-50个字'))
      } else {
        callback()
      }
    }
    var validatePositiontype = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择职位所属类型'))
      } else {
        callback()
      }
    }
    var validateUserposition = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写担任的职务'))
      } else if (!(value.match(companyNameReg))) {
        callback(new Error('担任职务需为2-50个字'))
      } else {
        callback()
      }
    }
    var validateUseremail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入公司邮箱地址'))
      } else if (!(value.match(emailReg))) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    return {
      companyInfo: {
        status: 1,
        reviewNote: ''
      },
      ruleForm: {
        real_name: '',
        company_name: '',
        position_type_id: '',
        position_name: '',
        user_position: '',
        company_id: '',
        user_email: ''
      },
      msg: {
        messageshow: false,
        msgtitle: '前往求职端',
        msgdesc: '是否确认前往求职端？'
      },
      showPositionModel: false,
      positiondata: [],
      debounce: (() => {
        let timer = 0
        return (callback, ms) => {
          clearTimeout(timer)
          timer = setTimeout(callback, ms)
        }
      })(),
      companylist: [],
      companyshow: false,
      rules: {
        real_name: [
          { validator: validateRealname, trigger: 'blur' }
        ],
        company_name: [
          { validator: validateCompanyname, trigger: 'blur' }
        ],
        position_name: [
          { validator: validatePositiontype, trigger: 'blur' }
        ],
        user_position: [
          { validator: validateUserposition, trigger: 'blur' }
        ],
        user_email: [
          { validator: validateUseremail, trigger: 'blur' }
        ]
      },
      ischeck: false
    }
  },
  methods: {
    selectcompany () {
      this.companyshow = !this.companyshow
    },
    selectposition () {
      this.showPositionModel = true
    },
    resultEvent (res) {
      this.ruleForm.position_type_id = res.labelId
      this.ruleForm.position_name = res.name
      this.showPositionModel = false
    },
    bindInput (value, key) {
      this.ruleForm[key] = value
      this.bindButtonStatus()
      if (key === 'company_name') {
        this.debounce(() => {
          this.getCompanyNameList()
        }, 1000)
      }
    },
    getCompanyNameList () {
      let data = { page: 1, count: 100, name: this.ruleForm.company_name }
      SearchcompanylistApi(data).then(res => {
        let arr = res.data.data
        arr.map((v, k) => {
          if (v.companyName === this.ruleForm.company_name) {
            v.cur = true
            v.value = v.companyName
          } else {
            v.cur = false
            v.value = v.companyName
            this.companyshow = false
          }
        })
        this.companylist = arr
        if (this.companylist.length > 0) {
          this.companyshow = true
        } else {
          this.companyshow = false
        }
        console.log(arr)
      }).catch(e => {
        // this.setHint(e.data.msg || '')
      })
    },
    changecompany (data) {
      this.ruleForm.company_name = data.companyName
      this.companyshow = false
    },
    // 加入公司
    applycompany () {
      applycompanyApi(this.ruleForm).then((res) => {
        console.log(res)
      })
    },
    // 创建公司
    submitpersonal () {
      SubmitpersonalApi(this.ruleForm).then((res) => {
        console.log(res)
      })
    },
    bindButtonStatus () {
      let form = this.ruleForm
      if (form.real_name && form.company_name && form.position_type_id && form.user_position && form.user_email) {
        this.ischeck = true
      } else {
        this.ischeck = false
      }
    },
    gotowhere (type) {
      if (type === 'qiuzhi') {
        this.msg = {
          messageshow: true,
          msgtitle: '前往求职端',
          msgdesc: '是否确认前往求职端？'
        }
      } else {
        this.msg = {
          messageshow: true,
          msgtitle: '更换账号',
          msgdesc: '更换账号登录后不会删除任何历史数据，下次登录依然可以使用本账号。'
        }
      }
    },
    msgcancel () {
      this.msg = {
        messageshow: false,
        msgtitle: '前往求职端',
        msgdesc: '是否确认前往求职端？'
      }
    },
    msgsure (title) {
      if (title === '前往求职端') {
        this.$router.push({ name: 'index' })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    submitForm (formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped="scoped">
.register-all{
  height: 100%;
}
#register {
  padding: 0;
  background: #652791 url("https://lieduoduo-uploads-test.oss-cn-shenzhen.aliyuncs.com/front-assets/web/images/bg_loginpage.png") no-repeat;
  z-index: 100;
  display: flex;
  min-height: 100%;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  .register {
    cursor: pointer;
  }
  .title_p {
    font-size:30px;
    font-weight: bold;
    color:rgba(0,196,205,1);
    line-height:38px;
    margin: 0 0 42px 0;
  }
  .b-title{
    width: 100%;
    text-align: center;
    color:rgba(255,255,255,1);
    font-size: 56px;
    font-weight: bold;
    height: 56px;
    line-height: 56px;
    margin-top: 66px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .l-title{
    color:rgba(255,255,255,1);
    font-size:22px;
    font-weight: 300;
    height: 28px;
    line-height: 28px;
    margin-bottom: 49px;
  }
  .registerBox {
    width:562px;
    background: #fff;
    border-radius: 8px;
    box-shadow:0px 8px 12px 0px rgba(40,40,40,0.2);
    padding: 50px 72px 30px 72px;
    max-height: 706px;
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
    .box-title{
      font-size: 26px;
      color: #282828;
      height: 26px;
      line-height: 26px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 34px;
      width: 100%;
    }
    .positon-box{
      position: absolute;
      right: 0px;
      width: 100%;
      z-index: 4;
      height: 51px;
      top: 0px;
    }
    .select{
      position: absolute;
      top: 54px;
      left: 0px;
      padding-top: 6px;
      padding-bottom: 6px;
      width:418px;
      z-index:3;
      max-height:140px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background:#fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius:3px;
        height: 226px;
      }
      &::-webkit-scrollbar-thumb {
        background:#EBEBEB;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius:3px;
      }
      .select-item{
        height: 32px;
        line-height: 32px;
        padding-left: 13px;
        color: #606266;
        &:hover{
          color:#652791;
          font-weight: bold;
          font-size: 14px;
          background:#EFE9F4;
        }
      }
      .active{
        color:#652791;
        font-weight: bold;
        font-size: 14px;
        background:#EFE9F4;
      }
    }
    .nextstep{
      width:418px;
      height:50px;
      background:rgba(222,218,224,1);
      border-radius:4px;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      margin-top: 20px;
    }
    .cansubmit{
      background: #652791;
    }
    .handler{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #652791;
      margin-top: 40px;
      font-size: 14px;
      cursor: pointer;
      .goqiuzhi{
      }
      .line{
        height: 15px;
        width: 1px;
        background: #652791;
        margin: 0px 10px;
      }
    }
    .auth-title{
      font-size: 26px;
      color: #282828;
      height: 26px;
      line-height: 26px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
      width: 100%;
    }
    .sub-desc{
      font-size: 16px;
      color: #333333;
      margin-bottom: 10px;
    }
    .authentication{
      width:355px;
      height:140px;
      background:rgba(251,251,255,1);
      border-radius:4px;
      .head{
        color: #6D696E;
        font-size: 14px;
        text-align: center;
        padding: 20px 0 24px 0px;
      }
      .center{
        font-size: 14px;
        color: #652791;
        .center-l{
          float: left;
          width:106px;
          margin-left: 72px;
          span{
            display: block;
            width: 100%;
            margin-bottom: 12px;
          }
        }
        .center-r{
          float: left;
          margin-left: 87px;
          span{
            display: block;
            width: 100%;
            height: 15px;
            width: 18px;
            margin-bottom: 12px;
          }
        }
      }
    }
    .auth-btn{
      width:355px;
      height:50px;
      background:rgba(101,39,145,1);
      border-radius:4px;
      display: flex;
      color: #fff;
      font-size: 14px;
      line-height: 50px;
      justify-content: center;
      align-items: center;
    }
    .topicon{
      width: 150px;
      height: 114px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .status-title{
      color: #652791;
      font-size: 26px;
      font-weight: bold;
      padding: 25px 0 10px 0px;
    }
    .adoptcontent{
      width: 418px;
      .tips{
        height: 22px;
        .tips-l{
          float: left;
          .tips-line{
            width:149px;
            height:2px;
            float: left;
            margin-top: 10px;
            background: #652791;
          }
          .tips-box{
            width:8px;
            height:8px;
            background:rgba(101,39,145,1);
            float: left;
            margin-top: 7px;
            transform: rotate(225deg);
          }
        }
        .tips-c{
          width:64px;
          height:22px;
          font-size:16px;
          float: left;
          margin: 0 20px;
          color:rgba(101,39,145,1);
          line-height:22px;
        }
        .tips-r{
          float: left;
          .tips-line{
            width:149px;
            height:2px;
            float: left;
            margin-top: 10px;
            background: #652791;
          }
          .tips-box{
            width:8px;
            height:8px;
            background:rgba(101,39,145,1);
            float: left;
            margin-top: 7px;
            transform: rotate(225deg);
          }
        }
      }
      .canfree{
        width: 418px;
        margin-top: 19px;
        .freeitem{
          float: left;
          width: 50%;
          .item{
            width: 100%;
            margin-bottom: 14px;
          }
          .images{
            width: 54px;
            height: 51px;
            overflow: hidden;
            margin-left: 94px;
            border-radius: 50%;
            background: #652791;
          }
          .text{
            font-size: 14px;
            margin-left: 79px;
            color: #652791;
          }
          .marleft{
            margin-left: 73px;
          }
          .tmarleft{
            margin-left: 56px;
          }
        }
      }
      .startrecruiting{
        width:418px;
        font-size: 14px;
        color: #fff;
        margin-top: 40px;
        line-height: 50px;
        text-align: center;
        height:50px;
        cursor: pointer;
        background:rgba(101,39,145,1);
        border-radius:4px;
      }
    }
    .status-tip{
      font-size: 16px;
      color: #333333;
      margin-bottom: 30px;
    }
    .status-line{
      width:418px;
      height:1px;
      background: #E8E9EB;
    }
    .apply-info{
      padding: 14px 0px;
      width: 418px;
      .info-item{
        font-size: 14px;
        color: #6D696E;
        display: flex;
        padding-bottom: 10px;
        justify-content: space-between;
      }
      .info-admin{
        width:418px;
        height:52px;
        background:rgba(251,251,252,1);
        border-radius:4px;
        margin-top: 10px;
        .avarat{
          border-radius:50%;
          overflow: hidden;
          width:33px;
          margin-top: 10px;
          margin-left: 14px;
          height:32px;
          float: left;
        }
        .name{
          color: #282828;
          line-height: 52px;
          font-size: 14px;
          margin-left: 8px;
          float: left;
        }
        .admin{
          color: #5C565D;
          line-height: 52px;
          float: left;
          font-size: 12px;
          margin-left: 4px;
        }
        .notice{
          width:110px;
          height:32px;
          background:rgba(101,39,145,1);
          border-radius:4px;
          line-height: 32px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          margin-top: 10px;
          float: right;
        }
      }
    }
    .contact{
      height: 46px;
      width: 418px;
      padding-top: 29px;
      .contact-l{
        float: left;
      }
      .contact-btn{
        float: right;
        width:110px;
        height:32px;
        line-height: 32px;
        text-align: center;
        color: #333333;
        margin-top: 14px;
        cursor: pointer;
        font-size: 14px;
        background:rgba(255,220,41,1);
        border-radius:4px;
      }
      .title{
        color: #333333;
        font-size: 16px;
      }
      .desc{
        color: #6D696E;
        padding-top: 4px;
        font-size: 14px
      }
    }
    .gotoqiuzhi{
      margin-top: 56px;
      font-size: 14px;
      color: #652791;
      cursor: pointer;
    }
  }
}
</style>
<style>
.registerBox .el-form-item{
  position: relative;
}
.registerBox .el-form-item__label{
  position: absolute;
  left: 120px;
  width: 120px!important;
  text-align: left;
  line-height: 50px;
  z-index: 1;
}
.registerBox .el-form-item__label::before{
  color: #FF7F4C!important;
  vertical-align: sub;
}
.registerBox .el-form-item__content{
  line-height: 50px;
  position: relative;
  font-size: 14px;
  width: 418px;
  margin-right: 100px;
}
.registerBox .el-input .el-input__inner{
  text-align: right;
  height: 50px;
  line-height: 50px;
}
.registerBox .el-input .el-input__inner::placeholder{
  color: #A29CA6;
}
</style>
