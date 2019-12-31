<template>
  <div class="li-item">
  	<el-row class="li-item-header">
		  <el-col :span="12" class="header-col-left">
		  	<span class="create-time">{{item.createdAt}}</span>
		  	<span class="creater-by">
		  		<template v-if="tab === 'apply'">你发起的约面</template>
		  		<template v-if="tab === 'receive'">邀请你约面</template>
		  	</span>
		  </el-col>
		  <el-col :span="12" class="header-col-right">
		  	<div class="todo-status">【{{item.statusDesc}}】<span class="reddot" v-if="item.redDot"></span></div>
		  </el-col>
		</el-row>
		<el-row class="li-item-content">
		  <el-col :span="8" class="li-item-content-admin">
		  	<div>
			  	<div class="img-box">
			  		<el-popover
              placement="right"
              popper-class="admin-toast"
              trigger="click">
              <div class="box">
                <div class="describe">
                  “Hi，对我发布的职位感兴趣？<strong>用微信扫描二维码</strong>，和TA约聊吧。”
                </div>
                <div class="qr-code"> <img :src="app_qrcode" alt="avatar" /> </div>
              </div>
              <div slot="reference">
              	<div class="img-box-inner">
	                <img :src="item.avatar.smallUrl" alt="avatar" v-if="item.avatar" />
	              </div>
              </div>
            </el-popover>
			  	</div>
			  	<div class="infos">
			  		<div class="limit-line-height-one">
			  			<span class="user-name">{{item.recruiterRealname}}</span>
			  			<span class="user-degress">&nbsp;&nbsp;·&nbsp;&nbsp;{{item.recruiterPositionName}}</span>
			  		</div>
			  		<div class="company-name">{{item.companyShortname}}</div>
			  	</div>
		  	</div>
		  </el-col>
		  <el-col :span="8" class="li-item-content-position">
		  	<div>
		  		<router-link
		  			v-if="item.positionId"
		  			target="_blank"
		  			class="router-link" :to="{name: 'positionDetail', query: { positionId: item.positionId }}">
				  	<div class="limit-line-height-two">
				  		<span class="position-name">{{item.positionName}}</span>
				  		<img src="~IMAGES/tag_list_24hour.png" alt="" class="position-24hour" v-if="item.interviewType === 2">
				  		<span class="position-salary">{{item.positionEmolumentMin}}~{{item.positionEmolumentMax}}k<template>· 14薪</template></span>
				  	</div>
				  	<div class="position-adress">广州市天河区 | 10年以上 | 初中及以上</div>
			  	</router-link>
			  	<template v-else><span class="unchoose-position">未选择约面职位</span></template>
		  	</div>
		  </el-col>
		  <el-col :span="8" class="li-item-content-2">
		  	<div>
		  		<template v-if="[11, 21, 52, 53, 54, 55, 61].includes(item.status)">
		  			<router-link
		  				target="_blank"
		  				class="router-link"
		  				:to="{name: 'positionDetail', query: { positionId: item.positionId }}"
		  				v-if="item.positionId">
		  				查看职位
		  			</router-link>
		  			<el-popover
              placement="right"
              v-if="!item.positionId"
              popper-class="admin-toast"
              trigger="click">
              <div class="box">
                <div class="describe">
                  “Hi，对我发布的职位感兴趣？<strong>用微信扫描二维码</strong>，和TA约聊吧。”
                </div>
                <div class="qr-code"> <img :src="app_qrcode" alt="avatar" /> </div>
              </div>
              <div slot="reference">
              	<el-button type="text">查看招聘官</el-button>
              </div>
            </el-popover>
		  		</template>
		  		<el-button type="primary" v-if="[31].includes(item.status)" @click="bindClick(item)" class="func-btn btn-style">确认面试信息</el-button>
		  		<a v-if="[32, 41, 51, 58, 60].includes(item.status)" class="router-link btn-style" @click="bindClick(item)">查看面试</a>
		  		<template v-if="item.status === 12">
		  			<el-button type="text" @click="refuseInterview">暂不考虑</el-button>
		  			<el-button type="primary" @click="bindClick(item)" class="func-btn">接受约面</el-button>
		  		</template>
		  	</div>
		  </el-col>
		</el-row>
  </div>
