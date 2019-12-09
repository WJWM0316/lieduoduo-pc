<template>
 <div class="wrap">
   <my-header ref="header" v-if="hasRequest"></my-header>
   <div class="resumePost">
     <div class="middle">
       <div class="contain">
        <h3 class="title"><span>3分钟</span>创建微简历，<span>1000+名企</span>高薪职位任你选</h3>
        <img class="slogon-box c-first-create-resume" v-if="step === 1" :src="cdnPath + 'img_sentence_01.png'"/>
        <img class="slogon-box" v-if="step === 2" :src="cdnPath + 'img_sentence_02.png'"/>
        <img class="slogon-box" v-if="step === 3" :src="cdnPath + 'img_sentence_03.png'"/>
        <img class="slogon-box" v-if="step === 4" :src="cdnPath + 'img_sentence_04.png'"/>
      </div>
     </div>
     <keep-alive>
        <component :is="activeComponent" :step.sync="step" />
      </keep-alive>
   </div>
 </div>
</template>
<script>
import myHeader from './components/header.vue'
import FirstStep from './components/step1'
import SecondStep from './components/step2'
import ThirdStep from './components/step3'
import FourStep from './components/step4'
import { searchResumeStepApi } from '@/api/putIn'

export default {
  components: {
    myHeader,
    FirstStep,
    SecondStep,
    ThirdStep,
    FourStep
  },
  data () {
    return {
      cdnPath: `${this.$cdnPath}/images/`,
      hasRequest: false,
      step: 0 // 创建步数
    }
  },
  computed: {
    activeComponent () {
      let component = ''
      switch (this.step) {
        case 1:
          component = 'first-step'
          break
        case 2:
          component = 'second-step'
          break
        case 3:
          component = 'third-step'
          break
        case 4:
          component = 'four-step'
          break
      }
      return component
    }
  },
  created () {
    this.getStep()
  },
  methods: {
    getStep () {
      searchResumeStepApi().then(({ data }) => {
        this.hasRequest = true
        let stepData = data.data
        let userInfo = this.$store.getters.userInfo
        userInfo.name = stepData.card.name
        userInfo.avatar = stepData.card.avatar
        this.$store.dispatch('setUserInfo', userInfo)
        this.step = stepData.step >= 4 ? 4 : stepData.step
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  .resumePost {
    padding: 64px 0 100px 0;
    height: 100vh;
    min-height: 900px;
    box-sizing: border-box;
    background: url('../../assets/images/create_bg.jpg') repeat $bg-color-4;
    background-size: 30%;
    & /deep/ {
      .step-wrapper {
        width: 450px;
        background: #fff;
        border-radius: 16px;
        padding: 50px 40px 40px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: $shadow-3;
        .el-form {
          position: relative;
          width: 100%;
        }
        .el-select, .el-cascader {
          width: 100%;
        }
        .input-value-length {
          line-height: 46px;
          color: $title-color-3;
          font-size: 14px;
          i {
            color: $main-color-1;
          }
        }
        .el-input__inner, .c-button-radio {
          border: none !important;
          background: $bg-color-1 !important;
        }
        .c-button-radio.active {
          background: $bg-color-5 !important;
        }
        .separator, .c-picker-separator {
          color: $title-color-2;
        }
      }
    }
    .middle {
      position: relative;
      background-repeat: no-repeat;
      background-position: bottom;
      width: 100%;
      text-align: center;
      background-size: auto 112px;
    }
    .title {
      font-size:22px;
      font-weight:700;
      color:#fff;
      line-height:32px;
      padding-top: 48px;
      span {
        color: $sub-color-1;
      }
    }
    .c-first-create-resume.slogon-box {
      margin: 38px auto 50px;
    }
    .slogon-box{
      width:450px;
      height:auto;
      margin: 38px auto 20px;
    }
  }
}
</style>
