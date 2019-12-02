<template>
	<div id="abdcefghijklmn">
		<table id="table">
			<tr v-for="row in 4" :key="row" height="100px">
				<td v-for="column in 4" :key="column">{{row}} --- {{column}}</td>
			</tr>
		</table>
	</div>
</template>
<script>
export default {
	data () {
		return {
			row: 4,
			column: 4
		}
	},
	methods: {
		init(ele) {
  		let reactArea = { startX: 0, startY: 0, endX: 0, endY: 0 }
      //是否一直按下鼠标
      let isMouseDown = false
      let areaSelect = {}
      //将元素定位改为relative
      ele.style.position = 'relative'
      ele.addEventListener('mousedown', e => {
        reactArea.startX = e.layerX
        reactArea.startY = e.layerY
        isMouseDown = true
      })

      ele.addEventListener('mousemove', e => {
        if(isMouseDown) {
          let preArea = ele.getElementsByClassName('v-selected-area')
          if(preArea.length) {
            ele.removeChild(preArea[0])
          }
          reactArea.endX = e.layerX
          reactArea.endY = e.layerY
          let leftValue = 0
          let topValue = 0
          let widthValue = Math.abs(reactArea.startX - reactArea.endX)
          let heightValue =  Math.abs(reactArea.startY - reactArea.endY)

          if(reactArea.startX >= reactArea.endX) {
            leftValue = reactArea.endX
          } else {
            leftValue = reactArea.startX
          }
          if(reactArea.startY > reactArea.endY ) {
            topValue = reactArea.endY
          } else {
            topValue = reactArea.startY
          }

          //判断同时有宽高才开始画虚线框
          if(reactArea.startX != reactArea.endX && reactArea.startY !== reactArea.endY){
            areaSelect = document.createElement('div')
            areaSelect.classList.add("v-selected-area")
            areaSelect.style.position = "absolute";
            areaSelect.style.left = leftValue + 'px'
            areaSelect.style.top = topValue + 'px'
            areaSelect.style.width = widthValue + 'px'
            areaSelect.style.height = heightValue + 'px'
            areaSelect.style.border = "1px dashed grey"
            ele.append(areaSelect)
          }

          let children = ele.getElementsByTagName('td')
          for(let i =0; i < children.length; i++ ) {
            let childrenHeight = children[i].getBoundingClientRect().height
            let childrenWidth = children[i].getBoundingClientRect().width
            //每个li元素的位置
            let offsetLeft = children[i].offsetLeft
            let offsetTop = children[i].offsetTop
            //每个li元素的宽高
            let endPositionH = childrenHeight + offsetTop
            let endPositionW = childrenWidth + offsetLeft
            //五个条件满足一个就可以判断被选择
            //一是右下角在选择区域内
            let require1 = endPositionH > topValue && endPositionW > leftValue && endPositionH < topValue + heightValue && endPositionW < leftValue + widthValue
            //二是左上角在选择区域内
            let require2 = offsetTop > topValue && offsetLeft > leftValue && offsetTop < topValue + heightValue && offsetLeft < leftValue + widthValue
            //三是右上角在选择区域内
            let require3 = offsetTop > topValue && offsetLeft + childrenWidth > leftValue && offsetTop < topValue + heightValue && offsetLeft + childrenWidth< leftValue + widthValue
            //四是左下角在选择区域内
            let require4 = offsetTop + childrenHeight > topValue && offsetLeft > leftValue && offsetTop + childrenHeight < topValue + heightValue && offsetLeft < leftValue + widthValue
            //五选择区域在元素体内
            let require5 = offsetTop < topValue && offsetLeft < leftValue && offsetTop + childrenHeight > topValue + heightValue && offsetLeft + childrenWidth > leftValue + widthValue
            
            if(require1 || require2 || require3 || require4 || require5) {
            	console.log(1)
              children[i].classList.add('active')
            } else {
            	console.log(2)
              children[i].classList.remove('active')
            }
          }
        }
      })

      ele.addEventListener('mouseup', () => {
        isMouseDown = false
        if(areaSelect && areaSelect.childNodes && ele.contains(areaSelect)){
          ele.removeChild(areaSelect)
        }
        areaSelect = null
      })
  	}
	},
	mounted() {
		let table = document.querySelector('#table')
  	this.init(table)
	}
}
</script>
<style lang="scss" scoped>
#abdcefghijklmn{
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.1);
	table {
		border-collapse: collapse;
		text-align: center;
		position: relative;
		width: 800px;
		height: 400px;
		overflow: hidden;
	}
	table td, table th {
		border: 1px solid #cad9ea;
		color: #666;
		height: 30px;
	}
	table thead th {
		background-color: #CCE8EB;
		width: 100px;
	}
	table tr:nth-child(odd) {
		background: #fff;
	}
	table tr:nth-child(even) {
		background: #F5FAFA;
	}
	table td.active{
		background: #03B3BB;
	}
}
</style>
