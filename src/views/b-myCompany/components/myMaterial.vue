<template>
    <div class="myMaterial">
        <div class="myMaterial-head">
            <p class="myMaterial-head-title">编辑基本信息</p>
            <p class="myMaterial-head-text">如“<span>*</span>”号的内容，是必须填写的项目；置灰内容为公司认证信息，修改请联系 400-065-5788</p>
        </div>
        <div class="from">
            <el-form :model="from" ref="fromMyMaterial" :rules="rules" label-width="100px">
                <el-form-item prop="id" label="公司logo：">
                  <div class="Picture-wrap">
                    <Picture
                    :value.sync="middleUrl"
                    attach-type="avatar"
                    :cropper="true"
                    cropper-radius="8px"
                    :validate-event="true"
                    @change="pictureInformation">
                    <div class="avatar-wrapper">
                      <div class="avatar">
                      <img :src="middleUrl" />
                      <span class="iconfont icon-xiangji"></span>
                      </div>
                    </div>
                    </Picture>
                  </div>
                </el-form-item>
                <el-form-item prop="company_name" label="公司全称："><el-input disabled v-model="from.company_name"></el-input></el-form-item>
                <el-form-item prop="company_shortname" label="公司简称："><el-input disabled v-model="from.company_shortname"></el-input></el-form-item>
                <el-form-item prop="industry" label="所属行业："><el-input disabled v-model="from.industry"></el-input></el-form-item>
                <el-form-item prop="financing"  label="融资阶段：">
                    <el-select v-model="from.financing" placeholder="请选择融资阶段">
                        <el-option
                        v-for="item in financing"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="employees" label="公司规模：">
                    <el-select v-model="from.employees" placeholder="请选择公司规模">
                        <el-option
                        v-for="item in employees"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="website" label="公司官网："><el-input placeholder="请输入公司官网" v-model="from.website"></el-input></el-form-item>
                <el-form-item prop="intro" label="公司介绍：">
                    <el-input type="textarea" show-word-limit maxlength="5000" placeholder="请输入公司介绍" v-model="from.intro"></el-input>
                </el-form-item>
                <el-form-item label="公司图片：">
                  <div class="Picture-wrap-more">
                  <Picture
                    class="cresume-upload-wrapper"
                    :value.sync="albumInfo"
                    :multiple="true"
                    :showTipText="true"
                    :size="20"
                    @change="pictureAlbumInfo"
                    :limit="20" />
                  </div>
                </el-form-item>
                <el-form-item label="公司地址：">
                    <p class="address">
                        <!-- <span @click="increaseAddress">+</span> -->
                        <i @click="increaseAddress" class="iconfont icon-tianjiashijian"></i>
                        <pre @click="increaseAddress">点击添加公司地址</pre>
                    </p>
                    <p class="address" v-for="(item, index) in address" :key="index">
                        <!-- <span @click="deleteAddress(item)" class="addressBg">-</span> -->
                        <i @click="deleteAddress(item)" class="iconfont icon-shanjian addressIconColor"></i>
                        <pre @click="editAddress(index)">{{item.address + '&nbsp;' + item.doorplate}}</pre>
                    </p>
                </el-form-item>
                <div class="foot">
                  <el-button type="primary" @click="submit">保存</el-button>
                  <el-button type="default" @click="cancel">取消</el-button>
                </div>
              </el-form>
        </div>
        <Map
            :componyId="from.id"
            @addAdress="receiveAddAdress"
            :keywords="mapIndex === 100 ? '北京市天安门广场' : address[mapIndex].address"
            @popCancel="shutDown"
            v-if="mapShow"
        ></Map>
    </div>
</template>

<script>
import Picture from '@/components/common/upload/picture'
import Map from '@/components/map/map.vue'

import {
  companyFinancingApi,
  companyEmployeesApi,
  addCompanyAddressApi,
  editCompanyApi,
  delCompanyAddressApi,
  addresseditCompanyAddressApi
} from '@/api/company'
import {
  getCompanyAddressListApi,
  editCompanyAlbumApi
} from '@/api/register'
import {
  urlReg,
  companyIntroReg
} from '@/util/fieldRegular'

