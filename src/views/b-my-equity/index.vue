<template>
  <!-- 我的权益 -->
  <div class="equity-wrapper">
    <div class="equity-title">
      <h1>我的权益</h1>
      <span class="header-tips" v-if="infos.remainDay <= 5">
        <template v-if="isFree">
          <span class="iconfont icon-cuowu"></span>
          <span>尊贵的用户：您的免费试用版权益</span>
          <span class="expired-time">即将于{{infos.expiredDesc | date('YYYY年MM月DD日')}}到期，</span>
          <span>限时升级专业版，请尽快联系我们~</span>
        </template>
        <template v-else>
          <span class="iconfont icon-cuowu"></span>
          <span>尊贵的用户：您的专业版权益</span>
          <span class="expired-time">即将于{{infos.expiredDesc | date('YYYY年MM月DD日')}}到期，</span>
          <span>为了不影响您的招聘工作，请联系我们进行续费~</span>
        </template>
      </span>
    </div>
    <div class="recruiter-config">
      <div class="recruiter-avatar">
        <img :src="recruiter.avatar && recruiter.avatar.smallUrl" alt="">
      </div>
      <div class="recruiter-version">
        <p class="version-type">{{infos.rtVersionName}}</p>
        <p class="version-time" v-if="infos.expiredDesc">有效期至 {{infos.expiredDesc | date('YYYY年MM月DD日')}}</p>
      </div>
      <el-button type="primary" @click="contactDialogStatus = true">{{isFree ? '升级专业版' : '我要续费'}}</el-button>
    </div>
    <h2>权益使用详情</h2>
    <div class="equity-list">
      <div class="equity-list-wrapper">
        <div class="">
          <p>面试官人数上限</p>
          <span class="list-count">{{infos.cRecruiterNum === -1 ? '不限' : infos.cRecruiterNum}}</span>
          <span style="padding-left: 4px;">人</span>
          <span style="padding: 0 16px;">|</span>
          <span>已加入</span>
          <span class="list-count-2">{{infos.cRecruiterNumUsed}}</span>
          <span>人</span>
        </div>
        <div class="c-btn" @click="handleSet('invite', infos.cRecruiterNum, infos.cRecruiterNumUsed)">邀请同事</div>
      </div>
      <div class="equity-list-wrapper">
        <div class="">
          <p>在线职位数上限</p>
          <span class="list-count">{{infos.rOnlinePosition === -1 ? '不限' : infos.cRecruiterNum}}</span>
          <span style="padding-left: 4px;">人</span>
          <span style="padding: 0 16px;">|</span>
          <span>已发布</span>
          <span class="list-count-2">{{infos.rOnlinePositionUsed}}</span>
          <span>人</span>
        </div>
        <div class="c-btn" @click="handleSet('position', infos.cRecruiterNum, infos.rOnlinePositionUsed)">发布职位</div>
      </div>
      <div class="equity-list-wrapper">
        <div class="">
          <p>每日面试邀约数上限</p>
          <span class="list-count">{{infos.rDayInviteInterview === -1 ? '不限' : infos.cRecruiterNum}}</span>
          <span style="padding-left: 4px;">人</span>
          <span style="padding: 0 16px;">|</span>
          <span>已邀约</span>
          <span class="list-count-2">{{infos.rDayInviteInterviewUsed}}</span>
          <span>人</span>
        </div>
        <div class="c-btn" @click="handleSet('colleague', infos.cRecruiterNum, infos.rDayInviteInterviewUsed)">前往邀约</div>
      </div>
      <div class="equity-list-wrapper">
        <div class="">
          <p>每日查看简历上限</p>
          <span class="list-count">{{infos.rDayBrowseResume === -1 ? '不限' : infos.cRecruiterNum}}</span>
          <span style="padding-left: 4px;">份</span>
          <span style="padding: 0 16px;">|</span>
          <span>已查看</span>
          <span class="list-count-2">{{infos.rDayBrowseResumeUsed}}</span>
          <span>份</span>
        </div>
        <div class="c-btn" @click="handleSet('view', infos.cRecruiterNum, infos.rDayBrowseResumeUsed)">前往查看</div>
      </div>
    </div>
    <el-dialog
      width="432px"
      custom-class="app-dialog"
      :visible.sync="contactDialogStatus">
      <div class="contact-wrapper">
        <p class="contact-title"> {{isFree ? '升级专业版' : '立即续费'}}</p>
        <p> {{isFree ? '您可用「微信」扫下方二维码，联系我们升级专业版' : '您可微信扫下方二维码，联系我们进行续费'}} </p>
        <div class="contact-qrcode">
          <img :src="wxAccount" alt="">
        </div>
        <p>或拨打全国咨询热线</p>
        <p class="contant-number">400-065-5788</p>
      </div>
    </el-dialog>
    <share-popup :visible.sync="showSharePopup" type="invite" :data="{uid: recruiter.uid}" />
  </div>
