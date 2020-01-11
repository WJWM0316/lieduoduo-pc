<template>
  <!-- 候选人库 -->
  <div class="candidate-wrapper">
    <!-- header -->
    <div class="candidate-header">
      <div class="b-header-group-button">
        <div
          class="b-header-button"
          :class="{'active': params.navType==='apply'}"
          @click="handleSearch('apply', 'navType')">
          <span :class="{'is-red-dot' : recruiterIntentionList > 0}"></span>
          收到意向({{invitenum || 0}})
        </div>
        <div
          class="b-header-button"
          :class="{'active':  params.navType==='invite','is-red-dot' : recruiterInviteList > 0}"
          @click="handleSearch('invite', 'navType')">
          <span :class="{'is-red-dot' : recruiterIntentionList > 0}"></span>
          我的邀请({{applynum || 0}})
        </div>
      </div>
      <el-date-picker
        style="margin: 0 10px"
        v-model="times"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        @change="(val) => handleSearch(val, 'time')"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-select
        v-model="params.status"
        placeholder="请选择状态"
        @change="handleSearch()">
        <!-- @change="getPositionList(1)"  v-if="isTopAdmin" -->
        <template v-for="item in statusList">
          <el-option :key="item.value" v-show="item.type === params.navType || item.type === 'common'" :label="item.label" :value="item.value" />
        </template>
      </el-select>
      <high-filter
        title="职位类别筛选"
        :lists="positionTypeList"
        v-model="params.position_type_id"
        :allValue="['all']"
        @change="handleHighFilter" />
    </div>
    <!-- lists -->
    <div id="box" class="main_cont" v-loading="getLoading">
        <div class="candidate_blo" v-for="(item,index) in candidateList" @click="getResume(item.jobhunterUid, index)" :key="index">
          <div class="bloTop">
            <div class="timer">{{item.time}}</div>
            <div class="topText" v-if="params.navType === 'invite'">邀请面试</div>
            <div class="topText" v-if="params.navType === 'apply'">申请面试</div>

            <div class="topText topText2" v-if="item.positionId !== 0">
              【<span v-if="item.address">{{item.address.city}}{{item.address.area}}<span v-show="item.address.city">&nbsp;|&nbsp;</span></span><span v-if="item.positionName">{{item.positionName}}&nbsp;|&nbsp;</span><span v-if="item.emolument">{{item.positionEmolumentMin}}k-{{item.positionEmolumentMax}}K</span>】
            </div>

            <div class="topText topText2" v-if="item.origin">
              <div class="from">候选人来自</div>
              <div class="origin">{{item.origin}}</div>
            </div>
            <div class="bloTop-24hour-wrap">
              <div class="bloTop-24hour" v-if="item.interviewType === 2"></div>
            </div>

            <div class="status">
              <div class="like_user">
                <span :style="'color: #FF9E40'" v-if="item.statusDesc === '未处理'">{{item.statusDesc}}</span>
                <span v-else>{{item.statusDesc}}</span>
              </div>
              </div>
              <div class="phone" v-if="[21, 31, 32, 41].includes(item.status)">手机：{{item.resume.mobile}}</div>
              <div class="redot" v-if="item.redDot"></div>
          </div>
          <div class="bloCont">
            <div class="cont_left">
              <div class="leftMsg">
                <div class="userBaseInfo">
                  <img class="gender" src="~IMAGES/girl.png" v-if="item.resume.gender===2" />
                  <img class="gender" src="~IMAGES/boy.png" v-else />
                  <img class="userIcon" :src="item.avatar.middleUrl" />
                  <div class="infoRight">
                    <div class="infoName textEllipsis">
                      <span>{{item.jobhunterRealname}}</span>
                    </div>

                    <ul class="userLabel">
                      <li class v-if="item.resume.workAgeDesc">{{item.resume.workAgeDesc}}</li>
                      <li class v-if="item.resume.age">{{item.resume.age}}岁</li>
                      <li class v-else>暂无年龄</li>
                      <li class v-if="item.resume.degreeDesc">{{item.resume.degreeDesc}}</li>
                      <li class v-else>暂无学历</li>
                    </ul>
                  </div>
                </div>
                <div class="intention" v-if="item.resume.expect">
                  求职意向：
                  <span
                    class="intentionText intentionTextWidth textEllipsis"
                  >{{item.resume.expect.city}}</span>&nbsp;·&nbsp;
                  <span
                    class="intentionText intentionTextWidth2 textEllipsis"
                    style="color:#333"
                  >{{item.resume.expect.position}}</span>&nbsp;·&nbsp;
                  <span
                    class="intentionText2"
                  >{{item.resume.expect.salaryFloor}}k~{{item.resume.expect.salaryCeil}}k</span>
                </div>
                <div class="intention" v-else>求职意向：暂无求职意向</div>
              </div>
              <div class="bloExperience workExperience">
                <div class="experienceTitle">最近工作经历</div>
                <div
                  class="experienceText textEllipsis"
                  v-if="item.lastCompanyName"
                >{{item.lastCompanyName}}</div>
                <div
                  class="experienceText textEllipsis"
                  v-if="item.lastPosition"
                >{{item.lastPosition}}</div>
                <div class="experienceText textEllipsis" v-if="item.lastCompanyName.length<1">暂无工作经历</div>
              </div>
              <div class="bloExperience educationExperience">
                <div class="experienceTitle">最近教育经历</div>
                <div
                  class="experienceText textEllipsis"
                  v-if="item.resume && item.resume.school"
                >{{item.resume.school}}</div>
                <div class="experienceText textEllipsis" v-else>暂无教育经历</div>

                <div
                  class="experienceText textEllipsis"
                  v-if="item.resume && item.resume.major"
                >{{item.resume.major}}</div>
              </div>
            </div>
            <div class="userOp">
            <template v-if="item.btn2 && item.btn2.type">
              <el-button
                :disabled="item.btn2.disabled"
                @click.stop="setJob(item.btn2.type, item)"
                :type="item.btn2.buttonType">
                {{item.btn2.buttonText}}
              </el-button>
            </template>
            <el-button
              style="width: 112px;margin-left: 40px"
              :disabled="item.btn1.disabled"
              @click.stop="setJob(item.btn1.type, item)"
              :type="item.btn1.buttonType">
              {{item.btn1.buttonText}}
            </el-button>
          </div>
            <!-- <div class="userOp">
              <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'inappropriate', item, 1)" v-show="[11, 12, 21, 31, 32, 41].includes(item.status)">
                不合适
              </div>
                <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-show="[57, 58].includes(item.status)">
                  去评价
                </div>
                <div class="like_user" @click.stop="" v-show="[60, 61].includes(item.status)">
                  <span :style="'color: #92929B;'">已评价</span>
                </div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'confirm-interview', item, 1)" v-if="item.status === 11">查看联系</div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-if="item.status === 12">查看邀约</div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'arranging-interviews', item, 1)" v-if="item.status === 21">安排面试</div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'arranging-interviews', item, 1)" v-if="item.status === 31">
                <span>查看面试</span>
                </div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'arranging-interviews', item, 1)" v-if="item.status === 32">
                <span>修改面试</span>
                </div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-if="[41, 51, 57, 58, 59, 60, 61].includes(item.status)">面试详情</div>
              <div class="btn" @click="getResume(item.jobhunterUid, index)" v-if="[52, 53, 54, 55].includes(item.status)">查看简历</div>
            </div> -->
          </div>
        </div>
        <!-- no found -->
      <no-found class="no-apply-lists"
        v-if="!candidateList.length && !getLoading"
        :image-url="nofoundUrl"
        :tip-text="tipsText[this.params.navType]['text']"
        max-width="160">
        <el-button type="primary" style="width: 143px;margin-top: 24px;" @click="$router.push({name: 'recruiterIndex'})">分享职位</el-button>
      </no-found>
      </div>
    <!-- page -->
    <div class="pagination" v-if="total > 0 && total > params.count">
      <el-pagination
        background
        @current-change="(val) => handleSearch(val, 'page')"
        :current-page.sync ="params.page"
        :page-size="params.count"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 预览简历 -->
    <resume :current="currentItem" :visible.sync="resumeDialogStatus" @change-status="setJob" />
    <!-- 查看面试，安排面试弹窗 -->
    <interview-arrange :interviewId="interviewId" :visible.sync="arrangediggle" @finish="refreshPageData"></interview-arrange>
    <!-- 面试详情弹窗 -->
    <interview-detail :interviewId="interviewId" :visible.sync="detaildiggle" @finish="refreshPageData"></interview-detail>
    <!-- 选择不合适原因 -->
    <select-reson :reasonlist="reasonlist" :interviewId="interviewId" :jobuid="jobuid" :visible.sync="resondiggle" @finish="refreshPageData"></select-reson>
    <!-- 展示原因列表 -->
    <reson-list :interviewId="interviewId" :visible.sync="resonlistdiggle" @finish="refreshPageData"></reson-list>
    <!-- 开撩选择职位 -->
    <candidate-position :jobuid="jobuid" :visible.sync="positiondiggle" @finish="refreshPageData"></candidate-position>
    <!-- 处理多条面试弹窗 -->
    <apply-record :applyrecordList="applyrecordList" :interviewId="interviewId" :jobuid="jobuid" :recordtext="recordtext" :interviewNum="interviewNum" :visible.sync="recorddiggle" @finish="refreshPageData"></apply-record>
  </div>
