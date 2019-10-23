<template>
  <div class="index-search">
    <div class="index-search-wrapper">
      <el-autocomplete
        v-model="searchValue"
        :fetch-suggestions="querySearchAsync"
        placeholder="搜索职位、公司"
        @select="handleSelect">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-autocomplete>
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: '' // 需要查询的值
    }
  },
  methods: {
    // 查询
    querySearchAsync(queryString, cb) {
      console.log(queryString)
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb([{
          value: queryString,
          id: 1
        }]);
      }, 3000 * Math.random());
    },
    // 选择查询到的数据
    handleSelect() {

    }
  }
}
</script>
<style lang="scss" scoped>
$search-height: 130px;
$search-width-wrapper: 936px;
.index-search {
  height: $search-height;
  background: #fff;
  @include flex-v-center;
}
.index-search-wrapper {
  width: $search-width-wrapper;
  margin: 0 auto;
  .el-autocomplete,& /deep/ .el-input__inner{
    height: 46px;
  }
  .el-autocomplete {
    width: 793px;
  }
  & /deep/ .el-input__inner {
    border-radius: 0px;
  }
  .el-button {
    height: 46px;
    border-radius: 0;
    display: inline-block;
    vertical-align: top;
    width: 140px;
    font-size:18px;
  }
}

</style>