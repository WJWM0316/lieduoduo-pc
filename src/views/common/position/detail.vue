<template>
  <div class="positionDetail" :class="{'overflow' : showPoster}" v-if="infos.id">
		<div style="height: 194px" v-if="headerFloat"></div>
    <header ref="header" class="header" :class="{'isRapidly' : infos.isRapidly === 1, 'positionDetail-hidden headerFloat' : headerFloat}">
      <!-- 设置1440位置的banner -->
      <div class="inner-bg">
        <div class="inner">
          <div class="header-content">
            <div  v-if="!headerFloat">
              <div class="title">
                <span v-if="infos.isUrgency === 1" class="icon jipin"></span>
                <span class="name">{{infos.positionName}}</span>
              </div>
              <div class="salary">{{infos.emolumentMin}}~{{infos.emolumentMax}}K<template v-if="infos.annualSalary > 12">·{{infos.annualSalary}}<span class="unit">薪</span></template></div>
              <div class="infos">
                <span class="info-item" v-if="infos.city || infos.district"><i class="icon iconfont icon-dizhi"></i>{{infos.city}} {{infos.district}}</span>
                <span class="info-item"><i class="icon iconfont icon-zhiwei"></i>{{infos.workExperienceName}}</span>
                <span class="info-item"><i class="icon iconfont icon-jiaoyu"></i>{{infos.educationName}}</span>
              </div>
              <div class="labels" v-if="infos.lightspotInfo && infos.lightspotInfo.length">
                <span class="label-item" v-for="n in infos.lightspotInfo" :key="n">{{n}}</span>
              </div>
            </div>
						<div v-else class="title">
						  <span v-if="infos.isUrgency === 1" class="icon jipin"></span>
						  <span class="name">{{infos.positionName}}</span>
						  <span class="salary">{{infos.emolumentMin}}~{{infos.emolumentMax}}K<span v-if="infos.annualSalary > 12">·{{infos.annualSalary}}<span class="unit">薪</span></span></span>
						</div>
          </div>
          <div class="aside" :style="{'padding-top': infos.isRapidly === 1 ? '6px' : infos.lightspotInfo && infos.lightspotInfo.length ? '40px': '22px'}">
            <div v-if="infos.isRapidly === 1" class="icon yuemian24" v-show="!headerFloat">
              <img class="logo" :src="cdnPath + 'tag_24hour.png'" alt="">
              <div class="number"><span class="num">{{remainingSeats}}</span>个<p class="desc">约面席位</p></div>
              <div class="timeBox">
                <div class="time">还剩<template v-if="remainingTime.day > 0"><span class="little-box">{{remainingTime.day}}</span>天</template><span class="little-box">{{remainingTime.hour}}</span>:<span class="little-box">{{remainingTime.minute}}</span>:<span class="little-box">{{remainingTime.second}}</span></div>
                <p class="desc">{{chatDesc}}<el-tooltip class="item" popper-class="tooltip" effect="light"  placement="bottom-end">
                  <p slot="content">1.抢占约面席位后将享【急速反馈服务】。<br>
                    2.在线约面服务<br>
                    （1）法定工作日（除节假日前一天）内抢占约面席位，面试官将在抢占成功后的24小时内给与答复。<br>
                    （2）节假日前一天及节假日内抢占约面席位，面试官将在假期结束后的24小时内给与答复。</p>
                  <i class="icon"></i>
                </el-tooltip></p>
              </div>
            </div>
            <div class="operBox">
              <interviewBtn ref="interviewBtn" :infos="infos" type="position" @init="init"></interviewBtn>
            </div>
            <div class="botBtnBox" v-show="!headerFloat">
              <el-dropdown trigger="hover" class="botBtn">
                <div class="botBtn"><i class="icon iconfont icon-weixin"></i>微信分享</div>
                <el-dropdown-menu slot="dropdown" class="qrcodeBox">
                  <el-dropdown-item disabled><img class="qrcode" :src="qrcodeUrl"></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="hover" @command="handleCommand" class="botBtn" placement="bottom-end">
                <div class="el-dropdown-link"><i class="icon iconfont icon-shengchenghaibao"></i>生成海报</div>
                <el-dropdown-menu slot="dropdown" class="poster-content">
                  <el-dropdown-item command="shortPoster">
                    <img class="icon" :src="cdnPath + 'ic_share_poster.png'" alt="">
                    <div class="title">生成精美海报<span class="label">抓眼球</span></div>
                    <p class="desc">提练职位核心信息，发圈更抓人眼球</p>
                  </el-dropdown-item>
                  <el-dropdown-item command="longPoster">
                    <img class="icon" :src="cdnPath + 'ic_share_detailpic.png'" alt="">
                    <div class="title">生成职位长图<span class="label">最详细</span></div>
                    <p class="desc">呈现所有职位信息，细节一目了然</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="botBtn noMargin" :class="{'cur' : infos.isCollect}" @click="todoAction('collectPosition')"><i class="icon iconfont" :class="infos.isCollect ? 'icon-yishoucang': 'icon-shoucang'"></i>感兴趣</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <poster @closePoster="closePoster" :showPoster.sync="showPoster" :params='posterParmas'></poster>
    <div class="content">
      <div class="inner">
        <article class="content-article">
          <el-row class="admin-infos">
            <el-col :span="24">
              <div class="img-box">
                <img :src="infos.recruiterInfo.avatar.smallUrl" alt="avatar" v-if="infos.recruiterInfo && infos.recruiterInfo.avatar">
              </div>
              <div class="admin-hello">
                <div class="tips_01">
                  {{infos.recruiterInfo.name}}
                  <el-popover
                    placement="right-start"
                    popper-class="user-infos"
                    :offset="-10"
                    trigger="hover">
                    <div class="box">
                      <div class="describe" v-html="GuidedDownload.html"></div>
                      <div class="qr-code"><img :src="GuidedDownload.src"/></div>
                    </div>
                    <div class="slotContent" slot="reference"><i class="icon iconfont icon-duihua_huaban"></i></div>
                  </el-popover>
                </div>
                <div class="degress">{{infos.recruiterInfo.position}} <template v-if="infos.activeLabel">· {{infos.activeLabel}}</template></div>
              </div>
            </el-col>
          </el-row>
          <section class="part" v-if="infos.skillsLabel.length > 0">
            <div class="title">技能要求</div>
            <div class="labels">
              <span class="label-item" v-for="n in infos.skillsLabel" :key="n.labelId">{{n.name}}</span>
            </div>
          </section>
          <section class="part" v-if="infos.describe">
            <div class="title">职位描述</div>
            <pre class="richText">{{infos.describe}}</pre>
          </section>
          <section class="part" v-if="infos.companyInfo.intro">
            <div class="title">公司介绍</div>
            <block-overflow class="richText" ref="blockOverflow" :text="infos.companyInfo.intro" />
          </section>
          <section class="part" v-if="infos.address">
            <div class="title">工作地址</div>
            <div class="map">
              <map-pop :companyAddress ="adress"></map-pop>
            </div>
          </section>
        </article>
        <aside class="content-aside">
          <guideLogin v-if="!hasLogin" class="position-guide-login"></guideLogin>
          <div class="companyInfos" @click="toCompanyDetail">
            <p class="title">公司基本信息</p>
            <div class="details">
              <div class="logo">
                <el-image ref="logo" :class="verticalLogo ? 'vertical' : true" :src="infos.companyInfo.logoInfo.smallUrl" alt="" fit='scale-down'></el-image>
              </div>
              <div class="name">{{infos.companyInfo.companyShortname}}</div>
            </div>
            <div class="infos">
              <p class="info-item" v-if="infos.companyInfo.financingInfo"><i class="icon iconfont icon-rongzi"></i>{{infos.companyInfo.financingInfo}}</p>
              <p class="info-item"><i class="icon iconfont icon-renshu1"></i>{{infos.companyInfo.employeesInfo}}</p>
              <p class="info-item"><i class="icon iconfont icon-gongsileixing"></i>{{infos.companyInfo.industry}}</p>
            </div>
          </div>
          <adpostion position="positionDetail"></adpostion>
        </aside>
      </div>
    </div>
    <div class="main-center app-links">
      <app-links />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getPositionApi, putMycollectPositionApi, deleteMycollectPositionApi } from '@/api/position.js'
