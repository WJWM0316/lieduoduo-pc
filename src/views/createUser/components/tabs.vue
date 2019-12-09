<template>
  <div class="c-resume-tabs">
    <div class="tab-header">
      <div class="tab-header-title" v-show="title">请填写{{title}}</div>
      <template v-if="additional">
        <el-button type="primary" plain size="small" :disabled="additionalLimit === total - getListLength" round icon="iconfont icon-tianjiashijian" @click="handleCommand('add', {additional: true})">{{additionalTitle}}</el-button>
      </template>
      <el-button type="primary" plain size="small" :disabled="limit === getListLength" round icon="iconfont icon-tianjiashijian" @click="handleCommand('add', {})">{{title}}</el-button>
    </div>
    <div class="tabs-lists" v-if="list.length > 1">
      <template v-for="(item, index) in list">
        <span class="tab-item" :class="{active: tabIndex === index}" :key="index" @click="hanldeChangeTab(item , index)">
          <span><template v-if="tabIndex === index">{{list[index].additional ? additionalTitle : title}}</template>
          {{index  >= 9 ? index + 1  : '0'+ (index + 1)}}</span>
          <span class="iconfont icon-shanchu1" @click.stop="handleCommand('delete', item, index)" v-if="tabIndex === index"></span>
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
      type: Array,
      default: () => ([])
    },
    limit: {
      type: Number,
      default: 3
    },
    tabIndex: {
      required: true,
      type: Number,
      default: 1
    },
    additional: Boolean, // 附加
    additionalTitle: String,
    additionalLimit: {
      type: Number,
      default: 2
    }
  },
  computed: {
    getListLength () {
      return this.list.filter(val => !val.additional).length
    },
    total () {
      return this.list.length
    }
  },
  methods: {
    hanldeChangeTab (item, index) {
      if (this.tabIndex === index) return
      this.$emit('update:tabIndex', index)
      this.handleCommand('change', item, index)
    },
    handleCommand (type, value, index) {
      this.$emit('command', { type, value, index })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button--primary.is-plain {
  background: #fff;
}
.el-button--primary.is-plain:hover, .el-button--primary.is-plain:focus {
  background: $bg-color-5;
  color: $main-color-1;
}
.el-button--primary.is-plain.is-disabled:hover  {
  color: #66dce1;
  background: #fff;
  border-color: #ccf3f5;
}
.tab-header {
  display: flex;
  align-items: flex-end;
  padding-bottom: 18px;
  overflow: hidden;
  .tab-header-title {
    font-size: 24px;
    height:33px;
    line-height: 33px;
    font-weight: bold;
  }
  .el-button {
    margin-left: auto;
    padding: 7px 13px;
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
