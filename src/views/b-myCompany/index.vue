<template>
<div>
    <div class="my-company">
        <div class="companyInformation">
            <div class="companyInformation-head">
                <div class="avatar">
                    <img v-if="information.logoInfo" :src="information.logoInfo.middleUrl"/>
                </div>
                <div class="companyInformation-head-button">
                    <el-button type="text" @click="toShare()"><i class="iconfont icon-fenxiang"></i> 分享</el-button>
                    <el-button type="text" v-if="isCompanyAdmin" @click="toEdit('编辑公司')"><i class="iconfont icon-bianji"></i> 编辑</el-button>
                </div>
            </div>
            <p class="companyTitle">{{information.companyName}}</p>
            <p class="companyIndustry">{{information.companyShortname}} | {{information.industry}} | {{information.financingInfo}} | {{information.employeesInfo}}</p>
            <div class="companyIntroduction">
                <p class="companyIntroduction-title">
                    <i class="iconfont icon-qiye"></i>公司简介
                </p>
                <p v-if="information.intro" class="companyIntroduction-text">{{information.intro}}</p>
                <p v-else>尚未添加公司简介<el-button @click="toEdit('编辑公司')" v-if="isCompanyAdmin" type="text">去添加</el-button></p>
            </div>
            <div class="companySurroundings" v-if="information.albumInfo && information.albumInfo.length > 1">
                <div class="companySurroundings-bnt" v-if="bntLeftShow" @click="clickBnt('left')">
                    <i class="iconfont icon-right Spin"></i>
                </div>
                <div class="companySurroundings-bnt companySurroundings-rightbnt"  v-if="bntRightShow" @click="clickBnt('right')">
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="companySurroundings-wrap" ref="companySurroundingsWrap">
                    <img class="img" v-for="(item, index) in information.albumInfo" :key="index" :src="item.smallUrl" :large="item.url"  :preview="0"/>
                </div>
            </div>
            <div class="companyAddress">
                <p class="companyAddress-title">
                    <i class="iconfont icon-dizhi"></i>公司地址
                </p>
                <ul v-if="information.address">
                    <li v-for="(item, index) in information.address" :key="index">{{ item.address + '&nbsp;' + item.doorplate }}</li>
                </ul>
                <div class="onFondAddress" v-if="information.address && !information.address.length">尚未添加公司地址<el-button @click="toEdit('编辑公司')" v-if="isCompanyAdmin" type="text">去添加</el-button></div>
            </div>
            <div class="companyWebsite">
                <p class="companyWebsite-title">
                    <i class="iconfont icon-guanwang-"></i>公司官网
                </p>
                <a v-if="information.website" :href="information.website" target="_blank">{{information.website}}</a>
                <div v-else>尚未添加公司官网<el-button @click="toEdit('编辑公司')" v-if="isCompanyAdmin" type="text">去添加</el-button></div>
            </div>
        </div>
        <div class="companyProduct">
            <div class="companyProduct-head">
                <p>公司产品</p>
                <el-button v-if="isCompanyAdmin && information.product && information.product.length" type="text" @click="toEdit('编辑产品')"><i class="iconfont icon-tianjia-"></i>添加产品</el-button>
            </div>
            <company-productList @click="toEdit" :product="information.product"></company-productList>
            <div v-loading="getLoading" v-if="!getLoading && !information.product.length" class="noFound">
                <no-found tipText='尚未添加公司产品' imageUrl='/img/fly.26a25d51.png'>
                    <el-button class="null-produc-bnt" v-if="isCompanyAdmin" @click="toEdit('编辑产品')" type="primary">去添加</el-button>
                </no-found>
            </div>
        </div>
    </div>
    <sharePopup
    :data="information"
    :visible.sync="showSharePopup"></sharePopup>
</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import companyProductList from './components/companyProductList'
import noFound from '@/components/noFound'
import myMaterial from './components/myMaterial'
import EditProduct from './components/EditProduct'
import sharePopup from '@/components/common/sharePopup/index'
// 引入查看大图插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import { companyDetailApi } from '@/api/company'
Vue.use(preview)

