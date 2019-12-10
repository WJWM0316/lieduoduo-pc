<template>
  <div class="main-center resume-wrapper">
    <!-- 简历内容 -->
    <div class="resume-content">
      <p class="resume-update-time" v-if="resume.resumeUpdateTime !== '0000-00-00 00:00:00'">最后更新 {{resume.resumeUpdateTime}}</p>
      <base-info class="base-scroll" prop-class="base-scroll" :resume="resume" />
      <desc-info class="desc-scroll" prop-class="desc-scroll" :resume="resume" />
      <proposal class="proposal-scroll" prop-class="proposal-scroll" :resume="resume" />
      <experience class="experience-scroll" prop-class="experience-scroll" :resume="resume" />
      <project class="project-scroll" prop-class="project-scroll" :resume="resume" />
      <education class="education-scroll" prop-class="education-scroll" :resume="resume" />
      <more class="more-scroll" prop-class="more-scroll" :resume="resume" />
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
        { value: 4, title: '工作经历', icon: 'icon-zhiwei', container: '.experience-scroll' },
        { value: 5, title: '项目经验', icon: 'icon-rongzi', container: '.project-scroll' },
        { value: 6, title: '教育经历', icon: 'icon-jiaoyu', container: '.education-scroll' },
        { value: 7, title: '更多介绍', icon: 'icon-gongsileixing', container: '.more-scroll' }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    if (!this.resume.uid && this.role.isJobhunter) {
      this.$store.dispatch('getMyResume')
    }
  },
  computed: {
    resume () {
      return this.$store.state.resume.myResume || {}
    },
    role () {
      return this.$store.state.roleInfos || {}
    },
    // 记录到点击事件更新
    count () {
      return this.$store.state.resume.calculateClick
    }
  },
  methods: {
    /**
     * @param 滚动项
     * @description 表单滚动到可见位置
     */
    handleScrollToView (item) {
      this.activeIndex = item.value
      // 获取对应的节点
      const dom = document.querySelector(item.container)
      if (dom) {
        const domBounding = dom.getBoundingClientRect()
        const { top } = domBounding
        if (top === 0) return
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let to = top + scrollTop
        let duration = 500
        const s = Math.abs(scrollTop - to)
        const v = Math.ceil((s / duration) * 50)
        // eslint-disable-next-line no-inner-declarations
        function scroll (start, end, step) {
          if (start === end) return
          // console.log(start, end)
          let d = start + step > end ? end : start + step
          if (start > end) {
            d = start - step < end ? end : start - step
          }
          window.scrollTo(0, d)
          window.requestAnimationFrame(() => scroll(d, end, step))
        }
        scroll(scrollTop, to, v)
        /* window.scrollTo({
          top: end, // 滚动终点y的位置
          left: 0, // 滚动终点x的位置
          behavior: 'smooth' // 平滑滚动
        }) */
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
    this.$store.commit('setEditStatus', { status: false })
  },
  watch: {
    count () {
      const { propClass } = this.$store.state.resume
      if (propClass) {
        let item = this.sideList.find(val => val.container === `.${propClass}`)
        if (item) this.handleScrollToView(item)
      }
    }
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
  padding-top: 30px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: $shadow-1;
  margin-right: 20px;
  .resume-update-time {
    padding: 0px 0 36px 46px;
    font-size: 12px;
    color: $font-color-10;

  }
}
.base-scroll /deep/ .resume-wrapper-item{
  padding-top: 0;
}
.resume-wrapper /deep/ {
  .c-btn {
    width: 100%;
  }
  .wrapper-info .c-btn {
    width: 545px;
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
      position: relative;
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
  .el-input.is-disabled .el-input__inner {
    background: #F0F3F5;
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
    margin-top: 6px;
    .form-label {
      padding: 5px 14px;
      border-radius: 30px;
      font-size: 12px;
      color: $main-color-1;
      display: inline-block;
      margin-right: 12px;
      margin-top: 8px;
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
    padding: 12px 0 0;
    line-height: 22px;
    color: $title-color-2;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
  .resume-hr {
    width: 100%;
    display: block;
    padding: 0 46px;
    box-sizing: border-box;
    height: 6px;
    line-height: 6px;
  }
  .resume-hr span{
    width: 100%;
    height: 100%;
    vertical-align: top;
    padding: 0;
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
      color: $title-color-2;
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
    background: $bg-color-4;
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
