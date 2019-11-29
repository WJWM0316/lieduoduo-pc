<template>
<!-- 预览简历 -->
  <div class="resume-review">
    <slot>
      <div class="resume-review-btn-wrapper">
        <el-button class="review-btn" type="primary" @click="handleShowResume">预览简历</el-button>
      </div>
    </slot>
    <el-dialog
      :visible.sync="reviewStatus"
      top="49px"
      :lock-scroll="true"
      width="770px">
      <div class="resume-content">
        <base-info :resume="resume" status="view"/>
        <span class="resume-hr"><span></span></span>
        <desc-info :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <proposal :resume="resume" status="view"/>
        <span class="resume-hr"><span></span></span>
        <experience :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <project :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <education :resume="resume" status="view" />
        <span class="resume-hr"><span></span></span>
        <more :resume="resume" status="view" />
      </div>
      <div slot="footer" class="resume-review-extend">
        <el-popover
          placement="right"
          width="145"
          popper-class="c-resume-share-image"
          trigger="click">
          <div class="cresume-share-image">
            <img :src="qrcode" alt="" style="width: 100%">
          </div>
          <div slot="reference" class="resume-share">
            <i class="iconfont icon-fenxiang"></i><span>分享到微信</span>
          </div>
        </el-popover>
        <el-popover
          placement="right-start"
          width="150"
          trigger="click">
          <div class="download-popover" v-loading="downloadLoading">
              <p class="download-popover-title">下载简历</p>
              <p class="download-popover-tip">请选择下载格式：</p>
              <div v-for="item in downFileType" :key="item.type" class="download-popover-list" @click="handleDownload(item)">
                <span>
                  <i class="iconfont" :class="item.icon" :style="{color: item.color}"></i>
                </span>
                <span class="download-type">{{item.title}}</span>
                <span><i class="iconfont icon-xiazai"></i></span>
              </div>
          </div>
          <div slot="reference" class="resume-share .resume-share-download">
            <i class="iconfont icon-xiazai"></i><span>下载简历</span>
          </div>
        </el-popover>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import BaseInfo from './base'
import DescInfo from './desc'
import Proposal from './proposal'
import Experience from './experience'
import Project from './project'
import Education from './education'
import More from './more'
import { getMyQrcodeApi } from 'API/qrcode'
import { FileType } from '@/config/vars'
import { downloadPDF, downloadWord } from 'API/common'
export default {
  components: {
    BaseInfo,
    DescInfo,
    Proposal,
    Experience,
    Project,
    Education,
    More
  },
  props: {
    resume: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      reviewStatus: false,
      downloadLoading: false,
      downFileType: [FileType.pdf, FileType.doc],
      qrcode: ''
    }
  },
  methods: {
    handleShowResume () {
      this.reviewStatus = true
      this.getQrcode()
    },
    getQrcode () {
      if (this.qrcode) return
      getMyQrcodeApi({
        path: 'page/common/pages/resumeDetail/resumeDetail',
        params: `uid=${this.resume.uid}`
      }).then(({ data }) => {
        this.qrcode = data.data.url
      })
    },
    handleDownload (item) {
      if (this.downloadLoading) return
      const { vkey, name } = this.resume
      if (!vkey) return
      this.downloadLoading = true
      if (item.type === 'pdf') {
        downloadPDF({ vkey }).then(({ data }) => {
          this.downloadLoading = false
          this.$util.downFile(data, name + '.pdf')
        }).catch(() => {
          this.downloadLoading = false
        })
      } else if (item.type === 'doc') {
        downloadWord({ vkey }).then(({ data }) => {
          this.downloadLoading = false
          this.$util.downFile(data, name + '.docx')
        }).catch(() => {
          this.downloadLoading = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  height: 100vh;
  overflow: hidden;
}
.resume-review {
  & /deep/ .el-dialog__body {
    padding: 0;
    height: calc(100vh - 49px - 30px);
    position: relative;
    width: 770px;
    overflow: hidden;
  }
}
.resume-review-btn-wrapper {
  width:100%;
  text-align: center;
  background-color: #fff;
  padding: 20px 22px;
  box-sizing: border-box;
  box-shadow: $shadow-1;
  .review-btn {
    width: 100%;
  }
}
.resume-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  & /deep/ .proposal-warpper .list-item {
    margin-top: 0;
  }
}
.resume-hr {
  margin: 40px 0;
}
.resume-review-extend {
  position: absolute;
  right: -48px;
  width: 48px;
  top: 0;
  z-index: 1;
  .resume-share {
    padding: 20px 17px;
    font-size: 14px;
    background: $bg-color-5;
    color: $title-color-2;
    cursor: pointer;
    border-radius:0px 4px 4px 0px;
  }
  .iconfont {
    font-size: 14px;
    color: $title-color-2;
    padding-bottom: 5px;
    display: inline-block;
  }
  & > span + span {
    padding-top: 12px;
    display: inline-block;
  }
}
</style>
<style lang="scss">
.download-popover {
  .download-popover-title {
    font-size: 14px;
    color: $title-color-1;
  }
  .download-popover-tip {
    font-size: 12px;
    color: $title-color-2;
    margin: 4px 0 20px;
  }
  .download-popover-list {
    width: 100%;
    @include flex-v-center;
    line-height: 1;
    cursor: pointer;
    & > span:last-child {
      margin-left: auto;
    }
    .download-type {
      margin-left: 8px;
    }
    .iconfont {
      font-size: 36px;
    }
    .icon-xiazai {
      font-size: 14px;
      color: $font-color-12;
    }
  }
  .download-popover-list + .download-popover-list {
    margin-top: 18px;
  }
  .download-popover-list:hover {
    .icon-xiazai {
      color: $main-color-1;
    }
  }
}
.c-resume-share-image.el-popover {
  width: 146px;
  min-width: 140px;
  box-sizing: border-box;
  height: 140px;
}
.cresume-share-image {
  img {
    max-width: 100%;
  }

}
</style>
