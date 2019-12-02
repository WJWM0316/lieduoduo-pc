<template>
  <div id="candidate">
    <div class="recruiter_main">
      <div class="main_top_warp">
          <div class="main_top" >
            <div class="topBlo topStatusBlo borright" :class="{'cur':navType==='searchBrowseMyself'}" @click="changeNav('searchBrowseMyself')">
              <i class="iconfont icon-zhengyan" style="padding-right:0px"></i>
              看过我的({{navNum.browseMyselfCount || 0}})
            </div>
            <div class="topBlo topStatusBlo borleft"  :class="{'cur':navType==='searchCollect'}" @click="changeNav('searchCollect')">
              <span class="border"></span>
              <i class="iconfont icon-ganxingqu-"></i>
              对我感兴趣({{navNum.collectMyselfCount || 0}})
            </div>
            <div class="topBlo topStatusBlo2"  :class="{'cur':navType==='searchMyCollect'}" @click="changeNav('searchMyCollect')">
              <i class="iconfont icon-ganxingqu-"></i>
              我感兴趣的({{navNum.myCollectCount || 0}})
            </div>

            <div class="screen_cont">
              <div class="topSelected" @click="screenList(1)" :class="{'selected':isShowScreen}" v-if="isShowScreen">
                <i class="iconfont icon-shaixuan"></i>
                {{ selectedScreen.length > 0 || (positionTypeList.length > 0 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
              </div>

              <div class="topSelected" @click="screenList(1)" :class="{'selected':selectedScreen.length>0}" v-else>
                <i class="iconfont icon-shaixuan" style="color:#929292"></i>
                {{selectedScreen.length > 0 ||  (positionTypeList.length > 0 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
              </div>

              <div class="topSelected2" @click="screenList(2)">
                <i class="iconfont icon-jiantou"></i>
              </div>

              <div class="screenBox" v-if="isShowScreen">
                <div class="triangle_border_top"></div>
                <div class="screen_tit">{{getPopName()}}</div>
                <div class="lable_list" >
                  <span v-for="(item,index) in positionTypeList" :key="index" @click="labelClick(index)" :class="{'cur':item.active}" > {{item.name}}</span>
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
        <div class="candidate_blo" v-for="(item,index) in candidateList" :key="index" @click="getResume(item.uid, index)">
          <div class="bloTop">
            <div class="timer">{{item.viewAt}}</div>
            <div class="topText" v-if="navType === 'searchBrowseMyself'">看过我的{{item.positionInfo && item.positionInfo.positionName ?'职位':'主页'}}</div>
            <div class="topText" v-if="navType === 'searchCollect'">对我{{item.positionInfo && item.positionInfo.positionName ?'的职位':''}}感兴趣</div>
            <div class="topText" v-if="navType === 'searchMyCollect'">对Ta感兴趣</div>

            <div class="topText topText2"><span v-if="item.positionInfo.area">【{{item.positionInfo.area}}&nbsp;|&nbsp;</span><span v-if="item.positionInfo.positionName">{{item.positionInfo.positionName}}&nbsp;|&nbsp;</span><span v-if="item.positionInfo.emolument"> {{item.positionInfo.emolument}}】</span></div>
              <div class="status">
                <div class="like_user" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus >= 41">
                  已安排
                </div>
                <div class="like_user" v-if="item.interviewInfo.data.lastInterviewStatus === 61">
                  不合适
                </div>
                <div class="like_user" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 32">
                  待我修改
                </div>
                <div class="like_user" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 31">
                  待对方确认
                </div>
                <div class="like_user" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 21">
                  待我安排
                </div>
                <div class="like_user" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 12">
                  待对方处理
                </div>
                <div class="like_user" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 11">
                  未处理
                </div>
                <div class="btn" v-if="!item.interviewInfo.data.haveInterview && item.interviewInfo.data.isOnProtected">对方暂不考虑</div>
                <div class="btn" v-if="item.interviewInfo.data.interviewStatus === 51">>已结束</div>
              </div>
          </div>
          <div class="bloCont">
            <div class="cont_left">
              <div class="leftMsg">
                <div class="userBaseInfo">
                  <img class="gender" src="../../assets/images/girl.png" v-if="item.gender===2" />
                  <img class="gender" src="../../assets/images/boy.png" v-else />
                  <img class="userIcon" :src="item.avatar.middleUrl" />
                  <div class="infoRight">
                    <div class="infoName textEllipsis">
                      <span v-if="!item.glass">{{item.name}}</span>
                    </div>

                    <ul class="userLabel">
                      <li class="" v-if="item.workAgeDesc">{{item.workAgeDesc}}</li>
                      <li class="" v-if="item.age">{{item.age}}岁</li>
                      <li class="" v-else>暂无年龄</li>
                      <li class="" v-if="item.degreeDesc">{{item.degreeDesc}}</li>
                      <li class="" v-else>暂无学历</li>
                    </ul>
                  </div>
                </div>
                <div class="intention" v-if="item.expects.length>0">求职意向：<span class="intentionText intentionTextWidth textEllipsis"> {{item.expects[0].city}} </span> ·
                  <span class="intentionText intentionTextWidth2 textEllipsis">{{item.expects[0].position}}</span> ·
                  <span class="intentionText2">{{item.expects[0].salaryFloor}}k~{{item.expects[0].salaryCeil}}k</span>
                </div>
                <div class="intention" v-else>求职意向：暂无求职意向</div>
              </div>
              <div class="bloExperience workExperience">
                <div class="experienceTitle ">最近工作经历</div>
                <div class="experienceText textEllipsis" v-if="item.lastCompanyName">{{item.lastCompanyName}}</div>
                <div class="experienceText textEllipsis" v-if="item.lastPosition">{{item.lastPosition}}</div>
                <div class="experienceText textEllipsis" v-if="item.lastCompanyName.length<1">暂无工作经历</div>
              </div>
              <div class="bloExperience educationExperience">
                <div class="experienceTitle">最近教育经历</div>
                <div class="experienceText textEllipsis" v-if="item.education && item.education.school">{{item.education.school}}</div>
                <div class="experienceText textEllipsis" v-else>暂无教育经历</div>

                <div class="experienceText textEllipsis" v-if="item.education && item.education.major">{{item.education.major}}</div>
              </div>
            </div>

            <div class="userOp">
              <div class="like_user" @click.stop="setJob(item.uid, 'inappropriate', item, 1)" v-show="item.interviewInfo.data.haveInterview && !item.interviewInfo.data.hasUnsuitRecord">
                不合适
              </div>
              <div class="like_user" @click.stop="setJob(item.uid, 'watch-reson', item, 1)" v-if="!item.interviewInfo.data.haveInterview && item.interviewInfo.data.hasUnsuitRecord">
                  查看原因
                </div>

              <div class="btn" @click.stop="setJob(item.uid, 'recruiter-chat', item, 1)" v-if="!item.interviewInfo.data.haveInterview && !item.interviewInfo.data.isOnProtected && !item.interviewInfo.data.hasUnsuitRecord">开撩约面</div>
              <div class="btn-disable" @click.stop="setJob(item.uid, 'cancel', item, 1)" v-if="!item.interviewInfo.data.haveInterview && item.interviewInfo.data.isOnProtected">暂时无法约面</div>
              <div class="btn" @click.stop="setJob(item.uid, 'confirm-interview', item, 1)" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 11">查看联系</div>
              <div class="btn" @click.stop="setJob(item.uid, 'check-invitation', item, 1)" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 12">查看邀约</div>
              <div class="btn" @click.stop="setJob(item.uid, 'arranging-interviews', item, 1)" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 21">安排面试</div>
              <div class="btn" @click.stop="setJob(item.uid, 'arranging-interviews', item, 1)" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 31">
                 <span>查看面试</span>
                </div>
              <div class="btn" @click.stop="setJob(item.uid, 'arranging-interviews', item, 1)" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus === 32">
                <span>修改面试</span>
                </div>
              <!-- <div class="btn" :style="'background:#F8F8F8'" @click.stop="setJob(item.uid, 'interview-retract', item, 1)" v-if="!item.interviewInfo.data.haveInterview && item.interviewInfo.data.hasUnsuitRecord">撤回</div> -->
              <div class="btn" @click.stop="setJob(item.uid, 'check-invitation', item, 1)" v-if="item.interviewInfo.data.haveInterview && item.interviewInfo.data.interviewStatus >= 41">面试详情</div>
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
        prev-text="上一页"
        next-text="下一页"
        :current-page="Number(form.page)"
        @current-change="handleCurrentPageChange"
      >
        <span class="total">共{{ Math.ceil(form.totalPage) }}页, {{form.total}}条记录</span>
      </el-pagination>

      <div class="cont_none" v-if="candidateList.length === 0">
        <div class="null-product">
            <div class="null-img">
              <img src="@/assets/images/fly.png" />
            </div>
            <div v-show="navType === 'searchBrowseMyself'" class="null-text">还没有人看过你哟~主动分享职位获取更多候选人吧</div>
            <div v-show="navType === 'searchCollect'" class="null-text">还没有人对你感兴趣哟~主动分享职位获取更多候选人吧</div>
            <div v-show="navType === 'searchMyCollect'" class="null-text">快去分享职位吧，一大波候选人等着开撩你！</div>
          </div>
      </div>
    </div>
    <div class="pop" v-show="pop.isShow" @click="closeMsg($event)">
      <div class="xcxPicBox" v-if="pop.type==='clickPic'">
        <img class="clo" src="~IMAGES/clo.png">
        <div class="main_tit">查看简历详情</div>

        <div class="xcx_main" v-if="!selectBlo || !selectBlo.src || selectBlo.src.length<1">
          <img class="xcx_load" src="~IMAGES/loading.gif">
          <p>正在加载中…</p>
        </div>

        <div class="xcx_main" v-show='selectBlo.src && selectBlo.src.length>0'>
          <img class="xcx_icon" :src="selectBlo.src">
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
        <!-- <div class="printing">
          <span>简历打印</span>
          </div> -->
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
            <div class="workExperience" v-if="nowResumeMsg.moreIntroduce.introduce">
              <p class="title">更多介绍</p>
              <div class="workList">
                <pre v-if="nowResumeMsg.moreIntroduce.introduce">{{nowResumeMsg.moreIntroduce.introduce}}</pre>
                <div class="imgList" v-if="nowResumeMsg.moreIntroduce.imgs.length > 0">
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
                <img class="like" src="../../assets/images/like.png"/>
                取消感兴趣
              </div>
              <div class="like_user" @click.stop="ownerOp(false,nowResumeMsg.uid)" v-else >
                <img class="like" src="../../assets/images/like_no.png"/>
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
              </div>
          </div>
        </div>
        <!-- 选择面试地址 -->
        <div class="selectaddress" v-if="pop.type === 'address'">
          <div class="addresslist clearfix" :key="i" v-for="(item, i) in addresslist">
            <div class="icon" @click="toggleaddress(item)">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.cur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
              </div>
            <div class="center">{{item.address}}</div>
            <div class="edit" @click="editaddress(item)">编辑</div>
          </div>
          <div class="addarea" @click="addaddress()">
            <div class="add"><i class="iconfont icon-tianjiashijian bgcolor" style="font-size:12px"></i></div>
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
              <i class="iconfont icon-mianshiguan"></i>
            </div>
            <div class="text">{{jobhunterInfo.arrangementInfo.realname}}</div>
            <div class="f-line"></div>
            <div class="phone" v-if="jobhunterInfo.arrangementInfo.mobile">{{jobhunterInfo.jobhunterInfo.mobile}}</div>
          </div>
          <div class="item" v-if="jobhunterInfo.positionName">
            <div class="icon">
              <i class="iconfont icon-zhiwei1"></i>
            </div>
            <div class="text">{{jobhunterInfo.positionName}}</div>
          </div>
          <div class="item">
            <div class="icon">
              <i class="iconfont icon-didian"></i>
            </div>
            <div class="text">{{jobhunterInfo.address}}{{jobhunterInfo.doorplate}}</div>
          </div>
          <div class="item" v-show="jobhunterInfo.status === 51">
            <div class="icon">
              <i class="iconfont icon-shijian"></i>
            </div>
            <div class="text">{{jobhunterInfo.arrangementInfo.appointment}}</div>
          </div>

          <div v-if="pop.type === 'preview' && !jobhunterInfo.arrangementInfo.appointment">
          <div class="arrangeinfo-img">
            <img src="@/assets/images/timeinfo.png" />
          </div>
          <p class="wait">等待候选人接受邀请</p>
          <p class="wait_time">候选人将收到你的面试邀请，请耐心等待</p>
          </div>
          <div v-else>
            <div class="detail">
              <div class="detailtitle">面试时间已确认</div>
              <div class="desc">时间已添加到面试日程，准备迎接候选人吧～</div>
              <div class="time">{{jobhunterInfo.arrangementInfo.appointment}}</div>
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
          <i class="iconfont icon-tianjiashijian bgcolor" style="font-size:12px"></i>
          <span :style="'margin-left:16px;line-height:14px'">添加时间</span>
          <el-date-picker
            v-model="form.date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
        </div>
        <div style="padding-right:4px">
        <div class="selectposition" v-show="pop.type === 'selectposition'">
          <div class="selectitem" v-for="(item, i) in positionLists" :key="i" @click="selectposition(item)">
            <div class="position">
              <div class="close" v-show="item.isOnline === 2">关闭</div>
              <div :class="['name', item.isOnline === 2 ? 'hui' : '']">{{item.positionName}}</div>
              <div :class="['money', item.isOnline === 2 ? 'hui' : '']">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info">
              <div :class="['address', item.isOnline === 2 ? 'hui' : '']">{{item.city}}{{item.district}}</div>
              <div :class="['year', item.isOnline === 2 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.isOnline === 2 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="selectcur" v-if="item.isOnline === 1">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.cur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
            </div>
            <div class="selectcur" v-else>
              <div class="circel"></div>
            </div>
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
              <div class="text">
                <textarea :disabled="resonword" v-model="resonword" placeholder="请填写原因"></textarea>
              </div>
            </div>
          </div>
          <div style="padding-right:4px">
        <div class="selectposition" v-show="pop.type === 'applyrecord'">
            <div class="applytext">{{pop.recordtext}}</div>
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
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { recruiterDetail, createonlinepdf, createonlineword } from 'API/common'
import { getPositionTypeApi, openPositionApi } from 'API/position'
import { getSearchMyCollectApi, getSearchCollectApi, putCollectUserApi, cancelCollectUserApi } from 'API/collect'
import { getSearchBrowseMyselfApi, getMyNavDataApi, getJobHunterPositionTypeApi } from 'API/browse'
import { getResumeIdApi } from 'API/userJobhunter'
import { shareResumeApi } from 'API/forward'
import MapSearch from 'COMPONENTS/map'
import DynamicRecord from './dynamicrecord.vue'
import {
  topAdminPositonList,
  recruiterPositonList,
  sureOpenupAPi,
  watchInvitationAPi,
  getCommentReasonApi,
  getloadingReasonApi,
  getInterviewComment,
  improperMarkingApi,
  confirmInterviewApi,
  addressListApi, interviewRetract, addCompanyAdressApi, editCompanyAdressApi, setInterviewInfoApi, emailtoforword, manyrecordstatus } from 'API/candidateType'

import { applyInterviewApi } from 'API/interview'

  @Component({
    name: 'candidate',
    methods: {
    },
    computed: {},
    destroyed () {
      document.body.style.overflow = 'unset'
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
          document.body.style.overflow = 'unset'
          this.hasonload = false
        }
      }
    },
    components: {
      MapSearch,
      DynamicRecord
    }
  })
export default class CourseList extends Vue {
    userInfo = {}
    showResume = false
    hasonload = false
    toworddiggle = false
    tishishow = false
    loadingshow = false
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
      recruiter: 5,
      status: '1,2', // 状态
      is_online: 1,
      type: ''
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
      dateLists: [],
      showConfirmBtn: true,
      showMap: false,
      position: {
        positionName: '',
        positionId: ''
      },
      address: {
        addressName: '',
        addressId: ''
      },
      item: {}
    }

    navBarFixed = false // nav是否置顶
    statusTotal = {} //
    uid = null
    showuid = null
    showindex = null
    shareSelectItem = {
      qrCodeUrl: ''
    } // 分享选中
    picStyle = {
      x: '',
      y: ''
    }

    navType = 'searchBrowseMyself'
    loading = false // 翻页
    candidateList = []
    searchMyCollect = []
    searchCollect = []
    searchBrowseMyselfList = []
    positionTypeList = [] // 职业标签列表
    isShowScreen = false
    selectedScreen = [] // 筛选选中条件
    sharePicIds = [] // 下载中的图片
    navNum = {} // nav 数量
    selectBlo = {}
    nowResumeMsg = {}
    shareResumeImg = '' // 简历二维码
    positionList = []
    changeJobId = ''
    changeResumeId = ''
    init () {
      this.form = Object.assign(this.form, this.$route.query || {})
      this.userInfo = this.$store.state.userInfo
      let query = this.$route.query
      if (query.navType) {
        switch (query.navType) {
          case 'searchMyCollect':
            this.getSearchMyCollect()
            this.getJobHunterPositionType()
            break
          case 'searchCollect':
            this.getSearchCollect()
            this.getPositionTypeList()
            break
          case 'searchBrowseMyself':
            this.getSearchBrowseMyself()
            this.getPositionTypeList()
            break
          default:
            this.getSearchBrowseMyself()
            this.getPositionTypeList()
            break
        }
        this.navType = query.navType
      } else {
        this.navType = 'searchBrowseMyself'
        this.getSearchBrowseMyself()
        this.getPositionTypeList()
      }
      this.getMyNavData()
    }

    jobInterview () {
      applyInterviewApi({
        jobhunterUid: this.changeResumeId,
        positionId: this.changeJobId
      }).then(res => {
        this.pop.isShow = false
      })
    }

    toAddJob () {
      this.$router.push({
        name: 'postJob',
        query: {
          type: 'add'
        }
      })
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
    setJob (uid, type, vo, statusid) {
      if (statusid === 1) {
        this.showResume = false
      } else {
        this.showResume = true
      }
      this.jobuid = uid
      this.interviewId = vo.interviewInfo.data.lastInterviewId
      switch (type) {
        case 'recruiter-chat':
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
            let datalist = { is_online: 1 }
            recruiterPositonList(datalist).then((res) => {
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
          let data = { interviewId: vo.interviewInfo.data.lastInterviewId }
          watchInvitationAPi(data).then((res) => {
            this.jobhunterInfo = res.data.data
          })
          break
        case 'confirm-interview':
          let status = { vkey: vo.resume ? vo.resume.vkey : vo.vkey, type: 'resume' }
          manyrecordstatus(status).then((res) => {
            if (res.data.data.data.length > 1) {
              this.pop = {
                isShow: true,
                Interview: true,
                InterviewTitle: '以下是候选人多条申请记录，请选择处理',
                recordtext: '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；',
                btntext: '确定',
                type: 'applyrecord'
              }
              let applylists = res.data.data.data
              applylists.map((v, k) => {
                if (v.positionId === 0) {
                  v.positionName = '直接与我约面'
                }
                v.hascur = false
                v.boxshow = false
              })
              this.applyrecordList = applylists
            } else {
              confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
                this.$message.success('约面成功')
                this.init()
              })
            }
          })
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
            } else {
              this.model.dateLists = []
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
              let datalist = { is_online: 1 }
              recruiterPositonList(datalist).then((res) => {
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
            this.getResume(this.jobuid)
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
          let status2 = { vkey: vo.resume ? vo.resume.vkey : vo.vkey, type: 'resume' }
          manyrecordstatus(status2).then((res) => {
            if (res.data.data.data.length > 1) {
              this.pop = {
                isShow: true,
                Interview: true,
                InterviewTitle: '以下是候选人多条申请记录，请选择处理',
                recordtext: '该候选人有多个未处理申请，您可以从中选择1个进行约面，或选择全部都处理为不合适',
                btntext: '确定',
                type: 'applyrecord'
              }
              let applylists = res.data.data.data.slice()
              applylists.push({ positionName: '都不合适' })
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
              // 大于61是结束后不满意
              if (res.data.data.interviewStatus === 58 || res.data.data.interviewStatus === 59) {
                getCommentReasonApi().then((res) => {
                  let arr = res.data.data
                  arr.map((v, k) => {
                    v.cur = false
                  })
                  this.reasonlist = arr
                })
              } else {
                getloadingReasonApi().then((res) => {
                  let arr = res.data.data
                  arr.map((v, k) => {
                    v.cur = false
                  })
                  this.reasonlist = arr
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

    setHint () {
      this.tishishow = true
      clearTimeout(this.hintSetTime)
      this.hintSetTime = setTimeout(() => {
        this.tishishow = false
      }, 1500)
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
            this.extra = ''
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
        let canclick = false
        this.applyrecordList.map((v, k) => {
          if (v.hascur) {
            arr.push(v)
            this.interviewId = v.interviewId
          }
          if (v.boxshow) {
            canclick = true
          }
        })
        if (this.pop.recordtext === '确认选择后，候选人多条申请将合并为一条面试记录；面试最终确认前，可随时沟通更新面试职位；') {
          if (!canclick) {
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
          console.log(err)
          // this.$message.error(err.data.msg)
        })
      }
      // 查看原因
      if (this.pop.type === 'watchreson') {
        if (this.showResume) {
          this.pop.Interview = false
        } else {
          this.pop.isShow = false
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
        v.boxshow = false
      })
      if (item.positionStatus === 0) {
        item.boxshow = true
      } else {
        item.boxshow = false
      }
      this.applyrecordList = applyrecordList
    }
    resetboxcur (item, index) {
      this.applyrecordList[index].boxshow = false
      this.applyrecordList[index].hascur = false
    }
    sureyuemian (data) {
      openPositionApi({ id: data.positionId })
        .then(() => {
          confirmInterviewApi({ interviewId: data.interviewId }).then((res) => {
            this.$message.success('约面成功')
            this.pop = {
              isShow: false
            }
            this.init()
          })
        })
        .catch(e => {
          this.$message.error(e.data.msg)
        })
    }
    // 选择不合适原因
    togglereson (data) {
      data.cur = !data.cur
    }
    hasadmin () {
      recruiterDetail().then((res) => {
        this.info = res.data.data
      })
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
    // 获取简历二维码
    getShareResume (resumeId) {
      shareResumeApi({ resumeUid: resumeId, forwardType: 1 }).then(res => {
        this.shareResumeImg = res.data.data.positionQrCodeUrl
      })
    }
    /* 查看简历附件 */
    seereResume () {
      this.seeFiles(this.showindex, this.showuid)
    }

    seeFiles (fileObJ, uid) {
      let File = fileObJ.resumeAttach

      if (File === null) {
        this.$message.error('此人未上传简历附件')
      } else {
        let uid = fileObJ.uid
        let type = File.extension
        this.operating(uid, { action: '查看', desc: '简历附件' })
        this.$nextTick(() => {
          if (/(png|jpg)/.test(type)) {
            window.open(File.url)
          } else if (/(pdf)/.test(type)) {
            window.open(File.url)
          } else if (/(doc|docx)/.test(type)) {
            window.open(
              `https://view.officeapps.live.com/op/view.aspx?src=${File.url}`
            )
          } else {
            this.$message({
              message: '格式不支持',
              type: 'warning'
            })
          }
        })
      }
    }

    // 获取简历
    getResume (resumeId, index) {
      getResumeIdApi({ uid: resumeId }).then(res => {
        this.nowResumeMsg = res.data.data
        this.showuid = res.data.data.uid
        this.showindex = res.data.data
        this.pop = {
          isShow: true
        }
        this.showResume = true
        this.getShareResume(resumeId)
      })
    }
    sharediggle () {
      this.toworddiggle = true
    }

    // 获取另外的选择
    getOtherActive () {
      let otherActive = this.positionTypeList.length > 0 ? this.positionTypeList[this.positionTypeList.length - 1].active : false
      return otherActive
    }

    handleCurrentPageChange (page) {
      this.form.page = page
      this.setPathQuery(this.form)
    }

    setPath (res) {
      this.form.page = 1
      this.setPathQuery(res)
    }

    getPopName () {
      return this.navType === 'searchBrowseMyself' ? '看过我的职位类型' : this.navType === 'searchCollect' ? '简历职位类型' : '感兴趣职位类型'
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

    changeNav (type) {
      let type2 = this.navType
      if (type2 === type) {
        return
      }
      this.form.page = 1
      this.setPathQuery(this.form)
      if (type === 'searchMyCollect') {
        this.getJobHunterPositionType()
      } else {
        this.getPositionTypeList()
      }
      this.navType = type
      // this.toTop()
      this.setDefaultScreen()
      this.setPath({ navType: type })
      // this.getList()
      this.isShowScreen = false
    }

    getMyNavData () {
      getMyNavDataApi().then(res => {
        this.navNum = res.data.data
      })
    }

    getList (type, page = 1) {
      let status = type || this.navType
      if (type) this.navType = type

      switch (status) {
        case 'searchMyCollect':
          this.getSearchMyCollect(page)
          break
        case 'searchCollect':
          this.getSearchCollect(page)
          break
        case 'searchBrowseMyself':
          this.getSearchBrowseMyself(page)
          break
        default:
          break
      }
    }
    // 查询我感兴趣的
    getSearchMyCollect () {
      let otherActive = this.getOtherActive()
      let data = {
        category: this.selectedScreen.length > 0 || otherActive ? 1 : 0,
        type: otherActive ? '0' : this.selectedScreen.join(),
        index: this.positionTypeList.length > 0 && otherActive ? 1 : 0,
        page: this.form.page,
        count: this.form.count
      }
      getSearchMyCollectApi(data).then(res => {
        let msg = res.data
        this.candidateList = msg.data
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.navNum.myCollectCount = res.data.meta.total
      }).catch(e => {
        this.candidateList = []
      })
    }
    // 对我感兴趣的
    getSearchCollect () {
      let otherActive = this.getOtherActive()
      let data = {
        category: this.selectedScreen.length > 0 || otherActive ? 1 : 0,
        type: this.selectedScreen.join(),
        index: this.positionTypeList.length > 0 && otherActive ? 1 : 0,
        page: this.form.page,
        count: this.form.count
      }
      getSearchCollectApi(data).then(res => {
        let msg = res.data
        this.candidateList = msg.data
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.navNum.collectMyselfCount = res.data.meta.total
      }).catch(e => {
        this.candidateList = []
      })
    }
    // 浏览过我的求职者
    getSearchBrowseMyself () {
      let otherActive = this.positionTypeList.length > 0 ? this.positionTypeList[this.positionTypeList.length - 1].active : false
      let data = {
        category: this.selectedScreen.length > 0 || otherActive ? 1 : 0,
        type: this.selectedScreen.join(),
        index: this.positionTypeList.length > 0 && otherActive ? 1 : 0,
        page: this.form.page,
        count: this.form.count
      }
      getSearchBrowseMyselfApi(data).then(res => {
        let msg = res.data
        this.candidateList = msg.data
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.navNum.browseMyselfCount = res.data.meta.total
      }).catch(e => {
        this.candidateList = []
      })
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
        data.push({
          name: '我的主页',
          labelId: 'index',
          active: false
        })
        this.positionTypeList = data
      })
    }

    // 看过我的职业类型列表
    getJobHunterPositionType () {
      getJobHunterPositionTypeApi().then(res => {
        let data = res.data.data
        data.map(item => {
          item.active = false
        })
        data.unshift({
          name: '全部',
          labelId: 'all',
          active: true
        })
        data.push({
          name: '暂无工作经验',
          labelId: 'index',
          active: false
        })
        this.positionTypeList = data
      })
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
          this.selectedScreen.splice(this.selectedScreen.indexOf(data.labelId), 1)
        }
        this.positionTypeList[0].active = false
        this.positionTypeList[this.positionTypeList.length - 1].active = false
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

    handleSearch () {
      this.form.page = 1
      this.setPathQuery(this.form)
    }
    created () {
      this.hasadmin()
    }
    cancelmessage () {
      this.toworddiggle = !this.toworddiggle
      this.pop.isShow = true
    }
    sendford (data) {
      emailtoforword(data).then((res) => {
        this.init()
        this.pop.isShow = false
        this.toworddiggle = false
        this.$message({
          type: 'success',
          message: '转发成功成功!'
        })
      })
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
</style>
