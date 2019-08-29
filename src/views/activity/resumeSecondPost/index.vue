<template>

<div class="resumePost">
  <header id="resumeHeader" >
    <section>
      <img class="left_logo" src="../../../assets/images/activity/putIn/logo_lieduodou@2x.png" />
      <el-dropdown trigger="click"  @command="handleClick" >
        <div class="headerBtn">

          <div class="right" v-if="userInfo && userInfo.token">
            <span class="name">欢迎登录猎多多，{{userInfo.realname}}</span>
            <img class="op_icon" src="../../../assets/images/open.png" />
            <img class="avatar" :src="userInfo.avatarInfo.middleUrl" />
          </div>
        </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="out">
              <img class="drop_icon" src="../../../assets/images/out.png" />
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      
    </section>
  </header>
  <div class="middle">
    <div class="contain clearfix">

      <h3 class="title"><span>三分钟</span>创建微简历，<span>1000+名企</span>高薪职位任你选</h3>

      <div class="recommend">
        <img class="recommendAva" src="../../../assets/images/open.png" />
        <div class="recommendMsg">
          <p class="msg_position">爱奇艺产品总监</p>
          <p class="msg_text">很期待与你这样的精英人才相遇</p>
        </div>
      </div>

      <div class="resumeOpFirstMain">
        <h3 class="form-title">请填写工作经历</h3>

        <div class="form">
          <div class="formItem">
            <el-input maxlength="20" placeholder="请输入公司名称" v-model="form2.name"></el-input>
          </div>

          <div class="formItem">
            <el-input  placeholder="请输入职位名称" v-model="form2.position"></el-input>
          </div>

          <div class="formItem">
            <el-radio-group v-model="form2.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </div>

          <div class="formItem">
            <el-date-picker
              class=""
              type="date"
              placeholder="选择参加工作时间"
              v-model="form2.startWorkYear"
              value-format="timestamp"
              style="width: 142px"
            ></el-date-picker>
          </div>

          <div class="submit" @click="submit(1)">继续</div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { getUserInfoApi, getResumeSecondApi, setResumeSecondApi} from '../../../api/putIn'
  import { getUserIdentity, switchId } from '../../../../config.js'
  import { getAccessToken } from '../../../api/cacheService.js'
  @Component({
    name: 'lighthouse-list',
    methods: {
    },
    computed: {},
    watch: {
      '$route': {
        handler() {
          this.init()
        },
        immediate: true
      }
    },
    components: {}
  })
  export default class CourseList extends Vue {
    userInfo = {}
    messagePop = {
      isShow: false,
      type: 'help'
    }
    form2 = {
      company: '',
      positionTypeId: '1',
      position: '',  
      duty: null,
      startTime: '',  
      endTime: '',  
      from: 1,  
    }
    isShowMask = false
    showError = false
    timer = 60
    imageUrl = ''
    step = 1

    mounted () {
      let query = this.$route.query
      this.userInfo = this.$store.state.userInfo
    }

    init () {
      this.setResumeSecond()
    }

    setResumeSecond() {
      setResumeSecondApi().then(res => {
        let data = res.data.data
        console.log(data)
        this.form1 = {
          company: '',
          positionTypeId: '1',
          position: '',  
          duty: null,
          startTime: '',  
          endTime: '',  
          from: 1,  
        }
      })
    }

    // 返回上一步
    lastStep() {
      if(this.step < 1) return
      this.step -= 1
    }

    // 
    checkCode() {
      var pattern = /^[0-9A-Za-z]{4}$/
      if(!pattern.test(this.form.code)){
        this.$message({
          type: 'info',
          message: '请填写四位数字验证码'
        })
        return false
      }else {
        return true
      }
    }

    checkMobile() {
      var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
      if(!pattern.test(this.form2.mobile)){
        this.$message({
          type: 'info',
          message: '请填写格式正确的手机号码'
        })
        return false
      }else {
        return true
      }
    }

    // 提交
    submit (index) {
      let subName = ''
      if(this.validate()) {
        setResumeFirstApi({...this.form}).then(res => {
          console.log(res)
          this.step = index
        })
      }
    }
    // 验证
      validate() {
        // if(!this.checkMobile()) return false
        // if(!this.checkCode()) return false
        return true
      }
    // 验证
    

    handleClick(e) {
      if(e === 'out'){
        this.$store.dispatch('logoutApi')
          .then(() => {
            this.$router.push({name: 'login'})
          })
      }
    }
  }
</script>
<style lang="less" scoped>
.recommend {
  width:450px;
  height:70px;
  padding: 10px 22px;
  margin: 38px auto 50px;
  background:rgba(111,55,153,1);
  border-radius:100px 100px 100px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  box-sizing: border-box;
  .recommendAva {
    width:46px;
    height:46px;
    border-radius:50%;
    margin-right: 20px;
  }
  .recommendMsg {
    text-align: left;
    .msg_position {
      font-size:16px;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:16px;
    }
    .msg_text {
      font-size:14px;
      font-weight:300;
      color:rgba(255,255,255,1);
      line-height:14px;
      margin-top: 6px;
    }
  }
}
.resumePost {
  padding: 0;
  padding-bottom: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #652791;
  // background: url(../../../assets/images/bg.png) 100% repeat #652791;
  
  .middle {
    padding-top: 108px;
    position: relative;
    height: 660px;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
    .contain {

    }
  }
  .title {
    font-size:22px;
    font-family:PingFangSC;
    font-weight:500;
    color:#fff;
    line-height:32px;
    span {
      color:#FFDC29;
    }
  }
  .clearfix {
      zoom: 1;
  }


  .resumeOpFirstMain {
    width:450px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
    border-radius:8px;
    border:1px solid rgba(255,255,255,1);
    margin: 0 auto;
    padding: 50px 40px 35px 40px;
    box-sizing: border-box;
    position: relative;
    .form-title {
      font-size:24px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(40,40,40,1);
      line-height:33px;
      text-align: center;
      margin-bottom: 40px;
    }
    .formItem {
      width:370px;
      height:46px;
      background:rgba(251,249,252,0.8);
      border-radius:23px;
      border:1px solid rgba(242,237,245,1);
      margin-bottom: 20px;
    }
    .submit {
      width:260px;
      height:50px;
      background:rgba(101,39,145,1);
      border-radius:25px;
      margin: 0 auto;
      line-height: 50px;
      text-align: center;
      margin-top: 50px;
      font-size:16px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:22px;
    }
  }

  .triangle_border_left{
      width: 0;
      height: 0;
      border-width: 8px 11px 8px 0;
      border-style: solid;
      border-color: transparent #fff transparent transparent;
      position: absolute;
      left: -10px;
      top: 50%;
      margin-top: -20px;
  }
  .triangle_border_left span{
      display:block;
      width:0;
      height:0;
      border-width:28px 28px 28px 0;
      border-style:solid;
      border-color:transparent #fc0 transparent transparent;/*透明 黄 透明 透明 */
      position:absolute;
      top:0px;
      left:0px;
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
  #resumeHeader {
    height:60px;
    background: #fff;
    text-align: right;
    font-size: 14px;
    box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;

    section {
      height:60px;
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
        font-weight:500;
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
  }
  
}


</style>