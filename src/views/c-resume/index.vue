<template>
  <div class="main-center resume-wrapper">
    <!-- 简历内容 -->
    <div class="resume-content">
      <p class="resume-update-time">最后更新 {{resume.resumeUpdateTime}}</p>
      <base-info class="base-scroll" :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <desc-info class="desc-scroll" :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <proposal class="proposal-scroll" :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <experience class="experience-scroll" :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <project class="project-scroll" :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <education class="education-scroll" :resume="resume" />
      <span class="resume-hr"><span></span></span>
      <more class="more-scroll" :resume="resume" />
    </div>
    <!-- 简历配置 -->
    <div class="resume-config">
      <resume-review :resume="resume" />
      <resume-file :resume="resume" />
      <div class="resume-side" :class="{'resume-side-fixed': fixedSide}" :style="{left: fixedLeft + 'px'}">
        <ul>
          <li
            v-for="(item) in sideList"
            :class="{active: item.value === activeIndex}"
            :key="item.icon"
            @click="handleScrollToView(item)">
            <span :class="`iconfont ${item.icon}`"></span>{{item.title}}
          </li>
        </ul>
      </div>
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
      fixedSide: false,
      fixedLeft: 0,
      activeIndex: 1,
      sideList: [
        { value: 1, title: '基本信息', icon: 'icon-jibenxinxishenfenyanzheng', container: '.base-scroll' },
        { value: 2, title: '自我描述', icon: 'icon-ziwomiaoshu-', container: '.desc-scroll' },
        { value: 3, title: '求职意向', icon: 'icon-qiuzhiyixiang', container: '.proposal-scroll' },
        { value: 4, title: '工作经历', icon: 'icon-zhiweiguanli', container: '.experience-scroll' },
        { value: 5, title: '项目经验', icon: 'icon-rongzi', container: '.project-scroll' },
        { value: 6, title: '教育经历', icon: 'icon-jiaoyu', container: '.education-scroll' },
        { value: 7, title: '更多介绍', icon: 'icon-gongsileixing', container: '.more-scroll' }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    resume () {
      return this.$store.state.resume.myResume || {}
    }
  },
  methods: {
    handleScrollToView (item) {
      if (item.value === this.activeIndex) return
      this.activeIndex = item.value
      // 获取对应的节点
      const dom = document.querySelector(item.container)
      if (dom) {
        const domBounding = dom.getBoundingClientRect()
        const { y } = domBounding
        window.scrollTo(0, document.documentElement.scrollTop + y)
      }
    },
    handleScroll () {
      const dom = document.querySelector('.resume-side')
      if (dom) {
        const domBounding = dom.getBoundingClientRect()
        const { top, left } = domBounding
        if (top < 0) {
          this.fixedSide = true
          this.fixedLeft = left
        } else {
          this.fixedSide = false
        }
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
.resume-wrapper {
  padding: 25px 0 40px;
  display: flex;
}
.resume-content {
  width: 882px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: $shadow-1;
  margin-right: 20px;
  & > div {
    padding: 36px 0 ;
  }
  .resume-update-time {
    padding: 30px 0 0px 46px;
    font-size: 12px;
    color: $font-color-10;

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
  span.ellipsis {
    display: inline-block;
    max-width: 180px;
    @include ellipsis;
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
      display: inline-block;
      margin-right: 12px;
      margin-bottom: 8px;
      border: 1px solid $border-color-2;
    }
  }
  .resume-list-header {
    @include flex-v-center;
    span {
      color: $title-color-1;
      font-size: 16px;
      display: inline-block;
      vertical-align: middle;
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
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
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

.resume-side-fixed ul {
  position: fixed;
  top: 0;
  width: 298px;
}

.resume-side {
  margin-top: 20px;
  ul {
    background-color: #fff;
    box-shadow: $shadow-1;
  }
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
  li.active {
    color: $main-color-1;
    span {
      color: $main-color-1;
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
