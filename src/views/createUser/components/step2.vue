<template>
  <div class="step-wrapper">
    <tabs
      class="resume-tabs-wrapper"
      :list="formList.length"
      :tab-index.sync="tabIndex"
      @command="handleChangeTab"
      title="工作经历" />
    <el-form :model="currentForm" ref="form" :rules="formListRules" v-loading="formLoading">
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
       <el-form-item prop="times">
        <date-picker v-model="currentForm.times" separator="~" :single="false" placeholder="请选择开始时间" end-placeholder="请选择结束时间"  />
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
import { getResumeSecondApi, setResumeSecondApi } from '@/api/putIn'
import { companyNameReg, positionReg } from '@/util/fieldRegular.js'
export default {
  props: {
    step: {
      type: Number,
      default: 2
    },
    skip: Number
  },
  components: { Tabs, SelectPositionType, DatePicker },
  computed: {
    currentForm () {
      return this.formList[this.tabIndex - 1] || {}
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
      formList: [
        {
          company: '',
          positionTypeId: null,
          positionType: '',
          position: '',
          duty: '',
          times: []
        }
      ],
      formListRules: {
        company: [{ required: true, message: '请填写公司名称', trigger: 'blur' }, { validator: companyValidate, trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择任职时间', trigger: 'change' }],
        positionTypeId: [{ required: true, type: 'number', message: '请选择职位类型', trigger: 'change' }],
        position: [{ required: true, message: '请填写职位名称', trigger: 'blur' }, { validator: positionValidate, trigger: 'blur' }],
        labelIds: [{ required: true, message: '请选择职位技能标签', trigger: 'change' }],
        duty: [{ required: true, message: '请填写工作内容', trigger: 'blur' }, { min: 10, message: '工作内容最少输入10字 ，不允许输入超过1000字', trigger: 'blur' }]
      },
      tabIndex: 1,
      formLoading: false,
      visibleDialog: false,
      loaded: false,
      saveLoading: false,
      dialogText: ''
    }
  },
  created () {
    this.formJson = JSON.stringify(this.formList[0])
  },
  activated () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      if (this.loaded) return
      getResumeSecondApi().then(({ data }) => {
        let results = data.data || []
        results = results.map(val => {
          return {
            company: val.company,
            positionTypeId: val.positionTypeId,
            positionType: val.positionType,
            position: val.position,
            duty: val.duty,
            id: val.id,
            times: [val.startTime ? val.startTime * 1000 : 0, val.endTime ? val.endTime * 1000 : 0]
          }
        })
        this.loaded = true
        if (results.length) this.formList = results
      })
    },
    handleChangeTab ({ type, value, index }) {
      if (type === 'add') {
        this.formList.push(JSON.parse(this.formJson))
        this.tabIndex = this.formList.length
      }
      if (type === 'change') {
        window.clearTimeout(this.formTimer)
        if (this.$refs.form) this.$refs.form.clearValidate()
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
    selectedPosition (item) {
      this.currentForm.positionType = item.name
      this.currentForm.position = this.currentForm.position || item.name
      if (this.$refs.positionForm) {
        this.$refs.positionForm.$emit('el.form.blur', item.name)
      }
    },
    handlePrev () {
      this.$emit('update:step', 1)
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
        setResumeSecondApi({
          careers: this.formList.map(val => {
            const { times } = val
            const startTime = isNaN(times[0]) ? parseInt(new Date(times[0]).getTime() / 1000) : parseInt(times[0]) / 1000
            const endTime = times[1] === 0 ? 0 : isNaN(times[1]) ? parseInt(new Date(times[1]).getTime() / 1000) : parseInt(times[1]) / 1000
            return {
              ...val,
              startTime,
              endTime
            }
          })
        }).then(({ data }) => {
          this.saveLoading = false
          if (data.httpStatus === 200) {
            this.$emit('update:step', 3)
          }
        }).catch(() => {
          this.saveLoading = false
        })
      } catch (e) {
        // console.log(e)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-top: 20px;
}
.resume-duty {
  padding: 0 32px;
}

.el-input.input-onlyread {
  cursor: pointer;
  overflow: hidden;
  height: $--input-height;
  .input-onlyread-text {
    display: inline-block;
    @include ellipsis();
    width: 87%;
  }
}
.input-onlyread-form-item {
  & /deep/ .el-form-item__content {
    height: $--input-height;
  }
}
</style>
