import Layout from '@/views/b-layout'
const recruiter = [
  {
    path: '/candidate',
    title: '候选人',
    component: Layout,
    meta: {
      // 一级路由需要设置， 是否在侧边栏显示
      useNav: true,
      // 当前所属的模块
      module: 'recruiterResource',
      icon: 'iconfont icon-zhaopintuandui'
    },
    children: [
      {
        path: '',
        name: 'candidate',
        component: resolve => require(['../views/candidate/candidate.vue'], resolve)
      }
    ]
  },
  {
    path: '/recruiterIndex',
    title: '职位管理',
    component: Layout,
    meta: {
      // 一级路由需要设置， 是否在侧边栏显示
      useNav: true,
      // 当前所属的模块
      module: 'recruiterResource',
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
    path: '/issueRule',
    name: 'issueRule',
    title: '发布规则',
    component: resolve => require(['../views/issueRule/issueRule.vue'], resolve)
  }
]
export default recruiter
