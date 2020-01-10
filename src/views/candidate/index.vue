<template>
  <div id="candidate">
    <div class="main_top_warp">
        <div class="main_top">
          <el-badge is-dot :hidden="recruiterIntentionList === 0">
          <div
            class="topBlo topStatusBlo borright"
            :class="{'cur':navType==='apply'}"
            @click="changeNav('apply')"
          >收到意向（{{invitenum}}）</div>
          </el-badge>
          <el-badge is-dot :hidden="recruiterInviteList === 0">
          <div
            class="topBlo topStatusBlo borleft"
            :class="{'cur':navType==='invite'}"
            @click="changeNav('invite')"
          >
            <span class="border"></span>
            我的邀请（{{applynum}}）
          </div>
          </el-badge>

          <div class="recruiterStatus" style="margin-left: 10px;">
            <el-select v-model="listType" placeholder="请选择状态" @change="getPositionList(listType)">
              <!-- @change="getPositionList(1)"  v-if="isTopAdmin" -->
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="timeCont" label="创建时间" style="margin-left: 10px;">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              @change="changeTime"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>

          <div class="screen_cont">
            <div
              class="topSelected"
              @click="screenList(1)"
              :class="{'selected':isShowScreen}"
              v-if="isShowScreen"
            >
              <i class="iconfont icon-shaixuan" style="padding-right:3px"></i>
              {{ selectedScreen.length > 0 || (positionTypeList.length > 1 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
            </div>

            <div
              class="topSelected"
              @click="screenList(1)"
              :class="{'selected':selectedScreen.length>0}"
              v-else
            >
              <i class="iconfont icon-shaixuan" style="padding-right:3px"></i>
              {{selectedScreen.length > 0 || (positionTypeList.length > 1 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
            </div>

            <div class="topSelected2" @click="screenList(2)" v-if="isShowScreen">
                <i class="iconfont icon-jiantou" style="color: #00C4CD"></i>
              </div>
              <div class="topSelected2" @click="screenList(2)" v-else>
                <i class="iconfont icon-jiantou"></i>
              </div>

            <div class="screenBox" v-if="isShowScreen">
              <div class="triangle_border_top"></div>
              <div class="screen_tit">{{getPopName()}}</div>
              <div class="lable_list">
                <span
                  v-for="(item,index) in positionTypeList"
                  @click="labelClick(index)"
                  :class="{'cur':item.active}"
                  :key="index"
                >{{item.name}}</span>
              </div>

              <div class="screen_btns">
                <div class="screen_btn true" @click="screenOp('confirm')">确定</div>
                <div class="screen_btn" @click="screenOp('cancel')">取消</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="box" class="main_cont" v-loading="getLoading">
        <div
          class="candidate_blo"
          v-for="(item,index) in candidateList"
          @click="getResume(item.jobhunterUid, index)"
          :key="index"
        >
          <div class="bloTop">
            <div class="timer">{{item.time}}</div>
            <div class="topText" v-if="navType === 'invite'">邀请面试</div>
            <div class="topText" v-if="navType === 'apply'">申请面试</div>

            <div class="topText topText2" v-if="item.positionId !== 0">
              【<span v-if="item.address">{{item.address.city}}{{item.address.area}}<span v-show="item.address.city">&nbsp;|&nbsp;</span></span><span v-if="item.positionName">{{item.positionName}}&nbsp;|&nbsp;</span><span v-if="item.emolument">{{item.positionEmolumentMin}}k-{{item.positionEmolumentMax}}K</span>】
            </div>

            <div class="topText topText2" v-if="item.origin">
              <div class="from">候选人来自</div>
              <div class="origin">{{item.origin}}</div>
            </div>
            <div class="bloTop-24hour-wrap">
              <div class="bloTop-24hour" v-if="item.interviewType === 2"></div>
            </div>

            <div class="status">
              <div class="like_user">
                <span :style="'color: #FF9E40'" v-if="item.statusDesc === '未处理'">{{item.statusDesc}}</span>
                <span v-else>{{item.statusDesc}}</span>
              </div>
              </div>
              <div class="phone" v-if="[21, 31, 32, 41].includes(item.status)">手机：{{item.resume.mobile}}</div>
              <div class="redot" v-if="item.redDot"></div>
          </div>
          <div class="bloCont">
            <div class="cont_left">
              <div class="leftMsg">
                <div class="userBaseInfo">
                  <img class="gender" src="~IMAGES/girl.png" v-if="item.resume.gender===2" />
                  <img class="gender" src="~IMAGES/boy.png" v-else />
                  <img class="userIcon" :src="item.avatar.middleUrl" />
                  <div class="infoRight">
                    <div class="infoName textEllipsis">
                      <span>{{item.jobhunterRealname}}</span>
                      <!-- <img v-else class="invisible2" src="https://attach.lieduoduo.ziwork.com/front-assets/images/invisible2.png"> -->
                    </div>

                    <ul class="userLabel">
                      <li class v-if="item.resume.workAgeDesc">{{item.resume.workAgeDesc}}</li>
                      <li class v-if="item.resume.age">{{item.resume.age}}岁</li>
                      <li class v-else>暂无年龄</li>
                      <li class v-if="item.resume.degreeDesc">{{item.resume.degreeDesc}}</li>
                      <li class v-else>暂无学历</li>
                    </ul>
                  </div>
                </div>
                <div class="intention" v-if="item.resume.expect">
                  求职意向：
                  <span
                    class="intentionText intentionTextWidth textEllipsis"
                  >{{item.resume.expect.city}}</span>&nbsp;·&nbsp;
                  <span
                    class="intentionText intentionTextWidth2 textEllipsis"
                    style="color:#333"
                  >{{item.resume.expect.position}}</span>&nbsp;·&nbsp;
                  <span
                    class="intentionText2"
                  >{{item.resume.expect.salaryFloor}}k~{{item.resume.expect.salaryCeil}}k</span>
                </div>
                <div class="intention" v-else>求职意向：暂无求职意向</div>
              </div>
              <div class="bloExperience workExperience">
                <div class="experienceTitle">最近工作经历</div>
                <div
                  class="experienceText textEllipsis"
                  v-if="item.lastCompanyName"
                >{{item.lastCompanyName}}</div>
                <div
                  class="experienceText textEllipsis"
                  v-if="item.lastPosition"
                >{{item.lastPosition}}</div>
                <div class="experienceText textEllipsis" v-if="item.lastCompanyName.length<1">暂无工作经历</div>
              </div>
              <div class="bloExperience educationExperience">
                <div class="experienceTitle">最近教育经历</div>
                <div
                  class="experienceText textEllipsis"
                  v-if="item.resume && item.resume.school"
                >{{item.resume.school}}</div>
                <div class="experienceText textEllipsis" v-else>暂无教育经历</div>

                <div
                  class="experienceText textEllipsis"
                  v-if="item.resume && item.resume.major"
                >{{item.resume.major}}</div>
              </div>
            </div>
            <div class="userOp">
              <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'inappropriate', item, 1)" v-show="[11, 12, 21, 31, 32, 41].includes(item.status)">
                不合适
              </div>
              <!-- <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'watch-reson', item, 1)" v-show="item.status === 52 || item.status === 53">
                  查看原因
                </div> -->
                <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-show="[57, 58].includes(item.status)">
                  去评价
                </div>
                <div class="like_user" @click.stop="" v-show="[60, 61].includes(item.status)">
                  <span :style="'color: #92929B;'">已评价</span>
                </div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'confirm-interview', item, 1)" v-if="item.status === 11">查看联系</div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-if="item.status === 12">查看邀约</div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'arranging-interviews', item, 1)" v-if="item.status === 21">安排面试</div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'arranging-interviews', item, 1)" v-if="item.status === 31">
                <!-- <span v-if="navType === 'apply'">查看面试</span>
                <span v-if="navType === 'invite'">修改面试</span> -->
                <span>查看面试</span>
                </div>
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'arranging-interviews', item, 1)" v-if="item.status === 32">
                <!-- <span v-if="navType === 'apply'">查看面试</span>
                <span v-if="navType === 'invite'">修改面试</span> -->
                <span>修改面试</span>
                </div>
              <!-- <div class="btn" @click.stop="setJob(item.jobhunterUid, 'interview-retract', item, 1)" v-if="item.status === 52 || item.status === 53">撤回</div> -->
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-if="[41, 51, 57, 58, 59, 60, 61].includes(item.status)">面试详情</div>
              <div class="btn" @click="getResume(item.jobhunterUid, index)" v-if="[52, 53, 54, 55].includes(item.status)">查看简历</div>
            </div>
          </div>
        </div>
      </div>

      <el-pagination
        class="pagination"
        background
        v-if="form.total > 20"
        layout="prev, pager, next, slot"
        :total="Number(form.total)"
        :page-size="Number(form.count)"
        :current-page="Number(form.page)"
        @current-change="handleCurrentPageChange"
      >
        <span class="total">共{{ Math.ceil(form.totalPage) }}页, {{form.total}}条记录</span>
      </el-pagination>

      <div class="cont_none" v-if="!getLoading && candidateList.length === 0">
        <div class="null-product">
          <div class="null-img">
            <img src="@/assets/images/fly.png" />
          </div>
          <div class="null-text">与其等待，不如主动出击~分享职位获取更多候选人吧</div>
          <el-button class="null-produc-bnt" @click="$router.push('/recruiterIndex')">分享职位</el-button>
        </div>
      </div>

    <div class="pop" v-show="pop.isShow" @click="closeMsg($event)">
      <div class="xcxPicBox" v-if="pop.type==='clickPic'">
        <img class="clo" src="~IMAGES/clo.png" />
        <div class="main_tit">查看简历详情</div>

        <div class="xcx_main" v-if="!selectBlo || !selectBlo.src || selectBlo.src.length<1">
          <img class="xcx_load" src="~IMAGES/loading.gif" />
          <p>正在加载中…</p>
        </div>

        <div class="xcx_main" v-show="selectBlo.src && selectBlo.src.length>0">
          <img class="xcx_icon" :src="selectBlo.src" />
          <p>微信扫码，查看简历详情</p>
        </div>
      </div>

      <div class="resumeBox" v-if="showResume" @click="closeload($event)">
        <div class="Numbering">
          <span>简历编号：{{nowResumeMsg.vkey}}</span>
          <span v-if="nowResumeMsg.resumeUpdateTime !== '0000-00-00 00:00:00'">{{nowResumeMsg.resumeUpdateTime}}更新</span>
          <div class="closediggle" @click="pop.isShow = false">
            <i class="iconfont icon-guanbianniu"></i>
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
                    <!-- v-show="nowResumeMsg.personalizedLabels.length>0" -->
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
                <div class="whitesize">
                  <span class="position">{{item.position}}&nbsp;|&nbsp;{{item.city}}</span>
                  <span v-if="item.fields.length>0" style="margin-right:9px;color:#333">|</span>
                  <span v-for="(item1,index1) in item.fields" :key="index1">{{item1.field}}&nbsp;&nbsp;</span>
                  </div>
                  <span class="price">{{item.salaryFloor}}k-{{item.salaryCeil}}k</span>
                </div>
              </div>
            </div>
            <!-- 工作经历 -->
            <div class="workExperience" v-show="nowResumeMsg.careers!=''">
              <p class="title">工作经历</p>
              <!-- v-show="nowResumeMsg.careers.length>0" -->
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
                  <!-- v-show="item.technicalLabels.length>0" -->
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
              <!-- <div class="dayin">
                <i class="iconfont icon-dayin-"></i>
              </div> -->
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
        </div>
      </div>
          <!-- 没有发布职位 -->
      <div class="noJobBox" v-if="pop.type === 'noJob'">
        <div class="close"><i @click="pop.isShow = false" class="iconfont icon-danchuang-guanbi"></i></div>
        <div class="nullimg"><img src="@/assets/images/nullCandidate.png" /></div>
        <div class="noJobText">
          <p>邀请候选人面试</p>
          <p>至少需要一个招聘中职位~</p>
          </div>
        <div class="noJobBtn" @click.stop="toAddJob">去发布/开放职位</div>
      </div>
      <!-- 面试安排 -->
      <div class="noJobBox" v-if="pop.Interview">
        <div class="tishi" v-if="tishishow">
          <div class="tishiimg"><img src="@/assets/images/exclamation-circle.png" alt=""></div>
          <div class="tishitext">该职位未开放，不可选择约面</div>
        </div>
        <div class="close"><i @click="cancelshow()" class="iconfont icon-danchuang-guanbi"></i></div>
        <div class="content-info">
        <div class="title">{{pop.InterviewTitle}}</div>
        <div class="applytext" v-show="pop.type === 'applyrecord'">{{pop.recordtext}}</div>
          <div class="selectposition" v-show="pop.type === 'applyrecord'">
            <div class="selectitem" v-for="(item, i) in applyrecordList" :key="i" @click="selectapply(item, i)">
            <div class="position">
              <div class="close" v-show="item.positionStatus === 0">关闭</div>
              <div class="close" v-show="item.positionStatus === 3">审核中</div>
              <div class="close" v-show="item.positionStatus === 4">审核失败</div>
              <div :class="['name', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.positionName}}</div>
              <div class="money" v-show="item.positionId !== 0 && item.positionName !== '都不合适'">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info" v-if="item.positionName !== '都不合适'">
              <div :class="['address', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.city}}{{item.district}}</div>
              <div :class="['year', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.positionStatus === 0 || item.positionStatus === 3 || item.positionStatus === 4 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="info" v-else>选择此项，以上申请记录将全部合并处理为不合适</div>
            <div class="selectcur" v-if="item.positionStatus === 1 || item.positionStatus === 0 || item.positionStatus === 2 || item.positionName === '都不合适'">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.hascur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
            </div>
            <div class="selectcur" @click="setHint" v-else>
              <div class="circel"></div>
            </div>
            <div class="confirmbox" v-show="item.boxshow">
              <div class="b-head">
                <div class="b-img"><img src="@/assets/images/exclamation-circle.png" alt=""></div>
                <div class="b-text">你确定开放职位进行约面吗？</div>
              </div>
              <div class="b-btn">
                <div class="think-sure" @click="sureyuemian(item)">确定</div>
                <div class="think" @click.stop="resetboxcur(item, i)">再想想</div>
              </div>
            </div>
          </div>
        </div>

        <div class="handler" v-show="pop.type !== 'preview'">
          <div class="save" @click="surehandler()" v-show="pop.type !== 'address'">{{pop.btntext}}</div>
          <div class="save" @click="sendhandler()" v-show="pop.type === 'address'">保存</div>
          <div class="cancel" v-show="pop.type !== 'watchreson'" @click="backhandler()">取消</div>
        </div>
        </div>
      </div>
    </div>
    <!-- 转发简历弹窗 -->
    <dynamic-record
      :visible="toworddiggle"
      :info.sync="nowResumeMsg"
      :imagesurl.sync="shareResumeImg"
      @clicksend="sendford"
      @clickcancel="cancelmessage"
    ></dynamic-record>
    <!-- 查看面试，安排面试弹窗 -->
    <interview-arrange :interviewId="interviewId" :visible.sync="arrangediggle"></interview-arrange>
    <!-- 面试详情弹窗 -->
    <interview-detail :interviewId="interviewId" :visible.sync="detaildiggle"></interview-detail>
    <!-- 选择不合适原因 -->
    <select-reson :reasonlist="reasonlist" :interviewId="interviewId" :jobuid="jobuid" :visible.sync="resondiggle"></select-reson>
    <!-- 展示原因列表 -->
    <reson-list :interviewId="interviewId" :visible.sync="resonlistdiggle"></reson-list>
    <!-- 开撩选择职位 -->
    <candidate-position :jobuid="jobuid" :visible.sync="positiondiggle"></candidate-position>
    <!-- 处理多条面试弹窗 -->
    <apply-record :applyrecordList="applyrecordList" :interviewId="interviewId" :jobuid="jobuid" :recordtext="recordtext" :interviewNum="interviewNum" :visible.sync="recorddiggle"></apply-record>
  </div>
</template>
<script>
import InterviewArrange from 'COMPONENTS/b-interview/interviewArrange'
import interviewDetail from 'COMPONENTS/b-interview/interviewDetail'
import selectReson from 'COMPONENTS/b-interview/selectReson'
import resonList from 'COMPONENTS/b-interview/resonList'
import candidatePosition from 'COMPONENTS/b-interview/candidatePosition'
import applyRecord from 'COMPONENTS/b-interview/applyRecord'

import Vue from 'vue'
import Component from 'vue-class-component'
import { getMyInfoApi } from 'API/auth'
import { getPositionTypeApi } from 'API/position'
import { getResumeIdApi } from 'API/userJobhunter'
import { shareResumeApi } from 'API/forward'
import {
  getinviteapplyNum,
  getApplyListApi,
  getInviteListApi,
  getdeleteTabRedDotApi
} from 'API/candidate'
import { createonlinepdf, createonlineword } from 'API/common'
import MapSearch from 'COMPONENTS/map'
import DynamicRecord from '../candidateType/dynamicrecord.vue'
import { putCollectUserApi, cancelCollectUserApi } from 'API/collect'
import {
  getCommentReasonApi,
  getloadingReasonApi,
  confirmInterviewApi,
  interviewRetract, emailtoforword, manyrecordstatus } from 'API/candidateType'

@Component({
  name: 'candidate',
  methods: {},
  computed: {
    ...mapGetters([
      'recruiterIntentionList',
      'recruiterInviteList',
      'recruitDataCompanyId',
      'recruiterIsAdmin'
    ])
  },
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    },
    'pop.isShow': function (n) {
      if (n) {
        document.body.style.overflow = 'hidden'
      }
      if (!n) {
        document.body.style.overflow = 'auto'
        this.hasonload = false
      }
    }
  },
  components: { MapSearch, DynamicRecord, InterviewArrange, interviewDetail, selectReson, resonList, candidatePosition, applyRecord }
})
export default class CourseList extends Vue {
  userInfo = {}
  selectBlo = {}
  arrangediggle = false
  detaildiggle = false
  resondiggle = false
  resonlistdiggle = false
  positiondiggle = false
  recorddiggle = false
  showResume = false
  hasonload = false
  loadingshow = false
  toworddiggle = false
  tishishow = false
  pop = {
    isShow: false,
    Interview: false,
    InterviewTitle: '面试安排',
    btntext: '保存',
    recordtext: '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；',
    type: 'clickPic'
  }
  recordtext = '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；'
  jobuid = ''
  jobhunterInfo = ''
  addressobj = {
    doorplate: '',
    address: ''
  }
  arrangeobj = ''
  arrangementInfo = {
    interviewId: '',
    realname: '',
    mobile: '',
    positionId: '',
    addressId: '',
    addressName: '',
    interviewTime: ''
  }
  model = {
    qrCode: '',
    resumeId: '',
    showResume: false,
    show: false,
    type: '',
    beforeType: '',
    title: '',
    beforeTitle: '',
    btnTxt: '取消',
    reason: [],
    extra: '',
    dateLists: []
  }
  reasonlist = []
  addresslist = []
  watchresonlist = []
  resonword = ''
  info = ''
  positionLists = []
  positionOption = []
  applyrecordList = []
  interviewId = ''
  extra = ''
  form = {
    page: 1,
    count: 20,
    total: 0,
    status: 0,
    position_type_id: '', // 状态
    created_start_time: null,
    created_end_time: null
  };

