/* 招聘官 */
import { request } from './index'

// 获取招聘官基本信息
export const getRecruiter = data => request({
  url: '/recruiter/baseInfo',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 设置招聘官基本信息
export const setRecruiter = data => request({
  url: '/recruiter/baseInfo',
  method: 'post',
  params: data,
  config: { host: 'zhaopin' }
})
