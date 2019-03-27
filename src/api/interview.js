/**
 * 课程模块api
 */
import { request } from './index.js'

// 开撩约面
export const applyInterviewApi = data => request('/interview/applyInterview', 'post',data)

// 标记不合适
export const signInappropriateApi = data => request(`/interview/refuse/${data.id}`, 'post',data)

// 确定约面
export const confirmInterviewApi = data => request(`/interview/confirm/${data.id}`, 'post',data)




