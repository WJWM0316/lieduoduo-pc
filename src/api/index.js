import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import { baseHost, changeBaseHost } from '../../config.js'

let loadingInstance = null
const company = location.href.split('/')[3] || 'tiger'
import { getAccessToken, removeAccessToken, removeAccessToPPTXken } from './cacheService'

// 请求的跟地址
axios.defaults.baseURL = baseHost()
export const changeBaseURL = (type) => {
  axios.defaults.baseURL = type ? changeBaseHost(type) :baseHost()
  console.log(axios.defaults.baseURL)
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = getAccessToken()
    config.headers.common['Wechat-Version'] = 102
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


export const request = (url, method, params = {}, isChangeHost) => {
  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  if (isChangeHost) {
    changeBaseURL(1)
  } else {
    changeBaseURL()
  }

  return axios[method](url, method === 'get' ? { params } : params)
}
