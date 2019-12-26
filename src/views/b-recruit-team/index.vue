<template>
  <!-- 招聘团队 -->
  <div class="recruit-team">
    <div class="rec-team-header">
      <h1>招聘官团队</h1>
      <el-button type="primary">招聘申请（1）</el-button>
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
  </div>
</template>
<script>
import { getTeamRecruiters } from '@/api/recruitTeam'
import PositionList from './components/list'
export default {
  components: { PositionList },
  data () {
    return {
      lists: [],
      getLoading: false,
      positionDialog: false,
      currentRecruit: {},
      params: {
        page: 1,
        count: 20
      }
    }
  },
  computed: {
    ...mapGetters([
      'recruitDataLoaded',
      'recruitDataCompanyId'
    ])
  },
  methods: {
    load () {
      console.log(1)
    },
    getDatas () {
      this.getLoading = true
      setTimeout(() => {
        getTeamRecruiters({ ...this.params, companyId: this.recruitDataCompanyId }).then(({ data }) => {
          this.getLoading = false
          this.lists = data.data || []
        }).catch(() => {
          this.getLoading = false
        })
      }, 50)
    },
    handleShowPosition (item) {
      this.currentRecruit = item
      this.positionDialog = true
    },
    handleScroll () {
      //
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
