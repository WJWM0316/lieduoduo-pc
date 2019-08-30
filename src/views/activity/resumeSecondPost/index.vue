<template>

<div class="resumeSecondPost">
  <header id="resumeHeader" >
    <section>
      <img class="left_logo" src="../../../assets/images/activity/putIn/logo_lieduodou@2x.png" />
      <el-dropdown trigger="click"  @command="handleClick" >
        <div class="headerBtn">

          <div class="right" v-if="userInfo && userInfo.token">
            <span class="name">欢迎登录猎多多，{{userInfo.realname}}</span>
            <img class="op_icon" src="../../../assets/images/open.png" />
            <img class="avatar" :src="userInfo.avatarInfo.middleUrl" />
          </div>
        </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="out">
              <img class="drop_icon" src="../../../assets/images/out.png" />
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </section>
  </header>
  <div class="middle">
    <div class="contain clearfix">

      <h3 class="title"><span>三分钟</span>创建微简历，<span>1000+名企</span>高薪职位任你选</h3>

      <div class="recommend">
        <img class="recommendAva" src="../../../assets/images/open.png" />
        <div class="recommendMsg">
          <p class="msg_position">爱奇艺产品总监</p>
          <p class="msg_text">很期待与你这样的精英人才相遇</p>
        </div>
      </div>

      <div class="resumeOpFirstMain">
        <div class="formHint" v-if="formHint.isShow && !messagePop.isShow">
          <img class="" src="../../../assets/images/activity/putIn/live_icon_question2.png" />
          {{formHint.text}}
        </div>
        <h3 class="form-title">请填写工作经历</h3>

        <div class="form">
          <div class="formItem">
            <input maxlength="20" placeholder="请输入公司名称" v-model="form2.company"></input>

            <div class="limit">
              <span>{{form2.company.length}}</span>/<span>20</span>
            </div>
          </div>

          <div class="formItem">
            <!-- <el-select v-model="form2.position" placeholder="请选择职位类型">
              <el-option
                v-for="item in degreeAllLists"
                :key="item.value"
                :label="item.text"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-cascader
              v-model= "postion"
              ref="cascader"
              class=""
              placeholder="期待职位类别"
              :options="options"
              :filterable="false"
              :props="{
              value:'labelId',
              label:'name',
              children:'children'
              }"
              @change="choicePostion"
            ></el-cascader>
          </div>

          <div class="formItem">
            <input maxlength="20" placeholder="请输入职位名称" v-model="form2.position"></input>
            <div class="limit">
              <span>{{form2.position.length}}</span>/<span>20</span>
            </div>
          </div>

          <div class="formItem2">
            <div class="start-time">
              <el-date-picker
                v-model="form2.startTime"
                type="date"
                value-format="timestamp"
                format="yyyy 年 MM 月 dd 日"
                placeholder="请选择开始时间">
              </el-date-picker>
            </div>～ &nbsp;&nbsp;
            <div class="end-time">
              <el-date-picker
                v-model="form2.endTime"
                type="date"
                value-format="timestamp"
                format="yyyy 年 MM 月 dd 日"
                placeholder="请选择开始时间">
              </el-date-picker>
            </div>
          </div>

          <div class="formItem" @click="openMask">
            <input maxlength="1000" disabled placeholder="请输入工作内容" v-model="form2.duty" ></input>
            <div class="limit">
              <span>{{form2.duty.length}}</span>/<span>1000</span>
            </div>
          </div>
          <div class="btn-box">
            <div class="over-lay">
              <div class="btn-pre" @click="lastStep">上一步</div>
              <div class="btn-confirm" @click="submit">继续</div>
            </div>
            <div class="mask"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="message" v-if="messagePop.isShow" >
    <div class="duty-modal" v-if="messagePop.type==='duly'">
      <div class="formHint two" v-if="formHint.isShow">
        <img class="" src="../../../assets/images/activity/putIn/live_icon_question2.png" />
        {{formHint.text}}
      </div>
      <img class="icon-close" src="../../../assets/images/clo.png" @click.stop="cloMask" />
      <div class="duty-content" >
        <h3 class="duty-tit">工作内容</h3>
        <el-input
          resize="none"
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </div>
      <div class="duty-btn-box">
        <div class="btn-blo cancle" @click="cloMask">取消</div>
        <div class="btn-blo true" @click="saveDuty">保存 </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { getUserInfoApi, getResumeSecondApi, setResumeSecondApi, getLabelPositionListApi} from '../../../api/putIn'
  import { getUserIdentity, switchId } from '../../../../config.js'
  import { getAccessToken } from '../../../api/cacheService.js'
  @Component({
    name: 'lighthouse-list',
    methods: {
    },
    computed: {},
    watch: {
      '$route': {
        handler() {
          this.init()
        },
        immediate: true
      }
    },
    components: {}
  })
  export default class CourseList extends Vue {
    userInfo = {}
    messagePop = {
      isShow: false,
      type: 'duly'
    }
    formHint = {    //form提示框
      isShow: false,
      text: ''
    }
    form2 = {
      company: '',
      positionTypeId: '1',
      position: '',  
      duty: '',
      startTime: '',  
      endTime: '',  
      from: 1,  
    }
    hintSetTime = null
    textarea = ''
    isShowMask = false
    showError = false
    timer = 60
    imageUrl = ''
    step = 1
    options = []
    postion = []
    mounted () {
      let query = this.$route.query
      this.userInfo = this.$store.state.userInfo
    }

    init () {
      this.getResumeSecond()
      this.getLabelPositionList()
    }

    getResumeSecond() {
      getResumeSecondApi().then(res => {
        let data = res.data.data[0]
        if(res.data.data.length<1) return
        console.log(data)
        this.form2 = {
          company: data.company,
          positionTypeId:  data.positionTypeId,
          position: data.position,  
          duty: data.duty,
          startTime: data.startTime*1000,  
          endTime: data.endTime*1000,  
          from: 1,  
        }
        this.postion = [data.positionTypeTopPid,data.positionTypePid,data.positionTypeId]
      })
    }

    choicePostion(e) {
      this.form2.positionTypeId = e[e.length - 1];
    }

    getLabelPositionList () {
      getLabelPositionListApi().then(res => {
        this.options = res.data.data
        this.options.forEach(item => {
          item.children.forEach(item1 => {
            item1.children.forEach(item2 => {
              let result = JSON.stringify(item2.children)
              if (result === "[]") delete item2.children
            })
          })
        })
      })
    }

    // 返回上一步
    lastStep() {
      this.$router.push({name: 'resumeFirstPost'})
    }

    // 
    checkCompany() {
      var pattern = /^[\u0391-\uFFE5A-Za-z\s]{2,50}$/
      if(!pattern.test(this.form2.company)){
        this.setHint('请填写2-50字的公司名称')
        return false
      }else {
        return true
      }
    }

    checkDuty() {
      let lgh = this.form2.duty.length
      if(lgh<10 && lgh>1000){
        this.setHint('请填写10-1000的工作内容')
        return false
      }else {
        return true
      }
    }

    checkPosition() {
      var pattern = /^.{2,20}$/
      if(!pattern.test(this.form2.position)){
        this.setHint('职位名称需为2-20个字')
        return false
      }else {
        return true
      }
    }

    checkPositionTypeId() {
      if(!this.form2.positionTypeId){
        this.setHint('请选择期待职位类别')
        return false
      }else {
        return true
      }
    }

    // 提交
    submit (index) {
      console.log(this.form2)
      if(this.validate()) {
        const params = this.transformData()
        let data = {
          careers: []
        }
        data.careers.push(params)
        setResumeSecondApi(data).then(res => {
          console.log(res.data)
          this.$router.push({name: 'resumeThirdPost'})
        }).catch(e => {
          this.setHint(e.data.msg || '')
        })
      }
    }

    setHint (text) {
      console.log(text)
      this.formHint = {    //form提示框
        isShow: true,
        text: text
      }
      clearTimeout(this.hintSetTime) 
      this.hintSetTime = setTimeout(()=> {
        this.formHint.isShow = false
      }, 3000);
    }

    transformData () {
      const newForm = Object.assign({}, this.form2 || {})

      newForm.startTime = newForm.startTime/1000
      newForm.endTime = newForm.endTime/1000
      console.log(newForm)
      return newForm
    }

    // 验证
    validate() {
      if(!this.checkCompany()) return false
      if(!this.checkDuty()) return false
      if(!this.checkPositionTypeId()) return false
      if(!this.checkPosition()) return false
      return true
    }

    handleClick(e) {
      if(e === 'out'){
        this.$store.dispatch('logoutApi')
          .then(() => {
            this.$router.push({name: 'putIn'})
          })
      }
    }

    openMask() {
      clearTimeout(this.hintSetTime) 
      this.messagePop.isShow = true
      this.textarea = this.form2.duty 
    }

    saveDuty() {
      if(!this.checkDuty()) return
      this.form2.duty = this.textarea
      this.cloMask()
    }

    cloMask() {
      clearTimeout(this.hintSetTime) 
      this.messagePop.isShow = false
    }
  }
