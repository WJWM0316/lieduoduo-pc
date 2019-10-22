/**
 * 权限模块api
 */
import { request } from './index.js'

// 确认登录
export const confirmLoginApi = data => request({
  url: '/auth/confirm_login', 
  method: 'post', 
  params: data,
  config: {host: 'zhaopin'}
})

/* 公司审核列表 */
export const login = data => request({
  url: '/auth/login',
  method: 'post',
  params: data,
  config: {host: 'zhaopin'}
})

/* 公司审核列表 */
export const templistApi = data => request({
  url: '/company/templist',
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})

/* 获取审核公司基本信息 */
export const getCompanyInfo = data => request({
  url: `/company/temp/${data}`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})

/* 审核公司信息通过 */
export const temppassApi = data => request({
  url: `/company/temppass/${data}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})

/* 审核公司信息不通过 */
export const tempfailApi = (id, data) => request({
  url: `/company/tempfail/${id}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})

/* 审核人员信息通过 */
export const identityPassApi = data => request({
  url: `/identity/pass/${data}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})


/* 审核人员信息不通过 */
export const identityFailApi = (id, data) => request({
  url: `/identity/fail/${id}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})
/* 填写公司信息 */
export const setCompanyInfoApi = data => request({
  url: `/company`,
  method: 'post',
  params: data,
  config: {host: 'zhaopin'}
})

/* 填写人员认证信息 */
export const setIdentityInfoApi = data => request({
  url: `/identity`,
  method: 'post',
  params: data,
  config: {host: 'zhaopin'}
})

/* 获取地址 */
export const getCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})

/* 修改地址 */
export const editCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  method: 'post',
  params: data,
  config: {host: 'zhaopin'}
})

/* 删除地址 */
export const deleteCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  method: 'delete',
  params: data,
  config: {host: 'zhaopin'}
})

/* 添加地址 */
export const addCompanyAdressApi = data => request({
  url: `/company/position/address`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})

/* 分页获取地址列表 */
export const getAdressListApi = data => request({
  url: `/company/position/simplepage/addresses`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})
/* 获取录入公司列表 */
export const getCompanyListApi = data => request({
  url: `/company/list`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})
/* 获取录入公司详情 */
export const getCompanyInfoApi = data => request({
  url: `/company/${data}`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})

/* 删除公司 */
export const deleteCompanyApi = data => request({
  url: `/company/${data}`,
  method: 'delete',
  params: data,
  config: {host: 'zhaopin'}
})

/* 编辑公司 */
export const editCompanyApi = (id, data) => request({
  url: `/company/${id}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})

/* 编辑身份信息 */
export const editIdentityApi = (id, data) => request({
  url: `/identity/${id}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})

/* 编辑身份信息 */
export const getIdentityApi = (id, data) => request({
  url: `/identity/${id}`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})

/* 添加公司地址 */
export const addCompanyAddressApi = (id, data) => request({
  url: `/company/address/${id}`,
  method: 'put',
  params: data,
  config: {host: 'zhaopin'}
})

/* 删除公司地址 */
export const delCompanyAddressApi = (id) => request({
  url: `/company/address/${id}`,
  method: 'delete',
  params: data,
  config: {host: 'zhaopin'}
})

/* 城市标签 */
export const getCityApi = () => request({
  url: `/area?level=3`,
  method: 'get',
  params: data,
  config: {host: 'zhaopin'}
})

