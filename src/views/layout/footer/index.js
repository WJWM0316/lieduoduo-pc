import Vue from 'vue'
import Component from 'vue-class-component'
import { mp_qrcode, wx_qrcode, app_qrcode } from 'IMAGES/image'
@Component({
  name: 'page-footer',
  methods: {
    // ...mapActions(['showMsg'])
  }
})
export default class PageFooter extends Vue {
  data () {
    return {
      images: { mp_qrcode, wx_qrcode, app_qrcode }
    }
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
