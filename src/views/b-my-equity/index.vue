<template>
  <!-- 我的权益 -->
  <div class="equity-wrapper">
    <div class="equity-title">
      <h1>我的权益</h1>
      <span class="header-tips">
        <span class="iconfont icon-cuowu"></span>
        <span>尊贵的用户：您的免费试用版权益</span>
        <span>即将于2020年5月15日到期，</span>
        <span>限时升级专业版，请尽快联系我们~</span>
      </span>
    </div>
    <div class="recruiter-config">
      <div class="recruiter-avatar">
        <img :src="recruiter.avatar && recruiter.avatar.smallUrl" alt="">
      </div>
      <div class="recruiter-version">
        <p class="version-type">免费使用版</p>
        <p class="version-time">有效期至 2020-05-01</p>
      </div>
      <el-button type="primary">升级专业版</el-button>
    </div>
    <h2>权益使用详情</h2>
    <div class="equity-list">
      <div class="equity-list-wrapper">
        <div class="">
          <p>面试官人数上限</p>
          <span class="list-count">400</span>
          <span style="padding-left: 4px;">人</span>
          <span style="padding: 0 16px;">|</span>
          <span>已加入</span>
          <span class="list-count-2">12</span>
          <span>人</span>
        </div>
        <div class="c-btn">邀请同事</div>
      </div>
      <div class="equity-list-wrapper">
        <div class="">
          <p>在线职位数上限</p>
          <span class="list-count">400</span>
          <span style="padding-left: 4px;">人</span>
          <span style="padding: 0 16px;">|</span>
          <span>已发布</span>
          <span class="list-count-2">12</span>
          <span>人</span>
        </div>
        <div class="c-btn">发布职位</div>
      </div>
      <div class="equity-list-wrapper">
        <div class="">
          <p>每日面试邀约数上限</p>
          <span class="list-count">400</span>
          <span style="padding-left: 4px;">人</span>
          <span style="padding: 0 16px;">|</span>
          <span>已邀约</span>
          <span class="list-count-2">12</span>
          <span>人</span>
        </div>
        <div class="c-btn">发布职位</div>
      </div>
      <div class="equity-list-wrapper">
        <div class="">
          <p>每日查看简历上限</p>
          <span class="list-count">400</span>
          <span style="padding-left: 4px;">份</span>
          <span style="padding: 0 16px;">|</span>
          <span>已查看</span>
          <span class="list-count-2">12</span>
          <span>份</span>
        </div>
        <div class="c-btn">前往查看</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecruiterRight } from 'API/recruiter'
export default {
  data () {
    return {

    }
  },
  computed: {
    // 招聘官资料
    recruiter () {
      return this.$store.state.recruiter.info
    }
  },
  created () {
    // this.$message.warning({
    //   content: 'test',
    //   duration: 0
    // })
    this.getInfos()
  },
  methods: {
    getInfos () {
      getRecruiterRight().then((data) => {
        console.log(data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$list-bg-color: #FBFDFD;
.equity-wrapper {
  padding: 48px 64px;
  background: #fff;
  min-width: 960px;
}
.equity-title {
  h1 {
    font-size: 24px;
    line-height:32px;
  }
  h1, span {
    display: inline-block;
    vertical-align: middle;
  }
  .header-tips {
    padding: 5px 23px 5px 12px;
    font-size: 12px;
    background: $--color-warning-lighter;
    color: $title-color-2;
    border-radius: 4px;
    margin-left: 8px;
    line-height: 18px;
  }
}
.recruiter-config {
  @include flex-v-center;
  .recruiter-avatar {
    @include img-radius(72px, 72px);
    border: 1px solid $border-color-8;
  }
  .recruiter-version {
    margin-left: 16px;
  }
  .el-button {
    margin-left: auto;
  }
  .version-type {
    color: $title-color-1;
    font-size: 20px;
    font-weight: bold;
  }
  .version-time {
    color: $title-color-2;
    font-size: 14px;
    margin-top: 10px;
  }
}
h2 {
  color: $font-color-2;
  font-size: 20px;
  line-height:32px;
  margin: 62px 0 24px;
}
.equity-list {
  display: flex;
  flex-wrap: wrap;
  .equity-list-wrapper:nth-child(even) {
    margin-left: 2.2%;
  }
}
.equity-list-wrapper {
  width: 48.9%;
  padding: 35px 42px 42px;
  background: $list-bg-color;
  border: 1px solid $border-color-8;
  box-sizing: border-box;
  border-radius:4px;
  margin-bottom: 20px;
  @include flex-v-center;
  p {
    color: $title-color-1;
    font-size: 16px;
    line-height:16px;
    margin-bottom: 17px;
  }
  .list-count {
    font-weight: bold;
    color: $title-color-1;
    font-size: 32px;
    line-height:32px;
  }
  .c-btn {
    margin-left: auto;
  }
  span {
    color: $title-color-3;
  }
  .list-count-2 {
    font-weight: bold;
    font-size: 18px;
    line-height:18px;
    color: $title-color-2;
    padding: 0 5px;
  }
}
</style>
