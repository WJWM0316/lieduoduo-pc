<template>
<!-- 附件简历上传 -->
  <div class="resume-file">
      <p class="resume-file-header">
        <span>附件简历</span>
        <span class="iconfont icon-shanchu resume-file-remove" @click="handleRemoveAttach" v-if="attach.id"></span>
      </p>
      <upload-file
        @change="uploadSuccess"
        :size="8"
        :showTips="true"
        :value="attach">
        <div class="c-btn resume-add-btn">{{attach.id ? '重新上传附件简历' : '上传附件简历'}}</div>
      </upload-file>
  </div>
</template>
<script>
import UploadFile from 'COMPONENTS/common/upload/file'
import { saveResumeAttach, deleteResumeAttach } from 'API/resume'
export default {
  props: {
    resume: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    attach () {
      return this.resume.resumeAttach || {}
    }
  },
  components: { UploadFile },
  data () {
    return {

    }
  },
  methods: {
    // 上传成功
    uploadSuccess (attach) {
      saveResumeAttach({ attach_resume: attach.id, attach_name: attach.fileName }).then(({ data }) => {
        if (data.httpStatus === 200) {
          this.$message.success('上传附件简历成功')
          this.$store.commit('overwriteResume', {
            resumeAttach: attach
          })
        }
      })
    },
    handleRemoveAttach () {
      this.$confirm('确定删除该附件简历吗？删除后面试官将无法接收你的附件简历', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteResumeAttach().then(({ data }) => {
          if (data.httpStatus === 200) {
            this.$store.commit('overwriteResume', {
              resumeAttach: {}
            })
          }
        })
      }).catch(() => {})
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
.resume-file-header {
  display: flex;
  .resume-file-remove {
    color: $font-color-12;
    font-size: 14px;
    margin-left: auto;
    cursor: pointer;
  }
  .resume-file-remove:hover {
    color: $main-color-1;
  }
}
</style>
