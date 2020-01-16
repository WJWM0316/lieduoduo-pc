<template>
  <!-- 候选人动态 -->
  <div class="candidate-type-wrapper">
    <!-- header -->
    <div class="candidate-header">
      <div class="b-header-button" style="margin-right: 24px;" :class="{'active':  params.navType==='hotRecommendation'}" @click="handleSearch('hotRecommendation', 'navType')">
        <i class="iconfont icon-weibiaoti--" style="padding-right: 6px"></i>热门推荐<span v-if="navNum.RecommendationCount !== 0">({{navNum.RecommendationCount || 0}})</span>
      </div>
      <div class="b-header-group-button">
        <div class="b-header-button" :class="{'active': params.navType==='searchBrowseMyself'}" @click="handleSearch('searchBrowseMyself', 'navType')">
          <i class="iconfont icon-zhengyan"></i>看过我的({{navNum.browseMyselfCount || 0}})
          <span :class="{'is-red-dot' : visitedMyselfNum > 0}"></span>
        </div>
        <div class="b-header-button" :class="{'active':  params.navType==='searchCollect'}" @click="handleSearch('searchCollect', 'navType')">
          <i class="iconfont icon-ganxingqu-" style="padding-right: 6px"></i>对我感兴趣({{navNum.collectMyselfCount || 0}})
          <span :class="{'is-red-dot' : interestedMyselfNum > 0}"></span>
        </div>
      </div>
      <div class="b-header-button" style="margin-left: 24px;" :class="{'active':  params.navType==='searchMyCollect'}" @click="handleSearch('searchMyCollect', 'navType')">
        <i class="iconfont icon-weibiaoti--" style="padding-right: 6px"></i>我感兴趣的({{navNum.myCollectCount || 0}})
      </div>
      <hot-filter
      v-if="params.navType==='hotRecommendation'"
        @clearfilter="handleclearfilter"
        @change="handleHotFilter" />
      <high-filter
      v-else
        :title="highFilterTitle"
        :lists="positionTypeList"
        v-model="params.type"
        :allValue="['all', 'index']"
        @change="handleHighFilter" />
    </div>
    <div class="null-recommendation" v-if="candidateList.length > 0 && len">
      <img src="@/assets/images/exclamation-circle.png" alt="">
      <span>无筛选结果，可以扩大筛选范围哟~</span>
    </div>
    <div class="recommendation" v-if="candidateList.length > 0 && len">为你推荐</div>
    <!-- lists -->
    <div id="box" class="main_cont" v-loading="getLoading">
      <div class="candidate_blo" @click="viewResume(item)" v-for="(item,index) in candidateList" :key="index">
        <div class="bloTop">
          <div class="timer">{{item.viewAt}}</div>
          <div class="topText" v-if="params.navType === 'searchBrowseMyself'">看过我的{{item.positionInfo && item.positionInfo.positionName ?'职位':'主页'}}</div>
          <div class="topText" v-if="params.navType === 'searchCollect'">对我{{item.positionInfo && item.positionInfo.positionName ?'的职位':''}}感兴趣</div>
          <div class="topText" v-if="params.navType === 'searchMyCollect'">对Ta感兴趣</div>
          <div class="topText topText2" v-if="params.navType==='hotRecommendation'">
            <span>根据你的</span>
            <span style="color:#03B3BB;">【{{item.positionInfo.positionName}}】</span>
            <span>为你推荐</span>
          </div>
          <div class="topText topText2" v-else>
            <span v-if="item.positionInfo.area || item.positionInfo.emolument">【{{item.positionInfo.area}}&nbsp;<span v-if="item.positionInfo.area">|</span>&nbsp;</span><span v-if="item.positionInfo.positionName">{{item.positionInfo.positionName}}&nbsp;|&nbsp;</span><span v-if="item.positionInfo.emolument"> {{item.positionInfo.emolument}}】</span>
          </div>
          <div class="status">
            <span>{{item.btn1 && item.btn1.statusText}}</span>
          </div>
          <div class="redDot" v-if="item.redDot > 0"></div>
        </div>
        <div class="bloCont">
          <div class="cont_left">
            <div class="leftMsg">
              <div class="userBaseInfo">
                <img class="gender" src="~@/assets/images/girl.png" v-if="item.gender===2" />
                <img class="gender" src="~@/assets/images/boy.png" v-else />
                <img class="userIcon" :src="item.avatar.middleUrl" />
                <div class="infoRight">
                  <div class="infoName textEllipsis">
                    <span v-if="item.glass"><img src="@/assets/images/glass.png" alt=""/></span>
                    <span v-else>{{item.name}}</span>
                  </div>
                  <ul class="userLabel">
                    <li class="" v-if="item.workAgeDesc">{{item.workAgeDesc}}</li>
                    <li class="" v-if="item.age">{{item.age}}岁</li>
                    <li class="" v-else>暂无年龄</li>
                    <li class="" v-if="item.degreeDesc">{{item.degreeDesc}}</li>
                    <li class="" v-else>暂无学历</li>
                  </ul>
                </div>
              </div>
              <div class="intention" v-if="item.expects.length>0">求职意向：<span class="intentionText intentionTextWidth textEllipsis"> {{item.expects[0].city}} </span>&nbsp;·&nbsp;
                <span class="intentionText intentionTextWidth2 textEllipsis" style="color:#333">{{item.expects[0].position}}</span>&nbsp;·&nbsp;
                <span class="intentionText2">{{item.expects[0].salaryFloor}}k~{{item.expects[0].salaryCeil}}k</span>
              </div>
              <div class="intention" v-else>求职意向：暂无求职意向</div>
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
            <el-button type="primary" @click.stop="viewResume(item)">查看简历</el-button>
          </div>
        </div>
      </div>
      <!-- no found -->
      <template v-if="params.navType==='hotRecommendation'">
      <no-found class="no-apply-lists"
        v-if="!candidateList.length && !getLoading && len"
        :tip-text="'无筛选结果，可以扩大筛选范围哟~'"
        max-width="160">
      </no-found>
      <no-found class="no-apply-lists"
        v-if="!candidateList.length && !getLoading && !len"
        :image-url="nofoundUrl"
        :tip-text="tipsText[this.params.navType]['text']"
        max-width="160">
        <!-- <el-button type="primary" style="width: 143px;margin-top: 24px;" @click="$router.push({name: 'recruiterIndex'})">分享职位</el-button> -->
        <el-button type="primary" style="width: 143px;margin-top: 24px;" @click="$router.push({name: 'recruiterIndex'})">发布/开放职位</el-button>
      </no-found>
      </template>
      <template v-else>
      <no-found class="no-apply-lists"
        v-if="!candidateList.length && !getLoading"
        :image-url="nofoundUrl"
        :tip-text="tipsText[this.params.navType]['text']"
        max-width="160">
        <!-- <el-button type="primary" style="width: 143px;margin-top: 24px;" @click="$router.push({name: 'recruiterIndex'})">分享职位</el-button> -->
        <el-button type="primary" style="width: 143px;margin-top: 24px;" @click="$router.push({name: 'recruiterIndex'})">发布/开放职位</el-button>
      </no-found>
      </template>
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
    <resume :current="currentItem" ref="resume" :visible.sync="resumeDialogStatus" @finish="refreshPageData" @change-status="setJob" />
    <!-- 查看面试，安排面试弹窗 -->
    <interview-arrange :interviewId="interviewId" :visible.sync="arrangediggle" @finish="refreshPageData"></interview-arrange>
    <!-- 面试详情弹窗 -->
    <interview-detail :interviewId="interviewId" :visible.sync="detaildiggle" @finish="refreshPageData"></interview-detail>
    <!-- 选择不合适原因 -->
    <select-reson :reasonlist="reasonlist" :interviewId="interviewId" :jobuid="jobuid" :visible.sync="resondiggle" @finish="refreshPageData"></select-reson>
    <!-- 展示原因列表 -->
    <reson-list :interviewId="interviewId" :visible.sync="resonlistdiggle" @finish="refreshPageData"></reson-list>
    <!-- 处理多条面试弹窗 -->
    <apply-record :applyrecordList="applyrecordList" :interviewId="interviewId" :jobuid="jobuid" :recordtext="recordtext" :interviewNum="interviewNum" :visible.sync="recorddiggle" @finish="refreshPageData"></apply-record>
  </div>
