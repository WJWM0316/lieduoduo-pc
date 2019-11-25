<template>
  <!-- 友情链接 -->
  <dl class="app-links">
    <dt><span>友情链接</span></dt>
    <dd class="app-link-wrapper" :class="{'app-link-unfold': isUnfold}">
      <div>
        <template v-for="(item,index) in links">
          <a :href="item.url" target="_blank" :key="index">{{item.title}}</a>
        </template>
      </div>
      <span v-if="showMoreBtn" class="show-more-btn" :class="{'show-more-unfold': isUnfold}" @click="isUnfold = !isUnfold">{{isUnfold ? '收起': '展开'}} <i class="iconfont icon-bottom"></i></span>
    </dd>
  </dl>
</template>
<script>
import { getLinks } from 'API/common'
export default {
  data () {
    return {
      links: [],
      showMoreBtn: false,
      isUnfold: false
    }
  },
  mounted () {
    this.getAppLinks()
  },
  methods: {
    getAppLinks () {
      getLinks().then(({ data }) => {
        this.links = data.data || []
        this.$nextTick(() => {
          this.validateDom()
        })
      })
    },
    // 判断dom节点是否要显示展开更多
    validateDom () {
      const dom = document.querySelector('.app-link-wrapper div')
      if (dom) {
        const { height } = dom.getBoundingClientRect()
        this.showMoreBtn = height > 31
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-links {
  width: 100%;
  dt {
    color: $title-color-1;
    font-size: 14px;
    width: 100%;
    padding-bottom: 4px;
    border-bottom: 1px solid $border-color-1;
    span {
      padding-bottom: 3px;
      border-bottom:2px solid $border-color-7;
    }
  }
  dd {
    position: relative;
    a {
      display: inline-block;
      padding:15px 26px 0 0;
      font-size: 14px;
      color: $title-color-2;
    }
    a:hover {
      color: $main-color-1;
    }
    .show-more-btn {
      width: 120px;
      display: inline-block;
      position: absolute;
      padding:15px 0 0 0;
      text-align: right;
      top: 0;
      right: 0;
      cursor: pointer;
      font-size: 14px;
      color: $title-color-3;
      background: $bg-color-1;
      i {
        font-size: 14px;
        color: $title-color-3;
        transition: transform 400ms;
      }
    }
    .show-more-btn.show-more-unfold {
      i {
        transform: rotate(180deg);
        display: inline-block;
      }
    }
  }
  .app-link-wrapper {
    height: 31px;
    overflow: hidden;
  }
  .app-link-wrapper.app-link-unfold {
    height: auto;
  }
}
</style>
