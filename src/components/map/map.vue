<template>
  <!--地图选择-->
    <div class="pop">
      <div class="addAdressBox">
        <div id="map"></div>
        <div class="searchBox">
          <el-input class="textbox searchMap" placeholder="请输入包含市名的地址" v-model="keyword"  @keyup.enter="searchKeyword">
            <i slot="prefix" class="iconfont icon-sousuo"></i>
          </el-input>
          <el-button type="primary" @click="searchKeyword">搜索</el-button>
          <div style='width: 360px; height: 180px' id="infoDiv" @click.stop="clickAdress"></div>
        </div>
        <div class="nowPosi">
          <div class="address"><span>地址：</span>{{nowPosiInfo.address}}</div>
          <div class="doorplate"><span>门牌号：</span><el-input class="textbox" v-model="doorplate"></el-input></div>
        </div>
        <div class="btnBox">
            <el-button @click.stop="popCancel">取消</el-button>
            <el-button type="primary" @click.stop="addAdress" v-if="nowPosiInfo.address">保存</el-button>
            <el-button type="primary" disabled v-else>保存</el-button>
          </div>
      </div>
    </div>
</template>

<script>
import mapSearch from './map'
export default mapSearch
</script>

<style lang="scss" scoped="scoped">
.pop {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  z-index: 100;
  .addAdressBox{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px 40px;
    border-radius: 10px;
    width: 960px;
    height: 622px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    #map{
      float: left;
      margin-right: 20px;
      margin-bottom: 30px;
      height: 398px;
      width: 496px;
    }
    .searchBox {
      float: left;
      input {
        border: 1px solid #CCCCCC;
        border-radius: 2px;
        font-size:14px;
      }
      .searchMap{
        width: 280px;
        height: 40px;
        i{
          position: absolute;
          top: 50%;
          left: 18px;
          transform: translateY(-50%);
          font-size: 18px;
          color: $font-color-6;
        }
      }
      #infoDiv{
        text-align: left;
      }
      button{
        width: 83px;
        border-radius: 0 4px 4px 0;
      }
    }
    .nowPosi {
      clear: both;
      width: 100%;
      border-top: 1px solid #CCCCCC;
      @include flex-v-center;
      .address {
        color: $main-color-1;
        width: 496px;
        text-align: left;
        float: left;
        span{
          color: #92929B;
        }
      }
      .doorplate {
        margin-top: 11px;
      }
    }
    .btnBox{
      float: right;
      width: 220px;
      margin-top: 40px;
    }
  }
}
</style>
<style>
.pop .el-input__prefix{
  width: 54px;
}
.pop .searchBox .el-input__inner{
  padding-left: 56px;
  border-radius: 4px 0 0 4px;
}
.pop .el-button--default{
  width: 88px;
}
.pop .doorplate .el-input{
  width: 146px;
}
.pop .btnBox .el-button--primary{
  width: 116px;
  margin-left: 16px;
}
</style>
