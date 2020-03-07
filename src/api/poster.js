import { request } from './index.js'

// 在线约面
export const getRapidlyViwePostApi = (data) => {
  return request({
    method: 'get',
    url: '/rapidlyViwe',
    params: data,
    config: { host: 'node' }
  })
}

// 职位长图
export const getPositionPostApi = (data) => {
  return request({
    method: 'get',
    url: '/position',
    params: data,
    config: { host: 'node' }
  })
}

// 精美职位
export const getPositionMinPostApi = (data) => {
  return request({
    method: 'get',
    url: '/position_min',
    params: data,
    config: { host: 'node' }
  })
}

// 简历
export const getResumePostApi = (data) => {
  return request({
    method: 'get',
    url: '/resume',
    params: data,
    config: { host: 'node' }
  })
}

// 招聘官
export const getRecruiterPostApi = (data) => {
  return request({
    method: 'get',
    url: '/recruiter',
    params: data,
    config: { host: 'node' }
  })
}

// 10要你节
export const getWantYouApi = (data) => {
  return request({
    method: 'get',
    url: '/wantYou',
    params: data,
    config: { host: 'node' }
  })
}
