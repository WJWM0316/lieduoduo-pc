<template>
  <router-link
    target="_blank"
    :to="`/position/details?positionId=${item.id}`"
    class="position-list">
    <div class="position-info">
      <p>
        <!-- 急聘 -->
        <span class="position-active" v-if="item.isUrgency === 1"></span>
        <span class="position-name">{{item.positionName}}</span>
        <!-- 24反馈 -->
        <span class="position-24hour" v-if="item.isRapidly === 1"></span>
        <span class="position-pay">{{item.emolumentMin}}-{{item.emolumentMax}}K<template v-if="item.annualSalary > 12">·{{item.annualSalaryDesc}}</template></span>
      </p>
      <p class="position-require">
        <span><i class="iconfont icon-dizhi"></i>{{item.city}}{{item.district}}</span>
        <span><i class="iconfont icon-zhiwei"></i>{{item.workExperienceName}}</span>
        <span><i class="iconfont icon-jiaoyu"></i>{{item.educationName}}</span>
      </p>
    </div>
    <div class="company-info" v-if="item.companyInfo">
      <template v-if="showCompanyInfo">
        <p class="company-name">{{item.companyInfo.companyShortname}}</p>
        <p class="company-details"><span>{{item.companyInfo.financingInfo}}</span>|<span>{{item.companyInfo.employeesInfo}}</span>|<span>{{item.companyInfo.industry}}</span></p>
      </template>
    </div>
    <div class="recruiter-info" v-if="item.recruiterInfo">
      <div class="recruiter-base-info">
        <span class="recruiter-profile"><img :src="item.recruiterInfo&&item.recruiterInfo.avatar.smallUrl" alt=""></span>
        <span class="recruiter-name">{{item.recruiterInfo && item.recruiterInfo.name}}</span><span>|</span><span class="recruiter-position">{{item.recruiterInfo && item.recruiterInfo.position}}</span>
        <p class="">{{item.numOfVisitors}}人已看过</p>
      </div>
      <div class="contact-recruiter">
        <el-button type="primary" size="small">一键申请</el-button>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    showCompanyInfo: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.position-list {
  cursor: pointer;
  @include flex-v-center;
  width: 100%;
  position: relative;
  background: #fff;
  box-sizing: border-box;
  padding: 28px 36px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 36px;
  }
}
.position-list+.position-list {
  &::after {
    border-top: 1px dashed $border-color-1;
  }
}

.position-info{
  width: 346px;
  padding-right: 36px;
  p {
    font-size: 16px;
  }
  span {
    vertical-align: middle;
    display: inline-block;
  }
  .position-name {
    @include ellipsis;
    max-width: 160px;
    padding-right: 14px;
    color: $title-color-1;
    font-weight: bold;
  }
  .position-name:hover {
    color: $main-color-1;
  }
  .position-pay {
    color: $warning-color-1;
    font-weight: bold;
  }
  .position-active {
    background: url('../../../assets/images/tag_list_job.png') no-repeat;
    width: 40px;
    height: 38px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .position-24hour {
    width: 47px;
    height: 18px;
    margin-right: 14px;
    background: url('../../../assets/images/tag_list_24hour.png') no-repeat;
  }
  .position-active, .position-24hour {
    background-size: cover;
  }
  .position-require {
    margin-top: 10px;
    font-size: 12px;
    color: $title-color-2;
    span + span {
      margin-left: 22px;
    }
    span, i {
      display: inline-block;
      vertical-align: middle;
    }
    .iconfont {
      font-size: 14px;
      padding-right: 6px;
      color: $font-color-12;
    }
  }
}
.company-info {
  min-width: 240px;
  font-size: 16px;
  .company-name {
    color: $title-color-1;
    margin-bottom: 10px;
    max-width: 200px;
    @include ellipsis;
  }
  p span {
    padding-right: 8px;
  }
  .company-details {
    font-size: 12px;
    color: $title-color-2;
  }
  span + span {
    padding-left: 8px;
  }
}
.recruiter-info {
  margin-left: auto;
  text-align: right;
  position: relative;
  span {
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    color: $title-color-1;
  }
  .recruiter-name {
    max-width: 56px;
    margin: 0 6px;
  }
  .recruiter-name,  .recruiter-position {
    @include ellipsis;
  }
  .recruiter-position {
    margin-left: 6px;
    max-width: 85px;

  }
  .recruiter-profile {
    @include img-radius(22px, 22px)
  }
  p {
    font-size: 12px;
    color: $title-color-2;
    margin-top: 10px;
  }
  .contact-recruiter {
    display: none;
    position: absolute;
    top: 50%;
    margin-top: -18px;
    height: 100%;
    right: 0;
    // background: $bg-color-5;
    z-index: 2;
    .el-button {
      width: 146px;
      border-radius: 2px;
      vertical-align: middle;
    }
  }
}
.position-list:hover {
  background: $bg-color-1;
  .contact-recruiter {
    display: block;
  }
  .recruiter-base-info{
    opacity: 0;
  }
}
</style>
