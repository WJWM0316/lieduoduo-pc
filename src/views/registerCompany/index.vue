<template>
<div class="register-all">
  <div id="register" class="register">
      <div class="b-title">猎多多</div>
      <div class="l-title">精英人才招聘神器</div>
      <div class="registerBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写真实姓名"></el-input>
          </el-form-item>
        </el-form>
      </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'login',
  components: {
  }
})
export default class login extends Vue {
  ruleForm = {
    name: ''
  }
  rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  }
}
</script>
<style lang="less" scoped="scoped">
.register-all{
  height: 100%;
}
#register {
  padding: 0;
  background: #652791 url("https://lieduoduo-uploads-test.oss-cn-shenzhen.aliyuncs.com/front-assets/web/images/bg_loginpage.png") no-repeat;
  z-index: 100;
  display: flex;
  min-height: 100%;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  .register {
    cursor: pointer;
  }
  .title_p {
    font-size:30px;
    font-weight: bold;
    color:rgba(0,196,205,1);
    line-height:38px;
    margin: 0 0 42px 0;
  }
  .b-title{
    width: 100%;
    text-align: center;
    color:rgba(255,255,255,1);
    font-size: 56px;
    font-weight: bold;
    height: 56px;
    line-height: 56px;
    margin-top: 66px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .l-title{
    color:rgba(255,255,255,1);
    font-size:22px;
    font-weight: 300;
    height: 28px;
    line-height: 28px;
    margin-bottom: 49px;
  }
  .registerBox {
    width:562px;
    background: #fff;
    border-radius: 8px;
    box-shadow:0px 8px 12px 0px rgba(40,40,40,0.2);
    padding: 52px 72px 30px 72px;
    height: 620px;
    box-sizing: border-box;
    position: relative;
    z-index: 101;
    box-shadow: unset;
    -webkit-animation-duration: .49s;
    animation-duration: .49s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
<style>
.registerBox .el-form-item{
  position: relative;
}
.registerBox .el-form-item__label{
  position: absolute;
  left: 100px;
  line-height: 50px;
  z-index: 1;
}
.registerBox .el-form-item__label::before{
  color: #FF7F4C!important;
  vertical-align: sub;
}
.registerBox .el-form-item__content{
  line-height: 50px;
  position: relative;
  font-size: 14px;
  width: 418px;
  margin-right: 100px;
}
.registerBox .el-input .el-input__inner{
  text-align: right;
  height: 50px;
  line-height: 50px;
}
.registerBox .el-input .el-input__inner::placeholder{
  color: #A29CA6;
}
</style>
