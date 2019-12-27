<template>
<div class="originality">
  <div class="first-bg">
    <div class="wxshare">
    <el-popover
      placement="top"
      popper-class="position-24h-share-wechat"
      :width="100">
      <img style="max-width:100%; max-height:100%" :src="cdnPath + 'originality.jpg'" alt="">
      <div class="header-wechat-shart"  slot="reference">
        <i class="iconfont icon-weixin"></i> 微信分享
      </div>
    </el-popover>
    </div>
  </div>
  <div class="second-bg"></div>
  <div class="third-bg">
    <div class="desc">
      <p>当我们回顾 2019 营销事件的时候，私域流量、Vlog、直播带货、跨界营销……各种新事物、新玩法，也让更多企业在其中获得刷屏级的效果。<br/>结合人气指数、项目评分、评论互动等多项指标，甄选出本年度热议营销事件操盘企业。加入他们，获得更多机会和空间，成为下一个营销事件的制造者，成就你的职业之路。</p>
    </div>
  </div>
  <div class="fourth-bg">
    <div class="enterprise clearfix">
      <div class="clearfix" id="company_recruit-Market">
      <div class="item" :key="i" v-for="(item, i) in companylist">
        <div class="logo">
          <div class="img" @click="tocompanydetail(item)">
            <img :src="item.companyLogoInfo.smallUrl" alt="">
          </div>
          <div class="number" v-if="item.isHotFavored" @click.stop="givethumbsup(item)">
            <img :src="cdnPath + 'fire.png'" alt="">
            <span>{{item.hotFavorCount}}</span>
          </div>
          <div class="nozan" @click.stop="givethumbsup(item)">
            <div class="semicircle">
              <img :src="cdnPath + 'fire.png'" alt="">
            </div>
            <span>{{item.hotFavorCount}}</span>
          </div>
        </div>
        <div class="name">{{item.companyShortname}}</div>
      </div>
      </div>
    </div>
  </div>
  <div class="fifth-bg">
    <div class="position">
      <div id="position_recruit-Market">
      <div class="companyitem" :key="i" v-for="(item, i) in positionlist" @click.stop="topositiondetail(item)">
        <div class="positionname">{{item.positionName}}</div>
        <div class="price">{{item.emolumentMin}}-{{item.emolumentMax}}k<span v-if="item.annualSalary >= 12">·{{item.annualSalary}}薪</span></div>
        <div class="address">
          <div class="addressname" v-if="item.city">
            <i class="iconfont icon-dizhi"></i>
            <span>{{item.city}}{{item.district}}</span>
          </div>
          <div class="addressname" v-if="item.workExperienceName">
            <i class="iconfont icon-zhiwei"></i>
            <span>{{item.workExperienceName}}</span>
          </div>
          <div class="addressname" v-if="item.educationName">
            <i class="iconfont icon-jiaoyu"></i>
            <span>{{item.educationName}}</span>
          </div>
        </div>
        <div class="dottedlien"></div>
        <div class="financing">
          <div class="cplogo">
            <img :src="item.logoInfo.smallUrl" alt="">
          </div>
          <div class="info"><span class="name">{{item.companyShortname}}</span>&nbsp;<span>·</span>&nbsp;{{item.financingInfo}}</div>
        </div>
      </div>
      </div>
    </div>
  </div>
  <div class="sixth-bg">
    <div class="join">
      <div class="btntips">点击下方按钮，马上进驻招聘专场</div>
      <div class="forward">
       <img :src="cdnPath + 'forward.png'" alt="">
      </div>
      <div class="btn" @click="free" id="company_enter">公司免费进驻</div>
      <div class="phone">
        <span class="title">咨询请致电：</span>
        <span class="num">400-065-5788</span>
      </div>
    </div>
  </div>
  <loginPop ref="loginPop"></loginPop>
