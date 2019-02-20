/**
 * 权限模块api
 */
import { request } from './index.js'

// 确认登录
export const confirmLoginApi = data => request('/auth/confirm_login', 'post', data)

// 轮询请求
export const scanApi = data => request('/auth/scan', 'post', data)

// 生成二维码
export const getQrCodeApi = () => request('/auth/qr_code', 'get')

// 用户登录
export const loginApi = data => request('/auth/login', 'post', data)

// 切换用户角色（切换到求职端、招聘者端）求职者1，招聘者2
export const switchRoleApi = data => request('/user/role/switch', 'post', data)

// 退出接口
export const logoutApi = data => request('/auth/logout', 'get')

// 邮箱验证码校验
export const verifyApi = data => request('/verification/verify', 'post', data)

// 重置密码
export const resetPasswordApi = data => request('/unifyauth/resetPassword', 'post', data)

// 上传文件
export const uploadApi = data => request('/attaches', 'post', data)

// 下载文件
export const downApi = data => request(`/attaches/download/${data}`, 'get')
// 保存附件简历
export const saveResumeMsgApi = data => request('/jobhunter/save_attach', 'post', data)

// 获取附件简历
export const getResumeMsgApi = data => request('/jobhunter/attach_resume', 'get', data)

// 删除附件简历
export const deleteFileMsgApi = data => request('/jobhunter/del_attach', 'delete', data)

// 招聘官-我的信息(“我的”页面)
export const getMyInfoApi = data => request(`/recruiter/myInfo`, 'get', data)


