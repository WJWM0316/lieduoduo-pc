import Vue from 'vue'
import Vuex from 'vuex'
import { saveAccessToken, removeAccessToken, getAccessToken, getUserInfo, saveUserInfo } from '../api/cacheService'
import {
  loginApi,
  logoutApi
} from '../api/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在state中去声明全局变量，可以通过 this.$store.state 访问
  state: {
    userIdentity: 'applicant',
    userInfo: getUserInfo() || {},
    token: getAccessToken(),
    pageName: '',
    loginValidTime: 60 * 60 * 24 * 7 * 1000
  },
  // 在getters中声明state中变量的计算函数，缓存计算后的数据， 通过 this.$store.getters 调用
  getters: {
    // 接受state作为参数，每次 count发生变化时 ， 都会被调用
    pageName: state => state.pageName,
    userIdentity: state => state.userIdentity,
    userInfo: state => state.userInfo,
    token: state => state.token
  },
  // 只能执行同步方法，不要去执行异步方法 通过 this.$store.commit 方法去调用
  mutations: {
    setUserIdentity: (state, data) => {
      state.userIdentity = data
    },
    // mutations的第一个参数即为 state对象，并且可以向mutation传入额外的参数
    setUserInfo: (state, data) => {
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
    },

    LOGIN (state, data) {
      saveAccessToken(data.token, state.loginValidTime)
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
      state.token = data.token
    },

    LOGOUT (state) {
      state.userInfo = {}
      state.token = null
    },

    setPageName (state, options) {
      state.pageName = options.name
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
      store.commit('LOGIN', data)
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
