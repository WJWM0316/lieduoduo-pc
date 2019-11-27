<template>
	<div class="bank-type-box">
		<div class="bank-type">
			<div class="type-item">
				<div class="type-filter">公司地点：</div>
				<div class="type-ul">
					<span v-for="(area, areaIndex) in infos.areaList" :key="areaIndex" class="type-li" :class="{active: area.checked}" @click="onClick(area, areaIndex, 'areaList')">{{area.name}}</span>
				</div>
			</div>
			<div class="type-item">
				<div class="type-filter">融资规模：</div>
				<div class="type-ul">
					<span v-for="(finance, financeIndex) in infos.financingList" :key="financeIndex" class="type-li" :class="{active: finance.checked}" @click="onClick(finance, financeIndex, 'financingList')">{{finance.text}}</span>
				</div>
			</div>
			<div class="type-item">
				<div class="type-filter">人员规模：</div>
				<div class="type-ul">
					<span v-for="(employee, employeeIndex) in infos.employeeList" :key="employeeIndex" class="type-li" :class="{active: employee.checked}" @click="onClick(employee, employeeIndex, 'employeeList')">{{employee.text}}</span>
				</div>
			</div>
			<div class="type-item">
				<div class="type-filter">行业领域：</div>
				<div class="type-ul">
					<span v-for="(industry, industryIndex) in infos.industryList" :key="industryIndex" class="type-li" :class="{active: industry.checked}" @click="onClick(industry, industryIndex, 'industryList')">{{industry.name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
let result = {
	employeeList: [],
	financingList: [],
	industryList: [],
	areaList: []
}
export default {
	props: {
		infos: {
			type: Object,
			default: () => ({
				employeeList: [],
				financingList: [],
				industryList: [],
				areaList: []
			})
		}
	},
	methods: {
		onClick (item, index, key) {
			const list = this.infos[key].slice()
			switch (key) {
				case 'employeeList':
					if (item.value) {
    				list.map((v,i,arr) => {
    					if (i === index) {
    						v.checked = !v.checked
    						result[key] = arr.filter(v => v.checked)
    					}
    					if (i === 0) {
    						v.checked = false
    					}
    				})
    			} else {
    				if (!list[0].checked) {
    					list.map((v, i, a) => v.checked = !i ? true : false)
    					result[key] = []
    				}
    			}
    			break
    		case 'financingList':
    			if (item.value) {
    				list.map((v,i,arr) => {
    					if (i === index) {
    						v.checked = !v.checked
    						result[key] = arr.filter(v => v.checked)
    					}
    					if (i === 0) {
    						v.checked = false
    					}
    				})
    			} else {
    				if (!list[0].checked) {
    					list.map((v, i, a) => v.checked = !i ? true : false)
    					result[key] = []
    				}
    			}
    			break
    		case 'industryList':
    			if (item.labelId) {
    				list.map((v,i,arr) => {
    					if (i === index) {
    						v.checked = !v.checked
    						result[key] = arr.filter(v => v.checked)
    					}
    					if (i === 0) {
    						v.checked = false
    					}
    				})
    			} else {
    				if (!list[0].checked) {
    					list.map((v, i, a) => v.checked = !i ? true : false)
    					result[key] = []
    				}
    			}
    			break
    		case 'areaList':
    			list.map((v,i,arr) => {
    				v.checked = false
  					if (i === index) {
  						v.checked = !v.checked
  						if (v.areaId) {
  							result[key] = [v]
  						} else {
  							result[key] = []
  						}
  					}
  				})
    			break
				default:
					break
			}
			this.infos[key] = list
    	this.$emit('change', result)
		}
	}
}
</script>
<style lang="scss" scoped>
.bank-type-box{
	background: white;
	padding-top: 30px;
	background: white;
	margin-bottom: 30px;
	padding-bottom: 16px;
	.bank-type{
		width: 1200px;
		margin: 0 auto;
	}
	.type-filter{
		height:20px;
		font-size:14px;
		font-weight:400;
		color:$font-color-3;
		line-height:20px;
		margin-right: 16px;
		display: inline-block;
		flex: 0 0 70px;
    align-self: stretch;
    position: relative;
    text-align: left;
	}
	.type-li {
		display: inline-block;
		margin-right: 30px;
		font-size:14px;
		font-weight:400;
		color:$font-color-6;
		line-height:20px;
		margin-bottom: 14px;
		cursor: pointer;
		&:hover {
			font-weight:500;
			color:$main-color-1;
		}
	}
	.active{
		font-weight:500;
		color:$main-color-1;
	}
	.type-item {
		margin-bottom: 10px;
		display: flex;
		align-items: flex-start;
		&:last-child{
      margin-bottom: 0px;
    }
  }
}
</style>
