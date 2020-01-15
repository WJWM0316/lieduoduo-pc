<template>
  <div class="layoutInformation">
    <el-popover popper-class="layoutInformation-popper" placement="bottom" width="350" trigger="click">
      <div class="layoutInformation-main">
        <div class="layoutInformation-title">约聊消息</div>
        <div class="layoutInformation-item" v-for="(item, index) in interviewList" :key="index">
          <div class="layoutInformation-img">
            <img :src="item.recruiterInfo.avatarInfo.smallUrl"/>
          </div>
          <div class="layoutInformation-text">
            <p class="layoutInformation-text-top">{{ item.recruiterInfo.name }}<span>{{ item.recruiterInfo.companyInfo.companyShortname }}</span></p>
            <p class="layoutInformation-text-bottom">{{ '正在和你沟通【'+ item.recruiterInfo.position + '】职位' }}</p>
          </div>
        </div>
        <p v-if="meta.total > 5" class="layoutInformation-communication">{{ '还有' + meta.total - 5 + '人正在与你沟通中' }} <i class="iconfont icon-right"></i></p>
      </div>
      <div class="layoutInformation-botton" @click="showPopup = true">
        下载猎多多APP，查看约聊消息
      </div>
      <span slot="reference" :class="port === 'CPort' ? 'CInformation' : 'BInformation'">消息</span>
    </el-popover>
    <download-app :visible.sync="showPopup"></download-app>
  </div>
</template>
<script>
import {
  CchatInterviewApi,
  BchatInterviewApi
} from '@/api/interview'
import downloadApp from '@/components/common/sharePopup/downloadApp'
export default {
  props: {
    port: {
      type: String,
      default: 'CPort'
    }
  },
  data () {
    return {
      interviewList: {},
      meta: {},
      showPopup: false
    }
  },
  components: {
    downloadApp
  },
  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin
    })
  },
  mounted () {
    let data = {
      page: 1,
      count: 5
    }
    switch (this.port) {
      case 'CPort':
        CchatInterviewApi(data).then(res => {
          this.interviewList = res.data.data
          this.meta = res.data.meta
        })
        break
      case 'Bport':
        BchatInterviewApi(data).then(res => {
          this.interviewList = res.data.data
          this.meta = res.data.meta
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.CInformation{
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.58);
  margin-right: 28px;
  line-height: 16px;
  &:hover{
    color: $nav-color-hover;
  }
}
.BInformation{
  font-size: 14px;
  font-weight: 400;
  color: $font-color-3;
  display: inline-block;
  margin-right: 30px;
  line-height: 16px;
}
.layoutInformation-main{
  padding: 0 25px;
  .layoutInformation-title{
    font-size: 14px;
    font-weight: 500;
    margin: 27px 0 10px 0;
  }
  .layoutInformation-communication{
    text-align: center;
    color: $font-color-9;
    line-height: 40px;
    font-size: 12px;
  }
}
.layoutInformation-item{
  height: 68px;
  box-sizing: border-box;
  border-bottom: 1px $scroll-bar-color dashed;
  @include flex-v-center;
  .layoutInformation-img{
    @include img-radius(38px, 38px, 50%);
  }
  .layoutInformation-text{
    font-weight: 400;
    margin-left: 8px;
    .layoutInformation-text-top{
      font-size: 14px;
      color: $font-color-2;
      line-height: 14px;
      span{
        font-size: 12px;
        display: inline-block;
        margin-left: 6px;
        color: $font-color-9;
      }
    }
    .layoutInformation-text-bottom{
      margin-top: 8px;
      font-size: 12px;
      color: $font-color-6;
    }
  }
}
.layoutInformation-botton{
  width: 350px;
  height: 46px;
  border-radius: 0 0 8px 8px;
  background: $bg-color-4;
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
}
</style>
<style lang="scss">
.layoutInformation-popper{
  padding: 0 !important;
  border-radius: 10px !important;
}
</style>
