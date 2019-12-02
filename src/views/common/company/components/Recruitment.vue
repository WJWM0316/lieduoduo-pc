<template>
  <div>
    <div class="positionType">
      <div class="inner">
        <p class="positionType-title">职位类型：</p>
        <ul>
          <li v-for="(item, index) in type" :key="index" class="positionType-buttom" :class="{ activation: index === typeActivation }" @click="TypeClick(item, index)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div class="position-main">
      <div class="inner">
        <div class="list" v-loading="getLoading">
          <no-found v-if="!getLoading && !PositionList.length" :max-width="400"></no-found>
          <positionItem v-for="(item, index) in PositionList" :key="index" :item = item></positionItem>
          <div class="pagination" v-if="total > 20">
            <el-pagination
              background
              @current-change="handleSearch"
              :current-page.sync ="page"
              layout="prev, pager, next"
              :page-size="20"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="position-right">
          <guide-login class="guidelogin" v-if="!hasLogin"></guide-login>
          <adpostion class="adpostion" position="searchResult"></adpostion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCompanysPositionApi,
  getCompanysPositionListApi
} from '@/api/company.js'
import positionItem from '@/components/common/positionItem/index'
import NoFound from 'COMPONENTS/noFound'
import GuideLogin from 'COMPONENTS/common/guideLogin'
import adpostion from 'COMPONENTS/common/adpostion'

export default {
  name: 'companyRecruitment',
  data () {
    return {
      getLoading: true,
      type: {}, // type类型
      typeActivation: 0,
      PositionList: {},
      page: 1,
      total: 0,
      typeId: ''
    }
  },
  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin
    })
  },
  components: {
    positionItem,
    adpostion,
    NoFound,
    GuideLogin
  },

  methods: {
    handleSearch (page) {
      this.page = page
      this.getCompanysPositionList()
    },
    // 获得职位详情
    async getCompanysPosition () {
      let data = {
        vkey: this.$route.query.vkey
      }
      await getCompanysPositionApi(data)
        .then(res => {
          this.type = res.data.data
          this.type.unshift({
            name: '全部',
            id: ''
          })
        })
    },
    TypeClick (item, index) {
      this.typeId = item.id
      this.page = 1
      this.typeActivation = index
      this.getCompanysPositionList()
    },
    // 拿到列表数据
    getCompanysPositionList () {
      let params = {
        company_vkey: this.$route.query.vkey,
        page: this.page
      }
      if (this.typeId) {
        params = Object.assign(params, { type: this.typeId })
      }
      getCompanysPositionListApi(params).then(({ data }) => {
        this.PositionList = data.data
        this.getLoading = false
        this.total = data.meta.total
      })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.getCompanysPosition()
      this.getCompanysPositionList({ company_vkey: this.$route.query.vkey, id: '' })
    })
  }
}

</script>

<style lang="scss" scoped>
.positionType{
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  padding-top: 18px;
  .inner{
    width: $page-width;
    margin: auto;
    .positionType-title{
      color: $font-color-3;
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 19px;
      line-height: 24px;
    }
    ul{
      padding-bottom: 5px;
      .positionType-buttom{
      padding: 0 10px;
      margin: 0 24px 14px 0;
      cursor: pointer;
      display: inline-block;
      height: 32px;
      color: $border-color-7;
      text-align: center;
      line-height: 32px;
      font-weight: 400;
      border-radius: 2px;
      }
    }
    .activation{
      color: $main-color-1 !important;
      background: $bg-color-5;
      font-weight: 500;
    }
  }
}
.position-main{
  width: 100%;
  .inner{
    width: $page-width;
    margin: 25px auto;
    display: flex;
    .list{
      width: 882px;
      background: #ffffff;
    }
  }
  .position-right{
    padding-left: 20px;
    .guidelogin{
      margin-bottom: 20px;
    }
  }
}
.pagination {
  background: $bg-color-1;
  padding: 30px 0;
  text-align: center;
}
</style>
