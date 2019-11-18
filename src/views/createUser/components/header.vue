<template>
  <header id="resumeHeader" >
    <section class="inner">
      <img class="left_logo" :src="cdnPath + 'logo_lieduodou@2x.png'" />
      <el-dropdown trigger="click"  @command="handleClick" >
        <div class="headerBtn">
          <div class="right">
            <span class="name">欢迎登录猎多多，{{name}}</span>
            <img class="op_icon aaa" :src="cdnPath + 'open.png'" v-if="!avatarUrl" />
            <img class="avatar" :src="avatarUrl" v-if="avatarUrl" />
          </div>
        </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="out">
              <i class="outLogin iconfont icon-tuichudenglu"></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </section>
  </header>
</template>
<script>
export default {
  data () {
    return {
      cdnPath: `${this.$cdnPath}/images/`,
      name: null,
      avatarUrl: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  watch: {
    userInfo: {
      handler (val, oldVal) {
        this.name = val.name
        this.avatarUrl = val.avatar.middleUrl
      },
      deep: true
    }
  },
  created () {
    this.name = this.userInfo.name
    this.avatarUrl = this.userInfo.avatar.middleUrl
  },
  methods: {
    handleClick (e) {
      if (e === 'out') {
        this.$store.dispatch('logoutApi')
      }
    }
  }
}
</script>
<style lang="scss">
#resumeHeader {
  height:64px;
  background: #fff;
  text-align: right;
  font-size: 14px;
  box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;

  .inner {
    height:64px;
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .headerBtn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        font-size:14px;
        font-weight:400;
        color:#6E1F96;
      }
      .avatar {
        width:30px;
        height:30px;
        border-radius: 50%;
        margin-left: 7px;
      }
      .op_icon {
        width:12px;
        height:12px;
        margin: 0 7px;
      }
    }
    .btn_blo {
      font-size:14px;
      font-weight:400;
      color:rgba(110,31,150,1);
    }
    .btn_blo2 {
      width:113px;
      height:34px;
      background:rgba(101,39,145,1);
      border-radius:84px;
      font-size:14px;
      font-weight:700;
      color:rgba(255,255,255,1);
      line-height:34px;
      text-align: center;
      margin-left: 20px;
    }
  }
  .left_logo {
    width:160px;
    height:auto;
    display: block;
  }
}
</style>
