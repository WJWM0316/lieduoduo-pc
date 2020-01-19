<template>
  <div class="downloadApp-dialog-wrappper">
    <el-dialog
      append-to-body
      custom-class="downloadApp-dialog"
      @close="handleClose"
      :visible.sync="dialogTableVisible">
      <div class="downloadApp-text">
        <p>下载猎多多APP</p>
        <ul>
          <li><span></span>随时随地与招聘官畅聊职位</li>
          <li><span></span>订阅消息通知，实时掌握约面动态</li>
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
  .el-dialog__close {
    color: #fff !important;
    font-weight: bold;
  }
}
.downloadApp-dialog-wrappper .el-dialog__header{
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
    width: 177px;
  }
  li{
    margin-top: 8px;
    line-height: 18px;
    span{
      background: #ffffff;
      width: 4px;
      height: 4px;
      display: inline-block;
      margin-right: 5px;
      line-height: 18px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  img{
    width: 109px;
    height: 109px;
    margin-top: 15px;
    margin-left: 9px;
  }
}
</style>
