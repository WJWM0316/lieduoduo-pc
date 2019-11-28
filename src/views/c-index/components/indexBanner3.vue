<template>
	<div class="random-banner">
<!-- 		<a @click="routeJump(item.vkey)" class="li-item" :class="'item' + index" v-for="(item, index) in banner" :key="item.vkey">
			<img :src="item.src" alt="loading">
		</a> -->
		<a @click="routeJump('2ha5usmh')" class="li-item item0">
			<img src="~@/assets/random_images/img0.jpg" alt="loading">
		</a>
		<a @click="routeJump('8sdlelbu')" class="li-item item1">
			<img src="~@/assets/random_images/img1.jpg" alt="loading">
		</a>
		<a @click="routeJump('inxwzsxe')" class="li-item item2">
			<img src="~@/assets/random_images/img2.jpg" alt="loading">
		</a>
		<a @click="routeJump('kkwrgd1m')" class="li-item item3">
			<img src="~@/assets/random_images/img3.jpg" alt="loading">
		</a>
		<a @click="routeJump('enbqgvgx')" class="li-item item4">
			<img src="~@/assets/random_images/img4.jpg" alt="loading">
		</a>
		<a @click="routeJump('4utnb5ri')" class="li-item item5">
			<img src="~@/assets/random_images/img5.jpg" alt="loading">
		</a>
		<a @click="routeJump('dcrjn1kv')" class="li-item item6">
			<img src="~@/assets/random_images/img6.jpg" alt="loading">
		</a>
	</div>
</template>
<script>
export default {
	data () {
		return {
			banner: [
				{
					vkey: '2ha5usmh',
					src: '../../../assets/random_images/img0.jpg'
				},
				{
					vkey: '8sdlelbu',
					src: '../../../assets/random_images/img1.jpg'
				},
				{
					vkey: 'inxwzsxe',
					src: '../../../assets/random_images/img2.jpg'
				},
				{
					vkey: 'kkwrgd1m',
					src: '../../../assets/random_images/img3.jpg'
				},
				{
					vkey: 'enbqgvgx',
					src: '../../../assets/random_images/img4.jpg'
				},
				{
					vkey: '4utnb5ri',
					src: '../../../assets/random_images/img5.jpg'
				},
				{
					vkey: 'dcrjn1kv',
					src: '../../../assets/random_images/img6.jpg'
				}
			]
		}
	},
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
	height: 414px;
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
		left: calc(508px + 3px);
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
		left: calc(508px + 3px);
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
		left: calc(252px + 3px + 253px + 3px);
	}
}
</style>