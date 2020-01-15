<template>
  <!-- 约面(同意或者拒绝)弹窗 -->
  <el-dialog
    :visible.sync="dialogStatus"
    custom-class="app-dialog"
    width="432px"
    title="面试申请"
    @close="handleClose">
    <div class="apply-interview-warpper">
      <div class="apply-list">
        <i class="iconfont icon-zhiwei1"></i>
        <span class="position-name">{{position.positionName}}</span>
        <span>{{position.emolument}}</span>
      </div>
      <div class="apply-list">
        <i class="iconfont icon-mianshiguanli" />
        <span>见面聊</span>
      </div>
    </div>
    <div slot="footer">
      <el-button type="default" @click="handleSet('inappropriate')">拒绝</el-button>
      <el-button type="primary" @click="handleSet('confirm-interview')">同意</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    position: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dialogStatus: false
    }
  },
  methods: {
    handleSet (type) {
      this.$emit('finish', { type })
      this.dialogStatus = false
      this.handleClose()
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.apply-interview-warpper {
  padding: 4px 40px 0;
}
.apply-list {
  font-size: 14px;
  margin-bottom: 18px;
  color: $title-color-2;
  i {
    color: $title-color-3;
    min-width: 30px;
    font-size: 14px;
  }
  i, span {
    display: inline-block;
    vertical-align: middle;
  }
  .position-name {
    max-width: 100px;
    @include ellipsis;
    margin-right: 8px;
  }
}
</style>
