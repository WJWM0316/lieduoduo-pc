<template>
	<div class="loginWrap">
		<div class="inner">
      <i class="correct iconfont icon-zhengque"></i>
			<div class="inner-content">
				<p class="title">职位发布成功!</p>
        <div class="code">
          <img src="../../../../assets/images/activity/disease/diseaseCode.png"/>
        </div>
				<p class="desc">扫码添加客服小姐姐小多多 我们将在3天内发放招聘奖励</p>
			</div>
			<div class="closeBtn iconfont icon-danchuang-guanbi" @click="closePop"></div>
		</div>
	</div>
</template>
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
    .correct{
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 3;
      font-size: 56px;
      &::after{
        content: '';
        display: inline-block;
        background: #fff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 10%);
        z-index: -1;
      }
    }
		.inner-content {
			overflow: hidden;
			padding: 60px 0 30px;
			background: #fff;
			border: 2px solid #02C7D0;
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
		.title {
			font-size: 24px;
			line-height: 20px;
			font-weight: bold;
		}
		.desc {
			font-size: 16px;
      margin: 11px auto 10px auto;
      font-weight: 300;
      width: 240px;
      color: #333333;
      line-height: 23px;
    }
    .code{
      width: 210px;
      height: 210px;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
	}
</style>
<script>
export default {
  methods: {
    closePop () {
      this.$parent.popShow = false
    }
  }
}
</script>
