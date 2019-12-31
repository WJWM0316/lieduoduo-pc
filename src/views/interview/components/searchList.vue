<template>
	<div class="search-content">
		<ChatBar :item="item" v-for="(item, index) in data.list" :key="index" :tab="tab" @click="bindClick" />
	  <no-data v-if="!data.total && data.hasInitPage" />
	  <dialog-model :title="model.title" v-model="model.show" @confirm="confirm" @cancle="cancle" :infos="model.interview" />
	</div>
</template>
<script>
import ChatBar from './chatBar'
import Schedule from './schedule'
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
    Schedule,
    ChatBar,
    NoData,
    DialogModel
  },
  created () {
    console.log('23', this.chunk(['a', 'b', 'c', 'd', 'e'], 2))
  },
  methods: {
    chunk (arr, size) {
      var new_arr = []
      for (var i = 0; i < arr.length; i += size) {
        new_arr.push(arr.slice(i, i + size))
      }
      return new_arr
    },
    bindClick (item) {
      this.model.show = true
      this.model.interview = item
    },
    confirm () {
      this.model.show = false
    },
    cancle () {
      this.model.show = false
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
