import { getSearchCollect } from 'API/common'

const GET_SEARCH_COLLECT = 'GET_SEARCH_COLLECT'

const state = {
  searchCollect: {
    employeeList: [],
    financingList: [],
    industryList: [],
    areaList: [],
    show: false
  }
}

const mutations = {
  [GET_SEARCH_COLLECT](state, data) {
    state.searchCollect = Object.assign(data, {show: true})
  }
}

const getters = {
  searchCollect: searchCollect => state.searchCollect
}

const actions = {
  getSearchCollectApi(store, options) {
    return getSearchCollect()
      .then(res => {
        store.commit(GET_SEARCH_COLLECT, res.data.data)
        return res
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
