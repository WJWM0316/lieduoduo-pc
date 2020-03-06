<template>
	<div class="loginWrap">
		<div class="inner">
			<div class="inner-content">
				<p class="desc">亲爱的女王 节日快乐～<br/>
				扫码添加小仙女微信号<br/>
				即可领取福利啦
				</p>
				<div class="code"></div>
			</div>
			<div class="closeBtn iconfont icon-danchuang-guanbi" @click="closePop"></div>
		</div>
	</div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  methods: {
    closePop () {
      this.$parent.popShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.loginWrap {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
	.inner {
		width: 340px;
		text-align: center;
		box-sizing: border-box;
		color: #01C7D2;
    position: relative;

		.inner-content {
			overflow: hidden;
			padding: 40px 0 22px;
			background: #fff;
			border: 2px solid #FF4AA0;
			position: relative;
			border-radius: 16px;
		}
		.closeBtn {
			width: 35px;
			height: 35px;
			border: 1px solid #fff;
			text-align: center;
			line-height: 35px;
			position: absolute;
			bottom: -60px;
			left: 50%;
			margin-left: -19px;
			border-radius: 50%;
			color: #fff;
			font-size: 12px;
		}
		.desc {
			font-size: 18px;
      margin: 0 auto;
      font-weight: 400;
      color: #F7278A;
      line-height: 28px;
		}
		.code{
			width: 180px;
      height: 180px;
			margin: 17px auto 0 auto;
			background: url(#{$image-activity-cdn-url}/queen_pc/queenCode.jpg) no-repeat;
			background-size: 100% 100%;
		}
	}
</style>

