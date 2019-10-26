<template>
	<div class="positionDetail">
		<header class="header" :class="infos.isRapidly ? 'isRapidly' : ''">
			<div class="inner">
				<div class="header-content">
					<div class="title">
						<span v-if="infos.isUrgency" class="icon jipin"></span>
						<span class="name">{{infos.positionName}}</span>
					</div>
					<div class="salary">{{infos.emolumentMin}}~{{infos.emolumentMax}}K<template v-if="infos.annualSalary > 12">·{{infos.annualSalary}}<span class="unit">薪</span></template></div>
					<div class="infos">
						<span class="info-item"><i class="icon iconfont"></i>{{infos.city}} {{infos.district}}</span>
						<span class="info-item"><i class="icon iconfont icon-zhiwei"></i>{{infos.workExperienceName}}</span>
						<span class="info-item"><i class="icon iconfont"></i>{{infos.educationName}}</span>
					</div>
					<div class="labels">
						<span class="label-item" v-for="n in infos.lightspotInfo" :key="n">{{n}}</span>
					</div>
				</div>
				<div class="aside">
					<div v-if="infos.isRapidly" class="icon yuemian24">
						<img class="logo" :src="cdnPath + 'tag_24hour.png'" alt="">
						<div class="number"><span class="num">{{remainingSeats}}</span>个<p class="desc">约面席位</p></div>
						<div class="timeBox">
							<div class="time">还剩<span class="little-box">{{remainingTime.day}}</span>天<span class="little-box">{{remainingTime.hour}}</span>:<span class="little-box">{{remainingTime.minute}}</span>:<span class="little-box">{{remainingTime.second}}</span></div>
							<p class="desc">现在申请24小时内必定反馈<i class="icon iconfont icon-question-circle"></i></p>
						</div>
					</div>
					<div class="operBox">
						<interviewBtn :infos="infos" type="position"></interviewBtn>
					</div>
					<div class="botBtnBox">
						<span class="botBtn" @mouseenter="mouseenEven($event, 'shareQrcode')" @mouseleave="mouseenEven($event, 'shareQrcode')"><i class="icon iconfont icon-weixin"></i>微信分享</span>
						<span class="botBtn" @mouseenter="mouseenEven($event, 'sharePoster')" @mouseleave="mouseenEven($event, 'sharePoster')"><i class="icon iconfont icon-shengchenghaibao"></i>生成海报</span>
						<span class="botBtn noMargin" @click="collectPosition"><i class="icon iconfont" :class="infos.isCollect ? 'icon-yishoucang': 'icon-shoucang'"></i>感兴趣</span>
						<div class="wxShare" v-show="showShareQrcode"><img class="qrcode" :src="qrcodeUrl"></div>
						<div class="poster" v-show="showSharePoster" @mouseleave="mouseenEven($event, 'sharePoster')">
							<div class="poster-content">
								<div class="poster-item" @click="getPoster('long')">
									<img class="icon" :src="cdnPath + 'ic_share_poster.png'" alt="">
									<div class="title">生成精美海报<span class="label">抓眼球</span></div>
									<p class="desc">提练职位核心信息，发圈更抓人眼球</p> 
								</div>
								<div class="poster-item" @click="getPoster('short')">
									<img class="icon" :src="cdnPath + 'ic_share_detailpic.png'" alt="">
									<div class="title">生成职位长图<span class="label">最详情</span></div>
									<p class="desc">呈现所有职位信息，细节一目了然</p> 
								</div>
							</div>
						</div>
						<poster  @closePoster="closePoster" :showPoster.sync="showPoster" :params='posterParmas'></poster>
					</div>
				</div>
			</div>
		</header>
		<div class="content">
			<div class="inner">
				<article class="content-article">
					<section class="part">
						<div class="title">技能要求</div>
						<div class="labels">
							<span class="label-item" v-for="n in infos.skillsLabel" :key="n.labelId">{{n.name}}</span>
						</div>
					</section>
					<section class="part">
						<div class="title">职位描述</div>
						<pre class="richText">{{infos.describe}}</pre>
					</section>
					<section class="part">
						<div class="title">公司介绍</div>
						<pre class="richText">{{infos.companyInfo.intro}}</pre>
					</section>
					<section class="part">
						<div class="title">工作地址</div>
						<div class="map">
							<div class="address"><i class="icon iconfont"></i>{{infos.address}}</div>
							<div id="map" style="width:750px; height:147px"></div>
						</div>
					</section>
				</article>
				<aside class="content-aside">
					<div class="loginBox">
						<p class="desc">10W+优质机会任你选</p>
						<el-button class="login">登录</el-button>
						<el-button class="register">注册</el-button>
					</div>
					<div class="companyInfos">
						<p class="title">公司基本信息</p>
						<div class="details">
							<div class="logo"><img ref="logo" :class="verticalLogo ? 'vertical' : true" @load="imgLoad" :src="infos.companyInfo.logoInfo.smallUrl" alt=""></div>
							<div class="name">{{infos.companyInfo.companyShortname}}</div>
						</div>
						<div class="infos">
							<p class="info-item"><i class="icon iconfont icon-rongzi"></i>{{infos.companyInfo.financingInfo}}</p>
							<p class="info-item"><i class="icon iconfont icon-renshu1"></i>{{infos.companyInfo.employeesInfo}}</p>
							<p class="info-item"><i class="icon iconfont icon-gongsileixing"></i>{{infos.companyInfo.financingInfo}}</p>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import {getPositionApi, putMycollectPositionApi, deleteMycollectPositionApi} from '@/api/position.js'
