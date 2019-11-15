<template>
  <div class="base-info">
    <wrapper>

    </wrapper>
  </div>
</template>
<script>
import { getBaseInfo } from 'API/resume'
import Wrapper from './wrapper'
export default {
  components: {
    Wrapper
  },
  data () {
    return {
      info: {}
    }
  },
  created () {
    this.getInfs()
  },
  methods: {
    getInfs () {
      getBaseInfo().then(({ data }) => {
        this.info = data.data || {}
        // console.log(data)
      })
    }
  }
}
</script>
