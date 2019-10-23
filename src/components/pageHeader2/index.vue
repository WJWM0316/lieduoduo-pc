<template>
  <header id="page-header2" >
    <section>
      <div class="left">
        <ul class="nav">
          <li class="" @mouseover="pop = {isShow: true, type: 'gzh'}" @mouseout="pop.isShow = false">关注猎多多</li>
          <li class="" @mouseover="pop = {isShow: true, type: 'xcx'}" @mouseout="pop.isShow = false"> 猎多多移动版</li>
        </ul>
        <div class="headWC_pop" :class="{'left': pop.type === 'gzh'}" v-if="pop.isShow">
          <div class="triangle_border_top"></div>
          <div class="pop_cont" v-if="pop.type === 'gzh'">
            <img class="pop_code" src="../../assets/images/gzh.png"/>
            <p class="pop_text">微信扫码关注公众号 </p>
          </div>
          <div class="pop_cont" v-if="pop.type === 'xcx'">
            <img class="pop_code2 " src="../../assets/images/xcx.png"/>
            <p class="pop_text">微信扫码打开小程序</p>
          </div>
          <div class="triangle_border_right"></div>
        </div>
      </div>

      <el-dropdown trigger="click"  @command="handleClick">
        <div class="right" v-if="userInfo && userInfo.token">
          <span class="name">欢迎登录猎多多，{{userInfo.realname}}</span>
          <img class="op_icon" src="../../assets/images/arrows2.png" />
          <img class="avatar" :src="userInfo.avatarInfo.middleUrl" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changeId">
            <img class="drop_icon" src="../../assets/images/change.png" />
            切换为{{identity==='qiuzhi'?'招聘官':'求职者'}}
          </el-dropdown-item>
          <!-- <el-dropdown-item command="help" class="dropdown_blo">
            <img class="drop_icon" src="../../assets/images/help.png" />
            帮助中心
          </el-dropdown-item> -->
          <el-dropdown-item command="out">
            <img class="drop_icon" src="../../assets/images/out.png" />
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="switchWrap" v-if="isShowSwitch">
          <div class="switchIdentity">
            <img class="cloSwitch" src="../../assets/images/clo.png" @click="cloIdentity">
            <h3 class="switchTit">切换身份</h3>

            <div class="switchMain" v-if="identity === 'qiuzhi'">
              <p class="switch_text">我的 > 设置 > 切换“求职者”身份</p>
              <img class="switch_pic" src="../../assets/images/pic_cut_jobhunter.png"/>
              <div class="switch_cont">
                <p class="switch_text2">在小程序端切换为求职者身份后</p>
                <p class="switch_text2">点击下方按钮即可完成切换</p>
              </div>

              <div class="refresh" @click="refreshID">已切换为求职者</div>
            </div>
            <div class="switchMain" v-else>
              <p class="switch_text">我的 > 设置 > 切换“招聘官”身份</p>
              <img class="switch_pic" src="../../assets/images/pic_cut_recruiter.png"/>
              <div class="switch_cont">
                <p class="switch_text2">在小程序端切换为招聘官身份后</p>
                <p class="switch_text2">点击下方按钮即可完成切换</p>
              </div>

              <div class="refresh" @click="refreshID">已切换为招聘官</div>
            </div>
          </div>
      </div>
      
    </section>
  </header>
