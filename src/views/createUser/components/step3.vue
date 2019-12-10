<template>
  <div class="step-wrapper">
    <tabs
      class="resume-tabs-wrapper"
      :list="formList"
      :tab-index.sync="tabIndex"
      :limit="2"
      @command="handleChangeTab"
      title="教育经历"
      :additional="isTernships"
      :additional-limit="2"
      additional-title="实习经历" />
      <!-- 教育经历 -->
    <el-form :model="currentForm" ref="form" v-loading="formLoading" :rules="formRules">
      <template v-if="!currentForm.additional">
        <el-form-item prop="school">
          <el-input maxlength="50" placeholder="请输入学校名称" v-model="currentForm.school">
            <span slot="suffix" class="input-value-length"><i>{{currentForm.school.length}}</i>/50</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="major">
          <el-input maxlength="50"  placeholder="请输入专业名称" v-model="currentForm.major">
            <span slot="suffix" class="input-value-length"><i>{{currentForm.major.length}}</i>/50</span>
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
      </template>
      <template v-else>
        <!-- 实习经历 -->
        <el-form-item prop="company">
          <el-input maxlength="50" placeholder="请输入公司名称" v-model="currentForm.company">
            <span slot="suffix" class="input-value-length"><i>{{currentForm.company.length}}</i>/50</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="positionTypeId">
          <select-position-type
            title="请选择职位类型"
            v-model.number="currentForm.positionTypeId"
            :label="currentForm.positionType"
            @on-selected="selectedPosition">
          </select-position-type>
        </el-form-item>
        <el-form-item ref="positionForm" prop="position">
          <el-input maxlength="20" placeholder="请输入职位名称" v-model="currentForm.position">
            <span slot="suffix" class="input-value-length"><i>{{currentForm.position.length}}</i>/20</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="stimes">
          <date-picker v-model="currentForm.stimes" separator="~" :single="false" placeholder="请选择开始时间" end-placeholder="请选择结束时间"  />
        </el-form-item>
        <el-form-item prop="duty" class="input-onlyread-form-item" ref="dutyForm">
          <div class="el-input input-onlyread" @click="visibleDialog = true; dialogText = currentForm.duty ">
            <div class="el-input__inner"><span class="input-placeholder-span" v-if="!currentForm.duty">请输入工作内容</span> <span class="input-onlyread-text">{{currentForm.duty}}</span></div>
              <span class="el-input__suffix input-onlyread__suffix">
                <span class="el-input__suffix-inner">
                  <span class="el-input__count input-value-length"><i>{{currentForm.duty.length}}</i>/1000</span>
                </span>
              </span>
            </div>
        </el-form-item>
      </template>
      <div class="btn-box">
        <div class="over-lay">
          <el-button class="btn-pre" type="primary"  @click="handlePrev" plain>上一步</el-button>
          <el-button class="btn-confirm" :loading="saveLoading" type="primary" @click="handleSubmit">继续</el-button>
        </div>
        <div class="mask"></div>
      </div>
    </el-form>
    <el-dialog
      title="工作内容"
      custom-class="app-dialog"
      :visible.sync="visibleDialog"
      :close-on-click-modal="false"
      append-to-body
      width="442px"
      >
      <div class="resume-duty">
        <el-input
            type="textarea"
            placeholder="在任职期间，工作职责主要是****，经手过****项目，取得了*****的成绩。"
            v-model="dialogText"
            :autosize="{ minRows: 12, maxRows: 15}"
            maxlength="1000"
            show-word-limit/>
      </div>
      <div slot="footer">
        <el-button type="default" size="small" @click="visibleDialog = false">取消</el-button>
        <el-button type="primary" size="small"  @click="handleSaveDuty">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tabs from './tabs'