</template>
<script>
import {
  refuseInterviewApi,
  getInterviewDetailApi
} from 'API/interview'
import {
  app_qrcode
} from 'IMAGES/image'
export default {
	props: {
    item: {
      type: Object,
      default: () => ({})
    },
    tab: {
    	type: String,
    	default: ''
    },
    rowIndex: {
    	type: Number,
    	default: 0
    }
  },
  data() {
  	return {
  		infos: {},
  		app_qrcode
  	}
  },
  methods: {
  	bindClick(item) {
  		this.infos = item
	    this.$emit('click', item)
	  },
	  getInterviewDetail() {
      return getInterviewDetailApi({interviewId: this.infos.interviewId}).then(({ data }) => data.data)
    },
	  refuseInterview() {
	  	refuseInterviewApi({id: this.infos.recruiterUid}).then(() => {
	  		this.getInterviewDetail().then(res => {
          this.list[this.item[this.rowIndex]].status = res.status
          this.list[this.item[this.rowIndex]].statusDesc = res.statusDesc
        })
	  	})
	  }
  }
}
</script>
<style lang="scss" scoped>
.li-item {
	padding: 26px 40px;
	transition: .2s background;
	position: relative;
	&:before{
		position: absolute;
		left: 40px;
		right: 40px;
		bottom: 0;
		border-bottom: 1px dashed $border-color-1;
		height: 1px;
		content: ''
	};
	&:hover{
		background: #f8fafa;
	};
	.header-col-left{
		text-align: left;
	}
	.header-col-right{
		text-align: right;
	}
	.li-item-header{
		font-size:12px;
		font-weight:400;
		color:$font-color-9;
		line-height:14px;
		padding-bottom: 18px;
	}
	.create-time {
		font-size:12px;
		font-weight:400;
		color:$font-color-9;
	}
	.creater-by {
		font-size:12px;
		font-weight:400;
		color:$font-color-9;
		line-height:14px;
		padding-left: 16px;
	}
	.todo-status {
		display: inline-block;
		position: relative;
	}
	.reddot{
		width:6px;
		height:6px;
		background:rgba(244,83,34,1);
		border-radius: 50%;
		position: absolute;
		right: -2px;
		top: -4px;
		display: block;
	}
	.li-item-content{
		height: 46px;
		line-height: 46px;
	}
	.li-item-content-admin{
		text-align: left;
		> div {
			display: inline-block;
			vertical-align: middle;
		}
	}
	.li-item-content-position{
		text-align: left;
		> div {
			display: inline-block;
			vertical-align: middle;
		}
	}
	.li-item-content-2{
		text-align: right;
		> div {
			display: inline-block;
			vertical-align: middle;
		}
	}
	.img-box{
		height: 46px;
		width: 46px;
		border-radius: 50%;
		display: inline-block;
	}
	.img-box-inner{
		display: inline-block;
		@include img-radius(46px, 46px, 23px);
	}
	.infos{
		position: absolute;
		left: 0;
		top: 50%;
		padding-left: 62px;
		transform: translateY(-50%);
	}
	.limit-line-height-one {
		line-height:16px;
	}
	.limit-line-height-two {
		line-height:16px;
		position: relative;
		top: -3px;
	}
	.position-name {
		font-size:16px;
		font-weight:400;
		color:$font-color-3;
		line-height:16px;
		display: inline-block;
		@include ellipsis-over(128px);
		vertical-align: middle;
	}
	.unchoose-position {
		font-size:14px;
		color:$font-color-11;
	}
	.position-salary {
		font-size:16px;
		font-weight:500;
		color:$sub-color-1;
		line-height:16px;
		padding-left: 8px;
		display: inline-block;
		vertical-align: middle;
	}
	.position-adress {
		font-size:12px;
		font-weight:400;
		color:$font-color-6;
		line-height:12px;
		padding-top: 12px;
		position: relative;
		top: -1px;
	}
	.company-name{
		font-size:14px;
		font-weight:400;
		color:$font-color-6;
		line-height:14px;
		padding-top: 12px;
	}
	.user-name {
		font-size:16px;
		color:$font-color-3;
		display: inline-block;
		@include ellipsis-over(96px);
		vertical-align: middle;
	}
	.user-degress {
		font-size:12px;
		color:$font-color-9;
		display: inline-block;
		@include ellipsis-over(112px);
		vertical-align: middle;
	}
	.router-link{
		color: $nav-color-hover
	}
	.func-btn {
		width:120px;
		height:40px;
		border-radius:4px;
		margin-left: 30px;
	}
	.btn-style {
		cursor: pointer;
	}
	.el-popover__reference{
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}
	.position-24hour {
    height: 16px;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin: 0 8px 0 6px;
  }
}
</style>
