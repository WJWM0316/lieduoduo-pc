<template>
  <div id="MyModel" v-show="visiable">
    <div class="mask" :class="{'mask-show': visiable}"></div>
    <div class="jobSelectPop">
      <div class="pop_left">
        <div class="pop_tit">请选择职位类别</div>
        <ul class="left_ul">
          <li
            class="left_li"
            :class="{'cur': item.active}"
            v-for="(item,index) in positionList"
            :key="index"
            @click="selectPosition(index)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="pop_right">
        <div class="search-box">
          <input type="text" v-model="keyword" />
          <i class="el-icon-search" @click="handleSearch"></i>
        </div>
        <i class="el-icon-close" @click="close"></i>
        <ul class="job_classily">
          <li
            v-for="(item, index) in secondPositionList"
            @click="selectSecondPosition(index)"
            :class="{'active2': item.active}"
            :key="index"
          >
            <i
              class="el-icon-circle-plus-outline classily_icon"
              v-if="!item.active"
              style="color: #5C565D;"
            ></i>
            <i class="el-icon-remove-outline classily_icon" v-else style="color: #652791"></i>
            {{item.name}}
          </li>
        </ul>
        <ul class="open_jobs" v-if="thirdPositionList.length">
          <li
            :class="{active3: item.active}"
            v-for="(item,index) in thirdPositionList"
            @click="thirdSecondPosition(item)"
            :key="index"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";

import { getLabelPositionListApi } from "@/api/putIn";

import { searchPositionApi } from "@/api/position";

@Component({
  name: "MyModel",
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示
    data: {
      type: Array,
      default: [] // top-labelId  second-labelId third-labelId
    }
  },
  model: {
    prop: "show",
    event: "close"
  },
  watch: {
    show: {
      handler(val) {
        this.visiable = val;
      },
      immediate: true
    },
    visiable: {
      handler(visiable) {
        if (!visiable) {
          this.$emit("close");
        }
      },
      immediate: true
    },
    data: {
      handler(arr) {
        if (arr.length) {
          let positionList = this.positionList;
          positionList.map(
            field =>
              (field.active = field.labelId === this.data[0] ? true : false)
          );

          let secondPositionList = positionList.find(field => field.active)
            .children;
          secondPositionList.map(
            field =>
              (field.active = field.labelId === this.data[1] ? true : false)
          );

          let thirdPositionList = secondPositionList.find(field => field.active)
            .children;
          thirdPositionList.map(
            field =>
              (field.active = field.labelId === this.data[2] ? true : false)
          );

          this.positionList = positionList;
          this.secondPositionList = secondPositionList;
          this.thirdPositionList = thirdPositionList;
        }
      },
      immediate: true
    }
  }
})
export default class MyModel extends Vue {
  positionList = [];
  secondPositionList = [];
  thirdPositionList = [];
  visiable = false;
  keyword = "";
  close() {
    this.visiable = false;
  }
  getLabelPositionList() {
    return getLabelPositionListApi().then(
      res => (this.positionList = res.data.data)
    );
  }
  selectPosition(index) {
    if (!this.positionList[index].active) {
      this.positionList.map((item, index2) => {
        if (index2 === index) {
          item.active = true;
          item.children.map(item2 => {
            item2.active = false;
            this.thirdPositionList = item2.children;
          });
          this.secondPositionList = item.children;
        } else {
          item.active = false;
        }
      });
    }
    this.thirdPositionList = [];
  }
  selectSecondPosition(index) {
    if (!this.secondPositionList[index].active) {
      this.secondPositionList.map((item, index2) => {
        if (index2 === index) {
          item.active = true;
          this.thirdPositionList = item.children;
        } else {
          item.active = false;
        }
      });
    } else {
      this.secondPositionList[index].active = false;
      this.thirdPositionList = [];
    }
  }
  thirdSecondPosition(item) {
    this.$emit("resultEvent", item);
    this.keyword = "";
    this.secondPositionList = [];
    this.thirdPositionList = [];
  }
  handleSearch() {
    if (!this.keyword.trim()) return;
    searchPositionApi({
      name: this.keyword
    }).then(res => {
      this.secondPositionList = [];
      this.thirdPositionList = res.data.data;
    });
  }
  mounted() {
    this.getLabelPositionList();
    // alert()
  }
}
</script>
<style lang="less">
#MyModel {
  .jobSelectPop {
    width: 878px;
    height: 580px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: row;
    background: white;
    border-radius: 2px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 100000000;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    .pop_left {
      width: 142px;
      height: 580px;
      background: rgba(248, 248, 248, 1);
      text-align: center;
      margin-right: 20px;
    }
    .pop_tit {
      width: 142px;
      height: 66px;
      font-size: 16px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(92, 86, 93, 1);
      line-height: 66px;
    }
    .left_ul {
      overflow: hidden;
      overflow-y: scroll;
      height: 514px;
    }
    .left_li {
      width: 100%;
      height: 42px;
      display: block;
      font-size: 14px;
      line-height: 42px;
      color: rgba(92, 86, 93, 1);
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      position: relative;
      cursor: pointer;
      &.cur {
        color: rgba(132, 82, 167, 1);
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        background: rgba(255, 255, 255, 1);
        cursor: unset;
        &:after {
          content: "";
          width: 4px;
          height: 20px;
          background: rgba(132, 82, 167, 1);
          border-radius: 0px 50px 50px 0px;
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -10px;
        }
      }
    }
    .left_ul::-webkit-scrollbar {
      width: 6px;
    }
    .left_ul::-webkit-scrollbar-track {
      background: white;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
    }
    .left_ul::-webkit-scrollbar-thumb {
      background: #ededed;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
    }
    .pop_right {
      flex: 1;
    }
    .job_classily {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      text-align: left;
      li {
        width: 160px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(92, 86, 93, 1);
        margin-top: 24px;
      }
      .active2 {
        color: #652791;
      }
    }
    .classily_icon {
      display: inline-block;
      font-size: 16px;
    }
    .el-icon-close {
      position: absolute;
      right: 16px;
      top: 16px;
      cursor: pointer;
      font-size: 18px;
    }
    .open_jobs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      text-align: left;
      background: #fafaff;
      padding: 24px 16px;
      margin-top: 24px;
      width: 688px;
      box-sizing: border-box;
      li {
        width: 140px;
        overflow: hidden;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: #5c565d;
        margin-bottom: 24px;
      }
      .active3 {
        color: #652791;
      }
    }
  }
  .search-box {
    width: 320px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid rgba(220, 220, 220, 1);
    margin-top: 16px;
    overflow: hidden;
    position: relative;
    input {
      border: none;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0 40px 0 20px;
    }
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      right: 15px;
      font-size: 18px;
      color: #dcdcdc;
      cursor: pointer;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 10000;
    transition: all ease 2s;
    opacity: 0;
  }
  .mask-show {
    opacity: 1;
  }
}
</style>