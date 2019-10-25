<template>
  <div class="back-to-top" v-show="backToTopShow" @click="toTop">
    <div class="back-icon"></div>
    <p>顶部</p>
  </div>
</template>

<script>
export default {
  props: {
    animation: {
      // 是否需要动画
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      backToTopShow: false
    };
  },
  methods: {
    toTop() {
      if (this.animation) {
        let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
          to = 0,
          duration = 500;
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
              return window.setTimeout(callback, 1000 / 60);
            };
        }
        const s = Math.abs(top - to);
        const v = Math.ceil((s / duration) * 50);

        // eslint-disable-next-line no-inner-declarations
        function scroll(start, end, step) {
          if (start === end) return;

          let d = start + step > end ? end : start + step;
          if (start > end) {
            d = start - step < end ? end : start - step;
          }
          window.scrollTo(d, d);
          window.requestAnimationFrame(() => scroll(d, end, step));
        }
        scroll(s, to, v);
      } else {
        this.tableDom.scrollTop = 0;
      }
    },
    handleScroll(){
      // 得到页面滚动的距离
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // 页面高度
      // const cHeight = document.documentElement.clientHeight
      this.backToTopShow = scrollTop > 200
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.back-to-top {
  z-index: 99;
  position: fixed;
  right: 54px;
  bottom: 100px;
  transition: color 0.4s;
  cursor: pointer;
  text-align: center;
  p {
    font-size: 12px;
    color: $font-color-10;
    margin-top: 6px;
  }
  div {
    width: 30px;
    height: 40px;
    background:  url('../../assets/images/scrollToTop.png') no-repeat;
    background-size: cover;
  }
  &:hover {
    div {
      background: url('../../assets/images/scrollToTop_hover.png') no-repeat;
      background-size: cover;
    }
    p {
      color: $main-color-1;
    }
  }

}
</style>