</template>
<script>
import { getRecruiterRight } from 'API/recruiter'
import { wx_account_qrcode } from 'IMAGES/image'
import SharePopup from '@/components/common/sharePopup'
const TipsText = {
  colleague: {
    text: '邀请约面人数已达上限，请联系客服申请开放人数限制',
    name: 'candidatetype'
  },
  position: {
    text: '浏览简历次数已达上限，请联系客服申请开放次数限制',
    name: 'postJob'
  },
  invite: {
    text: '招聘官人数已达上限，请联系客服申请开放人数限制'
  },
  view: {
    text: '招聘中职位数已达上限，请联系客服申请开放数量限制',
    name: 'candidatetype'
  }
}
export default {
  components: { SharePopup },
  data () {
    return {
      infos: {},
      contactDialogStatus: false, // 联系人弹窗
      showSharePopup: false,
      wxAccount: wx_account_qrcode
    }
  },
  computed: {
    // 招聘官资料
    recruiter () {
      return this.$store.state.recruiter.info
    },
    // 是否是免费版
    isFree () {
      return this.infos.rtVersionId
    }
  },
  created () {
    // this.$message.warning({
    //   content: 'test',
    //   duration: 0
    // })
    this.getInfos()
  },
  methods: {
    getInfos () {
      getRecruiterRight().then(({ data }) => {
        this.infos = data.data || {}
      })
    },
    handleSet (type, limit, count) {
      // 非不限 && 数量上限
      if (limit !== -1 && limit <= count) {
        this.$confirm(TipsText[type].text, '提示', {
          confirmButtonText: '联系客服',
          cancelButtonText: '我考虑一下',
          type: 'warning',
          center: true
        }).then(() => {
          this.contactDialogStatus = true
        }).catch(() => {})
        return
      }
      // 跳转链接 或者 提示弹窗
      if (type === 'invite') {
        this.showSharePopup = true
      } else {
        this.$router.push({
          name: TipsText[type].name
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$list-bg-color: #FBFDFD;
$tip-color: #FF7F4D;
.equity-wrapper {
  padding: 48px 64px;
  background: #fff;
  min-width: 960px;
}
.equity-title {
  h1 {
    font-size: 24px;
    line-height:32px;
  }
  h1, span {
    display: inline-block;
    vertical-align: middle;
  }
  .header-tips {
    padding: 5px 23px 5px 12px;
    font-size: 12px;
    background: $--color-warning-lighter;
    color: $title-color-2;
    border-radius: 4px;
    margin-left: 8px;
    line-height: 18px;
    .iconfont {
      padding-right: 2px;
      font-size: 14px;
      color: $tip-color;
    }
    .expired-time {
      color: $tip-color;
    }
  }
}
.recruiter-config {
  @include flex-v-center;
  .recruiter-avatar {
    @include img-radius(72px, 72px);
    border: 1px solid $border-color-8;
  }
  .recruiter-version {
    margin-left: 16px;
  }
  .el-button {
    margin-left: auto;
  }
  .version-type {
    color: $title-color-1;
    font-size: 20px;
    font-weight: bold;
  }
  .version-time {
    color: $title-color-2;
    font-size: 14px;
    margin-top: 10px;
  }
}
h2 {
  color: $font-color-2;
  font-size: 20px;
  line-height:32px;
  margin: 62px 0 24px;
}
.equity-list {
  display: flex;
  flex-wrap: wrap;
  .equity-list-wrapper:nth-child(even) {
    margin-left: 2.2%;
  }
}
.equity-list-wrapper {
  width: 48.9%;
  padding: 35px 42px 42px;
  background: $list-bg-color;
  border: 1px solid $border-color-8;
  box-sizing: border-box;
  border-radius:4px;
  margin-bottom: 20px;
  @include flex-v-center;
  p {
    color: $title-color-1;
    font-size: 16px;
    line-height:16px;
    margin-bottom: 17px;
  }
  .list-count {
    font-weight: bold;
    color: $title-color-1;
    font-size: 32px;
    line-height:32px;
  }
  .c-btn {
    margin-left: auto;
  }
  span {
    color: $title-color-3;
  }
  .list-count-2 {
    font-weight: bold;
    font-size: 18px;
    line-height:18px;
    color: $title-color-2;
    padding: 0 5px;
  }
}
.contact-wrapper {
  text-align: center;
  p {
    color: $title-color-2;
    font-size: 14px;
    line-height: 20px;
  }
  .contact-title {
    font-size: 26px;
    color: $title-color-1;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .contact-qrcode {
    display: inline-block;
    width: 194px;
    margin: 8px 0 30px;
    img {
      max-width: 100%;
    }
  }
  .contant-number {
    font-weight: bold;
    color: $main-color-1;
    font-size: 30px;
    padding-bottom: 48px;
    margin-top: 14px;
  }
}
</style>
