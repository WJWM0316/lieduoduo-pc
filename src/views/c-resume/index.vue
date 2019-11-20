<template>
  <div class="main-center resume-wrapper">
    <!-- 简历内容 -->
    <div class="resume-content">
      <base-info :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <desc-info :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <proposal :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <experience :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <project :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <education :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <more :resume="resume" />
    </div>
    <!-- 简历配置 -->
    <div class="resume-config">
      <resume-review :resume="resume" />
      <resume-file />
      <ul class="resume-side">
        <li
          v-for="item in sideList"
          :class="{active: item.value === activeIndex}"
          :key="item.icon"
          @click="handleScrollToView(item)">
          <span :class="`iconfont ${item.icon}`"></span>{{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BaseInfo from './components/base'
import DescInfo from './components/desc'
import Proposal from './components/proposal'
import Experience from './components/experience'
import Project from './components/project'
import Education from './components/education'
import More from './components/more'
import ResumeReview from './components/reviewResume'
import ResumeFile from './components/fileResume'
export default {
  components: {
    BaseInfo,
    DescInfo,
    Proposal,
    Experience,
    Project,
    Education,
    More,
    ResumeReview,
    ResumeFile
  },
  data () {
    return {
      activeIndex: 1,
      sideList: [
        { value: 1, title: '基本信息', icon: 'icon-jibenxinxishenfenyanzheng', container: '' },
        { value: 2, title: '自我描述', icon: 'icon-ziwomiaoshu-', container: '' },
        { value: 3, title: '求职意向', icon: 'icon-qiuzhiyixiang', container: '' },
        { value: 4, title: '工作经历', icon: 'icon-zhiweiguanli', container: '' },
        { value: 5, title: '项目经验', icon: 'icon-rongzi', container: '' },
        { value: 6, title: '教育经历', icon: 'icon-jiaoyu', container: '' },
        { value: 7, title: '更多介绍', icon: 'icon-gongsileixing', container: '' }
      ]
    }
  },
  computed: {
    resume () {
      return this.$store.state.resume.myResume || {}
    }
  },
  methods: {
    handleScrollToView (item) {
      this.activeIndex = item.value
    }
  }
}
</script>
<style lang="scss" scoped>
.resume-wrapper {
  margin-top: 25px;
  margin-bottom: 40px;
  display: flex;
}
.resume-content {
  width: 882px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: $shadow-1;
  margin-right: 20px;
  & > div {
    padding: 36px 0;
  }
}
.resume-wrapper /deep/ {
  .c-btn {
    width: 100%;
  }
  .el-form {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .el-input, .el-select, .el-cascader, .el-date-editor {
      width: 100%;
    }
    .el-range-separator {
      line-height: 40px;
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
  .form-labels-wrapper {
    margin-top: 14px;
    .form-label {
      padding: 5px 14px;
      border-radius:30px;
      font-size: 12px;
      color: $main-color-1;
      border: 1px solid $border-color-2;
    }
    .form-label + .form-label {
      margin-left: 12px;
    }
  }
  .resume-list-header {
    @include flex-v-center;
    span {
      color: $title-color-1;
      font-size: 16px;
    }
    .separator {
      padding: 0 6px;
    }
    .resume-list-time {
      margin-left: auto;
      color: $title-color-2;
      font-size: 14px;
    }
  }
  .resume-list-desc {
    padding: 16px 0;
    line-height: 22px;
    color: $title-color-2;
  }
  .resume-hr {
    width: 100%;
    display: inline-block;
    padding: 0 46px;
    box-sizing: border-box;
  }
  .resume-hr span{
    width: 100%;
    height: 6px;
    background-image: url('../../assets/images/separator.png');
    background-size: auto 100%;
    background-repeat: repeat;
    display: inline-block;
  }
}
.resume-config {
  flex: 1
}
.resume-side {
  background-color: #fff;
  box-shadow: $shadow-1;
  margin-top: 20px;
  li {
    padding: 15px 0;
    cursor: pointer;
    font-size: 14px;
    position: relative;
    color: $title-color-1;
    span {
      padding: 0 20px 0 26px;
      color: $title-color-1;
      font-size: 14px;
    }
  }
  li.active:after {
    content: "";
    width: 3px;
    height: 26px;
    background: $main-color-1;
    border-radius: 0px 50px 50px 0px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -10px;
  }
  li:hover {
    background-color: $bg-color-1;
  }
}
</style>
