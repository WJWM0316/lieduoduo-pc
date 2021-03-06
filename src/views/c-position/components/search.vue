<template>
  <div class="search-wrapper" :class="{'search-fixed': headerFixed}">
    <div :class="{'search-fixed-wrapper': headerFixed}">
      <div class="main-center">
        <div class="search-input">
          <drop-down
              class="search-location"
              v-model="params.cityNums"
              :items="areaList"
              :showArrow="true"
              :default-width="100"
              :props="{
                value: 'areaId',
                label: 'name'
              }"
              @on-select="handleSelectLocaltion">
            <span class="address-name">{{address}}</span>
          </drop-down>
          <el-autocomplete
            placeholder="搜索职位、公司"
            v-model="params.keyword"
            @keyup.native.enter="handleSelect()"
            :maxlength="50"
            :debounce="500"
            :fetch-suggestions="querySearch"
            @select="handleSelectPosition" />
          <el-button class="el-button-h50 " type="primary" @click="handleSelect">搜索</el-button>
        </div>
        <div class="search-filter">
          <div class="search-taps">
            <template v-for="item in types">
              <div
                class="search-tap"
                @click="handleSelectTaps(item)"
                :class="{'active': typeName === item.type}"
                :key="item.type">{{item.label}}</div>
            </template>
          </div>
          <drop-down
            v-if="typeName === 'position'"
            v-model="params.emolumentIds"
            :items="emolumentList"
            :showArrow="true"
            :all-value="1"
            :props="{
              value: 'id',
              label: 'text'
            }"
            @on-select="handleSelect">
            <span class="filter-name">薪资范围 <span>{{params.emolumentIds && params.emolumentIds !== 1 ? '(1)' : '' }}</span></span>
          </drop-down>
          <drop-down
            v-model="params.financingIds"
            :items="financingList"
            :multiple="true"
            :showArrow="true"
            :all-value="0"
            :limit="3"
            :props="{
              value: 'value',
              label: 'text'
            }"
            @on-select="handleSelect">
            <span class="filter-name">融资规模 <span v-if="params.financingIds.length && params.financingIds[0] !== 0">({{params.financingIds.length}})</span></span>
          </drop-down>
          <drop-down
            v-model="params.employeeIds"
            :items="employeeList"
            :multiple="true"
            :limit="3"
            :showArrow="true"
            :all-value="0"
            :props="{
              value: 'value',
              label: 'text'
            }"
            @on-select="handleSelect">
            <span class="filter-name">人员规模 <span v-if="params.employeeIds.length && params.employeeIds[0] !== 0">({{params.employeeIds.length}})</span></span>
          </drop-down>
          <drop-down
            v-model="params.industryIds"
            :items="industryList"
            :multiple="true"
            :showArrow="true"
            :col="3"
            :limit="3"
            :all-value="0"
            :props="{
              value: 'labelId',
              label: 'name'
            }"
            @on-select="handleSelect">
            <span class="filter-name">行业领域 <span v-if="params.industryIds.length  && params.industryIds[0] !== 0">({{params.industryIds.length}})</span></span>
          </drop-down>
          <span class="filter-remove" @click="handleRemove">清空筛选条件</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSearchCollect } from 'API/common'
