import { getMyResumeApi } from '@/api/resume'
import moment from 'moment'
export default {
  state: {
    myResume: {}, // 我的简历信息
    eidtStatus: false, // 是否是编辑状态
    calculateClick: 0, // 记录点击编辑图标的次数，数值更新触发滚动条滚动
    propClass: '',
    loaded: false,
    isFourResume: {}
  },
  getters: {},
  mutations: {
    // 设置我的简历信息
    setMyResume (state, payload) {
      const { res, status } = payload
      state.myResume = res.data
      state.isFourResume = res.code
      state.loaded = status
    },
    // 设置简历表单状态
    setEditStatus (state, { status, propClass }) {
      if (propClass) {
        state.calculateClick = state.calculateClick + 1
        state.propClass = propClass
      }
      state.eidtStatus = status
    },
    // 覆盖简历信息
    overwriteResume (state, data) {
      // 更新简历日期
      state.myResume.resumeUpdateTime = moment().format('YYYY-MM-DD HH:mm:ss')
      Object.assign(state.myResume, data)
    },
    // 清空简历信息
    removeResume (state) {
      state.myResume = {}
      state.loaded = false
    },
    // 是否请求成功
    setResumeLoaded (state, status) {
      state.loaded = status
    }
  },
  actions: {
    // 获取我的简历详情
    getMyResume ({ commit, state }) {
      // eslint-disable-next-line promise/param-names
      return new Promise((reslove) => {
        if (state.loaded) {
          return reslove(state.myResume)
        }
        getMyResumeApi().then(({ data }) => {
          const res = data || {}
          commit('setMyResume', { res, status: data.httpStatus === 200 })
          reslove(res)
        }).catch(() => {
          commit('setResumeLoaded', false)
        })
      })
    }
  }
}
