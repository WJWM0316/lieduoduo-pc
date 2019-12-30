<template>
  <el-dialog
    title="面试信息"
    :visible.sync="show"
    width="430px"
    custom-class="interview-model"
    :before-close="handleClose">
    <ul class="ul-box">
      <li class="item-li">
        <i class="iconfont icon-rencai"></i>
        <div class="ul-li-text-box">
          <div class="color1 user-name">小米</div>
          <div class="user-contact">| 15999972494</div>
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
      <li class="item-li">
        <div class="time-title">请在下面选择一个面试时间</div>
        <div class="time-list">
          <div class="time-item time-item-active">
            <i class="iconfont choose icon-zhongxinshangchuan-"></i>
            <span class="date">2019-10-22 14:30:00</span>
          </div>
          <div class="time-item">
            <i class="iconfont choose icon-zhongxinshangchuan-"></i>
            <span class="date">2019-10-22 14:30:00</span>
          </div>
          <div class="time-item">
            <i class="iconfont choose icon-zhongxinshangchuan-"></i>
            <span class="date">2019-10-22 14:30:00</span>
          </div>
        </div>
        <div class="tips">以上时间都不合适，<strong>请联系我</strong></div>
      </li>
    </ul>
    <footer slot="footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="show = false">确 定</el-button>
    </footer>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    handleClose() {}
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
    strong {
      color: $border-color-2;
      font-weight: 400;
    }
  }
}
</style>