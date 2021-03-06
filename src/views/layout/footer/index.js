import Vue from 'vue'
import Component from 'vue-class-component'
import { mp_qrcode, wx_qrcode, app_qrcode } from 'IMAGES/image'
@Component({
  name: 'page-footer',
  computed: {
    miniFooter () {
      return ['putIn'].includes(this.$route.name)
    }
  },
  methods: {
    // ...mapActions(['showMsg'])
  }
})
export default class PageFooter extends Vue {
  data () {
    return {
      images: { mp_qrcode, wx_qrcode, app_qrcode },
      cdnPath: `${this.$cdnPath}/images/`
    }
  }
}
