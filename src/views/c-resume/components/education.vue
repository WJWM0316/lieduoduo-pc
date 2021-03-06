<template>
  <div>
    <wrapper ref="wrapper" :list="list" :is-delete="true"  @command="handleCommand" :status="status" :config="{limit: 1, max: 10}">
      <template slot="header" >教育经历</template>
      <template v-slot:content="{row}">
        <p class="resume-list-header project-header">
          <span>
            <span class="ellipsis">{{row.school}}</span>
            <span class="separator">|</span>
            <span>{{row.degreeDesc}}</span>
            <span class="separator">|</span>
            <span class="ellipsis">{{row.major}}</span>
          </span>
          <span class="resume-list-time">{{row.startTimeDesc | date('YYYY.MM')}}-{{row.endTimeDesc | date('YYYY.MM')}}</span>
        </p>
        <div class="resume-list-desc" v-if="row.experience">{{row.experience}}</div>
      </template>
      <template slot="bottom">
        <div class="c-btn resume-add-btn" @click="handleShowForm(true)"><i class="el-icon-plus" /> 添加教育经历</div>
      </template>
      <template slot="edit">
        <p class="form-header-title">{{isAdd? '添加' : '编辑'}}教育经历</p>
        <el-form :model="form" :rules="formRules" ref="form">
          <div class="form-item">
            <p class="form-title">学校名称</p>
            <el-form-item prop="school">
              <el-input v-model="form.school" placeholder="请填写学校名称"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">持续时间</p>
            <el-form-item prop="times">
              <!-- <el-date-picker
                v-model="form.times"
                type="monthrange"
                format="yyyy-MM"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker> -->
              <date-picker v-model="form.times" :single="false" placeholder="开始日期" end-placeholder="结束日期"  />
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">学历</p>
            <el-form-item prop="degree">
              <el-select v-model.number="form.degree" placeholder="请选择学历">
                <template v-for="item in degree">
                  <el-option :key="item.value" :label="item.label" :value="item.value"/>
                </template>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">专业</p>
            <el-form-item prop="major">
              <el-input v-model="form.major" placeholder="请填写专业名称"/>
            </el-form-item>
          </div>
          <div class="form-item" style="width: 100%; padding-left: 0px">
            <p class="form-title">在校经历（选填）</p>
            <el-form-item prop="experience">
              <el-input
                type="textarea"
                placeholder="在校期间，参与了****的项目或活动，担任****的角色，取得了****的成绩，在其中我主要贡献了*****。"
                v-model="form.experience"
                :autosize="{ minRows: 7, maxRows: 10}"
                maxlength="1000"
                show-word-limit />
            </el-form-item>
          </div>
        </el-form>
      </template>
    </wrapper>
  </div>
</template>
<script>
import Wrapper from './wrapper'
import { Degree } from '@/config/vars'
import DatePicker from './datePicker'
import { addEducation, setEducation, getAllEducation, deleteEducation } from 'API/resume'
import { schoolNameReg, majorNameReg } from '@/util/fieldRegular.js'
export default {
  components: { Wrapper, DatePicker },
  props: {
    propClass: String,
    resume: {
      type: Object,
      default: () => ({})
    },
    status: String
  },
  computed: {
    list () {
      return this.resume.educations || []
    }
  },
  data () {
    const schoolNameValidate = (rule, value, callback) => {
      if (schoolNameReg.test(value)) {
        callback()
      } else {
        callback(new Error('学校名称需为2-50个字'))
      }
    }
    const majorNameValidate = (rule, value, callback) => {
      if (majorNameReg.test(value)) {
        callback()
      } else {
        callback(new Error('专业名称需为2-50个字'))
      }
    }
    return {
      isAdd: true,
      degree: Degree,
      form: {
        school: '',
        degree: 25,
        major: '',
        times: [],
        experience: ''
      },
      formRules: {
        school: [{ required: true, message: '请填写学校名称', trigger: 'blur' }, { validator: schoolNameValidate, trigger: 'blur' }],
        degree: [{ required: true, type: 'number', message: '请填写学历', trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择持续时间段', trigger: 'change' }],
        major: [{ required: true, message: '请填写专业信息', trigger: 'blur' }, { validator: majorNameValidate, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCommand ({ type, cb, item, index }) {
      if (type === 'edit') {
        Object.assign(this.form, {
          school: item.school,
          degree: item.degree,
          major: item.major,
          times: [item.startTime * 1000, item.endTime * 1000],
          experience: item.experience
        })
        this.currentId = item.id
        this.isAdd = false
        this.jsonFormString = JSON.stringify(this.form)
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { school, degree, major, times, experience } = this.form
            const startTime = isNaN(times[0]) ? parseInt(new Date(times[0]).getTime() / 1000) : parseInt(times[0]) / 1000
            const endTime = times[1] === 0 ? 0 : isNaN(times[1]) ? parseInt(new Date(times[1]).getTime() / 1000) : parseInt(times[1]) / 1000
            if (this.isAdd) {
              addEducation({ school, degree, major, experience, startTime, endTime }).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllEducations()
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
              setEducation({ id: this.currentId, school, degree, major, experience, startTime, endTime }).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllEducations()
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
          } else {
            // eslint-disable-next-line standard/no-callback-literal
            cb(false)
          }
        })
      } else if (type === 'delete') {
        deleteEducation({ id: item.id }).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.resume.educations.splice(index, 1)
            // 移除vuex中的内容
            /* this.$store.commit('overwriteResume', {
              expects:
            }) */
          }
        })
      }
    },
    async getAllEducations () {
      await getAllEducation().then(({ data }) => {
        // 将内容写入到vuex 中
        this.$store.commit('overwriteResume', {
          educations: data.data || []
        })
      })
    },
    handleShowForm (isAdd = true) {
      this.isAdd = isAdd
      if (this.isAdd) {
        this.form = {
          school: '',
          degree: 25,
          major: '',
          times: [],
          experience: ''
        }
      }
      this.jsonFormString = JSON.stringify(this.form)
      this.$refs.wrapper.showEditCompoents()
    },
    validFormData () {
      return this.jsonFormString === JSON.stringify(this.form)
    }
  }

}
</script>
