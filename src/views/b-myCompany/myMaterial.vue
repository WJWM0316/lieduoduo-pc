<template>
    <div class="myMaterial">
        <div class="myMaterial-head">
            <p class="myMaterial-head-title">编辑基本信息</p>
            <p class="myMaterial-head-text">如“<span>*</span>”号的内容，是必须填写的项目；置灰内容为公司认证信息，修改请联系 400-065-5788</p>
        </div>
        <div class="from">
            <el-form v-model="informations" :rules="rules" label-width="100px">
                <el-form-item label="公司logo："><el-input v-model="informations.smallUrl"></el-input></el-form-item>
                <el-form-item label="公司全程："><el-input v-model="informations.companyName"></el-input></el-form-item>
                <el-form-item label="公司简称："><el-input v-model="informations.companyShortname"></el-input></el-form-item>
                <el-form-item label="所属行业："><el-input v-model="informations.industry"></el-input></el-form-item>
                <el-form-item label="融资阶段：">
                    <el-select v-model="informations.financing" placeholder="请选择融资阶段">
                        <el-option
                        v-for="item in financing"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司规模：">
                    <el-select v-model="informations.employees" placeholder="请选择公司规模">
                        <el-option
                        v-for="item in employees"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司官网："><el-input v-model="informations.website"></el-input></el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Picture from '@/components/common/upload/picture'

import { companyFinancingApi,
    companyEmployeesApi
} from '@/api/company'

export default {
    props: {
        information: {
            type: Object,
            default: {}
        }
    },
    data () {
        return {
            financing: {},
            employees: {},
            informations: this.information
        }
    },
    components: {
        Picture
    },
    methods: {

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

.myMaterial-logo{
    margin-top: 48px;
}
.from{
    input{
        width: 382px;
    }
}
</style>
<style>
.myMaterial .el-form{
    margin-top: 48px;
}
</style>
