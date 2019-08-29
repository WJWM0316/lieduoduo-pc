<template>

<div id="resume-three">
  <header id="header2" >
    <section>
      <div class="left">
        <div class="companyMsg">
          <p>精英人才招聘神器</p>
          <p>www.lieduoduo.co</p>
        </div>
      </div>  
        <el-dropdown trigger="click">
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
  <div class="content">

    <h3 class="h11"><span>3分钟</span>创建微简历，<span>1000+名企</span>高薪职位任你选</h3>
    <div class="slogon-box">
      <div class="img-box"></div>
      <div class="infos">
        <div class="h33">爱奇艺产品总监</div>
        <div class="p44">很期待与你这样的精英人才相遇</div>
      </div>
    </div>
    <div class="myForm">

      <div class="form-header">
        <h3>请填写教育经历</h3>
        <!-- <div class="add-btn">教育经历</div> -->
      </div>

      <div class="formItem">
        <input placeholder="请输入学校名称" v-model="form.school" class="default" maxlength="50" />
        <div class="limit">
          <span>{{form.school.length}}</span>/<span>50</span>
        </div>
      </div>

      <div class="formItem">
        <input placeholder="请输入专业名称" v-model="form.major" class="default" />
      </div>

      <div class="formItem">
        <el-select v-model="form.degree" placeholder="请选择学历">
          <el-option
            v-for="item in degreeAllLists"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="formItem2">
        <div class="start-time">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="请选择开始时间">
          </el-date-picker>
        </div>～ &nbsp;&nbsp;
        <div class="end-time">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="请选择开始时间">
          </el-date-picker>
        </div>
      </div>

      <div class="btn-box">
        <div class="over-lay">
          <div class="btn-pre" @click="lastStep">上一步</div>
          <div class="btn-confirm" @click="check">继续</div>
        </div>
        <div class="mask"></div>
      </div>

    </div>
  </div>
</div>

