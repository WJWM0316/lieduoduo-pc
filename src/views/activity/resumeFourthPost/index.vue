<template>

<div id="resume-four">
  <header id="header2" >
    <section>
      <div class="left">
        <div class="companyMsg">
          <p>精英人才招聘神器</p>
          <p>www.lieduoduo.co</p>
        </div>
      </div>  
        <el-dropdown trigger="click">
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
  <div class="content">
    
    <h3 class="h11">还剩<span>最后一步，1000+名企</span>高薪职位任你</h3>
    <div class="slogon-box">
      <div class="img-box"></div>
      <div class="infos">
        <div class="h33">爱奇艺产品总监</div>
        <div class="p44">很期待与你这样的精英人才相遇</div>
      </div>
    </div>
    <div class="myForm">

      <div class="form-header">
        <h3>请填写求职意向</h3>
      </div>

      <div class="formItem">
        <el-cascader
          ref="cityChoice"
          v-model="form.cityNum"
          placeholder="请选择期望城市"
          :options="cityList"
          filterable
          :show-all-levels="false"
          :props="{
            value:'areaId',
            label:'title',
            children:'children'
          }"
          @change="choiceCity"
        ></el-cascader>
      </div>

      <div class="formItem" @click="openPositionModel">
        <div class="default-value" v-if="!form.position">请选择期望职位</div>
        <div class="has-value" v-else>{{form.position}}</div>
      </div>

      <div class="formItem" @click="openModel">
        <div class="default-value" v-if="!form.fields.length">请选择期望领域</div>
        <div class="has-value" v-else>
          <span
            v-for="(item, index) in form.fields"
            :key="index">
            {{`${item.field || item.name}${form.fields.length - 1 !== index ? '、' : ''}`}}
          </span>
        </div>
      </div>

      <div class="formItem2">
        <div class="start-time">
          <el-select v-model="form.salaryFloor" placeholder="请选择期望薪资" @change="changeEmolumentMin">
            <el-option
              v-for="item in emolumentMinList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>～ &nbsp;&nbsp;
        <div class="end-time">
          <el-select v-model="form.salaryCeil" placeholder="期望薪资">
            <el-option
              v-for="item in emolumentMaxList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="btn-box">
        <div class="over-lay">
          <div class="btn-pre">上一步</div>
          <div class="btn-confirm" @click="check">完成</div>
        </div>
        <div class="mask"></div>
      </div>

    </div>
  </div>
  <el-dialog
    :title="model.title"
    :visible.sync="model.show"
    width="450px"
    :lock-scroll="model.lockScroll"
    :show-close="model.showClose"
    :before-close="handleBeforeClose">
    <div class="innerHtml">
      <div class="model-header">
        <span class="label">请选择行业领域</span>
        <span class="tips">(最多选3个行业领域)</span>
      </div>
      <ul class="seleced-box">
        <li
          class="item" 
          v-for="(item, index) in model.selected"
          @click="remove(index, item)"
          :key="index">{{item.field || item.name}}<i class="el-icon-circle-plus"></i></li>
      </ul>
      <ul class="scroll-box">
        <li
          class="item2"
          v-for="(item, index) in labelFieldList"
          :key="index"
          @click="onClick(index, item)"
          :class="{item2_active: item.active}">{{item.name}}</li>
      </ul>
    </div>
    <div slot="footer" class="dialog-footer">
      <div @click="closeModel" class="btn-cancle">取 消</div>
      <div @click="confirm" class="btn-confirm">确 定</div>
    </div>
  </el-dialog>
  <MyModel @resultEvent="resultEvent" v-model="model.showPositionModel"></MyModel>
</div>