  navBarFixed = false; // nav是否置顶
  statusTotal = {}; //
  uid = null;
  shareSelectItem = {
    qrCodeUrl: ''
  }; // 分享选中
  navType = 'invite';
  loading = false; // 翻页
  shareResumeImg = ''; // 简历二维码
  candidateList = [];
  getLoading = false
  searchCollect = [];
  isShowScreen = false;
  selectedScreen = []; // 筛选选中条件
  positionTypeList = []; // 职业标签列表
  searchBrowseMyselfList = [];
  sharePicIds = []; // 下载中的图片
  navNum = {}; // nav 数量
  listType = 0;
  typeList = [];
  nowResumeMsg = {
    interviewInfo: {
      data: {}
    }
  };
  shareResumeImg = '' // 简历二维码
  positionList = [{}];
  interviewNum = ''
  selectPosition = 0;
  invitenum = 0;
  applynum = 0;
  applyOptions = [
    {
      value: 0,
      label: '全部'
    },
    {
      value: 11,
      label: '未处理'
    },
    {
      value: 21,
      label: '待安排'
    },
    {
      value: 31,
      label: '待对方确认'
    },
    {
      value: 32,
      label: '待我修改'
    },
    {
      value: 54,
      label: '对方暂不考虑'
    },
    {
      value: 52,
      label: '不合适'
    },
    {
      value: 41,
      label: '已安排'
    },
    {
      value: 51,
      label: '已结束'
    }
  ];

