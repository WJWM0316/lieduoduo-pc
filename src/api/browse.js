/**
 * 课程模块api
 */
import { request } from './index.js'

// 浏览过我的求职者
export const getSearchBrowseMyselfApi = data => request('/browse/search_browse_myself', 'get',data)

//获取数据
export const getMyNavDataApi = data => request('/browse/get_my_data', 'get',data)


//求职者最近工作类型
export const getJobHunterPositionTypeApi = data => request('/browse/get_job_hunter_position_type', 'get',data)
