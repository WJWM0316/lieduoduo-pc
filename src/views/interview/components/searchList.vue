<template>
	<div class="search-content">
		<ChatBar :item="item" v-for="(item, index) in data.list" :key="index" :tab="tab" @click="bindClick($event, index)" :rowIndex="index" />
	  <no-data v-if="!data.total && data.hasInitPage" />
	  <dialog-model v-model="model.show" :item="model.interview" :list="data.list" />
	</div>
</template>
<script>
import ChatBar from './chatBar'
import NoData from './noData'
import DialogModel from './dialog'

export default {
	props: {
    data: {
      type: Object,
      default: () => ({
      	list: [],
			  page: 1,
			  count: 20,
			  hasInitPage: false,
			  total: 0,
			  pageSize: 20
      })
    },
    tab: {
      type: String,
      default: 'apply'
    }
  },
  data() {
  	return {
  		model: {
	    	show: false,
	    	title: '面试详情',
	    	interview: {}
	    }
  	}
  },
	components: {
		ChatBar,
		NoData,
		DialogModel
	},
	methods: {
		bindClick(item, index) {
			this.model.show = true
			this.model.interview = {
				...item,
				editItemIndex: index
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.search-content {
	margin-bottom: 50px;
	.li-item {
		&:last-child {
			border-bottom: 0;
		}
	}
}
</style>