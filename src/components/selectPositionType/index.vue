<template>
  <div class="position-type">
    <div @click="handleShowDialog">
      <slot>
        <div class="el-input" >
          <div class="el-input__inner">{{label || title}}</div>
        </div>
      </slot>
    </div>
    <el-dialog
      :title="title"
      width="650px"
      :visible.sync="showDialog">
      <div class="lists-wrapper">
        <ul class="lists-left">
          <template v-for="item in listData">
            <li :key="item.labelId" :class="{active: item.labelId === parentListId}" @click="handleAsideCheck(item)">{{item.name}}</li>
          </template>
        </ul>
        <div class="lists-content">
          <el-input class="el-input-radius no-error" :show-message="false" style="width: 320px;" suffix-icon="el-icon-search" size="medium" v-model="keyword" @keyup.native.enter="handleSearch"/>
          <div class="lists-items">
            <template v-for="item in parentSelectData">
              <span :key="item.labelId" @click="handleShowDetails(item)">
                <i class="iconfont" :class="item.open ? 'icon-shouqi' : 'icon-tianjia'" /> {{item.name}}
              </span>
            </template>
          </div>
          <template v-if="searchData.length">
            <div class="lists-selected">
              <template v-for="item in searchData">
                <span :key="item.labelId" @click="handleSelected(item)">{{item.name}}</span>
              </template>
            </div>
          </template>
          <template v-else>
            <div class="lists-selected" v-if="selectedData.length">
              <template v-for="item in selectedData">
                <span :key="item.labelId" @click="handleSelected(item)">{{item.name}}</span>
              </template>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLabelPositionListApi } from '@/api/putIn'
import { searchPositionApi } from '@/api/position'

export default {
  props: {
    value: [String, Array, Number],
    label: String,
    title: {
      type: String,
      default: '请选择期望职位'
    }
  },
  data () {
    return {
      showDialog: false,
      listData: [], // 接口获取到的所有内容
      parentListId: null, // 当前选择parentid
      parentSelectData: [], // 父级选择的内容
      selectedData: [], // 展示可选择的内容
      searchData: [], // 查询接口返回的数据
      keyword: '' // search value
    }
  },
  methods: {
    getLists () {
      if (this.listData.length) return
      this.searchData = []
      getLabelPositionListApi().then(({ data }) => {
        this.listData = data.data || []
        // 数据复现
        this.reviewData(this.value)
      })
    },
    handleShowDialog () {
      this.showDialog = true
      this.getLists()
    },
    reviewData (id) {
      if (id) {
        // 递归找到对应item
        /* function func(data, results = {}) {
          data.forEach(data => {
            if(data.labelId === id)
          })
        } */
      } else {
        this.handleAsideCheck(this.listData[0])
      }
    },
    handleSearch () {
      searchPositionApi({ name: this.keyword }).then(({ data }) => {
        this.selectedData = []
        this.parentListId = null
        this.parentSelectData = []
        this.searchData = data.data || []
      })
    },
    // 左侧内容选择
    handleAsideCheck (item) {
      this.parentListId = item.labelId
      this.parentSelectData = item.children || []
      this.searchData = []
      this.selectedData = []
    },
    // 显示详情
    handleShowDetails (item) {
      const open = !item.open
      // 收起其他
      this.parentSelectData.forEach(val => {
        if (val.open) val.open = false
      })
      this.$set(item, 'open', open)
      this.selectedData = item.children
    },
    handleSelected (item) {
      this.$emit('input', item.labelId)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', item.labelId)
      }
      this.$emit('on-selected', item)
      this.showDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.position-type {
  line-height: normal !important;
}
.el-dialog__wrapper {
  & /deep/ {
    .el-dialog__header {
      padding: 32px 20px 20px 42px;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
}
.lists-wrapper {
  height: 550px;
  .lists-left {
    float: left;
    width: 142px;
    overflow-y: auto;
    height: 100%;
    li {
      height: 46px;
      text-align: center;
      line-height: 46px;
      position: relative;
      cursor: pointer;
    }
    .active {
      color: $main-color-1;
      background-color: $bg-color-8;
    }
    li.active:after {
      content: "";
      width: 4px;
      height: 20px;
      background: $main-color-1;
      border-radius: 0px 50px 50px 0px;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -10px;
    }
    li:hover {
      color: $main-color-1;
    }
  }
  .lists-content {
    overflow-x: hidden;
    height: 100%;
    padding: 20px 28px;
    box-sizing: border-box;
    overflow-y: auto;
    background-color: $bg-color-8;
  }
}
.lists-items, .lists-selected {
  & > span {
    display: inline-block;
    width: 33.3333%;
    cursor: pointer;
    font-size: 14px;
    @include ellipsis();
    line-height: 14px;
    margin: 12px 0;
  }
}
.lists-items {
  padding: 8px 0;
  width: 100%;
  i {
    color: $main-color-1;
  }
}
.lists-selected {
  background-color: $bg-color-1;
  padding: 16px;
  box-sizing: border-box;
  span {
    color: $main-color-1;
  }
  span:hover{
    color: $font-color-1;
  }
}
</style>
