<template>
  <!-- 热门城市 -->
  <div class="city-wrapper">
    <div class="hot-city-header">
      <span class="iconfont icon-bottom"></span> <span class="city-title">热招城市</span> <span class="iconfont icon-bottom"></span>
    </div>
    <div class="hot-city-wrapper">
      <div class="city-list" v-for="item in cityList" :key="item.chinese" @click="handleToSearchPage(item)">
        <img :src="item.url" alt="">
        <div>
          <p class="city-name">{{item.city}}</p>
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
        { url: `${process.env.VUE_APP_CDN_PATH}/images/beijing.png`, city: '北京', chinese: 'BeiJing', cityNums: 110100 },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/guangzhou.png`, city: '广州', chinese: 'Guangzhou', cityNums: 440100 },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/shenzhen.png`, city: '深圳', chinese: 'Shenzhen', cityNums: 440300 },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/shanghai.png`, city: '上海', chinese: 'Shanghai', cityNums: 310100 },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/hangzhou.png`, city: '杭州', chinese: 'Hangzhou', cityNums: 330100 },
        { url: `${process.env.VUE_APP_CDN_PATH}/images/chengdu.png`, city: '成都', chinese: 'Chengdu', cityNums: 510100 }
      ],
      isChange: false
    }
  },
  methods: {
    handleToSearchPage (item) {
      this.isChange = true
      this.currentItem = item
      this.$router.push({
        name: 'position',
        query: {
          typeName: 'position',
          cityNums: item.cityNums
        }
      })
    }
  },
  destroyed () {
    // 写入vuex 防止有首页刷新
    if (this.isChange) this.$store.commit('setCityId', this.currentItem.cityNums)
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
  .iconfont {
    font-size: 12px;
  }
  span.city-title {
    padding: 0 9px;
    color: $title-color-3;
    letter-spacing: 2px;
    font-weight: 500;
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
    height: 80px;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
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
    .city-name {
      font-weight: 500;
    }
  }
  div:hover {
    background: rgba( #000, .28);
    color: $font-color-10;
  }
  img {
    max-width: 100%;
    height: 100%;
  }
}
</style>
