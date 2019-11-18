<template>
  <!-- 按钮组 -->
  <div class="c-button-group-radio">
    <template v-for="item in datas">
      <div
        class="c-button-radio"
        :class="{active: item.value === value}"
        :key="item.value"
        @click="handleCheck(item)">{{item.label}}</div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    datas: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    handleCheck (item) {
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', item.value)
      }
      this.$emit('input', item.value)
    }
  }
}
</script>
