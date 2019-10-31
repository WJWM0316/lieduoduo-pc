<template>
<div class="resumeOpFirstMain">
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
      <input placeholder="请输入真实姓名" v-model="formData.name" class="default" maxlength="10" />
      <div class="limit">
        <span>{{formData.name.length}}</span>/<span>10</span>
      </div>
    </div>

    <div class="formRadio">
      <el-radio-group v-model="formData.gender">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </div>

    <div class="formTimeItem">
      <el-date-picker
        type="date"
        placeholder="选择你的出生年月"
        v-model="formData.birth"
        format="yyyy-MM-dd"
        value-format="timestamp"
        @focus="focus('#birthDom')"
        @blur="blur('#birthDom')"
      ></el-date-picker>
      <div v-if="!formData.birth">选择你的出生年月</div>
      <div v-else>{{formData.birth | date('YYYY-MM-DD')}}</div>
      <i class="el-icon-caret-bottom defalut-position" id="birthDom"></i>
    </div>

    <div class="formTimeItem">
      <div v-if="!formData.startWorkYear">选择参加工作时间</div>
      <div v-else>{{formData.startWorkYear | date('YYYY-MM-DD')}}</div>
      <el-date-picker
        type="date"
        placeholder="选择参加工作时间"
        v-model="formData.startWorkYear"
        value-format="timestamp"
        @focus="focus('#startWorkYearDom')"
        @blur="blur('#startWorkYearDom')"
      ></el-date-picker>
      <i class="el-icon-caret-bottom defalut-position" id="startWorkYearDom"></i>
    </div>
    <div class="submit" @click="submit(1)">继续</div>
  </div>
</div>

</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { setResumeFirstApi, getResumeFirstApi } from '@/api/putIn'
import MyCropper from '@/components/common/cropper'
import {userNameReg} from '@/util/fieldRegular.js'
@Component({
  name: 'resumeFirstPost',
  components: {
    MyCropper
  }
})
export default class CourseList extends Vue {
    formData = {
      avatar: '',
      gender: '1',
      name: '',
      startWorkYear: '',
      birth: '',
      from: 1
    }
    imageUrl = '' // 头像
    handleHeaders = {
      'Authorization': ''
    }
    handleData = {
      'attach_type': 'avatar'
    }
    imageUpload = {
      hasUploaded: false,
      btnTxt: '',
      tips: '建议尺寸160X160px ，JPG、PNG格式，图片小于5M',
      showError: false,
      accept: '.jpeg, .png, .jpg'
    }
    imageUploadSuccess (res) {
      this.formData.avatar = res.id
      this.imageUrl = res.url
    }

    imageUploadFail (res) {
      if (Object.prototype.toString.call(res) === '[object String]') {
        this.$message.error(`${res}~`)
      } else {
        this.$message.error(`${res.msg}~`)
      }
    }

    mounted () {
      this.init()
    }

    init () {
      this.getResumeFirst()
    }

    getResumeFirst () {
      return new Promise((resolve) => {
        getResumeFirstApi().then(res => {
          let data = res.data.data
          this.formData.from = 1
          this.formData.name = data.name
          this.formData.gender = data.gender
          this.formData.avatar = data.avatarId ? data.avatarId : ''
          this.formData.startWorkYear = data.startWorkYear ? data.startWorkYear * 1000 : ''
          this.formData.birth = data.birth ? data.birth * 1000 : ''
          this.imageUrl = data.avatarId ? data.avatar.smallUrl : ''
          resolve(data)
        })
      })
    }
    // 提交
    submit (index) {
      const params = this.transformData(this.formData)
      let title = ''
      if (!params.avatar) {
        title = '请上传头像'
      } else if (!params.name) {
        title = '请输入真实姓名'
      } else if (!userNameReg.test(params.name)) {
        title = '真实姓名需为2~20个字符'
      } else if (!params.startWorkYear) {
        title = '请选择开始工作时间'
      } else if (!params.birth) {
        title = '请选择您的生日'
      }
      if (title) {
        this.$message.error(title)
        return
      }
      setResumeFirstApi({ ...params }).then(() => {
        this.getResumeFirst().then(res => {
          let userInfo = this.userInfo
          userInfo.avatarInfo = res.data.data.avatar
          userInfo.realname = res.data.data.name
          this.$store.dispatch('setUserInfo', userInfo)
          this.$parent.step++
        })
      })
    }

    transformData () {
      const newForm = Object.assign({}, this.formData || {})
      newForm.birth = newForm.birth / 1000
      if (newForm.startWorkYear === 0) {
        newForm.startWorkYear = ''
      } else {
        newForm.startWorkYear = newForm.startWorkYear / 1000
      }
      return newForm
    }

    focus (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position icon_active'
    }
    blur (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position'
    }
  }
</script>
<style lang="scss" scoped>
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
</style>
