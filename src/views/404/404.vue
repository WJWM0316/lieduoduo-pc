<template>
	<div id="page404">
		<div class="none_main">
			<img class="none_icon" src="../../assets/images/defaultpage_404.png"/>
  		<p class="none_text">抱歉，你访问的页面不存在</p>
			<div class="btns">
		  	<div class="btn refresh" @click="refresh">刷新网页</div>
		  	<div class="btn toIndex" @click="toIndex">返回首页</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	@Component({
	  name: 'lipage404',
	  methods: {
	  },
	  computed: {},
	})
	export default class CourseList extends Vue {
		userInfo = {}

	  init() {
	  }

	  refresh() {
	  	this.$router.go(0)
	  }

	  toIndex() {
	  	this.$router.push({
	  		name: 'recruiterIndex'
	  	})
	  }
	}
</script>
<style lang="less">
#page404 {
	padding: 0;
	height: 100vh;
	.none_main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 85vh;
		.none_icon {
			width: 334px;
			height: 200px;
		}
		.none_text {
			margin: 50px 0 56px 0;
			font-size:20px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(132,82,167,1);
			line-height:20px;
		}
		.btns {
			display: flex;
			flex-direction: row;

			.btn {
				width:108px;
				height:38px;
				background:rgba(255,220,41,1);
				border-radius:20px;
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(40,40,40,1);
				line-height:38px;
				box-sizing: border-box;
				text-align: center;
				&.refresh {
					margin-right: 32px;
				}
				&.toIndex {
					border:1px solid rgba(132,82,167,1);
					color:rgba(101,39,145,1);
					background: #fff;
				}
			}

		}
	}
}

</style>