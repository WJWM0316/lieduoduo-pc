<template>
  <div class="dream">
    <div class="banner">
      <div class="banner-warp">
        <!-- <el-popover
          placement="top"
          popper-class="dream-share-wechat"
          width="100">
          <img style="max-width:100%; max-height:100%" :src="cdnPath + 'dreamCode.jpg'" alt="">
          <div class="header-wechat-shart"  slot="reference">
            <i class="iconfont icon-weixin"></i> 微信分享
          </div>
        </el-popover> -->
      </div>
    </div>
    <div class="text-wrap">
      <p class="text-wrap-text">
        在职场进阶的路上，女精英们都经历着从女孩到女王的蜕变<br/>高薪工作和精致生活也是当代女王们的必备修养<br/>值此3.7女生节之际<br/>
        <span>猎多多特定职场女王招聘专场，联动众品牌为女王们送去福利</span><br/><span>陪你一起修炼成为全能的职场女王</span>
      </p>
    </div>
    <div class="carousel">
      <div class="carousel-box">
        <el-carousel height="320px" :interval="5000" type="card" arrow="never">
          <el-carousel-item v-for="(item, index) in recruiterList" :key="index">
            <div v-if="item.info.recruiterInfo
            " class="carousel-item" @click="toNewPage(item, index, 'recruiter')">
              <img :src="item.info.arrImage[1]"/>
              <div>
                <p class="carousel-realName">{{ item.info.recruiterInfo.realname }}</p>
                <p class="carousel-companyShortname">{{ item.info.recruiterInfo.companyShortname + '&nbsp;|&nbsp;' + item.info.recruiterInfo.position }}</p>
                <p class="carousel-intro">{{ item.info.arrText[0] }}</p>
                <div class="carousel-bnt">
                  <span>{{ item.info.recruiterInfo.positionNum }}</span>个高薪机会热抢中 >>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="dreamCity">
      <div class="dreamCity-box">

        <div class="dreamCity-box-companyList" v-if="dreamCityList[0]">
          <el-carousel :interval="5000" height="580px" :arrow="dreamCityList[1] ? 'hover' :'never'">
            <el-carousel-item v-for="(item, index) in dreamCityList" :key="index">
                <div class="dreamCity-box-companyList-item" v-for="(item1, index1) in item" :key="index1">
                  <div class="dreamCity-company" @click="toNewPage(item1, index1, 'company')">
                    <div class="dreamCity-companyImg">
                      <img v-if="item1.info.companInfo" :src="item1.info.companInfo.logo"/>
                    </div>
                    <div class="dreamCity-text">
                      <p class="dreamCity-companyShortname">{{ item1.info.companInfo.companyShortname }}</p>
                      <p>{{ item1.info.companInfo.industry + '&nbsp;|&nbsp;' + item1.info.companInfo.financingInfo }}</p>
                    </div>
                  </div>
                  <div class="dreamCity-position">
                    <div class="dreamCity-positionList" v-for="(item2, index2) in item1.info.arrPosition" :key="index2" @click="toNewPage(item2, index2, 'companyPosition')">
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
      <div class="dreamCity-box-btnList">
          <div class="dreamCity-btn" v-for="(item, index) in positionType" :key="index" @click="positionBntClick(index)" :class="{ 'dreamCity-btn-activity': index === positionActivity }">
            <span>{{ item.title }}</span>
          </div>
        </div>
      <div class="positionCard-main" v-if="positionNowList[0]">
          <el-carousel :interval="5000" height="635px" :arrow="positionNowList.length > 1 ? 'hover' :'never'">
            <el-carousel-item v-for="(item, index) in positionNowList" :key="index">
            <div class="positionCard-wrap-item" v-for="(item1, index1) in positionNowList[index]" :key="index1" @click="toNewPage(item1, index1, 'position')">
              <p class="positionCard-positionName">{{ item1.info.positionInfo.positionName}}</p>
              <p class="positionCard-emolument">{{ item1.info.positionInfo.emolumentMin + "-" + item1.info.positionInfo.emolumentMax + "k·" + item1.info.positionInfo.annualSalary + "薪" }}</p>
              <p class="positionCard-city">
                <i class="iconfont icon-dizhi"></i>
                <span>{{ item1.info.positionInfo.city + item1.info.positionInfo.district }}</span>
                <i class="iconfont icon-zhiwei"></i>
                <span>{{ item1.info.positionInfo.workExperienceName }}</span>
                <i class="iconfont icon-jiaoyu"></i>
                <span>{{ item1.info.positionInfo.educationName }}</span>
              </p>
              <div class="positionCard-companyInfo"  v-if="item1.info.positionInfo">
                <div class="positionCard-companyInfo-logo">
                  <img :src="item1.info.positionInfo.logo"/>
                </div>
                <span>{{ item1.info.positionInfo.companyShortname + '·' + item1.info.positionInfo.financingInfo}}</span>
              </div>
            </div>
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="partner"></div>
    <div class="welfare"></div>
    <div class="footer">
      <div class="footer-btn" id="get-welfare" @click="pop">一键领取</div>
      <div class="footer-text">前往【猎多多】官方微博，还有更多<span> # 品牌福利抽奖互动 # </span>等你喔~</div>
    </div>
    <pop v-if="popShow"></pop>
  </div>
