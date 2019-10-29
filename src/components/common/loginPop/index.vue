<template>
	<div class="loginPop" v-show="showLoginPop">
		<div class="bg"></div>
		<div class="loginBox">
      <login-form ref="login-form" loginType="msgLogin" :toggleType="false"></login-form>
    	<i class="close iconfont icon-close" @click="close"></i>
    </div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import loginForm from '@/components/common/login'
@Component({
  name: 'login',
  components: {
    loginForm
  }
})
export default class login extends Vue {
	showLoginPop = false
	close () {
		this.showLoginPop = false
	}
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
	.loginPop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 1;
		}
		.loginBox {
			position: absolute;
			transform: translate3d(-50%, -50%, 0);
			top: 50%;
			left: 50%;
			z-index: 2;
			.close {
    		font-size: 12px;
	    	position: absolute;
	    	top: 0;
	    	right: 0;
	    	color: #BCBCBC;
	    	padding: 16px;
	    	cursor: pointer;
	    }
		}
	}
</style>