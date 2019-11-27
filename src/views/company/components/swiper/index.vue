<template>
	<div class="swiper1">
		<span class="btn prev" :class="{'btn-disabled': !btnPrevCanclick, 'btn-abled': btnPrevCanclick}"><i class="iconfont icon icon-right"></i></span>
		<div class="scroll">
			<ul id="swiper1">
				<li v-for="(item, i) in list" :key="i" class="item" :style="{ 'marginLeft': offset + 'px', 'marginRight': offset + 'px', 'marginTop': '8px', 'marginBottom': '8px'}">
					<div class="frontend">
						<div class="company-logo" v-if="item.logoInfo">
							<img :src="item.logoInfo.smallUrl" alt="loading" class="logo">
						</div>
						<p class="company-name">{{item.companyName}}</p>
					</div>
					<div class="backend">
						<div class="top">
							<p class="num">{{item.positionNum}}个</p>
							<p class="hot">热招职位</p>
						</div>
						<router-link :to="{name: 'companyDetail', query: { companyId: item.vkey }}" class="enter" target="_blank">进入公司主页</router-link>
					</div>
				</li>
			</ul>
		</div>
		<span class="btn next" :class="{'btn-disabled': !btnNextCanclick, 'btn-abled': btnNextCanclick}"><i class="iconfont icon icon-right"></i></span>
	</div>
</template>
<script>
export default {
	props: {
    slidesPerView: {
      type: Number,
      default: 6
    },
    offset: {
      type: Number,
      default: 16
    },
    list: {
      type: Array,
      default() {
        return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      }
    }
  },
	data() {
		return {
			btnPrevCanclick: true,
			btnNextCanclick: true,
			index: 0,
			xPox: 0
		}
	},
	methods: {
		move (x) {
			let swiper = document.querySelector('#swiper1');
			swiper.style.transform = `translateX(${x}px)`
		},
		init (scroll, swiper, itemWidth) {
			if (this.index === 0) {this.btnNextCanclick = false
				this.xPox = this.index * itemWidth
				this.move(this.xPox)
			}
			if (this.index && this.index > - (this.list.length - this.slidesPerView)) {
				this.btnPrevCanclick = false
				this.xPox = -this.index * itemWidth
				this.move(this.xPox)
			}
			scroll.style.width = `${this.slidesPerView * itemWidth + this.offset * 2 * this.slidesPerView}px`
		}
	},
	mounted() {
		let scroll = document.querySelector('.scroll');
		let swiper = document.querySelector('#swiper1');
		let liItem = swiper.querySelector('.item');
		let boxWidth = swiper.offsetWidth;
		let itemWidth = liItem.offsetWidth + this.offset * 2;
		let btnPrev = document.querySelector('.prev');
		let btnNext = document.querySelector('.next');
		this.init(scroll, swiper, liItem.offsetWidth)
		btnPrev.onclick = () => {
			if(this.index > -(this.list.length - this.slidesPerView)){
				this.index--
				this.xPox = this.index * itemWidth
				this.btnNextCanclick = true
				this.move(this.xPox)
			} else {
				this.btnPrevCanclick = false
			}
		}
		btnNext.onclick = () => {
			if(this.index < 0) {
				this.index++
				this.xPox = this.index * itemWidth
				this.btnPrevCanclick = true
				this.move(this.xPox)
			} else {
				this.btnNextCanclick = false
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.swiper1 {
	padding: 0 85px;
	position: relative;
	overflow: hidden;
	display: inline-block;
	.scroll {
		position: relative;
		margin: 0 auto;
		height: 208px;
		overflow: hidden;
	}
	ul {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		transition: all ease .4s;
		height: 208px;
	}
	.item{
		width:144px;
		background:rgba(255,255,255,0.9);
		border-radius:4px;
		display: inline-block;
		box-sizing: border-box;
		padding: 12px;
		position: relative;
		height: 192px;
		&:hover {
			.backend{
				opacity: 1;
				transform: translate(-50%, -50%) scale(1);
			}
			.frontend{
				transform: scale(0);
				opacity: 0;
			}
		}
	}
	.active {
		.backend{
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}
		.frontend{
			transform: scale(0);
			opacity: 0;
		}
	}
	.company-logo{
		width:120px;
		height:120px;
		border-radius:4px;
		background: rgba(0,0,0,.02);
		position: relative;
		overflow: hidden;
	}
	.logo{
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
	.frontend{
		transform: scale(1);
	}
	.backend{
		position: absolute;
		left: 50%;
		top: 50%;
		background:rgba(255,255,255,0.96);
		border-radius:4px;
		opacity: 0;
		transition: all ease .4s;
		box-sizing: border-box;
		padding: 20px;
		width: 160px;
		height: 0;
		height: 208px;
		width: 160px;
		transform: translate(-50%, -50%) scale(0);
	}
	.num {
		height:24px;
		font-size:20px;
		font-weight:500;
		color:$bg-color-4;
		line-height:24px;
		text-align: center;
		padding-top: 30px;
	}
	.hot {
		height:24px;
		font-size:16px;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:24px;
		text-align: center;
	}
	.company-name{
		font-size:14px;
		font-weight:400;
		color:$font-color-2;
		text-align: center;
		line-height: 20px;
		border-radius:4px;
		transition: all ease .4s;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 20px 0 8px 0;
	}
	.top{
		border-radius:4px;
		background: rgba(255,255,255,.96);
		position: relative;
		margin: 0 auto;
		height: 120px;
		width: 120px;
		box-sizing: border-box;
	}
	.enter{
		font-size:14px;
		font-weight:400;
		color:$font-color-2;
		text-align: center;
		margin-top: 14px;
		height:32px;
		line-height: 32px;
		border-radius:4px;
		transition: all ease .4s;
		display: block;
		background:$bg-color-4;
		color: white;
		width: 100%;
		margin-bottom: 22px;
		cursor: pointer;
	}
	.btn {
		width: 40px;
		height: 40px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		line-height: 40px;
		display: inline-block;
		&:hover {
			.btn-abled{
				color: white;
			}
		};
	}
	.prev {
		left: 0;
		transform: translateY(-50%) rotate(180deg);
	}
	.next {
		right: 0;
	}
	.btn-abled {
		cursor: pointer;
		&:hover {
			.iconfont{
				color: white;
			}
		};
	}
	.btn-disabled{}
	.iconfont{
		font-size: 30px;
		color: rgba(255,255,255,.5);
		transition: all ease .4s;
	}
}
</style>
