<template>
  <div class="card_item">
    <template v-if="interview.status === 11">
    	<el-button type="text">开撩约面</el-button>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    interview: {
      type: Object,
      default: () => ({})
    },
    showCompanyInfo: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.card_item {
	margin: 20px 0;
  height: 100px;
  line-height: 100px;
}
</style>
