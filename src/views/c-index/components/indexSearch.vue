<template>
  <div class="index-search" :class="{'search-fixed': headerFixed}">
    <div class="index-search-wrapper" :class="{'search-fixed-wrapper': headerFixed}">
      <div class="search-fixed-input">
        <div class="search-fixed-title">
          <img src="../../../assets/images/logo.png" alt="">
        </div>
        <el-autocomplete
          v-model="searchValue"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜索职位、公司"
          :debounce="500"
          size="big"
          @select="handleSelect"
          @keyup.native.enter="handleSelect()"
          :maxlength="50">
          <i slot="prefix" class="el-input__icon iconfont icon-sousuo"></i>
        </el-autocomplete>
        <el-button class="el-button-h50" type="primary" @click="handleToSearch">搜索</el-button>
      </div>
      <p class="hot-word">
        <span>热门搜索：</span>
        <template v-for="(item, index) in hotkeyWord">
          <template v-if="item.type === 1">
            <router-link :to="`/position?keyword=${item.word}&typeName=position&areaType=1`" :key="index">{{item.word}}</router-link>
          </template>
          <template v-else>
            <router-link :to="`/company/details?vkey=${item.extras.vkey}`" :key="index">{{item.word}}</router-link>
          </template>
        </template>
      </p>
    </div>
  </div>
</template>
<script>
import { getMatchesPosition, getHotKeyword } from 'API/search'
export default {
  props: {
    banner: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      searchValue: '', // 需要查询的值
      hotkeyWord: [], // 热门关键词
      headerFixed: false
    }
  },
  created () {
    this.getWords()
  },
  computed: {
    scrollTop () {
      // 如果是登陆状态是 120 非登陆状态 是 180
      const { userInfo } = this.$store.state
      let bannerHeight = this.banner[0] && this.banner[0].bigImgUrl ? 70 : 0
      return userInfo && userInfo.id ? 96 + bannerHeight : 226
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 查询
    querySearchAsync (queryString, cb) {
      if (!queryString.length) {
        // eslint-disable-next-line standard/no-callback-literal
        cb([])
        return
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        getMatchesPosition({ position: queryString }).then(({ data }) => {
          const reslutes = data.data || []
          cb(reslutes.map((val, index) => ({ value: val, id: index })))
        })
      }, 300)
    },
    // 选择查询到的数据
    handleSelect (value) {
      this.$router.push({
        path: '/position',
        query: {
          keyword: value ? value.value : this.searchValue
        }
      })
    },
    getWords () {
      getHotKeyword({ type: '1,2' }).then(({ data }) => {
        this.hotkeyWord = data.data.items || []
      })
    },
    handleScroll () {
      // 得到页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.scrollTop
    },
    // 首页搜索
    handleToSearch () {
      let path = '/position'
      if (this.searchValue) {
        path = `${path}?keyword=${this.searchValue}&areaType=3`
      }
      this.$router.push(path)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
$search-height: 130px;
$search-width-wrapper: 936px;
.index-search {
  height: $search-height;
  background: #fff;
  box-shadow: $shadow-1;
  @include flex-v-center;
}
.hot-word {
  margin-top: 20px;
  font-size:14px;
  a {
    color: $main-color-1;
    padding: 0 10px;
  }
  span {
    color: $title-color-2;
  }
}
.index-search-wrapper {
  width: $search-width-wrapper;
  margin: 0 auto;
  .el-autocomplete {
    width: 793px;
  }
  & /deep/ .el-input__inner {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-left: 56px;
    border-right: none;
  }
  & /deep/ .el-input__prefix {
    padding: 0 16px;
  }
  .el-button-h50 {
    display: inline-block;
    vertical-align: top;
    width: 140px;
    border-radius: 0 4px 4px 0;
  }
  .search-fixed-title {
    width: 70px;
    img {
      max-width: 100%;
    }
    display: none
  }
}
.search-fixed {
  height: 90px;
}
.search-fixed-wrapper {
  top: 0;
  left: 0;
  background: #fff;
  position: fixed;
  width: 100%;
  height:90px;
  box-shadow: $shadow-2;
  z-index: 99;
  .hot-word {
    display: none
  }
  .search-fixed-title {
    color: $main-color-1;
    font-size: 24px;
    display: block;
    margin-right: 62px;
    font-weight: bold;
  }
  .search-fixed-input {
    width: $page-width;
    margin: 0 auto;
    height: 100%;
    @include flex-v-center;
  }
}
</style>
