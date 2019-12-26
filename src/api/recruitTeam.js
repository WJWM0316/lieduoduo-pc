/* 招聘官团队 */
import { request } from './index'

// 获取招聘官团队信息
export const getTeamRecruiters = data => request({
  url: `/company/recruiters/${data.companyId}`,
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})
