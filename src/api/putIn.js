/**
 * 权限模块api
 */
import { request } from './index.js'


//获取用户信息
export const getUserInfoApi = data => request({
  url: '/users/${data.vkey}', 
  method: 'get', 
  params: data,
  config: {host: 'zhaopin'}
})

//查询简历完善步数
export const searchResumeStepApi = data => request({
  url: '/jobhunter/resume/four/step', 
  method: 'get', 
  params: data,
  config: {host: 'zhaopin'}
})

//完善简历-第一步
export const setResumeFirstApi = data => request({
  url: '/jobhunter/resume/four/firstStep', 
  method: 'post', 
  params: data,
  config: {host: 'zhaopin'}
})

//完善简历-第2步
export const setResumeSecondApi = data => request({
  url: '/jobhunter/resume/four/secondStep', 
  method: 'post', 
  params: data,
  config: {host: 'qiuzhi'}
})

//完善简历-第3步
export const setResumeThirdApi = data => request({
  url: '/jobhunter/resume/four/thirdStep', 
  method: 'post', 
  params: data,
  config: {host: 'qiuzhi'}
})

//完善简历-第4步
export const setResumeFourthApi = data => request({
  url: '/jobhunter/resume/four/fourthStep', 
  method: 'post', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取第一步提交的信息
export const getResumeFirstApi = data => request({
  url: '/jobhunter/resume/four/firstStep', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})
//获取第2步提交的信息
export const getResumeSecondApi = data => request({
  url: '/jobhunter/resume/four/secondStep', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取第3步提交的信息
export const getResumeThirdApi = data => request({
  url: '/jobhunter/resume/four/thirdStep', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取第4步提交的信息
export const getResumeFourthApi = data => request({
  url: '/jobhunter/resume/four/fourthStep', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取用户身份角色信息
export const getUserRoleInfo = data => request({
  url: '/user/roleinfo', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//职位搜索 - 投放页
export const schJobApi = data => request({
  url: '/launch/position/sch', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//职位类型列表
export const getPositionTypesApi = data => request({
  url: '/launch/position/types', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//广告列表 - 公司职位
export const getAdvListApi = data => request({
  url: '/launch/adv/list', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取学历接口
export const getDegreeAllListsApi = data => request({
  url: '/degree/all', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//完善简历-获取第三步已填信息
export const getResumeThirdStepApi = data => request({
  url: '/jobhunter/resume/four/thirdStep', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

// 职业标签列表
export const getLabelPositionListApi = data => request({
  url: '/label/position', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取城市列表
export const getAreaListsApi = data => request({
  url: '/area', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//完善简历-获取第三步已填信息
export const getResumeFourStepApi = data => request({
  url: '/jobhunter/resume/four/fourthStep', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})

//获取行业领域
export const getLabelFieldListApi = data => request({
  url: '/label/field', 
  method: 'get', 
  params: data,
  config: {host: 'qiuzhi'}
})