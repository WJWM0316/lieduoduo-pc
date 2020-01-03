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
		state.interviewData.jobhunterApplyHaveArrangement = data.jobhunterApplyHaveArrangement
		state.interviewData.jobhunterApplyList = data.jobhunterApplyList
		state.interviewData.jobhunterApplyNotSuitable = data.jobhunterApplyNotSuitable
		state.interviewData.jobhunterApplyWaitingArrangement = data.jobhunterApplyWaitingArrangement
		state.interviewData.jobhunterInviteHaveArrangement = data.jobhunterInviteHaveArrangement
		state.interviewData.jobhunterInviteList = data.jobhunterInviteList
		state.interviewData.jobhunterInviteNotSuitable = data.jobhunterInviteNotSuitable
		state.interviewData.jobhunterInviteWaitingArrangement = data.jobhunterInviteWaitingArrangement
		state.interviewData.jobhunterInviteWaitingProcessing = data.jobhunterInviteWaitingProcessing
		state.interviewData.jobhunterScheduleList = data.jobhunterScheduleList
		state.interviewData.jobhunterInterviewTotal = state.interviewData.jobhunterApplyList + state.interviewData.jobhunterInviteList + state.interviewData.jobhunterScheduleList
		state.asideBar.topNav[0].reddot = data.jobhunterApplyList
		state.asideBar.topNav[1].reddot = data.jobhunterInviteList
		state.asideBar.topNav[2].reddot = data.jobhunterScheduleList
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
