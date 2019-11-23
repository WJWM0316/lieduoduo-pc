<template>
  <div class="companyDetail">
    <header class="header">
      <div class="inner">
        <div class="header-left">
          <div class="header-left-top">
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
            <p class="header-right-resume">
              <i class="iconfont icon-ziwomiaoshu-"/>&nbsp;
              {{}}在线简历
            </p>
          </div>
          <div class="header-right-position">
            <p class="header-right-number">1000</p>
            <p class="header-right-text">浏览</p>
            <p class="header-right-resume">
              <i class="iconfont icon-ziwomiaoshu-"/>&nbsp;
              {{}}附件简历
            </p>
          </div>
        </div>
      </div>
    </header>
    <div class="hotPosition">
      <div class="hotPosition-inner">
        <p class="hotPosition-title">热招职位：</p>
        <div class="hotPosition-buttom">
          <div class="hotPosition-box" v-for="(item, index) in HotPositionList" :key="index">
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
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import {
  getCompanyHotApi,
  getCompanyApi
} from '@/api/company.js'

@Component({
  name: 'company-detail'
})
export default class companyDetail extends Vue {
  infos = {};
  HotPositionList = {}; // 热门职位列表
  companyInformation = {};
  activation = true;

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
      console.log(res.data.data.numOfVisitors)
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
  created () {
    this.getCompanyHot()
    this.getCompany()
  }
}

// emolumentMin: res.data.data.emolumentMin, // 最低薪水
// emolumentMax: res.data.data.emolumentMax,
// positionName: res.data.data.positionName,
// annualSalaryDesc: res.data.data.annualSalaryDesc, // 12薪
// workExperienceName: res.data.data.workExperienceName, // 工作经验
// province: res.data.data.province, // 省
// city: res.data.data.city,
// district: res.data.data.district,
// educationName: res.data.data.educationName // 学历
</script>

<style lang="scss" scoped>
//公共样式继承
%wrap-width {
  width: 100%;
  box-sizing: border-box;
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
</style>
