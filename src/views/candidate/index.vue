<template>
  <div id="candidate">
    <div class="main_top_warp">
        <div class="main_top">
          <div
            class="topBlo topStatusBlo borright"
            :class="{'cur':navType==='apply'}"
            @click="changeNav('apply')"
          >收到意向（{{invitenum}}）</div>
          <div
            class="topBlo topStatusBlo borleft"
            :class="{'cur':navType==='invite'}"
            @click="changeNav('invite')"
          >
            <span class="border"></span>
            我的邀请（{{applynum}}）
          </div>

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
              <i class="iconfont iconshaixuan"></i>
              {{ selectedScreen.length > 0 || (positionTypeList.length > 0 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
            </div>

            <div
              class="topSelected"
              @click="screenList(1)"
              :class="{'selected':selectedScreen.length>0}"
              v-else
            >
              <i class="iconfont iconshaixuan"></i>
              {{selectedScreen.length > 0 || (positionTypeList.length > 0 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
            </div>

            <div class="topSelected2" @click="screenList(2)">
              <i class="iconfont iconxiangxiajiantou"></i>
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
      <div id="box" class="main_cont" v-if="candidateList.length>0">
        <div
          class="candidate_blo"
          v-for="(item,index) in candidateList"
          @click="getResume(item.jobhunterUid, index)"
          :key="index"
        >
          <div class="bloTop">
            <div class="timer">{{item.time}}</div>
            <div class="topText" v-if="navType === 'invite'">申请约面</div>
            <div class="topText" v-if="navType === 'apply'">申请面试</div>

            <div class="topText topText2" v-if="item.positionId !== 0">
              【<span v-if="item.address">{{item.address.city}}{{item.address.area}}<span v-show="item.address.city">|</span></span><span v-if="item.positionName">{{item.positionName}} |</span><span v-if="item.emolument">{{item.positionEmolumentMin}}k-{{item.positionEmolumentMax}}K</span>】
            </div>

            <div class="topText topText2" v-if="item.origin">
              <div class="from">候选人来自</div>
              <div class="origin">{{item.origin}}</div>
            </div>

            <div class="status">
              <div class="like_user">
                <span :style="'color: #FF7F4C'" v-if="item.redDot">{{item.statusDesc}}</span>
                <span v-else>{{item.statusDesc}}</span>
              </div>
              </div>
              <div class="phone" v-if="item.status === 21 || item.status === 31 || item.status === 41 || item.status === 32">手机：{{item.resume.mobile}}</div>
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
                <div class="intention" v-if="item.resume.expects && item.resume.expects.length>0">
                  求职意向：
                  <span
                    class="intentionText intentionTextWidth textEllipsis"
                  >{{item.resume.expects[0].city}}</span>&nbsp;·&nbsp;
                  <span
                    class="intentionText intentionTextWidth2 textEllipsis"
                  >{{item.resume.expects[0].position}}</span>&nbsp;·&nbsp;
                  <span
                    class="intentionText2"
                  >{{item.resume.expects[0].salaryFloor}}k~{{item.resume.expects[0].salaryCeil}}k</span>
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
              <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'inappropriate', item, 1)" v-show="item.status === 11 || item.status === 12 || item.status === 21 || item.status === 31 || item.status === 32 || item.status === 41">
                不合适
              </div>
              <!-- <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'watch-reson', item, 1)" v-show="item.status === 52 || item.status === 53">
                  查看原因
                </div> -->
                <div class="like_user" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-show="item.status === 57 || item.status === 58">
                  去评价
                </div>
                <div class="like_user" @click.stop="" v-show="item.status === 60 || item.status === 61">
                  <span :style="'color: #929292'">已评价</span>
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
              <div class="btn" @click.stop="setJob(item.jobhunterUid, 'check-invitation', item, 1)" v-if="item.status === 41 || item.status === 51 || item.status === 57 || item.status === 58 || item.status === 59 || item.status === 60 || item.status === 61 ">面试详情</div>
              <div class="btn" @click="getResume(item.jobhunterUid, index)" v-if="item.status === 52 || item.status === 53 || item.status === 54 || item.status === 55">查看简历</div>
            </div>
          </div>
        </div>
      </div>

      <el-pagination
        class="pagination"
        background
        v-if="form.total > 20"
        layout="prev, pager, next, slot"
        :total="form.total"
        :page-size="form.count"
        prev-text="上一页"
        next-text="下一页"
        :current-page="form.page"
        @current-change="handleCurrentPageChange"
      >
        <span class="total">共{{ Math.ceil(form.totalPage) }}页, {{form.total}}条记录</span>
      </el-pagination>

      <div class="cont_none" v-if="candidateList.length === 0">
        <!-- <img  src="../../assets/images/ufo.png"> -->
        <div class="null-product">
          <div class="null-img">
            <img src="@/assets/fly.png" />
          </div>
          <div class="null-text">与其等待，不如主动出击~</div>
        </div>
        <!-- <p>{{ this.navType === 'invite' ? '快去邀请吧~ '  : '暂时没有收到意向~'}}</p> -->
      </div>

    <div class="pop" v-if="pop.isShow" @click="closeMsg($event)">
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

      <div class="resumeBox" v-if="showResume">
        <div class="Numbering">
          <span>简历编号：{{nowResumeMsg.vkey}}</span>
          <span>{{nowResumeMsg.resumeUpdateTime}}更新</span>
          <div class="closediggle" @click="pop.isShow = false">
            <i class="iconfont iconda"></i>
          </div>
        </div>
        <div class="resumeLyout">
          <div class="ResumeDetails">
            <!-- 基础信息 -->
            <div class="base">
              <div class="message">
                <div class="msgUrl">
                  <img :src="nowResumeMsg.avatar.url" alt v-if="nowResumeMsg.avatar" />
                  <!-- <img class="gender" src="~IMAGES/girl.png" v-if="item.resume.gender===2" />
                  <img class="gender" src="~IMAGES/boy.png" v-else />-->
                  <span class="gender" v-show="nowResumeMsg.gender===2">
                    <img v-show="nowResumeMsg.gender===2" src="~IMAGES/girl.png" />
                    <!-- <i v-show="nowResumeMsg.gender===1" class="icon iconfont iconicon_boy"></i> -->
                  </span>
                  <span class="gender2" v-show="nowResumeMsg.gender===1">
                    <img src="~IMAGES/boy.png" v-show="nowResumeMsg.gender===1" />
                    <!-- <i v-show="nowResumeMsg.gender===2" class="icon iconfont iconicon_girl"></i> -->
                  </span>
                </div>
                <div class="msgUserInfo">
                  <div class="basemsg">
                    <span class="realName">{{nowResumeMsg.name}}</span>
                    <div class="lebalList">
                      <div class="lebalItem">
                        <i class="icon iconfont iconzhiwei" style></i>
                        <span>{{nowResumeMsg.workAgeDesc}}</span>
                      </div>
                      <div class="lebalItem">
                        <i class="icon iconfont iconnianling"></i>
                        <span>{{nowResumeMsg.age}}岁</span>
                      </div>
                      <div
                        class="lebalItem"
                        :style="nowResumeMsg.jobStatus===''?'margin-right:0px;':''"
                      >
                        <i class="icon iconfont iconxueli"></i>
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
            <div class="btnstatus">
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'recruiter-chat', nowResumeMsg, 2)" v-if="!nowResumeMsg.interviewInfo.data.haveInterview && !nowResumeMsg.interviewInfo.data.isOnProtected && !nowResumeMsg.interviewInfo.data.hasUnsuitRecord">开撩约面</div>
              <div class="btndisable" v-if="!nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.isOnProtected">暂时无法约面</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'confirm-interview', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 11">查看联系</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'check-invitation', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 12">查看邀约</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'arranging-interviews', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 21">安排面试</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'arranging-interviews', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 31">
                <!-- <span v-if="nowResumeMsg.interviewInfo.data.data[0].type === 1">查看面试</span>
                <span v-if="nowResumeMsg.interviewInfo.data.data[0].type === 2">修改面试</span> -->
                <span>查看面试</span>
                </div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'arranging-interviews', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus === 32">
                <!-- <span v-if="nowResumeMsg.interviewInfo.data.data[0].type === 1">查看面试</span>
                <span v-if="nowResumeMsg.interviewInfo.data.data[0].type === 2">修改面试</span> -->
                <span>修改面试</span>
              </div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'interview-retract', nowResumeMsg, 2)" v-if="!nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.hasUnsuitRecord">撤回</div>
              <div class="btn1" @click.stop="setJob(nowResumeMsg.uid, 'check-invitation', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.interviewStatus >= 41">面试详情</div>

              <div class="btn2" @click.stop="setJob(nowResumeMsg.uid, 'inappropriate', nowResumeMsg, 2)" v-if="nowResumeMsg.interviewInfo.data.haveInterview && !nowResumeMsg.interviewInfo.data.hasUnsuitRecord">不合适</div>
              <div class="btn2" @click.stop="setJob(nowResumeMsg.uid, 'watch-reson', nowResumeMsg, 2)"  v-if="!nowResumeMsg.interviewInfo.data.haveInterview && nowResumeMsg.interviewInfo.data.hasUnsuitRecord">查看原因</div>

            </div>
            <div class="msgCode" v-if="shareResumeImg">
              <img :src="shareResumeImg" />
              <span>扫码进入</span>
            </div>
            <div class="isAdmin">
              <div class="ContactInformation">
                <p class="contactTitle" v-if="nowResumeMsg.mobile||nowResumeMsg.wechat">联系方式:</p>
                <div class="Contact" v-if="nowResumeMsg.mobile">
                  <span>手机号:</span>
                  <span>{{nowResumeMsg.mobile}}</span>
                </div>
                <div class="Contact" v-if="nowResumeMsg.wechat">
                  <span>微信号:</span>
                  <span>{{nowResumeMsg.wechat}}</span>
                </div>
                <p v-if="nowResumeMsg.wechat==''&&nowResumeMsg.mobile==''" class="noUpload">暂无上传</p>
              </div>

              <div class="TabSelect" v-if="nowResumeMsg.resumeAttach">
                <p class="addTab">
                  <a
                    :href="nowResumeMsg.resumeAttach.url"
                    :download="nowResumeMsg.resumeAttach.fileName"
                  >下载附件</a>
                </p>
                <p class="addTab">发送邮件</p>
              </div>
            </div>
          </div>
        </div>
      </div>
          <!-- 没有发布职位 -->
      <div class="noJobBox" v-if="pop.type === 'noJob'">
        <div class="close"><i @click="pop.isShow = false" class="iconfont icondanchuang-guanbi"></i></div>
        <div class="nullimg"><img src="@/assets/images/nullCandidate.png" /></div>
        <div class="noJobText">
          <p>邀请候选人面试</p>
          <p>至少需要一个招聘中职位~</p>
          </div>
        <div class="noJobBtn" @click.stop="toAddJob">去发布/开放职位</div>
      </div>
      <!-- 面试安排 -->
      <div class="noJobBox" v-if="pop.Interview">
        <div class="close"><i @click="cancelshow()" class="iconfont icondanchuang-guanbi"></i></div>
        <div class="content-info">
        <div class="title">{{pop.InterviewTitle}}</div>
        <!-- 面试安排 -->
        <div class="arrange" v-if="pop.type === 'setinterinfo'">
          <div class="item">
            <div class="name">面试官姓名</div>
            <div class="info">
              <el-input v-model="arrangementInfo.realname" placeholder="请填写"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">面试官手机</div>
            <div class="info">
              <el-input v-model="arrangementInfo.mobile" placeholder="请填写"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">面试职位</div>
            <div class="info">
              <el-select v-model="arrangementInfo.positionId" placeholder="请选择">
              <el-option
                v-for="item in positionOption"
                :key="item.id"
                :label="item.positionName"
                :value="item.id">
              </el-option>
            </el-select>
              </div>
          </div>
          <div class="item">
            <div class="name">面试地址</div>
            <div class="info" @click="selectaddredd()">
              <div class="info-select">
                {{arrangementInfo.addressName}}
              </div>
              <!-- <el-input :disabled="true" v-model="arrangementInfo.addressName" placeholder="请填写"></el-input> -->
              </div>
          </div>
        </div>
        <!-- 选择面试地址 -->
        <div class="selectaddress" v-if="pop.type === 'address'">
          <div class="addresslist clearfix" :key="i" v-for="(item, i) in addresslist">
            <div class="icon" @click="toggleaddress(item)">
              <i :class="['iconfont iconxuanzhong position bg']" v-if="item.cur"></i>
                <i :class="['iconfont iconbeixuanxiang position']" v-else></i>
              </div>
            <div class="center">{{item.address}}</div>
            <div class="edit" @click="editaddress(item)">编辑</div>
          </div>
          <div class="addarea" @click="addaddress()">
            <div class="add"><i class="iconfont icontianjia1 bgcolor"></i></div>
            <div class="add-text">添加地址</div>
          </div>
        </div>
        <!-- 添加地址插件 -->
        <map-search v-if="pop.type==='addaddress'" @popCancel="popCancel" @addAdress="addAdress"></map-search>
        <!-- 新增地址 -->
        <div class="arrange" v-if="pop.type === 'editaddress'">
          <div class="item">
            <div class="name">地址</div>
            <div class="info">
              <el-input :disabled="true" v-model="addressobj.address" placeholder="请填写地址"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">门牌</div>
            <div class="info">
              <el-input v-model="addressobj.doorplate" placeholder="请输入门牌号"></el-input>
              </div>
          </div>
        </div>

        <!-- 编辑地址 -->
        <div class="arrange" v-if="pop.type === 'Aeditaddress'">
          <div class="item">
            <div class="name">地址</div>
            <div class="info">
              <el-input :disabled="true" v-model="addressobj.address" placeholder="请填写地址"></el-input>
              </div>
          </div>
          <div class="item">
            <div class="name">门牌</div>
            <div class="info">
              <el-input v-model="addressobj.doorplate" placeholder="请输入门牌号"></el-input>
              </div>
          </div>
        </div>
        <!-- 面试信息 -->
        <div class="arrangeinfo" v-if="pop.type === 'preview' && jobhunterInfo">
          <div class="item">
            <div class="icon">
              <i class="iconfont iconmianshiguan"></i>
            </div>
            <div class="text">{{jobhunterInfo.arrangementInfo.realname}}</div>
            <div class="phone" v-if="jobhunterInfo.arrangementInfo.mobile">{{jobhunterInfo.arrangementInfo.mobile}}</div>
          </div>
          <div class="item" v-if="jobhunterInfo.positionName">
            <div class="icon">
              <i class="iconfont iconzhiwei"></i>
            </div>
            <div class="text">{{jobhunterInfo.positionName}}</div>
          </div>
          <div class="item" v-if="jobhunterInfo.address">
            <div class="icon">
              <i class="iconfont icondidian"></i>
            </div>
            <div class="text">{{jobhunterInfo.address}}{{jobhunterInfo.doorplate}}</div>
          </div>
            <div class="item" v-show="jobhunterInfo.status >= 51">
              <div class="icon">
                <i class="iconfont iconshijian"></i>
              </div>
              <div class="text">{{jobhunterInfo.arrangementInfo.appointment}}</div>
            </div>

          <div v-if="pop.type === 'preview' && jobhunterInfo.status === 12">
          <div class="arrangeinfo-img">
            <img src="@/assets/images/timeinfo.png" />
          </div>
          <p class="wait">等待候选人接受邀请</p>
          <p class="wait_time">候选人将收到你的面试邀请，请耐心等待</p>
          </div>
          <div v-show="jobhunterInfo.status === 41">
            <div class="detail">
              <div class="detailtitle">面试时间已确认</div>
              <div class="desc">时间已添加到面试日程，准备迎接候选人吧～</div>
              <div class="time">{{jobhunterInfo.arrangementInfo.appointment}}</div>
            </div>
          </div>

            <div class="detail" v-show="jobhunterInfo.status >= 51">
              <div class="end-time">面试结果</div>
               <!-- 到场 -->
               <div class="stepevaluate clearfix" v-show="jobhunterInfo.status === 51">
                <div class="titlel">
                  <div class="dian"></div>
                  <div class="tex">候选人到场了吗？~</div>
                </div>
                 <div class="stepall">
                <div class="step" @click="hascallback('no')">
                  <div class="icon"><img src="@/assets/images/ku.png" /></div>
                  <div class="text">候选人没来</div>
                </div>
                <div class="step" @click="hascallback('yes')">
                  <div class="icon"><img src="@/assets/images/xiao.png" /></div>
                  <div class="text">已到场面试</div>
                </div>
                </div>
              </div>
              <!-- 评价 -->
              <div class="stepevaluate clearfix" v-show="jobhunterInfo.status === 57 || jobhunterInfo.status === 58">
                <div class="titlel">
                  <div class="dian"></div>
                  <div class="tex">到场面试后感觉如何？评价一下吧~</div>
                </div>
                <div class="stepall">
                <div class="step" @click="selereson()">
                  <div class="icon"><img src="@/assets/images/ku.png" /></div>
                  <div class="text">不合适</div>
                </div>
                <div class="step" @click="haslike()">
                  <div class="icon"><img src="@/assets/images/xiao.png" /></div>
                  <div class="text">感觉不错</div>
                </div>
                </div>
              </div>
              <div class="end-status" v-show="jobhunterInfo.status === 60 || jobhunterInfo.status === 61 || jobhunterInfo.status === 59">
                <div class="status-icon">
                  <img v-show="jobhunterInfo.status === 60" src="@/assets/images/xiao.png" />
                  <img v-show="jobhunterInfo.status === 61" src="@/assets/images/ku.png" />
                  <img v-show="jobhunterInfo.status === 59" src="@/assets/images/ku.png" />
                </div>
                <div class="status-text" v-show="jobhunterInfo.status === 60">
                  <p class="p1">已到场面试，感觉不错</p>
                  <p class="p2">请联系候选人确认后续环节</p>
                </div>
                <div class="status-text2" v-show="jobhunterInfo.status === 61">
                  <p class="p1">已到场面试，但不合适</p>
                </div>
                <div class="status-text2" v-show="jobhunterInfo.status === 59">
                  <p class="p1">候选人没来</p>
                </div>
              </div>
              </div>
        </div>
        <div class="intertime" v-show="pop.type === 'setinterinfo'">
          <div class="intertime_title">约面时间</div>
          <ul class="time_list" v-if="model.dateLists.length">
          <li class="time_row" v-for="(item, index) in model.dateLists" :key="index">
            <i class="el-icon-remove" @click="deleteTime(index)"></i>
            {{item.appointment}}
          </li>
        </ul>
          <el-button type="text" class="add_time" v-if="model.dateLists.length < 3">
          <i class="iconfont icontianjia1 bgcolor"></i>
          <span :style="'margin-left:8px;line-height:14px'">添加时间</span>
          <el-date-picker
            v-model="form.date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
        </div>
        <div class="selectposition" v-show="pop.type === 'selectposition'">
          <div class="selectitem" v-for="(item, i) in positionLists" :key="i" @click="selectposition(item)">
            <div class="position">
              <div class="close" v-show="item.isOnline === 2">关闭</div>
              <div :class="['name', item.isOnline === 2 ? 'hui' : '']">{{item.positionName}}</div>
              <div :class="['money', item.isOnline === 2 ? 'hui' : '']">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info">
              <div :class="['address', item.isOnline === 2 ? 'hui' : '']">{{item.city}}</div>
              <div :class="['year', item.isOnline === 2 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.isOnline === 2 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="selectcur" v-if="item.isOnline === 1">
              <i :class="['iconfont iconxuanzhong position bg']" v-if="item.cur"></i>
                <i :class="['iconfont iconbeixuanxiang position']" v-else></i>
            </div>
            <div class="selectcur" v-else>
              <div class="circel"></div>
            </div>
          </div>
        </div>
        <div v-show="pop.type === 'inappropriate'">
        <div class="inappropriate clearfix">
          <div :class="['resonitem', item.cur ? 'resoncur' : '']" v-for="(item, i) in reasonlist" :key="i" @click="togglereson(item)">
            {{item.title}}
          </div>
        </div>
        <div class="explain">
            <div class="explaintitle">补充说明</div>
            <div class="text">
              <textarea v-model="extra" placeholder="请填写原因"></textarea>
            </div>
          </div>
          </div>

          <div v-show="pop.type === 'watchreson'">
            <div class="inappropriate clearfix">
            <div class="wachitem" v-for="(item, i) in watchresonlist" :key="i">
              {{item}}
            </div>
          </div>
          <div class="explain" v-if="resonword">
              <div class="explaintitle">补充说明</div>
              <div :class="['text', resonword ? 'noallow' : '']">
                <input type="text" v-model="resonword" placeholder="请填写原因"/>
              </div>
            </div>
          </div>
          <div class="selectposition" v-show="pop.type === 'applyrecord'">
            <div class="applytext">{{pop.recordtext}}</div>
          <div class="selectitem" v-for="(item, i) in applyrecordList" :key="i" @click="selectapply(item, i)">
            <div class="position">
              <div class="close" v-show="item.isOnline === 2">关闭</div>
              <div :class="['name', item.isOnline === 2 ? 'hui' : '']">{{item.positionName}}</div>
              <div class="money" v-show="item.positionId !== 0 && item.positionName !== '都不合适我'">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info" v-if="item.positionName !== '都不合适我'">
              <div :class="['address', item.isOnline === 2 ? 'hui' : '']">{{item.city}}</div>
              <div :class="['year', item.isOnline === 2 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.isOnline === 2 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="info" v-else>选择此项，以上申请记录将全部合并处理为不合适</div>
            <div class="selectcur">
              <i :class="['iconfont iconxuanzhong position bg']" v-if="item.hascur"></i>
                <i :class="['iconfont iconbeixuanxiang position']" v-else></i>
            </div>
          </div>
        </div>

        <div class="handler" v-show="pop.type !== 'preview'">
          <div class="save" @click="surehandler()" v-show="pop.type !== 'address'">{{pop.btntext}}</div>
          <div class="save" @click="sendhandler()" v-show="pop.type === 'address'">发送</div>
          <div class="cancel" v-show="pop.type !== 'watchreson'" @click="backhandler()">取消</div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getMyInfoApi } from 'API/auth'
import { getPositionTypeApi } from 'API/position'
import { getMyNavDataApi } from 'API/browse'
import { getResumeIdApi } from 'API/userJobhunter'
import { shareResumeApi } from 'API/forward'
import {
  getinviteapplyNum,
  getApplyListApi,
  getDetailApi,
  getInviteListApi
} from 'API/candidate'
import { recruiterDetail } from 'API/common'
import MapSearch from 'COMPONENTS/map'
import {
  topAdminPositonList,
  recruiterPositonList,
  sureOpenupAPi,
  watchInvitationAPi,
  getCommentReasonApi,
  getInterviewComment,
  improperMarkingApi,
  confirmInterviewApi,
  addressListApi, interviewRetract, addCompanyAdressApi, editCompanyAdressApi, setInterviewInfoApi, setCommentApi, setAttendApi } from 'API/candidateType'

@Component({
  name: 'candidate',
  methods: {},
  computed: {},
  watch: {
    $route: {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
  components: { MapSearch }
})
export default class CourseList extends Vue {
  userInfo = {};
  showResume = false
  pop = {
    isShow: false,
    Interview: false,
    InterviewTitle: '面试安排',
    btntext: '保存',
    recordtext: '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；',
    type: 'clickPic'
  }
  jobuid = ''
  jobhunterInfo = ''
  addressobj = {
    doorplate: '',
    address: ''
  }
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
    status: 0,
    position_type: '', // 状态
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
  searchCollect = [];
  isShowScreen = false;
  selectedScreen = []; // 筛选选中条件
  positionTypeList = []; // 职业标签列表
  searchBrowseMyselfList = [];
  sharePicIds = []; // 下载中的图片
  navNum = {}; // nav 数量
  listType = 0;
  typeList = [];
  nowResumeMsg = '';
  positionList = [{}];
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
  value1 = '';
  changeTime () {
    if (this.value1) {
      this.form.created_start_time = this.value1[0]
      this.form.created_end_time = this.value1[1]
    } else {
      this.form.created_start_time = undefined
      this.form.created_end_time = undefined
    }
    this.getList()
  }

  init () {
    this.form = Object.assign(this.form, this.$route.query || {})
    this.userInfo = this.$store.state.userInfo
    let query = this.$route.query
    getinviteapplyNum().then(res => {
      this.applynum = res.data.data.applyTotal
      this.invitenum = res.data.data.inviteTotal
    })
    if (query.navType) {
      switch (query.navType) {
        case 'invite':
          this.typeList = this.inviteOptions
          this.getApplyList()
          this.getPositionTypeList()
          break
        case 'apply':
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

    this.listType = 0
    this.form.status = 0
    this.form.page = 1
    this.setPathQuery(this.form)
    if (type === 'apply') this.typeList = this.applyOptions
    else this.typeList = this.inviteOptions
    this.getPositionTypeList()
    this.navType = type
    this.setPath({ navType: type })
  }

  getMyNavData () {
    getMyNavDataApi().then(res => {
      this.navNum = res.data.data
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
  // 列表筛选
  screenList (type) {
    let otherActive = this.getOtherActive()
    if (type === 1) {
      if (this.selectedScreen.length > 0 || otherActive) {
        this.setDefaultScreen()
        if (!this.isShowScreen) {
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

  screenOp (status) {
    switch (status) {
      case 'cancel':
        this.setDefaultScreen()
        this.isShowScreen = false
        break
      case 'confirm':
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
      this.positionTypeList.length > 0
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

      //   data.push({
      //     name: '我的主页',
      //     labelId: 'index',
      //     active: false
      //   })

      this.positionTypeList = data
    })
  }

  // 意向列表
  getInviteList () {
    // let otherActive = this.getOtherActive()
    console.log(this.selectedScreen, '1')
    this.form.position_type = this.selectedScreen.join()
    // this.form.position_type = otherActive ? '0' : this.selectedScreen.join()
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
      })
      .catch(e => {
        this.candidateList = []
      })
  }
  // 邀请
  getApplyList () {
    // let otherActive = this.getOtherActive()
    console.log(this.selectedScreen, '2')
    // this.form.position_type = otherActive ? '0' : this.selectedScreen.join()
    this.form.position_type = this.selectedScreen.join()
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
      })
      .catch(e => {
        this.candidateList = []
      })
  }
  // 职业类型列表
  getPositionList (listType) {
    this.form.status = listType
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

  getTime (e) {
    this.model.dateLists.push({
      appointment: e,
      active: false,
      appointmentTime: Date.parse(new Date(e)) / 1000
    })
  }

  deleteTime (index) {
    this.model.dateLists.splice(index, 1)
  }

  // 设置是否到场
  hascallback (type) {
    if (type === 'no') {
      let data1 = { interviewId: this.jobhunterInfo.interviewId, isAttend: 0 }
      setAttendApi(data1).then((res) => {
        // this.pop.isShow = false
        this.viewdetail(this.jobhunterInfo)
      })
    }
    if (type === 'yes') {
      let data2 = { interviewId: this.jobhunterInfo.interviewId, isAttend: 1 }
      setAttendApi(data2).then((res) => {
        this.viewdetail(this.jobhunterInfo)
      })
    }
  }

  // 点击感觉不错
  haslike () {
    setCommentApi({ interviewId: this.jobhunterInfo.interviewId }).then((res) => {
      this.viewdetail(this.jobhunterInfo)
    })
  }

  // 面试详情
  viewdetail (item, statusid) {
    this.pop = {
      isShow: true,
      Interview: true,
      InterviewTitle: '面试信息',
      type: 'preview'
    }
    let ids = ''
    if (statusid === 1) {
      ids = item.interviewInfo.data.lastInterviewId
      this.showResume = true
    } else {
      ids = item.interviewId
      this.showResume = false
    }
    let data = { interviewId: ids }
    getDetailApi(data).then((res) => {
      this.jobhunterInfo = res.data.data
      this.init()
    })
  }

  // 点击不合适
  selereson () {
    this.pop = {
      isShow: true,
      Interview: true,
      InterviewTitle: '选择不合适原因',
      btntext: '保存',
      type: 'inappropriate'
    }
    getCommentReasonApi().then((res) => {
      let arr = res.data.data
      arr.map((v, k) => {
        v.cur = false
      })
      this.reasonlist = arr
    })
  }
  hasadmin () {
    recruiterDetail().then((res) => {
      this.info = res.data.data
    })
  }
  setJob (uid, type, vo, statusid) {
    if (statusid === 1) {
      this.showResume = false
    } else {
      this.showResume = true
    }
    this.jobuid = uid
    this.getResume(uid, 'red')
    if (vo.interviewId) {
      this.interviewId = vo.interviewId
    } else {
      this.interviewId = vo.interviewInfo.data.lastInterviewId
    }
    switch (type) {
      case 'recruiter-chat':
        console.log(this.info.isCompanyTopAdmin)
        if (this.info.isCompanyTopAdmin) {
          topAdminPositonList().then((res) => {
            let arr = res.data.data
            let hasOnline = []
            arr.map((v, k) => {
              v.cur = false
              if (v.isOnline === 1) {
                hasOnline.push(v)
              }
            })
            if (arr.length === 0) {
              this.pop = {
                isShow: true,
                type: 'noJob'
              }
            }
            if (arr.length === 0 && hasOnline.length === 0) {
              this.pop = {
                isShow: true,
                type: 'noJob'
              }
            } else {
              this.pop = {
                isShow: true,
                Interview: true,
                InterviewTitle: '选择职位',
                btntext: '确定',
                type: 'selectposition'
              }
              this.positionLists = arr
            }
          })
        } else {
          recruiterPositonList().then((res) => {
            let arr = res.data.data
            let hasOnline = []
            arr.map((v, k) => {
              v.cur = false
              if (v.isOnline === 2) {
                hasOnline.push(v)
              }
            })
            if (arr.length === 0 || hasOnline.length === arr.length) {
              this.pop = {
                isShow: true,
                type: 'noJob'
              }
            } else {
              this.pop = {
                isShow: true,
                Interview: true,
                InterviewTitle: '选择职位',
                btntext: '确定',
                type: 'selectposition'
              }
              this.positionLists = arr
            }
          })
        }
        break
      case 'check-invitation':
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '面试信息',
          btntext: '确定',
          type: 'preview'
        }
        let data = { interviewId: this.interviewId }
        watchInvitationAPi(data).then((res) => {
          this.jobhunterInfo = res.data.data
        })
        break
      case 'confirm-interview':
        if (vo.interviewInfo) {
          if (vo.interviewInfo.data.data.length > 1) {
            this.pop = {
              isShow: true,
              Interview: true,
              InterviewTitle: '处理候选人多条申请记录',
              recordtext: '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；',
              btntext: '确定',
              type: 'applyrecord'
            }
            let applylists = vo.interviewInfo.data.data
            applylists.map((v, k) => {
              if (v.positionId === 0) {
                v.positionName = '直接与我约面'
              }
              v.hascur = false
            })
            this.applyrecordList = applylists
          } else {
            confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
              this.$message.success('约面成功')
              this.init()
            })
          }
        } else {
          confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
            this.$message.success('约面成功')
            this.init()
          })
        }
        break
      case 'arranging-interviews':
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '面试安排',
          btntext: '保存',
          type: 'setinterinfo'
        }
        watchInvitationAPi({ interviewId: this.interviewId }).then((res) => {
          this.arrangementInfo.interviewId = res.data.data.interviewId
          this.arrangementInfo.realname = res.data.data.arrangementInfo.realname
          this.arrangementInfo.mobile = res.data.data.arrangementInfo.mobile
          if (res.data.data.positionId === 0) {
            this.arrangementInfo.positionId = ''
          } else {
            this.arrangementInfo.positionId = res.data.data.positionId
          }
          this.arrangementInfo.addressId = res.data.data.addressId
          this.arrangementInfo.addressName = res.data.data.address
          if (res.data.data.arrangementInfo.appointmentList) {
            this.model.dateLists = res.data.data.arrangementInfo.appointmentList
          }

          if (this.info.isCompanyTopAdmin) {
            topAdminPositonList().then((res) => {
              let arr = res.data.data
              let hasOnline = []
              arr.map((v, k) => {
                v.cur = false
                if (v.isOnline === 1) {
                  hasOnline.push(v)
                }
              })
              this.positionOption = hasOnline
            })
          } else {
            recruiterPositonList().then((res) => {
              let arr = res.data.data
              let hasOnline = []
              arr.map((v, k) => {
                v.cur = false
                if (v.isOnline === 1) {
                  hasOnline.push(v)
                }
              })
              this.positionOption = hasOnline
            })
          }
          // this.arrangementInfo.interviewTime = res.data.data.createdAtTime
        })
        break
      case 'interview-retract':
        let retract = { jobhunterUid: this.jobuid, interviewId: this.interviewId }
        interviewRetract(retract).then((res) => {
          this.$message.success('撤回成功')
          this.init()
        })
        break
      case 'watch-reson':
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '不合适原因',
          btntext: '好的',
          type: 'watchreson'
        }
        let comment = { interviewId: this.interviewId }
        getInterviewComment(comment).then((res) => {
          this.watchresonlist = res.data.data.reason.split(',')
          this.resonword = res.data.data.extraDesc
        })
        break
      case 'inappropriate':
        if (vo.interviewInfo) {
          if (vo.interviewInfo.data.data.length > 1) {
            this.pop = {
              isShow: true,
              Interview: true,
              InterviewTitle: '处理候选人多条申请记录',
              recordtext: '选择一个职位进行约面或全部处理为不合适，面试试最终确认前，可随时沟通更新面试职位；',
              btntext: '确定',
              type: 'applyrecord'
            }
            let applylists = vo.interviewInfo.data.data.slice()
            applylists.push({ positionName: '都不合适我' })
            applylists.map((v, k) => {
              if (v.positionId === 0) {
                v.positionName = '直接与我约面'
              }
              v.hascur = false
            })
            this.applyrecordList = applylists
          } else {
            this.pop = {
              isShow: true,
              Interview: true,
              InterviewTitle: '选择不合适原因',
              btntext: '保存',
              type: 'inappropriate'
            }
            getCommentReasonApi().then((res) => {
              let arr = res.data.data
              arr.map((v, k) => {
                v.cur = false
              })
              this.reasonlist = arr
            })
          }
        } else {
          this.pop = {
            isShow: true,
            Interview: true,
            InterviewTitle: '选择不合适原因',
            btntext: '保存',
            type: 'inappropriate'
          }
          getCommentReasonApi().then((res) => {
            let arr = res.data.data
            arr.map((v, k) => {
              v.cur = false
            })
            this.reasonlist = arr
          })
        }
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
  backhandler () {
    if (this.pop.type === 'address') {
      this.pop = {
        isShow: true,
        Interview: true,
        InterviewTitle: '面试安排',
        btntext: '保存',
        type: 'setinterinfo'
      }
    } else {
      if (this.showResume) {
        this.pop.Interview = false
      } else {
        this.pop.isShow = false
      }
    }
    if (this.pop.type === 'editaddress' || this.pop.type === 'Aeditaddress') {
      this.pop = {
        isShow: true,
        Interview: true,
        InterviewTitle: '选择地址',
        btntext: '发送',
        type: 'address'
      }
    }
  }
  // 选择地址发送
  sendhandler () {
    let arr = []
    this.addresslist.map((v, k) => {
      if (v.cur) {
        arr.push(v)
      }
    })
    if (arr.length === 0) {
      this.$message.warning('请选择一个地址')
    } else {
      this.arrangementInfo.addressId = arr[0].id
      this.arrangementInfo.addressName = arr[0].address
      this.pop = {
        isShow: true,
        Interview: true,
        InterviewTitle: '面试安排',
        btntext: '保存',
        type: 'setinterinfo'
      }
    }
  }

  surehandler () {
    // 点击选择职位后开撩
    if (this.pop.type === 'selectposition') {
      let arr = []
      this.positionLists.map((v, k) => {
        if (v.cur) {
          arr.push(v)
        }
      })
      if (arr.length > 0) {
        let data = { jobhunterUid: this.jobuid, positionId: this.jobpositionid }
        sureOpenupAPi(data).then((res) => {
          this.pop.isShow = false
          this.init()
          this.$message.success('开撩成功')
        })
      } else {
        this.$message.warning('请选择职位')
      }
    }
    // 点击保存不合适原因
    if (this.pop.type === 'inappropriate') {
      let inapp = []
      this.reasonlist.map((v, k) => {
        if (v.cur) {
          inapp.push(v.id)
        }
      })
      let mark = { jobhunterUid: this.jobuid, interviewId: this.interviewId, extra: this.extra, reason: inapp.join(',') }
      if (inapp.length > 0) {
        improperMarkingApi(mark).then((res) => {
          this.$message.success('操作成功')
          this.init()
          this.pop = {
            isShow: false
          }
        })
      } else {
        this.$message.warning('请选择不合适原因')
      }
    }
    // 点击处理多条记录
    if (this.pop.type === 'applyrecord') {
      let arr = []
      this.applyrecordList.map((v, k) => {
        if (v.hascur) {
          arr.push(v)
          this.interviewId = v.interviewId
        }
      })
      if (this.pop.recordtext === '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；') {
        if (arr.length === 0) {
          this.$message.warning('请选择一条面试')
        } else {
          confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
            this.$message.success('约面成功')
            this.pop = {
              isShow: false
            }
            this.init()
          })
        }
      } else {
        if (arr.length === 0) {
          this.$message.warning('请选择一条标记为不合适')
        } else {
          if (this.interviewId) {
            confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
              this.$message.success('约面成功')
              this.pop = {
                isShow: false
              }
              this.init()
            })
          } else {
            this.pop = {
              isShow: true,
              Interview: true,
              InterviewTitle: '选择不合适原因',
              btntext: '保存',
              type: 'inappropriate'
            }
            getCommentReasonApi().then((res) => {
              let arr = res.data.data
              arr.map((v, k) => {
                v.cur = false
              })
              this.reasonlist = arr
            })
          }
        }
      }
    }
    // 选择地址
    if (this.pop.type === 'address') {
      let arr = []
      this.addresslist.map((v, k) => {
        if (v.cur) {
          arr.push(v)
        }
      })
      if (arr.length === 0) {
        this.$message.warning('请选择一个地址')
      } else {
        this.arrangementInfo.addressId = arr[0].id
        this.arrangementInfo.addressName = arr[0].address
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '面试安排',
          btntext: '保存',
          type: 'setinterinfo'
        }
      }
    }
    // 添加地址
    if (this.pop.type === 'editaddress') {
      addCompanyAdressApi(this.addressobj).then(res => {
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '选择地址',
          btntext: '发送',
          type: 'address'
        }
        this.$message.success('添加成功')
        this.selectaddredd()
        this.arrangementInfo.addressId = res.data.data.id
        this.arrangementInfo.addressName = res.data.data.address
      }).catch(e => {
        this.$message.error(e.data.msg)
      })
    }
    // 编辑地址
    if (this.pop.type === 'Aeditaddress') {
      editCompanyAdressApi(this.addressobj).then(res => {
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '选择地址',
          btntext: '发送',
          type: 'address'
        }
        this.$message.success('编辑成功')
        this.selectaddredd()
        this.arrangementInfo.addressId = res.data.data.id
        this.arrangementInfo.addressName = res.data.data.address
      }).catch(e => {
        this.$message.error(e.data.msg)
      })
    }
    // 点击确定约面
    if (this.pop.type === 'setinterinfo') {
      if (!this.arrangementInfo.addressId) {
        this.$message.error('请选择一个职位')
        return
      }
      if (!this.arrangementInfo.addressId) {
        this.$message.error('请选择一个地址')
        return
      }
      let timearr = []
      this.model.dateLists.map((v, k) => {
        timearr.push(v.appointmentTime)
      })
      if (!timearr.length) {
        this.$message.error('请至少添加一个约面时间')
        return
      }
      this.arrangementInfo.interviewTime = timearr.join(',')
      setInterviewInfoApi(this.arrangementInfo).then((res) => {
        this.$message.success('安排面试成功')
        this.init()
        this.pop.isShow = false
      }).catch(err => {
        this.$message.error(err.data.msg)
      })
    }
    // 查看原因
    if (this.pop.type === 'watchreson') {
      this.pop = {
        isShow: false
      }
    }
  }
  // 选择职位
  selectposition (item) {
    if (item.isOnline === 2) {
      return false
    } else {
      this.jobpositionid = item.id
      this.positionLists.map((v, k) => {
        v.cur = item === v
      })
    }
  }
  // 选择申请记录
  selectapply (item, index) {
    let applyrecordList = this.applyrecordList.slice()
    applyrecordList.map((v, k) => {
      v.hascur = k === index
    })
    this.applyrecordList = applyrecordList
  }
  // 选择不合适原因
  togglereson (data) {
    data.cur = !data.cur
  }
  // 选择地址列表
  selectaddredd () {
    recruiterDetail().then((res) => {
      let data = { page: 1, count: 20, company_id: res.data.data.currentCompanyId }
      addressListApi(data).then((res) => {
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '选择地址',
          btntext: '发送',
          type: 'address'
        }
        let arr = res.data.data
        arr.map((v, k) => {
          if (this.arrangementInfo.addressId === v.id) {
            v.cur = true
          } else {
            v.cur = false
          }
        })
        this.addresslist = arr
      })
    })
  }
  toggleaddress (data) {
    this.addresslist.map((v, k) => {
      v.cur = data === v
    })
  }
  addaddress () {
    this.pop.type = 'addaddress'
  }
  popCancel () {
    if (this.pop.type === 'addaddress') {
      this.pop = {
        isShow: true,
        Interview: true,
        InterviewTitle: '选择地址',
        btntext: '发送',
        type: 'address'
      }
    }
  }
  created () {
    this.hasadmin()
  }
  addAdress (param) {
    this.pop = {
      isShow: true,
      Interview: true,
      InterviewTitle: '新增地址',
      btntext: '确定',
      type: 'editaddress'
    }
    this.addressobj = param.data
    this.addressobj.areaName = this.addressobj.area_id
    this.addressobj.area_id = ''
  }
  editaddress (data) {
    this.pop = {
      isShow: true,
      Interview: true,
      InterviewTitle: '编辑地址',
      btntext: '确定',
      type: 'Aeditaddress'
    }
    this.addressobj = data
    this.addressobj.areaName = this.addressobj.area_id
    this.addressobj.area_id = ''
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
  getResume (resumeId, index) {
    if (index !== 'red') {
      this.pop = {
        isShow: true,
        type: 'resume'
      }
      this.showResume = true
      this.getShareResume(resumeId)
    }
    getResumeIdApi({ uid: resumeId }).then(res => {
      this.nowResumeMsg = res.data.data
      this.showuid = res.data.data.uid
      this.showindex = res.data.data
      this.init()
    })
  }

  // 获取简历二维码
  getShareResume (resumeId) {
    shareResumeApi({ resumeUid: resumeId, forwardType: 1 }).then(res => {
      this.shareResumeImg = res.data.data.positionQrCodeUrl
    })
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
</style>
