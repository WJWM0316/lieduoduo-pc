<template>

<div class="resumePost">
  <header id="resumeHeader" >
    <section>
      <div class="left">
        <div class="companyMsg">
          <p>精英人才招聘神器</p>
          <p>www.lieduoduo.co</p>
        </div>
      </div>  
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
      <div class="resumeOpFirstMain">

        <div class="form">
          <div class="formPic">
            <el-upload
              class="avatar-uploader"
              action="https://qiuzhi-api.lieduoduo.ziwork.com/attaches"
              :data = "handleData"
              :headers="handleHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="formItem">
            <el-input  placeholder="请输入真实姓名" v-model="form1.name"></el-input>
          </div>

          <div class="formItem">
            <el-input  placeholder="请输入职位名称" v-model="form1.position"></el-input>
          </div>

          <div class="formItem">
            <el-radio-group v-model="form1.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </div>

          <div class="formItem">
            <el-date-picker
              class=""
              type="date"
              placeholder="选择参加工作时间"
              v-model="form1.startWorkYear"
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
  import { getUserInfoApi, searchResumeStepApi, setResumeFirstApi, setResumeSecondApi, setResumeThirdApi, setResumeFourthApi } from '../../../api/putIn'
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
    form1 = {
      avatar: '',
      gender: '1',
      name: '',  
      startWorkYear: null,
      position: '',  
      apiVersion: 0,  
    }
    form2 = {
      mobile: '',
      code: '',
      captchaKey: '',  
      captchaValue: '' 
    }
    form3 = {
      mobile: '',
      code: '',
      captchaKey: '',  
      captchaValue: '' 
    }
    form4 = {
      mobile: '',
      code: '',
      captchaKey: '',  
      captchaValue: '' 
    }
    augustInterval = null
    isShowMask = false
    showError = false
    timer = 60
    imageUrl = ''
    handleHeaders = {
      'Authorization': '',
    }
    handleData = {
      'attach_type': 'avatar'
    }
    step = 1
    mounted () {
      let query = this.$route.query
      this.handleHeaders['Authorization'] = getAccessToken()
      this.userInfo = this.$store.state.userInfo
    }

    init () {
      this.searchResumeStep()
    }

    // 返回上一步
    lastStep() {
      if(this.step < 1) return
      this.step -= 1
    }

    //查询简历完善步数
    searchResumeStep() {
      searchResumeStepApi().then(res => {
        console.log(res.data)
      })
    }

    // 第一步
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
        if(!pattern.test(this.form.mobile)){
          this.$message({
            type: 'info',
            message: '请填写格式正确的手机号码'
          })
          return false
        }else {
          return true
        }
      }
    // 第一步

    // 第2步
    
    // 第2步

    // 第3步
    
    // 第3步

    // 第4步
    
    // 第4步
    // 下载
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      }

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    // 下载


    // 提交
    submit (index) {
      let name = `validate${index}`
      let form = `form${index}`
      let subName = ''
      if(this[name]()) {
        switch(index) {
          case 1:
            subName = setResumeFirstApi
            break
          case 2:
            subName = setResumeSecondApi
            break
          case 3:
            subName = setResumeThirdApi
            break
          case 4:
            subName = setResumeFourthApi
            break
          default:
            break
        }
        subName({...this[form]}).then(res => {
          console.log(res)
          this.step = index
        })
      }
    }
    // 验证
      validate1() {
        // if(!this.checkMobile()) return false
        // if(!this.checkCode()) return false
        return true
      }
      validate2() {
        if(!this.checkMobile()) return false
        if(!this.checkCode()) return false
        return true
      }
      validate3() {
        if(!this.checkMobile()) return false
        if(!this.checkCode()) return false
        return true
      }
      validate4() {
        if(!this.checkMobile()) return false
        if(!this.checkCode()) return false
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

.resumePost {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #652791;
  // background: url(../../../assets/images/bg.png) 100% repeat #652791;
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
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      .logo {
        width:40px;
        height:40px;
        display: block;
        margin-right: 10px;
      }
      .companyMsg {
        p {
          font-size:14px;
          font-weight:500;
          color:rgba(110,31,150,1);
          line-height:20px;
        }
      }
    }
  }
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
    margin-bottom: 135px;
    span {
      color:#FFDC29;
    }
  }
  .clearfix {
      zoom: 1;
  }


  .resumeOpFirstMain {
    width:450px;
    height:471px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
    border-radius:8px;
    border:1px solid rgba(255,255,255,1);
    margin: 0 auto;
    padding: 95px 40px 0 40px;
    box-sizing: border-box;
    position: relative;
    .formPic {
      width:106px;
      height:106px;
      background:rgba(239,232,243,1);
      border:4px solid rgba(255,255,255,1);
      border-radius: 50%;
      position: absolute;
      top: -53px;
      left: 50%;
      margin-left: -53px;

      overflow: hidden;
      .avatar-uploader {
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: relative;
        .el-upload {
          width: 100%;
          height: 100%;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 100%;
        text-align: center;
      }
      .avatar {
        width: 100%;
        height: 100%;
        display: block;
      }
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


</style>