  inviteOptions = [
    {
      value: 0,
      label: '全部'
    },
    {
      value: 12,
      label: '未处理'
    },
    {
      value: 21,
      label: '待安排'
    },
    {
      value: 31,
      label: '待对方确认'
    },
    {
      value: 32,
      label: '待我修改'
    },
    {
      value: 54,
      label: '对方暂不考虑'
    },
    {
      value: 52,
      label: '不合适'
    },
    {
      value: 41,
      label: '已安排'
    },
    {
      value: 51,
      label: '已结束'
    }
  ];
  value1 = ['', ''];
  changeTime () {
    if (this.value1) {
      this.form.created_start_time = this.value1[0]
      this.form.created_end_time = this.value1[1]
    } else {
      this.form.created_start_time = undefined
      this.form.created_end_time = undefined
    }
    this.form.page = 1
    this.setPathQuery(this.form)
    this.getList()
  }

  destroyed () {
    document.body.style.overflow = 'auto'
    this.$store.dispatch('redDotfun')
  }
  mounted () {
    this.getdeleteTabRedDot('intention_list') // 清除apply type红点
  }

  init () {
    this.form = Object.assign(this.form, this.$route.query || {})
    this.userInfo = this.$store.state.userInfo
    let query = this.$route.query
    if (query.created_start_time) {
      this.value1[0] = query.created_start_time
    }
    if (query.created_end_time) {
      this.value1[1] = query.created_end_time
    }
    if (query.status) {
      this.form.status = Number(query.status)
      this.listType = Number(query.status)
    }
    if (query.navType) {
      switch (query.navType) {
        case 'invite':
          if (this.form.status === 11) {
            this.form.status = 12
            this.listType = 12
          }
          this.typeList = this.inviteOptions
          this.getApplyList()
          this.getPositionTypeList()
          break
        case 'apply':
          if (this.form.status === 12) {
            this.form.status = 11
            this.listType = 11
          }
          this.typeList = this.applyOptions
          this.getInviteList()
          this.getPositionTypeList()
          break
      }
      this.navType = query.navType
    } else {
      this.navType = 'apply'
      this.typeList = this.applyOptions
      this.getInviteList()
      this.getPositionTypeList()
    }
  }

