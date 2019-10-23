import Layout from '@/views/layout'
const applicant = [
  {
    path: '/index',
    name: 'index',
    title: '首页',
    component: Layout,
    children: [
      {
        path: '',
        name: 'indexPage',
        component: resolve => require(['../views/index'], resolve)
      }
    ]
  },
  {
    path: '/applyIndex',
    name: 'applyIndex',
    title: '简历上传',
    component: Layout,
    children: [
      {
        path: '',
        name: 'applyIndexPage',
        component: resolve => require(['../views/apply/apply.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeFirstPost',
    name: 'resumeFirstPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeFirstPostIndex',
        component: resolve => require(['../views/activity/resumeFirstPost/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeSecondPost',
    name: 'resumeSecondPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeSecondPostIndex',
        component: resolve => require(['../views/activity/resumeSecondPost/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeThirdPost',
    name: 'resumeThirdPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeThirdPostIndex',
        component: resolve => require(['../views/activity/resumeThirdPost/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/resumeFourthPost',
    name: 'resumeFourthPost',
    title: '猎多多 | 简历',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resumeFourthPostIndex',
        component: resolve => require(['../views/activity/resumeFourthPost/index.vue'], resolve)
      }
    ]
  },
]

export default applicant