import { getMyResumeApi } from '@/api/resume'
export default {
  state: {
    myResume: {} // 我的简历信息
  },
  getters: {},
  mutations: {
    // 设置我的简历信息
    setMyResume (state, data) {
      state.myResume = data
    },
    // 覆盖简历信息
    overwriteResume (state, data) {
      Object.assign(state.myResume, data)
    }
  },
  actions: {
    // 获取我的简历详情
    getMyResume (store) {
      // eslint-disable-next-line promise/param-names
      return new Promise((reslove) => {
        getMyResumeApi().then(({ data }) => {
          const res = data.data || {}
          store.commit('setMyResume', res)
          reslove(res)
        })
      })
    }
  }
}
