<template>
<!-- 普通的联系客服弹窗 -->
  <el-dialog
    width="432px"
    custom-class="app-dialog chat-downloadapp-dialog"
    top="calc((100vh - 460px) / 2)"
    @close="handleClose"
    :visible.sync="contactDialogStatus">
    <div slot="title">
      <img src="@/assets/images/pop_bg2.png" alt="">
    </div>
    <div class="download-wrapper">
      <div>
        <img :src="qrCode" alt="">
      </div>
      <p class="download-title">扫码下载猎多多APP</p>
      <p>随时随地与候选人畅聊职位</p>
      <p>订阅消息通知，实时掌握约面动态</p>
    </div>
  </el-dialog>
</template>
<script>
import { app_qrcode } from 'IMAGES/image'
export default {
  props: {
    visible: Boolean,
    text: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      contactDialogStatus: false,
      qrCode: app_qrcode
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible (value) {
      this.contactDialogStatus = value
    }
  }
}
</script>
<style lang="scss" scoped>
.download-wrapper {
  text-align: center;
  padding: 20px 0 32px;
  .download-title {
    height: 44px;
    line-height: 44px;
    color: $title-color-1;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    background: url('../../../assets/images/rocket.png') no-repeat;
    background-position: 290px 0;
    background-size: auto 100%;
  }
  p {
    color: $title-color-2;
    font-size: 14px;
    line-height:22px;
  }
  img {
    max-width: 146px;
  }
}

</style>
<style lang="scss">
.chat-downloadapp-dialog .el-dialog__header{
  padding: 0 !important;
  img {
    max-width: 100%;
  }
  .el-dialog__close {
    color: #fff !important;
    font-weight: bold;
  }
}
</style>