</div>
</template>
<script>
import { getfestivalfavorlist, festivalfavor } from '@/api/activity'
import { getAccessToken } from 'API/cacheService'
import loginPop from '@/components/common/loginPop'
export default {
  components: {
    loginPop
  },
  data () {
    return {
      positionlist: [],
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`,
      companylist: []
    }
  },
  created () {
    console.log(this.cdnPath + 'originality.jpg')
    this.getlist()
    this.baiduTj()
    this.$router.push({ query: { cc: 'themeMC' } })
  },
  methods: {
    // 列表
    getlist () {
      let data = { id: '1226营销创业专场' }
      getfestivalfavorlist(data).then((res) => {
        this.companylist = res.data.data.batCompanyInfo
        this.positionlist = res.data.data.recommendPositionList
      })
    },
    baiduTj () {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?1ee7f58e498191552d7c473d7646bef7'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    },
    // 点赞
    givethumbsup (data) {
      if (!getAccessToken()) {
        this.$refs.loginPop.showLoginPop = true
      } else {
        if (!data.isHotFavored) {
          festivalfavor({ company_id: data.companyId }).then((res) => {
            this.getlist()
          })
        }
      }
    },
    tocompanydetail (data) {
      if (!getAccessToken()) {
        this.$refs.loginPop.showLoginPop = true
      } else {
        let routeData = this.$router.resolve({
          name: 'companyDetail',
          query: { vkey: data.vkey }
        })
        window.open(routeData.href, '_blank')
      }
    },
    topositiondetail (data) {
      if (!getAccessToken()) {
        this.$refs.loginPop.showLoginPop = true
      } else {
        let routeData = this.$router.resolve({
          name: 'positionDetail',
          query: { positionId: data.id }
        })
        window.open(routeData.href, '_blank')
      }
    },
    free () {
      window.open('https://www.wjx.top/m/41711237.aspx', '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.originality{
  background: #060046;
}
.first-bg{
  position: relative;
  height: 384px;
  margin: 0 auto;
  width: 1726px;
  background: url(#{$image-cdn-url}/images/bg_01.png) no-repeat;
  background-position: top center;
}
.second-bg{
  height: 384px;
  background: url(#{$image-cdn-url}/images/bg_02.png) no-repeat;
  background-position: top center;
}
.third-bg{
  height: 346px;
  background: url(#{$image-cdn-url}/images/bg_03.png) no-repeat;
  background-position: top center;
  .desc{
    color: #fff;
    width: 923px;
    margin: 0 auto;
    padding-top: 64px;
    font-size: 20px;
    p{
      line-height: 50px;
      font-size: 20px;
    }
  }
}
.fourth-bg{
  min-height: 429px;
  padding-bottom: 100px;
  background: url(#{$image-cdn-url}/images/bg_04.png) no-repeat, url(#{$image-cdn-url}/images/bg_07.png) repeat-y;
  background-position: top center, bottom center;
  .enterprise{
    width: 1021px;
    margin: 0 auto;
    padding-top: 177px;
  }
  .item{
    height: 195px;
    width: 126px;
    float: left;
    margin-right: 53px;
  }
  .logo{
    border-radius:8px;
    height: 156px;
    width: 126px;
    overflow: hidden;
    box-sizing: border-box;
    border:3px solid rgba(0,196,205,1);
    .img{
      height: 116px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .number{
      height: 34px;
      background:linear-gradient(90deg,rgba(242,205,123,1) 0%,rgba(235,122,118,1) 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img{
        width:16px;
        height:19px;
        margin-right: 6px;
      }
      span{
        color: #fff;
        font-size: 16px;
        line-height: 35px;
      }
    }
    .nozan{
      width:120px;
      height:34px;
      background:rgba(238,238,238,1);
      position: relative;
      cursor: pointer;
      .semicircle{
        width:41px;
        height:37px;
        border-radius: 0 100% 0 0;
        position: absolute;
        left: -4px;
        background:linear-gradient(90deg,rgba(242,205,123,1) 0%,rgba(235,122,118,1) 100%);
        img{
          width:16px;
          height:19px;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
      span{
        color: #333333;
        font-size: 16px;
        display: block;
        padding-left: 8px;
        text-align: center;
        line-height: 37px;
      }
    }
  }
  .name{
    margin-top: 19px;
    height: 20px;
    line-height: 20px;
    font-size:20px;
    color: #fff;
    text-align: center;
    max-width: 126px;
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行
  }
  :nth-child(6n){
    margin-right: 0px;
    margin-bottom: 30px;
  }
}
.fillbox{
    background: url(#{$image-cdn-url}/images/bg_07.png) no-repeat;
    height: 224px;
  }
.fifth-bg{
  min-height: 671px;
  background: url(#{$image-cdn-url}/images/bg_05.png) no-repeat, url(#{$image-cdn-url}/images/bg_07.png) repeat-y;
  background-position: top center, bottom center;
  .position{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 95px;
  }
  .companyitem{
    width:282px;
    height:170px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
    border-radius:8px;
    margin-right: 24px;
    float: left;
    cursor: pointer;
    border:3px solid rgba(0,196,205,1);
    .positionname{
      line-height: 24px;
      color: #333333;
      font-size: 16px;
      padding: 20px 0 0 20px;
      max-width: 175px;
      font-weight: bold;
      overflow:hidden; //超出的文本隐藏
      text-overflow:ellipsis; //溢出用省略号显示
      white-space:nowrap; //溢出不换行
    }
    .price{
      color: #FF7F4C;
      font-size: 18px;
      padding: 0 0 7px 20px;
      font-weight: bold;
      line-height: 26px;
    }
    .address{
      display: flex;
      padding-left: 20px;
      .addressname{
        margin-right: 10px;
      }
      i{
        color: #CDCBCF;
        vertical-align: text-top;
        font-size: 15px;
        margin-right: 5px;
      }
      span{
        font-size: 12px;
        color: #6D696E;
      }
    }
    .dottedlien{
      height: 1px;
      background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
      background-size: 8px 1px;
      background-repeat: repeat-x;
      width:258px;
      margin: 12px 0 14px 16px;
    }
    .financing{
      padding-left: 20px;
    }
    .cplogo{
      float: left;
      width:36px;
      height:36px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 9px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      float: left;
      height:36px;
      line-height: 36px;
      font-size: 14px;
      color: #333333;
      span{
        font-weight: bold;
      }
      .name{
        font-weight: normal;
        max-width: 112px;
        float: left;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
        display: block;
      }
    }
  }
  :nth-child(4n){
    margin-right: 0px;
    margin-bottom: 24px;
  }
}
.sixth-bg{
  height: 595px;
  background: url(#{$image-cdn-url}/images/bg_06.png) no-repeat;
  background-position: top center;
  // margin-top: -200px;
  .join{
    width: 420px;
    margin: 0 auto;
    padding-top: 270px;
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
    color: #0F0464;
    font-size: 28px;
    margin: 0 auto 34px;
    font-weight: bold;
    cursor: pointer;
    border-radius:28px;
    background: #35E5ED;
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
      color: #0BF5FC;
      font-weight: bold;
    }
  }
}
.wxshare{
  width: 1200px;
  margin: 0 auto;
  position: relative;
  font-size: 12px;
  i{
    font-size: 12px;
  }
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
</style>
<style>
.position-24h-share-wechat.el-popper {
  min-width: 105px;
  height: 105px;
  padding: 5px;
  box-sizing: border-box;
}
</style>


