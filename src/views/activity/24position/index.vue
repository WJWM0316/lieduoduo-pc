<template>
  <!-- 24 活动页 -->
  <div class="position-24h">
    <div class="position-first-content">
      <ul class="city-lists" :class="{'fixex-city': fixedCity}">
        <template v-for="city in citys">
          <li
            :key="city.areaId"
            :class="{active: city.areaId === currentCity}"
            @click="handleChangeCity(city)">{{city.name}}
          </li>
        </template>
      </ul>
    </div>
    <ul class="position-types">
      <template v-for="(position, index) in positionTypes">
        <li
          :key="position.id"
          :class="{active: currentType === index}"
          @click="handleScrollToView(index)">{{position.name}}</li>
      </template>
    </ul>
    <div class="">
      <template v-for="(position, index) in positions">
        <item :key="index" :positions="position" :type="positionTypes[index]" />
      </template>
    </div>
  </div>
</template>
<script>
import Item from './components/items'
import { getActivityPositionList } from '@/api/common'
// const clientHeight = window.innerWidth || (document.body && document.body.clientHeight)
export default {
  components: { Item },
  data () {
    return {
      fixedCity: false,
      currentCity: 0, // 位置id
      positionTypes: [], // 职位类型
      currentType: null,
      positions: []
    }
  },
  computed: {
    citys () {
      return this.$store.getters.areaList || []
    }
  },
  created () {
    this.currentCity = this.$store.state.cityId
    this.getLists()
  },
  methods: {
    getLists () {
      getActivityPositionList({ city: this.currentCity }).then(({ data }) => {
        const { positionTypes, positions } = data.data
        this.positionTypes = positionTypes
        this.positions = positions
      })
    },
    // 切换城市
    handleChangeCity (city) {
      this.currentCity = city.areaId
    },
    // 让职位滚动到可视区域
    handleScrollToView (index) {
      const dom = document.querySelectorAll('.position-item-wrapper')
      this.$util.scrollToView(dom[index])
    },
    // 滚动条监听
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 部分不加入节流
      this.fixedCity = scrollTop > this.cityWrapperTop
      // 简单节流
      if (this.timer) window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        let index = 0
        const listDom = document.querySelectorAll('.position-item-wrapper')
        listDom.forEach((dom, i) => {
          const bounding = dom.getBoundingClientRect()
          // - clientHeight / 2
          if (bounding.top <= 0) index = i
        })
        this.currentType = index
      }, 20)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    // 记录位置city dom加载完成位置
    const dom = document.querySelector('.city-lists')
    const domBounding = dom.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    this.cityWrapperTop = domBounding.top + scrollTop
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.position-24h {
  background-color: #000;
  padding: 20px 0;
}
.position-first-content {
  position: relative;
  height: calc(100vh - #{$page-header-height});
}
.city-lists {
  text-align: center;
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  height: 40px;
  li {
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 12px 22px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .active {
    color: $main-color-1;
    background-color: $bg-color-5;
  }
}
.fixex-city.city-lists {
  position: fixed;
  top: 0;
}
.position-types {
  position: fixed;
  z-index: 2;
  top: 100px;
  right: 100px;
  background-color: #fff;
  box-shadow: $shadow-1;
  li {
    padding: 10px 20px;
    cursor: pointer;
    text-align: center;
  }
  li:hover {
    background-color: $bg-color-5;
  }
  .active {
    color: $main-color-1;
    background-color: $bg-color-5;
  }
}
.position-item-wrapper {
  background: #363636;
}
.position-item-wrapper:nth-child(odd) {
  background-color: #303030;
}
</style>
