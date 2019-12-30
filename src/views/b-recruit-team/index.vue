<template>
  <!-- 招聘团队 -->
  <div class="recruit-team" v-infinite-scroll="loadmore" :infinite-scroll-disabled="disabledScroll">
    <div class="rec-team-header">
      <h1>招聘官团队</h1>
      <el-badge :is-dot="reddot" v-if="recruiterIsAdmin">
        <el-button type="primary" @click="applyDialog = true">招聘申请（{{count.apply}}）</el-button>
      </el-badge>
    </div>
    <div class="recruit-lists">
      <template v-for="item in lists">
        <div class="recruit-list" :key="item.id">
          <div class="recruit-info">
            <div class="recruit-image">
              <img :src="item.avatar && item.avatar.smallUrl" alt="">
            </div>
            <div>
              <p class="recruit-name"><span class="recruit-name-text">{{item.name}}</span> <span class="admin-tag" v-if="item.isCompanyAdmin">管理员</span></p>
              <p class="recruit-position">{{item.position}}</p>
              <p class="recruit-email"><span>邮箱：</span>{{item.email}}</p>
            </div>
          </div>
          <div class="recruit-position-number" @click="handleShowPosition(item)">{{item.positionNum}}个招聘中职位 <span class="iconfont icon-right"></span></div>
          <div class="recruit-interview-number">面试了{{item.interviewNum}}人</div>
          <div class="recruit-activity-time">活跃于 {{item.visitTimeDesc}}</div>
          <div class="recruit-share" @click="handleShowShare(item)">分享</div>
        </div>
      </template>
    </div>
    <!-- 职位列表 -->
    <position-list :visible.sync="positionDialog" :recurit="currentRecruit" />
    <!-- 申请列表 -->
    <apply-list
      :visible.sync="applyDialog"
      @close="hanldeApplyClose"
      @share="handleShowShare"
      @operate="handleSetApply"
      :count="count"
      :reddot="reddot"/>
    <!-- 分享弹窗 -->
    <share-popup :visible.sync="showSharePopup" :type="showSharePopupType" :data="currentSharePopup"/>
  </div>
</template>
<script>
import { getTeamRecruiters, getApplyReddot, getApplyCount } from '@/api/recruitTeam'
import SharePopup from '@/components/common/sharePopup'
import PositionList from './components/list'
import ApplyList from './components/apply'
export default {
  components: { PositionList, ApplyList, SharePopup },
  data () {
    return {
      lists: [],
      getLoading: false,
      positionDialog: false,
      applyDialog: false,
      currentRecruit: {},
      params: {
        page: 1,
        count: 20
      },
      total: 0,
      disabledScroll: false,
      showSharePopup: false,
      reddot: false,
      count: {
        apply: 0,
        pass: 0,
        unpass: 0
      },
      showSharePopupType: 'recruiter',
      currentSharePopup: {}
    }
  },
  computed: {
    ...mapGetters([
      'recruitDataLoaded',
      'recruitDataCompanyId',
      'recruiterIsAdmin'
    ])
  },
  methods: {
    loadmore () {
      if (this.getLoading || this.total === 0 || this.disabledScroll) return
      this.params.page++
      this.getDatas()
    },
    getDatas () {
      this.getLoading = true
      setTimeout(() => {
        getTeamRecruiters({ ...this.params, companyId: this.recruitDataCompanyId }).then(({ data }) => {
          this.getLoading = false
          this.lists = this.lists.concat(data.data || [])
          this.total = data.meta.total || 0
          this.disabledScroll = this.params.page * this.params.count >= data.meta.total
        }).catch(() => {
          this.getLoading = false
        })
      }, 50)
    },
    handleShowPosition (item) {
      this.currentRecruit = item
      this.positionDialog = true
    },
    // 获取红点
    getreddots () {
      getApplyReddot().then(({ data }) => {
        const { applyAuditBar } = data.data
        this.reddot = Boolean(applyAuditBar || 0)
      })
    },
    // 获取数量
    getCounts () {
      getApplyCount().then(({ data }) => {
        const counts = data.data || {}
        Object.assign(this.count, {
          apply: counts.auditNum,
          pass: counts.auditPassNum,
          unpass: counts.auditFailNum
        })
      })
    },
    handleShowShare (item) {
      this.currentSharePopup = item
      if (!item.childrenType) {
        this.showSharePopupType = 'recruiter'
      } else {
        this.showSharePopupType = 'invite'
      }
      this.showSharePopup = true
    },
    // 刷新红点状态
    hanldeApplyClose () {
      // 红点
      this.getreddots()
      // 更新数量
      this.getCounts()
    },
    // 审核招聘官
    handleSetApply (number, isReload = false) {
      this.count.apply += number
      if (isReload) {
        this.lists = []
        this.getDatas()
      }
    }
  },
  watch: {
    recruitDataLoaded: {
      handler (value) {
        this.getLoading = !value
        if (value) {
          this.getDatas()
          // 如果是超级管理员
          if (this.recruiterIsAdmin) {
            this.getCounts()
            this.getreddots()
          }
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.recruit-team {
  background: #fff;
  box-sizing: border-box;
  .rec-team-header {
    padding: 40px 50px 30px;
    @include flex-v-center;
  }
  h1 {
    font-size: 24px;
    color: $title-color-1;
    flex: 1;
  }
}
.recruit-list {
  @include flex-v-center;
  padding: 32px;
  font-size: 14px;
  border-top: 1px solid rgba($border-color-1, .4);
  .recruit-info div, .recruit-name span {
    display: inline-block;
    vertical-align: middle;
  }
  .recruit-name .recruit-name-text {
    font-weight: bold;
    font-size: 20px;
    color: $title-color-1;
    max-width: 160px;
    @include ellipsis;
  }
  .recruit-name .admin-tag {
    background: $bg-color-5;
    padding: 4px 12px;
    border-radius: 10px;
    font-size: 12px;
    color: $main-color-1;
    margin-left: 8px;
  }
  .recruit-position {
    margin-top: 10px;
    color: $title-color-2;
  }
  .recruit-email {
    margin-top: 20px;
    color: $title-color-1;
    span {
      color: $title-color-2;
    }
  }
  .recruit-image {
    margin:0 18px 0 20px;
    @include img-radius(72px, 72px);
    border: 1px solid $border-color-1;
  }
  .recruit-info {
    flex: 9;
  }
  .recruit-position-number {
    flex: 4;
    color: $main-color-1;
    cursor: pointer;
  }
  .recruit-interview-number {
    flex: 3;
    color: $title-color-2;
  }
  .recruit-activity-time {
    flex: 6;
    color: $title-color-3;
  }
  .recruit-share {
    cursor: pointer;
    flex: 3;
    color: $main-color-1;
  }
}
</style>
