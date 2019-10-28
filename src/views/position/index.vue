<template>
  <div class="position-wrapper">
    <search />
    <div class="main-center">
      <div class="position-lists" v-loading="getLoading">
        <no-found v-if="!getLoading && !listData.length"></no-found>
        <div class="position-list"   v-for="item in listData" :key="item.id">
          <div class="position-info">
            <p>
              <!-- 急聘 -->
              <span class="position-active" v-if="item.isUrgency === 1"></span>
              <span class="position-name">{{item.positionName}}</span>
              <!-- 24反馈 -->
              <span class="position-24hour" v-if="item.isRapidly === 1"></span>
              <span class="position-pay">{{item.emolumentMin}}-{{item.emolumentMax}}·{{item.annualSalaryDesc}}</span>
            </p>
            <p class="position-require">
              <span><i class="iconfont icon-dizhi"></i>{{item.city}}{{item.district}}</span>
              <span><i class="iconfont icon-zhiwei"></i>{{item.workExperienceName}}</span>
              <span><i class="iconfont icon-jiaoyu"></i>{{item.educationName}}</span>
            </p>
          </div>
          <div class="company-info">
            <p class="company-name">{{item.companyInfo.companyShortname}}</p>
            <p><span>{{item.companyInfo.financingInfo}}</span>|<span>{{item.companyInfo.employeesInfo}}</span>|<span>{{item.companyInfo.industry}}</span></p>
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
        </div>
        <div class="pagination" v-if="total > 0">
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
      <div></div>
      <div>
        <div class="banner-list">
          <template v-for="(item, index) in bannerList">
            <a :href="item.otherUrl" target="_blank" :key="index">
              <img :src="item.bigImgUrl" alt="" >
            </a>
          </template>
        </div>
      </div>
    </div>
    <scroll-to-top ref="scrollToTop"></scroll-to-top>
  </div>
</template>
<script>
import ScrollToTop from 'COMPONENTS/scrollToTop'
import Search from './components/search'
import { getListApi } from 'API/position'
import NoFound from 'COMPONENTS/noFound'
import { getBanners } from 'API/common'
export default {
  components: {
    Search,
    ScrollToTop,
    NoFound
  },
  data () {
    return {
      params: {
        page: 1,
        count: 20,
        name: ''
      },
      listData: [],
      total: 0, // 职位总数
      getLoading: true,
      bannerList: []
    }
  },
  created () {
    this.getPositionList()
    const { query } = this.$route
    for (let item in this.params) {
      if (query[item]) this.params[item] = query[item]
    }
    this.getBannerList()
  },
  methods: {
    // 获取职位列表
    getPositionList () {
      this.getLoading = true
      getListApi(this.params).then(({ data }) => {
        this.getLoading = false
        this.listData = data.data || []
        this.total = data.meta.total
        if (this.$refs.scrollToTop) this.$refs.scrollToTop.toTop()
      })
    },
    handleSearch (value, type) {
      if (value) this.params[type] = value
      this.getPositionList()
    },
    getBannerList () {
      getBanners({ location: 'jobhunter_pc_position_list' }).then(({ data }) => {
        this.bannerList = data.data.jobhunterPcPositionList || []
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
.position-lists {
  box-shadow: $shadow-1;
  margin-right: 20px;
  min-height: 108px;
  min-width: 882px;
  .position-list:not(:last-child) {
    border-bottom: none;
  }
}
.position-list {
   cursor: pointer;
   @include flex-v-center;
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
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .iconfont {
      font-size: 12px;
      padding-right: 3px;
    }
  }
}
.company-info {
  min-width: 240px;
  .company-name {
    color: $title-color-1;
    margin-bottom: 10px;
  }
  font-size: 16px;
  p span {
    color: $title-color-2;
    font-size: 12px;
    padding-right: 8px;
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
  }
  .recruiter-name {
    max-width: 56px;
    @include ellipsis;
    margin: 0 6px;
  }
  .recruiter-position {
    margin-left: 6px;
  }
  .recruiter-profile {
    @include img-radius(22px, 22px)
  }
  p {
    font-size: 12px;
    color: $title-color-2;
    margin-top: 10px;
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
.banner-list {
  a {
    display: block;
    margin-bottom: 22px;
    img {
      max-width: 100%;
    }
  }
}
</style>