</script>
<style lang="less">

.resumeSecondPost {
  padding: 0;
  padding-bottom: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(../../../assets/images/activity/putIn/bg_createjl.png) 100% repeat #652791;
  .middle {
    padding-top: 108px;
    position: relative;
    height: 660px;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
    .contain {

    }
  }
  .title {
    font-size:22px;
    font-family:PingFangSC;
    font-weight:500;
    color:#fff;
    line-height:32px;
    span {
      color:#FFDC29;
    }
  }
  .clearfix {
      zoom: 1;
  }
  .formHint {
    height:60px;
    background:rgba(237,92,92,0.1);
    border-radius:4px;
    padding: 0 27px;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translate(-50%,0);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(237,92,92,1);
    white-space:nowrap;
    &.two {
      height:34px;
    }
    img {
      width: 14px;
      height: 14px;
      margin-right: 8px;
      display: block;
    }
  }

  .resumeOpFirstMain {
    width:450px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
    border-radius:8px;
    border:1px solid rgba(255,255,255,1);
    margin: 0 auto;
    padding: 50px 40px 35px 40px;
    box-sizing: border-box;
    position: relative;
    
    .form-title {
      font-size:24px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(40,40,40,1);
      line-height:33px;
      text-align: center;
      margin-bottom: 40px;
    }
    .formItem {
      width:370px;
      height:46px;
      background:rgba(251,249,252,0.8);
      border-radius:23px;
      border:1px solid rgba(242,237,245,1);
      margin-bottom: 20px;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        box-sizing: border-box;
        padding: 0 100px 0 30px;
      }
      .limit{
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        font-size:14px;
        font-weight:300;
        color:rgba(146,146,146,1);
      }
      .el-cascader{
        width: 100%;
        height: 100%;
        .el-cascader__label {
          display: flex;
          align-items: center;
          padding: 0 30px;
        }
        .el-input {
          height: 100%;
        }
        .el-input__suffix {
          height: 100%;
          right: 30px;
        }
      }
    }

    .formItem2 {
      width:370px;
      height:46px;
      line-height: 46px;
      display: flex;
      color: #666666;
      margin-bottom: 20px;
      .el-input__prefix{
        display: none;
      }
      .el-date-editor{
        width: 100%;
      }
      input{
        background: transparent;
        border: none;
        height: 46px;
        line-height: 46px;
      }
      .start-time{
        width:176px;
        height:46px;
        background:rgba(251,249,252,0.8);
        border-radius:23px;
        border:1px solid rgba(242,237,245,1);
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        vertical-align: middle;
      }
      .end-time{
        width:176px;
        height:46px;
        background:rgba(251,249,252,0.8);
        border-radius:23px;
        border:1px solid rgba(242,237,245,1);
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
    .btn-box{
      height:50px;
      line-height: 50px;
      font-size:16px;
      font-weight:500;
      cursor: pointer;
      position: relative;
      margin-top: 48px;
      .btn-pre{
        width:126px;
        height:50px;
        background:rgba(255,255,255,1);
        border-radius:100px 0px 0px 100px;
        border:1px solid rgba(101,39,145,1);
        box-sizing: border-box;
        display: inline-block;
        color:rgba(101,39,145,1);
        vertical-align: middle;
      }
      .btn-confirm{
        width:240px;
        height:50px;
        background:rgba(101,39,145,1);
        border-radius:0px 25px 25px 0px;
        box-sizing: border-box;
        display: inline-block;
        color: white;
        vertical-align: middle;
      }
      .over-lay{
        position: relative;
        z-index: 2;
      }
      .mask{
        width:360px;
        height:50px;
        border-radius:25px;
        border:1px solid rgba(101,39,145,1);
        position: absolute;
        top: 4px;
        z-index: 1;
        left: 8px;
      }
    }
  }

  .message {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 1001;
    .duty-modal {
      width:450px;
      height:442px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      position: absolute;
      padding: 44px 32px 24px;
      box-sizing: border-box;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: left;
      .duty-content {
        .duty-tit {
          font-size:16px;
          font-family:PingFangSC;
          font-weight:500;
          color:rgba(40,40,40,1);
          line-height:22px;
          margin-bottom: 18px;
        }
        .el-textarea {
          .el-textarea__inner {
            width:386px;
            height:264px;
          }
        }
      }
      .duty-btn-box {
        margin-top: 30px; 
        display: flex;
        justify-content: flex-end;
        .btn-blo {
          text-align: center;
          font-size:16px;
          font-weight:500;
          border-radius:25px;
          line-height:40px;
          
          &.cancle {
            width:88px;
            height:40px;
            color:#929292;
            border:1px solid rgba(220,220,220,1);
            margin-right: 16px;
          }
          &.true {
            width:128px;
            height:40px;
            color:#fff;
            background:rgba(101,39,145,1);
            border:1px solid rgba(101,39,145,1);
          }
        }
      }
      .bottom_hint {
        width: 100%;
        height:76px;
        background:rgba(101,39,145,0.03);
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size:16px;
        font-weight:400;
        color:rgba(101,39,145,1);
        line-height:22px;
        img {
          display: block;
          width: 14px;
          height: auto;
        }
      }
      .icon-close {
        width: 15px;
        height: 15px;
        display: inline-block;
        background-size: contain;
        position: absolute;
        right: 15px;
        top: 15px;
      }
    }
  }
  .recommend {
    width:450px;
    height:70px;
    padding: 10px 22px;
    margin: 38px auto 56px;
    background:rgba(111,55,153,1);
    border-radius:100px 100px 100px 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 50px;
    box-sizing: border-box;
    .recommendAva {
      width:46px;
      height:46px;
      border-radius:50%;
      margin-right: 20px;
      background: #fff;
    }
    .recommendMsg {
      text-align: left;
      .msg_position {
        font-size:16px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:16px;
      }
      .msg_text {
        font-size:14px;
        font-weight:300;
        color:rgba(255,255,255,1);
        line-height:14px;
        margin-top: 6px;
      }
    }
  }

  .el-dropdown-menu {
    .el-dropdown-menu__item {
      font-weight: 300;
      &:hover {
        background: #efe9f4 !important;
        color: #606266 !important;
        font-weight: 300;
      }
    }
  }
  #resumeHeader {
    height:60px;
    background: #fff;
    text-align: right;
    font-size: 14px;
    box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;

    section {
      height:60px;
      width: 1000px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }
    .headerBtn {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .name {
          font-size:14px;
          font-weight:400;
          color:#6E1F96;
        }
        .avatar {
          width:30px;
          height:30px;
          border-radius: 50%;
          margin-left: 7px;
        }
        .op_icon {
          width:12px;
          height:12px;
          margin: 0 7px;
        }
      }
      .btn_blo {
        font-size:14px;
        font-weight:400;
        color:rgba(110,31,150,1);
      }
      .btn_blo2 {
        width:113px;
        height:34px;
        background:rgba(101,39,145,1);
        border-radius:84px;
        font-size:14px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:34px;
        text-align: center;
        margin-left: 20px;
      }
    }
    .left_logo {
      width:160px;
      height:auto;
      display: block;
    }
    .el-popper[x-placement^=bottom] .popper__arrow {
      left: 69px !important;
    }
    .el-dropdown-menu__item {
      display: flex;
      flex-direction: row;
      align-items: center;
      .drop_icon {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
  }
  
}


</style>