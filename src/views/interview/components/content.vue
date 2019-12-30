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
	    <div v-show="pIndex === 2">
	    	<ul class="child-bar">
					<li
						:class="{active: index === cIndex}"
						v-for="(item, index) in scheduleBar"
						@click="cTabClick(item, index)"
						:key="index">
							{{item.text}}<template v-if="item.showRedDot">（{{scheduleData.total}}）</template>
					</li>
				</ul>
		    <ul class="tab-bar" v-show="dateList.length && !cIndex">
		      <li
		      	v-for="(item, index) in dateList"
		      	:key="index"
		      	@click="chooseTime(item, index, dateList)"
		      	class="item"
		      	:class="{ active: item.active }">
		      	{{ item.date }}
		    	</li>
		    </ul>
		    <div v-show="cIndex">
			    <el-date-picker
			      v-model="time"
			      type="datetimerange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      value-format="timestamp"
			      end-placeholder="结束日期">
			    </el-date-picker>
		    </div>
	    </div>
	    <search-list :data="applyData" tab="apply" v-if="pIndex === 0"/>
	    <search-list :data="receiveData" tab="receive" v-if="pIndex === 1"/>
	    <search-list :data="scheduleData" tab="schedule" v-if="pIndex === 2 && cIndex === 0"/>
	    <search-list :data="historyData" tab="history" v-if="pIndex === 2 && cIndex === 1"/>
		</div>
		<div class="pagination-interview" v-if="applyData.total > applyData.pageSize && pIndex === 0">
      <el-pagination
        background
        @current-change="(page) => changePage(page, applyData)"
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
		SearchList
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
				if(dateList.length) {
					dateList.map(v => v.active = false)
					dateList[0].active = true
					this.dateList = dateList
				}
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
			getInterviewApplyListsApi(Object.assign(params, {count: this.applyData.count})).then(({ data }) => {
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
			getInterviewInviteListsApi(Object.assign(params, {count: this.receiveData.count})).then(({ data }) => {
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
			getInterviewScheduleListsApi(Object.assign(params, { count: this.scheduleData.count })).then(({ data }) => {
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
			let params = { page: this.scheduleData.page }
			if(this.time.length) {
				params = Object.assign(params, {
					start: this.time[0]/1000,
					end: this.time[1]/1000
				})
			}
			getHistoryInterviewListsApi(Object.assign(params, { count: this.scheduleData.historyData })).then(({ data }) => {
				this.historyData.list = data.data || []
				this.historyData.total = data.meta.total || 0
				this.historyData.hasInitPage = true
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
		chooseTime(item, index) {
			this.dateList.map((v, i) => v.active = i === index ? true : false)
			if(item.active && item.number) {
        item.number = 0
        this.clearDayInterviewRedDot(item.time).then(() => {
        	this.getScheduleList()
        })
      } else {
      	this.getInterviewRedDotInfo().then(() => this[data.api]())
      }
		},
		cTabClick(item, index) {
			let { query } = this.$route
			this.scheduleBar[this.cIndex].active = false
			item.active = true
			this.cIndex = index
			if(!index) {
				this.scheduleData.page = 1
				this.getLists(item)
			} else {
				this.historyData.page = 1
				this.getInterviewRedDotInfo().then(() => this.getHistoryInterviewLists())
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
		changePage(page, data) {
			let item = this.interviewBar[this.pIndex]
			data.page = page
			switch(item.api) {
				case 'getApplyList':
					this.getLists(item)
					break
				case 'getReceiveList':
					this.getLists(item)
					break
				case 'getScheduleList':
					if(!this.cIndex) {
						this.getLists(item)
					} else {
						this.getInterviewRedDotInfo().then(() => this.getHistoryInterviewLists())
					}
					break
				default:
					break
			}
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
		padding: 0 36px;
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
	}
	.tab-bar{
	  height: 62px;
	  background: $btn-forbid;
	  line-height: 62px;
	  padding: 0 36px;
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
		height: 50px;
		line-height: 50px;
		background: white;
		li {
			display: inline-block;
			margin: 0 30px;
			position: relative;
			height: 50px;
			line-height: 50px;
			cursor: pointer;
		}
		.active{
			color: $nav-color-hover;
			pointer-events: none;
		}
	}
	.pagination-interview{
		text-align: center;
		margin-bottom: 30px;
	}
}
</style>
