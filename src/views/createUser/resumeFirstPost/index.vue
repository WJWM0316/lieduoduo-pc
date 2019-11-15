<template>

<div class="resumePost">
  <my-header></my-header>
  <div class="middle">
    <div class="contain">
      <h3 class="title"><span>3分钟</span>创建微简历，<span>1000+名企</span>高薪职位任你选</h3>
      <img class="slogon-box" src="../../../assets/images/activity/putIn/img_sentence_01@2x.png" />
      <div class="resumeOpFirstMain">
        <div class="formHint" v-if="formHint.isShow && !messagePop.isShow">
          <img class="" src="../../../assets/images/activity/putIn/live_icon_question2.png" />
          {{formHint.text}}
        </div>
        <div class="form">
          <div class="formPic">
            <myCropper
              class="cropperBox"
              :hasUploaded="imageUpload.hasUploaded"
              :btnTxt="imageUpload.btnTxt"
              :accept="imageUpload.accept"
              @success="imageUploadSuccess"
              @fail="imageUploadFail"></myCropper>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else  class="avatar-uploader-icon" src="../../../assets/images/activity/putIn/btn_pic.png" />
          </div>
          <div class="formItem">
            <input placeholder="请输入真实姓名" v-model="form1.name" class="default" maxlength="10" />
            <div class="limit">
              <span>{{form1.name.length}}</span>/<span>10</span>
            </div>
          </div>

          <div class="formRadio">
            <el-radio-group v-model="form1.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </div>

          <div class="formTimeItem">
            <el-date-picker
              type="date"
              placeholder="选择你的出生年月"
              v-model="form1.birth"
              format="yyyy-MM-dd"
              value-format="timestamp"
              @focus="focus('#birthDom')"
              @blur="blur('#birthDom')"
            ></el-date-picker>
            <div v-if="!form1.birth">选择你的出生年月</div>
            <div v-else>{{form1.birth | formatDate}}</div>
            <i class="el-icon-caret-bottom defalut-position" id="birthDom"></i>
          </div>

          <div class="formTimeItem">
            <div v-if="!form1.startWorkYear">选择参加工作时间</div>
            <div v-else>{{form1.startWorkYear | formatDate}}</div>
            <!-- :pickerOptions="pickerOptions" -->
            <el-date-picker
              type="date"
              placeholder="选择参加工作时间"
              v-model="form1.startWorkYear"
              value-format="timestamp"
              @focus="focus('#startWorkYearDom')"
              @blur="blur('#startWorkYearDom')"
            ></el-date-picker>
            <i class="el-icon-caret-bottom defalut-position" id="startWorkYearDom"></i>
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
import myHeader from '../components/header.vue'
import { searchResumeStepApi, setResumeFirstApi, getResumeFirstApi } from '../../../api/putIn'

