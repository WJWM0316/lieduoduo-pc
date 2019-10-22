/**
 * 面试
 */
import { request } from './index.js'

// 开撩约面
export const applyInterviewApi = data => request({
  url: '/interview/applyInterview', 
  method: 'post', 
  params: data,
  config: {host: 'zhaopin'}
})

// 标记不合适
export const signInappropriateApi = data => request({
  url: '/interview/refuse', 
  method: 'post', 
  params: data,
  config: {host: 'zhaopin'}
})

// 确定约面
export const confirmInterviewApi = data => request({
  url: '/interview/confirm/${data.id}', 
  method: 'post', 
  params: data,
  config: {host: 'zhaopin'}
})




