<template>
    <div class="cover" v-if="showSharePopup">
        <div class="bg"></div>
        <div class="popMain">
            <div class="share">
                <div class="share-title">{{ title }}</div>
                <div class="share-guide">{{ guide }}</div>
                <div class="share-imgUrl">
                    <img :src="imgUrl"/>
                </div>
            </div>
            <div class="share-help"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showSharePopup: false
        }
    },
    props: {
        title: {
            type: String,
            default: '分享公司主页'
        },
        guide: {
            type: String,
            default: '使用「微信」扫描小程序码分享公司主页'
        },
        imgUrl: {
            type: String,
            default: process.env.VUE_APP_CDN_PATH + ''
        }
    }
}
</script>

<style lang="scss" scoped>
.cover{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #00000080;
    }
    .popMain{
        width: 750px;
        .share{
            width: 432px;
            height: 396px;
            background: #ffffff;
            border-radius: 8px;
            float: left;
        }
        .share-help{
            background: #ffffff;
            border-radius: 8px;
            height: 396px;
            width: 300px;
            float: right;
        }
    }
}
</style>
