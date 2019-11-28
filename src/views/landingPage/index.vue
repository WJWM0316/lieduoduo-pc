<template>
  <div id="candidate">
    <div class="pop">
      <div class="resumeBox">
        <div class="head">
          <div class="back" v-if="isshow" @click="toback()">
            <i class="iconfont icon-right"></i>
            <span>返回PC端</span>
          </div>
          <div class="welcome" v-if="nowResumeMsg.sendInfo">
            <div class="welimg"><img :src="nowResumeMsg.sendInfo.avatarInfo.smallUrl" alt v-if="nowResumeMsg.sendInfo" /></div>
            <span>{{nowResumeMsg.sendInfo.realname}} 将这封简历共享给你</span>
          </div>
        </div>
        <div class="resumeLyout">
          <div class="ResumeDetails">
            <!-- 基础信息 -->
            <div class="base">
              <div class="message">
                <div class="msgUrl">
                  <img class="magimg" :src="nowResumeMsg.avatar.url" alt v-if="nowResumeMsg.avatar" />
                  <span class="gender" v-show="nowResumeMsg.gender===2">
                    <img class="genderimg1" v-show="nowResumeMsg.gender===2" src="~IMAGES/girl.png" />
                  </span>
                  <span class="gender2" v-show="nowResumeMsg.gender===1">
                      <img class="genderimg2" src="~IMAGES/boy.png" v-show="nowResumeMsg.gender===1">
                  </span>
                </div>
                <div class="msgUserInfo">
                  <div class="basemsg">
                    <span class="realName">{{nowResumeMsg.name}}</span>
                    <div class="lebalList">
                      <div class="lebalItem">
                        <i class="icon iconfont icon-zhiwei" style></i>
                        <span>{{nowResumeMsg.workAgeDesc}}</span>
                      </div>
                      <div class="lebalItem">
                        <i class="icon iconfont icon-nianling"></i>
                        <span>{{nowResumeMsg.age}}岁</span>
                      </div>
                      <div
                        class="lebalItem"
                        :style="nowResumeMsg.jobStatus===''?'margin-right:0px;':''"
                      >
                        <i class="icon iconfont icon-jiaoyu"></i>
                        <span>{{nowResumeMsg.degreeDesc}}</span>
                      </div>
                      <div class="lebalItem">
                        <span
                          class="status"
                          v-if="nowResumeMsg.jobStatus"
                        >{{nowResumeMsg.jobStatusDesc}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="description">
                    <span class="msg">{{nowResumeMsg.signature}}</span>
                    <div class="iconList">
                      <span
                        class="iconItem"
                        v-for="(item,index) in nowResumeMsg.personalizedLabels"
                        :key="item.labelName"
                        :style="index===nowResumeMsg.personalizedLabels.length-1?'margin-bottom:0px;':''"
                      >{{item.labelName}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 求职意向 -->
            <div class="intention" v-show="nowResumeMsg.expects!=''">
              <p class="title">求职意向</p>
              <div class="intentList">
                <div
                  class="intentionItem"
                  v-for="(item,index) in nowResumeMsg.expects"
                  :key="item.position"
                  :style="index===nowResumeMsg.expects.length-1?'padding-bottom:0px;':''"
                >
                  <span class="position">{{item.position}}&nbsp;|&nbsp;{{item.city}}</span>
                  <span v-if="item.fields.length>0">|</span>
                  <div style="margin-left:9px;display:inline-block;">
                    <div class="fields" v-for="(item1,index1) in item.fields" :key="index1">
                      <span>{{item1.field}}&nbsp;&nbsp;</span>
                    </div>
                  </div>
                  <span class="price">{{item.salaryFloor}}k-{{item.salaryCeil}}k</span>
                </div>
              </div>
            </div>
            <!-- 工作经历 -->
            <div class="workExperience" v-show="nowResumeMsg.careers!=''">
              <p class="title">工作经历</p>
              <div class="workList">
                <div
                  class="workItem"
                  v-for="(item,index) in nowResumeMsg.careers"
                  :key="item.id"
                  :style="index===nowResumeMsg.careers.length-1?'margin-bottom:0px;':''"
                >
                  <div class="workTime">
                    <span>{{item.company}} | {{item.position}}</span>
                    <span>{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                  </div>
                  <div class="workContent">
                    <span class="duties">
                      <pre>{{item.duty}}</pre>
                    </span>
                  </div>
                  <div class="workIconList" v-show="item.technicalLabels.length>0">
                    <span
                      v-for="item1 in item.technicalLabels"
                      :key="item1.technicalLabels"
                    >#{{item1.labelName}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 项目经历 -->
            <div class="workExperience" v-show="nowResumeMsg.projects!=''">
              <p class="title">项目经历</p>
              <div class="workList">
                <div
                  class="workItem"
                  v-for="(item,index) in nowResumeMsg.projects"
                  :key="item.role"
                  :style="index===nowResumeMsg.projects.length-1?'margin-bottom:0px;':''"
                >
                  <div class="workTime">
                    <span>{{item.name}} &nbsp;| &nbsp;{{item.role}}</span>
                    <span>{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                  </div>
                  <div class="workContent">
                    <span class="duties">
                      <pre>{{item.description}}</pre>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 教育经历 -->
            <div class="workExperience" v-show="nowResumeMsg.educations!=''">
              <p class="title">教育经历</p>
              <div class="workList">
                <div
                  class="workItem"
                  v-for="(item,index) in nowResumeMsg.educations"
                  :key="item.school"
                  :style="index===nowResumeMsg.educations.length-1?'margin-bottom:0px;':''"
                >
                  <div class="workTime">
                    <span>{{item.school}} | {{item.degreeDesc}} | {{item.major}}</span>
                    <span>{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                  </div>
                  <div class="workContent" v-show="item.experience!=''">
                    <span class="duties">
                      <pre>{{item.experience}}</pre>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 更多介绍 -->
            <div class="workExperience" v-if="nowResumeMsg.moreIntroduce">
              <p class="title">更多介绍</p>
              <div class="workList">
                <pre v-if="nowResumeMsg.moreIntroduce.introduce">{{nowResumeMsg.moreIntroduce.introduce}}</pre>
                <div class="imgList">
                  <img
                    :src="item.url"
                    alt
                    v-for="(item,index) in nowResumeMsg.moreIntroduce.imgs"
                    :key="index"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="Code">
            <div class="download">
              <div class="title">下载简历</div>
              <div class="select">请选择下载格式：</div>
              <div class="pdf">
                <div class="pdf_l">
                  <i class="iconfont icon-pdf" v-if="!isshow" style="color: #926666"></i>
                  <i class="iconfont icon-pdf" v-else style="color: #FA3939"></i>
                </div>
                <div class="pdf-c">{{nowResumeMsg.name}}.PDF</div>
                <div class="pdf-r" v-if="!isshow"><a>下载</a></div>
                <div class="pdf-r" @click="onloadfile('pdf')" v-else><a style="color:#652791">下载</a></div>
              </div>
              <div class="pdf">
                <div class="pdf_l">
                  <i class="iconfont icon-word" v-if="!isshow" style="color: #667c96"></i>
                  <i class="iconfont icon-word" v-else style="color: #4a90e2"></i>
                </div>
                <div class="pdf-c">{{nowResumeMsg.name}}.DOC</div>
                <div class="pdf-r" v-if="!isshow"><a>下载</a></div>
                <div class="pdf-r" @click="onloadfile('doc')" v-else><a style="color:#652791">下载</a></div>
                <!-- <a :href="nowResumeMsg.resumeAttach.url" :download="nowResumeMsg.resumeAttach.fileName">下载</a> -->
              </div>
            </div>
            <div class="haslogin" v-if="!isshow">
              <div class="login-btn" @click="login">登录</div>
              <div class="login-desc">*登录后即可下载/打印简历</div>
            </div>
            <div class="msgCode" v-if="shareResumeImg && isshow">
              <img :src="shareResumeImg" />
              <span>扫码分享</span>
            </div>
            <div class="isAdmin">
              <div class="ContactInformation">
                <p class="contactTitle" v-if="nowResumeMsg.mobile||nowResumeMsg.wechat">联系方式:</p>
                <div class="Contact" v-if="nowResumeMsg.mobile">
                  <span>手机号: </span>
                  <span>{{nowResumeMsg.mobile}}</span>
                </div>
                <div class="Contact" v-if="nowResumeMsg.wechat">
                  <span>微信号:</span>
                  <span >{{nowResumeMsg.wechat}}</span>
                </div>
              </div>
            </div>
            <div class="seefujian" v-if="nowResumeMsg.resumeAttach">
              <div class="title">附件简历:</div>
              <div class="seebtn"><a :href="nowResumeMsg.resumeAttach.url" :download="nowResumeMsg.resumeAttach.fileName">查看附件</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getshareResumeVkeyApi } from 'API/userJobhunter'
import { shareResumeApi } from 'API/forward'
import { getAccessToken } from 'API/cacheService'
import { createonlinepdf, createonlineword } from 'API/common'

  @Component({
    name: 'landingpage',
    methods: {
    },
    computed: {},
    components: {
    }
  })
export default class CourseList extends Vue {
    hasonload = false
    uid = ''
    isshow = false
    nowResumeMsg = {}
    shareResumeImg = '' // 简历二维码
    created () {
      this.vkey = this.$route.query.vkey
      this.getResume(this.vkey)
      if (getAccessToken()) {
        this.isshow = true
      } else {
        this.isshow = false
      }
    }
    // 获取简历
    getResume (resumeId) {
      getshareResumeVkeyApi({ vkey: resumeId }).then(res => {
        this.nowResumeMsg = res.data.data
        if (getAccessToken()) {
          this.getShareResume(resumeId)
        }
      })
    }
    toback () {
      this.$router.push({ name: 'index' })
    }
    login () {
      this.$router.push({ name: 'login' })
    }
    onloadfile (type) {
      let params = { jobhunterVkey: this.nowResumeMsg.vkey }
      if (type === 'pdf') {
        createonlinepdf(params).then((res) => {
          // console.log(res)
          this.$util.downFile(res.data, this.nowResumeMsg.name + '.pdf')
        })
      }
      if (type === 'doc') {
        createonlineword(params).then((res) => {
          this.$util.downFile(res.data.data, this.nowResumeMsg.name + '.doc')
        })
      }
    }
    // 获取简历二维码
    getShareResume (resumeId) {
      shareResumeApi({ resumeUid: resumeId, forwardType: 1 }).then(res => {
        this.shareResumeImg = res.data.data.positionQrCodeUrl
      })
    }
  }
</script>
<style lang="scss" scoped="scoped">
@import "./landingpage.scss";
</style>
