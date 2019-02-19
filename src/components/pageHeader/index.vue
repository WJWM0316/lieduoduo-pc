<template>
	<header id="page-header">
		<section>
			<div class="left">
				<img class="logo" src="../../assets/images/logo_white.png" />

				<ul class="nav">
					<li class="" @mouseover="pop.isShow = true" @mouseout="pop.isShow = false">打开猎多多</li>
					<li class="" @click="refresh" >切换为{{identity==='jobhunter'?'招聘官':'求职者'}}</li>
				</ul>

				<div class="headWC_pop" v-if="pop.isShow">
					<div class="triangle_border_top"></div>
					<div class="pop_cont">
			  		<img class="pop_code" src="../../assets/images/gzh.png"/>
			  		<p class="pop_text">微信扫码关注公众号 </p>
			  		<p class="pop_text">菜单栏点击选择猎多多</p>
					</div>
					<div class="pop_cont right">
			  		<img class="pop_code" src="../../assets/images/xcx.png"/>
			  		<p class="pop_text">微信扫码打开小程序</p>
					</div>
					<div class="triangle_border_right"></div>
				</div>
			</div>

			<div class="right" v-if="userInfo && userInfo.token">
				<span class="name">欢迎登录猎多多，{{userInfo.realname}}</span>
				<el-dropdown @command="handleClick">
				  <span class="el-dropdown-link">
				  	<img class="op_icon" src="../../assets/images/open.png" />
				    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="out">退出登录</el-dropdown-item>
				    <el-dropdown-item command="changeId">切换为{{identity==='jobhunter'?'招聘官':'求职者'}}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				<!-- <img class="op_icon" src="../../assets/images/open.png" /> -->
				<img class="avatar" :src="userInfo.avatarInfo.middleUrl" />
			</div>

			<div class="switchWrap" v-if="isShowSwitch">
					<div class="switchIdentity">
						<img class="cloSwitch" src="../../assets/images/clo.png" @click="cloIdentity">
						<h3 class="switchTit">切换身份</h3>

						<div class="switchMain" v-if="identity === 'qiuzhi'">
				  		<p class="switch_text">我的 > 设置 > 切换“求职者”身份</p>
				  		<img class="switch_pic" src="../../assets/images/pic_cut_jobhunter.png"/>
							<div class="switch_cont">
					  		<p class="switch_text2">在小程序端切换为求职者身份后</p>
					  		<p class="switch_text2">点击下方按钮即可完成切换</p>
							</div>

							<div class="refresh" @click="refresh">已切换为求职者</div>
						</div>
						<div class="switchMain" v-else>
				  		<p class="switch_text">我的 > 设置 > 切换“招聘官”身份</p>
				  		<img class="switch_pic" src="../../assets/images/pic_cut_recruiter.png"/>
							<div class="switch_cont">
					  		<p class="switch_text2">在小程序端切换为招聘官身份后</p>
					  		<p class="switch_text2">点击下方按钮即可完成切换</p>
							</div>

							<div class="refresh" @click="refresh">已切换为招聘官</div>
						</div>
					</div>
			</div>
			
		</section>
	</header>
