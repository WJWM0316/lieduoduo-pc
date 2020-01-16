<template>
  <div class="downloadApp">
    <el-dialog append-to-body custom-class="downloadApp-dialog" @close="handleClose" :visible.sync="dialogTableVisible">
      <div class="downloadApp-text">
        <p>下载猎多多APP</p>
        <ul>
          <li>随时随地与招聘官畅聊职位</li>
          <li>订阅消息通知，实时掌握约面动态</li>
        </ul>
        <img :src="imgUrl"/>
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
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      imgUrl: app_qrcode

    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss">
.downloadApp-dialog{
  width: 432px !important;
  height: 294px;
  border-radius: 8px !important;
  margin-top: calc(50vh - 147px) !important;
  background: url(#{$image-cdn-url}/images/downloadApp.png) $bg-color-4 !important;
  background-size: 432px 294px !important;
  .el-dialog__body{
    padding: 0 !important;
  }
}
.downloadApp .el-dialog__header{
  height: 0 !important;
}
.downloadApp-text{
  margin: 20px 0 0 208px;
  color: #ffffff;
  p{
    font-weight: 500;
    font-size: 24px;
  }
  ul{
    font-weight: 400;
    font-size: 14px;
    margin-top: 8px;
    width: 168px;
    margin-left: 20px;
  }
  li{
    margin-top: 8px;
    line-height: 18px;
    list-style-type: disc;
  }
  img{
    width: 109px;
    height: 109px;
    margin-top: 15px;
  }
}
</style>
