<template>
	<div class="wrap">
		<section class="position" v-if="type === 'position'">
			<template v-if="type === 'position' && (!interviewInfos.haveInterview || interviewInfos.interviewStatus === 51 || interviewInfos.interviewStatus === 54 || interviewInfos.interviewStatus === 52 || interviewInfos.interviewStatus === 55 || interviewInfos.interviewStatus === 58)">

				<template v-if="infos.isOnline === 2 && (infos.status === 0 || infos.status === 1 || infos.status === 3 || infos.status === 4)">
					<button class="clear-style button-box button-box-color4"> 职位已关闭 </button>
				</template>

				<template v-else>
					<template v-if="infos.isRapidly === 1 && !interviewInfos.applied && infos.rapidlyInfo.seatsNum - infos.rapidlyInfo.applyNum - infos.rapidlyInfo.natureApplyNum > 0" >
						<el-button class="clear-style button-box button-box-color1 specailBtn">马上抢</el-button>
					</template>
					<template v-else>
						<el-button class="clear-style button-box button-box-color1">开撩约面</el-button>
					</template>
				</template>
			</template>
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