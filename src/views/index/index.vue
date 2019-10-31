<template>
  <div class="index-wrapper">
    <login-banner v-if="!isLogin" :banner="loginBannerList" :total="total"></login-banner>
    <search-wrapper></search-wrapper>
    <div class="position-wrapper main-center">
      <div class="index-part-1">
        <position-name :list="positionData"></position-name>
        <index-banner :items="bannerLists" ref="indexBanner"></index-banner>
      </div>
      <active></active>
      <position-list :nameList="positionLabel" ref="positionList"></position-list>
    </div>
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script>
import LoginBanner from './components/loginBanner'
import SearchWrapper from './components/indexSearch'
// 职位类型列表
import PositionName from './components/postionName'
import IndexBanner from './components/indexBanner'
import Active from './components/24Active'
// 职位列表
import PositionList from './components/positionList.vue'
import ScrollToTop from 'COMPONENTS/scrollToTop'
import { getBanners, getIndexData } from 'API/common'
export default {
  components: {
    LoginBanner,
    SearchWrapper,
    PositionName,
    IndexBanner,
    Active,
    PositionList,
    ScrollToTop
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
    isLogin () {
      return !!this.$store.state.userInfo.id
    }
  },
  methods: {
    // 获取首页相关的banner
    getBannerList () {
      getBanners({
        location: 'jobhunter_pc_index_head,jobhunter_pc_index_middle'
      }).then(({ data }) => {
        const { jobhunterPcIndexHead, jobhunterPcIndexMiddle } = data.data
        this.loginBannerList = jobhunterPcIndexHead || []
        this.bannerLists = jobhunterPcIndexMiddle || []
        if (this.bannerLists.length > 1) {
          this.$refs.indexBanner.autoplay()
        }
      })
    },
    // 获取页面数据 比如职位，地址等等
    getPageData () {
      getIndexData({}).then(({ data }) => {
        const { positionType, label, coolCompanyNum, goodChanceNum } = data.data
        this.positionData = positionType
        this.positionLabel = label || []
        this.total = { coolCompanyNum, goodChanceNum }
        if (this.positionLabel[0]) {
          this.$refs.positionList.handleChange(this.positionLabel[0])
        }
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
</style>
