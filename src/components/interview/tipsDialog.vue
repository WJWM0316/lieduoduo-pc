<template>
  <el-dialog
    @close="handleClose"
    width="432px"
    custom-class="app-dialog tips-dialog"
    :visible.sync="dialogStatus">
    <!-- 720 | 730 -->
    <template v-if="code === 720 || code === 730">
      <template slot="title">
        <div class="tips-title"><i class="iconfont icon-cuowu"></i>申请失败 <span>（简历完善度偏低）</span></div>
      </template>
      <div class="tips-content">
        <div style="padding-left: 26px">系统检测到你的在线简历完善度偏低，完善后解锁无限次申请机会（如有疑问，可联系客服申诉，客服微信：ziwork0006 <span @click="hanldeCopy" class="wechat-code-text" data-clipboard-text="ziwork0006">复制客服微信</span>)</div>
      </div>
      <template slot="footer">
        <el-button @click="handleClose">知道了</el-button>
        <el-button type="primary" @click="$router.push({name: 'cresume'})">完善简历</el-button>
      </template>
    </template>
    <!-- 721 | 731 -->
    <template v-if="code === 721 || code === 731">
      <template slot="title">
        <div class="tips-title">当前申请机会已不足1次</div>
      </template>
      <div class="tips-content">完善项目经历，解锁无限次申请机会</div>
      <template slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="$router.push({name: 'cresume'})">马上完善</el-button>
      </template>
    </template>
    <!-- 722 | 732 -->
    <template v-if="code === 722 || code === 732">
      <template slot="title">
        <div class="tips-title"><i class="iconfont icon-cuowu"></i>申请失败<span>（职位类型不匹配）</span></div>
      </template>
      <div class="tips-content">
        <div style="padding-left: 26px">你的期望职位类型与该职位不匹配，请修改后再申请。</div>
      </div>
      <template slot="footer">
        <el-button @click="handleClose">知道了</el-button>
        <el-button type="primary" @click="$router.push({name: 'cresume'})">编辑简历</el-button>
      </template>
    </template>
    <!-- 725 | 735 -->
    <template v-if="code === 725 || code === 735 || code === 726 || code === 736">
      <template slot="title">
        <div class="tips-title">职位匹配度较低</div>
      </template>
      <div class="tips-content">你的期望职位和该职位匹配度较低，确定要申请吗？</div>
      <template slot="footer">
        <el-button @click="handleReApplay">继续申请</el-button>
        <el-button type="primary" @click="handleClose">再看看</el-button>
      </template>
    </template>
    <!-- 726 | 736 -->
    <template v-if="code === 727 || code === 737">
      <template slot="title">
        <div class="tips-title">信息小调研</div>
      </template>
      <div class="tips-content">系统检测到你的工作经验和工作经历不匹配，请问信息是匹配的吗？</div>
      <template slot="footer">
        <el-checkbox v-model="isCheckTip" label="不再提示"></el-checkbox>
        <el-button type="default" @click="handleReApplay">信息无误</el-button>
        <el-button type="primary" @click="$router.push({name: 'cresume'})">修改简历</el-button>
      </template>
    </template>
    <!-- 2001 | 2002 | 2003  -->
    <template v-if="code === 2001 || code === 2002 || code === 2003">
      <template slot="title">
        <div class="tips-title">申请成功</div>
      </template>
      <div class="tips-content">
        <template v-if="code === 2003">80%的招聘官更青睐有上传附件简历的候选</template>
        <template v-else>你的简历竞争力<span class="weight-text">偏低</span>，建议完善简历提高申请通过率~</template>
      </div>
      <template slot="footer">
        <template v-if="code === 2001">
          <div class="c-btn" style="margin-right: 16px;" @click="$router.push({name: 'cresume', query: {todo: 'upload'}})">上传附件简历</div>
          <el-button type="primary" @click="$router.push({name: 'cresume'})">完善在线简历</el-button>
        </template>
        <template v-if="code ===2002">
          <el-button type="default" @click="handleClose">暂不完善</el-button>
          <el-button type="primary" @click="$router.push({name: 'cresume'})">完善在线简历</el-button>
        </template>
        <template v-if="code === 2003">
          <el-button type="default" @click="handleClose">暂不完善</el-button>
          <el-button type="primary" @click="$router.push({name: 'cresume', query: {todo: 'upload'}})">上传附件简历</el-button>
        </template>
      </template>
    </template>
    <!-- 2004 -->
    <template v-if="code === 2004">
      <template slot="title">
        <div class="tips-title tips-title-success"><i class="iconfont icon-chenggong"></i>抢占成功</div>
      </template>
      <div class="tips-content tip-success">
        <div style="padding-left: 26px; margin-bottom: 33px">{{text || '面试官已收到你的申请，将于24h内给你反馈~'}}</div>
        <div style="text-align: center">
          <img src="~@/assets/images/24h_apply_success.png" alt="">
        </div>
      </div>
      <template slot="footer">
        <el-button type="default" @click="handleClose">知道了</el-button>
        <el-button type="primary" style="width: 158px;" @click="$router.push({name: 'position24h'})">抢更多高薪机会</el-button>
      </template>
    </template>
  </el-dialog>
</template>
<script>
import { setReconfirmHide } from 'API/interview'
import Clipboard from 'clipboard'
export default {
  props: {
    visible: Boolean,
    code: Number,
    text: String
  },
  data () {
    return {
      dialogStatus: false,
      isCheckTip: false
    }
  },
  methods: {
    // 继续申请
    handleReApplay () {
      this.handleSetHide()
      this.$emit('re-apply', this.code)
    },
    handleClose () {
      this.dialogStatus = false
      this.$emit('update:visible', false)
    },
    handleSetHide () {
      if (this.isCheckTip) {
        let key = Number(!this.isCheckTip)
        setReconfirmHide({
          code: this.code,
          isTmp: key
        }).then(() => {
          this.isCheckTip = false
        })
      }
    },
    hanldeCopy () {
      const clipObj = new Clipboard('.wechat-code-text')
      clipObj.on('success', (e) => {
        this.$message.success('复制成功～')
        e.clearSelection()
      })
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
.tips-title {
  font-size: 16px !important;
  .icon-cuowu {
    color: $--message-warning-font-color;
    padding-right: 10px;
  }
  .icon-chenggong {
    color: $bg-color-4;
    padding-right: 10px;
  }
  span {
    font-weight: normal !important;
  }
}
.tips-content {
  padding: 0 40px;
  font-size:14px;
  line-height: 22px;
  color: $title-color-2;
  img {
    max-width: 100%;
    width: 314px;
  }
  .wechat-code-text, .weight-text{
    color: $main-color-1;
    cursor: pointer;
  }
}
.tips-title.tips-title-success {
  color: $main-color-1;
}
.el-checkbox {
  color: $title-color-3;
  margin-right: 52px;
}
</style>
<style lang="scss">
.tips-dialog.app-dialog {
  .el-dialog__header {
    padding-bottom: 6px !important;
  }
  .el-dialog__footer {
    .el-button--default {
      padding-left: 0;
      padding-right: 0;
      text-align: center;
    }
  }
}
</style>
