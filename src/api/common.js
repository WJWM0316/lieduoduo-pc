/**
 * 公共模块API
 */
import {
  request
} from './index.js'

// 获取banner 图
export const getBanners = data => request({
  url: '/banner',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取首页内容
export const getIndexData = data => request({
  url: '/aggr/index',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 24h反馈职位列表
export const getRapidlyData = data => request({
  url: '/surface/rapidly',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 生成小程序二维码
export const getQrcodeApi = data => request({
  url: '/share/other',
  method: 'get',
  params: data,
  config: {
    host: 'pub'
  }
})

// 获取热门城市
export const getHotArea = data => request({
  url: '/area/hotArea',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取搜索页的数据集合
export const getSearchCollect = data => request({
  url: '/aggr/search',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})
