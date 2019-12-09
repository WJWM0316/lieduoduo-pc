<template>
  <div class="step-wrapper">
    <tabs
      class="resume-tabs-wrapper"
      :list="formList.length"
      :tab-index.sync="tabIndex"
      :limit="2"
      @command="handleChangeTab"
      title="教育经历" />
    <el-form :model="currentForm" ref="form" v-loading="formLoading" :rules="formRules">
      <el-form-item prop="school">
        <el-input maxlength="20" placeholder="请输入学校名称" v-model="currentForm.school">
          <span slot="suffix" class="input-value-length"><i>{{currentForm.school.length}}</i>/50</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="major">
        <el-input maxlength="20"  placeholder="请输入专业名称" v-model="currentForm.major">
          <span slot="suffix" class="input-value-length"><i>{{currentForm.major.length}}</i>/20</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="degree">
        <el-select v-model="currentForm.degree" placeholder="请选择学历">
          <el-option
            v-for="item in degreeAllLists"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="times">
        <date-picker v-model="currentForm.times" separator="~" :single="false" placeholder="请选择开始时间" end-placeholder="请选择结束时间"  />
      </el-form-item>
      <div class="btn-box">
        <div class="over-lay">
          <el-button class="btn-pre" type="primary"  @click="handlePrev" plain>上一步</el-button>
          <el-button class="btn-confirm" :loading="saveLoading" type="primary" @click="handleSubmit">继续</el-button>
        </div>
        <div class="mask"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
import Tabs from './tabs'
import DatePicker from '@/views/c-resume/components/datePicker'
import { getDegreeAllListsApi, getResumeThirdStepApi, setResumeThirdApi } from '@/api/putIn'
import { schoolNameReg } from '@/util/fieldRegular.js'
export default {
  props: {
    step: {
      type: Number,
      default: 3
    },
    skip: Number
  },
  components: { Tabs, DatePicker },
  computed: {
    currentForm () {
      return this.formList[this.tabIndex - 1] || {}
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
    return {
      formList: [
        {
          school: '',
          times: [],
          major: '',
          degree: 25,
          startTime: '',
          endTime: ''
        }
      ],
      formRules: {
        school: [{ required: true, message: '请填写学校名称', trigger: 'blur' }, { validator: schoolNameValidate, trigger: 'blur' }],
        degree: [{ required: true, type: 'number', message: '请填写学历', trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择持续时间段', trigger: 'change' }],
        major: [{ required: true, message: '请填写专业信息', trigger: 'blur' }]
      },
      degreeAllLists: [],
      tabIndex: 1,
      loaded: false,
      saveLoading: false,
      formLoading: false
    }
  },
  created () {
    this.formJson = JSON.stringify(this.formList[0])
  },
  mounted () {
    this.getDegreeAllLists()
  },
  activated () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      if (this.loaded) return
      getResumeThirdStepApi().then(({ data }) => {
        let results = data.data || {}
        const { educations, internships } = results
        const education = educations.map(item => {
          return {
            school: item.school,
            degree: item.degree,
            major: item.major,
            times: [item.startTime * 1000, item.endTime * 1000],
            experience: item.experience
          }
        })
        this.loaded = true
        this.internships = internships || []
        if (education.length) this.formList = education
      })
    },
    handleChangeTab ({ type, value, index }) {
      if (type === 'add') {
        this.formList.push(JSON.parse(this.formJson))
        this.tabIndex = this.formList.length
      }
      if (type === 'change') {
        if (this.$refs.form) this.$refs.form.clearValidate()
        window.clearTimeout(this.formTimer)
        this.formLoading = true
        this.formTimer = window.setTimeout(() => {
          this.formLoading = false
        }, 300)
      }
      if (type === 'delete') {
        this.formList.splice(index, 1)
        this.tabIndex = 1
      }
    },
    getDegreeAllLists () {
      if (this.getDegreeAllLists.length) return
      getDegreeAllListsApi().then(res => (this.degreeAllLists = res.data.data))
    },
    handlePrev () {
      this.$emit('update:step', this.skip === 2 ? 1 : 2)
    },
    async handleSubmit () {
      if (!this.loaded) return
      const validList = []
      for (let item in this.formList) {
        validList.push(Promise.resolve(item))
      }
      try {
        for (let key in validList) {
          await validList[key].then(async key => {
            this.tabIndex = Number(key) + 1
            await this.$nextTick()
            let valid = await this.$refs.form.validate()
            if (!valid) throw new Error('信息未填写完整')
          })
        }
        this.saveLoading = true
        setResumeThirdApi({
          educations: this.formList.map(val => {
            const { times } = val
            const startTime = isNaN(times[0]) ? parseInt(new Date(times[0]).getTime() / 1000) : parseInt(times[0]) / 1000
            const endTime = times[1] === 0 ? 0 : isNaN(times[1]) ? parseInt(new Date(times[1]).getTime() / 1000) : parseInt(times[1]) / 1000
            return {
              ...val,
              startTime,
              endTime
            }
          }),
          internships: this.internships
        }).then(({ data }) => {
          this.saveLoading = false
          if (data.httpStatus === 200) {
            this.$emit('update:step', 4)
          }
        }).catch(() => {
          this.saveLoading = false
        })
      } catch (e) {

      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-top: 20px;
}
</style>
