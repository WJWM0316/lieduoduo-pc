<template>
  <!-- 求职意向 -->
  <div class="proposal-warpper">
    <wrapper :is-delete="true" :list="list" ref="wrapper" @command="handleCommand" :status="status" :config="{limit: 1, max: 3}">
      <template slot="header">求职意向</template>
      <template v-slot:content="{row}">
        <p class="proposal-item" v-if="row">
          <span>{{row.position}}</span>
          <span>|</span>
          <span>{{row.city}}</span>
          <span>|</span>
          <span class="ellipsis">{{row.fields.map(val=>val.field).join(' ')}}</span>
          <span class="salary">{{row.salaryFloor}}-{{row.salaryCeil}}K</span>
        </p>
      </template>
      <template slot="bottom">
        <div class="c-btn resume-add-btn" @click="handleShowForm(true)"><i class="el-icon-plus" /> 添加求职意向</div>
      </template>
      <template slot="edit">
        <p class="form-header-title">{{isAdd? '添加' : '编辑'}}求职意向</p>
        <el-form :model="form" :rules="formRules" ref="form">
          <div class="form-item">
            <p class="form-title">期望城市</p>
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
          </div>
          <div class="form-item">
            <p class="form-title">期望职位</p>
            <el-form-item prop="positionId">
              <select-position-type
                v-model.number="form.positionId"
                :label="form.position"
                @on-selected="selectedPosition">
              </select-position-type>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">期望行业</p>
            <el-form-item prop="fieldIds">
              <select-labels
                v-model="form.fieldIds"
                :limit="3"
                title="期望行业"
                type="field"
                :default-value="labelIds"
                @on-selected="handleSelectLabeld" />
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">期望薪资</p>
            <el-form-item prop="salary">
              <salary
                ref="salary"
                v-model="form.salary" />
            </el-form-item>
          </div>
        </el-form>
      </template>
    </wrapper>
  </div>
</template>
<script>
import Wrapper from './wrapper'
import { addExpect, getAllExpect, setExpect, deleteExpect } from 'API/resume'
import { getAreaListsApi } from 'API/putIn'
import Salary from './salary'
import SelectPositionType from 'COMPONENTS/selectPositionType'
import SelectLabels from 'COMPONENTS/selectLabels'
export default {
  propClass: String,
  props: {
    resume: {
      type: Object,
      default: () => ({})
    },
    status: String
  },
  components: {
    Wrapper, Salary, SelectPositionType, SelectLabels
  },
  computed: {
    list () {
      const { expects } = this.resume
      return JSON.parse(JSON.stringify(expects || []))
    },
    labelIds () {
      return this.labels.map(val => val.labelId)
    }
  },
  data () {
    return {
      isAdd: true, // 是否是添加状态
      labels: [], // 当前form状态的期望行业内容
      currentId: null, // 当前需要更改的行业
      form: {
        cityNum: [],
        positionId: null,
        position: '', // 职位名称
        salary: '',
        fieldIds: ''
      },
      formRules: {
        cityNum: [{ required: true, message: '请选择期望城市', trigger: 'change' }],
        positionId: [{ required: true, type: 'number', message: '请选择期望职位', trigger: 'change' }],
        fieldIds: [{ required: true, message: '请选择期望行业', trigger: 'change' }],
        salary: [{ required: true, message: '请选择期望薪资', trigger: 'blur' }]
      },
      areas: []
    }
  },
  methods: {
    handleCommand ({ type, cb, item, index }) {
      if (type === 'edit') {
        const { cityNum, fields, position, positionId, salaryCeil, salaryFloor, id, provinceNum, fieldIds } = item
        this.currentId = id
        this.form = {
          cityNum: [provinceNum, cityNum],
          positionId,
          position,
          fields: fieldIds,
          fieldIds: fields.map(val => val.field).join('、'),
          salary: `${salaryFloor}-${salaryCeil}`
        }
        this.labels = fields.map(val => {
          val.labelId = val.fieldId
          val.name = val.field
          return val
        })
        this.handleShowForm(false, { salaryFloor, salaryCeil })
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { cityNum, positionId, salary } = this.form
            const salaryArr = salary.split('-')
            let datas = {
              cityNum: cityNum[cityNum.length - 1],
              positionId,
              salaryFloor: salaryArr[0],
              salaryCeil: salaryArr[1],
              fieldIds: this.labels.map(val => val.labelId).join(',')
            }
            if (this.isAdd) {
              addExpect(datas).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllExpects()
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
              datas.id = this.currentId
              setExpect(datas).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllExpects()
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
        deleteExpect({ id: item.id }).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.resume.expects.splice(index, 1)
            // 移除vuex中的内容
            /* this.$store.commit('overwriteResume', {
              expects:
            }) */
          }
        })
      }
    },
    getAreas () {
      if (this.areas.length) return
      getAreaListsApi({ level: 3 }).then(({ data }) => {
        const areas = data.data || []
        function removeChileren (data) {
          data.forEach(val => {
            if (val.children && val.children.length) {
              removeChileren(val.children)
            } else {
              delete val.children
            }
          })
        }
        removeChileren(areas)
        this.areas = areas
      })
    },

    // 获取我的所有
    async getAllExpects () {
      await getAllExpect().then(({ data }) => {
        // 将内容写入到vuex 中
        this.$store.commit('overwriteResume', {
          expects: data.data || []
        })
      })
    },
    // 添加
    handleShowForm (isAdd = true, salary = {}) {
      this.getAreas()
      this.$refs.wrapper.showEditCompoents()
      this.isAdd = isAdd
      if (this.isAdd) {
        this.form = {
          cityNum: [],
          positionId: null,
          position: '', // 职位名称
          salary: '',
          fieldIds: ''
        }
      }
      this.jsonFormString = JSON.stringify(this.form)
      this.$nextTick(() => {
        this.$refs.salary.handleInit(salary.salaryFloor, salary.salaryCeil)
      })
    },
    validFormData () {
      return this.jsonFormString === JSON.stringify(this.form)
    },
    // 选择职位
    selectedPosition (item) {
      this.form.position = item.name
    },
    // 选择行业
    handleSelectLabeld (list) {
      this.labels = list
    }
  }
}
</script>
<style lang="scss" scoped>
.proposal-item {
  span {
    font-size: 14px;
    color: $title-color-2;
    display: inline-block;
    vertical-align: middle;
  }
  span + span {
    padding-left: 6px;
  }
  span.ellipsis {
    max-width: 240px !important;
  }
  span.salary {
    padding-left: 12px;
    color: $error-color-1;
  }
}
.proposal-warpper {
  & /deep/ {
    .list-item + .list-item  {
      margin-top: 16px;
    }
  }

}
</style>
