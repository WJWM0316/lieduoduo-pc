import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // 默认进入控制台
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
    },
    {
      path: '/applyIndex',
      name: 'applyIndex',
      component: () => import(/* webpackChunkName: "login" */ '../views/apply/apply.vue')
    },{
      path: '/recruiterIndex',
      name: 'recruiterIndex',
      component: () => import(/* webpackChunkName: "login" */ '../views/recruiter/recruiter.vue')
    },
    {
      path: '/postJob',
      name: 'postJob',
      component: () => import(/* webpackChunkName: "login" */ '../views/postJob/postJob.vue')
    },
    {
      path: '*',
      redirect: {
        name: 'login'
      }
    }
  ]
})
