/**
 * 公共模块API
 */
import { request } from './index.js'

// 获取banner图
export const getBanners = data => request({
  url: '/banner',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取b端 banner图
export const getBTermBanners = data => request({
  url: '/banner',
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

// 获取友情链接
export const getLinks = data => request({
  url: '/link/lists',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取首页内容
export const getIndexData = data => request({
  url: '/aggr/indexnew',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 根据类别获取24h职位列表
export const getRapidlyDataByType = data => request({
  url: '/surface/rapidly/simplepage/list',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取24h活动城市
export const getActivityCity = data => request({
  url: '/surface/city/list',
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取24h职位活动页
export const getActivityPositionList = data => request({
  url: '/surface/rapidly/all',
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

// 获取招聘官详情
export const recruiterDetail = data => request({
  url: '/recruiter/detail',
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})
// 获取身份是否认证信息
export const perfectauthDetail = data => request({
  url: 'recruiter/mine/extra',
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin'
  }
})

export const createonlinepdf = data => request({
  url: `/jobhunter/auto_resume/pdf/${data.jobhunterVkey}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin',
    responseType: 'blob'
  }
})
export const createonlineword = data => request({
  url: `/jobhunter/auto_resume/word/${data.jobhunterVkey}`,
  method: 'get',
  params: data,
  config: {
    host: 'zhaopin',
    responseType: 'blob'
  }
})

export const downloadPDF = data => request({
  url: `/jobhunter/auto_resume/pdf/${data.vkey}`,
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi',
    responseType: 'blob'
  }
})
export const downloadWord = data => request({
  url: `/jobhunter/auto_resume/word/${data.vkey}`,
  method: 'get',
  params: data,
  config: {
    host: 'qiuzhi',
    responseType: 'blob'
  }
})
