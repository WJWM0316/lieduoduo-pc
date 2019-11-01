import Vue from 'vue'
import Router from 'vue-router'

import applicant from './applicant.js'
import recruiter from './recruiter.js'
import common from './common.js'
import other from './other.js'
import login from './login.js'

import store from '../store/store'
import { getUserInfosApi } from '@/api/auth.js'
import { getUserRoleInfoApi } from '@/api/auth'

let routes = [
  ...applicant,
  ...recruiter,
  ...common,
  ...other,
  ...login
]
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
let getUserInfo = () => {
  getUserInfosApi().then(res => {
    this.$store.commit('SETLOGIN', 1)
    this.$store.commit('setUserInfo', res.data.data)
    this.getUserRoleInfo()
  }).catch(e => {
    this.$store.commit('SETLOGIN', 0)
  })
}
let getUserRoleInfo = () => {
  getUserRoleInfoApi().then(res => {
    if (res.data.data.isJobhunter) this.$store.dispatch('getMyResume')
    this.$store.commit('setRoleInfos', res.data.data)
  })
}
router.beforeEach((to, from, next) => {
  store.dispatch('setPageName', { name: to.name })


  // let userInfo = this.$store.getters.userInfo
  // console.log(userInfo, 1111)
  // if (userInfo.id)


  if (from.name !== to.name) {
    window.scrollTo(0, 0)
  }
  next(true)
})

export default router
