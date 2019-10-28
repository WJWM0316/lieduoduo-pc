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
  }
]
export default other
