<template>
<div class="alliance">
  <div class="first-bg">
    <div class="wxshare">
    <el-popover
      placement="top"
      popper-class="position-24h-share-wechat"
      :width="100">
      <img style="max-width:100%; max-height:100%" :src="cdnPath + 'allianceCode.jpg'" alt="">
      <div class="header-wechat-shart"  slot="reference">
        <i class="iconfont icon-weixin"></i> 微信分享
      </div>
    </el-popover>
    </div>
  </div>
  <div class="third-bg">
    <div class="desc">
      <p>疫情终会过去<br/>生活和职场也定将重现繁华<br/><span>【复工者联盟】强势来袭<br/>助你获得高薪工作 加满复工能量</span><br/>一起奋战特别的2020</p>
    </div>
  </div>
  <div class="fourth-bg-top"></div>
  <div class="fourth-bg">
    <div class="enterprise clearfix">
      <div class="clearfix" id="company_recruit-Market">
      <div class="item" :key="i" v-for="(item, i) in companylist">
        <div class="logo">
          <div class="img" @click="tocompanydetail(item)">
            <img :src="item.companyLogoInfo.smallUrl" alt="">
          </div>
          <!-- <div class="number" v-if="item.isHotFavored" @click.stop="givethumbsup(item)">
            <img :src="cdnPath + 'fire.png'" alt="">
            <span>{{item.hotFavorCount}}</span>
          </div>
          <div class="nozan" @click.stop="givethumbsup(item)">
            <div class="semicircle">
              <img :src="cdnPath + 'fire.png'" alt="">
            </div>
            <span>{{item.hotFavorCount}}</span>
          </div> -->
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
import { getfestivalfavorlist, festivalTouch, festivalfavor } from '@/api/activity'
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
    this.getlist()
    this.baiduTj()
  },
  beforeRouteLeave () {},
  methods: {
    // 列表
    getlist () {
      let data = { id: '复工者联盟招聘专场' }
      getfestivalfavorlist(data).then((res) => {
        this.companylist = res.data.data.batCompanyInfo
        this.positionlist = res.data.data.recommendPositionList
      })
    },
    baiduTj () {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?2faa811c82b713925cbc87600541fde5'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    },
    // 点击统计
    festivalTouchfun (vkey) {
      let data = {
        vkey: vkey,
        from: 3
      }
      festivalTouch(data)
    },
    tocompanydetail (data) {
      // if (!getAccessToken()) {
      //   this.$refs.loginPop.showLoginPop = true
      // } else {
      this.festivalTouchfun(data.touchVkey)
      let routeData = this.$router.resolve({
        name: 'companyDetail',
        query: { vkey: data.vkey, sourceType: 'hd_alliance_web' }
      })
      window.open(routeData.href, '_blank')
      // }
    },
    topositiondetail (data) {
      // if (!getAccessToken()) {
      //   this.$refs.loginPop.showLoginPop = true
      // } else {
      this.festivalTouchfun(data.touchVkey)
      let routeData = this.$router.resolve({
        name: 'positionDetail',
        query: { positionId: data.id, sourceType: 'hd_alliance_web' }
      })
      window.open(routeData.href, '_blank')
      // }
    },
    free () {
      window.open('https://www.wjx.top/m/41711237.aspx', '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.alliance{
  background: #160764;
}
.first-bg{
  position: relative;
  height: 697px;
  background: url(#{$image-activity-cdn-url}/alliance_pc/bg_01.png?a=1) no-repeat;
  background-position: top center;
}
.third-bg{
  height: 336px;
  background: url(#{$image-activity-cdn-url}/alliance_pc/bg_02.png?a=1) no-repeat;
  background-position: top center;
  .desc{
    color: #fff;
    margin: 0 auto;
    padding-top: 52px;
    font-size: 20px;
    p{
      line-height: 45px;
      font-size: 20px;
      text-align: center;
      font-weight:400;
      letter-spacing: 2px;
      span{
        color: #0BF3FA;
        font-weight: 500;
      }
    }
  }
}
.fourth-bg-top{
  background: url(#{$image-activity-cdn-url}/alliance_pc/bg_03.png) no-repeat;
  background-position: top center;
  height: 153px;
}
.fourth-bg{
  min-height: 410px;
  padding-bottom: 90px;
  background: url(#{$image-activity-cdn-url}/alliance_pc/bg_04.png) no-repeat, ;
  background-position: top center;
  .enterprise{
    width: 1021px;
    margin: 0 auto;
  }
  .item{
    height: 195px;
    width: 126px;
    float: left;
    margin-right: 53px;
  }
  .logo{
    border-radius:8px;
    height: 126px;
    width: 126px;
    overflow: hidden;
    box-sizing: border-box;
    border:3px solid rgba(0,196,205,1);
    .img{
      height: 120px;
      width: 120px;
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
.fifth-bg{
  min-height: 671px;
  background: url(#{$image-activity-cdn-url}/alliance_pc/bg_05.png) no-repeat, url(#{$image-activity-cdn-url}/alliance_pc/bg_06.png) repeat-y;
  background-position: top center, bottom center;
  .position{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 165px;
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
      padding: 15px 0 0 20px;
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
      width:238px;
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
  height: 415px;
  background: url(#{$image-activity-cdn-url}/alliance_pc/bg_07.png) no-repeat;
  background-position: bottom center;
  // margin-top: -111px;
  .join{
    width: 390px;
    margin: 0 auto;
    padding-top: 113px;
  }
  .btntips{
    font-size: 26px;
    color:#fff;
  }
  .btn{
    width:272px;
    height:56px;
    line-height: 56px;
    text-align: center;
    color: #1C277E;
    font-size: 28px;
    margin: 0 auto 34px;
    font-weight: bold;
    cursor: pointer;
    border-radius:28px;
    background: #0BECF5;
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
      color: #0BECF5;
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


