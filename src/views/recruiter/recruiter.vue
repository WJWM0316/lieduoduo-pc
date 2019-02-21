<template>
	<div id="recruiter" @scroll="handleScroll">
		<div class="recruiter_cont">
			<div class="header_warp">
					<div class="header" :class="searchBarFixed === true ? 'isFixed' :''">
						<h2 class="title">职位管理</h2>
			      <div class="addJob" size="small" type="primary" @click="todoAction('addJob')">发布职位</div>
						<ul class="recruiter_classify">
							<li class="" v-for="item,index in recruiterList" @click="catchRecruiter(index)" :class="{'cur':item.active}">{{item.name}}({{item.total}})</li>
						</ul>
					</div>
			</div>
			
			<!-- <div class="job_classify_wrap">
				<ul class="job_classify">
					<li class="" v-for="item,index in jobNameList" @click="catchJob(index)" :class="{'slet':item.active}">{{item.positionName}}</li>
				</ul>
			</div> -->
	  	
	  	<ul class="job_list" v-if="jobList.length>0">
	  		<li class="job_blo" v-for="item,index in jobList">
	  			<div class="blo_left">
	  				<div class="job_name">{{item.positionName}} {{item.emolumentMin}}k-{{item.emolumentMax}}k</div>
	  				<div class="job_info">
	  					<span v-if="item.city">{{item.city}}{{item.district}}</span>
	  					<span v-if="item.workExperience">{{item.workExperienceName}}</span>
	  					<span v-if="item.workExperienceName">{{item.educationName}}</span>
	  				</div>
	  			</div>
	  			<div class="blo_status" v-if="form.status !=='1,2'" :class="form.status === '3' ? 'audit' :''">{{navSelectName}}</div>
	  			<div class="blo_center">
	  				<!-- <div class="center_status">审核中</div>
	  				<div class="center_status">审核中</div>
	  				<div class="center_status">审核中</div> -->
	  				<div class="center_time">发布于 {{item.createdAt}}</div>
	  			</div>
	  			<div class="blo_right">
	  				<span class="job_op" @click="openShare(index)" v-if="form.status === '1,2'">分享</span>
	  				<span class="job_op" @click="opJob('close',item.id)" v-if="item.isOnline===1">关闭</span>
	  				<span class="job_op" @click="opJob('open',item.id)" v-if="item.isOnline===2 && form.status === '0,1'">开放</span>
	  				<span class="job_op" @click="todoAction('editJob',item.id)" >编辑</span>
	  			</div>
	  		</li>
  			<div class="toTop" @click="toTop">
		  		<img class="arrows" src="../../assets/images/open.png"/>
  			</div>
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

		<div class="service"  @mouseover="isService = true" @mouseout="isService = false">
			<img class="service_icon" src="../../assets/images/service.png"/>
			客服咨询

			<div class="service_pop" v-if="isService">
				<div class="pop_tit">联系我们</div>
				<div class="pop_cont">
		  		<h3 class="pop_text">请拨打全国咨询热线</h3>
		  		<p class="pop_text2">020-6127988</p>
		  		<img class="pop_code" src="../../assets/images/gzh.png"/>
		  		<p class="pop_text3">猎多多公众号</p>
		  		<p class="pop_text4">微信扫描二维码，关注官方公众号</p>
				</div>
				<div class="triangle_border_right">
				</div>
			</div>
		</div>
		

		<div class="pop" v-if="pop.isShow">
		  <div class="share" v-if="pop.type==='share'">
		  	<div class="share_blo">
		  		<div class="pop_tit">分享职位</div>
		  		<img class="clo" src="../../assets/images/clo.png" @click="todoAction('cloPop')">
		  		<p class="share_txt" >使用「微信」扫描小程序码分享职位</p>
		  		<img class="code" :src="shareSelectItem.positionQrCode" >
		  		<p class="share_help_text"  @mouseover="isHelpShow = true" @mouseout="isHelpShow = false">分享帮助<span>?</span></p>
		  	</div>
	      
	      <div class="share_blo share_help" v-if="isHelpShow">
	      	<div class="pop_tit">分享帮助</div>
	      	<p class="share_txt">扫码 > 点击分享按钮</p>
	      	<img class="help_icon" src="../../assets/images/pic_share_help.png" >
	      	<span class="triangle_border_left" ></span>
	      </div>
		  </div>

  		<div class="messageBox" v-if="pop.type==='openJob'">
    		<img class="clo" src="../../assets/images/clo.png" @click="todoAction('cloPop')">
  			<div class="mb_main">
  				<div class="mb_head">
  					<img class="hint" src="../../assets/images/exclamation-circle.png">
  					<h3 class="mb_tit">二次确认提醒</h3>
  				</div>
  				<div class="mb_cont">
  					<p>确定重新开放该职位吗？</p>
  				</div>
  			</div>
  			<div class="btns">
  				<div class="btn cancel" @click="todoAction('cloPop')">取消</div>
  				<div class="btn true" @click="todoAction('openJob')">确定</div>
  			</div>
  		</div>

  		<div class="messageBox" v-if="pop.type==='closeJob'">
    		<img class="clo" src="../../assets/images/clo.png" @click="todoAction('cloPop')">
  			<div class="mb_main">
  				<div class="mb_head">
  					<img class="hint" src="../../assets/images/exclamation-circle.png">
  					<h3 class="mb_tit">确认提醒</h3>
  				</div>
  				<div class="mb_cont">
  					<p>关闭职位后，此职位不可被就职者查看和发起约面， 确认关闭吗？</p>
  				</div>
  			</div>
  			<div class="btns">
  				<div class="btn cancel" @click="todoAction('cloPop')">取消</div>
  				<div class="btn true" @click="todoAction('closeJob')">确定</div>
  			</div>
  		</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { uploadApi, waitApi, getQrCodeApi, getMyInfoApi } from '../../api/auth'
	import { getListApi, getMyListApi, getJobNameListApi, closePositionApi, openPositionApi, editPositionApi, getStatusTotalApi  } from '../../api/position'

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
		// close关闭，open 开放，审核通过，audit 审核中，fail 审核失败
		recruiterList = [
			{
				name : '招聘中',
				status: '1,2',
				total: 0,
				active: true
			},{
				name : '已关闭',
				status: '0,1',
				total: 0,
				active: false
			},{
				name : '审核中',
				status: '3',
				total: 0,
				active: false
			},{
				name : '未过审',
				status: '4',
				total: 0,
				active: false
			}
		]
		jobList = []     // 工作列表
		jobNameList = [] // 职位分类列表
		// 文件上传
		pop = {
	  	isShow: false,
	  	type: 'share'
	  }

		form = {
		  page: 1,
			recruiter: 5,
			name: '', // 职位名称
			status: '1,2', // 状态
			is_online: 1,
		}

		searchBarFixed = false // nav是否置顶
		statusTotal = {}   //  
		uid = null
		isHelpShow = false
		shareSelectItem = {}    //分享选中
		isService = false  
		navSelectName =  ''  //  nav选中文字
		jobSelectId = null  // 职位开启关闭选中
		opJob (type, id) {
			this.pop.isShow = true
			if(type==='close'){
				this.pop.type = 'closeJob'
			}else if( type==='open'){
				this.pop.type = 'openJob'
			}

			this.jobSelectId = id
		}

		handleSearch() {
			this.form.page = 1
		  this.setPathQuery(this.form)
		}

		mounted () {
  		window.addEventListener('scroll', this.handleScroll)
		}


	  init() {
    	this.form = Object.assign(this.form, this.$route.query || {})
	    this.userInfo = this.$store.state.userInfo
	    console.log('==>',this.userInfo)

	    this.getPositionList()
	    this.getJobNameList()
	    this.getMyInfo({
	    }).then(res=>{
	    	this.getStatusTotal()
	    })
	  }

	  todoAction(type, id) {
	  	console.log(type)
	    switch(type) {
	      case 'cloPop':
	        this.pop = {
	        	isShow: false,
	  				type: ''
	        }
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
	       	closePositionApi({id: this.jobSelectId}).then(res=>{
	       			this.$message({
	       		    type: 'success',
	       		    message: '成功!'
	       		  })

	       			this.pop = {
	       				isShow: false,
	       				type: ''
	       			}
	       			this.getStatusTotal()
	       			this.getPositionList()
	       	}).catch(e => {
            this.$message.error(e.data.msg)
	       	})
	        break
	      case 'openJob':
	       	openPositionApi({id: this.jobSelectId}).then(res=>{
	       			this.$message({
	       		    type: 'success',
	       		    message: '成功!'
	       		  })
	       		  this.pop = {
	       		  	isShow: false,
	       		  	type: ''
	       		  }
	       			this.getStatusTotal()
	       			this.getPositionList()
	       	}).catch(e => {
            this.$message.error(e.data.msg)
	       	})
	        break
	      default:
	        break
	    }
	  }

		handleScroll(e){
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

			if(scrollTop>32){
				this.searchBarFixed = true
			}else {
				this.searchBarFixed = false
			}
		}
	  /**
	   * 初始化表单、分页页面数据
	   */
	  getStatusTotal(){
	  	getStatusTotalApi({
	  		uid: this.uid
	  	}).then(res => {
	  		this.statusTotal = res.data.data
	  		this.recruiterList.map(item=>{
	  			if(item.name === '招聘中'){
	  				item.total = res.data.data.online
	  			}
	  			if(item.name === '已关闭'){
	  				item.total = res.data.data.close
	  			}
	  			if(item.name === '审核中'){
	  				item.total = res.data.data.audit
	  			}
	  			if(item.name === '未过审'){
	  				item.total = res.data.data.fail
	  			}
	  		})
	  	})
	  }


	  getMyInfo(){
	  	return getMyInfoApi().then(res=>{
	  		this.uid = res.data.data.uid
	  		console.log(res.data.data)
	  	}).catch(e => {
	  		console.log(e)
        this.$message.error(e.data.msg)
     	})
	  }

	  getPositionList ({ page } = {}) {
	  	if(page){
	  		this.form.page = page || 1
	  	}

	  	let data = {
	  		count: this.pageInfo.count,
	  		recruiter: 5,
	  		...this.form
	  	}
	  	console.log(data.page)


	  	getMyListApi(data).then(res=>{
	  		let meta = res.data.meta
	  		this.jobList = [...res.data.data]
	  		this.pageInfo.totalPage = meta.lastPage
	  		this.pageInfo.total = meta.total
	  	}).catch(e => {
        this.$message.error(e.data.msg)
     	})
	  }

	  // nav状态列表
	  getJobNameList () {
	  	let data = {
	  		page: 1,
	  		count: 20,
	  		name: ''
	  	}

	  	getJobNameListApi(data).then(res=>{
	  		res.data.data.map(item=>{
	  			item.active = false
	  		})

	  		res.data.data.unshift({
	  			positionName:'全部',
	  			active: true
	  		})
	  		this.jobNameList = res.data.data
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
	  			if(index !== 0){
	  				that.form.is_online = 2
	  				that.navSelectName = item.name
		  			that.form.status = item.status
	  			}else {
	  				that.navSelectName = ''
	  				that.form.status = '1,2'
	  				that.form.is_online = 1
	  			}
	  			that.getPositionList({page:1})
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

	  			that.getPositionList({page:1})
	  		}else {
	  			item.active = false
	  		}
	  	})
	  }

	  toTop(){
	  	document.documentElement.scrollTop=0;
	  }

	  openShare(index){
      console.log('share',index)
      this.pop = {
      	isShow: true,
				type: 'share'
      }

      this.shareSelectItem = this.jobList[index]
	  }

	}
