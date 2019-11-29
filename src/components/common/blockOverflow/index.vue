<template>
  <div class="block-overflow">
    <p class="introduction-text" ref="text" :class="{ introduction_viewAll: viewAllText }">
      {{ text }}
    </p>
    <el-button v-if="isIntroductionButtom" type="text" class="introduction-left-buttom" @click="viewAll">{{ this.viewAllText ? '收起' :'查看全部'}}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 157
    }
  },
  data () {
    return {
      viewAllText: false,
      isIntroductionButtom: false
    }
  },
  methods: {
    updateTextHeigth () {
      if (!this.$refs.text) return
      if (this.$refs.text.clientHeight > this.height) {
        this.isIntroductionButtom = true
      } else {
        this.isIntroductionButtom = false
      }
    },
    viewAll () {
      this.viewAllText = !this.viewAllText
    }
  },
  mounted () {
    this.updateTextHeigth()
  }
}
</script>
<style lang="scss" scoped>
.block-overflow {
  position: relative;
}
.introduction-text{
  font-size: 14px;
  color: $font-color-3;
  font-weight: 400;
  line-height: 26px;
  overflow: hidden;
  max-height: 158px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
}
.introduction-left-buttom{
  background: #ffffff;
  position: absolute;
  right: 12px;
  bottom: -5px;
}
.introduction_viewAll{
  max-height: none;
}
</style>
