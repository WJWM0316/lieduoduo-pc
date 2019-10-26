<template>
	<div class="wrap">
		<section class="position" v-if="type === 'position'">
			
		</section>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import {getInterviewStatusApi} from '@/api/interview.js'
@Component({
  name: 'interviewBtn',
  props: {
  	infos: {
      type: Object,
      default: {}
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
  watch: {
  	infos () {
  		this.getInterviewStatus()
  	}
  }
})
export default class InterviewBtn extends Component {
	interviewInfos = {
    haveInterview: 0
  }
  getInterviewStatus () {
  	getInterviewStatusApi({type: this.type, vkey: this.infos.vkey}).then(res => {
			this.interviewInfos = res.data.data
		})
  }
	created () {
		
	}
}
</script>
<style lang="scss" scoped>
.wrap {
	
}
</style>