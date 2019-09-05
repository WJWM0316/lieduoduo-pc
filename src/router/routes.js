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
      component: resolve => require(['../views/login/login.vue'], resolve)
    },
    {
      path: '/applyIndex',
      name: 'applyIndex',
      title: '求职首页',
      component: resolve => require(['../views/apply/apply.vue'], resolve)
    },
    {
      path: '/candidate',
      name: 'candidate',
      title: '候选人',
      component: resolve => require(['../views/candidate/candidate.vue'], resolve),
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
      component: resolve => require(['../views/recruiter/recruiter.vue'], resolve),
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
      component: resolve => require(['../views/404/404.vue'], resolve),
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
      component: resolve => require(['../views/postJob/postJob.vue'], resolve)
    },
    {
      path: '/issueRule',
      name: 'issueRule',
      component: resolve => require(['../views/issueRule/issueRule.vue'], resolve)
    },
    {
      path: '/issueRule',
      name: 'issueRule',
      component: resolve => require(['../views/issueRule/issueRule.vue'], resolve)
    },
    {
      path: '/putIn',
      name: 'putIn',
      title: '猎多多 | 投放',
      component: resolve => require(['../views/activity/putIn/index.vue'], resolve)
    },
    {
      path: '/resumeFirstPost',
      name: 'resumeFirstPost',
      title: '猎多多 | 简历',
      component: resolve => require(['../views/activity/resumeFirstPost/index.vue'], resolve)
    },
    {
      path: '/resumeSecondPost',
      name: 'resumeSecondPost',
      title: '猎多多 | 简历',
      component: resolve => require(['../views/activity/resumeSecondPost/index.vue'], resolve)
    },
    {
      path: '/resumeThirdPost',
      name: 'resumeThirdPost',
      title: '猎多多 | 简历',
      component: resolve => require(['../views/activity/resumeThirdPost/index.vue'], resolve)
    },
    {
      path: '/resumeFourthPost',
      name: 'resumeFourthPost',
      title: '猎多多 | 简历',
      component: resolve => require(['../views/activity/resumeFourthPost/index.vue'], resolve)
    },
    {
      path: '/userAgreement',
      name: 'userAgreement',
      title: '猎多多 | 用户协议&隐私政策',
      component: resolve => require(['../views/activity/userAgreement/index.vue'], resolve)
    }
    // ,
    // {
    //   path: '*',
    //   redirect: {
    //     name: '404'
    //   }
    // }
]
