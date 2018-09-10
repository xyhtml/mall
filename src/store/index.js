/*
 * @Author: lucm
 * @Date: 2017-06-08 11:06:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-08 15:24:23
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mallStore from './modules/index'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    mallStore
  }
})
