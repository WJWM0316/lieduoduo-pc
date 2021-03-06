/**
 * 课程模块api
 */
import { request } from './index.js'

// 查询我感兴趣的
export const getSearchMyCollectApi = data => request({
  url: '/collect/search_my_collect',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 对我感兴趣的
export const getSearchCollectApi = data => request({
  url: '/collect/search_collect',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 收藏求职者
export const putCollectUserApi = data => request({
  url: `/collect/collectUser/${data.uid}`,
  method: 'put',
  params: data,
  config: { host: 'zhaopin' }
})

// 取消收藏求职者
export const cancelCollectUserApi = data => request({
  url: `/collect/collectUser/${data.uid}`,
  method: 'delete',
  params: data,
  config: { host: 'zhaopin' }
})

// 收藏职位
export const putCollectPositionApi = data => request({
  url: `/collect/collectPosition/${data.positionId}`,
  method: 'put',
  params: data,
  config: { host: 'pub' }
})

// 取消收藏职位
export const cancelCollectPositionApi = data => request({
  url: `/collect/collectPosition/${data.positionId}`,
  method: 'delete',
  params: data,
  config: { host: 'pub' }
})

// 热门推荐
export const gethotRecommendationApi = data => request({
  url: '/recommend/resumes',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 筛选热门推荐数据为空时，返回为你推荐列表
export const getRecommendationList = data => request({
  url: '/recommend/resume/more',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})
