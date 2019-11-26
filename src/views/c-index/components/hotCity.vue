<template>
  <!-- 热门城市 -->
  <div class="city-wrapper">
    <div class="hot-city-header">
      <span class="iconfont icon-bottom"></span> <span class="city-title">热招城市</span> <span class="iconfont icon-bottom"></span>
    </div>
    <div class="hot-city-wrapper">
      <div class="city-list" v-for="item in cityList" :key="item.chinese">
        <img :src="item.url" alt="">
        <div>
          <p>{{item.city}}</p>
          <p>{{item.chinese}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cityList: [
        { url: `${process.env.VUE_APP_CDN_PATH}/images/beijing.png`, city: '北京', chinese: 'BeiJing' },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/guangzhou.png`, city: '广州', chinese: 'Guangzhou' },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/shenzhen.png`, city: '深圳', chinese: 'Shenzhen' },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/shanghai.png`, city: '上海', chinese: 'Shanghai' },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/chengdu.png`, city: '成都', chinese: 'Chengdu' },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/hangzhou.png`, city: '杭州', chinese: 'Hangzhou' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.city-wrapper {
  margin-bottom: 60px;
}
.hot-city-header {
  width: 100%;
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  span {
    vertical-align: middle;
    color: $border-color-1;
    z-index: 2;
    background: $bg-color-1;
    position: relative;
    padding: 0 8px;
  }
  span.city-title {
    padding: 0 3px;
    color: $title-color-3;
  }
  &::after, &::before {
    content: "";
    position: absolute;
    width: 50%;
    top: 8px;
    height: 1px;
    background: $border-color-1;
  }
  &::after {
    left: 0;
  }
  &::before {
    right: 0;
  }
}
.hot-city-wrapper {
  @include flex-v-center;
  .city-list + .city-list {
    margin-left: 7px;
  }
  .city-list {
    cursor: pointer;
    flex: 1;
    max-width: 194px;
    position: relative;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      color: #fff;
      box-sizing: border-box;
      padding: 11px 15px;
    }
    p {
      font-size: 18px;
    }
    p + p {
      font-size: 14px;
    }
  }
  .city-list:hover {
    img {
      transform: scale(1.08);
    }
  }
  img {
    max-width: 100%;
    transition: transform 600ms;
  }
}
</style>
