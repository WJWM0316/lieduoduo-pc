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

      <div class="recommend">
        <img class="recommendAva" src="../../../assets/images/open.png" />
        <div class="recommendMsg">
          <p class="msg_position">爱奇艺产品总监</p>
          <p class="msg_text">很期待与你这样的精英人才相遇</p>
        </div>
      </div>
      <div class="resumeOpFirstMain">
        <div class="formHint" v-if="formHint.isShow && !messagePop.isShow">
          <img class="" src="../../../assets/images/activity/putIn/live_icon_question2.png" />
          {{formHint.text}}
        </div>
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
              <img v-else  class="avatar-uploader-icon" src="../../../assets/images/activity/putIn/btn_pic.png" />
            </el-upload>
          </div>
          <div class="formItem">

            <input placeholder="请输入真实姓名" v-model="form1.name" class="default" maxlength="10" />
            <div class="limit">
              <span>{{form1.name.length}}</span>/<span>10</span>
            </div>
          </div>

          <div class="formRadio">
            <el-radio-group v-model="form1.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </div>

          <div class="formTimeItem">
            <el-date-picker
              class=""
              type="date"
              placeholder="选择你的出生年月"
              v-model="form1.birth"
              value-format="timestamp"
            ></el-date-picker>
          </div>

          <div class="formTimeItem">
            <el-date-picker
              class=""
              type="date"
              placeholder="选择参加工作时间"
              v-model="form1.startWorkYear"
              value-format="timestamp"
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
  import { getUserInfoApi, searchResumeStepApi, setResumeFirstApi, setResumeSecondApi, setResumeThirdApi, setResumeFourthApi, getResumeFirstApi } from '../../../api/putIn'
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
      startWorkYear: '',
      birth: '',
      from: 1,
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
    formHint = {    //form提示框
      isShow: false,
      text: ''
    }
    step = 1
    mounted () {
      let query = this.$route.query
      this.handleHeaders['Authorization'] = getAccessToken()
      this.userInfo = this.$store.state.userInfo


    }

    init () {
      this.searchResumeStep()
      this.getResumeFirst()
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

    getResumeFirst() {
      getResumeFirstApi().then(res => {
        let data = res.data.data
        if(data.avatarId !== 0) this.imageUrl = data.avatar.url
        this.form1 = {
          avatar: data.avatarId !== 0 ? data.avatarId : '',
          gender: data.gender.toString(),
          name:  data.name,  
          startWorkYear: data.startWorkYear*1000,
          birth: data.birth*1000,
          from: 1,
        }
        console.log(this.form1)
      })
    }

    // 验证
    validate1() {
      console.log(this.form1)
      if(!this.checkName()) return false
      if(!this.checkWorkYear()) return false
      if(!this.checkBirth()) return false
      if(!this.checkAva()) return false
      return true
    }

    // 第一步
      checkAva() {
        var pattern = /^[\u4E00-\u9FA5\s]{2,10}$/
        if(!this.form1.avatar && this.form1.avatar!==0){
          this.setHint('请上传你的头像')
          return false
        }else {
          return true
        }
      }
      checkName() {
        var pattern = /^[\u4E00-\u9FA5\s]{2,10}$/
        if(!pattern.test(this.form1.name)){
          this.setHint('请填写2-10字的真实姓名')
          return false
        }else {
          return true
        }
      }

      checkBirth() {
        var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
        if(!this.form1.birth && !pattern.test(this.form1.birth)){
          this.setHint('请选择出生年月')
          return false
        }else {
          return true
        }
      }

      checkWorkYear() {
        var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
        console.log(!this.form1.startWorkYear,this.form1.startWorkYear)
        if(!this.form1.startWorkYear && !pattern.test(this.form1.startWorkYear)){
          this.setHint('请选择工作时间')
          return false
        }else {
          return true
        }
      }
    // 第一步


    // 下载
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form1.avatar = file.response.data[0].id
        console.log(file)
      }

      beforeAvatarUpload(file) {
        console.log(file)
        const fileNames = ['png','jpg','jpeg','gif','JPG','JPEG','GIF','PNG']
        const isLt10M = file.size / 1024 / 1024 < 10
        let name = file.name.split(".")[1]
        let isUpload = fileNames.indexOf(name)
        if(isUpload<0 || !isLt10M){
          this.$alert('提示', '只支持JPG、JPEG、GIF、PNG格式，文件小于10M', {
            type: 'warning',
            confirmButtonText: '确定',
          })
          return false
        }

        return true
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
        const params = this.transformData(this.form1)
        subName({...params}).then(res => {
          this.step = index
          this.$router.push({name: 'resumeSecondPost'})
        }).catch(
          err => this.setHint(err.data.msg || '错误')
        )
      }
    }

    transformData () {
      const newForm = Object.assign({}, this.form1 || {})
      newForm.birth =  newForm.birth/1000
      newForm.startWorkYear =  newForm.startWorkYear/1000

      console.log(newForm)
      return newForm
    }
    
    setHint (text) {
      console.log(text)
      this.formHint = {    //form提示框
        isShow: true,
        text: text
      }
      clearTimeout(this.hintSetTime) 
      this.hintSetTime = setTimeout(()=> {
        this.formHint.isShow = false
      }, 3000);
    }

    handleClick(e) {
      if(e === 'out'){
        this.$store.dispatch('logoutApi')
          .then(() => {
            this.$router.push({name: 'putIn'})
          })
      }
    }
  }
