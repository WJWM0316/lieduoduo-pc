<template>
  <!-- b端我的资料 -->
  <div class="app-infos">
    <div class="infos-header">
      <h1>我的资料</h1>
      <el-button type="primary"> <i class="iconfont icon-fenxiang"></i> 分享主页</el-button>
    </div>
    <p class="app-infos-tips">加"<em>*</em>"号的内容，是必须填写的项目；姓名和性别为招聘官认证信息，修改请联系 400-065-5788</p>
    <el-form :model="form" ref="form" :rules="formRules" label-width="110px" class="el-form-infos">
      <el-form-item prop="attachId" label="头像">
        <Picture
          :value.sync="form.avatarUrl"
          attach-type="avatar"
          :cropper="true"
          cropper-radius="50%"
          @before="avatarLoading = true"
          @fail="avatarLoading = false"
          @change="handleChangeAvatar">
          <div class="avatar-wrapper">
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
      <el-form-item prop="position" label="担任职务"><el-input v-model="form.position" placeholder="请写担任职务" /></el-form-item>
      <el-form-item prop="email" label="公司邮箱"><el-input v-model="form.email" placeholder="请写公司邮箱" /></el-form-item>
      <el-form-item prop="wechat" label="微信号"><el-input v-model="form.wechat" placeholder="请写微信号" /></el-form-item>
      <el-form-item prop="signature" label="个人签名"><el-input type="textarea" v-model="form.signature" placeholder="用一句话介绍你自己吧~" /></el-form-item>
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
          :autosize="{ minRows: 7, maxRows: 10}"
          style="width: 520px;"
          v-model="form.brief" placeholder="请描述你的个人经历或成就，字数范围：6-5000字" />
      </el-form-item>
      <div class="form-intro" :style="{height: isShowPover ? '174px' : 'auto'}">
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
      <el-form-item>
        <el-button style="width: 120px;" type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Picture from 'COMPONENTS/common/upload/picture'
import SelectPositionType from 'COMPONENTS/selectPositionType'
import SelectSelfLabel from './components/selectSelfLabel'
import { getRecruiter, setRecruiter } from '@/api/recruiter'
import { CompanyIntro } from '@/config/vars'
export default {
  components: { Picture, SelectPositionType, SelectSelfLabel },
  data () {
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
        attachId: [{ required: true, type: 'number', message: '请上传头像', trigger: 'blur' }],
        name: [{ required: true, message: '请填写真实姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        positionTypeId: [{ required: true, message: '请选择担任职位类型', trigger: 'blur' }],
        position: [{ required: true, message: '请填写担任职务', trigger: 'blur' }],
        email: [{ required: true, message: '请填写公司邮箱', trigger: 'blur' }],
        labels: [{ required: true, type: 'array', message: '请选择个人标签', trigger: 'change' }]
      },
      intros: CompanyIntro,
      introIndex: 0,
      introContent: ''
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
      })
    },
    handleChangeAvatar (item) {
      this.form.attachId = item[0].id
      this.form.avatarUrl = item[0].middleUrl
    },
    selectedPosition (item) {
      this.form.positionTypeId = item.labelId
      this.form.positionType = item.name
    },
    handleSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveLoading = true
          setRecruiter(this.form).then(({ data }) => {
            this.saveLoading = false
            if (data.httpStatus === 200) {
              this.$message.success('保存成功！')
            }
          }).catch(() => {
            this.saveLoading = true
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
  }
}
.app-infos-tips {
  color: $title-color-3;
  font-size: 12px;
  em {
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
}
.form-intro {
  margin-left: 110px;
  margin-bottom: 50px;
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
