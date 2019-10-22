import Vue from 'vue'
import Router from 'vue-router'

import applicant from './applicant.js'
import recruiter from './recruiter.js'
import common from './common.js'
import other from './other.js'
import login from './login.js'

import store from '../store/store'

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
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('setPageName', {name: to.name})
  if (from.name !== to.name) {
    window.scrollTo(0, 0)
  }
  next(true)
})

export default router

