<template>
  <div class="companyDetail" v-if="companyInformation.id">
    <header class="header" :class="{ headerScrollY: isHeader }">
      <div class="inner inner_ScrollY">
        <div class="header-left">
          <div class="header-left-top" v-if="companyInformation.logoInfo">
            <div class="company-logo-wrap logo_ScrollY">
              <img class="company-logo" :src = companyInformation.logoInfo.middleUrl />
            </div>
            <div class="header-left-text text_ScrollY">
              <p class="header-companyShortname companyShortname_ScrollY">{{companyInformation.companyShortname}}</p>
              <p class="header-financingInfo financingInfo_ScrollY">{{companyInformation.financingInfo}}·{{companyInformation.employeesInfo}}·{{companyInformation.industry}}</p>
              <ul v-if="!isHeader">
                <li class="label" v-for="(item, index) in companyInformation.teamLabel" :key="index">{{item.title}}</li>
              </ul>
            </div>
          </div>
          <div class="header-left-buttom">
            <div class="header-left-Introduction" :class="{ activation: activation }" @click="activationType">公司简介</div>
            <div class="header-left-Introduction" :class="{ activation: !activation }" @click="activationType">招聘职位&nbsp;&nbsp;({{ companyInformation.positionNum }})</div>
          </div>
        </div>
        <div class="header-right right_ScrollY">
          <div class="header-right-position">
            <p class="header-right-number"  v-if="!isHeader">{{companyInformation.positionNum}}</p>
            <p class="header-right-text"  v-if="!isHeader">在招职位</p>
            <p class="header-right-resume" @click="resumeTo('online')">
              <i class="iconfont icon-ziwomiaoshu-"/>&nbsp;
              {{ this.hasLogin ? (this.myResume.resumeCompletePercentage >= 0.9 ? '更新' : '完善' ) : '填写'}}在线简历
            </p>
          </div>
          <div class="header-right-position">
            <p class="header-right-number" v-if="!isHeader">{{ companyInformation.numOfVisitors }}</p>
            <p class="header-right-text" v-if="!isHeader">浏览</p>
            <file v-if="annexing !== ''" @change="saveResume" @before="uploading = true" @fail="uploadResumeFile"  :showUploadDetails=false :showTips=true :islogin = islogin>
              <p class="header-right-resume" @click="resumeTo('annex')">
                <template v-if="uploading">
                  <i class="el-icon-loading"/>
                </template>
                <i v-else class="iconfont" :class="{ 'icon-weibiaoti-': annexing === '上传', 'icon-zhongxinshangchuan-':  annexing === '更新'}"/>&nbsp;
                {{ annexing }}附件简历
              </p>
            </file>
          </div>
        </div>
      </div>
    </header>
    <div :class="{ headerScrollY_box: isHeader }"></div>

    <template v-if="activation">
      <div class="hotPosition">
        <div class="hotPosition-inner">
          <p class="hotPosition-title">热招职位：</p>
          <div class="hotPosition-buttom">
            <div class="hotPosition-box" :class="{ hotPosition_box_one: index === 0 }" v-for="(item, index) in HotPositionList" :key="index" @click="toJobDetails(item,index)">
              <span class="hot-positionName">{{item.positionName}}</span>
              <span
                class="hot-annualSalaryDesc"
              >{{item.emolumentMin}}k-{{item.emolumentMax}}k{{ item.annualSalary > 12 ? '·' + item.annualSalaryDesc : ''}}</span>
              <p class="hot-text">
                {{item.city}}{{item.district}} | {{item.workExperienceName}} |
                {{item.educationName}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="introduction-mian">
        <div class="introduction-inner">
          <div class="introduction-left">
            <div class="introduction-presentation" v-if="companyInformation.intro">
              <p class="introduction-title">公司介绍</p>
              <block-overflow ref="blockOverflow" :text="companyInformation.intro"></block-overflow>
            </div>
            <div class="product" v-if="companyInformation.product && companyInformation.product.length">
              <p class="product-title">公司产品</p>
              <div class="product-box"  v-for="(item, index) in companyInformation.product" :key="index">
                <div class="product-img-wrap">
                  <img :src="item.logoInfo.middleUrl" class="product-img"/>
                </div>
                <div class="product-text">
                  <p class="product-text-top">{{ item.productName }} | {{ item.slogan }}</p>
                  <p class="product-text-middle">{{ item.lightspot }}</p>
                  <p v-if="item.siteUrl">
                    <a class="product-text-buttom" :href="item.siteUrl" target="_blank">{{ item.siteUrl }}</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="address" v-if="companyInformation.address && companyInformation.address.length">
              <p class="address-title">公司地址</p>
              <map-pop :companyAddress = "companyInformation.address"></map-pop>
            </div>
          </div>
          <div class="introduction-right">
            <guideLogin v-if="!hasLogin" class="guideLogin"></guideLogin>
            <div class="surroundings" v-if="companyInformation.albumInfo.length">
              <p class="surroundings-title">
                公司环境
              </p>
              <div class="surroundings-container">
                <el-carousel v-if="companyInformation.albumInfo.length > 1" indicator-position="none" height="147px">
                  <el-carousel-item v-for="(item, index) in companyInformation.albumInfo" :key="index">
                    <div class="el-carousel-surroundings" :style="'background: url(' + item.middleUrl + ')'">
                    </div>
                  </el-carousel-item>
                </el-carousel>
                <div  v-if="companyInformation.albumInfo.length === 1" class="surroundings-container" :style="'background: url(' + companyInformation.albumInfo[0].middleUrl + ')'"></div>
              </div>
            </div>
            <div :class="['recruitmentTeam', companyInformation.albumInfo.length === 0 ? 'resetmar' : '']">
              <p class="recruitmentTeam-title">招聘团队</p>
              <div class="recruitmentTeam-mian">
                <div class="recruitmentTeam-box" :key="index" v-for="(item, index) in getCompanysTeamText" :class="{'last-item-team': index === getCompanysTeamText.length - 1}">
                  <img :src="item.avatar.smallUrl"/>
                  <div class="recruitmentTeam-text">
                    <div class="recruitmentTeam-text-top">
                      <p class="admin-detail">{{ item.name }} | {{ item.position }}</p>                                              
                      <el-popover
                        placement="bottom-end"
                        popper-class="user-infos"
                        :open-delay="100"
                        trigger="hover">
                        <div class="box">
                          <div class="describe">
                            “Hi，对我发布的职位感兴趣？<strong>用微信扫描二维码</strong>，和TA约聊吧。”
                          </div>
                          <div class="qr-code"> <img :src="item.qrCode" /> </div>
                        </div>
                        <div slot="reference"><i class="icon iconfont icon-duihua_huaban"></i></div>           
                      </el-popover>
                    </div>
                    <div class="recruitmentTeam-text-buttom">
                      <span>{{ '正在招聘' }}</span>
                      <span class="recruitmentTeam-positionName">{{ item.positionName === 0 ? item.positionName : '&quot;' + item.positionName + '&quot;' }}</span>
                      <span>{{ item.positionName === 0 ? '个职位' : '等' + item.positionNum + '个职位' }}</span>
                    </div>
                  </div>
                </div>
                <el-button @click="activationType" class="recruitmentTeam-buttom" plain>
                  查看所有Boss的在招职位 <i class="iconfont icon-right"></i>
                </el-button>
              </div>
            </div>
          </div>
          <appLinks class="appLinks"></appLinks>
        </div>
      </div>
    </template>
      <login ref="loginPop"></login>
      <companyRecruitment v-if="!activation"></companyRecruitment>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import guideLogin from '@/components/common/guideLogin'
import appLinks from '@/components/common/appLinks'
import file from '@/components/common/upload/file'
import companyRecruitment from './components/Recruitment'
import blockOverflow from '@/components/common/blockOverflow/index'
import mapPop from '@/components/mapPop/index'
import login from '@/components/common/loginPop/index'

import { saveResumeAttach } from 'API/resume.js'
// import { getRecruiterQrcodeApi } from 'API/qrcode.js'

import {
  getCompanyHotApi,
  getVkeyCompanyApi,
  getCompanysTeamApi
} from '@/api/company.js'

import { app_qrcode } from 'IMAGES/image'

@Component({
  name: 'company-detail',
  components: {
    guideLogin,
    mapPop,
    appLinks,
    file,
    companyRecruitment,
    blockOverflow,
    login
  },
  computed: {
    ...mapState({
      myResume: state => state.resume.myResume,
      roleInfos: state => state.roleInfos,
      userInfo: state => state.userInfo,
      hasLogin: state => state.hasLogin
    }),
    annexing () {
      if (this.myResume && this.myResume.resumeAttach) {
        this.annex = '更新'
      } else {
        this.annex = '上传'
      }
      return this.annex
    }
  }
})
export default class companyDetail extends Vue {
  activeName = 0 // mapType
  infos = {}
  HotPositionList = {} // 热门职位列表
  companyInformation = {}
  activation = true
  annex = '' // 附件简历显示文案
  uploading = false // 附件上传loading
  dialogVisible = false // 地图弹窗
  getCompanysTeamText = [] // 招聘团队
  islogin = false // 子组件是否登陆弹窗
  isIntroduction_text = true // 显示文案切换按钮
  isHeader = false // 是否显示顶部悬浮栏

  // 监听滚动
  handleScroll () {
    let scrollY = window.scrollY
    if (scrollY > 260) {
      this.isHeader = true
    } else {
      this.isHeader = false
    }
  }
  activationType () {
    this.activation = !this.activation
  }
  // 获取公司信息
  getCompany () {
    let data = {
      vkey: this.$route.query.vkey
    }
    getVkeyCompanyApi(data).then(res => {
      this.companyInformation = res.data.data
      // 遍历地址，没有http协议则加上
      this.companyInformation.product.forEach(function (item, index) {
        item.siteUrl = !item.siteUrl ? '' : item.siteUrl.indexOf('http') !== -1 ? item.siteUrl : 'http://' + item.siteUrl
      })
      this.$nextTick(() => {
        if (this.$refs.blockOverflow) this.$refs.blockOverflow.updateTextHeigth()
      })
    })
  }
  // 获取招聘团队
  getCompanysTeam () {
    let data = {
      vkey: this.$route.query.vkey,
      page: 1,
      count: 3
    }
    getCompanysTeamApi(data).then(({ data }) => {
      let getCompanysTeamText = data.data
      getCompanysTeamText.map(v => {
        v.qrCode = app_qrcode
        v.show = false
      })
      this.getCompanysTeamText = getCompanysTeamText
    })
  }
  // 获取公司热门职位
  getCompanyHot () {
    let data = {
      vkey: this.$route.query.vkey,
      page: 1,
      count: 3
    }
    getCompanyHotApi(data).then(res => {
      this.HotPositionList = res.data.data
    })
  }

  resumeTo (type = 'x') {
    // 是否已经登陆
    if (!this.hasLogin && type !== 'x') {
      this.$refs.loginPop.showLoginPop = true
    }
    if (this.hasLogin && type === 'online') {
      // 跳转简历四部
      if (!this.roleInfos.isJobhunter) { return this.$router.push({ name: 'createUser' }) }
      // 跳我的简历
      return this.$router.push({ name: 'cresume' })
    } else if (this.hasLogin && type === 'annex') {
      if (!this.roleInfos.isJobhunter) {
        return this.$router.push({ name: 'createUser' })
      } else {
        // 这里执行 上传/更新附件简历弹窗
        this.islogin = true
      }
    }
  }

  toJobDetails (item, index) {
    let toPositionDetail = this.$router.resolve({
      name: 'positionDetail',
      query: {
        positionId: item.id
      }
    })
    window.open(toPositionDetail.href, '_blank')
  }
  // 保存简历附件
  saveResume (attach) {
    saveResumeAttach({ attach_resume: attach.id, attach_name: attach.fileName }).then(({ data }) => {
      this.uploading = false
      if (data.httpStatus === 200) {
        this.$message.success('上传附件简历成功')
        this.$store.commit('overwriteResume', {
          resumeAttach: attach
        })
      }
    }).catch(() => {
      this.uploading = false
    })
  }
  uploadResumeFile () {
    this.uploading = false
    this.$message.error('上传附件简历失败')
  }
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.getCompanysTeam()
    this.getCompanyHot()
    this.getCompany()
  }
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
//公共样式继承
%wrap-width {
  width: 100%;
  box-sizing: border-box;
}

%introductionTitle{
  font-size: 16px;
  font-weight: 500;
  color: $font-color-2;
  margin-bottom: 32px;
  position: relative;

  &::after{
    display: inline-block;
    content: '';
    width: 22px;
    height: 2px;
    background: $main-color-1;
    position: absolute;
    left: 0;
    top: 30px;
  }
}

$sizing: border-box;

.header {
  @extend %wrap-width;
  background: $bg-color-12;

  .inner {
    width: $page-width;
    margin: 0 auto;
    @include flex-justify-between;
    height: 210px;
    box-sizing: $sizing;
    padding-top: 30px;

    .header-left{
      @include flex-direction-column;
      @include flex-justify-between;

      .header-left-top{
        display: flex;
        @include flex-v-center;
        .company-logo-wrap{
          @include img-radius(106px, 106px, 16px, #fff)
        }

        .header-left-text{
          margin: 10px 0 0 30px;
          @include flex-direction-column;
          justify-content: center;
          overflow: hidden;
          height: 96px;
          width: 720px;

          .header-companyShortname{
            font-size: 32px;
            color: #FFFFFF;
            font-weight: 500;
            margin-bottom: 12px;
            line-height: 32px;
          }
          .header-financingInfo{
            font-size: 14px;
            font-weight: 400;
            color: #FFFFFF;
            margin-bottom: 14px;
            line-height: 14px;
          }
          .label{
            display: inline-block;
            padding: 0 15px;
            min-width: 80px;
            height: 24px;
            box-sizing: $sizing;
            border: 1px solid $main-color-2;
            border-radius: 18px;
            text-align: center;
            vertical-align: middle;
            margin-right: 14px;
            color: $main-color-2;
            line-height: 24px;
          }
        }
      }

      .header-left-buttom{
        width: 240px;
        color: #FFFFFF;
        @include flex-justify-between;

        .header-left-Introduction{
          height: 30px;
          font-size: 16px;
          font-weight: 400;
          text-align: center;
          cursor: pointer;
        }
        .header-left-Introduction:hover {
          color: $main-color-2;
        }
        //点击激活样式
        .activation{
          color: $main-color-2;
          font-weight: 500;
          border-bottom: 4px solid $main-color-2;
        }
      }

    }
    .header-right{
      width: 270px;
      height: 96px;
      @include flex-justify-between;
      text-align: right;

      .header-right-position{
        height: 96px;
        @include flex-justify-between;
        @include flex-direction-column;

        .header-right-number{
          color: #FFFFFF;
          font-size: 36px;
          font-weight: 500;
          line-height: 36px;
        }
        .header-right-text{
          font-size: 14px;
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 6px;
          line-height:14px;
        }
        .header-right-resume{
          color: $sub-color-1;
          font-size: 14px;
          font-weight: 400;
          line-height:20px;
          cursor: pointer;
          i{
            font-size: 14px;
          }
        }
      }
    }
  }
}
.headerScrollY{
  height: 135px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  animation: mymove .3s ease-in forwards;
  .inner_ScrollY{
    height: 135px;
    padding-top: 21px;
    .logo_ScrollY{
      width: 60px !important;
      height: 60px !important;
    }
    .text_ScrollY{
      height: 52px !important;
      margin-top: 4px !important;
      .companyShortname{
        font-size: 28px;
      }
      .companyShortname_ScrollY{
        font-size: 28px;
        margin-bottom: 6px !important;
        line-height: 32px;
      }
      .financingInfo_ScrollY{
        margin-bottom: 0 !important;
      }
    }
    .right_ScrollY{
      padding-top: 20px;
    }
  }
}
@keyframes mymove
{
from {top:-135px;}
to {top:0px;}
}
.headerScrollY_box{
  height: 210px;
}
.hotPosition {
  @extend %wrap-width;
  background: #F8FAFA;

  .hotPosition-inner {
    width: $page-width;
    margin: 0 auto;
    padding: 32px 0;

    .hotPosition-title {
      font-size: 16px;
      color: $font-color-3;
      margin-bottom: 20px;
      font-weight:400;
    }
    .hotPosition-buttom{

      .hotPosition-box{
        vertical-align: top;
        padding: 24px 24px;
        width: 390px;
        height: 110px;
        background: #FFFFFF;
        box-sizing: $sizing;
        border-radius:4px;
        transition: transform 300ms, box-shadow 300ms;
        cursor: pointer;
        display: inline-block;
        margin-left: 15px;
        box-shadow: $shadow-1;
        .hot-positionName{
          display: inline-block;
          width: 190px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
          color: $font-color-3;
          font-weight: bold;
        }
        .hot-positionName:hover {
          color: $main-color-1;
        }
        .hot-annualSalaryDesc{
          font-size: 18px;
          font-weight: bold;
          color: $sub-color-1;
          display: block;
          float: right;
        }
        .hot-text{
          font-size: 14px;
          font-weight: 400;
          color: $font-color-6;
          margin-top: 20px;
        }
      }
      .hotPosition_box_one{ // 解决第一个盒子左边距
        margin-left: 0;
      }
      .hotPosition-box:hover {
        transform: translateY(-5px);
        box-shadow: $shadow-2;
      }
    }
  }
}
.introduction-mian{
  @extend %wrap-width;
  background: #FFFFFF;

  .introduction-inner{
    width: $page-width;
    margin: 0 auto;
    padding: 40px 0;
    display: flex;
    flex-wrap: wrap;
    .appLinks{
      box-sizing: border-box;
      padding: 90px 0 0 0;
      & /deep/ .show-more-btn{
        background: #FFFFFF;
      }
    }

    .introduction-left{
      border-right: 1px solid $border-color-1;
      width: 850px;
      padding-right: 100px;
      box-sizing: $sizing;

      .introduction-presentation{
        margin-bottom: 60px;
        position: relative;

        .introduction-title{
          @extend %introductionTitle;
        }
      }
      .product{
        width: 750px;
        margin-bottom: 60px;

        .product-title{
          @extend %introductionTitle;
        }

        .product-box{
          min-height: 77px;
          margin-bottom: 30px;
          position: relative;
          display: flex;
          justify-content: center;
          @include flex-direction-column;

          .product-img-wrap{
            border: 1px solid $border-color-8;
            @include img-radius(77px, 77px, 8px, #fff);
            position: absolute;
            left: 0;
            top: 0;
          }
          .product-text{
            font-weight: 400;
            margin-left: 97px;
            display: flex;
            @include flex-direction-column;

            .product-text-top{
              font-size: 14px;
              color: $font-color-3;
              line-height:18px;
              margin-bottom: 10px;
            }
            .product-text-middle{
              font-size: 12px;
              color: $font-color-6;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 18px;
              max-height: 36px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .product-text-buttom{
              margin-top: 10px;
              color: $font-color-2;
              font-size: 12px;
              line-height:12px;
              display: block;
            }
          }
        }
      }

      .address{
        width: 750px;
        .address-title{
          @extend %introductionTitle;
        }
      }
    }
    .introduction-right{
      padding-left: 50px;
      width: 298px;
      display: inline-block;
      .guideLogin{
        margin-bottom: 50px;
      }
      .surroundings{
        margin-bottom: 50px;
        .surroundings-title{
          @extend %introductionTitle;
        }
        .surroundings-container{
          width: 298px;
          height: 160px;
          overflow: hidden;
          .el-carousel-surroundings{
            width: 298px;
            height: 160px;
          }
        }
      }
      .recruitmentTeam{

        .recruitmentTeam-title{
          @extend %introductionTitle;
        }
        .recruitmentTeam-box{
					padding: 19px 0 20px 0;
          height: 60px;
					cursor: pointer;
					/*padding-left: 74px;*/
					position: relative;
          @include flex-v-center;
          border-bottom: 1px solid $--input-disabled-border;
          img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            position: relative;
          }
          .el-popover__reference{
            display: inline-block;
            vertical-align: middle;
            margin-left: 6px;
          }
          .icon-duihua_huaban {
            color: #00C4CD;
            font-size: 14px;
          }
          .recruitmentTeam-text{
            height: 44px;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            padding-left: 14px;
						/*width: 100%;*/
            .recruitmentTeam-text-top{
              color: $font-color-3;
              white-space: nowrap;
              text-overflow: ellipsis;
              max-width: 192px;
            }
            .admin-detail{
              color: $font-color-3;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 192px;
              display: inline-block;
              vertical-align: middle
            }
            .recruitmentTeam-text-buttom{
              width: 100%;
              margin-top: 4px;
              color: $font-color-6;
              // span{
              //   vertical-align: middle;
              // }
              .recruitmentTeam-positionName{
                display: inline-block;
                max-width: 86px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                vertical-align: middle;
              }
            }
          }
        }
        .last-item-team{
          border-bottom: 0 !important;
        }
        .recruitmentTeam-buttom{
          margin-top: 10px;
          width: 280px;
          height: 37px;
          border: 1px solid $border-color-1;
          color: $border-color-5;
          border-radius:2px;
          font-size: 14px;
          i{
            font-size: 14px;
          }
        }
      }
      .resetmar{
        margin-top: 0px;
      }
    }
  }
}
.address-text{
  font-size: 14px;
  color: $font-color-2;
  font-weight:400;
  i{
    font-size: 15px;
    color: $font-color-10;
    display: inline-block;
    margin: 0 7px 0 15px;
  }
}
</style>
<style lang="scss">
.user-infos{
  padding: 13px 17px;
  .box {
    display: flex;
    align-items: center;
  }
  .describe {
    width:151px;
    font-size:12px;
    font-weight:400;
    color:$font-color-3;
    line-height:16px;
    margin-right: 5px;
  }
  .qr-code{
    width: 76px;
    height: 76px;
  }
  strong{
    color: $nav-color-hover;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
