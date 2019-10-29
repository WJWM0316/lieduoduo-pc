<template>
	<div class="wrap" v-if="adList.length > 0">
		<div class="adList">
			<div class="ad-img1" v-for="(item, index) in adList" :key="index">
				<img :src="item.bigImgUrl" alt="">
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
				img {
					width: 100%;
					display: block;
				}
			}
		}
	}
</style>