</template>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import MyModel from '@/components/model/index.vue'

  import {
    getUserInfoApi,
    searchResumeStepApi,
    setResumeFirstApi,
    setResumeSecondApi,
    setResumeThirdApi,
    setResumeFourthApi,
    getDegreeAllListsApi,
    getResumeFourStepApi,
    getAreaListsApi,
    getLabelFieldListApi
  } from '../../../api/putIn'
  import { getUserIdentity, switchId } from '../../../../config.js'
  import { getAccessToken } from '../../../api/cacheService.js'
  @Component({
    name: 'resumeFourthPost',
    methods: {
    },
    components: {
      MyModel
    }
  })
  export default class resumeFourthPost extends Vue {
    form = {
      salaryFloor: '',
      salaryCeil: '',
      cityNum: '',
      positionId: '',
      salaryCeil: '',
      salaryFloor: '',
      fields: [],
      position: '',
      city: '',
      cityNum: [],
      placeholder: ''
    }
    model = {
      show: false,
      title: '',
      type: '',
      lockScroll: true,
      showClose: false,
      showPositionModel: false,
      selected: []
    }
    userInfo = {}
    messagePop = {
      isShow: false,
      type: 'help'
    }
    augustInterval = null
    isShowMask = false
    showError = false
    timer = 60
    imageUrl = ''
    handleHeaders = {
      'Authorization': '',
    }
    handleData = {
      'attach_type': 'avatar'
    }
    degreeAllLists = []
    cityList = []
    emolumentMaxList = []
    emolumentMinList = []
    labelFieldList = []
    getDegreeAllLists() {
      return getDegreeAllListsApi().then(res => this.degreeAllLists = res.data.data)
    }
    check() {

      let cityCheck = new Promise((resolve, reject) => {
        if(!this.form.cityNum) {
          reject('请选择期望城市')
        } else {
          resolve()
        }
      })

      let positionCheck = new Promise((resolve, reject) => {
        if(!this.form.positionId) {
          reject('请选择期望职位')
        } else {
          resolve()
        }
      })

      let salaryCeilCheck = new Promise((resolve, reject) => {
        if(!this.form.salaryCeil) {
          reject('请选择最大薪资')
        } else {
          resolve()
        }
      })

      let salaryFloorCheck = new Promise((resolve, reject) => {
        if(!this.form.salaryFloor) {
          reject('请选择最小薪资')
        } else {
          resolve()
        }
      })

      let fieldIdsCheck = new Promise((resolve, reject) => {
        if(!this.form.fields) {
          reject('请选择行业领域')
        } else {
          resolve()
        }
      })

      Promise.all([
        cityCheck,
        positionCheck,
        salaryCeilCheck,
        salaryFloorCheck,
        fieldIdsCheck
      ]).then(() => this.submit()).catch(err => this.$message.error(err))
    }
    init() {
      return getResumeFourStepApi().then(res => {
        let infos = res.data.data
        this.setEmolumentMax(infos.salaryCeil)
        this.form.positionId = infos.positionId
        this.form.position = infos.position
        this.form.salaryFloor = infos.salaryFloor
        this.form.salaryCeil = infos.salaryCeil
        this.form.fields = infos.fields
        this.form.cityNum = [infos.provinceNum, infos.cityNum]
        this.getLabelFieldList()
      })
    }
    submit (index) {
      let params = {
        positionId: this.form.positionId,
        salaryFloor: this.form.salaryFloor,
        salaryCeil: this.form.salaryCeil,
        cityNum: this.form.cityNum[this.form.cityNum.length - 1],
        fieldIds: this.form.fields.map(field => field.fieldId).join(',')
      }
      setResumeFourthApi(params).then(res => {
        this.$router.push({name: 'applyIndex'})
      })
    }
    openModel() {
      let fieldIds = this.form.fields.map(field => Number(field.fieldId))
      this.model.show = !this.model.show
      this.model.selected = this.form.fields.slice()
      this.labelFieldList.map(field => field.active = fieldIds.includes(field.labelId) ? true : false)
    }
    closeModel() {
      this.model.show = !this.model.show
      this.model.selected = this.form.fields.slice()
    }
    confirm() {
      this.model.show = !this.model.show
      this.form.fields = this.model.selected
    }
    handleBeforeClose() {

    }
    choiceCity(e) {
      this.form.cityNum = e
    }
    getAreaLists() {
      return getAreaListsApi({level: 3}).then(res => {
        this.cityList = res.data.data
        this.cityList.forEach(item => {
          item.children.forEach(item1 => {
            let result = JSON.stringify(item1.children)
            if(result === '[]') delete item1.children
          })
        })
      })
    }
    changeEmolumentMin(e){
      this.form.salaryCeil = ''
      this.setEmolumentMax(e)
    }
    setEmolumentMax(num) {
      let max = 0
      let list = []
      if (num <= 10) {
        max = num+5
      } else if (num > 10 && num < 31) {
        max = num*2
      } else if (num > 34 && num < 71) {
        max = num+30
      } else if (num > 74 && num < 96) {
        max = num+30
      } else if (num > 99 && num < 251) {
        max = num*2
      }

      for(let i = num+1; i <= max; i++) {
        list.push({
          label : `${i}k`,
          value : i
        })
      }

      this.emolumentMaxList = list
    }
    setEmolumentMin() {
      let max = 250
      let i = 0
      let list = []

      while (i<max)
      {
        if(i<30){
          i++
        } else if(i<100){
          i+=5
        } else if(i<max){
          i+=10
        }
        list.push({
          label : `${i}k`,
          value : i
        })
      }
      this.emolumentMinList = list
    }
    resultEvent(res) {
      this.model.showPositionModel = false
      this.form.positionId = res.labelId
      this.form.position = res.name
    }
    openPositionModel() {
      this.model.showPositionModel = true
    }
    getLabelFieldList() {
      return getLabelFieldListApi().then(res => {
        let labelFieldList = res.data.data
        let fieldIds = this.form.fields.map(field => Number(field.fieldId))
        labelFieldList.map(field => field.active = fieldIds.includes(field.labelId) ? true : false)
        this.labelFieldList = labelFieldList
      })
    }
    remove(index, item) {
      this.model.selected.splice(index, 1)
      this.labelFieldList.map(field => {
        if(field.labelId == item.fieldId) field.active = false
      })
    }
    onClick(index, item) {
      let labelFieldList = this.labelFieldList.slice()
      if(this.model.selected.length > 2 && !item.active) {
        this.$message({message: '最多选3个行业领域', type: 'warning'})
        return 
      }
      if(item.active) {
        labelFieldList[index].active = false
        this.model.selected.map((field, i) => {
          if(field.fieldId == item.labelId) this.model.selected.splice(i, 1)
        })
      } else {
        labelFieldList[index].active = true
        item.fieldId = item.labelId
        this.model.selected.push(item)
      }
      this.labelFieldList = labelFieldList
    }
    mounted () {
      let query = this.$route.query
      this.handleHeaders['Authorization'] = getAccessToken()
      this.userInfo = this.$store.state.userInfo
      this.getDegreeAllLists()
      this.setEmolumentMin()
      this.getAreaLists().then(() => this.init())
    }
  }
