<template>
  <!-- 项目经历 -->
  <div>
    <wrapper :is-delete="true" :is-empty="!list.length" :list="list" ref="wrapper" @command="handleCommand" :status="status" :config="{limit: 1, max: 10}">
      <template slot="header">项目经历</template>
      <template v-slot:content="{row}">
        <template v-if="row">
          <p class="resume-list-header project-header">
            <span>
              <span class="ellipsis">{{row.name}}</span>
              <span class="separator">|</span>
              <span class="ellipsis">{{row.role}}</span>
            </span>
            <span class="resume-list-time">{{row.startTimeDesc | date('YYYY.MM')}}-{{row.endTimeDesc | date('YYYY.MM')}}</span>
          </p>
          <div class="resume-list-desc">{{row.description}}</div>
          <div class="resume-list-link" v-if="row.link">
            链接: <span target="_black" @click.prevent="openNewWindow(row.link)">{{row.link}}</span>
          </div>
        </template>
      </template>
      <template slot="bottom">
        <div class="c-btn resume-add-btn" @click="handleShowForm(true)"><i class="el-icon-plus" /> 添加项目经历</div>
      </template>
      <template slot="edit">
        <p class="form-header-title">{{isAdd? '添加' : '编辑'}}项目经历</p>
        <el-form :model="form" :rules="formRules" ref="form">
          <div class="form-item">
            <p class="form-title">项目名称</p>
            <el-form-item prop="name">
              <el-input v-model="form.name" placeholder="请填写项目名称"/>
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">担任角色</p>
            <el-form-item prop="role">
              <el-input v-model="form.role" placeholder="请填写担任角色"/>
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
            <p class="form-title">项目链接（选填）</p>
            <el-form-item prop="link">
              <el-input v-model="form.link" placeholder="可访问的项目链接，例如：www.lieduoduo.com"/>
            </el-form-item>
          </div>
          <div class="form-item" style="width: 100%; padding-left: 0px">
            <p class="form-title">工作内容</p>
            <el-form-item prop="description">
              <el-input
                type="textarea"
                placeholder="这个项目的目的是***，取得成就是***，我在其中发挥了***的作用"
                v-model="form.description"
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
import DatePicker from './datePicker'
import { addProject, setProject, getAllProject, deleteProject } from 'API/resume'
import { projectNameReg, roleNameReg, urlReg } from '@/util/fieldRegular.js'
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
  data () {
    const validateProjectName = (rule, value, callback) => {
      if (projectNameReg.test(value)) {
        callback()
      } else {
        callback(new Error('项目名称需为2-50个字'))
      }
    }
    const validateRoleName = (rule, value, callback) => {
      if (roleNameReg.test(value)) {
        callback()
      } else {
        callback(new Error('担当角色需为2-50个字'))
      }
    }
    const validateLink = (rule, value, callback) => {
      if (value === '') {
        return callback()
      }
      if (urlReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的链接'))
      }
    }
    return {
      isAdd: true,
      currentId: null,
      form: {
        name: '',
        role: '',
        times: [],
        description: '',
        link: ''
      },
      formRules: {
        name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }, { validator: validateProjectName, trigger: 'blur' }],
        role: [{ required: true, message: '请填写担当角色', trigger: 'blur' }, { validator: validateRoleName, trigger: 'blur' }],
        times: [{ required: true, type: 'array', message: '请选择持续时间段', trigger: 'change' }],
        link: [{ validator: validateLink, trigger: 'blur' }],
        description: [{ required: true, message: '请填写项目描述', trigger: 'blur' }]
      }
    }
  },
  computed: {
    list () {
      return this.resume.projects || []
    }
  },
  methods: {
    handleCommand ({ cb, type, item, index }) {
      if (type === 'edit') {
        Object.assign(this.form, {
          name: item.name,
          role: item.role,
          times: [item.startTime * 1000, item.endTime * 1000],
          description: item.description,
          link: item.link
        })
        this.currentId = item.id
        this.isAdd = false
        this.jsonFormString = JSON.stringify(this.form)
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { name, role, times, description, link } = this.form
            const startTime = isNaN(times[0]) ? parseInt(new Date(times[0].replace('-', '/')).getTime() / 1000) : parseInt(times[0]) / 1000
            const endTime = times[1] === 0 ? 0 : isNaN(times[1]) ? parseInt(new Date(times[1].replace('-', '/')).getTime() / 1000) : parseInt(times[1]) / 1000
            if (this.isAdd) {
              addProject({ name, role, description, link, startTime, endTime }).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllProjects()
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
              setProject({ id: this.currentId, name, role, description, link, startTime, endTime }).then(async ({ data }) => {
                if (data.httpStatus === 200) {
                  await this.getAllProjects()
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
        deleteProject({ id: item.id }).then(({ data }) => {
          if (data.httpStatus === 200) {
            this.resume.projects.splice(index, 1)
            // 移除vuex中的内容
            /* this.$store.commit('overwriteResume', {
              expects:
            }) */
          }
        })
      }
    },
    async getAllProjects () {
      await getAllProject().then(({ data }) => {
        // 将内写入到vuex 中
        this.$store.commit('overwriteResume', {
          projects: data.data || []
        })
      })
    },
    handleShowForm (isAdd = true) {
      this.isAdd = isAdd
      if (this.isAdd) {
        this.form = {
          name: '',
          role: '',
          times: [],
          description: '',
          link: ''
        }
      }
      this.jsonFormString = JSON.stringify(this.form)
      this.$refs.wrapper.showEditCompoents()
    },
    validFormData () {
      return this.jsonFormString === JSON.stringify(this.form)
    },
    openNewWindow (link) {
      let protocol = link.indexOf('http') >= 0 ? '' : 'http://'
      window.open(protocol + link, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.resume-list-link {
  font-size: 14px;
  margin-top: 10px;
  color: $title-color-2;
  word-wrap: break-word;
  word-break: break-all;
  span {
    color: $main-color-1;
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
}
</style>
