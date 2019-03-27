/**
 * 课程模块api
 */
import { request } from './index.js'

// 导师列表
export const getTutorListApi = data => request('/tutor/', 'get',data)

// 获取导师的详情
export const getTutorDetailApi = data => request(`/tutor/info/${data.id}`, 'get',data)

// 编辑导师资料
export const editTutorApi = data => request(`/tutor/edit/${data.tutorId}`, 'post',data)

// 专业领域列表
export const getFiledListApi = data => request(`/filed`, 'get')

// 职位搜索列表
export const getListApi = data => request(`/position/list`, 'get', data)

// 当前招聘官职位搜索列表（只返回招聘官自己的职位）
export const getMyListApi = data => request(`/position/mylist`, 'get', data)

// 搜索职位名称列表
export const getJobNameListApi = data => request(`/position/namelist`, 'get', data)

// 创建职位
export const addPositionApi = data => request(`/position`, 'post', data)

// 获取职位信息
export const getPositionApi = data => request(`/position/${data.id}`, 'get', data)

// 编辑职位信息
export const editPositionApi = data => request(`/position/${data.id}`, 'put', data)

// 删除职位信息
export const deletePositionApi = data => request(`/position/${data.id}`, 'delete', data)

// 关闭职位
export const closePositionApi = data => request(`/position/close/${data.id}`, 'put', data)

// 开始职位
export const openPositionApi = data => request(`/position/open/${data.id}`, 'put', data)

// 职业标签列表
export const getPositionListApi = data => request(`/label/position`, 'get')

// 职业类型列表 
export const getPositionTypeListApi = data => request(`/label/positionType`, 'get')

// 搜索-职业标签
export const searchPositionApi = data => request(`/search/position`, 'get', data)


// 职位分状态按条件数量统计
export const getStatusTotalApi = data => request(`/position/statustotal`, 'get', data)

// 职业标签列表
export const getLabelPositionListApi = data => request(
	 `/label/position`,
	'get',
	data
)
// 职位技能列表
export const professionalSkillsApi = data => request(
	`/label/professionalSkills`,
	'get',
	data
)

// 职位技能列表
export const getTypeListApi = data => request(
	`/position/typelist`,
	'get',
	data
)

// 获取职位二维码
export const getCodeUrl = data => request(
	`/position/get_code_url`,
	'get',
	data
)