</script>
<style lang="less">
#recruiter {
	padding-top: 92px;
	padding-bottom: 32px;
	.messageBox {
		width:432px;
		height:192px;
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
		border-radius:4px;
		position: absolute;
		left: 50%;
		top: 50%;
		padding: 32px 32px;
		box-sizing: border-box;
  	transform: translate(-50%, -50%);
		.clo {
			width:10px;
			height:10px;
			position: absolute;
			right: 16px;
			top: 16px;
		}
		.mb_main {

			.mb_head {
				height: 24px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 8px;
				.hint {
					width:24px;
					height:24px;
					border-radius: 50%;
					margin-right: 16px;
				}
				.mb_tit {
					font-size:16px;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(53,64,72,1);
					line-height:24px;
				}
			}
			.mb_cont {
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				line-height:22px;
				text-align: left;
				p {
					color:rgba(102,102,102,1);
				}
			}
		}
		.btns {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin-top: 28px;
			.btn {
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(53,64,72,1);
				line-height:32px;
				text-align: center;
			}
			.cancel {
				width:80px;
				height:32px;
				background:rgba(255,255,255,1);
				border-radius:16px;
				border:1px solid rgba(220,220,220,1);
				color:rgba(53,64,72,1);

			}
			.true {
				width:80px;
				height:32px;
				background:rgba(101,39,145,1);
				border-radius:16px;
				color:rgba(255,255,255,1);
				margin-left: 16px;
			}
		}
	}
	.pop {
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.8);
		width: 100%;
		height: 100%;
		z-index: 100;
		.share {
			.share_blo {
				position: absolute;
				right: 50%;
				top: 50%;
				z-index: 6;
				width:300px;
				height:396px;
				margin: -200px -150px 0 0 ;
				background:rgba(255,255,255,1);
				box-shadow:0px -2px 4px 0px rgba(101,39,145,0.1),0px 2px 4px 0px rgba(132,82,167,0.1);
				border-radius:4px;
				&.share_help {
					margin-right: -470px;
				}
				.pop_tit {
					font-size:20px;
					font-family:PingFang-SC-Bold;
					font-weight:bold;
					color:rgba(40,40,40,1);
					line-height:26px;
					margin: 32px 0 24px 0;
				}
				.clo {
					width:10px;
					height:10px;
					position: absolute;
					right: 16px;
					top: 16px;
				}
				.share_txt {

				}
				.code {
					width:140px;
					height:140px;
					background:rgba(255,255,255,1);
					border-radius:70px;
					border:1px solid rgba(239,233,244,1);
					margin: 40px 0 66px 0;
				}
				.share_help_text {
					font-size:14px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(101,39,145,1);
					line-height:22px;
					text-align: center;
					cursor: pointer;
				}
				.help_icon {
					width:171px;
					height:172px;
				}
			}
		}
	}
	.recruiter_cont {
		width: 960px;
		margin: 0 auto;
		background: #ffffff;
	}
	.header_warp {
		height: 160px;
		position: relative;
		width: 960px;
		box-sizing: border-box;
	}
	.header {
		height: 160px;
		padding: 36px  56px 0 56px;
		position: relative;
		width: 960px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
		&.isFixed{
	    position:fixed;
	    background-color:#Fff;
	    top: 62px;
	    z-index:10;
	  }
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
			line-height: 40px;
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
			cursor: pointer;
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
			display: flex;
			flex-direction: row;
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
		    white-space: nowrap;
				&.slet {
					background:rgba(132,82,167,1);
					font-family:PingFang-SC-Medium;
					color:rgba(255,255,255,1);
				}
			}
		}
	}
	.job_list {
		position: relative;
		.job_blo {
			height:120px;
			padding: 33px 56px;
			margin: 0 auto;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1px solid #F5F4F7;
			.blo_left {
				width: 240px;
				text-align: left;
				.job_name {
					font-size:16px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(53,64,72,1);
					margin-bottom: 8px;
					text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;
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
			.blo_status {
				width: 120px;
				text-align: center;
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(146,146,146,1);
				&.audit {
					color:#FF7F4C;
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
		.toTop {
			position: absolute;
			right: -90px;
			bottom: 10px;
			width: 56px;
			height: 56px;
			background:rgba(239,233,244,1);
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			.arrows {
				width: 16px;
				height: 18px;
				display: block;
				transform:rotate(180deg);
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
		top: 50%;
		height: 120px;
		margin-top: -60px;
		right: 0;
		width:36px;
		height:120px;
		background:rgba(239,233,244,1);
		border-radius:4px 0px 0px 4px;
		box-sizing: border-box;
		padding: 10px;
		cursor: pointer;
		.service_icon {
			width:16px;
			height:16px;
			margin-bottom: 8px;
		}
		.service_pop {
			width:300px;
			height:440px;
			background:rgba(255,255,255,1);
			box-shadow:0px 8px 12px 0px rgba(48,50,51,0.1);
			border-radius:4px;
			position: absolute;
			left: -320px;
			top: 50%;
			margin-top: -220px;
			.pop_tit {
				width:300px;
				height:58px;
				line-height:58px;
				background:rgba(101,39,145,1);
				border-radius:4px 4px 0px 0px;
				font-size:20px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			.pop_cont {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.pop_code {
					width: 112px;
					height: 112px;
					margin: 48px auto 10px auto;
				}
				.pop_text {
					font-size:20px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(98,98,98,1);
					margin: 48px 0 12px 0;
				}
				.pop_text2 {
					font-size:24px;
					font-family:DINAlternate-Bold;
					font-weight:bold;
					color:rgba(40,40,40,1);
				}
				.pop_text3 {
					font-size:18px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(53,64,72,1);
					margin-bottom: 24px;
				}
				.pop_text4 {
					font-size:14px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(98,98,98,1);
				}
			}
		}
	}

	.triangle_border_left{
	    width: 0;
	    height: 0;
	    border-width: 8px 10px 8px 0;
	    border-style: solid;
	    border-color: transparent #fff transparent transparent;
	    position: absolute;
	    left: -8px;
	    top: 50%;
	    margin-top: -20px;
	}
}
</style>