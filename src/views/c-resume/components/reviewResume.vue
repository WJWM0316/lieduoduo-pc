<template>
<!-- 预览简历 -->
  <div class="resume-review">
    <slot>
      <div class="resume-review-btn-wrapper">
        <el-button class="review-btn" type="primary" @click="reviewStatus = true">预览简历</el-button>
      </div>
    </slot>
    <el-dialog
      :visible.sync="reviewStatus"
      top="49px"
      :lock-scroll="true"
      width="770px">
      <div class="resume-content">
        <base-info :resume="resume" status="view"/>
        <span class="resume-hr"><span></span></span>
        <desc-info :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <proposal :resume="resume" status="view"/>
        <span class="resume-hr"><span></span></span>
        <experience :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <project :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <education :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <more :resume="resume" status="view" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BaseInfo from './base'
import DescInfo from './desc'
import Proposal from './proposal'
import Experience from './experience'
import Project from './project'
import Education from './education'
import More from './more'
export default {
  components: {
    BaseInfo,
    DescInfo,
    Proposal,
    Experience,
    Project,
    Education,
    More
  },
  props: {
    resume: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      reviewStatus: false
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  height: 100vh;
  overflow: hidden;
}
.resume-review {
  & /deep/ .el-dialog__body {
    padding: 0;
    height: calc(100vh - 49px - 30px);
    overflow-y: hidden;
  }
}
.resume-review-btn-wrapper {
  width:100%;
  text-align: center;
  background-color: #fff;
  padding: 20px 22px;
  box-sizing: border-box;
  box-shadow: $shadow-1;
  .review-btn {
    width: 100%;
  }
}
.resume-content {
  height: 100%;
  overflow-y: auto;
  & /deep/ .proposal-warpper .list-item {
    margin-top: 0;
  }
}
.resume-hr {
  margin: 40px 0;
}
</style>