import { getMatchesPosition } from 'API/search'
import DropDown from 'COMPONENTS/dropDown'
export default {
  props: {
    typeName: {
      type: String,
      default: 'position'
    }
  },
  data () {
    return {
      headerFixed: false,
      address: '',
      params: {
        keyword: '',
        cityNums: this.cityid,
        emolumentIds: '', // 薪资
        financingIds: [], // 融资
        employeeIds: [], // 人员规模
        industryIds: [] // 行业领域
      },
      emolumentList: [], // 薪资范围
      employeeList: [], // 人员规模
      experienceList: [], // 学历要求
      financingList: [], // 融资范围
      industryList: [], // 行业列表
      areaList: [], // 热门城市地址
      types: [{ type: 'position', label: '职位' }, { type: 'company', label: '公司' }]
    }
  },
  components: { DropDown },
  created () {
    this.getCollectList()
    const { query } = this.$route
    if (query.typeName) {
      this.$emit('update:typeName', query.typeName || 'position')
    }
    if (query.keyword) this.params.keyword = query.keyword
  },
  computed: {
    cityid () {
      return this.$store.state.cityId || 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    querySearch (str, cb) {
      if (!str.length) {
        // eslint-disable-next-line standard/no-callback-literal
        cb([])
        return
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        getMatchesPosition({ position: str }).then(({ data }) => {
          const reslutes = data.data || []
          cb(reslutes.map((val, index) => ({ value: val, id: index })))
        })
      }, 300)
    },
    handleScroll () {
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > 50
    },
    handleSelect () {
      const params = {}
      for (let item in this.params) {
        params[item] = Array.isArray(this.params[item]) ? this.params[item].join(',') : this.params[item]
      }
      this.$emit('on-search', params)
    },
    // 地址选择
    handleSelectLocaltion (address) {
      this.address = address.name
      this.handleSelect()
    },
    // 职位选择
    handleSelectPosition (item) {
      this.params.keyword = item.value
      this.handleSelect()
    },
    // 获取集合数据
    getCollectList () {
      getSearchCollect().then(({ data }) => {
        const { emolument, employee, experience, financing, industry, area } = data.data
        this.emolumentList = emolument
        this.employeeList = employee
        this.experienceList = experience
        this.financingList = financing
        this.industryList = industry
        this.areaList = area
        const address = area.find(val => val.areaId === this.cityid) || area[0]
        this.address = address.name
        this.params.cityNums = this.cityid
      })
    },
    // 清空筛选
    handleRemove () {
      Object.assign(this.params, {
        cityNums: 0,
        emolumentIds: '', // 薪资
        financingIds: [], // 融资
        employeeIds: [], // 人员规模
        industryIds: [] // 行业领域
      })
      this.address = '全国'
      this.financingList.forEach(val => { if (val.checked) val.checked = false })
      this.industryList.forEach(val => { if (val.checked) val.checked = false })
      this.employeeList.forEach(val => { if (val.checked) val.checked = false })
      this.handleSelect()
    },
    // 切换taps
    handleSelectTaps (item) {
      this.$emit('update:typeName', item.type)
      this.handleRemove()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  width: 100%;
  background: #fff;
  box-shadow: $shadow-1;
  padding-top: 24px;
}
.search-input {
  margin-bottom: 24px;
  width: 880px;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  border: 1px solid $border-color-2;
  border-radius: 4px 4px 4px 4px;
  height: 50px;
  display: flex;
  align-items: center;
  .el-autocomplete,& /deep/ .el-input__inner{
    padding-left: 10px;
    height: 40px;
  }
  .search-location {
    width: 100px;
    text-align: center;
    padding: 15px 0;
    display: inline-block;
    z-index: 1;
    .address-name {
      display: inline-block;
      min-width: 50px;
      color: $title-color-2;
      color: $title-color-2;
    }
    & /deep/ .drop-down-wrapper {
      margin-top: 16px;
    }
    & /deep/ .drop-down-header {
      // line-height: inherit;
      vertical-align: top;
    }
  }
  .search-location::after {
    content: "";
    position: absolute;
    height: 20px;
    top: 15px;
    right: 0;
    width: 1px;
    background: $border-color-5;
  }
  .el-autocomplete {
    width: 640px;
    display: inline-block;
    vertical-align: middle;
  }
  & /deep/ .el-input__inner {
    box-sizing: border-box;
    border: none;
  }
  .el-button-h50 {
    display: inline-block;
    vertical-align: middle;
    width: 128px;
    border-radius: 0 4px 4px 0;
    padding: 16px 20px;
    margin: -1px 0px 0 auto;
  }
  .search-fixed-title {
    display: none
  }
}
.search-filter {
  @include flex-v-center;
  padding: 0px 0 20px;
  .search-taps {
    .search-tap.active {
      color: $main-color-1;
      font-weight: bold;
    }
    .search-tap:hover {
      color: $main-color-1;
    }
    .search-tap {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      padding: 0 9px;
      font-size: 16px;
      color: $title-color-1;
    }
    .search-tap + .search-tap {
      margin-left: 18px;
    }
    .active::after {
      content: "";
      height: 8px;
      width: 100%;
      background-image: url('../../../assets/images/tab.png');
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      bottom: -21px;
      left: 0;
    }
  }
  & /deep/ .drop-down-header {
    line-height: inherit;
    vertical-align: top;
  }
  &>div {
    min-width: 168px;
    margin-right: 40px;
  }
  & /deep/ .drop-down-wrapper {
    margin-top: 20px;
  }
  .filter-name {
    min-width: 86px;
    display: inline-block;
    color: $title-color-1;
    font-size: 14px;
    span {
      color: $main-color-1;
    }
  }
  .filter-remove {
    margin-left: auto;
    color: $font-color-10;
    font-size: 14px;
    cursor: pointer;
  }
}
.search-fixed {
  height: 130px;
}
.search-fixed-wrapper {
  top: 0;
  left: 0;
  background: #fff;
  position: fixed;
  width: 100%;
  box-shadow: $shadow-2;
  z-index: 99;
  .main-center {
    margin-top: 12px;
  }
}
</style>
