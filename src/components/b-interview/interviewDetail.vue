<template>
  <!-- 面试安排弹窗 -->
  <div class="interview">
    <el-dialog
      width="432px"
      custom-class="app-dialog"
      append-to-body
      @close="handleClose"
      :visible.sync="dialogStatus">
      <div slot="title">{{detailtitle}}</div>
          <!-- 面试信息 -->
        <div class="arrangeinfo" v-if="jobhunterInfo.arrangementInfo">
          <div class="item">
            <div class="icon">
              <i class="iconfont icon-mianshiguan"></i>
            </div>
            <div class="text">{{jobhunterInfo.arrangementInfo.realname}}</div>
            <div class="f-line"></div>
            <div class="phone" v-if="jobhunterInfo.arrangementInfo.mobile">{{jobhunterInfo.arrangementInfo.mobile}}</div>
          </div>
          <div class="item" v-if="jobhunterInfo.positionName">
            <div class="icon">
              <i class="iconfont icon-zhiwei1"></i>
            </div>
            <div class="text">{{jobhunterInfo.positionName}}</div>
          </div>
          <div class="item" v-if="jobhunterInfo.address">
            <div class="icon">
              <i class="iconfont icon-didian"></i>
            </div>
            <div class="text">{{jobhunterInfo.address}}{{jobhunterInfo.doorplate}}</div>
          </div>
            <div class="item" v-show="jobhunterInfo.status >= 51">
              <div class="icon">
                <i class="iconfont icon-shijian"></i>
              </div>
              <div class="text">{{jobhunterInfo.arrangementInfo.appointment}}</div>
            </div>

          <div v-if="jobhunterInfo.status === 12">
          <div class="arrangeinfo-img">
            <img src="@/assets/images/timeinfo.png" />
          </div>
          <p class="wait">等待候选人接受邀请</p>
          <p class="wait_time">候选人将收到你的面试邀请，请耐心等待</p>
          </div>
          <div v-show="jobhunterInfo.status === 41">
            <div class="detail">
              <div class="detailtitle">面试时间已确认</div>
              <div class="desc">时间已添加到面试日程，准备迎接候选人吧～</div>
              <div class="time">{{jobhunterInfo.arrangementInfo.appointment}}</div>
            </div>
          </div>

            <div class="detail" v-show="jobhunterInfo.status >= 51">
              <div class="end-time">面试结果</div>
               <!-- 到场 -->
               <div class="stepevaluate clearfix" v-show="jobhunterInfo.status === 51">
                <div class="titlel">
                  <div class="dian"></div>
                  <div class="tex">候选人到场了吗？~</div>
                </div>
                 <div class="stepall">
                <div class="step" @click="hascallback('no')">
                  <div class="icon"><img src="@/assets/images/ku.png" /></div>
                  <div class="text">候选人没来</div>
                </div>
                <div class="step" @click="hascallback('yes')">
                  <div class="icon"><img src="@/assets/images/xiao.png" /></div>
                  <div class="text">已到场面试</div>
                </div>
                </div>
              </div>
              <!-- 评价 -->
              <div class="stepevaluate clearfix" v-show="[57, 58].includes(jobhunterInfo.status)">
                <div class="titlel">
                  <div class="dian"></div>
                  <div class="tex">到场面试后感觉如何？评价一下吧~</div>
                </div>
                <div class="stepall">
                <div class="step" @click="selereson()">
                  <div class="icon"><img src="@/assets/images/ku.png" /></div>
                  <div class="text">不合适</div>
                </div>
                <div class="step" @click="haslike()">
                  <div class="icon"><img src="@/assets/images/xiao.png" /></div>
                  <div class="text">感觉不错</div>
                </div>
                </div>
              </div>
              <div class="end-status" v-show="[59, 60, 61].includes(jobhunterInfo.status)">
                <div class="status-icon">
                  <img v-show="jobhunterInfo.status === 60" src="@/assets/images/xiao.png" />
                  <img v-show="jobhunterInfo.status === 61" src="@/assets/images/ku.png" />
                  <img v-show="jobhunterInfo.status === 59" src="@/assets/images/ku.png" />
                </div>
                <div class="status-text" v-show="jobhunterInfo.status === 60">
                  <p class="p1">已到场面试，感觉不错</p>
                  <p class="p2">请联系候选人确认后续环节</p>
                </div>
                <div class="status-text2" v-show="jobhunterInfo.status === 61">
                  <p class="p1">已到场面试，但不合适</p>
                </div>
                <div class="status-text2" v-show="jobhunterInfo.status === 59">
                  <p class="p1">候选人没来</p>
                </div>
              </div>
              </div>
        </div>
          <div slot="footer">
      </div>
    </el-dialog>
    <!-- 选择不合适原因 -->
    <select-reson :reasonlist="reasonlist" :interviewId="interviewId" :jobuid="jobuid" :visible.sync="resondiggle" @change="handleClose"></select-reson>
  </div>
</template>
<script>
import selectReson from 'COMPONENTS/b-interview/selectReson'
import {
  watchInvitationAPi, setAttendApi, setCommentApi, getCommentReasonApi } from 'API/candidateType'
