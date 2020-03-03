<template>
  <div class="wrap">
    <div class="position">
      <!-- 24小时职位 -->
      <template v-if="infos.isRapidly">

        <!-- 是否已经登录, 在未登录状态infos.interviewSummary会为null -->
        <template v-if="!hasLogin">
          <el-button :loading="loading" class="rapidlyPosition" type="primary" @click="todoAction('grabInterviewChat')">马上抢</el-button>
        </template>

        <!-- 有无约聊关系 -->
        <template v-else-if="infos.chatInfo === null">
          <!-- 有没有抢占过当前职位,     并且没有席位则一键约聊,    没有约面状态且是c约面b -->
          <el-button v-if="infos.rapidlyInfo.applied === 0 &&
          infos.rapidlyInfo.seatsNum - (infos.rapidlyInfo.applyNum + infos.rapidlyInfo.natureApplyNum) > 0 &&
          (infos.interviewSummary.interviewInfo === null ||
          infos.interviewSummary.interviewInfo.status === 11)"
           :loading="loading" class="rapidlyPosition" type="primary" @click="todoAction('grabInterviewChat')">马上抢</el-button>

          <el-button v-else :loading="loading" class="rapidlyPosition" type="primary" @click="todoAction('interviewChat')" >一键约聊</el-button>
        </template>

        <template v-else>
          <!-- 是不是b发起的约聊，如果是则继续聊，否则马上抢   并且没有席位则继续聊,    没有约面状态且是c约面b  -->
          <el-button v-if="infos.rapidlyInfo.applied === 0 &&
          infos.chatInfo.status !== 501 && infos.chatInfo.status !== 701 &&
          infos.rapidlyInfo.seatsNum - (infos.rapidlyInfo.applyNum + infos.rapidlyInfo.natureApplyNum) > 0 &&
          (infos.interviewSummary.interviewInfo === null ||
          infos.interviewSummary.interviewInfo.status === 11)"
           :loading="loading" class="rapidlyPosition" type="primary" @click="todoAction('grabInterviewChat')">马上抢</el-button>

          <el-button v-else :loading="loading" class="rapidlyPosition" type="primary" @click="todoAction('goInterviewChat')" >继续聊</el-button>
        </template>
      </template>

      <!-- 普通职位 -->
      <template v-else>

        <el-button :loading="loading" v-if="infos.chatInfo !== null &&
          (infos.chatInfo.status === 101 ||
          infos.chatInfo.status === 301 ||
          infos.chatInfo.status === 501 ||
          infos.chatInfo.status === 701)"
          type="primary" @click="todoAction('goChat')">继续聊</el-button>
        <el-button :loading="loading" v-else type="primary" @click="todoAction('chat')">一键约聊</el-button>
      </template>
    </div>
    <download-app :visible.sync="showPopupDownload"></download-app>
    <tips-dialog
      :visible.sync="tipsPopup"
      :content="text"
      :is24hours="infos.isRapidly || 0"
      :endtime="infos.rapidlyServiceEndTime || ''"
      @re-apply="code => todoAction(tipsTempActionType, code)"
      :code="responseCode">
    </tips-dialog>
    <position-downloadApp :visible="showPopup" :type="showPopupType" :text="text"></position-downloadApp>
    <loginPop ref="loginPop" v-if="!hasLogin"></loginPop>
  </div>
