<template>
  <div class="interview-data">
    <template v-if="roleInfos.hasCard">
      <no-found :max-width="300" :tipText="'空空如也~'">
        <el-button type="primary" @click="todoAction('search')" class="jump">发现更多高薪机会</el-button>
      </no-found>
    </template>
    <template v-else>
      <el-button type="primary" @click="todoAction('create')" class="jump">马上创建简历</el-button>
    </template>
  </div>
</template>
<script>
import NoFound from 'COMPONENTS/noFound'
export default {
  components: {
    NoFound
  },
  computed: {
    ...mapGetters([
      'roleInfos'
    ])
  },
  methods: {
    todoAction(mark) {
      switch(mark) {
        case 'search':
          this.$router.push({path: '/position?page=1'})
          break
        case 'create':
          this.$router.push({name: 'createUser'})
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.interview-data{
  .jump{
    margin-top: 20px;
  }
}
</style>

