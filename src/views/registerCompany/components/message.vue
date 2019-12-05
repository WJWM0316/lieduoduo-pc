<template>
    <div class="popforward" v-show="visible">
      <div class="noJobBox">
        <div class="content">
        <div class="title">{{title}}</div>
        <div class="desc">{{desc}}</div>
        <div class="handler">
          <div class="sure" @click="sure()">{{btntitle}}</div>
          <div class="cancel" @click="cancel()">取消</div>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    title: String,
    desc: String,
    btntitle: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    cancel () {
      this.$emit('clickcancle', this.visible)
    },
    sure () {
      this.$emit('clicksure', this.title)
    }
  }
}
</script>
<style lang="scss" scoped>
.popforward{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background:rgba(0,0,0,0.6);
  .noJobBox {
    width:432px;
    max-height:200px;
    padding-bottom: 30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 14px 2px rgba(0,0,0,0.2);
    border-radius:8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .content{
    padding: 0 40px;
  }
  .title{
    height:24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    color: #282828;
    padding: 32px 0 6px 0;
  }
  .desc{
    color: #66666E;;
    font-size: 14px;
    margin-bottom: 52px;
    line-height: 20px;
  }
  .handler{
    width: 100%;
    height: 36px;
    font-size: 14px;
    .sure{
      width:116px;
      height:36px;
      background:#00C4CD;
      border-radius:4px;
      line-height: 36px;
      text-align: center;
      float: right;
      cursor: pointer;
      color: #FFFFFF;
    }
    .cancel{
      width:86px;
      height:34px;
      background: #fff;
      line-height: 34px;
      float: right;
      text-align: center;
      margin-right: 16px;
      cursor: pointer;
      border-radius:4px;
      color: #92929B;;
      border:1px solid #92929B;
    }
  }
}
</style>
