<template>
	<div class="search-content">
		<chat-bar
			:item="item" v-for="(item, index) in data.list"
			:key="index"
			:tab="tab"
			@click="bindClick($event, index)"
			:rowIndex="index"
			:class="{'li-item-last': index === data.list.length - 1}">
		</chat-bar>
	  <no-data v-if="!data.total && data.hasInitPage" :tab="tab" />
	  <dialog-model v-model="model.show" :item="model.interview" />
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
  data () {
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
    bindClick (item, index) {
      item.redDot = 0
      this.model.show = true
      this.model.interview = {
        ...item,
        editItemIndex: index
      }
    }
  }
}
</script>
<style lang="scss">
.search-content {
	min-height: 790px;
	.li-item-last {
		&:before{
			display: none;
		}
	}
}
</style>
