<template>
  <!-- 招聘团队 -->
  <div class="recruit-team">
    <div class="rec-team-header">
      <h1>招聘官团队</h1>
      <el-badge :is-dot="reddot">
        <el-button type="primary" @click="applyDialog = true">招聘申请（{{applyNumber}}）</el-button>
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
          <div class="recruit-position-number" @click="handleShowPosition(item)">发布了{{item.positionNum}}个职位 <span class="iconfont icon-right"></span></div>
          <div class="recruit-interview-number">面试了{{item.interviewNum}}人</div>
          <div class="recruit-activity-time">活跃于 {{item.visitTimeDesc}}</div>
          <div class="recruit-share">分享</div>
        </div>
      </template>
    </div>
    <position-list :visible.sync="positionDialog" :recurit="currentRecruit" />
    <apply-list :visible.sync="applyDialog" />
  </div>
</template>
<script>
import { getTeamRecruiters, getApplyReddot } from '@/api/recruitTeam'
import PositionList from './components/list'
import ApplyList from './components/apply'
export default {
  components: { PositionList, ApplyList },
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
      reddot: false,
      applyNumber: 0
    }
  },
  computed: {
    ...mapGetters([
      'recruitDataLoaded',
      'recruitDataCompanyId'
    ])
  },
  created () {
    this.getreddots()
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
    // 获取红点数量和组件
    getreddots () {
      getApplyReddot().then(({ data }) => {
        const { applyAuditBarNum, applyAuditBar } = data.data
        this.reddot = Boolean(applyAuditBar || 0)
        this.applyNumber = applyAuditBarNum || 0
      })
    },
    // 临时解决
    getScrollTop () {
      var scrollTop = 0; var bodyScrollTop = 0; var documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
      return scrollTop
    },
    // 临时解决
    getScrollHeight () {
      var scrollHeight = 0; var bodyScrollHeight = 0; var documentScrollHeight = 0
      if (document.body) {
        var bSH = document.body.scrollHeight
      }
      if (document.documentElement) {
        var dSH = document.documentElement.scrollHeight
      }
      scrollHeight = (bSH - dSH > 0) ? bSH : dSH
      return scrollHeight
    },
    // 临时解决
    getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    },
    handleScroll () {
      if (this.getScrollTop() + this.getWindowHeight() === this.getScrollHeight()) {
        this.loadmore()
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    recruitDataLoaded: {
      handler (value) {
        this.getLoading = !value
        if (value) {
          this.getDatas()
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
  padding: 0 !important;
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
    flex: 3;
    color: $main-color-1;
  }
}
</style>
