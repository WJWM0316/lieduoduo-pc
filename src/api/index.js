import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import { baseHost } from '../../config.js'

console.log('====>',baseHost)
let loadingInstance = null
const company = location.href.split('/')[3] || 'tiger'
import { getAccessToken, removeAccessToken } from './cacheService'

// 请求的跟地址
export const upload_api = `${baseHost}/attaches`
axios.defaults.baseURL = baseHost

console.log('==>',getAccessToken())
// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = getAccessToken()
    return config
  },
  error => {
    return Promise.error(error)
  }
)

axios.interceptors.response.use(
  res => {
    if (loadingInstance) loadingInstance.close()
    return res
  },
  err => {
    console.log(err.response.data.httpStatus)
    // 登陆过期或者未登录
    if(err.response.data.httpStatus === 401) {
      router.push({name: 'login'})
      removeAccessToken()
      return
    }
    if (loadingInstance) loadingInstance.close()
    return Promise.reject(err.response)
  }
)


export const request = (url, method, params = {}) => {
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  return axios[method](url, method === 'get' ? { params } : params)
}
