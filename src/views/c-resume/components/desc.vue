<template>
  <div class="resume-desc">
    <wrapper :is-empty="isEmpty" ref="wrapper" @command="handleCommand" :status="status">
      <template slot="header">自我描述</template>
      <template slot="content">
        <div v-if="resume.signature">
          <div class="resume-list-desc signatrue-text">{{resume.signature}}</div>
          <div class="form-labels-wrapper">
            <span
              v-for="item in resume.personalizedLabels"
              :key="item.id"
              class="form-label">{{item.labelName}}</span>
          </div>
        </div>
      </template>
      <template slot="bottom" v-if="isEmpty">
        <div class="c-btn" @click="handleAdd"><i class="el-icon-plus"/> 添加自我描述</div>
      </template>
      <template slot="edit">
        <p class="form-header-title">编辑自我描述</p>
        <el-form :model="form" :rules="formRules" ref="form">
          <div class="form-item">
            <p class="form-title">职业标签（选填)</p>
            <el-form-item>
              <select-labels
                :multiple="true"
                v-model="form.position"
                title="职业标签"
                type="skills"
                :filter="expectId"
                :multiple-config.sync="positionLabelsConfig" />
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">生活标签（选填）</p>
            <el-form-item>
              <select-labels
                v-model="form.life"
                title="生活标签"
                :multiple="true"
                :multiple-config.sync="listLabelsConfig"
                type="life" />
            </el-form-item>
          </div>
          <div class="form-item">
            <p class="form-title">自我描述 </p>
            <el-form-item prop="signature">
              <el-input
                type="textarea"
                placeholder="说明为什么非你不可"
                v-model="form.signature"
                :autosize="{ minRows: 3, maxRows: 7}"
                :rows="7"
                maxlength="150"
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
import SelectLabels from 'COMPONENTS/selectLabels'
import { setResumeDesc } from 'API/resume'
export default {
  components: { SelectLabels, Wrapper },
  props: {
    propClass: String,
    resume: {
      type: Object,
      default: () => ({})
    },
    status: String
  },
  data () {
    return {
      positionLabelsConfig: [{ title: '职业技能', tipText: '职业标签', limit: 3, checked: [] }, { title: '职业素养', tipText: '职业标签', limit: 3, checked: [] }],
      listLabelsConfig: [{ title: '性格', tipText: '生活标签', limit: 3, checked: [] }, { title: '爱好', tipText: '生活标签', limit: 3, checked: [] }],
      form: {
        signature: '',
        position: '',
        life: ''
      },
      formRules: {
        signature: [{ required: true, message: '请填写自我描述信息', trigger: 'blur' }]
      }
    }
  },
  computed: {
    info () {
      const { signature, personalizedLabels } = this.resume
      return {
        signature,
        life: personalizedLabels.filter(val => val.type === 'label_life'),
        position: personalizedLabels.filter(val => val.type === 'label_professional_literacy' || val.type === 'label_professional_skills')
      }
    },
    isEmpty () {
      return !this.resume.signature
    },
    expectId () {
      const expects = this.resume.expects || []
      return expects[0] && expects[0].positionTopPid
    }
  },
  methods: {
    handleCommand ({ type, cb }) {
      if (type === 'edit') {
        const { life, position, signature } = this.info
        this.form = {
          signature,
          life: life.map(val => val.labelName).join('、'),
          position: position.map(val => val.labelName).join('、')
        }
      } else if (type === 'save') {
        this.$refs.form.validate(valid => {
          if (valid) {
            const { life, position } = this.info
            // 取出集合的数据
            let positionLabels = this.positionLabelsConfig.map(val => val.checked).flat()
            let lifeLabels = this.listLabelsConfig.map(val => val.checked).flat()
            // console.log(positionLabels, lifeLabels)
            let labels = []
            labels = positionLabels.length ? labels.concat(positionLabels) : labels.concat(position)
            labels = lifeLabels.length ? labels.concat(lifeLabels) : labels.concat(life)
            setResumeDesc({
              signature: this.form.signature,
              labels
            }).then(({ data }) => {
              // eslint-disable-next-line standard/no-callback-literal
              if (data.httpStatus === 200) {
                // 记录数据到vuex
                this.$store.commit('overwriteResume', {
                  signature: this.form.signature,
                  personalizedLabels: labels.map(val => {
                    val.labelName = val.labelName || val.name
                    return val
                  })
                })
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
            // eslint-disable-next-line standard/no-callback-literal
            cb(false)
          }
        })
      }
    },
    handleAdd () {
      this.$refs.wrapper.showEditCompoents()
    }
  }
}
</script>
<style lang="scss" scoped>
.resume-desc {
  .form-item {
    width: 100% !important;
    padding-left:0 !important;
  }
}
.signatrue-text {
  padding: 0 !important;
}
</style>