</template>
<script>
import InterviewArrange from 'COMPONENTS/b-interview/interviewArrange'
import InterviewDetail from 'COMPONENTS/b-interview/interviewDetail'
import SelectReson from 'COMPONENTS/b-interview/selectReson'
import ResonList from 'COMPONENTS/b-interview/resonList'
import ApplyRecord from 'COMPONENTS/b-interview/applyRecord'

import { getPositionTypeApi } from 'API/position'
import { getJobHunterPositionTypeApi, getSearchBrowseMyselfApi, getMyNavDataApi } from 'API/browse'
import { getSearchMyCollectApi, getSearchCollectApi, gethotRecommendationApi, getRecommendationList } from 'API/collect'
import { confirmInterviewApi, manyrecordstatus, getCommentReasonApi, getloadingReasonApi } from 'API/candidateType'
// components
import HighFilter from 'COMPONENTS/b-interview/highFilter'
import HotFilter from 'COMPONENTS/b-interview/hotFilter'
import NoFound from '@/components/noFound'
import Resume from 'COMPONENTS/b-interview/resume'
// 候选人动态操作按钮种类
// const CandidateTypeBtns = [
//   { buttonText: '查看联系', type: 'confirm-interview', buttonType: 'primary', is: (val) => val === 11, statusText: '未处理' },
//   { buttonText: '查看邀约', type: 'check-invitation', buttonType: 'primary', is: (val) => val === 12, statusText: '待对方处理' },
//   { buttonText: '安排面试', type: 'arranging-interviews', buttonType: 'primary', is: (val) => val === 21, statusText: '待我安排' },
//   { buttonText: '查看面试', type: 'arranging-interviews', buttonType: 'primary', is: (val) => val === 31, statusText: '待对方确认' },
//   { buttonText: '修改面试', type: 'arranging-interviews', buttonType: 'primary', is: (val) => val === 32, statusText: '待我修改' },
//   { buttonText: '面试详情', type: 'check-invitation', buttonType: 'primary', is: (val) => val >= 41, statusText: '已安排' }
// ]
export default {
  components: { HighFilter, HotFilter, NoFound, Resume, InterviewArrange, InterviewDetail, SelectReson, ResonList, ApplyRecord },
  data () {
    return {
      getLoading: false,
      params: {
        page: 1,
        count: 20,
        type: ['all'],
        category: 0, // 0 | 1
        index: 0, // 0 | 1
        positionId: '',
        cityNum: '',
        salaryIds: 1,
        navType: 'hotRecommendation' //  searchBrowseMyself-看过我的 searchCollect-对我感兴趣 searchMyCollect-我感兴趣的
      },
      nofoundUrl: require('@/assets/images/fly.png'),
      tipsText: {
        hotRecommendation: { text: '发布/开放职位，我们将为你推荐优质候选人~' },
        searchBrowseMyself: { text: '还没有人看过你哟~主动分享职位获取更多候选人吧' },
        searchCollect: { text: '还没有人对你感兴趣哟~主动分享职位获取更多候选人吧' },
        searchMyCollect: { text: '快去分享职位吧，一大波候选人等着开撩你！' }
      },
      highFilterTitle: '',
      navNum: {}, //
      positionTypeList: [], // 职位类型
      candidateList: [], // 候选人数据
      total: 0,
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
      recorddiggle: false // '选择多少申请面试列表'
    }
  },
  computed: {
    ...mapGetters([
      'visitedMyselfNum',
      'interestedMyselfNum'
    ]),
    len () {
      return this.params.positionId || this.params.cityNum || this.params.salaryIds !== 1
    }
  },
  created () {
    const query = this.$route.query
    // type 类型转换
    query.type = query.type ? query.type.split(',').map(val => !isNaN(val) ? +val : val) : ['all']
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
    // 获取数量
    this.getMyNavData()
    // 默认选择看过我的type
    this.handleSearch(this.params.navType || 'hotRecommendation', 'navType', false)
  },
  destroyed () {
    this.cleanListRedDot()
  },
  methods: {
    setJob (type, vo) {
      if (vo.interviewId) {
        this.interviewId = vo.interviewId
      } else if (vo.interviewInfo) {
        this.interviewId = vo.interviewInfo.id
      }
      this.jobuid = vo.uid
      this.currentItem = vo
      this.cleanListRedDot(vo)
      switch (type) {
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
    },
    // 查看简历
    viewResume (item) {
      this.currentItem = item
      this.resumeDialogStatus = true
      this.cleanListRedDot(item)
    },
    /**
     * 刷新页面按钮显示状态（弹窗简历按钮）
     * @param cb  刷新成功回调函数
     */
    refreshPageData () {
      switch (this.params.navType) {
        case 'hotRecommendation':
          this.gethotRecommendation()
          break
        case 'searchBrowseMyself':
          this.getSearchBrowseMyself()
          break
        case 'searchCollect':
          this.getSearchCollect()
          break
        case 'searchMyCollect':
          this.getSearchMyCollect()
          break
      }
      // 如果查看简历详情在打开状态就刷新简历数据
      if (this.$refs.resume) this.$refs.resume.getResume()
    },
    cleanListRedDot (vo = null) {
      if (vo !== null) {
        vo.redDot = 0
      }
      if (this.visitedMyselfNum + this.interestedMyselfNum > 0) {
        this.$store.dispatch('redDotfun')
      }
    },
    // 查询参数切换
    handleSearch (value, type, init = true) {
      if (type !== 'page') this.params.page = 1
      if (type) this.params[type] = value
      // 查询 | 更新高级筛选数据
      if (type === 'navType') {
        this.candidateList = []
        if (init) this.cleanListRedDot()
        this.total = 0
      }
      switch (this.params.navType) {
        case 'hotRecommendation':
          this.gethotRecommendation()
          break
        case 'searchBrowseMyself':
          if (type === 'navType') {
            this.highFilterTitle = '看过我的职位类型'
            this.getPositionTypeList()
          }
          this.clearfilerhot()
          this.getSearchBrowseMyself()
          break
        case 'searchCollect':
          if (type === 'navType') {
            this.highFilterTitle = '简历职位类型'
            this.getPositionTypeList()
          }
          this.clearfilerhot()
          this.getSearchCollect()
          break
        case 'searchMyCollect':
          if (type === 'navType') {
            this.highFilterTitle = '感兴趣职位类型'
            this.getJobHunterPositionType()
          }
          this.clearfilerhot()
          this.getSearchMyCollect()
          break
      }
      // 滚动到顶部
      // const dom = document.querySelector('.main_cont')
      // if (dom) {
      //   console.log(dom.getBoundingClientRect())
      //   this.$util.scrollToView(dom)
      // }

      // 渲染location
      this.$router.push({ name: this.$route.name, query: { ...this.params, q: Date.now(), type: this.params.type.join(',') } })
    },
    // 查询我感兴趣的
    getSearchMyCollect () {
      this.getLoading = true
      getSearchMyCollectApi({
        ...this.params,
        type: this.params.type.join(',')
      }).then(({ data }) => {
        this.candidateList = data.data || []
        this.total = data.meta.total
        this.navNum.myCollectCount = data.meta.total
        this.getLoading = false
      }).catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
    },
    // 对我感兴趣的
    getSearchCollect () {
      this.getLoading = true
      const type = this.params.type.join(',')
      getSearchCollectApi({
        ...this.params,
        type: type === 'index' ? '' : type
      }).then(({ data }) => {
        this.candidateList = data.data || []
        this.total = data.meta.total
        this.navNum.collectMyselfCount = data.meta.total
        this.getLoading = false
      }).catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
    },
    // 浏览过我的求职者
    getSearchBrowseMyself () {
      this.getLoading = true
      const type = this.params.type.join(',')
      getSearchBrowseMyselfApi({
        ...this.params,
        type: type === 'index' ? '' : type
      }).then(({ data }) => {
        this.candidateList = data.data || []
        this.total = data.meta.total
        this.navNum.browseMyselfCount = data.meta.total
        this.getLoading = false
      }).catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
    },
    // 热门推荐
    gethotRecommendation () {
      this.getLoading = true
      gethotRecommendationApi({
        ...this.params
      }).then(({ data }) => {
        this.candidateList = data.data || []
        this.total = data.meta.total
        this.navNum.RecommendationCount = data.meta.total
        this.getLoading = false
        if (this.candidateList.length === 0) {
          this.getRecommendationList()
        }
      }).catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
    },
    getRecommendationList () {
      this.getLoading = true
      getRecommendationList({
        page: this.params.page,
        count: this.params.count
      }).then(({ data }) => {
        this.candidateList = data.data || []
        this.total = data.meta.total
        // this.navNum.RecommendationCount = data.meta.total
        this.getLoading = false
      }).catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
    },
    // 职业类型列表
    getPositionTypeList () {
      const { index, type } = this.params
      getPositionTypeApi().then(res => {
        let data = res.data.data || []
        this.positionTypeList = [
          { name: '全部', labelId: 'all', active: type.includes('all') },
          ...data.map(item => {
            item.active = type.includes(item.labelId)
            return item
          }),
          { name: '我的主页', labelId: 'index', active: !!index }
        ]
      })
    },
    // 看过我的职业类型列表
    getJobHunterPositionType () {
      const { index, type } = this.params
      getJobHunterPositionTypeApi().then(res => {
        let data = res.data.data || []
        this.positionTypeList = [
          { name: '全部', labelId: 'all', active: type.includes('all') },
          ...data.map(item => {
            item.active = type.includes(item.labelId)
            return item
          }),
          { name: '暂无工作经验', labelId: 'index', active: !!index }
        ]
      })
    },
    // 高级筛选
    handleHighFilter (value) {
      if (value[0] === 'all') {
        this.params.category = 0
        this.params.index = 0
      } else if (value[0] === 'index') {
        this.params.category = 1
        this.params.index = 1
      } else {
        this.params.category = 1
        this.params.index = 0
      }
      this.handleSearch()
    },
    // 热门推荐高级筛选
    handleHotFilter (arr1, arr2, arr3) {
      if (arr1.length > 0) this.params.positionId = arr1[0].id
      if (arr2.length > 0) this.params.cityNum = arr2[0].areaId
      if (arr3.length > 0) this.params.salaryIds = arr3.join(',')
      this.params.page = 1
      this.$router.push({ name: this.$route.name, query: { ...this.params, q: Date.now(), type: this.params.type.join(',') } })
      this.gethotRecommendation()
    },
    // 热门推荐清除筛选
    handleclearfilter (arr) {
      this.clearfilerhot()
      this.gethotRecommendation()
    },
    clearfilerhot () {
      this.params.positionId = ''
      this.params.cityNum = ''
      this.params.salaryIds = 1
      this.params.page = 1
    },
    // 获取数量
    getMyNavData () {
      getMyNavDataApi().then(res => {
        this.navNum = res.data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.candidate-header {
  min-width: 960px;
  height: 40px;
  display: flex;
  align-items: center;
  .high-filter {
    margin-left: auto;
  }
}
.null-recommendation{
  display: flex;
  justify-content: center;
  align-items: center;
  width:462px;
  height:40px;
  margin: 20px auto;
  background:rgba(255,244,229,1);
  border-radius:8px;
  img{
    width: 16px;
    margin-right: 5px;
    height: 16px;
  }
  span{
    color: #FF9E40;
    font-size:14px;
  }
}
.recommendation{
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
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
      padding: 0 32px 0px 24px;
      font-size:12px;
      font-weight:400;
      color:#92929B;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      .timer {
        float: left;
      }
      .topText {
        float: left;
        margin-left: 8px;
      }
      .topText2 {
        color: #333333;
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
                font-weight:600;
                color:#333333;
                line-height:28px;
                height: 28px;
                margin-bottom: 6px;
                span{
                  height: 28px;
                  width: 100px;
                  display: block;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
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
                  color:#66666E;
                  background:#F4F7F7;
                  font-weight:400;
                }
              }
            }
          }
          .intention {
            height:20px;
            font-size:14px;
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
        .el-button {
          width: 112px;
        }
      }
    }
  }
}
.redDot{
  position: absolute;
  right: 0px;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #F45322;
}
</style>
