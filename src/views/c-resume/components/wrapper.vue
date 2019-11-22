<template>
  <div>
    <div class="resume-wrapper-item" v-if="unshowEdit">
      <div class="wrapper-header">
        <slot name="header"></slot>
      </div>
      <div class="wrapper-list-content" v-if="list.length || isDelete">
        <div class="list-item" v-for="(item,index) in list" :key="index">
          <div class="wrapper-info">
            <slot name="content" :row="item"></slot>
          </div>
          <div class="wrapper-operate" v-if="status !== 'view'">
            <slot name="operate">
              <span class="iconfont icon-shanchu"  @click="handleDelete(item, index)" v-if="isDelete"></span>
              <span class="el-icon-edit" v-if="!isEmpty" @click="handleEdit(item, index)"></span>
            </slot>
          </div>
        </div>
        <div class="list-item"  v-if="status !== 'view'">
          <div class="wrapper-info">
            <slot name="bottom"></slot>
          </div>
        </div>
      </div>
      <div class="wrapper-content"  v-else>
        <div class="wrapper-info">
          <slot name="content"></slot>
          <slot name="bottom"  v-if="status !== 'view'"></slot>
        </div>
        <div class="wrapper-operate" v-if="status !== 'view'">
          <slot name="operate">
            <span class="el-icon-edit" v-if="!isEmpty"  @click="handleEdit"></span>
          </slot>
        </div>
      </div>
    </div>
    <div class="wrapper-edit" v-else>
      <slot name="edit"></slot>
      <div class="wrapper-button">
        <el-button @click="handleClose" size="small">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="btnLoading" size="small">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDelete: Boolean,
    isEmpty: Boolean,
    list: {
      type: Array,
      default: () => ([])
    },
    status: String,
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      unshowEdit: true,
      btnLoading: false
    }
  },
  methods: {
    handleDelete (item, index) {
      if (this.config.limit) {
        if (this.list.length <= this.config.limit) {
          this.$alert(this.config.limitText, '提示', {
            confirmButtonText: '好的',
            type: 'warning'
          })
          return
        }
      }
      this.$confirm('确定删除本条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('command', {
          type: 'delete',
          item,
          index
        })
      }).catch(() => {})
    },
    handleEdit (item = {}, index = null) {
      this.unshowEdit = false
      this.$emit('command', {
        type: 'edit',
        item,
        index
      })
    },
    handleClose () {
      this.$confirm('退出编辑后，更新的内容不会自动保存?', '有内容没有保存?确定退出编辑吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.unshowEdit = true
      })
    },
    handleSave () {
      this.btnLoading = true
      this.$emit('command', {
        type: 'save',
        cb: (status = true) => {
          this.btnLoading = false
          this.unshowEdit = status
        }
      })
    },
    showEditCompoents () {
      this.unshowEdit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.resume-wrapper-item {
  @include flex-v-top;
  padding: 0 46px;
  .wrapper-content {
    flex: 1;
    @include flex-v-top;
  }
  .list-item {
    width: 100%;
    @include flex-v-top;
  }
  .list-item+.list-item {
    margin-top: 42px;
  }
  .wrapper-list-content {
    flex: 1;
  }
  .wrapper-header {
    width: 145px;
    padding-right: 32px;
    font-size: 17px;
    color: $title-color-1;
    font-weight: bold;
    box-sizing: border-box;
    text-align: right;
  }
  .wrapper-info {
    flex: 1;
    max-width: 520px;
  }
  .wrapper-operate {
    width: 100px;
    margin-left: auto;
    text-align: right;
    span {
      color: $font-color-12;
      font-size: 16px;
      cursor: pointer;
    }
    span + span {
      margin-left: 20px;
    }
    span:hover {
      color: $main-color-1;
    }
  }
}
.wrapper-edit {
  padding: 30px 96px 40px;
  background-color: $bg-color-1
}
.wrapper-button {
  text-align: right;
  .el-button {
    width: 88px;
  }
}
</style>
