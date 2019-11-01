<template>
  <router-view />
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'APP'
})
export default class APP extends Vue {
  created () {
  }
}
</script>
<style lang="scss">
@import './assets/css/index.css';
@import './assets/scss/button.scss';
@import './eleui/element.reset.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background: $bg-color-1;
}
.hidden {
  display: none;
}

.textEllipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.service {
  font-size:16px;
  font-family:PingFang-SC-Medium;
  font-weight:700;
  color:rgba(101,39,145,1);
  line-height:18px;
  position: fixed;
  top: 50%;
  height: 120px;
  margin-top: -60px;
  right: 0;
  width:36px;
  height:120px;
  background:rgba(239,233,244,1);
  border-radius:4px 0px 0px 4px;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  z-index: 100;
  .service_icon {
    width:16px;
    height:16px;
    margin-bottom: 8px;
  }
  .service_pop {
    width:300px;
    height:440px;
    background:rgba(255,255,255,1);
    box-shadow:0px 8px 12px 0px rgba(48,50,51,0.1);
    border-radius:4px;
    position: absolute;
    left: -320px;
    top: 50%;
    margin-top: -220px;
    .pop_tit {
      width:300px;
      text-align: center;
      height:58px;
      line-height:58px;
      background:rgba(101,39,145,1);
      border-radius:4px 4px 0px 0px;
      font-size:20px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .pop_cont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .pop_code {
        width: 112px;
        height: 112px;
        margin: 48px auto 10px auto;
      }
      .pop_text {
        font-size:20px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(98,98,98,1);
        margin: 48px 0 20px 0;
      }
      .pop_text2 {
        font-size:24px;
        font-family:DINAlternate-Bold;
        font-weight:bold;
        color:rgba(40,40,40,1);
      }
      .pop_text3 {
        font-size:18px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(53,64,72,1);
        margin-bottom: 24px;
      }
      .pop_text4 {
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(98,98,98,1);
      }
    }
  }
  .triangle_border_right{
    width: 0;
    height: 0;
    border-width:10px 0  10px 14px ;
    border-style: solid;
    border-color: transparent transparent transparent #fff ;
    position: absolute;
    right: -12px;
    top: 50%;
    margin-top: -20px;
  }
}
</style>
