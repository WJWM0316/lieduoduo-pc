<template>
  <!-- 高级筛选 -->
  <div class="high-filter">
    <el-popover
      placement="bottom-end"
      width="400"
      @show="hanldeShow"
      v-model="poperStatus"
      trigger="click">
      <div class="b-header-group-button split-line-full" slot="reference">
        <div class="b-header-button" :class="{'is-active-popover': poperStatus}" @click.stop="handleClear"><i class="iconfont icon-shaixuan" style="padding-right: 6px"></i>{{len ?  '清除筛选' : '高级筛选'}}</div>
        <div class="b-header-button" :class="{'is-active-popover': poperStatus}"><i class="iconfont icon-jiantou"></i></div>
      </div>
      <div class="filter-wrapper">
        <p class="filter-title">{{title}}</p>
        <div class="filter-content">
          <template v-for="item in lists">
            <span
              @click="handleSelect(item)"
              :key="item.labelId"
              :class="{active: item.active}">{{item.name}}</span>
          </template>
        </div>
        <div class="filter-footer">
          <el-button size="small" style="width: 88px" @click="handleRecall">取消</el-button>
          <el-button size="small" style="width: 116px" type="primary" @click="handleChange">确定</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    value: Array,
    title: {
      type: String,
      default: '看过我的职位类型'
    },
    lists: {
      type: Array,
      default: () => ([])
    },
    allValue: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      poperStatus: false
    }
  },
  computed: {
    len () {
      return this.value.length && this.value[0] !== 'all'
    }
  },
  methods: {
    handleChange () {
      this.poperStatus = false
      this.tempValue = JSON.parse(this.tempValue)
      this.$emit('change', this.value)
    },
    hanldeShow () {
      this.tempValue = JSON.stringify(this.value || [])
    },
    handleClear (type) {
      if (this.len) {
        this.poperStatus = false
        this.lists.forEach(val => {
          val.active = false
        })
        if (this.allValue[0] === 'all') {
          this.$emit('input', ['all'])
          if (type !== 'parent') this.$emit('change', ['all'])
          this.lists[0].active = true
        } else {
          this.$emit('input', [])
          if (type !== 'parent') this.$emit('change', [])
        }
        this.tempValue = JSON.stringify(this.value || [])
      } else {
        this.poperStatus = true
      }
    },
    handleRecall () {
      this.poperStatus = false
      this.tempValue = JSON.parse(this.tempValue)
      this.$emit('input', this.tempValue)
      this.lists.forEach(val => {
        val.active = this.tempValue.includes(val.labelId)
      })
    },
    handleSelect (item) {
      item.active = !item.active
      // 单选
      if (this.allValue.includes(item.labelId)) {
        if (item.active) {
          this.$emit('input', [item.labelId])
          this.lists.forEach(val => {
            val.active = false
          })
          item.active = true
        } else {
          this.$emit('input', [])
        }
      } else {
        // 多选
        if (item.active) {
          // 取消全部全选项
          this.lists.forEach(val => {
            if (this.allValue.includes(val.labelId)) {
              if (val.active) {
                val.active = false
                const index = this.value.findIndex(val => val === val.labelId)
                this.value.splice(index, 1)
              }
            }
          })
          this.$emit('input', [...this.value, item.labelId])
        } else {
          const index = this.value.findIndex(val => val === item.labelId)
          this.value.splice(index, 1)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.high-filter {
  display: inline-block;
  .is-active-popover{
    color: $main-color-1;
    .iconfont {
      color: $main-color-1;
    }
  }
}
.filter-wrapper {
  padding: 18px 28px;
  .filter-title {
    font-size: 14px;
    font-weight: bold;
    color: $title-color-1;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
.filter-content {
  span {
    background: $bg-color-11;
    border-radius: 4px;
    display: inline-block;
    color: $title-color-2;
    font-size: 14px;
    padding: 6px 12px;
    line-height: 1;
    margin: 0 8px 16px 0;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  span:hover {
    color: $main-color-1;
  }
  span.active {
    font-weight: bold;
    color: $main-color-1;
    background: rgba($bg-color-4, 0.1);
  }
}
.filter-footer {
  text-align: right;
  margin-top: 36px;
  margin-bottom: 2px;
}
</style>
<style lang="scss">

</style>
