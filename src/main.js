// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible'
//
import { Toast } from 'vant'
Vue.use(Toast)
Vue.config.productionTip = false

// 设置title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  Toast.clear()
  if (to.path === '/mallClassIfyList' && from.path === '/mallClassIfy') {
    localStorage.setItem('keep', true)
    next()
  } else {
    localStorage.setItem('keep', false)
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
