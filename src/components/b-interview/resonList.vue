<template>
  <!-- 约面选择不合适原因 -->
  <div class="interview">
    <el-dialog
      width="432px"
      custom-class="app-dialog"
      append-to-body
      @close="handleClose"
      :visible.sync="dialogStatus">
      <div slot="title">{{detailtitle}}</div>
      <div>
        <div class="inappropriate clearfix">
        <div class="wachitem" v-for="(item, i) in watchresonlist" :key="i">
          {{item}}
        </div>
          </div>
            <div class="explain" v-if="resonword">
              <div class="explaintitle">补充说明</div>
              <div class="text">
                <textarea :disabled="resonword" v-model="resonword" placeholder="请填写原因"></textarea>
              </div>
            </div>
          </div>
          <div slot="footer">
        <el-button type="default" size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getInterviewComment } from 'API/candidateType'
export default {
  watch: {
    visible (value) {
      if (value) {
        this.getresonlist()
      } else {
        this.dialogStatus = false
      }
    }
  },
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
      resonword: '',
      watchresonlist: [],
      detailtitle: '不合适原因'
    }
  },
  methods: {
    handleSave () {
      this.$emit('update:visible', false)
    },
    // 选择不合适原因
    getresonlist () {
      let comment = { interviewId: this.interviewId }
      getInterviewComment(comment).then((res) => {
        this.dialogStatus = true
        this.watchresonlist = res.data.data.reason.split(',')
        this.resonword = res.data.data.extraDesc
      })
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .inappropriate{
    padding: 0 40px;
    .resonitem{
      width:110px;
      height:32px;
      line-height: 32px;
      font-size:14px;
      text-align: center;
      background:#F4F7F7;
      color:#6D696E;
      border-radius:16px;
      float: left;
      margin-right: 11px;
      margin-bottom: 10px;
    }
    .wachitem{
      width:110px;
      height:32px;
      line-height: 32px;
      font-size:14px;
      text-align: center;
      background:#F4F7F7;
      color:#6D696E;
      border-radius:16px;
      float: left;
      margin-right: 11px;
      margin-bottom: 10px;
    }
    :nth-child(3n){
      margin-right: 0px;
    }
    .resoncur{
      background: #E5F9FA;
      color: #03B3BB;
    }
  }
  .explain{
    padding: 0 40px;
    margin-top: 14px;
    margin-bottom: 18px;
    .explaintitle{
      color:#66666E;
      margin-bottom: 12px;
      font-weight: bold;
    }
    .text{
      width:322px;
      height:78px;
      padding: 10px 14px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      color:#333333;
      border:1px solid rgba(239,233,244,1);
      textarea{
        width: 100%;
        height: 100%;
        &::placeholder{
          color:#BCBEC0;;
        }
        &:disabled{
          background: #fff;
        }
      }
    }
    .noallow{
      cursor: not-allowed;
    }
  }
</style>
