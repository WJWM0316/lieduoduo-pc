<template>
  <!-- 职位列表 -->
  <div class="index-position">
    <div class="postion-list">
      <ul>
        <template v-for="item in forepartData">
          <li class="list-item" :key="item.labelId" @mouseover.self="mouseOverEvent">
            <div class="list-item-wrapper">
              <span class="item-title">{{item.name}}</span>
              <div class="item-sub-title">
                <template v-for="child in item.children">
                  <router-link tag="span" :to="`/position/?keyword=${child.name}`"  :key="child.labelId">{{child.name}}</router-link>
                </template>
              </div>
              <span class="item-icon iconfont icon-right"></span>
            </div>
            <div class="position-details">
              <div class="position-details-wrapper" v-for="child in item.all.children" :key="child.labelId">
                <p>{{child.name}}</p>
                <div class="detaisl-span">
                  <router-link  :to="`/position/?keyword=${link.name}`" v-for="link in child.children" :key="link.labelId">{{link.name}}</router-link>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <div class="list-more" v-if="moreStatus">
        <p class="list-more-tips">显示全部职位</p>
        <ul class="list-more-wrapper">
          <template v-for="item in backendData">
            <li class="list-item" :key="item.labelId" @mouseover.self="mouseOverEvent">
              <div class="list-item-wrapper">
                <span class="item-title">{{item.name}}</span>
                <div class="item-sub-title">
                  <template v-for="child in item.children">
                    <router-link tag="span" :to="`/position/?keyword=${child.name}`"  :key="child.labelId">{{child.name}}</router-link>
                  </template>
                </div>
                <span class="item-icon iconfont icon-right"></span>
              </div>
              <div class="position-details">
                <div class="position-details-wrapper" v-for="child in item.all.children" :key="child.labelId">
                  <p>{{child.name}}</p>
                  <div class="detaisl-span">
                    <router-link  :to="`/position/?keyword=${link.name}`" v-for="link in child.children" :key="link.labelId">{{link.name}}</router-link>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // 是否显示全部职位的标签
    moreStatus () {
      return this.list.length > 8
    },
    // 前部分
    forepartData () {
      return this.list.slice(0, 8)
    },
    // 后部分
    backendData () {
      if (this.list.length <= 8) return []
      return this.list.slice(8, this.list.length)
    }
  },
  methods: {
    /**
     * 设置posotion details 显示的位置
     */
    mouseOverEvent (e) {
      // 元素离顶部的高度
      const top = e.target.getClientRects()[0].top
      // details 可见高度
      const dClientHeight = e.target.querySelector('.position-details').clientHeight
      // 屏幕的高度
      const maxHeight = document.documentElement.clientHeight
      if (maxHeight < (dClientHeight + top)) {
        // 截取超出屏幕部分
        const outHeight = dClientHeight - (maxHeight - top)
        // 上移的高度
        const transXHeight = outHeight > top ? top : outHeight
        e.target.querySelector('.position-details').style.top = `-${transXHeight}px`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$position-height: 411px;
$position-width: 420px;
$position-details-width: 528px;
.postion-list {
  width: $position-width;
  box-shadow: $shadow-1;
  background: #fff;
  min-height: 414px;
}
.list-item, .list-more {
  position: relative;
  height: 46px;
  line-height: 1.5;
  color: $title-color-1;
  padding: 12px 10px 12px 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.list-item {
  &:hover {
    background: $bg-color-1;
  }
}
.list-item:hover {
  .position-details {
    display: block;
  }
}
.list-more:hover {
  .list-more-wrapper {
    display: block;
  }
}
.list-more-tips {
  color: $main-color-1;
}
.list-more-wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 11;
  background: #fff;
  display: none;
  box-shadow: $shadow-1;
}
// .position-details:hover {
//   display: block;
// }
.list-item-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  .item-title {
    color: $title-color-1;
    font-size:16px;
    font-weight: bold;
    padding-right: 13px;
    height: 100%;
  }
  .item-sub-title {
    span {
      padding: 0 13px;
    }
    span:hover {
      color: $main-color-1;
    }
  }
  span {
    font-size:14px;
    color: $title-color-2;
    display: inline-block;
    box-sizing: border-box;
  }
  div {
    flex:1;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .item-icon {
    padding: 0 6px;
    margin-left: auto;
  }
}
.position-details {
  position: absolute;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 18px 30px;
  display: none;
  left: $position-width;
  width: $position-details-width;
  background: #fff;
  box-shadow: $shadow-1;
  z-index: 11;
  p {
    font-size: 14px;
    color: $font-color-3;
    font-weight: bold;
    padding-bottom: 14px;
  }
  .position-details-wrapper:not(:last-child) {
    border-bottom: 1px dashed $border-color-1;
    margin-bottom: 14px;
  }
  .position-details-wrapper {
    a {
      display: inline-block;
      margin-right: 26px;
      margin-bottom: 14px;
      color: $title-color-2;
    }
    a:hover {
      color: $main-color-1;
    }
  }
}
.position-details::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background-clip: padding-box;
}
.position-details::-webkit-scrollbar-thumb {
  background-color: $scroll-bar-color;
  border-radius: 4px;
}
</style>
