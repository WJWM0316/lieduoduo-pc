<template>
<!-- 公司卡片列表 -->
  <router-link target="_blank"  :to="`/company/details?vkey=${item.vkey}`" class="company-list-wrapper">
    <div class="list-header">
      <div class="company-image">
        <img v-if="item.logoInfo" :src="item.logoInfo.middleUrl" alt="">
      </div>
      <div class="company-info">
        <p class="company-info-name">{{item.companyShortname}}</p>
        <p>{{item.financingInfo}}<template v-if="item.employeesInfo">·{{item.employeesInfo}}</template><template v-if="item.industry">·{{item.industry}}</template></p>
      </div>
    </div>
    <div class="list-footer">
      <span><b>{{item.positionNum}}</b> 个热招职位</span>
      <span>{{item.numOfVisitors}}浏览</span>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.company-list-wrapper {
  width: 290px;
  background: #fff;
  padding: 20px;
  box-shadow: $shadow-1;
  box-sizing: border-box;
  margin-bottom: 13px;
  border-radius:4px;
  cursor: pointer;
  .list-header {
    @include flex-v-center;
    margin-bottom: 20px;
    .company-image {
      @include img-radius(66px, 66px, 8px);
      border: 1px solid $border-color-8;
    }
    .company-info {
      flex: 1;
      text-align: right;
      font-size: 12px;
      margin-left: 10px;
    }
    p {
      color: $title-color-1;
      font-size: 16px;
      font-weight: 500;
    }
    p + p {
      margin-top: 14px;
      font-weight: normal;
      color: $title-color-2;
      font-size: 12px;
      max-width: 174px;
      @include ellipsis;
    }
  }
  .list-footer {
    border-top: 1px  dashed $border-color-1;
    @include flex-v-center;
    padding: 16px 0 0px;
    box-sizing: border-box;
    span {
      color: $title-color-2;
      font-size: 12px;
    }
    span b {
      font-weight: normal;
      color: $main-color-1;
    }
    span:last-child {
      margin-left: auto;
    }
  }

}
.company-list-wrapper:hover {
  box-shadow: $shadow-2;
  .company-info-name {
    color: $main-color-1;
  }
}
</style>
