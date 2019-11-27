<template>
  <div id="company">
    <Search @on-search="(val) => handleSearch(val, 'append')" :height="height" :infos="infos" v-if="infos.industryList.length" />
    <div class="banner">
      <div class="banner-title">精选酷公司</div>
      <Swiper :list="companyLogoLists" v-if="companyLogoLists.length" />
    </div>
    <SearchBank @change="getSearchParams" :infos="infos" v-if="infos.industryList.length" />
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
import SearchBank from './components/searchBank/index.vue'
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
    SearchBank,
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
      hasLogin: state => state.hasLogin
    }),
    ...mapGetters([
      'searchCollect'
    ])
  },
  methods: {
    ...mapActions([
      'getSearchCollectApi'
    ]),
    getLogoListsLists () {
      getLogoListsListsApi().then(res => this.companyLogoLists = res.data.data)
    },
    handleSearch (infos) {
      this.search = infos
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
      // this.getSearchCollectApi()
    }
  },
  created () {
    let { query } = this.$route
    if (query.page) {
      this.page = Number(query.page)
    }
    this.getLogoListsLists()
    this.getCollectList()
    this.getSearchCollectApi()
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
    margin: 0 auto 13px auto;
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
}
</style>
