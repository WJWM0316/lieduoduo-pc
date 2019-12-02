import { request } from './index.js'

// 生成职位二维码
export const getPositionQrcodeApi = (data) => {
  return request({
    method: 'get',
    url: '/share/position_share',
    params: data,
    config: { host: 'pub' }
  })
}

// 生成公司二维码
export const getCompanyQrcodeApi = (data) => {
  return request({
    method: 'get',
    url: '/share/company_share',
    params: data,
    config: { host: 'pub' }
  })
}

// 生成简历二维码
export const getResumerCodeApi = (data) => {
  return request({
    method: 'get',
    url: '/share/resume_share',
    params: data,
    config: { host: 'pub' }
  })
}

// 生成招聘官二维码
export const getRecruiterQrcodeApi = (data) => {
  return request({
    method: 'get',
    url: '/share/recruiter_share',
    data,
    params: data,
    config: { host: 'pub' }
  })
}

// 生成自定义二维码
export const getMyQrcodeApi = (data) => {
  return request({
    method: 'post',
    url: '/web/share/mini/program/qr/code',
    data,
    params: data,
    config: { host: 'pub' }
  })
}
