<template>
  <div>
  <!-- 简历查看 -->
    <el-dialog
      top="60px"
      width="940px"
      :show-close="false"
      :lock-scroll="true"
      class="b-resume-dialog__wrapper"
      custom-class="app-dialog b-resume-dialog"
      @close="hanldeClose"
      append-to-body
      :visible.sync="dialogStatus">
      <div slot="title" class="Numbering">
        <span>简历编号：{{nowResumeMsg.vkey}}</span>
        <span v-if="nowResumeMsg.resumeUpdateTime !== '0000-00-00 00:00:00'">{{nowResumeMsg.resumeUpdateTime}}更新</span>
        <div class="resume-close" @click="hanldeClose">
          <i class="iconfont icon-guanbianniu"></i>
        </div>
      </div>
      <div class="resumeBox" v-loading="getResumeLoading" @click="closeload($event)">
        <!-- <div class="printing"><span>简历打印</span></div> -->
        <div class="resumeLyout">
          <div class="ResumeDetails">
            <!-- 基础信息 -->
            <div class="base">
              <div class="message">
                <div class="msgUrl">
                  <img class="magimg" :src="nowResumeMsg.avatar.url" alt v-if="nowResumeMsg.avatar" />
                  <span class="gender" v-show="nowResumeMsg.gender===2">
                    <img class="genderimg1" v-show="nowResumeMsg.gender===2" src="~IMAGES/girl.png" />
                  </span>
                  <span class="gender2" v-show="nowResumeMsg.gender===1">
                      <img class="genderimg2" src="~IMAGES/boy.png" v-show="nowResumeMsg.gender===1">
                  </span>
                </div>
                <div class="msgUserInfo">
                  <div :class="['basemsg', nowResumeMsg.signature ? '' : 'basecenter']">
                    <span class="realNameglass" v-if="nowResumeMsg.glass"><img src="@/assets/images/glass.png" alt=""/></span>
                    <span class="realName" v-else>{{nowResumeMsg.name}}</span>
                    <span class="realName">{{nowResumeMsg.name}}</span>
                    <div class="lebalList">
                      <div class="lebalItem">
                        <i class="icon iconfont icon-zhiwei" style></i>
                        <span>{{nowResumeMsg.workAgeDesc}}</span>
                      </div>
                      <div class="lebalItem">
                        <i class="icon iconfont icon-nianling"></i>
                        <span>{{nowResumeMsg.age}}岁</span>
                      </div>
                      <div
                        v-if="nowResumeMsg.degreeDesc"
                        class="lebalItem"
                        :style="nowResumeMsg.jobStatus===''?'margin-right:0px;':''"
                      >
                        <i class="icon iconfont icon-jiaoyu"></i>
                        <span>{{nowResumeMsg.degreeDesc}}</span>
                      </div>
                      <div class="lebalItem">
                        <span
                          class="status"
                          v-if="nowResumeMsg.jobStatus"
                        >{{nowResumeMsg.jobStatusDesc}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="description">
                    <span class="msg">{{nowResumeMsg.signature}}</span>
                    <div class="iconList">
                      <span
                        class="iconItem"
                        v-for="(item,index) in nowResumeMsg.personalizedLabels"
                        :key="item.labelName"
                        :style="index===nowResumeMsg.personalizedLabels.length-1?'margin-bottom:0px;':''"
                      >{{item.labelName}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 求职意向 -->
            <div class="intention" v-show="nowResumeMsg.expects!=''">
              <p class="title">求职意向</p>
              <div class="intentList">
                <div
                  class="intentionItem"
                  v-for="(item,index) in nowResumeMsg.expects"
                  :key="item.position"
                  :style="index===nowResumeMsg.expects.length-1?'padding-bottom:0px;':''"
                >
                <div class="whitesize">
                  <span class="position">{{item.position}}&nbsp;|&nbsp;{{item.city}}</span>
                  <span v-if="item.fields.length>0" style="margin-right:9px;color: #66666E;">|</span>
                  <span v-for="(item1,index1) in item.fields" :key="index1">{{item1.field}}&nbsp;&nbsp;</span>
                  </div>
                  <span class="price">{{item.salaryFloor}}k-{{item.salaryCeil}}k</span>
                </div>
              </div>
            </div>
            <!-- 工作经历 -->
            <div class="workExperience" v-show="nowResumeMsg.careers!=''">
              <p class="title">工作经历</p>
              <div class="workList">
                <div
                  class="workItem"
                  v-for="(item,index) in nowResumeMsg.careers"
                  :key="item.id"
                  :style="index===nowResumeMsg.careers.length-1?'margin-bottom:0px;':''"
                >
                  <div class="workTime">
                    <div class="work-content">
                    <span>{{item.company}} | {{item.position}}</span>
                    </div>
                    <span class="size">{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                  </div>
                  <div class="workContent">
                    <span class="duties">
                      <pre>{{item.duty}}</pre>
                    </span>
                  </div>
                  <div class="workIconList" v-show="item.technicalLabels.length>0">
                    <span
                      v-for="item1 in item.technicalLabels"
                      :key="item1.technicalLabels"
                    >#{{item1.labelName}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 项目经历 -->
            <div class="workExperience" v-show="nowResumeMsg.projects!=''">
              <p class="title">项目经历</p>
              <div class="workList">
                <div
                  class="workItem"
                  v-for="(item,index) in nowResumeMsg.projects"
                  :key="item.role"
                  :style="index===nowResumeMsg.projects.length-1?'margin-bottom:0px;':''"
                >
                  <div class="workTime">
                    <span>{{item.name}} &nbsp;| &nbsp;{{item.role}}</span>
                    <span class="size">{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                  </div>
                  <div class="workContent">
                    <span class="duties">
                      <pre>{{item.description}}</pre>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 教育经历 -->
            <div class="workExperience" v-show="nowResumeMsg.educations!=''">
              <p class="title">教育经历</p>
              <div class="workList">
                <div
                  class="workItem"
                  v-for="(item,index) in nowResumeMsg.educations"
                  :key="item.school"
                  :style="index===nowResumeMsg.educations.length-1?'margin-bottom:0px;':''"
                >
                  <div class="workTime">
                    <span>{{item.school}} | {{item.degreeDesc}} | {{item.major}}</span>
                    <span class="size">{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                  </div>
                  <div class="workContent" v-show="item.experience!=''">
                    <span class="duties">
                      <pre>{{item.experience}}</pre>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 更多介绍 -->
            <div class="workExperience" v-if="nowResumeMsg.moreIntroduce && (nowResumeMsg.moreIntroduce.introduce || nowResumeMsg.moreIntroduce.imgs.length > 0)">
              <p class="title">更多介绍</p>
              <div class="workList">
                <pre v-if="nowResumeMsg.moreIntroduce.introduce">{{nowResumeMsg.moreIntroduce.introduce}}</pre>
                <div class="imgList" v-if="nowResumeMsg.moreIntroduce.imgs.length > 0">
                  <div style="position:relative" :key="index" v-for="(item, index) in nowResumeMsg.moreIntroduce.imgs">
                  <img
                    :src="item.url"
                    alt
                  />
                  <a :href="item.url" target="_blank"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Code">
            <div class="handlerpring">
              <div class="onload" @click="hasonload = !hasonload"  v-if="nowResumeMsg.glass === 0">
                <i class="iconfont icon-xiazai"></i>
              </div>
              <div class="onloadselect"  v-loading="loadingshow" v-show="hasonload" ref="queryBox">
                <div class="title">下载简历</div>
                <div class="select">请选择下载格式:</div>
                <div class="pdf">
                  <div class="p_l">
                    <i class="iconfont icon-pdf" style="color: #FA3939"></i>
                  </div>
                  <div class="p_c">PDF文件</div>
                  <div class="p_r">
                    <a @click="onloadfile('pdf')"><i class="iconfont icon-xiazai selected"></i></a>
                  </div>
                </div>
                <div class="pdf">
                  <div class="p_l">
                    <i class="iconfont icon-word" style="color: rgb(74, 144, 226)"></i>
                  </div>
                  <div class="p_c">Word文档</div>
                  <div class="p_r">
                    <a @click="onloadfile('doc')"><i class="iconfont icon-xiazai selected"></i></a>
                  </div>
                </div>
              </div>
              <!-- <div class="dayin">
                <i class="iconfont icon-dayin-"></i>
              </div> -->
              <div class="share" @click="sharediggle()">
                <i class="iconfont icon-fenxiang"></i>
              </div>
            </div>
            <div class="btnstatus">
              <!-- btn1、btn2 是约聊的按钮逻辑 -->
              <template v-if="buttons.btn1 && buttons.btn1.buttonText">
                <el-button @click="handleSetChat(buttons.btn1)" :type="buttons.btn1.buttonType">{{buttons.btn1.buttonText}}</el-button>
              </template>
              <template v-if="buttons.btn2 && buttons.btn2.buttonText">
                <el-button @click="handleSetChat(buttons.btn2)" :type="buttons.btn2.buttonType">{{buttons.btn2.buttonText}}</el-button>
              </template>
              <!-- btn3 是约面的按钮逻辑-->
              <template v-if="buttons.btn3 && buttons.btn3.buttonText">
                <el-button  @click="handleSetResume(buttons.btn3)" :type="buttons.btn3.buttonType">{{buttons.btn3.buttonText}}</el-button>
              </template>
            </div>
            <template v-if="nowResumeMsg.glass === 0">
              <div class="like_user" @click.stop="ownerOp(true, nowResumeMsg.uid)" v-if="nowResumeMsg.interested">
                <i class="iconfont icon-yishoucang img"></i> 取消感兴趣
              </div>
              <div class="like_user" @click.stop="ownerOp(false, nowResumeMsg.uid)" v-else >
                <i class="iconfont icon-shoucang img"></i> 对Ta感兴趣
              </div>
            </template>
            <div class="msgCode" v-if="shareResumeImg">
              <img :src="shareResumeImg" />
              <span>扫码分享</span>
            </div>
            <div class="seefujian" v-if="nowResumeMsg.glass === 0 && nowResumeMsg.resumeAttach">
              <div class="title">附件简历:</div>
              <div class="seebtn" v-if="nowResumeMsg.resumeAttach.extension === 'doc'"><a :href="'https://view.officeapps.live.com/op/view.aspx?src=' + nowResumeMsg.resumeAttach.url" :download="nowResumeMsg.resumeAttach.fileName" target="_blank">查看附件</a></div>
              <div class="seebtn" v-else><a :href="nowResumeMsg.resumeAttach.url" :download="nowResumeMsg.resumeAttach.fileName" target="_blank">查看附件</a></div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 转发简历弹窗 -->
    <dynamic-record
      :visible.sync="dynamicDialogStatus"
      :info.sync="nowResumeMsg"
      :imagesurl.sync="shareResumeImg" />
    <!-- 选择职位 -->
    <select-position
      :visible.sync="selectPositionDialogStatus"
      :jobuid="jobuid"
      @finish="handleSelectedPosition"
    />
    <!-- 支付 -->
    <!-- 约聊|约面提示支付多多币 -->
    <pay-coin
      @finish="handleToRefresh"
      :visible.sync="payCoinDialogStatus"
      :jobuid="jobuid"
      :type="selectedInterviewType"
      :position-id="positionId"/>
    <!-- 查看约聊不合适原因 -->
    <chat-reson :list="resonList.reason" :explain="resonList.extraDesc" :visible.sync="chatResonDialog" />
    <!-- 约面申请 -->
    <apply-interview :visible.sync="applyInterviewDialog" :position="current"  @finish="handleSetResume"/>
    <!-- 下载app引导弹窗 -->
    <download-app :visible.sync="downloadAppDialog" />
  </div>
</template>
<script>
import DynamicRecord from './dynamicRecord'
import SelectPosition from './candidatePosition'
import ChatReson from './chatResonList'
import PayCoin from './pay'
import applyInterview from './applyInterview'
import DownloadApp from '@/components/common/sharePopup/chatDownloadApp'
import { deleteNotInterest } from 'API/candidate'
import { shareResumeApi } from 'API/forward'
import { getResumeIdApi } from 'API/userJobhunter'
import { createonlinepdf, createonlineword } from 'API/common'
import { putCollectUserApi, cancelCollectUserApi } from 'API/collect'
// 约聊操作按钮种类
const ChatTypeBtns = [
  { buttonText: '一键约聊', type: 'recruiter-chat', buttonType: 'primary', is: (val) => [705, 715, 716].includes(val) }, // b->c c拒绝
  { buttonText: '继续聊', type: 'keep-chat', buttonType: 'primary', is: (val) => [101, 301, 501].includes(val) }, // b->c,c->b 未处理， b|c同意
  { buttonText: '继续沟通', type: 'keep-chat', buttonType: 'primary', is: (val) => val === 701 }, // c->b b未同意
  { buttonText: '一键约聊', type: 'recruiter-chat', buttonType: 'primary', is: (val) => [305, 315, 316].includes(val), hasReason: true } // b主动拒绝
]
// 顾问帮约(约面)按钮种类 （）
const MeetTypeBtns = [
  { buttonText: '_', _text: '同意|拒绝', type: 'apply-interview', buttonType: '_', is: (val) => val === 11 }, // c-b b未处理
  { buttonText: '_', _text: '面试详情', type: 'check-invitation', buttonType: '_', is: (val) => val === 12 }, // b->c c未处理
  { buttonText: '_', _text: '安排面试', type: 'arranging-interviews', buttonType: '_', is: (val) => val === 21 },
  { buttonText: '_', _text: '面试详情', type: 'arranging-interviews', buttonType: '_', is: (val) => val === 31 },
  { buttonText: '_', _text: '修改面试', type: 'arranging-interviews', buttonType: '_', is: (val) => val === 32 },
  { buttonText: '_', _text: '面试详情', type: 'check-invitation', buttonType: '_', is: (val) => [41, 51, 57, 58, 59, 60, 61].includes(val) },
  { buttonText: '_', _text: '面试详情', type: 'check-invitation', buttonType: '_', is: (val) => [52, 53, 54, 55].includes(val) }
]
export default {
  props: {
    visible: Boolean,
    current: {
      type: Object,
      default: () => ({})
    }
  },
  components: { DynamicRecord, SelectPosition, PayCoin, DownloadApp, ChatReson, applyInterview },
  data () {
    return {
      getResumeLoading: false, // 获取简历loading
      dynamicDialogStatus: false, // 转发简历弹窗
      dialogStatus: false, // 我的简历弹窗
      nowResumeMsg: {}, // 简历数据
      loadingshow: false,
      hasonload: false,
      shareResumeImg: '',
      buttons: {
        btn1: {}, // 约聊
        btn2: {}, // 约聊拒绝原因
        btn3: {} // 约面
      },
      selectedInterviewType: 'chat', // 已经选择的约面或者约聊状态 chat 约聊 | interview 约面
      selectPositionDialogStatus: false, // 选择职位弹窗
      payCoinDialogStatus: false, // 支付弹窗
      downloadAppDialog: false, // 下载app弹窗
      chatResonDialog: false, // 查看约聊不合适原因 （其实是看对人不合适原因）
      applyInterviewDialog: false, // 申请约面
      jobuid: 0,
      positionId: 0,
      resonList: { reason: [], extraDesc: '' } // 不合适
    }
  },
  methods: {
    // 约聊流程
    handleSetChat (btn) {
      switch (btn.type) {
        case 'recruiter-chat':
          // 选择职位
          this.selectedInterviewType = 'chat'
          this.selectPositionDialogStatus = true
          break
        case 'keep-chat':
          this.downloadAppDialog = true
          break
        case 'return-cancel':
          const { uid } = this.nowResumeMsg
          deleteNotInterest(uid).then(({ data }) => {
            if (data.httpStatus === 200) {
              this.$message.success('取消成功！')
              this.$emit('finish')
            }
          })
          break
        case 'watch-chat-reson':
          const { reason, extraDesc } = this.nowResumeMsg.notSuitInfo
          this.resonList = {
            reason, extraDesc
          }
          this.chatResonDialog = true
          break
      }
    },
    // 约面流程
    handleSetResume (btn) {
      if (btn.type === 'recruiter-chat') {
        // 选择职位
        this.selectedInterviewType = 'interview'
        this.selectPositionDialogStatus = true
      } else if (btn.type === 'apply-interview') {
        this.applyInterviewDialog = true
      } else {
        this.$emit('change-status', btn.type, this.current)
      }
    },
    // 获取简历
    getResume () {
      this.getResumeLoading = true
      getResumeIdApi({ uid: this.current.uid || this.current.jobhunterUid }).then(({ data }) => {
        this.getResumeLoading = false
        this.nowResumeMsg = data.data || {}
        this.jobuid = this.nowResumeMsg.uid
        // 获取简历成功获取btn 显示的状态
        this.resetListDatas(this.nowResumeMsg)
        this.current.interviewInfo = this.nowResumeMsg.interviewSummary.interviewInfo
      }).catch(() => {
        this.getResumeLoading = false
      })
    },
    // 获取简历二维码
    getShareResume () {
      shareResumeApi({ resumeUid: this.current.uid, forwardType: 1 }).then(({ data }) => {
        this.shareResumeImg = data.data.positionQrCodeUrl
      })
    },
    // 选择好职位id
    handleSelectedPosition (id) {
      this.positionId = id
      this.payCoinDialogStatus = true
    },
    // 弹窗组件需要刷新列表数据的回调
    handleToRefresh (type) {
      this.$emit('finish')
      if (type === 'chat') {
        this.downloadAppDialog = true
      }
    },
    hanldeClose () {
      this.dialogStatus = false
      this.$emit('update:visible', false)
    },
    // 分享|转发简历
    sharediggle () {
      this.dynamicDialogStatus = true
    },
    // 是否感兴趣操作
    ownerOp (status, uid) {
      if (!status) {
        putCollectUserApi({ uid: uid }).then(({ data }) => {
          const { httpStatus } = data
          if (httpStatus === 200) {
            this.$message({
              type: 'success',
              message: '成功标记感兴趣'
            })
            this.nowResumeMsg.interested = true
          }
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      } else {
        cancelCollectUserApi({ uid: uid }).then(({ data }) => {
          const { httpStatus } = data
          if (httpStatus === 200) {
            this.nowResumeMsg.interested = false
            this.$message({
              type: 'success',
              message: '已取消标记'
            })
          }
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      }
    },
    // 下载简历
    onloadfile (type) {
      this.loadingshow = true
      let params = { jobhunterVkey: this.nowResumeMsg.vkey }
      if (type === 'pdf') {
        createonlinepdf(params).then((res) => {
          this.loadingshow = false
          this.$util.downFile(res.data, this.nowResumeMsg.name + '-' + this.nowResumeMsg.expects[0].position + '.pdf')
        }).catch((e) => {
          this.loadingshow = false
        })
      }
      if (type === 'doc') {
        createonlineword(params).then((res) => {
          this.loadingshow = false
          this.$util.downFile(res.data, this.nowResumeMsg.name + '-' + this.nowResumeMsg.expects[0].position + '.docx')
        }).catch((e) => {
          this.loadingshow = false
        })
      }
    },
    // 关闭下载简历弹窗
    closeload (e) {
      if ((!this.$refs.queryBox.contains(e.target)) && event.target.className !== 'iconfont icon-xiazai') {
        this.hasonload = false
      }
    },
    resetListDatas (data) {
      const { status } = data.chatInfo || {}
      const { notSuitInfo } = data
      const { interviewInfo, isAdvisor } = data.interviewSummary || {}
      let btn1 = {}; let btn2 = {}
      if (data.chatInfo) {
        btn1 = ChatTypeBtns.find(val => val.is(status))
      } else {
        btn1 = { buttonText: '一键约聊', type: 'recruiter-chat', buttonType: 'primary' }
      }
      // 招聘官（对人）标记不合适
      if (notSuitInfo) {
        btn1 = { buttonText: '取消不合适', type: 'return-cancel', buttonType: 'warning' }
        btn2 = { buttonText: '查看原因', type: 'watch-chat-reson', buttonType: 'default' }
      }
      this.buttons.btn1 = btn1
      this.buttons.btn2 = btn2
      // 是否有约面信息
      if (interviewInfo) {
        // 是否有约面状态
        if (interviewInfo.status) {
          let btn3 = MeetTypeBtns.find(val => val.is(interviewInfo.status))
          btn3.buttonText = isAdvisor === 1 ? '顾问跟进中' : '面试详情'
          btn3.buttonType = isAdvisor === 1 ? 'black' : 'default'
          this.buttons.btn3 = btn3
        } else {
          this.buttons.btn3 = { buttonText: '顾问帮约', _text: '开撩约面', type: 'recruiter-chat', buttonType: 'black' }
        }
      } else {
        // 如果c->b约聊，b处理中或者已经通过，并且没有约面的信息，不需要显示顾问帮约
        if (![101, 301].includes(status)) {
          this.buttons.btn3 = { buttonText: '顾问帮约', _text: '开撩约面', type: 'recruiter-chat', buttonType: 'black' }
        }
      }
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
        this.getResume()
        this.getShareResume()
      } else {
        this.nowResumeMsg = {}
        this.shareResumeImg = ''
        this.buttons = {
          btn1: {},
          btn2: {},
          btn3: {}
        }
      }
    }
  }
}
</script>
<style lang="scss">
.app-dialog.b-resume-dialog {
  .el-dialog__header {
    padding: 28px 20px 16px 50px !important;
    max-height: 60px;
  }
}
</style>
<style lang="scss" scoped>
.b-resume-dialog__wrapper {
  height: 100vh;
  overflow: hidden;
}
.Numbering {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  font-weight: normal;
  span {
    color: #92929B;;
    font-size: 14px;
  }
}
.resume-close {
  position: absolute;
  right: -79px;
  z-index: 3000;
  cursor: pointer;
  i {
    color: #fff;
    font-size: 30px;
  }
}
.resumeBox {
  background: #fff;
  height: calc(100vh - 60px - 60px);
  position: relative;
  padding-top: 8px;
  box-sizing: border-box;
  .printing{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 70px 5px 0px;
    span {
      color: #92929B;;
      font-size: 12px;
      position: relative;
      width:62px;
      height:25px;
      line-height: 25px;
      text-align: center;
      background:rgba(255,255,255,1);
      border-radius:4px 0px 2px 0px;
      border:1px solid rgba(239,233,244,1);
    }
  }
  .resumeLyout {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    .Code {
      width: 198px;
      display: inline-block;
      .msgCode {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 67px;
        img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
        span {
          font-size: 12px;
          color: #42334d;
          width: 72px;
          height: 26px;
          border-radius: 2px;
          background: rgba(237, 237, 237, 1);
          line-height: 26px;
          position: relative;
          text-align: center;
          margin-top: 6px;
          &:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 7px solid #ededed;
            left: 31px;
            top: -6px;
          }
        }
      }
      .handlerpring{
        display: flex;
        justify-content: center;
        font-size:18px;
        margin-bottom: 20px;
        position: relative;
        .onload{
          width:18px;
          height:18px;
          margin: 0 16px 0px 35px;
          position: relative;
          cursor: pointer;
          &::after{
            content: '';
            position: absolute;
            background: #E8E9EB;
            width: 1px;
            height: 16px;
            right: -16px;
          }
        }
        .onloadselect{
          width:221px;
          height:199px;
          background:rgba(255,255,255,1);
          position: absolute;
          top: 26px;
          left: -137px;
          border-radius: 4px;
          z-index: 1;
          box-shadow:0px 0px 26px 0px rgba(22,39,77,0.12);
          .title{
            font-size: 14px;
            color: #333333;
            font-weight: bold;
            height:20px;
            line-height: 20px;
            padding-left: 20px;
            margin: 20px 0px 2px 0px;
          }
          .select{
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            color: #6D696E;
            padding-left: 20px;
            margin-bottom: 12px;
          }
          .pdf{
            padding: 0 22px 0 20px;
            display: flex;
            margin-bottom: 20px;
            cursor: pointer;
            .p_l{
              width:36px;
              height:36px;
              border-radius:4px;
              i{
                font-size: 36px;
              }
            }
            .p_c{
              font-size: 12px;
              width: 112px;
              color: #6D696E;
              line-height: 42px;
              margin-left: 6px;
            }
            .p_r{
              width: 14px;
              height: 14px;
              margin-left: 11px;
              margin-top: 11px;
              i{
                font-size: 14px;
                color: #BCBEC0;;
                vertical-align: super
              }
            }
          }
        }
        .dayin{
          width:18px;
          height:18px;
          margin: 0 16px 0px 17px;
          position: relative;
          cursor: pointer;
          &::after{
            content: '';
            position: absolute;
            background: #E8E9EB;
            width: 1px;
            height: 16px;
            right: -17px;
          }
        }
        .share{
          width:18px;
          height:18px;
          // margin: 0 35px 0px 16px;
          cursor: pointer;
        }
        i{
          font-size: 18px;
          color: #00C4CD;
        }
      }
      .btnstatus{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:16px;
        .el-button+ .el-button{
          margin-left: 0;
        }
        .el-button {
          width: 154px;
          margin-bottom: 12px;
        }
      }
      .like_user {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        color: $main-color-1;
        cursor: pointer;
        height: 42px;
        .img {
          margin-right: 7px;
        }
      }
      .TabSelect {
        margin-top: 20px;
        .tabList {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          margin-left: 23px;
          flex-direction: column;
          height: 184px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          .tabItem {
            padding: 5px 10px;
            border: 1px solid #92929B;;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 8px;
            span {
              font-size: 14px;
              color: #000;
            }
            i {
              margin-left: 5px;
              cursor: pointer;
            }
          }
        }
        .addTab {
          text-align: left;
          margin-left: 23px;
          font-size: 14px;
          color: #2878ff;
          margin-bottom: 10px;
          font-weight: 700;
          cursor: pointer;
        }
      }
      .seefujian{
        margin-top: 83px;
        padding-left: 22px;
        .title{
          font-size: 14px;
          color: #333333;
          margin-bottom: 16px;;
          font-weight: bold;
        }
        a{
          width:152px;
          height:38px;
          border-radius:4px;
          font-size: 14px;
          line-height: 38px;
          display:block;
          color: #00C4CD;
          text-align: center;
          border:1px solid #00C4CD;
        }
      }
      .ContactInformation {
        margin-top: 52px;
        .contactTitle {
          text-align: left;
          margin-left: 23px;
          font-size: 14px;
          color: #42334d;
          margin-bottom: 18px;
          font-weight: 700;
        }
        .noUpload {
          text-align: center;
          font-size: 13px;
          color: #92929B;;
        }
        .Contact {
          margin-left: 23px;
          color: #66666E;;
          font-size: 14px;
          margin-bottom: 14px;
          i{
            color: #BCBEC0;;
            font-size: 14px;
            margin-right: 7px;
          }
        }
      }
      .download {
        margin-top: 30px;
        .noUpload {
          text-align: center;
          font-size: 13px;
          color: #92929B;;
        }
        .contactTitle {
          text-align: left;
          margin-left: 23px;
          font-size: 14px;
          font-weight: 700;
          color: #42334d;
          margin-bottom: 18px;
        }
        .Contact {
          width: 100px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid rgba(101, 39, 145, 1);
          font-size: 14px;
          color: #00C4CD;
          line-height: 30px;
          margin: 0 auto;
          cursor: pointer;
          position: relative;
          text-align: center;
          span {
            color: rgba(101, 39, 145, 1);
            font-size: 14px;
          }
        }
      }
    }
    .ResumeDetails {
      width: 742px;
      height: 926px;
      border-right: 1px solid #ededed;
      overflow-y: auto;
      display: inline-block;
      padding-bottom: 48px;
      height: 100%;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background:#fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius:20px;
      }
      &::-webkit-scrollbar-thumb {
        background:#DDE1E0;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius:20px;
      }
      .base {
        padding-bottom: 20px;
        padding-left: 50px;
        .message {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          .msgUrl {
            width: 88px;
            height: 88px;
            position: relative;
            .magimg {
              width: 88px;
              height: 88px;
              border: 2px solid #EDF1F0;
              border-radius: 50%;
              vertical-align: middle;
              box-sizing: border-box;
            }
            .gender2 {
              width: 26px;
              height: 26px;
              border-radius: 50%;
              position: absolute;
              right: 0px;
              bottom: -3px;
              text-align: center;
              .genderimg2{
                width: 100%;
                height: 100%;
              }
              i {
                line-height: 26px;
                color: #fff;
                font-size: 12px;
                text-align: center;
              }
            }
            .gender {
              width: 26px;
              height: 26px;
              border-radius: 50%;
              position: absolute;
              right: 0px;
              bottom: -3px;
              text-align: center;
              .genderimg1{
                width: 100%;
                height: 100%;
              }
              i {
                line-height: 26px;
                color: #fff;
                font-size: 12px;
                text-align: center;
              }
            }
          }

          .msgUserInfo {
            text-align: left;
            vertical-align: top;
            height: 100%;
            margin-left: 30px;
            flex: 1;
            padding-right: 28px;
            .basemsg {
              display: flex;
              align-items: baseline;
              .realName {
                font-size: 22px;
                font-weight: 700;
                height: 25px;
                color: #42334d;
                max-width: 153px;
                white-space: nowrap;
                margin-right: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
              }
              .realNameglass{
                height: 40px;
                max-width: 153px;
                margin-right: 24px;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: middle;
                }
              }
              .lebalList {
                display: inline-block;
                text-align: left;
                .lebalItem {
                  display: inline-block;
                  margin-right: 24px;
                  height: 23px;
                  overflow: 19px;
                  &:nth-child(1) {
                    span {
                      font-weight: 400;
                    }
                  }
                  &:nth-child(2) {
                    span {
                      font-weight: 400;
                    }
                  }
                  &:nth-child(3) {
                    span {
                      font-weight: 400;
                    }
                  }
                  &:nth-child(4) {
                    height: 0px;
                    margin-right: 0px;
                  }
                  i {
                    margin-right: 7px;
                    color: #BCBEC0;;
                  }
                  span {
                    font-size: 14px;
                  }
                }
              }
            }
            .basecenter{
              margin-top: 33px;
            }

            .status {
              padding: 3px 10px;
              background: #E5F9FA;
              color: #03B3BB;
              vertical-align: middle;
              box-sizing: border-box;
              font-size: 14px;
              line-height: 23px;
              height: 23px;
            }

            .nowWorking {
              margin-top: 10px;
              font-size: 15px;
              color: #000;

              span {
                padding-left: 10px;
                display: inline-block;
              }
            }

            .education {
              margin-top: 10px;
              font-size: 15px;
              color: #000;
              span {
                padding-left: 10px;
                display: inline-block;
              }
            }
          }
        }

        .description {
          margin-top: 14px;
          text-align: left;
          color: #92929B;;
          font-size: 13px;
          line-height: 21px;
          .msg {
            span {
              font-size: 13px;
              color: rgba(146, 146, 146, 1);
            }
            i {
              font-weight: 600;
              font-size: 15px;
              color: #000;
            }
          }

          .iconList {
            margin-top: 12px;
            display: flex;
            justify-items: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            .iconItem {
              border: 1px solid #00C4CD;
              background: #fff;
              border-radius: 30px;
              margin-right: 6px;
              vertical-align: middle;
              color: #00C4CD;
              margin-bottom: 8px;
              font-weight: 400;
              height: 22px;
              padding: 1px 12px;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }

  .intention {
    text-align: left;
    padding-top: 28px;
    padding-bottom: 38px;
    display: flex;
    justify-content: flex-start;
    margin-left: 82px;
    .title {
      font-size: 14px;
      font-weight: 700;
      color: #42334d;
      display: inline-block;
    }
    .intentList {
      display: inline-block;
      margin-left: 30px;
      width: 545px;
      .intentionItem {
        width: 100%;
        text-align: left;
        padding-bottom: 20px;
        .whitesize{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 460px;
          float: left;
          color: #66666E;
        }
        .position {
          font-size: 14px;
          color: #66666E;
          margin-right: 10px;
        }
        span {
          font-size: 14px;
          color: #66666E;
        }
        .price {
          font-size: 14px;
          color: #FF9E40;
          font-weight: 700;
          margin-left: 15px;
          float: left;
        }
      }
    }
  }

  .workExperience {
    margin-left: 82px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    margin-bottom: 38px;
    .title {
      font-size: 14px;
      font-weight: 700;
      color: #42334d;
      text-align: left;
      min-width: 56px;
    }
    .workList {
      width: 572px;
      margin-left: 30px;
      pre {
        text-align: left;
        white-space: pre-wrap;
        font-size: 13px;
        line-height: 22px;
        color: #92929B;;
      }
      .imgList {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: 10px;
        img {
          width: 86px;
          height: 86px;
          margin-right: 6px;
          margin-bottom: 6px;
          border-radius: 4px;
          &:nth-child(6n + 6) {
            margin-right: 0px;
          }
        }
        a{
          width: 86px;
          height: 86px;
          display: block;
          position: absolute;
          top: 0;;
        }
      }
      .workItem {
        margin-bottom: 18px;
        .workTime {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0px 10px 0px;
          width: 545px;
          .work-content{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 386px;
            color: #66666E;
          }
          .size {
            font-size: 14px;
            color: #92929B;;
          }
        }
        .workIconList {
          text-align: left;
          margin-top: 12px;
          span {
            background: #E5F9FA;
            padding: 2px 8px;
            text-align: center;
            color: #00C4CD;
            font-size: 12px;
            margin-right: 10px;
            border-radius: 2px;
            font-weight: 400;
          }
        }
        .workContent {
          text-align: left;
          .name {
            margin-left: 0px;
            // margin-top: 0px;
            font-size: 15px;
            color: #000;
          }
          .duties {
            text-align: left;
            font-size: 13px;
            color: #92929B;;
            pre {
              font-size: 13px;
              color: #92929B;;
              width: 545px;
              line-height: 22px;
              white-space: pre-wrap;
              margin: 0px;
            }
          }
        }
      }
    }
  }

  .historyList {
    padding: 20px;
    padding-left: 50px;
    height: 650px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    span {
      display: block;
      text-align: left;
      margin-bottom: 20px;
      font-size: 14px;
      color: #66666E;;
      // font-weight: 700;
      line-height: 20px;
      i {
        margin-left: 34px;
      }
    }
  }
}
</style>
