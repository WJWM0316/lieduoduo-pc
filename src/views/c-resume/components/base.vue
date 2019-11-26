<template>
  <div class="base-info">
    <wrapper class="base-info-wrapper" @command="handleCommand" :status="status">
      <template slot="header">
        <Picture
          v-if="status !== 'view'"
          :value.sync="info.avatarUrl"
          attach-type="avatar"
          @before="avatarLoading = true"
          @fail="avatarLoading = false"
          @change="handleChangeAvatar"
          v-loading="avatarLoading">
          <div class="avatar-wrapper">
            <div class="avatar">
              <img :src="info.avatarUrl" />
              <span class="iconfont icon-xiangji"></span>
            </div>
            <span class="user-gender" :class="info.gender == 1 ? 'male' : 'female'" >
              <i class="iconfont" :class="info.gender == 1 ? 'icon-nan' : 'icon-nvsheng'"></i>
            </span>
          </div>
        </Picture>
        <div class="avatar-wrapper" v-else>
          <div class="avatar">
            <img :src="info.avatarUrl" />
          </div>
          <span class="user-gender" :class="info.gender == 1 ? 'male' : 'female'" >
            <i class="iconfont" :class="info.gender == 1 ? 'icon-nan' : 'icon-nvsheng'"></i>
          </span>
        </div>
      </template>
      <template slot="content">
        <div class="resume-info">
          <div>
            <p class="user-name">{{info.name}}</p>
            <p class="user-company" v-if="resume.lastCompanyName">
              <span class="ellipsis">{{resume.lastCompanyName}}</span> <span>-</span> <span  class="ellipsis">{{resume.lastPosition}}</span>
            </p>
            <p>
              <span><i class="iconfont icon-zhiwei"></i>{{resume.workAgeDesc}}</span>
              <span><i class="iconfont icon-nianling"></i>{{resume.age}}岁</span>
              <span><i class="iconfont icon-jiaoyu"></i>{{resume.degreeDesc}}</span>
            </p>
          </div>
          <div>
            <p v-if="resume.jobStatus"><span class="resume-status">{{resume.jobStatusDesc}}</span></p>
            <p class="user-phone"><i class="iconfont icon-dianhua"></i>{{resume.mobile}}</p>
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
              <!-- <el-date-picker
                v-model="form.birth"
                type="month"
                placeholder="选择月">
              </el-date-picker> -->
              <date-picker v-model="form.birth" :skip="15" :year-limit="50" placeholder="选择月" />
             </el-form-item>
          </div>
          <div class="form-item">
             <p class="form-title">开始工作时间</p>
             <el-form-item prop="startWorkYear">
              <!-- <el-date-picker
                v-model="form.startWorkYear"
                type="month"
                placeholder="选择月">
              </el-date-picker> -->
              <date-picker v-model="form.startWorkYear" :year-limit="65" :show-text-select="true" text-value="暂无工作经验" placeholder="选择月" />
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
import { setResumeBaseInfo, getResumeBaseInfo, setResumeAvatar } from 'API/resume'
import Picture from 'COMPONENTS/common/upload/picture'
import DatePicker from './datePicker'
import Wrapper from './wrapper'
import ButtonRadio from './buttonRadio'
import { JobStatus, Gender } from '@/config/vars'
export default {
  props: {
    propClass: String,
    resume: {
      type: Object,
      default: () => ({})
    },
    status: String
  },
  components: {
    Wrapper,
    Picture,
    ButtonRadio,
    DatePicker
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
        birthDesc: '',
        startWorkYear: '',
        startWorkYearDesc: '',
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
        birth: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
        startWorkYear: [{ required: true, message: '请选择工作年份', trigger: 'change' }],
        jobStatus: [{ required: true, type: 'number', message: '请选择求职状态', trigger: 'change' }]
      },
      jobstatus: JobStatus,
      gender: Gender,
      avatarLoading: false
    }
  },
  methods: {
    handleCommand ({ type, cb }) {
      if (type === 'edit') {
        Object.assign(this.form, this.info)
        this.form.birth = this.info.birthDesc
        this.form.startWorkYear = this.info.startWorkYear * 1000
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { birth, startWorkYear } = this.form
            const datas = {
              ...this.form,
              birth: isNaN(birth) ? parseInt(new Date(birth.replace('-', '/')).getTime() / 1000) : parseInt(birth) / 1000,
              startWorkYear: startWorkYear === 0 ? 0 : isNaN(startWorkYear) ? parseInt(new Date(startWorkYear.replace('-', '/')).getTime() / 1000) : parseInt(startWorkYear) / 1000
            }
            setResumeBaseInfo(datas).then(async ({ data }) => {
              if (data.httpStatus === 200) {
                await this.getBaseInfo()
                cb()
              } else {
                // eslint-disable-next-line standard/no-callback-literal
                cb(false)
              }
            }).catch(() => {
              // eslint-disable-next-line standard/no-callback-literal
              cb(false)
            })
          } else {
            // eslint-disable-next-line standard/no-callback-literal
            cb(false)
          }
        })
      }
    },
    handleChangeAvatar (item) {
      this.avatarLoading = true
      setResumeAvatar({ attachId: item[0].id }).then(({ data }) => {
        if (data.httpStatus === 200) {
          // 将头像信息写入到vuex
          this.$store.commit('overwriteResume', {
            avatar: item[0]
          })
        }
        this.avatarLoading = false
      }).catch(() => {
        this.avatarLoading = false
      })
    },
    async getBaseInfo () {
      await getResumeBaseInfo().then(({ data }) => {
        // 将内容写入到vuex 中
        this.$store.commit('overwriteResume', data.data || {})
      })
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
    color: #fff;
    z-index: 5;
    height: 27px;
    width: 27px;
    line-height: 28px;
    border-radius: 50%;
    text-align: center;
  }
  .user-gender.male {
    background: #2778FF;
  }
  .user-gender.female {
    background: #FF6796;
  }
  .iconfont {
    font-size: 28px;
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
  .user-company span {
    display: inline-block;
    vertical-align: middle;
    margin-left: 2px;
  }
  .user-company span.ellipsis,.user-name {
    @include ellipsis;
  }
  .user-name {
    max-width: 200px;
  }
  .user-company span.ellipsis {
    max-width: 180px;
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
