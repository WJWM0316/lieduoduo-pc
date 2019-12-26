import { recruiterDetail } from '@/api/common'
// 招聘官信息
const state = {
  recruit: {},
  loaded: false
}

const mutations = {
  setRecruit (state, payload) {
    state.info = payload
  },
  // 是否请求成功
  setLoaded (state, status) {
    state.loaded = status
  }
}

const getters = {
}

const actions = {
  // 获取招聘官详情
  getMyResume (store) {
    // eslint-disable-next-line promise/param-names
    return new Promise((reslove) => {
      recruiterDetail().then(({ data }) => {
        const res = data || {}
        store.commit('setRecruit', res)
        store.commit('setLoaded', data.httpStatus === 200)
        reslove(res)
      }).catch(() => {
        store.commit('setLoaded', false)
      })
    })
  }
}

export default { state, mutations, getters, actions }
