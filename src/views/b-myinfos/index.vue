<template>
  <!-- b端我的资料 -->
  <div class="app-infos">
    <div class="infos-header">
      <h1>我的资料</h1>
      <el-button type="primary" v-if="currentSharePopup.uid" @click="showSharePopup = true"><i class="iconfont icon-fenxiang"></i>分享主页</el-button>
    </div>
    <p class="app-infos-tips">加“<i>*</i>”号的内容，是必须填写的项目；姓名和性别为招聘官认证信息，修改请联系 400-065-5788</p>
    <el-form :model="form" ref="form" label-suffix=":" :rules="formRules" label-width="120px" class="el-form-infos">
      <el-form-item prop="attachId" label="头像" class="el-form-avatar">
        <Picture
          :value.sync="form.avatarUrl"
          attach-type="avatar"
          :cropper="true"
          cropper-radius="50%"
          :validate-event="true"
          @before="avatarLoading = true"
          @fail="avatarLoading = false"
          @change="handleChangeAvatar">
          <div class="avatar-wrapper" v-loading="avatarLoading">
            <div class="avatar">
              <img :src="form.avatarUrl" />
              <span class="iconfont icon-xiangji"></span>
            </div>
          </div>
        </Picture>
      </el-form-item>
      <el-form-item prop="name" label="姓名"><el-input v-model="form.name" :disabled="true" /></el-form-item>
      <el-form-item prop="gender" label="性别"><el-input v-model="form.genderName" :disabled="true"  /></el-form-item>
      <el-form-item prop="positionTypeId" label="担任职位类型">
        <select-position-type
          v-model.number="form.positionTypeId"
          title="请选择职位类别"
          :label="form.positionType"
          @on-selected="selectedPosition">
        </select-position-type>
      </el-form-item>
      <el-form-item prop="position" label="担任职务"><el-input show-word-limit maxlength="20" v-model="form.position" placeholder="请写担任职务" /></el-form-item>
      <el-form-item prop="email" label="公司邮箱"><el-input v-model="form.email" placeholder="请写公司邮箱" /></el-form-item>
      <el-form-item prop="wechat" label="微信号"><el-input show-word-limit maxlength="20" v-model="form.wechat" placeholder="请写微信号" /></el-form-item>
      <el-form-item prop="signature" label="个性签名"><el-input type="textarea" show-word-limit maxlength="30" v-model="form.signature" placeholder="用一句话介绍你自己吧~" /></el-form-item>
      <el-form-item prop="labels" label="个人标签">
        <select-self-label
          class="self-label-wrapper"
          title="个人标签"
          v-model="form.labels"
          :limit="6" />
      </el-form-item>
      <el-form-item prop="brief" label="个人简介">
        <el-input
          type="textarea"
          :rows="7"
          :show-message="false"
          style="width: 520px;"
          show-word-limit
          maxlength="5000"
          v-model="form.brief" placeholder="请描述你的个人经历或成就，字数范围：6-5000字" />
          <template slot="error"><span></span></template>
          <transition name="el-zoon-in-top">
             <div class="el-form-item__error" style="position: relative" v-show="isShowBriefError">个人简介字数在6到5000之间</div>
          </transition>
          <div class="form-intro" :style="{height: isShowPover ? '224px' : 'auto'}">
            <el-popover
              placement="bottom-start"
              popper-class="form-intro-popover"
              v-model="isShowPover"
              width= "520"
              trigger="click">
              <div class="intros-wrapper">
                <ul class="intro-titles">
                  <template v-for="(intro, index) in intros">
                    <li :key="intro.name" :class="{active: index === introIndex}" @click="introContent = intro.intro; introIndex = index">{{intro.name}}</li>
                  </template>
                </ul>
                <div class="warpper-scroll intro-content">{{introContent}}</div>
              </div>
              <p class="form-intro-tips" slot="reference"><i class="iconfont icon-yulan" /> 看看别人怎么写</p>
            </el-popover>
          </div>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 120px;" type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 分享弹窗 -->
    <share-popup :visible.sync="showSharePopup" type="recruiter" :data="currentSharePopup"/>
  </div>
