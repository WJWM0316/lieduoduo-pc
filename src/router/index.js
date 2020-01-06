import Vue from 'vue'
import Router from 'vue-router'

import company from './company.js'
import applicant from './applicant.js'
import recruiter from './recruiter.js'
import common from './common.js'
import other from './other.js'
import login from './login.js'
import interview from './interview.js'
import { Message } from 'element-ui'
import store from '../store/store'

let checkRecruiterRouter = ['recruiterIndex', 'postJob', 'candidateType', 'candidatetype', 'interviewRecords', 'myCompany', 'myinfos', 'recruiteam']
let routes = [
  ...applicant,
  ...recruiter,
  ...common,
  ...other,
  ...login,
  ...company,
  ...interview
]
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('setPageName', { name: to.name })
  if (from.name !== to.name) {
    window.scrollTo(0, 0)
  }
  let checkRole = () => {
    if (!store.state.roleInfos.isRecruiter) {
      next({path: '/register'})
      Message({
        type: 'worn',
        message: '您还未成为招聘官，请先认证成为招聘官！'
      })
    } else {
      next(true)
    }
  }
	if (checkRecruiterRouter.includes(to.name)) {
		if (store.state.roleCallBack) {
      checkRole()
		} else {
			store.state.roleCallBack = () => {
				checkRole()
			}
		}
	} else {
    next(true)
  }
})

export default router
