<template>
    <div class="pop" v-show="pop.isShow" @click="closeMsg($event)">
      <div class="resumeBox" v-if="showResume" @click="closeload($event)">
        <!-- <div class="Numbering">
          <span>简历编号：{{nowResumeMsg.vkey}}</span>
          <span v-if="nowResumeMsg.resumeUpdateTime !== '0000-00-00 00:00:00'">{{nowResumeMsg.resumeUpdateTime}}更新</span>
          <div class="closediggle" @click="pop.isShow = false">
            <i class="iconfont icon-guanbianniu"></i>
          </div>
        </div>
        <div class="resumeLyout">
          <div class="ResumeDetails">
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
                  <div :class="['basemsg', nowResumeMsg.signature ? '' : 'basecenter']">
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
                        v-if="nowResumeMsg.degreeDesc"
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
            <div class="intention" v-show="nowResumeMsg.expects!=''">
              <p class="title">求职意向</p>
              <div class="intentList">
                <div
                  class="intentionItem"
                  v-for="(item,index) in nowResumeMsg.expects"
                  :key="item.position"
                  :style="index===nowResumeMsg.expects.length-1?'padding-bottom:0px;':''"
                >
                <div class="whitesize">
                  <span class="position">{{item.position}}&nbsp;|&nbsp;{{item.city}}</span>
                  <span v-if="item.fields.length>0" style="margin-right:9px;color:#333">|</span>
                  <span v-for="(item1,index1) in item.fields" :key="index1">{{item1.field}}&nbsp;&nbsp;</span>
                  </div>
                  <span class="price">{{item.salaryFloor}}k-{{item.salaryCeil}}k</span>
                </div>
              </div>
            </div>
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
            <div class="workExperience" v-if="nowResumeMsg.moreIntroduce && nowResumeMsg.moreIntroduce.introduce">
              <p class="title">更多介绍</p>
              <div class="workList">
                <pre>{{nowResumeMsg.moreIntroduce.introduce}}</pre>
               <div class="imgList" v-if="nowResumeMsg.moreIntroduce && nowResumeMsg.moreIntroduce.imgs && nowResumeMsg.moreIntroduce.imgs.length > 0">
                  <div style="position:relative" :key="index" v-for="(item, index) in nowResumeMsg.moreIntroduce.imgs">
                  <img
                    :src="item.url"
                    alt
                  />
                  <a :href="item.url" target="_blank"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Code">
            <div class="handlerpring">
              <div class="onload" @click="hasonload = !hasonload">
                <i class="iconfont icon-xiazai"></i>
              </div>
              <div class="onloadselect"  v-loading="loadingshow" v-show="hasonload" ref="queryBox">
                <div class="title">下载简历</div>
                <div class="select">请选择下载格式:</div>
                <div class="pdf">
                  <div class="p_l">
                    <i class="iconfont icon-pdf" style="color: #FA3939"></i>
                  </div>
                  <div class="p_c">PDF文件</div>
                  <div class="p_r">
                    <a @click="onloadfile('pdf')"><i class="iconfont icon-xiazai selected"></i></a>
                  </div>
                </div>
                <div class="pdf">
                  <div class="p_l">
                    <i class="iconfont icon-word" style="color: rgb(74, 144, 226)"></i>
                  </div>
                  <div class="p_c">Word文档</div>
                  <div class="p_r">
                    <a @click="onloadfile('doc')"><i class="iconfont icon-xiazai selected"></i></a>
                  </div>
                </div>
              </div>
              <div class="share" @click="sharediggle()">
                <i class="iconfont icon-fenxiang"></i>
              </div>
            </div>
            <div class="btnstatus">
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'recruiter-chat', nowResumeMsg, 2)" v-if="!nowResumeMsg.interviewInfo.data.haveInterview && !nowResumeMsg.interviewInfo.data.isOnProtected && !nowResumeMsg.interviewInfo.data.hasUnsuitRecord">开撩约面</div>
              <div class="btndisable" v-if="!nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.isOnProtected">暂时无法约面</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'confirm-interview', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 11">查看联系</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'check-invitation', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 12">查看邀约</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'arranging-interviews', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 21">安排面试</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'arranging-interviews', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 31">
                <span>查看面试</span>
                </div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'arranging-interviews', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 32">
                <span>修改面试</span>
              </div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'interview-retract', nowResumeMsg, 2)" v-if="!nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.hasUnsuitRecord">撤回</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'check-invitation', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus >= 41">面试详情</div>

              <div class="btn2" @click.stop="setJob(nowResumeMsg.uid, 'inappropriate', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && !nowResumeMsg.interviewInfo.data.hasUnsuitRecord">不合适</div>
              <div class="btn2" @click.stop="setJob(nowResumeMsg.uid, 'watch-reson', nowResumeMsg, 2)"  v-if="!nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.hasUnsuitRecord">查看原因</div>
            </div>
            <div class="like_user" @click.stop="ownerOp(true,nowResumeMsg.uid)" v-if="nowResumeMsg.interested">
                <i class="iconfont icon-yishoucang img"></i>
                取消感兴趣
              </div>
              <div class="like_user" @click.stop="ownerOp(false,nowResumeMsg.uid)" v-else >
                <i class="iconfont icon-shoucang img"></i>
                  对Ta感兴趣
              </div>
            <div class="msgCode"  v-if="shareResumeImg">
              <img :src="shareResumeImg" />
              <span>扫码分享</span>
            </div>
            <div class="isAdmin">
              <div class="ContactInformation">
                <p class="contactTitle" v-if="nowResumeMsg.mobile||nowResumeMsg.wechat">联系方式:</p>
                <div class="Contact" v-if="nowResumeMsg.mobile">
                  <span><i class="iconfont icon-dianhua"></i></span>
                  <span>{{nowResumeMsg.mobile}}</span>
                </div>
                <div class="Contact" v-if="nowResumeMsg.wechat">
                  <span><i class="iconfont icon-weixin"></i></span>
                  <span >{{nowResumeMsg.wechat}}</span>
                </div>
              </div>
            </div>
             <div class="seefujian" v-if="nowResumeMsg.resumeAttach">
              <div class="title">附件简历:</div>
              <div class="seebtn" v-if="nowResumeMsg.resumeAttach.extension === 'doc'"><a :href="'https://view.officeapps.live.com/op/view.aspx?src=' + nowResumeMsg.resumeAttach.url" :download="nowResumeMsg.resumeAttach.fileName" target="_blank">查看附件</a></div>
              <div class="seebtn" v-else><a :href="nowResumeMsg.resumeAttach.url" :download="nowResumeMsg.resumeAttach.fileName" target="_blank">查看附件</a></div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
