import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router/index'
import { getAccessToken, removeAccessToken } from './cacheService'
import Vue from 'vue'
import Util from '../util/util'

let loadingInstance = null
let counter = 0
const VUE_WEB_ZHAOPIN_API = process.env.VUE_APP_WEB_ZHAOPIN_API
const VUE_WEB_QIUZHI_API = process.env.VUE_APP_WEB_QIUZHI_API
const VUE_WEB_PUB_API = process.env.VUE_APP_WEB_PUB_API
const VUE_WEB_NODE_API = process.env.VUE_APP_WEB_NODE_API

export const request = ({ url, method, params = {}, config, onUploadProgress }) => {
  if (params && params.globalLoading) counter++
  if (counter === 1) loadingInstance = Loading.service({})

  // 添加统计头部
  // let urlParams = new URLSearchParams(location.search)
  let urlParams = Util.getUrlParam('cc')
  if (urlParams) {
    axios.defaults.headers.common['Channel-Code'] = urlParams
  }

  // 添加token头部
  if (getAccessToken()) axios.defaults.headers.common['Authorization'] = getAccessToken()

  // 切换api host
  switch (config.host) {
    case 'pub':
      if (axios.defaults.baseURL !== VUE_WEB_PUB_API) axios.defaults.baseURL = VUE_WEB_PUB_API
      break
    case 'qiuzhi':
      if (axios.defaults.baseURL !== VUE_WEB_QIUZHI_API) axios.defaults.baseURL = VUE_WEB_QIUZHI_API
      break
    case 'zhaopin':
      if (axios.defaults.baseURL !== VUE_WEB_ZHAOPIN_API) axios.defaults.baseURL = VUE_WEB_ZHAOPIN_API
      break
    case 'node':
      if (axios.defaults.baseURL !== VUE_WEB_NODE_API) axios.defaults.baseURL = VUE_WEB_NODE_API
      break
  }

  let loadingBack = () => {
    if (params && params.globalLoading) {
      counter--
      if (counter === 0) {
        Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      }
    }
  }
  return new Promise((resolve, reject) => {
    axios[method](url, method === 'get' ? { params } : params, onUploadProgress).then(res => {
      resolve(res)
      loadingBack()
    }).catch(err => {
      if (!config.noCheckLogin && err.response.data.httpStatus !== 200) {
        Message.error(err.response.data.msg || err.response.data.message)
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
