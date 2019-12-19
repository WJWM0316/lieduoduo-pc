import Vue from 'vue'
import Component from 'vue-class-component'
import recruiter from '@/router/recruiter'

@Component({
  name: 'page-asise',
  methods: {
    // ...mapActions(['showMsg'])
  },
  computed: {
    ...mapGetters([
      'recruiterIntentionList',
      'recruiterInviteList',
      'recruiterScheduleList'
    ])
  }
})
export default class PageAside extends Vue {
  // 侧边栏路由
  routes = []
  // 企业LOGO
  companyLogoUrl = 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg'

  created () {
    this.routes = recruiter
  }
}
