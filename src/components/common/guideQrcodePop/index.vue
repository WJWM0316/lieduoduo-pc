<template>
	<div class="qrCodePop" v-show="showPop">
		<div class="inner">
			<p class="title">微信扫一扫<br>查看面试详情</p>
			<img class="qrcode" :src="qrCodeUrl" alt="">
			<i class="close iconfont icon-close" @click="showPop = !showPop"></i>
		</div>
	</div>
</template>
<script>
	import {getMyQrcodeApi} from '@/api/qrcode'
	export default {
		props: {
			type: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				showPop: false,
				qrCodeUrl: '' // 二维码
			}
		},
		created () {
			if (this.qrCodeUrl) return
			switch (this.type) {
				case 'interviewDetail':
					let params = {
						path: 'page/common/pages/arrangement/arrangement',
						params: `id=${this.interviewInfos.data[0].interviewId}`
					}
					this.getQrcode(params)
					break
			}
		},
		methods: {
			getQrcode () {
		  	getMyQrcodeApi(params).then(res => {
		  		this.qrCodeUrl = res.data.data.url
		  	})
		  }
		}
	}
</script>
<style lang="scss" scoped>
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
	
</style>