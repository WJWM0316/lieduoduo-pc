import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import { getAccessToken, removeAccessToken } from './cacheService'
import Vue from 'vue'
let loadingInstance = null
const VUE_WEB_ZHAOPIN_API = process.env.VUE_APP_WEB_ZHAOPIN_API
const VUE_WEB_QIUZHI_API = process.env.VUE_APP_WEB_QIUZHI_API
const VUE_WEB_PUB_API = process.env.VUE_APP_WEB_PUB_API
const VUE_WEB_NODE_API = process.env.VUE_APP_WEB_NODE_API

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
    // 错误提示
    if (loadingInstance) loadingInstance.close()
    return Promise.reject(err.response)
  }
)
// let host_pub = false
export const request = ({ url, method, params = {}, config }) => {
  // 切换api host
  // if (config && config.host) {
  //   if (!host_pub) axios.defaults.baseURL = VUE_WEB_PUB_API
  //   host_pub = true
  // } else {
  //   if (host_pub) this.upDateBaseURL()
  //     host_pub = false
  // }

  switch (config.host) {
    case 'pub':
      axios.defaults.baseURL = VUE_WEB_PUB_API
      break
    case 'qiuzhi':
      axios.defaults.baseURL = VUE_WEB_QIUZHI_API
      break
    case 'zhaopin':
      axios.defaults.baseURL = VUE_WEB_ZHAOPIN_API
      break
    case 'node':
      axios.defaults.baseURL = VUE_WEB_NODE_API
      break
  }

  if (params.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }

  return new Promise((resolve, reject) => {
    axios[method](url, method === 'get' ? { params } : params).then(res => {
      resolve(res)
    }).catch(err => {
      if (!config.noCheckLogin && err.data.httpStatus !== 200) {
        Vue.message.error(err.data.msg)
      }
      // 登陆过期或者未登录
      if(!config.noCheckLogin && err.data.httpStatus === 401) {
        router.push({name: 'login', query: {type: 'msgLogin', needBack: true}})
        removeAccessToken()
      }
      reject(err)
    })
  })
}

// export const upDateBaseURL = () => {
//   let role = this.$store.getters('userIdentity')
//   axios.defaults.baseURL = role !== 'applicant' ? VUE_WEB_ZHAOPIN_API : VUE_WEB_QIUZHI_API
// }
