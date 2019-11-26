<template>
  <div class="companyDetail">
    <header class="header">
      <div class="inner">
        <div class="header-left">
          <div class="header-left-top" v-if="companyInformation.logoInfo">
            <img class="company-logo" :src = companyInformation.logoInfo.middleUrl />
            <div class="header-left-text">
              <p class="header-companyShortname">{{companyInformation.companyShortname}}</p>
              <p class="header-financingInfo">{{companyInformation.financingInfo}}·{{companyInformation.employeesInfo}}·{{companyInformation.industry}}</p>
              <ul>
                <li class="label" v-for="(item, index) in companyInformation.album" :key="index">{{item.id}}</li>
              </ul>
            </div>
          </div>
          <div class="header-left-buttom">
            <div class="header-left-Introduction" :class="{ activation: activation }" @click="activationType">公司简介</div>
            <div class="header-left-Introduction" :class="{ activation: !activation }" @click="activationType">招聘职位&nbsp;&nbsp;({{ companyInformation.positionNum }})</div>
          </div>
        </div>
        <div class="header-right">
          <div class="header-right-position">
            <p class="header-right-number">{{companyInformation.positionNum}}</p>
            <p class="header-right-text">在招职位</p>
            <p class="header-right-resume" @click="resumeTo('online')">
              <i class="iconfont icon-ziwomiaoshu-"/>&nbsp;
              {{ online }}在线简历
            </p>
          </div>
          <div class="header-right-position">
            <p class="header-right-number">{{ companyInformation.numOfVisitors }}</p>
            <p class="header-right-text">浏览</p>
            <p class="header-right-resume" @click="resumeTo('annex')">
              <i class="iconfont icon-ziwomiaoshu-"/>&nbsp;
              {{ annex }}附件简历
            </p>
          </div>
        </div>
      </div>
    </header>

    <template v-if="activation">
      <div class="hotPosition">
        <div class="hotPosition-inner">
          <p class="hotPosition-title">热招职位：</p>
          <div class="hotPosition-buttom">
            <div class="hotPosition-box" v-for="(item, index) in HotPositionList" :key="index" @click="toJobDetails(item,index)">
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
              <p class="introduction-text" :class="{ introduction_viewAll: viewAllText }" v-html="companyInformation.intro"></p>
              <el-button type="text" class="introduction-left-buttom" @click="viewAll">{{ this.viewAllText ? '收起' :'查看全部'}}</el-button>
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
            <div class="address">
              <p class="address-title">公司地址</p>
              <el-collapse v-model="activeName" accordion @change="mapType">
                <el-collapse-item v-for="(item, index) in companyInformation.address" :key="index" :title="item.address" :name="index+''">
                  <template slot="title">
                    <p class="address-text">
                      <i class="iconfont icon-dizhi"></i>
                      <span>{{ item.address }}</span>
                    </p>
                  </template>
                  <div id="map" v-if="activeName === index+''"></div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="introduction-right">
            <guideLogin v-if="this.$store.state.userInfo.id === undefined" class="guideLogin"></guideLogin>
            <div class="surroundings">
              <p class="surroundings-title">
                公司环境
              </p>
              <div class="surroundings-container">
                <div class="photo" ref="photo">
                  <img :src="item.middleUrl" v-for="(item, index) in companyInformation.albumInfo" :key="index"/>
                  <img :src="companyInformation.albumInfo[0].middleUrl" />
                </div>
              </div>
            </div>
            <div class="recruitmentTeam">
              <p class="recruitmentTeam-title">招聘团队</p>
              <div class="recruitmentTeam-mian">
                <div class="recruitmentTeam-box">
                  <img/>
                  <p>{{  }}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="!activation">
      <div></div>
    </template>
    <!-- <mapSearch :componyId = jia></mapSearch> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import guideLogin from '@/components/common/guideLogin'
import { TMap } from '@/util/TMap.js'

import getRecruitersListApi from '@/api/register.js'

import {
  getCompanyHotApi,
  getCompanyApi
} from '@/api/company.js'

@Component({
  name: 'company-detail',
  components: {
    // mapSearch
    guideLogin
  }
})
export default class companyDetail extends Vue {
  activeName = '0' // mapType
  infos = {}
  HotPositionList = {} // 热门职位列表
  companyInformation = {}
  activation = true
  myResume = this.$store.state.resume.myResume
  isFourResume = this.$store.state.resume.isFourResume
  online = '填写' // 在线简历显示文案
  annex = '上传' // 附件简历显示文案
  viewAllText = false // 公司介绍文案隐藏

