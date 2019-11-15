<template>
  <div class="main-center resume-wrapper">
    <!-- 简历内容 -->
    <div class="resume-content">
      <base-info />
    </div>
    <!-- 简历配置 -->
    <div class="resume-config">

    </div>
  </div>
</template>
<script>
import BaseInfo from './components/base'
export default {
  components: {
    BaseInfo
  }
}
</script>
<style lang="scss" scoped>
.resume-wrapper {
  @include flex-v-center;
  margin-top: 25px;
  margin-bottom: 40px;
}
</style>
