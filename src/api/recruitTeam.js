/* 招聘官团队 */
import { request } from './index'

// 获取招聘官团队信息
export const getTeamRecruiters = data => request({
  url: `/company/recruiters/${data.companyId}`,
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取招聘官申请列表
export const getApplylist = data => request({
  url: '/applyjoin/list',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取招聘官申请 红点
export const getApplyReddot = data => request({
  url: 'reddot/top_bar_info',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 通过加入公司
export const setPassApply = data => request({
  url: `/applyjoin/pass/${data.id}`,
  method: 'put',
  params: data,
  config: { host: 'zhaopin' }
})

// 不允许通过加入公司
export const setUnPassApply = data => request({
  url: `/applyjoin/fail/${data.id}`,
  method: 'put',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取招聘官列表
export const getApplyCount = data => request({
  url: '/applyjoin/list_num',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})
