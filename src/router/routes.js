// export const routes = [
//   {
//     path: '/',
//     // 默认进入控制台
//     redirect: {
//       name: 'teacherList'
//     },
//     meta: {
//       useNav: false
//     }
//   },
//   // 申请列表
//   {
//     path: '/teachers',
//     name: 'teachers',
//     title: '申请列表',
//     // 直接跳转列表页
//     redirect: {
//       name: 'teacherList'
//     },
//     component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/teachers/index.vue'),
//     // 元信息
//     meta: {
//       // 一级路由需要设置， 是否在侧边栏显示
//       useNav: true,
//       // 当前所属的模块
//       module: 'teachers'
//     }
//   },
//   // 导师库列表页
//   {
//     path: '/teacher-list',
//     name: 'teacherList',
//     component: () => import(/* webpackChunkName: "courseList" */ '@/pages/teachers/index/index.vue'),
//     meta: {
//       module: 'teachers',
//       useNav: false
//     }
//   },
//   // 导师库
//   {
//     path: '/teacherResource-list',
//     name: 'teacherResourceList',
//     title: '导师库',
    
//     component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/teacherResource/index/index.vue'),
//     // 元信息
//     meta: {
//       // 一级路由需要设置， 是否在侧边栏显示
//       useNav: true,
//       // 当前所属的模块
//       module: 'teacherResource'
//     }
//   },
//   // 导师详情
//   {
//     path: '/teacherDetail',
//     name: 'teacherDetail',
//     title: '导师详情',
//     component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/teacherResource/detail/index.vue'),
//     // 元信息
//     meta: {
//       // 一级路由需要设置， 是否在侧边栏显示
//       useNav: false,
//       // 当前所属的模块
//       module: 'teacherResource'
//     }
//   },
//   // 导师编辑
//   {
//     path: '/editteacher',
//     name: 'editteacher',
//     title: '导师编辑',
//     component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/teacherResource/post/index.vue'),
//     // 元信息
//     meta: {
//       // 一级路由需要设置， 是否在侧边栏显示
//       useNav: false,
//       // 当前所属的模块
//       module: 'teacherResource'
//     }
//   },
//   // 登陆模块
//   {
//     path: '/login',
//     name: 'login',
//     title: '登陆',
//     component: () => import(/* webpackChunkName: "login" */ '@/pages/auth/login.vue'),
//     meta: {
//       useNav: false
//     }
//   },
//   {
//     path: '*',
//     name: 'login',
//     title: '登陆',
//     component: () => import(/* webpackChunkName: "login" */ '@/pages/auth/login.vue'),
//     meta: {
//       useNav: false
//     }
//   },
// ]
