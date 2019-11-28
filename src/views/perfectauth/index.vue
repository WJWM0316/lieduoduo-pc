<template>
  <div class="perfect">
    <div class="account_tab">
      <div class="account_tab">
        <div class="tabitem active">身份认证</div>
        <div class="scroll_bar" ref="bar"></div>
      </div>
    </div>
    <div class="info">
      <template v-if="!haveIdentity">
      <div class="authtitle">
        完善身份信息
      </div>
      <div class="desc">根据人力资源相关法律规定，用人单位开展招聘业务，需提供相关公司认证资质资料，请确保提交真实有效信息。</div>
      <div class="authform">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="身份证正面" prop="passport_front">
            <div class="updata">
              <Picture
              :value.sync="ruleForm.passport_front_url"
              attach-type="img"
              class="logoimg"
              @before="avatarLoading = true"
              @fail="avatarLoading = false"
              @change="handleChangefront"
              v-loading="frontLoading">
            <div class="upimages" v-if="!ruleForm.passport_front_url">
                <img src="@/assets/images/userauth.png" alt="">
                <div class="hasupdata">点击上传</div>
              </div>
            <div class="upimages" v-else>
              <img :src="ruleForm.passport_front_url" alt="">
            </div>
            </Picture>
            </div>
            <el-input v-model="ruleForm.passport_front" placeholder="请填写你的真实姓名" v-show="0"></el-input>
            <div class="updata-text">正面身份证（人像面）信息均在照片内清晰可识别身份信息。</div>
          </el-form-item>
          <el-form-item label="真实姓名" prop="real_name">
            <el-input v-model="ruleForm.real_name" placeholder="请填写你的真实姓名"></el-input>
          </el-form-item>
           <el-form-item label="身份证号" prop="identity_num">
            <el-input :maxlength="18" v-model="ruleForm.identity_num" placeholder="请填写18位身份证号码"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <div class="submit" @click="submitForm('ruleForm')">保存</div>
        </template>
        <template v-else>
          <div class="status">
            <div class="topicon">
              <img v-if="companyInfo.status === 1" src="@/assets/images/adopt.png" />
            <img v-if="companyInfo.status === 0" src="@/assets/images/examine.png" />
            <img v-if="companyInfo.status === 2" src="@/assets/images/notadopt.png" />
            </div>
            <div class="status-text" v-if="companyInfo.status === 0">实名认证审核中</div>
            <div class="status-text" v-if="companyInfo.status === 2">实名认证审核不通过</div>
            <div class="status-desc" v-if="companyInfo.status === 0">该申请将在1个工作日内审核，审核通过后即可开始招聘</div>
            <div class="status-desc" v-if="companyInfo.status === 2">请重新提交资料，完成个人信息认证</div>
            <div class="nopass" v-if="companyInfo.status === 2">
              <div class="title">
                <span>实名认证审核未通过的原因如下</span>
                <span @click="change()" class="cxtitle">重新提交认证信息</span>
                </div>
              <div class="reson">
                <span>{{companyInfo.reviewNote}}</span>
              </div>
            </div>
            <div class="authinfo">
              <div class="item">
                <div class="title reset">认证信息</div>
                <div class="text active" @click="change()">申请信息有误？去更改</div>
              </div>
              <div class="item">
                <div class="title">真实姓名</div>
                <div class="text">{{info.realName}}</div>
              </div>
              <div class="item">
                <div class="title">身份证号</div>
                <div class="text" v-if="info.identityNum">{{info.identityNum.substr(0, 1) + '****************' + info.identityNum.substring(17, 18)}}</div>
              </div>
              <div class="item">
                <div class="title">证件照片</div>
                <div class="text">已上传</div>
              </div>
            </div>
          </div>
        </template>
    </div>
  </div>
</template>

