<template>
<div class="search-content">
  <div class="li-item_schedule clearfix" v-for="(item, index) in data.list" :key="index">
		<div class="col-left">
			<div class="logo-box">
				<img :src="item.companyInfo.logoInfo.smallUrl" alt="avatar" v-if="item.companyInfo" />
			</div>
		</div>
		<div class="col-center">
			<div class="colc-top">
				<div class="company-name" @click="tocompany(item)">{{item.companyShortname}}</div>
				<div class="company-desc">{{item.companyInfo.financingDesc}}<span>·</span>{{item.companyInfo.employeesDesc}}<span>·</span>{{item.companyInfo.industry}}</div>
			</div>
			<div class="colc-bottom">
				<i class="iconfont icon-dizhi"></i>
				<div class="address" @click="editAddress(item, index)">{{item.addressInfo.address}}{{item.addressInfo.doorplate}}</div>
				<div class="addressdetail">
					{{item.addressInfo.address}}{{item.addressInfo.doorplate}}
				</div>
			</div>
		</div>
		<div class="col-right">
			<div class="clor-top">
				<!-- <div class="exit">面试已取消</div> -->
				<div :class="['time', item.status >= 51 ? 'pasttime' : '']"><i class="iconfont icon-shijian"></i>
				<div class="isall" v-if="$route.query.time === '0' || new Date((item.arrangementInfo.appointmentTime)*1000).getFullYear() !== (new Date()).getFullYear()">
					<span v-if="item.status >= 51 && new Date((item.arrangementInfo.appointmentTime)*1000).getFullYear() !== (new Date()).getFullYear()">
					{{(item.arrangementInfo.appointmentTime)*1000 | date('YYYY-MM-DD HH:mm') }}
					</span>
					<span v-else>
					{{(item.arrangementInfo.appointmentTime)*1000 | date('MM-DD HH:mm') }}
					</span>
				</div>
				<div class="other" v-else>
				<span>{{item.arrangementInfo.appointment.substring(11, 16)}}</span>
				</div>
				</div>
			</div>
			<div class="clor-bottom">
				<router-link
  				target="_blank"
  				class="position"
  				:to="{name: 'positionDetail', query: { positionId: item.positionId }}"
  				v-if="item.positionId">
  				<i class="iconfont icon-zhiwei"></i>
  				<span class="pname">{{item.positionName}}</span>
  			</router-link>
				<div class="noposition" v-if="!item.positionId">
					<i class="iconfont icon-zhiwei"></i>
					<span class="pname">直接约面</span>
				</div>
				<div class="name">
					<i class="iconfont icon-app"></i>
					<span>{{item.arrangementInfo.realname}}</span>
				</div>
				<div class="line"></div>
				<div class="phone">{{item.arrangementInfo.mobile}}</div>
			</div>
		</div>
		<div class="dottedlien"></div>
		<!-- <div class="listredhot" v-if="item.redDot"></div> -->
  </div>
	<no-data v-if="!data.total && data.hasInitPage" />
	<company-map :visible.sync="showadress" @closedialog="cancel" :companyAddress="companyAddress"></company-map>
	</div>
