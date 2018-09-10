'use strict'
let url = 'http://api.zyk.artreedu.com/v1/'
import axios from 'axios'
const state = {

}
const getters = {}
const mutations = {
}
const actions = {
  // 分类
  getClassIfy({
    commit
  }, payload) {
    let _param = {
    }
    return new Promise((resolve, reject) => {
      // GET
      axios
        .get(url + 'categories', {
          params: _param
        })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // 列表
  getList({
    commit
  }, payload) {
    let _param = {
      categoryId: payload.categoryId, // 分类ID
      name: payload.name, // 作品名称
      page: payload.page, // 页码,默认0
      size: payload.size, // 页面大小,默认20
      tagIds: payload.tagIds // 标签ID
    }
    return new Promise((resolve, reject) => {
      // GET
      axios
        .get(url + 'artworks', {
          params: _param
        })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // 详情
  getListDet({
    commit
  }, payload) {
    let _param = {
      path: payload.path // 作品id
    }
    return new Promise((resolve, reject) => {
      // GET
      axios
        .get(url + 'artworks/' + _param.path)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
