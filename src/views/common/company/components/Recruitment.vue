<template>
  <div>
    <div class="positionType">
      <div class="inner">
        <p class="positionType-title">职位类型：</p>
        <ul>
          <li class="positionType-buttom" :class="{ activation: 0 === typeActivation }" @click="TypeClick('', 1)">全部</li>
          <li v-for="(item, index) in type" :key="index+1" class="positionType-buttom" :class="{ activation: index+1 === typeActivation }" @click="TypeClick(item, index+1)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div class="position-main">
      <div class="inner">
        <div class="list">
          <positionItem v-for="(item, index) in PositionList" :key="index" :item = item></positionItem>
        </div>
        <!-- <div class="pagination" v-if="total > 0 && total > params.count">
          <el-pagination
            background
            @current-change="(val) => handleSearch(val, 'page')"
            :current-page.sync ="params.page"
            :page-size="params.count"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div> -->
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

export default {
  name: 'companyRecruitment',
  data () {
    return {
      type: {}, // type类型
      typeActivation: 0,
      PositionList: {},
      typeActivationItem: {}, // 当前激活按钮数据
      page: 1
    }
  },
  components: {
    positionItem
  },

  methods: {
    // 获得职位详情
    async getCompanysPosition () {
      let data = {
        companyId: this.$route.query.companyId
      }
      await getCompanysPositionApi(data)
        .then(res => {
          this.type = res.data.data
        })
    },
    TypeClick (item, index) {
      this.typeActivationItem = item.id

      var data = {
        company_id: this.$route.query.companyId,
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
        })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.getCompanysPosition()
      this.getCompanysPositionList()
    })
  }
}

</script>

<style lang="scss" scoped>
.positionType{
  width: 100%;
  background: #ffffff;
  .inner{
    width: $page-width;
    margin: auto;
    .positionType-title{
      color: $font-color-3;
      font-weight: 400;
      font-size: 16px;
      margin: 26px 0;
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
    margin: auto;
    .list{
      width: 882px;
      background: #ffffff;
    }
  }
}
.pagination {
  background: $bg-color-1;
  padding: 30px 0;
  text-align: center;
}
</style>
