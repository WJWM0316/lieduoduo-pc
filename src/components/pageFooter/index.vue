<template>
  <footer id="page-footer">
    <section>
        <div class="footer_left">
          <img class="ft_logo" src="../../assets/images/logo.png" />
          <p class="left_p black">用户协议</p>
          <p class="gray">Copyright &#169老虎科技 粤ICP备16060093号-2</p>
        </div>
        <div class="footer_center ">
            <h3 class="relation">联系我们</h3>
            <p class="black center_p">全国咨询热线：020-61279889</p>
            <p class="black">邮箱：lieduoduo@thetiger.com.cn</p>
        </div>
        <div class="footer_right">
          <div class="right_code_blo">
            <img class="code public" src="../../assets/images/gzh.png" />
            <p class="black">扫码关注公众号</p>
          </div>
          <div class="right_code_blo">
            <img class="code applet" src="../../assets/images/xcx.png" />
            <p class="black">扫码打开小程序</p>
          </div>
        </div>
        
    </section>
  </footer>
</template>
<script>
import PageFooter from './index'
export default PageFooter
</script>
<style lang="less" scoped>

#page-footer {
  height:200px;
  background: #fff;
  text-align: left;
  font-size: 14px;
  box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // z-index: 2;
  overflow: hidden;

  font-size:14px;
  font-family:PingFang-SC-Regular;
  font-weight:400;

  section {
    width: 960px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .footer_left {
      .left_p {
        margin: 24px 0 8px 0;
      }
      .ft_logo {
        width:80px;
        height:30px;
      }
    }
    .footer_right {
      display: flex;
      flex-direction: row;

      .right_code_blo {
        margin-left: 40px;
        .code {
          width:94px;
          height:94px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(239,233,244,1);
          margin-bottom: 13px;
          &.applet {
            border-radius: 50%;
          }
        }
      }
    }
    .footer_center {
      .center_p {
        line-height:26px;
        margin: 16px 0 4px 0;
      }
    }
    .relation {
      font-size:22px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(40,40,40,1);
    }

  }
  .black {
    color:rgba(40,40,40,1)
  }
  .gray {
    color:rgba(188,188,188,1);
  }
}

</style>