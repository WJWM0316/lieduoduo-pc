<template>
  <div class="company-wrapper">
    <!-- 热门城市 -->
    <div class="header-wrapper">
      <ul>
        <template v-for="item in typeList">
          <li class="company-name" :class="{active: currentId === item.id}" @click="handleChange(item)" :key="item.id">{{item.title}}</li>
        </template>
      </ul>
    </div>
    <div class="company-lists-wrapper" v-loading="getLoading">
      <!-- 隔离层 防止nth-child 多读取一个div -->
      <div class="company-lists">
        <template v-for="(item, index) in listData">
          <company-card :item="item"  :key="index"/>
        </template>
      </div>
    </div>
    <div class="company-more-btn" v-if="!getLoading && listData.length">
      <div class="c-btn c-big-btn" @click="handleShowMore">查看更多</div>
    </div>
  </div>
</template>
<script>
// import ScrollPane from 'COMPONENTS/scrollPane'
import { getHotCompanyTypes, getHotCompanys } from 'API/company'
import CompanyCard from 'COMPONENTS/common/companyCard'
// ScrollPane,
export default {
  components: { CompanyCard },
  data () {
    return {
      currentId: 0,
      getLoading: true,
      listData: [],
      typeList: []
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.userInfo.id
    },
    cityid () {
      return this.$store.state.cityId || 0
    }
  },
  created () {
    this.getTypes().then(() => {
      this.getCompanyList()
    })
  },
  methods: {
    // 获取热门公司类型信息
    async getTypes () {
      await getHotCompanyTypes({ city: this.cityid }).then(({ data }) => {
        this.typeList = data.data || []
        this.currentId = this.typeList[0] && this.typeList[0].id
      })
    },
    // 获取职位列表
    getCompanyList () {
      this.getLoading = true
      getHotCompanys({ typeId: this.currentId, city: this.cityid }).then(({ data }) => {
        this.getLoading = false
        this.listData = data.data.slice(0, 12)
      })
    },
    handleChange (item) {
      this.currentId = item.id
      this.getCompanyList()
    },
    handleShowMore () {
      if (!this.isLogin) {
        this.$router.push('/login?type=msgLogin')
      } else {
        // this.$store.commit('guideQrcodePop', { switch: true, type: 'tocIndex' })
        this.$router.push('/company')
      }
    }
  },
  watch: {
    cityid (value) {
      this.getTypes().then(() => {
        this.getCompanyList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.company-lists-wrapper {
  padding-top: 4px;
  min-height: 156px;
  & /deep/ .el-loading-mask {
    background: rgba(255, 255, 255, 0.1);;
  }
}
.company-lists {
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
.company-wrapper {
  padding-bottom: 60px;
}
.header-wrapper{
  margin-top: 62px;
  .scroll-pane {
    width: 100%;
    height: 50px;
  }
  ul {
    width: 100%;
    height: 50px;
    @include flex-v-center;
    flex-wrap: nowrap;
    // justify-items: stretch
  }
  li {
    color: $title-color-2;
    font-size: 16px;
    border-bottom: 2px solid transparent;
    font-weight: 400;
    cursor: pointer;
  }
  li.active, li:hover {
    color: $main-color-1;
    border-color: $border-color-2;
  }
  li+li {
    margin-left: 52px;
  }
}
.company-more-btn {
  margin-top: 17px;
  text-align: center;
  .c-btn {
    width: 385px;
  }
}
</style>
