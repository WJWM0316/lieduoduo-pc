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
        <el-carousel height="320px" :interval="3000" type="card" arrow="never">
          <el-carousel-item v-for="(item, index) in recruiterList" :key="index">
            <div class="carousel-item" @click="toNewPage(item, index, 'recruiter')">
              <img :src="item.pcImg.url"/>
              <div>
                <p class="carousel-realName">{{ item.realName }}</p>
                <p class="carousel-companyShortname">{{ item.companyShortname + '&nbsp;|&nbsp;' + item.position }}</p>
                <p class="carousel-intro">{{ item.intro }}</p>
                <div class="carousel-bnt">
                  <span>{{ item.positionNum }}</span>个高薪机会热抢中 >>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="dreamCity">
      <div class="dreamCity-box">
        <div class="dreamCity-box-btnList">
          <div class="dreamCity-btn" v-for="(item, index) in dreamCityList" :key="index" @click="dreamCityBntClick(index)" :class="{ 'dreamCity-btn-activity': index === dreamCityActivity }">
            <span>{{ item.areaName }}</span>
          </div>
        </div>
        <div class="dreamCity-box-companyList" v-if="companyNowList[0]">
          <el-carousel :interval="3000" height="655px" :arrow="companyNowList[0].length > 5 ? 'hover' :'never'">
            <el-carousel-item v-for="(item, index) in companyNowList" :key="index">
                <div class="dreamCity-box-companyList-item" v-for="(item1, index1) in item" :key="index1">
                  <div class="dreamCity-company" @click="toNewPage(item1, index1, 'company')">
                    <div class="dreamCity-companyImg">
                      <img :src="item1.logoInfo.smallUrl"/>
                    </div>
                    <div class="dreamCity-text">
                      <p class="dreamCity-companyShortname">{{ item1.companyShortname }}</p>
                      <p>{{ item1.industry + '&nbsp;|&nbsp;' + item1.financingInfo }}</p>
                    </div>
                  </div>
                  <div class="dreamCity-position">
                    <div class="dreamCity-positionList" v-for="(item2, index2) in item1.positionList" :key="index2" @click="toNewPage(item2, index2, 'position')">
                      <span class="dreamCity-positionList-name">{{ item2.positionName }}</span>
                      <span>{{ item2.emolumentMin + '-' + item2.emolumentMax + 'k'}}</span>
                    </div>
                  </div>
                </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="positionCard">
      <div class="positionCard-main" v-if="positionList[0]">
          <el-carousel :interval="3000" height="635px" :arrow="positionList[0].length > 11 ? 'hover' :'never'">
            <el-carousel-item v-for="(item, index) in positionList" :key="index">
            <div class="positionCard-wrap-item" v-for="(item1, index1) in positionList[index]" :key="index1" @click="toNewPage(item1, index1, 'position')">
              <p class="positionCard-positionName">{{ item1.positionName}}</p>
              <p class="positionCard-emolument">{{ item1.emolumentMin + "-" + item1.emolumentMax + "k·" + item1.annualSalary + "薪" }}</p>
              <p class="positionCard-city">
                <i class="iconfont icon-dizhi"></i>
                <span>{{ item1.city + item1.district }}</span>
                <i class="iconfont icon-zhiwei"></i>
                <span>{{ item1.workExperienceName }}</span>
                <i class="iconfont icon-jiaoyu"></i>
                <span>{{ item1.educationName }}</span>
              </p>
              <div class="positionCard-companyInfo"  v-if="item1.companyInfo">
                <div class="positionCard-companyInfo-logo">
                  <img :src="item1.companyInfo.logoInfo.smallUrl"/>
                </div>
                <span>{{ item1.companyInfo.companyShortname + '·' + item1.companyInfo.financingInfo}}</span>
              </div>
            </div>
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="partner"></div>
    <div class="footer">
      <div class="join">
        <div class="btntips">点击下方按钮，马上进驻招聘专场</div>
        <div class="forward">
        <img :src="cdnPath + 'forward.png'" alt="">
        </div>
        <div class="btn" @click="toQuestionnaire">公司免费进驻</div>
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
      positionList: [], // 职位卡片列表
      dreamCityList: [], // 城市按钮
      companyList: [], // 公司卡片总数组
      companyNowList: [], // 当前所在城市的数组
      recruiterList: [], // 招聘官列表
      dreamCityActivity: 0
    }
  },
  methods: {
    dreamCityBntClick (index) {
      this.dreamCityActivity = index
      this.companyNowList = this.companyList[index]
    },
    toNewPage (item, index, identity) { // 'company', 'position', 'recruiter'
      console.log(item, index, identity)
      let routeTo = {}
      switch (identity) {
        case 'company':
          routeTo = this.$router.resolve({
            path: 'company/details',
            query: {
              vkey: item.vkey
            }
          })
          break
        case 'position':
          routeTo = this.$router.resolve({
            path: 'position/details',
            query: {
              positionId: item.positionId
            }
          })
          break
        case 'recruiter':
          console.log(1) // 待定
          break
      }
      window.open(routeTo.href, '_blank')
    },
    toQuestionnaire () {
      window.open('https://www.wjx.top/jq/41711237.aspx', '_blank')
    }
  },
  mounted () {
    getDiscoListApi({ vkey: 'sdfdafdt' }).then(res => {
      // 招聘官列表
      this.recruiterList = res.data.data.recruiter
      // 职位列表
      let positionList = res.data.data.position
      positionList.forEach((item, index) => {
        const page = Math.floor(index / 12)
        if (!this.positionList[page]) {
          this.positionList[page] = []
        }
        this.positionList[page].push(item)
      })
      // 梦想城市列表
      let dreamCityList = res.data.data.company
      this.dreamCityList = res.data.data.company
      dreamCityList.forEach((item, index) => {
        let cumulative = []
        item.companyList.forEach((item1, index1) => {
          const page = Math.floor(index1 / 6)
          if (!cumulative[page]) {
            cumulative[page] = []
          }
          cumulative[page].push(item1)
        })
        this.companyList.push(cumulative)
      })
      this.companyNowList = this.companyList[0]
      // 拿到数据后渲染一次页面
      this.$forceUpdate()
    })
  }
}
</script>

