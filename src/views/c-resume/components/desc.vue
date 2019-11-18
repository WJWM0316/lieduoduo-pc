<template>
  <div class="">
    <wrapper :is-empty="isEmpty">
      <template slot="header">自我描述</template>
      <template slot="content">
        <div v-if="resume.signature">
          <div>{{resume.signature}}</div>
          <div class=""></div>
        </div>
        <div class="c-btn"><i class="el-icon-plus" /> 添加自我描述</div>
      </template>
    </wrapper>
  </div>
</template>
<script>
import Wrapper from './wrapper'
// import setResumeDesc from 'API/resume'
export default {
  props: {
    resume: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    info () {
      const { signature, personalizedLabels } = this.resume
      return {
        signature, personalizedLabels
      }
    },
    isEmpty () {
      return !!this.resume.signature
    }
  },
  components: {
    Wrapper
  },
  methods: {
  }
}
</script>
