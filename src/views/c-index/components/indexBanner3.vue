<template>
	<div class="random-banner">
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: '4utnb5ri' }}" class="li-item item0" data-com="北京旷视科技有限公司">
			<img src="~@/assets/random_images/img0.jpg" alt="loading">
		</router-link>
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'kkwrgd1m' }}" class="li-item item1" data-com="广州欢聚时代信息科技有限公司">
			<img src="~@/assets/random_images/img1.jpg" alt="loading">
		</router-link>
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'dcrjn1kv' }}" class="li-item item2" data-com="北京小唱科技有限公司">
			<img src="~@/assets/random_images/img2.jpg" alt="loading">
		</router-link>
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: '2ha5usmh' }}" class="li-item item3" data-com="北京墨迹风云科技股份有限公司">
			<img src="~@/assets/random_images/img3.jpg" alt="loading">
		</router-link>
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: '8sdlelbu' }}" class="li-item item4" data-com="唯品会（中国）有限公司">
			<img src="~@/assets/random_images/img4.jpg" alt="loading">
		</router-link>
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'enbqgvgx' }}" class="li-item item5" data-com="捷众普惠国际融资租赁有限公司">
			<img src="~@/assets/random_images/img5.jpg" alt="loading">
		</router-link>
		<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: 'inxwzsxe' }}" class="li-item item6" data-com="广州爱拍网络科技有限公司">
			<img src="~@/assets/random_images/img6.jpg" alt="loading">
		</router-link>
	</div>
</template>
<script>
export default {
  data () {
    return {
      banner: [
        {
          vkey: '2ha5usmh',
          src: '../../../assets/random_images/img0.jpg'
        },
        {
          vkey: '8sdlelbu',
          src: '../../../assets/random_images/img1.jpg'
        },
        {
          vkey: 'inxwzsxe',
          src: '../../../assets/random_images/img2.jpg'
        },
        {
          vkey: 'kkwrgd1m',
          src: '../../../assets/random_images/img3.jpg'
        },
        {
          vkey: 'enbqgvgx',
          src: '../../../assets/random_images/img4.jpg'
        },
        {
          vkey: '4utnb5ri',
          src: '../../../assets/random_images/img5.jpg'
        },
        {
          vkey: 'dcrjn1kv',
          src: '../../../assets/random_images/img6.jpg'
        }
      ]
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
	.li-item{
		display: inline-block;
		position: absolute;
		box-sizing: border-box;
		cursor: pointer;
		background: rgba(0,0,0,.05);
		img{
			width: 100%;
			height: 100%;
		}
	}
	.item0{
		width:508px;
		height:206px;
		left: 0;
		top: 0;
	}
	.item1{
		width:252px;
		height:206px;
		left: calc(508px + 3px);
		top: 0;
	}
	.item2 {
		width:508px;
		height:108px;
		top: 206px;
		left: 0;
		border-top: 3px solid white;
		border-bottom: 3px solid white;
	}
	.item3 {
		width:252px;
		height:108px;
		top: 206px;
		left: calc(508px + 3px);
		border-top: 3px solid white;
		border-bottom: 3px solid white;
	}
	.item4 {
		width:252px;
		height:102px;
		top: calc(108px + 206px);
		left: 0;
	}
	.item5 {
		width:253px;
		height:102px;
		top: calc(108px + 206px);
		left: calc(252px + 3px);
	}
	.item6 {
		width:252px;
		height:102px;
		top: calc(108px + 206px);
		left: calc(252px + 3px + 253px + 3px);
	}
}
</style>