<style lang="scss" scoped>
// 颜色配置
$font-color1: #333333;
$font-color2: #6D696E;
$font-color3-icon: #cbcacd;
$font-color4: #FA0974;
$font-color5: #232021;

$border-color1: #CBCACD;

$bg-color1: #2C045D;

// img border-radius
@mixin img-radius($height, $width, $radius:50%, $bgcolor: #fff) {
  width: $height;
  height: $width;
  border-radius: $radius;
  background: $bgcolor;
  overflow: hidden;
  text-align: center;
  &::after {
    content: "";
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  img {
   vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }
}

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
      background: $font-color4;
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
// 放到外层减少嵌套
// 梦想召集人 || 招聘官列表
.carousel{
  background: url(#{$image-cdn-url}/images/discoPC_2_03.jpg) no-repeat;
  background-position: center center;
  width: 100%;
  height: 564px;
  padding-top: 200px;
  box-sizing: border-box;
  position: relative;
}
.carousel-box{
  position: absolute;
  left: 54%;
  transform: translateX(-50%);
}
.carousel-item{
  background: url(#{$image-cdn-url}/images/discoPC_2_10.png) no-repeat;
  background-size: 100% 100%;
  width: 475px;
  height: 275px;
  margin: 0;
  position: relative;
  padding: 38px 37px 32px 220px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  img{
    width: 199px;
    height: 289px;
    position: absolute;
    left: 3px;
    bottom: 3px;
  }
  .carousel-realName{
    font-size:26px;
    font-weight: bold;
  }
  .carousel-companyShortname{
    font-size: 16px;
    font-weight: 400;
    opacity: 0.6;
    margin-top: 10px;
  }
  .carousel-intro{
    font-size:16px;
    font-weight:400;
    margin-top: 30px;
    position: relative;
    line-height:25px;
    &::after{
      content: '';
      display: inline-block;
      opacity: 0.2;
      width: 211px;
      height: 1px;
      background: #ffffff;
      position: absolute;
      top: -23px;
      left: 0;
    }
  }
  .carousel-bnt{
    width: 213px;
    height: 39px;
    border-radius: 26px;
    background: $font-color4;
    margin-top: 30px;
    text-align: center;
    line-height: 39px;
    font-weight:500;
    span{
      color: #FFDC39;
    }
  }
}
// 梦想城市
.dreamCity{
  background: url(#{$image-cdn-url}/images/discoPC_2_04.jpg) no-repeat;
  background-position: top center;
  width: 100%;
  height: 827px;
  box-sizing: border-box;
  padding-top: 230px;
  position: relative;
}
.dreamCity-box{
  margin: 0 auto;
  position: relative;
  z-index: 1;
  .dreamCity-box-btnList{
    display: flex;
    justify-content: center;
    .dreamCity-btn{
      display: inline-block;
      background: $bg-color1;
      width: 124px;
      height: 70px;
      border-radius: 30px;
      text-align: center;
      margin-right: 26px;
      position: relative;
      cursor: pointer;
      &::after{
        content: '';
        display: inline-block;
        width: 130px;
        height: 76px;
        border-radius: 30px;
        position: absolute;
        left: -3px;
        top: -3px;
        z-index: -1;
        background: linear-gradient(269deg, rgba(136,49,250,1), rgba(222,75,253,1), rgba(63,94,255,1));
      }
      span{
        color: #ffffff;
        font-size: 24px;
        font-weight: 500;
        line-height: 70px;
      }
    }
    .dreamCity-btn-activity{
      background: linear-gradient(0deg,rgba(82,25,138,1),rgba(167,20,255,1));
      &::before{
        content: '';
        display: inline-block;
        width: 0px;
        height: 0px;
        border-width: 9px;
        border-style: solid;
        border-color: #D03BFB transparent transparent;
        position: absolute;
        bottom: -55px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
// 公司列表卡片
.dreamCity-box-companyList{
  // overflow: hidden;
  width: 1313px;
  margin: 78px auto 0 auto;
  height: 620px;
  position: relative;
  z-index: 0;
}
.dreamCity-box-companyList-item{
  display: inline-block;
  width: 344px;
  height: 274px;
  margin: 3px 31px 30px 3px;
  background: #ffffff;
  vertical-align: middle;
  border-radius:10px;
  position: relative;
  &::after{
    content: '';
    display: inline-block;
    border-radius: 10px;
    height: 280px;
    width: 350px;
    position: absolute;
    left: -3px;
    top: -3px;
    bottom: -3px;
    right: -3px;
    z-index: -1;
    background: linear-gradient(-70deg, rgba(233,73,252,1), rgba(136,49,250,1), rgba(63,94,255,1));
  }
  &:nth-child(3n){
    margin-right: 0;
  }
  .dreamCity-company{
    cursor: pointer;
    box-sizing: border-box;
    width: 344px;
    height: 110px;
    background: linear-gradient(-80deg,#601689, #39218a);
    border-radius: 10px 10px 0 0 ;
    padding: 18px 24px 18px 24px;
    display: flex;
    align-items: center;
    .dreamCity-companyImg{
      @include img-radius(74px, 74px, 10px, (-80deg, #39218a,#601689));
    }
    .dreamCity-text{
      margin-left: 16px;
      vertical-align: middle;
      color: #ffffff;
      font-weight:300;
      font-size: 18px;
      .dreamCity-companyShortname{
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 11px;
      }
    }
  }
  .dreamCity-position{
    padding: 0 32px 30px 27px;
    .dreamCity-positionList{
      height:38px;
      line-height: 38px;
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size:21px;
      color: $font-color4;
      white-space: nowrap;
      cursor: pointer;
      &:hover{
        background: #F3EDF8;
        border-radius: 4px;
      }
      .dreamCity-positionList-name{
        width: 200px;
        font-weight:400;
        color: $font-color5;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
// 职位列表
.positionCard{
  background: url(#{$image-cdn-url}/images/discoPC_2_06.jpg) no-repeat;
  background-position: top center;
  width: 100%;
  height: 1146px;
  position: relative;
  z-index: 0;
}
.positionCard-main{
  position: absolute;
  bottom: 115px;
  left: 50%;
  transform: translateX(-50%);
}
.positionCard-wrap-item{
  cursor: pointer;
  display: inline-block;
  width: 276px;
  height: 164px;
  border-radius: 10px;
  margin: 0 26px 23px 3px;
  background: #ffffff;
  position: relative;
  vertical-align: middle;
  padding: 20px 13px 14px 15px;
  box-sizing: border-box;
  margin-top: 3px;
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
  &:nth-child(4n){
    margin-right: 0;
  }
  .positionCard-positionName{
    font-size: 16px;
    font-weight: 500;
    color: $font-color1;
  }
  .positionCard-emolument{
    font-size: 18px;
    font-weight: 500;
    color: $font-color4;
    margin-top: 8px;
  }
  .positionCard-city{
    font-size: 12px;
    font-weight: 400;
    color: $font-color2;
    margin-top: 11px;
    i{
      font-size: 14px;
      color: $font-color3-icon;
    }
    span{
      display: inline-block;
      margin: 0 14px 0 4px;
    }
  }
  .positionCard-companyInfo{
    box-sizing: border-box;
    margin-top: 12px;
    border-top: 1px dashed $border-color1;
    padding-top: 13px;
    .positionCard-companyInfo-logo{
      display: inline-block;
      vertical-align: middle;
      @include img-radius(35px, 35px)
    }
    span{
      display: inline-block;
      margin-left: 8px;
      vertical-align: middle;
      font-size: 14px;
    }
  }
}
</style>
<style>
@media screen and (max-width: 1400px) {
    .dream .positionCard .el-carousel--horizontal{
      padding: 0 !important;
    }
    .dream .dreamCity .el-carousel--horizontal{
      padding: 0 !important;
    }
    .dream .el-carousel__arrow--left{
      left: 17px !important;
    }
    .dream .el-carousel__arrow--right{
      right: 17px !important;
    }
    .dreamCity-box-companyList{
      width: 1100px !important;
    }
}
/* 梦想召集人 */
.dream .carousel .el-carousel__mask{
  opacity: 0.01;
  border-radius: 60px;
  width: 475px;
  height: 275px;
  z-index: 20;
}
.dream .carousel .el-carousel__item--card{
  opacity: 0.1;
}
.dream .carousel .el-carousel--horizontal{
  padding-left: 20px;
  padding-top: 20px;
  width: 1300px;
}
.dream .carousel .is-active{
  opacity: 1 !important;
}
.dream .el-carousel__indicators--outside{
  padding-right: 150px;
}
.dream .carousel .is-in-stage{
  opacity: 0.3;
  width: 475px;
  overflow: visible;
}

/* 梦想城市 */
.dream .dreamCity .el-carousel--horizontal{
  padding-left: 106px;
  box-sizing: content-box;
  padding-right: 107px;
  width: 1106px;
}

/* 梦想职位 */
.dream .positionCard .el-carousel--horizontal{
  padding-left: 106px;
  box-sizing: content-box;
  padding-right: 107px;
  width: 1200px;
}

/* 轮播公共样式 */

/* 左右按钮 */
.dream .el-carousel__arrow--left{
  left: -107px;
}
.dream .el-carousel__arrow--right{
  right: -107px;
}
.dream .el-carousel__arrow{
  background: #320952;
  font-size: 25px;
  height: 90px;
  width: 90px;
  top: 45%;
}
/* 底部按钮 */
.dream .el-carousel__button{
  opacity: 0.3;
  border-radius: 50%;
  background: #FA0974;
  width: 11px;
  height: 11px;
}
</style>
