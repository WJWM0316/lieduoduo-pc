<template>
  <el-dialog
    title="面试信息"
    :visible.sync="visiable"
    width="430px"
    custom-class="interview-model"
    @close="handleClose">
    <template v-if="[31].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color2 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color3">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <router-link
              class="color2 position-name"
              target="_blank" :to="{name: 'positionDetail', query: { positionId: infos.positionId }}">
              {{infos.positionName}}
            </router-link>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color2 address">{{infos.address}}{{infos.doorplate}}</div>
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
              <span class="date">{{item.appointment}}</span>
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
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
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
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
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
          <i class="iconfont icon-didian"></i>
          <div class="ul-li-text-box">
            <div class="color1 address">{{infos.address}}{{infos.doorplate}}</div>
          </div>
        </li>
        <li class="item-li center">
          <div class="waiting5">面试时间已确认</div>
          <div class="waiting4">已添加到面试日程，请准时赴约哦~<strong> 通知我</strong></div>
          <div class="waiting3">{{infos.arrangementInfo.appointment}}</div>
        </li>
      </ul>
    </template>
    <template v-if="[51, 58, 60].includes(infos.status) && infos.arrangementInfo">
      <ul class="ul-box">
        <li class="item-li">
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
          <i class="iconfont icon-zhiwei1"></i>
          <div class="ul-li-text-box">
            <div class="color1 position-name">{{infos.positionName}}</div>
          </div>
        </li>
        <li class="item-li">
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
          <i class="iconfont icon-rencai"></i>
          <div class="ul-li-text-box">
            <div class="color1 user-name">{{infos.arrangementInfo.realname}}</div>
            <div class="user-contact color2">{{infos.arrangementInfo.mobile}}</div>
          </div>
        </li>
        <li class="item-li">
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
      handler(show) {
        if (show) {
          this.getInterviewDetail().then(res => {
            let { appointmentList } = res.arrangementInfo
            this.visiable = true
            if (res.arrangementInfo.appointmentList) {
              appointmentList.push({
                checked: false,
                id: 'inappropriate',
                appointment: '以上时间都不合适，请联系我'
              })
            }
            this.infos = res
          })
        } else {
          this.visiable = false
        }
      }
    },
    visiable: {
      handler(visiable) {
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
      params: {}
    }
  },
  model: {
    prop: 'show',
    event: 'input'
  },
  methods: {
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
  .item-li {
    font-size:14px;
    font-weight:400;
    line-height:14px;
    padding: 10px 40px;
  }
  .iconfont {
    font-size: 14px;
    color: $iconFont-gray;
    display: inline-block;
    vertical-align: middle;
  }
  .ul-li-text-box{
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
    max-width: calc(100% - 32px);
  }
  .user-name {
    display: inline-block;
    font-size:14px;
    padding-right: 7px;
    border-right: 1px solid $border-color-1;
    margin-right: 7px;
  }
  .user-contact {
    display: inline-block;
  }
  .color3 {
    color: $border-color-2;
  }
  .color1 {
    color: $font-color-3;
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
  }
  .el-dialog__body{
    padding: 0;
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
      color: $border-color-2;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .btn-sure-width {
    width: 112px;
    border-radius: 4px;
    margin-left: 16px;
  }
  .btn-cancle-width{
    width: 86px;
    border-radius: 4px;
  }
  .el-dialog__footer{
    padding: 0;
  }
  .footer {
    padding: 30px 40px;
  }
  .color2 {
    color: $font-color-3;
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
}
</style>
