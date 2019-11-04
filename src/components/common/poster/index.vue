<template>
	<div class="wrap" v-show="showPop">
		<div class="bg"></div>
		<div class="inner">
			<div class="posterUrl">
				<el-image class="img" fit='contain' :src="posterUrl" alt="">
					<div slot="error" class="image-slot">
	        	<i class="el-icon-picture-outline"></i>
	      	</div>
	      </el-image>
      </div>
		</div>
		<div class="operBox">
			<div class="btn" @click="oper('download')"><i class="icon iconfont icon-xiazai"></i>下载</div>
			<div class="btn copy" @click="oper('copy')"><i class="icon iconfont icon-fuzhi"></i>复制</div>
			<div class="btn" @click="oper('close')"><i class="icon iconfont icon-xiantiaoguanbi"></i>关闭</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Clipboard from 'clipboard'
import {getPositionPostApi, getPositionMinPostApi} from '@/api/poster.js'
@Component({
  name: 'poster',
  props: {
    params: {
    	type: Object,
      default: null
    },
    showPoster: {
    	type: Boolean,
    	default: false
    }
  },
  watch: {
    params () {
  		this.getPosterinit()
  	},
  	showPoster () {
  		this.showPop = this.showPoster
  	}
  }
})
export default class poster extends Component {
	showPop = false
	posterUrl = ''
	posterData = null
	longPoster = ''
	shortPoster = ''
	created () {
		this.getPosterinit()
	}
	oper (type) {
		switch (type) {
			case 'close':
				this.showPop = false
				this.$emit('closePoster')
				break
			case 'download':
				this.download()
				break
			case 'copy':
				this.$message('请点击右键直接复制')
				break
		}
	}
	getPosterinit () {
		if (!this.params.type) return
		let getPoster = null
		switch (this.params.type) {
			case 'position':
				if (this.longPoster) {
					this.posterUrl = this.longPoster
					return
				}
				getPoster = getPositionPostApi
				break
			case 'position_min':
				if (this.shortPoster) {
					this.posterUrl = this.shortPoster
					return
				}
				getPoster = getPositionMinPostApi
		}
		this.params.globalLoading = true
		getPoster(this.params).then(res => {
			this.posterUrl = res.data.data.url
			switch (this.params.type) {
				case 'position':
					this.longPoster = this.posterUrl
					break
				case 'position_min':
					this.shortPoster = this.posterUrl
			}
			if (res.data.data.posterData) this.posterData = res.data.data.posterData || '分享海报'
		})
	}
	copyImg () {
		var clipboard = new Clipboard('.copy', {
			 target: function(trigger) {
        return document.querySelector('.posterUrl');
    	}
		})
		clipboard.on('success', e => {
			console.log("复制成功")
			e.clearSelection();
		})
		clipboard.on('error', e => {
		})
	}
	//下载图片
  download() {
    let imgData = this.posterUrl
    this.downloadFile(`${this.posterData.positionName}.png`, imgData);
  }
	downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    let blob = this.base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
  }
  //base64转blob
  base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }
}
</script>
<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		.bg {
			width: 100%;
			height: 100vh;
			position: absolute;
			top: 0;
			left: 0;
			background:rgba(0,0,0,0.5);
			z-index: 1;
		}
		.inner {
			position: relative;
			z-index: 2;
			height: 100vh;
			display: block;
			padding: $page-header-height 0 $page-footer-height;
			box-sizing: border-box;
			text-align: center;
			.posterUrl {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
			}
		}
		.operBox {
			position: absolute;
			width:480px;
			height:46px;
			background:rgba(0,0,0,0.5);
			border-radius:8px;
			left: 50%;
			margin-left: -240px;
			transform: translate3d(0, -20px, 0);
			bottom: $page-footer-height;
			box-sizing: border-box;
			z-index: 2;
			display: flex;
			color: #fff;
			.btn {
				line-height: 46px;
				flex: 1;
				text-align: center;
				cursor: pointer;
				font-size: 14px;
				.icon {
					font-size: 16px;
					margin-right: 3px;
					display: inline-block;
				}
				&:last-child .icon {
					font-size: 14px;
				}
			}
		}
	}
</style>