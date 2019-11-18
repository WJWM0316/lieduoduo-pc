<template>
  <!-- 求职意向 -->
  <div>
    <wrapper :is-delete="true" :list="list">
      <template slot="header">求职意向</template>
      <template v-slot:content="{row}">
        <p class="proposal-item" v-if="row">
          <span>{{row.position}}</span>
          <span>|</span>
          <span>{{row.city}}</span>
          <span>|</span>
          <span>{{row.fields.map(val=>val.field).join(' ')}}</span>
          <span class="salary">{{row.salaryFloor}}-{{row.salaryCeil}}K</span>
        </p>
      </template>
      <template slot="bottom">
        <div class="c-btn resume-add-btn"><i class="el-icon-plus" /> 添加求职意向</div>
      </template>
    </wrapper>

  </div>
</template>
<script>
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
  computed: {
    list () {
      const { expects } = this.resume
      return JSON.parse(JSON.stringify(expects || []))
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.proposal-item {
  span {
    font-size: 14px;
    color: $title-color-2;
  }
  span + span {
    padding-left: 6px;
  }
  span.salary {
    padding-left: 15px;
    color: $error-color-1;
  }
}
</style>
