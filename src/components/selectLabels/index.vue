<template>
  <!-- 选择标签 -->
  <div class="select-labels">
    <div @click="handleShow">
      <slot>
        <div class="el-input el-input--suffix">
          <div class="el-input__inner"><span v-if="!value"  class="input-placeholder-span">{{'请选择' + title}}</span>{{value}}</div>
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
              <i class="el-select__caret el-input__icon el-icon-arrow-down"></i>
            </span>
          </span>
        </div>
      </slot>
    </div>
    <el-dialog
      width="450px"
      custom-class="app-dialog"
      append-to-body
      :visible.sync="dialogStatus">
      <div slot="title">{{'请选择' + title}} <span class="title-tips">(最多选{{limit}}个{{title}})</span></div>
      <div class="dialog-lables">
        <div class="selected-labels" v-if="selectLabels.length">
          <template v-for="(item, index) in selectLabels">
            <span class="label-item active" :key="item.labelId" @click="handleRemove(item, index)"><i class="el-icon-error close-icon"></i>{{item.name}}</span>
          </template>
        </div>
        <div class="warpper-scroll labels">
          <template v-if="multiple">
            <div v-for="(item, index) in multipleConfig" :key="index">
              <p class="labels-title">{{item.title}} </p>
              <template v-for="child in item.labels">
                <span class="label-item" :class="{'active': child.check}" @click="handleSelect(child, item, index)" :key="child.labelId">{{child.name}}</span>
              </template>
            </div>
          </template>
          <template v-else>
            <template v-for="item in labels">
              <span
                class="label-item"
                :class="{'active': item.check}" @click="handleSelect(item)"
                :key="item.labelId">
                {{item.name}}
              </span>
            </template>
          </template>
        </div>
      </div>
      <div slot="footer" class="select-labels-button">
        <el-button type="default" size="small" @click="dialogStatus = false">取消</el-button>
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLabels } from '@/api/resume'
export default {
  props: {
    value: String,
    type: {
      type: String,
      default: ''
    },
    title: {
      required: true,
      type: String
    },
    limit: {
      type: Number,
      default: 3
    },
    multiple: Boolean,
    multipleConfig: Array,
    validFilter: Boolean, // 验证是否传入验证项
    validFilterText: String,
    defaultValue: Array,
    filter: [String, Number, Function]
  },
  data () {
    return {
      dialogStatus: false,
      getLoading: false,
      loaded: false,
      labels: [],
      selectLabels: []
    }
  },
  methods: {
    getLable () {
      if (this.getLoading || this.loaded) return
      this.getLoading = true
      getLabels({ type: this.type }).then(({ data }) => {
        this.getLoading = false
        this.loaded = true
        this.setLabels(data)
      }).catch(() => {
        this.getLoading = false
      })
    },
    setLabels (data) {
      switch (this.type) {
        case 'skills':
          const { labelProfessionalLiteracy, labelProfessionalSkills } = data.data
          const results = labelProfessionalSkills.find(val => val.labelId === this.filter)
          let configs = JSON.parse(JSON.stringify(this.multipleConfig))
          configs[0].labels = (results && results.children) || []
          configs[1].labels = labelProfessionalLiteracy
          configs = this.handleReview(configs)
          this.$emit('update:multiple-config', configs)
          break
        case 'life':
          const personal = data.data[0].children
          const life = data.data[1].children
          let lifeconfigs = JSON.parse(JSON.stringify(this.multipleConfig))
          lifeconfigs[0].labels = personal
          lifeconfigs[1].labels = life
          lifeconfigs = this.handleReview(lifeconfigs)
          this.$emit('update:multiple-config', lifeconfigs)
          break
        case 'position':
          var labelProfessional = data.data.labelProfessionalSkills
          this.labels = this.handleReview(labelProfessional.find(val => val.labelId === this.filter).children)
          break
        default:
          this.labels = this.handleReview(data.data)
      }
    },
    // 数据复现
    handleReview (data) {
      if (!data) return []
      if (!this.defaultValue) return data
      if (this.multiple) {
        let labels = []
        for (let item in data) {
          let results = data[item].labels.filter(val => {
            let flag = this.defaultValue.includes(val.labelId)
            if (flag) {
              val.check = true
              val.index = item
            }
            return flag
          })
          // console.log(data[item].labels, results)
          data[item].checked = results
          labels = labels.concat(results)
        }
        this.selectLabels = labels
      } else {
        let results = data.filter(val => {
          let flag = this.defaultValue.includes(String(val.labelId))
          if (flag) {
            val.check = true
          }
          return flag
        })
        // console.log(results, data)
        this.selectLabels = results
      }
      return data
    },
    handleSelect (item, parent, parentIndex) {
      let ischecked = !item.check
      // 是否超出选择的数量
      if (ischecked) {
        const results = this.showLimitTips(item, parent)
        if (!results) return
      }
      this.$set(item, 'check', ischecked)
      if (parent) {
        // 多labels
        if (ischecked) {
          parent.checked.push({ labelId: item.labelId, name: item.name, pid: item.pid, topPid: item.topPid, type: item.type })
          this.addToLabels(item, parentIndex)
        } else {
          this.removeItem(item.labelId, parent.checked)
        }
        // 单labels
      } else {
        if (ischecked) {
          this.addToLabels(item, parentIndex)
        } else {
          const labelIndex = this.selectLabels.findIndex(val => val.labelId === item.labelId)
          if (labelIndex >= 0) this.selectLabels.splice(labelIndex, 1)
        }
      }
    },
    // 移除内容
    removeItem (id, data) {
      const index = data.findIndex(val => val.labelId === id)
      const labelIndex = this.selectLabels.findIndex(val => val.labelId === id)
      if (index >= 0) data.splice(index, 1)
      if (labelIndex >= 0) this.selectLabels.splice(labelIndex, 1)
    },
    // 是否超出选择的数量
    showLimitTips (item, parent) {
      // const limit = parent ? parent.limit || this.limit : this.limit
      // const select = parent ? parent.checked.length : this.selectLabels.length
      if (this.selectLabels.length >= this.limit) {
        this.$message.warning(`${parent ? parent.tipText : this.title}最多只能选择${this.limit}个`)
        return false
      }
      return true
    },
    // 移除labels集合内容
    handleRemove (item, i) {
      if (this.multiple) {
        const list = this.multipleConfig[item.index]
        const labelIndex = list.checked.findIndex(val => val.labelId === item.labelId)
        const index = list.labels.findIndex(val => val.labelId === item.labelId)
        if (index >= 0) list.labels[index].check = false
        if (labelIndex >= 0) list.checked.splice(labelIndex, 1)
      } else {
        const index = this.labels.findIndex(val => val.labelId === item.labelId)
        if (index >= 0) this.labels[index].check = false
      }
      this.selectLabels.splice(i, 1)
    },
    // 添加到labels集合
    addToLabels (item, parentIndex = 0) {
      this.selectLabels.push({
        labelId: item.labelId,
        name: item.name,
        pid: item.pid,
        topPid: item.topPid,
        index: parentIndex,
        type: item.type })
    },
    handleShow () {
      if (this.validFilter && !this.filter) {
        this.$message.warning(this.validFilterText)
        return
      }
      this.dialogStatus = true
      if (this.loaded) {
        this.handleReview(this.multiple ? this.multipleConfig : this.labels)
        return
      }
      this.getLable()
    },
    // 保存数据
    handleSave () {
      this.$emit('on-selected', this.selectLabels)
      this.$emit('input', this.selectLabels.map(val => val.name).join('、'))
      this.dialogStatus = false
    },
    // 清空数据
    handleClear () {
      this.labels = []
      this.selectLabels = []
      this.loaded = false
    }
  }
  /* watch: {
    dialogStatus (value) {
      if (!value) {
        // 选择的数据
      }
    }
  } */
}
</script>
<style lang="scss" scoped>
.select-labels {
  line-height: normal;
  .el-input__inner {
    @include ellipsis;
  }
}
.labels {
  padding: 0 40px;
  text-align: left;
  max-height: 300px;
  overflow-y: auto;
  position: relative;
}
.labels::after {
  content: "";
  top: 0;
  left: 40px;
  width: calc(100% - 80px);
  position: absolute;
  height: 1px;
  background: $border-color-1;
}
.selected-labels {
  padding: 0 40px;
  text-align: left;
  .label-item {
    margin: 0px 8px 14px 0;
  }
}

.labels-title {
  margin-top: 20px;
  color: $title-color-1;
  span {
    color: $title-color-2;
  }
  .check-span {
    color: $error-color-1;
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
.label-item:hover, .label-item.active {
  border-color: $border-color-2;
  color: $main-color-1;
}
</style>
