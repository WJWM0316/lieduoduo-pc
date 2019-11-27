import { getSearchCollect } from 'API/common'

const GET_SEARCH_COLLECT = 'GET_SEARCH_COLLECT'
const UPDATE_SEARCH_COLLECT = 'UPDATE_SEARCH_COLLECT'
const UrlParams = new URLSearchParams(window.location.search)

const state = {
  searchCollect: {
    area: [],
    industry: [],
    employee: [],
    financing: []
  }
}

const mutations = {
  [GET_SEARCH_COLLECT] (state, infos) {
    if (UrlParams.get('cityNums')) {
      let cityNumsArr = UrlParams.get('cityNums').split(',')
      infos.area.map(v => {
        v.checked = false
        if (cityNumsArr.includes(String(v.areaId))) {
          v.checked = true
        }
      })
    }
    if (UrlParams.get('industryIds')) {
      let industryIdsArr = UrlParams.get('industryIds').split(',')
      infos.industry.map(v => {
        v.checked = false
        if (industryIdsArr.includes(String(v.labelId))) {
          v.checked = true
        }
      })
    }
    if (UrlParams.get('financingIds')) {
      let financingIdsArr = UrlParams.get('financingIds').split(',')
      infos.financing.map(v => {
        v.checked = false
        if (financingIdsArr.includes(String(v.value))) {
          v.checked = true
        }
      })
    }
    if (UrlParams.get('employeeIds')) {
      let employeeIdsArr = UrlParams.get('employeeIds').split(',')
      infos.employee.map(v => {
        v.checked = false
        if (employeeIdsArr.includes(String(v.value))) {
          v.checked = true
        }
      })
    }
    state.searchCollect = infos
  },
  [UPDATE_SEARCH_COLLECT] (state, params) {
    let { key, item, index } = params
  	let list = state.searchCollect[key]
    switch (key) {
			case 'employee':
			  if (item.value) {
          list[index].checked = !list[index].checked
          if (list[0].checked) {
            list[0].checked = false
          }
			  } else {
			  	if (!list[0].checked) {
			  	  list.map((v, i, a) => v.checked = !i ? true : false)
			  	}
			  }
  			break
  		case 'financing':
  		  if (item.value) {
			    list[index].checked = !list[index].checked
          if (list[0].checked) {
            list[0].checked = false
          }
			  } else {
			  	if (!list[0].checked) {
			  	  list.map((v, i, a) => v.checked = !i ? true : false)
			  	}
			  }
  			break
  		case 'industry':
  		  if (params.item.labelId) {
			    list[index].checked = !list[index].checked
          if (list[0].checked) {
            list[0].checked = false
          }
			  } else {
			  	if (!list[0].checked) {
			  	  list.map((v, i, a) => v.checked = !i ? true : false)
			  	}
			  }
  			break
  		case 'area':
        list[index].checked = !list[index].checked
  			break
			default:
				break
		}
  }
}

const getters = {
  filterSearchCollect: state => {
    let data = {}
    Object.keys(state.searchCollect).forEach(key => {
      data[key] = state.searchCollect[key].filter(v => v.checked)
    })
    return data
  }
}

const actions = {
  getSearchCollectApi (store) {
    return getSearchCollect().then(res => {
      store.commit(GET_SEARCH_COLLECT, res.data.data)
      return res
    }).catch(err => {
      return Promise.reject(err.data.data || {})
    })
  },
  updateSearchCollect (store, params) {
    store.commit(UPDATE_SEARCH_COLLECT, params)
  }
}

export default { state, mutations, getters, actions }
