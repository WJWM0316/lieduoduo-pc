<template>
  <!-- 工作经历 -->
  <div class="work-experience">
    <wrapper :is-delete="true" :list="list" ref="wrapper" @command="handleCommand" :status="status">
       <template slot="header">工作经历</template>
       <template v-slot:content="{row}">
        <template v-if="row">
          <p class="resume-list-header">
            <span>
              <span>{{row.company}}</span>
              <span class="separator">|</span>
              <span>{{row.position}}</span>
            </span>
            <span class="resume-list-time">{{row.startTimeDesc}}-{{row.endTimeDesc}}</span>
          </p>
          <div class="resume-list-desc">
            {{row.duty}}
          </div>
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
        <p class="form-header-title">添加工作经历</p>
        <el-form :model="form" :rules="formRules" ref="form">
          <div class="form-item">
            <p class="form-title">公司名称</p>
            <el-form-item prop="company">
              <el-input v-model="form.company" placeholder="请写公司名称"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">公司名称</p>
            <el-form-item prop="times">
              <el-date-picker
                v-model="form.times"
                type="monthrange"
                format="yyyy-MM"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
                v-model="form.labelIds"
                :valid-filter="true"
                valid-filter-text="请选择职位类别"
                :limit="3"
                :filter="form.positionTopid"
                title="请选择技能标签"
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
                :rows="7" />
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
export default {
  components: { Wrapper, SelectLabels, SelectPositionType },
  props: {
    resume: {
      type: Object,
      default: () => ({})
    },
    status: String
  },
  computed: {
    list () {
      return this.resume.careers || []
    }
  },
  data () {
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
        company: [{ required: true, message: '请填写公司名称', trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择任职时间', trigger: 'change' }],
        positionTypeId: [{ required: true, type: 'number', message: '请选择职位类型', trigger: 'change' }],
        position: [{ required: true, message: '请填写职位名称', trigger: 'blur' }],
        labelIds: [{ required: true, message: '请选择职位技能标签', trigger: 'change' }],
        duty: [{ required: true, message: '请填写工作内容', trigger: 'blur' }]
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
          times: [new Date(item.startTime * 1000), new Date(item.endTime * 1000)],
          company: item.company,
          positionTypeId: item.positionTypeId,
          positionType: item.positionType,
          positionTopid: item.positionTypeTopPid,
          position: item.position,
          labelIds: item.technicalLabels.map(val => val.labelName).join(','),
          duty: item.duty
        })
        this.labels = item.technicalLabels
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { company, times, duty, positionTypeId, position } = this.form
            const startTime = parseInt(times[0].getTime() / 1000)
            const endTime = parseInt(times[1].getTime() / 1000)
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
      this.$refs.wrapper.showEditCompoents()
    },
    selectedPosition (item) {
      this.form.positionType = item.name
      this.form.positionTopid = item.topPid
    },
    handleSelectLabeld (labels) {
      this.labels = labels
    }
  }
}
</script>
