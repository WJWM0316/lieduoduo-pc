<template>
  <!-- 约面(同意或者拒绝)弹窗 -->
  <el-dialog
    :visible.sync="dialogStatus"
    custom-class="app-dialog"
    width="432px"
    title="面试申请"
    @close="handleClose">
    <div class="apply-interview-warpper" v-loading="getLoading">
      <div class="apply-list">
        <i class="iconfont icon-zhiwei1"></i>
        <span class="position-name">{{interviewInfo.positionName}}</span>
        <span>{{interviewInfo.emolument}}</span>
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
import { getDetailApi } from 'API/candidate'
export default {
  props: {
    visible: Boolean,
    interviewId: Number
  },
  data () {
    return {
      dialogStatus: false,
      getLoading: false,
      interviewInfo: {}
    }
  },
  methods: {
    handleSet (type) {
      this.$emit('finish', { type })
      this.dialogStatus = false
      this.handleClose()
    },
    // 获取面试详情信息
    getDetails () {
      this.getLoading = true
      getDetailApi({ interviewId: this.interviewId }).then(({ data }) => {
        this.interviewInfo = data.data || {}
        this.getLoading = false
      }).catch(() => {
        this.getLoading = false
      })
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
        if (this.interviewInfo.interviewId !== this.interviewId) {
          this.getDetails()
        }
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
