<template>
  <router-link
    target="_blank"
    :to="`/company/details?vkey=${item.vkey}`"
    class="company-list">
    <div class="company-image">
      <img v-if="item.logoInfo" :src="item.logoInfo.middleUrl" />
    </div>
    <div class="company-info">
      <p>
        <span class="company-name">{{item.companyShortname}}</span>
        <span v-if="item.oneSentenceIntro" class="company-desc">{{item.oneSentenceIntro}}</span>
      </p>
      <p>
        <span class="company-params"><span>{{item.financingInfo}}</span><span class="spc">|</span><span>{{item.employeesInfo}}</span><span class="spc">|</span><span>{{item.industry}}</span></span>
        <span class="company-count"><span><b>{{item.positionNum}}</b>个热招职位</span><span class="spc">|</span><span>{{item.numOfVisitors}}人浏览</span></span>
      </p>
    </div>
    <div class="company-operate">
      <div class="c-btn">查看公司主页</div>
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
.company-list {
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
.company-list+.company-list {
  &::after {
    border-top: 1px dashed $border-color-1;
  }
}
.company-image {
  @include img-radius(60px, 60px, 8px);
  border: 1px solid $border-color-8;
}
.company-info {
  flex: 1;
  margin: 0 7px 0 15px;
  p+p {
    margin-top: 10px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  span.company-name {
    font-size: 16px;
    color: $title-color-1;
    max-width: 192px;
    @include ellipsis();
    padding-right: 12px;
  }
  span.company-desc {
    font-size: 12px;
    color: $title-color-2;
    background: $bg-color-11;
    padding: 4px 12px;
    border-radius:2px;
    max-width: 370px;
    @include ellipsis();
  }
  span.company-params, span.company-count {
    color: $title-color-2;
    font-size: 12px;
    min-width: 300px;
  }
  span.company-count b{
    color: $main-color-1;
  }
  .spc {
    padding: 0 10px;
  }
}
.company-list:hover {
  background: $bg-color-1;
  .company-name {
    color: $main-color-1;
  }
  .c-btn{
    background: $bg-color-4;
    color: #fff;
  }
}
</style>
