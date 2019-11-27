<template>
<div class="register-all">
  <div id="register" class="register">
      <div class="b-title">猎多多</div>
      <div class="l-title">精英人才招聘神器</div>
      <!-- 创建公司模块 -->
      <div class="registerBox" v-show="!$route.query.page" @click="closeMsg($event)">
        <div class="box-title">填写个人信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="真实姓名" prop="real_name">
            <el-input :value="ruleForm.real_name" placeholder="请填写真实姓名" @input="bindInput($event, 'real_name')"></el-input>
          </el-form-item>
          <el-form-item label="公司全称" prop="company_name" class="cpname">
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
      <div class="registerBox" v-show="$route.query.page === 'submit'">
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
        <div class="auth-btn" @click="gotowhere('perfect')">
          <span>等不及了，在线自主完成认证</span>
          <i class="iconfont icon-right"></i>
        </div>
        <div class="handler">
          <div class="goqiuzhi" @click="gotowhere('qiuzhi')">前往求职端</div>
          <div class="line"></div>
          <div class="changeaccount" @click="gotowhere('account')">更换账号</div>
        </div>
      </div>
      <!-- 完善公司信息 -->
      <div class="registerBox" v-show="$route.query.page === 'perfect'">
        <div class="box-title">完善公司信息</div>
        <el-form :model="authForm" :rules="authrules" ref="ruleauthForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司全称" prop="company_name">
            <el-input :value="authForm.company_name" :disabled="true" placeholder="请填写公司全称" @input="authbindInput($event, 'company_name')"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="company-logo">
            <div class="text">公司logo</div>
            <Picture
              :value.sync="authForm.logourl"
              attach-type="img"
              class="logoimg"
              @before="avatarLoading = true"
              @fail="avatarLoading = false"
              @change="handleChangeAvatar"
              v-loading="avatarLoading">
              <div class="logo" v-if="!authForm.logourl">
                <img src="@/assets/images/cp_logo.png" alt="">
              </div>
              <div class="logo" v-else>
              <img :src="authForm.logourl" alt="">
            </div>
            </Picture>
          </div>
          </el-form-item>
          <el-form-item label="公司简称" prop="company_shortname">
            <el-input :value="authForm.company_shortname" placeholder="请填写公司简称" @input="authbindInput($event, 'company_shortname')"></el-input>
            <i class="iconfont icon-bangzhu icontip" @mouseenter="tipsshow = true" @mouseleave="tipsshow = false"></i>
            <div v-show="tipsshow">
              <div class="icontipbox">公司简称能让候选人记住你的公司，可以是品牌名/产品名/关键词，创建后不可修改。</div>
              <div class="forward"></div>
            </div>
          </el-form-item>
          <el-form-item label="所属行业" prop="industry_name">
            <div class="positon-box" @click="selectindustry()"></div>
            <el-input :value="authForm.industry_name" placeholder="请选择所属行业" @input="authbindInput($event, 'industry_name')"></el-input>
            <option-list :option="industrylist" :visible="industryshow" @selectchange="changeindustry"></option-list>
          </el-form-item>
          <el-form-item label="融资情况" prop="financing_name">
            <div class="positon-box" @click="selectfinancing()"></div>
            <el-input :value="authForm.financing_name" placeholder="请选择融资情况" @input="authbindInput($event, 'financing_name')"></el-input>
            <option-list :option="financinglist" :visible="financingshow" @selectchange="changefinancing"></option-list>
          </el-form-item>
          <el-form-item label="人员规模" prop="employees_name">
            <div class="positon-box" @click="selectemployees()"></div>
            <el-input :value="authForm.employees_name" placeholder="请选择人员规模" @input="authbindInput($event, 'employees_name')"></el-input>
            <option-list :option="employeeslist" :visible="employeesshow" @selectchange="changeemployee"></option-list>
          </el-form-item>
          <el-form-item>
            <div class="intro">
              <textarea placeholder="请填写公司介绍" v-model="authForm.intro"></textarea>
            </div>
          </el-form-item>
        </el-form>
        <div :class="['nextstep', isauthcheck ? 'cansubmit' : '']" @click="gotowhere('toUpload')">下一步</div>
        <div class="handler">
          <div class="goqiuzhi" @click="gotowhere('toback')">返回上一步</div>
        </div>
      </div>
      <!-- 完善认证信息 -->
      <div class="registerBox" v-show="$route.query.page === 'authpage'">
        <div class="box-title" style="margin-bottom:20px;">完善认证信息</div>
        <div class="authtitle">根据人力资源相关法律规定，用人单位开展招聘业务，需提供相关公司认证资质资料，请确保提交真实有效信息。</div>
        <div class="updata">
          <div class="updata-item">
            <div class="title">上传营业执照</div>
            <div class="content">
              <div class="con-l">
                <Picture
                :value.sync="authForm.business_license_url"
                attach-type="img"
                class="updataimg"
                @before="businessLoading = true"
                @fail="businessLoading = false"
                @change="handleChangeBusiness"
                v-loading="businessLoading">
                <div class="updataimg" v-if="!authForm.business_license_url">
                  <img src="@/assets/images/business.png" alt="">
                </div>
                <div class="updataimg" v-else>
                <img :src="authForm.business_license_url" alt="">
              </div>
              </Picture>
              </div>
              <div class="con-r">确保公司全称与提交认证/审核公司一致；如为复印件、黑白扫描件，需要加公司公章；不支持屏幕截图或翻拍图片；不能有与招聘无关的标注或水印；不支持电子版营业执照，保证图片信息清晰完整；</div>
            </div>
          </div>
          <div class="updata-item">
            <div class="title">上传工牌/名片/在职证明（三选一）</div>
            <div class="content">
              <div class="con-l">
                <Picture
                :value.sync="authForm.on_job_url"
                attach-type="img"
                class="updataimg"
                @before="onjobLoading = true"
                @fail="onjobLoading = false"
                @change="handleChangeOnjob"
                v-loading="onjobLoading">
                <div class="logo" v-if="!authForm.on_job_url">
                  <img src="@/assets/images/identitycard.png" alt="">
                </div>
                <div class="logo" v-else>
                <img :src="authForm.on_job_url" alt="">
              </div>
              </Picture>
              </div>
              <div class="con-r">确保提交的认证与审核公司一致；如为复印件、黑白扫描件，需要加公司公章；不支持屏幕截图或翻拍图片；图片不能涂改、添加标注或水印；保证图片信息清晰完整；</div>
            </div>
          </div>
        </div>
        <div :class="['nextstep', isupdatacheck ? 'cansubmit' : '']" @click="submitauthForm('ruleauthForm')">完成</div>
        <div class="handler">
          <div class="goqiuzhi" @click="gotowhere('toback')">返回上一步</div>
        </div>
      </div>
      <!-- 创建公司审核状态 -->
      <div class="registerBox" v-show="$route.query.page === 'status'">

        <template v-if="$route.query.from === 'company'">
          <div class="topicon">
            <img v-if="companyInfo.status === 1 || companyInfo.status === 0" src="@/assets/images/adopt.png" />
            <img v-else src="@/assets/images/notadopt.png" />
          </div>

          <template v-if="companyInfo.status === 0">
            <div class="status-title">公司认证审核中</div>
            <div class="status-tip">该申请将在1个工作日内审核，通过后即可开始招聘</div>
          </template>

          <!-- 公司审核通过了 -->
          <template v-if="companyInfo.status === 1">
            <div class="status-title">公司认证审核已通过</div>
            <div class="status-tip">{{companyInfo.companyName}}</div>
            <div class="adoptcontent" v-if="companyInfo.status === 1">
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
                  <div class="images">
                    <img src="@/assets/images/postposition.png" alt="">
                  </div>
                  </div>
                <div class="item">
                <div class="text">免费发布职位</div>
                </div>
                </div>
                <div class="freeitem">
                  <div class="item">
                  <div class="images marleft">
                    <img src="@/assets/images/viewresume.png" alt="">
                  </div>
                  </div>
                <div class="item">
                <div class="text tmarleft">免费查看简历</div>
                </div>
                </div>
              </div>
              <div class="startrecruiting" @click="startrecruit()">开始招聘</div>
            </div>
          </template>

          <template v-if="companyInfo.status === 2">
            <div class="status-title">公司认证审核未通过</div>
            <div class="status-tip">请重新提交资料，完成公司创建</div>
          </template>

          <!-- 公司审核不通过或者审核中 -->
          <div v-show="companyInfo.status === 0 || companyInfo.status === 2">
            <div class="status-line"></div>
            <div class="error-box" v-if="companyInfo.status === 2">
            <div class="error-head">
            <div class="title">实名认证审核未通过的原因如下</div>
              <div class="chongxin" @click="gotowhere('resetedit')">重新提交认证信息</div>
              </div>
            <div class="error-item">{{companyInfo.reviewNote}}</div>
          </div>
            <div class="apply-info">
              <div class="info-item">
                <span style="color:#333333;font-size:16px;font-weight:bold;">您的申请</span>
                <span style="color:#652791;cursor: pointer;" @click="gotowhere('resetedit')">申请信息有误？去更改</span>
              </div>
              <div class="info-item">
                <span>公司全称</span>
                <span>{{companyInfo.companyName}}</span>
              </div>
              <div class="info-item">
                <span>姓名</span>
                <span>{{companyInfo.realName}}</span>
              </div>
              <div class="info-item">
                <span>担任职务</span>
                <span>{{companyInfo.userPosition}}</span>
              </div>
              <div class="info-item">
                <span>接收简历邮箱</span>
                <span>{{companyInfo.userEmail}}</span>
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
        </template>

        <template v-if="$route.query.from === 'join'">
          <div class="topicon">
            <img v-if="(companyInfo.status === 0)" src="@/assets/images/adopt.png" />
            <img v-else src="@/assets/images/notadopt.png" />
          </div>

          <template v-if="(companyInfo.status === 0)">
            <div class="status-title">加入公司申请审核中</div>
            <div class="status-tip">该申请将通知公司管理员审核，审核通过后即可开始招聘</div>
          </template>
          <!-- 公司审核通过了 -->
          <template v-if="(companyInfo.status === 1)">
            <div class="status-title">加入公司申请通过</div>
            <div class="status-tip">{{companyInfo.companyName}}</div>

            <div class="adoptcontent" v-if="companyInfo.status === 1">
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
                  <div class="images">
                    <img src="@/assets/images/postposition.png" alt="">
                  </div>
                  </div>
                <div class="item">
                <div class="text">免费发布职位</div>
                </div>
                </div>
                <div class="freeitem">
                  <div class="item">
                  <div class="images marleft">
                    <img src="@/assets/images/viewresume.png" alt="">
                  </div>
                  </div>
                <div class="item">
                <div class="text tmarleft">免费查看简历</div>
                </div>
                </div>
              </div>
              <div class="startrecruiting" @click="startrecruit()">开始招聘</div>
            </div>
          </template>

          <template v-if="(companyInfo.status === 2)">
            <div class="status-title">加入公司申请审核失败</div>
            <div class="status-tip">您提交的申请审核未通过，具体原因请咨询管理员</div>
          </template>

          <!-- 公司审核不通过或者审核中 -->
          <div v-show="companyInfo.status === 0 || companyInfo.status === 2">
            <div class="status-line"></div>
            <div class="apply-info">
              <div class="info-item">
               <span style="color:#333333;font-size:16px;font-weight:bold;">您的申请</span>
                <span style="color:#652791;cursor: pointer;" @click="gotowhere('resetedit')">申请信息有误？去更改</span>
              </div>
              <div class="info-item">
                <span>公司全称</span>
                <span>{{companyInfo.companyName}}</span>
              </div>
              <div class="info-item">
                <span>姓名</span>
                <span>{{companyInfo.realName}}</span>
              </div>
              <div class="info-item">
                <span>担任职务</span>
                <span>{{companyInfo.userPosition}}</span>
              </div>
              <div class="info-item">
                <span>接收简历邮箱</span>
                <span>{{companyInfo.userEmail}}</span>
              </div>
              <div class="info-admin" v-if="companyInfo.adminInfo">
                <div class="avarat">
                  <img :src="companyInfo.adminInfo.avatar.smallUrl" alt="">
                </div>
                <div class="name">{{companyInfo.adminInfo.name}}</div>
                <div class="admin">{{companyInfo.adminInfo.position}}</div>
                <div :class="['notice', miniProgramStatus ? 'default' : '']" @click="noticeadmin()">通知管理员</div>
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
        </template>

      </div>
  </div>
  <!-- 职位弹窗 -->
  <MyModel @resultEvent="resultEvent" v-model="showPositionModel" :data="positiondata"></MyModel>
  <!-- 提示弹窗 -->
  <message-diggle :visible="msg.messageshow" @clicksure="msgsure" @clickcancle="msgcancel" :title="msg.msgtitle" :desc="msg.msgdesc"></message-diggle>
