<template>
  <div class="interview-data">
    <template v-if="roleInfos.isJobhunter">
      <no-found :max-width="234" :tipText="'空空如也~'">
        <el-button type="primary" @click="todoAction('search')" class="jump">发现更多高薪机会</el-button>
      </no-found>
    </template>
    <template v-else>
      <div class="tips-fill-resume"><img src="~IMAGES/unresume.png" alt="" class="un-fill-resume"></div>
      <div><el-button type="primary" @click="todoAction('create')" class="jump">马上创建简历</el-button></div>
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
  text-align: center;
  .jump{
    margin-top: 20px;
    width: 156px;
    height: 40px;
    border-radius: 4px;
  }
  .tips-fill-resume{
    margin-top: 137px;
    text-align: center;
    img{
      width: 234px;
    }
  }
}
</style>

