<template>
  <div class="position-wrapper">
    <search @on-search="(val) => handleSearch(val, 'append')" />
    <div class="main-center">
      <div class="lists-wrapper" v-loading="getLoading">
        <no-found v-if="!getLoading && !listData.length" :max-width="400"></no-found>
        <div class="position-lists" v-else>
          <router-link
            target="_blank"
            :to="`/position/details?positionId=${item.id}`"
            class="position-list"
            v-for="item in listData" :key="item.id">
            <div class="position-info">
              <p>
                <!-- 急聘 -->
                <span class="position-active" v-if="item.isUrgency === 1"></span>
                <span class="position-name">{{item.positionName}}</span>
                <!-- 24反馈 -->
                <span class="position-24hour" v-if="item.isRapidly === 1"></span>
                <span class="position-pay">{{item.emolumentMin}}-{{item.emolumentMax}}K <template v-if="item.annualSalary > 12">· {{item.annualSalaryDesc}}</template></span>
              </p>
              <p class="position-require">
                <span><i class="iconfont icon-dizhi"></i>{{item.city}}{{item.district}}</span>
                <span><i class="iconfont icon-zhiwei"></i>{{item.workExperienceName}}</span>
                <span><i class="iconfont icon-jiaoyu"></i>{{item.educationName}}</span>
              </p>
            </div>
            <div class="company-info">
              <p class="company-name">{{item.companyInfo.companyShortname}}</p>
              <p class="company-details"><span>{{item.companyInfo.financingInfo}}</span>|<span>{{item.companyInfo.employeesInfo}}</span>|<span>{{item.companyInfo.industry}}</span></p>
            </div>
            <div class="recruiter-info">
              <div class="recruiter-base-info">
                <span class="recruiter-profile"><img :src="item.recruiterInfo.avatar.smallUrl" alt=""></span>
                <span class="recruiter-name">{{item.recruiterInfo.name}}</span>|<span class="recruiter-position">{{item.recruiterInfo.position}}</span>
                <p class="">{{item.numOfVisitors}}人已看过</p>
              </div>
              <div class="contact-recruiter">
                <el-button type="primary" size="small">开约</el-button>
              </div>
            </div>
          </router-link>
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
import NoFound from 'COMPONENTS/noFound'
import adpostion from 'COMPONENTS/common/adpostion'
import GuideLogin from 'COMPONENTS/common/guideLogin'
export default {
  components: {
    Search,
    ScrollToTop,
    GuideLogin,
    NoFound,
    adpostion
  },
  data () {
    return {
      params: {
        page: 1,
        count: 15,
        keyword: '',
        cityNums: 0
      },
      listData: [],
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
    this.getPositionList()
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
          q: Date.now()
        }
      })
      this.getPositionList()
    },
    getSearchType () {
      getPositionSearchType().then(({ data }) => {
        if (data.httpStatus === 200) {
          this.isGetSearchType = true
          this.recommended = data.data.recommended
          // 如果还在获取列表状态中
          if (this.getLoading) this.getPositionList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-center {
  margin-top: 24px;
  padding-bottom: 40px;
  display: flex;
}
.lists-wrapper {
  margin-right: 20px;
  min-height: 108px;
  min-width: 882px;
}
.position-lists {
  box-shadow: $shadow-1;
  .position-list:not(:last-child) {
    border-bottom: none;
  }
}
.guide-login {
  margin-bottom: 20px;
}
.position-list {
   cursor: pointer;
   @include flex-v-center;
   width: 100%;
   position: relative;
   background: #fff;
   box-sizing: border-box;
   padding: 28px 36px;
   border-bottom: 1px dashed  $border-color-1;
}

.position-info{
  width: 346px;
  padding-right: 36px;
  p {
    font-size: 16px;
  }
  span {
    vertical-align: middle;
    display: inline-block;
  }
  .position-name {
    @include ellipsis;
    max-width: 160px;
    padding-right: 14px;
    color: $title-color-1;
    font-weight: bold;
  }
  .position-pay {
    color: $error-color-1;
    font-weight: bold;
  }
  .position-active {
    background: url('../../assets/images/tag_list_job.png') no-repeat;
    width: 40px;
    height: 38px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .position-24hour {
    width: 45px;
    height: 18px;
    margin-right: 14px;
    background: url('../../assets/images/tag_list_24hour.png') no-repeat;
  }
  .position-active, .position-24hour {
    background-size: cover;
  }
  .position-require {
    margin-top: 10px;
    font-size: 12px;
    color: $title-color-2;
    span + span {
      margin-left: 22px;
    }
    span, i {
      display: inline-block;
      vertical-align: middle;
    }
    .iconfont {
      font-size: 14px;
      padding-right: 6px;
      color: $font-color-12;
    }
  }
}
.company-info {
  min-width: 240px;
  font-size: 16px;
  .company-name {
    color: $title-color-1;
    margin-bottom: 10px;
  }
  p span {
    padding-right: 8px;
  }
  .company-details {
    font-size: 12px;
    color: $title-color-2;
    font-weight: 300;
  }
  span + span {
    padding-left: 8px;
  }
}
.recruiter-info {
  margin-left: auto;
  text-align: right;
  position: relative;
  span {
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    color: $title-color-1;
  }
  .recruiter-name {
    max-width: 56px;
    margin: 0 6px;
  }
  .recruiter-name,  .recruiter-position {
    @include ellipsis;
  }
  .recruiter-position {
    margin-left: 6px;
    max-width: 85px;

  }
  .recruiter-profile {
    @include img-radius(22px, 22px)
  }
  p {
    font-size: 12px;
    color: $title-color-2;
    margin-top: 10px;
    font-weight: 300;
  }
  .contact-recruiter {
    display: none;
    position: absolute;
    top: 50%;
    margin-top: -18px;
    height: 100%;
    right: 0;
    background: $bg-color-1;
    z-index: 2;
    .el-button {
      width: 146px;
      border-radius: 0;
      vertical-align: middle;
    }
  }
}
.position-list:hover {
  background: $bg-color-1;
  .contact-recruiter {
    display: block;
  }
  .recruiter-base-info{
    opacity: 0;
  }
}
.pagination {
  background: #fff;
  padding: 30px 0;
  text-align: center;
}
</style>
