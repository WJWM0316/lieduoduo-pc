<template>
	<div class="swiper1">
		<span class="btn prev" :class="index > 0 ? 'btn-abled' : 'btn-disabled'"><i class="iconfont icon icon-right"></i></span>
		<div class="scroll">
			<div id="swiper1" class="card-list">
				<router-link target="_blank" :to="{name: 'companyDetail', query: { vkey: item.vkey }}" v-for="(item, i) in list" :key="i" class="item" :style="{ 'marginLeft': offset + 'px', 'marginRight': offset + 'px', 'marginTop': '8px', 'marginBottom': '8px'}">
					<div class="company-logo" v-if="item.logoInfo">
						<img :src="item.logoInfo.smallUrl" alt="loading" class="logo">
					</div>
					<div class="frontend">
						<p class="company-name">{{item.companyName}}</p>
					</div>
					<div class="backend">
						<div class="top">
							<p class="num">{{item.positionNum}}个</p>
							<p class="hot">热招职位</p>
						</div>
						<span class="enter">进入公司主页</span>
					</div>
				</router-link>
			</div>
		</div>
		<span class="btn next" :class="index < Math.ceil(this.list.length / this.slidesPerView) - 1 ? 'btn-abled' : 'btn-disabled'"><i class="iconfont icon icon-right"></i></span>
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
      default () {
        return []
      }
    }
  },
  data () {
    return {
      index: 0,
      xPox: 0
    }
  },
  methods: {
    move (x) {
      let swiper = document.querySelector('#swiper1')
      swiper.style.transform = `translateX(${x}px)`
    },
    init (scroll, swiper, itemWidth) {
      if (this.index === 0) {
        this.xPox = this.index * itemWidth
        this.move(-this.xPox)
      }
      if (this.index === Math.ceil(this.list.length / this.slidesPerView) - 1) {
        this.xPox = this.index * itemWidth
        this.move(-this.xPox)
      }
      scroll.style.width = `${this.slidesPerView * itemWidth + this.offset * 2 * this.slidesPerView}px`
    }
  },
  mounted () {
    let scroll = document.querySelector('.scroll')
    let swiper = document.querySelector('#swiper1')
    let liItem = swiper.querySelector('.item')
    let boxWidth = swiper.offsetWidth
    let itemWidth = liItem.offsetWidth + this.offset * 2
    let btnPrev = document.querySelector('.prev')
    let btnNext = document.querySelector('.next')
    this.init(scroll, swiper, liItem.offsetWidth)
    btnPrev.onclick = () => {
      if (this.index > 0) {
        this.index--
        this.xPox = this.index * itemWidth * this.slidesPerView
        this.move(-this.xPox)
      }
    }
    btnNext.onclick = () => {
      if (this.index < Math.ceil(this.list.length / this.slidesPerView) - 1) {
        this.index++
        this.xPox = this.index * itemWidth * this.slidesPerView
        this.move(-this.xPox)
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
	.card-list {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		transition: all ease .5s;
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
		cursor: pointer;
		&:hover {
			.backend{
				opacity: 1;
			}
			.frontend{
				opacity: 0;
			}
		}
	}
	.active {
		.backend{
			opacity: 1;
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
	.backend{
		position: absolute;
		left: 50%;
		top: 50%;
		background:rgba(255,255,255,0.9);
		border-radius:4px;
		opacity: 0;
		transition: all .5s;
		box-sizing: border-box;
		padding: 20px;
		height: 0;
		height: 208px;
		width: 160px;
		transform: translate(-50%, -50%);
		cursor: pointer;
	}
	.num {
		height:24px;
		font-size:20px;
		font-weight:500;
		color:$bg-color-4;
		line-height:24px;
		text-align: center;
		padding-top: 30px;
		cursor: pointer;
	}
	.hot {
		height:24px;
		font-size:16px;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:24px;
		text-align: center;
		cursor: pointer;
	}
	.company-name{
		font-size:14px;
		font-weight:400;
		color:$font-color-2;
		text-align: center;
		line-height: 20px;
		border-radius:4px;
		transition: all ease .5s;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 20px 0 8px 0;
	}
	.top{
		border-radius:4px;
		position: relative;
		margin: 0 auto;
		height: 120px;
		width: 120px;
		box-sizing: border-box;
		cursor: pointer;
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
		display: block;
		background:$bg-color-4;
		color: white;
		width: 100%;
		margin-bottom: 22px;
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
	/* .btn-disabled{
		display: none;
	} */
	.iconfont{
		font-size: 30px;
		color: rgba(255,255,255,.5);
		transition: all ease .5s;
	}
}
</style>