</template>
<style lang="less">
#page-header{
	height:60px;
	background: rgba(101,39,145,1);
	text-align: right;
	font-size: 14px;
	box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
	.switchWrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:rgba(0,0,0,0.3);
		.switchIdentity {
			position: fixed;
			left: 50%;
			top: 50%;
			margin: -150px 0 0 -220px;
			width:300px;
			height:440px;
			background:rgba(255,255,255,1);
			box-shadow:0px 8px 12px 0px rgba(48,50,51,0.22);
			text-align: center;
			.cloSwitch {
				width:10px;
				height:10px;
				position: absolute;
				right: 16px;
				top: 16px;
				cursor: pointer;
			}
			.switchTit {
				font-size:20px;
				font-family:PingFang-SC-Bold;
				font-weight:bold;
				color:rgba(40,40,40,1);
				margin: 32px 0;
			}
			.switchMain {
				.switch_text {
					font-size:14px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(40,40,40,1);
					line-height:20px;
				}
				.switch_pic {
					width: 224px;
					height: 147px;
					margin: 0 auto;
					margin-top: 16px;
				}
				.switch_cont {
					margin-bottom: 39px;
					margin-top: 16px;
					.switch_text2 {
						font-size:14px;
						font-family:PingFang-SC-Regular;
						font-weight:400;
						color:rgba(40,40,40,1);
						line-height:22px;
					}
				}
				.refresh {
					width:180px;
					height:48px;
					background:rgba(239,233,244,1);
					border-radius:27px;
					font-size:16px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(101,39,145,1);
					line-height:48px;
					margin: 0 auto;
				}
			}
		}
	}
	
	.logo{
		width:80px;
		height:30px;
	}
	.nav {
		font-size:14px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:60px;
		li {
			display: inline-block;
			margin-left: 60px;
			cursor: pointer;
		}
	}
	section {
		width: 960px;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
		}
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			.name {
				font-size:14px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
			}
			.avatar {
				width:30px;
				height:30px;
				border-radius: 50%;
				margin-left: 7px;
			}
			.op_icon {
				width:12px;
				height:12px;
				margin: 0 7px;
			}
		}
	}
	.navigation {
		margin-right: 40px;
		li{
			display: inline-block;
			line-height: 60px;
			margin-left: 35px;
		}
		img {
			width: 34px;
			height: 34px;
			background: rgba(0,0,0,.1);
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			cursor: pointer;
		}
	}

	.headWC_pop {
		position: absolute;
		top: 55px;
		left: 140px;
		width:318px;
		height:180px;
		background:rgba(255,255,255,1);
		box-shadow:0px 8px 12px 0px rgba(239,233,244,1);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 0 24px;
		border-radius: 8px;
		.pop_cont {
			display: flex;
			justify-content: center;
			flex-direction: column;
			&.right {
				margin-left: 50px;
				.pop_code {
					border-radius: 50%;
					margin-bottom: 20px;
					display: block;
				}
				.pop_text {
				}
			}
			.pop_code {
				width:106px;
				height:105px;
				margin: 0 auto;
				margin-bottom: 12px;
			}
			.pop_text {
				text-align: center;
				font-size:12px;
				//margin-top:12px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(98,98,98,1);
				line-height:18px;
				white-space: nowrap;
			}
		}

		.triangle_border_top{
	    width: 0;
	    height: 0;
	    border-width:0 10px 10px 10px;
     	border-style:solid;
     	border-color:transparent transparent #fff;/*透明 透明  灰*/
	    border-style: solid;
	    position: absolute;
	    left: 30px;
	    top: -10px;
		}
	}
}
</style>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { switchId, getUserIdentity } from '../../../config.js'
import { changeBaseURL } from '../../api/index'

@Component({
  methods: {
  },
  computed: {
  }
})
export default class ComponentHeader extends Vue {
	userInfo = {}
	pop = {
    isShow: false,
    type: 'help'
  }
  identity = 'jobhunter'
  isShowSwitch = false
  //切换身份刷新
  refresh() {

  	let identity = switchId()
  	this.identity = identity

  	this.$store.dispatch('setUserIdentity', identity)
  	changeBaseURL()
  	// if(identity === 'zhaopin'){

  	// }else {
  		
  	// }
  	this.$router.push({
  		name: identity === 'zhaopin' ? 'recruiterIndex' : 'applyIndex',
  		query:{identity: identity}
  	})

		this.$message({
	    type: 'success',
	    message: '切换成功!'
	  })
  }

  //关闭切换
  cloIdentity () {
  	this.isShowSwitch = !this.isShowSwitch
  }

  handleClick (e) {
  	if(e === 'out'){
  		this.$store.dispatch('logoutApi')
  			.then(() => {
  				this.$router.push({name: 'login'})
  			})
  	}/* else if(e === 'changeId') {
  		this.changeId()
  	}*/
  }

  //打开列多多二维码
  clickWC () {
  	this.pop.isShow = !this.pop.isShow
  }

  // 退出
	logout(command) {
		this.$store.dispatch('logoutApi')
		//this.logoutApi()
		.then(() => {
			this.$router.push({name: 'login'})
		})
	}

	created(){
		let identity = this.$store.state.userIdentity
		if(identity){
			this.identity = identity
		}else {
			identity = getUserIdentity()
  		this.$store.dispatch('setUserIdentity', identity)
  		this.identity = identity
		}
		console.log('ComponentHeader=identity====', this.identity)
		this.userInfo = this.$store.state.userInfo
		console.log('ComponentHeader=userInfo====', this.userInfo)
	}

	// 打开切换身份
	changeId () {
  	this.isShowSwitch = !this.isShowSwitch
	}
}
</script>