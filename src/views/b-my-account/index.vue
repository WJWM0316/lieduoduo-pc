<template>
  <!-- 我的账户 -->
  <div class="myaccount-wrapper">
    <!-- banners -->
    <div class="myaccount-banner" :class="{'unshow-pager' : bannerList.length <= 1}" v-if="bannerList.length">
      <el-carousel height="70px" arrow="never">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img class="banner-list" :src="item.bigImgUrl"  @click="handleToLink(item)"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- servers -->
    <div class="account-servers">
      <div class="counselor">
        <p class="counselor-title">顾问服务</p>
        <p>一键约面，极速入职</p>
        <el-button type="primary" @click="contactDialogStatus = true; isServer = true">了解更多</el-button>
      </div>
      <template v-for="(item, index) in servers">
        <div :key="index" class="server-lists">
          <div class="server-img">
            <img :src="item.img" alt="">
          </div>
          <div class="server-introduce" v-html="item.content">
          </div>
        </div>
      </template>
    </div>
    <div class="account-content">
      <!-- bill -->
      <order-details />
      <div class="account-content-right">
        <!-- recharge -->
        <div class="duoduo-coin">
          <p class="right-title">我的多多币
            <el-popover
            popper-class="myaccount-popover"
              placement="bottom-end"
              :offset="10"
              width="372">
              <p class="duoduo-popover-title">多多币说明</p>
              <p class="duoduo-popover-text"><span>1.多多币是什么？</span><br/>
                多多币是猎多多平台专属的虚拟货币，用户需要充值获取，目前兑换比例为1rmb=1多多币。</p>
                <p class="duoduo-popover-text" style="margin-top: 12px;"><span>2.多多币如何使用？</span><br/>
                  购买后，多多币可用于约聊候选人，或使用顾问服务邀请候选人进行约面，顾问会介入为您提供相关约面服务。</p>
              <img slot="reference" class="duoduo-popover-questionMark" src="../../assets/images/questionMark.png"/>
            </el-popover>
          </p>
          <p class="coin-count">{{coin}}</p>
          <el-button style="width: 132px" type="primary" size="small" @click="contactDialogStatus = true; isServer = false">去充值</el-button>
        </div>
        <!-- contact -->
        <div class="right-server">
          <p class="right-title">联系客服</p>
          <div class="right-server-qrcode">
            <div>
              <img :src="qrCode" alt="">
              <p>扫码添加客服微信号与我们联系</p>
            </div>
          </div>
          <p class="server-number">
            <span>电话咨询：</span>
            <span>400-065-5788</span>
          </p>
        </div>
      </div>
    </div>
    <contact-service
      :visible.sync="contactDialogStatus"
      :text="{
        title: isServer ? '顾问服务' : '充值多多币',
        content: isServer ? '您可微信扫下方二维码，联系我们了解顾问服务' : '您可微信扫下方二维码，联系我们充值多多币'
      }"/>
  </div>
