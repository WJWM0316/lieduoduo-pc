<template>

<div id="resume-four">
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
        @focus="focus('#cityNum')"
        @blur="blur('#cityNum')"
        :show-all-levels="false"
        :props="{
          value:'areaId',
          label:'title',
          children:'children'
        }"
        @change="choiceCity"
      ></el-cascader>
      <i class="el-icon-caret-bottom defalut-position" id="cityNum"></i>
    </div>
    <select-position-type
      v-model.number="form.positionId"
      :label="form.position"
      @on-selected="resultEvent">
      <div class="formItem">
        <div class="default-value" v-if="!form.position">请选择期望职位</div>
        <div class="has-value" v-else>{{form.position}}</div>
        <i class="el-icon-caret-bottom defalut-position" id="position"></i>
      </div>
    </select-position-type>
    <select-labels
        ref="labels"
        v-model="form.fieldId"
        valid-filter-text="请选期望领域"
        :limit="3"
        title="请选期望领域"
        type="field"
        @on-selected="handleSelectLabeld">
        <div class="formItem">
          <div class="default-value" v-if="!form.fields.length">请选择期望领域</div>
          <div class="has-value" v-else>
            <span
              v-for="(item, index) in form.fields"
              :key="index">
              {{`${item.field || item.name}${form.fields.length - 1 !== index ? '、' : ''}`}}
            </span>
          </div>
          <i class="el-icon-caret-bottom defalut-position" id="fields"></i>
        </div>
    </select-labels>
    <div class="formItem2">
      <div class="start-time">
        <el-select v-model="form.salaryFloor" placeholder="请选择期望薪资" @change="changeEmolumentMin" @focus="focus('#salaryFloor')"
        @blur="blur('#salaryFloor')">
          <el-option
            v-for="item in emolumentMinList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <i class="el-icon-caret-bottom defalut-position" id="salaryFloor"></i>
      </div>～ &nbsp;&nbsp;
      <div class="end-time">
        <el-select v-model="form.salaryCeil" placeholder="期望薪资" @focus="focus('#salaryCeil')"
        @blur="blur('#salaryCeil')">
          <el-option
            v-for="item in emolumentMaxList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <i class="el-icon-caret-bottom defalut-position" id="salaryCeil"></i>
      </div>
    </div>

    <div class="btn-box">
      <div class="over-lay">
        <div class="btn-pre" @click="lastStep">上一步</div>
        <div class="btn-confirm" @click="submit">完成</div>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import SelectPositionType from '@/components/selectPositionType'
