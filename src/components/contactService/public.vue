<template>
<!-- 普通的联系客服弹窗 -->
  <el-dialog
    width="432px"
    custom-class="app-dialog"
    top="calc((100vh - 460px) / 2)"
    @close="handleClose"
    :visible.sync="contactDialogStatus">
    <div class="contact-wrapper">
      <p class="contact-title">{{text.title}}</p>
      <p>{{text.content}}</p>
      <div class="contact-qrcode">
        <img :src="qrCode" alt="">
      </div>
      <p>或拨打全国咨询热线</p>
      <p class="contact-number">400-065-5788</p>
    </div>
  </el-dialog>
</template>
<script>
import { wx_account_qrcode } from 'IMAGES/image'
export default {
  props: {
    visible: Boolean,
    text: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      contactDialogStatus: false,
      qrCode: wx_account_qrcode
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible (value) {
      this.contactDialogStatus = value
    }
  }
}
</script>
<style lang="scss" scoped>
/** b端联系客服弹窗样式 */
.contact-wrapper {
  text-align: center;
  p {
    color: $title-color-2;
    font-size: 14px;
    line-height: 20px;
  }
  .contact-title {
    font-size: 24px;
    color: $title-color-1;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .contact-qrcode {
    display: inline-block;
    width: 194px;
    margin: 8px 0 30px;
    img {
      max-width: 100%;
    }
  }
  .contact-number {
    font-weight: bold;
    color: $main-color-1;
    font-size: 30px;
    padding-bottom: 48px;
    margin-top: 14px;
  }
}
</style>
