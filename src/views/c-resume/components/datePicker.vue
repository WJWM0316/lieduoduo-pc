<template>
  <div class="c-date-picker" :class="{'c-date-multiple': !single}">
    <div class="el-select">
      <el-popover
        placement="bottom-start"
        width="324"
        popper-class="popover-date"
        v-model="startTimePopStatus"
        @show="handleShowPopover('startTime')"
        trigger="click">
        <div class="popover-date-picker">
          <ul class="warpper-scroll date-years" :ref="refKeys.startTime">
            <li :class="{active: startTimeValue.now}" v-if="showTextSelect" @click="handleChangeYear('startTime')">{{textValue}}</li>
            <template v-for="item in years">
              <li :key="item" @click="handleChangeYear('startTime', item)" :class="{active: startTimeValue.year == item}">{{item}}</li>
            </template>
          </ul>
          <div class="date-months" :class="{'date-disabled': startTimeValue.now}">
            <template v-for="item in months">
              <div :key="item.value" @click="handleSelect('startTime', item)" :class="{active: startTimeValue.month == item.value}">{{item.label}}</div>
            </template>
          </div>
        </div>
        <div class="el-input el-input--suffix" slot="reference">
          <div class="el-input__inner"><span v-if="!inputStartTimeValue" class="input-placeholder-span">{{placeholder}}</span>{{inputStartTimeValue}}</div>
          <span class="el-input__suffix">
            <span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up" :class="{'is-reverse':startTimePopStatus}"></i></span>
          </span>
        </div>
      </el-popover>
    </div>
    <template v-if="!single">
      <span class="c-picker-separator">{{separator}}</span>
      <div class="el-select">
        <el-popover
          placement="bottom-start"
          width="324"
          v-model="endTimePopStatus"
          popper-class="popover-date"
          @show="handleShowPopover('endTime')"
          trigger="click">
          <div class="popover-date-picker">
            <ul class="warpper-scroll date-years" :ref="refKeys.endTime">
              <li :class="{active: endTimeValue.now}" @click="handleChangeYear('endTime')">{{textValue}}</li>
              <template v-for="item in years">
                <li :key="item" @click="handleChangeYear('endTime', item)" :class="{active: endTimeValue.year == item}">{{item}}</li>
              </template>
            </ul>
            <div class="date-months" :class="{'date-disabled': endTimeValue.now}">
              <template v-for="item in months">
                <div :key="item.value" @click="handleSelect('endTime', item)" :class="{active: endTimeValue.month == item.value}">{{item.label}}</div>
              </template>
            </div>
          </div>
          <div class="el-input el-input--suffix" :class="{'is-disabled': !this.startTime}" slot="reference">
            <div class="el-input__inner"><span v-if="!inputEndTimeValue"  class="input-placeholder-span">{{endPlaceholder}}</span>{{inputEndTimeValue}}</div>
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up" :class="{'is-reverse':endTimePopStatus}"></i></span>
            </span>
          </div>
        </el-popover>
      </div>
    </template>
  </div>
</template>
<script>
/**
 * 仅支持 YYYY-MM 格式
 */