  setPath (res) {
    this.form.page = 1
    this.setPathQuery(res)
  }

  handleCurrentPageChange (page) {
    this.form.page = page
    this.setPathQuery(this.form)
  }

  changeNav (type) {
    let type2 = this.navType
    if (type2 === type) {
      return
    }
    // this.listType = 0
    // this.form.status = 0
    this.form.page = 1
    this.setPathQuery(this.form)
    if (type === 'apply') {
      this.typeList = this.applyOptions
      this.$store.dispatch('redDotfun')
    } else {
      this.$store.dispatch('redDotfun')
      this.typeList = this.inviteOptions
      setTimeout(() => {
        this.getdeleteTabRedDot('invite_list') // 清除 invite红点
      }, 1000)
    }
    this.getPositionTypeList()
    this.navType = type
    this.setPath({ navType: type })
  }
  getdeleteTabRedDot (type) {
    getdeleteTabRedDotApi(type).then(() => {
    })
  }

  getList (type) {
    let status = type || this.navType
    if (type) this.navType = type
    switch (status) {
      case 'invite':
        this.typeList = this.inviteOptions
        this.getApplyList()
        break
      case 'apply':
        this.typeList = this.applyOptions
        this.getInviteList()
        break
      default:
        break
    }
  }
  onloadfile (type) {
    this.loadingshow = true
    let params = { jobhunterVkey: this.nowResumeMsg.vkey }
    if (type === 'pdf') {
      createonlinepdf(params).then((res) => {
        this.loadingshow = false
        this.$util.downFile(res.data, this.nowResumeMsg.name + '-' + this.nowResumeMsg.expects[0].position + '.pdf')
      }).catch((e) => {
        this.loadingshow = false
      })
    }
    if (type === 'doc') {
      createonlineword(params).then((res) => {
        this.loadingshow = false
        this.$util.downFile(res.data, this.nowResumeMsg.name + '-' + this.nowResumeMsg.expects[0].position + '.docx')
      }).catch((e) => {
        this.loadingshow = false
      })
    }
  }
  // 列表筛选
  screenList (type) {
    let otherActive = this.getOtherActive()
    if (type === 1) {
      if (this.selectedScreen.length > 0 || otherActive) {
        this.setDefaultScreen()
        if (!this.isShowScreen) {
          this.form.position_type_id = ''
          this.setPathQuery(this.form)
          this.getList()
        }
      } else {
        this.isShowScreen = !this.isShowScreen
      }
      // 清楚筛选
    } else {
      this.isShowScreen = !this.isShowScreen
    }
  }

