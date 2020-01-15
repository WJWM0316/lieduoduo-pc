<template>
  <!-- 高级筛选 -->
  <div class="high-filter">
    <el-popover
      placement="bottom-end"
      width="400"
      @show="hotfiletr"
      v-model="poperStatus"
      trigger="click">
      <div class="b-header-group-button split-line-full" slot="reference">
        <div class="b-header-button" :class="{'is-active-popover': poperStatus}" @click.stop="handleClear"><i class="iconfont icon-shaixuan" style="padding-right: 6px"></i>{{len ?  '清除筛选' : '高级筛选'}}</div>
        <div class="b-header-button" :class="{'is-active-popover': poperStatus}"><i class="iconfont icon-jiantou"></i></div>
      </div>
      <div class="filter-wrapper">
        <div class="filter-content">
          <div class="selelist">
            <div class="title">选择职位</div>
            <div :class="['positiondom', showdom ? 'domset' : '']" ref="positiondom">
            <div @click="positionSelect(item)" :class="['list', item.active ? 'active' : '']" v-for="item in positionlist" :key="item.id">{{item.positionName}}</div>
            </div>
            <div class="open" @click="open" v-if="isshow">
              <span v-if="!showdom">展开</span>
              <span v-else>收起</span>
              <i v-if="!showdom" class="iconfont icon-bottom"></i>
              <i v-else class="iconfont icon-arrow-top"></i>
            </div>
          </div>
          <div class="selelist">
            <div class="title">选择城市</div>
            <div @click="positionCity(item)" :class="['list', item.active ? 'active' : '']" v-for="item in citylist" :key="item.areaId">{{item.name}}</div>
          </div>
          <div class="selelist">
            <div class="title">薪酬范围<span>(可多选)</span></div>
            <div @click="positionSalary(item)" :class="['list', item.active ? 'active' : '']" v-for="item in salarylist" :key="item.id">{{item.text}}</div>
          </div>
        </div>
        <div class="filter-footer">
          <el-button size="small" @click="handleRecall">取消</el-button>
          <el-button size="small" type="primary" @click="handleChange">确定</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { gethotPositionTypeApi } from 'API/position'
export default {
  props: {
    value: Array,
    title: {
      type: String,
      default: '看过我的职位类型'
    },
    lists: {
      type: Array,
      default: () => ([])
    },
    allValue: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      poperStatus: false,
      showdom: false,
      isshow: false,
      positionlist: [],
      citylist: [],
      salarylist: [],
      selectedposition: [],
      selectedcity: [],
      selectedsalary: []
    }
  },
  computed: {
    len () {
      return this.selectedposition.length || this.selectedcity.length || this.selectedsalary.length
    }
  },
  created () {
    this.gethotPositionType()
  },
  methods: {
    handleChange () {
      this.poperStatus = false
      this.$emit('change', this.selectedposition, this.selectedcity, this.selectedsalary)
    },
    open () {
      this.showdom = !this.showdom
    },
    hotfiletr () {
      this.$nextTick(() => {
        if (this.$refs.positiondom.offsetHeight >= 175) this.isshow = true
      })
    },
    // 清除筛选
    handleClear () {
      if (this.len) {
        this.poperStatus = false
        this.positionlist.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
        this.citylist.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
        this.salarylist.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
        this.changeselect()
        this.$emit('clearfilter', null)
      } else {
        this.poperStatus = true
      }
    },
    // 选择的改变
    changeselect () {
      this.selectedposition = []
      this.selectedcity = []
      this.selectedsalary = []
      this.positionlist.map((v, k) => {
        if (v.active && v.id) {
          this.selectedposition.push(v)
        }
      })
      this.citylist.map((v, k) => {
        if (v.active && v.areaId) {
          this.selectedcity.push(v)
        }
      })
      this.salarylist.map((v, k) => {
        if (v.active && v.id !== 1) {
          this.selectedsalary.push(v.id)
        }
      })
    },
    // 获取数据
    gethotPositionType () {
      gethotPositionTypeApi().then((res) => {
        let arr1 = res.data.data.position
        let arr2 = res.data.data.city
        let arr3 = res.data.data.salary
        arr1.unshift({ id: '', positionName: '全部' })
        arr2.unshift({ areaId: '', name: '全部' })
        arr1.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
        arr2.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
        arr3.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
        this.positionlist = arr1
        this.citylist = arr2
        this.salarylist = arr3
        this.changeselect()
      })
    },
    // 取消
    handleRecall () {
      this.poperStatus = false
    },
    // 选择职位，单选
    positionSelect (item) {
      this.positionlist.map((v, k) => {
        v.active = item === v
      })
      this.changeselect()
    },
    // 选择城市，单选
    positionCity (item) {
      this.citylist.map((v, k) => {
        v.active = item === v
      })
      this.changeselect()
    },
    // 选择薪酬，单选，全部是反选
    positionSalary (item) {
      if (item.id === 1) {
        this.salarylist.map((v, k) => {
          v.active = false
          v.active = k === 0
        })
      } else {
        this.salarylist[0].active = false
        item.active = !item.active
      }
      this.changeselect()
    }
  }
}
</script>
<style lang="scss" scoped>
.high-filter {
  display: inline-block;
  .is-active-popover{
    color: $main-color-1;
    .iconfont {
      color: $main-color-1;
    }
  }
}
.filter-wrapper {
  padding: 32px 13px 0 13px;
  .filter-title {
    font-size: 14px;
    font-weight: bold;
    color: $title-color-1;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
.filter-content {
  .list {
    background: $bg-color-11;
    border-radius: 4px;
    display: inline-block;
    color: $title-color-2;
    font-size: 14px;
    padding: 6px 12px;
    line-height: 1;
    margin: 0 8px 16px 0;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .list:hover {
    color: $main-color-1;
  }
  .list.active {
    color: $main-color-1;
    font-weight: bold;
    background: rgba(0,196,205,0.1);
  }
}
.selelist{
  .title{
    font-weight: bold;
    margin-bottom: 12px;
  }
  .positiondom{
    max-height: 175px;
    overflow: hidden;
  }
  .domset{
    max-height: inherit;
    overflow: hidden;
  }
  .open{
    color: #03B3BB;
    display: flex;
    cursor: pointer;
    width: 50px;
    justify-items: center;
    margin-bottom: 20px;
    i{
      font-size: 12px;
      margin-left: 5px;
    }
    span{
      font-size: 14px;
    }
  }
}
.filter-footer{
  display: flex;
  justify-content: flex-end;
}

</style>
<style lang="scss">

</style>
