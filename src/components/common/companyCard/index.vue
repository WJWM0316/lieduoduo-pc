<template>
<!-- 公司卡片列表 -->
  <router-link target="_blank"  :to="`/company/details?companyId=${item.vkey}`" class="company-list-wrapper">
    <div class="list-header">
      <div class="company-image">
        <img v-if="item.logoInfo" :src="item.logoInfo.middleUrl" alt="">
      </div>
      <div class="company-info">
        <p>{{item.companyShortname}}</p>
        <p>{{item.financingInfo}}<span v-if="item.employeesInfo">·{{item.employeesInfo}}</span><span v-if="item.industry">·{{item.industry}}</span></p>
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
    }
    .company-info {
      flex: 1;
      text-align: right;
      font-size: 12px;
      margin-left: 10px;
    }
    p {
      color: $title-color-1;
    }
    p + p {
      margin-top: 14px;
      color: $title-color-2;
      font-size: 12px;
      max-width: 172px;
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
}
</style>
