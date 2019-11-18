<template>
  <div class="">
    <wrapper>
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
import { getSignature } from 'API/resume'
import Wrapper from './wrapper'
export default {
  props: {
    resume: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Wrapper
  },
  data () {
    return {
      info: {}
    }
  },
  created () {
    // this.getSignatureList()
  },
  methods: {
    getSignatureList () {
      getSignature().then(({ data }) => {
        this.info = data.data || {}
      })
    }
  }
}
</script>
