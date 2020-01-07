/* 梦想的士高 */
import { request } from './index'

// 获取列表
export const getDiscoListApi = data => request({
  url: '/special/list',
  method: 'get',
  params: data,
  config: { host: 'pub' }
})
