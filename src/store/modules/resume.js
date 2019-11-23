import { getMyResumeApi } from '@/api/resume'
import moment from 'moment'
export default {
  state: {
    myResume: {}, // 我的简历信息
    eidtStatus: false // 是否是编辑状态
  },
  getters: {},
  mutations: {
    // 设置我的简历信息
    setMyResume (state, data) {
      state.myResume = data
    },
    // 设置简历表单状态
    setEditStatus (state, status) {
      state.eidtStatus = status
    },
    // 覆盖简历信息
    overwriteResume (state, data) {
      // 更新简历日期
      state.myResume.resumeUpdateTime = moment().format('YYYY-MM-DD h:mm:ss')
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