</div>
</template>
<script>
import { realNameReg, companyNameReg, emailReg, abbreviationReg } from '@/util/fieldRegular.js'
// import { SubmitpersonalApi, getCompanyNameListApi, applycompanyApi } from 'API/register'
import OptionList from '../registerCompany/components/option.vue'
import MessageDiggle from '../registerCompany/components/message.vue'
import Picture from 'COMPONENTS/common/upload/picture'
import MyModel from '@/components/model/index.vue'
import { getLabelFieldListApi } from 'API/putIn'
import {
  applyCompanyApi,
  createCompanyApi,
  getCompanyNameListApi,
  justifyCompanyExistApi,
  editApplyCompanyApi,
  getCompanyIdentityInfosApi,
  editCompanyFirstStepApi,
  hasApplayRecordApi,
  perfectCompanyApi,
  notifyadminApi
} from 'API/register'
export default {
  components: {
    OptionList,
    MyModel,
    Picture,
    MessageDiggle
  },
  // watch: {
  //   '$route': {
  //     handler (value) {
  //       console.log(value)
  //     }
  //   }
  // },
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
    var validateCompanyshortname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入公司简称'))
      } else if (!(value.match(abbreviationReg))) {
        callback(new Error('请输入正确的公司简称'))
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
      miniProgramStatus: 0,
      authForm: {
        id: '',
        company_name: '',
        company_shortname: '',
        industry_id: '',
        industry_name: '',
        financing: '',
        financing_name: '',
        logo: '',
        logourl: '',
        employees: '',
        employees_name: '',
        business_license: '',
        business_license_url: '',
        on_job: '',
        on_job_url: '',
        intro: ''
      },
      tipsshow: false,
      avatarLoading: false,
      businessLoading: false,
      onjobLoading: false,
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
      industrylist: [],
      industryshow: false,
      financinglist: [
        { value: '未融资', id: '1' },
        { value: '天使轮', id: '2' },
        { value: 'A轮', id: '3' },
        { value: 'B轮', id: '4' },
        { value: 'C轮', id: '5' },
        { value: 'D轮及以上', id: '6' },
        { value: '已上市', id: '7' },
        { value: '不需要融资', id: '8' }
      ],
      financingshow: false,
      employeeslist: [
        { value: '0-20人', id: '1' },
        { value: '20-99人', id: '2' },
        { value: '100-499人', id: '3' },
        { value: '500-999人', id: '4' },
        { value: '1000-9999人', id: '5' },
        { value: '10000人以上', id: '6' }
      ],
      employeesshow: false,
      rules: {
        real_name: [
          { validator: validateRealname, required: true, trigger: 'blur' }
        ],
        company_name: [
          { validator: validateCompanyname, required: true, trigger: 'blur' }
        ],
        position_name: [
          { validator: validatePositiontype, required: true, trigger: 'blur' }
        ],
        user_position: [
          { validator: validateUserposition, required: true, trigger: 'blur' }
        ],
        user_email: [
          { validator: validateUseremail, required: true, trigger: 'blur' }
        ]
      },
      authrules: {
        company_name: [
          { validator: validateCompanyname, required: true, trigger: 'blur' }
        ],
        company_shortname: [
          { validator: validateCompanyshortname, required: true, trigger: 'blur' }
        ],
        industry_name: [
          { required: true, message: '请选择所属行业', trigger: 'blur' }
        ],
        financing_name: [
          { required: true, message: '请选择融资情况', trigger: 'blur' }
        ],
        employees_name: [
          { required: true, message: '请选择人员规模', trigger: 'blur' }
        ]
      },
      ischeck: false,
      isauthcheck: false,
      isupdatacheck: false,
      page: '',
      applyJoin: false
    }
  },
  methods: {
    // 上传公司logo
    handleChangeAvatar (data) {
      this.authForm.logourl = data[0].smallUrl
      this.authForm.logo = data[0].id
    },
    // 上传营业执照
    handleChangeBusiness (data) {
      this.authForm.business_license_url = data[0].smallUrl
      this.authForm.business_license = data[0].id
      this.checkupdata()
    },
    // 上传工牌
    handleChangeOnjob (data) {
      this.authForm.on_job_url = data[0].smallUrl
      this.authForm.on_job = data[0].id
      this.checkupdata()
    },
    selectcompany () {
      this.companyshow = false
    },
    // 选择职位
    selectposition () {
      this.showPositionModel = true
    },
    // 选择行业
    selectindustry () {
      this.industryshow = !this.industryshow
    },
    changeindustry (data) {
      this.authForm.industry_name = data.value
      this.authForm.industry_id = data.id
      this.industryshow = false
      // this.bindauthButtonStatus()
    },
    // 选择融资
    selectfinancing () {
      this.financingshow = !this.financingshow
    },
    changefinancing (data) {
      this.authForm.financing_name = data.value
      this.authForm.financing = data.id
      this.financingshow = false
      // this.bindauthButtonStatus()
    },
    // 选择人员规模
    selectemployees () {
      this.employeesshow = !this.employeesshow
    },
    changeemployee (data) {
      this.authForm.employees_name = data.value
      this.authForm.employees = data.id
      this.employeesshow = false
      // this.bindauthButtonStatus()
    },
    // 通知管理员
    noticeadmin () {
      if (!this.miniProgramStatus) {
        notifyadminApi().then((res) => {
          this.$message.success('成功通知管理员，请耐心等待')
          this.getCompanyIdentityInfos()
        }).catch(e => {
          this.$message.error(e.data.msg || '')
        })
      }
    },
    resultEvent (res) {
      this.ruleForm.position_type_id = res.labelId
      this.ruleForm.position_name = res.name
      this.showPositionModel = false
      this.bindButtonStatus()
    },
    bindInput (value, key) {
      this.ruleForm[key] = value
      this.bindButtonStatus()
      if (key === 'company_name') {
        this.debounce(() => {
          if (this.ruleForm.company_name) {
            this.getCompanyNameList()
          }
        }, 1000)
      }
    },
    // 点击其他区域关闭弹窗
    closeMsg (event) {
      this.companyshow = false
    },
    authbindInput (value, key) {
      this.authForm[key] = value
      console.log('3873838', value, key, this.authForm[key])
      this.bindauthButtonStatus()
    },
    getCompanyNameList () {
      let data = { page: 1, count: 100, name: this.ruleForm.company_name }
      getCompanyNameListApi(data).then(res => {
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
      }).catch(e => {
        // this.setHint(e.data.msg || '')
      })
    },
    changecompany (data) {
      this.ruleForm.company_name = data.companyName
      this.companyshow = false
    },
    bindButtonStatus () {
      let form = this.ruleForm
      if (form.real_name && form.company_name && form.position_type_id && form.user_position && form.user_email) {
        this.ischeck = true
      } else {
        this.ischeck = false
      }
    },
    bindauthButtonStatus () {
      let form = this.authForm
      if (form.company_name && form.company_shortname && form.industry_id && form.financing && form.employees) {
        this.isauthcheck = true
      } else {
        this.isauthcheck = false
      }
    },
    checkupdata () {
      let form = this.authForm
      if (form.on_job && form.business_license) {
        this.isupdatacheck = true
      } else {
        this.isupdatacheck = false
      }
    },
    gotowhere (type) {
      switch (type) {
        case 'qiuzhi':
          this.msg = {
            messageshow: true,
            msgtitle: '前往求职端',
            msgdesc: '是否确认前往求职端？'
          }
          break
        case 'account':
          this.msg = {
            messageshow: true,
            msgtitle: '更换账号',
            msgdesc: '更换账号登录后不会删除任何历史数据，下次登录依然可以使用本账号。'
          }
          break
        case 'perfect':
          this.authForm = Object.assign(
            {}, { id: this.ruleForm.id, company_name: this.ruleForm.company_name }
          )

          this.$router.push({
            query: {
              page: 'perfect'
            }
          })
          // this.getCompanyIdentityInfos()
          break
        case 'toUpload':
          if (this.isauthcheck) {
            this.$router.push({
              query: {
                page: 'authpage'
              }
            })
          }
          break
        case 'resetedit':
          this.$router.push({
            query: {
              action: 'edit'
            }
          })
          break
        case 'toback':
          this.$router.go(-1)
          break
        default:
          break
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
    // 提交注册
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    // 提交认证
    submitauthForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isupdatacheck) {
            this.submit2()
          }
        } else {
          return false
        }
      })
    },
    editCreateCompany () {
      let formData = this.ruleForm
      let params = {
        id: formData.id,
        real_name: formData.real_name,
        user_email: formData.user_email.trim(),
        user_position: formData.user_position,
        company_name: formData.company_name
      }
      editCompanyFirstStepApi(params).then(() => {
        this.getCompanyIdentityInfos()
        // this.$router.push({
        //   query: {
        //     page: 'submit',
        //     from: 'company',
        //     action: 'edit'
        //   }
        // })
      })
      // 创建公司后 重新编辑走加入公司逻辑  如果之前有一条加入记录 取之前的加入记录id
        .catch(err => {
          if (err.data.code === 307) {
            this.$router.push({
              query: {
                page: 'status',
                from: 'company'
              }
            })
            return
          }

          hasApplayRecordApi().then(res => {
            if (res.data.data.id) {
              this.ruleForm.applyId = res.data.data.id
              this.ruleForm.id = res.data.data.companyId
              this.editJoinCompany()
            } else {
              if (err.data.code === 990) {
                this.ruleForm.id = err.data.data.companyId
                this.joinCompany()
              }
            }
          })
        })
    },
    createCompany () {
      let formData = this.ruleForm
      let params = {
        real_name: formData.real_name,
        user_email: formData.user_email.trim(),
        user_position: formData.user_position,
        position_type_id: formData.position_type_id,
        company_name: formData.company_name
      }
      createCompanyApi(params).then(res => {
        this.authForm.id = res.data.data.id
        this.authForm.company_name = res.data.data.companyName
        this.$router.push({
          query: {
            page: 'submit',
            from: 'company'
          }
        })
        // this.getCompanyIdentityInfos()
      })
      // 公司存在 直接走加入流程
        .catch(err => {
          if (err.data.code === 307) {
            this.$router.push({
              query: {
                page: 'status',
                from: 'company'
              }
            })
            return
          }

          if (err.data.code === 990) {
            this.ruleForm.id = err.data.data.companyId
            this.joinCompany()
          }
        })
    },
    editJoinCompany () {
      let formData = this.ruleForm
      let params = {
        id: formData.applyId,
        real_name: formData.real_name,
        user_email: formData.user_email.trim(),
        user_position: formData.user_position,
        company_name: formData.company_name,
        company_id: formData.id
      }
      // 判断公司是否存在
      justifyCompanyExistApi({ name: formData.company_name }).then(res0 => {
        if (res0.data.data.exist) {
          // 有可能编辑时  加入另一家公司
          params = Object.assign(params, { company_id: res0.data.data.id })
          // 被拒绝并且是新公司
          if (formData.id !== res0.data.data.id) {
            // 查看当前公司是否有申请记录
            hasApplayRecordApi().then(res1 => {
              // 当前公司已经申请过
              if (res1.data.id) {
                editApplyCompanyApi(params).then(res => {
                  if (res.data.emailStatus) {
                    this.$router.push({
                      query: {
                        page: 'submit',
                        from: 'join',
                        suffix: res.data.suffix,
                        companyId: res.data.companyId
                      }
                    })
                  } else {
                    this.$router.push({
                      query: {
                        page: 'status',
                        from: 'join'
                      }
                    })
                  }
                })
                  .catch(err => {
                    if (err.data.code === 307) {
                      this.$router.push({
                        query: {
                          page: 'status',
                          from: 'join'
                        }
                      })
                    }
                  })
              } else {
                this.ruleForm.id = res0.data.data.id
                this.joinCompany()
              }
            })
          } else {
            editApplyCompanyApi(params).then(res => {
              if (res.data.emailStatus) {
                this.$router.push({
                  query: {
                    page: 'submit',
                    from: 'join',
                    suffix: res.data.suffix,
                    companyId: res.data.companyId
                  }
                })
              } else {
                this.$router.push({
                  query: {
                    page: 'status',
                    from: 'join'
                  }
                })
                this.getCompanyIdentityInfos()
              }
            })
              .catch(err => {
                if (err.data.code === 307) {
                  this.$router.push({
                    query: {
                      page: 'status',
                      from: 'join'
                    }
                  })
                }
              })
          }
        } else {
          this.createCompany()
        }
      })
    },
    joinCompany () {
      let formData = this.ruleForm
      let params = {
        real_name: formData.real_name,
        user_email: formData.user_email.trim(),
        user_position: formData.user_position,
        company_name: formData.company_name,
        position_type_id: formData.position_type_id,
        company_id: formData.id
      }
      hasApplayRecordApi().then(res => {
        // 当前公司已经申请过
        if (res.data.id) {
          this.editJoinCompany()
        } else {
          return applyCompanyApi(params).then(res => {
            if (res.data.emailStatus) {
              this.$router.push({
                query: {
                  page: 'submit',
                  from: 'join',
                  suffix: res.data.suffix,
                  companyId: res.data.companyId
                }
              })
            } else {
              this.$router.push({
                query: {
                  page: 'status',
                  from: 'join'
                }
              })
              this.getCompanyIdentityInfos()
            }
          })
            .catch(err => {
              if (err.data.code === 307) {
                this.$router.push({
                  query: {
                    page: 'status',
                    from: 'join'
                  }
                })
              }
            })
        }
      })
    },
    submit () {
      if (Reflect.has(this.$route.query, 'action')) {
        if (this.applyJoin) {
          this.editJoinCompany()
        } else {
          this.editCreateCompany()
        }
      } else {
        this.createCompany()
      }
    },
    getCompanyIdentityInfos () {
      let storage = this.ruleForm
      let applyJoin = this.applyJoin
      getCompanyIdentityInfosApi().then(res => {
        let companyInfo = res.data.data.companyInfo
        applyJoin = res.data.data.applyJoin
        // 重新创建一条记录

        this.ruleForm.real_name = storage.real_name || companyInfo.realName
        this.ruleForm.user_email = storage.user_email || companyInfo.userEmail
        this.ruleForm.user_position = storage.user_position || companyInfo.userPosition
        this.ruleForm.company_name = storage.company_name || companyInfo.companyName
        this.ruleForm = Object.assign(this.ruleForm, {
          id: companyInfo.id
        })
        this.authForm.company_name = companyInfo.companyName
        this.authForm.company_shortname = storage.company_shortname || companyInfo.companyShortname
        this.authForm.industry_id = storage.industry_id || companyInfo.industryId
        this.authForm.industry_id_name = storage.industry_id_name || companyInfo.industry
        this.authForm.financing = storage.financing || companyInfo.financing
        this.authForm.financingName = storage.financingName || companyInfo.financingInfo
        this.authForm.employees = storage.employees || companyInfo.employees
        this.authForm.employeesName = storage.employeesName || companyInfo.employeesInfo
        this.authForm.intro = storage.intro || companyInfo.intro
        this.authForm.logo = storage.logo || companyInfo.logoInfo
        this.authForm.id = companyInfo.id
        this.authForm.business_license = storage.business_license || companyInfo.businessLicenseInfo
        this.authForm.on_job = storage.on_job || companyInfo.onJobInfo
        this.companyInfo = companyInfo

        let callback = (msg) => {
          let companyInfo = msg.data.companyInfo
          let identityInfo = msg.data
          if (Reflect.has(msg.data, 'applyJoin') && msg.data.applyJoin) {
            this.$router.push({
              query: {
                page: 'status',
                from: 'join'
              }
            })
          } else {
            // 还没有创建公司信息
            if (!Reflect.has(companyInfo, 'id')) {
              this.$router.push({
                query: {}
              })
            } else {
              if (companyInfo.status === 1) {
                // wx.reLaunch({url: `${RECRUITER}index/index`})
              } else {
                if (companyInfo.status === 3) {
                  this.$router.push({ query: { page: 'submit' } })
                } else {
                  this.$router.push({
                    query: {
                      page: 'status',
                      from: 'company'
                    }
                  })
                }
              }
            }
          }
        }
        callback(res.data)

        if (applyJoin) {
          this.ruleForm.applyId = companyInfo.applyId
        }
        this.applyJoin = applyJoin
      })
    },
    submit2 () {
      let formData = this.authForm
      if (formData.logourl === '') {
        formData.logo = 0
      }
      let params = {
        company_name: formData.company_name,
        industry_id: formData.industry_id,
        financing: formData.financing,
        employees: formData.employees,
        company_shortname: formData.company_shortname,
        logo: formData.logo,
        intro: formData.intro,
        business_license: formData.business_license,
        on_job: formData.on_job,
        id: formData.id
      }
      perfectCompanyApi(params).then(res => {
        this.getCompanyIdentityInfos()
        this.$router.push({
          query: {
            page: 'status',
            from: 'company'
          }
        })
      })
        .catch(err => {
          if (err.data.code === 307) {
            this.$router.push({
              query: {
                page: 'status',
                from: 'company'
              }
            })
            return
          }

          if (err.data.code === 808) {
            this.$router.push({
              query: {
                page: 'status',
                from: 'company'
              }
            })
          }
        })
    },
    // 开始招聘
    startrecruit () {
      this.$router.push({ name: 'candidatetype' })
    },
    getlabellist () {
      getLabelFieldListApi().then((res) => {
        let arr = res.data.data
        arr.map((v, k) => {
          v.value = v.name
          v.id = v.labelId
        })
        this.industrylist = arr
      })
    }
  },
  mounted () {
    this.getCompanyIdentityInfos()
    this.getlabellist()
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
  padding-bottom: 30px;
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
    // max-height: 706px;
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
    .authtitle{
      font-size: 16px;
      height: 48px;
      line-height:24px;
      color: #333333;
    }
    .updata{
      margin: 36px 0 18px;
      .updata-item{
        height: 162px;
        margin-bottom: 34px;
        .title{
          font-size: 16px;
          color: #333333;
          font-weight: bold;
        }
        .content{
          height: 120px;
          margin-top: 18px;
          .con-l{
            float: left;
            width:172px;
            height:120px;
            cursor: pointer;
            border-radius:4px;
            .updataimg{
              float: left;
              width:172px;
              margin-top: 26px;
              height:120px;
              cursor: pointer;
              border-radius:4px;
            }
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
          .con-r{
            float: right;
            color: #A29CA6;
            font-size: 12px;
            height:90px;
            width: 216px;
            margin: 15px 0px 0px 30px;
            line-height: 18px;
          }
        }
      }
    }
    .company-logo{
      width:416px;
      height:98px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(222,218,224,1);
      .text{
        float: left;
        font-size: 14px;
        color: #333333;
        padding-left: 20px;
        line-height: 98px;
      }
      .logoimg{
        float: right;
        width:64px;
        height:64px;
        border-radius:4px;
        cursor: pointer;
        margin: 18px;
      }
      .logo{
        width:64px;
        height:64px;
        border-radius:4px;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .icontip{
      position: absolute;
      left: 94px;
      font-size: 14px;
      cursor: pointer;
      top: 0px;
      z-index: 999;
    }
    .icontipbox{
      position: absolute;
      left: 57px;
      cursor: pointer;
      top: -55px;
      padding: 11px 10px;
      line-height: 17px;
      width: 270px;
      color: #6D696E;
      font-size: 12px;
      height: 40px;
      background: #ffffff;
      -webkit-box-shadow: 0px 0px 30px 0px rgba(22, 39, 77, 0.07);
      box-shadow: 0px 0px 30px 0px rgba(22, 39, 77, 0.07);
    }
    .forward{
      width: 0;
      height: 0;
      position: absolute;
      border-width: 7px;
      top: 6px;
      left: 95px;
      border-style: solid;
      border-color: #fff transparent transparent transparent;
    }
    .intro{
      margin-bottom: -20px;
      textarea{
        width:376px;
        height:78px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 10px 20px;
        border:1px solid rgba(222,218,224,1);
        &::placeholder{
          color: #A29CA6;
          font-size: 14px;
        }
      }
    }
    .positon-box{
      position: absolute;
      right: 0px;
      width: 100%;
      z-index: 4;
      height: 51px;
      top: 0px;
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
            margin-left: 94px;
            border-radius: 50%;
            img{
              width: 100%;
              height: 100%;
            }
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
    .error-box{
      width: 100%;
      .error-head{
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        margin: 14px 0 12px;
        color: #333333;
        .title{
          float: left;
          font-size: 16px;
          font-weight: bold;
        }
        .chongxin{
          float: right;
          color: #652791;
          cursor: pointer;
        }
      }
      .error-item{
        width:418px;
        padding: 13px 19px 11px;
        background:rgba(255,252,240,1);
        border-radius:4px;
        color: #FF7F4C;
        line-height: 1.5;
      }
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
          img{
            width: 100%;
            height: 100%;
          }
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
        .default{
          background:rgba(232,233,235,1);
          color: #929292;
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
      text-align: center;
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
