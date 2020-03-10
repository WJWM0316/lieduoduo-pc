<template>
  <el-dialog
    title="面试信息"
    :visible.sync="visiable"
    width="423px"
    custom-class="interview-model"
    :center="true"
    @close="handleClose">
    <template v-if="[31].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-mianshiguan"></i>
          <div class="ul-li-text-box">
            <div class="color4 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color3">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li" v-if="infos.positionId">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <router-link
              class="color4 position-name"
              target="_blank" :to="{name: 'positionDetail', query: { positionId: infos.positionId }}">
              {{infos.positionName}}
            </router-link>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont" :class="infos.sourceType === 1 ? 'icon-mianshiguanli' : 'icon-dianhua'"></i>
          <div class="color3 ul-li-text-box">{{ infos.sourceTypeDesc }}</div>
        </li>
        <li class="item-li" v-if="infos.sourceType === 1">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color4 address">{{infos.address}}{{infos.doorplate}}</div>
          </div>
        </li>
        <li class="item-li">
          <div class="time-title">请在下面选择一个面试时间</div>
          <div class="time-list" v-if="infos.arrangementInfo.appointmentList.length">
            <div
              class="time-item"
              v-for="(item, index) in infos.arrangementInfo.appointmentList"
              :key="index"
              @click="chooseInterviewDate(item, index)"
              :class="{'time-item-active': item.checked}">
              <i class="iconfont icon-chenggong choose" v-show="item.checked"></i>
              <i class="iconfont icon-beixuanxiang choose" v-show="!item.checked"></i>
              <span class="date color5">{{item.appointment}}</span>
            </div>
          </div>
          <!-- <div class="tips">以上时间都不合适，<strong @click="setDateInappropriate">请联系我</strong></div> -->
        </li>
      </ul>
      <footer slot="footer" class="footer">
        <el-button @click="handleClose" class="btn-cancle-width" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" class="btn-sure-width" size="mini">确 定</el-button>
      </footer>
    </template>
    <template v-if="[32].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-mianshiguan"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li" v-if="infos.positionId">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">
              <router-link
                class="color2 position-name"
                target="_blank" :to="{name: 'positionDetail', query: { positionId: infos.positionId }}">
                {{infos.positionName}}
              </router-link>
            </div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont" :class="infos.sourceType === 1 ? 'icon-mianshiguanli' : 'icon-dianhua'"></i>
          <div class="ul-li-text-box">{{ infos.sourceTypeDesc }}</div>
        </li>
        <li class="item-li" v-if="infos.sourceType === 1">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">{{infos.address}}{{infos.doorplate}}</div>
          </div>
        </li>
        <li class="item-li center">
          <img src="@/assets/images/timeinfo.png" alt="" class="img-box3">
          <div class="waiting">等待面试官安排面试</div>
          <div class="waiting2">你也可以通过上方的电话，联系面试官确认时间~</div>
        </li>
      </ul>
    </template>
    <template v-if="[41].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-mianshiguan"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li" v-if="infos.positionId">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">
              <router-link
                class="color2 position-name"
                target="_blank" :to="{name: 'positionDetail', query: { positionId: infos.positionId }}">
                {{infos.positionName}}
              </router-link>
            </div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont" :class="infos.sourceType === 1 ? 'icon-mianshiguanli' : 'icon-dianhua'"></i>
          <div class="ul-li-text-box">{{ infos.sourceTypeDesc }}</div>
        </li>
        <li class="item-li" v-if="infos.sourceType === 1">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">{{infos.address}}{{infos.doorplate}}</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已确认</div>
          <div class="waiting4">已添加到面试日程，请准时赴约哦~
            <strong>
              通知我
              <div class="notice-diggle2">
                <div class="headbar">
                  <img src="@/assets/images/pic_message.png" alt="">
                </div>
                <div class="clock"><img src="@/assets/images/pic_bell.png" alt=""></div>
                <div class="qrcode">
                  <img :src="app_url" alt="">
                </div>
                <p>下载猎多多APP<br/>获得面试日程通知提醒</p>
                <div class="forward"></div>
                <div class="rocket"><img src="@/assets/images/rocket.png" alt=""></div>
              </div>
            </strong>
          </div>
          <div class="waiting3">{{infos.arrangementInfo.appointment}}</div>
        </li>
      </ul>
    </template>
    <template v-if="[51, 58, 60].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-mianshiguan"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li" v-if="infos.positionId">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">{{infos.positionName}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont" :class="infos.sourceType === 1 ? 'icon-mianshiguanli' : 'icon-dianhua'"></i>
          <div class="ul-li-text-box">{{ infos.sourceTypeDesc }}</div>
        </li>
        <li class="item-li" v-if="infos.sourceType === 1">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">{{infos.address}}{{infos.doorplate}}</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已结束</div>
          <div class="waiting6">{{infos.arrangementInfo.appointment}}</div>
        </li>
      </ul>
    </template>
    <template v-if="[52].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-mianshiguan"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li" v-if="infos.positionId">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">
              <router-link
                class="color2 position-name"
                target="_blank" :to="{name: 'positionDetail', query: { positionId: infos.positionId }}">
                {{infos.positionName}}
              </router-link>
            </div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont" :class="infos.sourceType === 1 ? 'icon-mianshiguanli' : 'icon-dianhua'"></i>
          <div class="ul-li-text-box">{{ infos.sourceTypeDesc }}</div>
        </li>
        <li class="item-li" v-if="infos.sourceType === 1">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">{{infos.address}}{{infos.doorplate}}</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已取消</div>
          <div class="waiting7">如有疑问，可联系面试官~</div>
        </li>
      </ul>
    </template>
  </el-dialog>
</template>
<script>
import {
  getInterviewDetailApi,
  sureInterviewApi
} from 'API/interview'
import { app_qrcode } from 'IMAGES/image'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '面试信息'
    },
    list: {
      type: Array,
      default: () => ([])
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    show: {
      handler (show) {
        if (show) {
          this.getInterviewDetail().then(res => {
            this.getInterviewRedDotInfoApi().then(() => {
              let { appointmentList } = res.arrangementInfo
              this.visiable = true
              this.params.interviewId = res.interviewId
              if (res.arrangementInfo.appointmentList) {
                this.params.appointmentId = appointmentList[0].id
                this.$set(appointmentList[0], 'checked', true)
                appointmentList.push({
                  checked: false,
                  id: 'inappropriate',
                  appointment: '以上时间都不合适，请联系我'
                })
              }
              this.infos = res
            })
          })
        } else {
          this.visiable = false
        }
      }
    },
    visiable: {
      handler (visiable) {
        if (!visiable) {
          this.$emit('close')
        }
      }
    }
  },
  data () {
    return {
      visiable: false,
      infos: {},
      params: {},
      app_url: app_qrcode
    }
  },
  model: {
    prop: 'show',
    event: 'input'
  },
  methods: {
    ...mapActions([
      'getInterviewRedDotInfoApi'
    ]),
    setDateInappropriate () {
      this.params = Object.assign(this.params, {
        interviewId: this.infos.interviewId,
        appointmentId: 0
      })
    },
    getInterviewDetail () {
      return getInterviewDetailApi({ interviewId: this.item.interviewId }).then(({ data }) => data.data)
    },
    handleClose () {
      this.params = {}
      this.visiable = false
      this.$emit('input', this.visiable)
    },
    handleConfirm () {
      this.$emit('confirm')
      this.sureInterview()
    },
    chooseInterviewDate (item, index) {
      let infos = this.infos
      let { appointmentList } = infos.arrangementInfo
      appointmentList.map((v, i, arr) => {
        if (i === index) {
          this.$set(v, 'checked', true)
          if (item.id === 'inappropriate') {
            this.params = Object.assign(this.params, {
              interviewId: infos.interviewId,
              appointmentId: 0
            })
          } else {
            this.params = Object.assign(this.params, {
              interviewId: infos.interviewId,
              appointmentId: v.id
            })
          }
        } else {
          v.checked = false
        }
      })
    },
    sureInterview () {
      let query = {
        ...this.$route.query,
        reLoad: true,
        q: Date.now()
      }
      if (!Reflect.has(this.params, 'appointmentId')) {
        this.$message({ message: '请选择一个面试时间', type: 'warning' })
        return
      }
      console.log(this.params)
      sureInterviewApi(this.params).then(() => {
        this.visiable = false
        this.$router.push({ query })
      })
    }
  }
}
</script>
<style lang="scss">
.interview-model{
  border-radius: 8px !important;
  display: flex;
  flex-direction: column;
  margin:0 !important;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  .item-li {
    font-size:14px;
    font-weight:400;
    line-height:20px;
    padding: 9px 40px;
  }
  .iconfont {
    font-size: 14px;
    color: $iconFont-gray;
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: 1px;
    width: 12px;
  }
  .ul-li-text-box{
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
    max-width: calc(100% - 32px);
    color: $font-color-3;
  }
  .user-name {
    display: inline-block;
    font-size:14px;
    padding-right: 7px;
    margin-right: 7px;
    position: relative;
    &:after{
      content: '';
      display: block;
      height: 12px;
      width: 1px;
      top: 50%;
      margin-top: -6px;
      right: 0;
      background: $border-color-1;
      position: absolute;
    }
  }
  .user-contact {
    display: inline-block;
  }
  .color3 {
    color: $font-color-6;
  }
  .color1 {
    color: $font-color-2;
  }
  .color5 {
    color: $font-color-2;
  }
  .time-title{
    padding: 20px 0 14px 0;
    height:16px;
    font-size:14px;
    font-weight:500;
    color: $font-color-3;
    line-height:16px;
  }
  .time-item{
    font-size:14px;
    font-weight:400;
    line-height:14px;
    padding: 10px 0;
    cursor: pointer;
    position: relative;
  }
  .date{
    display: inline-block;
    vertical-align: middle;
  }
  .choose{
    margin-right: 20px;
  }
  .el-dialog__title{
    font-size:16px;
    font-weight:500;
    color:$font-color-3;
    line-height:24px;
  }
  .el-dialog__header{
    padding: 32px 40px 14px 40px;
    text-align: left;
  }
  .el-dialog__body{
    padding: 0 !important;
  }
  .time-item-active{
    color: $border-color-2;
    .iconfont {
      color: $border-color-2;
    }
  }
  .tips{
    height:14px;
    font-size:12px;
    color:$font-color-9;
    line-height:14px;
    font-weight: 400;
    padding-top: 10px;
    padding-bottom: 12px;
    strong {
      color: $font-color-6;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .btn-sure-width {
    width: 112px;
    border-radius: 4px;
    margin-left: 16px;
    height: 32px;
    font-size: 14px;
  }
  .btn-cancle-width{
    width: 86px;
    border-radius: 4px;
    height: 32px;
    font-size: 14px;
  }
  .el-dialog__footer{
    padding: 0;
  }
  .footer {
    padding: 30px 40px;
    text-align: right
  }
  .color2 {
    color: $font-color-3;
  }
  .color4 {
    color: $font-color-6;
  }
  .center {
    text-align: center;
  }
  .img-box3 {
    width: 134px;
    display: block;
    margin: 20px auto 32px auto;
  }
  .waiting{
    font-size:16px;
    font-weight:500;
    color:$font-color-3;
    line-height:16px;
    text-align: center;
  }
  .waiting2 {
    font-size:14px;
    color:$border-color-7;
    line-height:20px;
    text-align: center;
    padding-top: 6px;
    padding-bottom: 30px;
  }
  .waiting3 {
    font-size:28px;
    font-weight:500;
    color:$main-color-1;
    line-height:28px;
    padding-bottom: 42px;
  }
  .waiting4 {
    font-size:14px;
    font-weight:400;
    color:$font-color-5;
    line-height:14px;
    padding-bottom: 30px;
    padding-top: 10px;
    strong {
      color:$main-color-1;
      position: relative;
      &:hover{
        .notice-diggle2 {
          display: block;
          opacity: 1;
        }
      };
    }
  }
  .waiting5 {
    font-size:18px;
    font-weight:500;
    color:$font-color-3;
    line-height:18px;
    padding-top: 28px;
  }
  .waiting6 {
    font-size:28px;
    font-weight:500;
    color:$font-color-9;
    line-height:28px;
    padding-bottom: 32px;
    padding-top: 30px;
  }
  .waiting7 {
    font-size:14px;
    color:$font-color-5;
    line-height:14px;
    padding-top: 10px;
    padding-bottom: 32px;
  }
  .position-name{
    cursor: pointer;
    display: inline-block
  }
  .el-dialog__headerbtn{
    top: 16px;
    right: 16px;
  }
  .notice-diggle2{
    position: absolute;
    top: 25px;
    right: -15px;
    width:260px;
    background: #fff;
    border-radius: 8px;
    height:276px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 1;
    opacity: 0;
    display: none;
    transition: all ease .2s;
    .headbar{
      width: 260px;
      height: 81px;
      background: #00C4CD;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .qrcode{
      width:104px;
      height:104px;
      margin: 23px auto 7px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .clock{
      position: absolute;
      width: 59px;
      height: 64px;
      top: 45px;
      left: 98px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .rocket{
      position: absolute;
      width: 39px;
      height: 28px;
      top: 200px;
      right: 55px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      line-height: 18px;
      font-size: 12px;
      color: #333333;
    }
    .forward{
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 20px solid #00C4CD;
      position: absolute;
      top: -7px;
      right: 15px;
    }
  }
}
</style>
