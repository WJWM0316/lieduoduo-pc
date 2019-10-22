import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import { getAccessToken, removeAccessToken } from './cacheService'
let loadingInstance = null,
    localStorage = window.localStorage

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
    // 登陆过期或者未登录
    if(err.response.data.httpStatus === 401) {
      router.replace({name: 'login'})
      removeAccessToken()
      return
    }
    if (loadingInstance) loadingInstance.close()
    return Promise.reject(err.response)
  }
)


export const request = (url, method, params = {}, config) => {
  // 切换api host
  console.log(config, 111, axios.defaults.baseURL)
  switch (config.host) {
    case 'zhaopin':
      axios.defaults.baseURL = process.env.VUE_WEB_ZHAOPIN_API
      break
    case 'qiuzhi':
      axios.defaults.baseURL = process.env.VUE_WEB_QIUZHI_API
      break
    case 'pub':
      axios.defaults.baseURL = process.env.VUE_WEB_ZHAOPIN_API
      break
    default:
      axios.defaults.baseURL = process.env.VUE_WEB_ZHAOPIN_API
      break
  }
  
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }

  return axios[method](url, method === 'get' ? { params } : params)
}
