/**
 * 分享图模块api
 */
import { request } from './index.js'

// 页面分享信息
// export const sharePageApi = data => request(`/share/page`, 'get', data)
export const sharePageApi = data => request({
  url: `/share/page`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 职位
// export const sharePositionApi = data => request(`/forward/position`, 'get', data)
export const sharePositionApi = data => request({
  url: `/forward/position`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取简历小程序码
// export const shareResumeApi = data => request(`/forward/resume`, 'get', data)
export const shareResumeApi = data => request({
  url: `/share/resume_share`,
  method: 'get',
  params: data,
  config: {
    host: 'pub'
  }
})

// 获取招聘官小程序码
// export const shareRecruiterApi = data => request(`/forward/recruiter`, 'get', data)
export const shareRecruiterApi = data => request({
  url: `/forward/recruiter`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取机构小程序码
// export const shareCompnyApi = data => request(`/forward/compny`, 'get', data)
export const shareCompnyApi = data => request({
  url: `/forward/compny`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})
