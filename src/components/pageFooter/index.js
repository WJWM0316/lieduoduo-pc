import Vue from 'vue'
import Component from 'vue-class-component'
import { baseUrl } from '../../../config.js'

@Component({
  name: 'page-footer',
  methods: {
    //...mapActions(['showMsg'])
  }
})
export default class PageFooter extends Vue {

  mouted() {

  }

  shouldFixed() {
    return [
      //'recruiterIndex'
    ].includes(this.$store.state.pageName)
  }


  toUserDeal () {
	  let event = new MouseEvent('click')
	  let a = document.createElement('a')
	  a.target = 'view_window'
  	a.href = `${baseUrl()}/userDeal`
	  a.dispatchEvent(event)
  }
}