<template>
	<div class="positionDetail">
		<header class="header">
			<div class="inner">
				<div class="content">
					<div class="title">
						<span class="icon"><i class="iconfont"></i>急聘</span>
						<span class="name">高级软件产品经理</span>
					</div>
					<div class="salary">20-28K·18<span class="unit">薪</span></div>
					<div class="infos">
						<span class="info-item"><i class="iconfont"></i>广州市  天河区</span>
						<span class="info-item"><i class="iconfont"></i>广州市  天河区</span>
						<span class="info-item"><i class="iconfont"></i>广州市  天河区</span>
					</div>
					<div class="labels">
						<span class="label-item">加班补贴</span>
						<span class="label-item">加班补贴</span>
						<span class="label-item">加班补贴</span>
					</div>
				</div>
				<div class="aside">
					<div class="operBox">
						<div class="btn">开撩约面</div>
					</div>
					<div class="botBtnBox">
						<span class="botBtn"><i class="iconfont"></i>微信分享</span>
						<span class="botBtn"><i class="iconfont"></i>生成海报</span>
						<span class="botBtn"><i class="iconfont"></i>感兴趣sdsd1121</span>

					</div>
				</div>
			</div>
		</header>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'positionDetail'
})
export default class PositionDetail extends Vue {
  cdnPath = this.$cdnPath
  created () {
  	
  }
}
</script>
<style lang="scss">
@import './detail.scss';
</style>