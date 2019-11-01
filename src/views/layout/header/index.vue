<template>
  <div class="page-header">
    <div class="page-header-wrapper">
      <router-link tag="div" to="/index" class="header-logo">
        <img src="../../../assets/images/index/logo.png" alt="">
      </router-link>
      <div class="header-address" v-if="$route.path === '/index'">
        <drop-down
          v-model="addressId"
          :items="cityList"
          :props="{
            value: 'areaId',
            label: 'name'
          }"
          @on-select="changeLocation">
          <span class="iconfont icon-dizhi">{{addressName}}</span>
          <span class="change-address">【切换城市】</span>
        </drop-down>
      </div>
      <ul class="header-nav">
        <template v-for="(item, index) in navList">
          <li :key="index">
            <template v-if="item.type === 'link'">
              <router-link :to="item.url" v-slot="{ href, isActive, isExactActive }">
                <span
                  class="router-link"
                  :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                  @click="handeToDefault(item)">{{ item.name }}</span>
              </router-link>
            </template>
            <template v-else>
              <el-popover
                placement="bottom"
                popper-class="share-popover"
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
          <template v-if="userInfo.id">
            <router-link tag="span" class="resume" to="/applyIndex">简历</router-link>
          </template>
          <template v-else>
            <div>
              <router-link tag="span" to="/login?type=msgLogin" class="search-job">我要找工作</router-link>
              <router-link tag="span" to="/login?type=msgLogin" class="recruite">我要招聘</router-link>
            </div>
          </template>
        </div>
        <div class="header-info">
          <template v-if="userInfo.id">
            <el-dropdown trigger="click" placement="bottom-start" @command="handleClick">
              <div>
                <div class="user-avatar">
                  <img :src="userInfo.avatarInfo && userInfo.avatarInfo.smallUrl" alt="">
                </div>
                <span>
                  {{userInfo.realname}}
                </span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="usercenter">个人中心</el-dropdown-item> -->
                <el-dropdown-item command="toggleIdentity">切换为面试官</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <div class="no-login">
              <span class="login-btn"  @click="handleToLogin('msgLogin')"><i class="iconfont icon-denglu_huaban"></i> 登录</span> |
              <span class="register-btn" @click="handleToLogin('register')">注册</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mp_qrcode, wx_qrcode, app_qrcode } from 'IMAGES/image'
import { getHotArea } from 'API/common'
import DropDown from 'COMPONENTS/dropDown'
import { mapState } from 'vuex'
export default {
  components: { DropDown },
  data () {
    return {
      addressName: '全国',
      addressId: 0,
      navList: [
        { name: '首页', url: '/index', type: 'link' },
        { name: '职位', url: '/position', type: 'link' },
        { name: 'APP', url: app_qrcode, type: 'hover' },
        { name: '小程序', url: mp_qrcode, type: 'hover' },
        { name: '公众号', url: wx_qrcode, type: 'hover' }
      ]
    }
  },
  created () {
    this.getHotAreas()
    this.addressId = this.$store.getters.cityId
  },
  watch: {
    '$store.state.userInfo': function (val) {}
  },
  computed: {
    ...mapState({
      roleInfos: state => state.roleInfos,
      userInfo: state => state.userInfo,
      cityList: state => state.areaList
    })
  },
  methods: {
    handleClick (e) {
      switch (e) {
        case 'logout':
          this.$store.dispatch('logoutApi')
          break
        case 'usercenter':
          this.$router.push('/position')
          break
        case 'toggleIdentity':
          this.$store.commit('switchIdentity')
      }
    },
    handleToLogin (type) {
      this.$router.push({
        path: '/login',
        query: {
          type: type
        }
      })
    },
    handeToDefault (item) {
      if (this.$route.path === item.url) return
      this.$router.push({
        path: item.url
      })
    },
    changeLocation (item) {
      this.addressName = item.name
      this.$store.commit('setCityId', item.areaId)
    },
    // 获取热门城市地址
    getHotAreas () {
      getHotArea().then(({ data }) => {
        const areas = [{ 'areaId': 0, 'name': '全国', 'provinceId': 0, 'provinceName': '全国' }, ...data.data]
        this.$store.commit('setAreas', areas)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$header-height-1: $page-header-height;
.page-header {
  height: $header-height-1;
  background: $bg-color-2;
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  }
}
.page-header-wrapper {
  @include flex-v-center;
  width: $page-width;
  margin: 0 auto;
  font-size: 14px;
}
.header-logo {
  width: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  height: 20px;
  margin-right: 70px;
  img {
    max-height: 100%;
  }
}
.header-address {
  cursor: pointer;
  margin-right: 70px;
  color: $nav-color-default;
  span:first-child {
    color: $sub-color-1;
    padding-right: 16px;
  }
  .iconfont {
    font-size: 14px;
  }
  & /deep/ .drop-down-header {
    height: $header-height-1;
    line-height: $header-height-1;
  }
}
.share-image {
  height: 146px;
  img {
    width: 100%;
  }
}
.header-nav {
  display: flex;
  height: 100%;
  width: 340px;
  li {
    width:68px;
    text-align: center;
    cursor: pointer;
    line-height: $header-height-1;
    height: 100%;
  }
  .router-link {
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
  div {
    padding-right: 24px;
  }
  span ~ span {
    padding-left: 24px;
  }
  span:hover,.active {
    color: $sub-color-1;
  }
}
.header-info {
  padding-left: 40px;
  .login-btn, .register-btn{
    padding:0 12px 0  12px;
  }
  .iconfont {
    font-size: 14px;
    padding-right: 3px;
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
}
</style>
<style lang="scss">
.el-popover.share-popover {
  width: 158px;
  box-sizing: border-box;
  padding: 5px;
}
</style>