  getPopName () {
    // return this.navType === 'invite' ? '看过我的职位类型' : this.navType === 'searchCollect' ? '简历职位类型' : '感兴趣职位类型'
    return '职位类别筛选'
  }

  setHint () {
    this.tishishow = true
    clearTimeout(this.hintSetTime)
    this.hintSetTime = setTimeout(() => {
      this.tishishow = false
    }, 1500)
  }

  screenOp (status) {
    switch (status) {
      case 'cancel':
        this.form.page = 1
        this.setDefaultScreen()
        this.isShowScreen = false
        break
      case 'confirm':
        this.form.page = 1
        this.setPathQuery(this.form)
        this.getList()
        this.isShowScreen = false
        break
      case 'label_all':
        break
      default:
        break
    }
  }

  // 设置默认筛选
  setDefaultScreen (status) {
    this.selectedScreen = []

    this.positionTypeList.map((item, idx) => {
      item.active = false

      if (status && item.labelId === 'index') {
        item.active = true
      }
      if (!status && item.labelId === 'all') {
        item.active = true
      }
    })
  }

  // 获取另外的选择
  getOtherActive () {
    let otherActive =
      this.positionTypeList.length > 1
        ? this.positionTypeList[this.positionTypeList.length - 1].active
        : false
    return otherActive
  }

