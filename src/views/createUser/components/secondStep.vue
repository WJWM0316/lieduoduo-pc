<template>
  <div class="wrap">
    <div class="resumeOpFirstMain">
      <h3 class="form-title">请填写工作经历</h3>
      <div class="form">
        <div class="formItem">
          <input maxlength="50" placeholder="请输入公司名称" v-model="formData.company" />

          <div class="limit">
            <span>{{formData.company.length}}</span>/<span>50</span>
          </div>
        </div>
        <div class="formItem">
          <el-cascader
            v-model= "postion"
            ref="cascader"
            class=""
            placeholder="请选择职位类型"
            :options="options"
            :filterable="false"
            @focus="focus('#position')"
            @blur="blur('#position')"
            :props="{
            value:'labelId',
            label:'name',
            children:'children'
            }"
            @change="choicePostion"
          ></el-cascader>
          <i class="el-icon-caret-bottom defalut-position" id="position"></i>
        </div>
        <div class="formItem">
          <input maxlength="20" placeholder="请输入职位名称" v-model="formData.position" />
          <div class="limit">
            <span>{{formData.position.length}}</span>/<span>20</span>
          </div>
        </div>
        <div class="formItem2">
          <div class="start-time">
            <div v-if="!formData.startTime" style="padding-left: 30px; color: #929292; font-weight: 300;">请选择开始时间</div>
            <div v-else style="padding-left: 30px; color: #282828">{{formData.startTime | date('YYYY-MM-DD')}}</div>
            <i class="el-icon-caret-bottom defalut-position" id="startTime"></i>
            <el-date-picker
              v-model="formData.startTime"
              type="date"
              value-format="timestamp"
              format="yyyy 年 MM 月 dd 日"
              @focus="focus('#startTime')"
              @blur="blur('#startTime')"
              placeholder="请选择开始时间">
            </el-date-picker>
          </div>～ &nbsp;&nbsp;
          <div class="end-time">
            <div v-if="!formData.endTime" style="padding-left: 30px; color: #929292; font-weight: 300;">
              <template v-if="formData.endTime === ''">
                请选择结束时间
              </template>
              <template v-else>
                至今
              </template>
            </div>
            <div v-else style="padding-left: 30px; color: #282828">{{formData.endTime | date('YYYY-MM-DD')}}</div>
            <i class="el-icon-caret-bottom defalut-position" id="endTime"></i>
            <el-date-picker
              v-model="formData.endTime"
              type="date"
              value-format="timestamp"
              format="yyyy 年 MM 月 dd 日"
              @focus="focus('#endTime')"
              @blur="blur('#endTime')"
              :pickerOptions="pickerOptions"
              placeholder="请选择开始时间">
            </el-date-picker>
          </div>
        </div>
        <div class="formItem" @click="openMask">
          <input maxlength="1000" disabled placeholder="请输入工作内容" v-model="formData.duty" />
          <div class="limit">
            <span>{{formData.duty.length}}</span>/<span>1000</span>
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
    <div class="message" v-if="messagePop.isShow" >
      <div class="duty-modal" v-if="messagePop.type==='duly'">
        <img class="icon-close" src="../../../assets/images/clo.png" @click.stop="cloMask" />
        <div class="duty-content" >
          <h3 class="duty-tit">工作内容</h3>
          <el-input
            resize="none"
            type="textarea"
            placeholder="工作的主要职责，参加了***项目，取得了***成绩，我在其中发挥了***的作用"
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
  import {  getResumeSecondApi, setResumeSecondApi, getLabelPositionListApi} from '@/api/putIn'
  import {companyNameReg, positionReg} from '@/util/fieldRegular.js'
  @Component({
    name: 'resumeSecondPost',
    computed: {}
  })
  export default class CourseList extends Vue {
    pickerOptions = {
      shortcuts: [
        {
          text: '至今',
          onClick: picker => picker.$emit('pick', 0)
        }
      ]
    }
    messagePop = {
      isShow: false,
      type: 'duly'
    }
    formData = {
      company: '',
      positionTypeId: 0,
      position: '',  
      duty: '',
      startTime: '',  
      endTime: '',  
      from: 1,  
    }
    textarea = ''
    options = []
    postion = []
    mounted () {
      this.init()
    }

    init () {
      this.getResumeSecond()
      this.getLabelPositionList()
    }

    getResumeSecond() {
      getResumeSecondApi().then(res => {
        let data = res.data.data[0]
        if(!res.data.data.length ) return
        this.formData.company = data.company
        this.formData.positionTypeId = data.positionTypeId
        this.formData.position = data.position
        this.formData.duty = data.duty
        this.formData.startTime = data.startTime ? data.startTime * 1000 : 0
        this.formData.endTime = data.endTime ? data.endTime * 1000 : 0
        this.formData.from = 1
        this.postion = [data.positionTypeTopPid, data.positionTypePid, data.positionTypeId]
      })
    }

    choicePostion(e) {
      this.formData.positionTypeId = e[e.length - 1];
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
      this.$parent.step--
    }

    // 提交
    submit () {
      const params = this.transformData()
      let title = ''
      if (!params.company) {
        title = '请输入公司名称'
      } else if (!companyNameReg.test(params.company)) {
        title = '公司名称需为2~50个字符'
      } else if (!params.positionTypeId) {
        title = '请选择职位类型'
      } else if (!params.position) {
        title = '请输入职位名称'
      } else if (!positionReg.test(params.position)) {
        title = '职位名称需为2~50个字符'
      } else if (!params.startTime) {
        title = '请选择开始时间'
      } else if (!params.endTime && params.endTime !== 0) {
        title = '请选择结束时间'
      } else if (params.endTime !== 0 && params.startTime > params.endTime) {
        title = '结束时间不能小于开始时间'
      } else if (!params.duty) {
        title = '请输入工作内容'
      }
      if (title) {
        this.$message.error(title)
        return
      }
      let data = {
        careers: []
      }

      data.careers.push(params)
      setResumeSecondApi(data).then(() => {
        this.$parent.step++
      })
    }
    transformData () {
      const newForm = Object.assign({}, this.formData || {})
      newForm.startTime = newForm.startTime/1000
      newForm.endTime = newForm.endTime/1000
      return newForm
    }
    openMask() {
      this.messagePop.isShow = true
      this.textarea = this.formData.duty 
    }

    saveDuty() {
      let lgh = this.textarea.length
      if(lgh<10 || lgh>1000) {
        this.$message.error('请填写10-1000的工作内容')
        return
      }
      this.formData.duty = this.textarea
      this.cloMask()
    }

    cloMask() {
      this.messagePop.isShow = false
    }
    focus(dom){
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position icon_active'
    }
    blur(dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position'
    }
  }
</script>
<style lang="less">
.resumeOpFirstMain {
  width:450px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
  border-radius:8px;
  border:1px solid rgba(255,255,255,1);
  margin: 0 auto;
  padding: 50px 40px 44px 40px;
  box-sizing: border-box;
  position: relative;
  input::-webkit-input-placeholder {
    color: #929292;
    font-size: 14px;
    font-weight: 300;
  }
  input::-moz-placeholder {
    color: #929292;
    font-size: 14px;
    font-weight: 300;
  }
  input::-ms-input-placeholder {
    color: #929292;
    font-size: 14px;
    font-weight: 300;
  }
  input::input-placeholder {
    color: #929292;
    font-size: 14px;
    font-weight: 300;
  }
  .form-title {
    font-size:24px;
    font-family:PingFangSC;
    font-weight:700;
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
      color:rgba(40,40,40,1);
      font-size:14px;
      font-weight:400;
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
      position: relative;
      text-align: left;
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
      position: relative;
      text-align: left;
    }
    .el-date-editor{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
  }
  .btn-box{
    height:50px;
    line-height: 50px;
    font-size:16px;
    font-weight:700;
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
        font-weight:700;
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


</style>