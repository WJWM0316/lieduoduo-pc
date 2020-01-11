<template>
  <div class="page-header">
    <div class="page-header-wrapper">
      <div class="sc-wrapper">
        <template v-for="(item, index) in headerDrop">
          <div :key="index" class="sc-wrapper-item">
            <el-popover
              placement="bottom"
              width="124"
              trigger="hover">
              <div class="share-image">
                <img :src="item.img" />
                <p>{{item.desc}}</p>
              </div>
              <div slot="reference" class="nav-name">{{item.title}}</div>
            </el-popover>
          </div>
        </template>
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
              身份认证
              <div class="reddot"></div>
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
import { mp_qrcode, wx_qrcode } from 'IMAGES/image'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headerDrop: [
        {
          title: '关注猎多多',
          desc: '微信扫码关注公众号',
          img: wx_qrcode
        },
        {
          title: '猎多多移动版',
          desc: '微信扫码打开小程序',
          img: mp_qrcode
        }
      ],
      haveIdentity: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      Identityinfo: state => state.recruiterinfo
    })
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
    width: 100px;
    display: inline-block;
    vertical-align: top;
  }
  .sc-wrapper-item + .sc-wrapper-item {
    margin-left: 12px;
  }
}
.share-image {
  text-align: center;
  font-size: 12px;
  color: $title-color-3;
  padding: 8px 0 0;
  img {
    max-width: 100%;
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
</style>
