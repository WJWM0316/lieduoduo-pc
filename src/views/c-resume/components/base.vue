<template>
  <div class="base-info">
    <wrapper class="base-info-wrapper" @command="handleCommand">
      <template slot="header">
        <Picture :value.sync="info.avatarUrl">
          <div class="avatar-wrapper">
            <div class="avatar">
              <img :src="info.avatarUrl" />
              <span class="el-icon-camera-solid"></span>
            </div>
            <span class="user-gender">
              <i class="iconfont" :class="info.gender == 1 ? 'icon-xingbiebiaoqian-nan male' : 'icon-xingbiebiaoqian-nv female'"></i>
            </span>
          </div>
        </Picture>
      </template>
      <template slot="content">
        <div class="resume-info">
          <div>
            <p class="user-name">{{info.name}}</p>
            <p class="user-company" v-if="resume.lastCompanyName">{{resume.lastCompanyName}} - {{resume.lastPosition}}</p>
            <p>
              <span><i class="iconfont icon-zhiwei"></i>{{resume.workAgeDesc}}</span>
              <span><i class="iconfont icon-zhiwei"></i>{{resume.age}}岁</span>
              <span><i class="iconfont icon-jiaoyu"></i>{{resume.degreeDesc}}</span>
            </p>
          </div>
          <div>
            <p v-if="resume.jobStatus"><span class="resume-status">{{resume.jobStatusDesc}}</span></p>
            <p class="user-phone"><i class="iconfont icon-zhiwei"></i>{{resume.mobile}}</p>
            <p v-if="resume.wechat" class="user-wechat"><i class="iconfont icon-weixin"></i>{{resume.wechat}}</p>
          </div>
        </div>
      </template>
      <template slot="edit">
        <p class="form-header-title">编辑个人信息</p>
        <el-form
          :model="form"
          :hide-required-asterisk="true"
          :rules="formRules"
          ref="form">
          <div class="form-item">
             <p class="form-title">姓名</p>
             <el-form-item prop="name"><el-input v-model="form.name" /></el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">性别</p>
             <el-form-item prop="gender">
              <button-radio v-model="form.gender" :datas="gender" />
             </el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">出生年月</p>
             <el-form-item prop="birth">
              <el-date-picker
                v-model="form.birth"
                type="month"
                placeholder="选择月">
              </el-date-picker>
             </el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">开始工作时间</p>
             <el-form-item prop="startWorkYear">
              <el-date-picker
                v-model="form.startWorkYear"
                type="month"
                placeholder="选择月">
              </el-date-picker>
             </el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">当前求职状态</p>
             <el-form-item prop="jobStatus">
               <el-select v-model="form.jobStatus">
                  <template v-for="item in jobstatus">
                    <el-option :value="item.value" :label="item.label" :key="item.value" />
                  </template>
                </el-select>
             </el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">最高学历</p>
             <el-form-item prop="name"><el-input v-model="form.degreeDesc" :disabled="true" /></el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">最近任职公司</p>
             <el-form-item prop="name"><el-input v-model="form.lastCompanyName" :disabled="true" /></el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">最近任职</p>
             <el-form-item prop="name"><el-input v-model="form.lastPosition" :disabled="true" /></el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">手机号码</p>
             <el-form-item prop="name"><el-input v-model="form.mobile" :disabled="true" /></el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">微信号（选填）</p>
             <el-form-item prop="name"><el-input v-model="form.wechat" /></el-form-item>
          </div>
        </el-form>
      </template>
    </wrapper>
  </div>
