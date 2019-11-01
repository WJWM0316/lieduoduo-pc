<template>
 <div class="wrap">
 	<my-header :userInfo="userInfo"></my-header>
 	<div class="resumePost">
 		<div class="middle">
 			<div class="contain">
	      <h3 class="title"><span>3分钟</span>创建微简历，<span>1000+名企</span>高薪职位任你选</h3>
	      <img class="slogon-box" v-if="step === 1" :src="cdnPath + 'img_sentence_01@2x.png'"/>
				<img class="slogon-box" v-if="step === 2" :src="cdnPath + 'img_sentence_02@2x.png'"/>
				<img class="slogon-box" v-if="step === 3" :src="cdnPath + 'img_sentence_03@2x.png'"/>
				<img class="slogon-box" v-if="step === 4" :src="cdnPath + 'img_sentence_04@2x.png'"/>
	      <first-step  v-show="step === 1"></first-step>
	      <second-step v-show="step === 2"></second-step>
	      <third-step v-show="step === 3"></third-step>
	      <fourth-step v-show="step === 4"></fourth-step>
	    </div>
 		</div>
 	</div>
 </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import myHeader from './components/header.vue'
import firstStep from './components/firstStep.vue'
import secondStep from './components/secondStep.vue'
import thirdStep from './components/thirdStep.vue'
import fourthStep from './components/fourthStep.vue'

import { searchResumeStepApi } from '@/api/putIn'


@Component({
  name: 'createUser',
  components: {
    myHeader,
    firstStep,
    secondStep,
    thirdStep,
    fourthStep
  },
  computed: {
  	...mapState({
  		userInfo: state => state.userInfo
  	})
  }
})
export default class createUser extends Vue {
	cdnPath = `${this.$cdnPath}/images/`
	step = 1 // 创建步数
	created () {
		this.getStep()
	}
	getStep () {
		searchResumeStepApi().then(res => {
			let stepData = res.data.data
			this.$store.dispatch('setUserInfo', stepData)
		})
	}
}

</script>
<style lang="scss" scoped>
.wrap {
	width: 100%;
	.resumePost {
		padding: 64px 0 100px 0;
	  height: 100vh;
	  min-height: 900px;
	  box-sizing: border-box;
	  background: url(#{$image-cdn-url}/images/bg_createjl.png) 100% repeat #652791;
	  .defalut-position{
	    position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	    right: 25px;
	    color: #CDCBCF;
	    transition: all ease .3s;
	    z-index: 222
	  }
	  .icon_active{
	    transform: translateY(-50%) rotate(180deg);
	  }
	  .middle {
	    position: relative;
	    background-repeat: no-repeat;
	    background-position: bottom;
	    text-align: center;
	    width: 100%;
	    background-size: auto 112px;
	    .formHint {
	      height:60px;
	      background:rgba(255,244,244,1);
	      border-radius:4px;
	      padding: 0 27px;
	      position: absolute;
	      left: 50%;
	      top: 0px;
	      transform: translate(-50%,0);
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      font-size:14px;
	      font-family:PingFangSC;
	      font-weight:400;
	      color:rgba(237,92,92,1);
	      white-space:nowrap;
	      z-index: 100;
	      &.two {
	        height:34px;
	      }
	      img {
	        width: 14px;
	        height: 14px;
	        margin-right: 8px;
	        display: block;
	      }
	    }
	  }
	  .title {
	    font-size:22px;
	    font-family:PingFangSC;
	    font-weight:700;
	    color:#fff;
	    line-height:32px;
	    padding-top: 48px;
	    span {
	      color:#FFDC29;
	    }
	  }
	  .slogon-box{
	    width:450px;
	    height:auto;
	    margin: 38px auto 60px;
	  }
	}
}

</style>