import Layout from '@/views/layout'
const applicant = [
  {
    path: '/index',
    title: '首页',
    component: Layout,
    children: [
      {
        path: '',
        name: 'index',
        component: resolve => require(['../views/c-index'], resolve)
      }
    ]
  },
  {
    path: '/position',
    title: '职位',
    component: Layout,
    children: [
      {
        path: '',
        name: 'position',
        component: resolve => require(['../views/c-position'], resolve)
      },
      {
        path: 'details',
        name: 'positionDetail',
        title: '职位详情',
        component: resolve => require(['../views/common/position/detail.vue'], resolve)
      }
    ]
  },
  {
    path: '/cresume',
    title: '简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'cresume',
        component: resolve => require(['../views/c-resume/index.vue'], resolve)
      }
    ]
  },
  /* {
    path: '/applyIndex',
    title: '简历上传',
    component: Layout,
    children: [
      {
        path: '',
        name: 'applyIndex',
        component: resolve => require(['../views/apply/apply.vue'], resolve)
      }
    ]
  }, */
  {
    path: '/createUser',
    name: 'createUser',
    title: '猎多多 | 简历',
    component: resolve => require(['../views/createUser/index.vue'], resolve)
  }
]

export default applicant
