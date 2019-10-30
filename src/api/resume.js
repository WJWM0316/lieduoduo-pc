import { request } from './index.js'

// 生成职位二维码
export const getMyResumeApi = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/cur/resume',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

