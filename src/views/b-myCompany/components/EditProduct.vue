<template>
  <div class="EditProduct">
    <div class="EditProduct-head">
      <p class="EditProduct-head-title">产品介绍</p>
      <p class="EditProduct-head-text">
        如“<span>*</span>”号的内容，是必须填写的项目
      </p>
    </div>
    <div class="from">
      <el-form v-model="from" :rules="rules" label-width="110px">
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
        <el-form-item prop="productName" label="产品名称："><el-input placeholder="请输入产品名称" v-model="from.productName"></el-input></el-form-item>
        <el-form-item label="产品官网："><el-input placeholder="请输入产品官网" v-model="from.siteUrl"></el-input></el-form-item>
        <el-form-item prop="slogan" label=" 产品slogan："><el-input placeholder="一句话简单介绍公司的产品定位" v-model="from.slogan"></el-input></el-form-item>
        <el-form-item prop="lightspot" label="公司介绍：">
            <el-input type="textarea" placeholder="可从产品涉及的市场、业务、用户和功能等方面进行描述..." v-model="from.lightspot"></el-input>
        </el-form-item>
        <div class="foot">
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="default" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentProduct: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      avatarLoading: false,
      from: {
        id: this.currentProduct.id,
        productName: this.currentProduct.productName,
        siteUrl: this.currentProduct.siteUrl,
        slogan: this.currentProduct.slogan,
        lightspot: this.currentProduct.lightspot
      },
      middleUrl: this.currentProduct.logoInfo.middleUrl,
      rules: {
        img: [{ required: true, message: '请选择公司logo', trigger: 'blur' }],
        productName: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        slogan: [{ required: true, message: '请输入产品slogan', trigger: 'blur' }],
        lightspot: [{ required: true, message: '请输入公司介绍', trigger: 'blur' }]
      }
    }
  },
  methods: {
    pictureInformation (item) { // 拿到头像回调id
      this.from.logo = item[0].id
    },
    submit () {},
    cancel () {}
  }
}
</script>

<style lang="scss" scoped>
.EditProduct{
    box-sizing: border-box;
    max-width: 1140px;
    min-width: 960px;
    margin: 30px auto 0 auto;
    background: #ffffff;
    padding: 48px 82px 30px 82px !important;
}
.EditProduct-head-text{
	font-size: 12px;
	color: $font-color-9;
	font-weight: 400;
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
  margin-left: 100px;
  margin-top: 50px;
}
</style>