</template>
<script>
import contactService from '@/components/contactService/public'
import OrderDetails from './compnents/details'
import { getRecruiterAccount } from 'API/recruiter'
import { getBTermBanners } from 'API/common'
import { wx_account_qrcode } from 'IMAGES/image'
export default {
  components: { OrderDetails, contactService },
  data () {
    return {
      servers: [
        {
          img: require('IMAGES/account/ic_recommend.png'),
          content: '<p>量身推荐</p><p>按岗位为您</p><p>定制推荐方案</p>'
        },
        {
          img: require('IMAGES/account/ic_communication.png'),
          content: '<p>帮你沟通</p><p>顾问会帮您与候选</p><p>人沟通并撮合约面</p>'
        },
        {
          img: require('IMAGES/account/ic_follow.png'),
          content: '<p>顾问跟进</p><p>顾问会跟进您与</p><p>候选人的约面进度</p>'
        },
        {
          img: require('IMAGES/account/ic_deducted.png'),
          content: '<p>到场才扣费</p><p>如候选人未能到场</p><p>多多币将退回至账号</p>'
        }
      ],
      bannerList: [],
      coin: 0,
      qrCode: wx_account_qrcode,
      contactDialogStatus: false,
      isServer: true
    }
  },
  created () {
    this.getAccount()
  },
  methods: {
    getAccount () {
      getRecruiterAccount().then(({ data }) => {
        const { wallet } = data.data
        this.coin = wallet.remain
      })
      getBTermBanners({ location: 'pc_b_my_account_top_banner' }).then(res => {
        this.bannerList = res.data.data || []
      })
    },
    handleToLink (item) {
      if (item.otherUrl) {
        let protocol = item.otherUrl.indexOf('http') === -1 ? 'http://' : ''
        window.open(protocol + item.otherUrl, '_blank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.counselor {
  background-image: url('../../assets/images/account/img_vip.png');
  background-repeat: no-repeat;
  background-size: 55%;
  background-position-x: -5px;
  height: 100%;
  padding: 34px 0  28px 36px;
  box-sizing: border-box;
  p {
    color: $title-color-2;
  }
  .counselor-title {
    color: $main-color-1;
    font-weight: bold;
    font-size: 22px;
    position: relative;
    padding-left: 9px;
    margin-bottom: 8px;
    &::after {
      content: "";
      position: absolute;
      left: 0px;
      top: 2px;
      background-color: $bg-color-4;
      width:3px;
      height:18px;
      border-radius:0px 2px 2px 0px;
    }
  }
  .el-button {
    margin-top: 20px;
    width: 144px;
  }
}
.myaccount-banner{
  min-width: 960px;
  height: 70px;
  margin-bottom: 16px;
  .el-carousel {
    border-radius: 8px;
    overflow: hidden;
  }
  .el-carousel__item  {
    text-align: center;
  }
  .banner-list{
    max-width: 100%;
    min-height: 100%;
    cursor: pointer;
  }
}
.duoduo-popover-questionMark{
  width: 16px !important;
  height: 16px;
  cursor: pointer;
}

.account-servers, .right-server, .orders-wrapper /deep/ .order-wrapper-content, .myaccount-banner, .duoduo-coin {
  border-radius: 8px;
  box-shadow: $shadow-1;
}
.account-servers {
  background: #fff;
  height: 166px;
  box-sizing: border-box;
  @include flex-v-center;
  padding-right: 33px;
  .counselor {
    width: 234px;
    max-width: 234px;
  }
  div {
    flex: 1;
    display: inline-block;
    vertical-align: middle;
  }
  .server-lists {
    height: 60px;
    width: 112px;
    text-align: center;
    position: relative;
  }
  .server-img {
    margin-top: 5px;
    width: 36px;
    img {
      max-width: 100%;
    }
  }
  .server-lists:not(:last-child) {
    border-right: 1px dashed $border-color-1;
  }
}
.account-content {
  display: flex;
  margin-top: 16px;
  .orders-wrapper {
    flex: 1;
  }
  .account-content-right {
    width: 320px;
    margin-left: 16px;
  }
}
.account-content-right {
  &> div{
    padding: 32px 0 24px;
    background-color: #fff;
  }
  .right-title {
    font-size: 20px;
    color: $title-color-1;
    font-weight: bold;
  }
  .duoduo-coin {
    padding-left: 40px;
    margin-bottom: 16px;
    background-image: url('../../assets/images/account/count_coin.png');
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 100% 100%;
    border-radius: 8px;
  }
  img {
    width: 86px;
  }
  .coin-count {
    font-size: 42px;
    line-height: 32px;
    font-weight: bold;
    color: $main-color-1;
    margin:10px 0 30px;
  }
  .right-server {
    .right-title{
      padding-left: 40px;
      line-height: 20px;
    }
    .server-number {
      text-align: center;
      span {
        font-size: 14px;
        color: $title-color-2;
      }
      span:last-child {
        color: $main-color-1;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .right-server-qrcode {
      width: 100%;
      padding: 0 30px;
      div {
        padding: 12px;
        background-color: $bg-color-1;
        box-sizing: border-box;
      }
      margin:10px 0 18px 0px;
      box-sizing: border-box;
      img, p{
        display: inline-block;
        vertical-align: middle;
      }
      p {
        width: 98px;
        line-height:20px;
        margin-left: 25px;
        color: $title-color-2;
      }
    }
  }
}
.duoduo-popover-title{
  color: $font-color-3;
  font-size: 14px;
  margin-bottom: 11px;
  font-weight: 500;
}
.duoduo-popover-text{
  color: $font-color-6;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  margin-left: 10px;
  span{
    color: $font-color-3;
    margin-left: -10px;
  }
}
</style>
<style lang="scss">
.myaccount-wrapper .server-introduce {
  margin-left: 20px;
  text-align: left;
  p {
    color: $title-color-2;
    line-height:16px;
    font-size: 12px;
  }
  p:first-child {
    font-weight: bold;
    margin: 5px 0;
    font-size: 14px;
    color: $title-color-1;
  }
}
.myaccount-banner .el-carousel__indicator--horizontal{
  padding: 0;
  margin-left: 6px;
}
.myaccount-banner .el-carousel__indicator--horizontal button{
  width:4px;
  height:4px;
  background: #ffffff;
  opacity:0.5;
  border-radius: 50%;
}
.myaccount-banner .el-carousel__indicator--horizontal.is-active button{
  opacity: 1;
  width: 27px;
  height: 4px;
  border-radius: 3px;
}
.myaccount-banner.unshow-pager .el-carousel__indicators {
  display: none;
}
.myaccount-popover{
  padding: 20px !important;
  box-sizing: border-box;
  border: 0 !important;
  border-radius: 8px !important;
}
.popper__arrow{
  border: 0 !important;
}
</style>
