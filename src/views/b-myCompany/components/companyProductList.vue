<template>
    <div>
        <div class="product" v-for="(item, index) in product" :key="index">
            <div class="productImg">
                <img v-if="item.logoInfo.middleUrl" :src="item.logoInfo.middleUrl"/>
            </div>
            <div class="product-text">
                <div class="product-title">
                    <span>{{ item.productName }}</span>
                    <i v-if="isCompanyAdmin" @click="toEditProduct(item)" class="iconfont icon-bianji"></i>
                </div>
                <p class="product-slogan">{{ item.slogan }}</p>
                <block-overflow class="product-lightspot" :text="item.lightspot"></block-overflow>
                <a v-if="item.siteUrl" :href="item.siteUrl" target="_blank" class="product-siteUrl">{{ item.siteUrl }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import blockOverflow from '@/components/common/blockOverflow'
export default {
  props: {
    product: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapState({
      isCompanyAdmin: state => state.roleInfos.isCompanyAdmin
    })
  },
  components: {
    blockOverflow
  },
  methods: {
    toEditProduct (item) {
      this.$router.push({
        name: 'EditProduct',
        query: {
          id: item.id,
          companyId: item.companyId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product{
    width: 100%;
    border-bottom: 1px solid $border-color-1;
    padding: 24px 0;
    @include clearfix;
    &:nth-last-child(1){
        border: 0;
    }
    .productImg{
        float: left;
        width: 60px;
        height: 60px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .product-text{
        float: left;
        margin-left: 20px;
        width: calc(100% - 80px);
        .product-title{
            @include flex-justify-between;
            @include flex-v-center;
            span{
                font-size: 20px;
                line-height: 20px;
                font-weight: 700;
                color: $font-color-3;
            }
            i{
                color: $font-color-10;
                cursor: pointer;
                &:hover{
                    color: $main-color-1;
                }
            }
        }
        .product-slogan{
            font-size: 16px;
            color: $font-color-6;
            line-height: 24px;
            margin-top: 5px;
        }
        .product-lightspot{
            margin-top: 16px;
        }
        .product-siteUrl{
            display: inline-block;
            margin-top: 10px;
            color: $main-color-1;
        }
    }
}
</style>
<style>
.product-text .introduction-text{
    line-height: 20px;
    color: #99999B;
}
.product-text .introduction-text button{
    line-height: 20px;
}
</style>