<script>
import { realNameReg, idCardReg } from '@/util/fieldRegular.js'
import Picture from 'COMPONENTS/common/upload/picture'
import { getCompanyIdentityInfosApi, identityCompanyApi, editCompanyIdentityInfosApi } from 'API/register'
export default {
  components: {
    Picture
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
    var validateIdentity = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else if (!(value.match(idCardReg))) {
        callback(new Error('请填写18位身份证号码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        passport_front: '',
        passport_front_url: '',
        real_name: '',
        identity_num: ''
      },
      haveIdentity: false,
      companyInfo: '',
      info: '',
      frontLoading: false,
      rules: {
        real_name: [
          { validator: validateRealname, required: true, trigger: 'blur' }
        ],
        passport_front: [
          { required: true, message: '请上传身份证正面', trigger: 'change' }
        ],
        identity_num: [
          { validator: validateIdentity, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交注册
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.companyInfo.status === 2 || this.companyInfo.status === 0) {
            editCompanyIdentityInfosApi(this.ruleForm).then((res) => {
              this.getCompanyIdentityInfos()
              this.$message.success('编辑成功')
            })
          } else {
            identityCompanyApi(this.ruleForm).then((res) => {
              this.getCompanyIdentityInfos()
              this.$message.success('完善信息成功')
            })
          }
        } else {
          return false
        }
      })
    },
    handleChangefront (data) {
      this.ruleForm.passport_front_url = data[0].smallUrl
      this.ruleForm.passport_front = data[0].id
    },
    getCompanyIdentityInfos () {
      getCompanyIdentityInfosApi().then(res => {
        if (res.data.data.status === 1) {
          this.$router.push({ path: '/candidateType' })
        }
        this.companyInfo = res.data.data
        this.info = res.data.data
      })
    },
    change () {
      this.haveIdentity = false
    }
  },
  mounted () {
    setTimeout(() => {
      if (!this.$store.state.recruiterinfo.identityAuth) {
        this.haveIdentity = true
      } else {
        this.haveIdentity = false
      }
    }, 1000)
    this.getCompanyIdentityInfos()
  }
}
</script>

<style lang="less" scoped>
.perfect{
  height:800px;
  padding: 0 !important;
  background:#fff;
  display: flex;
  .account_tab{
    width:190px;
    height:800px;
    background:#F5F5F5;
    position: relative;
    float: left;
    .tabitem{
      width:190px;
      height:58px;
      font-size:14px;
      font-weight:400;
      text-align: center;
      line-height: 58px;
      color:#282828;
    }
    .active{
      background: #fff;
      color: #652791;
    }
    .scroll_bar{
      position: absolute;
      left: 0px;
      top: 0px;
      width:4px;
      height:58px;
      background:#652791;
    }
  }
  .info{
    width:969px;
    height:800px;
    background:#fff;
    float: left;
    .authtitle{
      font-size: 24px;
      color: #282828;
      font-weight: bold;
      height: 32px;
      line-break: 32px;
      margin: 40px 0px 6px 64px;
    }
    .desc{
      font-size:14px;
      color: #5C565D;
      height: 22px;
      padding-left: 64px;
      margin-bottom: 48px;
      line-height: 22px;
    }
    .authform{
      padding-left: 42px;
      width: 482px;
      .updata{
        width:140px;
        height:85px;
        border-radius:6px;
      }
      .upimages{
        width:140px;
        height:85px;
        cursor: pointer;
        border-radius:6px;
        position: relative;
        img{
         max-width: 100%;
         max-height: 100%;
        }
        .hasupdata{
          bottom: -10px;
          left: 36px;
          font-size: 14px;
          color:#fff;
          position: absolute;
        }
      }
      .updata-text{
        color: #A29CA6;
        font-size: 12px;
      }
    }
    .submit{
      width:124px;
      height:40px;
      background:rgba(101,39,145,1);
      border-radius:4px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin-top: 58px;
      margin-left: 64px;
    }
    .status{
      width: 392px;
      margin: 0 auto;
      margin-top: 91px;
      text-align: center;
      .topicon{
        width: 150px;
        height: 114px;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .status-text{
        color: #652791;
        font-size: 26px;
        line-height:26px;
        height: 26px;
        font-weight: bold;
        margin: 25px auto 6px;
      }
      .status-desc{
        color: #333333;
        font-size: 15px;
        height: 24px;
        line-height:24px;
        margin-bottom: 14px;
      }
      .authinfo{
        width:392px;
        height:138px;
        background:rgba(250,249,254,1);
        border-radius:4px;
        padding-top: 20px;
        .item{
          height: 20px;
          line-height: 20px;
          color: #6D696E;
          font-size: 14px;
          margin-bottom: 10px;
          .title{
            float: left;
            padding-left: 20px;
          }
          .reset{
            color: #333333;
            font-weight: bold;
            font-size: 16px;
          }
          .active{
            color: #652791;
            cursor: pointer;
          }
          .text{
            padding-right: 21px;
            float: right;
          }
        }
      }
      .nopass{
        width: 392px;
        margin-top: 28px;
        .title{
          color: #333333;
          font-weight: bold;
          text-align: left;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .cxtitle{
          font-weight: normal;
          font-size: 14px;
          color: #652791;
          cursor: pointer;
          float: right;
          padding-right: 21px;
        }
        .reson{
          max-height:86px;
          background:rgba(255,252,240,1);
          border-radius:4px;
          color: #FF7F4C;
          font-size: 14px;
          padding-left: 20px;
          padding-top: 14px;
          padding-bottom: 14px;
          span{
            line-height: 24px;
            display: block;
            text-align: left;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
