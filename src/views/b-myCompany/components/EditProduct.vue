<template>
  <div class="EditProduct">
    <div class="EditProduct-head">
      <p class="EditProduct-head-title">产品介绍</p>
      <p class="EditProduct-head-text">
        如“<span>*</span>”号的内容，是必须填写的项目
      </p>
    </div>
    <div class="from">
      <el-form :model="from" ref="fromEditProduct" :rules="rules" label-width="110px">
        <el-form-item prop="logo" label="产品logo：">
          <div class="Picture-wrap">
            <Picture
            :value.sync="middleUrl"
            attach-type="avatar"
            :cropper="true"
            :validate-event="true"
            cropper-radius="8px"
            @change="pictureInformation">
            <div class="avatar-wrapper">
              <div class="avatar" :class="{ 'avatarBg' : !middleUrl }">
              <img :src="middleUrl" />
              <span class="iconfont icon-xiangji"></span>
              </div>
            </div>
            </Picture>
          </div>
        </el-form-item>
        <el-form-item prop="product_name" label="产品名称："><el-input show-word-limit maxlength="20" placeholder="请输入产品名称" v-model="from.product_name"></el-input></el-form-item>
        <el-form-item prop="site_url" label="产品官网："><el-input placeholder="请输入产品官网" v-model="from.site_url"></el-input></el-form-item>
        <el-form-item prop="slogan" label=" 产品slogan："><el-input show-word-limit maxlength="30" placeholder="一句话简单介绍公司的产品定位" v-model="from.slogan"></el-input></el-form-item>
        <el-form-item prop="lightspot" label="产品亮点：">
            <el-input type="textarea" show-word-limit maxlength="50" placeholder="可从产品涉及的市场、业务、用户和功能等方面进行描述..." v-model="from.lightspot"></el-input>
        </el-form-item>
        <div class="foot">
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="default" @click="cancel">取消</el-button>
          <el-button v-if="from.id" type="text" @click="deleteProduct">删除产品</el-button>
        </div>
      </el-form>
    </div>
    <div class="EditProduct-Example">
      <p class="EditProduct-Example-title">产品示例:</p>
      <div class="EditProduct-Example-main">
        <div class="EditProduct-Example-main-img">
          <img :src="cdnPath + 'exampleLogo.png'"/>
        </div>
        <div class="EditProduct-Example-main-text">
          <p class="Example-main-text-productName">猎多多</p>
          <p class="Example-main-text-slogan">互联网精英招聘神器</p>
          <p class="Example-main-text-lightspot">专注约面的互联网精英求职招聘神器</p>
          <p class="Example-main-text-siteUrl">http://www.lieduoduo.com/</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Picture from '@/components/common/upload/picture'

import {
  deleteCompanyProductInfosApi, // 删除
  editCompanyProductInfosApi, // 编辑
  createCompanyProductApi, // 创建
  getCompanyProductInfosApi // 获取
} from '@/api/register'

import {
  urlReg
} from '@/util/fieldRegular'

