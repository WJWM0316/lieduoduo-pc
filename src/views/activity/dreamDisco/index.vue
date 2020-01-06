<template>
  <div class="dream">
    <div class="benner"></div>
    <div class="text-wrap"></div>
    <div class="carousel"></div>
    <div class="dreamCity"></div>
    <div class="positionCard"></div>
    <div class="partner"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`
    }
  }
}
</script>

<style lang="scss" scoped>
.dream{
  width: 100%;
  .benner{
    padding-bottom: 37.4%;
    width: 100%;
    background: url(#{$image-cdn-url}/images/discoPC_2_01.jpg) no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .text-wrap{
    background: url(#{$image-cdn-url}/images/discoPC_2_02.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 524px;
  }
}
</style>
