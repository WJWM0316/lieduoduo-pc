<template>
  <div class="">
    <div class="active-header-wrapper">
      <img src="../../../assets/images/index/title_24hour.png" />
      <span class="position-tag">高薪热门职位</span>
      <span class="position-tag">职业顾问服务</span>
      <span class="position-tag">200元到面红包</span>
      <div class="bubble-wrapper" v-if="bubbleList.length">
         <p>{{bubbleList[bubbleIndex]}}</p>
      </div>
    </div>
    <div class="active-list">
      <template v-for="(item,index) in listData">
        <router-link tag="div" :to="`/position/details?positionId=${item.id}`" class="active-list-wrapper" :key="item.lableId">
          <div class="list-header">
            <div class="list-image">
              <img :src="item.companyInfo.logoInfo.smallUrl" />
            </div>
            <div class="list-company">{{item.companyInfo.companyShortname}}</div>
            <div class="list-company-info">{{item.companyInfo.industry}}·{{item.companyInfo.employeesInfo}}·{{item.companyInfo.financingInfo}}</div>
          </div>
          <div class="list-position-info">
            <div>
              <span class="list-position-name">{{item.positionName}}</span>
              <span class="list-pay">{{item.emolumentMin}}~{{item.emolumentMax}} · {{item.annualSalaryDesc}}</span>
            </div>
            <div class="list-position-require">
              <span><i class="iconfont icon-dizhi"></i>{{item.city}}{{item.district}}</span>
              <span><i class="iconfont icon-zhiwei"></i>{{item.workExperienceName}}</span>
              <span><i class="iconfont icon-dizhi"></i>{{item.educationName}}</span>
            </div>
          </div>
          <div class="list-details">{{item.oneSentenceIntro || '-'}}</div>
          <div class="list-footer">
            <div class="count-down">
              <span>还剩</span>
              <span class="list-day">{{listCountDown[index].days}}</span>
              <span>天</span>
              <span class="list-hour">{{listCountDown[index].hours}}</span>:<span class="list-mins">{{listCountDown[index].mins}}</span>:<span class="list-second">{{listCountDown[index].seconds}}</span>
            </div>
            <div class="position-count">
              <p>还有<b>{{(item.seatsNum -  item.applyNum - item.natureApplyNum) > 99 ? '99+' : item.seatsNum -  item.applyNum - item.natureApplyNum}}</b>个席位</p>
              <span class="position-process">
                <span class="position-process-width" :style="{width: `${30 + item.applyNum/(item.seatsNum - item.natureApplyNum)*70}%`}"></span>
              </span>
            </div>
            <el-button type="primary" size="medium" style="width: 71px" round>马上抢</el-button>
          </div>
        </router-link>
      </template>
    </div>
    <div class="active-btn">
      <div class="c-btn c-big-btn">查看更多</div>
    </div>
  </div>