import {getPositionQrcodeApi} from '@/api/qrcode.js'
import timePocessor from '@/util/timePocessor.js'
import {TMap} from '@/util/TMap.js'
import poster from '@/components/poster'
import interviewBtn from '@/components/interview/interviewBtn.vue'
@Component({
  name: 'positionDetail',
  components: {
  	poster,
  	interviewBtn
  },
  computed: {
  	remainingSeats() {
  		return this.infos.rapidlyInfo.seatsNum - this.infos.rapidlyInfo.applyNum - this.infos.rapidlyInfo.natureApplyNum
  	}
  }
})
export default class PositionDetail extends Vue {
  cdnPath = `${this.$cdnPath}/images/`
  verticalLogo = false // 是否竖版图片， 控制logo展示格式
  showShareQrcode = false // 分享二维码
  showSharePoster = false // 分享海报
  showPoster = false // 开启海报
  posterParmas = {} // 海报参数
	longPosters = '' // 长海报
	shortPoster = '' // 短海报
	remainingTime = {} // 倒计时
  id = 0
  qrcodeUrl = ''
  infos = {
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
  mouseenEven (e, type) {
  	switch (type) {
  		case 'shareQrcode':
  			this.showShareQrcode = !this.showShareQrcode
  			break
  		case 'sharePoster':
  			this.showSharePoster = !this.showSharePoster
  			break
  	}
  }
  getDetail () {
  	let that = this
  	getPositionApi({id: this.id}).then(res => {
			this.infos = res.data.data
			this.remainingTime = timePocessor.restTime(that.infos.rapidlyInfo.endTime)
			timePocessor.countDown(this.remainingTime).then(res => {
  			this.remainingTime = res
  		})
			this.getMapLocation(that.infos.lat, that.infos.lng)
	  })
  }
  closePoster () {
  	this.showPoster = false
  }
  getPoster (type) {
  	this.showPoster = true
  	switch (type) {
  		case 'long':
  			this.posterParmas = {
					id: this.id,
					type: 'position'
				}
  			break
  		case 'short':
  			this.posterParmas = {
					id: this.id,
					type: 'position_min'
				}
  			break
  	}
  }
  getQrcode () {
  	getPositionQrcodeApi({id: this.id, type: 'position'}).then(res => {
  		this.qrcodeUrl = res.data.data.positionQrCodeUrl
  	})
  }
  collectPosition () {
  	if (!this.infos.isCollect) {
  		putMycollectPositionApi({id: this.id}).then(res => {
  			this.infos.isCollect = true
  		})
  	} else {
  		deleteMycollectPositionApi({id: this.id}).then(res => {
  			this.infos.isCollect = false
  		})
  	}
  }
  getMapLocation (lat, lng) {
  	TMap('TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG').then(qq => {
	    this.$nextTick(() => {
	      var myLatlng = new qq.maps.LatLng(lat, lng);
			  var myOptions = {
			    zoom: 15,
			    center: myLatlng
			  }
			  var map = new qq.maps.Map(document.getElementById("map"), myOptions);
			  var marker = new qq.maps.Marker({
          position: myLatlng,
					animation: qq.maps.MarkerAnimation.DROP,
		      map:map
		    });
		  })
	  })
  }
  imgLoad (e) {
  	if (this.$refs.logo.height/this.$refs.logo.width > 2) this.verticalLogo = true
  }
  created () {
  	this.id = this.$route.query.positionId
  	this.getQrcode()
  	this.getDetail()
  }
}
</script>
<style lang="scss" scoped>
@import './detail.scss';
</style>