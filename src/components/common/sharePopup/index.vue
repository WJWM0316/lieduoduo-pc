<template>
    <div class="cover">
        <el-dialog :visible.sync="showSharePopups" width="432px">
            <div class="share">
                <div class="share-title">{{ title }}</div>
                <div class="share-guide">{{ guide }}</div>
                <div class="share-imgUrl">
                    <img :src="imgUrl"/>
                </div>
                <div class="helpPop"></div>
                <el-button @click="helpPopupShowFun" type="text" class="helpBtn">{{ type === 'invite' ? '邀请' : '分享' }}帮助<i class="iconfont icon-question-circle"></i></el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
  getCompanyQrcodeApi,
  getRecruiterQrcodeApi
} from '@/api/qrcode'

export default {
  props: {
    title: {
      type: String,
      default: '分享公司主页'
    },
    guide: {
      type: String,
      default: '使用「微信」扫描小程序码分享公司主页'
    },
    type: {
      type: String,
      default: 'company' // company为公司分享, recruiter为招聘官分享， invite为邀请同事
    },
    id: {
      type: Number
    },
    showSharePopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgUrl: '',
      helpPopupShow: false,
      showSharePopups: this.showSharePopup
    }
  },
  mounted () {
    if (this.id) return
    switch (this.type) {
      case 'company':
        let companyId = {
          companyId: this.id
        }
        getCompanyQrcodeApi(companyId).then(res => {
          this.imgUrl = res.data.data.positionQrCodeUrl
        })
        break
      case 'recruiter':
        let recruiterUid = {
          recruiterUid: this.id
        }
        getCompanyQrcodeApi(recruiterUid).then(res => {
          this.imgUrl = res.data.data.positionQrCodeUrl
        })
        break
      case 'invite':
        console.log(3)
        break
    }
  },
  methods: {
    helpPopupShowFun () {
      this.helpPopupShow = !this.helpPopupShow
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
