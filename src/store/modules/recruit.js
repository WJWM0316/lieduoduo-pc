import { recruiterDetail } from '@/api/common'
// 招聘官信息
// 页面初始化的异步请求如果需要用到招聘官信息的数据，需要用watch监听recruitDataLoaded, 异步请求设置一个计时器建议 50ms
const state = {
  info: {},
  loaded: false
}

const mutations = {
  setRecruit (state, payload) {
    const { info, status } = payload
    state.info = info
    state.loaded = status
  },
  // 是否请求成功
  setLoaded (state, status) {
    state.loaded = status
  }
}

const getters = {
  recruitDataCompanyId: state => state.info.currentCompanyId,
  recruitDataLoaded: state => state.loaded,
  recruiterIsAdmin: state => state.info.isCompanyAdmin
}

const actions = {
  // 获取招聘官详情
  getMyRecruit (store) {
    // eslint-disable-next-line promise/param-names
    return new Promise((reslove) => {
      recruiterDetail().then(({ data }) => {
        const res = data.data || {}
        store.commit('setRecruit', { info: res, status: data.httpStatus === 200 })
        reslove(res)
      }).catch(() => {
        store.commit('setLoaded', false)
      })
    })
  }
}

export default { state, mutations, getters, actions }
