<template>
  <!-- 选择不合适原因 -->
  <div class="interview">
    <el-dialog
      width="432px"
      custom-class="app-dialog"
      append-to-body
      @close="handleClose"
      :visible.sync="dialogStatus">
      <div slot="title" v-if="type !== 'noJob'">{{detailtitle}}</div>
      <div class="noJobBox" v-if="type === 'noJob' && !getListLoading" v-loading="getListLoading">
        <div class="nullimg"><img src="@/assets/images/nullCandidate.png" /></div>
        <div class="noJobText">
          <p>邀请候选人面试</p>
          <p>至少需要一个招聘中职位~</p>
          </div>
        <div class="noJobBtn" @click.stop="toAddJob">去发布/开放职位</div>
      </div>
      <div class="selectposition" v-else v-loading="getListLoading">
          <div class="selectitem" v-for="(item, i) in positionLists" :key="i" @click="selectposition(item)">
            <div class="position">
              <div class="close" v-show="item.isOnline === 2">关闭</div>
              <div :class="['name', item.isOnline === 2 ? 'hui' : '']">{{item.positionName}}</div>
              <div :class="['money', item.isOnline === 2 ? 'hui' : '']">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info">
              <div :class="['address', item.isOnline === 2 ? 'hui' : '']">{{item.city}}{{item.district}}</div>
              <div :class="['year', item.isOnline === 2 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.isOnline === 2 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="selectcur" v-if="item.isOnline === 1">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.cur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
            </div>
            <div class="selectcur" v-else>
              <div class="circel"></div>
            </div>
          </div>
        </div>
          <div slot="footer">
            <div v-if="type !== 'noJob'">
          <el-button type="default" size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="handleSave">保存</el-button>
          </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  recruiterPositonList, sureOpenupAPi } from 'API/candidateType'
export default {
  watch: {
    visible (value) {
      if (value) {
        this.getlist()
      } else {
        this.dialogStatus = false
      }
    }
  },
  props: {
    // uid
    jobuid: {
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
      getListLoading: false, // 获取列表loading
      positionLists: [],
      jobpositionid: '',
      type: 'noJob',
      detailtitle: '选择职位'
    }
  },
  methods: {
    handleSave () {
      // 点击选择职位后开撩
      if (this.type === 'selectposition') {
        let arr = []
        this.positionLists.map((v, k) => {
          if (v.cur) {
            arr.push(v)
          }
        })
        if (arr.length > 0) {
          let data = { jobhunterUid: this.jobuid, positionId: this.jobpositionid }
          sureOpenupAPi(data).then((res) => {
            this.$emit('update:visible', false)
            this.$emit('finish')
            this.$message.success('开撩成功')
          })
        } else {
          this.$message.warning('请选择职位')
        }
      }
    },
    // 选择职位
    selectposition (item) {
      if (item.isOnline === 2) {
        return false
      } else {
        this.jobpositionid = item.id
        this.positionLists.map((v, k) => {
          v.cur = item === v
        })
      }
    },
    getlist () {
      let datalist = { is_online: 1 }
      this.getListLoading = true
      recruiterPositonList(datalist).then((res) => {
        this.getListLoading = false
        this.dialogStatus = true
        let arr = res.data.data
        let hasOnline = []
        arr.map((v, k) => {
          v.cur = false
          if (v.isOnline === 2) {
            hasOnline.push(v)
          }
        })
        if (arr.length === 0 || hasOnline.length === arr.length) {
          this.type = 'noJob'
        } else {
          this.type = 'selectposition'
          this.positionLists = arr
        }
      }).catch(() => {
        this.getListLoading = false
      })
    },
    toAddJob () {
      this.$router.push({
        name: 'recruiterIndex'
      })
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
    .nullimg{
      width: 179px;
      height: 98px;
      margin: 0 auto;
      margin-top: 32px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .noJobText {
      text-align: center;
      color:#66666E;
      font-size: 14px;
      margin-top: 22px;
    }
    .noJobBtn {
      width:184px;
      height:40px;
      background:#00C4CD;
      border-radius:100px;
      line-height: 40px;
      cursor: pointer;
      margin: 0 auto;
      margin-top: 38px;
      color:rgba(255,255,255,1);
      font-size: 14px;
      text-align: center;
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
</style>
