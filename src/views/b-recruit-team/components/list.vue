<template>
  <el-dialog
    :visible.sync="dialogStatus"
    custom-class="app-dialog"
    width="436px"
    @close="handleClose"
    title="职位管理">
    <div class="position-header">
      <div class="recruit-image">
        <img :src="recurit.avatar && recurit.avatar.smallUrl" alt="">
      </div>
      <span class="recruit-name">{{recurit.name}}</span>
      <span>发布的职位</span>
    </div>
    <div class="warpper-scroll position-lists" v-loading="getLoading && total === 0" v-infinite-scroll="loadmore" :infinite-scroll-disabled="disabledScroll">
      <template v-for="item in lists">
        <div :key="item.id" class="position-list" :class="{'is-close': item.isOnline === 2}">
          <div class="position-info">
            <p>
              <span class="position-close" v-if="item.isOnline === 2">关闭</span>
              <span class="position-name">{{item.positionName}}</span>
              <span class="position-emolument">{{item.emolumentMin}}K~{{item.emolumentMax}}K<template v-if="item.annualSalary > 12">·{{item.annualSalaryDesc}}</template></span>
            </p>
            <p class="position-tags">
              <span v-if="item.city">{{item.city}}{{item.district}}</span>
              <span>{{item.workExperienceName}}</span>
              <span>{{item.educationName}}</span>
            </p>
          </div>
          <div class="position-operate">
            <span @click="handleDetails(item.id, item.isOnline)">查看</span>
            <el-popover
              placement="bottom"
              popper-class="position-list-popover"
              :disabled="item.isOnline === 2"
              width="166">
              <div class="popover-share" v-loading="popoverLoading">
                <img :src="qrUrl" alt="">
                <p>微信扫码</p>
                <p>打开小程序查看</p>
              </div>
              <span slot="reference" @click="handleShowQrCode(item.id, item.isOnline)">分享</span>
            </el-popover>
          </div>
        </div>
      </template>
      <no-found class="no-apply-lists" v-if="!lists.length && !getLoading" tip-text="招聘官暂未发布/开放职位" max-width="160" />
    </div>
  </el-dialog>
</template>
<script>
import { getBtremListApi, getCodeUrl } from '@/api/position'
import NoFound from '@/components/noFound'
export default {
  props: {
    // 招聘官id
    recurit: {
      type: Object,
      required: true,
      default: () => ({})
    },
    visible: Boolean
  },
  components: { NoFound },
  data () {
    return {
      dialogStatus: false,
      lists: [],
      nofoundUrl: require('@/assets/images/fly.png'),
      getLoading: false,
      popoverLoading: false,
      qrUrl: '',
      params: {
        count: 20,
        page: 1,
        is_online: 1
      },
      total: 0,
      disabledScroll: false
    }
  },
  methods: {
    loadmore () {
      if (this.getLoading || this.total === 0 || this.disabledScroll) return
      this.params.page++
      this.getList()
    },
    getList () {
      this.getLoading = true
      getBtremListApi({ ...this.params, recruiter: this.recurit.uid }).then(({ data }) => {
        this.getLoading = false
        this.lists = this.lists.concat(data.data || [])
        this.total = data.meta.total
        this.disabledScroll = this.params.page * this.params.count >= data.meta.total
      }).catch(() => {
        this.getLoading = false
      })
    },
    handleShowQrCode (id, isonline) {
      if (isonline === 2) return
      this.qrUrl = ''
      this.getQrCode(id)
    },
    getQrCode (id) {
      this.popoverLoading = true
      getCodeUrl({ id }).then(({ data }) => {
        this.popoverLoading = false
        this.qrUrl = data.data.qrCodeUrl
      }).catch(() => {
        this.popoverLoading = false
      })
    },
    handleDetails (id, isonline) {
      if (isonline === 2) return
      const resolve = this.$router.resolve({
        name: 'positionDetail',
        query: {
          positionId: id
        }
      })
      window.open(resolve.href, '_blank')
    },
    handleClose () {
      this.lists = []
      this.$emit('update:visible', false)
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
        this.params.page = 1
        this.getList()
      } else {
        this.lists = []
        this.total = 0
        this.disabledScroll = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$font-color-close : #ED5C5C;
.position-header {
  @include flex-v-center;
  padding: 0 40px;
  margin-bottom: 20px;
  .recruit-image {
    @include img-radius(32px, 32px);
    border: 1px solid $border-color-1;
  }
  .recruit-name {
    color: $title-color-1;
    font-weight: bold;
    padding: 0 10px;
  }
}
.position-lists {
  padding: 0 40px 11px;
  height: 473px;
  overflow-y: auto;
  .position-list:first-of-type {
    border-top: 1px solid $border-color-1;
  }
  .no-apply-lists {
    padding-top: 96px;
  }
}
.position-list {
  border-bottom: 1px solid $border-color-1;
  padding: 24px 0;
  @include flex-v-center;
  .position-info {
    flex: 1;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .position-operate {
    font-size: 14px;
    color: $main-color-1;
    cursor: pointer;
    span + span {
      margin-left: 20px;
    }
  }
  .position-name, .position-emolument {
    color: $title-color-1;
    font-size: 14px;
    font-weight: bold;
  }
  .position-name {
    max-width: 160px;
    margin-right: 18px;
    @include ellipsis;
  }
  .position-tags {
    margin-top: 12px;
    span {
      padding: 4px 6px;
      font-size: 12px;
      line-height: 1;
      background: $bg-color-1;
      color: $title-color-2;
      border-radius:2px;
    }
    span + span {
      margin-left: 8px;
    }
  }
  .position-close {
    border: 1px solid  $border-color-9;
    color: $font-color-close;
    font-size: 12px;
    padding: 4px 6px;
    border-radius:2px;
    margin-right: 10px;
  }
}
.position-list.is-close {
  .position-name, .position-emolument,.position-tags span,  .position-operate{
    color: $title-color-3;
  }
  .position-operate span{
    cursor: not-allowed;
  }
}
</style>
<style lang="scss">
.position-list-popover.el-popover {
  min-height: 166px;
  color: $title-color-2;
  padding: 15px 0 0;
  font-size: 12px;
  text-align: center;
  img {
    max-width: 104px;
    min-height: 104px;
    margin-bottom: 7px;
  }
}
</style>
