<template>
  <!-- 图片上传组件 -->
  <div class="picture-wrapper">
    <template v-if="multiple">
      <ul class="common-list">
        <li
          v-for="(imageItem, imageIndex) in value"
          :key="imageIndex"
          :data-key="imageIndex"
          class="draggable"
          :style="`background-image: url(${imageItem.url}); background-size: cover; background-repeat: no-repeat; background-position: center center;`"
          draggable="true">
          <div class="btn-close" @click="handleRemoveImage(imageIndex)">
            <i class="iconfont iconiconfontshanchu"></i>
          </div>
        </li>
        <template v-if="!multipleBtn">
          <li class="upload-card" @click="handleClickInput" v-loading="multipleLading" v-if="value.length < 20">
            <i class="iconfont icontianjia"></i>
          </li>
        </template>
      </ul>
      <template v-if="multipleBtn">
        <div class="upload-btn"><el-button size="small" type="primary" @click="handleClickInput" :loading="multipleLading" v-if="value.length < 20" plain round>点击上传</el-button></div>
      </template>
      <input
        type="file"
        multiple="multiple"
        :ref="eventKey"
        @change="handleChange"
        style="display: none;"
        accept="image/*"
      />
    </template>
    <template v-else>
      <div class="single-upload">
        <div slot="single-wrapper" @click="handleClickInput">
          <div class="avatar"  v-if="value">
            <img :src="value" alt />
          </div>
          <el-button type="primary" size="small"  round plain :loading="singleLoding">{{value ? '重新上传' : '上传图片'}}</el-button>
        </div>
        <input
          type="file"
          :ref="eventKey"
          @change="handleChange"
          style="display: none;"
          accept="image/*"
        />
      </div>
    </template>
    <div class="image-tip" v-if="showTipText">{{tipText}}</div>
  </div>
</template>
<script>
import { uploadApi } from 'API/auth'
export default {
  props: {
    value: [String, Array],
    multiple: {
      // 是否是选
      type: Boolean,
      default: false
    },
    tipText: {
      type: String,
      default:
        '图片将向候选人展示，建议上传机构工作环境、LOGO墙、团队氛围等相关图片；'
    },
    disabled: Boolean,
    showTipText: Boolean,
    eventKey: {
      type: String,
      default: 'input'
    },
    limit: { // 限制上传文件的大小 单位M
      type: Number,
      default: 5
    },
    attachType: { // 图片上传的种类 avatar, img, audio, video, doc, compress, application
      type: String,
      default: 'img'
    },
    setwater: { // 是否添加水印，1加 0不加
      type: Number,
      default: 0
    },
    duration: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: false
    },
    multipleBtn: Boolean // multiple 类型的时候，显示按钮 | card 按钮
  },
  data () {
    return {
      uploadImage: process.env.VUE_APP_B_TERM_API,
      singleLoding: false,
      multipleLading: false
    }
  },
  methods: {
    handleChange (evt) {
      let files = null; let uploadFile = []
      try {
        files = evt.dataTransfer.files
      } catch (e) {
        files = evt.target.files
      }
      // 未选择图片
      if (!files.length) return
      // 只允许上传一张图片
      if (!this.multiple && files.length > 1) {
        this.$message.error('每次只允许上传一个文件！')
        return
      }
      // 判断大小
      for (let item = 0; item < files.length; item++) {
        if (files[item].size / 1024 / 1024 > this.limit) {
          this.$message.error('上传的图片大小是5MB~')
        } else {
          uploadFile.push(files[item])
        }
      }
      // console.log(uploadFile)
      if (!uploadFile.length) return
      const formData = new FormData()
      formData.append('attach_type', this.attachType)
      formData.append('setwater', this.setwater)
      uploadFile.forEach((val, index) => {
        formData.append(`img${index + 1}`, val)
      })
      this.postImage(formData)
      evt.target.value = ''
    },
    postImage (data) {
      if (!this.multiple) this.singleLoding = true
      if (this.multiple) this.multipleLading = true
      uploadApi(data).then(({ data, httpStatus }) => {
        if (!this.multiple) this.singleLoding = false
        if (this.multiple) this.multipleLading = false
        if (httpStatus === 200) {
          const newList = [...this.value, ...data]
          this.$emit('change', newList)
          if (this.multiple) {
            this.$emit('update:value', newList)
            if (this.$parent.$options.componentName === 'ElFormItem') {
              if (this.validateEvent) {
                this.$parent.$emit('el.form.change', newList)
              }
            }
          } else {
            this.$emit('update:value', data[0].url)
            if (this.$parent.$options.componentName === 'ElFormItem') {
              if (this.validateEvent) {
                this.$parent.$emit('el.form.change', data[0].url)
              }
            }
          }
        }
      }).catch(() => {
        if (!this.multiple) this.singleLoding = false
      })
    },
    handleRemoveImage (index) {
      if (this.disabled) return
      this.value.splice(index, 1)
    },
    handleClickInput () {
      if (this.disabled) return
      if (this.multiple && this.multipleLading) return
      // console.log(this.$refs[this.eventKey])
      this.$refs[this.eventKey].click()
    }
  }
}
</script>
<style lang="scss" scoped>
.common-list {
  position: relative;
  .logo-img {
    width: 88px;
    height: 88px;
    position: relative;
    overflow: hidden;
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    &:hover {
      .btn-close {
        opacity: 1;
      }
    }
  }
  li {
    width: 88px;
    height: 88px;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 24px;
    overflow: hidden;
    text-align: center;
    img {
      max-width: 100%;
      min-height: 100%;
    }
    &:hover {
      .btn-close {
        opacity: 1;
      }
    }
  }
  .upload-card {
    position: relative;
    box-sizing: border-box;
    border: solid 1px #d8d8d8;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    .icontianjia {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #dcdcdc;
      font-size: 24px;
    }
  }
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    color: #bcbcbc;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    text-align: center;
    line-height: 88px;
    border-radius: 5px;
    overflow: hidden;
    color: white;
    transition: all ease 0.4s;
    opacity: 0;
  }
}
.upload-btn  .el-button{
  margin-left: 0;
  vertical-align: middle;
}
.single-upload {
  display: flex;
  align-items: center;
  height: 70px;
}
.avatar {
  height: 60px;
  width: 60px;
  overflow: hidden;
  background: #fff;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
   margin-right: 25px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.el-button {
  border: 1px solid rgba(101, 39, 145, 1);
}
.image-tip {
  color: #bcbcbc;
  font-size: 12px !important;
  line-height: 25px !important;
}
</style>
