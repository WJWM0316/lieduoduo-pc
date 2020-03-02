<template>
  <!-- 职位申请 -->
  <el-dialog
    :visible.sync="dialogStatus"
    custom-class="app-dialog"
    width="610px"
    @close="handleClose"
    title="招聘申请">
    <div class="app-dialog-tabs">
      <ul>
        <template v-for="item in tabs">
          <li
            :key="item.value"
            @click="handleChangeTab(item)"
            :class="{active: item.value === currentValue, 'b-reddot': item.isdot}">{{item.name}}({{item.number}})</li>
        </template>
      </ul>
    </div>
    <div class="apply-lists" v-loading="getLoading && total === 0" v-infinite-scroll="loadmore" :infinite-scroll-disabled="disabledScroll">
      <no-found class="no-apply-lists" v-if="!lists.length && !getLoading" :tip-text="tipsText[currentValue]" max-width="200">
        <el-button type="primary" style="width: 143px;" v-if="currentValue < 2" @click="share">邀请同事</el-button>
      </no-found>
      <template v-for="(list,index) in lists">
        <div class="apply-list" :key="list.id">
          <div class="apply-info">
            <div class="apply-name">
              <span class="b-reddot" v-if="list.isRead === 0 && currentValue === 0"></span>
              <p class="_text">{{list.realName}}</p>
              <p>{{list.userPosition}}</p>
            </div>
            <div class="apply-email">
              <p>公司邮箱</p>
              <p class="_text">{{list.userEmail}}</p>
            </div>
            <div class="apply-time">
              <p>申请时间</p>
              <p class="_text">{{list.createdAt}}</p>
            </div>
          </div>
          <div class="apply-operate" :class="{_center: currentValue > 0}">
            <template v-if="currentValue === 0">
              <span @click="handleSetApply('pass', list, index)">通过</span>
              <span @click="handleSetApply('nopass', list, index)">不通过</span>
            </template>
            <span v-if="currentValue === 1" class="_disabled">已通过</span>
            <span v-if="currentValue === 2" class="_disabled">未通过</span>
          </div>
        </div>
      </template>
    </div>
  </el-dialog>