</template>

<script>
import {
  getZtDiscoListApi,
  getStaDiscoListApi
} from '@/api/dreamDisco.js'

import pop from './components/pop'

export default {
  data () {
    return {
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`,
      positionList: [], // 职位卡片列表
      dreamCityList: [], // 公司卡片
      positionNowList: [], // 当前所在职位的数组
      recruiterList: [], // 招聘官列表
      positionType: [], // 职位类型按钮
      positionActivity: 0,
      popShow: false
    }
  },
  components: {
    pop
  },
  methods: {
    positionBntClick (index) {
      this.positionActivity = index
      this.positionNowList = this.positionList[index]
    },
    toNewPage (item, index, identity) { // 'company', 'position', 'recruiter'
      let routeTo = {}
      let data = {
        vkey: 'queen_sourceType',
        wherefrom: 1
      }
      switch (identity) {
        case 'company':
          routeTo = this.$router.resolve({
            path: '/company/details',
            query: {
              vkey: item.info.companInfo.vkey,
              sourceType: 'hd_queen_web'
            }
          })
          data.id = item.info.companInfo.id
          break
        case 'position':
          routeTo = this.$router.resolve({
            path: '/position/details',
            query: {
              positionId: item.info.positionInfo.id,
              sourceType: 'hd_queen_web'
            }
          })
          data.id = item.info.positionInfo.id
          break
        case 'companyPosition':
          routeTo = this.$router.resolve({
            path: '/position/details',
            query: {
              positionId: item.id,
              sourceType: 'hd_queen_web'
            }
          })
          identity = 'position'
          data.id = item.id
          break
        case 'recruiter':
          routeTo = this.$router.resolve({
            path: '/company/details',
            query: {
              vkey: item.info.recruiterInfo.vkey,
              type: 'position',
              sourceType: 'hd_queen_web'
            }
          })
          data.id = item.uid
          break
      }
      data.type = identity
      getStaDiscoListApi(data).then()
      window.open(routeTo.href, '_blank')
    },
    pop () {
      this.popShow = true
    }
  },
  mounted () {
    // 百度统计
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?50405859f2a8a0ac9cad90eaf7b555eb'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)

    getZtDiscoListApi({ vkey: 'queen_sourceType' }).then(res => {
      console.log(res.data.data)
      // 招聘官列表
      this.recruiterList = res.data.data[0].categoryClassList[0].categoryTypeList

      // 公司列表
      this.dreamCityList = res.data.data[1].categoryClassList[0].categoryTypeList
      let cumulative = []
      this.dreamCityList.forEach((item, index) => {
        const page = Math.floor(index / 6)
        if (!cumulative[page]) {
          cumulative[page] = []
        }
        cumulative[page].push(item)
      })
      this.dreamCityList = cumulative

      // 职位列表
      let positionType = res.data.data[2].categoryClassList
      this.positionType = res.data.data[2].categoryClassList
      positionType.forEach((item, index) => {
        let cumulative = []
        item.categoryTypeList.forEach((item1, index1) => {
          const page = Math.floor(index1 / 12)
          if (!cumulative[page]) {
            cumulative[page] = []
          }
          cumulative[page].push(item1)
        })
        this.positionList.push(cumulative)
      })
      this.positionNowList = this.positionList[this.positionActivity]

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
$font-color4: #F7278A;
$font-color5: #232021;

$border-color1: #CBCACD;

$bg-color1: #F076B7;

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
  background: #F6E6FF;
  .banner{
    height: 609px;
    width: 100%;
    background: url(#{$image-activity-cdn-url}/queen_pc/queen_01.jpg) no-repeat;
    background-position: center center;
    .banner-warp{
      width: 1200px;
      margin: 0 auto;
      position: relative;
    }
    .header-wechat-shart {
      position: absolute;
      background: rgba( #fff, 0.2);
      color: #fff;
      border-radius: 4px;
      right: 0;
      top: 52px;
      padding: 7px 20px;
      cursor: pointer;
    }
  }
  .text-wrap{
    background: url(#{$image-activity-cdn-url}/queen_pc/queen_02.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 364px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text-wrap-text{
      font-size: 22px;
      font-weight: 500;
      color: #CD2A6D;
      line-height: 45px;
      text-align: center;
      margin-top: -22px;
      span{
        font-weight: 600;
        border-bottom: 2px solid #CD2A6D;
        display: inline-block;
      }
    }
  }
  .partner{
    background: url(#{$image-activity-cdn-url}/queen_pc/queen_07.jpg?a=1) no-repeat;
    background-position: center center;
    width: 100%;
    height: 580px;
  }
  .welfare{
    background: url(#{$image-activity-cdn-url}/queen_pc/queen_08.jpg?a=1) no-repeat;
    background-position: center center;
    width: 100%;
    height: 703px;
  }
  .footer{
    background: url(#{$image-activity-cdn-url}/queen_pc/queen_09.jpg) no-repeat;
    background-position: center center;
    width: 100%;
    height: 386px;
    padding-top: 45px;
    box-sizing: border-box;
    .footer-btn{
      text-align: center;
      color: #fff;
      width: 380px;
      height: 106px;
      background: url(#{$image-activity-cdn-url}/queen_pc/queen_btn.png) no-repeat;
      background-size: center center;
      font-size: 30px;
      font-weight: 500;
      line-height: 100px;
      margin: 0 auto;
      letter-spacing: 6px;
    }
    .footer-text{
      font-size: 18px;
      color: #CD2A6D;
      margin-top: 115px;
      text-align: center;
      span{
        font-weight: 600;
      }
    }
  }
}
// 放到外层减少嵌套
// 招聘官列表
.carousel{
  background: url(#{$image-activity-cdn-url}/queen_pc/queen_03.jpg) no-repeat;
  background-position: bottom center;
  width: 100%;
  height: 571px;
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
  background: url(#{$image-activity-cdn-url}/queen_pc/queen_10.jpg) no-repeat;
  background-size: 100% 100%;
  width: 475px;
  height: 275px;
  margin: 0;
  position: relative;
  padding: 38px 37px 32px 220px;
  box-sizing: border-box;
  color: #CD2A6D;
  cursor: pointer;
  img{
    width: 199px;
    height: 289px;
    position: absolute;
    left: 5px;
    bottom: 5px;
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
    color: #333333;
    &::after{
      content: '';
      display: inline-block;
      opacity: 0.2;
      width: 211px;
      height: 1px;
      background: #CD2A6D;
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
    color: #ffffff;
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
  background: url(#{$image-activity-cdn-url}/queen_pc/queen_04.jpg) no-repeat;
  background-position: top center;
  width: 100%;
  height: 873px;
  box-sizing: border-box;
  padding-top: 230px;
  position: relative;
}
.dreamCity-box{
  margin: 0 auto;
  position: relative;
  z-index: 1;

}
// 公司列表卡片
.dreamCity-box-companyList{
  // overflow: hidden;
  width: 1313px;
  margin: 0 auto;
  height: 580px;
  position: relative;
  z-index: 0;
}
.dreamCity-box-btnList{
    width: 750px;
    position: absolute;
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
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
    span{
      color: #ffffff;
      font-size: 24px;
      font-weight: 500;
      line-height: 70px;
    }
  }
  .dreamCity-btn-activity{
    background: #CD2A6D;
    &::before{
      content: '';
      display: inline-block;
      width: 0px;
      height: 0px;
      border-width: 9px;
      border-style: solid;
      border-color: #CD2A6D transparent transparent;
      position: absolute;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.dreamCity-box-companyList-item{
  display: inline-block;
  width: 344px;
  height: 240px;
  margin: 3px 25px 24px 3px;
  background: #ffffff;
  vertical-align: middle;
  border-radius:10px;
  position: relative;
  box-shadow:1px 2px 13px 0px rgba(243,215,247,1);
  &:nth-child(3n){
    margin-right: 0;
  }
  .dreamCity-company{
    cursor: pointer;
    box-sizing: border-box;
    width: 344px;
    height: 110px;
    background:linear-gradient(-15deg,rgba(240,144,184,1),rgba(223,61,128,1));
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
      cursor: pointer;
      .dreamCity-companyShortname{
        cursor: pointer;
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 11px;
      }
      p{
        cursor: pointer;
      }
    }
  }
  .dreamCity-position{
    padding: 9px 17px 0 17px;
    .dreamCity-positionList{
      padding: 0 10px;
      height: 45px;
      line-height: 43px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size:21px;
      color: $font-color4;
      white-space: nowrap;
      cursor: pointer;
      &:hover{
        background: #FBE2F8;
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
  background: url(#{$image-activity-cdn-url}/queen_pc/queen_05.jpg) no-repeat, url(#{$image-activity-cdn-url}/queen_pc/queen_06.jpg) no-repeat;
  background-position: top center, bottom center;
  width: 100%;
  height: 1046px;
  // margin-top: 100px;
  position: relative;
  z-index: 0;
}
.positionCard-main{
  position: absolute;
  top: 300px;
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
  border: 2px solid #da4783;
  &:nth-child(4n){
    margin-right: 0;
  }
  .positionCard-positionName{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 240px;
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

.dream-share-wechat.el-popper {
  min-width: 105px;
  height: 105px;
  padding: 5px;
  box-sizing: border-box;
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
  left: -105px;
}
.dream .el-carousel__arrow--right{
  right: -105px;
}
.dream .el-carousel__arrow{
  background: #524b5859;
  font-size: 25px;
  height: 90px;
  width: 90px;
  top: 45%;
}
/* 底部按钮 */
.dream .el-carousel__button{
  opacity: 0.3;
  border-radius: 50%;
  background: #CD2A6D;
  width: 11px;
  height: 11px;
}
</style>
