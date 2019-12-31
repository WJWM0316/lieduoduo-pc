/* eslint-disable */
import {
  mp_qrcode,
  wx_qrcode,
  app_qrcode
} from 'IMAGES/image'

export const scheduleBar = [
	{
    api: 'getScheduleList',
    text: '最近面试',
    todoNumber: 10,
    active: true,
    flag: 'jobhunterApplyList',
    tab: 'apply'
  },
  {
    api: 'getReceiveList',
    text: '全部面试',
    showRedDot: 0,
    active: false,
    flag: 'jobhunterInviteList',
    tab: 'receive'
  }
]

export const interviewBar = [
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
]

export const applyScreen = [
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
]

export const receiveScreen = [
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
]

export const applyData = {
  list: [],
  page: 1,
  count: 20,
  hasInitPage: false,
  total: 0,
  pageSize: 20
}

export const receiveData = {
  list: [],
  page: 1,
  count: 20,
  hasInitPage: false,
  total: 0,
  pageSize: 20
}

export const scheduleData = {
  list: [],
  page: 1,
  count: 20,
  hasInitPage: false,
  total: 0,
  pageSize: 20
}

export const historyData = {
  list: [],
  page: 1,
  count: 20,
  hasInitPage: false,
  total: 0,
  pageSize: 20
}

export const asideBar = {
  topNav: [
    {
      text: '申请记录',
      reddot: 0,
      iconClass: 'icon-shenqingjilu',
      routeName: 'interviewApply',
      query: {
        page: 1,
        tab: 'all',
        pIndex: 0,
        cIndex: 0,
        q: Date.now()
      }
    },
    {
      text: '收到邀请',
      reddot: 0,
      iconClass: 'icon-shoudaoyaoqing',
      routeName: 'interviewReceive',
      query: {
        page: 1,
        tab: 'all',
        pIndex: 1,
        cIndex: 0,
        q: Date.now()
      }
    },
    {
      text: '面试日程',
      reddot: 0,
      iconClass: 'icon-ganxingqu-',
      routeName: 'interviewSchedule',
      query: {
        page: 1,
        tab: 'all',
        pIndex: 2,
        cIndex: 0,
        q: Date.now()
      }
    }
  ],
  bottomNav: [
    {
      name: 'APP',
      reddot: 0,
      iconClass: 'icon-app',
      url: app_qrcode,
      tooltips: '下载猎多多APP<br/>体验完整功能',
      type: 'hover'
    },
    {
      name: '小程序',
      reddot: 0,
      iconClass: 'icon-xiaochengxu_huaban',
      url: mp_qrcode,
      tooltips: '猎多多小程序<br/>开启社交求职新时代',
      type: 'hover'
    },
    {
      name: '公众号',
      reddot: 0,
      iconClass: 'icon-weixin',
      url: wx_qrcode,
      tooltips: '关注猎多多公众号<br/>不错过重要消息通知',
      type: 'hover'
    }
  ]
}