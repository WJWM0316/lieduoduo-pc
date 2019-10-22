export const routes = [
	{
    path: '/login',
    name: 'login',
    title: '登陆',
    component: resolve => require(['../views/login/login.vue'], resolve)
  }
]
