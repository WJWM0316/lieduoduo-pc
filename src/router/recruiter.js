import Layout from '@/views/b-layout'
const recruiter = [
  {
    path: '/candidateType',
    title: '候选人动态',
    component: Layout,
    meta: {
      useNav: true,
      module: 'recruiterResource',
      icon: 'iconfont icon-zhaopintuandui'
    },
    children: [
      {
        path: '',
        name: 'candidatetype',
        component: resolve => require(['../views/candidateType/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/candidate',
    title: '候选人库',
    component: Layout,
    meta: {
      useNav: true,
      module: 'recruiterResource',
      icon: 'iconfont icon-zhaopintuandui'
    },
    children: [
      {
        path: '',
        name: 'candidate',
        component: resolve => require(['../views/candidate/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/interviewRecords',
    title: '面试日程',
    component: Layout,
    meta: {
      useNav: true,
      module: 'recruiterResource',
      icon: 'iconfont icon-zhaopintuandui'
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
    path: '/recruiterIndex',
    title: '职位管理',
    component: Layout,
    meta: {
      useNav: true,
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
