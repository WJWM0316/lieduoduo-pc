<template>
  <el-row class="card_item">
    <el-col :span="8">
      <div class="grid-content bg-purple">11</div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple-light">11</div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">1111</div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    interview: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.card_item {
	margin: 15px 0;
  height: 100px;
  line-height: 100px;
  background: white;
}
</style>
