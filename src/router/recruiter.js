import Layout from '@/views/b-layout'
const recruiter = [
  {
    path: '/recruiterIndex',
    title: '职位管理',
    component: Layout,
    meta: {
      useNav: true,
      icon: 'iconfont icon-zhiwei'
    },
    children: [
      {
        path: '',
        name: 'recruiterIndex',
        component: resolve => require(['../views/recruiter/recruiter.vue'], resolve)
      },
      {
        path: 'postJob',
        title: '操作职位',
        name: 'postJob',
        component: resolve => require(['../views/postJob/postJob.vue'], resolve)
      }
    ]
  },
  {
    path: '/candidateType',
    title: '候选人动态',
    component: Layout,
    meta: {
      useNav: true,
      icon: 'iconfont icon-houxuanrendongtai'
    },
    children: [
      {
        path: '',
        name: 'candidatetype',
        component: resolve => require(['../views/candidateType/index1.vue'], resolve)
      }
    ]
  },
  {
    path: '/candidate',
    title: '候选人库',
    component: Layout,
    meta: {
      useNav: true,
      icon: 'iconfont icon-houxuanrenku'
    },
    children: [
      {
        path: '',
        name: 'candidate',
        component: resolve => require(['../views/candidate/index1.vue'], resolve)
      }
    ]
  },
  {
    path: '/interviewRecords',
    title: '面试日程',
    component: Layout,
    meta: {
      useNav: true,
      icon: 'iconfont icon-Bmianshiricheng-'
    },
    children: [
      {
        path: '',
        name: 'interviewRecords',
        component: resolve => require(['../views/interviewRecords/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/myCompany',
    title: '我的公司',
    component: Layout,
    meta: {
      useNav: true,
      icon: 'iconfont icon-qiye'
    },
    children: [
      {
        path: '',
        name: 'myCompany',
        component: resolve => require(['../views/b-myCompany/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/self',
    title: '个人中心',
    component: Layout,
    meta: {
      useNav: false
    },
    children: [
      // 我的账户
      // {}
      // 我的资料
      {
        path: 'myinfos',
        name: 'myinfos',
        title: '我的资料',
        component: resolve => require(['../views/b-my-infos/index.vue'], resolve)
      },
      {
        path: 'myequity',
        name: 'myequity',
        title: '我的权益',
        component: resolve => require(['../views/b-my-equity/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/recruiteam',
    title: '招聘团队',
    component: Layout,
    meta: {
      useNav: true,
      icon: 'iconfont icon-zhaopintuandui'
    },
    children: [
      {
        path: '',
        name: 'recruiteam',
        component: resolve => require(['../views/b-recruit-team/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/issueRule',
    name: 'issueRule',
    title: '发布规则',
    component: resolve => require(['../views/issueRule/issueRule.vue'], resolve)
  },
  {
    path: '/landingPage',
    name: 'landingPage',
    title: '简历',
    component: resolve => require(['../views/landingPage/index.vue'], resolve)
  },
  {
    path: '/register',
    name: 'register',
    title: '注册',
    component: resolve => require(['../views/registerCompany/index.vue'], resolve)
  },
  {
    path: '/perfectauth',
    title: '身份认证',
    component: Layout,
    meta: {
      useNav: false
    },
    children: [
      {
        path: '',
        name: 'perfectauth',
        component: resolve => require(['../views/perfectauth/index.vue'], resolve)
      }
    ]
  }
]
export default recruiter
