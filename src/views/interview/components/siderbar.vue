<template>
  <div class="flex-right">
  	<section class="guest-like" v-if="recommendOpptyInterestLists.length">
  		<div class="section-header">猜你喜欢</div>
	  	<div class="ul-box">
  			<router-link
  				target="_blank"
  				:to="{name: 'positionDetail', query: { positionId: item.id }}"
  				v-for="(item, index) in recommendOpptyInterestLists"
  				:key="index"
  				:class="{'jipin-mark': item.isUrgency === 1}"
  				class="li-item-position">
  				<!-- :class="{'jipin': item.isUrgency === 1}" -->
  				<div class="jump">
		  			<div class="li-item-row-one">
		  				<div class="position-name">{{item.positionName}}</div>
		  				<!-- <span v-if="item.isRapidly">24K约面</span> -->
		  				<img src="~IMAGES/tag_list_24hour.png" alt="" class="position-24hour" v-if="item.isRapidly === 1" />
		  				<div class="position-salary">
		  					{{item.emolumentMin}}-{{item.emolumentMax}}K<template v-if="item.annualSalary > 12">·{{item.annualSalary}}薪</template>
		  				</div>
		  			</div>
		  			<div class="li-item-row-two">
		  				<div class="company-infos">
		  					<div class="li-item-row-top">
		  						<div class="company-name">{{item.companyInfo && item.companyInfo.companyShortname}}</div>
		  						<div class="company-address">&nbsp;&nbsp;|&nbsp;&nbsp;{{item.city}}{{item.district}}</div>
		  					</div>
		  					<div class="li-item-row-bottom">
		  						{{item.companyInfo && item.companyInfo.financingInfo}} · {{item.companyInfo && item.companyInfo.employeesInfo}} · {{item.companyInfo && item.companyInfo.industry}}
		  					</div>
		  				</div>
		  				<div class="img-box2" v-if="item.companyInfo && item.companyInfo.logoInfo">
		  					<img :src="item.companyInfo.logoInfo.smallUrl" alt="">
		  				</div>
		  			</div>
	  			</div>
	  		</router-link>
	  		<div class="get-more">
	  			<router-link target="_blank" :to="{path: '/position?page=1'}">查看更多职位<i class="iconfont icon-right"></i></router-link>
	  		</div>
	  	</div>
  	</section>
  	<adpostion position="positionDetail"></adpostion>
  </div>
</template>
<script>
import {
	getRecommendOpptyInterestListsApi
} from 'API/position';
import adpostion from '@/components/common/adpostion'

export default {
	components: {
		adpostion
	},
	data () {
		return {
			recommendOpptyInterestLists: []
		}
	},
	methods: {
		getRecommendOpptyInterestLists () {
			getRecommendOpptyInterestListsApi({page: 1, count: 5}).then(({ data }) => this.recommendOpptyInterestLists = data.data)
		}
	},
	created () {
		this.getRecommendOpptyInterestLists()
	}
}
</script>
<style lang="scss" scoped>
.flex-right {
	width:290px;
	border-radius:4px;
	margin-left: 20px;
	.guest-like {
		width:100%;
		background:white;
		box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
		border-radius:4px;
		margin-bottom: 20px;
	}
	.section-header {
		font-size:16px;
		font-weight:500;
		color:$--dropdown-menuItem-hover-color;
		line-height:18px;
		padding: 20px 20px 8px 20px;
	}
	.li-item-position {
		display: block;
		padding: 20px 20px 0 20px;
		&:hover{
			background: $btn-forbid
		};
	}
	.jipin-mark {
		background: url('~IMAGES/jipin_2.png') white no-repeat;
		background-size:38px  38px;
		&:hover{
			background: url('~IMAGES/jipin_2.png')  $btn-forbid no-repeat;
			background-size:38px  38px;
		};
	}
	.jump{
		border-bottom: 1px dashed $--border-color-base;
		padding-bottom: 20px;
	}
	.li-item-row-one {
		font-size:16px;
		font-weight:400;
		color:$font-color-3;
		line-height:16px;
		position: relative;
	}
	.position-salary {
		font-size:16px;
		font-weight:500;
		color:$sub-color-1;
		line-height:16px;
		float: right;
	}
	.position-name {
		display: inline-block;
		@include ellipsis-over(115px);
		vertical-align: middle;
	}
	.position-24hour {
    height: 14px;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin: 0 8px 0 6px;
  }
	.get-more{
		height: 46px;
		line-height: 46px;
		text-align: center;
		font-size:12px;
		font-weight:400;
		color:$font-color-10;
		&:hover{
			background: $btn-forbid;
			a {
				color: $nav-color-hover;
			}
		};
		.icon-right{
			position: relative;
			top: 1px;
			font-size: 12px;
			margin-left: 5px;
		}
	}
	.img-box2 {
		@include img-radius(34px, 34px, 4px);
		display: inline-block;
		vertical-align: middle;
		border: 1px solid $border-color-8;
		box-sizing: border-box
	}
	.li-item-row-top{
		font-size:12px;
		font-weight:400;
		color:$border-color-7;
		line-height:1.1;
	}
	.li-item-row-bottom{
		font-size:12px;
		font-weight:400;
		color:$font-color-9;
		line-height:1.1;
		padding-top:7px;
		@include ellipsis-over(203px);
	}
	.li-item-row-two{
		padding-top: 15px;
	}
	.company-infos {
		display: inline-block;
		vertical-align: middle;
		width: calc(100% - 34px);
		min-height: 34px;
		overflow: hidden;
	}
	.company-name{
		display: inline-block;
		@include ellipsis-over(96px);
		vertical-align: middle;
	}
	.company-address{
		display: inline-block;
		@include ellipsis-over(96px);
		vertical-align: middle
	}
	.wrap{
		width: 290px;
	}
}
</style>

