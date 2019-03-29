<template>
	<div id="candidate">
		<div class="main_top_warp" :class="navBarFixed? 'isFixed' :''">
				<div class="main_top" > 
					<div class="topBlo topStatusBlo borright " :class="{'cur':navType==='searchBrowseMyself'}" @click="changeNav('searchBrowseMyself')">
						<img class="preview" src="../../assets/images/preview.png" v-if="navType === 'searchBrowseMyself'"  />
						<img class="preview" src="../../assets/images/preview_off.png" v-else />
						看过我的({{navNum.browseMyselfCount || 0}})
					</div>
					<div class="topBlo topStatusBlo borleft "  :class="{'cur':navType==='searchCollect'}" @click="changeNav('searchCollect')">
						<span class="border"></span>
						<img class="like" src="../../assets/images/like_no.png" v-if="navType === 'searchCollect'" />
						<img class="like" src="../../assets/images/like2.png" v-else />
						对我感兴趣({{navNum.collectMyselfCount || 0}})
					</div>
					<div class="topBlo topStatusBlo2"  :class="{'cur':navType==='searchMyCollect'}" @click="changeNav('searchMyCollect')">
						<img class="like" src="../../assets/images/like_no.png" v-if="navType === 'searchMyCollect'" />
						<img class="like" src="../../assets/images/like2.png" v-else />
						我感兴趣的({{navNum.myCollectCount || 0}})
					</div>

					<div class="screen_cont">
						<div class="topSelected" @click="screenList(1)" :class="{'selected':isShowScreen}" v-if="isShowScreen">
							<img class="screen_icon" src="../../assets/images/screen.png" v-if="isShowScreen" />
							<img class="screen_icon" src="../../assets/images/screen_off.png" v-else />
							{{isShowScreen ? '清除筛选' :'高级筛选' }}
						</div>

						<div class="topSelected" @click="screenList(1)" :class="{'selected':selectedScreen.length>0}" v-else>
							<img class="screen_icon" src="../../assets/images/screen.png" v-if="selectedScreen.length>0" />
							<img class="screen_icon" src="../../assets/images/screen_off.png" v-else />
							{{selectedScreen.length>0 ? '清除筛选' :'高级筛选' }}
						</div>


						<div class="topSelected2" @click="screenList(2)">
							<img class="screen_icon" src="../../assets/images/arrows2.png" v-if="isShowScreen" />
							<img class="screen_icon" src="../../assets/images/arrows2.png" v-else />
						</div>
						<div class="screenBox" v-if="isShowScreen">
							<div class="triangle_border_top"></div>
							<div class="screen_tit">{{getPopName()}}</div>
							<div class="lable_list" >
								<span v-for="item,index in positionTypeList" @click="labelClick(index)" :class="{'cur':item.active}" > {{item.name}}</span>
							</div>

							<div class="screen_btns">
								<div class="screen_btn true" @click="screenOp('confirm')">确定</div>
								<div class="screen_btn" @click="screenOp('cancel')">取消</div>
							</div>
						</div>
					</div>
				</div>
		</div>
		<div class="main_top_warp" v-if="navBarFixed"></div>
		<div class="recruiter_main">
			
			<div id="box" class="main_cont" v-if="candidateList.length>0">
				<div class="candidate_blo" v-for="item,index in candidateList" >
					<div class="bloTop">
						<div class="timer">{{item.viewAt}}</div>
						<div class="topText" v-if="navType === 'searchBrowseMyself'">看过我的{{item.positionInfo && item.positionInfo.positionName ?'职位':'主页'}}</div>
						<div class="topText" v-if="navType === 'searchCollect'">对我{{item.positionInfo && item.positionInfo.positionName ?'的职位':''}}感兴趣</div>
						<div class="topText" v-if="navType === 'searchMyCollect'">对Ta感兴趣</div>

						<div class="topText topText2">{{item.positionInfo.area}} <span v-if="item.positionInfo.positionName">| {{item.positionInfo.positionName}}</span><span v-if="item.positionInfo.emolument"> | {{item.positionInfo.emolument}}</span></div>
					</div>
					<div class="bloCont">
						<div class="cont_left">
							<div class="leftMsg">
								<div class="userBaseInfo">
									
									<img class="gender" src="../../assets/images/girl.png" v-if="item.gender===1" />
									<img class="gender" src="../../assets/images/boy.png" v-else />
									<img class="userIcon" :src="item.avatar.middleUrl" />
									<div class="infoRight">
										<div class="infoName textEllipsis">{{item.name}}</div>
										<ul class="userLabel">
											<li class="" v-if="item.workAge">{{item.workAge}}年工作经验</li>
											<li class="" v-else>暂无工作经验</li>
											<li class="" v-if="item.age">{{item.age}}岁</li>
											<li class="" v-else>暂无年龄</li>
											<li class="" v-if="item.degreeDesc">{{item.degreeDesc}}</li>
											<li class="" v-else>暂无学历</li>
										</ul>
									</div>
								</div>
								<div class="intention" v-if="item.expects.length>0">求职意向:<span class="intentionText intentionTextWidth textEllipsis">{{item.expects[0].city}} </span> ·
									<span class="intentionText intentionTextWidth2 textEllipsis">{{item.expects[0].position}}</span> ·
									<span class="intentionText2">{{item.expects[0].salaryFloor}}k~{{item.expects[0].salaryCeil}}k</span>
								</div>
								<div class="intention" v-else>求职意向:暂无求职意向</div>
							</div>
							<div class="bloExperience workExperience">
								<div class="experienceTitle ">最近工作经历</div>
								<div class="experienceText textEllipsis" v-if="item.lastCompanyName">{{item.lastCompanyName}}</div>
								<div class="experienceText textEllipsis" v-if="item.lastPosition">{{item.lastPosition}}</div>
								<div class="experienceText textEllipsis" v-if="item.lastCompanyName.length<1">暂无工作经历</div>
							</div>
							<div class="bloExperience educationExperience">
								<div class="experienceTitle">最近教育经历</div>
								<div class="experienceText textEllipsis" v-if="item.education && item.education.school">{{item.education.school}}</div>
								<div class="experienceText textEllipsis" v-else>暂无教育经历</div>

								<div class="experienceText textEllipsis" v-if="item.education && item.education.major">{{item.education.major}}</div>
							</div>
						</div>
						
						<div class="userOp">
							<div class="like_user" @click="ownerOp(true,item.uid)" v-if="item.interested">
								<img class="like" src="../../assets/images/like.png"/>
								取消感兴趣
							</div>
							<div class="like_user" @click="ownerOp(false,item.uid)" v-else >
								<img class="like" src="../../assets/images/like_no.png"/>
									对Ta感兴趣
							</div>
							<div class="btn" v-if="item.interviewStatus.length<1" @click="positionOp" @mouseover="sharePicOp(true,index)" @mouseout="sharePicOp(false,index)">开撩约面</div>
							<div class="btn" @click="positionOp" @mouseover="sharePicOp(true,index)" @mouseout="sharePicOp(false,index)" v-else-if="item.interviewStatus.status === 41">安排面试</div>
							<div class="btn" @click="positionOp" @mouseover="sharePicOp(true,index)" @mouseout="sharePicOp(false,index)" v-else>确认约面</div>

							<div class="xcxPic" v-if="item.isShowPic">
									<div class="triangle_border_down" ></div>
									<div class="xcx_main" v-if="item.src.length<1">
										<img class="xcx_load" src="../../assets/images/loading.gif">
										<p>正在加载中…</p>
									</div>
									<div class="xcx_main" v-else>
										<img class="xcx_icon" :src="item.src">
										<p>微信扫码，查看简历详情</p>
									</div>
							</div>
							<!-- <div class="btn" @click="positionOp(3,item.uid)">安排面试</div> -->
						</div>
					</div>
					
				</div>
			</div>
			<div class="cont_none" v-else>
				<img  src="../../assets/images/ufo.png">
				<p>暂无候选人关注你，快去发布你的职位吧~</p>
			</div>

			<div class="loading" v-if="loading">
				<img class="loading_icon" src="../../assets/images/loading.gif" />
				加载更多
			</div>
			<div class="loading" v-else>
				- 没有更多职位了-
			</div>
			<div class="toTop" @click="toTop" v-if="isShowTop">
					<img class="arrows" src="../../assets/images/open.png"/>
			</div>
		</div>
		<div class="pop" v-if="pop.isShow">
			<div class="messageBox" v-if="pop.type==='openJob'">
				<img class="clo" src="../../assets/images/clo.png" @click="todoAction('cloPop')">
				<div class="mb_main">
						<div class="main_tit"></div>
						<div>
							<img class="hint" src="../../assets/images/exclamation-circle.png">
							<p>微信扫码，查看简历详情</p>
						</div>
				</div>
			</div>
		</div>

		<div class="service"  @mouseover="isService = true" @mouseout="isService = false">
			<img class="service_icon" src="../../assets/images/service.png"/>
			客服咨询

			<div class="service_pop" v-if="isService">
				<div class="pop_tit">联系我们</div>
				<div class="pop_cont">
		  		<h3 class="pop_text">请拨打全国咨询热线</h3>
		  		<p class="pop_text2">400-065-5788</p>
		  		<img class="pop_code" src="../../assets/images/gzh.png"/>
		  		<p class="pop_text3">猎多多公众号</p>
		  		<p class="pop_text4">微信扫描二维码，关注官方公众号</p>
				</div>
				<div class="triangle_border_right">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { uploadApi, waitApi, getQrCodeApi, getMyInfoApi } from '../../api/auth'
	import { getPositionTypeApi, getPositionTypeListApi, getResumeShareApi, getCodeUrl } from '../../api/position'
	import { getSearchMyCollectApi, getSearchCollectApi, putCollectUserApi, cancelCollectUserApi } from '../../api/collect'
	import { getSearchBrowseMyselfApi, getMyNavDataApi, getJobHunterPositionTypeApi } from '../../api/browse'
	import { changeBaseURL } from '../../api/index'

	import { applyInterviewApi, confirmInterviewApi } from '../../api/interview'

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
	  components: {
	  }
	})
	export default class CourseList extends Vue {
		userInfo = {}

		pageInfo = {
		  page: 1,
		  count: 20,
		  totalPage: 0,
		  total: 0
		}
		pop = {
	  	isShow: false,
	  	type: 'share'
	  }

		form = {
		  page: 1,
			recruiter: 5,
			status: '1,2', // 状态
			is_online: 1,
			type: ''
		}

		navBarFixed = false // nav是否置顶
		statusTotal = {}   //  
		uid = null
		shareSelectItem = {
			qrCodeUrl: ''
		}    //分享选中
		isShowPic = false  // 分类更多
		picStyle = {
			x: '',
			y: ''
		}
		isShowTop = false //
		isService = false  

		navType = 'searchBrowseMyself' 
		loading = false //翻页 
		candidateList = []
		searchMyCollect = []
		searchCollect = []
		searchBrowseMyselfList = []
		positionTypeList = []  // 职业标签列表
		isShowScreen = false
		selectedScreen = [] // 筛选选中条件
		sharePicIds = [] // 下载中的图片
		navNum = {} // nav 数量
		sharePicOp (type,index) {
			if (type) {
				this.candidateList[index].isShowPic = true
				this.getPic(index)
			}else {
				this.candidateList[index].isShowPic = false
			}
		}
		getPopName () {
			return this.navType === 'searchBrowseMyself' ? '看过我的职位类型' : this.navType === 'searchCollect' ? '对我感兴趣的职位类型' : '我感兴趣的职位类型'
		}
		screenOp (status) {
			switch(status) {
			  case 'cancel':
			  	this.setDefaultScreen()
					this.isShowScreen = false
			    break
			  case 'confirm':
			  	this.getList()
					this.isShowScreen = false
			    break
			  case 'label_all':
			  	console.log('label_all')
			    break
			  default:
			    break
			}
		}
		// 列表筛选
		screenList (type) {
			if (type === 1 && this.isShowScreen) {
				// 清楚筛选
				this.setDefaultScreen()
			} else {
				this.isShowScreen = !this.isShowScreen
			}
		}

		// 设置默认筛选
		setDefaultScreen (status) {
			this.selectedScreen = []

			this.positionTypeList.map((item,idx) => {
		  	item.active = false

		  	if (status && item.labelId === 'index') {
  	  		item.active = true
		  	}
  			if (!status && item.labelId === 'all') {
  	  		item.active = true
  			}
		  })
		}

		// 职位操作
		positionOp (type, index) {
			console.log(e)
			if(type){
				this.candidateList[index].isShowPic = true
			}else {
				this.candidateList[index].isShowPic = false
			}
			return
			let data = {}
			if (type === 1) {
				// 开撩约面
				data = {
					jobhunterUid: id,
					positionId: ''
				}
				applyInterviewApi(data).then(res => {
					
				})
			} else if (type === 2) {
				// 确定约面
				data = {
					interviewId: id,
				}
				confirmInterviewApi(data).then(res => {
				})
			} else if (type === 3) {
			}
		}

		changeNav (type) {
		  let type2 = this.navType
		  if(type2 === type){
		    return
		  }

		  if(type === 'searchMyCollect') {
		  	this.getJobHunterPositionType()
		  }else {
		  	this.getPositionTypeList()
		  }
		  this.navType = type
		  this.toTop()
		  this.setDefaultScreen()
		  this.getList()
			this.isShowScreen = false
		}

		getMyNavData() {
			console.log('sasdasd')
			getMyNavDataApi().then(res => {
				this.navNum = res.data.data
			})
		}

		getList (type, page=1) {
			let status = type ? type : this.navType
			if (type) this.navType = type
			switch(status) {
			  case 'searchMyCollect':
			  	this.getSearchMyCollect(page)
			    break
			  case 'searchCollect':
			  	this.getSearchCollect(page)
			    break
			  case 'searchBrowseMyself':
			  	this.getSearchBrowseMyself(page)
			    break
			  default:
			    break
			}
		}
		// 查询我感兴趣的
		getSearchMyCollect (page) {
			let data = {
				category: this.selectedScreen.length > 0 ? 1 : 0,
				type: this.selectedScreen.join(),
				index: this.positionTypeList.length > 0 && this.positionTypeList[this.positionTypeList.length-1].active ? 1 : 0,
				page: page || this.pageInfo.page || 1,
				count: this.pageInfo.count
			}
			this.loading = true
			getSearchMyCollectApi(data).then(res => {
				let msg = res.data
				msg.data.map((item,idx) => {
		  		item.isShowPic = false
		  		item.src = ''
		  	})
				if (data.page === 1){
					this.candidateList = msg.data
				} else {
        	this.candidateList = this.candidateList.concat(msg.data)
				}
				this.loading = false
				this.pageInfo.totalPage = msg.meta.total/data.count || 0
				this.pageInfo.page = data.page
			}).catch(e => {
				this.loading = false
				this.candidateList = []
			})
		}
		// 对我感兴趣的
		getSearchCollect (page) {
			let data = {
				category: this.selectedScreen.length > 0 ? 1 : 0,
				type: this.selectedScreen.join(),
				index: this.positionTypeList.length > 0 &&this.positionTypeList[this.positionTypeList.length-1].active ? 1 : 0,
				page: page || this.pageInfo.page || 1,
				count: this.pageInfo.count
			}
			this.loading = true
			getSearchCollectApi(data).then(res => {
				let msg = res.data
				msg.data.map((item,idx) => {
		  		item.isShowPic = false
		  		item.src = ''
		  	})
				if (data.page === 1){
					this.candidateList = msg.data
				} else {
        	this.candidateList = this.candidateList.concat(msg.data)
				}
				this.loading = false
				this.pageInfo.totalPage = msg.meta.total/data.count || 0
				this.pageInfo.page = data.page
			}).catch(e => {
				this.loading = false
				this.candidateList = []
			})
		}
		// 浏览过我的求职者
		getSearchBrowseMyself (page) {
			let data = {
				category: this.selectedScreen.length > 0 ? 1 : 0,
				type: this.selectedScreen.join(),
				index: this.positionTypeList.length > 0 && this.positionTypeList[this.positionTypeList.length-1].active ? 1 : 0,
				page: page || this.pageInfo.page || 1,
				count: this.pageInfo.count
			}
			this.loading = true
			getSearchBrowseMyselfApi(data).then(res => {
				let msg = res.data
				msg.data.map((item,idx) => {
		  		item.isShowPic = false
		  		item.src = ''
		  	})
				if (data.page === 1){
					this.candidateList = msg.data
				} else {
        	this.candidateList = this.candidateList.concat(msg.data)
				}
				this.loading = false
				this.pageInfo.totalPage = msg.meta.total/data.count || 0
				this.pageInfo.page = data.page
			}).catch(e => {
				this.loading = false
				this.candidateList = []
			})
		}
		// 职业类型列表
		getPositionTypeList () {
			getPositionTypeApi().then(res => {
				let data = res.data.data
				data.map(item=>{
					item.active = false
				})

				data.unshift({
					name: '全部',
					labelId: 'all',
					active: true
				})

				data.push({
					name: '我的主页',
					labelId: 'index',
					active: false
				})
				
				this.positionTypeList = data
			})
		}

		// 看过我的职业类型列表
		getJobHunterPositionType () {
			console.log(111)
			getJobHunterPositionTypeApi().then(res => {
				let data = res.data.data
				data.map(item=>{
					item.active = false
				})
				data.unshift({
					name: '全部',
					labelId: 'all',
					active: true
				})
				data.push({
					name: '暂无工作经验',
					labelId: 'index',
					active: false
				})
				this.positionTypeList = data
			})
		}

		labelClick (index) {
			let data = this.positionTypeList[index]

			data.active = !data.active
			if( (data.labelId === 'all'||data.labelId === 'index') && data.active) {
				this.selectedScreen = []
				if(data.labelId === 'index') {
					this.setDefaultScreen('index')
				}else {
					this.setDefaultScreen()
				}
			}else {
				if (data.active) {
					this.selectedScreen.push(data.labelId)
				} else {
					this.selectedScreen.splice(this.selectedScreen.indexOf(data.labelId),1)
				}
				this.positionTypeList[0].active = false
				this.positionTypeList[this.positionTypeList.length-1].active = false
			}
		}
		//是否感兴趣操作
		ownerOp (status,uid) {
			let data = {
				uid: uid
			}

	  	if (!status) {
	  		putCollectUserApi(data).then(res => {
  				this.$message({
  			    type: 'success',
  			    message: '成功!'
  			  })
  			  this.getList()
	  		}).catch(err => {
					this.$message.error(err.data.msg)
	  		})
	  	} else {
	  		cancelCollectUserApi(data).then(res => {
  				this.$message({
  			    type: 'success',
  			    message: '成功!'
  			  })
  			  this.getList()
	  		}).catch(err => {
	  			this.$message.error(err.data.msg)
	  		})
	  	}
	  }

		opJob (type, id) {
			this.pop.isShow = true
			if(type==='close'){
				this.pop.type = 'closeJob'
			}else if( type==='open'){
				this.pop.type = 'openJob'
			}
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
	    let query = this.$route.query
	    if(query.status){

	    }
		  this.getMyNavData()
	    this.getSearchBrowseMyself()
  		this.getPositionTypeList()
	  }

	  todoAction(type, id) {
	    switch(type) {
	      case 'cloPop':
	        this.pop = {
	        	isShow: false,
	  				type: ''
	        }
	        break
	      case 'cloPop2':
	        this.pop = {
	        	isShow: false,
	  				type: ''
	        }

	        this.shareSelectItem = {
						qrCodeUrl: ''
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
	      default:
	        break
	    }
	  }

		handleScroll(e){
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			let pageHeight = document.documentElement.clientHeight
			let box = document.getElementById("box")
			let contentHeight = window.getComputedStyle(box).height
			contentHeight = contentHeight.slice(0,contentHeight.length-2)
			// 148
			let otherHeight = 148+30 
			let value = pageHeight-otherHeight+scrollTop

			if(scrollTop > 155){
				this.navBarFixed = true
				if(scrollTop > 500){
					this.isShowTop = true
				}
			}else {
				this.navBarFixed = false
				this.isShowTop = false
			}

			// 翻页
			if( contentHeight - value < 20){
				if (!this.loading && this.pageInfo.page < this.pageInfo.totalPage) {
				  this.getList(this.navType,this.pageInfo.page + 1)
				}
			}
		}

	  getMyInfo(){
	  	return getMyInfoApi().then(res=>{
	  		this.uid = res.data.data.uid
	  	}).catch(e => {
        this.$message.error(e.data.msg)
     	})
	  }

	  handleCurrentPageChange(page){
	  	this.setPathQuery({page: page})
	  }

	  toTop(){
	  	document.documentElement.scrollTop=0;
	  }

	  getPic(index, id){
	  	let ids = this.sharePicIds
	  	let item = this.candidateList[index]
	  	if (item.src.length < 1 && !ids.includes[id]) {
	  		ids.push(id)
		  	getResumeShareApi({
		  		resumeUid: item.id
		  	}).then(res => {
		  		item.src = res.data.data.positionQrCodeUrl
		  		console.log(this.candidateList[index])
	      	//this.shareSelectItem.qrCodeUrl = res.data.data.qrCodeUrl
	      	//this.shareSelectItem = this.jobList[index]
		  	}).catch(err => {
		  		ids.splice(ids.indexOf(id), 1)
		  	})
	  	}
	  }
	}
</script>
<style lang="less">
@import "./candidate.less";
</style>