</template>
<style lang="less" scoped>
#page-header2{
  height:60px;
  background: #fff;
  text-align: right;
  font-size: 14px;
  box-shadow: 0px 1px 0px 0px rgba(29,45,53,0.06);
  position: fixed;
  top: 0;
  left: 0px;
  right: 0;
  z-index: 3;
  .switchWrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,0.3);
    .switchIdentity {
      position: fixed;
      left: 50%;
      top: 50%;
      margin: -150px 0 0 -220px;
      width:300px;
      height:440px;
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 12px 0px rgba(48,50,51,0.22);
      text-align: center;
      .cloSwitch {
        width:10px;
        height:10px;
        position: absolute;
        right: 16px;
        top: 16px;
        cursor: pointer;
      }
      .switchTit {
        font-size:20px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(40,40,40,1);
        margin: 32px 0;
      }
      .switchMain {
        .switch_text {
          font-size:14px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(40,40,40,1);
          line-height:20px;
        }
        .switch_pic {
          width: 224px;
          height: 147px;
          margin: 0 auto;
          margin-top: 16px;
        }
        .switch_cont {
          margin-bottom: 39px;
          margin-top: 16px;
          .switch_text2 {
            font-size:14px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(40,40,40,1);
            line-height:22px;
          }
        }
        .refresh {
          width:180px;
          height:48px;
          background:rgba(239,233,244,1);
          border-radius:27px;
          font-size:16px;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(101,39,145,1);
          line-height:48px;
          margin: 0 auto;
        }
      }
    }
  }

  .nav {
    line-height:60px;
    li {
      display: inline-block;
      margin-left: 60px;
      cursor: pointer;

      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(40,40,40,1);
    }
  }
  section {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-left: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
    }
    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(40,40,40,1);
      }
      .avatar {
        width:30px;
        height:30px;
        border-radius: 50%;
        margin-left: 7px;
      }
      .op_icon {
        width:16px;
        height:16px;
        margin: 0 7px;
      }
    }
  }
  .navigation {

    margin-right: 40px;
    li{
      display: inline-block;
      line-height: 60px;
      margin-left: 35px;
    }
    img {
      width: 34px;
      height: 34px;
      background: rgba(0,0,0,.1);
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .headWC_pop {
    position: absolute;
    top: 55px;
    left: 140px;
    height:190px;
    width:190px;
    background:rgba(255,255,255,1);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0 35px;
    border-radius: 4px;
    z-index: 100;
    box-shadow:0px 0px 30px 0px rgba(33,0,74,0.2);
    &.left {
      position: absolute;
      top: 55px;
      left: 0px;
    }
    .pop_cont {
      display: flex;
      justify-content: center;
      flex-direction: column;
      .pop_code {
        width:106px;
        height:105px;
        margin: 0 auto;
        margin-bottom: 12px;
        border:1px solid rgba(239,233,244,1)
      }
      .pop_code2 {
        width:106px;
        height:105px;
        margin: 0 auto;
        margin-bottom: 12px;
        border:1px solid rgba(239,233,244,1);
        border-radius: 50%;
      }
      .pop_text {
        text-align: center;
        font-size:12px;
        //margin-top:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(98,98,98,1);
        line-height:18px;
        white-space: nowrap;
      }
    }

    .triangle_border_top{
        width: 0;
        height: 0;
        border-width:0 8px 9px 8px;
         border-style:solid;
         border-color:transparent transparent #fff;/*透明 透明  灰*/
        border-style: solid;
        position: absolute;
        left: 50%;
        top: -8px;
        margin-left: -10px;
    }
  }
}
.el-dropdown {
  line-height: 30px;
  display: flex;
  margin-left: 70px;
}
.el-dropdown-menu {
  .el-dropdown-menu__item {
    font-weight: 300;
    &:hover {
      background: #efe9f4 !important;
       color: #606266 !important;
       font-weight: 300;
    }
  }
}

.el-popper[x-placement^=bottom] .popper__arrow {
  left: 69px !important;
}

.el-dropdown-menu__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  .drop_icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}

</style>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { switchId, getUserIdentity } from '../../../config.js'
import { switchRoleApi } from '../../api/auth'

@Component({
  methods: {
  },
  computed: {
  }
})
export default class ComponentHeader extends Vue {
  userInfo = {}
  pop = {
    isShow: false,
    type: 'help'
  }
  identity = 'qiuzhi'
  isShowSwitch = false

  created(){
    let pageName = this.$store.state.pageName
    let userInfo = this.$store.state.userInfo
    let isBusiness = userInfo.isBusiness
    let zhaopinPages = ['recruiterIndex','postJob','candidate']
    let qiuzhiPages = ['applyIndex']

		this.userInfo = this.$store.state.userInfo
		if(zhaopinPages.includes(pageName)){
			if(isBusiness !== 1 ){
				this.$router.push({
					name: 'applyIndex'
				})
				this.identity = 'qiuzhi'
			}else {
				this.identity = 'zhaopin'
			}
		}else if(qiuzhiPages.includes(pageName)){
			if(isBusiness !==0){
				this.$router.push({
					name: 'candidate'
				})
				this.identity = 'zhaopin'
			}else {
				this.identity = 'qiuzhi'
			}
		}
		switchId(this.identity)
	}

  refresh(){
    location.reload()
  }

  //切换身份刷新
  refreshID() {
    let identity = getUserIdentity()
    let role = identity === 'qiuzhi' ? 2 : 1
    switchRoleApi({
      role: role
    }).then(() => {
      identity = switchId()
      this.identity = identity
      this.userInfo.isBusiness = this.identity === 'zhaopin' ? 1 : 0
      this.$store.dispatch('login', this.userInfo)
      this.$router.push({
        name: identity === 'zhaopin' ? 'candidate' : 'applyIndex'
      })
      this.$message({
        type: 'success',
        message: '切换成功!'
      })
    }).catch(e => {
      this.$message.error(e.data.msg)
      })
  }

  //关闭切换
  cloIdentity () {
    this.isShowSwitch = !this.isShowSwitch
  }

  handleClick (e) {
    if(e === 'out'){
      this.$store.dispatch('logoutApi')
        .then(() => {
          this.$router.push({name: 'login'})
        })
    }else if(e === 'changeId'){
      this.refreshID()
    }
  }

  //打开列多多二维码
  clickWC () {
    this.pop.isShow = !this.pop.isShow
  }

  // 退出
  logout() {
    this.$store.dispatch('logoutApi')
    //this.logoutApi()
    .then(() => {
      this.$router.push({name: 'login'})
    })
  }


  // 打开切换身份
  changeId () {
      this.isShowSwitch = !this.isShowSwitch
  }
}
</script>