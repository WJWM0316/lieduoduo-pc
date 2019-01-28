<template>
	<div id="recruiter">
		<div class="recruiter_cont">
			<div class="header">
				<h2 class="title">职位管理</h2>
	      <el-button class="addJob" size="small" type="primary" @click="todoAction('addJob')">发布职位</el-button>
				<ul class="recruiter_classify">
					<li class="" v-for="item,index in recruiterList" @click="catchRecruiter(index)" :class="{'cur':item.active}">{{item.name}}</li>
				</ul>
			</div>
			<div class="job_classify_wrap">
				<ul class="job_classify">
					<li class="" v-for="item,index in jobNameList" @click="catchJob(index)" :class="{'slet':item.active}">{{item.positionName}}</li>
				</ul>
			</div>
	  	
	  	<ul class="job_list" v-if="jobList.length>0">
	  		<li class="job_blo" v-for="item,index in jobList">
	  			<div class="blo_left">
	  				<div class="job_name">{{item.positionName}}</div>
	  				<div class="job_info">
	  					<span v-if="item.address">{{item.address}}</span>
	  					<span v-if="item.workExperience">{{item.workExperience}}年</span>
	  					<span v-if="item.workExperienceName">{{item.workExperienceName}}</span>
	  				</div>
	  			</div>
	  			<div class="blo_center">
	  				<!-- <div class="center_status">审核中</div>
	  				<div class="center_status">审核中</div>
	  				<div class="center_status">审核中</div> -->
	  				<div class="center_time">发布于 {{item.createdAt}}</div>
	  			</div>
	  			<div class="blo_right">
	  				<span class="job_op" @click="todoAction('share')">分享</span>
	  				<span class="job_op" @click="todoAction('openJob',item.id)" v-if="item.isOnline===2">关闭</span>
	  				<span class="job_op" @click="todoAction('closeJob',item.id)" v-else>开启</span>
	  				<span class="job_op" @click="todoAction('editJob',item.id)">编辑</span>
	  			</div>
	  		</li>
	  	</ul>

	  	<div class="job_cont_none" v-else>没有数据</div>
		</div>
		<el-pagination
			class="pagination"
		  background
		  layout="prev, pager, next, slot"
		  :total="pageInfo.total"
		  :page-size="pageInfo.count"
		  prev-text="上一页"
		  next-text="下一页"
		  :current-page="pageInfo.page"
		  v-if="pageInfo.totalPage > pageInfo.page"
		  @current-change="handleCurrentPageChange">
		  <span class="total">共{{ Math.ceil(pageInfo.totalPage) }}页, {{pageInfo.total}}条记录</span>
		</el-pagination>

		<div class="service">
			客服咨询
		</div>


		<div class="pop" v-if="pop.isShow">
		  <div class="share" v-if="pop.type==='share'">
		  	<div class="share_blo">
		  		<div class="pop_tit">分享职位</div>
		  		<img class="clo" src="" >
		  		<p>使用「微信」扫描小程序码分享职位</p>
		  		<img class="code" src="" >
		  		<p @click="clickShareHelp">分享帮助<span>?</span></p>
		  	</div>
	      
	      <div class="share_blo">
	      	<div class="pop_tit">分享帮助</div>
	      	<p>扫码 > 点击分享按钮</p>
	      	<img class="code" src="" >
	      </div>

		  </div>
		</div>
	</div>

	
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { uploadApi, waitApi, getQrCodeApi } from '../../api/auth'
	import { getListApi, getJobNameListApi, closePositionApi, openPositionApi, editPositionApi } from '../../api/position'
	@Component({
	  name: 'lighthouse-list',
	  methods: {
	  },
	  computed: {},
	  watch: {
	    '$route': {
	      handler() {
	        this.init()
	      },
	      immediate: true
	    }
	  },
	  components: {}
	})
	export default class CourseList extends Vue {
		userInfo = {}

		pageInfo = {
		  page: 1,
		  count: 20,
		  totalPage: 0,
		  total: 0
		}

		recruiterList = [
			{
				name : '招聘中（1）',
				status: 1,
				active: true
			},{
				name : '已关闭（1）',
				status: 0,
				active: false
			},{
				name : '审核中（1）',
				status: 2,
				active: false
			},{
				name : '未过审（1）',
				status: 3,
				active: false
			}
		]
		jobList = []
		jobNameList = []
		// 文件上传
		pop = {
	  	isShow: false,
	  	type: 'share'
	  }

		form = {
			recruiter: 5,
			name: '', // 职位名称
			status: '' // 状态
		}
	  /**
	   * 初始化表单、分页页面数据
	   */
	  init() {
    	this.form = Object.assign(this.form, this.$route.query || {})
	    this.userInfo = this.$store.state.userInfo
	    console.log('==>',this.userInfo)
	    this.getPositionList()
	    this.getJobNameList()
	  }

	  getPositionList ({ page } = {}) {
	  	let data = {
	  		page: page || this.form.page || 1,
	  		count: this.pageInfo.count,
	  		recruiter: 5,
	  		...this.form
	  	}

	  	console.log(data)
	  	getListApi(data).then(res=>{
	  		console.log(res)

	  		let meta = res.data.meta
	  		this.jobList = res.data.data

	  		this.pageInfo.totalPage = meta.lastPage
	  		this.pageInfo.total = meta.total
	  	})
	  }

	  getJobNameList () {
	  	let data = {
	  		page: 1,
	  		count: 20,
	  		name: ''
	  	}

	  	getJobNameListApi(data).then(res=>{
	  		// let meta = res.data.meta
	  		res.data.data.map(item=>{
	  			item.active = false
	  		})

	  		res.data.data.unshift({
	  			positionName:'全部',
	  			active: true
	  		})
	  		this.jobNameList = res.data.data
	  		console.log('==>',res.data.data)
	  	})
	  }

	  handleCurrentPageChange(page){
	  	this.setPathQuery({page: page})
	  }

	  catchRecruiter(index){
	  	let that = this
	  	this.recruiterList.map((item,idx) =>{
	  		if(idx === index){
	  			item.active = true
	  			that.form.status = item.status
	  			that.getPositionList()
	  		}else {
	  			item.active = false
	  		}
	  	})
	  }

	  catchJob(index){
	  	let that = this
	  	this.jobNameList.map((item,idx) =>{
	  		if(idx === index){
	  			item.active = !item.active
	  			that.form.name = item.positionName !== '全部' ? item.positionName : ''

	  			that.getPositionList()
	  		}else {
	  			item.active = false
	  		}
	  	})
	  }

	  todoAction(type, id) {
	    switch(type) {
	      case 'share':
	        console.log('share')
	        break
	      case 'addJob':
		      this.$router.push(
		        { 
		        	name: 'postJob',
		        	query: {
		        		type: 'add'
		        	}
		        }
		      )
	        break
	      case 'editJob':
	        this.$router.push(
	          { 
	          	name: 'postJob',
	          	query: {
	          		type: 'edit',
	          		id: id
	          	}
	          }
	        )
	        break
	      case 'closeJob':
		      if(!id){
		        return
		      }
	       	closePositionApi({id: id}).then(res=>{
	       		console.log(res)
	       	}).catch(e => {
            that.$message.error(e.data.msg)
	       	})
	        break
	      case 'openJob':
		      if(!id){
		        return
		      }
	       	openPositionApi({id: id}).then(res=>{
	       		console.log(res)
	       	}).catch(e => {
            that.$message.error(e.data.msg)
	       	})
	        break
	      default:
	        break
	    }
	  }
	}
