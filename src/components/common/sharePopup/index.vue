<template>
    <div class="cover">
        <el-dialog @close="handleClose" :visible.sync="showSharePopStatus" width="432px">
            <div class="share">
                <div class="share-title">{{ text.title }}</div>
                <div class="share-guide">{{ text.guide }}</div>
                <div class="share-imgUrl" :class="{ 'invite-imgUrl': type === 'invite'}">
                    <img v-if="type !== 'invite'" :src="imgUrl"/>
                    <VueQArt :config="config"></VueQArt>
                </div>
                <div class="invite" v-if="type === 'invite'"></div>
                <el-button @click="helpPopupShowFun" type="text" class="helpBtn">{{ text.helpTitle }}帮助<i class="iconfont icon-question-circle"></i></el-button>
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
import VueQArt from 'vue-qart'

export default {
  watch: {
    visible (value) {
      if (value) {
        this.showSharePopStatus = true
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
      config: {
        value: 'https://h5.lieduoduo.com/wantYou_b?type=appEnter&uid=193',
        // ${this.data.id}
        imagePath: '../../../assets/fly.png',
        filter: 'color'
      },
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
    VueQArt
  },
  mounted () {
    if (this.data.id) return
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
        let recruiterUid = {
          recruiterUid: this.data.id
        }
        getRecruiterQrcodeApi(recruiterUid).then(res => {
          this.imgUrl = res.data.data.positionQrCodeUrl
        })
        break
      case 'invite':
        this.text = this.dataText['invite']
        console.log(3)
        break
    }
  },
  methods: {
    helpPopupShowFun () {
      this.helpPopupShow = !this.helpPopupShow
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
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
