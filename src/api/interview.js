/**
 * 面试
 */
import {
  request
} from './index.js'

// 开撩约面
export const applyInterviewApi = data => request({
  url: '/interview/applyInterview',
  method: 'post',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 标记不合适
export const signInappropriateApi = data => request({
  url: '/interview/refuse',
  method: 'post',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 确定约面
export const confirmInterviewApi = data => request({
  url: `/interview/confirm/${data.id}`,
  method: 'post',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

//获取底部面试状态
export const getInterviewStatusApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/getInterviewStatus',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}


//编辑不合适 或者暂不考虑
export const refuseInterviewApi = (data, hasLoading) => {
  return request({
    method: 'post',
    url: `/interview/refuse/${data.id}`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}