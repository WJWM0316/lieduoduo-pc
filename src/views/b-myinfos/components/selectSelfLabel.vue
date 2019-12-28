<template>
  <!-- 选择个人标签 -->
  <div>
    <div @click="handleShow">
      <slot>
        <div class="el-input el-input--suffix">
          <div class="el-input__inner custom__tags">
            <span v-if="!value.length"  class="input-placeholder-span">{{'请选择' + title}}</span>
            <div class="custom__tags-wrapper" v-else>
              <span v-for="(item,index) in value" :key="item.labelId + index" class="el-tag el-tag--info el-tag--small el-tag--light">
                <span class="el-select__tags-text">{{item.name}}</span>
                <i class="el-tag__close el-icon-close" @click.stop="removeInputLabel(index)"></i>
              </span>
            </div>
          </div>
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i class="el-select__caret el-input__icon el-icon-arrow-down"></i>
            </span>
          </span>
        </div>
      </slot>
    </div>
    <el-dialog
      width="610px"
      custom-class="app-dialog"
      append-to-body
      @close="removeSelectStatus"
      :visible.sync="dialogStatus">
      <div slot="title">{{'请选择' + title}} <span class="title-tips">({{selectedLabels.length}}/{{limit}})</span></div>
      <div class="selected-labels-wrapper">
        <template v-for="(item, index) in selectedLabels">
          <span :key="item.labelId + index" class="label-item active" @click="removeSelectedLabel(index, item)"><i class="el-icon-error close-icon"></i> {{item.name}}</span>
        </template>
      </div>
      <div class="labels-wrapper" v-loading="getLoading">
        <ul class="warpper-scroll labels-title-wrapper">
          <template v-for="item in labels">
            <li :key="item.lid" :class="{active: item.lid === currentLabel.lid}" @click="handleSelectTitle(item)" class="label-title">{{item.name}}</li>
          </template>
        </ul>
        <div class="warpper-scroll labels-content-wrapper">
          <el-select v-model="selectValue" @change="handleChangeSkill" style="width: 320px" v-if="currentLabel.hasSelect">
            <template v-for="option in skillSelectedData">
              <el-option :key="option.labelId" :label="option.name" :value="option.labelId"></el-option>
            </template>
          </el-select>
          <div class="labels-list">
            <template v-for="item in currentLabels">
              <span class="label-item" :class="{active: item.checked}" :key="item.labelId" @click="handleSelectedLabels(item)">{{item.name}}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="custom-labels">
        <el-popover
          placement="bottom"
          popper-class="custom-label-popover"
          width="306"
          v-model="customTagStatus">
          <p>新建自定义标签</p>
          <el-input maxlength="7" show-word-limit v-model="customTagValue" placeholder="请输入个性标签" />
          <div style="text-align: right; margin: 0">
            <el-button size="small" style="width: 88px;"  @click="customTagStatus = false">取消</el-button>
            <el-button type="primary" style="width: 116px;" :loading="addCustomLoading" size="small" :disabled="!customTagValue.length && selectedLabels.length < limit " @click="handleAddCustom">确定</el-button>
          </div>
           <span slot="reference" class="custom-label-tips">未找到合适的，<span>添加自定义标签</span></span>
        </el-popover>
      </div>
      <div slot="footer" class="select-labels-button">
        <el-button type="default"  size="small" @click="dialogStatus = false">取消</el-button>
        <el-button type="primary" size="small"  @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLifeLabels, getSkillLabels, addLifeLabels } from '@/api/recruiter'
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    title: {
      required: true,
      type: String
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      dialogStatus: false,
      customTagStatus: false,
      addCustomLoading: false,
      selectValue: '',
      selectedLabels: [],
      customTagValue: '',
      skillSelectedData: [],
      labels: [
        { lid: 1, name: '职业技能', key: 'positionSkill', type: 'label_professional_skills', hasSelect: true },
        { lid: 2, name: '职业素养', key: 'positionAttainment', type: 'label_professional_literacy', hasSelect: false },
        { lid: 3, name: '性格标签', key: 'personality', type: 'label_life', hasSelect: false },
        { lid: 4, name: '爱好标签', key: 'hobby', type: 'label_life', hasSelect: false }
      ],
      currentLabel: {},
      positionSkill: [], // 职业技能
      positionAttainment: [], // 职业素养
      personality: [], // 性格标签
      hobby: [], // 爱好标签
      getLoading: false
    }
  },
  created () {
    this.currentLabel = this.labels[0]
  },
  computed: {
    currentLabels () {
      return this.currentLabel.lid ? this[this.currentLabel.key] : []
    }
  },
  methods: {
    getListData () {
      this.getLoading = true
      Promise.all([getSkillLabels(), getLifeLabels()]).then((res) => {
        this.getLoading = false
        const skillsData = res[0].data.data || {}
        const personalData = res[1].data.data || []
        // 暂存数据
        this.positionSkills = skillsData.labelProfessionalSkills
        // select data
        this.skillSelectedData = skillsData.labelProfessionalSkills.map(val => ({
          labelId: val.labelId,
          type: val.type,
          name: val.name
        }))
        // 职业
        if (this.selectValue) {
          this.positionSkill = this.positionSkills.find(val => val.labelId === this.selectValue).children
        } else {
          this.positionSkill = this.positionSkills[0].children
          this.selectValue = this.positionSkills[0].labelId
        }
        this.positionAttainment = skillsData.labelProfessionalLiteracy
        // 个人
        this.personality = personalData[0].children
        this.hobby = personalData[1].children
        // 数据复现
        this.reviewData()
      }).catch(() => {
        this.getLoading = false
      })
    },
    // 选择标签
    handleSelectedLabels (label) {
      if (label.checked) {
        label.checked = false
        const index = this.selectedLabels.findIndex(val => val.labelId === label.labelId)
        if (index >= 0) this.selectedLabels.splice(index, 1)
      } else {
        if (this.limit <= this.selectedLabels.length) {
          this.$message.warning(`最多选择${this.limit}个${this.title}`)
          return
        }
        this.$set(label, 'checked', true)
        this.selectedLabels = [...this.selectedLabels, label]
      }
    },
    // 移除标签
    removeSelectedLabel (index, label) {
      label.checked = false
      this.selectedLabels.splice(index, 1)
    },
    removeInputLabel (index) {
      this.value.splice(index, 1)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', this.value)
      }
    },
    handleSelectTitle (item) {
      this.currentLabel = item
    },
    handleChangeSkill (labelId) {
      this.positionSkill = this.positionSkills.find(val => val.labelId === labelId).children
    },
    // 添加自定义标签
    handleAddCustom () {
      if (this.customTagValue && this.customTagValue.length <= 7) {
        this.addCustomLoading = true
        addLifeLabels({ name: this.customTagValue }).then(({ data: { httpStatus, data } }) => {
          this.addCustomLoading = false
          if (httpStatus === 200) {
            data.name = this.customTagValue
            data.type = 'label_life'
            this.selectedLabels = [...this.selectedLabels, data]
            this.customTagStatus = false
          }
        }).catch(() => {
          this.addCustomLoading = false
        })
      } else {
        this.$message.warning('自定义标签内容长度不正确')
      }
    },
    handleShow () {
      this.dialogStatus = true
      if (this.positionSkills && this.positionSkills.length && this.hobby.length && this.personality.length) {
        // 数据复现
        this.reviewData()
        return
      }
      this.getListData()
    },
    // review data
    reviewData () {
      if (!this.value.length) return
      // 判断是否有存在职业技能id
      const skills = this.value.filter(val => val.type === 'label_professional_skills')
      const personalIds = this.value.map(val => val.labelId + val.type || '-')
      const data = [].concat(this.value.filter(val => val.source === 'diy'))
      if (skills.length) {
        for (let skillKey in skills) {
          let clabel = this.positionSkills.find(val => val.labelId === skills[skillKey].topPid)
          if (!clabel) continue
          let label = clabel.children.find(val => val.labelId === skills[skillKey].labelId)
          this.$set(label, 'checked', true)
          data.push(label)
        }
        this.selectValue = skills[skills.length - 1].topPid
        if (this.selectValue) this.handleChangeSkill(this.selectValue)
      }
      const temp = [this.positionAttainment, this.personality, this.hobby]
      temp.forEach(val => {
        val.forEach(item => {
          if (personalIds.includes(item.labelId + item.type)) {
            this.$set(item, 'checked', true)
            data.push(item)
          }
        })
      })
      this.selectedLabels = data
    },
    handleSave () {
      const data = JSON.parse(JSON.stringify(this.selectedLabels))
      this.$emit('input', data)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', data)
      }
      this.dialogStatus = false
    },
    removeSelectStatus () {
      this.selectedLabels.forEach(val => {
        val.checked = false
      })
      this.selectedLabels = []
    }
  }
}
</script>
<style lang="scss" scoped>
.custom__tags  {
  .el-tag {
    margin: 2px 14px 2px 0;
  }
}
.custom__tags.el-input__inner {
  min-height: 40px;
  height: auto;
  .custom__tags-wrapper {
    padding: 2px 0;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
}
.labels-wrapper {
  height: 374px;
  .labels-title-wrapper {
    float: left;
    width: 142px;
    overflow-y: auto;
    height: 100%;
    li {
      height: 46px;
      text-align: center;
      line-height: 46px;
      position: relative;
      cursor: pointer;
    }
    .active {
      color: $main-color-1;
      background-color: $bg-color-1;
    }
    li.active:after {
      content: "";
      width: 4px;
      height: 20px;
      background: $bg-color-4;
      border-radius: 0px 50px 50px 0px;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -10px;
    }
    li:hover {
      color: $main-color-1;
    }
  }
  .labels-content-wrapper {
    text-align: left;
    overflow-x: hidden;
    height: 100%;
    padding: 20px 28px;
    box-sizing: border-box;
    overflow-y: auto;
    background-color: $bg-color-1;
    & /deep/ .el-input__validateIcon {
      display: none;
    }
  }
}
.label-item {
  padding: 5px 16px;
  line-height: 1.2;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin: 0 5px 0 0;
  border-radius: 15px;
  font-size: 14px;
  color: $font-color-9;
  border:1px solid $border-color-5;
  margin: 14px 8px 0px 0;
  .close-icon {
    position: absolute;
    right: -8px;
    font-size: 14px;
    border-radius: 50%;
    top: 0;
    z-index: 2;
    background: #fff;
    color: $main-color-1;
  }
}
.selected-labels-wrapper {
  padding: 0 40px;
  text-align: left;
  .label-item {
    margin: 0px 14px 14px 0;
  }
}
.label-item:hover, .label-item.active {
  border-color: $border-color-2;
  color: $main-color-1;
}
.custom-label-tips {
  display: inline-block;
  padding-left: 40px;
  padding-top: 30px;
  font-size: 14px;
  color: $title-color-3;
  cursor: pointer;
  span {
    color: $main-color-1;
  }
}
</style>
<style lang="scss">
.el-popover.custom-label-popover{
  padding: 24px 24px 30px;
  box-sizing: border-box;
  p {
    margin-bottom: 14px;
    color: $title-color-1;
  }
  .el-input {
    width: 258px;
    margin-bottom: 28px;
    .el-input__validateIcon {
      display: none;
    }
  }
}
</style>
