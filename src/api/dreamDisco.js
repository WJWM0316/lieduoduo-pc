/* 梦想的士高 */
import { request } from './index'

// 获取列表
export const getDiscoListApi = data => request({
  url: '/special/pc/list',
  method: 'get',
  params: data,
  config: { host: 'pub' }
})

// 统计接口
export const getStaDiscoListApi = data => request({
  url: '/special/pc/sta',
  method: 'post',
  params: data,
  config: { host: 'pub' }
})

// new 获取数据接口(活动后台)
export const getZtDiscoListApi = data => request({
  url: '/zt/pc/list',
  method: 'get',
  params: data,
  config: { host: 'pub' }
})
