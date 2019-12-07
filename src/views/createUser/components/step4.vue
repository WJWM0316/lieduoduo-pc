<template>
  <div class="step-wrapper">
    <div class="step-title">请填写求职意向</div>
    <el-form :model="form" ref="form" :rules="formRules">
      <el-form-item prop="cityNum">
        <el-cascader
          v-model="form.cityNum"
          :options="areas"
          :props="{
            value: 'areaId',
            label: 'title'
          }"
          :show-all-levels="false">
        </el-cascader>
      </el-form-item>
      <el-form-item prop="positionId">
        <select-position-type
          v-model.number="form.positionId"
          :label="form.position"
          @on-selected="selectedPosition">
        </select-position-type>
      </el-form-item>
      <el-form-item prop="salary">
        <salary
          class="resume-salary"
          ref="salary"
          separator="~"
          v-model="form.salary" />
      </el-form-item>
      <el-form-item prop="fieldIds">
        <select-labels
          v-model="form.fieldIds"
          valid-filter-text="请选选择期望职位"
          :limit="3"
          title="期望领域"
          :default-value="labelIds"
          type="field"
          @on-selected="handleSelectLabeld" />
      </el-form-item>
      <div class="btn-box">
        <div class="over-lay">
          <el-button class="btn-pre" type="primary"  @click="handlePrev" plain>上一步</el-button>
          <el-button class="btn-confirm" :loading="saveLoading" type="primary" @click="handleSubmit">完成</el-button>
        </div>
        <div class="mask"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
import SelectPositionType from 'COMPONENTS/selectPositionType'
import SelectLabels from 'COMPONENTS/selectLabels'
import Salary from '@/views/c-resume/components/salary'
import { getAreaListsApi, setResumeFourthApi, getResumeFourStepApi } from 'API/putIn'
export default {
  props: {
    step: {
      type: Number,
      default: 4
    }
  },
  components: { SelectPositionType, SelectLabels, Salary },
  data () {
    return {
      areas: [],
      labels: [],
      form: {
        salary: '',
        positionId: null,
        position: '',
        fieldIds: '',
        cityNum: []
      },
      saveLoading: false,
      loaded: false,
      formRules: {
        cityNum: [{ required: true, message: '请选择期望城市', trigger: 'change' }],
        positionId: [{ required: true, type: 'number', message: '请选择期望职位', trigger: 'change' }],
        fieldIds: [{ required: true, message: '请选择期望行业', trigger: 'change' }],
        salary: [{ required: true, message: '请选择期望薪资', trigger: 'blur' }]
      }
    }
  },
  computed: {
    labelIds () {
      return this.labels.map(val => String(val.labelId))
    }
  },
  mounted () {
    this.getAreaLists()
  },
  activated () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      if (this.loaded) return
      getResumeFourStepApi().then(({ data }) => {
        this.loaded = true
        const { cityNum, fields, position, positionId, salaryCeil, salaryFloor, provinceNum } = data.data
        this.form = {
          cityNum: provinceNum ? [provinceNum, cityNum] : [],
          positionId,
          position,
          fieldIds: fields.map(val => val.field).join('、'),
          salary: salaryFloor ? `${salaryFloor}-${salaryCeil}` : ''
        }
        this.labels = fields.map(val => {
          val.labelId = val.fieldId
          val.name = val.field
          return val
        })
        this.$refs.salary.handleInit(salaryFloor, salaryCeil)
      })
    },
    handleSubmit () {
      if (!this.loaded) return
      this.$refs.form.validate(valid => {
        const { cityNum, positionId, salary } = this.form
        const salaryArr = salary.split('-')
        let datas = {
          cityNum: cityNum[cityNum.length - 1],
          positionId,
          salaryFloor: salaryArr[0],
          salaryCeil: salaryArr[1],
          fieldIds: this.labels.map(val => val.labelId).join(',')
        }
        this.saveLoading = true
        setResumeFourthApi(datas).then(({ data }) => {
          this.saveLoading = false
          if (data.httpStatus === 200) {
            window.location.replace('/index')
          }
        }).catch(() => {
          this.saveLoading = false
        })
      })
    },
    handlePrev () {
      this.$emit('update:step', 3)
    },
    handleSelectLabeld (labels) {
      this.labels = labels
    },
    selectedPosition (res) {
      this.form.positionId = res.labelId
      this.form.position = res.name
    },
    getAreaLists () {
      if (this.areas.length) return
      getAreaListsApi({ level: 3 }).then(({ data }) => {
        const results = data.data || []
        results.forEach(item => {
          item.children.forEach(item1 => {
            let result = JSON.stringify(item1.children)
            if (result === '[]') delete item1.children
          })
        })
        this.areas = results
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.step-title {
  font-size: 24px;
  color: $title-color-1;
  margin-bottom: 40px;
  font-weight: bold;
}
.resume-salary /deep/ {
  .el-select {
    width: 175px !important;
  }
}
</style>
