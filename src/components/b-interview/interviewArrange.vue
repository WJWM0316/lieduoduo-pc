<template>
  <!-- 面试安排弹窗 -->
  <div class="interview">
    <el-dialog
      width="432px"
      custom-class="app-dialog"
      append-to-body
      @close="handleClose"
      :visible.sync="dialogStatus">
      <div slot="title">{{interviewtitle}}</div>
        <!-- 面试安排 -->
        <div v-show="type === 'arrange'">
        <div class="arrange">
          <div class="item">
            <div class="name">面试官姓名</div>
            <div class="info">
              <el-input v-model="arrangementInfo.realname" placeholder="请填写"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">面试官手机</div>
            <div class="info">
              <el-input v-model="arrangementInfo.mobile" placeholder="请填写"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">面试职位</div>
            <div class="info">
              <el-select v-model="arrangementInfo.positionId" placeholder="请选择">
              <el-option
                v-for="item in positionOption"
                :key="item.id"
                :label="item.positionName"
                :value="item.id">
              </el-option>
            </el-select>
              </div>
          </div>
          <div class="item">
            <div class="name">面试地址</div>
            <div class="info" @click="selectaddredd()">
              <div class="info-select">
                {{arrangementInfo.addressName}}
              </div>
              </div>
          </div>
        </div>
        <!-- 约面时间 -->
        <div class="intertime">
          <div class="intertime_title">约面时间</div>
          <div>
          <ul class="time_list" v-if="model.dateLists.length">
          <li class="time_row" v-for="(item, index) in model.dateLists" :key="index">
            <i class="el-icon-remove" @click="deleteTime(index)"></i>
            {{item.appointment}}
          </li>
        </ul>
        </div>
          <div class="add_time" v-if="model.dateLists.length < 3">
            <i class="iconfont icon-tianjiashijian bgcolor" style="font-size:12px"></i>
            <span :style="'margin-left:12px;line-height:14px'">添加时间</span>
            <el-date-picker
              v-model="form.date"
              type="datetime"
              @change="getTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              class="date-seleced-interview-time"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        </div>
        <!-- 选择面试地址 -->
        <div class="selectaddress" v-if="type === 'address'">
          <div class="addresslist clearfix" @click.stop="toggleaddress(item)" :key="i" v-for="(item, i) in addresslist">
            <div class="icon">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.cur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
              </div>
            <div class="center">{{item.address}}</div>
            <div class="edit" @click.stop="editaddress(item)">编辑</div>
          </div>
          <div class="addarea" @click="addaddress()">
            <div class="add"><i class="iconfont icon-tianjiashijian bgcolor" style="font-size:12px"></i></div>
            <div class="add-text">添加地址</div>
          </div>
        </div>
        <!-- 添加地址插件 -->
        <map-search v-if="type==='addaddress'" @popCancel="popCancel" @addAdress="addAdress"></map-search>
        <!-- 新增地址 -->
        <div class="arrange" v-if="type === 'editaddress'">
          <div class="item">
            <div class="name">地址</div>
            <div class="info">
              <el-input :disabled="true" v-model="addressobj.address" placeholder="请填写地址"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">门牌</div>
            <div class="info">
              <el-input v-model="addressobj.doorplate" placeholder="请输入门牌号"></el-input>
              </div>
          </div>
        </div>

        <!-- 编辑地址 -->
        <div class="arrange" v-if="type === 'Aeditaddress'">
          <div class="item">
            <div class="name">地址</div>
            <div class="info">
              <el-input :disabled="true" v-model="addressobj.address" placeholder="请填写地址"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">门牌</div>
            <div class="info">
              <el-input v-model="addressobj.doorplate" placeholder="请输入门牌号"></el-input>
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
import MapSearch from 'COMPONENTS/map'
import {
  recruiterPositonList, watchInvitationAPi, setInterviewInfoApi, addressListApi, addCompanyAdressApi, editCompanyAdressApi } from 'API/candidateType'
