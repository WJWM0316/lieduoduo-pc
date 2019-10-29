<template>
	<div class="wrap" v-if="infos.vkey && hasStatus">
		<!-- 求职者还没有发起开撩动作 职位详情 start-->
		<section class="position" v-if="type === 'position'">
			<template v-if="type === 'position' && (!interviewInfos.haveInterview || interviewInfos.interviewStatus === 51 || interviewInfos.interviewStatus === 54 || interviewInfos.interviewStatus === 52 || interviewInfos.interviewStatus === 55 || interviewInfos.interviewStatus === 58)">
				<template v-if="infos.isOnline === 2 && (infos.status === 0 || infos.status === 1 || infos.status === 3 || infos.status === 4)">
					<el-button class="forbid"> 职位已关闭 </el-button>
				</template>

				<template v-else>
					<el-button @click="todoAction('job-hunting-chat')" class="canView specailBtn" v-if="infos.isRapidly === 1 && !interviewInfos.applied && infos.rapidlyInfo.seatsNum - infos.rapidlyInfo.applyNum - infos.rapidlyInfo.natureApplyNum > 0" >马上抢</el-button>
					<el-button @click="todoAction('job-hunting-chat')" class="canView" v-else>开撩约面</el-button>
				</template>
			</template>
			<!-- 求职者还没有发起开撩动作 职位详情 start-->


			<!-- 求职者已经发起开撩动作 start-->
			<template v-else-if="interviewInfos.interviewStatus === 11">
				<el-button class="forbid">
					<template v-if="interviewInfos.interviewType === 2 && !interviewInfos.serviceEndTimeDesc">面试官将于24h内反馈</template>
					<template v-else-if="interviewInfos.interviewType === 2 && interviewInfos.serviceEndTimeDesc">面试官最迟将于{{interviewInfos.serviceEndTimeDesc}}反馈</template>
					<template v-else>已申请面试</template>
				</el-button>
			</template>
			<!-- 求职者已经发起开撩动作 end-->

			<!-- 求职者等待招聘官安排面试 start-->
			<template v-else-if="interviewInfos.interviewStatus === 21 || interviewInfos.interviewStatus === 32 ">
				<el-button class="forbid" @click="todoAction('job-hunting-applyed')">待安排面试</el-button>
			</template>
			<!-- 求职者等待招聘官安排面试 end-->
		
			<!-- 求职者等待招聘管修改信息 start-->
			<template v-else-if="interviewInfos.interviewStatus === 41 || interviewInfos.interviewStatus === 31">
				<el-button class="scheduling specailBtn" @click="todoAction('job-hunting-view-detail')">查看面试详情</el-button>
			</template>
			<!-- 求职者等待招聘管修改信息 end-->

			<!-- 求职者被设置成不合适 start-->
			<template v-else-if="interviewInfos.interviewStatus === 52 || interviewInfos.interviewStatus === 53">
				<div class="button-box button-box-color3">不合适</div>
			</template>
			<!-- 求职者被设置成不合适 end-->
			
			<!-- 求职者已经已收到招聘官的邀请 start-->
			<template v-else-if="interviewInfos.interviewStatus === 12">
				<div class="button-box">
					<el-button class="reject" @click="todoAction('job-hunting-reject')">暂不考虑</el-button>
					<el-button class="accept" @click="todoAction('job-hunting-accept')">接受约面</el-button>
				</div>
			</template>
			<!-- 求职者已经已收到招聘官的邀请 end-->
		</section>

		<loginPop ref="loginPop" v-if="!hasLogin"></loginPop>

		<div class="qrCodePop" v-show="showSharePop">
			<div class="inner">
				<p class="title">微信扫一扫<br>查看面试详情</p>
				<img class="qrcode" :src="qrCodeUrl" alt="">
				<i class="close iconfont icon-close" @click="hideSharePop"></i>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import loginPop from '@/components/common/loginPop'
