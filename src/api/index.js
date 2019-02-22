import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import { baseHost } from '../../config.js'

let loadingInstance = null
const company = location.href.split('/')[3] || 'tiger'
import { getAccessToken, removeAccessToken, removeAccessToPPTXken } from './cacheService'

// 请求的跟地址
// export const upload_api = `${baseHost()}/attaches`
axios.defaults.baseURL = baseHost()

export const changeBaseURL = () => {
  console.log('axios.defaults.baseURL',axios.defaults.baseURL)
  axios.defaults.baseURL = baseHost()
  console.log('axios.defaults.baseURL',axios.defaults.baseURL)
}


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
      console.log(err.response.data.httpStatus)
      console.log(router)
      console.log(router.mode)
      router.replace({name: 'recruiterIndex'})
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
