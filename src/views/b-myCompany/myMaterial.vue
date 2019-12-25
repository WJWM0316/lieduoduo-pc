<template>
    <div class="myMaterial">
        <div class="myMaterial-head">
            <p class="myMaterial-head-title">编辑基本信息</p>
            <p class="myMaterial-head-text">如“<span>*</span>”号的内容，是必须填写的项目；置灰内容为公司认证信息，修改请联系 400-065-5788</p>
        </div>
        <div class="from">
            <el-form v-model="from" :rules="rules" label-width="100px">
                <el-form-item prop="img" label="公司logo：">
					<div class="Picture-wrap">
						<Picture
						:value.sync="middleUrl"
						attach-type="avatar"
						:cropper="true"
						cropperRadius="8px"
						cropper-radius="8px"
						@before="avatarLoading = true"
						@fail="avatarLoading = false"
                        @change="pictureInformation"
						v-loading="avatarLoading">
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
                <el-form-item label="公司官网："><el-input v-model="from.website"></el-input></el-form-item>
                <el-form-item prop="intro" label="公司介绍：">
                    <el-input type="textarea" v-model="from.intro"></el-input>
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
                        <span @click="increaseAddress">+</span>
                        <pre @click="increaseAddress">点击添加公司地址</pre>
                    </p>
                    <p class="address" v-for="(item, index) in address" :key="index">
                        <span @click="deleteAddress(item)" class="addressBg">-</span>
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
  delCompanyAddressApi
} from '@/api/company'
import {
  getCompanyAddressDetailApi,
  getCompanyAddressListApi
} from '@/api/register'

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
    return {
      financing: {},
      employees: {},
      mapIndex: 0, // 地图索引
      mapShow: false,
      rules: {
        img: [{ required: true, message: '请选择公司logo', trigger: 'blur' }],
        company_name: [{ required: true, message: '请输入公司全称', trigger: 'blur' }],
        company_shortname: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
        industry: [{ required: true, message: '请输入所属行业', trigger: 'blur' }],
        financing: [{ required: true, message: '请选择融资阶段', trigger: 'blur' }],
        employees: [{ required: true, message: '请选择公司规模', trigger: 'blur' }],
        intro: [{ required: true, message: '请输入公司介绍', trigger: 'blur' }]
      },
      avatarLoading: false,
      from: {
        id: this.information.id,
        company_name: this.information.companyName,
        company_shortname: this.information.companyShortname,
        industry: this.information.industry,
        industry_id: this.information.industryId,
        financing: this.information.financing,
        logo: this.information.id,
        employees: this.information.employees,
        business_license: this.information.businessLicense,
        website: this.information.website,
        intro: this.information.intro
      },
      address: this.information.address,
      middleUrl: this.information.logoInfo.middleUrl,
      albumInfo: this.information.albumInfo
    }
  },
  components: {
    Picture,
    Map
  },
  methods: {
    cancel () {
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
    submit () {},
    receiveAddAdress (data) { // 地图回调
      if (this.mapIndex === 100) { // 判断是添加还是编辑 100 是添加
        data.data = JSON.parse(JSON.stringify(data.data).replace(/area_id/g, 'areaName'))
        // this.address.push(data.data)
        addCompanyAddressApi(this.from.id, data.data)
          .then(res => {
            this.getCompanyAddressList()
          })
      } else {
        data.data.area_id = this.address[this.mapIndex].area_id
        data.data.id = this.address[this.mapIndex].id
        this.getCompanyAddressList()
      }
    },
    getCompanyAddressList () { // 获取公司地址
      getCompanyAddressListApi(this.from.id)
        .then(res => {
          this.address = res.data.data
        })
    },
    deleteAddress (item) {
      delCompanyAddressApi(item.id)
      this.getCompanyAddressList()
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
    },
    pictureAlbumInfo (item) { // 拿到公司图片回调数组
      this.albumInfo = item
    }
  },
  mounted () {
    this.$nextTick(() => {
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
    padding: 48px 82px 30px 82px !important;
}

.myMaterial-head-text{
	font-size: 12px;
	color: $font-color-9;
	font-weight: 400;
}
.myMaterial-head-title{
	color: $font-color-2;
	font-size: 24px;
	line-height: 32px;
	font-weight: 500;
	margin-top: 8px;
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
    span{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        color: #ffffff;
        background: #65C533;
        margin-right: 10px;
        line-height: 12px;
        text-align: center;
        cursor: pointer;
    }
    pre{
        cursor: pointer;
    }
}
.addressBg{
    background: $error-color-1 !important;
}
.foot{
	margin-left: 100px;
	margin-top: 50px;
}
.cresume-upload-wrapper /deep/ .common-list li {
  width: 88px;
  height: 88px;
}
.cresume-upload-wrapper /deep/ .common-list li:nth-child(7n){
  margin-right: 0;
}
</style>
<style>
.myMaterial .el-form{
    margin-top: 48px;
}
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
</style>
