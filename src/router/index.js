import Vue from 'vue'
import Router from 'vue-router'

import company from './company.js'
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
  ...login,
  ...company
]
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
let getUserInfo = () => {
  return getUserInfosApi().then(res => {
    store.commit('SETLOGIN', 1)
    store.commit('setUserInfo', res.data.data)
  }).catch(e => {
    store.commit('SETLOGIN', 0)
  })
}
let getUserRoleInfo = () => {
  return getUserRoleInfoApi().then(res => {
    if (res.data.data.isJobhunter) this.$store.dispatch('getMyResume')
    store.commit('setRoleInfos', res.data.data)
  })
}
router.beforeEach((to, from, next) => {
  store.dispatch('setPageName', { name: to.name })
  if (from.name !== to.name) {
    window.scrollTo(0, 0)
  }
  next(true)
})
export default router
