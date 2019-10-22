const applicant = [
  {
    path: '/applyIndex',
    name: 'applyIndex',
    title: '首页',
    component: resolve => require(['../views/apply/apply.vue'], resolve)
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
]

export default applicant