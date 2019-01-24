<template>
	<div id="login">
		<img class="logo" src="../../assets/images/logo_white.png" />
	  <p class="title_p">面试多,机会多</p>
	  <div class="login_cont">
	  	<h3>扫码登录</h3>
	  	<div class="cont_p">使用猎多多小程序扫码登录<a href="">扫码帮助</a></div>
	  	<img class="loginCode" :src="codeData.image" />
	  	<div>没有账号，立即注册</div>


  		<div class="help_cont">
  			<h3>扫码帮助</h3>
  	    <el-button class="addJob" size="small" type="primary" >求职者</el-button>
  	    <el-button class="addJob" size="small" type="primary" >招聘者</el-button>

  			<img class="pic_1" src="" />
  		</div>
	  </div>
  	<div class="login_btn" @click="login">模拟登陆</div>

  	
	</div>
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { loginApi, waitApi, getQrCodeApi } from '../../api/auth'
	@Component({
	  name: 'lighthouse-list',
	  methods: {
	  },
	  computed: {},
	  watch: {
	    '$route': {
	      handler() {
	        this.init()
	      },
	      immediate: true
	    }
	  },
	  components: {}
	})
	export default class CourseList extends Vue {
		codeImageUrl = ''
		codeData = {}  // 二维码信息
		userInfo = {}
	  /**
	   * 初始化表单、分页页面数据
	   */
	   // recruiterIndex applyIndex
	  login () {
	  	let data = {
	  		email: 18802090814,
	  		password: 123456
	  	}

	  	this.$store.dispatch('loginApi', data).
	  	then(res=>{
  	  	this.$store.dispatch('setUserInfo', res.data.data);
        this.userInfo = this.$store.state.userInfo
				this.$router.push({name: 'recruiterIndex'})
	  	})
	  	.catch(error => {
	  	  setTimeout(() => {
		  	  console.log(`${error.msg}~`);
	  		})
	  	})
	  }

	  init () {
	  	// this.login()
	  	getQrCodeApi().then(res=>{
	  		console.log(res)
	  		res.data.data.image = `data:image/png;base64,${res.data.data.image}`
	  		this.codeData = res.data.data
	  	})
	  }

	  todoAction(type, id) {
	    if(!id){
	      return
	    }
	    switch(type) {
	      case 'detail':
	        this.$router.push(
	          { name: 'teacherDetail',
	            query: {
	              id: id
	            }
	          }
	        )
	        break
	      default:
	        break
	    }
	  }
	  //ajax 请求函数，
	  ajax_request(){
		  i++;
		  //如果已经请求20此没有请求成功，则强制结束，给出提示信息，因为每3s调用一次，供调用20次，大概就是一分钟的时间
		  if(i > 20){
		  	$('.login_info1').html('<span style="color:red;">登录超时，如需登录请刷新页面~</span>')
		  	clearInterval(timer);
		  	return 
		  }
		  $.ajax({
			  type: "post",
			  url: "{:U('User/login_qrcode')}",
			  timeout : 3000,
			  data: { "scene_id": $('#scene_id').val() },
			  success: function (msg){ 
				  if(1 == msg.status){
					  $('.login_info1').html('<span style="color:#0C9;">'+msg.info+'</span>');
					  setTimeout(refresh, 3000);
					  return ;
				  }
			  },
			  error: function(){
			  }
		  });
	  }
	}
</script>
<style lang="less">
#login {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: #652791;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.title_p {
		font-size:24px;
		font-family:PingFang-SC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:33px;
		margin: 14px 0 66px 0;
	}
	.login_cont {
		width:560px;
		height:420px;
		background:rgba(255,255,255,1);
		box-shadow:0px 8px 12px 0px rgba(40,40,40,0.2);
		border-radius:4px;
		position: relative;
		.help_cont {
			display: none;
			position: absolute;
			width:310px;
			height:420px;
			right: -330px;
			background: #fff;
			border-radius:4px;
			top: 0;
			h3 {
				font-size:20px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(40,40,40,1);
				line-height:26px;
				margin: 22px 0 24px 0;
			}
			.pic_1  {
				width: 261px;
				height: 232px;
			}
		}
		h3 {
			font-size:30px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(40,40,40,1);
			line-height:38px;
			margin-top: 36px;

		}
		.cont_p {
			font-size:14px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(98,98,98,1);
			line-height:22px;
			margin: 40px 0 16px 0;
			a {
				color:rgba(101,39,145,1);
				margin-left: 8px;
			}
		}
		.loginCode {
			display: block;
			width: 180px;
			height: 180px;
			margin: 0 auto;
			margin-bottom: 60px;
		}
	}
	.login_btn {
		width: 200px;
		height: 40px;
		line-height: 40px;
		border: 1px solid #ccc;
		margin: 0 auto;
		background: #fff;
		margin-top: 30px;
	}
}
#auth {
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgb(20, 26, 72);
	}
	.login-box {
		width: 400px;
		height: 200px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		background: white;
		position: fixed;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 20px;
	}
}
</style>