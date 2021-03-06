<template>
  <div>
    <!-- 约聊和约面之前的弹窗 -->
    <el-dialog
      :visible.sync="dialogStatus"
      custom-class="app-dialog pay-coin-dialog"
      :title="currentText.title"
      width="432px"
      @close="hanleClose">
      <div class="pay-coin-content" v-loading="getLoading">
        <p class="header-tips">{{currentText.tipTitle}}，需消耗<span> {{coins.charge}} </span>多多币</p>
        <div class="pay-server">
          <div v-for="(item, index) in currentText.images" :key="index">
            <img :src="item" alt="">
          </div>
        </div>
        <div class="pay-tips">
          <p v-if="type === 'interview'">* 邀约后，平台顾问将1V1跟进候选人处理&面试情况</p>
          <p>* 候选人在7天内未接受邀请时，多多币将原路退回到你的账户</p>
          <p>* 更多细则，欢迎联系客服 <span>400-065-5788</span></p>
        </div>
      </div>
      <div slot="footer" class="pay-coin-footer" v-show="!getLoading">
        <div class="">
          <p class="need-pay"><span>{{coins.charge}}</span>多多币</p>
          <p class="my-coin">账户剩余 <span>{{coins.remain}}</span></p>
        </div>
        <template v-if="coins.isEnough">
          <el-button type="primary" style="width: 168px" @click="handleToPay">{{currentText.confirmButton}}</el-button>
        </template>
        <template v-else>
          <el-button type="warning" style="width: 168px" @click="serviceDialogStatus = true">{{currentText.lessCoinButton}}</el-button>
        </template>
      </div>
    </el-dialog>
    <!-- 金币不足 -->
    <contact-service :visible.sync="serviceDialogStatus" :text="{title: '充值多多币', content: '您可微信扫下方二维码，联系我们充值多多币'}"  />
  </div>
</template>
<script>
import ContactService from '@/components/contactService/public'
import { getCandidateChatCharge, getCandidateInterviewCharge, applyChat } from 'API/candidate'
import { sureOpenupAPi } from 'API/candidateType'
export default {
  props: {
    visible: Boolean,
    jobuid: [Number, String],
    positionId: Number,
    type: {
      type: String,
      default: 'chat' // chat | interview
    }
  },
  components: { ContactService },
  data () {
    return {
      dialogStatus: false, // 当前弹窗状态
      serviceDialogStatus: false,
      dialogText: {
        interview: {
          title: '顾问约面服务',
          tipTitle: '向候选人发起约面', // ，需要消耗1000多多币
          lessCoinButton: '余币不足，获取更多',
          confirmButton: '确认约面',
          images: [
            require('@/assets/images/pay/img_adviser_introduction_1.png'),
            require('@/assets/images/pay/img_adviser_introduction_2.png'),
            require('@/assets/images/pay/img_adviser_introduction_3.png'),
            require('@/assets/images/pay/img_adviser_introduction_4.png')
          ]
        },
        chat: {
          title: '邀请候选人约聊',
          tipTitle: '向候选人发起约聊', // 需要消耗100多多币
          lessCoinButton: '余币不足，获取更多',
          confirmButton: '确认约聊',
          images: [
            require('@/assets/images/pay/img_chat_introduction_1.png'),
            require('@/assets/images/pay/img_chat_introduction_2.png'),
            require('@/assets/images/pay/img_chat_introduction_3.png'),
            require('@/assets/images/pay/img_chat_introduction_4.png')
          ]
        }
      },
      coins: {
        needCharge: 0,
        charge: 0,
        remain: 0,
        isEnough: 0
      },
      getLoading: false
    }
  },
  computed: {
    // text
    currentText () {
      return this.dialogText[this.type] || {}
    }
  },
  methods: {
    // 去支付
    handleToPay () {
      if (this.type === 'chat') {
        // 约聊
        applyChat({
          jobhunter: this.jobuid,
          position: this.positionId
        }).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.$message.success('约聊成功')
            this.hanleClose()
            this.$emit('finish', 'chat')
          }
        })
      } else {
        // 约面
        sureOpenupAPi({
          jobhunterUid: this.jobuid,
          positionId: this.positionId,
          isAdvisor: 1
        }).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.$message.success('约面成功')
            this.hanleClose()
            this.$emit('finish')
          }
        })
      }
    },
    hanleClose () {
      this.dialogStatus = false
      this.$emit('update:visible', false)
    },
    // 获取硬币数量
    getCoinNumber () {
      this.getLoading = true
      if (this.type === 'chat') {
        getCandidateChatCharge(this.jobuid).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.coins = data.data
          }
          this.getLoading = false
        }).catch(() => {
          this.getLoading = false
        })
      } else {
        getCandidateInterviewCharge(this.jobuid).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.coins = data.data
          }
          this.getLoading = false
        }).catch(() => {
          this.getLoading = false
        })
      }
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = value
        this.getCoinNumber()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-coin-content {
  padding: 0 40px;
  .header-tips {
    margin-top: 6px;
    color: $title-color-2;
  }
  .pay-server {
    margin: 20px 0 11px;
    div {
      width: 168px;
      font-size: 14px;
      color: $main-color-1;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      border-radius:4px;
      margin-bottom: 10px;
    }
    img {
      max-width: 100%;
      min-height: 100%;
    }
    div:nth-child(even) {
      margin-left: 16px;
    }
  }
  .pay-tips {
    p{
      color: $font-color-10;
      font-size: 12px;
      margin-bottom: 8px;
    }
    span {
      color: $main-color-1;
    }
  }
}
.header-tips, .need-pay, .my-coin {
  span {
    color: $warning-color-1;
  }
}
.pay-coin-footer {
  @include flex-v-center;
  padding-left: 40px;
  text-align: left;
  .el-button {
    margin-left: auto;
  }
  .need-pay {
    color: $title-color-1;
    font-size: 14px;
    span {
      font-size: 30px;
      font-weight: bold;
      padding-right: 4px;
    }
  }
  .my-coin {
    color: $title-color-2;
    font-size: 12px;
    span{
      padding-left: 6px;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
.el-dialog__wrapper .app-dialog.el-dialog.pay-coin-dialog .el-dialog__header {
  padding-bottom: 0px;
}
</style>
