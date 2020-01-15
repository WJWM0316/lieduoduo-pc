<template>
  <div class="downloadApp">
    <el-dialog custom-class="downloadApp-dialog" @close="handleClose" :visible.sync="dialogTableVisible"></el-dialog>
  </div>
</template>
<script>
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
      dialogTableVisible: false
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
  background: $bg-color-4 !important;
}
.downloadApp .el-dialog__header{
  height: 0 !important;
}
</style>
