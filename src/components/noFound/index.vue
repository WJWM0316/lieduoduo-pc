<template>
  <div class="no-found">
    <div>
      <img :src="imageUrl" alt="">
    </div>
    <p v-if="showText">{{tipText}}</p>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
      default: process.env.VUE_APP_CDN_PATH + '/images/pic_404.png'
    },
    tipText: {
      type: String,
      default: '暂时没符合条件的结果～'
    },
    showText: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.no-found {
  width: 100%;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  div {
    display: inline-block;
    img {
      max-width: 100%;
    }
  }
  p {
    color: $title-color-2;
    font-size: 16px;
    margin-top: 12px;
  }
}
</style>
