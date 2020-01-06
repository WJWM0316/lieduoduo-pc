<template>
  <div class="page-header">
    <div class="page-header-wrapper">
      <router-link tag="div" to="/index" class="header-logo">
        <img src="../../../assets/images/index/logo.png" alt="">
      </router-link>
      <div class="header-address" v-if="$route.name === 'index'">
        <drop-down
          v-model="addressId"
          :items="cityList"
          :props="{
            value: 'areaId',
            label: 'name'
          }"
          @on-select="changeLocation">
          <span class="iconfont icon-dizhi" />
          <span class="change-address"><b>{{addressName}}</b>【切换城市】</span>
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
                  <div class="tooltips" v-html="item.tooltips"></div>
                </div>
                <div slot="reference" class="nav-name">{{item.name}}</div>
              </el-popover>
            </template>
          </li>
        </template>
      </ul>
      <div class="header-user-info">
        <div class="system">
          <template v-if="headerInfo.id">
            <router-link tag="span" to="/interview" class="resume" v-slot="{ href, isActive, isExactActive }">
              <span
                class="router-link"
                :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                @click="handeToInterview">
                面试<font class="reddot" v-if="interviewData.jobhunterInterviewTotal">{{interviewData.jobhunterInterviewTotal > 99 ? '99...' : interviewData.jobhunterInterviewTotal}}</font>
              </span>
            </router-link>
            <router-link tag="span" to="/cresume" class="resume" v-slot="{ href, isActive, isExactActive }">
              <span
                class="router-link"
                :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                @click="handeToResume">简历</span>
            </router-link>
          </template>
          <template v-else>
            <div>
              <router-link tag="span" to="/login?type=msgLogin" class="search-job">我要找工作</router-link>
              <router-link tag="span" to="/login?type=msgLogin" class="recruite">我要招聘</router-link>
            </div>
          </template>
        </div>
        <div class="header-info">
          <template v-if="headerInfo.id">
            <el-dropdown trigger="click" placement="bottom-start" @command="handleClick">
              <div>
                <span class="user-name">{{headerInfo.realname}}</span>
                <div class="user-avatar">
                  <img :src="headerInfo.avatarInfo && headerInfo.avatarInfo.smallUrl" alt="">
                </div>
              </div>
              <el-dropdown-menu slot="dropdown" class="header-dorpdown-wrapper">
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
import { getHotArea } from 'API/common'
import DropDown from 'COMPONENTS/dropDown'
import { asideBar } from 'UTIL/interview-static-data'
export default {
  components: { DropDown },
  data () {
    return {
      addressName: '全国',
      addressId: 0,
      navList: [
        { name: '首页', url: '/index', type: 'link' },
        { name: '公司', url: '/company', type: 'link' },
        { ...asideBar.bottomNav[0] },
        { ...asideBar.bottomNav[1] },
        { ...asideBar.bottomNav[2] }
      ]
    }
  },
  created () {
    this.getHotAreas()
    this.addressId = this.$store.getters.cityId
  },
  computed: {
    ...mapState({
      roleInfos: state => state.roleInfos,
      cityList: state => state.areaList,
      cityId: state => state.cityId
    }),
    ...mapGetters([
      'interviewData'
    ]),
    headerInfo () {
      // 有加载简历就用简历里面的 没有就用登陆携带回来的信息
      const { userInfo, resume: { myResume } } = this.$store.state
      if (myResume.uid) {
        return {
          id: userInfo.id,
          realname: myResume.name,
          avatarInfo: myResume.avatar
        }
      }
      return userInfo || {}
    }
  },
  methods: {
    handleClick (e) {
      switch (e) {
        case 'logout':
          this.$store.dispatch('logoutApi', { curPage: 1 }).then(() => {
            this.$store.commit('removeResume')
          })
          break
        case 'usercenter':
          this.$router.push('/position')
          break
        case 'toggleIdentity':
          this.$store.commit('switchIdentity', { toSiutchRole: 2 })
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
    // 是否可以进入简历页面
    handeToResume () {
      if (this.roleInfos.isJobhunter !== 1) {
        this.$router.push({ path: '/createuser' })
      } else {
        this.$router.push({ path: '/cresume' })
      }
    },
    handeToInterview () {
      let query = {
        page: 1,
        tab: 'all',
        pIndex: 0,
        cIndex: 0,
        q: Date.now()
      }
      this.$router.push({ name: 'jobhunterInterview', query })
    },
    changeLocation (item) {
      this.addressName = item.name
      this.$store.commit('setCityId', item.areaId)
    },
    // 获取热门城市地址
    getHotAreas () {
      getHotArea().then(({ data }) => {
        const areas = [{ 'areaId': 0, 'name': '全国', 'provinceId': 0, 'provinceName': '全国' }, ...data.data]
        const address = areas.find(val => val.areaId === this.cityId)
        this.addressName = address.name || '全国'
        this.$store.commit('setAreas', areas)
      })
    }
  },
  watch: {
    cityId: {
      handler (value) {
        if (!isNaN(value)) {
          this.addressId = value
          const address = this.cityList.find(val => val.areaId === value)
          if (address) {
            this.addressName = address.name
          }
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
$header-height-1: $page-header-height;
.page-header {
  height: $header-height-1;
  background: $nav-color-bg-color;
  min-width: $page-width;
  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    min-width: $page-width;
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
  margin-right: 58px;
  img {
    max-height: 100%;
    cursor: pointer;
  }
}
.header-address {
  cursor: pointer;
  margin-right: 70px;
  color: $nav-color-default;
  span:first-child {
    color: $nav-color-hover;
    padding-right: 16px;
  }
  .change-address b{
    font-weight: normal;
    color: $nav-color-hover;
  }
  span.iconfont {
    font-size: 14px;
    padding-right: 9px;
  }
  & /deep/ .drop-down-header {
    width: 150px;
    height: $header-height-1;
    line-height: $header-height-1;
  }
}
/*.share-image {
  height: 146px;
  img {
    width: 100%;
  }
}*/
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
    background: $bg-color-3;
    .reddot{
      color: white
    }
  }
}
.header-user-info {
  @include flex-v-center;
  margin-left: auto;
  color: $nav-color-default;
  span {
    cursor: pointer;
  }
  .resume.router-link-active {
    color: $nav-color-hover;
  }
  .reddot{
    background:#F45322;
    border-radius:8px;
    padding: 0 4px;
    font-size:12px;
    font-weight:400;
    color:white;
    line-height: 16px;
    margin-left: 3px;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    min-width: 16px;
    position: relative;
    top: -1px;
  }
}
.system {
  div {
    padding-right: 20px;
  }
  span ~ span {
    margin-left: 42px;
  }
  span:hover,.active {
    color: $nav-color-hover;
  }
  .search-job {
    color: $nav-color-hover;
  }
}
.header-info {
  padding-left: 40px;
  .login-btn, .register-btn{
    padding:0 12px 0  12px;
  }
  .register-btn {
    padding-right: 0;
  }
  .iconfont {
    font-size: 14px;
    padding-right: 3px;
  }
  span:hover{
    color: $nav-color-hover;
  }
  .user-name {
    color: $nav-color-default;
    vertical-align: middle;
  }
  .user-avatar {
    @include img-radius(30px, 30px);
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 12px;
  }
}
</style>
<style lang="scss">
.el-popover.share-popover {
  width: 152px;
  box-sizing: border-box;
  padding: 5px 13px 7px 13px;
  .tooltips{
    text-align: center;
    font-size:12px;
    font-weight:400;
    color:rgba(153,153,155,1);
    line-height:15px;
    letter-spacing:1px;
  }
  .share-image{
    height: unset;
    text-align: center;
    img{
      width: 100%;
    }
  }
}
.header-dorpdown-wrapper {
  min-width: 124px;
}
</style>
