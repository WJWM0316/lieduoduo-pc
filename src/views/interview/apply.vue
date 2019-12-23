<template>
	<div id="interview-apply">
		<ul class="navigation_p">
			<li
				:class="{active: item.active}"
				v-for="(item, index) in navigation"
				@click="tabClick(item, index)"
				:key="index">
					{{item.text}}<span class="number" v-if="item.todoNumber">{{item.todoNumber}}</span>
			</li>
		</ul>
    <ul class="navigation_c" v-show="navIndex === 0">
      <li
      	v-for="(item, index) in applyScreen"
      	:key="index"
      	class="item"
      	@click="barClick(item, index, applyScreen)"
      	:class="{ active: item.active }">
      	{{ item.key }}
    	</li>
    </ul>
    <ul class="navigation_c" v-show="navIndex === 1">
      <li
      	v-for="(item, index) in receiveScreen"
      	:key="index"
      	class="item"
      	@click="barClick(item, index, receiveScreen)"
      	:class="{ active: item.active }">
      	{{ item.key }}
    	</li>
    </ul>
    <ul class="navigation_c" v-show="navIndex === 2 && dateList.length">
      <li
      	v-for="(item, index) in dateList"
      	:key="index"
      	@click="barClick(item, index, dateList)"
      	class="item"
      	:class="{ active: item.active }">
      	{{ item.date }}
    	</li>
    </ul>
    <!-- <ChatBar :interview="interviewItem" v-for="(interviewItem, interviewIndex) in interview.list" :key="interviewIndex" /> -->
	</div>