</template>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {
    getUserInfoApi,
    searchResumeStepApi,
    setResumeFirstApi,
    setResumeSecondApi,
    setResumeThirdApi,
    setResumeFourthApi,
    getDegreeAllListsApi,
    getResumeThirdStepApi
  } from '../../../api/putIn'
  import { getUserIdentity, switchId } from '../../../../config.js'
  import { getAccessToken } from '../../../api/cacheService.js'
  @Component({
    name: 'resumeThirdPost'
  })
  export default class resumeThirdPost extends Vue {
    form = {
      school: '',
      major: '',
      degree: '',
      startTime: '',
      endTime: '',
      internships: [],
      educations: []
    }
    userInfo = {}
    messagePop = {
      isShow: false,
      type: 'help'
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

    degreeAllLists = []
    getDegreeAllLists() {
      return getDegreeAllListsApi().then(res => this.degreeAllLists = res.data.data)
    }

    // 返回上一步
    lastStep() {
      this.$router.push({name: 'resumeSecondPost'})
    }

    check() {

      let schoolCheck = new Promise((resolve, reject) => {
        if(!this.form.school) {
          reject('请填写学校名称')
        } else {
          resolve()
        }
      })

      let majorCheck = new Promise((resolve, reject) => {
        if(!this.form.major) {
          reject('请填写专业名称')
        } else {
          resolve()
        }
      })

      let degreeCheck = new Promise((resolve, reject) => {
        if(!this.form.degree) {
          reject('请选择学历')
        } else {
          resolve()
        }
      })

      let startTime = new Promise((resolve, reject) => {
        if(!this.form.startTime) {
          reject('请选择开始时间')
        } else {
          resolve()
        }
      })

      let endTime = new Promise((resolve, reject) => {
        if(!this.form.startTime) {
          reject('请选择结束时间')
        } else {
          resolve()
        }
      })

      Promise.all([
        schoolCheck,
        majorCheck,
        degreeCheck,
        startTime,
        endTime
      ]).then(() => this.submit()).catch(err => this.$message.error(err))
    }
    mounted () {
      let query = this.$route.query
      this.handleHeaders['Authorization'] = getAccessToken()
      this.userInfo = this.$store.state.userInfo
      this.getDegreeAllLists()
      this.init()
    }
    init () {
      return getResumeThirdStepApi().then(res => {
        let educations = res.data.data.educations
        let internships = res.data.data.internships
        educations.map(field => {
          if(field.startTime) {
            field.startTime = new Date(field.startTime * 1000)
          } else {
            field.startTime = new Date()
          }
          if(field.endTime) {
            field.endTime = new Date(field.endTime * 1000)
          } else {
            field.endTime = new Date()
          }
        })

        this.internships = internships
        this.educations = educations
        this.form.school = educations[0].school
        this.form.major = educations[0].major
        this.form.degree = educations[0].degree
        this.form.startTime = educations[0].startTime
        this.form.endTime = educations[0].endTime
      })
    }

    submit() {
      let item = {
        school: this.form.school,
        major: this.form.major,
        degree: this.form.degree,
        startTime: Date.parse(this.form.startTime)/1000,
        endTime: Date.parse(this.form.endTime)/1000
      }
      let educations = this.form.educations
      educations.shift()
      educations.push(item)
      setResumeThirdApi({
        internships: this.form.internships,
        educations: educations
      }).then(() => {
        this.$router.push({name: 'resumeFourthPost'})
      })
    }
  }
</script>
<style lang="less">
#header2 {
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
#resume-three {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #652791;
  padding-bottom: 130px;
  // background: url(../../../assets/images/bg.png) 100% repeat #652791;
  .content {
    padding-top: 64px;
    position: relative;
    height: 660px;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
  }
  .h11 {
    font-size:22px;
    font-weight:500;
    color:#fff;
    line-height:32px;
    padding-top: 48px;
    padding-bottom: 38px;
    span {
      color:#FFDC29;
    }
  }
  .slogon-box{
    width:450px;
    height:70px;
    background:rgba(255,255,255,0.1);
    border-radius:100px;
    margin: 0 auto 30px;
    display: flex;
    padding: 0 23px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    &:after {
      width: 0;
      height: 0;
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: rgba(255,255,255,0.1) transparent transparent transparent;
      display: block;
      content: '';
    }
    .img-box{
      width:46px;
      height:46px;
      border-radius: 50%;
      background: white;
      margin-right: 20px;
    }
    .infos{
      flex: 1;
      text-align: left;
    }
    .h33{
      height:16px;
      font-size:16px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:16px;
    }
    .p44{
      height:14px;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:300;
      color:rgba(255,255,255,1);
      line-height:14px;
      margin-top: 6px;
    }
  }
  .myForm {
    width:450px;
    padding: 50px 40px 44px 40px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
    border-radius:16px;
    border:1px solid rgba(255,255,255,1);
    margin: 0 auto;
    .formItem {
      height:46px;
      background:rgba(251,249,252,0.8);
      border-radius:23px;
      border:1px solid rgba(242,237,245,1);
      margin-bottom: 20px;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        box-sizing: border-box;
        padding: 0 100px 0 30px;
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
    .el-select{
      height: 100%;
      line-height: 46px;
      width: 100%;
      .el-input__inner{
        border: none;
        line-height: 46px;
        width: 100%;
        height: 46px;
        background: transparent;
        box-sizing: border-box;
        padding: 0 30px;
      }
    }
    .formItem2 {
      width:370px;
      height:46px;
      line-height: 46px;
      display: flex;
      color: #666666;
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
      .start-time{
        width:176px;
        height:46px;
        background:rgba(251,249,252,0.8);
        border-radius:23px;
        border:1px solid rgba(242,237,245,1);
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        vertical-align: middle;
      }
      .end-time{
        width:176px;
        height:46px;
        background:rgba(251,249,252,0.8);
        border-radius:23px;
        border:1px solid rgba(242,237,245,1);
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
    .btn-box{
      height:50px;
      line-height: 50px;
      font-size:16px;
      font-weight:500;
      cursor: pointer;
      position: relative;
      margin-top: 48px;
      .btn-pre{
        width:126px;
        height:50px;
        background:rgba(255,255,255,1);
        border-radius:100px 0px 0px 100px;
        border:1px solid rgba(101,39,145,1);
        box-sizing: border-box;
        display: inline-block;
        color:rgba(101,39,145,1);
        vertical-align: middle;
      }
      .btn-confirm{
        width:240px;
        height:50px;
        background:rgba(101,39,145,1);
        border-radius:0px 25px 25px 0px;
        box-sizing: border-box;
        display: inline-block;
        color: white;
        vertical-align: middle;
      }
      .over-lay{
        position: relative;
        z-index: 2;
      }
      .mask{
        width:360px;
        height:50px;
        border-radius:25px;
        border:1px solid rgba(101,39,145,1);
        position: absolute;
        top: 4px;
        z-index: 1;
        left: 8px;
      }
    }
    input::-webkit-input-placeholder {
      color: #929292;
      font-size: 14px;
      font-weight: 300;
    }
    input::-moz-placeholder {
      color: #929292;
      font-size: 14px;
      font-weight: 300;
    }
    input::-ms-input-placeholder {
      color: #929292;
      font-size: 14px;
      font-weight: 300;
    }
    input::input-placeholder {
      color: #929292;
      font-size: 14px;
      font-weight: 300;
    }
    .form-header{
      text-align: right;
      margin-bottom: 40px;
      overflow: hidden;
      line-height: 33px;
      h3{
        display: inline-block;
        float: left;
        font-weight:500;
        color:rgba(40,40,40,1);
        font-size:24px;
      }
      .add-btn{
        display: inline-block;
        border-radius:15px;
        border:1px solid rgba(131,81,167,1);
        font-size:12px;
        color:rgba(131,81,167,1);
        height: 28px;
        line-height: 28px;
        padding: 0 12px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>