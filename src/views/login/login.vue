<template>
	<div id="login">
		<img class="logo" src="../../assets/images/logo_white.png" />
	  <p class="title_p">社交求职招聘神器</p>
	  <div class="login_cont">
	  	<div class="login" v-if="status==='login'">
	  		<h3 class="cont_tit">登录</h3>
	  		<div class="cont_p">使用「猎多多小程序」扫码登录</div>
	  		<div class="login_pic_warp">
	  			<img class="loginCode"  v-bind:src="codeData.image" />
	  			<div class="pastDue" v-if="isPast">
	  				<p>二维码已过期</p>
	  				<div class="pastBtn" @click="refreshCode">点击刷新</div>
	  			</div>
	  		</div>
	  		<div class="bottom_text">没有账号 <span @click="changeStatus">免费注册</span></div>
	  	</div>
	  	
	  	<div class="sign" v-if="status==='register'">
	  		<h3 class="cont_tit">免费注册</h3>
	  		<div class="cont_p">使用「微信」扫一扫下方小程序码</div>
	  		<img class="signPic"  src="../../assets/images/xcx.png" />
	  		<div class="bottom_text">已有账号 <span @click="changeStatus">立即登录</span></div>
	  	</div>

  		<div class="help_cont" v-if="status==='login'">
  			<h3 >扫码帮助</h3>
  			<ul>
  				<li class="juli">
  					<div>
  						<span class="strong">1.</span>
  						<span class="default">微信扫一扫下方小程序码，打开「猎多多」</span>
  					</div>
  					<img class="pic_1" src="../../assets/images/inf_qrcode@2x.png" />
  				</li>
  				<li>
  					<div>
  						<span class="strong">2.</span>
  						<span class="default">进入“我的”页面，点击左上角扫码按钮， 扫描左侧二维码</span>
  					</div>
  					<img class="pic_2" src="../../assets/images/inf_login@2x.png" />
  				</li>
  			</ul>
  		</div>
	  </div>
	  <div class="overlayout" v-if="showError">
	  	<div class="box">
	  		<i class="el-icon-close" @click="closeMask"></i>
	  		<div class="header">
	  			<i class="el-icon-warning"></i>
	  			登录失败
	  		</div>
	  		<ul>
	  			<li class="h10">可能是由于以下原因导致：</li>
	  			<li>
	  				1、未注册猎多多小程序；
	  			</li>
	  			<li>
	  				2、招聘官身份尚未审核通过；
	  			</li>
	  			<li>
	  				3、招聘官身份尚未加入该公司；
	  			</li>
	  			<li>
	  				4、招聘官身份所属公司尚未通过审核。
	  			</li>
	  		</ul>
	  		<div class="code-tips">
	  			<img class="pic_3" src="../../assets/images/inf_qrcode@2x.png" />
	  			<div class="text10">
	  				使用「微信」扫描小程序码， <br/>进入猎多多小程序解决以上问题
	  			</div>
	  		</div>
	  		<div class="login-next"><span>重新登录>></span></div>
	  	</div>
	  </div>
  	<!-- <div class="login_btn" @click="login">模拟登陆</div> -->
	</div>
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { loginApi, scanApi, getQrCodeApi } from '../../api/auth'
	import { getUserIdentity, switchId } from '../../../config.js'
	import { changeBaseURL } from '../../api/index'

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
		codeData = {}  // 二维码信息
		userInfo = {}
		pop = {
      isShow: true,
      type: 'help'
    }
    status = 'login' 
    identitystatus = "qiuzhi"  // 引导图 状态
    isPast = true
    timer = null 
    num = 1
    identity = '' //身份
    showError = false
	  /**
	   * 初始化表单、分页页面数据
	   */

	  mounted () {
	  	let query = this.$route.query
	  	//百度统计
  		let _hmt = _hmt || [];
  		(function() {
  		  var hm = document.createElement("script");
  		  hm.src = "https://hm.baidu.com/hm.js?f7fe68c0039c09911deef47214587f2f";
  		  var s = document.getElementsByTagName("script")[0]; 
  		  s.parentNode.insertBefore(hm, s);
  		})();
  		if(!query.type) {
  			this.status = 'login'
  		} else  {
  			this.status = query.type
  		}
		}

		closeMask() {
			this.showError = !this.showError
		}

	  login () {
	  	let data = {
	  		email: '302982210@qq.com',
	  		password: 123456
	  	}

	  	this.$store.dispatch('testLogin', data).
	  	then(res=>{
  	  	this.$store.dispatch('setUserInfo', res.data.data);
        this.userInfo = this.$store.state.userInfo
				this.$router.push({name: this.userInfo.isBusiness === 1 ? 'candidate' : 'applyIndex'})
	  	})
	  	.catch(error => {
	  	  setTimeout(() => {
		  	  //console.log(`${error.msg}~`);
	  		})
	  	})
	  }

	  init () {
	  	this.getCode()
	  }

	  getCode () {
	  	let that = this
	  	getQrCodeApi().then(res=>{
	  		//console.log('==>',res)
	  		this.codeData = res.data.data
	  		this.isPast = false
	  		clearInterval(this.timer)
	  		this.timer = setInterval(()=>{
	  			this.num += 1
	  			if(this.num > 40){
	  				this.num = 1
				  	clearInterval(this.timer);
			  		this.isPast = true
				  }else {
	  				this.scan()
				  }
	  		}, 3000);
	  	})
	  }

	  scan () {
	  	scanApi({
	  		uuid: this.codeData.uuid
	  	}).then(res=>{
	  		//isBusiness==1 b
	  		//console.log('==>',res.data) 
	  		if (res.data.data && res.data.data.id) {
  				clearInterval(this.timer)
	  			this.identity = res.data.data.isBusiness === 1 ? 'zhaopin' : 'qiuzhi'
					switchId(this.identity)
					changeBaseURL()
					this.isPast = false

					this.$store.dispatch('setUserIdentity', this.identity)
	  	  	this.$store.dispatch('setUserInfo', res.data.data)
	  	  	this.$store.dispatch('login', res.data.data)

	        this.userInfo = this.$store.state.userInfo
					this.$router.push({name: this.identity === 'qiuzhi' ? 'applyIndex' : 'candidate' })
	  		}
	  	})
	  }

	  refreshCode () {
	  	this.getCode()
	  }

	  clickHelp () {
	  	this.pop.isShow = !this.pop.isShow
	  }

	  changeStatus () {
	  	this.status = this.status === 'login'? 'register':'login'
	  	// this.pop.isShow = !this.pop.isShow
	  }

	  identitySelect (status) {
	  	this.identitystatus = status
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
		  	clearInterval(timer);
	  		this.isPast = true
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
	padding: 0;
	position: fixed;
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
	background: url(../../assets/images/bg.png) 100% repeat #652791;
	.overlayout {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
		background: rgba(0,0,0,.3);
		.box {
			width:432px;
			height:384px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
			border-radius:4px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			box-sizing: border-box;
			padding: 32px 32px 32px 70px;
		}
		.el-icon-close {
			position: absolute;
			top: 16px;
			right: 16px;
			cursor: pointer;
		}
		.header {
			text-align: left;
			height:24px;
			font-size:16px;
			font-weight:500;
			color:rgba(53,64,72,1);
			line-height:24px;
			position: relative;
		}
		.el-icon-warning {
			color: #FF7F4C;
			position: absolute;
			left: -24px;
			top: 50%;
			transform: translateY(-50%);
		}
		ul {
			text-align: left;
			line-height: 1.5;
		}
		li {
			color: #5C565D;
		}
		.h10 {
			height:24px;
			font-size:14px;
			font-weight:400;
			color:rgba(92,86,93,1);
			line-height:24px;
			margin-bottom: 8px;
			margin-top: 16px;
		}
		.text10 {
			flex: 1;
			text-align: left;
			font-size:14px;
			font-weight:400;
			color:rgba(92,86,93,1);
			line-height:22px;
		}
		.code-tips {
			display: flex;
		  justify-content: center;
		  align-items: center;
		  margin-top: 18px;
		}
		.pic_3{
			width: 96px;
			height: 96px;
			margin-right: 16px;
		}
		.login-next {
			height:22px;
			font-size:14px;
			font-weight:400;
			color:rgba(101,39,145,1);
			line-height:22px;
			text-align: left;
			margin-top: 24px;
			span{
				cursor: pointer;
			}
		}
	}
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
		height:460px;
		background:rgba(255,255,255,1);
		box-shadow:0px 8px 12px 0px rgba(40,40,40,0.2);
		border-radius:4px;
		position: relative;
		.help_cont {
			position: absolute;
			width:320px;
			height:460px;
			right: -330px;
			background: #fff;
			border-radius:4px;
			box-sizing: border-box;
			padding: 0 30px;
			top: 0;
			p {
				font-size:12px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(92,86,93,1);
				line-height:20px;
				margin: 24px 0 14px 0;
			}
			.identitySelect {
				width:158px;
				height:34px;
				border-radius:17px;
				border:1px solid rgba(239,233,244,1);
				margin: 24px auto 0px auto;
				display: flex;
				flex-direction: row;
				justify-content: center;
				.addJob {
					width:84px;
					height:34px;
					border-radius:17px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(101,39,145,1);
					line-height:34px;
					box-sizing: border-box;
					&.select {
						background:rgba(239,233,244,1);
					}
				}
			}
			h3 {
				font-size:20px;
				font-weight:500;
				color:rgba(40,40,40,1);
				line-height:1.1;
				margin-top: 38px;
				margin-bottom: 26px;
			}
			.juli {
				padding-bottom: 22px;
			}
			.hint_help {

				font-size:12px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(92,86,93,1);
				line-height:20px;

			}
			.pic_1  {
				width: 120px;
				margin-top: 14px;
			}
			.pic_2  {
				width: 193px;
				padding-top: 15px;
			}
			.strong {
				font-size: 24px;
		    color: #652791;
		    display: inline-block;
		    width: 20px;
		    vertical-align: middle;
		    margin-right: 10px;
		    font-weight: 700;
			}
			.default{
				font-size:12px;
				font-weight:300;
				color:rgba(40,40,40,1);
				line-height:18px;
				display: inline-block;
				text-align: left;
				max-width: 228px;
				vertical-align: middle;
			}
			.row{
				line-height:1;
			}
		}
		.cont_tit {
			font-size:30px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(40,40,40,1);
			line-height:38px;
			margin-top: 50px;

		}
		.cont_p {
			font-size:14px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(98,98,98,1);
			line-height:22px;
			margin: 40px 0 16px 0;
			display: flex;
			justify-content: center;
			flex-direction: row;
			.help {
				color:rgba(101,39,145,1);
				margin-left: 8px;
				cursor: pointer;
				
			}
			.ques {
				width:14px;
				height:14px;
				line-height: 14px;
				background:rgba(101,39,145,1);
				color: #fff;
				margin-left: 6px;
				border-radius: 50%;
				display: block;
				//float: right;
				margin-top: 4px;
			}
		}
		.login_pic_warp {
			width: 180px;
			height: 180px;
			margin: 0 auto;
			margin-bottom: 42px;
			position: relative;
			.loginCode {
				display: block;
				width: 180px;
				height: 180px;
			}
			.pastDue {
				width: 180px;
				height: 180px;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 10;
				background: rgba(255, 255, 255, 0.8);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				p {
					font-size:16px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(101,39,145,1);
					margin-bottom: 16px;
				}
				.pastBtn {
					width:98px;
					height:38px;
					background:rgba(101,39,145,1);
					border-radius:19px;

					font-size:14px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(255,255,255,1);
					line-height: 38px;
					text-align: center;
				}
			}
		}
		
		.signPic {
			display: block;
			width:180px;
			height:180px;
			margin: 0 auto;
			margin-bottom: 42px;
		}
		.bottom_text {
			font-size:14px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(98,98,98,1);
			line-height:1;
			span {
				font-size:14px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(101,39,145,1);
				margin-left: 3px;
				cursor: pointer;
			}
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

.triangle_border_left{
    width: 0;
    height: 0;
    border-width: 8px 11px 8px 0;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    left: -10px;
    top: 50%;
    margin-top: -20px;
}
.triangle_border_left span{
    display:block;
    width:0;
    height:0;
    border-width:28px 28px 28px 0;
    border-style:solid;
    border-color:transparent #fc0 transparent transparent;/*透明 黄 透明 透明 */
    position:absolute;
    top:0px;
    left:0px;
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