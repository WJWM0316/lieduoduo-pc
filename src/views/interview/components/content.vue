<template>
	<div class="flex-left">
		<div class="inner-flex-content">
			<ul class="interview-bar">
				<li
					:class="{active: item.active}"
					v-for="(item, index) in interviewBar"
					@click="pTabClick(item, index)"
					:key="index">
						{{item.text}}<span class="reddot" v-if="item.showRedDot"></span>
				</li>
				<div class="notice" @mouseenter="shownotice" @mouseleave="isshownotice = false">
					<i class="iconfont icon-tongzhi"></i>
					<span>获取约面通知</span>
					<div class="notice-diggle" v-show="isshownotice">
						<div class="headbar">
							<img src="@/assets/images/pic_message.png" alt="">
						</div>
						<div class="clock"><img src="@/assets/images/pic_bell.png" alt=""></div>
						<div class="qrcode">
							<img :src="app_url" alt="">
						</div>
						<p>下载猎多多APP<br/>获得面试日程通知提醒</p>
						<div class="forward"></div>
					</div>
				</div>
			</ul>
			<div v-show="pIndex === 0">
		    <ul class="tab-bar">
		      <li
		      	v-for="(item, index) in applyScreen"
		      	:key="index"
		      	class="item"
		      	@click="tabClick(item, index, applyScreen)"
		      	:class="{ active: item.active }">
		      	{{ item.key }}<span class="reddot" v-if="item.showRedDot"></span>
		    	</li>
		    </ul>
	    </div>
	    <div v-show="pIndex === 1">
		    <ul class="tab-bar">
		      <li
		      	v-for="(item, index) in receiveScreen"
		      	:key="index"
		      	class="item"
		      	@click="tabClick(item, index, receiveScreen)"
		      	:class="{ active: item.active }">
		      	{{ item.key }}<span class="reddot" v-if="item.showRedDot"></span>
		    	</li>
		    </ul>
	    </div>
			<!-- 面试日历tab -->
	    <div v-show="pIndex === 2">
		    <ul class="tab-bar" v-show="dateList.length">
		      <li
		      	v-for="(item, index) in dateList"
		      	:key="index"
		      	@click="chooseTime(item, index)"
		      	class="item"
		      	:class="{ active: item.active }">
		      	{{ item.date }}
						<span class="reddot" v-if="item.showRedDot"></span>
		    	</li>
		    </ul>
	    </div>
	    <search-list :data="applyData" tab="apply" v-if="pIndex === 0"/>
	    <search-list :data="receiveData" tab="receive" v-if="pIndex === 1"/>
	    <Schedule :data="scheduleData" v-if="pIndex === 2 && cIndex === 0"/>
		</div>
		<div class="pagination-interview" v-if="applyData.total > applyData.pageSize && pIndex === 0">
      <el-pagination
        background
        @current-change="changePage"
        :current-page.sync ="applyData.page"
        :page-size="applyData.pageSize"
        layout="prev, pager, next"
        :total="applyData.total">
      </el-pagination>
    </div>
	</div>
</template>
<script>
/* eslint-disable */
import SearchList from './searchList'
import Schedule from './schedule'
import { app_qrcode } from 'IMAGES/image'
import {
	getInterviewApplyListsApi,
	getInterviewScheduleNumberListsApi,
	getInterviewInviteListsApi,
	getInterviewScheduleListsApi,
	clearTabInterviewRedDotApi,
	clearDayInterviewRedDotApi,
	getHistoryInterviewListsApi
} from 'API/interview'

import {
	scheduleBar,
	interviewBar,
	applyScreen,
	receiveScreen,
	applyData,
	receiveData,
	scheduleData,
	historyData
} from 'UTIL/interview-static-data'