  labelClick (index) {
    let data = this.positionTypeList[index]
    data.active = !data.active
    if ((data.labelId === 'all' || data.labelId === 'index') && data.active) {
      this.selectedScreen = []
      if (data.labelId === 'index') {
        this.setDefaultScreen('index')
      } else {
        this.setDefaultScreen()
      }
    } else {
      if (data.active) {
        this.selectedScreen.push(data.labelId)
      } else {
        this.selectedScreen.splice(
          this.selectedScreen.indexOf(data.labelId),
          1
        )
      }
      this.positionTypeList[0].active = false
      // this.positionTypeList[this.positionTypeList.length - 1].active = false
    }
    this.form.position_type_id = this.selectedScreen.join()
  }
  // 职业类型列表
  getPositionTypeList () {
    getPositionTypeApi().then(res => {
      let data = res.data.data
      data.map(item => {
        item.active = false
      })

      data.unshift({
        name: '全部',
        labelId: 'all',
        active: true
      })

      this.positionTypeList = data
      let ids = this.$route.query.position_type_id && this.$route.query.position_type_id.split(',') || []
      this.positionTypeList = this.positionTypeList.filter(item => {
        let idList = ids.map(v => v)
        if (idList.includes((item.labelId).toString())) {
          item.active = true
          this.selectedScreen.push(item.labelId)
        } else {
          item.active = false
        }
        return item
      })
    })
  }

