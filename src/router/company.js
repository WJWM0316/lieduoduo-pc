import Layout from '@/views/layout'
const company = [
  {
    path: '/company',
    title: '公司集合',
    component: Layout,
    children: [
      {
        path: '',
        name: 'company',
        component: resolve => require(['../views/company'], resolve)
      },
      {
        path: 'details',
        name: 'companyDetail',
        title: '公司详情',
        component: resolve => require(['../views/common/company/detail.vue'], resolve)
      }
    ]
  }
]

export default company
