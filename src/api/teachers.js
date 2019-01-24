/**
 * 权限模块api
 */
import { request } from './index.js'

// 申请导师
export const applyApi = data => request('/tutorApply/apply', 'post', data)

export const applyListApi = data => request('/tutorApply', 'get', data)

export const applyDetailApi = data => request(`/tutorApply/info/${data.tutorId}`, 'get', data)


