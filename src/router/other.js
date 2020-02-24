import Layout from '@/views/layout'
const other = [
  {
    path: '/',
    // 默认进入控制台
    redirect: {
      name: 'index'
    },
    meta: {
      useNav: false
    }
  },

  {
    path: '/404',
    name: '404',
    title: '页面不存在',
    component: resolve => require(['../views/404/404.vue'], resolve),
    // 元信息
    meta: {
      // 一级路由需要设置， 是否在侧边栏显示
      useNav: false,
      // 当前所属的模块
      module: '404'
    }
  },
  {
    path: '/putIn',
    name: 'putIn',
    title: '猎多多 | 投放',
    component: resolve => require(['../views/activity/putIn/index.vue'], resolve)
  },
  {
    path: '/position24h',
    title: '职位24h',
    component: Layout,
    children: [
      {
        path: '',
        name: 'position24h',
        component: resolve => require(['../views/activity/24position/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/marketOriginality',
    title: '营销创意',
    component: Layout,
    children: [
      {
        path: '',
        name: 'marketOriginality',
        component: resolve => require(['../views/activity/marketOriginality/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/dreamDisco',
    title: '梦想disco',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dreamDisco',
        component: resolve => require(['../views/activity/dreamDisco/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/alliance',
    title: '复工者联盟',
    component: Layout,
    children: [
      {
        path: '',
        name: 'alliance',
        component: resolve => require(['../views/activity/alliance/index.vue'], resolve)
      }
    ]
  }
]
export default other
