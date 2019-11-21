<template>
<div class="select" v-show="visible">
    <div :class="['select-item', vo.cur ? 'active' : '']" @click="selectemail(vo, i)" :key="i" v-for="(vo, i) in option">{{vo.value}}</div>
  </div>
</template>
<script>
export default {
  props: {
    option: Array,
    visible: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    selectemail (data, index) {
      this.$emit('selectchange', data)
    }
  }
}
</script>
<style lang="less" scoped="scoped">
.select{
  position: absolute;
  top: 54px;
  left: 0px;
  padding-top: 6px;
  padding-bottom: 6px;
  width:418px;
  z-index:3;
  max-height:140px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background:#fff;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius:3px;
    height: 226px;
  }
  &::-webkit-scrollbar-thumb {
    background:#EBEBEB;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius:3px;
  }
  .select-item{
    height: 32px;
    line-height: 32px;
    padding-left: 13px;
    color: #606266;
    &:hover{
      color:#652791;
      font-weight: bold;
      font-size: 14px;
      background:#EFE9F4;
    }
  }
  .active{
    color:#652791;
    font-weight: bold;
    font-size: 14px;
    background:#EFE9F4;
  }
}
</style>
