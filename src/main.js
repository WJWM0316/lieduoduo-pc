import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import _ from 'lodash'
import 'normalize.css';
// 引入vue实例扩展函数库
import './util'
import './eleui'

Vue.config.productionTip = false
Vue.prototype.$cdnPath = process.env.VUE_APP_CDN_PATH
Vue.prototype._ = _
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
