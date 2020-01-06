<template>
	<div class="random-banner">
    <div class="random-left-banner">
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'pfpaotwi' }}" class="li-item">
        <img src="~@/assets/random_images/img1.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'uiwm7efh' }}" class="li-item li-item1">
        <img src="~@/assets/random_images/1.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'ozrrijnc' }}" class="li-item li-item3">
        <img src="~@/assets/random_images/2.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'r5fdb5ws' }}" style="padding-right: 0;" class="li-item li-item2">
        <img src="~@/assets/random_images/3.jpg" alt="loading">
      </router-link>
      <!-- 单图 -->
      <!-- <router-link target="_blank" :to="{name: 'marketOriginality', query: { cc: 'themeMC' }}" class="li-item list-item-left">
        <img src="~@/assets/random_images/active.png" alt="loading">
      </router-link> -->
    </div>
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
    </div>
	</div>
</template>
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
}
</style>
