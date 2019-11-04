import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import { getAccessToken, removeAccessToken } from './cacheService'
import Vue from 'vue'

let loadingInstance = null,
    counter = 0 
const VUE_WEB_ZHAOPIN_API = process.env.VUE_APP_WEB_ZHAOPIN_API
const VUE_WEB_QIUZHI_API = process.env.VUE_APP_WEB_QIUZHI_API
const VUE_WEB_PUB_API = process.env.VUE_APP_WEB_PUB_API
const VUE_WEB_NODE_API = process.env.VUE_APP_WEB_NODE_API


export const request = ({ url, method, params = {}, config }) => {
  if (params && params.globalLoading) counter++
  if (counter === 1) loadingInstance = Loading.service({})
  if (getAccessToken()) axios.defaults.headers.common['Authorization'] = getAccessToken()
  

  // 切换api host
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

  let loadingBack = () => {
    if (params && params.globalLoading) {
      counter--
      if (counter === 0) {
        Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        })
      }
    }
  }
  return new Promise((resolve, reject) => {
    axios[method](url, method === 'get' ? { params } : params).then(res => {
      resolve(res)
      loadingBack()
    }).catch(err => {
      if (!config.noCheckLogin && err.response.data.httpStatus !== 200) {
        Vue.message.error(err.response.data.msg)
      }
      // 登陆过期或者未登录
      if (!config.noCheckLogin && err.response.data.httpStatus === 401) {
        router.push({ name: 'login', query: { type: 'msgLogin', needBack: true } })
        removeAccessToken()
      }
      reject(err)
      loadingBack()
    })
  })
}
