<template>
	<div class="random-banner">
		<a @click="routeJump('2ha5usmh')" class="li-item item0">
			<img src="~@/assets/random_images/img0.jpg" alt="">
		</a>
		<a @click="routeJump('8sdlelbu')" class="li-item item1">
			<img src="~@/assets/random_images/img1.jpg" alt="">
		</a>
		<a @click="routeJump('inxwzsxe')" class="li-item item2">
			<img src="~@/assets/random_images/img2.jpg" alt="">
		</a>
		<a @click="routeJump('kkwrgd1m')" class="li-item item3">
			<img src="~@/assets/random_images/img3.jpg" alt="">
		</a>
		<a @click="routeJump('enbqgvgx')" class="li-item item4">
			<img src="~@/assets/random_images/img4.jpg" alt="">
		</a>
		<a @click="routeJump('4utnb5ri')" class="li-item item5">
			<img src="~@/assets/random_images/img5.jpg" alt="">
		</a>
		<a @click="routeJump('dcrjn1kv')" class="li-item item6">
			<img src="~@/assets/random_images/img6.jpg" alt="">
		</a>
	</div>
</template>
<script>
export default {
	methods: {
		routeJump (vkey) {
			this.$router.push({
				name: 'companyDetail',
				query: {
					vkey
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.random-banner {
	position: relative;
	width: 763px;
	height: 416px;
	overflow: hidden;
	margin-left: 18px;
	.li-item{
		display: inline-block;
		position: absolute;
		box-sizing: border-box;
		cursor: pointer;
		background: rgba(0,0,0,.05);
		img{
			width: 100%;
			height: 100%;
		}
	}
	.item0{
		width:508px;
		height:206px;
		left: 0;
		top: 0;
	}
	.item1{
		width:252px;
		height:206px;
		left: calc(508px + 2px);
		top: 0;
	}
	.item2 {
		width:508px;
		height:108px;
		top: 206px;
		left: 0;
		border-top: 3px solid white;
		border-bottom: 3px solid white;
	}
	.item3 {
		width:252px;
		height:108px;
		top: 206px;
		left: calc(508px + 2px);
		border-top: 3px solid white;
		border-bottom: 3px solid white;
	}
	.item4 {
		width:252px;
		height:102px;
		top: calc(108px + 206px);
		left: 0;
	}
	.item5 {
		width:253px;
		height:102px;
		top: calc(108px + 206px);
		left: calc(252px + 3px);
	}
	.item6 {
		width:252px;
		height:102px;
		top: calc(108px + 206px);
		right: 0;
	}
}
</style>