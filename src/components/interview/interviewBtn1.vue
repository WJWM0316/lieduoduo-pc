<template>
  <div class="wrap">
    <div class="position">
      <template v-if="infos.isRapidly">
        <el-button>一键约聊</el-button>
      </template>
    </div>
    <loginPop ref="loginPop" v-if="!hasLogin"></loginPop>
  </div>
</template>
<script>
import loginPop from '@/components/common/loginPop'
export default {
  name: 'interviewBtn',
  components: {
    loginPop
  },
  props: {
    infos: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    positionId: {
      type: String,
      default: ''
    }
  },
  computed: mapState({
    hasLogin: state => state.hasLogin
  })
}
</script>
<style lang="scss" scoped>

</style>
