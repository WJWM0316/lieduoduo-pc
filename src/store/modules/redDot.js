import { getLeftColumnRedDotInfoApi } from '@/api/candidate'
export default {
  state: { // b端数据
    recruiterIntentionList: 0,
    recruiterInviteList: 0,
    recruiterScheduleList: 0,
    newJoinApplyNum: 0
  },
  getters: {
    recruiterIntentionList: state => state.recruiterIntentionList, // 候选人库红点 = recruiterIntentionList + recruiterInviteList
    recruiterInviteList: state => state.recruiterInviteList,
    recruiterScheduleList: state => state.recruiterScheduleList, // 面试日程红点
    newJoinApplyNum: state => state.newJoinApplyNum // 招聘团队红点
  },
  mutations: {
    redDotfun (state, data) {
      state.recruiterIntentionList = data.recruiterIntentionList
      state.recruiterInviteList = data.recruiterInviteList
      state.recruiterScheduleList = data.recruiterScheduleList
      state.newJoinApplyNum = data.newJoinApplyNum
    }
  },
  actions: {
    redDotfun (store) {
      if (store.rootState.hasLogin) return
      getLeftColumnRedDotInfoApi()
        .then(res => {
          let data = res.data.data
          store.commit('redDotfun', data)
        })
    }
  }
}
