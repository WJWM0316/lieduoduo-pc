<template>
  <!-- 请选择期望职位 -->
  <div class="salary-wrapper">
    <el-select v-model="floor" placeholder="期望薪资" @change="changeEmolumentMin">
      <template v-for="item in salaryFloors">
        <el-option :value="item.value" :key="item.value" :label="item.label" />
      </template>
    </el-select>
    <span class="separator">{{separator}}</span>
    <el-select v-model="ceil" placeholder="期望薪资" :disabled="!salaryCeils.length" @change="handleSelect">
      <template v-for="item in salaryCeils">
        <el-option :value="item.value" :key="item.value" :label="item.label" />
      </template>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    separator: {
      type: String,
      default: '至'
    }
  },
  data () {
    return {
      salaryCeils: [],
      salaryFloors: [],
      ceil: null,
      floor: null
    }
  },
  methods: {
    // 执行数据初始化
    handleInit (floor = null, ceil = null) {
      this.setEmolumentMin()
      if (floor) this.changeEmolumentMin(floor)
      this.$nextTick(() => {
        this.ceil = ceil
        this.floor = floor
      })
    },
    changeEmolumentMin (e) {
      this.ceil = null
      this.setEmolumentMax(e)
    },
    setEmolumentMax (num) {
      let max = 0
      let list = []
      if (num <= 10) {
        max = num + 5
      } else if (num > 10 && num < 31) {
        max = num * 2
      } else if (num > 34 && num < 71) {
        max = num + 30
      } else if (num > 74 && num < 96) {
        max = num + 30
      } else if (num > 99 && num < 251) {
        max = num * 2
      }
      for (let i = num + 1; i <= max; i++) {
        list.push({ value: i, label: i + 'k' })
      }
      this.salaryCeils = list
    },
    setEmolumentMin () {
      let max = 250
      let i = 0
      let list = []
      while (i < max) {
        if (i < 30) {
          i++
        } else if (i < 100) {
          i += 5
        } else if (i < max) {
          i += 10
        }
        list.push({ value: i, label: i + 'k' })
      }
      this.salaryFloors = list
    },
    // 选择薪资
    handleSelect () {
      this.$emit('input', `${this.floor}-${this.ceil}`)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.blur', `${this.floor}-${this.ceil}`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.salary-wrapper {
  .el-select {
    width: 148px !important;
  }
  .separator {
    padding: 0 5px;
  }
}
</style>
