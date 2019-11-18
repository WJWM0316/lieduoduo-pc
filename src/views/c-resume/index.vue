<template>
  <div class="main-center resume-wrapper">
    <!-- 简历内容 -->
    <div class="resume-content">
      <base-info :resume="resume" />
      <desc-info :resume="resume" />
      <proposal :resume="resume" />
    </div>
    <!-- 简历配置 -->
    <div class="resume-config">

    </div>
  </div>
</template>
<script>
import BaseInfo from './components/base'
import DescInfo from './components/desc'
import Proposal from './components/proposal'
export default {
  components: {
    BaseInfo,
    DescInfo,
    Proposal
  },
  computed: {
    resume () {
      return this.$store.state.resume.myResume || {}
    }
  }
}
</script>
<style lang="scss" scoped>
.resume-wrapper {
  @include flex-between;
  margin-top: 25px;
  margin-bottom: 40px;
}
.resume-content {
  width: 882px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: $shadow-1;
  & > div {
    padding: 36px 0;
  }
  & > div:not(:first-child) {
    border-top: 1px dotted $border-color-1;
  }
  & /deep/ {
    .c-btn {
      width: 100%;
    }
    .el-form {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      .el-input, .el-select {
        width: 100%;
      }
      .form-item {
        padding-right: 12px;
        width: 50%;
        box-sizing: border-box;
      }
      .form-item:nth-child(2n) {
        display: inline-block;
        padding-left: 12px;
      }
    }
    .form-title {
      font-size: 14px;
      margin-bottom: 8px;
      color: $title-color-1;
    }
    .form-header-title {
      font-size: 17px;
      margin-bottom: 24px;
      color: $title-color-1;
    }
  }
}
</style>
