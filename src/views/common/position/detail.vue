<template>
	<div class="positionDetail">
		<header class="header">
			<div class="inner">
				<div class="content">
					<div class="title">
						<span class="icon jipin"></span>
						<span class="name">高级软件产品经理</span>
					</div>
					<div class="salary">20-28K·18<span class="unit">薪</span></div>
					<div class="infos">
						<span class="info-item"><i class="icon iconfont"></i>广州市  天河区</span>
						<span class="info-item"><i class="icon iconfont icon-zhiwei"></i>广州市  天河区</span>
						<span class="info-item"><i class="icon iconfont"></i>广州市  天河区</span>
					</div>
					<div class="labels">
						<span class="label-item">加班补贴</span>
						<span class="label-item">加班补贴</span>
						<span class="label-item">加班补贴</span>
					</div>
				</div>
				<div class="aside">
					<div class="operBox">
						<el-button class="btn">开撩约面</el-button>
					</div>
					<div class="botBtnBox">
						<span class="botBtn"><i class="icon iconfont icon-weixin"></i>微信分享</span>
						<span class="botBtn"><i class="icon iconfont icon-shengchenghaibao"></i>生成海报</span>
						<span class="botBtn noMargin"><i class="icon iconfont icon-shoucang"></i>感兴趣</span>
					</div>
				</div>
			</div>
		</header>
		<div class="content">
			<div class="inner">
				<article class="content-article">
					<section class="part">
						<div class="title">技能要求</div>
						<div class="labels">
							<span class="label-item">#用户调研</span>
							<span class="label-item">#用户调研</span>
							<span class="label-item">#用户调研</span>
						</div>
					</section>
					<section class="part">
						<div class="title">职位描述</div>
						<pre class="richText">公司介绍公司介绍公司介绍</pre>
					</section>
					<section class="part">
						<div class="title">公司介绍</div>
						<pre class="richText">公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍</pre>
					</section>
					<section class="part">
						<div class="title">工作地址</div>
						<div class="map"></div>
					</section>
				</article>
				<aside class="content-aside">
					<div class="loginBox">
						<p class="desc">10W+优质机会任你选</p>
						<el-button class="login">登录</el-button>
						<el-button class="register">注册</el-button>
					</div>
					<div class="companyInfos">
						<p class="title">公司基本信息</p>
						<div class="details">
							<div class="logo"><img src="" alt=""></div>
							<div class="name">测试</div>
						</div>
						<div class="infos">
							<p class="info-item"><i class="icon iconfont"></i>不需要融资</p>
							<p class="info-item"><i class="icon iconfont"></i>不需要融资</p>
							<p class="info-item"><i class="icon iconfont"></i>不需要融资</p>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'positionDetail'
})
export default class PositionDetail extends Vue {
  cdnPath = `${this.$cdnPath}/images/`
  created () {

  }
}
</script>
<style lang="scss">
@import './detail.scss';
</style>