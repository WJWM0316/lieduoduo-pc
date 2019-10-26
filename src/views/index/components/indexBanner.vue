<template>
  <div class="swiper" @mouseover="pause" @mouseout="play">
    <ul class="swiper-group" :style="groupStyle">
      <li class="swiper-item" v-for="(item,index) in items" ref="item" :key="index">
        <a target="_blank"  :href="item.otherUrl"><img :src="item.bigImgUrl" alt=""></a>
      </li>
    </ul>
    <div class="swiper-arrow">
      <span class="el-icon-arrow-left" @click="handlePage(-1)"></span>
      <span class="placeholder-span"></span>
      <span class="el-icon-arrow-right" @click="handlePage(1)"></span>
    </div>
    <div class="swiper-pager">
      <span v-for="(item, i) in items" :key="i" class="swiper-pager-item" :class="{active: i ==  index % items.length}"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    groupStyle () {
      return {
        transform: `translate3d(${this.offset}px, 0, 0)`,
        'transition-duration': `${this.duration}ms`
      }
    }
  },
  data () {
    return {
      index: 0, // 当前轮播项索引
      offset: 0, // swipe组的偏移量
      duration: 0, // 过渡动画时长
      itemWidth: 0 // 轮播项宽度
    }
  },
  mounted () {
    if (this.$el) {
      this.itemWidth = this.$el.getBoundingClientRect().width
    }
  },
  methods: {
    // index 超出范围时调整
    correctIndex () {
      this.duration = 0
      const total = this.items.length
      if (this.index < 0) {
        this.next(total, true)
      } else if (this.index > total - 1) {
        this.next(-total, true)
      }
    },
    // 移动到达目标 index 途中的所有 swipe-item
    moveItems (indexOffset) {
      const targetIndex = this.index + indexOffset
      if (this.index < targetIndex) {
        // 向左
        for (let i = this.index; i < targetIndex; i++) {
          this.moveItem(i + 1)
        }
      } else {
        // 向右
        for (let i = targetIndex; i < this.index; i++) {
          this.moveItem(i)
        }
      }
    },
    // 移动 swipe-item
    moveItem (index) {
      const total = this.items.length
      const itemIndex = index % total < 0 ? (index % total) + total : index % total
      if (!this.$refs.item[itemIndex]) return
      // 目标 index 超出范围时调整对应 swipe-item 的偏移值
      if (index > total - 1) {
        this.$refs.item[itemIndex].style.transform = `translateX(${total *
          this.itemWidth}px)`
      } else if (index < 0) {
        this.$refs.item[itemIndex].style.transform = `translateX(${-total *
          this.itemWidth}px)`
      } else {
        this.$refs.item[itemIndex].style.transform = 'translateX(0px)'
      }
    },
    resetItems () {
      this.$refs.item.forEach($item => {
        $item.style.transform = 'translateX(0px)'
      })
    },
    // 向左/右方向切换 indexOffset 个 swipe-item
    next (indexOffset, isCorrect) {
      isCorrect ? this.resetItems() : this.moveItems(indexOffset)
      this.index += indexOffset
      this.offset = -this.index * this.itemWidth
    },
    autoplay () {
      clearInterval(this.player)
      this.player = setInterval(() => {
        this.duration = 0
        this.correctIndex()
        setTimeout(() => {
          this.duration = 500
          this.next(1)
        }, 30)
      }, 3000)
    },
    handlePage (indexOffset) {
      this.duration = 0
      this.correctIndex()
      // 30ms延时是为了屏蔽 reset 过程中的过渡动画
      setTimeout(() => {
        this.duration = 500
        this.next(indexOffset)
        // this.play()
      }, 30)
    },
    // 暂停
    pause () {
      clearInterval(this.player)
    },
    play () {
      this.autoplay()
    }
  },
  destroyed () {
    clearInterval(this.player)
  }
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}
.swiper {
  position: relative;
  overflow: hidden;
  z-index: 0;
  height: 411px;
  img {
    width: 100%;
  }
}
.swiper-group {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.swiper-item {
  flex: 0 0 100%;
  height: 100%;
  a {
    display: block;
  }
}
.swiper-arrow {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  position: absolute;
  cursor: pointer;
  padding: 0 12px;
  box-sizing: border-box;
  left: 0;
  top: 50%;
  margin-top: -12px;
  display: flex;
  width: 100%;
  span {
    opacity: 0.5;
  }
  span:hover {
    opacity: 1;
  }
  span:last-child {
    margin-left: auto
  }
  .placeholder-span {
    flex: 1;
  }
}
.swiper-pager {
  position: absolute;
  left: 0;
  bottom: 17px;
  width: 100%;
  text-align: center;
  .swiper-pager-item {
    width:5px;
    height:5px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.5;
    display: inline-block;
    margin: 0 5px;
  }
  .swiper-pager-item.active {
    opacity: 1;
    width: 18px;
    border-radius: 5px;
  }
}

</style>
