<template>
<div>
  <div class="li-item clearfix" v-for="(item, index) in data.list" :key="index">
		<div class="col-left">
			<div class="logo-box">
				<img :src="item.avatar.smallUrl" alt="avatar" v-if="item.avatar" />
			</div>
		</div>
		<div class="col-center">
			<div class="colc-top">
				<div class="company-name" @click="tocompany(item)">{{item.companyShortname}}</div>
				<div class="company-desc">{{item.companyInfo.financingDesc}}<span>·</span>{{item.companyInfo.employeesDesc}}<span>·</span>{{item.companyInfo.industry}}</div>
			</div>
			<div class="colc-bottom">
				<i class="iconfont icon-didian"></i>
				<div class="address">{{item.address}}</div>
			</div>
		</div>
		<div class="col-right">
			<div class="clor-top">
				<!-- <div class="exit">面试已取消</div> -->
				<div :class="['time', item.status >= 51 ? 'pasttime' : '']"><i class="iconfont icon-shijian"></i>
				<div class="isall" v-if="$route.query.isselect === 'all'">
					<span v-if="item.status >= 51">
					{{(item.arrangementInfo.appointmentTime)*1000 | date('YYYY-MM-DD HH:mm') }}
					</span>
					<span v-else>
					{{(item.arrangementInfo.appointmentTime)*1000 | date('MM-DD HH:mm') }}
					</span>
				</div>
				<div class="other">
				<span>{{item.arrangementInfo.appointment.substring(11, 16)}}</span>
				</div>
				</div>
			</div>
			<div class="clor-bottom">
				<div class="position" @click="toposition(item)">
					<i class="iconfont icon-zhiwei"></i>
					<span>{{item.positionName}}</span>
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
		<div class="listredhot" v-if="item.redDot"></div>
  </div>
	<no-data v-if="!data.total && data.hasInitPage" />
	</div>
</template>
<script>
import NoData from './noData'
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
  components: {
    NoData
  },
  methods: {
    toposition (data) {
      let routeData = this.$router.resolve({
        name: 'positionDetail',
        query: { positionId: data.positionId }
      })
      window.open(routeData.href, '_blank')
    },
    tocompany (data) {
      let routeData = this.$router.resolve({
        name: 'companyDetail',
        query: {
          vkey: data.companyId
        }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.li-item {
	position: relative;
	padding: 33px 40px;
	cursor: pointer;
	transition: .2s background;
	&:hover{
		background: #f8fafa;
	};
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
		margin-left: 8px;
	}
	.colc-top{
		width: 454px;
		height: 25px;
		line-height: 25px;
		margin: 4px 0 12px 0;
		.company-name{
			font-weight: bold;
			color: #282828;
			font-size: 18px;
			float: left;
			margin-right: 12px;
			cursor: pointer;
			&:hover{
				color: #03B3BB;
			}
		}
		.company-desc{
			color: #66666E;
			float: left;
			font-size: 14px;
			span{
				font-weight: bold;
				padding: 0 2px;
			}
		}
	}
	.colc-bottom{
		width: 454px;
		font-weight:400;
		line-height: 20px;
		height: 20px;
		display: flex;
		cursor: pointer;
		&:hover i{
				color: #03B3BB;
		}
		&:hover .address{
			color: #03B3BB;
		}
		i{
			color: #BCBEC0;
			font-size: 13px;
		}
		.address{
			margin-left: 4px;
			color: #66666E;
			font-size: 14px;
			@include ellipsis-over(435px);
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
		font-size: #66666E;
		.position{
			margin-right: 18px;
			cursor: pointer;
			&:hover i{
				color: #03B3BB;
			}
			&:hover span{
				color: #03B3BB;
			}
		}
		i{
			margin-right: 6px;
			color: #BCBEC0;
		}
		.line{
			width:1px;
			height:10px;
			background: #66666E;
			margin: 6px 5px 0 6px;
		}
		.phone{
			line-height: 22px;
		}
	}
}
</style>