</script>
<style lang="less">
#header2 {
  height:64px;
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
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    .logo {
      width:40px;
      height:40px;
      display: block;
      margin-right: 10px;
    }
    .companyMsg {
      p {
        font-size:14px;
        font-weight:500;
        color:rgba(110,31,150,1);
        line-height:20px;
      }
    }
  }
}
#resume-four {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 130px;
  background: url(../../../assets/images/activity/putIn/bg_createjl.png) 100% repeat #652791;
  .content {
    padding-top: 64px;
    position: relative;
    height: 660px;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
  }
  .h11 {
    font-size:22px;
    font-weight:500;
    color:#fff;
    line-height:32px;
    padding-top: 48px;
    padding-bottom: 38px;
    span {
      color:#FFDC29;
    }
  }
  .slogon-box{
    width:450px;
    height:70px;
    background:rgba(255,255,255,0.1);
    border-radius:100px;
    margin: 0 auto 30px;
    display: flex;
    padding: 0 23px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    &:after {
      width: 0;
      height: 0;
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: rgba(255,255,255,0.1) transparent transparent transparent;
      display: block;
      content: '';
    }
    .img-box{
      width:46px;
      height:46px;
      border-radius: 50%;
      background: white;
      margin-right: 20px;
    }
    .infos{
      flex: 1;
      text-align: left;
    }
    .h33{
      height:16px;
      font-size:16px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:16px;
    }
    .p44{
      height:14px;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:300;
      color:rgba(255,255,255,1);
      line-height:14px;
      margin-top: 6px;
    }
  }
  .myForm {
    width:450px;
    padding: 50px 40px 44px 40px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 20px 2px rgba(0,0,0,0.09);
    border-radius:16px;
    border:1px solid rgba(255,255,255,1);
    margin: 0 auto;
    .formItem {
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
        color: #282828;
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
    }
    .el-select{
      height: 100%;
      line-height: 46px;
      width: 100%;
      input{
        border: none;
        line-height: 46px;
        width: 100%;
        height: 46px;
        background: transparent;
        box-sizing: border-box;
        padding: 0 30px;
      }
    }
    .formItem2 {
      width:370px;
      height:46px;
      line-height: 46px;
      display: flex;
      color: #666666;
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
        color: #282828;
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
    .default-value{
      color: #929292;
      font-size: 14px;
      font-weight: 300;
      height: 48px;
      line-height: 48px;
      text-align: left;
      padding: 0 30px;
    }
    .has-value{
      color: #282828;
      font-size: 14px;
      font-weight: 300;
      height: 48px;
      line-height: 48px;
      text-align: left;
      padding: 0 30px;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .form-header{
      text-align: right;
      margin-bottom: 40px;
      overflow: hidden;
      line-height: 33px;
      h3{
        display: inline-block;
        float: left;
        font-weight:500;
        color:rgba(40,40,40,1);
        font-size:24px;
      }
    }
  }
  .el-cascader{
    background: transparent;
    border: none;
    height: 48px;
    line-height: 48px;
    width: 100%;
    input{
      height: 48px !important;
      line-height: 48px;
      text-align: left;
    }
  }
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding: 24px 0;
  }
  .el-dialog__footer{
    padding: 10px 32px 24px 32px;
  }
  .dialog-footer{
    text-align: right;
    .btn-cancle{
      width:88px;
      height:40px;
      border-radius:25px;
      border:1px solid rgba(220,220,220,1);
      text-align: center;
      line-height: 40px;
      display: inline-block;
      color: #929292;
      cursor: pointer;
    }
    .btn-confirm{
      width:88px;
      height:40px;
      border-radius:25px;
      border:1px solid rgba(220,220,220,1);
      text-align: center;
      line-height: 40px;
      display: inline-block;
      margin-left: 16px;
      width:128px;
      height:40px;
      background:rgba(101,39,145,1);
      border-radius:25px;
      color: white;
      cursor: pointer;
    }
  }
  .innerHtml{
    text-align: left;
    .model-header{
      height:22px;
      line-height:22px;
      margin-top: 20px;
      padding: 0 32px;
    }
    .label{
      font-size:16px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(40,40,40,1);
    }
    .tips{
      font-size:14px;
      font-weight:400;
      color:rgba(146,146,146,1);
    }
    .seleced-box{
      margin: 20px 32px 0 32px;
      border-bottom: 1px solid #E8E9EB;
    }
    .item{
      height:30px;
      background:rgba(255,255,255,1);
      border-radius:17px;
      border:1px solid #8351A7;
      text-align: center;
      font-size:14px;
      font-weight:400;
      color:rgba(101,39,145,1);
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
      margin-bottom: 16px;
      cursor: pointer;
      display: inline-block;
      margin-right: 8px;
      position: relative;
      padding: 0 16px;
      .el-icon-circle-plus{
        position: absolute;
        top: -5px;
        right: -5px;
        transform: rotate(45deg);
        font-size: 16px;
      }
    }
    .scroll-box{
      margin: 16px 16px 0 32px;
      height: 226px;
      overflow: hidden;
      overflow-y: scroll;
    }
    .scroll-box::-webkit-scrollbar {
     width: 6px;
    }
    .scroll-box::-webkit-scrollbar-track {
     background:white;
     -webkit-border-radius: 20px;
     -moz-border-radius: 20px;
     border-radius:20px;
    }
    .scroll-box::-webkit-scrollbar-thumb {
     background:#EDEDED;
     -webkit-border-radius: 20px;
     -moz-border-radius: 20px;
     border-radius:20px;
    }
    .item2{
      height:30px;
      border-radius:17px;
      border:1px solid #BCBCBC;
      text-align: center;
      font-size:14px;
      font-weight:400;
      color:#929292;
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
      margin-bottom: 16px;
      cursor: pointer;
      display: inline-block;
      margin-right: 8px;
      padding: 0 16px;
    }
    .item2_active{
      border:1px solid #8351A7;
      color:rgba(101,39,145,1);
    }
  }
}
</style>