</template>
<script>
import { getApplyListApi, getInviteListApi, getinviteapplyNum } from 'API/candidate'
import { manyrecordstatus, confirmInterviewApi, interviewRetract, getCommentReasonApi, getloadingReasonApi } from 'API/candidateType'
import { getPositionTypeApi } from 'API/position'

// components
import HighFilter from 'COMPONENTS/b-interview/highFilter'
import NoFound from '@/components/noFound'
import InterviewArrange from 'COMPONENTS/b-interview/interviewArrange'
import InterviewDetail from 'COMPONENTS/b-interview/interviewDetail'
import SelectReson from 'COMPONENTS/b-interview/selectReson'
import ResonList from 'COMPONENTS/b-interview/resonList'
import CandidatePosition from 'COMPONENTS/b-interview/candidatePosition'
import ApplyRecord from 'COMPONENTS/b-interview/applyRecord'
import Resume from 'COMPONENTS/b-interview/resume'
// 候选人动态操作按钮种类
const CandidateBtns = [
  { buttonText: '查看联系', type: 'confirm-interview', buttonType: 'primary', is: (val) => val === 11, statusText: '未处理' },
  { buttonText: '查看邀约', type: 'check-invitation', buttonType: 'primary', is: (val) => val === 12, statusText: '待对方处理' },
  { buttonText: '安排面试', type: 'arranging-interviews', buttonType: 'primary', is: (val) => val === 21, statusText: '待我安排' },
  { buttonText: '查看面试', type: 'arranging-interviews', buttonType: 'primary', is: (val) => val === 31, statusText: '待对方确认' },
  { buttonText: '修改面试', type: 'arranging-interviews', buttonType: 'primary', is: (val) => val === 32, statusText: '待我修改' },
  { buttonText: '面试详情', type: 'check-invitation', buttonType: 'primary', is: (val) => [41, 51, 57, 58, 59, 60, 61].includes(val), statusText: '已安排' },
  { buttonText: '查看简历', type: 'see-resume', buttonType: 'primary', is: (val) => [52, 53, 54, 55].includes(val), statusText: '' }
]
export default {
  components: { HighFilter, NoFound, Resume, InterviewArrange, InterviewDetail, SelectReson, ResonList, CandidatePosition, ApplyRecord },
  data () {
    return {
      params: {
        page: 1,
        count: 20,
        status: 0,
        created_start_time: '',
        created_end_time: '',
        position_type_id: ['all'],
        navType: 'apply' // apply | invite
      },
      nofoundUrl: require('@/assets/images/fly.png'),
      tipsText: {
        apply: { text: '与其等待，不如主动出击~分享职位获取更多候选人吧' },
        invite: { text: '与其等待，不如主动出击~分享职位获取更多候选人吧' }
      },
      statusList: [
        { value: 0, label: '全部', type: 'common' },
        { value: 11, label: '未处理', type: 'apply' },
        { value: 12, label: '未处理', type: 'invite' },
        { value: 21, label: '待安排', type: 'common' },
        { value: 31, label: '待对方确认', type: 'common' },
        { value: 32, label: '待我修改', type: 'common' },
        { value: 54, label: '对方暂不考虑', type: 'common' },
        { value: 52, label: '不合适', type: 'common' },
        { value: 41, label: '已安排', type: 'common' },
        { value: 51, label: '已结束', type: 'common' }
      ],
      times: [],
      invitenum: 0, // 收到意向数据
      applynum: 0, // 我的邀请数据
      positionTypeList: [], // 职位类型数据
      total: 0,
      candidateList: [], // 列表数据
      currentItem: {}, // 当前选定值
      // 弹窗状态
      jobuid: '',
      recordtext: '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；', // 默认多条面试记录标题
      interviewId: 0, // 面试id
      interviewNum: '', // 处理多条申请面试记录需要判断的数字
      reasonlist: [], // 选择不合适原因列表
      applyrecordList: [], // 处理多条申请面试记录列表
      resumeDialogStatus: false, // 查看简历详情
      arrangediggle: false, // 安排面试
      detaildiggle: false, // 面试详情
      resondiggle: false, // 选择不合适原因
      resonlistdiggle: false, // 展示原因
      positiondiggle: false, // 选择开撩职位
      recorddiggle: false // '选择多少申请面试列表'
    }
  },
  computed: {
    ...mapGetters([
      'recruiterIntentionList',
      'recruiterInviteList'
    ])
  },
  created () {
    const query = this.$route.query
    // position_type_id 类型转换
    query.position_type_id = query.position_type_id ? query.position_type_id.split(',').map(val => !isNaN(val) ? +val : val) : ['all']
    // times 转换
    this.times = query.created_start_time && query.created_end_time ? [query.created_start_time, query.created_end_time] : []
    for (let item in query) {
      if (this.params[item] !== undefined) {
        // 数字转换
        if (!isNaN(query[item]) && query[item] !== null && typeof query[item] !== 'object' && query[item] !== '') {
          this.params[item] = +query[item]
        } else {
          this.params[item] = query[item]
        }
      }
    }
    // 获取高级筛选的类型
    this.getPositionTypeList()
    // 获取数量
    this.getListCounts()
    // 初始化选择
    this.handleSearch(this.params.navType || 'apply', 'navType')
  },
  methods: {
    handleSearch (value, type) {
      if (type !== 'page') this.params.page = 1
      if (type && this.params[type] !== undefined) this.params[type] = value
      if (type === 'time') {
        this.params['created_start_time'] = (value && value[0]) || ''
        this.params['created_end_time'] = (value && value[1]) || ''
      }
      // 查询 | 更新高级筛选数据
      if (type === 'navType') {
        this.candidateList = []
        this.total = 0
      }
      switch (this.params.navType) {
        case 'invite':
          this.getApplyList()
          break
        case 'apply':
          this.getInviteList()
          break
      }
      this.$router.push({ name: this.$route.name, query: { ...this.params, q: Date.now(), position_type_id: this.params.position_type_id.join(',') } })
    },
    // 邀请
    getApplyList () {
      this.getLoading = true
      // 时间参数过滤防止接口报错
      const params = {
        ...this.params,
        position_type_id: this.params.position_type_id.join(',')
      }
      if (!params.created_start_time) delete params.created_start_time
      if (!params.created_end_time) delete params.created_end_time
      if (params.position_type_id === 'all') delete params.position_type_id
      getApplyListApi(params).then(({ data }) => {
        // this.candidateList = data.data || []
        this.candidateList = this.resetListDatas(data.data || [])
        this.total = data.meta.total
        this.applynum = data.meta.total
        this.getLoading = false
      })
        .catch(e => {
          this.candidateList = []
          this.getLoading = false
        })
    },
    // 意向列表
    getInviteList () {
      this.getLoading = true
      // 时间参数过滤防止接口报错
      const params = {
        ...this.params,
        position_type_id: this.params.position_type_id.join(',')
      }
      if (!params.created_start_time) delete params.created_start_time
      if (!params.created_end_time) delete params.created_end_time
      if (params.position_type_id === 'all') delete params.position_type_id
      getInviteListApi(params)
        .then(({ data }) => {
          // this.candidateList = data.data || []
          this.candidateList = this.resetListDatas(data.data || [])
          this.total = data.meta.total
          this.invitenum = data.meta.total
          this.getLoading = false
        })
        .catch(e => {
          this.candidateList = []
          this.getLoading = false
        })
    },
    // 职业类型列表
    getPositionTypeList () {
      const { position_type_id } = this.params
      getPositionTypeApi().then(({ data }) => {
        const results = data.data || []
        this.positionTypeList = [
          { name: '全部', labelId: 'all', active: position_type_id.includes('all') },
          ...results.map(item => {
            item.active = position_type_id.includes(item.labelId)
            return item
          })
        ]
      })
    },
    // 高级筛选
    handleHighFilter (value) {
      //
      this.handleSearch()
    },
    // 获取列表数量
    getListCounts () {
      getinviteapplyNum().then(({ data }) => {
        const { applyTotal, inviteTotal } = data.data
        this.applynum = applyTotal || 0
        this.invitenum = inviteTotal || 0
      })
    },
    refreshPageData () {
      // { cb }
      switch (this.params.navType) {
        case 'invite':
          this.getApplyList()
          break
        case 'apply':
          this.getInviteList()
          break
      }
    },
    // 重置接口数据
    resetListDatas (data) {
      data.forEach((item) => {
        item.btn1 = {}
        item.btn2 = {}
        const { status } = item
        let btn1 = CandidateBtns.find(val => {
          return val.is(status)
        })
        item.btn1 = btn1 || {}
        if (status === 11 || status === 12 || status === 21 || status === 31 || status === 32 || status === 41) {
          item.btn2 = { buttonType: 'text', type: 'inappropriate', buttonText: '不合适' }
        }
        if (status === 57 || status === 58) {
          item.btn2 = { buttonType: 'text', type: 'check-invitation', buttonText: '去评价' }
        }
        if (status === 60 || status === 61) {
          item.btn2 = { buttonType: 'text', disabled: true, buttonText: '已评价' }
        }

        // 是否有展开简历详情弹窗
        if (this.resumeDialogStatus && this.currentItem.vkey === item.vkey) {
          this.currentItem = item
        }
      })
      return data
    },
    // 查看简历
    viewResume (item) {
      this.currentItem = item
      this.resumeDialogStatus = true
    },
    setJob (type, vo) {
      if (vo.interviewId) {
        this.interviewId = vo.interviewId
      } else {
        this.interviewId = vo.interviewInfo.data.lastInterviewId
      }
      if (vo.jobhunterUid) {
        this.jobuid = vo.jobhunterUid
      } else {
        this.jobuid = vo.uid
      }
      this.currentItem = vo
      switch (type) {
        case 'recruiter-chat':
          this.positiondiggle = true
          break
        case 'check-invitation':
          this.detaildiggle = true
          break
        case 'confirm-interview':
          let status = { vkey: vo.resume ? vo.resume.vkey : vo.vkey, type: 'resume' }
          manyrecordstatus(status).then((res) => {
            if (res.data.data.data.length > 1) {
              let applylists = res.data.data.data
              applylists.map((v, k) => {
                if (v.positionId === 0) {
                  v.positionName = '直接与我约面'
                }
                v.hascur = false
                v.boxshow = false
              })
              this.applyrecordList = applylists
              this.recordtext = '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；'
              this.recorddiggle = true
            } else {
              confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
                this.$message.success('约面成功')
                this.viewResume(vo)
                // 更新列表和弹窗显示状态
              })
            }
          })
          break
        case 'arranging-interviews':
          this.arrangediggle = true
          break
        case 'interview-retract':
          let retract = { jobhunterUid: vo.uid, interviewId: this.interviewId }
          interviewRetract(retract).then(({ data }) => {
            if (data.httpStatus === 200) {
              this.$message.success('撤回成功')
            }
            // 更新列表和弹窗显示状态

            // this.getResume(this.jobuid)
            // this.init()
          })
          break
        case 'see-resume':
          this.viewResume(vo)
          break
        case 'watch-reson':
          this.resonlistdiggle = true
          break
        case 'inappropriate':
          let status2 = { vkey: vo.resume ? vo.resume.vkey : vo.vkey, type: 'resume' }
          manyrecordstatus(status2).then((res) => {
            this.interviewNum = res.data.data
            if (res.data.data.data.length > 1) {
              let applylists = res.data.data.data.slice()
              applylists.push({ positionName: '都不合适' })
              applylists.map((v, k) => {
                if (v.positionId === 0) {
                  v.positionName = '直接与我约面'
                }
                v.hascur = false
              })
              this.applyrecordList = applylists
              this.recordtext = '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；'
              this.recorddiggle = true
            } else {
            // 大于61是结束后不满意
              if (res.data.data.interviewStatus === 58 || res.data.data.interviewStatus === 59) {
                getCommentReasonApi().then((res) => {
                  let arr = res.data.data
                  arr.map((v, k) => {
                    v.cur = false
                  })
                  this.reasonlist = arr
                  this.resondiggle = true
                })
              } else {
                getloadingReasonApi().then((res) => {
                  let arr = res.data.data
                  arr.map((v, k) => {
                    v.cur = false
                  })
                  this.reasonlist = arr
                  this.resondiggle = true
                })
              }
            }
          })
          break
        default:
          break
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.candidate-header {
  height: 40px;
  display: flex;
  .high-filter {
    margin-left: auto;
  }
}
.main_cont {
  margin-top: 20px;
  .candidate_blo {
    height: 196px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 1px solid #DDE1E0;
    margin-bottom: 15px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover{
      box-shadow:0px 10px 20px 0px rgba(0,0,0,0.1);
    }
    .bloTop {
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #DDE1E0;
      padding: 0 32px 0 24px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#92929B;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      .phone{
        float: right;
        margin-right: 36px;
        font-weight:400;
        font-size:14px;
        color:#66666E;
      }
      .redot{
        position: absolute;
        right: 0px;
        top: 8px;
        right: 8px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background:#F45322;
      }
      .timer {
        float: left;
      }
      .topText {
        float: left;
        margin-left: 8px;
        .from{
          float: left;
          font-size:12px;
          margin-left: 30px;
          color:#92929B;
        }
        .origin{
          float: left;
          padding: 0px 8px;
          height:22px;
          background:#E5F9FA;
          border-radius:4px;
          color:#00C4CD;
          text-align: center;
          line-height: 22px;
          margin-left: 4px;
          margin-top: 12.5px;
        }
      }
      .topText2 {
        color: #333333;
      }
      .bloTop-24hour-wrap{
        margin-left: 14px;
        float: left;
        height: 48px;
        @include flex-v-center;
      }
      .bloTop-24hour{
        width: 47px;
        height: 18px;
        background: url('../../assets/images/tag_list_24hour.png') no-repeat;
        background-size: cover;
      }
      .status{
        float: right;
        color:#66666E;
        font-size: 14px;
      }
    }
    .bloCont {
      display: flex;
      flex-direction: row;
      height: 148px;
      position: relative;
      .cont_left {
        display: flex;
        flex-direction: row;
        width: 80%;
        padding: 20px 0px 20px 32px;
        box-sizing: border-box;
        .leftMsg {
          height:72px;
          width: 380px;
          .userBaseInfo {
            position: relative;
            height:72px;
            .userIcon {
              width:72px;
              height:72px;
              display: block;
              float: left;
              margin-right: 16px;
              border-radius: 50%;
            }
            .gender {
              width:19px;
              height:19px;
              border-radius: 50%;
              position: absolute;
              left: 50px;
              bottom: 0;
            }
            .infoRight {
              height:72px;
              text-align: left;
              padding-top: 10px;
              .infoName {
                font-size:20px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:#333333;
                line-height:28px;
                margin-bottom: 6px;
              }
              .userLabel {
                height: 20px;
                li {
                  display: inline-block;
                  height:20px;
                  line-height: 20px;
                  border-radius:2px;
                  padding: 0 6px;
                  box-sizing: border-box;
                  margin-right: 8px;
                  font-size:12px;
                  font-weight:400;
                  color:#66666E;
                  background:#F4F7F7;
                }
              }
            }
          }
          .intention {
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color: #66666E;;
            line-height:20px;
            text-align: left;
            margin-top: 12px;
            display: flex;
            .intentionTextWidth {
              max-width: 100px;
            }
            .intentionTextWidth2 {
              max-width: 125px;
            }
            .intentionText {
              color: #333333;
            }
            .intentionText {
              color: #333333;
            }
            .intentionText2 {
              color: #FF9E40;
            }
          }
        }
        .bloExperience {
          height: 88px;
          width: 285px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#92929B;
          line-height:22px;
          text-align: left;
          padding-top: 10px;
          position: relative;
          padding-left: 20px;
          padding-right: 20px;
          overflow: hidden;
          box-sizing: border-box;
          &::after {
            content: '';
            width: 1px;
            height: 100px;
            background: #E8E9EB;
            position: absolute;
            left: 0;
            top: 10px;
          }
          &.educationExperience {
            width: 225px;
          }
          .experienceTitle {
            margin-bottom: 8px;
          }
          .experienceText {
            color:#333333;
            margin-bottom: 8px;
          }
        }
      }

      .userOp {
        position: absolute;
        top: 55px;
        right: 32px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .like_user {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          font-size: 14px;
          color: #00C4CD;
          cursor: pointer;
          img {
            margin-right: 7px;
            position: relative;
            top: -2px;
          }
        }
        .btn {
          width:112px;
          height:40px;
          line-height:40px;
          background:#00C4CD;
          border-radius:4px;
          font-size:14px;
          color:#fff;
          text-align: center;
          margin-left: 40px;
          cursor: pointer;
          &:hover{
            background: mix(#fff, $bg-color-4, 20%);
            border-color: mix(#fff, $border-color-2, 20%);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
