/**
 * 课程模块api
 */
import { request } from './index.js'

// 浏览过我的求职者
export const getSearchBrowseMyselfApi = data => request('/browse/search_browse_myself', 'get',data)


//获取数据
export const getMyNavDataApi = data => request('/browse/get_my_data', 'get',data)