import {getQrcodeApi} from '@/api/common'
import {getInterviewStatusApi, applyInterviewApi, confirmInterviewApi, refuseInterviewApi} from '@/api/interview.js'
@Component({
  name: 'interviewBtn',
  components: {
    loginPop
  },
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
  computed: mapState({
    hasLogin: state => state.hasLogin
  }),
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
  qrCodeUrl = '' // 二维码
  hasStatus = false
  showSharePop = false
  getInterviewStatus () {
  	getInterviewStatusApi({type: this.type, vkey: this.infos.vkey}).then(res => {
			this.interviewInfos = res.data.data
			this.hasStatus = true
		})
  }
  getQrcode () {
  	this.showSharePop = !this.showSharePop
  	if (this.qrCodeUrl) return
  	getQrcodeApi({type: 'user_interview_detail', itemId: this.interviewInfos.data[0].interviewId}).then(res => {
  		this.qrCodeUrl = res.data.data.positionQrCodeUrl
  	})
  }
  // 求职者确认约面
  confirmInterview () {
  	confirmInterviewApi({id: this.interviewInfos.data[0].interviewId}).then(res => {
      this.getInterviewStatus()
  		this.$message({
        message: '已接受约面',
        type: 'success'
      });
    })
  }
  hideSharePop () {
  	this.showSharePop = !this.showSharePop
  }
  // 求职者开撩
  jobHunterChat () {
  	let isSpecail = this.infos.isRapidly === 1 
	                  && !this.interviewInfos.applied
	                  && this.infos.rapidlyInfo.applyNum + this.infos.rapidlyInfo.natureApplyNum < this.infos.rapidlyInfo.seatsNum
  	let parmas = {recruiterUid: this.infos.recruiterInfo.uid, positionId: this.infos.id}
  	if (isSpecail) parmas.interview_type = 2
  	applyInterviewApi(parmas).then(res => {
  		this.getInterviewStatus()
  		this.$message({
        message: '开撩成功！',
        type: 'success'
      });
  	})
  }
  // 求职标记不合适
  jobRejectChat () {
  	refuseInterviewApi({id: this.infos.recruiterInfo.uid}).then(res => {
  		this.getInterviewStatus()
  		this.$message({
        message: '已标记暂不考虑',
        type: 'success'
      });
  	})
  }
  todoAction (type) {
  	if (!this.hasLogin) {
  		this.$refs.loginPop.showLoginPop = true
  		return
  	}
  	switch (type) {
  		case 'job-hunting-reject':
  			this.jobRejectChat()
  			break
  		case 'job-hunting-chat':
  			this.jobHunterChat()
  			break
  		case 'job-hunting-accept':
  			this.confirmInterview()
  			break
  		case 'job-hunting-view-detail':
  			this.getQrcode()
  			break
  	}
  }
	created () {
		
	}
}
</script>
<style lang="scss" scoped>
.wrap {
	.forbid, .canView, .scheduling, .button-box {
		width:298px;
		height:36px;
		background:$btn-forbid;
		border-radius:4px;
		font-size:14px;
		font-weight:400;
		color:#A29CA6;
		border: none;
		cursor: pointer;
		&.button-box {
			border-radius: 16px;
			overflow: hidden;
			.reject {
				width: 50%;
				height: 100%;
				background: $bg-color-5;
				color: $main-color-1;
				border: none;
				cursor: pointer;
				margin: 0;
			}
			.accept {
				width: 50%;
				height: 100%;
				background: $main-color-1;
				color: #fff;
				border: none;
				cursor: pointer;
				margin: 0;
			}
		}
		
		&.canView {
			background: $main-color-1;
			color: #fff;
		}
		&.scheduling.specailBtn {
			background: $main-color-2;
			color: #fff;
		}
		&.canView.specailBtn {
			background: $sub-color-1;
			color: $main-color-1;
		}
	}
	.qrCodePop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		background:rgba(0,0,0,0.5);
		.inner {
			width:300px;
			padding: 38px 0 62px;
			background:#fff;
			box-shadow:0px -2px 4px 0px rgba(101,39,145,0.1),0px 2px 4px 0px rgba(132,82,167,0.1);
			border-radius:4px;
			text-align: center;
			position: relative;
			.title {
				font-size:20px;
				font-weight:500;
				color:$font-color-2;
				line-height:29px;
			}
			.qrcode {
				width: 124px;
				height: 124px;
				margin: 50px auto 0;
				border-radius:70px;
				padding: 8px;
				border:1px solid rgba(239,233,244,1);
			}
			.close {
				font-size: 12px;
				color: #BCBCBC;
				padding: 16px;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
}
</style>