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
          <div class="pagination" v-if="PositionList.length > 1">
            <el-pagination
              background
              @current-change="handleSearch"
              :current-page.sync ="page"
              layout="prev, pager, next"
              :total="PositionList.length">
            </el-pagination>
          </div>
        </div>
        <div class="position-right">
          <guide-login class="guidelogin" v-if="!haslogin"></guide-login>
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
      typeActivationItem: {}, // 当前激活按钮数据
      page: 1
    }
  },
  components: {
    positionItem,
    adpostion,
    NoFound,
    GuideLogin
  },

  methods: {
    handleSearch () {
      let data = {
        // companyId: this.$route.query.vkey
        companyId: 1346,
        type: this.typeActivationItem.id,
        page: this.page
      }
      this.getCompanysPositionList(data)
    },
    // 获得职位详情
    async getCompanysPosition () {
      let data = {
        // companyId: this.$route.query.vkey
        companyId: 1346
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
      this.typeActivationItem = item.id
      this.page = 1 // 点击还原页码

      var data = {
        // company_id: this.$route.query.vkey,
        company_id: 1346,
        type: item.id
      }
      this.typeActivation = index
      this.getCompanysPositionList(data)
    },
    // 拿到列表数据
    getCompanysPositionList (data) {
      getCompanysPositionListApi(data)
        .then(res => {
          this.PositionList = res.data.data
          this.getLoading = false
        })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.getCompanysPosition()
      this.getCompanysPositionList({ company_id: 1346, id: '' })
    })
  }
}

</script>

<style lang="scss" scoped>
.positionType{
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  padding-top: 24px;
  .inner{
    width: $page-width;
    margin: auto;
    .positionType-title{
      color: $font-color-3;
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 18px;
    }
    .positionType-buttom{
      padding: 0 10px;
      margin: 11px 40px 11px 0;
      cursor: pointer;
      display: inline-block;
      min-width: 98px;
      height: 32px;
      color: $border-color-7;
      text-align: center;
      line-height: 32px;
      font-weight: 400;
    }
    .activation{
      color: $main-color-1;
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