export default {
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
        this.getdetail()
      } else {
        this.dialogStatus = false
      }
    }
  },
  components: { selectReson },
  props: {
    // 面试id
    interviewId: {
      type: [String, Number],
      required: true
    },
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      dialogStatus: false,
      resondiggle: false,
      jobuid: '',
      reasonlist: [],
      jobhunterInfo: {},
      detailtitle: '面试信息'
    }
  },
  methods: {
    getdetail () {
      let data = { interviewId: this.interviewId }
      watchInvitationAPi(data).then((res) => {
        this.jobhunterInfo = res.data.data
      })
    },
    // 设置是否到场
    hascallback (type) {
      if (type === 'no') {
        let data1 = { interviewId: this.jobhunterInfo.interviewId, isAttend: 0 }
        setAttendApi(data1).then((res) => {
          this.getdetail()
        })
      }
      if (type === 'yes') {
        let data2 = { interviewId: this.jobhunterInfo.interviewId, isAttend: 1 }
        setAttendApi(data2).then((res) => {
          this.getdetail()
        })
      }
    },
    // 点击感觉不错
    haslike () {
      setCommentApi({ interviewId: this.jobhunterInfo.interviewId }).then((res) => {
        this.getdetail()
      })
    },
    selereson () {
      this.jobuid = this.jobhunterInfo.jobhunterInfo.uid
      getCommentReasonApi().then((res) => {
        let arr = res.data.data
        arr.map((v, k) => {
          v.cur = false
        })
        this.reasonlist = arr
        this.resondiggle = true
      })
    },
    handleClose () {
      this.dialogStatus = false
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
      .arrangeinfo{
        padding: 0 40px;
        margin-top: 4px;
        .item{
          line-height: 22px;
          color:#333333;
          font-size:14px;
          display: flex;
          margin-bottom: 20px;
          .icon{
            width: 14px;
            height: 14px;
            float: left;
            i{
              color: #BCBEC0;
              font-size: 14px;
            }
          }
          .text{
            float: left;
            padding-left: 18px;
          }
          .f-line{
            float: left;
            width:2px;
            height:12px;
            margin: 5px 7px;
            background: #E8E9EB;
          }
          .phone{
            float: left;
            // color:#00C4CD;
          }
        }
        .detail{
          width: 100%;
          margin-top: 36px;
          text-align: center;
          .detailtitle{
            font-size:18px;
            font-weight:bold;
            color:#333333;
          }
          .desc{
            font-weight:400;
            color:#66666E;
            font-size: 14px;
            margin-top: 5px;
          }
          .time{
            font-weight:500;
            font-size:28px;
            margin-top: 24px;
            color:#03B3BB;
          }
          .end-time{
            width: 100%;
            height:16px;
            font-weight: bold;
            text-align: left;
            font-size: 16px;
            color:rgba(53,64,72,1);
          }
          .stepevaluate{
            width: 100%;
            margin-top: 24px;
            .titlel{
              width: 100%;
              height: 22px;
              .dian{
                width:4px;
                height:4px;
                background:#66666E;
                float:left;
                border-radius: 50%;
                margin-top: 5px;
                margin-right: 5px;
              }
              .tex{
                color:#66666E;
                font-size: 14px;
                float: left;
                font-weight: normal;
              }
            }
            .stepall{
              width: 100%;
              height:42px;
              .step{
                width:160px;
                height:42px;
                float: left;
                cursor: pointer;
                background: #F8FAFA;
                border-radius:21px;
                margin-right: 16px;
                margin-top: 16px;
                margin-bottom: 10px;
                .icon{
                  width:42px;
                  height:42px;
                  float: left;
                  img{
                    width: 100%;
                    height:100%;
                  }
                }
                .text{
                  width: 70px;
                  height: 14px;
                  margin-left: 56px;
                  margin-top: 13px;
                  font-size: 14px;
                  color: #66666E;;
                }
                &:hover{
                  background: #F0F3F5;
                }
              }
            }
          }
          .end-status{
            width:352px;
            height:88px;
            margin-top: 16px;
            background:#F8FAFA;
            border-radius:8px;
            margin-bottom: 10px;
            .status-icon{
              width: 64px;
              height: 64px;
              float: left;
              margin: 12px 16px 12px 51px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .status-text{
              float: left;
              margin-top: 26px;
              .p1{
                color:#333333;
                font-weight: bold;
                font-size:16px;
              }
              .p2{
                font-weight:300;
                font-size:14px;
                margin-top: 6px;
                color:#92929B;
              }
            }
            .status-text2{
              margin-top: 34px;
              float: left;
              .p1{
                color:#333333;
                font-weight: bold;
                font-size:16px;
              }
            }
          }
        }
        .arrangeinfo-img{
          width:128px;
          height:120px;
          margin: 0 auto;
          margin-top: 36px;
          margin-bottom: 24px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .wait{
          color:rgba(53,64,72,1);
          font-weight: bold;
          font-size:16px;
          margin-bottom: 4px;
          text-align: center;

        }
        .wait_time{
          font-size:14px;
          color:#66666E;
          text-align: center;
          margin-bottom: 30px;
        }
      }
</style>