import { getMyQrcodeApi } from '@/api/qrcode.js'
import timePocessor from '@/util/timePocessor.js'
import { TMap } from '@/util/TMap.js'
import poster from '@/components/common/poster'
import interviewBtn from '@/components/interview/interviewBtn.vue'
import guideLogin from '@/components/common/guideLogin'
import adpostion from '@/components/common/adpostion'
import { mapState } from 'vuex'
import AppLinks from 'COMPONENTS/common/appLinks'
import BlockOverflow from 'COMPONENTS/common/blockOverflow'
import mapPop from '@/components/mapPop/index'
import { GuidedDownload } from '@/config/vars'
// import { app_qrcode } from 'IMAGES/image'
let that = null

@Component({
  name: 'positionDetail',
  components: {
    poster,
    guideLogin,
    adpostion,
    interviewBtn,
    AppLinks,
    BlockOverflow,
    mapPop
  },
  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin
    }),
    remainingSeats () {
      return this.infos.rapidlyInfo.seatsNum - this.infos.rapidlyInfo.applyNum - this.infos.rapidlyInfo.natureApplyNum
    },
    chatDesc () {
      if (this.remainingSeats === 0) {
        return '现在申请，不享受24h反馈'
      } else if (this.infos.rapidlyServiceEndTime) {
        let serviceEndTime = `${parseInt(this.infos.rapidlyServiceEndTime.slice(5, 7))}月${parseInt(this.infos.rapidlyServiceEndTime.slice(8, 10))}日`
        return `现在申请最迟${serviceEndTime}反馈`
      } else {
        return '现在申请24小时内必定反馈'
      }
    },
    adress () {
      if (this.infos.address) {
        return [
          {
            address: this.infos.address,
            lat: this.infos.lat,
            lng: this.infos.lng,
            doorplate: this.infos.doorplate
          }
        ]
      }
    }
  }
})
export default class PositionDetail extends Vue {
  GuidedDownload = GuidedDownload
  cdnPath = `${this.$cdnPath}/images/`
	overflow = false // 是否去掉滚动条
  headerFloat = false
  verticalLogo = false // 是否竖版图片， 控制logo展示格式
  showShareQrcode = false // 分享二维码
  showSharePoster = false // 分享海报
  showPoster = false // 开启海报
  posterParmas = {} // 海报参数
  longPosters = '' // 长海报
  shortPoster = '' // 短海报
  remainingTime = {} // 倒计时
  id = 0
  headerH = 0
  qrcodeUrl = ''
  infos = {
    skillsLabel: [],
    companyInfo: {
      intro: '',
      companyShortname: '',
      logoInfo: {}
    },
    rapidlyInfo: {
      seatsNum: 0,
      applyNum: 0,
      natureApplyNum: 0,
      endTime: '',
      startTime: ''
    }
  }
  getDetail () {
    let that = this
    getPositionApi({ id: this.id }).then(res => {
      let infos = res.data.data
      this.infos = infos
      if (that.infos.rapidlyInfo && that.infos.rapidlyInfo.endTime) {
        let time = that.infos.rapidlyInfo.endTime.replace(/-/g, '/')
        this.remainingTime = timePocessor.restTime(time)
        timePocessor.countDown(this.remainingTime).then(res => {
          this.remainingTime = res
        })
      }
      this.$nextTick(() => {
        if (this.$refs.blockOverflow) this.$refs.blockOverflow.updateTextHeigth()
      })
    })
  }
  toCompanyDetail () {
    let routeData = this.$router.resolve({
      name: 'companyDetail',
      query: {
        vkey: this.infos.companyInfo.vkey
      }
    })
    window.open(routeData.href, '_blank')
  }
  closePoster () {
    this.showPoster = false
  }
  handleCommand (command) {
    if (!this.hasLogin) {
      this.$refs.interviewBtn.$refs.loginPop.showLoginPop = true
      return
    }
    that.showPoster = true
    switch (command) {
      case 'longPoster':
        that.posterParmas = {
          id: that.id,
          type: 'position'
        }
        break
      case 'shortPoster':
        that.posterParmas = {
          id: that.id,
          type: 'position_min'
        }
        break
    }
  }
  todoAction (clickTyp, type) {
    if (!this.hasLogin) {
      this.$refs.interviewBtn.$refs.loginPop.showLoginPop = true
      return
    }
    switch (clickTyp) {
      case 'collectPosition':
        if (!this.infos.isCollect) {
          putMycollectPositionApi({ id: this.id }).then(res => {
            let infos = this.infos
            infos.isCollect = true
            this.infos = infos
            if (res.data.httpStatus === 200) {
              this.$message.success('成功标记感兴趣')
            }
          })
        } else {
          deleteMycollectPositionApi({ id: this.id }).then(res => {
            let infos = this.infos
            infos.isCollect = false
            this.infos = infos
            if (res.data.httpStatus === 200) {
              this.$message.success('已取消标记')
            }
          })
        }
        break
    }
  }
  getQrcode () {
  	getMyQrcodeApi({ path: 'page/common/pages/positionDetail/positionDetail', params: `positionId=${this.id}` }).then(res => {
  		this.qrcodeUrl = res.data.data.url
  	})
  }

