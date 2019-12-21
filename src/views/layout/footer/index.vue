<template>
  <footer id="page-footer" class="page-footer" v-if="isShow">
    <section :class="{'minn-footer': miniFooter}">
        <div class="footer_left">
          <div class="footer-header-title">
             <img class="ft_logo" :src="cdnPath + 'logo.png'" />
          </div>
          <p class="tips">BOSS直聘战略投资  高端人才招聘平台</p>
          <p class="left-bottom">
            <span><a class="black" href="https://www.lieduoduo.com/web/CompanyRelated" target="_blank">关于我们</a></span>
            <span>|</span>
            <span><a class="black" href="https://www.lieduoduo.com/userAgreement" target="_blank">用户协议</a></span>
          </p>
        </div>
        <div class="footer_center">
            <div class="footer-header-title">
              <h3 class="relation">联系我们</h3>
            </div>
            <p class="black center_p">全国咨询热线：400-065-5788</p>
            <p class="black">邮箱：kefu@lieduoduo.com</p>
            <div class="gray_href">
              <p class="gray">
                <a target="_blank" href="http://www.beian.miit.gov.cn">Copyright ©老虎科技 粤ICP备16060093号-4</a>
              </p>
              <p class="gray-down">
                <a target="_blank" href="http://www.beian.miit.gov.cn"><p>粤公网安备 44010602007389号</p><img src="../../../assets/images/record.png"/></a>
              </p>
            </div>
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
  }
  section.minn-footer {
    width: 1000px;
    .left-bottom{
      margin-top: 28px;
    }
    .footer_center {
      margin-left: 84px;
      p{
        color: $font-color-3;
      }
      .gray_href{
        margin-top: 16px;
        a img{
          margin-top: 4px;
        }
        a p{
          margin: 4px 4px 0 0;
        }
      }
    }
  }
  .footer_center {
    flex:1;
    margin-left: 105px;
    .footer-header-title {
      height: 24px;
      padding-bottom: 9px;
      line-height: 24px;
    }

    .center_p {
      margin-bottom: 6px;
      line-height: 18px;
    }
    p {
      color: $title-color-3;
      font-size: 13px;
      line-height: 18px;
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
      font-size: 16px;
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
      // font-weight: 300;
      line-height: 16px;
      font-size: 12px;
      // margin-bottom: 20px;
    }
    .left-bottom {
      font-size: 14px;
      color: $font-color-6;
      margin-top: 16px;
      line-height: 20px;
      span + span {
        cursor: pointer;
        margin-left: 20px;
      }
      span {
        color: $border-color-1;
      }
      a {
        color: $font-color-6;
      }
      a:hover {
        color: $main-color-1;
      }
    }
  }
  .footer_right {
    display: flex;
    .right_code_blo {
      text-align: center;
      .code {
        width:86px;
        height:86px;
        // background:#fff;
        overflow: hidden;
      }
    }
    .right_code_blo + .right_code_blo  {
      margin-left: 58px;
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
  .gray_href{
    margin-top: 21px;
    .gray{
      float: left;
      line-height: 16px;
      a {
        font-size: 12px;
        color: $font-color-10;
      }
    }
    .gray-down{
      margin: 0 auto;
      float: left;
      font-size: 12px;
      a{
        display:inline-block;
        text-decoration:none;
        height:16px;
        line-height:16px;
        img{
          float: left;
          width: 16px;
        }
        p{
          float: left;
          height: 16px;
          line-height: 16px;
          margin: 0px 4px 0px 10px;
          color: $font-color-10;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