import DatePicker from '@/views/c-resume/components/datePicker'
import SelectPositionType from 'COMPONENTS/selectPositionType'
import { getDegreeAllListsApi, getResumeThirdStepApi, setResumeThirdApi } from '@/api/putIn'
import { companyNameReg, positionReg, schoolNameReg, majorNameReg } from '@/util/fieldRegular.js'
export default {
  props: {
    step: {
      type: Number,
      default: 3
    },
    skip: Number
  },
  components: { Tabs, DatePicker, SelectPositionType },
  computed: {
    currentForm () {
      return this.formList[this.tabIndex] || {}
    },
    // 是否显示实习经历
    isTernships () {
      return this.skip === 2
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
    const companyValidate = (rule, value, callback) => {
      if (companyNameReg.test(value)) {
        callback()
      } else {
        callback(new Error('公司名称需为2-50个字'))
      }
    }
    const positionValidate = (rule, value, callback) => {
      if (positionReg.test(value)) {
        callback()
      } else {
        callback(new Error('职位名称需为2-20个字'))
      }
    }
    return {
      formList: [
        {
          school: '',
          times: [],
          major: '',
          additional: false,
          degree: 25
        }
      ],
      formRules: {
        school: [{ required: true, message: '请填写学校名称', trigger: 'blur' }, { validator: schoolNameValidate, trigger: 'blur' }],
        degree: [{ required: true, type: 'number', message: '请填写学历', trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择持续时间段', trigger: 'change' }],
        major: [{ required: true, message: '请填写专业信息', trigger: 'blur' }, { validator: majorNameValidate, trigger: 'blur' }],
        company: [{ required: true, message: '请填写公司名称', trigger: 'blur' }, { validator: companyValidate, trigger: 'blur' }],
        stimes: [{ required: true, type: 'array', message: '请选择任职时间', trigger: 'change' }],
        positionTypeId: [{ required: true, type: 'number', message: '请选择职位类型', trigger: 'change' }],
        position: [{ required: true, message: '请填写职位名称', trigger: 'blur' }, { validator: positionValidate, trigger: 'blur' }],
        labelIds: [{ required: true, message: '请选择职位技能标签', trigger: 'change' }],
        duty: [{ required: true, message: '请填写工作内容', trigger: 'blur' }, { min: 10, message: '工作内容最少输入10字 ，不允许输入超过1000字', trigger: 'blur' }]
      },
      degreeAllLists: [],
      tabIndex: 0,
      visibleDialog: false,
      dialogText: '',
      loaded: false,
      saveLoading: false,
      formLoading: false
    }
  },
  created () {
    this.formJson = JSON.stringify(this.formList[0])
    this.internshipsFormJson = JSON.stringify({
      company: '',
      positionTypeId: null,
      positionType: '',
      position: '',
      duty: '',
      additional: true,
      stimes: []
    })
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
        this.loaded = true
        const educationForm = educations.map(item => {
          return {
            school: item.school,
            degree: item.degree,
            major: item.major,
            additional: false,
            times: [item.startTime * 1000, item.endTime * 1000],
            experience: item.experience
          }
        })
        if (educationForm.length) this.formList = educationForm
        const internshipsForm = internships.map(val => {
          return {
            company: val.company,
            positionTypeId: val.positionTypeId,
            positionType: val.positionType,
            position: val.position,
            duty: val.duty,
            additional: true,
            id: val.id,
            stimes: [val.startTime ? val.startTime * 1000 : 0, val.endTime ? val.endTime * 1000 : 0]
          }
        })
        this.formList.push(...internshipsForm)
      })
    },
    handleChangeTab ({ type, value, index }) {
      if (type === 'add') {
        if (value.additional) {
          this.formList.push(JSON.parse(this.internshipsFormJson))
        } else {
          this.formList.push(JSON.parse(this.formJson))
        }
        this.tabIndex = this.formList.length - 1
        if (this.$refs.form) this.$refs.form.clearValidate()
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
        // 判断如果是教育经历而已只有一个form不允许删除
        if (!value.additional) {
          if (this.formList.filter(val => !val.additional).length <= 1) {
            this.$message.warning('至少填一份教育经历哦～')
            return
          }
        }
        this.formList.splice(index, 1)
        this.tabIndex = 0
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
            this.tabIndex = Number(key)
            await this.$nextTick()
            let valid = await this.$refs.form.validate()
            if (!valid) throw new Error('信息未填写完整')
          })
        }
        this.saveLoading = true
        let educations = []; let internships = []
        this.formList.forEach(val => {
          let { times, stimes } = val
          times = stimes || times
          const startTime = isNaN(times[0]) ? parseInt(new Date(times[0]).getTime() / 1000) : parseInt(times[0]) / 1000
          const endTime = times[1] === 0 ? 0 : isNaN(times[1]) ? parseInt(new Date(times[1]).getTime() / 1000) : parseInt(times[1]) / 1000
          if (val.additional) {
            internships.push({ ...val, startTime, endTime })
          } else {
            educations.push({ ...val, startTime, endTime })
          }
        })
        setResumeThirdApi({
          educations,
          internships
        }).then(({ data }) => {
          this.saveLoading = false
          if (data.httpStatus === 200) {
            this.$emit('update:step', 4)
          }
        }).catch(() => {
          this.saveLoading = false
        })
      } catch (e) {
        this.saveLoading = false
      }
    },
    handleSaveDuty () {
      if (this.dialogText.length < 10) {
        this.$message.warning('最少输入10字')
        return
      }
      this.visibleDialog = false
      this.currentForm.duty = this.dialogText
      if (this.$refs.dutyForm) {
        this.$refs.dutyForm.$emit('el.form.blur', this.dialogText)
      }
    },
    selectedPosition (item) {
      this.currentForm.positionType = item.name
      this.currentForm.position = this.currentForm.position || item.name
      if (this.$refs.positionForm) {
        this.$refs.positionForm.$emit('el.form.blur', item.name)
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
