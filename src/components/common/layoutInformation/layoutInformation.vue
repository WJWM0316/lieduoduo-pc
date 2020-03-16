<template>
  <div class="layoutInformation">
    <el-popover popper-class="layoutInformation-popper" @show="interviewInformation" v-model="popperModel" placement="bottom" width="350" trigger="click">
      <div class="layoutInformation-main">
        <div class="layoutInformation-title">约聊消息</div>
        <div class="layoutInformation-item" v-for="(item, index) in interviewList" :key="index">
          <div class="layoutInformation-img">
            <img :src="port === 'CPort' ? item.recruiterInfo.avatarInfo.smallUrl : item.jobhunterInfo.avatarInfo.smallUrl"/>
          </div>
          <div class="layoutInformation-text">
            <p class="layoutInformation-text-top">
              <span class="layoutInformation-text-top-name">{{ port === 'CPort' ? item.recruiterInfo.name : item.jobhunterInfo.name }}</span>
              <span class="layoutInformation-text-top-companyShortname">{{ port === 'CPort' ? item.recruiterInfo.companyInfo.companyShortname : item.jobhunterInfo.lastCompany === '' ? '暂无工作经历' : item.jobhunterInfo.lastCompany  }}</span>
            </p>
            <p v-if="port === 'CPort'" class="layoutInformation-text-bottom">正在和你沟通【<span>{{ item.recruiterInfo.position }}</span>】职位</p>
            <p v-if="port === 'BPort' && item.positionInfo && item.positionInfo.positionName" class="layoutInformation-text-bottom">正在和你沟通【<span>{{ item.positionInfo.positionName }}</span>】职位</p>
            <p v-if="port === 'BPort' && item.positionInfo && !item.positionInfo.positionName" class="layoutInformation-text-bottom">正与你直接沟通中</p>
          </div>
        </div>
        <!-- <p v-if="meta.total > 5" class="layoutInformation-communication">{{ '还有' + (meta.total - 5) + '人正在与你沟通中' }} <i class="iconfont icon-right"></i></p> -->
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
      showPopup: false,
      popperModel: false
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
      case 'BPort':
        BchatInterviewApi(data).then(res => {
          this.interviewList = res.data.data
          this.meta = res.data.meta
        })
        break
    }
  },
  methods: {
    interviewInformation () {
      if (this.meta.total === 0) {
        this.popperModel = false
        this.showPopup = true
      }
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
  line-height: 50px;
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
  padding: 0 24px;
  .layoutInformation-title{
    font-size: 14px;
    font-weight: 500;
    margin: 20px 0 10px 0;
    color: $font-color-3;
  }
  .layoutInformation-communication{
    text-align: center;
    color: $font-color-9;
    line-height: 40px;
    font-size: 12px;
    border-top: 1px $scroll-bar-color dashed;
    .iconfont{
      font-size: 12px;
      color: $font-color-10;
    }
  }
}
.layoutInformation-item{
  height: 68px;
  box-sizing: border-box;
  border-bottom: 1px $scroll-bar-color dashed;
  @include flex-v-center;
  &:last-of-type{
    border: 0;
  }
  .layoutInformation-img{
    @include img-radius(38px, 38px, 50%);
    border: 1px solid $border-color-8;
  }
  .layoutInformation-text{
    font-weight: 400;
    margin-left: 8px;
    .layoutInformation-text-top{
      font-size: 14px;
      color: $font-color-2;
      line-height: 14px;
      vertical-align: middle;
      span{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
        line-height: 14px;
      }
      .layoutInformation-text-top-name{
        max-width: 110px;
      }
      .layoutInformation-text-top-companyShortname{
        margin-left: 6px;
        width: 130px;
        color: $font-color-9;
        font-size: 12px;
      }
    }
    .layoutInformation-text-bottom{
      margin-top: 8px;
      font-size: 12px;
      line-height: 12px;
      color: $font-color-6;
      vertical-align: middle;
      span{
        display: inline-block;
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: top;
      }
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
  margin-top: 4px;
}
</style>
<style lang="scss">
.layoutInformation-popper{
  padding: 0 !important;
  border-radius: 10px !important;
  border: 0 !important;
}
</style>
