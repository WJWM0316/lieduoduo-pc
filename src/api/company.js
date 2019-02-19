/**
 * 权限模块api
 */
import { request } from './index.js'

// 确认登录
export const confirmLoginApi = data => request('/auth/confirm_login', 'post', data)

/* 公司审核列表 */
export const login = data => request(
  '/auth/login',
  'post',
  data
)

/* 公司审核列表 */
export const templistApi = data => request(
  '/company/templist',
  'get',
  data
)

/* 获取审核公司基本信息 */
export const getCompanyInfo = data => request(
  `/company/temp/${data}`,
  'get'
)

/* 审核公司信息通过 */
export const temppassApi = data => request(
  `/company/temppass/${data}`,
  'put'
)

/* 审核公司信息不通过 */
export const tempfailApi = (id, data) => request(
  `/company/tempfail/${id}`,
  'put',
  data
)

/* 审核人员信息通过 */
export const identityPassApi = data => request(
  `/identity/pass/${data}`,
  'put'
)

/* 审核人员信息不通过 */
export const identityFailApi = (id, data) => request(
  `/identity/fail/${id}`,
  'put',
  data
)

/* 填写公司信息 */
export const setCompanyInfoApi = data => request(
  `/company`,
  'post',
  data
)

/* 填写人员认证信息 */
export const setIdentityInfoApi = data => request(
  `/identity`,
  'post',
  data
)

/* 获取地址 */
export const getCompanyAdressApi = data => request(
  `/company/position/address/${data.id}`,
  'get'
)

/* 修改地址 */
export const editCompanyAdressApi = data => request(
  `/company/position/address/${data.id}`,
  'post',
  data
)

/* 删除地址 */
export const deleteCompanyAdressApi = data => request(
  `/company/position/address/${data.id}`,
  'delete',
  data
)

/* 添加地址 */
export const addCompanyAdressApi = data => request(
  `/company/position/address`,
  'put',
  data
)

/* 分页获取地址列表 */
export const getAdressListApi = data => request(
  `/company/position/simplepage/addresses`,
  'get',
  data
)
/* 获取录入公司列表 */
export const getCompanyListApi = data => request(
  `/company/list`,
  'get',
  data
)

/* 获取录入公司详情 */
export const getCompanyInfoApi = data => request(
  `/company/${data}`,
  'get'
)

/* 删除公司 */
export const deleteCompanyApi = data => request(
  `/company/${data}`,
  'delete'
)

/* 编辑公司 */
export const editCompanyApi = (id, data) => request(
  `/company/${id}`,
  'put',
  data
)

/* 编辑身份信息 */
export const editIdentityApi = (id, data) => request(
  `/identity/${id}`,
  'put',
  data
)

/* 编辑身份信息 */
export const getIdentityApi = (id, data) => request(
  `/identity/${id}`,
  'get',
  data
)

/* 添加公司地址 */
export const addCompanyAddressApi = (id, data) => request(
  `/company/address/${id}`,
  'put',
  data
)

/* 删除公司地址 */
export const delCompanyAddressApi = (id) => request(
  `/company/address/${id}`,
  'delete'
)

/* 城市标签 */
export const getCityApi = () => request(
  `/area?level=3`,
  'get'
)


