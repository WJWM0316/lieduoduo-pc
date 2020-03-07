<template>
  <div class="qrCodePop" v-if="guideQrcodePop.switch" @click="close($event)">
    <div class="inner">
      <p class="title">{{title}}<br>{{qrcodeTxt}}</p>
      <el-image class="qrcode" :class="qrClass" :src="qrCodeUrl" alt=""></el-image>
      <i class="close iconfont icon-xiantiaoguanbi" @click="hidePop"></i>
    </div>
  </div>
</template>
<script>
import { getMyQrcodeApi } from '@/api/qrcode'
export default {
  data () {
    return {
      cdnPath: `${this.$cdnPath}/images/`,
      qrcodeTxt: '',
      qrClass: '',
      qrCodeUrl: '' // 二维码
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      guideQrcodePop: state => state.guideQrcodePop
    })
  },
  watch: {
    guideQrcodePop (val) {
      if (val) {
        switch (this.guideQrcodePop.type) {
          case 'interviewDetail':
            let param = {
              path: 'page/common/pages/arrangement/arrangement',
              params: `id=${this.guideQrcodePop.params.interviewId}`
            }
            this.getQrcode(param)
            this.title = '微信扫一扫'
            this.qrCodeUrl = '查看面试详情'
            break
          case 'tobIndex':
            this.qrCodeUrl = `${this.cdnPath}bIndex.jpg`
            this.title = '切换失败'
            this.qrcodeTxt = '尚未认证招聘官，微信扫一扫认证'
            break
          case 'tocIndex':
            this.qrCodeUrl = `${this.cdnPath}cIndex.jpg`
            this.title = '微信扫一扫'
            this.qrcodeTxt = '解锁更多职位'
            break
          case 'to24Hours':
            // ${this.cdnPath}24hoursyuemian.jpg
            this.qrCodeUrl = `${this.cdnPath}uploadAPP.png`
            this.title = '微信扫一扫'
            this.qrClass = 'no-radius'
            this.qrcodeTxt = '解锁更多在线约面职位'
            break
        }
      }
    }
  },

  methods: {
    hidePop () {
      this.$store.commit('guideQrcodePop', false)
    },
    close (e) {
      if (e.target.className === 'qrCodePop') this.hidePop()
    },
    getQrcode (param) {
      getMyQrcodeApi(param).then(res => {
        this.qrCodeUrl = res.data.data.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .qrCodePop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgba(0,0,0,0.5);
    .inner {
      width:300px;
      padding: 38px 20px 62px;
      box-sizing: border-box;
      background:#fff;
      box-shadow:0px -2px 4px 0px rgba(101,39,145,0.1),0px 2px 4px 0px rgba(132,82,167,0.1);
      border-radius:4px;
      text-align: center;
      position: relative;
      .title {
        font-size:20px;
        font-weight:700;
        color:$font-color-2;
        line-height:29px;
      }
      .qrcode {
        width: 124px;
        height: 124px;
        margin: 50px auto 0;
        border-radius:70px;
        padding: 8px;
        position: relative;
        border:1px solid rgba(239,233,244,1);
      }
      .qrcode.no-radius {
        border-radius: 4px;
      }
      .close {
        font-size: 12px;
        color: #BCBEC0;;
        padding: 16px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

</style>
