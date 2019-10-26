/**
 * 权限模块api
 */
import { request } from './index.js'

// 申请导师
export const applyApi = data => request({
  url: '/tutorApply/apply', 
  method: 'post', 
  params: data,
  config: {host: 'zhaopin'}
})

export const applyListApi = data => request({
  url: '/tutorApply', 
  method: 'get', 
  params: data,
  config: {host: 'zhaopin'}
})

export const applyDetailApi = data => request({
  url: `/tutorApply/info/${data.tutorId}`, 
  method: 'get', 
  params: data,
  config: {host: 'zhaopin'}
})


