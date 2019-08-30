import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import _ from 'lodash'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'; 
import "./assets/theme/index.css";
import 'normalize.css';
// 引入vue实例扩展函数库
import './util'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype._ = _
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
