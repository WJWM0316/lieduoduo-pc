<template>
  <div class="position-wrapper">
    <search @on-search="(val) => handleSearch(val, 'append')" :type-name.sync="currentType" />
    <div class="main-center">
      <div class="lists-wrapper" v-loading="getLoading">
        <template v-if="currentType === 'position'">
          <no-found v-if="!getLoading && !listData.length" tip-text="没有符合筛选条件的职位，放宽筛选条件试试？" :max-width="400"></no-found>
          <div class="position-lists" v-else>
            <template v-for="item in listData">
              <position-item :key="item.id" :item="item" />
            </template>
          </div>
        </template>
        <template v-else>
          <no-found v-if="!getLoading && !companyListData.length" tip-text="没有符合筛选条件的公司，放宽筛选条件试试？" :max-width="400"></no-found>
          <div class="position-lists" v-else>
            <template v-for="item in companyListData">
              <company-item :key="item.id" :item="item" />
            </template>
          </div>
        </template>
        <div class="pagination" v-if="total > 0 && total > params.count">
          <el-pagination
            background
            @current-change="(val) => handleSearch(val, 'page')"
            :current-page.sync ="params.page"
            :page-size="params.count"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div>
        <guide-login class="guide-login" v-if="!isLogin" ref="guideLogin"></guide-login>
        <adpostion position="searchResult"></adpostion>
      </div>
    </div>
    <scroll-to-top ref="scrollToTop"></scroll-to-top>
  </div>
</template>
<script>
import ScrollToTop from 'COMPONENTS/scrollToTop'
import Search from './components/search'
import { getPositionSearch, getPositionSearchType, getRecommendPosition } from 'API/position'
import { getSearchCompanys } from 'API/company'
import NoFound from 'COMPONENTS/noFound'
import adpostion from 'COMPONENTS/common/adpostion'
import GuideLogin from 'COMPONENTS/common/guideLogin'
import PositionItem from 'COMPONENTS/common/positionItem'
import CompanyItem from 'COMPONENTS/common/company/item'
export default {
  components: {
    Search,
    ScrollToTop,
    GuideLogin,
    NoFound,
    adpostion,
    PositionItem,
    CompanyItem
  },
  data () {
    return {
      params: {
        page: 1,
        count: 15,
        keyword: '',
        cityNums: 0
      },
      listData: [], // 职位列表数据
      companyListData: [],
      currentType: 'position', // 公司列表数据
      total: 0, // 职位总数
      getLoading: true,
      isGetSearchType: false,
      recommended: 0,
      bannerList: []
    }
  },
  created () {
    const { query } = this.$route
    for (let item in this.params) {
      if (query[item]) this.params[item] = isNaN(query[item]) ? query[item] : Number(query[item])
    }
    this.params.cityNums = query['cityNums'] || this.cityid
  },
  mounted () {
    if (this.currentType === 'position') {
      this.getPositionList()
    } else {
      this.getCompanysList()
    }
  },
  computed: {
    cityid () {
      return this.$store.state.cityId || 0
    },
    isLogin () {
      return !!this.$store.state.userInfo.id
    }
  },
  methods: {
    // 获取职位列表
    getPositionList () {
      this.getLoading = true
      if (!this.isGetSearchType) {
        this.getSearchType()
        return
      }
      let apiMethod = getPositionSearch
      if (this.recommended) {
        apiMethod = getRecommendPosition
        // 判断筛选条件
        let search = ['cityNums', 'keyword', 'financingIds', 'employeeIds', 'industryIds']
        for (let item of search) {
          if (this.params[item]) {
            apiMethod = getPositionSearch
            break
          }
        }
      }
      apiMethod(this.params).then(({ data }) => {
        this.getLoading = false
        const listData = data.data || []
        this.listData = listData.filter(val => val.id)
        this.total = data.meta.total
        if (this.$refs.scrollToTop) this.$refs.scrollToTop.toTop()
      })
    },
    getCompanysList () {
      this.getLoading = true
      if (!this.isGetSearchType) {
        this.getSearchType()
        return
      }
      getSearchCompanys(this.params).then(({ data }) => {
        this.getLoading = false
        this.companyListData = data.data || []
        this.total = data.meta.total
        if (this.$refs.scrollToTop) this.$refs.scrollToTop.toTop()
      })
    },
    handleSearch (value, type) {
      if (type !== 'page') this.params.page = 1
      if (type === 'page' && !this.isLogin) {
        this.params.page = 1
        this.$refs.guideLogin.openPop()
        return
      }
      if (type === 'append') {
        this.params = {
          ...this.params,
          ...value
        }
      } else {
        if (value) this.params[type] = value
      }
      this.$router.replace({
        path: '/position',
        query: {
          ...this.params,
          typeName: this.currentType,
          q: Date.now()
        }
      })
      this.total = 0
      if (this.currentType === 'position') {
        this.getPositionList()
      } else {
        this.getCompanysList()
      }
    },
    getSearchType () {
      getPositionSearchType().then(({ data }) => {
        if (data.httpStatus === 200) {
          this.isGetSearchType = true
          this.recommended = data.data.recommended
          // 如果还在获取列表状态中
          if (this.getLoading) {
            if (this.currentType === 'position') {
              this.getPositionList()
            } else {
              this.getCompanysList()
            }
          }
        }
      }).catch(() => {
        this.isGetSearchType = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-center {
  padding-top: 24px;
  padding-bottom: 40px;
  display: flex;
}
.lists-wrapper {
  margin-right: 20px;
  min-height: 580px;
  min-width: 882px;
  & /deep/ .el-loading-mask {
    z-index: 97;
  }
}

.guide-login {
  margin-bottom: 20px;
}
.position-lists {
  box-shadow: $shadow-1;
}

.pagination {
  background: transparent;
  padding: 30px 0;
  text-align: center;
}
</style>
