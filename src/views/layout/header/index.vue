<template>
  <div class="page-header">
    <div class="page-header-wrapper">
      <div class="header-logo">

      </div>
      <div class="header-address">
        <span class="el-icon-location-information">广州</span>
        <span class="change-address">[切换城市]</span>
      </div>
      <ul class="header-nav">
        <template v-for="(item, index) in navList">
          <li :key="index">
            <template v-if="item.type === 'link'">
              <router-link :to="item.url">{{item.name}}</router-link>
            </template>
            <template v-else>
              <el-popover
                placement="bottom"
                title=""
                width="124"
                trigger="hover">
                <div class="share-image">
                  <img :src="item.url" />
                </div>
                <div slot="reference" class="nav-name">{{item.name}}</div>
              </el-popover>
            </template>
          </li>
        </template>
      </ul>
      <div class="header-user-info">
        <div class="system">
          <span class="search-job">我要找工作</span>
          <span class="recruite">我要招聘</span>
        </div>
        <div class="header-info">
          <template v-if="isLogin">
            <el-dropdown placement="bottom-start" :hide-on-click="false">
              <div>
                <div class="user-avatar">
                  <img :src="userInfo.avatarInfo && userInfo.avatarInfo.smallUrl" alt="">
                </div>
                <span>
                  {{userInfo.realname}}
                </span>
              </div>
              <el-dropdown-menu slot="dropdown"  class="drop-wrapper">
                <ul>
                  <li>退出</li>
                </ul>
              </el-dropdown-menu>
          </el-dropdown>
          </template>
          <template v-else>
            <div class="no-login">
              <span class="login-btn"><i class="el-icon-user"></i> 登陆</span> | 
              <span class="register-btn">注册</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mp_qrcode, wx_qrcode, app_qrcode} from 'IMAGES/image'
export default {
  data() {
    return {
      navList: [
        { name: '首页', url: '/applyIndex', type: 'link' },
        { name: '职位', url: '/position', type: 'link' },
        { name: 'APP', url: app_qrcode, type: 'hover' },
        { name: '小程序', url: mp_qrcode, type: 'hover' },
        { name: '公众号', url: wx_qrcode, type: 'hover' },
      ]
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.token
    },
    userInfo() {
      return  this.$store.state.userInfo || {}
    }
  }
}
</script>
<style lang="scss" scoped>
$header-height-1: 50px;
$header-height-2: 90px;
.page-header {
  height: $header-height-1;
  background: $bg-color-2;
}
.page-header-wrapper {
  @include flex-v-center;
  width: $page-width;
  margin: 0 auto;
  font-size: 14px;
}
.header-logo {
  width: 50px;
  height: 30px;
  background: #fff;
}
.header-address {
  cursor: pointer;
  margin:0 70px;
  color: $nav-color-default;
  span:first-child {
    color: $sub-color-1;
    padding-right: 16px;
  }
}
.share-image {
  img {
    max-width: 100%;
  }
}
.header-nav {
  display: flex;
  height: 100%;
  width: 340px;
  li {
    width:68px;
    cursor: pointer;
    line-height: $header-height-1;
    height: 100%;
  }
  a {
    @include a-block($nav-color-default);
  }
  .nav-name {
    color: $nav-color-default;
  }
  li:hover, .router-link-active{
    color: $nav-color-hover;
    background: $bg-color-3
  }
}
.header-user-info {
  @include flex-v-center;
  margin-left: auto;
  color: $nav-color-default;
  span {
    cursor: pointer;
  }
}
.system {
  span ~ span {
    padding-left: 12px;
  }
  span:hover,.active {
    color: $sub-color-1;
  }
}
.header-info {
  padding-left: 64px;
  .login-btn, .register-btn{
    padding:0 12px 0  12px;
  }
  span:hover{
    color: $sub-color-1;
  }
  .user-avatar {
    @include img-radius(30px, 30px);
    display: inline-block;
    vertical-align: middle;
    margin: 0 12px;
  }
  .drop-wrapper {
    width: 200px;
    background: #fff;
    height: 200px;
  }
}
</style>