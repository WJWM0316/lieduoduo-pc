<template>
  <div class="index-wrapper">
    <login-banner></login-banner>
    <search-wrapper></search-wrapper>
  </div>
</template>
<script>
import loginBanner from './components/loginBanner'
import SearchWrapper from './components/indexSearch'
export default {
  components: {
    loginBanner,
    SearchWrapper
  },
  data() {
    return {
      //
    }
  }
}
</script>