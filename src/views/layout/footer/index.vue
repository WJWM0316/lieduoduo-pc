<template>
  <footer id="page-footer" class="page-footer" :class="{'isFixed': shouldFixed(), 'blackBg' : blackBg()}">
    <section>
        <div class="footer_left">
          <div class="footer-header-title">
             <img class="ft_logo" :src="blackBg() ? cdnPath + 'logo_white.png' : cdnPath + 'logo.png'" />
          </div>
          <p class="tips">BOSS直聘战略投资  高端人才招聘平台</p>
          <p class="gray"><a href="http://www.beian.miit.gov.cn" target="_blank">Copyright ©老虎科技 粤ICP备16060093号-4</a></p>
        </div>
        <div class="footer_center">
            <div class="footer-header-title">
              <h3 class="relation">联系我们</h3>
            </div>
            <p class="black center_p">全国咨询热线：400-065-5788</p>
            <p class="black">邮箱：kefu@lieduoduo.com</p>
            <p class="center-bottom">
              <span><a class="black" href="https://www.lieduoduo.com/web/CompanyRelated" target="_blank">关于我们</a></span>
              <span>|</span>
              <span><a class="black" href="https://www.lieduoduo.com/userAgreement" target="_blank">用户协议</a></span>
            </p>
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
  min-width: $page-width;
  section {
    height: 100%;
    width: $page-width;
    display: flex;
    align-items: flex-start;
    margin: 0 auto;
    height: 112px;
    margin-top: 44px;
    justify-content: space-between;
    .relation {
      font-size:16px;
      color:$font-color-1;
    }
  }
  .footer_center {
    .footer-header-title {
      height: 24px;
      padding-bottom: 9px;
    }
    .center-bottom {
      font-size: 14px;
      color: $title-color-2;
      margin-top: 17px;
      span + span {
        cursor: pointer;
        margin-left: 20px;
      }
      a {
        color: $title-color-2;
      }
    }
    .center_p {
      margin-bottom: 6px;
    }
    p {
      color: $font-color-10;
    }
  }
  .footer-header-title {
    position: relative;
    img {
      height: 100%;
      width: auto;
      margin: 0;
    }
    h3 {
      font-size: 18px;
      color: $title-color-1;
    }
  }
  .footer_left {
    .footer-header-title {
      padding-bottom: 13px;
      height: 36px;
      margin-bottom: 9px;
    }
    .tips {
      color: $title-color-1;
      font-size: 12px;
      margin-bottom: 20px;
    }
  }
  .footer_right {
    display: flex;
    .right_code_blo {
      margin-left: 40px;
      text-align: center;
      .code {
        width:86px;
        height:86px;
        // background:#fff;
        overflow: hidden;
      }
    }
    p.black {
      font-size: 14px;
      color: $title-color-1;
      margin-top: 8px;
    }
  }
  .footer_left .footer-header-title::after {
    content: "";
    position: absolute;
    width: 39px;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba($bg-color-4, 0.27);
  }
  .gray, .gray a {
    font-size: 14px;
    color: $font-color-10;
  }
  &.blackBg {
    background: $font-color-3;
    .footer_left {
      .tips {
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
      .center-bottom {
        color: #fff;
        a {
          color: #fff;
        }
      }
    }
    .footer_right p.black{
      color: #fff;
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
