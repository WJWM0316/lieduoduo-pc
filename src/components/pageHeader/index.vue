<template>
	<header id="page-header">
		<section>
			<div class="left">
				<img class="logo" src="../../assets/images/logo_white.png" />
				<ul class="nav">
					<li class="" @click="clickWC">打开猎多多</li>
					<!-- <li class="" @click="changeId">切换为求职者</li> -->
				</ul>

				<div class="headWC_pop" v-if="pop.isShow">
					<div class="triangle_border_top">
					</div>
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
				<!-- <img class="op_icon" src="../../assets/images/open.png" /> -->
				<img class="avatar" :src="userInfo.avatarInfo.middleUrl" />
				<ul class="hidden">
					<li class="">退出登录</li>
					<li class="">切换微招聘官</li>
				</ul>
				<div class="pop hidden">
					<p class="pop_text">微信扫码打开小程序</p>
					<img class="coed" src />
				</div>
			</div>
			
			
			<!-- <ul class="navigation" v-if="userInfo">
				<li>
					<el-dropdown trigger="hover" @command="logout" placement="bottom">
					  <div class="el-dropdown-link" style="color:#354048">
					  	<img :src="userInfo.avatarInfo.middleUrl" alt="" v-if="userInfo.avatarInfo&&userInfo.avatarInfo.middleUrl">
					    <span style="margin-left: 10px;">欢迎登录，&nbsp;&nbsp;{{userInfo.realname}}</span>
					    <i class="el-icon-caret-bottom el-icon--right"></i>
					  </div>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item command="out">退出登录</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</li>
			</ul> -->
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

  clickWC () {
  	console.log(111)
  	this.pop.isShow = !this.pop.isShow
  }
	logout(command) {
		this.$store.dispatch('logoutApi')
		//this.logoutApi()
		.then(() => {
			this.$router.push({name: 'login'})
		})
	}

	created(){
		this.userInfo = this.$store.state.userInfo
		console.log('ComponentHeader====',this.userInfo)
	}

	changeId () {
		this.$router.push({name: 'login'})
	}
}
</script>