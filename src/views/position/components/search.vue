<template>
  <div class="search-wrapper">
    <div class="main-center">
      <div class="search-input">
        <el-autocomplete
          placeholder="搜索职位、公司"
          v-model="searchValue"
          :fetch-suggestions="querySearch"
          @select="handleSelect">
          <el-select v-model="address" slot="prepend" placeholder="请选择">
            <el-option value="广州">广州</el-option>
            <el-option value="深圳">深圳</el-option>
            <el-option value="北京">北京</el-option>
            <el-option value="上海">上海</el-option>
          </el-select>
        </el-autocomplete>
        <el-button class="el-button-h46 " type="primary">搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: '',
      address: '广州'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    querySearch () {

    },
    handleScroll () {
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.scrollTop
    },
    handleSelect () {

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
  box-shadow: $shadow-1;
}
.search-input {
  padding: 24px 0;
  .el-autocomplete,& /deep/ .el-input__inner{
    height: 46px;
  }
  .el-select {
    width: 100px;
    height: 100%;
    vertical-align: middle;
  }
  .el-autocomplete {
    width: 750px;
  }
  & /deep/ .el-input__inner {
    border-radius: 0px;
  }
  .el-button-h46 {
    display: inline-block;
    vertical-align: top;
    width: 130px;
  }
  .search-fixed-title {
    display: none
  }
}
</style>