</template>
<script>
import { setBaseInfo } from 'API/resume'
import Picture from 'COMPONENTS/common/upload/picture'
import Wrapper from './wrapper'
import ButtonRadio from './buttonRadio'
import { JobStatus, Gender } from '@/config/vars'
export default {
  props: {
    resume: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Wrapper,
    Picture,
    ButtonRadio
  },
  computed: {
    info () {
      let result = Object.assign({}, this.form)
      const { avatar } = this.resume
      for (let item in result) {
        result[item] = this.resume[item]
      }
      result.avatarUrl = avatar && avatar.url
      result.avatar = avatar && avatar.id
      return result
    }
  },
  data () {
    return {
      form: {
        avatarUrl: '',
        avatar: '',
        name: '',
        gender: null,
        birth: '',
        startWorkYear: '',
        jobStatus: null, // 在职暂不考虑1，离职随时到岗2，在职月内到岗3，在职考虑机会4
        degreeDesc: '',
        mobile: '',
        wechat: '',
        lastCompanyName: '',
        lastPosition: ''
      },
      formRules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        gender: [{ required: true, type: 'number', message: '请选择性别', trigger: 'change' }],
        birth: [{ required: true, type: 'date', message: '请选择出生年月', trigger: 'change' }],
        startWorkYear: [{ required: true, type: 'date', message: '请选择工作年份', trigger: 'change' }],
        jobStatus: [{ required: true, type: 'number', message: '请选择求职状态', trigger: 'change' }]
      },
      jobstatus: JobStatus,
      gender: Gender
    }
  },
  methods: {
    handleCommand ({ type, cb }) {
      if (type === 'edit') {
        Object.assign(this.form, this.info)
        this.form.birth = new Date(this.info.birth * 1000)
        this.form.startWorkYear = new Date(this.info.startWorkYear * 1000)
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { birth, startWorkYear } = this.form
            const datas = {
              ...this.form,
              birth: parseInt(birth.getTime() / 1000),
              startWorkYear: parseInt(startWorkYear.getTime() / 1000)
            }
            setBaseInfo(datas).then(({ data }) => {
              if (data.httpStatus === 200) {
                // 写入vuex
                let { avatar } = this.resume
                avatar.id = datas.avatar
                avatar.url = datas.avatarUrl
                // 获取求职昵称
                const job = this.jobstatus.find(val => val.value === datas.jobStatus)
                this.$store.commit('overwriteResume', {
                  ...datas,
                  jobStatusDesc: job.label,
                  avatar
                })
                cb()
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                cb(false)
              }
            }).catch(() => {
              // eslint-disable-next-line standard/no-callback-literal
              cb(false)
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$base-warpper-height: 112px;
$image-wrapper: 112px;
.base-info-wrapper {
  & /deep/ .single-upload {
    height: $base-warpper-height;
  }
  .picture-wrapper {
    display: inline-block;
  }
}
.avatar-wrapper {
  width: $image-wrapper;
  position: relative;
  .user-gender {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .male,.female {
    font-size: 24px;
    position: relative;
    z-index: 5;
  }
  .male {
    color: #2778FF;
  }
  .female {
    color: #FF6796;
  }
}
.avatar {
  @include img-radius($image-wrapper, $base-warpper-height);
  position: relative;
  cursor: pointer;
  color: #fff;
  span {
    position: absolute;
    z-index: 3;
    left: $image-wrapper / 2 - 18px;;
    top: $base-warpper-height / 2 - 18px;
    font-size: 32px;
    opacity: 0;
  }
}
.avatar:hover::after {
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
  background:rgba(0,0,0,0.5);
  border-radius: 50%;
  z-index: 2;
}
.avatar:hover {
  span {
    opacity: 1;
  }
}
.resume-info {
  @include flex-v-top;
  width: 100%;
  position: relative;
  & > div {
    display: flex;
    justify-content: flex-end;
    height: $base-warpper-height;
    flex-direction: column;
  }
  & > div:last-child {
    margin-left: auto;
  }
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 60px;
    background-color: $border-color-1;
    left: 60%;
    bottom: 0;
  }
  p span{
    vertical-align: middle;
  }
  p {
    color: $font-color-2;
    font-size: 14px;
    line-height: 1.4;
    span + span {
      margin-left: 30px;
    }
  }
  .user-company,.user-name {
    color: $title-color-1;
    font-weight: normal;
  }
  i.iconfont {
    color: $font-color-12;
    font-size: 14px;
    padding-right: 8px;
    vertical-align: middle;
  }
  .user-company {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .user-phone {
    margin-top: 24px;
  }
  .user-wechat {
    margin-top: 16px;
  }
  .user-name {
    font-size: 26px;
  }
  .resume-status {
    padding:5px 10px;
    background-color: $bg-color-5;
    color: $main-color-1;
    font-weight: 500;
    border-radius:2px;
  }
}
</style>
