<template>
	<div class="random-banner">
    <!-- <router-link target="_blank" :to="{name: 'dreamDisco'}" class="li-item">
      <img :src="cdnPath + 'dreamBanner.jpg'" alt="loading">
    </router-link> -->
    <!-- <router-link target="_blank" :to="{name: 'marketOriginality'}" class="li-item">
      <img :src="cdnPath + 'marketOriginality_banner.png'" alt="loading">
    </router-link> -->
    <router-link target="_blank" :to="{name: 'alliance', query: { sourceType: 'hd_alliance_web' }}" class="left-banner">
      <img src="@/assets/images/activity/alliance/small_banner.png" alt="loading">
    </router-link>
    <router-link target="_blank" :to="{name: 'disease', query: { sourceType: 'hd_job_web' }}" class="right-banner">
      <img src="@/assets/images/activity/disease/diseaseBanner.png" alt="loading">
    </router-link>
    <!-- <div class="random-left-banner">
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'pfpaotwi' }}" class="li-item">
        <img src="~@/assets/random_images/img1.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'r5fdb5ws' }}" class="li-item">
        <img src="~@/assets/random_images/img2.jpg" alt="loading">
      </router-link> -->
      <!-- <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'uiwm7efh' }}" class="li-item li-item1">
        <img src="~@/assets/random_images/1.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'ozrrijnc' }}" class="li-item li-item3">
        <img src="~@/assets/random_images/2.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'r5fdb5ws' }}" style="padding-right: 0;" class="li-item li-item2">
        <img src="~@/assets/random_images/3.jpg" alt="loading">
      </router-link> -->
      <!-- 单图 -->
      <!-- <router-link target="_blank" :to="{name: 'marketOriginality', query: { cc: 'themeMC' }}" class="li-item list-item-left">
        <img src="~@/assets/random_images/active.png" alt="loading">
      </router-link> -->
    <!-- </div>
    <div class="random-right-banner">
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'r9umtuv3' }}" class="li-item">
        <img src="~@/assets/random_images/img03.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'y1fnzcxs' }}" class="li-item">
        <img src="~@/assets/random_images/img04.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'no1pzts7' }}" class="li-item">
        <img src="~@/assets/random_images/img05.jpg" alt="loading">
      </router-link>
    </div> -->
	</div>
</template>
<script>
export default {
  data () {
    return {
      cdnPath: `${process.env.VUE_APP_CDN_PATH}/images/`
    }
  }
}
</script>
<style lang="scss" scoped>
.random-banner {
	position: relative;
	width: 763px;
	height: 414px;
	overflow: hidden;
  margin-left: 18px;
  & > div {
    display: inline-block;
    vertical-align: top;
  }
  a {
    display: block;
    overflow: hidden;
  }
  .random-left-banner {
    width: 508px;
    .li-item {
      width: 508px;
      padding-right: 4px;
      height:206px;
    }
    .li-item1 {
      width: 508px;
      height:108px;
    }
    .li-item2, .li-item3 {
      width:252px;
      height:108px;
    }
    .li-item.list-item-left {
      height: 100%;
    }
  }
  .random-right-banner {
    width:252px;
    .li-item {
      width:252px;
		  height:108px;
    }
    .li-item:first-child {
		  height:206px;
    }
  }
	.li-item{
		display: inline-block;
		box-sizing: border-box;
		cursor: pointer;
		background: rgba(0,0,0,.05);
		img{
			width: 100%;
			height: 100%;
		}
	}
  .left-banner{
    width: 507px;
    display: inline-block;
    margin-right: 3px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right-banner{
    width: 252px;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
