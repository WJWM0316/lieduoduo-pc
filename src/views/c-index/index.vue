<template>
  <div class="index-wrapper">
    <login-banner :banner="loginBannerList" :total="total"></login-banner>
    <search-wrapper  :banner="loginBannerList"></search-wrapper>
    <div class="position-wrapper main-center">
      <div class="index-part-1">
        <position-name :list="positionData"></position-name>
        <!-- <index-banner :items="bannerLists" ref="indexBanner"></index-banner> -->
        <IndexBanner3 />
      </div>
      <active />
      <!-- <position-list :nameList="positionLabel" ref="positionList"></position-list> -->
      <hot-company />
      <hot-city />
      <app-links class="app-links" />
    </div>
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script>
import LoginBanner from './components/loginBanner'
import SearchWrapper from './components/indexSearch'
// 职位类型列表
import PositionName from './components/postionName'
// import IndexBanner from './components/indexBanner'
import Active from './components/24Active'
import IndexBanner3 from './components/indexBanner3'

// 职位列表
// import PositionList from './components/positionList.vue'
// 热门公司列表
import HotCompany from './components/hotCompany'
import ScrollToTop from 'COMPONENTS/scrollToTop'
import HotCity from './components/hotCity'
import AppLinks from 'COMPONENTS/common/appLinks'
import { getBanners, getIndexData } from 'API/common'
export default {
  components: {
    LoginBanner,
    SearchWrapper,
    PositionName,
    // IndexBanner,
    Active,
    HotCity,
    HotCompany,
    AppLinks,
    ScrollToTop,
    IndexBanner3
  },
  data () {
    return {
      loginBannerList: [], // 登陆模块的banner
      bannerLists: [], // index banner
      positionData: [], // 职位类型数据
      positionLabel: [], // 部分职位名称tab数据
      total: {
        coolCompanyNum: '',
        goodChanceNum: ''
      }
    }
  },
  created () {
    this.getBannerList()
    this.getPageData()
  },
  computed: {
    isJobhunter () {
      return !!this.$store.state.roleInfos.isJobhunter
    }
  },
  methods: {
    // 获取首页相关的banner
    getBannerList () {
      getBanners({
        location: 'jobhunter_pc_index_head,jobhunter_pc_index_middle'
      }).then(({ data }) => {
        // , jobhunterPcIndexMiddle
        const { jobhunterPcIndexHead } = data.data
        this.loginBannerList = jobhunterPcIndexHead || []
        // const bannerLists = jobhunterPcIndexMiddle || []
        // this.bannerLists = bannerLists.filter(val => !(val.name === 'createUser' && this.isJobhunter))
        // if (this.bannerLists.length > 1) {
        //   this.$nextTick(() => {
        //     this.$refs.indexBanner.autoplay()
        //   })
        // }
      })
    },
    // 获取页面数据 比如职位，地址等等
    getPageData () {
      getIndexData({}).then(({ data }) => {
        const { positionType, label, coolCompanyNum, goodChanceNum } = data.data
        this.positionData = positionType
        this.positionLabel = label || []
        this.total = { coolCompanyNum, goodChanceNum }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.index-part-1 {
  @include flex-v-center;
  margin: 24px 0;
  .swiper {
    flex: 1;
    margin-left: 20px;
  }
}
.app-links {
  margin-bottom: 40px;
}
</style>
