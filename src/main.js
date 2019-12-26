import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import 'normalize.css'
// 引入vue实例扩展函数库
import './util'
import './eleui'
import './filters'
import './directive/directive'

Vue.config.productionTip = false
Vue.prototype.$cdnPath = process.env.VUE_APP_CDN_PATH

// 兼容toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      var canvas = this
      setTimeout(function () {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
        var len = binStr.length; var arr = new Uint8Array(len)

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i)
        }

        callback(new Blob([arr], { type: type || 'image/png' }))
      })
    }
  })
}
// 兼容requestAnimFrame语法
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
