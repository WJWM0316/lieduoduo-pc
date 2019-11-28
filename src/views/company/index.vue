<template>
  <div id="company">
    <Search @on-search="(val) => handleSearch(val, 'append')" @on-reset="reset" :height="height" :infos="infos" v-if="infos.industryList.length" />
    <div class="banner">
      <div class="banner-title">精选酷公司</div>
      <Swiper :list="companyLogoLists" v-if="companyLogoLists.length" />
    </div>
    <div class="bank-type-box">
      <div class="bank-type">
        <div class="type-item">
          <div class="type-filter">公司地点：</div>
          <div class="type-ul">
            <span v-for="(area, areaIndex) in infos.areaList" :key="areaIndex" class="type-li" :class="{active: area.checked}" @click="onClick(area, areaIndex, 'areaList')">{{area.name}}</span>
          </div>
        </div>
        <div class="type-item">
          <div class="type-filter">融资规模：</div>
          <div class="type-ul">
            <span v-for="(finance, financeIndex) in infos.financingList" :key="financeIndex" class="type-li" :class="{active: finance.checked}" @click="onClick(finance, financeIndex, 'financingList')">{{finance.text}}</span>
          </div>
        </div>
        <div class="type-item">
          <div class="type-filter">人员规模：</div>
          <div class="type-ul">
            <span v-for="(employee, employeeIndex) in infos.employeeList" :key="employeeIndex" class="type-li" :class="{active: employee.checked}" @click="onClick(employee, employeeIndex, 'employeeList')">{{employee.text}}</span>
          </div>
        </div>
        <div class="type-item">
          <div class="type-filter">行业领域：</div>
          <div class="type-ul">
            <span v-for="(industry, industryIndex) in infos.industryList" :key="industryIndex" class="type-li" :class="{active: industry.checked}" @click="onClick(industry, industryIndex, 'industryList')">{{industry.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="search-lists" ref="search-lists">
      <template v-for="item in companyLists">
        <company-card :item="item"  :key="item.id"/>
      </template>
    </div>
    <div class="pagination" v-if="total > 20">
      <el-pagination
        background
        @current-change="(val) => changePage(val, 'page')"
        :current-page.sync ="page"
        :page-size="20"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <div v-if="!total"><no-found :max-width="300"/></div>
    <!-- <guideLogin></guideLogin> -->
  </div>
</template>
<script>
import Swiper from './components/swiper/index.vue'
import CompanyCard from 'COMPONENTS/common/companyCard'
import Search from './components/searchBar/index.vue'
import NoFound from 'COMPONENTS/noFound'
import { getLogoListsListsApi } from 'API/company'
import { getCompanyListsApi } from 'API/search'
import { getSearchCollect } from 'API/common'
import { mapGetters, mapActions, mapState } from 'vuex'
import guideLogin from '@/components/common/guideLogin'

export default {
  components: {
    Swiper,
    CompanyCard,
    Search,
    NoFound,
    guideLogin
  },
  data () {
    return {
      companyLogoLists: [],
      companyLists: [],
      page: 1,
      total: 0,
      height: 0,
      search: {
        areaList: [],
        industryList: [],
        employeeList: [],
        financingList: []
      },
      infos: {
        areaList: [],
        industryList: [],
        employeeList: [],
        financingList: []
      }
    }
  },
  computed: {
    ...mapState({
      searchCollect: state => state.company.searchCollect
    })
  },
  methods: {
    ...mapActions([
      'getSearchCollectApi'
    ]),
    getLogoListsLists () {
      getLogoListsListsApi().then(res => this.companyLogoLists = res.data.data)
    },
    handleSearch (search) {
      this.search = search
      this.getLists()
    },
    getLists () {
      let search = {
        cityNums: this.search.areaList.map(v => v.areaId).join(','),
        industryIds: this.search.industryList.map(v => v.labelId).join(','),
        employeeIds: this.search.employeeList.map(v => v.value).join(','),
        financingIds: this.search.financingList.map(v => v.value).join(',')
      }
      let query = Object.assign({page: this.page, count: 20}, search)
      if (!query.cityNums) {
        delete query.cityNums
      }
      if (!query.industryIds) {
        delete query.industryIds
      }
      if (!query.employeeIds) {
        delete query.employeeIds
      }
      if (!query.financingIds) {
        delete query.financingIds
      }
      getCompanyListsApi(query).then(({data}) => {
        this.companyLists = data.data
        this.total = data.meta.total
        this.page = Number(data.meta.currentPage)
        delete query.count
        this.$router.push({ query })
      })
    },
    getSearchParams (params) {
      this.search = params
      this.page = 1
      this.getLists()
    },
    getCollectList () {
      getSearchCollect().then(({ data }) => {
        const { query } = this.$route
        const { employee, financing, industry, area } = data.data
        this.search.areaList = []
        this.search.industryList = []
        this.search.employeeList = []
        this.search.financingList = []

        if (query.cityNums) {
          let cityNumsArr = query.cityNums.split(',')
          area.map((v, i, arr) => {
            v.checked = false
            if (cityNumsArr.includes(String(v.areaId))) {
              v.checked = true
              this.search.areaList.push(v)
            }
          })
        }

        if (query.industryIds) {
          let industryIdsArr = query.industryIds.split(',')
          industry.map((v, i, arr) => {
            v.checked = false
            if (industryIdsArr.includes(String(v.labelId))) {
              v.checked = true
              this.search.industryList.push(v)
            }
          })
        }
        
        if (query.financingIds) {
          let financingIdsArr = query.financingIds.split(',')
          financing.map((v, i, arr) => {
            v.checked = false
            if (financingIdsArr.includes(String(v.value))) {
              v.checked = true
              this.search.financingList.push(v)
            }
          })
        }

        if (query.employeeIds) {
          let employeeIdsArr = query.employeeIds.split(',')
          employee.map((v, i, arr) => {
            v.checked = false
            if (employeeIdsArr.includes(String(v.value))) {
              v.checked = true
              this.search.employeeList.push(v)
            }
          })
        }

        this.infos.employeeList = employee
        this.infos.financingList = financing
        this.infos.industryList = industry
        this.infos.areaList = area
        this.getLists()
      })
    },
    changePage (page) {
      this.page = page
      this.getLists()
    },
    reset () {
      this.search = {
        areaList: [],
        industryList: [],
        employeeList: [],
        financingList: []
      }
      this.page = 1
      for (let item in this.infos) {
        this.infos[item].map(v => v.checked = false)
      }
      this.getLists()
    },
    onClick (item, index, key) {
      const list = this.infos[key].slice()
      switch (key) {
        case 'employeeList':
          if (item.value) {
            list.map((v,i,arr) => {
              if (i === index) {
                v.checked = !v.checked
                this.search[key] = arr.filter(v => v.checked)
              }
              if (i === 0) {
                v.checked = false
              }
            })
          } else {
            if (!list[0].checked) {
              list.map((v, i, a) => v.checked = !i ? true : false)
              this.search[key] = []
            }
          }
          break
        case 'financingList':
          if (item.value) {
            list.map((v,i,arr) => {
              if (i === index) {
                v.checked = !v.checked
                this.search[key] = arr.filter(v => v.checked)
              }
              if (i === 0) {
                v.checked = false
              }
            })
          } else {
            if (!list[0].checked) {
              list.map((v, i, a) => v.checked = !i ? true : false)
              this.search[key] = []
            }
          }
          break
        case 'industryList':
          if (item.labelId) {
            list.map((v,i,arr) => {
              if (i === index) {
                v.checked = !v.checked
                this.search[key] = arr.filter(v => v.checked)
              }
              if (i === 0) {
                v.checked = false
              }
            })
          } else {
            if (!list[0].checked) {
              list.map((v, i, a) => v.checked = !i ? true : false)
              this.search[key] = []
            }
          }
          break
        case 'areaList':
          list.map((v,i,arr) => {
            v.checked = false
            if (i === index) {
              v.checked = !v.checked
              if (v.areaId) {
                this.search[key] = [v]
              } else {
                this.search[key] = []
              }
            }
          })
          break
        default:
          break
      }
      this.infos[key] = list
      this.getLists()
    }
  },
  created () {
    let { query } = this.$route
    if (query.page) {
      this.page = Number(query.page)
    }
    this.getLogoListsLists()
    this.getCollectList()
    // this.getSearchCollectApi().then(() => {
    //   console.log(this.searchCollect, 'hhhh')
    // })
  },
  mounted () {
    this.$nextTick(function () {
      this.height = this.$refs['search-lists'].offsetTop + 180
    })
  }
}
</script>
<style lang="scss" scoped>
#company{
  .pagination{
    background: transparent;
  }
  .banner {
    height:376px;
    background: $bg-color-4;
    overflow: hidden;
    text-align: center;
    .banner-title{
      height: 38px;
      font-size: 36px;
      font-weight: 300;
      color: white;
      line-height: 38px;
      text-align: center;
      padding: 50px 0 36px 0;
    }
  }
  .search-lists {
    width: 1200px;
    margin: 0 auto 12px auto;
    @include flex-v-center;
    flex-wrap: wrap;
    & /deep/ {
      .company-list-wrapper{
        margin-right: 13px;
      }
      .company-list-wrapper:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  .bank-type-box{
    background: white;
    padding-top: 30px;
    background: white;
    margin-bottom: 30px;
    padding-bottom: 16px;
    .bank-type{
      width: 1200px;
      margin: 0 auto;
    }
    .type-filter{
      height:20px;
      font-size:14px;
      font-weight:400;
      color:$font-color-3;
      line-height:20px;
      margin-right: 16px;
      display: inline-block;
      flex: 0 0 70px;
      align-self: stretch;
      position: relative;
      text-align: left;
    }
    .type-li {
      display: inline-block;
      margin-right: 30px;
      font-size:14px;
      font-weight:400;
      color:$font-color-6;
      line-height:20px;
      margin-bottom: 14px;
      cursor: pointer;
      &:hover {
        font-weight:500;
        color:$main-color-1;
      }
    }
    .active{
      font-weight:500;
      color:$main-color-1;
    }
    .type-item {
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
}
</style>
