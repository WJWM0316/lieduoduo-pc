<template>
  <div class="c-resume-tabs">
    <div class="tab-header">
      <div class="tab-header-title" v-show="title">请填写{{title}}</div>
      <el-button type="primary" plain size="small" :disabled="limit === list" round icon="iconfont icon-tianjiashijian" @click="handleCommand('add')">{{title}}</el-button>
    </div>
    <div class="tabs-lists" v-if="list > 1">
      <template v-for="(item, index) in list">
        <span class="tab-item" :class="{active: tabIndex === item}" :key="item" @click="hanldeChangeTab(item)">
          <span><template v-if="tabIndex === item">{{title}}</template>
          {{item  > 9 ? item  : '0'+ item}}</span>
          <span class="iconfont icon-shanchu1" @click.stop="handleCommand('delete', item, index)" v-if="tabIndex === item"></span>
        </span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,

    list: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 3
    },
    tabIndex: {
      required: true,
      type: Number,
      default: 1
    }
  },
  methods: {
    hanldeChangeTab (item) {
      if (this.tabIndex === item) return
      this.$emit('update:tabIndex', item)
      this.handleCommand('change', item)
    },
    handleCommand (type, value, index) {
      this.$emit('command', { type, value, index })
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-header {
  display: flex;
  align-items: flex-end;
  margin-bottom: 18px;
  overflow: hidden;
  .tab-header-title {
    font-size: 24px;
    height:33px;
    line-height: 33px;
    font-weight: bold;
  }
  .el-button {
    margin-left: auto;
    padding: 7px 15px;
    & /deep/ .iconfont {
      font-size: 13px;
      padding-right: 4px;
    }
  }
}
.tabs-lists {
  border-bottom: 1px solid $border-color-1;
  .tab-item {
    padding: 8px 16px;
    background: $bg-color-5;
    color: $main-color-1;
    font-size: 14px;
    border-radius:8px 8px 0px 0px;
  }
  .tab-item.active{
    color: #fff;
    background: $bg-color-4;
    position: relative;
  }
  .tab-item.active::after {
    content: "";
    position: absolute;
    border: 5px solid;
    border-color: $border-color-2 transparent transparent;
    bottom: -10px;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
  }
  .iconfont {
    margin-left: 10px;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