export default {
  components: {
    Picture
  },
  data () {
    let urlRegReplace = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (urlReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的产品官网！'))
      }
    }
    return {
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`,
      from: {
        logo: null,
        product_name: '',
        site_url: '',
        slogan: '',
        lightspot: ''
      },
      middleUrl: '',
      fromCaching: '', // 表单数据缓存
      rules: {
        logo: [{ required: true, type: 'number', message: '请上传产品logo', trigger: 'change' }],
        product_name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        site_url: [{ required: false, message: '请输入产品官网', trigger: 'change' }, { validator: urlRegReplace, trigger: 'blur' }],
        slogan: [{ required: true, message: '请输入产品slogan', trigger: 'blur' }],
        lightspot: [{ required: true, message: '请输入产品亮点', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    let id = this.$route.query.id
    let companyid = this.$route.query.companyId
    if (id) {
      getCompanyProductInfosApi(id).then(res => {
        let data = res.data.data
        this.from = {
          company_id: data.companyId,
          id: data.id,
          product_name: data.productName,
          site_url: data.siteUrl,
          slogan: data.slogan,
          lightspot: data.lightspot,
          logo: data.logo.id
        }
        this.middleUrl = data.logo.middleUrl
        this.fromCaching = JSON.stringify(this.from)
      })
    } else {
      this.from.company_id = companyid
      this.fromCaching = JSON.stringify(this.from)
    }
  },
  methods: {
    pictureInformation (item) { // 拿到头像回调id
      console.log(item)
      this.from.logo = item[0].id
      this.middleUrl = item[0].middleUrl
    },
    submit () {
      this.$refs.fromEditProduct.validate((valid, validText) => {
        if (valid) {
          if (this.from.id) { // 根据是否有id来判断是新建产品还是编辑已有产品
            editCompanyProductInfosApi(this.from).then(res => {
              this.$message.success('编辑产品成功！')
              this.$router.push({ name: 'myCompany' })
            })
          } else {
            createCompanyProductApi(this.from).then(res => {
              this.$message.success('创建产品成功！')
              this.$router.push({ name: 'myCompany' })
            })
          }
        } else {
          this.$message.error(validText[Object.keys(validText)[0]][0].message)
        }
      })
    },
    deleteProduct () {
      this.$confirm('删除后，该产品将不再显示，确定永久删除该产品？', '确认删除产品吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteCompanyProductInfosApi(this.from.id).then(res => {
          this.$message.success('删除产品成功！')
          this.$router.push({ name: 'myCompany' })
        })
      })
    },
    cancel () {
      if (this.fromCaching === JSON.stringify(this.from)) {
        this.$router.push({ name: 'myCompany' })
        return
      }
      this.$confirm('确定退出，更新的内容将不被保存', '有编辑中内容尚未保存，确定退出编辑吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push({ name: 'myCompany' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.EditProduct{
    box-sizing: border-box;
    max-width: 1140px;
    min-width: 960px;
    margin: 30px auto 30px auto;
    background: #ffffff;
    padding: 48px 82px 30px 82px !important;
    position: relative;
    min-height: calc(100vh - 120px);
}
.EditProduct-head-text{
	font-size: 12px;
	color: $font-color-9;
  font-weight: 400;
  line-height:20px;
  margin-top: 8px;
  span{
    color: $error-color-1;
  }
}
.EditProduct-head-title{
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
.avatarBg{
  background: url('./../../../assets/images/cp_logo.png');
  background-position: center center;
  background-size: 100% 100%;
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
.foot{
  margin-left: 110px;
  margin-top: 50px;
  button{
    width: 120px;
    height: 40px;
  }
}
.EditProduct-Example{
  width: 270px;
  position: absolute;
  top: 135px;
  right: 117px;
  .EditProduct-Example-title{
    color: $font-color-6;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .EditProduct-Example-main{
    margin-top: 25px;
    @include clearfix;
    .EditProduct-Example-main-img{
      width: 56px;
      height: 56px;
      float: left;
      margin-right: 14px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .EditProduct-Example-main-text{
      float: left;
      .Example-main-text-productName{
        font-size: 16px;
        font-weight: 500;
        color: $font-color-3;
      }
      .Example-main-text-slogan{
        font-size: 14px;
        color: $font-color-6;
        margin-top: 8px;
        font-weight:400;
      }
      .Example-main-text-lightspot{
        margin-top: 10px;
        font-size: 12px;
        font-weight:400;
        color: #99999B;
      }
      .Example-main-text-siteUrl{
        display: inline-block;
        margin-top: 20px;
        color: $main-color-1;
        font-size: 12px;
      }
    }
  }
}
</style>
<style>
.EditProduct .el-form-item:nth-of-type(1) .el-form-item__label:nth-of-type(1){
  height: 70px;
  line-height: 70px;
}
.EditProduct .el-input{
  width: 382px;
}
.EditProduct .el-textarea{
  width: 520px;
}
.EditProduct .foot .el-button--default{
  margin-left: 24px;
}
.EditProduct textarea{
  width: 520px;
  height: 140px;
}
</style>
