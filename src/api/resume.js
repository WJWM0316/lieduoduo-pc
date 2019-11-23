import { request } from './index.js'

// 获取求职者的简历详情|生成职位二维码
export const getMyResumeApi = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/cur/resume',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取求职者个人信息
export const getResumeBaseInfo = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/baseInfo',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 设置头像
export const setResumeAvatar = (data) => {
  return request({
    method: 'post',
    url: '/jobhunter/avatar',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 设置求职者信息
export const setResumeBaseInfo = (data) => {
  return request({
    method: 'post',
    url: '/jobhunter/baseInfo',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取自我描述|标签
export const setResumeDesc = (data) => {
  return request({
    method: 'post',
    url: '/jobhunter/self_desc',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 标签获取
export const getLables = (data) => {
  const { type, params } = data
  const typeApi = {
    skills: '/label/professionalSkills',
    position: '/label/professionalSkills?type=skills',
    life: '/label/life',
    field: '/label/field'
  }
  return request({
    method: 'get',
    params,
    url: typeApi[type],
    config: { host: 'qiuzhi' }
  })
}
// 获取用户所有求职意向
export const getAllExpect = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/userAllExpect',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 新增求职意向
export const addExpect = (data) => {
  return request({
    method: 'put',
    url: '/jobhunter/expect',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 修改求职意向
export const setExpect = (data) => {
  return request({
    method: 'post',
    url: `/jobhunter/expect/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 删除求职意向
export const deleteExpect = (data) => {
  return request({
    method: 'delete',
    url: `/jobhunter/expect/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 添加工作经历
export const addCareer = (data) => {
  return request({
    method: 'put',
    url: '/jobhunter/career',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 修改工作经历
export const setCareer = (data) => {
  return request({
    method: 'post',
    url: `/jobhunter/career/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取求职者的所有工作经历
export const getAllCareer = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/allCareer',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 修改工作经历
export const deleteCareer = (data) => {
  return request({
    method: 'delete',
    url: `/jobhunter/career/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 添加项目经历
export const addProject = (data) => {
  return request({
    method: 'put',
    url: '/jobhunter/project',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 修改项目经历
export const setProject = (data) => {
  return request({
    method: 'post',
    url: `/jobhunter/project/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 删除项目经历
export const deleteProject = (data) => {
  return request({
    method: 'delete',
    url: `/jobhunter/project/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取求职者的所有项目经历
export const getAllProject = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/allProject',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 添加教育经历
export const addEducation = (data) => {
  return request({
    method: 'put',
    url: '/jobhunter/education',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 修改教育经历
export const setEducation = (data) => {
  return request({
    method: 'post',
    url: `/jobhunter/education/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 修改教育经历
export const deleteEducation = (data) => {
  return request({
    method: 'delete',
    url: `/jobhunter/education/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 获取求职者的所有教育经历
export const getAllEducation = (data) => {
  return request({
    method: 'get',
    url: '/jobhunter/allEducation',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 设置简历更多介绍
export const setMoreIntroduce = (data) => {
  return request({
    method: 'post',
    url: '/jobhunter/introduce',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 保存附件简历
export const saveResumeAttach = (data) => {
  return request({
    method: 'post',
    url: '/jobhunter/save_attach',
    params: data,
    config: { host: 'qiuzhi' }
  })
}

export const deleteResumeAttach = (data) => {
  return request({
    url: '/jobhunter/del_attach',
    method: 'delete',
    params: data,
    config: { host: 'qiuzhi' }
  })
}
