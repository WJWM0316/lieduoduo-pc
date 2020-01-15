<template>
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
        <div v-for="(item, index) in currentText.listTips" :key="index">{{item}}</div>
      </div>
      <div class="pay-tips">
        <p>* 邀约后，平台顾问将1V1跟进候选人处理&面试情况</p>
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
        <el-button type="warning" style="width: 168px">{{currentText.lessCoinButton}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>
<script>
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
  data () {
    return {
      dialogStatus: false, // 当前弹窗状态
      dialogText: {
        interview: {
          title: '顾问约面服务',
          tipTitle: '向候选人发起约面', // ，需要消耗1000多多币
          lessCoinButton: '金币不足，获取更多',
          confirmButton: '确认约面',
          listTips: ['顾问跟进', '帮你沟通', '撮合约面', '到场才扣费']
        },
        chat: {
          title: '邀请候选人约聊',
          tipTitle: '向候选人发起约聊', // 需要消耗100多多币
          lessCoinButton: '金币不足，获取更多',
          confirmButton: '确认约聊',
          listTips: ['畅聊职位', '高效约面', '了解面试进展', '受邀才扣费']
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
          positionId: this.positionId
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
          positionId: this.positionId
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
      padding: 20px 0 28px 20px;
      font-size: 14px;
      color: $main-color-1;
      box-sizing: border-box;
      background: rgba($bg-color-4, .08);
      display: inline-block;
      vertical-align: middle;
      border-radius:4px;
      margin-bottom: 9px;
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
    font-size: 14px;
    span{
      padding-left: 6px;
    }
  }
}
</style>
<style lang="scss">
.el-dialog__wrapper .app-dialog.el-dialog.pay-coin-dialog .el-dialog__header {
  padding-bottom: 0px;
}
</style>
