/**
 * 课程模块api
 */
import { request } from './index.js'

// 导师列表
export const getTutorListApi = data => request({
  url: '/tutor',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取导师的详情
export const getTutorDetailApi = data => request({
  url: `/tutor/info/${data.id}`,
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 编辑导师资料
export const editTutorApi = data => request({
  url: `/tutor/edit/${data.tutorId}`,
  method: 'post',
  params: data,
  config: { host: 'zhaopin' }
})

// 专业领域列表
export const getFiledListApi = data => request({
  url: '/filed',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 职位搜索列表
export const getListApi = data => request({
  url: '/position/list',
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})

// 当前招聘官职位搜索列表（只返回招聘官自己的职位）
export const getMyListApi = data => request({
  url: '/position/mylist',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 搜索职位名称列表
export const getJobNameListApi = data => request({
  url: '/position/namelist',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 创建职位
export const addPositionApi = data => request({
  url: '/position',
  method: 'post',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取职位信息
export const getPositionApi = data => request({
  url: `/position/${data.id}`,
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})

// 编辑职位信息
export const editPositionApi = data => request({
  url: `/position/${data.id}`,
  method: 'put',
  params: data,
  config: { host: 'zhaopin' }
})

// 删除职位信息
export const deletePositionApi = data => request({
  url: `/position/${data.id}`,
  method: 'delete',
  params: data,
  config: { host: 'zhaopin' }
})

// 关闭职位
export const closePositionApi = data => request({
  url: `/position/close/${data.id}`,
  method: 'put',
  params: data,
  config: { host: 'zhaopin' }
})

// 开始职位
export const openPositionApi = data => request({
  url: `/position/open/${data.id}`,
  method: 'put',
  params: data,
  config: { host: 'zhaopin' }
})

// 职业标签列表
export const getPositionListApi = data => request({
  url: '/label/position',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 职业类型列表
export const getPositionTypeListApi = data => request({
  url: '/label/positionType',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 搜索-职业标签
export const searchPositionApi = data => request({
  url: '/search/position',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 职位分状态按条件数量统计
export const getStatusTotalApi = data => request({
  url: '/position/statustotal',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 职业标签列表
export const getLabelPositionListApi = data => request({
  url: '/label/position',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})
// 职位技能列表
export const professionalSkillsApi = data => request({
  url: '/label/professionalSkills',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 职位技能列表
export const getTypeListApi = data => request({
  url: '/position/typelist',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 获取职位二维码
export const getCodeUrl = data => request({
  url: '/position/get_code_url',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 简历分享信息
export const getResumeShareApi = data => request({
  url: '/share/resume_share',
  method: 'get',
  params: data,
  config: { host: 'pub' }
})

// 获取招聘官在招职位类型
export const getPositionTypeApi = data => request({
  url: '/browse/get_position_type',
  method: 'get',
  params: data,
  config: { host: 'zhaopin' }
})

// 收藏职位
export const putMycollectPositionApi = (data, hasLoading) => {
  return request({
    method: 'put',
    url: `/collect/collectPosition/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 取消收藏职位
export const deleteMycollectPositionApi = (data, hasLoading) => {
  return request({
    method: 'delete',
    url: `/collect/collectPosition/${data.id}`,
    params: data,
    config: { host: 'qiuzhi' }
  })
}

// 职位搜索
export const getPositionSearch = data => request({
  url: '/positions/sch',
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})

// 获取职位列表搜索条件
export const getPositionSearchType = data => request({
  url: '/position/search',
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})

// 获取职位推荐列表
export const getRecommendPosition = data => request({
  url: '/recommend/oppty/list',
  method: 'get',
  params: data,
  config: { host: 'qiuzhi' }
})