</template>
<script>
import loginPop from '@/components/common/loginPop'
import downloadApp from '@/components/common/sharePopup/downloadApp'
import positionDownloadApp from '@/components/common/sharePopup/positionDownloadApp'
import TipsDialog from './tipsDialog'
import {
  chatApplyApi,
  applyInterviewApi
} from '@/api/interview'
export default {
  name: 'interviewBtn',
  components: {
    loginPop,
    downloadApp,
    positionDownloadApp,
    TipsDialog
  },
  props: {
    infos: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    positionId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showPopup: false,
      showPopupDownload: false,
      showPopupType: '', // chat 约聊成功 grabInterviewChat 抢占成功
      tipsPopup: false,
      tipsTempActionType: '', // 缓存提示弹窗之前的switch 类型
      text: '',
      loading: false,
      responseCode: 0,
      onceApplySuccess: false // 当天是否有一次申请职位成功
    }
  },
  computed: mapState({
    hasLogin: state => state.hasLogin
  }),
  mounted () {
    const lastApplySuccessTime = localStorage.getItem('lastApplyTime')
    // 只要两个日期不等 = 今天没有申请成功的职位
    this.onceApplySuccess = !!(lastApplySuccessTime && new Date(parseInt(lastApplySuccessTime)).getDate() === new Date().getDate())
  },
  methods: {
    todoAction (genre, code) {
      this.loading = true
      if (!this.hasLogin) {
        this.$refs.loginPop.showLoginPop = true
        this.loading = false
        return
      }
      switch (genre) {
        case 'chat': // 约聊
          this.tipsTempActionType = genre
          this.chatApply(code)
          break
        case 'goChat': // 继续聊
          this.showPopupDownload = true
          this.loading = false
          break
        case 'grabInterviewChat': // 抢占24小时职位
          if (this.infos.rapidlyInfo.changePositionToast === 1) { // 有没有已经抢占当前招聘官的职位
            this.$confirm('你已约面该招聘官的其他职位', '是否要更换该约面职位', {
              distinguishCancelAndClose: true,
              confirmButtonText: '更换约面职位',
              cancelButtonText: '我再想想'
            }).then(() => {
              this.applyInterview(code)
            }).catch(() => {
              this.loading = false
            })
            return
          }
          this.tipsTempActionType = genre
          this.applyInterview(code)
          // this.responseCode = 2001
          // this.tipsPopup = true
          break
        case 'interviewChat': // 24约聊
          this.chatApply(code)
          this.tipsTempActionType = genre
          break
        case 'goInterviewChat': // 24继续聊
          this.showPopupDownload = true
          this.loading = false
          break
      }
    },
    applyInterview (code) { // 抢占成功方法
      let data = {
        recruiterUid: this.infos.recruiter,
        positionId: this.infos.id,
        interview_type: 2
      }
      if (process.env.VUE_APP_ENV === 'development') data.testCheckTag = 1
      if (code && this.reconfirmCode) data.reconfirmCode = this.reconfirmCode
      applyInterviewApi(data).then(res => {
        this.loading = false
        if (res.data.code === 915) {
          this.$confirm('已改为提交约聊申请，面试官将尽快处理。', '活动已过期', {
            distinguishCancelAndClose: true,
            confirmButtonText: '知道了',
            showCancelButton: false
          }).then(() => {
            this.showPopupType = 'chat' // 约聊成功弹窗以及传参
            this.showPopup = true
            this.$emit('init')
          })
          return
        }
        if (res.data.code === 916) {
          this.$confirm('已改为提交约聊申请，面试官将尽快处理。', '约面席位已抢光', {
            distinguishCancelAndClose: true,
            confirmButtonText: '知道了',
            showCancelButton: false
          }).then(() => {
            this.showPopupType = 'chat' // 约聊成功弹窗以及传参
            this.showPopup = true
            this.$emit('init')
          })
          return
        }
        this.responseCode = res.data.code
        if (this.responseCode === 0 || this.responseCode === 200 || this.responseCode > 900) {
          if (this.responseCode === 917) this.text = res.data.msg
          // 如果申请成功过，引导完善简历
          if (this.onceApplySuccess) {
            this.responseCode = this.getTipsSuccessCode()
            this.tipsPopup = true
            // 如果当天第一次申请成功显示引导下载app
          } else {
            this.tipsPopup = false
            localStorage.setItem('lastApplyTime', Date.now())
            this.showPopupType = 'grabInterviewChat' // 抢占成功弹窗以及传参
            this.showPopup = true
          }
        }
        this.$emit('init')
      }).catch(({ data }) => {
        if (data.code > 400) {
          this.responseCode = data.code
          this.reconfirmCode = data.data.reconfirmCode || null
          this.tipsPopup = true
        }
        this.loading = false
      })
    },
    chatApply (code) { // 约聊成功方法
      let data = {
        recruiter: this.infos.recruiter,
        position: this.infos.id
      }
      if (process.env.VUE_APP_ENV === 'development') data.testCheckTag = 1
      if (code && this.reconfirmCode) data.reconfirmCode = this.reconfirmCode
      chatApplyApi(data).then(res => {
        this.responseCode = res.data.code
        if (this.responseCode === 0 || this.responseCode === 200) {
          const successCode = this.getTipsSuccessCode()
          if (!this.onceApplySuccess || successCode === 2004) {
            localStorage.setItem('lastApplyTime', Date.now())
            this.showPopupType = 'chat' // 约聊成功
            this.tipsPopup = false
            this.showPopup = true
          } else {
            this.responseCode = successCode
            this.tipsPopup = true
          }
        }
        this.loading = false
        this.$emit('init')
      }).catch(({ data }) => {
        if (data.code > 400) {
          this.responseCode = data.code
          this.reconfirmCode = data.data.reconfirmCode
          this.tipsPopup = true
        }
        this.loading = false
      })
    },
    // 获取成功弹窗提示的code
    getTipsSuccessCode () {
      const { myResume: { resumeCompletePercentage, resumeAttach } } = this.$store.state.resume
      if (resumeCompletePercentage > 0.75 && resumeAttach) {
        return 2004
      }
      if (resumeCompletePercentage <= 0.75 && resumeAttach) {
        return 2002
      }
      if (resumeCompletePercentage > 0.75 && !resumeAttach) {
        return 2003
      }
      if (resumeCompletePercentage <= 0.75 && !resumeAttach) {
        return 2001
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  .el-button{
    width:298px;
    height:36px;
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    border: none;
  }
  .rapidlyPosition{
    background: #ff9e40;
    &:hover{
      background: mix(#ff9e40, #ffffffCC);
    }
  }
}
.el-message-box{
  padding-bottom: 2px !important;
}
</style>
