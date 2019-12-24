<template>
  <!-- b端我的资料 -->
  <div class="app-infos">
    <div class="infos-header">
      <h1>我的资料</h1>
      <el-button type="primary" icon="iconfont icon-fenxiang"> 分享主页</el-button>
    </div>
    <p class="app-infos-tips">加"<em>*</em>"号的内容，是必须填写的项目；姓名和性别为招聘官认证信息，修改请联系 400-065-5788</p>
  </div>
</template>
<style lang="scss" scoped>
.app-infos {
  background: #fff;
  padding: 48px 82px 100px 80px !important;
  box-sizing: border-box;
}
.infos-header {
  display: flex;
  h1 {
    flex: 1;
    line-height: 1;
    margin: 0;
    font-size: 24px;
    color: $title-color-1;
  }
}
.app-infos-tips {
  color: $title-color-3;
  font-size: 12px;
  em {
    color: $font-color-14;
  }
}
</style>
