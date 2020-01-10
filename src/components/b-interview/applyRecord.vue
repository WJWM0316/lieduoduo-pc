<template>
  <!-- 选择不合适原因 -->
  <div class="interview">
    <el-dialog
      width="432px"
      custom-class="app-dialog"
      append-to-body
      @close="handleClose"
      :visible.sync="dialogStatus">
      <div slot="title">{{InterviewTitle}}</div>
        <div class="tishi" v-if="tishishow">
          <div class="tishiimg"><img src="@/assets/images/exclamation-circle.png" alt=""></div>
          <div class="tishitext">该职位未开放，不可选择约面</div>
        </div>
        <div class="content-info">
        <div class="applytext">{{recordtext}}</div>
          <div class="selectposition">
            <div class="selectitem" v-for="(item, i) in applyrecordList" :key="i" @click="selectapply(item, i)">
            <div class="position">
              <div class="close" v-show="item.positionStatus === 0">关闭</div>
              <div class="close" v-show="item.positionStatus === 3">审核中</div>
              <div class="close" v-show="item.positionStatus === 4">审核失败</div>
              <div :class="['name', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.positionName}}</div>
              <div class="money" v-show="item.positionId !== 0 && item.positionName !== '都不合适'">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info" v-if="item.positionName !== '都不合适'">
              <div :class="['address', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.city}}{{item.district}}</div>
              <div :class="['year', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="info" v-else>选择此项，以上申请记录将全部合并处理为不合适</div>
            <div class="selectcur" v-if="item.positionStatus === 1 || item.positionStatus === 0 || item.positionStatus === 2 || item.positionName === '都不合适'">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.hascur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
            </div>
            <div class="selectcur" @click="setHint" v-else>
              <div class="circel"></div>
            </div>
            <div class="confirmbox" v-show="item.boxshow">
              <div class="b-head">
                <div class="b-img"><img src="@/assets/images/exclamation-circle.png" alt=""></div>
                <div class="b-text">你确定开放职位进行约面吗？</div>
              </div>
              <div class="b-btn">
                <div class="think-sure" @click="sureyuemian(item)">确定</div>
                <div class="think" @click.stop="resetboxcur(item, i)">再想想</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div slot="footer">
        <el-button type="default" size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
    <!-- 选择不合适原因 -->
    <select-reson :reasonlist="reasonlist" :interviewId="interviewId" :jobuid="jobuid" :visible.sync="resondiggle" @change="handleClose"></select-reson>
  </div>
</template>
<script>
import selectReson from 'COMPONENTS/b-interview/selectReson'
import {
  openPositionApi, confirmInterviewApi, getCommentReasonApi, getloadingReasonApi } from 'API/candidateType'
