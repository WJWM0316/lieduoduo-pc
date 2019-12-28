<template>
  <el-dialog :visible.sync="show" class="el-dialog2">
    <div class="body"></div>
    <div class="footer">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    infos: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
<style lang="scss" scoped></style>

