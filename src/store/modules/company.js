import { getSearchCollect } from 'API/common'
import router from '@/router/index'
const GET_SEARCH_COLLECT = 'GET_SEARCH_COLLECT'
const UPDATE_SEARCH_COLLECT = 'UPDATE_SEARCH_COLLECT'
const UPDATE_SEARCH_COLLECT_MUTIPLE = 'UPDATE_SEARCH_COLLECT_MUTIPLE'
const state = {
  searchCollect: {
    area: [],
    industry: [],
    employee: [],
    financing: []
  }
}
let UrlParams = location.search
    .split('&')
    .map((query) => query.split('='))
    .reduce((params, pairs) => (params[pairs[0]] = pairs[1] || '', params), {})

const mutations = {
  [GET_SEARCH_COLLECT] (state, infos) {
		
    if (UrlParams.cityNums) {
      let cityNumsArr = UrlParams.cityNums.split(',')
      infos.area.map(v => {
        v.checked = false
        if (cityNumsArr.includes(String(v.areaId))) {
          v.checked = true
        }
      })
    } else {
      infos.area.map((v, i) => v.checked = !i ? true : false)
    }
    if (UrlParams.industryIds) {
      let industryIdsArr = UrlParams.industryIds.split(',')
      infos.industry.map(v => {
        v.checked = false
        if (industryIdsArr.includes(String(v.labelId))) {
          v.checked = true
        }
      })
    } else {
      infos.industry.map((v, i) => v.checked = !i ? true : false)
    }
    if (UrlParams.financingIds) {
      let financingIdsArr = UrlParams.financingIds.split(',')
      infos.financing.map(v => {
        v.checked = false
        if (financingIdsArr.includes(String(v.value))) {
          v.checked = true
        }
      })
    } else {
      infos.financing.map((v, i) => v.checked = !i ? true : false)
    }
    if (UrlParams.employeeIds) {
      let employeeIdsArr = UrlParams.employeeIds.split(',')
      infos.employee.map(v => {
        v.checked = false
        if (employeeIdsArr.includes(String(v.value))) {
          v.checked = true
        }
      })
    } else {
      infos.employee.map((v, i) => v.checked = !i ? true : false)
    }
    state.searchCollect = infos
  },
  [UPDATE_SEARCH_COLLECT] (state, params) {
    let { key, item, index } = params
  	let list = state.searchCollect[key].slice()
    switch (key) {
			case 'employee':
			  if (item.value) {
          list[index].checked = !list[index].checked
          if (list[0].checked) {
            list[0].checked = false
          }
          // if(!filterSearchCollect[key].length) {
          //   list[0].checked = true
          // }
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
          // if(!filterSearchCollect[key].length) {
          //   list[0].checked = true
          // }
			  } else {
			  	if (!list[0].checked) {
			  	  list.map((v, i, a) => v.checked = !i ? true : false)
			  	}
			  }
  			break
  		case 'industry':
  		  if (item.labelId) {
			    list[index].checked = !list[index].checked
          if (list[0].checked) {
            list[0].checked = false
          }
          // if(!filterSearchCollect[key].length) {
          //   list[0].checked = true
          // }
			  } else {
			  	if (!list[0].checked) {
			  	  list.map((v, i, a) => v.checked = !i ? true : false)
			  	}
			  }
  			break
  		case 'area':
        list.map((v, i, arr) => v.checked = i === index ? true : false)
  			break
			default:
				break
		}
    state.searchCollect[key] = list
  },
  [UPDATE_SEARCH_COLLECT_MUTIPLE] (state, params) {
    let { arr, key } = params
    let list = state.searchCollect[key].slice()
    switch (key) {
      case 'employee':
        list.map(v => {
          if (arr.includes(v.value)) {
            v.checked = true
          } else {
            v.checked = false
          }
        })
        break
      case 'financing':
        list.map(v => {
          if (arr.includes(v.value)) {
            v.checked = true
          } else {
            v.checked = false
          }
        })
        break
      case 'industry':
        list.map(v => {
          if (arr.includes(v.labelId)) {
            v.checked = true
          } else {
            v.checked = false
          }
        })
        break
      case 'area':
        list.map(v => {
          if (arr.includes(v.areaId)) {
            v.checked = true
          } else {
            v.checked = false
          }
        })
        break
      default:
        break
    }
    state.searchCollect[key] = list
  }
}

const getters = {
  filterSearchCollect: state => {
    let employee = state.searchCollect.employee.filter(v => v.value && v.checked)
    let financing = state.searchCollect.financing.filter(v => v.value && v.checked)
    let industry = state.searchCollect.industry.filter(v => v.labelId && v.checked)
    let area = state.searchCollect.area.filter(v => v.areaId && v.checked)
    return { employee, financing, industry, area }
  }
}

const actions = {
  getSearchCollectApi (store) {
    return getSearchCollect().then(res => {
      store.commit(GET_SEARCH_COLLECT, res.data.data)
      return res
    }).catch(err => {
      console.log(err)
      return Promise.reject(err.data.data || {})
    })
  },
  updateSearchCollectApi (store, params) {
    return new Promise((resolve, reject) => {
      store.commit(UPDATE_SEARCH_COLLECT, params)
      resolve()
    })
  },
  updateSearchCollectMutipleApi (store, params) {
    return new Promise((resolve, reject) => {
      store.commit(UPDATE_SEARCH_COLLECT_MUTIPLE, params)
      resolve()
    })
  }
}

export default { state, mutations, getters, actions }
