<template>
  <!-- 工作经历 -->
  <div class="work-experience">
    <wrapper :is-delete="true" :list="list" ref="wrapper" @command="handleCommand" :status="status" :config="{limit: 1, max: 10}">
       <template slot="header">工作经历</template>
       <template v-slot:content="{row}">
        <template v-if="row">
          <p class="resume-list-header">
            <span>
              <span class="ellipsis">{{row.company}}</span>
              <span class="separator">|</span>
              <span class="ellipsis">{{row.position}}</span>
            </span>
            <span class="resume-list-time">{{row.startTimeDesc | date('YYYY.MM')}}-{{row.endTimeDesc | date('YYYY.MM')}}</span>
          </p>
          <div class="resume-list-desc">{{row.duty}}</div>
          <div class="form-labels-wrapper work-labels">
            <span
              v-for="item in row.technicalLabels"
              :key="item.labelId"
              class="form-label">{{item.labelName}}</span>
          </div>
        </template>
      </template>
      <template slot="bottom">
        <div class="c-btn resume-add-btn" @click="handleShowForm(true)"><i class="el-icon-plus" /> 添加工作经历</div>
      </template>
      <template slot="edit">
        <p class="form-header-title">{{isAdd? '添加' : '编辑'}}工作经历</p>
        <el-form :model="form" :rules="formRules" ref="form">
          <div class="form-item">
            <p class="form-title">公司名称</p>
            <el-form-item prop="company">
              <el-input v-model="form.company" placeholder="请写公司名称"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">任职时间</p>
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
            <p class="form-title">职位类别</p>
            <el-form-item prop="positionTypeId">
              <select-position-type
                v-model.number="form.positionTypeId"
                :label="form.positionType"
                @on-selected="selectedPosition">
              </select-position-type>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">职位名称</p>
            <el-form-item prop="position">
              <el-input v-model="form.position" placeholder="请写职位名称"/>
            </el-form-item>
          </div>
          <div class="form-item" style="width: 100%; padding-left: 0px">
            <p class="form-title">技能标签</p>
            <el-form-item prop="labelIds">
              <select-labels
                ref="labels"
                v-model="form.labelIds"
                :valid-filter="true"
                valid-filter-text="请选择职位类别"
                :limit="3"
                :default-value="labelIds"
                :filter="form.positionTopid"
                title="技能标签"
                type="position"
                @on-selected="handleSelectLabeld" />
            </el-form-item>
          </div>
          <div class="form-item" style="width: 100%; padding-left: 0px">
            <p class="form-title">工作内容</p>
            <el-form-item prop="duty">
              <el-input
                type="textarea"
                placeholder="在任职期间，工作职责主要是****，经手过****项目，取得了*****的成绩。"
                v-model="form.duty"
                :autosize="{ minRows: 7, maxRows: 10}"
                maxlength="1000"
                show-word-limit/>
            </el-form-item>
          </div>
        </el-form>
      </template>
    </wrapper>
  </div>
</template>
<script>
import Wrapper from './wrapper'
import SelectLabels from 'COMPONENTS/selectLabels'
import SelectPositionType from 'COMPONENTS/selectPositionType'
import { addCareer, setCareer, getAllCareer, deleteCareer } from 'API/resume'
import DatePicker from './datePicker'
import { companyNameReg, positionReg } from '@/util/fieldRegular.js'
export default {
  components: { Wrapper, SelectLabels, SelectPositionType, DatePicker },
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
      return this.resume.careers || []
    },
    labelIds () {
      return this.labels.map(val => String(val.labelId))
    }
  },
  data () {
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
      labels: [],
      currentCarcee: null,
      isAdd: true,
      form: {
        company: '',
        positionTypeId: null,
        positionType: '',
        positionTopid: null,
        position: '',
        startTime: '',
        endTime: '',
        duty: '',
        labelIds: '',
        times: []
      },
      formRules: {
        company: [{ required: true, message: '请填写公司名称', trigger: 'blur' }, { validator: companyValidate, trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择任职时间', trigger: 'change' }],
        positionTypeId: [{ required: true, type: 'number', message: '请选择职位类型', trigger: 'change' }],
        position: [{ required: true, message: '请填写职位名称', trigger: 'blur' }, { validator: positionValidate, trigger: 'blur' }],
        labelIds: [{ required: true, message: '请选择职位技能标签', trigger: 'change' }],
        duty: [{ required: true, message: '请填写工作内容', trigger: 'blur' }, { min: 10, message: '工作内容最少输入10字 ，不允许输入超过1000字', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCommand ({ type, cb, item, index }) {
      if (type === 'edit') {
        this.currentCarcee = item
        this.handleShowForm(false)
        // 将数据写入到form表单中
        Object.assign(this.form, {
          times: [item.startTime * 1000, item.endTime * 1000],
          company: item.company,
          positionTypeId: item.positionTypeId,
          positionType: item.positionType,
          positionTopid: item.positionTypeTopPid,
          position: item.position,
          technicalLabelIds: item.technicalLabelIds,
          labelIds: item.technicalLabels.map(val => val.labelName).join(','),
          duty: item.duty
        })
        this.labels = item.technicalLabels
        this.jsonFormString = JSON.stringify(this.form)
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { company, times, duty, positionTypeId, position } = this.form
            const startTime = isNaN(times[0]) ? parseInt(new Date(times[0]).getTime() / 1000) : parseInt(times[0]) / 1000
            const endTime = times[1] === 0 ? 0 : isNaN(times[1]) ? parseInt(new Date(times[1]).getTime() / 1000) : parseInt(times[1]) / 1000
            const labelIds = this.labels.map(val => val.labelId).join(',')
            if (this.isAdd) {
              addCareer({
                company, duty, positionTypeId, position, startTime, endTime, labelIds
              }).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllCareers()
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
              setCareer({
                id: this.currentCarcee.id, company, duty, positionTypeId, position, startTime, endTime, labelIds
              }).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllCareers()
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
        deleteCareer({ id: item.id }).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.resume.careers.splice(index, 1)
            // 移除vuex中的内容
            /* this.$store.commit('overwriteResume', {
              expects:
            }) */
          }
        })
      }
    },
    // 获取所有工作经历
    async getAllCareers () {
      await getAllCareer().then(({ data }) => {
        // 将内写入到vuex 中
        this.$store.commit('overwriteResume', {
          careers: data.data || []
        })
      })
    },
    handleShowForm (isAdd = true) {
      this.isAdd = isAdd
      if (this.isAdd) {
        this.form = {
          company: '',
          positionTypeId: null,
          positionType: '',
          positionTopid: null,
          position: '',
          startTime: '',
          endTime: '',
          duty: '',
          labelIds: '',
          times: []
        }
      }
      this.jsonFormString = JSON.stringify(this.form)
      this.$refs.wrapper.showEditCompoents()
    },
    validFormData () {
      return this.jsonFormString === JSON.stringify(this.form)
    },
    selectedPosition (item) {
      this.form.positionType = item.name
      this.form.positionTopid = item.topPid
      this.form.labelIds = ''
      if (this.$refs.labels) this.$refs.labels.handleClear()
    },
    handleSelectLabeld (labels) {
      this.labels = labels
    }
  }
}
</script>