import SelectLabels from 'COMPONENTS/selectLabels'
import {
  setResumeFourthApi,
  getResumeFourStepApi,
  getAreaListsApi
} from '../../../api/putIn'
@Component({
  name: 'resumeFourthPost',
  methods: {
  },
  components: {
    SelectPositionType,
    SelectLabels
  }
})
export default class resumeFourthPost extends Vue {
    form = {
      salaryFloor: '',
      salaryCeil: '',
      positionId: '',
      fields: [],
      position: '',
      city: '',
      fieldId: '',
      cityNum: [],
      placeholder: ''
    }
    cityList = []
    emolumentMaxList = []
    emolumentMinList = []
    mounted () {
      this.userInfo = this.$store.state.userInfo
      this.setEmolumentMin()
      this.getAreaLists().then(() => this.init())
    }
    init () {
      return getResumeFourStepApi().then(res => {
        let infos = res.data.data
        this.setEmolumentMax(infos.salaryCeil)
        this.form.positionId = infos.positionId
        this.form.position = infos.position
        this.form.salaryFloor = infos.salaryFloor
        this.form.salaryCeil = infos.salaryCeil
        this.form.fields = infos.fields
        this.form.cityNum = [infos.provinceNum, infos.cityNum]
      })
    }
    submit () {
      let params = {
        positionId: this.form.positionId,
        salaryFloor: this.form.salaryFloor,
        salaryCeil: this.form.salaryCeil,
        cityNum: this.form.cityNum[this.form.cityNum.length - 1],
        fieldIds: this.form.fields.map(field => field.labelId).join(',')
      }
      let title = ''
      if (!params.cityNum) {
        title = '请选择期望城市'
      } else if (!params.positionId) {
        title = '请选择期望职位'
      } else if (!params.fieldIds) {
        title = '请选择期望领域'
      } else if (!params.salaryFloor) {
        title = '请选择期望薪资'
      } else if (!params.salaryCeil) {
        title = '请选择期望薪资'
      }
      if (title) {
        this.$message.error(title)
        return
      }
      setResumeFourthApi(params).then(() => {
        // this.$router.replace({ name: 'index' })
        window.location.replace('/index')
      })
    }
    handleSelectLabeld (labels) {
      this.form.fields = labels
    }
    handleBeforeClose () {

    }
    choiceCity (e) {
      this.form.cityNum = e
    }
    getAreaLists () {
      return getAreaListsApi({ level: 3 }).then(res => {
        this.cityList = res.data.data
        this.cityList.forEach(item => {
          item.children.forEach(item1 => {
            let result = JSON.stringify(item1.children)
            if (result === '[]') delete item1.children
          })
        })
      })
    }
    changeEmolumentMin (e) {
      this.form.salaryCeil = ''
      this.setEmolumentMax(e)
    }
    setEmolumentMax (num) {
      let max = 0
      let list = []
      if (num <= 10) {
        max = num + 5
      } else if (num > 10 && num < 31) {
        max = num * 2
      } else if (num > 34 && num < 71) {
        max = num + 30
      } else if (num > 74 && num < 96) {
        max = num + 30
      } else if (num > 99 && num < 251) {
        max = num * 2
      }

      for (let i = num + 1; i <= max; i++) {
        list.push({
          label: `${i}k`,
          value: i
        })
      }

      this.emolumentMaxList = list
    }
    setEmolumentMin () {
      let max = 250
      let i = 0
      let list = []

      while (i < max) {
        if (i < 30) {
          i++
        } else if (i < 100) {
          i += 5
        } else if (i < max) {
          i += 10
        }
        list.push({
          label: `${i}k`,
          value: i
        })
      }
      this.emolumentMinList = list
    }
    resultEvent (res) {
      this.form.positionId = res.labelId
      this.form.position = res.name
      this.form.fieldId = ''
      this.form.fields = []
      if (this.$refs.labels) this.$refs.labels.handleClear()
    }
    lastStep () {
      this.$parent.step--
    }
    focus (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position icon_active'
    }
    blur (dom) {
      document.querySelector(dom).className = 'el-icon-caret-bottom defalut-position'
    }
}
</script>
<style lang="scss">
#resume-four {
  .el-input__suffix{
    display: none;
  }
  .defalut-position {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    color: #CDCBCF;
    transition: all ease .3s;
    z-index: 222
  }
  .icon_active{
    transform: translateY(-50%) rotate(180deg);
  }
  .content {
    position: relative;
    // background: #00b38a;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 100%;
    background-size: auto 112px;
  }
  .h11 {
    font-size:22px;
    font-weight:700;
    color:#fff;
    line-height:32px;
    padding-bottom: 38px;
    span {
      color:#FFDC29;
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
    position: relative;
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
      .el-cascader__label {
        padding: 0 30px;
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
        position: relative;
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
        border:1px solid $bg-color-4;
        box-sizing: border-box;
        display: inline-block;
        color: $main-color-1;
        vertical-align: middle;
      }
      .btn-confirm{
        width:240px;
        height:50px;
        background: $bg-color-4;
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
        border:1px solid $bg-color-4;
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
      height: 48px;
      line-height: 48px;
      text-align: left;
      padding: 0 30px;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      color:rgba(40,40,40,1);
      font-size:14px;
      font-weight:400;
    }
    .form-header{
      text-align: center;
      margin-bottom: 40px;
      overflow: hidden;
      line-height: 33px;
      h3{
        display: inline-block;
        // float: left;
        font-weight:700;
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
}
</style>
