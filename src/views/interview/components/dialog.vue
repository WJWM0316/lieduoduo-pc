<template>
  <el-dialog
    title="面试信息"
    :visible.sync="visiable"
    width="430px"
    custom-class="interview-model"
    @close="handleClose">
    <template v-if="[31].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color2 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color3">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color2 position-name">{{infos.positionName}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color2 address">广州市天河区天河北路光大银行1607</div>
          </div>
        </li>
        <li class="item-li">
          <div class="time-title">请在下面选择一个面试时间</div>
          <div class="time-list" v-if="infos.arrangementInfo.appointmentList.length">
            <div
              class="time-item"
              v-for="(item, index) in infos.arrangementInfo.appointmentList"
              :key="index"
              @click="chooseInterviewDate(item, index)"
              :class="{'time-item-active': item.checked}">
              <i class="iconfont choose icon-zhongxinshangchuan-"></i>
              <span class="date">{{item.appointment}}</span>
            </div>
          </div>
          <div class="tips">以上时间都不合适，<strong>请联系我</strong></div>
        </li>
      </ul>
      <footer slot="footer" class="footer">
        <el-button @click="handleClose" class="btn-cancle-width" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" class="btn-sure-width" size="mini">确 定</el-button>
      </footer>
    </template>
    <template v-if="[1].includes(infos.status)">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">小米</div>
            <div class="user-contact color2">15999972494</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">Java工程师</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">广州市天河区天河北路光大银行1607</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="img-box3"></div>
          <div class="waiting">等待候选人接受邀请</div>
          <div class="waiting2">候选人将收到你的面试邀请，请耐心等待</div>
        </li>
      </ul>
    </template>
    <template v-if="[1].includes(infos.status)">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">小米</div>
            <div class="user-contact color2">15999972494</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">Java工程师</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">广州市天河区天河北路光大银行1607</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已确认</div>
          <div class="waiting4">已添加到面试日程，请准时赴约哦~<strong>通知我</strong></div>
          <div class="waiting3">2019-08-30 09:00</div>
        </li>
      </ul>
    </template>
    <template v-if="[58].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">{{infos.positionName}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">广州市天河区天河北路光大银行1607</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已结束</div>
          <div class="waiting6">2019-08-30 09:00</div>
        </li>
      </ul>
    </template>
    <template v-if="[2].includes(infos.status)">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">小米</div>
            <div class="user-contact color2">15999972494</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">Java工程师</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">广州市天河区天河北路光大银行1607</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已取消</div>
          <div class="waiting7">如有疑问，可联系面试官~</div>
        </li>
      </ul>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    infos: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    show: {
      handler(show) {
        this.visiable = show
      },
      immediate: true
    },
    visiable: {
      handler(visiable) {
        if (!visiable) {
          this.$emit('close')
        }
      }
    }
  },
  data() {
    return {
      visiable: false
    }
  },
  model: {
    prop: 'show',
    event: 'input'
  },
  methods: {
    handleClose() {
      this.visiable = false
      this.$emit('input', this.visiable)
    },
    handleConfirm() {
      this.$emit('confirm')
    },
    chooseInterviewDate(item, index) {
      let { appointmentList } = this.infos.arrangementInfo
      appointmentList.map((v, i, arr) => {
        v.checked = false
        if(i === index) {
          this.$set(arr[i], 'checked', true)
          console.log(v)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.interview-model{
  border-radius: 8px;
  .item-li {
    font-size:14px;
    font-weight:400;
    line-height:14px;
    padding: 10px 40px;
  }
  .iconfont {
    font-size: 14px;
    color: #D8D8D8;
    display: inline-block;
    vertical-align: middle;
  }
  .ul-li-text-box{
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
  }
  .user-name {
    display: inline-block;
    font-size:14px;
    padding-right: 7px;
    border-right: 1px solid $border-color-1;
    margin-right: 7px;
  }
  .user-contact {
    display: inline-block;
  }
  .color3 {
    color: $border-color-2;
  }
  .color1 {
    color: $font-color-3;
  }
  .time-title{
    padding: 20px 0 14px 0;
    height:16px;
    font-size:14px;
    font-weight:500;
    color: $font-color-3;
    line-height:16px;
  }
  .time-item{
    font-size:14px;
    font-weight:400;
    line-height:14px;
    padding: 10px 0;
    cursor: pointer;
    position: relative;
  }
  .date{
    display: inline-block;
    vertical-align: middle;
  }
  .choose{
    margin-right: 20px;
  }
  .el-dialog__title{
    font-size:16px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:24px;
  }
  .el-dialog__header{
    padding: 32px 40px 14px 40px;
  }
  .el-dialog__body{
    padding: 0;
  }
  .time-item-active{
    color: $border-color-2;
    .iconfont {
      color: $border-color-2;
    }
  }
  .tips{
    height:14px;
    font-size:12px;
    color:$font-color-9;
    line-height:14px;
    font-weight: 400;
    padding-top: 10px;
    padding-bottom: 12px;
    strong {
      color: $border-color-2;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .btn-sure-width {
    width: 112px;
    border-radius: 4px;
    margin-left: 16px;
  }
  .btn-cancle-width{
    width: 86px;
    border-radius: 4px;
  }
  .el-dialog__footer{
    padding: 0;
  }
  .footer {
    padding: 30px 40px;
  }
  .color2 {
    color: $font-color-3;
  }
  .center {
    text-align: center;
  }
  .img-box3 {
    width: 134px;
    height: 120px;
    background: red;
    display: inline-block;
    display: block;
    margin: 20px auto 32px auto;
  }
  .waiting{
    font-size:16px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:16px;
    text-align: center;
  }
  .waiting2 {
    font-size:14px;
    color:rgba(51,51,51,1);
    line-height:20px;
    text-align: center;
    padding-top: 6px;
    padding-bottom: 30px;
  }
  .waiting3 {
    font-size:28px;
    font-weight:500;
    color:rgba(3,179,187,1);
    line-height:28px;
    padding-bottom: 42px;
  }
  .waiting4 {
    font-size:14px;
    font-weight:400;
    color:rgba(92,86,93,1);
    line-height:14px;
    padding-bottom: 30px;
    padding-top: 10px;
    strong {
      color:rgba(3,179,187,1);
    }
  }
  .waiting5 {
    font-size:18px;
    font-weight:500;
    color:rgba(40,40,40,1);
    line-height:18px;
    padding-top: 28px;
  }
  .waiting6 {
    font-size:28px;
    font-weight:500;
    color:rgba(146,146,155,1);
    line-height:28px;
    padding-bottom: 32px;
    padding-top: 30px;
  }
  .waiting7 {
    font-size:14px;
    color:rgba(92,86,93,1);
    line-height:14px;
    padding-top: 10px;
    padding-bottom: 32px;
  }
}
</style>