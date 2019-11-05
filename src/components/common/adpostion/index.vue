<template>
	<div class="wrap" v-if="adList.length > 0">
		<div class="adList">
			<div class="ad-img1" v-for="(item, index) in adList" :key="index">
				<a :href="item.targetUrl"  target="_blank"><img :src="item.bigImgUrl"></img></a>
			</div>
		</div>
	</div>
</template>
<script>
import { getBanners } from 'API/common'
export default {
	props: {
		position: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			adList: []
		}
	},
	computed: {
		...mapState({
			roleInfos: state => state.roleInfos
		})
	},
	created () {
		let location = ''
		switch (this.position) {
			case 'positionDetail':
				location = 'pc_position_detail_side'
				break
			case 'searchResult':
				location = 'jobhunter_pc_position_list '
				break
		}
		getBanners({location}).then(res => {
			this.adList = res.data.data.pcPositionDetailSide || res.data.data.jobhunterPcPositionList
			// if (this.roleInfos.isJobhunter) {
			// 	let createUseIndex = 0
			// 	this.adList.map((item, index) => {
			// 		if (item.name === 'createUser') {
			// 			createUseIndex = index
			// 		}
			// 	})
			// 	this.adList.replace(createUseIndex, 1)
			// }
		})
	}
}
</script>
<style lang="scss" scoped>
	.wrap {
		width: 298px;
		.adList {
			width: 100%;
			.ad-img1 {
				width: 100%;
				margin-bottom: 22px;
				cursor: pointer;
				a, img {
					width: 100%;
					display: block;
				}
			}
		}
	}
</style>