</script>
<style lang="less">
#recruiter {
	padding-top: 92px;
	padding-bottom: 32px;
	.recruiter_cont {
		width: 960px;
		margin: 0 auto;
		background: #ffffff;
	}
	.header {
		height: 160px;
		padding: 36px  56px 0 56px;
		position: relative;
		box-sizing: border-box;
		.title {
			font-size:24px;
			font-family:PingFang-SC-Bold;
			font-weight:bold;
			color:rgba(40,40,40,1);
			text-align: left;
		}
		.addJob {
			width:124px;
			height:40px;
			background:rgba(101,39,145,1);
			border-radius:20px;
			position: absolute;
			right: 56px;
			top: 36px;
			font-size:16px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			box-sizing: border-box;
		}
		.recruiter_classify {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			position: absolute;
			bottom: 16px;
			li {
				font-size:16px;
				font-family:PingFang-SC-Bold;
				font-weight:bold;
				color:rgba(98,98,98,1);
				line-height:22px;
				margin-right: 40px;
				&.cur {
					color:rgba(101,39,145,1);
				}
			}
		}
	}
	.job_classify_wrap {
		width:960px;
		.job_classify {
			width:960px;
			height:62px;
			background:rgba(248,248,248,1);
			padding: 20px 56px;
			//display: flex;
			// display: flex;
			// flex-direction: row;
			// justify-content: flex-start;
			// align-items: center;	
			box-sizing: border-box;
			overflow-x: scroll;
			li {
				padding: 1px 14px;
				font-size:14px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(40,40,40,1);
				display: block;
				float: left;
				&.slet {
					background:rgba(132,82,167,1);
					font-family:PingFang-SC-Medium;
					color:rgba(255,255,255,1);
				}
			}
		}
	}
	.job_list {
		.job_blo {
			height:120px;
			padding: 33px 56px;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			.blo_left {
				width: 240px;
				text-align: left;
				.job_name {
					font-size:16px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(53,64,72,1);
					margin-bottom: 8px;
				}
				.job_info {
					span {
						font-size:12px;
						font-family:PingFang-SC-Regular;
						font-weight:400;
						color:rgba(98,98,98,1);
						padding: 0 6px;
						margin-right: 8px;
						background:rgba(248,248,248,1);
						border-radius:2px;
						display: inline-block;
					}
				}
			}
			.blo_center {
				flex: 1;
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(146,146,146,1);
			}
			.blo_right {
				.job_op {
					font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(101,39,145,1);
					margin-right: 24px;
				}
			}
		}
	}
	.job_cont_none {
		height: 500px;
		line-height: 500px;
		font-size: 18px;
	}
	.pagination {
		height: 102px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		.el-pager {

		}
		.number {
			height: 30px;
			box-sizing: border-box;
			border:1px solid rgba(220,220,220,1);
			color:rgba(101,39,145,1);
			background: #fff;
			&.active {
				color:rgba(102,102,102,1);
				background: none;
				border: none;
			}
		}
		span {
			height: 30px;
			padding: 0px 11px;
			line-height: 30px;
			box-sizing: border-box;
		}
		.total {
			font-size:12px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(102,102,102,1);
		}
		button {
				height: 30px;
				box-sizing: border-box;
			span {
				height: 30px;
				color:rgba(101,39,145,1);
				background: #fff;
				border:1px solid rgba(220,220,220,1);
				box-sizing: border-box;
			}
		}
	}
	
	.service {
		font-size:16px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(101,39,145,1);
		line-height:18px;
		position: fixed;
		right: 0;
		width:36px;
		height:120px;
		background:rgba(239,233,244,1);
		border-radius:4px 0px 0px 4px;
		box-sizing: border-box;
		padding: 10px;
	}
}
</style>