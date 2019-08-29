export const routes = [
  	{
      path: '/',
      // 默认进入控制台
      redirect: {
        name: 'applyIndex'
      },
      meta: {
        useNav: false
      }
    },
    {
      path: '/login',
      name: 'login',
      title: '登陆',
      component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
    },
    {
      path: '/applyIndex',
      name: 'applyIndex',
      title: '求职首页',
      component: () => import(/* webpackChunkName: "login" */ '../views/apply/apply.vue')
    },
    {
      path: '/candidate',
      name: 'candidate',
      title: '候选人',
      component: () => import(/* webpackChunkName: "login" */ '../views/candidate/candidate.vue'),
      // 元信息
      meta: {
        // 一级路由需要设置， 是否在侧边栏显示
        useNav: true,
        // 当前所属的模块
        module: 'recruiterResource'
      }
    },
    {
      path: '/recruiterIndex',
      name: 'recruiterIndex',
      title: '职位管理',
      component: () => import(/* webpackChunkName: "login" */ '../views/recruiter/recruiter.vue'),
      // 元信息
      meta: {
        // 一级路由需要设置， 是否在侧边栏显示
        useNav: true,
        // 当前所属的模块
        module: 'recruiterResource'
      }
    },
    {
      path: '/404',
      name: '404',
      title: '页面不存在',
      component: () => import(/* webpackChunkName: "login" */ '../views/404/404.vue'),
      // 元信息
      meta: {
        // 一级路由需要设置， 是否在侧边栏显示
        useNav: 　false,
        // 当前所属的模块
        module: '404'
      }
    },
    {
      path: '/postJob',
      name: 'postJob',
      title: '操作职位',
      component: () => import(/* webpackChunkName: "login" */ '../views/postJob/postJob.vue')
    },
    {
      path: '/userDeal',
      name: 'userDeal',
      component: () => import(/* webpackChunkName: "login" */ '../views/userDeal/userDeal.vue')
    },
    {
      path: '/issueRule',
      name: 'issueRule',
      component: () => import(/* webpackChunkName: "login" */ '../views/issueRule/issueRule.vue')
    },
    {
      path: '/putIn',
      name: 'putIn',
      title: '猎多多 | 投放',
      component: () => import(/* webpackChunkName: "putIn" */ '../views/activity/putIn/index.vue')
    },
    {
      path: '/resumeFirstPost',
      name: 'resumeFirstPost',
      title: '猎多多 | 简历',
      component: () => import(/* webpackChunkName: "putIn" */ '../views/activity/resumeFirstPost/index.vue')
    },
    {
      path: '/resumeSecondPost',
      name: 'resumeSecondPost',
      title: '猎多多 | 简历',
      component: () => import(/* webpackChunkName: "putIn" */ '../views/activity/resumeSecondPost/index.vue')
    },
    {
      path: '/resumeThirdPost',
      name: 'resumeThirdPost',
      title: '猎多多 | 简历',
      component: () => import(/* webpackChunkName: "putIn" */ '../views/activity/resumeThirdPost/index.vue')
    },
    {
      path: '/resumeFourthPost',
      name: 'resumeFourthPost',
      title: '猎多多 | 简历',
      component: () => import(/* webpackChunkName: "putIn" */ '../views/activity/resumeFourthPost/index.vue')
    },
    {
      path: '/userAgreement',
      name: 'userAgreement',
      title: '猎多多 | 用户协议&隐私政策',
      component: () => import(/* webpackChunkName: "putIn" */ '../views/activity/userAgreement/index.vue')
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
]
