<template>
	<div class="random-banner">
    <div class="random-left-banner">
      <a target="_blank" href="https://h5.lieduoduo.com/delicate" class="li-item" data-com="北京旷视科技有限公司">
        <img src="~@/assets/random_images/img01.png" alt="loading">
      </a>
      <a target="_blank" href="https://h5.lieduoduo.com/wantYou" class="li-item" data-com="北京小唱科技有限公司">
        <img src="~@/assets/random_images/img02.jpg" alt="loading">
      </a>
    </div>
    <div class="random-right-banner">
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'r9umtuv3' }}" class="li-item" data-com="广州欢聚时代信息科技有限公司">
        <img src="~@/assets/random_images/img03.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'y1fnzcxs' }}" class="li-item" data-com="北京墨迹风云科技股份有限公司">
        <img src="~@/assets/random_images/img04.jpg" alt="loading">
      </router-link>
      <router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'no1pzts7' }}" class="li-item" data-com="广州爱拍网络科技有限公司">
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
  .random-left-banner {
    width: 508px;
    .li-item {
      width: 508px;
      padding-right: 4px;
      height:206px;
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
