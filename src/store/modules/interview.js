import {
	getInterviewRedDotInfoApi
	// clearTabInterviewRedDotApi,
	// clearDayInterviewRedDotApi
} from 'API/interview'

import { asideBar } from 'UTIL/interview-static-data'

const GET_INTERVIEW_REDDOT_INFO = 'GET_INTERVIEW_REDDOT_INFO'
// const CLEAR_TAB_INTERVIEW_REDDOT = 'CLEAR_TAB_INTERVIEW_REDDOT'
// const CLEAR_DAY_INTERVIEW_REDDOT = 'CLEAR_DAY_INTERVIEW_REDDOT'

const state = {
	interviewData: {
		jobhunterApplyHaveArrangement: 0,
		jobhunterApplyList: 0,
		jobhunterApplyNotSuitable: 0,
		jobhunterApplyWaitingArrangement: 0,
		jobhunterInviteHaveArrangement: 0,
		jobhunterInviteList: 0,
		jobhunterInviteNotSuitable: 0,
		jobhunterInviteWaitingArrangement: 0,
		jobhunterInviteWaitingProcessing: 0,
		jobhunterScheduleList: 0,
		jobhunterInterviewTotal: 0
	},
	asideBar
}

const mutations = {
	[GET_INTERVIEW_REDDOT_INFO] (state, data) {
		state.interviewData.jobhunterApplyHaveArrangement = data.jobhunterApplyHaveArrangement || 0
		state.interviewData.jobhunterApplyList = data.jobhunterApplyList || 0
		state.interviewData.jobhunterApplyNotSuitable = data.jobhunterApplyNotSuitable || 0
		state.interviewData.jobhunterApplyWaitingArrangement = data.jobhunterApplyWaitingArrangement || 0
		state.interviewData.jobhunterInviteHaveArrangement = data.jobhunterInviteHaveArrangement || 0
		state.interviewData.jobhunterInviteList = data.jobhunterInviteList || 0
		state.interviewData.jobhunterInviteNotSuitable = data.jobhunterInviteNotSuitable || 0
		state.interviewData.jobhunterInviteWaitingArrangement = data.jobhunterInviteWaitingArrangement || 0
		state.interviewData.jobhunterInviteWaitingProcessing = data.jobhunterInviteWaitingProcessing || 0
		state.interviewData.jobhunterScheduleList = data.jobhunterScheduleList || 0
		state.interviewData.jobhunterInterviewTotal = state.interviewData.jobhunterApplyList + state.interviewData.jobhunterInviteList + state.interviewData.jobhunterScheduleList
		state.asideBar.topNav[0].reddot = data.jobhunterApplyList || 0
		state.asideBar.topNav[1].reddot = data.jobhunterInviteList || 0
		state.asideBar.topNav[2].reddot = data.jobhunterScheduleList || 0
	}
}

const getters = {
	interviewData: state => state.interviewData,
	asideBar: state => state.asideBar
}

const actions = {
	getInterviewRedDotInfoApi(store) {
		return getInterviewRedDotInfoApi().then(({ data }) => {
			store.commit(GET_INTERVIEW_REDDOT_INFO, data.data)
      return data
		})
	}
	// clearTabInterviewRedDotApi(store, params) {
 //    return clearTabInterviewRedDotApi(params).then(({ data }) => {
 //      store.commit(CLEAR_TAB_INTERVIEW_REDDOT, data.data)
 //      return data
 //    })
 //  },
 //  clearDayInterviewRedDotApi(store, params) {
 //    return clearDayInterviewRedDotApi(params).then(({ data }) => {
 //      store.commit(CLEAR_DAY_INTERVIEW_REDDOT, data.data)
 //      return data
 //    })
 //  }
}

export default { state, mutations, getters, actions }
