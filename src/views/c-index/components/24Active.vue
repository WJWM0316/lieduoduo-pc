<template>
  <div class="position-24h-wrapper">
    <div class="active-header-wrapper" @click="handleShowMore">
      <img class="header-img" src="../../../assets/images/index/title_24hour.png" />
      <span class="position-tag">高薪热门职位</span>
      <span class="position-tag">职业顾问服务</span>
      <div class="bubble-wrapper" v-if="bubbleList.length">
         <p ref="bubble">{{bubbleList[bubbleIndex]}}</p>
      </div>
    </div>
    <!-- 24h职位类型 -->
    <div class="position-types">
      <scroll-pane class="scroll-pane" ref="scrollPane" :width="scrollPaneWidth">
        <ul>
          <template v-for="item in types">
            <li
              class="company-name"
              :class="{active: currentTypeId === item.labelId}"
              @click="handleChangeType(item)" :key="item.labelId">{{item.name}}</li>
          </template>
        </ul>
      </scroll-pane>
    </div>
    <div class="active-list" v-loading="getLoading">
      <div class="active-lists-warpper">
        <template v-for="(item,index) in listData">
          <position-card :key="item.lableId" :item="item" :count-down="listCountDown[index]" />
        </template>
      </div>
    </div>
    <div class="active-btn">
      <div class="c-btn c-big-btn" @click="handleShowMore">查看更多</div>
    </div>
  </div>
</template>
<script>
import ScrollPane from '@/components/scrollPane/index'
import PositionCard from '@/components/common/positionItem/24h'
import { getRapidlyDataByType } from 'API/common'
export default {
  props: {
    types: {
      type: Array,
      default: () => ([])
    },
    bubbleList: {
      type: Array,
      default: () => ([])
    }
  },
  components: { ScrollPane, PositionCard },
  data () {
    return {
      bubbleIndex: 0,
      listData: [],
      getLoading: false,
      listCountDown: [], // 倒计时数据
      currentTypeId: 0, // 当前类型的Id
      scrollPaneWidth: 'auto'
    }
  },
  created () {
    this.getListsByPosition()
  },
  computed: {
    cityid () {
      return this.$store.state.cityId || 0
    },
    isLogin () {
      return !!this.$store.state.userInfo.id
    }
  },
  methods: {
    refreshDom () {
      // 计算是否使用 scroll pane
      this.$nextTick(() => {
        const dom = this.$refs.scrollPane.$refs.scrollWrapper
        this.scrollPaneWidth = dom.clientWidth
        // 跑气泡
        this.bubbleDown()
      })
    },
    // 切换类型
    handleChangeType (item) {
      this.currentTypeId = item.labelId
      this.getListsByPosition()
    },
    getListsByPosition () {
      this.getLoading = true
      getRapidlyDataByType({ page: 1, city: this.cityid, positionType: this.currentTypeId }).then(({ data }) => {
        this.getLoading = false
        let listData = data.data
        listData = listData.slice(0, 6)
        // 保存倒计时数据
        this.listCountDown = listData.map(val => {
          return {
            endTime: val.endTime,
            days: '',
            hours: '',
            mins: '',
            seconds: ''
          }
        })
        this.listData = listData
        // 跑倒计时
        this.setCountDown()
      }).catch(() => {
        this.getLoading = false
      })
    },
    setCountDown () {
      this.listCountDown.forEach(val => {
        const results = this.$util.setTimeDown(val.endTime)
        Object.assign(val, results)
      })
      clearTimeout(this.countDownTimer)
      this.countDownTimer = setTimeout(() => {
        this.setCountDown()
      }, 1000)
    },
    bubbleDown () {
      if (!this.bubbleList.length) return
      if (!this.$refs.bubble) {
        // un mounted
        window.clearTimeout(this.cryExecTimer)
        this.cryExecTimer = setTimeout(() => {
          this.bubbleDown()
        }, 500)
        return
      } else {
        window.clearTimeout(this.cryExecTimer)
        if (!this.$refs.bubble.querySelector('animation')) this.$refs.bubble.classList.add('animation')
      }
      this.bubbleDownTimer = setTimeout(() => {
        this.$refs.bubble.classList.remove('animation')
        if (this.bubbleIndex >= this.bubbleList.length - 1) {
          this.bubbleIndex = 0
        } else {
          this.bubbleIndex++
        }
        setTimeout(() => {
          this.bubbleDown()
        }, 200)
      }, 5000)
    },
    handleShowMore () {
      this.$router.push({ name: 'position24h' })
      /* if (!this.isLogin) {
        this.$router.push('/login?type=msgLogin')
      } else {
        // this.$store.commit('guideQrcodePop', { switch: true, type: 'to24Hours' })
        this.$router.push({ name: 'position24h' })
      } */
    }
  },
  watch: {
    cityid (value) {
      if (this.$route.name === 'index') {
        this.getListsByPosition()
        this.currentTypeId = 0
      }
    }
  },
  destroyed () {
    clearTimeout(this.countDownTimer)
    clearTimeout(this.bubbleDownTimer)
    clearTimeout(this.cryExecTimer)
  }
}
</script>
<style lang="scss" scoped>
.position-24h-wrapper {
  & /deep/ .el-loading-mask {
    background: rgba(255, 255, 255, 0.1);;
  }
}
.position-types{
  padding: 22px 0 7px;
  .scroll-pane {
    height: 22px;
  }
  ul {
    width: 100%;
    height: 22px;
    @include flex-v-center;
    flex-wrap: nowrap;
  }
  li {
    color: $title-color-2;
    font-size: 16px;
    border-bottom: 2px solid transparent;
    font-weight: 400;
    cursor: pointer;
  }
  li.active {
    color: $main-color-1;
    border-color: $border-color-2;
  }
  li:hover {
    color: $main-color-1;
  }
  li+li {
    margin-left: 52px;
  }
}
.active-header-wrapper {
  @include flex-v-center;
  height: 40px;
  margin-top: 56px;
  cursor: pointer;
  background: transparent;
  img {
    max-height: 100%;
    margin-right: 8px;
  }
  .header-img {
    max-height: 40px;
  }
  .position-tag {
    width: 100px;
    height: 30px;
    display: inline-block;
    position: relative;
    text-align: center;
    z-index: 2;
    color: $main-color-1;
    font-size: 12px;
    line-height: 30px;
    margin-left: 6px;
  }
  .position-tag::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 30px;
    top: 0;
    left: 0;
    transform: skew(-20deg);
    background: $bg-color-5;
  }
  .bubble-wrapper {
    width: 266px;
    text-align: center;
    margin-left: auto;
    overflow: hidden;
    p {
      border-radius: 15px;
      height: 30px;
      padding: 0 26px;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      font-size: 14px;
      line-height: 30px;
      opacity: 0;
      transform: translateY(30px);
      color: #fff;
      background: $bg-color-4;
    }
    p.animation {
      animation: bubble 5s 1;
    }
  }
}
.active-list {
  padding-top: 17px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  min-height: 220px;
  .active-lists-warpper {
    display: flex;
    flex-wrap: wrap;
  }
  .active-list-wrapper:nth-child(3n) {
    margin-right: 0px;
  }
}
.active-btn {
  text-align: center;
  .c-btn {
    width: 385px;
  }
}
@keyframes bubble{
  0% {}
  30% {
    transform: translateY(30px);
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(0);
    opacity: 1;
  }
  90% {
    opacity: 0;
    transform: translateY(-30px);
  }
}

</style>
