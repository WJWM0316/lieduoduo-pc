<template>
  <div class="positionDownloadApp">
    <el-dialog
      custom-class="positionDownloadApp-dialog"
      @close="handleClose"
      append-to-body
      :visible.sync="dialogTableVisible">
      <p class="positionDownloadApp-title">
        <i class="iconfont icon-zhengque"></i>
        <span>{{ title }}</span>
      </p>
      <p class="positionDownloadApp-text">网页端暂不支持完整约聊功能，请前往猎多多APP使用</p>
      <div class="positionDownloadApp-img">
        <img class="positionDownloadApp-left" :src="cdnPath + 'positionDownloadApp.png?a=3'"/>
        <div class="positionDownloadApp-right">
          <img :src="imgUrl"/>
          <p>扫码下载猎多多APP</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { app_qrcode } from 'IMAGES/image'
export default {
  watch: {
    visible (value) {
      if (value) {
        this.dialogTableVisible = true
        switch (this.type) {
          case 'chat':
            this.title = '约聊成功'
            break
          case 'grabInterviewChat':
            if (this.text === '') {
              this.title = '面试官已收到你的申请，将于24h内得到反馈'
            } else {
              this.title = this.text
            }
            break
        }
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '' // chat 约聊成功 grabInterviewChat 抢占成功
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      imgUrl: app_qrcode,
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`,
      title: ''
    }
  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss">
.positionDownloadApp-dialog{
  width: 432px !important;
  border-radius: 8px !important;
  margin-top: auto !important;
  top: 50%;
  transform: translateY(-50%);
}
.positionDownloadApp .el-dialog__header{
  height: 0 !important;
  padding-top: 32px;
}
.positionDownloadApp .el-dialog__body{
  padding: 0 38px;
}
.positionDownloadApp-title{
  color: $main-color-1;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  min-height: 24px;
  width: 350px;
  @include flex-v-center;
  .iconfont{
    font-weight: normal;
    margin-right: 11px;
    font-size: 20px;
    align-self: flex-start;
    line-height: 24px;
    color: $bg-color-4;
  }
  i, span {
    display: inline-block;
  }
}
.positionDownloadApp-text{
  font-weight: 400;
  font-size: 14px;
  color: $font-color-6;
  line-height: 20px;
  margin-top: 6px;
  margin-left: 31px;
  width: 318px;
}
.positionDownloadApp-img{
  margin-top: 16px;
  .positionDownloadApp-left{
    width: 219px;
    height: 270px;
    vertical-align: middle;
    margin-left: -3px;
  }
  .positionDownloadApp-right{
    display: inline-block;
    margin-left: -25px;
    vertical-align: middle;
    img{
      width: 137px;
      height: 137px;
    }
    p{
      color: $font-color-6;
      font-weight: 400;
      line-height: 20px;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
