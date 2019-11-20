/**
 * 课程模块api
 */
import { request } from './index.js'

// 开撩约面
// export const applyInterviewApi = data => request('/interview/applyInterview', 'post', data)
export const applyInterviewApi = data => request({
  url: `/interview/applyInterview`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 标记不合适
// export const signInappropriateApi = data => request(`/interview/refuse/${data.id}`, 'post', data)
export const signInappropriateApi = data => request({
  url: `/interview/refuse/${data.id}`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 确定约面
// export const confirmInterviewApi = data => request(`/interview/confirm/${data.id}`, 'post', data)
export const confirmInterviewApi = data => request({
  url: `/interview/confirm/${data.id}`,
  method: 'post',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 邀请列表
// export const getApplyListApi = data => request('/interview/apply', 'get', data)
export const getApplyListApi = data => request({
  url: `/interview/apply`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 意向列表
// export const getInviteListApi = data => request('/interview/invite', 'get', data)
export const getInviteListApi = data => request({
  url: `/interview/invite`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 面试日程列表
// export const getScheduleListApi = data => request('/interview/schedule', 'get', data)
export const getScheduleListApi = data => request({
  url: `/interview/schedule`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 面试详情
// export const getDetailApi = data => request(`/interview/detail/${data.interviewId}`, 'get', data)
export const getDetailApi = data => request({
  url: `/interview/detail/${data.interviewId}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取面试日程列表返回时间
// export const getScheduletodayListtApi = data => request('/interview/newScheduleNumber', 'get', data)
export const getScheduletodayListtApi = data => request({
  url: `/interview/newScheduleNumber`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取面试日程列表
// export const getnewHistoryListtApi = data => request('/interview/newHistory', 'get', data)
export const getnewHistoryListtApi = data => request({
  url: `/interview/newHistory`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取当前招聘官职位类型列表
// export const getguanListtApi = data => request('/position/interviewTypeList', 'get', data)
export const getguanListtApi = data => request({
  url: `/position/interviewTypeList`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取候选人库收到意向和邀请数量
// export const getinviteapplyNum = data => request('/interview/interviewTypeTotal', 'get', data)
export const getinviteapplyNum = data => request({
  url: `/interview/interviewTypeTotal`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})
