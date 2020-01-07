<template>
  <div class="dream">
    <div class="benner"></div>
    <div class="text-wrap">
      <p class="text-wrap-text">
        2020大幕拉开<br/>每一个努力拼搏的你<br/>都值得拥有实现梦想的舞台<br/>猎多多助你奏响<br/>新年逐梦之音<br/>
      </p>
    </div>
    <div class="carousel">
      <div class="carousel-box">
        <el-carousel height="275px" :interval="4000" type="card" indicator-position="none" :autoplay="false" arrow="never">
          <el-carousel-item >
            <div class="carousel-item"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="dreamCity">

    </div>
    <div class="positionCard">
      <div class="positionCard-main">
        <div class="positionCard-main-box">
          <div class="positionCard-wrap" v-for="(item, index) in positionList" :key="index">
            <div class="positionCard-wrap-item" v-for="(item1, index1) in positionList[index]" :key="index1">
              <p class="positionCard-positionName">{{ item1.positionName}}</p>
              <p class="positionCard-emolument">{{ item1.emolumentMin + "-" + item1.emolumentMax + "k·" + item1.annualSalary + "薪" }}</p>
              <p class="positionCard-city">
                <i class="iconfont icon-dizhi"></i>
                <span>{{ item1.city + item1.district }}</span>
                <i class="iconfont icon-zhiwei"></i>
                <span>{{ item1.workExperienceName }}</span>
                <i class="iconfont icon-zhiwei"></i>
                <span>{{ item1.educationName }}</span>
              </p>
              <div class="positionCard-">
                <img />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="partner"></div>
    <div class="footer">
      <div class="join">
        <div class="btntips">点击下方按钮，马上进驻招聘专场</div>
        <div class="forward">
        <img :src="cdnPath + 'forward.png'" alt="">
        </div>
        <div class="btn" id="company_enter">公司免费进驻</div>
        <div class="phone">
          <span class="title">咨询请致电：</span>
          <span class="num">400-065-5788</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDiscoListApi
} from '@/api/dreamDisco.js'

export default {
  data () {
    return {
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`,
      positionList: []
    }
  },
  // methods () {

  // },
  mounted () {
    getDiscoListApi({ vkey: 'sdfdafdt' }).then(res => {
      // 职位列表
      let positionList = res.data.data.position
      positionList.forEach((item, index) => {
        const page = Math.floor(index / 12)
        if (!this.positionList[page]) {
          this.positionList[page] = []
        }
        this.positionList[page].push(item)
      })
      this.$forceUpdate()
    })
  }
}
</script>

<style lang="scss" scoped>
.dream{
  width: 100%;
  background: #170030;
  .benner{
    height: 718px;
    width: 100%;
    background: url(#{$image-cdn-url}/images/discoPC_2_01.jpg) no-repeat;
    background-position: center center;
  }
  .text-wrap{
    background: url(#{$image-cdn-url}/images/discoPC_2_02.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 524px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text-wrap-text{
      font-size:25px;
      font-weight:500;
      color: #ffffff;
      line-height:57px;
      text-align: center;
    }
  }
  .carousel{
    background: url(#{$image-cdn-url}/images/discoPC_2_03.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 564px;
    .carousel-box{
      width: 1146px;
      /deep/ .el-carousel__item .carousel-item{
        background: url(#{$image-cdn-url}/images/discoPC_2_10.png) no-repeat;
        background-size: 100% 100%;
        width: 475px;
        height: 275px;
        margin: 0;
      }
      /deep/ .el-carousel__item--card .is-active{
        width: 475px;
      }
      /deep/ .el-carousel__item--card .is-in-stage{

      }
    }
  }
  .dreamCity{
    background: url(#{$image-cdn-url}/images/discoPC_2_04.jpg) no-repeat;
    background-position: top center;
    width: 100%;
    height: 827px;
  }
  .partner{
    background: url(#{$image-cdn-url}/images/discoPC_2_08.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 388px;
  }
  .footer{
    background: url(#{$image-cdn-url}/images/discoPC_2_09.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 533px;
    .join{
      width: 420px;
      margin: 0 auto;
      margin-top: 110px;
    }
    .btntips{
      font-size:28px;
      color:#fff;
    }
    .btn{
      width:272px;
      height:56px;
      line-height: 56px;
      text-align: center;
      color: #ffffff;
      font-size: 28px;
      margin: 0 auto 34px;
      font-weight: bold;
      cursor: pointer;
      border-radius:28px;
      background: #FA0974;
    }
    .forward{
      width:19px;
      height:33px;
      margin: 20px auto 18px auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .phone{
      font-size: 24px;
      display: flex;
      justify-content: center;
      .title{
        color: #fff;
      }
      .num{
        color: #16FEFF;
        font-weight: bold;
      }
    }
  }
}
// 放到底部减少嵌套
.positionCard{
    background: url(#{$image-cdn-url}/images/discoPC_2_06.jpg) no-repeat;
    background-position: top center;
    width: 100%;
    height: 1146px;
    position: relative;
    z-index: 0;
}
.positionCard-main{
  width: 1226px;
  overflow: hidden;
  position: absolute;
  bottom: 175px;
  left: 50%;
  transform: translateX(-50%);
}
.positionCard-main-box{
  white-space: nowrap;
  .positionCard-wrap{
    display: inline-block;
    width: 1226px;
    white-space: normal;
    vertical-align: top;
    .positionCard-wrap-item{
      display: inline-block;
      width: 276px;
      height: 164px;
      border-radius: 10px;
      margin: 3px 0 23px 26px;
      background: #ffffff;
      position: relative;
      vertical-align: middle;
      &::after{
        content: '';
        display: inline-block;
        border-radius: 10px;
        height: 170px;
        width: 282px;
        position: absolute;
        left: -3px;
        top: -3px;
        bottom: -3px;
        right: -3px;
        z-index: -1;
        background: linear-gradient(-70deg, rgba(233,73,252,1), rgba(136,49,250,1), rgba(63,94,255,1));
      }
    }
  }
}

</style>
