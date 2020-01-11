import { getLeftColumnRedDotInfoApi } from '@/api/candidate'
export default {
  state: { // b端数据
    recruiterIntentionList: 0,
    recruiterInviteList: 0,
    recruiterScheduleList: 0,
    newJoinApplyNum: 0,
    dynamicsRedDotNum: 0,
    visitedMyselfNum: 0,
    interestedMyselfNum: 0
  },
  getters: {
    recruiterIntentionList: state => state.recruiterIntentionList, // 候选人库红点 = recruiterIntentionList + recruiterInviteList
    recruiterInviteList: state => state.recruiterInviteList,
    recruiterScheduleList: state => state.recruiterScheduleList, // 面试日程红点
    newJoinApplyNum: state => state.newJoinApplyNum, // 招聘团队红点
    dynamicsRedDotNum: state => state.dynamicsRedDotNum, // 发现候选人红点 = 看过我的红点 + 对我感兴趣红点
    visitedMyselfNum: state => state.visitedMyselfNum, // 看过我的红点
    interestedMyselfNum: state => state.interestedMyselfNum // 对我感兴趣红点
  },
  mutations: {
    redDotfun (state, data) {
      state.recruiterIntentionList = data.recruiterIntentionList
      state.recruiterInviteList = data.recruiterInviteList
      state.recruiterScheduleList = data.recruiterScheduleList
      state.newJoinApplyNum = data.newJoinApplyNum
      state.dynamicsRedDotNum = data.dynamicsRedDotNum
      state.visitedMyselfNum = data.visitedMyselfNum
      state.interestedMyselfNum = data.interestedMyselfNum
    }
  },
  actions: {
    redDotfun (store) {
      if (!store.rootState.hasLogin) return
      getLeftColumnRedDotInfoApi()
        .then(res => {
          let data = res.data.data
          store.commit('redDotfun', data)
        })
    }
  }
}