export default {
  watch: {
    visible (value) {
      if (value) {
        this.dialogStatus = true
      } else {
        this.dialogStatus = false
      }
    }
  },
  components: { selectReson },
  props: {
    // uid
    jobuid: {
      type: [String, Number],
      required: true
    },
    interviewId: {
      type: [String, Number],
      required: true
    },
    interviewNum: {
      type: [String, Number, Object]
    },
    recordtext: {
      type: [String, Number, Object]
    },
    applyrecordList: {
      type: Array
    },
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      dialogStatus: false,
      tishishow: false,
      positionLists: [],
      resondiggle: false,
      reasonlist: [],
      jobpositionid: '',
      InterviewTitle: '以下是候选人多条申请记录，请选择处理'
    }
  },
  methods: {
    handleSave () {
      let arr = []
      let canclick = false
      this.applyrecordList.map((v, k) => {
        if (v.hascur) {
          arr.push(v)
          this.interviewId = v.interviewId
        }
        if (v.boxshow) {
          canclick = true
        }
      })
      if (this.recordtext === '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；') {
        if (!canclick) {
          if (arr.length === 0) {
            this.$message.warning('请选择一条面试')
          } else {
            confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
              this.$message.success('约面成功')
              this.$emit('update:visible', false)
              this.$emit('finish')
            })
          }
        }
      } else {
        if (arr.length === 0) {
          this.$message.warning('请选择一条标记为不合适')
        } else {
          if (this.interviewId) {
            confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
              this.$message.success('约面成功')
              this.$emit('update:visible', false)
              this.$emit('finish')
            })
          } else {
            this.resondiggle = true
            if (this.interviewNum.interviewStatus === 58 || this.interviewNum.interviewStatus === 59) {
              getCommentReasonApi().then((res) => {
                let arr = res.data.data
                arr.map((v, k) => {
                  v.cur = false
                })
                this.reasonlist = arr
              })
            } else {
              getloadingReasonApi().then((res) => {
                let arr = res.data.data
                arr.map((v, k) => {
                  v.cur = false
                })
                this.reasonlist = arr
              })
            }
          }
        }
      }
    },
    setHint () {
      this.tishishow = true
      clearTimeout(this.hintSetTime)
      this.hintSetTime = setTimeout(() => {
        this.tishishow = false
      }, 1500)
    },
    // 选择申请记录
    selectapply (item, index) {
      let applyrecordList = this.applyrecordList.slice()
      applyrecordList.map((v, k) => {
        v.hascur = k === index
        v.boxshow = false
      })
      if (item.positionStatus === 0) {
        item.boxshow = true
      } else {
        item.boxshow = false
      }
      this.applyrecordList = applyrecordList
    },
    sureyuemian (data) {
      openPositionApi({ id: data.positionId })
        .then(() => {
          confirmInterviewApi({ interviewId: data.interviewId }).then((res) => {
            this.$message.success('约面成功')
            this.$emit('update:visible', false)
          })
        })
        .catch(e => {
          this.$message.error(e.data.msg)
        })
    },
    resetboxcur (item, index) {
      this.applyrecordList[index].boxshow = false
      this.applyrecordList[index].hascur = false
    },
    handleClose () {
      this.dialogStatus = false
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.tishi{
  position: absolute;
  width:212px;
  display: flex;
  top: 20px;
  left: 50%;
  margin-left: -106px;
  justify-content: center;
  align-items: center;
  height:36px;
  background:rgba(255,244,229,1);
  box-shadow:0px 2px 12px 0px rgba(75,72,71,0.06);
  border-radius:4px;
  font-size: 12px;
  color: #6D696E;
  .tishitext{
    height:36px;
    line-height: 36px;
  }
  .tishiimg{
    width: 16px;
    height: 16px;
    margin-right: 8px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
    .content-info{
      .applytext{
        color:#92929B;
        display: block;
        line-height: 20px;
        margin-bottom: 20px;
        margin-top: -19px;
        padding: 0 40px;
      }
      .selectposition{
        padding: 0 40px;
        max-height: 335px;
      overflow-y: scroll;
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
        .selectitem{
          height:69px;
          margin-top: 24px;
          border-bottom:1px solid #E8E9EB;
          position: relative;
          .confirmbox{
            width:220px;
            position: absolute;
            right: 0px;
            bottom: -78px;
            z-index: 999;
            height:96px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
            .b-head{
              height: 12px;
              margin-top: 20px;
              display: flex;
              .b-img{
                width: 12px;
                height: 12px;
                margin-right: 4px;
                margin-left: 20px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .b-text{
                color: #333333;
                font-size: 12px;
              }
            }
            .b-btn{
              padding-right: 20px;
              margin-top: 20px;
              .think{
                width:60px;
                height:24px;
                border-radius:2px;
                color: #92929B;;
                text-align: center;
                margin-right: 12px;
                float: right;
                line-height: 24px;
                font-size: 12px;
                cursor: pointer;
              }
              .think-sure{
                width:60px;
                text-align: center;
                height:24px;
                background:#00C4CD;
                border-radius:2px;
                color: #fff;
                float: right;
                line-height: 24px;
                cursor: pointer;
                font-size: 12px;
              }
            }
          }
          .position{
            height:27px;
            width: 100%;
            .close{
              width:56px;
              height:18px;
              background:rgba(255,255,255,1);
              border-radius:2px;
              color:rgba(237,92,92,1);
              font-size: 12px;
              float: left;
              text-align: center;
              line-height: 18px;
              margin-right: 10px;
              border:1px solid rgba(237,92,92,1);
            }
            .name{
              color:rgba(53,64,72,1);
              font-weight: bold;
              font-size: 14px;
              float: left;
              line-height: 20px;
              max-width:227px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-right: 18px;
            }
            .money{
              float: left;
              color:#FF9E40;
              font-weight: bold;
              line-height: 20px;
              font-size: 14px;
            }
            .hui{
              color:#BCBEC0;
            }
          }
          .info{
            width: 100%;
            color: #66666E;
            font-size:12px;
            .address{
              float: left;
              background: #F4F7F7;
              padding: 4px 6px;
              text-align: center;
              margin-right: 8px;
              border-radius: 2px;
            }
            .year{
              float: left;
              background: #F4F7F7;
              margin-right: 8px;
              padding: 4px 6px;
              border-radius: 2px;
            }
            .benke{
              float: left;
              background: #F4F7F7;
              padding: 4px 6px;
              border-radius: 2px;
            }
            .hui{
              color:#BCBEC0;
            }
          }
          .selectcur{
            position: absolute;
            width:20px;
            height:20px;
            color: #BCBEC0;;
            top: 20px;
            right: 0px;
            .bg{
              color: #00C4CD;
            }
            .circel{
              width:14px;
              height:14px;
              background: #ecebeb;
              border: 1px solid #BCBEC0;;
              border-radius: 50%;
            }
          }
        }
      }
    }
</style>
