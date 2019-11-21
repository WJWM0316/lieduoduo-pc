/**
 * 公司注册模块api
 */
import { request } from './index.js'

// 提交个人信息||创建公司
export const SubmitpersonalApi = data => request({
  url: '/company/first_step',
  method: 'post',
  params: data,
  config: { host: 'zhaopin' }
})
// 模糊搜索公司名称
export const SearchcompanylistApi = data => request({
  url: '/company/namelist',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})
// 加入公司
export const applycompanyApi = data => request({
  url: '/company/apply',
  method: 'post',
  params: data,
  config: { host: 'zhaopin' }
})
