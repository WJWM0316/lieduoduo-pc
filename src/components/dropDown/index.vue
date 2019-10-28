<template>
  <!-- 下拉菜单 -->
  <div class="drop-down" :class="{active: isActive}">
    <div class="drop-down-header"  @click.stop="toggle">
      <slot></slot>
    </div>
    <div class="drop-down-wrapper" :style="{width: wrapperWidth}">
      <slot name="content">
        <div class="drop-down-items">
          <template v-for="item in items">
            <div
              :key="item[props.value]"
              class="drop-down-item"
              :class="{'single-active': item[props.value] === value}"
              :style="{width: defaultWidth}"
              @click="handleSelect(item)">{{item[props.label]}}</div>
          </template>
        </div>
      </slot>
      <div class="drop-down-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: { // 下拉列表内容
      type: Array,
      default: () => ([])
    },
    multiple: Boolean, // 是否多选
    value: [String, Number, Array],
    col: { // 列数量
      type: Number,
      default: 1
    },
    defaultWidth: {
      type: Number,
      default: 168
    },
    props: {
      type: Object,
      default: () => ({ value: 'value', label: 'label' })
    }
  },
  computed: {
    wrapperWidth () {
      return this.col * this.defaultWidth + 'px'
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    window.addEventListener('click', this.handleClose)
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
    handleClose () {
      this.isActive = false
    },
    handleSelect (item) {
      if (this.multiple) {
        //
      } else {
        this.$emit('input', item[this.props.value])
        this.$emit('on-select', item)
        // 关闭
        this.isActive = false
      }
    }
  },
  destroyed () {
    window.addEventListener('click', this.handleClose)
  }
}
</script>
<style lang="scss" scoped>
$drop-height: 46px;
.drop-down {
  position: relative;
  .drop-down-wrapper {
    background: #fff;
    position: absolute;
    z-index: 98;
    box-shadow: $shadow-1;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height 0ms 400ms, opacity 400ms 0ms;
  }
  .drop-down-item {
    text-align: center;
    height: $drop-height;
    padding: 16px 0;
    box-sizing: border-box;
    font-size: 14px;
    color: $title-color-2;
  }
  .drop-down-item:hover, .drop-down-item.single-active {
    background: $bg-color-5;
    color: $main-color-1;
  }
}
.drop-down.active .drop-down-wrapper {
  height: auto;
  opacity: 1;
  transition: height 0ms 0ms, opacity 600ms 0ms;
}
</style>