export default {
  props: {
    information: {
      type: Object,
      default: () => {}
    },
    materialShow: {
      type: String,
      default: ''
    }
  },
  data () {
    let urlRegReplace = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (urlReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的公司官网'))
      }
    }
    let logoRegReplace = (rule, value, callback) => {
      console.log(this.from.id)
      if (this.from.logo > 0) {
        callback()
      } else {
        callback(new Error('请上传公司logo'))
      }
    }
    return {
      financing: {},
      employees: {},
      mapIndex: 0, // 地图索引
      mapShow: false,
      rules: {
        id: [{ required: true, type: 'number', message: '请选择公司logo', trigger: 'change' }, { validator: logoRegReplace, trigger: 'change' }],
        company_name: [{ required: true, message: '请输入公司全称', trigger: 'blur' }],
        company_shortname: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
        industry: [{ required: true, message: '请输入所属行业', trigger: 'blur' }],
        financing: [{ required: true, message: '请选择融资阶段', trigger: 'change' }],
        employees: [{ required: true, message: '请选择公司规模', trigger: 'change' }],
        website: [{ required: false, message: '请输入正确的公司官网', trigger: 'blur' }, { validator: urlRegReplace, trigger: 'blur' }],
        intro: [{ required: true, min: 20, max: 5000, message: '请输入20到5000字以内的公司介绍', trigger: 'blur' }]
      },
      from: {
        id: this.information.id,
        company_name: this.information.companyName,
        company_shortname: this.information.companyShortname,
        industry: this.information.industry,
        industry_id: this.information.industryId,
        financing: this.information.financing,
        logo: this.information.logoInfo.id,
        employees: this.information.employees,
        business_license: this.information.businessLicense,
        website: this.information.website,
        intro: this.information.intro
      },
      address: this.information.address,
      middleUrl: this.information.logoInfo.middleUrl,
      albumInfo: this.information.albumInfo,
      fromCaching: '' // 表单数据缓存
    }
  },
  components: {
    Picture,
    Map
  },
  methods: {
    cancel () {
      if (this.fromCaching === JSON.stringify(this.from)) {
        let type = '公司主页'
        this.$emit('click', type)
        return
      }
      this.$confirm('确定退出，更新的内容将不被保存', '有编辑中内容尚未保存，确定退出编辑吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let type = '公司主页'
        this.$emit('click', type)
      })
    },
    submit () {
      this.$refs.fromMyMaterial.validate(valid => {
        if (valid) {
          if (this.from.website === '' || this.from.albumInfo || this.from.address) {
            this.$confirm('完善全部信息，可以提高公司的曝光与排名，是否继续完善?', '温馨提示', {
              confirmButtonText: '继续完善',
              cancelButtonText: '直接保存',
              type: 'warning',
              center: true
            }).catch(() => {
              this.saveEditCompany()
            })
          } else {
            this.saveEditCompany()
          }
        }
      })
    },
    saveEditCompany () { // 提交
      let dataAlbumInfo = []
      this.albumInfo.forEach((item, index) => {
        if (index === this.albumInfo.length) return
        dataAlbumInfo.push(item.id)
      })
      dataAlbumInfo = dataAlbumInfo.join(',')
      let datas = { images: dataAlbumInfo }

      editCompanyAlbumApi(this.from.id, datas).then(res => {

      })

      let data = this.from
      editCompanyApi(this.from.id, data).then(res => {
        this.$message.success('保存成功！')
        this.$emit('save') // 刷新父组件数据
        let type = '公司主页'
        this.$emit('click', type)
      })
    },
    receiveAddAdress (data) { // 地图回调
      if (this.mapIndex === 100) { // 判断是添加还是编辑 100 是添加
        addCompanyAddressApi(this.from.id, data.data)
          .then(res => {
            this.getCompanyAddressList()
          })
      } else {
        data.data = JSON.parse(JSON.stringify(data.data).replace(/area_id/g, 'areaId'))
        data.data.id = this.address[this.mapIndex].id
        addresseditCompanyAddressApi(data.data).then(res => {
          this.getCompanyAddressList()
          this.$message.success('编辑成功！')
        })
      }
    },
    getCompanyAddressList () { // 获取公司地址
      getCompanyAddressListApi(this.from.id)
        .then(res => {
          this.address = res.data.data
        })
    },
    deleteAddress (item) {
      delCompanyAddressApi(item.id).then(res => {
        this.getCompanyAddressList()
        this.$message.success('删除成功！')
      })
    },
    shutDown () {
      this.mapShow = false
    },
    increaseAddress () { // 添加地址
      this.mapIndex = 100
      this.mapShow = true
    },
    editAddress (index) { // 编辑地址
      this.mapIndex = index
      this.mapShow = true
    },
    pictureInformation (item) { // 拿到头像回调id
      this.from.logo = item[0].id
      this.middleUrl = item[0].middleUrl
    },
    pictureAlbumInfo (item) { // 拿到公司图片回调数组
      this.albumInfo = item
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fromCaching = JSON.stringify(this.from)
      companyFinancingApi()
        .then(res => {
          this.financing = res.data.data
        })
      companyEmployeesApi()
        .then(res => {
          this.employees = res.data.data
        })
    })
  }
}
</script>

