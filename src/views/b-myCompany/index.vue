<template>
<div>
    <div class="my-company" v-if="materialShow === '公司主页'">
        <div class="companyInformation">
            <div class="companyInformation-head">
                <div class="avatar">
                    <img v-if="information.logoInfo" :src="information.logoInfo.middleUrl"/>
                </div>
                <div class="companyInformation-head-button">
                    <el-button type="text"><i class="iconfont icon-fenxiang"></i> 分享</el-button>
                    <el-button  type="text" @click="toEdit('编辑公司')"><i class="iconfont icon-bianji"></i> 编辑</el-button>
                </div>
                <!-- v-if="isCompanyAdmin" -->
            </div>
            <p class="companyTitle">{{information.companyName}}</p>
            <p class="companyIndustry">{{information.companyShortname}} | {{information.industry}} | {{information.financingInfo}} | {{information.employeesInfo}}</p>
            <div class="companyIntroduction">
                <p class="companyIntroduction-title">
                    <i class="iconfont icon-qiye"></i>公司简介
                </p>
                <p v-if="information.intro" class="companyIntroduction-text">{{information.intro}}</p>
                <p v-else>尚未添加公司简介<span>去添加</span></p>
            </div>
            <div class="companySurroundings">
                <div class="companySurroundings-bnt" v-if="bntLeftShow" @click="clickBnt('left')">
                    <i class="iconfont icon-left"></i>
                </div>
                <div class="companySurroundings-bnt companySurroundings-rightbnt"  v-if="bntRightShow" @click="clickBnt('right')">
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="companySurroundings-wrap" ref="companySurroundingsWrap">
                    <div class="img" v-for="(item, index) in information.albumInfo" :key="index" :style="'background: url(' + item.smallUrl + ')'"></div>
                </div>
            </div>
            <div class="companyAddress">
                <p class="companyAddress-title">
                    <i class="iconfont icon-dizhi"></i>公司地址
                </p>
                <ul v-if="information.address">
                    <li v-for="(item, index) in information.address" :key="index">{{ item.address + '&nbsp;' + item.doorplate }}</li>
                </ul>
                <p v-else>尚未添加公司地址<span>去添加</span></p>
            </div>
            <div class="companyWebsite">
                <p class="companyWebsite-title">
                    <i class="iconfont icon-guanwang-"></i>公司官网
                </p>
                <a v-if="information.website" :href="information.website" target="_blank">{{information.website}}</a>
                <p v-else>尚未添加公司官网<span>去添加</span></p>
            </div>
        </div>
        <div class="companyProduct">
            <div class="companyProduct-head">
                <p>公司产品</p>
                <el-button type="text" @click="toEdit('编辑产品')"><i class="iconfont icon-tianjia-"></i>添加产品</el-button>
            </div>
            <company-productList @click="toEdit" @toEditProduct="toEditProduct" :product="information.product"></company-productList>
            <div v-if="!information.product" class="noFound">
                <no-found tipText='尚未添加公司产品' imageUrl='/img/fly.26a25d51.png'>
                    <el-button type="primary">去添加</el-button>
                </no-found>
            </div>
        </div>
    </div>
    <my-material
    v-if="materialShow === '编辑公司'"
    :information="information"
    @click="toEdit">
    </my-material>
    <Edit-product
    v-if="materialShow === '编辑产品'"
    :currentProduct="currentProduct"
    @click="toEdit">
    </Edit-product>
</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import companyProductList from './components/companyProductList'
import noFound from '@/components/noFound'
import myMaterial from './components/myMaterial'
import EditProduct from './components/EditProduct'

import { companyDetailApi } from '@/api/company'

@Component({
  name: 'myCompany',
  computed: {
    ...mapState({
      isCompanyAdmin: state => state.roleInfos.isCompanyAdmin
    })
  },
  components: {
    companyProductList,
    myMaterial,
    noFound,
    EditProduct
  }
})
export default class myCompany extends Vue {
    materialShow = '公司主页'
    bntLeftShow = false
    bntRightShow = true
    transformWidth = 1
    information = {}
    currentProduct = {
      id: '',
      productName: '',
      siteUrl: '',
      slogan: '',
      lightspot: '',
      logoInfo: {
        middleUrl: ''
      }
    }
    mounted () {
      this.companyDetail()
    }
    toEdit (type) {
      this.materialShow = type
    }
    companyDetail () {
      companyDetailApi()
        .then(res => {
          let data = res.data.data
          if (!data.website.startsWith('http', 4)) {
            data.website = 'http://' + data.website
          }
          data.product.forEach((item, index) => {
            if (!item.siteUrl.startsWith('http', 4)) {
              data.product[index].siteUrl = 'http://' + data.product[index].siteUrl
            }
          })
          data.financing = parseInt(data.financing)
          data.employees = parseInt(data.employees)
          this.information = data
        })
    }
    toEditProduct (item) { // 从产品列表拿到回调参数
      this.currentProduct = item
    }
    clickBnt (displacement) {
      if (displacement === 'left') {
        this.transformAnimation(1)
      } else {
        this.transformAnimation(-1)
      }
    }
    transformAnimation (value) {
      console.log(Math.abs(this.transformWidth) / 100)
      if (Math.abs(this.transformWidth) / 100 === 0) return
      this.transformWidth += value
      this.$refs.companySurroundingsWrap.style.transform = `translate3d(${this.transformWidth}px, 0, 0)`
      setTimeout((value) => {
        this.transformAnimation(value)
      }, 10)
    }
}
</script>

<style lang="scss" scoped>
%company-title{
    color: $font-color-2;
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
    padding: 0 56px;
    box-sizing: border-box;
    .companyInformation-head{
        margin-top: 64px;
        @include flex-v-center;
        @include flex-justify-between;
        .avatar{
            @include img-radius(90px, 90px, 8px);
        }
        .companyInformation-head-button{
            button{
                margin-left: 15px;
            }
        }
    }
    .companyTitle{
        margin-top: 30px;
        font-size: 34px;
        color: $font-color-3;
        font-weight: 700;
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
    }
    .companySurroundings{
        cursor: pointer;
        position: relative;
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
        .companySurroundings-bnt{
            display: none;
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
            }
            .companySurroundings-rightbnt{
                right: 0;
            }
        }
        .companySurroundings-wrap{
            white-space: nowrap;
            .img{
                display: inline-block;
                @include bg-image-radius(88px, 88px, 4px);
                border: 1px solid $border-color-8;
                margin-right: 10px;
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
    }
}
.companyProduct{
    max-height: 1170px;
    overflow:auto;
    float: left;
    background: #ffffff;
    box-sizing: border-box;
    width: 49%;
    margin-left: 1%;
    padding: 0 56px;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    .companyProduct-head{
        margin-top: 64px;
        @include flex-justify-between;
        i{
            margin-right: 10px;
        }
        p{
            height: 100%;
            font-weight: 700;
            font-size: 18px;
        }
    }
    .noFound{
        width: 160px;
        margin: 0 auto;
        button{
            margin-top: 24px;
        }
    }
}
</style>
