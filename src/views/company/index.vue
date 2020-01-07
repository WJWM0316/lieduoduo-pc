<template>
  <div id="company">
    <Search @on-search="handleSearch" @on-reset="reset" :height="height" />
    <div class="banner">
      <div class="banner-title">精选酷公司</div>
      <Swiper :list="companyLogoLists" v-if="companyLogoLists.length" />
    </div>
    <div class="bank-type-box" v-if="searchCollect && searchCollect.area.length">
      <div class="bank-type">
        <div class="type-item">
          <div class="type-filter">公司地点：</div>
          <div class="type-ul">
            <span
              v-for="(area, areaIndex) in searchCollect.area"
              :key="areaIndex"
              class="type-li"
              :class="{active: area.checked}"
              @click="onClick(area, areaIndex, 'area')">
              {{area.name}}
            </span>
          </div>
        </div>
        <div class="type-item">
          <div class="type-filter">融资规模：</div>
          <div class="type-ul">
            <span
              v-for="(finance, financeIndex) in searchCollect.financing"
              :key="financeIndex"
              class="type-li"
              :class="{active: finance.checked}"
              @click="onClick(finance, financeIndex, 'financing')">
              {{finance.text}}
            </span>
          </div>
        </div>
        <div class="type-item">
          <div class="type-filter">人员规模：</div>
          <div class="type-ul">
            <span
              v-for="(employee, employeeIndex) in searchCollect.employee"
              :key="employeeIndex"
              class="type-li"
              :class="{active: employee.checked}"
              @click="onClick(employee, employeeIndex, 'employee')">
              {{employee.text}}
            </span>
          </div>
        </div>
        <div class="type-item">
          <div class="type-filter">行业领域：</div>
          <div class="type-ul">
            <span
              v-for="(industry, industryIndex) in searchCollect.industry"
              :key="industryIndex"
              class="type-li"
              :class="{active: industry.checked}"
              @click="onClick(industry, industryIndex, 'industry')">
              {{industry.name}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="search-lists" ref="search-lists">
      <template v-for="(item, index) in companyLists">
        <company-card :item="item"  :key="index"/>
      </template>
    </div>
    <div class="pagination-company" v-if="total > pagesize">
      <el-pagination
        background
        @current-change="changePage"
        :current-page.sync ="page"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <div v-if="!total && isNoFound"><no-found :max-width="332" :tipText="'没有符合筛选条件的公司，放宽筛选条件试试？'"/></div>
    <loginPop ref="loginPop"></loginPop>
  </div>
</template>
<script>
import Swiper from './components/swiper/index.vue'
import CompanyCard from 'COMPONENTS/common/company'
import Search from './components/searchBar/index.vue'
import NoFound from 'COMPONENTS/noFound'
import { getLogoListsListsApi } from 'API/company'
import { getCompanyListsApi } from 'API/search'
// import { getSearchCollect } from 'API/common'
import loginPop from '@/components/common/loginPop'

export default {
  components: {
    Swiper,
    CompanyCard,
    Search,
    NoFound,
    loginPop
  },
  data () {
    return {
      companyLogoLists: [],
      companyLists: [],
      page: 1,
      pagesize: 20,
      total: 0,
      height: 0,
      isNoFound: false
    }
  },
  computed: {
    ...mapState({
      searchCollect: state => state.company.searchCollect
    }),
    ...mapGetters([
      'filterSearchCollect'
    ]),
    isLogin () {
      return !!this.$store.state.userInfo.id
    }
  },
  methods: {
    ...mapActions([
      'getSearchCollectApi',
      'updateSearchCollectApi',
      'updateSearchCollectMutipleApi',
      'resetSearchCollectMutipleApi'
    ]),
    getLogoListsLists () {
      getLogoListsListsApi({ count: 24 }).then(({ data }) => (this.companyLogoLists = data.data))
    },
    handleSearch () {
      this.page = 1
      this.getLists()
    },
    getLists () {
      if (this.firstloaded) this.handleScrollToView()
      this.firstloaded = true
      let cityNums = this.filterSearchCollect.area.map(v => v.areaId).join(',')
      let industryIds = this.filterSearchCollect.industry.map(v => v.labelId).join(',')
      let employeeIds = this.filterSearchCollect.employee.map(v => v.value).join(',')
      let financingIds = this.filterSearchCollect.financing.map(v => v.value).join(',')
      let query = { page: this.page, q: Date.now() }
      if (cityNums) {
        query = Object.assign(query, { cityNums })
      }
      if (industryIds) {
        query = Object.assign(query, { industryIds })
      }
      if (employeeIds) {
        query = Object.assign(query, { employeeIds })
      }
      if (financingIds) {
        query = Object.assign(query, { financingIds })
      }
      getCompanyListsApi({ ...query, count: 20 }).then(({ data }) => {
        this.$router.push({ query })
        this.companyLists = data.data
        this.total = (this.pagesize * 10) < data.meta.total ? this.pagesize * 10 : data.meta.total
        this.isNoFound = true
      })
    },
    changePage (page) {
      let query = this.$route
      if (this.isLogin) {
        this.page = page
        this.getLists()
      } else {
        this.$refs.loginPop.showLoginPop = true
        this.page = query.page || 1
      }
    },
    // 滚动到可视区域
    handleScrollToView () {
      const dom = document.querySelector('.bank-type-box')
      this.$util.scrollToView(dom)
    },
    reset () {
      this.resetSearchCollectMutipleApi().then(() => {
        this.page = 1
        this.getLists()
      })
    },
    onClick (item, index, key) {
      this.page = 1
      this.updateSearchCollectApi({ item, index, key }).then(() => this.getLists())
    }
  },
  created () {
    let { query } = this.$route
    if (query.page) {
      this.page = Number(query.page)
    }
    this.getLogoListsLists()
    this.getSearchCollectApi().then(() => this.getLists())
  },
  mounted () {
    this.$nextTick(function () {
      this.height = this.$refs['search-lists'].offsetTop + 180
    })
  },
  destroyed () {
    for (let key in this.searchCollect) {
      this.updateSearchCollectMutipleApi({ arr: [], key })
    }
    // this.$store.commit('GET_SEARCH_COLLECT', {
    //   area: [],
    //   industry: [],
    //   employee: [],
    //   financing: []
    // })
  }
}
</script>
<style lang="scss" scoped>
#company{
  .pagination-company{
    background: transparent;
    text-align: center;
    padding-bottom: 60px;
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
    margin: 0 auto 37px auto;
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
