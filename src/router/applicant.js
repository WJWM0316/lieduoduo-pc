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
        component: resolve => require(['../views/index'], resolve)
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
        component: resolve => require(['../views/position'], resolve)
      }
    ]
  },
  {
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
  },
  {
    path: '/resumeFirstPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeFirstPost',
        component: resolve => require(['../views/activity/resumeFirstPost/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeSecondPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeSecondPost',
        component: resolve => require(['../views/activity/resumeSecondPost/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeThirdPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeThirdPost',
        component: resolve => require(['../views/activity/resumeThirdPost/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeFourthPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeFourthPost',
        component: resolve => require(['../views/activity/resumeFourthPost/index.vue'], resolve)
      }
    ]
  },
]

export default applicant