</template>
<script>
import { getRapidlyData } from 'API/common'
export default {
  data () {
    return {
      bubbleIndex: 0,
      bubbleList: [],
      listData: [],
      buttons: [],
      listCountDown: [] // 倒计时数据
    }
  },
  created () {
    this.getLists()
  },
  methods: {
    getLists () {
      getRapidlyData().then(({ data }) => {
        const { items, toastTips, buttons } = data.data
        this.listData = items.slice(0, 6)
        this.bubbleList = toastTips
        this.buttons = buttons
        // 保存倒计时数据
        this.listCountDown = this.listData.map(val => {
          return {
            endTime: val.endTime,
            days: '',
            hours: '',
            mins: '',
            seconds: ''
          }
        })
        // 跑倒计时
        this.setCountDown()
        // 跑气泡
        this.bubbleDown()
      })
    },
    setCountDown () {
      this.listCountDown.forEach(val => {
        const results = this.$util.setTimeDown(val.endTime)
        Object.assign(val, results)
      })
      this.countDownTimer = setTimeout(() => {
        this.setCountDown()
      }, 1000)
    },
    bubbleDown () {
      if (!this.bubbleList.length) return
      this.bubbleDownTimer = setTimeout(() => {
        if (this.bubbleIndex >= this.bubbleList.length - 1) {
          this.bubbleIndex = 0
        } else {
          this.bubbleIndex++
        }
        this.bubbleDown()
      }, 5000)
    }
  },
  destroyed () {
    clearTimeout(this.countDownTimer)
    clearTimeout(this.bubbleDownTimer)
  }
}
</script>
<style lang="scss" scoped>
.active-header-wrapper {
  @include flex-v-center;
  height: 64px;
  margin-top: 56px;
  background: transparent;
  img {
    max-height: 100%;
    margin-right: 8px;
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
      white-space: nowrap;
      font-size: 14px;
      line-height: 30px;
      opacity: 0;
      transform: translateY(30px);
      color: #fff;
      background: linear-gradient(to left, $main-color-2, $main-color-1);
      animation: bubble 5s infinite;
    }
  }
}
.active-list {
  padding-top: 17px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  .active-list-wrapper {
    width: 386px;
    overflow: hidden;
    margin-bottom: 20px;
    box-sizing: border-box;
    box-shadow: $shadow-1;
    border-radius:4px;
  }
  .active-list-wrapper:hover {
    box-shadow: $shadow-2;
  }
  .list-header {
    background-color: #fff;
    padding: 10px 16px;
    @include flex-v-center;
    color: $font-color-6;
    border-bottom: 1px dashed $border-color-1;
    .list-image {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
    }
    img {
      max-width: 100%;
    }
    .list-company {
      font-size: 14px;
      color: $title-color-1;
      padding-left: 6px;
      max-width: 120px;
      @include ellipsis;
    }
    .list-company-info {
      margin-left: auto;
      font-size: 12px;
    }
  }
  .list-position-info {
    padding: 18px;
    text-align: center;
    background-color: #fff;
    padding: 18px 16px;
  }
  .list-position-name {
    color: $title-color-1;
    font-size: 18px;
    font-weight: bold;
  }
  .list-pay {
    color: $error-color-1;
    font-size: 20px;
    font-weight: bold;
    padding-left: 14px;
  }
  .list-position-require {
    margin-top: 10px;
    font-size: 14px;
    color: $title-color-3;
    span + span {
      margin-left: 22px;
    }
    .iconfont {
      font-size: 14px;
      padding-right: 3px;
    }
  }
  .list-details {
    background: $bg-color-8;
    box-sizing: border-box;
    padding:10px 35px;
    height: 50px;
    width: 100%;
    font-size: 12px;
    line-height: 1.6;
    color: $font-color-10;
    @include ellipsis-two;
    -webkit-box-pack: center;
  }
  .list-footer {
    @include flex-v-center;
    box-sizing: border-box;
    background: $bg-color-9;
    padding: 10px 20px;
    height: 54px;
  }
  .count-down {
    color: $font-color-2;
    font-size: 14px;
    span {
      vertical-align: middle;
      display: inline-block;
    }
  }
  .list-day, .list-hour, .list-mins, .list-second {
    width: 24px;
    height: 24px;
    background: $font-color-2;
    color: $sub-color-1;
    line-height: 24px;
    text-align: center;
    border-radius:4px;
    margin: 0 3px;
  }
  .el-button {
    margin-left: auto;
    padding: 0;
    height: 34px;
  }
  .position-count {
    margin-left: 13px;
    p {
      font-size: 12px;
      color: $font-color-2;
      b {
        color: $main-color-1
      }
    }
    span {
      display: inline-block;
      height:8px;
      border-radius:4px;
    }
  }
  .position-process {
    background: #fff;
    width:79px;
    position: relative;
  }
  .position-process-width {
    background: $bg-color-4;
    position: absolute;
    left: 0;
    top: 0;
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
  100% {}
}

</style>
