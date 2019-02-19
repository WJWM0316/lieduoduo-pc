export const routes = [
  	{
      path: '/',
      // 默认进入控制台
      redirect: {
        name: 'applyIndex'
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
