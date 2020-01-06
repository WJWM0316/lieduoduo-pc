import Layout from '@/views/layout'
const interview = [
  {
    path: '/interview',
    title: '面试',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'jobhunterInterview',
        title: '收到申请',
        component: resolve => require(['../views/interview/index.vue'], resolve)
      }
    ]
  }
]

export default interview