</template>
<script>
/* eslint-disable */
import ChatBar from './components/chatBar'
import {
	getInterviewApplyListsApi,
	getInterviewScheduleNumberListsApi,
	getInterviewInviteListsApi,
	getInterviewScheduleListsApi,
	getInterviewRedDotInfoApi
} from 'API/interview'
export default {
	components: {
		ChatBar
	},
	data() {
		return {
	    hasReFresh: false,
	    navIndex: 0,
			navigation: [
				{
	        api: 'getApplyList',
	        text: '申请记录',
	        showRedDot: 0,
	        active: false,
	        flag: 'jobhunterApplyList',
	        tab: 'apply'
	      },
	      {
	        api: 'getReceiveList',
	        text: '收到邀请',
	        showRedDot: 0,
	        active: false,
	        flag: 'jobhunterInviteList',
	        tab: 'receive'
	      },
	      {
	        api: 'getScheduleList',
	        text: '面试日程',
	        showRedDot: 0,
	        active: false,
	        flag: 'jobhunterScheduleList',
	        tab: 'schedule'
	      }
			],
			applyScreen: [
	      {
	      	key: '全部',
	      	value: 'all',
	      	active: true,
	      	showRedDot: 0,
	      	flag: 'all',
	      	type: 'all'
	      },
	      {
	      	key: '待安排面试',
	      	value: 'waiting_arrangement',
	      	active: false,
	      	showRedDot: 0,
	      	flag: 'jobhunterApplyWaitingArrangement',
	      	type: 'apply_waiting_arrangement'
	      },
	      {
	      	key: '已安排面试',
	      	value: 'have_arrangement',
	      	active: false,
	      	showRedDot: 0,
	      	flag: 'jobhunterApplyHaveArrangement',
	      	type: 'apply_have_arrangement'
	      },
	      {
	      	key: '不合适',
	      	value: 'not_suitable',
	      	flag: 'jobhunterApplyNotSuitable',
	      	type: 'apply_not_suitable'
	      }
	    ],
	    receiveScreen: [
	      {
	      	key: '全部',
	      	value: 'all',
	      	active: true,
	      	todoNumber: 0,
	      	flag: 'all'
	      },
	      {
	      	key: '待处理',
	      	value: 'waiting_processing',
	      	active: false,
	      	todoNumber: 0,
	      	flag: 'jobhunterInviteWaitingProcessing',
	      	type: 'invite_waiting_processing'
	      },
	      {
	      	key: '待安排面试',
	      	value: 'waiting_arrangement',
	      	active: false,
	      	todoNumber: 0,
	      	flag: 'jobhunterInviteWaitingArrangement',
	      	type: 'invite_waiting_arrangement'
	      },
	      {
	      	key: '已安排面试',
	      	value: 'have_arrangement',
	      	active: false,
	      	todoNumber: 0,
	      	flag: 'jobhunterInviteHaveArrangement',
	      	type: 'invite_have_arrangement'
	      },
	      {
	      	key: '不合适',
	      	value: 'not_suitable',
	      	active: false,
	      	todoNumber: 0,
	      	flag: 'jobhunterInviteNotSuitable',
	      	type: 'invite_not_suitable'
	      }
	    ],
			dateList: [],
			applyData: {
	      list: [],
	      page: 1,
	      count: 20,
	      hasInitPage: false,
	      total: 0,
	      pageSize: 20
	    },
	    receiveData: {
	      list: [],
	      page: 1,
	      count: 20,
	      hasInitPage: false,
	      total: 0,
	      pageSize: 20
	    },
	    scheduleData: {
	      list: [],
	      page: 1,
	      count: 20,
	      hasInitPage: false,
	      total: 0,
	      pageSize: 20
	    }
		}
	},
	methods: {
		getInterviewRedDotInfo() {
			return getInterviewRedDotInfoApi().then(( { data } ) => {
				let infos = data.data
        this.dateList.map(field => field.todoNumber = infos[field.flag])
        this.applyScreen.map(field => field.todoNumber = infos[field.flag])
        this.receiveScreen.map(field => field.todoNumber = infos[field.flag])
			})
		},
		/**
	   * @Author   小书包
	   * @DateTime 2019-12-21
	   * @detail   获取面试日程的时间列表
	   */
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
		/**
	   * @Author   小书包
	   * @DateTime 2019-12-21
	   * @detail   获取申请记录列表
	   */
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
				this.applyData.list = data.data
				this.applyData.total = data.meta.total
				this.$router.push({query: Object.assign(params, { navIndex: this.navIndex, q: Date.now() })})
			})
		},
		/**
	   * @Author   小书包
	   * @DateTime 2019-12-21
	   * @detail   获取收到邀请列表
	   */
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
				this.receiveData.list = data.data
				this.receiveData.total = data.meta.total
				this.$router.push({query: Object.assign(params,{navIndex: this.navIndex, q: Date.now()})})
			})
		},
		/**
	   * @Author   小书包
	   * @DateTime 2019-12-21
	   * @detail   获取面试日程列表
	   */
		getScheduleList() {
			let tab = this.dateList.find(v => v.active)
			let params = {
				page: this.scheduleData.page
			}
			if(!tab) {
				this.$router.push({query: Object.assign(params, {navIndex: this.navIndex, q: Date.now()})})
				return
			}
			params = Object.assign(params, {time: tab.time})
			getInterviewScheduleListsApi(Object.assign(params, { count: 20 })).then(({ data }) => {
				this.scheduleData.list = data.data
				this.scheduleData.total = data.meta.total
				this.$router.push({query: Object.assign(params, {navIndex: this.navIndex, q: Date.now()})})
			})
		},
		tabClick(item, index) {
			this.navigation[this.navIndex].active = false
			this.navigation[index].active = true
			this.navIndex = index
			this.getLists(item)
		},
		barClick(item, index, list) {
			let data = this.navigation[this.navIndex]
			list.map((v, i, arr) => v.active = index === i ? true : false)
			this.getInterviewRedDotInfo().then(() => this[data.api]())
		},
		getLists(item) {
			switch(item.api) {
				case 'getApplyList':
					this.getInterviewRedDotInfo().then(() => {
						this[item.api]()
					})
					break
				case 'getReceiveList':
					this.getInterviewRedDotInfo().then(() => {
						this[item.api]()
					})
					break
				case 'getScheduleList':
					this.getInterviewRedDotInfo().then(() => {
						this.getInterviewScheduleNumberLists().then(() => this[item.api]())
					})
					break
				default:
					break
			}
		},
		init() {
			let { query } = this.$route
			let navIndex = Number(query.navIndex)
			let navItem = this.navigation[navIndex]
			let callback = () => {
				navItem = this.navigation[0]
				navItem.active = true
				if(query.page) {
					this[`${navItem.tab}Data`]['page'] = Number(query.page)
				}
				this.getLists(navItem)
			}
			let callback2 = () => {
				switch(navIndex) {
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
			}
			if(query.navIndex) {
				if(navItem) {
					navItem.active = true
					this.navIndex = navIndex
					callback2()
					this.getLists(navItem)
				} else {
					callback()
				}
			} else {
				callback()
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
.navigation_p{
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid $--border-color-base;
	li {
		display: inline-block;
		margin: 0 30px;
		position: relative;
		height: 50px;
		line-height: 50px;
		cursor: pointer;
		&:before{
			content: '';
			display: block;
			position: absolute;
			left: 50%;
			margin-left: -50%;
			bottom: 0;
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
	.number{
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: $nav-color-hover;
		text-align: center;
		line-height: 20px;
		position: absolute;
		right: -20px;
		top: 0px;
		color: white;
	}
}
.navigation_c{
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  padding-top: 18px;
  .item {
    padding: 0 10px;
    margin: 0 24px 14px 0;
    cursor: pointer;
    display: inline-block;
    height: 32px;
    color: $border-color-7;
    text-align: center;
    line-height: 32px;
    font-weight: 400;
    border-radius: 2px;
  }
  .positionType-buttom:hover {
    background-color: $bg-color-5;
  }
  .active{
    color: $main-color-1 !important;
    background: $bg-color-5;
    font-weight: 500;
    pointer-events: none;
  }
}
</style>
