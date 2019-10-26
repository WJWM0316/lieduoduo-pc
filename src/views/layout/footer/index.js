import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'page-footer',
  methods: {
    // ...mapActions(['showMsg'])
  }
})
export default class PageFooter extends Vue {
  mouted () {

  }

  shouldFixed () {
    return [
      // 'recruiterIndex'
    ].includes(this.$store.state.pageName)
  }

  toUserDeal () {
    let urlData = this.$router.resolve({
      name: 'issueRule'
    })
    window.open(urlData.href, '_blank')
  }
}
