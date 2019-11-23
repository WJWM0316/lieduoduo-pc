<template>
  <div class="more-introduce">
    <wrapper ref="wrapper" :is-empty="isEmpty" @command="handleCommand" :status="status">
      <template slot="header">更多介绍</template>
      <template slot="content">
        <div class="resume-list-desc" v-if="info.introduce">{{info.introduce}}</div>
        <div class="resume-images">
          <div class="image-wrapper" v-for="item in info.imgs" :key="item.id">
            <img :src="item.url" alt="">
          </div>
        </div>
      </template>
      <template slot="bottom" v-if="isEmpty">
        <div class="c-btn resume-add-btn" @click="handleShowForm()"><i class="el-icon-plus" /> 添加更多介绍</div>
      </template>
      <template slot="edit">
        <p class="form-header-title">{{isAdd ? '添加': '编辑'}}更多介绍</p>
        <el-form :model="form">
          <div class="form-item" style="width: 100%; padding-left: 0px">
            <p class="form-title">文字集（选填）</p>
            <el-form-item>
              <el-input
                type="textarea"
                placeholder="可以描述你的技能、获奖证书，等等。"
                v-model="form.introduce"
                :rows="5"
                maxlength="250"
                show-word-limit />
            </el-form-item>
          </div>
          <div class="form-item" style="width: 100%; padding-left: 0px">
            <p class="form-title">图片集（选填）</p>
            <p class="form-titl-tips">可以上传你的作品、相关证明</p>
            <el-form-item>
              <Picture
                :value.sync="form.imgs"
                :multiple="true"
                :size="20"
                :limit="20" />
            </el-form-item>
          </div>
        </el-form>
      </template>
    </wrapper>
  </div>
</template>
<script>
import Wrapper from './wrapper'
import Picture from 'COMPONENTS/common/upload/picture'
import { setMoreIntroduce } from 'API/resume'
export default {
  props: {
    propClass: String,
    resume: {
      type: Object,
      default: () => ({})
    },
    status: String
  },
  components: { Wrapper, Picture },
  computed: {
    info () {
      const { moreIntroduce } = this.resume
      return moreIntroduce || { imgs: [], introduce: '' }
    },
    isEmpty () {
      return !this.info.imgs.length && !this.info.introduce
    }
  },
  data () {
    return {
      isAdd: true,
      form: {
        introduce: '',
        imgs: []
      }
    }
  },
  methods: {
    handleCommand ({ type, cb }) {
      if (type === 'edit') {
        this.isAdd = false
        Object.assign(this.form, this.info)
      } else if (type === 'save') {
        const { imgs, introduce } = this.form
        if (!imgs.length && !introduce) {
          this.$alert('文字和图片至少一个不为空哦', '提示', {
            confirmButtonText: '好的',
            type: 'warning'
          })
          // eslint-disable-next-line standard/no-callback-literal
          return cb(false)
        }
        setMoreIntroduce({
          introduce,
          attachIds: imgs.map(val => val.id).join(',')
        }).then(({ data }) => {
          if (data.httpStatus === 200) {
            cb()
            this.$store.commit('overwriteResume', {
              moreIntroduce: { imgs, introduce }
            })
          } else {
            // eslint-disable-next-line standard/no-callback-literal
            cb(false)
          }
        }).catch(() => {
          // eslint-disable-next-line standard/no-callback-literal
          cb(false)
        })
      }
    },
    handleShowForm (isAdd = true) {
      this.isAdd = isAdd
      this.$refs.wrapper.showEditCompoents()
    }
  }
}
</script>
<style lang="scss" scoped>
.more-introduce {
  div.resume-list-desc {
    padding: 0;
    margin-bottom: 14px;
  }
  .resume-images {
    @include flex-v-center;
    flex-wrap: wrap;
  }
  .image-wrapper {
    @include img-radius(96px, 96px, 4px);
    margin-bottom: 10px;
  }
  .image-wrapper+.image-wrapper{
    margin-left: 10px;
  }
  .image-wrapper:nth-child(6n) {
    margin-left: 0px;
  }
}
.form-titl-tips {
  font-size: 12px;
  color: $title-color-2;
  margin-bottom: 20px;
}
</style>