const formatData = (str, textValue) => {
  // eslint-disable-next-line eqeqeq
  if (new Date(str) == 'Invalid Date') {
    return ''
  // eslint-disable-next-line eqeqeq
  } else if (str == 0) {
    return textValue
  } else {
    let times = new Date(str)
    let month = times.getMonth() + 1
    return `${times.getFullYear()}-${month > 9 ? month : '0' + month}`
  }
}
export default {
  props: {
    value: {
      required: true,
      type: [Array, String, Number],
      default: () => ([])
    },
    separator: {
      type: String,
      default: '至'
    },
    showTextSelect: Boolean,
    textValue: {
      type: String,
      default: '至今'
    },
    skip: {
      type: Number,
      default: 0
    },
    single: {
      type: Boolean,
      default: true
    },
    yearLimit: {
      type: Number,
      default: 65
    },
    placeholder: {
      type: String,
      default: '选择年月'
    },
    endPlaceholder: {
      type: String,
      default: '选择年月'
    }
  },
  computed: {
    inputStartTimeValue () {
      if (this.single) {
        return formatData(this.value, this.textValue)
      }
      return formatData(this.value[0], this.textValue)
    },
    inputEndTimeValue () {
      return formatData(this.value[1], this.textValue)
    },
    startTime () {
      if (this.single) {
        return this.value
      }
      return this.value[0]
    },
    endTime () {
      return this.value[1]
    }
  },
  data () {
    return {
      years: [],
      refKeys: {
        startTime: 'start' + Date.now(),
        endTime: 'end' + Date.now()
      },
      startTimePopStatus: false,
      endTimePopStatus: false,
      startTimeValue: {
        now: false,
        year: null,
        month: ''
      },
      endTimeValue: {
        now: false,
        year: null,
        month: ''
      },
      months: [
        { value: '01', label: '1月' },
        { value: '02', label: '2月' },
        { value: '03', label: '3月' },
        { value: '04', label: '4月' },
        { value: '05', label: '5月' },
        { value: '06', label: '6月' },
        { value: '07', label: '7月' },
        { value: '08', label: '8月' },
        { value: '09', label: '9月' },
        { value: '10', label: '10月' },
        { value: '11', label: '11月' },
        { value: '12', label: '12月' }
      ]
    }
  },

  methods: {
    // 选择月份
    handleSelect (type, item) {
      if (this[type + 'Value'].now) return
      if (!this.single && this.validateDate(type, item.value, 'month')) return
      this[type + 'Value'].year = this[type + 'Value'].year || this.years[0]
      this[type + 'Value'].month = item.value
      this[type + 'PopStatus'] = false
      const value = this.getNowYears(type)
      this.$emit('input', value)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', value)
      }
    },
    // 切换年份
    handleChangeYear (type, item) {
      if (!this.single && this.validateDate(type, item, 'year')) return
      if (!item) {
        this[type + 'Value'].now = true
        this[type + 'PopStatus'] = false
      } else {
        this[type + 'Value'].now = false
        this[type + 'Value'].year = item
        // this[type + 'Value'].month = this[type + 'Value'].month || '01'
        this[type + 'Value'].month = type === 'endTime' ? this.startTimeValue.month : '01'
      }
      const value = this.getNowYears(type)
      this.$emit('input', value)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', value)
      }
    },
    // 验证年份月份是否有效
    validateDate (type, item, event) {
      if (!this.startTime) return false
      if (type === 'endTime' && !this.startTimeValue.year) {
        this.startTimeValue = this.compilerTime(this.startTime)
      }
      if (type === 'startTime' && this.endTimeValue.now) return false
      if (type === 'month' && this.endTimeValue.year === this.startTimeValue.year) return false
      let isShowTips = true
      if (type === 'startTime') {
        isShowTips = item > this.endTimeValue[event]
      } else {
        // console.log(item, this.startTimeValue)
        isShowTips = item < this.startTimeValue[event]
      }
      this.$message.closeAll()
      if (isShowTips) this.$message.warning('结束时间不能早于开始时间')
      return isShowTips
    },
    getNowYears (type) {
      if (this.single) {
        return this.startTimeValue.now ? 0 : `${this.startTimeValue.year}-${this.startTimeValue.month}`
      }
      if (type === 'startTime') {
        return [this.startTimeValue.now ? 0 : `${this.startTimeValue.year}-${this.startTimeValue.month}`, this.endTime]
      } else {
        return [this.startTime, this.endTimeValue.now ? 0 : `${this.endTimeValue.year}-${this.endTimeValue.month}`]
      }
    },
    handleShowPopover (type) {
      if (type === 'endTime' && !this.startTime) {
        this.endTimePopStatus = false
        return
      }
      this.getRecentlyYears()
      const results = this.compilerTime(this[type])
      this[type + 'Value'] = results
      this.$nextTick(() => {
        if (!this[type + 'Value'].year) return
        // 年份滚动到可见区域
        const dom = this.$refs[this.refKeys[type]]
        if (dom) {
          let years = this.years[0] - this[type + 'Value'].year
          if (years > 4) {
            dom.scrollTo(0, years * 35)
          }
        }
      })
    },
    compilerTime (str) {
      // eslint-disable-next-line eqeqeq
      if (new Date(str) == 'Invalid Date') {
        return { now: false, year: null, month: '' }
      // eslint-disable-next-line eqeqeq
      } else if (str == 0) {
        return { now: true, year: null, month: '' }
      } else {
        let times = new Date(str)
        let month = times.getMonth() + 1
        return { now: false, year: times.getFullYear(), month: month > 9 ? month : '0' + month }
      }
    },
    // 获取最近100年的
    getRecentlyYears () {
      if (this.years.legnth) return
      const years = new Date().getFullYear()
      const yearsArr = []
      for (let i = 0; i < this.yearLimit; i++) {
        yearsArr.push(years - i - this.skip)
      }
      this.years = yearsArr
    }
  }

}
</script>
<style lang="scss" scoped>
.c-date-picker.c-date-multiple {
  @include flex-v-center;
  .c-picker-separator {
    padding:0 7px;
    font-size: 14px;
    color: $title-color-1;
  }
}
.c-date-picker {
  .el-select, .c-picker-separator {
    display: inline-block;
    vertical-align: middle;
  }
  .el-select {
    min-width: 100px;
    width: 100%;
  }
  .el-input__inner, .el-input:focus {
    outline: none;
  }
}
</style>
<style lang="scss">
.popover-date.el-popper {
  height: 170px;
  padding: 0;
  .popover-date-picker {
    height: 100%;
  }
  .date-years {
    width: 95px;
    max-height: 100%;
    float: left;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 8px 0;
    border-right: 1px solid rgba($border-color-6, .7);
    li {
      text-align: center;
      font-size: 14px;
      padding: 8px 0;
      color: $font-color-5;
      cursor: pointer;
    }
    li.active {
      color: $main-color-1;
      font-weight: bold;
    }
    li:hover {
      background-color: $bg-color-5
    }
  }
  .date-months {
    overflow: hidden;
  }
  .date-months {
    padding-top: 8px;
    div {
      display: inline-block;
      width: 33%;
      text-align: center;
      padding:10px 0;
      cursor: pointer;
    }
    .active {
      font-weight: bold;
    }
    div:hover,.active {
      color: $main-color-1;
    }
  }
}
.popover-date.el-popper .date-months.date-disabled {
  div {
    cursor: not-allowed;
    color: $title-color-3;
  }
  div:hover {
    color: $title-color-3;
  }
}
</style>
