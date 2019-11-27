<template>

<div class="content">
  <div class="myForm">
    <div class="form-header">
      <h3>请填写教育经历</h3>
    </div>
    <div class="formItem">
      <input placeholder="请输入学校名称" v-model="form.school" class="default" maxlength="50" />
      <div class="limit">
        <span>{{form.school.length}}</span>/<span>50</span>
      </div>
    </div>
    <div class="formItem">
      <input placeholder="请输入专业名称" v-model="form.major" class="default" />
      <div class="limit">
        <span>{{form.major.length}}</span>/<span>50</span>
      </div>
    </div>
    <div class="formItem">
      <el-select v-model="form.degree" placeholder="请选择学历" @focus="focus('#degree')"
          @blur="blur('#degree')">
        <el-option
          v-for="item in degreeAllLists"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
      <i class="el-icon-caret-bottom defalut-position" id="degree"></i>
    </div>
    <div class="formItem2">
      <div class="start-time">
        <div v-if="!form.startTime" style="padding-left: 30px; color: #929292; font-weight: 300;">请选择开始时间</div>
        <div v-else style="padding-left: 30px; color: #282828">{{form.startTime | date('YYYY-MM-DD')}}</div>
        <i class="el-icon-caret-bottom defalut-position" id="startTime"></i>
        <el-date-picker
          v-model="form.startTime"
          type="date"
          @focus="focus('#startTime')"
          @blur="blur('#startTime')"
          placeholder="请选择开始时间">
        </el-date-picker>
      </div>～ &nbsp;&nbsp;
      <div class="end-time">
        <div v-if="!form.endTime" style="padding-left: 30px; color: #929292; font-weight: 300;">
          <template v-if="form.endTime === ''">
            请选择结束时间
          </template>
          <template v-else>
            至今
          </template>
        </div>
        <div v-else style="padding-left: 30px; color: #282828">{{form.endTime | date('YYYY-MM-DD')}}</div>
        <i class="el-icon-caret-bottom defalut-position" id="endTime"></i>

        <el-date-picker
          v-model="form.endTime"
          type="date"
          @focus="focus('#endTime')"
          @blur="blur('#endTime')"
          :pickerOptions="pickerOptions"
          placeholder="请选择开始时间">
        </el-date-picker>
      </div>
    </div>
    <div class="btn-box">
      <div class="over-lay">
        <div class="btn-pre" @click="lastStep">上一步</div>
        <div class="btn-confirm" @click="submit">继续</div>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</div>

</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { schoolNameReg, majorNameReg } from '@/util/fieldRegular.js'
import {
  getDegreeAllListsApi,
  getResumeThirdStepApi,
  setResumeThirdApi
} from '@/api/putIn'
  @Component({
    name: 'resumeThirdPost'
  })
export default class resumeThirdPost extends Vue {
    pickerOptions = {
      shortcuts: [
        {
          text: '至今',
          onClick: picker => picker.$emit('pick', 0)
        }
      ]
    }
    form = {
      school: '',
      major: '',
      degree: '',
      startTime: '',
      endTime: '',
      internships: [],
      educations: []
    }
    degreeAllLists = []
    getDegreeAllLists () {
      return getDegreeAllListsApi().then(res => (this.degreeAllLists = res.data.data))
    }

    // 返回上一步
    lastStep () {
      this.$parent.step--
    }

    mounted () {
      this.getDegreeAllLists()
      this.init()
    }
    init () {
      return getResumeThirdStepApi().then(res => {
        let educations = res.data.data.educations
        let internships = res.data.data.internships
        educations.map(field => {
          if (field.startTime) {
            field.startTime = new Date(field.startTime * 1000)
          } else {
            field.startTime = new Date()
          }
          if (field.endTime) {
            field.endTime = new Date(field.endTime * 1000)
          } else {
            field.endTime = new Date()
          }
        })
        this.internships = internships
        this.educations = educations
        if (educations.length) {
          this.form.school = educations[0].school
          this.form.major = educations[0].major
          this.form.degree = educations[0].degree
          this.form.startTime = educations[0].startTime
          this.form.endTime = educations[0].endTime
        }
      })
    }

    submit () {
      let item = {
        school: this.form.school,
        major: this.form.major,
        degree: this.form.degree,
        startTime: Date.parse(this.form.startTime) / 1000,
        endTime: this.form.endTime ? Date.parse(this.form.endTime) / 1000 : 0
      }
      let title = ''
      if (!item.school) {
        title = '请输入学校名称'
      } else if (!schoolNameReg.test(item.school)) {
        title = '学校名称需为2~50个字符'
      } else if (!item.major) {
        title = '请输入专业名称'
      } else if (!majorNameReg.test(item.major)) {
        title = '专业名称需为2~50个字符'
      } else if (!item.degree) {
        title = '请选择学历'
      } else if (!item.startTime) {
        title = '请选择开始时间'
      } else if (!item.endTime && item.endTime !== 0) {
        title = '请选择结束时间'
      } else if (item.startTime > item.endTime && item.endTime !== 0) {
        title = '结束时间不能小于开始时间'
      }
      if (title) {
        this.$message.error(title)
        return
      }
      let educations = this.form.educations
      educations.shift()
      educations.push(item)
      setResumeThirdApi({
        internships: this.form.internships,
        educations: educations
      }).then(() => {
        this.$parent.step++
      })
    }
    focus (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position icon_active'
    }
    blur (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position'
    }
  }
</script>
<style lang="scss">
.el-input__suffix{
    display: none;
  }
  .defalut-position {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    color: #CDCBCF;
    transition: all ease .3s;
    z-index: 222
  }
  .icon_active{
    transform: translateY(-50%) rotate(180deg);
  }
  .content {
    position: relative;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
  }
  .h11 {
    font-size:22px;
    font-weight:700;
    color:#fff;
    line-height:32px;
    padding-bottom: 38px;
    padding-top: 48px;
    span {
      color:#FFDC29;
    }
  }
  .myForm {
    width:450px;
    padding: 50px 40px 44px 40px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
    border-radius: 8px;
    border:1px solid rgba(255,255,255,1);
    margin: 0 auto;
    position: relative;
    .formItem {
      height:46px;
      background:$bg-color-1;
      border-radius: 4px;
      margin-bottom: 20px;
      position: relative;
      .el-input__inner {
        color:rgba(40,40,40,1);
        font-size:14px;
        font-weight:400;
      }
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
        background:$bg-color-1;
        border-radius: 4px;
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        vertical-align: middle;
        position: relative;
        text-align: left;
      }
      .end-time{
        width:176px;
        height:46px;
        background:$bg-color-1;
        border-radius: 4px;
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        vertical-align: middle;
        position: relative;
        text-align: left;
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
      text-align: center;
      margin-bottom: 40px;
      overflow: hidden;
      line-height: 33px;
      h3{
        display: inline-block;
        // float: left;
        font-weight:700;
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
</style>
