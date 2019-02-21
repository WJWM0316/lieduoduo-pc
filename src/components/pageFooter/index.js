import Vue from 'vue'
import Component from 'vue-class-component'
/*import { routes } from '@/router/routes'*/

@Component({
  name: 'page-footer',
  methods: {
    //...mapActions(['showMsg'])
  }
})
export default class PageFooter extends Vue {

  toUserDeal () {
    this.$router.push({
      name: 'userDeal'
    })
  }
}