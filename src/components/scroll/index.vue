<template>
<div>
  <div class="loading" v-if="isloading">
    <img src="@/assets/loading.gif" alt="">
  </div>
  <div class="loading" v-else>没有更多数据了~</div>
</div>
</template>
<script>

export default {
  props: {
    value: [String, Array, Number],
    label: String,
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择期望职位'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  directives: {
    scroll: {
      bind: function (el, binding) {
        window.addEventListener('scroll', () => {
          if (document.body.scrollTop + window.innerHeight >= el.clientHeight) {
            console.log('load data')
          }
        })
      }
    }
  },
  destroyed () {
  }
}
</script>
<style lang="scss" scoped>
</style>
