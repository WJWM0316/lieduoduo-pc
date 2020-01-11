<template>
  <div class="orders-wrapper">
    <!-- 账户明细 -->
    <div class="order-wrapper-content">
      <div class="order-title">账户明细</div>
      <div class="order-lists" v-loading="getLoading">
        <div class="order-list" v-for="list in lists" :key="list.id">
          <div>
            <p class="list-label">{{list.label}}</p>
            <p class="list-time">{{list.updatedAt}}</p>
          </div>
          <div class="">
            <p class="list-money" :class="{'is-add': list.type  === -1, 'is-return' : list.status  === 3}">{{list.type === 1 ? '-' : '+' }}{{list.money}}</p>
            <p class="list-status-text" :class="{'is-add-text': list.type  === 1}" v-if="list.statusText">{{list.statusText}}</p>
          </div>
        </div>
        <no-found
          class="no-apply-lists"
          v-if="!lists.length && !getLoading"
          tip-text="暂无明细记录～" />
      </div>
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
      <div>共{{Math.ceil(total/params.count)}}页，{{total}}条记录</div>
    </div>
  </div>
</template>
<script>
import { getRecruiterOrders } from 'API/recruiter'
import NoFound from '@/components/noFound'
export default {
  data () {
    return {
      lists: [],
      params: {
        count: 20,
        page: 1
      },
      total: 0,
      getLoading: false
    }
  },
  components: { NoFound },
  created () {
    this.getOrders()
  },
  methods: {
    getOrders () {
      this.getLoading = true
      getRecruiterOrders(this.params).then(({ data }) => {
        this.getLoading = false
        this.total = data.meta.total
        this.lists = data.data || []
      }).catch(() => {
        this.getLoading = false
      })
    },
    handleSearch () {
      this.getOrders()
    }
  }
}
</script>
<style lang="scss" scoped>
.order-wrapper-content {
  background: #fff;
}
.orders-wrapper {
  .order-title {
    padding: 32px 40px 10px;
    box-sizing: border-box;
    font-size: 20px;
    color: $title-color-1;
    font-weight: bold;
  }
}
.order-lists {
  min-height: 92px;
  box-sizing: border-box;
  width: 100%;
  min-width: 600px;
  padding: 0 40px;
  .order-list:first-child {
    border-top: none;
  }
}
.order-list {
  @include flex-v-center;
  padding: 21px 0;
   border-top: 1px dashed $border-color-1;
  div:first-child {
    flex: 1;
  }
  div:last-child {
    text-align: right;
  }
  p {
    font-size: 14px;
    color: $title-color-2;
  }
  .list-label {
    margin-bottom: 13px;
    color: $title-color-1;
  }
  .list-money {
    font-size: 22px;
    margin-bottom: 9px;
  }
  .is-add, .list-status-text {
    color: $sub-color-1;
  }
  .is-add-text {
    color: $main-color-1;
  }
  // .is-return.is-add {
  //   color: $title-color-3;
  // }
}
</style>
