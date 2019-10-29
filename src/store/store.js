import Vue from 'vue'
import Vuex from 'vuex'
import { saveAccessToken, removeAccessToken, getAccessToken, getUserInfo, saveUserInfo } from '../api/cacheService'
import { loginPutInApipc, getUserRoleInfoApi } from '@/api/auth'
import router from '@/router/index.js'
import { mobileReg } from '@/util/fieldRegular.js'

import {
  loginApi,
  logoutApi
} from '../api/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在state中去声明全局变量，可以通过 this.$store.state 访问
  state: {
    roleInfos: {}, // 用户角色信息
    hasLogin: 0, // 是否登录
    userIdentity: 0, // 0 C端  1 B端
    userInfo: getUserInfo() || {},
    token: getAccessToken(),
    pageName: '',
    guideCreateRecruiter: false,
    loginValidTime: 60 * 60 * 24 * 7 * 1000,
    cityId: 0, // 用户地址id
    areaList: []
  },
  // 在getters中声明state中变量的计算函数，缓存计算后的数据， 通过 this.$store.getters 调用
  getters: {
    // 接受state作为参数，每次 count发生变化时 ， 都会被调用
    pageName: state => state.pageName,
    userIdentity: state => state.userIdentity,
    userInfo: state => state.userInfo,
    hasLogin: state => state.hasLogin,
    token: state => state.token,
    areaList: state => state.areaList,
    cityId: state => state.cityId
  },
  // 只能执行同步方法，不要去执行异步方法 通过 this.$store.commit 方法去调用
  mutations: {
    SETLOGIN:  (state, data) => {
      state.hasLogin = data
    }, 
    setUserIdentity: (state, data) => {
      state.userIdentity = data
    },
    // mutations的第一个参数即为 state对象，并且可以向mutation传入额外的参数
    setUserInfo: (state, data) => {
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
    },

    LOGINCALLBACK: (state, data) => {
      Vue.message({
        message: '登录成功',
        type: 'success'
      })
      saveAccessToken(data.token, state.loginValidTime)
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
      state.token = data.token
      state.hasLogin = 1
      if (data.hasOwnProperty('isBusiness')) state.userIdentity = data.isBusiness
      // 获取用户角色信息
      getUserRoleInfoApi().then(res => {
        state.roleInfos = res.data.data
        // 判断是否求职者且未完善简历四步
        if (!state.userIdentity && !state.roleInfos.isJobhunter) {
          router.replace({path: '/resumeFirstPost'})
          return
        }
        if (state.userIdentity && !state.roleInfos.isRecruiter) {
          state.guideCreateRecruiter = true
          return
        }
        // 登录跳转
        if (data.refresh) {
          window.Refresh()
        } else if (data.needBack) {
          router.go(-1)
        } else {
          let userIdentity = state.userIdentity
          !userIdentity ? router.replace('index') : router.replace('candidate')
        }
      })
    },

    GETROLEINFO: (state, data) => {

    },
    LOGOUT (state) {
      state.userInfo = {}
      state.token = null
    },

    setPageName (state, options) {
      state.pageName = options.name
    },

    setAreas (state, area) {
      state.areaList = area
    },

    setCityId (state, id) {
      state.cityId = id
    }
  },
  // 借助actions的手去 执行 mutations ， 通过  this.$store.dispatch 的方式调用
  // 可以用来执行异步操作，可以跟踪异步数据状态变化
  actions: {
    setUserIdentity: (store, data) => {
      store.commit('setUserIdentity', data)
    },

    setUserInfo: (store, data) => {
      store.commit('setUserInfo', data)
    },
    login (store, data) {
      if (!mobileReg.test(data.mobile)) {
        Vue.message.error('手机号码格式不正确')
        return
      } 
      return new Promise((resolve, reject) => {
        loginPutInApipc(data).then(res => {
          let loginData = {
            ...res.data.data,
            ...data
          }
          store.commit('LOGINCALLBACK', loginData)
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },

    testLogin (store, data) {
      return loginApi(data)
        .then(res => {
          store.commit('LOGIN', res.data.data)
          return res
        })
        .catch(error => {
          return Promise.reject(error.data || {})
        })
    },

    logoutApi (store) {
      return logoutApi()
        .then(res => {
          removeAccessToken()
          store.commit('LOGOUT')
          return res
        })
        .catch(error => {
          return Promise.reject(error.data || {})
        })
    },
    
    setPageName (store, options) {
      store.commit('setPageName', options)
    }
  }
})
