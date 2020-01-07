<template>
  <div class="step-wrapper">
    <el-form :model="form" ref="form" :rules="formRules">
      <el-form-item :prop="form.avatarUrl">
        <c-picture
          :value.sync="form.avatarUrl"
          attach-type="avatar"
          :cropper="true"
          :size="5"
          cropper-radius="50%"
          :before-tips="true"
          @before="avatarLoading = true"
          @fail="avatarLoading = false"
          class="step-avatar"
          v-loading="avatarLoading"
          @change="handleChangeAvatar">
          <div class="step-avatar-image" v-if="form.avatarUrl">
            <img :src="form.avatarUrl">
          </div>
            <div class="avater-empty" v-else>
            <span class="iconfont icon-xiangji avatar-uploader-icon" />
          </div>
        </c-picture>
      </el-form-item>
      <el-form-item prop="name" style="padding-top: 26px;">
        <el-input placeholder="请输入真实姓名" v-model="form.name" class="default" maxlength="20">
          <span slot="suffix" class="input-value-length"><i>{{form.name.length}}</i>/20</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="gender">
        <button-radio class="create-resume-radio" v-model="form.gender" :datas="gender" />
      </el-form-item>
      <el-form-item prop="birth">
        <date-picker v-model="form.birth" :skip="15" :year-limit="50" placeholder="选择你的出生年月" />
      </el-form-item>
      <el-form-item prop="startWorkYear">
        <date-picker v-model="form.startWorkYear" :year-limit="65" :show-text-select="true" text-value="暂无工作经验" placeholder="选择参加工作时间" />
      </el-form-item>
      <div class="btn-box">
        <div class="over-lay">
          <el-button type="primary" @click="handleSubmit()" class="full" :loading="saveLoading">继续</el-button>
        </div>
        <div class="mask"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
import CPicture from '@/components/common/upload/picture'
import DatePicker from '@/views/c-resume/components/datePicker'
import ButtonRadio from '@/views/c-resume/components/buttonRadio'
import { Gender } from '@/config/vars'
import { setResumeFirstApi, getResumeFirstApi } from '@/api/putIn'
import { userNameReg } from '@/util/fieldRegular.js'
export default {
  props: {
    step: {
      type: Number,
      default: 1
    },
    skip: Number
  },
  components: { CPicture, DatePicker, ButtonRadio },
  data () {
    const userNameValidate = (rule, value, callback) => {
      if (userNameReg.test(value)) {
        callback()
      } else {
        callback(new Error('姓名需为2-20个汉字或英文'))
      }
    }
    return {
      form: {
        avatar: null,
        avatarUrl: '',
        gender: 1,
        name: '',
        startWorkYear: '',
        birth: ''
      },
      avatarLoading: false,
      saveLoading: false,
      loaded: false,
      gender: Gender,
      formRules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }, { validator: userNameValidate, trigger: 'blur' }],
        gender: [{ required: true, type: 'number', message: '请选择性别', trigger: 'change' }],
        birth: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
        startWorkYear: [{ required: true, message: '请选择工作年份', trigger: 'change' }]
      }
    }
  },
  activated () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      if (this.loaded) return
      getResumeFirstApi().then(({ data }) => {
        this.loaded = true
        const { startWorkYear, birth, avatar, avatarId, gender, name } = data.data
        Object.assign(this.form, {
          name,
          gender: gender || 1,
          avatar: avatarId,
          avatarUrl: (avatarId && avatar.smallUrl) || '',
          startWorkYear: !isNaN(startWorkYear) && startWorkYear !== null ? startWorkYear * 1000 : '',
          birth: birth ? birth * 1000 : ''
        })
      })
    },
    handleSubmit () {
      if (!this.loaded) return
      this.$refs.form.validate(valid => {
        if (valid) {
          const { birth, startWorkYear, avatar } = this.form
          if (!avatar) {
            this.$message.warning('请上传头像～')
            return
          }
          const datas = {
            ...this.form,
            birth: isNaN(birth) ? parseInt(new Date(birth).getTime() / 1000) : parseInt(birth) / 1000,
            startWorkYear: startWorkYear === 0 ? 0 : isNaN(startWorkYear) ? parseInt(new Date(startWorkYear).getTime() / 1000) : parseInt(startWorkYear) / 1000
          }
          this.saveLoading = true
          setResumeFirstApi(datas).then(({ data }) => {
            this.saveLoading = false
            if (data.httpStatus === 200) {
              let userInfo = this.$store.getters.userInfo
              userInfo.realname = datas.name
              userInfo.avatarId = datas.avatar
              userInfo.avatarInfo.smallUrl = datas.avatarUrl
              this.$store.dispatch('setUserInfo', userInfo)
              this.$emit('update:skip', datas.startWorkYear === 0 ? 2 : null)
              this.$emit('update:step', datas.startWorkYear === 0 ? 3 : 2)
            }
          }).catch(() => {
            this.saveLoading = false
            this.avatarLoading = false
          })
        }
      })
    },
    handleChangeAvatar (item) {
      this.form.avatar = item[0].id
      this.form.avatarUrl = item[0].smallUrl
      this.avatarLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.step-avatar{
  width: 106px;
  height: 106px;
  border-radius: 50%;
  border:4px solid #fff;
  background: $bg-color-5;
  position: absolute;
  overflow: hidden;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  top: -93px;
  & /deep/ .single-upload {
    cursor: pointer;
    height: 100%;
    & > div {
      width: 100%;
    }
  }
  & /deep/ .el-loading-mask {
    border-radius: 50%;
  }
}
.create-resume-radio /deep/ {
  .c-button-radio {
    width: 175px;
  }
}
.avater-empty .iconfont {
  color: $main-color-1;
  text-align: center;
  line-height: 106px;
  font-size: 32px;
}
.step-avatar-image {
  &::after {
    content: "";
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
