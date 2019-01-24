<template>
	<header id="page-header">
		<section>
			<div class="left">
				<img class="logo" src="../../assets/images/logo_white.png" />
				<ul class="nav">
					<li class="">打开猎多多</li>
					<li class="" @click="changeId">切换为求职者</li>
				</ul>
			</div>
			<div class="right" v-if="userInfo && userInfo.token">
				<span class="name">欢迎登录猎多多，{{userInfo.nickname}}</span>
				<span class="op_icon"></span>
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
	overflow: hidden;
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
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
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
			}
			.op_icon {
				width:12px;
				height:8px;
				background:rgba(255,255,255,1);
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