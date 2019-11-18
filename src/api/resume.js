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

// 设置求职者信息
export const setBaseInfo = (data) => {
  return request({
    method: 'post',
    url: '/jobhunter/baseInfo',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取自我描述标签|签名
export const getSignature = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/signature',
    data,
    config: { host: 'qiuzhi' }
  })
}
