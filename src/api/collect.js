/**
 * 课程模块api
 */
import { request } from './index.js'

// 查询我感兴趣的
export const getSearchMyCollectApi = data => request('/collect/search_my_collect', 'get',data)

// 对我感兴趣的
export const getSearchCollectApi = data => request('/collect/search_collect', 'get',data)


// 收藏求职者
export const putCollectUserApi = data => request(`/collect/collectUser/${data.uid}`, 'put',data)


// 取消收藏求职者
export const cancelCollectUserApi = data => request(`/collect/collectUser/${data.uid}`, 'delete',data)

// 收藏职位
export const putCollectPositionApi = data => request(`/collect/collectPosition/${data.positionId}`, 'put',data)

// 取消收藏职位
export const cancelCollectPositionApi = data => request(`/collect/collectPosition/${data.positionId}`, 'delete',data)
