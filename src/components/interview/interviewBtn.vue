<template>
  <div class="wrap">
    <div class="position">
      <!-- 24小时职位 -->
      <template v-if="infos.isRapidly">
        <el-button class="rapidlyPosition" v-if="infos.chatInfo !== null &&
        (infos.chatInfo.status === 101 ||
         infos.chatInfo.status === 301 ||
         infos.chatInfo.status === 501 ||
         infos.chatInfo.status === 701)" type="primary" @click="todoAction('goInterviewChat')" >继续聊</el-button>
        <div v-else>
          <el-button v-if="infos.rapidlyInfo.seatsNum - (infos.rapidlyInfo.applyNum + infos.rapidlyInfo.natureApplyNum) > 0 && infos.rapidlyInfo.applied === 0" class="rapidlyPosition" type="primary" @click="todoAction('grabInterviewChat')" >马上抢</el-button>
          <el-button v-else class="rapidlyPosition" type="primary" @click="todoAction('interviewChat')" >一键约聊</el-button>
        </div>
      </template>
      <!-- 普通职位 -->
      <template v-else>
        <el-button v-if="infos.chatInfo !== null &&
          (infos.chatInfo.status === 101 ||
          infos.chatInfo.status === 301 ||
          infos.chatInfo.status === 501 ||
          infos.chatInfo.status === 701)"
         type="primary" @click="todoAction('goChat')">继续聊</el-button>
        <el-button v-else type="primary" @click="todoAction('chat')">一键约聊</el-button>
      </template>
    </div>
    <download-app :visible.sync="showPopupDownload"></download-app>
    <position-downloadApp :visible.sync="showPopup"></position-downloadApp>
    <loginPop ref="loginPop" v-if="!hasLogin"></loginPop>
  </div>
</template>
<script>
import loginPop from '@/components/common/loginPop'
import downloadApp from '@/components/common/sharePopup/downloadApp'
import positionDownloadApp from '@/components/common/sharePopup/positionDownloadApp'
import {
  chatApplyApi,
  applyInterviewApi
} from '@/api/interview'
export default {
  name: 'interviewBtn',
  components: {
    loginPop,
    downloadApp,
    positionDownloadApp
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
      showPopupType: ''
    }
  },
  mounted () {
    console.log(this.infos.chatInfo)
  },
  computed: mapState({
    hasLogin: state => state.hasLogin
  }),
  methods: {
    todoAction (genre) {
      if (!this.hasLogin) {
        this.$refs.loginPop.showLoginPop = true
        return
      }
      switch (genre) {
        case 'chat':
          chatApplyApi({ recruiter: this.infos.recruiter, position: this.infos.id }).then(res => {
            console.log(res)
          })
          break
        case 'goChat':
          this.showPopupDownload = true
          break
        case 'grabInterviewChat':
          applyInterviewApi({ recruiter: this.infos.recruiter, position: this.infos.id, interview_type: 2 }).then(res => {
            console.log(res)
          })
          break
        case 'interviewChat':
          this.showPopup = true
          break
        case 'goInterviewChat':
          this.showPopupDownload = true
          break
      }
    }
  }
}
</script>
<style lang="scss">
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
  }
}
</style>
