<template>
<!-- 上传附件简历 -->
  <div>
    <template v-if="showUploadDetails">
      <div class="file-wrapper" v-if="value.id || tempFile.id">
        <span class="file-icon">
          <i class="iconfont" :class="fileTypeStyle.icon" :style="{'color': fileTypeStyle.color}"></i>
        </span>
        <div class="file-content">
          <span class="file-name">{{tempFile.fileName || value.fileName}}</span>
          <div class="file-process" v-if="uploadLoading || tempFile.id">
            <div :style="{width: precent + '%'}" class="file-processing"></div>
          </div>
          <div class="file-info" v-else>
            <span class="file-time">{{value.createdAt | date('YYYY-MM-DD')}} 更新</span>
            <span class="file-size">{{value.sizeM}}</span>
          </div>
        </div>
      </div>
    </template>
    <div @click="handleClickInput" v-loading="uploadLoading">
      <slot><el-button type="primary" :disabled="disabled">文件上传</el-button></slot>
    </div>
    <input
      type="file"
      :ref="eventKey"
      @change="handleChange"
      style="display: none;"
      :accept="accept"
    />
  </div>
</template>
<script>
import { uploadApi } from 'API/auth'
import { FileType } from '@/config/vars'
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    attachType: { // 接口图片上传的种类 avatar, img, audio, video, doc, compress, application
      type: String,
      default: 'doc'
    },
    eventKey: {
      type: String,
      default: 'file'
    },
    size: { // 限制上传文件的大小 单位M
      type: Number,
      default: 10
    },
    accept: { // 限制上传文件的格式
      type: String,
      default: '.pdf,image/png,image/jpg,.doc,.docx'
    },
    setwater: { // 是否添加水印，1加 0不加
      type: Number,
      default: 0
    },
    showTips: Boolean, // 是否提示上传的文件类型
    disabled: Boolean,
    showUploadDetails: {
      type: Boolean,
      default: true
    },
    islogin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    fileTypeStyle () {
      if (this.tempFile.id) {
        return FileType[this.tempFile.extension]
      }
      return this.value.id ? FileType[this.value.extension] : {}
    }
  },
  data () {
    return {
      uploadLoading: false, // 禁止用户重复提交
      precent: 0,
      fileName: '',
      tempFile: {}
    }
  },
  methods: {
    handleChange (evt) {
      let file = evt.target.files && evt.target.files[0]
      if (!file) return
      // 判断大小
      if (file.size / 1024 / 1024 > this.size) {
        this.$message.warning('上传的图片大小是5MB~')
        return
      }
      this.tempFile = {
        id: file.lastModified,
        fileName: file.name,
        extension: this.getFileExtension(file.name)
      }
      // 识别上传类型
      let attachtype = this.attachType
      if (this.accept.includes(this.tempFile.extension)) {
        // 兼容上传接口
        attachtype = ['png', 'jpg', 'jpeg', 'gif'].includes(this.tempFile.extension) ? 'img' : this.attachType
      } else {
        this.$message.warning('上传文件格式不符,请重新选择')
        this.tempFile = {}
        return
      }
      const formData = new FormData()
      formData.append('attach_type', attachtype)
      formData.append('setwater', this.setwater)
      formData.append('img1', file)
      this.postImage(formData)
      evt.target.value = ''
    },
    postImage (formdata) {
      this.uploadLoading = true
      this.$emit('before')
      uploadApi(formdata, this.uploadProgress).then(({ data }) => {
        if (data.httpStatus === 200) {
          this.$emit('change', data.data[0])
          this.$emit('update:value', data.data[0])
        }
        this.uploadLoading = false
        // 延迟一秒钟恢复默认值
        window.setTimeout(() => {
          this.tempFile = {}
          this.precent = 0
        }, 1000)
      }).catch(() => {
        this.$emit('fail')
        this.tempFile = {}
        this.uploadLoading = false
        this.precent = 0
      })
    },
    // 上传
    uploadProgress (progressEvent) {
      if (progressEvent.lengthComputable) {
        const { loaded, total } = progressEvent
        this.precent = Math.ceil((loaded / total) * 100)
      }
    },
    // 获取扩展名
    getFileExtension (filename) {
      // eslint-disable-next-line no-useless-escape
      const matches = filename.match(/\.[^\.]+$/)
      if (matches) {
        return matches[0].replace('.', '')
      }
      return 'doc'
    },
    handleClickInput () {
      if (this.disabled || this.uploadLoading) return
      if (!this.islogin) { return }
      if (this.showTips) {
        this.$alert(`<p class="alert-content">文件大小不超过 ${this.size}M</p>`, '支持pdf、jpg、png、doc、docx格式附件', {
          confirmButtonText: '马上上传',
          confirmButtonClass: 'alert button',
          dangerouslyUseHTMLString: true,
          customClass: 'file-alert',
          center: true
        }).then(() => {
          this.$refs[this.eventKey].click()
        })
      } else {
        this.$refs[this.eventKey].click()
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.file-wrapper {
  @include flex-v-center;
  margin-bottom: 32px;
  .file-icon {
    min-width: 44px;
    margin-right: 8px;
    i {
      font-size: 43px;
    }
  }
  .file-content {
    max-width: 200px;
    flex: 1;
  }
  .file-name {
    font-size: 14px;
    display: inline-block;
    width: 100%;
    color: $title-color-1;
    @include ellipsis;
  }
  .file-info {
    margin-top: 6px;
    color: $title-color-2;
    display: flex;
    font-size: 12px;
    .file-size {
      margin-left: auto
    }
  }
  .file-process {
    margin-top: 10px;
    border-radius:6px;
    height:8px;
    width: 100%;
    background: $bg-color-6;
    overflow: hidden;
  }
  .file-processing {
    height:8px;
    background: $bg-color-10;
  }
}
</style>
<style lang="scss">
.file-alert .el-message-box__title{
  font-size: 14px;
  color: $title-color-1;
}
.file-alert .el-message-box__btns {
  padding: 42px 0 0px !important;
}
.alert-content {
  color: $sub-color-1;
}
.alert.button {
  width: 258px !important;
}

</style>
