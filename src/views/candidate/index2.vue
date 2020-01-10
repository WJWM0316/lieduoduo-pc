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
    <div v-loading="getLoading">
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
  </div>
</template>
<script>
import { getApplyListApi, getInviteListApi, getinviteapplyNum } from 'API/candidate'
import { getPositionTypeApi } from 'API/position'

// components
import HighFilter from 'COMPONENTS/b-interview/highFilter'
import NoFound from '@/components/noFound'
export default {
  components: { HighFilter, NoFound },
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
      candidateList: [] // 列表数据
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
        this.candidateList = data.data || []
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
          this.candidateList = data.data || []
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
</style>
