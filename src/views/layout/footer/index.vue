<template>
  <footer id="page-footer" class="page-footer" :class="{'isFixed': shouldFixed(), 'blackBg' : blackBg()}">
    <section>
        <div class="footer_left">
          <div class="footer-header-title">
             <img class="ft_logo" :src="blackBg() ? cdnPath + 'logo_white.png' : cdnPath + 'logo.png'" />
          </div>
          <p class="left_p black" @click="toUserDeal">
            <span>关于我们</span><span>用户协议</span>
          </p>
          <p class="gray"><a href="http://www.beian.miit.gov.cn">Copyright © 老虎科技 粤ICP备16060093号-4</a></p>
        </div>
        <div class="footer_center">
            <div class="footer-header-title">
              <h3 class="relation">联系我们</h3>
            </div>
            <p class="black center_p">全国咨询热线：400-065-5788</p>
            <p class="black">邮箱：lieduoduo@thetiger.com.cn</p>
        </div>
        <div class="footer_right">
          <div class="right_code_blo">
            <img class="code app" :src="images.app_qrcode" />
            <p class="black">扫码下载APP</p>
          </div>
          <div class="right_code_blo">
            <img class="code public" :src="images.wx_qrcode" />
            <p class="black">扫码关注公众号</p>
          </div>
          <div class="right_code_blo">
            <img class="code applet" :src="images.mp_qrcode" />
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
<style lang="scss" scoped>
#page-footer {
  height: $page-footer-height;
  background: #fff;
  text-align: left;
  font-size: 14px;
  box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
  z-index: 2;
  overflow: hidden;
  width: 100%;
  section {
    height: 100%;
    width: $page-width;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    .footer_right {
      display: flex;
      flex-direction: row;
      .right_code_blo {
        margin-left: 40px;
        text-align: center;
        .code {
          width:86px;
          height:86px;
          background:#fff;
          overflow: hidden;
        }
      }
      p.black {
        font-size: 14px;
        color: $title-color-1;
        margin-top: 0px;
      }
    }
    .relation {
      font-size:16px;
      color:$font-color-1;
    }
  }
  .footer_left .left_p {
    font-size: 14px;
    color: $title-color-1;
    margin-bottom: 12px;
    span + span {
      cursor: pointer;
      margin-left: 44px;
    }
  }
  .footer_center .center_p {
    margin-bottom: 12px;
  }
  .footer_center p {
    color: $font-color-10;
  }
  .footer-header-title {
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
    img {
      height: 100%;
      width: auto;
      margin: 0;
    }
    h3 {
      color: $title-color-1;
    }
  }
  .gray, .gray a {
    font-size: 14px;
    color: $font-color-10;
  }
  &.blackBg {
    background: $font-color-3;
    .footer_left {
      .left_p {
        color: #fff;
      }
      .gray {
        color: #A29CA6;
      }
    }
    .footer_center {
      .relation {
        color: #fff;
      }
    }
  }
  &.isFixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

</style>
