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
        <!-- 我邀请的等待状态、对方不考虑显示个人信息 -->
        <div class="item" v-if="![12, 55].includes(jobhunterInfo.status)">
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
        <!-- 区分电话聊 还是见面聊 -->
        <template v-if="jobhunterInfo.sourceType === 1">
          <div class="item">
            <div class="icon">
              <i class="iconfont icon-mianshiguanli"></i>
            </div>
            <div class="text">见面聊</div>
          </div>
          <!-- 我邀请的等待状态、对方不考虑状态除外显示个人信息 -->
          <div class="item" v-if="jobhunterInfo.address && ![12, 52, 53, 55].includes(jobhunterInfo.status)">
            <div class="icon">
              <i class="iconfont icon-didian"></i>
            </div>
            <div class="text">{{jobhunterInfo.address}}{{jobhunterInfo.doorplate}}</div>
          </div>
        </template>
        <template v-if="jobhunterInfo.sourceType === 2">
          <div class="item">
            <div class="icon">
              <i class="iconfont icon-dianhua"></i>
            </div>
            <div class="text">电话聊</div>
          </div>
        </template>
        <!-- 面试时间 -->
        <div class="item" v-show="[51, 57, 58,59, 60, 61].includes(jobhunterInfo.status)">
          <div class="icon">
            <i class="iconfont icon-shijian"></i>
          </div>
          <div class="text">{{jobhunterInfo.arrangementInfo.appointment}}</div>
        </div>
        <!-- 我发起的在等待 | c端拒绝了 -->
        <div v-if="jobhunterInfo.status === 12 || jobhunterInfo.status === 55">
          <p class="wait-reject-tips">{{jobhunterInfo.status === 12 ? '邀请已发出，等待对方处理' : '对方已拒绝您的约面邀请'}}</p>
          <div class="arrangeinfo-img">
            <img src="@/assets/images/timeinfo.png" />
          </div>
        </div>
        <div v-show="jobhunterInfo.status === 41">
          <div class="detail">
            <div class="detailtitle">面试时间已确认</div>
            <div class="desc">时间已添加到面试日程，准备迎接候选人吧～</div>
            <div class="time">{{jobhunterInfo.arrangementInfo.appointment}}</div>
          </div>
        </div>

        <div class="detail" v-show="jobhunterInfo.status >= 51 && jobhunterInfo.status !== 55">
          <div class="end-time">面试结果</div>
          <!-- b->c拒绝 -->
          <div class="recruiter-reject" v-if="jobhunterInfo.status === 52 || jobhunterInfo.status === 53 ">
            <template v-if="jobhunterInfo.interviewNotSuitComment">
              <div class="">
                <template v-for="value in jobhunterInfo.interviewNotSuitComment.reason">
                  <span class="b-tag" :key="value">{{value}}</span>
                </template>
              </div>
              <template v-if="jobhunterInfo.interviewNotSuitComment.extraDesc">
                <p>补充说明</p>
                <div class="reject-desc"> {{jobhunterInfo.interviewNotSuitComment.extraDesc || '未填写'}}</div>
              </template>
            </template>
          </div>
          <!-- 到场 -->
          <div class="stepevaluate clearfix" v-show="jobhunterInfo.status === 51">
            <div class="titlel">
              <div class="dian"></div>
              <div class="tex">{{dialogText[viewOrPhone]['s51'][0]}}</div>
            </div>
            <div class="stepall">
              <div class="step" @click="hascallback('no')">
                <div class="icon"><img src="@/assets/images/ku.png" /></div>
                <div class="text">{{dialogText[viewOrPhone]['s51'][1]}}</div>
              </div>
              <div class="step" @click="hascallback('yes')">
                <div class="icon"><img src="@/assets/images/xiao.png" /></div>
                <div class="text">{{dialogText[viewOrPhone]['s51'][2]}}</div>
              </div>
            </div>
          </div>
          <!-- 评价 -->
          <div class="stepevaluate clearfix" v-show="[57, 58].includes(jobhunterInfo.status)">
            <div class="titlel">
              <div class="dian"></div>
              <div class="tex">{{dialogText[viewOrPhone]['s57_58'][0]}}</div>
            </div>
            <div class="stepall">
              <div class="step" @click="selereson()">
                <div class="icon"><img src="@/assets/images/ku.png" /></div>
                <div class="text">{{dialogText[viewOrPhone]['s57_58'][1]}}</div>
              </div>
              <div class="step" @click="haslike()">
                <div class="icon"><img src="@/assets/images/xiao.png" /></div>
                <div class="text">{{dialogText[viewOrPhone]['s57_58'][2]}}</div>
              </div>
            </div>
          </div>
          <!-- 结果 -->
          <div class="end-status" v-show="[59, 60, 61].includes(jobhunterInfo.status)">
            <div class="status-icon">
              <img v-show="jobhunterInfo.status === 60" src="@/assets/images/xiao.png" />
              <img v-show="jobhunterInfo.status === 61" src="@/assets/images/ku.png" />
              <img v-show="jobhunterInfo.status === 59" src="@/assets/images/ku.png" />
            </div>
            <div class="status-text" v-show="jobhunterInfo.status === 60">
              <p class="p1">{{dialogText[viewOrPhone]['s60'][0]}}</p>
              <p class="p2">{{dialogText[viewOrPhone]['s60'][1]}}</p>
            </div>
            <template v-if="jobhunterInfo.status === 61">
              <div class="status-text2" >
                <p class="p1">{{dialogText[viewOrPhone]['s61'][0]}}</p>
              </div>
              <!-- 不合适原因 -->
              <div class="clearfix status-reason" v-if="jobhunterInfo.interviewNotSuitComment">
                <p>不合适原因：</p>
                <div class="status-reason-tag">
                  <template v-for="reason in jobhunterInfo.interviewNotSuitComment.reason">
                    <span :key="reason">{{reason}}</span>
                  </template>
                </div>
                <p class="status-reason-desc" v-if="!jobhunterInfo.interviewNotSuitComment.extraDesc">{{jobhunterInfo.interviewNotSuitComment.extraDesc}}</p>
              </div>
            </template>
            <div class="status-text" v-show="jobhunterInfo.status === 59">
              <p class="p1">{{dialogText[viewOrPhone]['s59'][0]}}</p>
              <p class="p1">{{dialogText[viewOrPhone]['s59'][1]}}</p>
            </div>
          </div>
          <p class="p-tips">* 面试时间结束后48小时内未标记，平台将默认候选人已到场面试</p>
        </div>
      </div>
    </el-dialog>
    <!-- 选择不合适原因 -->
    <select-reson
      :reasonlist="reasonlist"
      :interviewId="interviewId"
      :jobuid="jobuid"
      :visible.sync="resondiggle"
      @finish="handleClose('isFinish')"></select-reson>
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
      detailtitle: '面试信息',
      dialogText: {
        view: {
          s51: [
            '候选人到场了吗？~', // 51
            '候选人没来', // 51
            '已到场面试' // 51
          ],
          s57_58: [
            '到场面试后感觉如何？评价一下吧~',
            '不合适',
            '感觉不错'
          ],
          s59: ['候选人没来', '挥别错的才能和对的相逢～'],
          s60: ['已到场面试，感觉不错', '请联系候选人确认后续环节'],
          s61: ['已到场面试，但不合适']
        },
        phone: {
          s51: [
            '与侯选人联系上了吗？~', // 51
            '没联系', // 51
            '已电话联系' // 51
          ],
          s57_58: [
            '电话联系后感觉如何？评价一下吧~',
            '不合适',
            '感觉不错'
          ],
          s59: ['没联系上候选人', '挥别错的才能和对的相逢～'],
          s60: ['已联系电话，感觉不错', '请继续联系候选人确认后续环节'],
          s61: ['已联系电话，但不合适']
        }
      }
    }
  },
  computed: {
    // 见面聊1 电话聊 2
    viewOrPhone () {
      if (!this.jobhunterInfo.sourceType) return 'view'
      return this.jobhunterInfo.sourceType === 1 ? 'view' : 'phone'
    }
  },
  methods: {
    getdetail () {
      let data = { interviewId: this.interviewId }
      watchInvitationAPi(data).then((res) => {
        this.dialogStatus = true
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
    handleClose (type) {
      // 选择原因成功也需要刷新页面
      if (type === 'isFinish') {
        this.$emit('finish')
      }
      this.dialogStatus = false
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.p-tips {
  color: $font-color-10;
  font-size: 12px;
  margin-top: 24px;
  margin-bottom: 30px;
}
.recruiter-reject {
  text-align: left;
  line-height: normal;
  margin: 20px 0;
  .b-tag {
    padding: 6px 25px;
    background: $bg-color-1;
    color: $title-color-2;
    font-size: 14px;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 12px;
    margin-right: 13px;
  }
  p {
    color: $title-color-2;
    margin: 10px 0 ;
  }
  .reject-desc {
    color: $title-color-1;
  }
}
.wait-reject-tips {
  margin-top: 30px;
  text-align: center;
  font-weight: bold;
  color: $title-color-1;
  font-size: 18px;
}
.arrangeinfo-img{
  width:128px;
  height:120px;
  margin: 18px auto 30px;
  img{
    max-width: 100%;
    max-height: 100%;
  }
}

.arrangeinfo{
  padding: 0 40px 20px;
  margin-top: 4px;
  .item{
    line-height: 20px;
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
      margin: 4px 7px;
      background: #E8E9EB;
    }
    .phone{
      float: left;
      // color:#00C4CD;
    }
  }
  .detail{
    width: 100%;
    margin: 36px 0 32px;
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
  }
}
.end-status{
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  background: $bg-color-1;
  border-radius: 8px;
  margin-bottom: 10px;
  min-height: 82px;
  padding: 20px 24px 10px;
  .status-icon{
    width: 42px;
    height: 42px;
    float: left;
    margin: 0px 16px 0px 0px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .status-text{
    float: left;
    margin-top: 3px;
    text-align: left;
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
    margin-top: 13px;
    float: left;
    .p1{
      color:#333333;
      font-weight: bold;
      font-size:16px;
    }
  }
}
.status-reason {
  text-align: left;
  margin-top: 60px;
  .status-reason-tag {
    margin-top: 4px;
    span {
      border-radius: 4px;
      border: 1px solid $border-color-1;
      padding: 6px 27px;
      display: inline-block;
      vertical-align: middle;
      background: $border-color-8;
      margin-right: 14px;
      margin-top: 8px;
      color: $title-color-1;
    }
  }
  .status-reason-desc {
    margin-top: 12px;
    color: $title-color-2;
    line-height:14px;
  }
}
</style>
