<template>
  <div class="search-wrapper-company" :class="{'search-fixed': headerFixed}">
    <div class="main-center">
      <div class="search-filter">
        <drop-down
          v-model="value"
          :items="searchCollect.area"
          :showArrow="true"
          :all-value="0"
          ref="area"
          :props="{
            value: 'areaId',
            label: 'name'
          }"
          @input="handleSelect($event, 'area')">
          <span class="filter-name">公司地点 <span>{{filterSearchCollect.area.length ? '('+ filterSearchCollect.area.length +')' : '' }}</span></span>
        </drop-down>
        <drop-down
          :items="searchCollect.financing"
          :multiple="true"
          :showArrow="true"
          :all-value="0"
          ref="financing"
          :limit="100000"
          :props="{
            value: 'value',
            label: 'text'
          }"
          @on-select="handleSelect($event, 'financing')">
          <span class="filter-name">融资规模 <span v-if="filterSearchCollect.financing.length">({{filterSearchCollect.financing.length}})</span></span>
        </drop-down>
        <drop-down
          :items="searchCollect.employee"
          :multiple="true"
          :limit="100000"
          :showArrow="true"
          :all-value="0"
          ref="employee"
          :props="{
            value: 'value',
            label: 'text'
          }"
          @on-select="handleSelect($event, 'employee')">
          <span class="filter-name">人员规模 <span v-if="filterSearchCollect.employee.length">({{filterSearchCollect.employee.length}})</span></span>
        </drop-down>
        <drop-down
          :items="searchCollect.industry"
          :multiple="true"
          :showArrow="true"
          :col="3"
          :limit="100000"
          :all-value="0"
          ref="industry"
          :props="{
            value: 'labelId',
            label: 'name'
          }"
          @on-select="handleSelect($event, 'industry')">
          <span class="filter-name">行业领域 <span v-if="filterSearchCollect.industry.length">({{filterSearchCollect.industry.length}})</span></span>
        </drop-down>
        <span class="filter-remove" @click="handleRemove">清空筛选条件</span>
      </div>
    </div>
  </div>
</template>
<script>
import DropDown from 'COMPONENTS/dropDown'
export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      searchCollect: state => state.company.searchCollect
    }),
    ...mapGetters([
      'filterSearchCollect'
    ])
  },
  data () {
    return {
      headerFixed: false,
      value: ''
    }
  },
  components: { DropDown },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions([
      'updateSearchCollectApi',
      'updateSearchCollectMutipleApi'
    ]),
    handleScroll () {
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.height
    },
    handleSelect (item, key) {
      let arr = []
      switch (key) {
        case 'area':
          let index = this.searchCollect.area.findIndex(v => v.areaId === item)
          let item1 = this.searchCollect.area.find(v => v.areaId === item)
          this.updateSearchCollectApi({ item: item1, index, key }).then(() => this.$emit('on-search'))
          break
        case 'financing':
          arr = item.map(v => v.value)
          this.updateSearchCollectMutipleApi({ arr, key }).then(() => this.$emit('on-search'))
          break
        case 'employee':
          arr = item.map(v => v.value)
          this.updateSearchCollectMutipleApi({ arr, key }).then(() => this.$emit('on-search'))
          break
        case 'industry':
          arr = item.map(v => v.labelId)
          this.updateSearchCollectMutipleApi({ arr, key }).then(() => this.$emit('on-search'))
          break
        default:
          break
      }
    },
    // 清空筛选
    handleRemove () {
      Object.keys(this.searchCollect).map(key => {
        if(this.$refs[key]) {
          this.$refs[key].clearAll()
        }
      })
      this.$emit('on-reset')
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
