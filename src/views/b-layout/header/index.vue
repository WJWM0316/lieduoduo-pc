<template>
  <div class="page-header">
    <div class="head-contain">
    <div class="header-dropdown">
      <el-dropdown trigger="click" placement="bottom-start" @command="handleClick">
        <div>
          <span>
            欢迎登录猎多多，{{userInfo.realname}}
          </span>
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
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="sc-wrapper">
      <template v-for="(item,index) in headerDrop">
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
          this.$store.commit('switchIdentity', { toSiutchRole: 1 })
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
  @include flex-v-center;
  margin-left: 200px;
  // justify-content: flex-end;
  // padding: 0 20px;
  height: 60px;
  background: #fff;
  text-align: right;
  font-size: 14px;
  -webkit-box-shadow: 0 1px 0 0 rgba(29,45,53,.06);
  box-shadow: 0 1px 0 0 rgba(29,45,53,.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}
.page-header {
  height: $header-height-1;
  background: #fff;
  box-shadow: 0 1px 0 0 rgba(29,45,53,.06);
}
.head-contain{
  width: 1140px;
  margin: 0 auto;
}
.sc-wrapper {
  color: #333333;
  float: right;
  .sc-wrapper-item {
    display: inline-block;
    width: 100px;
    vertical-align: middle;
    margin-top: 6px;
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
  float: right;
  .user-avatar {
    @include img-radius(30px, 30px);
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 12px;
  }
  span{
    color: #92929B;
  }
}
.reddot{
  width:6px;
  height:6px;
  border-radius: 50%;
  right: 27px;
  position: absolute;
  top: 24px;
  background:rgba(255,127,76,1);
}
</style>
<style>
@media screen and (max-width: 1400px) {
  .page-header .head-contain {
    padding-right: 30px;
  }
}
</style>
