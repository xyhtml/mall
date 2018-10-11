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
  // 进入对应页面做组件缓存
  if (from.name === 'MallClassifyList') {
    localStorage.setItem('keepAlive', 'yes')
  } else {
    localStorage.setItem('keepAlive', 'no')
  }
  if (to.path === '/mallClassIfyList' && from.path === '/mallClassIfy') {
    localStorage.setItem('keep', true)
    next()
  } else {
    localStorage.setItem('keep', false)
    if (to.path === '/mallClassIfy' && from.path === '/') {
      localStorage.setItem('classScroll', 0)
    }
    next()
  }
  next()
  console.log(localStorage.getItem('keepAlive'))
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
