import { request } from './index.js'

// 超管的职位列表
// export const topAdminPositonList = data => request('/position/company_top/list', 'get', data)
export const topAdminPositonList = data => request({
  url: `/position/company_top/list`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 机构和招聘官的职位列表
// export const recruiterPositonList = data => request('/position/mylist', 'get', data)
export const recruiterPositonList = data => request({
  url: `/position/mylist`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 选择职位后确定开撩
// export const sureOpenupAPi = data => request('/interview/applyInterview', 'post', data)
export const sureOpenupAPi = data => request({
  url: `/interview/applyInterview`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 面试详情（查看邀约）
// export const watchInvitationAPi = data => request(`/interview/detail/${data.interviewId}`, 'get', data)
export const watchInvitationAPi = data => request({
  url: `/interview/detail/${data.interviewId}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 选择不合适原因列表（获取面试评价不合适理由）
// export const getCommentReasonApi = data => request(`/interview/getCommentReason`, 'get', data)
export const getCommentReasonApi = data => request({
  url: `/interview/getCommentReason`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 标记不合适或者不合适
// export const improperMarkingApi = data => request(`/interview/refuse/${data.jobhunterUid}`, 'post', data)
export const improperMarkingApi = data => request({
  url: `/interview/refuse/${data.jobhunterUid}`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取不合适理由
// export const getInterviewComment = data => request(`/interview/getInterviewComment`, 'get', data)
export const getInterviewComment = data => request({
  url: `/interview/getInterviewComment`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 确定约面（查看联系）
// export const confirmInterviewApi = data => request(`/interview/confirm/${data.interviewId}`, 'post', data)
export const confirmInterviewApi = data => request({
  url: `/interview/confirm/${data.interviewId}`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 安排面试（地址列表）
// export const addressListApi = data => request(`/company/position/simplepage/addresses`, 'get', data)
export const addressListApi = data => request({
  url: `/company/position/simplepage/addresses`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 不合适面试就撤回
// export const interviewRetract = data => request(`/interview/interviewRetract/${data.jobhunterUid}`, 'put', data)
export const interviewRetract = data => request({
  url: `/interview/interviewRetract/${data.jobhunterUid}`,
  method: 'put',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 安排面试
// export const setInterviewInfoApi = data => request(`/interview/setInterviewInfo/${data.interviewId}`, 'post', data)
export const setInterviewInfoApi = data => request({
  url: `/interview/setInterviewInfo/${data.interviewId}`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 设置候选人是否到场
// export const setAttendApi = data => request(`/interview/attend/`, 'put', data)
export const setAttendApi = data => request({
  url: `/interview/attend/`,
  method: 'put',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 面试评价（设置感兴趣，不错）
// export const setCommentApi = data => request(`/interview/interviewComment/`, 'post', data)
export const setCommentApi = data => request({
  url: `/interview/interviewComment/`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 添加地址 */
// export const addCompanyAdressApi = data => request(`/company/position/address`, 'put', data)
export const addCompanyAdressApi = data => request({
  url: `/company/position/address`,
  method: 'put',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 修改地址 */
// export const editCompanyAdressApi = data => request(
//   `/company/position/address/${data.id}`,
//   'post',
//   data
// )
export const editCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 高级筛选选项候选人动态全部和同事转发 */
// export const filterlistApi = data => request(`/common/search/range`, 'get')
export const filterlistApi = data => request({
  url: `/common/search/range`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 高级筛选选项候选人动态其他3个tab */
// export const filterothertabApi = data => request(`/common/myself/search/range`, 'get', data)
export const filterothertabApi = data => request({
  url: `/common/myself/search/range`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 高级筛选选项候选人库 */
// export const filtercandidateApi = data => request(`/common/interview/search/range`, 'get', data)
export const filtercandidateApi = data => request({
  url: `/common/interview/search/range`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 筛选机构列表 */
// export const filterorilistApi = data => request(`/common/search/company/list`, 'get')
export const filterorilistApi = data => request({
  url: `/common/search/company/list`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

/* 筛选招聘官列表 */
// export const filterrecruiterlistApi = data => request(`/common/search/company/recruiter`, 'get', data)
export const filterrecruiterlistApi = data => request({
  url: `/common/search/company/recruiter`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 候选人动态候选人全部列表
// export const candidateAlllistApi = data => request(`/dynamics/all/search`, 'get', data)
export const candidateAlllistApi = data => request({
  url: `/dynamics/all/search`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 候选人动态看过我的列表
// export const candidateBorwsedmyself = data => request(`/dynamics/search/browsed/myself`, 'get', data)
export const candidateBorwsedmyself = data => request({
  url: `/dynamics/search/browsed/myself`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 候选人动态对我感兴趣的列表
// export const  = data => request(`/dynamics/search/collected/myself`, 'get', data)
export const candidateCollectedmyself = data => request({
  url: `/dynamics/search/collected/myself`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 候选人动态我感兴趣的列表
// export const candidatemyCollected = data => request(`/dynamics/search/my/collected`, 'get', data)
export const candidatemyCollected = data => request({
  url: `/dynamics/search/my/collected`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 候选人动态同事转发的列表
// export const candidateforwardlist = data => request(`/dynamics/search/colleague/forward`, 'get', data)
export const candidateforwardlist = data => request({
  url: `/dynamics/search/colleague/forward`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 转发候选人
// export const forwardCandidate = data => request(`/dynamics/forward`, 'post', data)
export const forwardCandidate = data => request({
  url: `/dynamics/forward`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 与候选人的沟通记录
export const communicateRecord = data => request({
  url: `/dynamics/communicate/record/${data.uid}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})
