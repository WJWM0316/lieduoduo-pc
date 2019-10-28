/**
 * 权限模块api
 */
import { request } from './index.js'

// 确认登录
export const confirmLoginApi = data => request({
	url: '/auth/confirm_login', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 轮询请求
export const scanApi = data => request({
	url: '/auth/scan',
	method: 'post',
	params: data, 
	config: {host: 'pub'}
})

// 生成二维码
export const getQrCodeApi = data => request({
	url: '/auth/qr_code',
	method:'get', 
	params: data, 
	config: {host: 'pub'}
})

// 用户登录
export const loginApi = data => request({
	url: '/auth/login', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 投放页登录注册
export const loginPutInApi = data => request({
	url: '/wap/login', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// wap下发短信验证
export const getCodeApi = data => request({
	url: '/wap/message', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 刷新图片验证码
export const getCaptchaApi = data => request({
	url: '/auth/wap_captcha', 
	method: 'get', 
	params: data, 
	config: {host: 'pub'}
})

// 切换用户角色（切换到求职端、招聘者端）求职者1，招聘者2
export const switchRoleApi = data => request({
	url: '/user/role/switch', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 退出接口
export const logoutApi = (data) => request({
	url: '/auth/logout', 
	method: 'get', 
	params: data, 
	config: {host: 'pub'}
})

// 邮箱验证码校验
export const verifyApi = data => request({
	url: '/verification/verify', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 重置密码
export const resetPasswordApi = data => request({
	url: '/unifyauth/resetPassword', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 上传文件
export const uploadApi = data => request({
	url: '/attaches', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})

// 下载文件
export const downApi = data => request({
	url: `/attaches/download/${data}`, 
	method: 'get', 
	params: data, 
	config: {host: 'pub'}
})

// 保存附件简历
export const saveResumeMsgApi = data => request({
	url: '/jobhunter/save_attach', 
	method: 'post', 
	params: data
})

// 获取附件简历
export const getResumeMsgApi = data => request({
	url: '/jobhunter/attach_resume', 
	method: 'get', 
	params: data
})

// 删除附件简历
export const deleteFileMsgApi = data => request({
	url: '/jobhunter/del_attach', 
	method: 'delete', 
	params: data
})

// 招聘官-我的信息(“我的”页面)
export const getMyInfoApi = data => request({
	url: `/recruiter/myInfo`, 
	method: 'get',
	params: data
})

// 获取用户信息
export const getUserInfosApi = (data) => request({
	url: `/cur/user_info`, 
	method: 'get', 
	params: data
})

// 获取用户角色信息
export const getUserRoleInfoApi = (data) => request({
	url: `/user/roleinfo`, 
	method: 'get', 
	params: data, 
	config: {host: 'qiuzhi'}
})

//pc登录注册
export const loginPutInApipc = data => request({
	url: '/auth/web/login', 
	method: 'post', 
	params: data, 
	config: {host: 'pub'}
})