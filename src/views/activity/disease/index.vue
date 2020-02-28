<template>
  <div class="disease-wrap">
    <div class="first">
      <div class="first-btn">
        <div id="Immediateiy-position" class="bnt_left" @click="onBtn('left')">马上发布职位</div>
        <div id="position_receive-award" class="bnt_right" @click="onBtn('right')">已发布职位，领取奖励</div>
      </div>
    </div>
    <div class="second"></div>
    <div class="third"></div>
    <div class="fourth"></div>
    <div class="fifth"></div>
    <div class="sixth">
      <p class="sixth-text">
      1. 活动期间（2.27-3.5）发布职位，每个职位有效在线3天及以上即可获得300多多币，最高可获得3000多多币；<br/>
      2. 添加客服登记信息，职位审核通过后，我们将在3天内为您的账号充值多多币；<br/>
      3. 多多币仅限购买猎多多招聘权益使用，不可提现，具体可兑换权益可前往【我的】-【我的权益】查看；<br/>
      4. 若企业/招聘官未注册，需先完成注册流程；<br/>
      5. 活动期间遇到任何问题，可咨询客服人员（微信：xiaoxiannvlff）；<br/>
      6. 本次活动最终解释权归老虎信息科技有限公司所有。
      </p>
      <div id="Post-position_receive-award" class="sixth-bnt" @click="onBtn('left')">发职位，领奖励</div>
    </div>
    <login-pop ref="loginPop"></login-pop>
    <pop v-if="popShow"></pop>
  </div>
</template>

<script>
import pop from './components/pop'
import loginPop from '@/components/common/loginPop'
import { getAccessToken } from 'API/cacheService'
import { inviteSubsidyGrant } from 'API/activity.js'
export default {
  components: {
    loginPop,
    pop
  },
  data () {
    return {
      popShow: false
    }
  },
  created () {
    this.baiduTj()
  },
  methods: {
    onBtn (data) {
      // 是否已经登录
      if (!getAccessToken()) {
        this.$refs.loginPop.showLoginPop = true
        return
      }
      // 区分点击按钮来源
      switch (data) {
        case 'left':
          // 是否有b端身份
          if (this.$store.getters === 1) {
            this.$router.push({ name: 'register' })
          } else {
            window.open('/recruiterIndex', '_blank')
          }
          break
        case 'right':
          inviteSubsidyGrant().then(res => {
            // grantSubsidy 1 可以领，0不可领
            if (res.data.data.grantSubsidy) {
              this.popShow = true
            } else {
              let newWindow = window.open()
              newWindow.location.href = '/recruiterIndex'
            }
          })
          break
      }
    },
    baiduTj () {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?1d2eb234dc177895917623cfbc210cf2'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  }
}
</script>

<style lang="scss" scoped>
.disease-wrap{
  background: #99D0E9;
}
.first{
  background: url(#{$image-activity-cdn-url}/disease_pc/bg_01.jpg) no-repeat;
  height: 525px;
  background-position: top center;
  padding-top: 412px;
  box-sizing: border-box;
}
.second{
  background: url(#{$image-activity-cdn-url}/disease_pc/bg_02.jpg) no-repeat;
  height: 166px;
  background-position: top center;
}
.third{
  background: url(#{$image-activity-cdn-url}/disease_pc/bg_03.jpg) no-repeat;
  height: 396px;
  background-position: top center;
}
.fourth{
  background: url(#{$image-activity-cdn-url}/disease_pc/bg_04.jpg?a=1) no-repeat;
  height: 230px;
  background-position: top center;
}
.fifth{
  background: url(#{$image-activity-cdn-url}/disease_pc/bg_05.jpg) no-repeat;
  height: 169px;
  background-position: top center;
}
.sixth{
  background: url(#{$image-activity-cdn-url}/disease_pc/bg_06.jpg) no-repeat, url(#{$image-activity-cdn-url}/disease_pc/bg_07.jpg) no-repeat;
  height: 600px;
  background-position: top center, bottom center;
  padding-top: 20px;
  box-sizing: border-box;
}
.first-btn{
  margin: 0 auto;
  height: 85px;
  width: 678px;
  line-height: 76px;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  .bnt_left{
    width: 235px;
    height: 85px;
    margin-right: 10px;
    display: inline-block;
    background: url(#{$image-activity-cdn-url}/disease_pc/bnt_left.png?a=1) no-repeat;
    border-radius: 30px;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .bnt_right{
    width: 305px;
    height: 85px;
    margin-right: 122px;
    display: inline-block;
    background: url(#{$image-activity-cdn-url}/disease_pc/bnt_right.png?a=1) no-repeat;
    border-radius: 32px;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
.sixth-text{
  color: #252655;
  font-weight: 500;
  line-height: 45px;
  font-size: 18px;
  width: 890px;
  margin: 0 auto;
}
.sixth-bnt{
  width: 342px;
  height: 97px;
  background: url(#{$image-activity-cdn-url}/disease_pc/bnt_bottom.png) no-repeat;
  border-radius: 38px;
  background-size: 100% 100%;
  font-size: 26px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  margin: 92px auto 0 auto;
  cursor: pointer;
}
</style>