</template>
<script>
import NoData from './noData'
import companyMap from '@/components/companyMap/index'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
      	list: [],
			  page: 1,
			  count: 20,
			  hasInitPage: false,
			  total: 0,
			  pageSize: 20
      })
    }
  },
  data () {
    return {
      keyaddress: '',
      showadress: false,
      companyAddress: [],
      mapIndex: 0 // 地图索引
    }
  },
  components: {
    NoData,
    companyMap
  },
  methods: {
    toposition (data) {
      let routeData = this.$router.resolve({
        name: 'positionDetail',
        query: { positionId: data.positionId }
      })
      window.open(routeData.href, '_blank')
    },
    editAddress (item, index) { // 编辑地址
      this.companyAddress = []
      this.companyAddress.push(item.addressInfo)
      this.showadress = true
    },
    cancel () {
      this.showadress = false
    },
    receiveAddAdress (data) { // 地图回调
      if (this.mapIndex === 100) { // 判断是添加还是编辑 100 是添加
        return false
      } else {
        return false
      }
    },
    tocompany (data) {
      let routeData = this.$router.resolve({
        name: 'companyDetail',
        query: {
          vkey: data.companyInfo.vkey
        }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.li-item_schedule {
	position: relative;
	padding: 33px 40px;
	transition: .2s background;
	.col-left{
		float: left;
	}
	.dottedlien{
		height: 1px;
		background-image: linear-gradient(to right, #E8E9EB 0%, #E8E9EB 50%, transparent 50%);
		background-size: 8px 1px;
		background-repeat: repeat-x;
		width:810px;
		margin: 0 40px;
    bottom: 0;
    position: absolute;
    left: 0;
	}
	.listredhot{
		position: absolute;
		right: 33px;
		top: 18px;
		width:6px;
		height:6px;
		border-radius: 50%;
		background:#F45322;
	}
	.logo-box{
		width:64px;
		height:64px;
		border-radius:8px;
		overflow: hidden;
		box-sizing: border-box;
		border:1px solid rgba(221,225,224,1);
		img{
			width: 100%;
			height: 100%;
		}
	}
	.col-center{
		float: left;
		margin-left: 14px;
	}
	.colc-top{
		height: 25px;
		line-height: 25px;
		margin: 4px 0 12px 0;
		.company-name{
			color: #282828;
			font-size: 18px;
			float: left;
			margin-right: 12px;
			cursor: pointer;
			&:hover{
				color: $nav-color-hover;
			}
		}
		.company-desc{
			color: $font-color-6;
			float: left;
			font-size: 14px;
			span{
				font-weight: bold;
				padding: 0 2px;
			}
		}
	}
	.colc-bottom{
		font-weight:400;
		line-height: 20px;
		position: relative;
		display: flex;
		cursor: pointer;
		&:hover i{
				color: $nav-color-hover;
		}
		&:hover .address{
			color: $nav-color-hover;
		}
		&:hover{
			.addressdetail {
				display: block;
				opacity: 1;
			}
		}
		i{
			color: #BCBEC0;
			font-size: 13px;
		}
		.address{
			margin-left: 4px;
			color: $font-color-6;
			font-size: 14px;
			@include ellipsis-over(370px);
		}
		.addressdetail{
			position: absolute;
			width:520px;
			padding: 10px;
			color: #66666E;
			font-size:12px;
			display: none;
			box-sizing: border-box;
			background: #FFFFFF;
			box-shadow: 0 0 30px 0 rgba(22,39,77,0.07);
			border-radius: 4px;
			top: 23px;
			line-height: 16px;
			left: -62px;
			z-index: 1;
		}
	}
	.col-right{
		float: right;
	}
	.clor-top{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 9px;
		.exit{
			line-height: 32px;
			margin-right: 19px;
			font-size: 14px;
			color: #FF9E40;
		}
		.time{
			padding: 0 14px;
			display: flex;
			height:32px;
			background:#00C4CD;
			border-radius:4px;
			color: #fff;
			font-size: 16px;
			justify-content: center;
    	align-items: center;
			i{
				margin-right: 6px;
				margin-bottom: 3px;
			}
		}
		.pasttime{
			background: #BCBEC0;
		}
		.exittime{
			background: #DDE1E0;
		}
	}
	.clor-bottom{
		display: flex;
		height: 20px;
		line-height: 20px;
		.icon-zhiwei {
			color: $iconFont-gray;
			float: left;
		}
		i{
			font-size: 13px;
			color:#BCBEC0;
			margin-right: 6px;
		}
		span{
			font-size: 14px;
			color: #66666E;
		}
		.pname{
			display: block;
    	float: left;
			@include ellipsis-over(98px);
		}
		.position{
			margin-right: 18px;
			cursor: pointer;
			color: $font-color-6;
			&:hover{
				color: $nav-color-hover;
				i {
					color: $nav-color-hover;
				}
				span {
					color: $nav-color-hover;
				}
			}
		}
		.noposition{
			margin-right: 18px;
		}
		.line{
			width:1px;
			height:10px;
			background: $font-color-6;
			margin: 6px 5px 0 6px;
		}
		.phone{
			line-height: 22px;
		}
	}
}
</style>
