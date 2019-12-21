<template>
    <div class="my-company">
        <div class="companyInformation">
            <div class="companyInformation-head">
                <img class="avatar" v-if="information.logoInfo" :src="information.logoInfo.middleUrl"/>
                <div class="companyInformation-head-button">
                    <el-button type="text"><i class="iconfont icon-fenxiang"></i> 分享</el-button>
                    <el-button type="text"><i class="iconfont icon-bianji"></i> 编辑</el-button>
                </div>
            </div>
            <p class="companyTitle">{{information.companyName}}</p>
            <p class="companyIndustry">{{information.industry}} | {{information.financingInfo}} | {{information.employeesInfo}}</p>
            <p class="companyIntroduction">{{information.intro}}</p>
            <div>公司环境</div>
            <div class="companyWebsite">
                <p class="companyWebsite-title">
                    <i></i>
                    公司官网
                </p>
                <a :href="information.website" target="_blank">{{information.website}}</a>
            </div>
            <div class="companyAddress">
                <p class="companyAddress-title">
                    <i></i>
                    公司地址
                </p>
            </div>
        </div>
        <div class="companyProduct">
            <div class="companyProduct-head">
                <p>公司产品</p>
                <el-button type="text"><i class="iconfont"></i> 添加产品</el-button>
            </div>
            <company-productList :product="information.product"></company-productList>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import companyProductList from './components/companyProductList'

import { companyDetailApi } from '@/api/company'

@Component({
    name: 'myCompany',
    computed: {
        // ...mapGetters([
        //     'userInfo'
        // ])
    },
    components: {
        companyProductList
    }
})
export default class myCompany extends Vue {
    information = {}
    mounted () {
        this.companyDetail()
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
                this.information = data
            })
    }
}
</script>

<style lang="scss" scoped>
.my-company{
    min-width: 940px;
    max-width: 1140px;
    margin: 32px auto 0;
}
.companyInformation{
    background: #ffffff;
    width: 50%;
    float: left;
    padding: 0 66px;
    box-sizing: border-box;
    .companyInformation-head{
        margin-top: 64px;
        @include flex-v-center;
        @include flex-justify-between;
        .avatar{
            width: 90px;
        }
        .companyInformation-head-button{
            width: 120px;
            @include flex-justify-between;
        }
    }
    .companyTitle{
        margin-top: 30px;
        font-size: 36px;
        color: $font-color-3;
        font-weight: 700;
    }
    .companyIndustry{
        margin-top: 12px;
        font-size: 18px;
        color: $font-color-6;
    }
    .companyIntroduction{
        margin-top: 30px;
        font-size: 14px;
        font-weight: 300;
        color: $font-color-3;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all;
    }
    .companyWebsite{
        margin-top: 60px;
        .companyWebsite-title{
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 17px;
            color: $font-color-3;
        }
        p{
            color: $font-color-9;
            font-size: 14px;
        }
    }
    .companyAddress{
        margin-top: 60px;
        .companyAddress-title{
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 17px;
        }
    }
}
.companyProduct{
    float: left;
    background: #ffffff;
    box-sizing: border-box;
    width: 49%;
    margin-left: 1%;
    padding: 0 64px;
    .companyProduct-head{
        margin-top: 64px;
        @include flex-justify-between;
        p{
            height: 100%;
            font-weight: 700;
            font-size: 18px;
        }
    }
}
</style>
