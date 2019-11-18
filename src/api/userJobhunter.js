/**
 * 课程模块api
 */
import { request } from './index.js'

// 通过求职者uid获取简历
// export const getResumeIdApi = data => request(`/jobhunter/resume/uid/${data.uid}`, 'get', data)
export const getResumeIdApi = data => request({
  url: `/jobhunter/resume/uid/${data.uid}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 通过求职者vkey获取简历
// export const getResumeVkeyApi = data => request(`/jobhunter/resume/vkey/${data.vkey}`, 'get', data)
export const getResumeVkeyApi = data => request({
  url: `/jobhunter/resume/vkey/${data.vkey}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})
