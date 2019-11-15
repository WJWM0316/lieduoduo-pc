import { request } from './index.js'

// 获取求职者的简历详情|生成职位二维码
export const getMyResumeApi = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/cur/resume',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取求职者个人信息
export const getBaseInfo = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/baseInfo',
    params: data,
    config: { host: 'qiuzhi' }
  })
}
