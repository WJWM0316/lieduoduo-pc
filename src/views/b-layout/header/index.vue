<template>
  <div class="page-header">
    <div class="page-header-wrapper">
      <div class="sc-wrapper">
        <div class="sc-wrapper-item">
          <el-popover
            placement="bottom"
            popper-class="b-header-share-popper"
            trigger="click">
            <div class="share-image">
              <img :src="appQrCode" />
              <p>下载猎多多APP</p>
              <p>体验完整功能</p>
            </div>
            <div slot="reference" class="nav-name">APP</div>
          </el-popover>
        </div>
        <div class="sc-wrapper-item">
          <el-popover
            placement="bottom"
            popper-class="b-header-share-popper"
            trigger="click">
            <div class="share-images">
              <div class="share-image">
                <img :src="mpQrCode" />
                <p>猎多多小程序</p>
                <p>开启社交求职新时代</p>
              </div>
              <div class="share-image">
                <img :src="wxQrCode" />
                <p>关注猎多多公众号</p>
                <p>不错过重要消息通知</p>
              </div>
            </div>
            <div slot="reference" class="nav-name">微信端</div>
          </el-popover>
        </div>
        <layout-information class="sc-wrapper-item" port="BPort"></layout-information>
        <div class="sc-wrapper-item">
          <span>面试</span>
        </div>
      </div>
      <div class="header-dropdown">
        <el-dropdown trigger="click" placement="bottom-start" @command="handleClick">
          <div>
            <span class="user-name">欢迎登录猎多多，{{userInfo.realname}}</span>
            <div class="user-avatar">
              <img :src="userInfo.avatarInfo && userInfo.avatarInfo.smallUrl" alt="">
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="perfectauth" v-if="haveIdentity.identityAuth !== 1">
              身份认证<div class="reddot"></div>
            </el-dropdown-item>
            <el-dropdown-item command="toggleIdentity">切换为求职者</el-dropdown-item>
            <el-dropdown-item command="infos">我的资料</el-dropdown-item>
            <el-dropdown-item command="equity">我的权益</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mp_qrcode, wx_qrcode, app_qrcode } from 'IMAGES/image'
import layoutInformation from 'COMPONENTS/common/layoutInformation/layoutInformation'
export default {
  data () {
    return {
      wxQrCode: wx_qrcode,
      mpQrCode: mp_qrcode,
      appQrCode: app_qrcode,
      haveIdentity: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      Identityinfo: state => state.recruiterinfo
    })
  },
  components: {
    layoutInformation
  },
  watch: {
    'Identityinfo': function (n) {
      this.haveIdentity = n
    }
  },
  methods: {
    handleClick (e) {
      switch (e) {
        case 'logout':
          this.$store.dispatch('logoutApi', { curPage: 2 })
          break
        case 'toggleIdentity':
          this.$store.commit('switchIdentity', { toSwitchRole: 1 })
          break
        case 'infos':
          this.$router.push({ name: 'myinfos' })
          break
        case 'equity':
          this.$router.push({ name: 'myequity' })
          break
        case 'perfectauth':
          this.$router.push({ name: 'perfectauth' })
      }
    }
  },
  mounted () {
    this.haveIdentity = this.$store.state.recruiterinfo
  }
}
</script>
<style lang="scss" scoped>
$header-height-1: $page-b-header-height;
.page-header {
  width: 100%;
  background: #fff;
  font-size: 14px;
  position: relative;
  z-index: 99;
  -webkit-box-shadow: 0 1px 0 0 rgba(29,45,53,.06);
  box-shadow: 0 1px 0 0 rgba(29,45,53,.06);
}
.page-header-wrapper {
  @include flex-v-center;
  justify-content: flex-end;
  width: 100%;
  max-width: $page-width;
  min-width: 960px;
  margin: 0 auto;
  height: $header-height-1;
}
.sc-wrapper {
  color: #333333;
  .sc-wrapper-item {
    height: $header-height-1;
    line-height: $header-height-1;
    padding-right: 34px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
  }
  // .sc-wrapper-item + .sc-wrapper-item {
  //   margin-left: 12px;
  // }
   & /deep/ {
     .BInformation {
       margin: auto;
     }
   }
}
.share-image {
  text-align: center;
  font-size: 12px;
  max-width: 126px;
  color: $title-color-3;
  position: relative;
  img {
    max-width: 100%;
  }
}
.share-images {
  @include flex-v-center;
  .share-image + .share-image {
    margin-left: 16px;
    padding-left: 16px;
  }
  .share-image:not(:first-child):after {
    content: "";
    position: absolute;
    height: 62px;
    width: 1px;
    left: 16px;
    background: rgba($border-color-1, .07);
  }
}
.header-dropdown {
  padding-left: 40px;
  .user-avatar {
    @include img-radius(30px, 30px);
    margin: 0 0 0 12px;
    border: 1px solid #EDf1f0;
  }
  .user-name, .user-avatar{
    display: inline-block;
    vertical-align: middle;
  }
  span{
    color: #333;
  }
}
.reddot{
  width:6px;
  height:6px;
  border-radius: 50%;
  right: 27px;
  position: absolute;
  top: 24px;
  background: $error-color-1;
}
</style>
<style>
@media screen and (max-width: 1400px) {
  .page-header .page-header-wrapper {
    padding-right: 30px;
  }
}
.b-header-share-popper.el-popover {
  padding: 8px 13px 12px;
  min-width: auto;
}
</style>
