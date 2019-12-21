<template>
    <div>
        <div class="product" v-for="(item, index) in product" :key="index">
            <div class="productImg">
                <img v-if="item.logoInfo.middleUrl" :src="item.logoInfo.middleUrl"/>
            </div>
            <div class="product-text">
                <div class="product-title">
                    <p>{{ item.productName }}</p>
                    <i>icon</i>
                </div>
                <p class="product-slogan">{{ item.slogan }}</p>
                <p class="product-lightspot">
                    <block-overflow :text="item.lightspot"></block-overflow>
                </p>
                <a :href="item.siteUrl" target="_blank" class="product-siteUrl">{{ item.siteUrl }}</a>
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
            default: () => []
        }
    },
    components: {
        blockOverflow
    }
}
</script>

<style lang="scss" scoped>
.product{
    width: 100%;
    border-bottom: 1px solid $border-color-1;
    padding: 24px 0;
    @include clearfix;

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
    }
}
</style>