  // 意向列表
  getInviteList () {
    this.getLoading = true
    getInviteListApi(this.form)
      .then(res => {
        let msg = res.data.data
        msg.map((v, k) => {
          v.time = this.timestampFormat(v.createdAtTime)
        })
        this.candidateList = msg
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.invitenum = res.data.meta.total
        this.getLoading = false
      })
      .catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
  }
  // 邀请
  getApplyList () {
    this.getLoading = true
    getApplyListApi(this.form)
      .then(res => {
        let msg = res.data.data
        msg.map((v, k) => {
          v.time = this.timestampFormat(v.createdAtTime)
        })
        this.candidateList = msg
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.applynum = res.data.meta.total
        this.getLoading = false
      })
      .catch(e => {
        this.candidateList = []
        this.getLoading = false
      })
  }
  // 职业类型列表
  getPositionList (listType) {
    this.form.status = listType
    this.form.page = 1
    this.setPathQuery(this.form)
    this.getList(this.navType)
  }

  timestampFormat (timestamp) {
    function zeroize (num) {
      // eslint-disable-next-line eqeqeq
      return (String(num).length == 1 ? '0' : '') + num
    }
    var curTimestamp = parseInt(new Date().getTime() / 1000) // 当前时间戳
    var timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数
    var curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear()
    var m = tmDate.getMonth() + 1
    var d = tmDate.getDate()
    var H = tmDate.getHours()
    var i = tmDate.getMinutes()
    // var s = tmDate.getSeconds()
    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚'
    } else if (timestampDiff < 3600) {
      // 一小时前之内
      return Math.floor(timestampDiff / 60) + '分钟前'
    } else if (
      curDate.getFullYear() === Y &&
      curDate.getMonth() + 1 === m &&
      curDate.getDate() === d
    ) {
      return '今天' + zeroize(H) + ':' + zeroize(i)
    } else {
      var newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
      if (
        newDate.getFullYear() === Y &&
        newDate.getMonth() + 1 === m &&
        newDate.getDate() === d
      ) {
        return '昨天' + zeroize(H) + ':' + zeroize(i)
      } else if (
        newDate.getFullYear() === Y &&
        newDate.getMonth() + 1 === m &&
        newDate.getDate() - 1 === d
      ) {
        return '前天' + zeroize(H) + ':' + zeroize(i)
      } else {
        return (
          zeroize(Y) +
          '-' +
          zeroize(m) +
          '-' +
          zeroize(d) +
          '-' +
          zeroize(H) +
          ':' +
          zeroize(i)
        )
      }
    }
  }

  handleSearch () {
    this.form.page = 1
    this.setPathQuery(this.form)
  }

  todoAction (type, index) {
    switch (type) {
      case 'cloPop':
        this.pop = {
          isShow: false,
          type: ''
        }
        break
      default:
        break
    }
  }
  // 点击其他区域关闭弹窗
  closeMsg (event) {
    if (event.target.className === 'pop') {
      this.pop.isShow = false
    }
  }
  closeload (e) {
    if ((!this.$refs.queryBox.contains(e.target)) && event.target.className !== 'iconfont icon-xiazai') {
      this.hasonload = false
    }
  }
  setJob (uid, type, vo, statusid) {
    if (statusid === 1) {
      this.showResume = false
    } else {
      this.showResume = true
    }
    this.jobuid = uid
    this.getResume(uid, 'red', vo)
    if (vo.interviewId) {
      this.interviewId = vo.interviewId
    } else {
      this.interviewId = vo.interviewInfo.data.lastInterviewId
    }
    switch (type) {
      case 'recruiter-chat':
        this.positiondiggle = true
        break
      case 'check-invitation':
        this.detaildiggle = true
        break
      case 'confirm-interview':
        let status = { vkey: vo.resume ? vo.resume.vkey : vo.vkey, type: 'resume' }
        manyrecordstatus(status).then((res) => {
          if (res.data.data.data.length > 1) {
            let applylists = res.data.data.data
            applylists.map((v, k) => {
              if (v.positionId === 0) {
                v.positionName = '直接与我约面'
              }
              v.hascur = false
              v.boxshow = false
            })
            this.applyrecordList = applylists
            this.recordtext = '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；'
            this.recorddiggle = true
          } else {
            confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
              this.$message.success('约面成功')
              this.getResume(this.jobuid)
              this.init()
            })
          }
        })
        break
      case 'arranging-interviews':
        this.arrangediggle = true
        break
      case 'interview-retract':
        let retract = { jobhunterUid: this.jobuid, interviewId: this.interviewId }
        interviewRetract(retract).then((res) => {
          this.$message.success('撤回成功')
          this.getResume(this.jobuid)
          this.init()
        })
        break
      case 'watch-reson':
        this.resonlistdiggle = true
        break
      case 'inappropriate':
        let status2 = { vkey: vo.resume ? vo.resume.vkey : vo.vkey, type: 'resume' }
        manyrecordstatus(status2).then((res) => {
          this.interviewNum = res.data.data
          if (res.data.data.data.length > 1) {
            let applylists = res.data.data.data.slice()
            applylists.push({ positionName: '都不合适' })
            applylists.map((v, k) => {
              if (v.positionId === 0) {
                v.positionName = '直接与我约面'
              }
              v.hascur = false
            })
            this.applyrecordList = applylists
            this.recordtext = '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；'
            this.recorddiggle = true
          } else {
            // 大于61是结束后不满意
            if (res.data.data.interviewStatus === 58 || res.data.data.interviewStatus === 59) {
              getCommentReasonApi().then((res) => {
                let arr = res.data.data
                arr.map((v, k) => {
                  v.cur = false
                })
                this.reasonlist = arr
                this.resondiggle = true
              })
            } else {
              getloadingReasonApi().then((res) => {
                let arr = res.data.data
                arr.map((v, k) => {
                  v.cur = false
                })
                this.reasonlist = arr
                this.resondiggle = true
              })
            }
          }
        })
        break
      case 'cancel':
        break
      default:
        break
    }
  }

  cancelshow () {
    if (this.showResume) {
      this.pop.Interview = false
    } else {
      this.pop.isShow = false
    }
  }
  toAddJob () {
    this.$router.push({
      name: 'recruiterIndex'
    })
  }
  backhandler () {
    if (this.showResume) {
      this.pop.Interview = false
    } else {
      this.pop.isShow = false
    }
  }
  // 是否感兴趣操作
  ownerOp (status, uid) {
    let data = {
      uid: uid
    }
    if (!status) {
      putCollectUserApi(data).then(res => {
        this.$message({
          type: 'success',
          message: '成功标记感兴趣'
        })
        this.getResume(uid)
      }).catch(err => {
        this.$message.error(err.data.msg)
      })
    } else {
      cancelCollectUserApi(data).then(res => {
        this.$message({
          type: 'success',
          message: '已取消标记'
        })
        this.getResume(uid)
      }).catch(err => {
        this.$message.error(err.data.msg)
      })
    }
  }
  created () {
    getinviteapplyNum().then(res => {
      this.applynum = res.data.data.applyTotal
      this.invitenum = res.data.data.inviteTotal
    })
  }

  getMyInfo () {
    return getMyInfoApi()
      .then(res => {
        this.uid = res.data.data.uid
      })
      .catch(e => {
        this.$message.error(e.data.msg)
      })
  }

  // 获取简历
  getResume (resumeId, index, data) {
    if (index !== 'red') {
      this.pop = {
        isShow: true,
        type: 'resume'
      }
      this.showResume = true
      this.getShareResume(resumeId)
    }
    getResumeIdApi({ uid: resumeId }).then(res => {
      this.$store.dispatch('redDotfun')
      if (data) {
        data.redDot = 0
      }
      this.nowResumeMsg = res.data.data
      this.showuid = res.data.data.uid
      this.showindex = res.data.data
      // this.init()
    })
  }

  // 获取简历二维码
  getShareResume (resumeId) {
    shareResumeApi({ resumeUid: resumeId, forwardType: 1 }).then(res => {
      this.shareResumeImg = res.data.data.positionQrCodeUrl
    })
  }
  sendford (data) {
    emailtoforword(data).then((res) => {
      this.init()
      this.pop.isShow = false
      this.toworddiggle = false
      this.$message({
        type: 'success',
        message: '转发成功!'
      })
    })
  }
  cancelmessage () {
    this.toworddiggle = !this.toworddiggle
    this.pop.isShow = true
  }
  sharediggle () {
    this.toworddiggle = true
  }

  toTop () {
    document.documentElement.scrollTop = 0
  }
}
</script>
<style lang="scss" scoped="scoped">
@import "./candidate.scss";
</style>
<style>
@media screen and (max-width: 1480px) {
  #candidate .pop {
    width: calc(100% + 200px) !important;
  }
}
.selected:hover{
  color: #03B3BB!important;
}
.item .el-input .el-input__inner{
  height: 40px !important;
  line-height: 40px !important;
}
.item .el-select .el-input .el-select__caret{
  line-height: 40px!important;
}
.main_top .is-fixed{
  z-index: 1;
  border: 0;
  width: 8px;
  height: 8px;
  right: 14px !important;
  top: 8px;
}
#candidate .el-loading-mask {
  z-index: 0;
}
</style>
<style lang="scss">
.date-seleced-interview-time{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 90px !important;
  height: 40px;
  padding: 0;
  z-index: 2;
  .el-input__inner{
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 90px !important;
    height: 40px;
    padding: 0;
    z-index: 2;
  }
}
</style>