  getMapLocation (lat, lng) {
  	TMap('TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG').then(qq => {
	    this.$nextTick(() => {
	      var myLatlng = new qq.maps.LatLng(lat, lng)
			  var myOptions = {
			    zoom: 15,
			    center: myLatlng
			  }
			  var map = new qq.maps.Map(document.getElementById('map'), myOptions)
			  var marker = new qq.maps.Marker({
          position: myLatlng,
          animation: qq.maps.MarkerAnimation.DROP,
		      map: map
		    })
		  })
	  })
  }
  imgLoad (e) {
    if (this.$refs.logo.height / this.$refs.logo.width > 2) this.verticalLogo = true
  }
  init () {
    this.getDetail()
  }
  handleScroll () {
    if (!this.headerH) this.headerH = this.$refs.header.clientHeight + 50
    if (window.scrollY > this.headerH) {
      if (!this.headerFloat) this.headerFloat = true
    } else {
      if (this.headerFloat) this.headerFloat = false
    }
  }
  created () {
    that = this
    this.id = this.$route.query.positionId
    this.getQrcode()
    this.getDetail()
  }
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
  dedestroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
@import './detail.scss';
</style>
<style lang="scss">
.user-infos{
  padding: 13px 12px 13px 17px;
  .box {
    display: flex;
    align-items: center;
  }
  .describe {
    width:144px;
    font-size:12px;
    font-weight:400;
    color:$font-color-3;
    line-height:16px;
    margin-right: 10px;
  }
  .qr-code{
    width: 76px;
    height: 76px;
  }
  strong{
    color: $main-color-1;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