</template>
<script>
import Picture from 'COMPONENTS/common/upload/picture'
import SelectPositionType from 'COMPONENTS/selectPositionType'
import SelectSelfLabel from './components/selectSelfLabel'
import SharePopup from '@/components/common/sharePopup'
import { getRecruiter, setRecruiter } from '@/api/recruiter'
import { CompanyIntro } from '@/config/vars'
import { emailReg, positionReg, wechatReg } from '@/util/fieldRegular'
export default {
  components: { Picture, SelectPositionType, SelectSelfLabel, SharePopup },
  data () {
    const positionValidate = (rule, value, callback) => {
      if (positionReg.test(value)) {
        callback()
      } else {
        callback(new Error('职位名称需为2-20个字'))
      }
    }
    const wechatValidate = (rule, value, callback) => {
      if (value === '') return callback()
      if (wechatReg.test(value)) {
        callback()
      } else {
        callback(new Error('微信号需为2-20个字符'))
      }
    }
    const emailValidate = (rule, value, callback) => {
      if (emailReg.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    const briefValidate = (rule, value, callback) => {
      if (/^.{6,5000}$/.test(value) || value === '') {
        this.isShowBriefError = false
        callback()
      } else {
        this.isShowBriefError = true
        callback(new Error())
      }
    }
    return {
      avatarLoading: false,
      saveLoading: false,
      isShowPover: false,
      form: {
        attachId: null, // 头像附件ids
        avatarUrl: '',
        name: '', // 真实姓名
        gender: '', // 性别，未知0，男1，女2
        position: '', // 担任职务
        email: '', // 接收简历邮箱
        wechat: '', // 微信号
        signature: '', // 个性签名
        positionTypeId: '', // 职位类型id
        positionType: '',
        brief: '', // 个人简介
        labels: [] // 个人标签
      },
      formRules: {
        attachId: [{ required: true, type: 'number', message: '请上传头像', trigger: 'change' }],
        name: [{ required: true, message: '请填写真实姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        positionTypeId: [{ required: true, message: '请选择担任职位类型', trigger: 'blur' }],
        position: [{ required: true, message: '请填写担任职务', trigger: 'blur' }, { validator: positionValidate, trigger: 'blur' }],
        email: [{ required: true, message: '请填写公司邮箱', trigger: 'blur' }, { validator: emailValidate, trigger: 'blur' }],
        labels: [{ required: true, type: 'array', message: '请选择个人标签', trigger: 'change' }],
        wechat: [{ validator: wechatValidate, trigger: 'blur' }],
        signature: [{ required: true, min: 6, max: 30, message: '个性签名需为6~30个字', trigger: 'blur' }],
        brief: [{ validator: briefValidate, trigger: 'blur' }]
      },
      isShowBriefError: false,
      intros: CompanyIntro,
      introIndex: 0,
      introContent: '',
      showSharePopup: false,
      currentSharePopup: {}
    }
  },
  created () {
    this.getInfos()
    this.introContent = this.intros[0].intro
  },
  methods: {
    // 获取招聘信息
    getInfos () {
      getRecruiter().then(({ data }) => {
        const recruiter = data.data || {}
        const labels = recruiter.personalizedLabels || []
        this.currentSharePopup.uid = recruiter.uid
        Object.assign(this.form, {
          attachId: +recruiter.avatarId,
          labels: labels.map(val => {
            val.name = val.labelName
            return val
          }),
          avatarUrl: recruiter.avatar && recruiter.avatar.middleUrl,
          name: recruiter.name,
          gender: recruiter.gender,
          genderName: recruiter.gender === 1 ? '男' : '女',
          position: recruiter.position,
          email: recruiter.email,
          wechat: recruiter.wechat,
          signature: recruiter.signature,
          positionTypeId: recruiter.positionTypeId,
          positionType: recruiter.positionType,
          brief: recruiter.brief
        })
        // 保存信息
        this.recruiterAvatar = recruiter.avatar
        this.positionTemp = {
          positionTypeTopPid: recruiter.positionTypeTopPid,
          positionTypePid: recruiter.positionTypePid,
          positionTypeId: recruiter.positionTypeId,
          positionType: recruiter.positionType
        }
      })
    },
    handleChangeAvatar (item) {
      this.form.attachId = item[0].id
      this.form.avatarUrl = item[0].middleUrl
      // 保存头像信息
      this.recruiterAvatar = item[0]
      this.avatarLoading = false
    },
    selectedPosition (item) {
      this.form.positionTypeId = item.labelId
      this.form.positionType = item.name

      this.positionTemp = {
        positionTypeTopPid: item.topPid,
        positionTypePid: item.pid,
        positionTypeId: item.labelId,
        positionType: item.name
      }
    },
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveLoading = true
          setRecruiter(this.form).then(({ data }) => {
            this.saveLoading = false
            if (data.httpStatus === 200) {
              // 记录到vuex中
              this.$store.commit('overwriteRecruit', {
                avatarId: this.form.attachId,
                avatar: this.recruiterAvatar,
                email: this.form.email,
                position: this.form.position,
                wechat: this.form.wechat,
                signature: this.form.signature,
                brief: this.form.brief,
                personalizedLabels: this.form.labels,
                ...this.positionTemp
              })
              this.$message.success('保存成功！')
            }
          }).catch(() => {
            this.saveLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-infos {
  background: #fff;
  padding: 48px 82px 100px 80px !important;
  box-sizing: border-box;
}
.infos-header {
  display: flex;
  h1 {
    flex: 1;
    line-height: 1;
    margin: 0;
    font-size: 24px;
    color: $title-color-1;
  }
  .iconfont {
    font-size: 14px;
    padding-right: 7px;
  }
}
.app-infos-tips {
  color: $title-color-3;
  font-size: 12px;
  i {
    color: $error-color-1;

  }
}
.avatar-wrapper {
  width: 68px;
  position: relative;
}
.avatar {
  @include img-radius(68px, 68px);
  border: 1px solid $border-color-8;
  position: relative;
  cursor: pointer;
  color: #fff;
  span {
    position: absolute;
    z-index: 3;
    left: 68px / 2 - 10px;
    top: 68px / 2 - 20px;
    font-size: 20px;
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
.el-form-infos {
  padding-top: 48px;
  .el-input, .el-textarea, .position-type, .self-label-wrapper  {
    width: 382px;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
  & /deep/ {
    .el-form-item__label {
      padding-right: 20px;
    }
  }
}
.el-form-avatar /deep/ .el-form-item__label{
  line-height: 70px;
}
.form-intro {
  line-height: 28px;
  .form-intro-tips {
    color: $main-color-1;
    line-height:22px;
    font-size: 12px;
    display: inline-block;
    i {
      font-size: 12px;
    }
  }
}
</style>
<style lang="scss">
.form-intro-popover {
  padding: 0;
  box-shadow: none;
  border: 1px solid $border-color-1;
  .popper__arrow  {
    border-bottom-color: $border-color-1 !important;
  }
  .intros-wrapper {
    border-radius:4px;
    padding-top: 6px;
    position: relative;
  }
  ul {
    background-color: $bg-color-1;
  }
  li {
    display: inline-block;
    vertical-align: middle;
    padding: 0px 14px;
    height: 30px;
    line-height: 30px;
    color: $title-color-3;
    font-size: 12px;
    cursor: pointer;
  }
  li:hover {
    background-color: $bg-color-5;
  }
  li.active {
    background-color: $bg-color-4;
    color: #fff;
  }
  .intro-content {
    height: 114px;
    overflow-y: auto;
    font-size: 12px;
    line-height:18px;
    padding: 12px 14px;
    color: $title-color-1;
  }
}
</style>
