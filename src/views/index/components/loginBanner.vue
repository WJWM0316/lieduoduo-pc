<template>
  <div class="index-login">
    <div class="main-center">
      <div>
        <el-input v-model="loginForm.phone" />
      </div>
      <div>
        <el-input v-model="loginForm.phone" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        phone: '',
        code: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$index-login-height: 120px;
.index-login {
  background: $bg-color-4;
  height: $index-login-height;
  width: 100%;
}
</style>