export default {
  watch: {
    visible (value) {
      if (value) {
        this.getarrangeinfo()
      } else {
        this.dialogStatus = false
      }
    }
  },
  components: { MapSearch },
  computed: {
    ...mapGetters([
      'recruitDataCompanyId'
    ])
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
      arrangementInfo: {
        interviewId: '',
        realname: '',
        mobile: '',
        positionId: '',
        addressId: '',
        addressName: '',
        interviewTime: ''
      },
      type: 'arrange',
      interviewtitle: '面试安排',
      arrangeobj: '',
      addressobj: {
        doorplate: '',
        address: ''
      },
      dialogStatus: false,
      form: {
        date: ''
      },
      addresslist: [],
      positionOption: [],
      model: {
        dateLists: []
      }
    }
  },
  methods: {
    handleSave () {
      if (this.type === 'arrange') {
        if (!this.arrangementInfo.addressId) {
          this.$message.error('请选择一个职位')
          return
        }
        if (!this.arrangementInfo.addressId) {
          this.$message.error('请选择一个地址')
          return
        }
        let timearr = []
        this.model.dateLists.map((v, k) => {
          timearr.push(v.appointmentTime)
        })
        if (!timearr.length) {
          this.$message.error('请至少添加一个约面时间')
          return
        }
        this.arrangementInfo.interviewTime = timearr.join(',')
        setInterviewInfoApi(this.arrangementInfo).then((res) => {
          this.$message.success('安排面试成功')
          this.handleClose()
          this.$emit('change', false)
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      } else if (this.type === 'address') {
        let arr = []
        this.addresslist.map((v, k) => {
          if (v.cur) {
            arr.push(v)
          }
        })
        if (arr.length === 0) {
          this.$message.warning('请选择一个地址')
        } else {
          this.arrangementInfo.addressId = arr[0].id
          this.arrangementInfo.addressName = arr[0].address
          this.type = 'arrange'
        }
      } else if (this.type === 'editaddress') {
        addCompanyAdressApi(this.addressobj).then(res => {
          this.interviewtitle = '选择地址'
          this.type = 'address'
          this.$message.success('添加成功')
          this.selectaddredd()
          this.arrangementInfo.addressId = res.data.data.id
          this.arrangementInfo.addressName = res.data.data.address
        }).catch(e => {
          this.$message.error(e.data.msg)
        })
      } else if (this.type === 'Aeditaddress') {
        editCompanyAdressApi(this.addressobj).then(res => {
          this.interviewtitle = '选择地址'
          this.type = 'address'
          this.$message.success('编辑成功')
          this.selectaddredd()
          this.arrangementInfo.addressId = res.data.data.id
          this.arrangementInfo.addressName = res.data.data.address
        }).catch(e => {
          this.$message.error(e.data.msg)
        })
      }
    },
    handleClose () {
      if (this.type === 'arrange') {
        this.interviewtitle = '面试安排'
        this.$emit('update:visible', false)
      } else if (this.type === 'address') {
        this.interviewtitle = '面试安排'
        this.type = 'arrange'
      } else if (this.type === 'editaddress' || this.type === 'Aeditaddress') {
        this.interviewtitle = '选择地址'
        this.type = 'address'
      }
    },
    getarrangeinfo () {
      watchInvitationAPi({ interviewId: this.interviewId }).then((res) => {
        this.dialogStatus = true
        this.arrangeobj = res.data.data
        this.arrangementInfo.interviewId = res.data.data.interviewId
        this.arrangementInfo.realname = res.data.data.arrangementInfo.realname
        this.arrangementInfo.mobile = res.data.data.arrangementInfo.mobile
        if (res.data.data.positionId === 0) {
          this.arrangementInfo.positionId = ''
        } else {
          this.arrangementInfo.positionId = res.data.data.positionId
        }
        this.arrangementInfo.addressId = res.data.data.addressId
        this.arrangementInfo.addressName = res.data.data.address
        if (res.data.data.arrangementInfo.appointmentList) {
          this.model.dateLists = res.data.data.arrangementInfo.appointmentList
        } else {
          this.model.dateLists = []
        }
        let datalist = { is_online: 1, page: 1, count: 100 }
        recruiterPositonList(datalist).then((res) => {
          let arr = res.data.data
          let hasOnline = []
          arr.map((v, k) => {
            v.cur = false
            if (v.isOnline === 1) {
              hasOnline.push(v)
            }
          })
          if (this.arrangeobj.positionStatus === 0 && this.arrangeobj.positionId !== 0) {
            hasOnline.push({ id: this.arrangeobj.positionId, positionName: this.arrangeobj.positionName })
          }
          this.positionOption = hasOnline
        })
      })
    },
    // 选择地址列表
    selectaddredd () {
      let data = { page: 1, count: 20, company_id: this.recruitDataCompanyId }
      addressListApi(data).then((res) => {
        this.interviewtitle = '选择地址'
        this.type = 'address'
        let arr = res.data.data
        arr.forEach((v, k) => {
          if (this.arrangementInfo.addressId === v.id) {
            v.cur = true
          } else {
            v.cur = false
          }
        })
        this.addresslist = arr
      })
    },
    // 选择地址
    toggleaddress (data) {
      this.addresslist.map((v, k) => {
        v.cur = data === v
      })
    },
    // 编辑地址
    editaddress (data) {
      this.interviewtitle = '编辑地址'
      this.type = 'Aeditaddress'
      this.addressobj = data
      this.addressobj.areaName = this.addressobj.area_id
      this.addressobj.area_id = ''
    },
    popCancel () {
      if (this.type === 'addaddress') {
        this.interviewtitle = '选择地址'
        this.type = 'address'
      }
    },
    addAdress (param) {
      this.type = 'editaddress'
      this.addressobj = param.data
      this.addressobj.areaName = this.addressobj.area_id
      this.addressobj.area_id = ''
    },
    addaddress () {
      this.type = 'addaddress'
    },
    deleteTime (index) {
      this.model.dateLists.splice(index, 1)
    },
    getTime (e) {
      if (!e) return
      let thisTime = e.replace(/-/g, '/')
      this.model.dateLists.push({
        appointment: e,
        active: false,
        appointmentTime: Date.parse(new Date(thisTime)) / 1000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.arrange{
  padding: 0 40px;
  .item{
    height: 40px;
    margin-bottom: 12px;
    .name{
      color:#66666E;
      font-size: 14px;
      width: 70px;
      text-align: right;
      line-height: 40px;
      float: left;
    }
    .info{
      float: right;
      width:272px;
      border-radius:4px;
      height: 38px;
      font-size:14px;
      color:#333333;
      .info-select{
        height: 38px;
        line-height: 38px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0px 14px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
      }
      .el-select{
        width: 100%;
      }
      .el-input.is-disabled .el-input__inner{
        background: #EBEBEB !important;
      }
    }
  }
}
.intertime{
  margin-top: 34px;
  padding: 0 40px;
  .intertime_title{
    color:#333333;
    font-size:14px;
    font-weight: bold;
  }
  .time_list{
    margin-bottom: 6px;
  }
  .time_row{
    cursor: pointer;
    position: relative;
    font-size: 14px;
    margin-top: 16px;
    color: #66666E;;
    i{
      margin-right: 10px;
      color: #ED5C5C;
    }
    .circle{
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    .active{
      border-color: #3e294d;
      background: #3e294d;
    }
  }
  .add_time{
    position: relative;
    cursor: pointer;
    overflow: hidden;
    padding: 12px 0;
    color: #03b3bb;
    display: inline-block;
    padding-left: 10px;
    left: -10px;
  }
}
.selectaddress{
  padding: 0 40px;
  max-height: 425px;
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
  .addresslist{
    height: 60px;
    border-bottom:1px solid #E8E9EB;
    .icon{
      float: left;
      height: 18px;
      width: 18px;
      margin-top: 21px;
      margin-right: 12px;
      .bg{
        color:#00C4CD;
      }
    }
    .center{
      float: left;
      width:270px;
      height:60px;
      font-size:14px;
      display: flex;
      align-items: center;
      word-break: break-all;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:#333333;
    }
    .edit{
      float: right;
      width:28px;
      height:14px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 23px;
      color:#00C4CD;
    }
  }
  .addarea{
    width: 100%;
    margin-top: 24px;
    cursor: pointer;
    .add{
      width: 14px;
      height: 14px;
      float: left;
      margin-right: 8px;
      .bgcolor{
        color:#00C4CD;
      }
    }
    .add-text{
      float: left;
      line-height: 16px;
      font-size:14px;
      color:#00C4CD;
    }
  }
}
</style>
<style lang="scss">
.date-seleced-interview-time{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 90px !important;
  height: 40px;
  padding: 0;
  z-index: 2;
  .el-input__inner{
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 90px !important;
    height: 40px;
    padding: 0;
    z-index: 2;
  }
}
</style>
