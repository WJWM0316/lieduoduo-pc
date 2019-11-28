<template>
  <div class="companyDetail" v-if="companyInformation.id">
    <header class="header" :class="{ headerScrollY: isHeader }">
      <div class="inner inner_ScrollY">
        <div class="header-left">
          <div class="header-left-top" v-if="companyInformation.logoInfo">
            <img class="company-logo logo_ScrollY" :src = companyInformation.logoInfo.middleUrl />
            <div class="header-left-text text_ScrollY">
              <p class="header-companyShortname">{{companyInformation.companyShortname}}</p>
              <p class="header-financingInfo">{{companyInformation.financingInfo}}·{{companyInformation.employeesInfo}}·{{companyInformation.industry}}</p>
              <ul v-if="!isHeader">
                <li class="label" v-for="(item, index) in companyInformation.teamLabel" :key="index" v-if="index < 6">{{item.title}}</li>
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
              {{ online }}在线简历
            </p>
          </div>
          <div class="header-right-position">
            <p class="header-right-number" v-if="!isHeader">{{ companyInformation.numOfVisitors }}</p>
            <p class="header-right-text" v-if="!isHeader">浏览</p>
            <file @change="saveResume" @fail="saveResume" :Resume = myResume :showUploadDetails=false :showTips=true :islogin = islogin>
              <p class="header-right-resume" @click="resumeTo('annex')">
                <i class="iconfont" :class="{ 'icon-weibiaoti-': annex === '上传', 'icon-zhongxinshangchuan-':  annex === '更新'}"/>&nbsp;
                {{ annex }}附件简历
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
              >{{item.emolumentMin}}k-{{item.emolumentMax}}k·{{item.annualSalaryDesc}}</span>
              <p class="hot-text">
                {{item.province}}{{item.city}}{{item.district}} | {{item.workExperienceName}} |
                {{item.educationName}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="introduction-mian">
        <div class="introduction-inner">
          <div class="introduction-left">
            <div class="introduction-presentation">
              <p class="introduction-title">公司介绍</p>
              <block-overflow ref="blockOverflow" :text="companyInformation.intro"></block-overflow>
            </div>
            <div class="product" v-if="companyInformation.product">
              <p class="product-title">公司产品</p>
              <div class="product-box"  v-for="(item, index) in companyInformation.product" :key="index">
                <img :src="item.logoInfo.middleUrl" class="product-img"/>
                <div class="product-text">
                  <p class="product-text-top">{{ item.productName }} | {{ item.slogan }}</p>
                  <p class="product-text-middle">{{ item.lightspot }}</p>
                  <p>
                    <a class="product-text-buttom" :href="item.siteUrl" target="_blank">{{ item.siteUrl }}</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="address" v-if="companyInformation.address">
              <p class="address-title">公司地址</p>
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(item, index) in companyInformation.address" :key="index" :title="item.address" :name="index">
                  <template slot="title">
                    <p class="address-text">
                      <i class="iconfont icon-dizhi"></i>
                      <span>{{ item.address }}</span>
                    </p>
                  </template>
                  <img v-if="item.lat" :src="'https://apis.map.qq.com/ws/staticmap/v2/?size=750*147&center=' + item.lat + ',' + item.lng + '&zoom=15&key=TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG&maptype=roadmap&markers=size:large|color:blue|'+ item.lat + ',' + item.lng" @click="addressAlert"/>
                  <!-- <div id="map" v-if="activeName === index && !dialogVisible" @click="addressAlert"></div> -->
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="introduction-right">
            <guideLogin v-if="!hasLogin" class="guideLogin"></guideLogin>
            <div class="surroundings" v-if="companyInformation.albumInfo.length">
              <p class="surroundings-title">
                公司环境
              </p>
              <div class="surroundings-container">
                <div class="photo" ref="photo">
                  <img :src="item.middleUrl" v-for="(item, index) in companyInformation.albumInfo" :key="index"/>
                </div>
              </div>
            </div>
            <div class="recruitmentTeam">
              <p class="recruitmentTeam-title">招聘团队</p>
              <div class="recruitmentTeam-mian">
                <div class="recruitmentTeam-box" v-for="(item, index) in getCompanysTeamText" :key="index">
                  <img :src="item.avatar.smallUrl"/>
                  <div class="recruitmentTeam-text">
                    <p class="recruitmentTeam-text-top">{{ item.name }} | {{ item.position }}</p>
                    <p class="recruitmentTeam-text-buttom">{{item.positionName === 0 ? '正在招聘0个职位' : '正在招聘' + '&quot;' + item.positionName + '&quot;' + '等' + item.positionNum+ '个职位'}}</p>
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
      <el-dialog :visible.sync="dialogVisible" custom-class="bpp-dialog" width = "662px" modal-append-to-body append-to-body>
        <template slot="title">
          <p class="address-text">
            <i class="iconfont icon-dizhi"></i>
            <span v-if="dialogVisible && activeName !== ''">{{ companyInformation.address[activeName].address }}</span>
          </p>
        </template>
        <div id="map" v-if="dialogVisible" style="width: 662px; height: 450px;"></div>
      </el-dialog>
    </template>

      <companyRecruitment v-if="!activation"></companyRecruitment>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import guideLogin from '@/components/common/guideLogin'
import { TMap } from '@/util/TMap.js'
import appLinks from '@/components/common/appLinks'
import file from '@/components/common/upload/file'
import companyRecruitment from './components/Recruitment'
import blockOverflow from '@/components/common/blockOverflow/index'

import { saveResumeAttach } from 'API/resume.js'
import {
  getCompanyHotApi,
  getVkeyCompanyApi,
  getCompanysTeamApi
} from '@/api/company.js'

@Component({
  name: 'company-detail',
  components: {
    guideLogin,
    appLinks,
    file,
    companyRecruitment,
    blockOverflow
  },
  computed: {
    ...mapState({
      myResume: state => state.resume.myResume,
      roleInfos: state => state.roleInfos,
      userInfo: state => state.userInfo,
      hasLogin: state => state.hasLogin
    })
  },
  watch: {
    activeName (val) {
      console.log(val, typeof val, 111)
    }
  }
})
export default class companyDetail extends Vue {
  activeName = 0 // mapType
  infos = {}
  HotPositionList = {} // 热门职位列表
  companyInformation = {}
  activation = true
  online = '填写' // 在线简历显示文案
  annex = '上传' // 附件简历显示文案
  dialogVisible = false // 地图弹窗
  getCompanysTeamText = {} // 招聘团队
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
  async getCompany () {
    let data = {
      vkey: this.$route.query.vkey
    }
    await getVkeyCompanyApi(data).then(res => {
      this.companyInformation = res.data.data
      // 遍历地址，没有http协议则加上
      this.companyInformation.product.forEach(function (item, index) {
        item.siteUrl = item.siteUrl.indexOf('http') !== -1 ? item.siteUrl : 'http://' + item.siteUrl
      })
      this.$nextTick(() => {
        this.$refs.blockOverflow.updateTextHeigth()
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
    getCompanysTeamApi(data)
      .then(res => {
        this.getCompanysTeamText = res.data.data
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

  resumeTo (type) {
    // 是否已经登陆
    if (!this.hasLogin && type !== 'x') {
      console.log(110)
      return this.$router.push({
        name: 'login',
        query: {
          type: 'msgLogin'
        }
      })
    } else if (this.hasLogin) { // 已经登录
      if (!this.roleInfos.isJobhunter) { // 判断有没有走完简历四步
        this.online = '填写'
      } else {
        this.online = this.myResume.resumeCompletePercentage >= 0.9 ? '更新' : '完善'
        if (JSON.stringify(this.myResume.resumeAttach) !== '{}') {
          this.annex = '更新'
        }
      }
    }

    if (type === 'online') {
      if (!this.roleInfos.isJobhunter) { return this.$router.push({ name: 'createUser' }) }
      // 跳我的简历
      return this.$router.push({ name: 'cresume' })
    } else if (type === 'annex') {
      // 这里执行 上传/更新附件简历弹窗
      this.islogin = true
    }
  }

  toJobDetails (item, index) {
    this.$router.push({
      name: 'positionDetail',
      query: {
        positionId: item.id
      }
    })
  }
  getMapLocation (lat, lng) {
    console.log(document.getElementById('map'))
    TMap('TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG').then(qq => {
      this.$nextTick(() => {
        var myLatlng = new qq.maps.LatLng(lat, lng)
        var myOptions = {
          zoom: 15,
          center: myLatlng
        }
        var map = new qq.maps.Map(document.getElementById('map'), myOptions)
        var marker = new qq.maps.Marker({
          position: myLatlng,
          animation: qq.maps.MarkerAnimation.DROP,
          map: map
        })
      })
    })
  }
  addressAlert () {
    this.dialogVisible = true
    // this.mapType()
    this.$nextTick(() => {
      this.getMapLocation(this.companyInformation.address[this.activeName].lat, this.companyInformation.address[this.activeName].lng)
    })
  }
  // photoAnimation () {
  //   let translateWidths = 0
  //   let timers = function () {

  //   }
  //   let timer = function () {
  //     translateWidths = translateWidths + 298
  //     if (translateWidths / 298 > this.companyInformation.albumInfo.middleUrl.length) {
  //       translateWidths = 0
  //     }
  //     setInterval(() => {
  //       timer()
  //       console.log(1)
  //       this.$nextTick(function () {
  //         this.$refs.photo.style.transform = `translate3d(-${translateWidths}px, 0, 0)`
  //       })
  //     }, 1000)
  //   }
  // }

  // introductionFun () {

  // }
  // 保存简历附件
  saveResume (attach) {
    if (!attach) return this.$message.error('上传附件简历失败')
    saveResumeAttach({ attach_resume: attach.id, attach_name: attach.fileName }).then(({ data }) => {
      if (data.httpStatus === 200) {
        this.$message.success('上传附件简历成功')
        this.$store.commit('overwriteResume', {
          resumeAttach: attach
        })
      }
    })
  }
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.getCompanysTeam()
    this.getCompanyHot()
    this.getCompany()
    // .then(() => {
    //   this.mapType()
    // })
  }
  // updated () {
  //   this.resumeTo('x')
  //   this.$nextTick(() => {
  //     if(this.$refs.text.clientHeight > 157) {
  //       this.isIntroductionButtom = true
  //     } else {
  //       this.isIntroductionButtom = false
  //     }
  //   })
  // }
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
  background: $font-color-temp3;

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

        .company-logo{
          width: 106px;
          height: 106px;
          border-radius: 16px;
        }

        .header-left-text{
          margin: 10px 0 0 30px;
          height: 100px;
          @include flex-justify-between;
          @include flex-direction-column;

          .header-companyShortname{
            font-size: 32px;
            color: #FFFFFF;
            font-weight: 500;
          }
          .header-financingInfo{
            font-size: 14px;
            font-weight: 400;
            color: #FFFFFF;
          }
          .label{
            display: inline-block;
            padding: 0 15px;
            min-width: 80px;
            height: 24px;
            box-sizing: $sizing;
            border: 1px solid $font-color-temp4;
            border-radius: 18px;
            text-align: center;
            vertical-align: middle;
            margin-right: 14px;
            color: #FFFFFF;
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
        //点击激活样式
        .activation{
          color: $font-color-temp4;
          font-weight: 500;
          border-bottom: 4px solid $font-color-temp4;
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
        }
        .header-right-text{
          font-size: 14px;
          font-weight: 400;
          color: #FFFFFF;
        }
        .header-right-resume{
          color: $font-color-temp1;
          font-size: 14px;
          font-weight: 400;
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
  z-index: 1111;
  .inner_ScrollY{
    height: 135px;
    padding-top: 21px;
    .logo_ScrollY{
      width: 60px !important;
      height: 60px !important;
    }
    .text_ScrollY{
      height: 52px !important;
      .companyShortname{
        font-size: 28px;
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
        padding: 24px 24px;
        width: 390px;
        height: 110px;
        background: #FFFFFF;
        box-sizing: $sizing;
        border-radius:4px;
        cursor: pointer;
        display: inline-block;
        margin-left: 15px;

        .hot-positionName{
          font-size: 16px;
          font-weight: 500;
          color: $font-color-3;
        }
        .hot-annualSalaryDesc{
          font-size: 18px;
          font-weight: 500;
          color: $font-color-temp1;
          display: block;
          float: right;
        }
        .hot-text{
          font-size: 14px;
          font-weight: 400;
          color: $font-color-temp2;
          margin-top: 20px;
        }
      }
      .hotPosition_box_one{ // 解决第一个盒子左边距
        margin-left: 0;
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
      padding: 90px 0 40px 0;
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
        margin-bottom: 60px;

        .product-title{
          @extend %introductionTitle;
        }

        .product-box{
          display: flex;
          margin-bottom: 24px;

          .product-img{
          width: 77px;
          height: 77px;
          border-radius: 8px;
          }
          .product-text{
            margin: 6px 0 0 20px;
            height: 66px;
            @include flex-justify-between;
            @include flex-direction-column;
            font-weight: 400;

            .product-text-top{
              font-size: 14px;
              color: $font-color-3;
            }
            .product-text-middle{
              font-size: 12px;
              color: $font-color-6;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .product-text-buttom{
              color: $font-color-2;
              font-size: 12px;
            }
          }
        }
      }

      .address{
        width: 750px;
        img{
          cursor: pointer;
        }
        .address-title{
          @extend %introductionTitle;
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
        .surroundings-title{
          @extend %introductionTitle;
        }
        .surroundings-container{
          width: 298px;
          height: 160px;
          overflow: hidden;
          .photo{
            @include clearfix;
            img{
              width: 298px;
              height: 147px;
              display: block;
              float: left;
            }
          }
        }
      }
      .recruitmentTeam{
        margin-top: 50px;
        .recruitmentTeam-title{
          @extend %introductionTitle;
        }
        .recruitmentTeam-box{
          height: 99px;
          display: flex;
          @include flex-v-center;
          img{
            width: 66px;
            height: 66px;
            border-radius: 50%;
          }
          .recruitmentTeam-text{
            height: 44px;
            margin-left: 14px;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;

            .recruitmentTeam-text-top{
              color: $font-color-3;
            }
            .recruitmentTeam-text-buttom{
              margin-top: 4px;
              color: $font-color-6;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
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
