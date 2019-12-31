import { getInterviewRedDotInfoApi } from '@/api/candidate'
export default {
  state: { // b端数据
    recruiterIntentionList: 0,
    recruiterInviteList: 0,
    recruiterScheduleList: 0
  },
  getters: {
    recruiterIntentionList: state => state.recruiterIntentionList,
    recruiterInviteList: state => state.recruiterInviteList,
    recruiterScheduleList: state => state.recruiterScheduleList
  },
  mutations: {
    redDotfun (state, data) {
      state.recruiterIntentionList = data.recruiterIntentionList
      state.recruiterInviteList = data.recruiterInviteList
      state.recruiterScheduleList = data.recruiterScheduleList
    }
  },
  actions: {
    redDotfun (store) {
      getInterviewRedDotInfoApi()
        .then(res => {
          let data = res.data.data
          store.commit('redDotfun', data)
        })
    }
  }
}