<style lang="scss" scoped>
.myMaterial{
    box-sizing: border-box;
    max-width: 1140px;
    min-width: 960px;
    margin: 30px auto 0 auto;
    background: #ffffff;
    padding: 48px 82px !important;
}

.myMaterial-head-text{
  font-size: 12px;
  color: $font-color-9;
  font-weight: 400;
  line-height:20px;
  margin-top: 8px;
  span{
    color: $error-color-1;
  }
}
.myMaterial-head-title{
  color: $font-color-2;
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  margin-top: 8px;
}
.from{
  margin-top: 48px;
}
.Picture-wrap{
  width: 68px;
}
.avatar-wrapper {
  width: 68px;
  position: relative;
}
.avatar {
  @include img-radius(68px, 68px, 8px);
  color: #ffffff;
  border: 1px solid $border-color-8;
  position: relative;
  cursor: pointer;
  span {
    position: absolute;
    z-index: 3;
    left: 20px;
    top: 15px;
    font-size: 26px;
    opacity: 0;
  }
}
.avatar:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 68px;
  background:rgba(0,0,0,0.5);
  border-radius: 8px;
  z-index: 2;
}
.avatar:hover {
  span {
    opacity: 1;
  }
}
.address{
    font-size: 14px;
    color: $font-color-6;
    font-weight: 400;
    @include flex-v-center;
    i{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        color: #65C533;
        margin-right: 10px;
        line-height: 12px;
        text-align: center;
        cursor: pointer;
    }
    pre{
        cursor: pointer;
    }
}
.addressIconColor{
    color: $error-color-1 !important;
}
.foot{
  margin-left: 100px;
  margin-top: 50px;
}
.cresume-upload-wrapper /deep/ .common-list li {
  width: 88px;
  height: 88px;
}
</style>
<style>
.from input{
    width: 382px;
}
.from textarea{
    width: 520px;
    height: 140px;
}
.from .el-form-item{
  margin-bottom: 30px;
}
.from .el-form-item:nth-of-type(9){
  margin-bottom: 20px;
}
.from .el-form-item__label::before{
    color: #F45322 !important;
}
.from .el-form-item__content{
  width: calc(100%-100px);
}
.from .foot button{
  width: 120px;
  height: 40px;
}
.myMaterial .el-form-item:nth-of-type(1) .el-form-item__label:nth-of-type(1){
  height: 70px;
  line-height: 70px;
}
.myMaterial .el-textarea{
  width: 520px;
}
.myMaterial .foot .el-button--default{
  margin-left: 24px;
}
</style>
