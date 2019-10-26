<template>
  <div class="position-wrapper">
    <div class="header-wrapper">
      <scroll-pane class="scroll-pane">
        <ul>
          <template v-for="item in nameList">
            <li class="position-name" :class="{active: currentId === item.labelId}" @click="handleChange(item)" :key="item.labelId">{{item.name}}</li>
          </template>
        </ul>
      </scroll-pane>
    </div>
    <div class="position-lists-wrapper" v-loading="getLoading">
      <!-- 隔离层 防止nth-child 多读取一个div -->
      <div class="position-lists">
        <div class="position-list-wrapper" v-for="(item,index) in listData" :key="index">
          <div class="list-header">
            <div class="position-name">{{item.positionName}}</div>
            <div class="position-contact">
              <i class="iconfont icon-weixin"></i> 开约
            </div>
          </div>
          <div class="list-pay">
            {{item.emolumentMin}}~{{item.emolumentMax}} · {{item.annualSalaryDesc}}
          </div>
          <div class="list-position-require">
            <span class="position-address"><i class="iconfont icon-dizhi"></i>{{item.city}}{{item.district}}</span>
            <span><i class="iconfont icon-zhiwei"></i>{{item.workExperienceName}}</span>
            <span><i class="iconfont icon-jiaoyu"></i>{{item.educationName}}</span>
          </div>
          <div class="list-footer">
            <div class="company-logo">
              <img :src="item.companyInfo.logoInfo.smallUrl" alt="">
            </div>
            <div class="">
              <p class="company-name">{{item.companyInfo.companyShortname}}</p>
              <p class="company-specia">{{item.companyInfo.financingInfo}}·{{item.companyInfo.employeesInfo}}·{{item.companyInfo.industry}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-more-btn" v-if="!getLoading && listData.length">
      <div class="c-btn c-big-btn">查看更多</div>
    </div>
  </div>
</template>
<script>
import ScrollPane from 'COMPONENTS/scrollPane'
import { getPositionSearch } from 'API/position'
export default {
  props: {
    nameList: {
      type: Array,
      default: () => ([])
    }
  },
  components: { ScrollPane },
  data () {
    return {
      currentId: 0,
      getLoading: true,
      listData: []
    }
  },
  methods: {
    // 获取职位列表
    getPositionList () {
      this.getLoading = true
      getPositionSearch({ positionTypeIds: this.currentId }).then(({ data }) => {
        this.getLoading = false
        this.listData = data.data.slice(0, 12)
      })
    },
    handleChange (item) {
      this.currentId = item.labelId
      this.getPositionList()
    }
  }
}
</script>
<style lang="scss" scoped>
.position-wrapper {
  padding-bottom: 54px;
}
.header-wrapper{
  margin-top: 62px;
  .scroll-pane {
    width: 100%;
    height: 50px;
  }
  ul {
    width: 100%;
    height: 50px;
    @include flex-v-center;
    flex-wrap: nowrap;
    // justify-items: stretch
  }
  li {
    color: $title-color-2;
    font-size: 16px;
    border-bottom: 2px solid transparent;
    font-weight: 400;
    cursor: pointer;
  }
  li.active, li:hover {
    color: $main-color-1;
    border-color: $border-color-2;
  }
  li+li {
    margin-left: 52px;
  }
}
.position-lists-wrapper {
  padding-top: 13px;
  min-height: 200px;
}
.position-lists {
  @include flex-v-center;
  flex-wrap: wrap;
  .position-list-wrapper{
    margin-right: 13px;
  }
  .position-list-wrapper:nth-child(4n) {
    margin-right: 0;
  }
}
.position-list-wrapper {
  width: 290px;
  background: #fff;
  padding: 20px;
  box-shadow: $shadow-1;
  box-sizing: border-box;
  margin: 13px 0;
  border-radius:4px;
  cursor: pointer;
  .list-header {
    @include flex-v-center;
    color: $main-color-1;
    .position-contact {
      margin-left: auto;
      font-size: 12px;
      .iconfont {
        font-size: 12px;
      }
    }
    .position-name {
      font-size: 16px;
      max-width: 176px;
      @include ellipsis;
      color: $title-color-1;
    }
  }
  .list-pay {
    margin: 8px 0;
    color: $error-color-1;
    font-size: 18px;
    font-weight: 600;
  }
  .list-position-require {
    margin-bottom: 9px;
    margin-top: 4px;
    font-size: 14px;
    color: $title-color-3;
    .iconfont {
      font-size: 14px;
    }
    span + span {
      margin-left: 22px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .position-address {
    max-width: 90px;
    @include ellipsis;
  }
  .list-footer {
    border-top: 1px  dashed $border-color-1;
    @include flex-v-center;
    padding: 14px 0 0px;
    box-sizing: border-box;
    .company-name {
      font-size: 14px;
      color: $title-color-1;
      max-width: 90%;
      @include ellipsis;
    }
    .company-specia {
      color: $font-color-10;
      margin-top: 6px;
      font-size: 12px;
    }
  }
  .company-logo {
    margin-right: 9px;
    @include img-radius(36px, 36px)
  }

}
.position-list-wrapper:hover {
  box-shadow: $shadow-2;
}
.position-more-btn {
  margin-top: 30px;
  text-align: center;
  .c-btn {
    width: 385px;
  }
}
</style>
