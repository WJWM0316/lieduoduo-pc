<template>
    <div class="cover">
        <el-dialog @close="handleClose" :visible.sync="showSharePopStatus" width="432px">
            <div class="share">
                <div class="share-title">{{ text.title }}</div>
                <div class="share-guide">{{ text.guide }}</div>
                <div class="share-imgUrl" :class="{ 'invite-imgUrl': type === 'invite'}">
                    <img v-if="type !== 'invite' && imgUrl" :src="imgUrl"/>
                    <div id="qrcode"></div>
                </div>
                <div class="invite" v-if="type === 'invite'">
                  <div class="invite-copy-url"><span>{{Url}}</span></div>
                  <el-button type="primary" style="width: 72px" size="small" @click="copyActiveCode($event,Url )">复制</el-button>
                </div>
                <el-button @click="helpPopupShowFun" type="text" class="helpBtn">{{ text.helpTitle }}<i class="iconfont icon-question-circle"></i></el-button>
                <div class="helpPop" v-if="helpPopupShow">
                    <p class="helpTitle">{{ text.helpTitle }}</p>
                    <p class="helpText">{{ text.helpText }}</p>
                    <img class="helpImg" :src="text.helpImgUrl"/>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
  getCompanyQrcodeApi,
  getRecruiterQrcodeApi
} from '@/api/qrcode'
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard'

export default {
  watch: {
    visible (value) {
      if (value) {
        this.showSharePopStatus = true
        this.loadData()
      } else {
        this.imgUrl = ''
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'company' // company为公司分享, recruiter为招聘官分享， invite为邀请同事
    },
    data: { // 公司。招聘官id
      type: Object
    },
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      imgUrl: '',
      helpPopupShow: false,
      showSharePopStatus: false,
      text: {},
      Url: '',
      dataText: {
        'company': {
          title: '分享公司主页',
          guide: '使用「微信」扫描小程序码分享公司主页',
          helpTitle: '分享帮助',
          helpText: '扫描小程序码 > 点击转发按钮',
          helpImgUrl: `${process.env.VUE_APP_CDN_PATH}/images/companyImg@2x.png`
        },
        'recruiter': {
          title: '分享招聘官',
          guide: '使用「微信」扫描小程序码分享招聘官',
          helpTitle: '分享帮助',
          helpText: '扫描小程序码 > 点击转发按钮',
          helpImgUrl: `${process.env.VUE_APP_CDN_PATH}/images/recruiterImg@2x.png`
        },
        'invite': {
          title: '邀请同事',
          guide: '使用「微信」扫码 或 复制链接 进行邀请同事',
          helpTitle: '邀请帮助',
          helpText: '微信扫描二维码 > 转发链接给同事',
          helpImgUrl: `${process.env.VUE_APP_CDN_PATH}/images/inviteImg@2x.png`
        }
      }
    }
  },
  components: {

  },
  methods: {
    helpPopupShowFun () {
      this.helpPopupShow = !this.helpPopupShow
    },
    handleClose () {
      this.$emit('update:visible', false)
    },
    loadData () {
      switch (this.type) {
        case 'company':
          this.text = this.dataText['company']
          let companyId = {
            companyId: this.data.id
          }
          getCompanyQrcodeApi(companyId).then(res => {
            this.imgUrl = res.data.data.positionQrCodeUrl
          })
          break
        case 'recruiter':
          this.text = this.dataText['recruiter']
          getRecruiterQrcodeApi({ recruiterUid: this.data.uid }).then(res => {
            this.imgUrl = res.data.data.positionQrCodeUrl
          })
          break
        case 'invite':
          this.text = this.dataText['invite']
          this.Url = `https://h5.lieduoduo.com/wantYou_b?type=appEnter&uid=${this.data.uid}`
          this.$nextTick(() => {
            if (this.qrcodeImg) {
              this.qrcodeImg.clear()
              this.qrcodeImg.makeCode(this.Url)
              return
            }
            this.qrcodeImg = new QRCode(document.getElementById('qrcode'), {
              width: 132,
              height: 132
            })
            this.qrcodeImg.makeCode(this.Url)
          })
          break
      }
    },
    copyActiveCode (e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
      // 不支持复制
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    }
  },
  destoryed () {
    this.qrcodeImg = null
  }
}
</script>

<style lang="scss" scoped>
.cover{
    position: relative;
}
.share{
    @include flex-direction-column;
    @include flex-v-center;
    height: 396px;
    position: relative;
    .share-title{
        color: $font-color-2;
        font-size:20px;
        font-weight:500;
        line-height:26px;
        margin-top: 39px;
    }
    .share-guide{
        color: $font-color-6;
        line-height:22px;
        font-weight:400;
        margin-top: 17px;
    }
    .share-imgUrl{
        width: 132px;
        height: 132px;
        margin-top: 47px;
        img{
            width: 100%;
            height: 100%;
            border: 1px solid $bg-color-5;
            border-radius:70px;
        }
    }
    .invite-imgUrl{
        margin-top: 24px;
    }
    .helpBtn{
        position: absolute;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
        color: $main-color-1;
        i{
            color: $bg-color-4;
            margin-left: 6px;
        }
    }
    .invite{
      margin-top: 24px;
      width: 302px;
      height: 32px;
      display: flex;
      .el-button {
        border-radius: 0;
      }
    }
    .invite-copy-url {
      width: 230px;
      height: 32px;
      line-height: 32px;
      border: 1px solid $border-color-1;
       padding:0 14px;
      color: $title-color-2;
      font-size: 12px;
      box-sizing: border-box;
      span {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
      }
    }
}
.helpPop{
    width: 300px;
    height: 396px;
    position: absolute;
    left: 448px;
    top:0;
    background: #ffffff;
    border-radius: 8px;
    @include flex-direction-column;
    @include flex-v-center;
    &::after {
      content: "";
      position: absolute;
      left: -15px;
      top: 198px;
      width: 0px;
      height: 0px;
      border-width: 9px;
      border-style: solid;
      border-color: transparent #fff transparent transparent ;
    }
    .helpTitle{
        color: $font-color-2;
        font-weight: 500;
        font-size: 20px;
        margin-top: 32px;
    }
    .helpText{
        color: $font-color-6;
        font-weight: 400;
        line-height: 22px;
        font-size: 14px;
        margin-top: 24px;
    }
    .helpImg{
        width: 250px;
        height: 224px;
        margin-top: 32px;
    }
}
</style>
<style>
.cover .el-dialog{
    height: 396px;
    border-radius: 8px;
}
.cover .el-dialog__body{
    padding: 0;
}
.cover .el-dialog__header{
    padding: 0;
}
.cover .el-dialog__headerbtn{
    z-index: 1001;
}
</style>