</template>
<script>
import { getApplylist, setPassApply, setUnPassApply } from '@/api/recruitTeam'
import NoFound from '@/components/noFound'
export default {
  props: {
    visible: Boolean,
    count: {
      type: Object,
      default: () => ({})
    },
    reddot: Boolean
  },
  components: { NoFound },
  data () {
    return {
      dialogStatus: false,
      currentValue: 0,
      tabs: [
        { value: 0, name: '待审核', isdot: false, number: 0 },
        { value: 1, name: '审核通过', isdot: false, number: 0 },
        { value: 2, name: '审核未通过', isdot: false, number: 0 }
      ],
      lists: [],
      params: {
        page: 1,
        count: 20
      },
      total: 0,
      nofoundUrl: require('@/assets/images/fly.png'),
      tipsText: [
        '暂无待审核的申请记录，邀请同事加入，一起开启社交招聘~',
        '暂无待审核的申请记录，邀请同事加入，一起开启社交招聘~',
        '暂无未通过的申请记录'
      ],
      getLoading: false,
      disabledScroll: false
    }
  },
  methods: {
    loadmore () {
      if (this.getLoading || this.total === 0) return
      this.params.page++
      this.getApplys()
    },
    getApplys () {
      this.getLoading = true
      getApplylist({ ...this.params, status: this.currentValue }).then(({ data }) => {
        this.getLoading = false
        this.lists = this.lists.concat(data.data || [])
        this.total = data.meta.total || 0
        this.disabledScroll = this.params.page * this.params.count >= data.meta.total
      }).catch(() => {
        this.getLoading = false
      })
    },
    // 设置是否通过
    handleSetApply (type, list = {}, index) {
      this.$confirm(type === 'pass' ? '确认该申请人加入公司？' : '确认该申请人不予加入公司？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: '_'
      }).then(() => {
        if (type === 'pass') {
          setPassApply({ id: list.id }).then(({ data }) => {
            const { code, httpStatus } = data || {}
            if (code === 402 && httpStatus === 200) {
              this.$alert('该招聘官已加入其他公司无需处理审核。', '温馨提示', {
                confirmButtonText: '知道了',
                type: '_',
                center: true
              })
              return
            }
            if (httpStatus === 200) {
              this.$emit('operate', -1, true)
              if (this.tabs[0].number > 0) this.tabs[0].number -= 1
              this.tabs[1].number += 1
              this.lists.splice(index, 1)
            }
          }).catch((err) => {
            if (err.data && err.data.code === 307) {
              this.$alert(err.data.msg, '温馨提示', {
                confirmButtonText: '知道了',
                type: '_',
                center: true
              })
            }
          })
        } else {
          setUnPassApply({ id: list.id }).then(({ data }) => {
            const { httpStatus } = data || {}
            if (httpStatus === 200) {
              this.$emit('operate', -1)
              if (this.tabs[0].number > 0) this.tabs[0].number -= 1
              this.tabs[2].number += 1
              this.lists.splice(index, 1)
            }
          })
        }
      })
    },
    handleChangeTab (tab) {
      this.currentValue = tab.value
      this.total = 0
      this.lists = []
      this.params.page = 1
      if (this.reddot) this.tabs[0].isdot = false
      this.getApplys()
    },
    handleClose () {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    share () {
      this.$emit('share', { uid: this.$store.state.recruiter.info.uid, childrenType: true })
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
        this.getApplys()
        this.tabs[0].number = this.count.apply
        this.tabs[0].isdot = this.reddot
        this.tabs[1].number = this.count.pass
        this.tabs[2].number = this.count.unpass
      } else {
        this.currentValue = 0
        this.total = 0
        this.params.page = 1
        this.lists = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-dialog-tabs {
  padding: 0 40px;
  border-bottom: 1px solid $border-color-1;
  li {
    display: inline-block;
    vertical-align: middle;
    color: $title-color-1;
    font-size: 14px;
    line-height: 20px;
    border-bottom: 2px solid transparent;
    padding-bottom: 10px;
    cursor: pointer;
    position: relative;
  }
  li + li {
    margin-left: 44px;
  }
  li:hover {
    color: $main-color-1;
  }
  li.active {
    border-color: $border-color-2;
    color: $main-color-1;
    font-weight: bold;
  }
}
.b-reddot::after {
  content: "";
  top: 0;
  right: -10px;
  position: absolute;
  width:6px;
  height:6px;
  background: $error-color-1;
  border-radius: 50%;
}
.apply-lists {
  height: 500px;
  overflow-y: auto;
}
.apply-list {
  @include flex-v-center;
  padding: 24px 40px;
  border-bottom: 1px solid $border-color-1;
  .apply-info {
    flex: 5;
    display: flex;
  }
  .apply-name{
    width: 24%;
  }
  .apply-time {
    width: 31%;
  }
  .apply-email {
    width: 45%;
  }
  .apply-email, .apply-time {
    p {
      color: $title-color-3;
      font-size: 12px;
    }
  }
  .apply-operate {
    flex: 1;
    padding-left: 2px;
    color: $main-color-1;
    cursor: pointer;
    font-weight: bold;
    min-width: 90px;
    span + span {
      margin-left: 18px;
    }
    ._disabled {
      color: $title-color-3;
    }
  }
  .apply-operate._center {
    text-align: center;
  }
  .apply-name {
    position: relative;
    max-width: 84px;
    .b-reddot::after {
      left: -10px;
      right: inherit;
      top: -6px;
    }
  }
  .apply-name p{
    font-size: 14px;
    color: $title-color-2;
  }
  p._text {
    line-height: 14px;
    color: $title-color-1;
    font-weight: bold;
  }
  p + p {
    margin-top: 8px;
  }
}
.no-apply-lists.no-found {
  padding: 100px 0;
  .el-button {
    margin-top: 24px;
  }
}
</style>
