/**
 * 权限模块api
 */
import { request } from './index.js'


//获取用户信息
export const getUserInfoApi = data => request(`/users/${data.vkey}`, 'get', data)

//查询简历完善步数
export const searchResumeStepApi = data => request('/jobhunter/resume/four/step', 'get', data)

//完善简历-第一步
export const setResumeFirstApi = data => request(`/jobhunter/resume/four/firstStep`, 'get', data)

//完善简历-第2步
export const setResumeSecondApi = data => request(`/jobhunter/resume/four/secondStep`, 'post', data)

//完善简历-第3步
export const setResumeThirdApi = data => request(`/jobhunter/resume/four/thirdStep`, 'post', data)

//完善简历-第4步
export const setResumeFourthApi = data => request(`/jobhunter/resume/four/fourthStep`, 'post', data)


//职位搜索 - 投放页
export const schJobApi = data => request(`/launch/position/sch`, 'get')

//职位类型列表
export const getPositionTypesApi = data => request(`/launch/position/types`, 'get')

//广告列表 - 公司职位
export const getAdvListApi = data => request(`/launch/adv/list`, 'get', data)

//获取学历接口
export const getDegreeAllListsApi = data => request('/degree/all', 'get')

//完善简历-获取第三步已填信息
export const getResumeThirdStepApi = data => request('/jobhunter/resume/four/thirdStep', 'get')


//获取城市列表
export const getAreaListsApi = data => request('area', 'get', data)