@Component({
  name: 'myCompany',
  computed: {
    ...mapState({
      isCompanyAdmin: state => state.roleInfos.isCompanyAdmin
    })
  },
  watch: {
    transformWidth () {
      if (this.transformWidth < 100) {
        this.bntLeftShow = false
      } else {
        this.bntLeftShow = true
      }
      if (this.transformWidth > (this.information.albumInfo.length - 5) * 100) {
        this.bntRightShow = false
      } else {
        this.bntRightShow = true
      }
    }
  },
  components: {
    companyProductList,
    myMaterial,
    noFound,
    EditProduct,
    sharePopup
  }
})
export default class myCompany extends Vue {
    bntLeftShow = false
    bntRightShow = true
    transformWidth = 0 // 轮播图平移
    information = {}
    showSharePopup = false
    getLoading = true
    mounted () {
      this.companyDetail()
    }
    toShare () {
      this.showSharePopup = true
    }
    toEdit (type) {
      if (type === '编辑产品') {
        this.$router.push({
          name: 'EditProduct',
          query: {
            id: '',
            companyId: this.information.id
          }
        })
      } else if(type === '编辑公司') {
        this.$router.push({ name: 'myMaterial' })
      }
    }
    companyDetail () {
      companyDetailApi()
        .then(res => {
          let data = res.data.data
          if (!data.website.startsWith('http') && data.website) {
            data.website = 'http://' + data.website
          }
          data.product.forEach((item, index) => {
            if (!item.siteUrl.startsWith('http') && item.siteUrl) {
              data.product[index].siteUrl = 'http://' + data.product[index].siteUrl
            }
          })
          data.financing = parseInt(data.financing)
          data.employees = parseInt(data.employees)
          this.information = data
          this.getLoading = false
        }).catch(res => {
          this.getLoading = true
        })
    }
    clickBnt (displacement) {
      let value
      if (displacement === 'left') {
        value = -10
      } else if (displacement === 'right') {
        value = 10
      }

      this.transformAnimation(value) // 执行动画
    }
    transformAnimation (value) {
      let timer = () => {
        this.transformWidth += value
        if (this.transformWidth % 100 === 0) return
        this.$refs.companySurroundingsWrap.style.transform = `translate3d(-${this.transformWidth}px, 0, 0)`
        setTimeout(() => {
          timer()
        }, 20)
      }
      timer()
    }
}
</script>

<style lang="scss" scoped>
%company-title{
    color: $font-color-3;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    i{
        margin-right: 10px;
        font-size: 17px;
    }
}
.my-company{
    min-width: 940px;
    max-width: 1140px;
    margin: 32px auto 32px auto;
    @include clearfix;
}
.companyInformation{
    background: #ffffff;
    width: 50%;
    float: left;
    padding: 0 56px 64px 56px;
    box-sizing: border-box;
    min-height: calc(100vh - 120px);
    border-radius: 8px;
    .companyInformation-head{
        margin-top: 64px;
        @include flex-v-center;
        @include flex-justify-between;
        .avatar{
          border: 1px solid $border-color-8;
            @include img-radius(90px, 90px, 8px);
        }
        .companyInformation-head-button{
            button{
                margin-left: 24px;
                &:nth-child(1){
                  i{
                    font-size: 14px;
                  }
                }
            }
        }
    }
    .companyTitle{
        margin-top: 30px;
        font-size: 34px;
        color: $font-color-3;
        font-weight: 700;
        button{
            margin-left: 10px;
        }
    }
    .companyIndustry{
        margin-top: 14px;
        font-size: 18px;
        color: $font-color-6;
    }
    .companyIntroduction{
        margin-top: 40px;
        .companyIntroduction-title{
            @extend %company-title;
        }
        .companyIntroduction-text{
            font-size: 14px;
            font-weight: 400;
            color: $font-color-6;
            line-height: 24px;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
        }
        button{
            margin-left: 10px;
        }
    }
    .companySurroundings{
        cursor: pointer;
        position: relative;
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
        height: 90px;
        border-radius: 4px;
        .companySurroundings-bnt{
            display: none;
            .Spin{
              transform: rotate(180deg);
            }
        }
        &:hover{
            .companySurroundings-bnt{
                display: block;
                color: #ffffff;
                position: absolute;
                height: 88px;
                width: 20px;
                background: #00000080;
                z-index: 2;
                @include flex-center;
                border-radius: 4px 0 0 4px;
                box-sizing: border-box;
            }
            .companySurroundings-rightbnt{
                right: 0;
                border-radius: 0 4px 4px 0;
            }
        }
        .companySurroundings-wrap{
            white-space: nowrap;
            .img{
                display: inline-block;
                @include bg-image-radius(88px, 88px, 4px);
                border: 1px solid $border-color-8;
                margin-right: 10px;
                box-sizing: border-box;
            }
        }
    }
    .companyAddress{
        margin-top: 50px;
        .companyAddress-title{
            @extend %company-title;
        }
        li{
            color: $font-color-6;
            list-style: disc;
            font-weight: 400;
            line-height: 24px;
            margin-bottom: 8px;
            margin-left: 15px;
        }
        button{
            margin-left: 10px;
        }
        .onFondAddress{
          color: $font-color-6;
        }
    }
    .companyWebsite{
        margin-top: 50px;
        .companyWebsite-title{
            @extend %company-title;
        }
        p{
            color: $font-color-9;
            font-size: 14px;
        }
        a{
            color: $font-color-6;
            font-weight: 400;
        }
        button{
            margin-left: 10px;
        }
    }
}
.companyProduct{
    // max-height: 1170px;
    // overflow: auto;
    min-height: calc(100vh - 120px);
    border-radius: 8px;
    float: left;
    background: #ffffff;
    box-sizing: border-box;
    width: 49%;
    margin-left: 1%;
    padding: 0 56px;
    // overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    .companyProduct-head{
        margin-top: 64px;
        @include flex-justify-between;
        i{
            margin-right: 10px;
            font-size: 14px;
        }
        p{
            height: 100%;
            font-weight: 700;
            font-size: 18px;
        }
    }
    .noFound{
        width: 160px;
        min-height: 200px;
        margin: 0 auto;
        .no-found{ // 覆盖组件内部样式
          padding-left: 0;
          padding-right: 0;
        }
        button{
            margin-top: 24px;
        }
    }
}
.null-produc-bnt{
  width: 134px;
  height: 40px;
}
</style>

