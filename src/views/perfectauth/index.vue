<template>
  <div class="perfect">
    <div class="account_tab">
      <div class="account_tab">
        <div class="tabitem active">身份认证</div>
        <div class="scroll_bar" ref="bar"></div>
      </div>
    </div>
    <div class="info"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.perfect{
  height:800px;
  padding: 0 !important;
  background:#fff;
  .account_tab{
    width:190px;
    height:800px;
    background:#F5F5F5;
    position: relative;
    float: left;
    .tabitem{
      width:190px;
      height:58px;
      font-size:14px;
      font-weight:400;
      text-align: center;
      line-height: 58px;
      color:#282828;
    }
    .active{
      background: #fff;
      color: #652791;
    }
    .scroll_bar{
      position: absolute;
      left: 0px;
      top: 0px;
      width:4px;
      height:58px;
      background:#652791;
    }
  }
  .info{
    width:969px;
    height:800px;
    background:#fff;
    float: left;
  }
}
</style>
