<template>
  <div class="search-wrapper-company" :class="{'search-fixed': headerFixed}">
    <div class="main-center">
      <div class="search-filter">
        <drop-down
          v-model="infos.emolumentIds"
          :items="infos.areaList"
          :showArrow="true"
          :all-value="0"
          :props="{
            value: 'areaId',
            label: 'name'
          }"
          @on-select="handleSelect($event, 'areaList')">
          <span class="filter-name">公司地点 <span>{{params.areaList.length ? '('+ params.areaList.length +')' : '' }}</span></span>
        </drop-down>
        <drop-down
          v-model="infos.financingIds"
          :items="infos.financingList"
          :multiple="true"
          :showArrow="true"
          :all-value="0"
          :limit="100000"
          :props="{
            value: 'value',
            label: 'text'
          }"
          @on-select="handleSelect($event, 'financingList')">
          <span class="filter-name">融资规模 <span v-if="params.financingList.length">({{params.financingList.length}})</span></span>
        </drop-down>
        <drop-down
          v-model="infos.employeeIds"
          :items="infos.employeeList"
          :multiple="true"
          :limit="100000"
          :showArrow="true"
          :all-value="0"
          :props="{
            value: 'value',
            label: 'text'
          }"
          @on-select="handleSelect($event, 'employeeList')">
          <span class="filter-name">人员规模 <span v-if="params.employeeList.length">({{params.employeeList.length}})</span></span>
        </drop-down>
        <drop-down
          v-model="infos.industryIds"
          :items="infos.industryList"
          :multiple="true"
          :showArrow="true"
          :col="3"
          :limit="100000"
          :all-value="0"
          :props="{
            value: 'labelId',
            label: 'name'
          }"
          @on-select="handleSelect($event, 'industryList')">
          <span class="filter-name">行业领域 <span v-if="params.industryList.length">({{params.industryList.length}})</span></span>
        </drop-down>
        <span class="filter-remove" @click="handleRemove">清空筛选条件</span>
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
    height: {
      type: Number,
      default: 0
    },
    infos: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    '$route': {
      handler() {
        let {areaList, industryList, employeeList, financingList} = this.infos
        this.params.areaList = areaList.filter(v => v.checked && v.areaId)
        this.params.industryList = industryList.filter(v => v.checked && v.labelId)
        this.params.employeeList = employeeList.filter(v => v.checked && v.value)
        this.params.financingList = financingList.filter(v => v.checked && v.value)
      },
      immediate: true
    }
  },
  data () {
    return {
      headerFixed: false,
      params: {
        areaList: [],
        industryList: [],
        employeeList: [],
        financingList: []
      }
    }
  },
  components: { DropDown },
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
      }, 50)
    },
    handleScroll () {
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.height
    },
    handleSelect (data, key) {
      const params = {}
      if (key === 'areaList') {
        this.infos.areaList.map(v => v.checked = v.areaId === data.areaId ? true : false)
      }
      for (let item in this.infos) {
        params[item] = Array.isArray(this.infos[item]) ? this.infos[item].filter(v => v.checked) : this.infos[item]
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
    // 清空筛选
    handleRemove () {
      Object.assign(this.params, {
        emolumentIds: '', // 薪资
        financingIds: [], // 融资
        employeeIds: [], // 人员规模
        industryIds: [] // 行业领域
      })
      this.financingList.forEach(val => { if (val.checked) val.checked = false })
      this.industryList.forEach(val => { if (val.checked) val.checked = false })
      this.employeeList.forEach(val => { if (val.checked) val.checked = false })
      this.handleSelect()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper-company {
  width: 100%;
  background: #fff;
  box-shadow: $shadow-1;
  height: 60px;
  display: none;
}
.search-filter {
  @include flex-v-center;
  padding: 20px 0 0;;
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
  height: 60px;
  display: block;
  position: fixed;
  z-index: 2;
  top: 0;
}
.search-fixed-wrapper {
  top: 0;
  left: 0;
  background: #fff;
  position: fixed;
  width: 100%;
  height: 60px;
  box-shadow: $shadow-2;
  z-index: 99;
  .main-center {
    margin-top: 12px;
  }
}
</style>
