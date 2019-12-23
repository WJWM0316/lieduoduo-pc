import Layout from '@/views/layout'
const interview = [
  {
    path: '/interview',
    title: '面试',
    component: Layout,
    children: [
      {
        path: 'apply',
        name: 'interviewApply',
        title: '收到申请',
        component: resolve => require(['../views/interview/apply.vue'], resolve)
      },
      {
        path: 'receive',
        name: 'interviewReceive',
        title: '收到邀请',
        component: resolve => require(['../views/interview/receive.vue'], resolve)
      },
      {
        path: 'schedule',
        name: 'interviewSchedule',
        title: '面试日程',
        component: resolve => require(['../views/interview/schedule.vue'], resolve)
      },
      {
        path: 'detail',
        name: 'interviewDetail',
        title: '面试详情',
        component: resolve => require(['../views/interview/detail.vue'], resolve)
      }
    ]
  }
]

export default interview
