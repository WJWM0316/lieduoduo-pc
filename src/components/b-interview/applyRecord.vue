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
</style>