import MyCropper from '@/components/common/cropper'
import { getAccessToken } from '../../../api/cacheService.js'

  @Component({
    name: 'resumeFirstPost',
    watch: {
      '$route': {
        handler () {
          this.init()
        },
        immediate: true
      }
    },
    components: {
      MyCropper,
      myHeader
    },
    filters: {
      formatDate (date) {
        const dateTime = new Date(date)
        const YY = dateTime.getFullYear()
        const MM =
          dateTime.getMonth() + 1 < 10
            ? '0' + (dateTime.getMonth() + 1)
            : dateTime.getMonth() + 1
        const D =
          dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
        /* const hh =
          dateTime.getHours() < 10
            ? '0' + dateTime.getHours()
            : dateTime.getHours();
        const mm =
          dateTime.getMinutes() < 10
            ? '0' + dateTime.getMinutes()
            : dateTime.getMinutes();
        const ss =
          dateTime.getSeconds() < 10
            ? '0' + dateTime.getSeconds()
            : dateTime.getSeconds(); */
        return `${YY}-${MM}-${D}`
        // return `${YY}-${MM}-${D} ${hh}:${mm}`;
      }
    }
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
      from: 1
    }
    augustInterval = null
    isShowMask = false
    showError = false
    timer = 60
    imageUrl = ''
    handleHeaders = {
      'Authorization': ''
    }
    handleData = {
      'attach_type': 'avatar'
    }
    formHint = { // form提示框
      isShow: false,
      text: ''
    }
    imageUpload = {
      hasUploaded: false,
      btnTxt: '',
      tips: '建议尺寸160X160px ，JPG、PNG格式，图片小于5M',
      showError: false,
      accept: '.jpeg, .png, .jpg'
    }
    step = 1

    pickerOptions = {
      shortcuts: [
        {
          text: '暂无工作经历',
          onClick: picker => picker.$emit('pick', 0)
        }
      ]
    }

    imageUploadSuccess (res) {
      this.form1.avatar = res.id
      this.imageUrl = res.url
    }

    imageUploadFail (res) {
      if (Object.prototype.toString.call(res) === '[object String]') {
        this.setHint(`${res}~`)
      } else {
        this.setHint(`${res.msg}~`)
      }
    }

    mounted () {
      // let query = this.$route.query
      this.handleHeaders['Authorization'] = getAccessToken()
      this.userInfo = this.$store.state.userInfo
    }

    init () {
      this.searchResumeStep()
      this.getResumeFirst()
    }

    // 返回上一步
    lastStep () {
      if (this.step < 1) return
      this.step -= 1
    }

    // 查询简历完善步数
    searchResumeStep () {
      searchResumeStepApi().then(() => {})
    }

    getResumeFirst () {
      return new Promise((resolve) => {
        getResumeFirstApi().then(res => {
          let data = res.data.data
          this.form1.from = 1
          this.form1.name = data.name
          this.form1.gender = data.gender
          this.form1.avatar = data.avatarId ? data.avatarId : ''
          this.form1.startWorkYear = data.startWorkYear ? data.startWorkYear * 1000 : ''
          this.form1.birth = data.birth ? data.birth * 1000 : ''
          this.imageUrl = data.avatarId ? data.avatar.smallUrl : ''
          resolve(data)
        })
      })
    }

    // 验证
    validate1 () {
      if (!this.checkName()) return false
      if (!this.checkWorkYear()) return false
      if (!this.checkBirth()) return false
      if (!this.checkAva()) return false
      return true
    }

    // 第一步
    checkAva () {
      // var pattern = /^[\u4E00-\u9FA5\s]{2,10}$/
      if (!this.form1.avatar && this.form1.avatar !== 0) {
        this.setHint('请上传你的头像')
        return false
      } else {
        return true
      }
    }
    checkName () {
      var pattern = /^[\u4E00-\u9FA5\s]{2,10}$/
      if (!pattern.test(this.form1.name)) {
        this.setHint('请填写2-10字的真实姓名')
        return false
      } else {
        return true
      }
    }

    checkBirth () {
      var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!this.form1.birth && !pattern.test(this.form1.birth)) {
        this.setHint('请选择出生年月')
        return false
      } else {
        return true
      }
    }

    checkWorkYear () {
      // var pattern = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!this.form1.startWorkYear && this.form1.startWorkYear !== 0) {
        this.setHint('请选择工作时间')
        return false
      } else {
        return true
      }
    }
    // 第一步

    // 下载
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form1.avatar = file.response.data[0].id
    }

    beforeAvatarUpload (file) {
      const fileNames = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'GIF', 'PNG']
      const isLt10M = file.size / 1024 / 1024 < 10
      let name = file.name.split('.')[1]
      let isUpload = fileNames.indexOf(name)
      if (isUpload < 0 || !isLt10M) {
        this.$alert('提示', '只支持JPG、JPEG、GIF、PNG格式，文件小于10M', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }

      return true
    }

    // 提交
    submit (index) {
      const params = this.transformData(this.form1)
      setResumeFirstApi({ ...params }).then(() => {
        this.getResumeFirst().then(res => {
          let userInfo = this.userInfo
          userInfo.avatarInfo = res.avatar
          userInfo.realname = res.name
          this.$store.dispatch('setUserInfo', userInfo)
          this.$router.push({ name: 'resumeSecondPost' })
        })
      })
    }

    transformData () {
      const newForm = Object.assign({}, this.form1 || {})
      newForm.birth = newForm.birth / 1000
      if (newForm.startWorkYear === 0) {
        newForm.startWorkYear = ''
      } else {
        newForm.startWorkYear = newForm.startWorkYear / 1000
      }
      return newForm
    }

    setHint (text) {
      this.formHint = { // form提示框
        isShow: true,
        text: text
      }
      clearTimeout(this.hintSetTime)
      this.hintSetTime = setTimeout(() => {
        this.formHint.isShow = false
      }, 3000)
    }

    focus (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position icon_active'
    }
    blur (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position'
    }
  }
</script>
<style lang="less">

.resumePost {
  padding: 64px 0 100px 0;
  height: 100vh;
  min-height: 900px;
  box-sizing: border-box;
  background: url(../../../assets/images/activity/putIn/bg_createjl.png) 100% repeat #652791;
  .defalut-position{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
    color: #CDCBCF;
    transition: all ease .3s;
    z-index: 222
  }
  .icon_active{
    transform: translateY(-50%) rotate(180deg);
  }
  .middle {
    position: relative;
    background-repeat: no-repeat;
    background-position: bottom;
    text-align: center;
    width: 100%;
    background-size: auto 112px;
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
    font-weight:700;
    color:#fff;
    line-height:32px;
    padding-top: 48px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      .cropperBox {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 10;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width:40px;
        height:auto;
        line-height: 100%;
        text-align: center;
        position: relative;
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
      position: relative;
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
      .el-date-editor{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
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

  .slogon-box{
    width:450px;
    height:auto;
    // background:rgba(255,255,255,0.1);
    margin: 38px auto 60px;
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
  }
  .drop_icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}

</style>
