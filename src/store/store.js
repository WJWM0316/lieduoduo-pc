import Vue from 'vue'
import Vuex from 'vuex'
import { saveAccessToken, removeAccessToken, getAccessToken, getUserInfo, saveUserInfo } from '../api/cacheService'
import { loginPutInApipc, getUserRoleInfoApi, switchRoleApi } from '@/api/auth'
import router from '@/router/index.js'
import { mobileReg } from '@/util/fieldRegular.js'
import { logoutApi } from '../api/auth'

// modules
import resume from './modules/resume'
import company from './modules/company'

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
    areaList: []
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
    // 将用户名称替换为简历姓名
    setUserRealname: (state, name) => {
      state.userInfo.realname = name
    },
    // 登录回调
    LOGINCALLBACK: (state, data) => {
      saveAccessToken(data.token, state.loginValidTime)
      saveUserInfo(data, state.loginValidTime)
      state.userInfo = data
      state.token = data.token
      state.hasLogin = 1
      if (data.curInUseRole) state.userIdentity = data.curInUseRole
    },
    // 退出登录回调
    LOGOUT: (state) => {
      state.userInfo = {}
      state.token = null
      removeAccessToken()
      if (state.userIdentity === 1) {
        router.replace({ path: '/index', query: { q: Date.now() } })
      } else {
        router.replace({ path: '/login', query: { type: 'msgLogin' } })
      }
    },
    setRoleInfos (state, data) {
      state.roleInfos = data
    },
    setCreateRecruiter (state, data) {
      state.guideCreateRecruiter = data
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
    switchIdentity (state, data) {
			// 当前用户在C端，切换B端
      if (state.userIdentity === 1) {
        if (state.roleInfos.isRecruiter) {
          switchRoleApi().then(res => {
            state.userIdentity = state.userIdentity === 2
            router.replace({ path: '/candidate' })
          })
        } else {
          switchRoleApi().then(res => {
						state.userIdentity = state.userIdentity === 2
            router.replace({ path: '/register' })
          })
        }
      } else {
				// 当前用户在B端，切换C端
				if (state.roleInfos.isJobhunter) {
					switchRoleApi().then(res => {
					  state.userIdentity = state.userIdentity === 1
					  router.replace({ path: '/index' })
					})
				} else {
					switchRoleApi().then(res => {
					  state.userIdentity = state.userIdentity === 1
					  router.replace({ path: '/createUser' })
					})
				}       
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
          // 获取用户角色信息
          const { state } = store
          getUserRoleInfoApi().then(({ data }) => {
            const result = data.data || {}
            store.commit('setRoleInfos', result)
            // 引导创建用户
            if (state.userIdentity === 1 && !result.isJobhunter) {
              router.replace({ path: '/createUser' })
              return
            }
            if (state.userIdentity === 2 && !result.isRecruiter) {
              // store.commit('setCreateRecruiter', true)
              router.replace({ path: '/register' })
              return
            }
            
            if (loginData.refresh) {
              window.location.reload()
            } else if (loginData.needBack) {
              router.go(-1)
            } else {
              let userIdentity = state.userIdentity
              userIdentity === 1 ? router.replace({ path: '/index' }) : router.replace({ path: '/candidate' })
            }

            // 如果是求职者
            if (state.userIdentity === 1 && result.isJobhunter) {
              // 获取简历信息
              store.dispatch('getMyResume')
            }
          })
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },

    logoutApi (store, data) {
      return logoutApi()
        .then(res => {
          store.commit('LOGOUT', data)
          return res
        })
    },

    setPageName (store, options) {
      store.commit('setPageName', options)
    }
  },
  modules: {
    resume,
    company
  }
})
