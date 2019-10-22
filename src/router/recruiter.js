const recruiter = [
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
    path: '/postJob',
    name: 'postJob',
    title: '操作职位',
    component: resolve => require(['../views/postJob/postJob.vue'], resolve)
  },
  {
    path: '/issueRule',
    name: 'issueRule',
    title: '发布规则',
    component: resolve => require(['../views/issueRule/issueRule.vue'], resolve)
  }
]
export default recruiter