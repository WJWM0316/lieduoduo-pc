<template>
  <router-link
    target="_blank"
    :to="`/position/details?positionId=${item.id}`"
    class="active-list-wrapper"
    :key="item.lableId">
    <div class="list-header">
      <div class="list-image">
        <img :src="item.companyInfo.logoInfo.smallUrl" />
      </div>
      <div class="list-company">{{item.companyInfo.companyShortname}}</div>
      <div class="list-company-info">{{item.companyInfo.industry}}·{{item.companyInfo.employeesInfo}}·{{item.companyInfo.financingInfo}}</div>
    </div>
    <div class="list-position-info">
      <div class="list-position-content">
        <div>
          <span class="list-position-name">{{item.positionName}}</span>
          <span class="list-pay">{{item.emolumentMin}}~{{item.emolumentMax}}K <template v-if="item.annualSalary > 12">· {{item.annualSalaryDesc}}</template></span>
        </div>
        <div class="list-position-require">
          <span><i class="iconfont icon-dizhi"></i>{{item.city}}{{item.district}}</span>
          <span><i class="iconfont icon-zhiwei"></i>{{item.workExperienceName}}</span>
          <span><i class="iconfont icon-jiaoyu"></i>{{item.educationName}}</span>
        </div>
      </div>
      <!-- <div class="list-details" v-if="item.companyInfo.oneSentenceIntro">
        <span class="list-details-box">
          <span class="list-details-box-content">{{item.companyInfo.oneSentenceIntro}}</span>
        </span>
      </div> -->
    </div>
    <div class="list-footer">
      <div class="count-down">
        <span>还剩</span>
        <template v-if="countDown.days > 0">
          <span class="list-day">{{countDown.days}}</span>
          <span>天</span>
        </template>
        <span class="list-hour">{{countDown.hours}}</span>:<span class="list-mins">{{countDown.mins}}</span>:<span class="list-second">{{countDown.seconds}}</span>
      </div>
      <div class="position-count">
        <p>还剩<b>{{(item.seatsNum -  item.applyNum - item.natureApplyNum) > 99 ? '99+' : item.seatsNum -  item.applyNum - item.natureApplyNum}}</b>个席位</p>
        <span class="position-process" :class="(item.applyNum + item.natureApplyNum) === 0 ? 'noApply' : ''">
          <span
            class="position-process-width"
            :style="{width: (item.applyNum + item.natureApplyNum) / item.seatsNum * 100 + '%'}"></span>
        </span>
      </div>
      <el-button type="warning"  size="medium" style="width: 71px" round>马上抢</el-button>
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
    countDown: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
$position-process-bg-color: #99e7e8;
.active-list-wrapper {
  width: 390px;
  overflow: hidden;
  margin-bottom: 20px;
  box-sizing: border-box;
  box-shadow: $shadow-1;
  border-radius:4px;
  background-color: #fff;
  margin-right: 15px;
  transition: transform 300ms, box-shadow 300ms;
  .list-header {
    background-color: #fff;
    padding: 10px 0px;
    @include flex-v-center;
    margin:0 16px;
    box-sizing: border-box;
    color: $font-color-6;
    border-bottom: 1px dashed $border-color-1;
    .list-image {
      @include img-radius(28px, 28px);
      border: 1px solid $border-color-8;
    }
    .list-company {
      font-size: 14px;
      color: $title-color-1;
      padding-left: 6px;
      max-width: 120px;
      @include ellipsis;
    }
    .list-company-info {
      margin-left: auto;
      font-size: 12px;
    }
  }
  .list-position-info {
    text-align: center;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0px 16px 0 18px;
    // min-height: 138px;
    min-height: 108px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    & > div {
      width: 100%;
    }
    .list-position-content {
      padding: 14px 0;
    }
  }
  .list-position-name, .list-pay {
    display: inline-block;
    vertical-align: middle;
  }
  .list-position-name {
    color: $title-color-1;
    font-size: 18px;
    font-weight: bold;
    max-width: 190px;
    @include ellipsis;
  }
  .list-position-name:hover {
    color: $main-color-1;
  }
  .list-pay {
    color: $warning-color-1;
    font-size: 20px;
    font-weight: bold;
    padding-left: 14px;
  }
  .list-position-require {
    margin-top: 10px;
    font-size: 14px;
    color: $title-color-2;
    span + span {
      margin-left: 22px;
    }
    .iconfont {
      font-size: 14px;
      padding-right: 3px;
      color: $font-color-10;
    }
  }
  // .list-details {
  //   background: $bg-color-8;
  //   padding:10px 35px;
  //   margin: 0px -26px 0;
  //   text-align: left;
  //   align-self: flex-end;
  //   width: 100%;
  //   font-size: 12px;
  //   min-height: 30px;
  //   line-height: 16px;
  //   position: relative;
  //   display: table;
  //   .list-details-box {
  //     display: table-cell;
  //     vertical-align: middle;
  //   }
  //   .list-details-box-content {
  //     color: $title-color-3;
  //     @include ellipsis-two;
  //     -webkit-box-pack: center;
  //   }
  // }
  .list-footer {
    @include flex-v-center;
    box-sizing: border-box;
    background: $bg-color-4;
    padding: 10px 20px;
    height: 54px;
  }
  .count-down {
    color: #fff;
    font-size: 14px;
    span {
      vertical-align: middle;
      display: inline-block;
      height: 24px;
      line-height: 24px;
    }
  }
  .list-day, .list-hour, .list-mins, .list-second {
    width: 24px;
    background: #fff;
    color: $sub-color-1;
    text-align: center;
    font-weight: 700;
    border-radius:4px;
    margin: 0 3px;
  }
  .el-button {
    margin-left: 15px;
    padding: 0;
    height: 34px;
  }
  .position-count {
    margin-left: auto;
    p {
      font-size: 12px;
      font-weight: 300;
      color: #fff;
      b {
        color: #fff;
        font-weight: 700;
      }
    }
    span {
      display: inline-block;
      height:8px;
    }
  }
  .position-process {
    background: $position-process-bg-color;
    width:53px;
    position: relative;
    margin-left: 26px;
    border-radius: 0 4px 4px 0;
    &:after {
      width: 26px;
      height: 8px;
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: -26px;
      background: #fff;
      border-radius:4px 0 0 4px;
    }
    &.noApply {
      &:after {
        background: #fff;
      }
    }
  }
  .position-process-width {
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0 4px 4px 0;
  }
}
.active-list-wrapper:hover {
  box-shadow: $shadow-2;
  transform: translateY(-5px);
}
</style>