export default {
	components: {
		SearchList,
		Schedule
	},
	data() {
		return {
	    pIndex: 0,
	    cIndex: 0,
	    scheduleBar,
			interviewBar,
			applyScreen,
	    receiveScreen,
			dateList: [],
			applyData,
	    receiveData,
	    scheduleData,
	    historyData,
			time: [],
			app_url: app_qrcode,
			isshownotice: false,
	    model: {
	    	show: true,
	    	title: '面试详情'
	    }
		}
	},
	computed: {
		...mapGetters([
			'interviewData',
			'roleInfos'
		])
	},
	methods: {
		...mapActions([
			'getInterviewRedDotInfoApi'
		]),
		clearDayInterviewRedDot(date) {
      return clearDayInterviewRedDotApi({ date })
	  },
	  clearTabInterviewRedDot(type) {
	    return clearTabInterviewRedDotApi({ type })
	  },
		getInterviewRedDotInfo() {
			return this.getInterviewRedDotInfoApi().then(() => {
        this.applyScreen.map(field => field.showRedDot = this.interviewData[field.flag])
        this.receiveScreen.map(field => field.showRedDot = this.interviewData[field.flag])
        this.interviewBar.map(field => field.showRedDot = this.interviewData[field.flag])
			})
		},
		getInterviewScheduleNumberLists() {
			return getInterviewScheduleNumberListsApi().then(({ data }) => {
				let dateList = data.data
				dateList.unshift({ date: '全部' })
				dateList.map((v, k) => {
          v.active = false
        })
        if (dateList.length >= 2) {
          dateList[1].active = true
        } else {
          dateList[0].active = true
				}
				this.dateList = dateList
			})
		},
		getApplyList() {
			let applyItem = this.applyScreen.find(v => v.active)
			if(!applyItem) {
				applyItem = this.applyScreen[0]
			}
			let params = {
				page: this.applyData.page,
				tab: applyItem.value
			}
			getInterviewApplyListsApi(Object.assign(params, {count: 20})).then(({ data }) => {
				this.applyData.list = data.data || []
				this.applyData.total = data.meta.total || 0
				this.applyData.hasInitPage = true
				let query = {
					...params,
					pIndex: this.pIndex,
					cIndex: this.cIndex,
					q: Date.now()
				}
				this.$router.push({ query })
			})
		},
		getReceiveList() {
			let receiveItem = this.receiveScreen.find(v => v.active)
			if(!receiveItem) {
				receiveItem = this.receiveScreen[0]
			}
			let params = {
				page: this.receiveData.page,
				tab: receiveItem.value
			}
			getInterviewInviteListsApi(Object.assign(params, {count: 20})).then(({ data }) => {
				this.receiveData.list = data.data || []
				this.receiveData.total = data.meta.total || 0
				this.receiveData.hasInitPage = true
				let query = {
					...params,
					pIndex: this.pIndex,
					cIndex: this.cIndex,
					q: Date.now()
				}
				this.$router.push({ query })
			})
		},
		getScheduleList() {
			let tab = this.dateList.find(v => v.active)
			let params = {
				page: this.scheduleData.page
			}
			let query = {
				...params,
				pIndex: this.pIndex,
				cIndex: this.cIndex,
				q: Date.now()
			}
			if(!tab) {
				this.scheduleData.hasInitPage = true
				this.$router.push({ query })
				return
			}
			params = Object.assign(params, {time: tab.time})
			getInterviewScheduleListsApi(Object.assign(params, { count: 20 })).then(({ data }) => {
				this.scheduleData.list = data.data || []
				this.scheduleData.total = data.meta.total || 0
				this.scheduleData.hasInitPage = true
				let query = {
					...params,
					pIndex: this.pIndex,
					cIndex: this.cIndex,
					q: Date.now()
				}
				this.$router.push({ query })
			})
		},
		getHistoryInterviewLists() {
			console.log('344')
			let params = { page: 1, isselect: 'all' }
			if(this.time.length) {
				params = Object.assign(params, {
					start: this.time[0]/1000,
					end: this.time[1]/1000
				})
			}
			getHistoryInterviewListsApi(Object.assign(params, { count: 20 })).then(({ data }) => {
				this.scheduleData.list = data.data || []
				this.scheduleData.total = data.meta.total || 0
				this.scheduleData.hasInitPage = true
				let query = {
					...params,
					pIndex: this.pIndex,
					cIndex: this.cIndex,
					q: Date.now()
				}
				this.$router.push({ query })
			})
		},
		pTabClick(item, index) {
			this.interviewBar[this.pIndex].active = false
			item.active = true
			this.pIndex = index
			switch(item.api) {
				case 'getApplyList':
					this.applyData.page = 1
					this.getLists(item)
					break
				case 'getReceiveList':
					this.receiveData.page = 1
					this.getLists(item)
					break
				case 'getScheduleList':
					if(!this.cIndex) {
						this.scheduleData.page = 1
						this.getLists(item)
					} else {
						this.historyData.page = 1
						this.getInterviewRedDotInfo().then(() => this.getHistoryInterviewLists())
					}
					break
				default:
					break
			}
		},
		tabClick(item, index, list) {
			let data = this.interviewBar[this.pIndex]
			list.map((v, i, arr) => v.active = index === i ? true : false)
			this[`${data.tab}Data`]['page'] = 1
			if(item.active && item.showRedDot && item.type) {
        item.showRedDot = 0
        this.clearTabInterviewRedDot(item.type).then(() => {
        	this.getInterviewRedDotInfo().then(() => this[data.api]())
        })
      } else {
      	this.getInterviewRedDotInfo().then(() => this[data.api]())
      }
		},
		shownotice () {
			this.isshownotice = true
		},
		chooseTime(item, index) {
			this.dateList.map((v, i) => v.active = i === index ? true : false)
			if (item.active && item.number === 0) {
				this.scheduleData.page = 1
				this.getLists({api: 'getScheduleList'})
			} else {
				this.historyData.page = 1
				this.getLists({api: 'getHistoryInterviewLists'})
			}
		},
		getLists(item) {
			switch(item.api) {
				case 'getApplyList':
					this.getInterviewRedDotInfo().then(() => this[item.api]())
					break
				case 'getReceiveList':
					this.getInterviewRedDotInfo().then(() => this[item.api]())
					break
				case 'getScheduleList':
					this.getInterviewRedDotInfo().then(() => {
						this.getInterviewScheduleNumberLists().then(() => this[item.api]())
					})
					break
				case 'getHistoryInterviewLists':
					this.getInterviewRedDotInfo().then(() => this.getHistoryInterviewLists())
					break
				default:
					break
			}
		},
		setActive(pIndex) {
			let { query } = this.$route
			switch(pIndex) {
				case 0:
					this.applyScreen.map(v => v.active = v.value === query.tab ? true : false)
					break
				case 1:
					this.receiveScreen.map(v => v.active = v.value === query.tab ? true : false)
					break
				case 2:
					this.dateList.map(v => v.active = v.time === query.time ? true : false)
					break
				default:
					break
			}
		},
		changePage(page) {
			console.log(page)
		},
		bindClick(e) {
			console.log(e)
		},
		init() {
			let { query } = this.$route
			let pIndex = Number(query.pIndex)
			let cIndex = Number(query.cIndex)
			let navItem = this.interviewBar[pIndex]
			let cItem = this.scheduleBar[cIndex]
			let initPage = () => {
				navItem = this.interviewBar[0]
				navItem.active = true
				if(query.page) {
					this[`${navItem.tab}Data`]['page'] = Number(query.page)
				}
				this.getLists(navItem)
			}
			if(query.pIndex) {
				if(navItem) {
					navItem.active = true
					this.pIndex = pIndex
					this.cIndex = cIndex
					this.setActive(pIndex)
					if(pIndex === 2) {
						if(cItem) {
							if(cIndex === 1) {
								navItem.api = 'getHistoryInterviewLists'
							}
						}
					}
					this.getLists(navItem)
				} else {
					initPage()
				}
			} else {
				initPage()
			}
		}
	},
	created() {
		this.init()
	}
}
/* eslint-enable */
</script>
<style lang="scss" scoped>
.flex-left {
	flex: 1;
	.inner-flex-content {
		background: white;
		padding-top: 20px;
		box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
		border-radius:4px;
	}
	.interview-bar{
		height: 58px;
		line-height: 58px;
		box-sizing: border-box;
		padding: 0 40px;
		li {
			display: inline-block;
			margin-right: 96px;
			position: relative;
			line-height: 1;
			cursor: pointer;
			vertical-align: middle;
			&:before{
				content: '';
				display: block;
				position: absolute;
				left: 50%;
				margin-left: -50%;
				bottom: -24px;
				height: 2px;
				width: 100%;
				background: $nav-color-hover;
				opacity: 0;
				transition: all ease .4s;
			};
		}
		.active{
			color: $nav-color-hover;
			pointer-events: none;
			&:before{
				opacity: 1;
			};
		}
		.reddot{
			width:6px;
			height:6px;
			background:$error-color-1;
			border-radius: 50%;
			position: absolute;
			right: -7px;
			top: -4px;
		}
		.notice{
			float: right;
			cursor: pointer;
			position: relative;
			i{
				font-size: 16px;
				color: #00C4CD;
				margin-right: 2px;
			}
			span{
				font-size:14px;
				color: #03B3BB;
			}
			.notice-diggle{
				position: absolute;
				top: 50px;
				right: 0px;
				width:260px;
				background: #fff;
				border-radius: 8px;
				height:276px;
				z-index: 1;
				.headbar{
					width: 260px;
					height: 81px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.qrcode{
					width:104px;
					height:104px;
					margin: 23px auto 7px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.clock{
					position: absolute;
					width: 59px;
					height: 64px;
					top: 45px;
    			left: 98px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				p{
					text-align: center;
					line-height: 18px;
					font-size: 12px;
					color: #333333;
				}
				.forward{
					width: 0;
					height: 0;
					border-left: 20px solid transparent;
					border-right: 20px solid transparent;
					border-bottom: 20px solid #fff;
					position: absolute;
					top: -7px;
					right: 15px;
				}
			}
		}
	}
	.tab-bar{
	  height: 56px;
	  background: $btn-forbid;
	  line-height: 56px;
	  padding: 0 40px;
	  .item {
	    padding: 0 16px;
	    margin-right: 46px;
	    cursor: pointer;
	    display: inline-block;
	    height: 24px;
	    color: $border-color-7;
	    text-align: center;
	    line-height: 24px;
	    font-weight: 400;
	    border-radius: 2px;
	    vertical-align: middle;
	    border-radius:2px;
	    transition: all .2s;
	    position: relative;
	  }
	  .active{
	    color: white;
	    font-weight: 500;
	    pointer-events: none;
			background:$--button-primary-background-color;
	  }
	  .reddot{
			width:6px;
			height:6px;
			background:$error-color-1;
			border-radius: 50%;
			position: absolute;
			right: 8px;
			top: 2px;
		}
	}
	.child-bar{
		height: 62px;
    background: #f8fafa;
    line-height: 62px;
    padding: 0 40px;
		li {
			padding: 0 16px;
	    margin-right: 46px;
	    cursor: pointer;
	    display: inline-block;
	    height: 24px;
	    color: $border-color-7;
	    text-align: center;
	    line-height: 24px;
	    font-weight: 400;
	    border-radius: 2px;
	    vertical-align: middle;
	    border-radius:2px;
	    transition: all .2s;
	    position: relative;
		}
		.active{
			color: white;
	    font-weight: 500;
	    pointer-events: none;
			background:$--button-primary-background-color;
		}
	}
	.pagination-interview{
		text-align: center;
		margin-bottom: 30px;
	}
}
</style>
