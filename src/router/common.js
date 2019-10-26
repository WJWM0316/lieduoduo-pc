const common = [
  {
    path: '/userAgreement',
    name: 'userAgreement',
    title: '猎多多 | 用户协议&隐私政策',
    component: resolve => require(['../views/activity/userAgreement/index.vue'], resolve)
  },
  {
    path: '/positionDetail',
    name: 'positionDetail',
    title: '职位详情',
    component: resolve => require(['../views/common/position/detail.vue'], resolve)
  }
]
export default common
