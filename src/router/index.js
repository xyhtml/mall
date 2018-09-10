import Vue from 'vue'
import Router from 'vue-router'
import MallIndex from '@/components/mallIndex'
import MallClassify from '@/components/mallClassify'
import MallClassifyList from '@/components/mallClassifyList'
import MallDetills from '@/components/mallDetills'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MallIndex',
      component: MallIndex,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/mallClassify',
      name: 'MallClassify',
      component: MallClassify,
      meta: {
        title: '分类'
      }
    },
    {
      path: '/mallClassifyList',
      name: 'MallClassifyList',
      component: MallClassifyList,
      meta: {
        title: '分类列表',
        keepAlive: true
      }
    },
    {
      path: '/mallDetills',
      name: 'MallDetills',
      component: MallDetills,
      meta: {
        title: '详情页'
      }
    }
  ]
})
