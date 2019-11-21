<template>
<!-- 附件简历上传 -->
  <div class="resume-file">
      <p>附件简历</p>
      <div class="c-btn resume-add-btn"> 上传附件简历</div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }

}
</script>
<style lang="scss" scoped>
.resume-file {
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: $shadow-1;
  p {
    font-size: 17px;
    color: $title-color-1;
    margin-bottom: 20px;
  }
}
</style>
