<template>
  <!-- 约聊不合适原因 -->
  <el-dialog
    width="432px"
    custom-class="app-dialog"
    append-to-body
    @close="handleClose"
    :visible.sync="dialogStatus">
    <div slot="title">不合适原因</div>
    <div class="reson-wrapper">
      <div class="reson-tags-wrapper">
        <div class="reson-tag" v-for="(item, i) in list" :key="i"> {{item}}</div>
      </div>
      <p>补充说明:</p>
      <div class="reson-explain">{{explain || '未填写'}}</div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
      }
    }
  },
  props: {
    explain: String,
    list: {
      type: Array,
      default: () => ([])
    },
    visible: Boolean
  },
  data () {
    return {
      dialogStatus: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.reson-wrapper {
  padding: 0 40px 40px;
  p {
    color: $title-color-1;
  }
}
.reson-explain {
  margin-top: 12px;
  border: 1px solid $border-color-8;
  border-radius: 4px;
  padding: 10px 12px;
  line-height: 22px;
}
.reson-tags-wrapper {
  display: flex;
  margin-bottom: 12px;
  flex-wrap: wrap;
  .reson-tag {
    background: rgba($bg-color-4, .08);
    padding: 6px 20px;
    color: $main-color-1;
    border-radius: 16px;
    margin-right: 8px;
    margin-bottom: 6px;
  }
}
</style>
