/**
 * 活动API
 */
import { request } from './index.js'

// 获取优质企业和优质岗位列表
export const getfestivalfavorlist = data => request({
  url: '/festival/index/v3',
  method: 'get',
  params: data,
  config: {
    host: 'pub'
  }
})

// 优质企业点赞
export const festivalfavor = data => request({
  url: '/festival/favor',
  method: 'post',
  params: data,
  config: {
    host: 'pub'
  }
})

// 点击统计接口
export const festivalTouch = data => request({
  url: '/touch',
  method: 'get',
  params: data,
  config: {
    host: 'pub'
  }
})
