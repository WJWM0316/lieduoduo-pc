<template>
	<div class="loginWrap">
		<div class="inner">
			<div class="inner-content">
				<p class="desc">亲爱的女王 节日快乐～<br/>
				复制并添加小仙女微信号：zike_006<br/>
				即可一键领取福利啦
				</p>
				<div class="copy" id="Receive-date" data-clipboard-text="zike_006" @click="copy">马上复制</div>
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
    },
    copy () {
      let clipboard = new Clipboard('#Receive-date')
			  clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
			  })
    }
  }
}
</script>

<style lang="less" scoped>
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
		width: 400px;
		text-align: center;
		box-sizing: border-box;
		color: #01C7D2;
    position: relative;

		.inner-content {
			overflow: hidden;
			padding: 40px 0 30px;
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
			font-size: 20px;
      margin: 0 auto;
      font-weight: 300;
      color: #F7278A;
      line-height: 30px;
		}
		.copy{
			width: 230px;
			height: 55px;
			margin: 40px auto 0 auto;
			background: url("../../../../assets/images/activity/copy_btn.png") no-repeat;
			background-size: 100% 100%;
			line-height: 55px;
			color: #ffffff;
			font-size: 24px;
			font-weight: 500;
		}
	}
</style>

