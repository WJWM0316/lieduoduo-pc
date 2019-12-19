<template>
  <div class="index-wrapper">
    <login-banner :banner="loginBannerList" :total="total"></login-banner>
    <div class="index-tips-banner">
      <ul class="main-center ">
        <li><i class="iconfont icon-rencai"></i> 专注互联网高端才人发展</li>
        <li><i class="iconfont icon-qiuzhiyixiang"></i> 优选年薪20W+高薪机会</li>
        <li><i class="iconfont icon-fuwu"></i> 求职顾问1V1免费辅导服务</li>
        <li><i class="iconfont icon-yuebossmiantan"></i> 直接与BOSS约面对面沟通</li>
      </ul>
    </div>
    <search-wrapper  :banner="loginBannerList"></search-wrapper>
    <div class="position-wrapper main-center">
      <div class="index-part-1">
        <position-name :list="positionData" v-loading="!positionData.length"></position-name>
        <!-- <index-banner :items="bannerLists" ref="indexBanner"></index-banner> -->
        <div class="page-bg-banner">
          <a target="_blank" href="https://h5.lieduoduo.com/delicate"><img src="~@/assets/random_images/img.jpg" alt="loading"></a>
        </div>
        <!-- <IndexBanner3 /> -->
      </div>
      <active ref="active" :types="positionTypes" :bubble-list="toastTips" />
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
// import IndexBanner3 from './components/indexBanner3'

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
    ScrollToTop
    // IndexBanner3
  },
  data () {
    return {
      loginBannerList: [], // 登陆模块的banner
      bannerLists: [], // index banner
      positionData: [], // 职位类型数据
      positionLabel: [], // 部分职位名称tab数据
      positionTypes: [], // 24h 职位类型
      toastTips: [], // 24 气泡
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
        const { positionType, label, coolCompanyNum, goodChanceNum, surfaceRapidly: { positionTypes, toastTips } } = data.data
        this.positionData = positionType
        this.positionLabel = label || []
        this.total = { coolCompanyNum, goodChanceNum }
        this.positionTypes = positionTypes ? [{ labelId: 0, name: '全部' }, ...positionTypes] : [{ labelId: 0, name: '全部' }] // 24h
        this.toastTips = toastTips // 24h
        this.$refs.active.refreshDom()
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
.index-tips-banner {
  background: rgba($bg-color-4, .1);
  .main-center {
    @include flex-v-center;
    height: 46px;
  }
  li {
    flex: 1;
    text-align: center;
    color: $main-color-1;
    font-size: 14px;
    position: relative;
    i {
      font-size: 14px;
    }
  }
  li:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    height: 18px;
    width: 1px;
    background-image: linear-gradient(to bottom, rgba($border-color-2, .24) 0%, rgba($border-color-2, .24) 70%, transparent 70%);
    background-size: 1px 6px;
    background-repeat: repeat-y;
  }
}
.page-bg-banner {
  overflow: hidden;
  width: 763px;
  height: 414px;
  margin-left: 18px;
  a {
    display: block;
  }
  img {
    max-width: 100%;
  }
}
</style>
