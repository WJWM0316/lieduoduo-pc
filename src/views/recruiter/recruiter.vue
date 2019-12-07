<template>
  <div id="recruiter">
    <div class="recruiter_cont main-center">
      <div class="header_warp">
        <div class="title">职位管理
          <div class="addJob" size="small" type="primary" @click="todoAction('addJob')">发布职位</div>
        </div>
        <div class="header_navs_wrap">
          <div class="header_navs" :class="searchBarFixed === true ? 'isFixed' :''">
            <ul class="recruiter_classify">
              <li
                v-for="(item,index) in recruiterList"
                @click="catchRecruiter(index)"
                :class="{'cur':item.active}"
                :key="index"
              >{{item.name}} ({{item.total}})</li>
            </ul>
            <div class="job_classify_wrap" v-if="jobNameList.length>0">
              <ul class="job_classify job_classify2">
                <li
                  v-for="(item,index) in jobNameList"
                  @click="catchJob(index)"
                  :class="{'slet':item.active}"
                  :key="index"
                >{{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ul class="job_list" v-if="jobList.length>0">
        <li class="job_blo" v-for="(item,index ) in jobList" :key="index">
          <div class="blo_left">
            <div class="job_top">
              <div class="job_name">{{item.positionName}}</div>
              <div class="job_emolument">{{item.emolumentMin}}k-{{item.emolumentMax}}k</div>
            </div>
            <div class="job_info">
              <span v-if="item.city">{{item.city}}{{item.district}}</span>
              <span v-if="item.workExperience">{{item.workExperienceName}}</span>
              <span v-if="item.workExperienceName">{{item.educationName}}</span>
            </div>
          </div>
          <div
            class="blo_status"
            v-if="form.status !=='1,2'"
            :class="form.status === '3' ? 'audit' :''"
          >{{navSelectName}}</div>
          <div class="blo_center">
            <div class="center_time">发布于 {{item.createdAt}}</div>
          </div>
          <div class="blo_right">
            <span class="job_op" @click="openShare(index, item.id)" v-if="form.status === '1,2'">分享</span>
            <span class="job_op" @click="opJob('close',item.id)" v-if="item.isOnline===1">关闭</span>
            <span
              class="job_op"
              @click="openposition(item.id)"
              v-if="item.isOnline===2 && form.status === '0,1'"
            >开放职位</span>
            <span class="job_op" @click="todoAction('editJob',item.id)">编辑</span>
          </div>
        </li>
      </ul>

      <div class="job_cont_none" v-else>
        <img class="hint_icon" src="../../assets/images/fly.png">
        <div class="none_hint">当前没有招聘中职位~</div>
      </div>

      <div class="toTop" @click="toTop" v-if="isShowTop">
        <img class="arrows" src="../../assets/images/open.png">
      </div>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next, slot"
      :total="pageInfo.total"
      :page-size="pageInfo.count"
      :current-page="pageInfo.page"
      v-if="pageInfo.total > 2"
      @current-change="handleCurrentPageChange"
    >
      <span class="total">共{{ Math.ceil(pageInfo.totalPage) }}页, {{pageInfo.total}}条记录</span>
    </el-pagination>


    <div class="pop" v-if="pop.isShow">
      <div class="share" v-if="pop.type==='share'">
        <div class="share_blo">
          <div class="pop_tit">分享职位</div>
          <img class="clo" src="../../assets/images/clo.png" @click="todoAction('cloPop2')">
          <p class="share_txt">使用「微信」扫描小程序码分享职位</p>
          <img class="code" :src="shareSelectItem.qrCodeUrl" v-if="shareSelectItem.qrCodeUrl">
          <img class="code" src="@/assets/images/Floorplan.png" v-else>
          <p class="share_help_text" @mouseover="isHelpShow = true" @mouseout="isHelpShow = false">
            分享帮助
            <i class="iconfont icon-question-circle"></i>
          </p>
        </div>

        <div class="share_blo share_help" v-if="isHelpShow">
          <div class="pop_tit">分享帮助</div>
          <p class="share_txt">扫码 > 点击分享按钮</p>
          <img class="help_icon" src="../../assets/images/pic_share_help.png">
          <span class="triangle_border_left"></span>
        </div>
      </div>
    </div>
    <!-- 提示弹窗 -->
  <message-diggle :visible="msg.messageshow" @clicksure="msgsure" @clickcancle="msgcancel" :btntitle="'前往认证'" :title="msg.msgtitle" :desc="msg.msgdesc"></message-diggle>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getMyInfoApi } from '../../api/auth'
import MessageDiggle from '../registerCompany/components/message.vue'
import {
  getMyListApi,
  closePositionApi,
  openPositionApi,
  getStatusTotalApi,
  getTypeListApi,
  getCodeUrl
} from '../../api/position'

@Component({
  name: 'lighthouse-list',
  methods: {},
  computed: {},
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
  components: { MessageDiggle }
})
export default class CourseList extends Vue {
  userInfo = {};

  pageInfo = {
    page: 1,
    count: 20,
    totalPage: 0,
    total: 0
  };
  msg = {
    messageshow: false,
    msgtitle: '身份认证',
    msgdesc: '您尚未认证身份，成功认证后即可发布职位。'
  };
  // close关闭，open 开放，审核通过，audit 审核中，fail 审核失败
  recruiterList = [
    {
      name: '招聘中',
      status: '1,2',
      total: 0,
      active: true
    },
    {
      name: '已关闭',
      status: '0,1',
      total: 0,
      active: false
    },
    {
      name: '审核中',
      status: '3',
      total: 0,
      active: false
    },
    {
      name: '未过审',
      status: '4',
      total: 0,
      active: false
    }
  ];
  jobList = []; // 工作列表
  jobNameList = []; // 职位分类列表
  // 文件上传
  pop = {
    isShow: false,
    type: 'share'
  };

  form = {
    page: 1,
    recruiter: 5,
    status: '1,2', // 状态
    is_online: 1,
    type: ''
  };

  searchBarFixed = false; // nav是否置顶
  statusTotal = {}; //
  uid = null;
  isHelpShow = false;
  shareSelectItem = {
    qrCodeUrl: ''
  }; // 分享选中
  isService = false;
  navSelectName = ''; //  nav选中文字
  jobSelectId = null; // 职位开启关闭选中
  isShowClassily = false; // 分类更多
  isShowTop = false; //
  opJob (type, id) {
    this.$confirm('关闭职位后，此职位不可被就职者查看和发起约面， 确认关闭吗？', '确认提醒', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }).then(() => {
      closePositionApi({ id: id }).then(() => {
        this.$message({
          type: 'success',
          message: '职位已关闭'
        })
        this.getStatusTotal()
        this.getPositionList()
      })
    }).catch(() => {})
  }
  init () {
    this.form = Object.assign(this.form, this.$route.query || {})
    this.userInfo = this.$store.state.userInfo

    let query = this.$route.query

    if (query.status) {
      this.recruiterList.map(item => {
        if (item.status === query.status) {
          item.active = true
        } else {
          item.active = false
        }
      })
    }
    this.getJobNameList()
    this.getPositionList()

    this.getMyInfo().then(() => {
      this.getStatusTotal()
    })
  }

  todoAction (type, id) {
    switch (type) {
      case 'cloPop':
        this.pop = {
          isShow: false,
          type: ''
        }
        break
      case 'cloPop2':
        this.pop = {
          isShow: false,
          type: ''
        }

        this.shareSelectItem = {
          qrCodeUrl: ''
        }
        break
      case 'addJob':
        if (!this.$store.state.recruiterinfo.identityAuth) {
          this.msg = {
            messageshow: true,
            msgtitle: '身份认证',
            msgdesc: '您尚未认证身份，成功认证后即可发布职位。'
          }
        } else {
          this.$router.push({
            name: 'postJob',
            query: {
              type: 'add'
            }
          })
        }
        break
      case 'editJob':
        this.$router.push({
          name: 'postJob',
          query: {
            type: 'edit',
            id: id
          }
        })
        break
      case 'openJob':
        openPositionApi({ id: this.jobSelectId })
          .then(() => {
            this.$message({
              type: 'success',
              message: '职位已开放'
            })
            this.pop = {
              isShow: false,
              type: ''
            }
            this.getStatusTotal()
            this.getPositionList()
          })
        break

      case 'moreClassily':
        this.isShowClassily = true
        break

      case 'closeClassily':
        this.isShowClassily = false
        break
      default:
        break
    }
  }
  // 开放职位
  openposition (id) {
    openPositionApi({ id: id })
      .then(() => {
        this.$message({
          type: 'success',
          message: '职位已开放'
        })
        this.pop = {
          isShow: false,
          type: ''
        }
        this.getStatusTotal()
        this.getPositionList()
      })
  }

  msgcancel () {
    this.msg = {
      messageshow: false
    }
  }
  msgsure () {
    this.$router.push({ name: 'perfectauth' })
  }

  /**
   * 初始化表单、分页页面数据
   */
  getStatusTotal () {
    getStatusTotalApi({
      uid: this.uid
    }).then(res => {
      this.statusTotal = res.data.data
      this.recruiterList.map(item => {
        if (item.name === '招聘中') {
          item.total = res.data.data.online
        }
        if (item.name === '已关闭') {
          item.total = res.data.data.close
        }
        if (item.name === '审核中') {
          item.total = res.data.data.audit
        }
        if (item.name === '未过审') {
          item.total = res.data.data.fail
        }
      })
    })
  }

  getMyInfo () {
    return getMyInfoApi()
      .then(res => {
        this.uid = res.data.data.uid
      })
      .catch(e => {
        this.$message.error(e.data.msg)
      })
  }

  getPositionList ({ page } = {}) {
    if (page) {
      this.form.page = page || 1
    }

    let data = {
      count: this.pageInfo.count,
      recruiter: 5,
      ...this.form
    }

    getMyListApi(data)
      .then(res => {
        let meta = res.data.meta
        this.jobList = [...res.data.data]
        this.pageInfo.totalPage = meta.lastPage
        this.pageInfo.total = meta.total
        this.pageInfo.page = meta.currentPage
      })
      .catch(e => {
        this.$message.error(e.data.msg)
      })
  }

  // nav状态列表
  getJobNameList () {
    let data = {
      status: this.form.status
    }
    getTypeListApi(data).then(res => {
      let data = []
      if (res.data.data.length > 0) {
        res.data.data.map(item => {
          item.active = false
        })
        if (res.data.data.length > 1) {
          res.data.data.unshift({
            name: '全部',
            active: true
          })
        } else {
          res.data.data[0].active = true
        }
        data = res.data.data
      }
      this.jobNameList = data
    })
  }

  handleCurrentPageChange (page) {
    this.setPathQuery({ page: page })
  }

  catchRecruiter (index) {
    let query = {}
    this.recruiterList.map((item, idx) => {
      if (idx === index) {
        item.active = true
        if (index !== 0) {
          query.is_online = 2
          query.status = item.status

          this.form.is_online = 2
          this.navSelectName = item.name
          this.form.status = item.status
        } else {
          query.is_online = 1
          query.status = '1,2'

          this.navSelectName = ''
          this.form.status = '1,2'
          this.form.is_online = 1
        }

        query.page = 1
        this.form.type = ''
        this.$router.replace({
          path: this.$route.path,
          query
        })
      } else {
        item.active = false
      }
    })
    this.init()
  }

  catchJob (index) {
    let that = this
    this.jobNameList.map((item, idx) => {
      if (idx === index) {
        item.active = !item.active
        that.form.type = item.name !== '全部' ? item.id : ''

        that.getPositionList({ page: 1 })
      } else {
        item.active = false
      }
    })
  }

  openShare (index, id) {
    getCodeUrl({ id }).then(res => {
      this.shareSelectItem.qrCodeUrl = res.data.data.qrCodeUrl
    })

    this.pop = {
      isShow: true,
      type: 'share'
    }
  }
}
</script>
<style lang="less">
#recruiter {
  .recruiter_cont {
    background: #ffffff;
    position: relative;
    border-radius: 8px;
  }
  .header_warp {
    min-height: 222px;
    position: relative;
    box-sizing: border-box;
    .header_navs_wrap {
      min-height: 110px;
    }
    .header_navs {
      min-height: 110px;
      position: relative;
      &.isFixed {
        position: fixed;
        background-color: #fff;
        top: 0px;
        width: 1140px;
        padding-top: 60px;
        z-index: 1;
      }
      .recruiter_classify {
        padding: 0 56px 0 56px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 46px;
        width: 100%;
        li {
          font-size: 16px;
          font-weight: 400;
          color: rgba(98, 98, 98, 1);
          margin-right: 40px;
          line-height: 46px;
          cursor: pointer;
          &.cur {
            font-weight: bold;
            color: #03B3BB;
            position: relative;
            &::after {
              content: "\20";
              width: 100%;
              height: 4px;
              background:#00C4CD;
              position: absolute;
              bottom: -0px;
              left: 0px;
            }
          }
        }
      }
      .job_classify_wrap {
        min-height: 62px;
        position: relative;

        .job_classify {
          width: 100%;
          min-height: 62px;
          background: #F8FAFA;
          padding: 20px 56px 5px 56px;
          display: flex;
          flex-direction: row;
          // justify-content: flex-start;
          // align-items: center;
          box-sizing: border-box;
          //overflow-x: scroll;
          position: relative;
          &.job_classify2 {
            height: auto;
            background: #F8FAFA;
            //padding-right: 100px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            flex-wrap: wrap;

            // position: absolute;
            // left: 0;
            // bottom: 0;
            // z-index: 100;
            .close {
              position: absolute;
              right: 30px;
              top: 20px;
              color: red;
              cursor: pointer;
            }
          }
          li {
            padding: 1px 14px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(40, 40, 40, 1);
            display: block;
            float: left;
            white-space: nowrap;
            line-height: 20px;
            height: 20px;
            border-radius: 2px;
            margin-bottom: 15px;
            &.more {
              position: absolute;
              right: 30px;
              top: 50%;
              margin-top: -10px;
              color: red;
              cursor: pointer;
            }
            &.slet {
              background: #00C4CD;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }

    .title {
      box-sizing: border-box;
      padding-left: 56px;
      height: 110px;
      line-height: 110px;
      font-size: 24px;
      font-weight: bold;
      width: 100%;
      border-radius: 8px 8px 0px 0px;
      color: #2D2D2D;
      text-align: left;
      position: relative;
    }
    .addJob {
      width: 124px;
      height: 40px;
      line-height: 40px;
      background: #00C4CD;
      border-radius: 4px;
      position: absolute;
      right: 56px;
      top: 36px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      box-sizing: border-box;
      cursor: pointer;
      text-align: center;
    }
  }

  .job_list {
    position: relative;
    .job_blo {
      height: 120px;
      padding: 33px 18px 33px 56px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #f5f4f7;
      .blo_left {
        text-align: left;
        line-height: 24px;
        font-size: 16px;
        font-weight: 700;
        width: 408px;
        .job_top {
          color: rgba(53, 64, 72, 1);
          margin-bottom: 8px;
          line-height: 24px;
        }
        .job_name {
          max-width: 260px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          float: left;
        }
        .job_emolument {
          display: inline-block;
          margin-left: 8px;
          max-width: 140px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .job_info {
          span {
            font-size: 12px;
            font-weight: 400;
            color: #66666E;
            padding: 1px 6px;
            margin-right: 8px;
            background: #F4F7F7;
            border-radius: 2px;
            display: inline-block;
          }
        }
      }
      .blo_status {
        width: 120px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(146, 146, 146, 1);
        &.audit {
          color: #FF9E40;
        }
      }
      .blo_center {
        flex: 1;
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        color: #92929B;
      }
      .blo_right {
        .job_op {
          font-size: 14px;
          font-weight: 400;
          color: #03B3BB;
          margin-right: 38px;
          cursor: pointer;
        }
      }
    }
  }
  .job_cont_none {
    min-height: calc(100vh - 337px);
    //height: 400px;
    //line-height: 400px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .none_hint {
      font-size: 14px;
      font-weight: 400;
      color: rgba(146, 146, 146, 1);
      line-height: 20px;
    }
    .hint_icon {
      width: 170px;
      height: 120px;
    }
  }
  .toTop {
    position: fixed;
    right: 50%;
    bottom: 50px;
    width: 56px;
    height: 56px;
    margin-right: -800px;
    background: rgba(239, 233, 244, 1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .arrows {
      width: 16px;
      height: 18px;
      display: block;
      transform: rotate(180deg);
    }
  }

  .triangle_border_left {
    width: 0;
    height: 0;
    border-width: 8px 10px 8px 0;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    left: -8px;
    top: 50%;
    margin-top: -20px;
  }
}

.messageBox {
  width: 432px;
  height: 192px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 32px 32px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  .clo {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 16px;
    top: 16px;
  }
  .mb_main {
    .mb_head {
      height: 24px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 8px;
      .hint {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 16px;
      }
      .mb_tit {
        font-size: 16px;
        font-weight: 700;
        color: rgba(53, 64, 72, 1);
        line-height: 24px;
      }
    }
    .mb_cont {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      p {
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 28px;
    .btn {
      font-size: 14px;
      font-weight: 400;
      color: rgba(53, 64, 72, 1);
      line-height: 32px;
      text-align: center;
    }
    .cancel {
      width: 80px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(220, 220, 220, 1);
      color: rgba(53, 64, 72, 1);
    }
    .true {
      width: 80px;
      height: 32px;
      background: #00C4CD;
      border-radius: 4px;
      color: rgba(255, 255, 255, 1);
      margin-left: 16px;
    }
  }
}
.pop {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  z-index: 100;
  .share {
    .share_blo {
      position: absolute;
      text-align: center;
      right: 50%;
      top: 50%;
      z-index: 6;
      width: 300px;
      height: 396px;
      margin: -200px -150px 0 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -2px 4px 0px rgba(101, 39, 145, 0.1),
        0px 2px 4px 0px rgba(132, 82, 167, 0.1);
      border-radius: 4px;
      &.share_help {
        margin-right: -470px;
      }
      .pop_tit {
        font-size: 20px;
        font-weight: bold;
        color: rgba(40, 40, 40, 1);
        line-height: 26px;
        margin: 32px 0 24px 0;
      }
      .clo {
        width: 10px;
        height: 10px;
        position: absolute;
        right: 16px;
        top: 16px;
      }
      .share_txt {
        color: #626262;
      }
      .code {
        width: 140px;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        border-radius: 70px;
        //border:1px solid rgba(239,233,244,1);
        margin: 40px 0 66px 0;
      }
      .share_help_text {
        font-size: 14px;
        color: #03B3BB;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
        i{
          font-size: 14px;
          display: inline-block;
          margin-left: 6px;
        }
      }
      .help_icon {
        width: 191px;
        height: 172px;
        margin-top: 32px;
        position: relative;

        right: -10px;
      }
    }
  }
}
</style>