</script>
<style lang="less">

.resumePost {
  padding: 48px 0 100px 0;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #652791;
  background: url(../../../assets/images/activity/putIn/bg_createjl.png) 100% repeat #652791;
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
    position: relative;
    height: 660px;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
    .contain {

    }
    .formHint {
      height:60px;
      background:rgba(255,244,244,1);
      border-radius:4px;
      padding: 0 27px;
      position: absolute;
      left: 50%;
      top: 0px;
      transform: translate(-50%,0);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(237,92,92,1);
      white-space:nowrap;
      z-index: 100;
      &.two {
        height:34px;
      }
      img {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        display: block;
      }
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
      top: -40px;
      left: 50%;
      margin-left: -53px;
      box-sizing: border-box;
      overflow: hidden;
      .avatar-uploader {
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-upload {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: auto;
        line-height: 100%;
        text-align: center;
        position: relative;
        left: 6px;
        top: -2px;
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
      box-sizing: border-box;
      margin-bottom: 20px;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        box-sizing: border-box;
        padding: 0 100px 0 30px;
        color:rgba(40,40,40,1);
        font-size:14px;
        font-weight:400;
      }
      .limit{
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        font-size:14px;
        font-weight:300;
        color:rgba(146,146,146,1);
      }
    }
    .formRadio {
      height:46px;
      width:370px;
      margin-bottom: 20px;
      .el-radio-group {
        display: flex;
        justify-content: space-between;
        .el-radio {
          width:180px;
          height:46px;
          background:rgba(251,249,252,0.8);
          border-radius:23px;
          border:1px solid rgba(242,237,245,1);
          display: flex;
          align-items: center;
          justify-content: center;

          &.is-checked {
            border: 1px solid #8351A7;
          }
        }
      }
    }
    .formTimeItem {
      width:370px;
      height:46px;
      line-height: 46px;
      display: flex;
      color: #666666;
      margin-bottom: 20px;

      background:rgba(251,249,252,0.8);
      border-radius:23px;
      border:1px solid rgba(242,237,245,1);
      display: inline-block;
      overflow: hidden;
      box-sizing: border-box;
      vertical-align: middle;
      .el-input__prefix{
        display: none;
      }
      .el-date-editor{
        width: 100%;
      }
      input{
        background: transparent;
        border: none;
        height: 46px;
        line-height: 46px;
      }
    }
    .submit {
      width:260px;
      height:50px;
      line-height:50px;
      background:rgba(101,39,145,1);
      border-radius:25px;
      margin: 0 auto;
      line-height: 50px;
      text-align: center;
      margin-top: 30px;
      font-size:16px;
      font-weight:600;
      color:rgba(255,255,255,1);
    }
  }

  .recommend {
    width:450px;
    height:70px;
    padding: 10px 22px;
    margin: 38px auto 60px;
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
      background: #fff;
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