  mapType () {
    this.$nextTick(function () {
      const activeName = parseInt(this.activeName)
      this.getMapLocation(this.companyInformation.address[activeName].lat, this.companyInformation.address[activeName].lng)
    })
  }

  viewAll () {
    this.viewAllText = !this.viewAllText
  }

  activationType () {
    this.activation = !this.activation
  }

  // 获取公司信息
  getCompany () {
    let data = {
      // id: this.$router.query.companyId,
      id: 1346,
      sCode: ''
    }
    getCompanyApi(data).then(res => {
      this.companyInformation = res.data.data
      this.companyInformation.intro = this.companyInformation.intro.replace('。', '。<br/> <br/>')
      // 遍历地址，没有http协议则加上
      this.companyInformation.product.forEach(function (item, index) {
        item.siteUrl = item.siteUrl.indexOf('http') !== -1 ? item.siteUrl : 'http://' + item.siteUrl
      })
    })
  }
  // 获取招聘团队
  getRecruitersList () {
    let param = {
      page: 1,
      count: 3
    }
    getRecruitersListApi(this.$router.companyId, param).then(res => {
      console.log(res)
    })
  }

  // 获取公司热门职位
  getCompanyHot () {
    let data = {
      // companyId: this.$router.query.companyId,
      companyId: 1346,
      page: 1,
      count: 3
    }
    getCompanyHotApi(data).then(res => {
      this.HotPositionList = res.data.data
    })
  }

  resumeTo (type) {
    // 是否已经登陆
    if (this.$store.state.userInfo.id === undefined && type !== 'x') {
      return this.$router.push({
        name: 'login',
        query: {
          type: 'msgLogin'
        }
      })
    } else if (this.$store.state.userInfo.id !== undefined) {
      this.online = this.myResume.resumeCompletePercentage >= 0.9 ? '更新' : '完善'
      if (!this.myResume.resumeAttach) {
        this.annex = '更新'
      }
    }

    if (type === 'online') {
      if (this.isFourResume === 701) { return this.$router.push({ name: 'createUser' }) }
      // 跳我的简历
      return this.$router.push({ name: 'cresume' })
    } else if (type === 'annex') {
      // 这里执行 上传/更新附件简历弹窗
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
  photoAnimation () {
    let translateWidths = 0
    let timers = function () {

    }
    let timer = function () {
      translateWidths = translateWidths + 298
      if (translateWidths / 298 > this.companyInformation.albumInfo.middleUrl.length) {
        translateWidths = 0
      }
      setInterval(() => {
        timer()
        console.log(1)
        this.$nextTick(function () {
          this.$refs.photo.style.transform = `translate3d(-${translateWidths}px, 0, 0)`
        })
      }, 1000)
    }
  }
  created () {
    this.getCompanyHot()
    this.getCompany()
    this.resumeTo('x')
    this.getRecruitersList()
    // this.mapType()
  }
  beforeUpdate () {
    this.mapType()
    this.photoAnimation()
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
            width: 80px;
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
          i{
            font-size: 14px;
          }
        }
      }
    }
  }
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
      @include flex-justify-between;

      .hotPosition-box{
        padding: 24px 24px;
        width: 390px;
        height: 110px;
        background: #FFFFFF;
        box-sizing: $sizing;
        border-radius:4px;
        cursor: pointer;

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

          .introduction-left{
            border-right: 1px solid $border-color-1;
            width: 850px;

            .introduction-presentation{
              margin-bottom: 60px;
              width: 750px;
              position: relative;

              .introduction-title{
                @extend %introductionTitle;
              }
              .introduction-text{
                font-size: 14px;
                color: $font-color-3;
                font-weight: 400;
                line-height: 26px;
                height: 158px;
                overflow: hidden;
              }
              .introduction-left-buttom{
                position: absolute;
                right: 15px;
              }
              .introduction_viewAll{
                height: auto;
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
              #map{
                height: 147px;
              }
            }
          }
          .introduction-right{
            padding-left: 50px;
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

            }
          }
        }
      }
</style>
