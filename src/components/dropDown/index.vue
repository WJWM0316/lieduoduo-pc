<template>
  <!-- 下拉菜单 -->
  <div class="drop-down" :class="{active: isActive}">
    <div class="drop-down-header"  @click.stop="toggle">
      <slot></slot>
      <span v-if="showArrow" class="iconfont icon-bottom"></span>
    </div>
    <div class="drop-down-wrapper" :style="{width: wrapperWidth}">
      <slot name="content">
        <div class="drop-down-items" :class="{'has': opacity}" :style="{'max-height': defaultHeight + 'px'}">
          <template v-for="item in items">
            <div
              :key="item[props.value]"
              class="drop-down-item"
              :class="{'single-active': item[props.value] === value, 'multiple-active': item.checked}"
              :style="{width: defaultWidth + 'px'}"
              @click.stop.prevent="handleSelect(item)">
              <span>{{item[props.label]}}</span>
              <i class="iconfont icon-xuanzhong1"></i>
            </div>
          </template>
        </div>
      </slot>
      <div class="drop-down-footer" :class="{'opacity': opacity}" v-if="multiple">
        <el-button class="reset-button" type="text" size="small" style="width: 60px" @click.stop="resetDropDown">重置</el-button>
        <el-button type="primary" size="small" style="width: 88px" @click.stop="handleSelected">确定</el-button>
      </div>
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
    defaultHeight: {
      type: Number,
      default: 400
    },
    props: {
      type: Object,
      default: () => ({ value: 'value', label: 'label' })
    },
    showArrow: Boolean,
    limit: {
      type: Number,
      default: 0
    },
    allValue: { // 全部的值 如果全部选择已经选择，就不能选择其他选项 多选才生效
      type: [Number, String],
      default: '-'
    }
  },
  computed: {
    wrapperWidth () {
      return this.col * this.defaultWidth + 'px'
    },
    opacity () {
      const len = this.items.length
      const maxH = Math.ceil(len * 46 / this.col)
      return maxH > this.defaultHeight
    }
  },
  data () {
    return {
      isActive: false,
      isCheckedAll: false
    }
  },
  mounted () {
    window.addEventListener('click', this.handleClose)
  },
  methods: {
    toggle () {
      if (!this.isActive) document.body.click() // 关闭其他
      this.isActive = !this.isActive
    },
    handleClose () {
      this.isActive = false
    },
    handleSelect (item) {
      if (this.multiple) {
        // 改变内容
        if (item.checked === undefined) {
          this.$set(item, 'checked', true)
        } else {
          item.checked = !item.checked
        }
        const len = this.items.filter(val => val.checked)
        if (len.length > this.limit) {
          this.$message.warning(`最多只能选择${this.limit}个`)
          item.checked = false
          return
        }
        // 如果点击的不是全选 清空全部的选择状态
        if (this.isCheckedAll && item[this.props.value] !== this.allValue) {
          this.isCheckedAll = false
          const item = this.items.find(val => val[this.props.value] === this.allValue)
          item.checked = false
        }
        // 如果点击的是全选
        if (!isNaN(this.allValue) && item[this.props.value] === this.allValue) {
          // 全选确认选择, 清除其他已经选择的项
          if (item.checked) {
            this.items.forEach(val => {
              if (val.checked) {
                val.checked = false
              }
            })
          }
          this.isCheckedAll = true
          item.checked = true
        }
        this.$emit('on-change', item)
      } else {
        this.$emit('input', item[this.props.value])
        this.$emit('on-select', item)
        // 关闭
        this.isActive = false
      }
    },
    handleSelected () {
      const items = this.items.filter(val => val.checked) || []
      if (this.limit && this.limit < items.length) {
        this.$message.warning(`最多只能选择${this.limit}个`)
        return
      }
      this.$emit('input', items.map(val => val[this.props.value]))
      this.$emit('on-select', items)
      this.handleClose()
    },
    resetDropDown () {
      this.items.forEach(val => {
        if (val.checked) {
          val.checked = false
        }
      })
      this.$emit('input', [])
      this.$emit('on-select', [])
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
  .drop-down-items {
    @include flex-v-center;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-y: overlay;
  }
  .drop-down-item {
    text-align: center;
    height: $drop-height;
    padding: 16px 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: $title-color-2;
    cursor: pointer;
  }
  .icon-xuanzhong1 {
    display: none;
    font-size: 12px;
    font-weight: 300;
  }
  .drop-down-item:hover, .drop-down-item.single-active {
    background: $bg-color-5;
    color: $main-color-1;
  }
  .drop-down-item.multiple-active {
    color: $main-color-1;
    display: flex;
    i {
      display: inline-block;
    }
    span {
      flex: 1;
    }
  }
}
.drop-down-header {
  cursor: pointer;
  .iconfont {
    transition: transform 400ms;
    color: $title-color-2;
    font-size: 12px;
    display: inline-block;
  }
}
.drop-down.active .drop-down-wrapper {
  height: auto;
  opacity: 1;
  transition: height 0ms 0ms, opacity 600ms 0ms;
}
.drop-down.active .drop-down-header{
  .icon-bottom {
    transform: rotate(180deg)
  }
}

.drop-down-footer {
  padding: 6px;
  position: relative;
  text-align: right;
  .el-button {
    margin-left: 0;
  }
  .reset-button {
    margin-right: 5px;
  }
  .reset-button:hover {
    background: $bg-color-5;
  }
}
.has.drop-down-items {
  padding-bottom: 12px;
  box-sizing: border-box;
}
.opacity.drop-down-footer::after {
  content: "";
  top: -26px;
  left: 0;
  position: absolute;
  width: 100%;
  height: 26px;
  background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
}
.drop-down-items::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background-clip: padding-box;
}
.drop-down-items::-webkit-scrollbar-thumb {
  background-color: $scroll-bar-color;
  border-radius: 4px;
}
</style>
