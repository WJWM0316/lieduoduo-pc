<template>
  <div class="block-overflow">
    <p class="introduction-text" ref="text" :class="{ introduction_viewAll: viewAllText }">{{ text }}<el-button v-if="isIntroductionButtom" type="text" class="introduction-left-buttom" :class="{ buttom_viewAll: viewAllText }" @click="viewAll">{{ this.viewAllText ? '收起' :'展开'}}</el-button></p>

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
  position: relative;
}
.introduction-left-buttom{
  background: url('../../../assets/images/cover.png');
  line-height: 26px;
  padding: 0 0 0 72px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.introduction_viewAll{
  overflow: visible;
  max-height: none;
}
.buttom_viewAll{
  bottom: -26px;
}
</style>
