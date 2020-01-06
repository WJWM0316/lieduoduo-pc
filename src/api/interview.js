/**
 * 面试
 */
import {
  request
} from './index.js'

// 开撩约面
export const applyInterviewApi = data => request({
  url: '/interview/applyInterview',
  method: 'post',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 标记不合适
export const signInappropriateApi = data => request({
  url: '/interview/refuse',
  method: 'post',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 确定约面
export const confirmInterviewApi = data => request({
  url: `/interview/confirm/${data.id}`,
  method: 'post',
  params: data,
  config: {
    host: 'qiuzhi'
  }
})

// 获取底部面试状态
export const getInterviewStatusApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/getInterviewStatus',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 编辑不合适 或者暂不考虑
export const refuseInterviewApi = (data, hasLoading) => {
  return request({
    method: 'post',
    url: `/interview/refuse/${data.id}`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取面试的申请列表
export const getInterviewApplyListsApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/apply',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取日历面试列表
export const getInterviewScheduleNumberListsApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/newScheduleNumber',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取收到邀请列表
export const getInterviewInviteListsApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/invite',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取面试日程列表
export const getInterviewScheduleListsApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/schedule',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取面试的红点信息
export const getInterviewRedDotInfoApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/getInterviewRedDotInfo',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 清除面试红点信息
export const clearTabInterviewRedDotApi = (data, hasLoading) => {
  return request({
    method: 'delete',
    url: `/interview/deleteTabRedDot/${data.type}`,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 清除面试日程红点信息
export const clearDayInterviewRedDotApi = (data, hasLoading) => {
  return request({
    method: 'delete',
    url: `/interview/deleteScheduleTabRedDot/${data.date}`,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 删除面试列表单条红点
export const clearInterviewItemRedDotApi = (data, hasLoading) => {
  return request({
    method: 'delete',
    url: `/interview/redDot/${data.id}`,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取全部面试列表
export const getHistoryInterviewListsApi = (data, hasLoading) => {
  return request({
    method: 'get',
    url: '/interview/newHistory',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 获取面试详情
export const getInterviewDetailApi = (data) => {
  return request({
    method: 'get',
    url: `/interview/detail/${data.interviewId}?`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 暂不考虑
export const cencelInterviewApi = (data) => {
  return request({
    method: 'post',
    url: `/interview/refuse/${data.recruiterUid}?`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 面试安排不合适
export const notonsiderInterviewApi = (data) => {
  return request({
    method: 'post',
    url: `/interview/notonsider/${data.id}`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 招聘官撩约接口
export const inviteInterviewApi = (data) => {
  return request({
    method: 'post',
    url: '/interview/inviteInterview',
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 求职端面试详情
export const interviewDetailApi = (data) => {
  return request({
    method: 'get',
    url: `/interview/detail/${data.interviewId}?`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 招聘端面试安排设置
export const setInterviewDetailApi = (data) => {
  return request({
    method: 'post',
    url: `/interview/setInterviewInfo/${data.interviewId}`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}

// 求职端确认面试安排
export const sureInterviewApi = (data) => {
  return request({
    method: 'post',
    url: `/interview/confirmArrangementInfo/${data.interviewId}`,
    params: data,
    config: {
      host: 'qiuzhi'
    }
  })
}
