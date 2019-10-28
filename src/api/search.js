/**
 * 公共模块API
 */
import { request } from './index.js'

// 获取公司搜索列表
export const getMatchesPosition = data => request({
  url: '/search/matches/position',
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})

// 获取热门关键词
export const getHotKeyword = data => request({
  url: '/search/hot/words',
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})
