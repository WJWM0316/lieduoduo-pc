/**
 * 课程模块api
 */
import { request } from './index.js'

// 浏览过我的求职者
export const getSearchBrowseMyselfApi = data => request({
	url: '/browse/search_browse_myself',
	method: 'get', 
	config: {host: 'pub'}
})

//获取数据
export const getMyNavDataApi = data => request({
	url: '/browse/get_my_data', 
	method: 'get', 
	config: {host: 'pub'}
})


//求职者最近工作类型
export const getJobHunterPositionTypeApi = data => request({
	url: '/browse/get_job_hunter_position_type', 
	method: 'get', 
	config: {host: 'pub'}
})
