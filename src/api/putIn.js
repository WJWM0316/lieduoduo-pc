/**
 * 权限模块api
 */
import { request } from './index.js'


//获取用户信息
export const getUserInfoApi = data => request(`/users/${data.vkey}`, 'get', data)

//查询简历完善步数
export const searchResumeStepApi = data => request('/jobhunter/resume/four/step', 'get', data)

//完善简历-第一步
export const setResumeFirstApi = data => request(`/jobhunter/resume/four/firstStep`, 'post', data)

//完善简历-第2步
export const setResumeSecondApi = data => request(`/jobhunter/resume/four/secondStep`, 'post', data)

//完善简历-第3步
export const setResumeThirdApi = data => request(`/jobhunter/resume/four/thirdStep`, 'post', data)

//完善简历-第4步
export const setResumeFourthApi = data => request(`/jobhunter/resume/four/fourthStep`, 'post', data)

//获取第一步提交的信息
export const getResumeFirstApi = data => request(`/jobhunter/resume/four/firstStep`, 'get', data)

//获取第2步提交的信息
export const getResumeSecondApi = data => request(`/jobhunter/resume/four/secondStep`, 'get', data)

//获取第3步提交的信息
export const getResumeThirdApi = data => request(`/jobhunter/resume/four/thirdStep`, 'get', data)

//获取第4步提交的信息
export const getResumeFourthApi = data => request(`/jobhunter/resume/four/fourthStep`, 'get', data)

//获取用户身份角色信息
export const getUserRoleInfo = data => request(`/user/roleinfo`, 'get', data)

//职位搜索 - 投放页
export const schJobApi = data => request(`/launch/position/sch`, 'get', data)

//职位类型列表
export const getPositionTypesApi = data => request(`/launch/position/types`, 'get')

//广告列表 - 公司职位
export const getAdvListApi = data => request(`/launch/adv/list`, 'get', data)

//获取学历接口
export const getDegreeAllListsApi = data => request('/degree/all', 'get')

//完善简历-获取第三步已填信息
export const getResumeThirdStepApi = data => request('/jobhunter/resume/four/thirdStep', 'get')

// 职业标签列表
export const getLabelPositionListApi = data => request('/label/position', 'get')

//获取城市列表
export const getAreaListsApi = data => request('area', 'get', data)

//完善简历-获取第三步已填信息
export const getResumeFourStepApi = data => request('/jobhunter/resume/four/fourthStep', 'get')

//获取行业领域
export const getLabelFieldListApi = data => request('/label/field', 'get')