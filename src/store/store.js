import Vue from 'vue'
import Vuex from 'vuex'
import { saveAccessToken, removeAccessToken, getAccessToken, getUserInfo, saveUserInfo } from '../api/cacheService'
import { loginPutInApipc, getUserRoleInfoApi, switchRoleApi } from '@/api/auth'
import router from '@/router/index.js'
import { mobileReg } from '@/util/fieldRegular.js'
import { getMyResumeApi } from '@/api/resume.js'

import { logoutApi } from '../api/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // 在state中去声明全局变量，可以通过 this.$store.state 访问
  state: {
    roleInfos: {}, // 用户角色信息
    hasLogin: 0, // 是否登录
    userIdentity: 1, // 1 C端  2 B端
    userInfo: getUserInfo() || {},
    token: getAccessToken(),
    pageName: '',
    loginValidTime: 60 * 60 * 24 * 7 * 1000,
    cityId: 0, // 用户地址id
    guideCreateRecruiter: false, // 登录B端引导二维码
    showGuideQrcodePop: false, // 引导二维码
    guideQrcodePop: { // 引导二维码参数
      switch: false,
      type: 'tocIndex',
      params: ''
    },
    areaList: [],
    myResume: {} // 我的简历详情
  },
  // 在getters中声明state中变量的计算函数，缓存计算后的数据， 通过 this.$store.getters 调用
  getters: {
    // 接受state作为参数，每次 count发生变化时 ， 都会被调用
    roleInfos: state => state.roleInfos,
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
    SETLOGIN: (state, data) => {
      state.hasLogin = data
    },
    setUserIdentity: (state, data) => {
      state.userIdentity = data
    },
    // mutations的第一个参数即为 state对象，并且可以向mutation传入额外的参数
    setUserInfo: (state, data) => {
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
      state.userIdentity = data.curInUseRole
    },
    // 登录回调
    LOGINCALLBACK: (state, data) => {
      // Vue.message({
      //   message: '登录成功',
      //   type: 'success'
      // })
      saveAccessToken(data.token, state.loginValidTime)
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
      state.token = data.token
      state.hasLogin = 1
      if (data.curInUseRole) state.userIdentity = data.curInUseRole
      // 获取用户角色信息
      getUserRoleInfoApi().then(res => {
        state.roleInfos = res.data.data
        if (state.userIdentity === 1 && !state.roleInfos.isJobhunter) {
          router.replace({ path: '/createUser' })
          return
        }
        if (state.userIdentity === 2 && !state.roleInfos.isRecruiter) {
          state.guideCreateRecruiter = true
          return
        }
        // 登录跳转
        if (data.refresh) {
          window.location.reload()
        } else if (data.needBack) {
          router.go(-1)
        } else {
          let userIdentity = state.userIdentity
          userIdentity === 1 ? router.replace({ path: '/index' }) : router.replace({ path: '/candidate' })
        }
      })
    },
    // 退出登录回调
    LOGOUT: (state, data) => {
      state.userInfo = {}
      state.token = null
      removeAccessToken()
      if (state.userIdentity === 1) {
        router.replace({ path: '/index' })
      } else {
        router.replace({ path: '/login', query: { type: 'msgLogin' } })
      }
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1500)
    },
    setRoleInfos (state, data) {
      state.roleInfos = data
    },
    // 获取用户信息
    GETROLEINFO: (state, data) => {
    },

    setPageName (state, options) {
      state.pageName = options.name
    },

    setAreas (state, area) {
      state.areaList = area
    },

    setCityId (state, id) {
      state.cityId = id
    },
    guideQrcodePop (state, data) {
      state.guideQrcodePop = data
    },
    // 设置我的简历信息
    setMyResume (state, data) {
      getMyResumeApi().then(res => {
        state.myResume = res.data.data
        if (!state.userInfo.realname) {
          state.userInfo.realname = state.myResume.name
          state.userInfo.avatarInfo = state.myResume.avatar
        }
      })
    },
    switchIdentity (state, data) {
      if (state.userIdentity === 1) {
        if (state.roleInfos.isRecruiter) {
          switchRoleApi().then(res => {
            state.userIdentity = state.userIdentity === 1 ? 2 : 1
            router.replace({ path: '/candidate' })
          })
        } else {
          // 打开引导弹窗
          state.guideQrcodePop = { switch: true, type: 'tobIndex' }
        }
      } else {
        switchRoleApi().then(res => {
          state.userIdentity = state.userIdentity === 1 ? 2 : 1
          router.replace({ path: '/index' })
        })
      }
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

    logoutApi (store, data) {
      return logoutApi()
        .then(res => {
          /* Vue.message({
            message: '退出成功',
            type: 'success'
          }) */
          store.commit('LOGOUT', data)
          return res
        })
    },

    setPageName (store, options) {
      store.commit('setPageName', options)
    },
    // 获取我的简历详情
    getMyResume (store, options) {
      store.commit('setMyResume', options)
    }
  }
})
