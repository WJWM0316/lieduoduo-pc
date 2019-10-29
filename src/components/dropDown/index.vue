<template>
  <!-- 下拉菜单 -->
  <div class="drop-down" :class="{active: isActive}">
    <div class="drop-down-header"  @click.stop="toggle">
      <slot></slot>
      <span v-if="showArrow" class="el-icon-arrow-down"></span>
    </div>
    <div class="drop-down-wrapper" :style="{width: wrapperWidth}">
      <slot name="content">
        <div class="drop-down-items" :style="{'max-height': defaultHeight + 'px'}">
          <template v-for="item in items">
            <div
              :key="item[props.value]"
              class="drop-down-item"
              :class="{'single-active': item[props.value] === value, 'multiple-active': item.checked}"
              :style="{width: defaultWidth + 'px'}"
              @click.stop.prevent="handleSelect(item)">
              <span>{{item[props.label]}}</span>
              <i class="el-icon-check"></i>
            </div>
          </template>
        </div>
      </slot>
      <div class="drop-down-footer" v-if="multiple">
        <el-button type="text" size="small" style="width: 64px" @click.stop="resetDropDown">重置</el-button>
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
        // 改变内容
        if (item.checked === undefined) {
          this.$set(item, 'checked', true)
        } else {
          item.checked = !item.checked
        }
        // 存储数据
        /* if (item.checked) {
          this.value.push(item[this.props.value])
        } else {
          const index = this.value.findIndex(val => val === item[this.props.value])
          this.value.splice(index, 1)
        } */
        // this.$emit('input', this.value)
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
    overflow-y:auto;
  }
  .el-icon-arrow-down {
    transition: transform 400ms
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
  .el-icon-check {
    display: none
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
}
.drop-down.active .drop-down-wrapper {
  height: auto;
  opacity: 1;
  transition: height 0ms 0ms, opacity 600ms 0ms;
}
.drop-down.active .drop-down-header{

  .el-icon-arrow-down {
    transform: rotate(180deg)
  }
}

.drop-down-footer {
  padding: 6px;
  text-align: right;
  .el-button {
    margin-left: 0;
  }
}
</style>
