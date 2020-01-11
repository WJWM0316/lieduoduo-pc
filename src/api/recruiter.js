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

// 获取生活标签
export const getLifeLabels = data => request({
  url: '/label/life',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取职业技能- （职业技能，职业素养）
export const getSkillLabels = data => request({
  url: '/label/professionalSkills',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 创建生活标签 - 自定义标签
export const addLifeLabels = data => request({
  url: '/label/life',
  method: 'post',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取招聘官权益
export const getRecruiterRight = data => request({
  url: '/right/cur/recruiter',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取招聘官账户
export const getRecruiterAccount = data => request({
  url: '/user/account',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取招聘官订单列表
export const getRecruiterOrders = data => request({
  url: '/user/account/orders',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})
