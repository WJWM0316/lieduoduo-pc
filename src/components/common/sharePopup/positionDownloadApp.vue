<template>
  <div class="positionDownloadApp">
    <el-dialog custom-class="positionDownloadApp-dialog" @close="handleClose" :visible.sync="dialogTableVisible">
      <div>
        <p>
          <i class="iconfont icon-zhengque"></i>
        </p>
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
      imgUrl: app_qrcode,
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`
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
.positionDownloadApp-dialog{
  width: 432px !important;
  height: 394px;
  border-radius: 8px !important;
  margin-top: calc(50vh - 147px) !important;
  background: $bg-color-4 !important;
}
.positionDownloadApp .el-dialog__header{
  height: 0 !important;
}
</style>
