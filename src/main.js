import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
// import _ from 'lodash'
import 'normalize.css'
// 引入vue实例扩展函数库
import './util'
import './eleui'
import './filters'
Vue.config.productionTip = false
Vue.prototype.$cdnPath = process.env.VUE_APP_CDN_PATH
// Vue.prototype._ = _
// 兼容
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }
})()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
