import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router/index'
import { getAccessToken, removeAccessToken } from './cacheService'
import Vue from 'vue'
import Util from '../util/util'
// 定义错误提示窗口
window.messagequeue = {}
let loadingInstance = null
let counter = 0
const VUE_WEB_ZHAOPIN_API = process.env.VUE_APP_WEB_ZHAOPIN_API
const VUE_WEB_QIUZHI_API = process.env.VUE_APP_WEB_QIUZHI_API
const VUE_WEB_PUB_API = process.env.VUE_APP_WEB_PUB_API
const VUE_WEB_NODE_API = process.env.VUE_APP_WEB_NODE_API

// 默认统计参数
axios.defaults.headers.common['Channel-Code'] = 'source_web'

export const request = ({ url, method, params = {}, config = {} }) => {
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
      if (params.identity) axios.defaults.headers.common['Source'] = params.identity === 1 ? 'web_c' : 'web_b'
      break
    case 'qiuzhi':
      if (axios.defaults.baseURL !== VUE_WEB_QIUZHI_API) axios.defaults.baseURL = VUE_WEB_QIUZHI_API
      axios.defaults.headers.common['Source'] = 'web_c'
      break
    case 'zhaopin':
      if (axios.defaults.baseURL !== VUE_WEB_ZHAOPIN_API) axios.defaults.baseURL = VUE_WEB_ZHAOPIN_API
      axios.defaults.headers.common['Source'] = 'web_b'
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
    // 因为axios[method]方式设置的responseType无效，所以换成axios({}),同时保留get请求的参数按json格式传递
    let axiosFun = null
    if (config.responseType) {
      axiosFun = axios({
        url,
        method,
        data: method === 'get' ? { params } : params,
        responseType: config.responseType
      })
    } else {
      axiosFun = axios[method](url, method === 'get' ? { params } : params, config)
    }
    axiosFun.then(res => {
      resolve(res)
      loadingBack()
    }).catch(err => {
      let catchFun = (err) => {
        if (!config.noCheckLogin && err.response.data.httpStatus !== 200) {
          // 相同提示不重复提示
          let message = err.response.data.msg || err.response.data.message
          if (!window.messagequeue[message]) {
            window.messagequeue[message] = 1
            Message({
              type: 'error',
              message: message,
              onClose: () => {
              // 移除队列
                window.messagequeue[message] = 0
                delete window.messagequeue[message]
              }
            })
          }
        }
        // 登陆过期或者未登录
        if (!config.noCheckLogin && err.response.data.httpStatus === 401) {
          router.push({ name: 'login', query: { type: 'msgLogin', needBack: true } })
          removeAccessToken()
        }
        // 登陆过期或者未登录
        if (err.response.data.code === 801) {
          router.push({ name: 'register' })
        }
        reject(err.response)
        loadingBack()
      }
      if (err.response.data instanceof Blob) {
        var reader = new FileReader()
        reader.readAsText(err.response.data, 'utf-8')
        reader.onload = function () {
          err.response.data = JSON.parse(reader.result)
          catchFun(err)
        }
      } else {
        catchFun(err)
      }
    })
  })
}
