<template>
  <div class="interviewrecords">
        <div id="box" class="main_cont">
          <div class="screen">
        <div class="title">面试日程</div>
        <div class="select" v-if="tablist.length > 0 && tablist[0].cur">
          <el-select
            v-model="form.position_label_id"
            placeholder="职位类别"
            @change="type"
          >
            <el-option
              v-for="item in mgoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          </div>
          <div class="time" v-if="tablist.length > 0 && tablist[0].cur">
          <el-date-picker
          v-model="time"
          @change="pickchange()"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        </div>
        <div class="tab">
            <div :class="['tabitem', item.cur ? 'active' : '']" :key="i" v-for="(item, i) in tablist" @click="tabclick(item, i)">
              {{item.date}}
              <el-badge is-dot v-if="item.number" :hidden="item.number === 0"></el-badge>
            </div>
          </div>
          </div>
          <div v-loading="getLoading">
        <div class="candidate_blo" :key="j" v-for="(vo, j) in list" @click="getResume(vo.jobhunterUid, j, vo.interviewId)">
          <div class="bloTop">
            <div class="timer1">面试职位</div>
            <div class="timer2" v-if="vo.positionId !== 0">【{{vo.address.city}}{{vo.address.area}}&nbsp;|&nbsp;{{vo.positionName}}&nbsp;|&nbsp;{{vo.positionEmolumentMin}}k-{{vo.positionEmolumentMax}}K】</div>
            <div class="timer2" v-else>暂无面试职位</div>
            <div class="timer3" v-if="vo.channelName">候选人来自</div>
            <div class="timer4" v-if="vo.channelName">{{vo.origin}}</div>

            <div class="topText topText2">
          </div>
          <div :class="['countdown', vo.status >= 51 ? 'bg' : '']">
            <i class="iconfont icon-shijian time" v-if="vo.status >= 51"></i>
            <i class="iconfont icon-shijian time2" v-else></i>
            <span v-if="tablist[0].cur">
              {{(vo.arrangementInfo.appointmentTime)*1000 | date('YYYY-MM-DD HH:mm') }}
              </span>
            <span v-else>{{vo.arrangementInfo.appointment.substring(11, 16)}}</span>
          </div>
            <el-badge is-dot :hidden="vo.redDot === 0">
            </el-badge>
          </div>
          <div class="bloCont">
            <div class="cont_left">
              <div class="leftMsg">
                <div class="userBaseInfo">
                  <img class="gender" src="~IMAGES/girl.png" v-if="vo.resume.gender===2" />
                    <img class="gender" src="~IMAGES/boy.png" v-else />
                  <div class="avatar">
                    <img :src="vo.avatar.url" alt="">
                  </div>
                  <div class="infoRight">
                    <div class="infoName textEllipsis">
                      <div>{{vo.jobhunterRealname}}</div>
                    </div>
                    <ul class="userLabel">
                      <li class="" v-if="vo.resume.workAgeDesc">{{vo.resume.workAgeDesc}}</li>
                      <li class="" v-if="vo.resume.age">{{vo.resume.age}}岁</li>
                      <li class="" v-else>暂无年龄</li>
                      <li class="" v-if="vo.resume.degreeDesc">{{vo.resume.degreeDesc}}</li>
                      <li class="" v-else>暂无学历</li>
                    </ul>
                  </div>
                </div>
              <div class="intention" v-if="vo.resume.expect">求职意向：<span class="intentionText intentionTextWidth textEllipsis"> {{vo.resume.expect.city}} </span>&nbsp;·&nbsp;
                  <span class="intentionText intentionTextWidth2 textEllipsis" style="color:#333">{{vo.resume.expect.position}}</span>&nbsp;·&nbsp;
                  <span class="intentionText2">{{vo.resume.expect.salaryFloor}}k~{{vo.resume.expect.salaryCeil}}k</span>
                </div>
                <div class="intention" v-else>求职意向：暂无求职意向</div>
              </div>
              <div class="bloExperience workExperience">
                <div class="experienceTitle ">最近工作经历</div>
                <div class="experienceText textEllipsis" v-if="vo.lastCompanyName">{{vo.lastCompanyName}}</div>
                <div class="experienceText textEllipsis" v-if="vo.lastPosition">{{vo.lastPosition}}</div>
                <div class="experienceText textEllipsis" v-if="!vo.lastCompanyName">暂无工作经历</div>
              </div>
              <div class="bloExperience educationExperience">
                <div class="experienceTitle">最近教育经历</div>
                <div class="experienceText textEllipsis" v-if="vo.resume.education.school">{{vo.resume.education.school}}</div>
                <div class="experienceText textEllipsis" v-else>暂无教育经历</div>

                <div class="experienceText textEllipsis" v-if="vo.resume.education.major">{{vo.resume.education.major}}</div>
              </div>
            </div>

            <div class="userOp">
              <div class="btn" @click.stop="setJob(vo.jobhunterUid, 'check-invitation', vo, 1)">
                <span :style="'padding-right:15px;'" @click.stop="setJob(vo.jobhunterUid, 'check-invitation', vo, 1)" v-show="vo.status === 51 || vo.status === 57 || vo.status === 58">去评价</span>
                <span :style="'color: #92929B;padding-right:15px;'" @click.stop="" v-show="vo.status === 60 || vo.status === 61">已评价</span>
                查看面试详情
                </div>
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

        <div class="null-product" v-show="!getLoading && list.length === 0">
          <div class="null-img">
            <img src="@/assets/images/fly.png" />
          </div>
          <div class="null-text">与其等待，不如主动出击~分享职位约面更多候选人吧</div>
          <el-button class="null-produc-bnt" @click="$router.push('/recruiterIndex')">分享职位</el-button>
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
      <div class="noJobBox" v-if="pop.Interview">
        <div class="close"><i @click="cancelshow()" class="iconfont icon-danchuang-guanbi"></i></div>
         <div class="content-info">
          <div class="title">{{pop.InterviewTitle}}</div>
          <div class="applytext" v-show="pop.type === 'applyrecord'">{{pop.recordtext}}</div>
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
              <div class="phone" v-if="jobhunterInfo.arrangementInfo.mobile">{{jobhunterInfo.arrangementInfo.mobile}}</div>
            </div>
            <div class="item" v-if="jobhunterInfo.positionName">
              <div class="icon">
                <i class="iconfont icon-zhiwei1"></i>
              </div>
              <div class="text">{{jobhunterInfo.positionName}}</div>
            </div>
            <div class="item" v-if="jobhunterInfo.address">
              <div class="icon">
                <i class="iconfont icon-didian"></i>
              </div>
              <div class="text">{{jobhunterInfo.address}}{{jobhunterInfo.doorplate}}</div>
            </div>

            <div class="item" v-show="jobhunterInfo.status >= 51">
              <div class="icon">
                <i class="iconfont icon-shijian"></i>
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
                  <p class="p2">挥别错的才能和对的相逢~</p>
                </div>
              </div>
              </div>
          </div>

          <div class="intertime" v-show="pop.type === 'setinterinfo'">
          <div class="intertime_title">约面时间</div>
          <div>
            <ul class="time_list" v-if="model.dateLists.length">
            <li class="time_row" v-for="(item, index) in model.dateLists" :key="index">
              <i class="el-icon-remove" @click="deleteTime(index)"></i>
              {{item.appointment}}
            </li>
          </ul>
          </div>
          <div class="add_time" v-if="model.dateLists.length < 3">
          <i class="iconfont icon-tianjiashijian bgcolor" style="font-size:12px"></i>
          <span :style="'margin-left:16px;line-height:14px'">添加时间</span>
          <el-date-picker
            v-model="form.date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
          </div>
        </div>
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

          <div class="selectposition" v-show="pop.type === 'applyrecord'">
          <div class="selectitem" v-for="(item, i) in applyrecordList" :key="i" @click="selectapply(item, i)">
            <div class="position">
              <div class="close" v-show="item.isOnline === 2">关闭</div>
              <div :class="['name', item.isOnline === 2 ? 'hui' : '']">{{item.positionName}}</div>
              <div class="money" v-show="item.positionId !== 0 && item.positionName !== '都不合适我'">{{item.emolumentMin}}K~{{item.emolumentMax}}K</div>
            </div>
            <div class="info" v-if="item.positionName !== '都不合适我'">
              <div :class="['address', item.isOnline === 2 ? 'hui' : '']">{{item.city}}{{item.district}}</div>
              <div :class="['year', item.isOnline === 2 ? 'hui' : '']">{{item.workExperienceName}}</div>
              <div :class="['benke', item.isOnline === 2 ? 'hui' : '']">{{item.educationName}}</div>
            </div>
            <div class="info" v-else>选择此项，以上申请记录将全部合并处理为不合适</div>
            <div class="selectcur">
              <i :class="['iconfont icon-chenggong position bg']" v-if="item.hascur"></i>
                <i :class="['iconfont icon-beixuanxiang position']" v-else></i>
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
import { getScheduletodayListtApi, getguanListtApi, getnewHistoryListtApi, getDetailApi, getScheduleListApi } from 'API/schedule'
import { getCommentReasonApi, interviewRetract, getInterviewComment, addressListApi, watchInvitationAPi, setAttendApi, improperMarkingApi, sureOpenupAPi, setCommentApi, recruiterPositonList, confirmInterviewApi, addCompanyAdressApi, editCompanyAdressApi, setInterviewInfoApi, emailtoforword } from 'API/candidateType'
import { getResumeIdApi } from 'API/userJobhunter'
import { shareResumeApi } from 'API/forward'
import { getdeleteInterviewTabRedDotApi,
  deleteScheduleTabRedDotApi
} from '@/api/candidate'
import { putCollectUserApi, cancelCollectUserApi } from 'API/collect'
import { createonlinepdf, createonlineword } from 'API/common'
import MapSearch from 'COMPONENTS/map'
import moment from 'moment'
import DynamicRecord from '../candidateType/dynamicrecord.vue'
export default {
  components: {
    MapSearch,
    DynamicRecord
  },
  watch: {
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
  computed: {
    ...mapGetters([
      'recruiterIsAdmin',
      'recruitDataCompanyId'
    ])
  },
  data () {
    return {
      mgoptions: [],
      pop: {
        isShow: false,
        Interview: false,
        type: 'clickPic',
        InterviewTitle: '面试信息'
      },
      getLoading: false,
      typeCaching: {},
      loadingshow: false,
      toworddiggle: false,
      nowResumeMsg: {},
      hasonload: false,
      showResume: false,
      arrangeobj: '',
      arrangementInfo: {
        interviewId: '',
        realname: '',
        mobile: '',
        positionId: '',
        addressId: '',
        addressName: '',
        interviewTime: ''
      },
      hasfrom: false,
      hascback: false,
      resonword: '',
      shareResumeImg: '', // 简历二维码
      form: {
        position_label_id: '',
        start: '',
        end: '',
        page: 1,
        count: 20
      },
      time: ['', ''],
      info: '',
      extra: '',
      positionLists: [],
      watchresonlist: [],
      positionOption: [],
      applyrecordList: [],
      interviewId: '',
      reasonlist: [],
      tabform: {
        position_label_id: '',
        page: 1,
        count: 20,
        time: ''
      },
      addressobj: {
        doorplate: '',
        address: ''
      },
      model: {
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
      },
      list: [],
      selectBlo: {},
      jobhunterInfo: '',
      count: '10:35',
      positionManage: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '昨天',
            onClick: picker => {
              let start_time = new Date()
              let end_time = new Date()
              start_time.setTime(start_time.getTime() - 24 * 60 * 60 * 1000)
              end_time.setTime(end_time.getTime() - 2 * 24 * 60 * 60 * 1000)
              this.time = [end_time, start_time]
              picker.$emit('pick', this.time)
            }
          },
          {
            text: '过去七天',
            onClick: picker => {
              let start_time = new Date()
              let end_time = new Date()
              start_time.setTime(start_time.getTime() - 24 * 60 * 60 * 1000)
              end_time.setTime(end_time.getTime() - 7 * 24 * 60 * 60 * 1000)
              this.time = [end_time, start_time]
              picker.$emit('pick', this.time)
            }
          },
          {
            text: '过去30天',
            onClick: picker => {
              let start_time = new Date()
              let end_time = new Date()
              start_time.setTime(start_time.getTime() - 24 * 60 * 60 * 1000)
              end_time.setTime(end_time.getTime() - 30 * 24 * 60 * 60 * 1000)
              this.time = [end_time, start_time]
              picker.$emit('pick', this.time)
            }
          }
        ]
      },
      value2: '',
      tablist: []
    }
  },
  methods: {
    ManageList () {
      let data = { level: 3 }
      getguanListtApi(data).then(res => {
        let arr = res.data.data
        arr.unshift({ name: '全部', id: '' })
        arr.push({ name: '无职位约面', id: 0 })
        this.mgoptions = arr
      })
    },
    // 今天和明天列表
    getScheduleList () {
      this.getLoading = true
      getScheduletodayListtApi().then((res) => {
        let arr = res.data.data
        arr.unshift({ date: '全部' })
        arr.map((v, k) => {
          v.cur = false
        })
        if (arr.length >= 2) {
          arr[1].cur = true
        } else {
          arr[0].cur = true
        }
        this.tablist = arr
        if (arr[1] && arr[1].time) {
          this.tabform.time = arr[1].time
          this.gettablist()
        } else {
          this.getlist()
        }
        if (this.tablist.length > 1) {
          deleteScheduleTabRedDotApi(this.tablist[1].time)
        }
      })
    },
    getlist () {
      this.getLoading = true
      if (this.form.position_label_id === '') {
        this.form.position_label_id = undefined
      }
      getnewHistoryListtApi(this.form).then((res) => {
        this.list = res.data.data
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.getLoading = false
      }).catch(e => {
        this.getLoading = false
      })
    },
    handleCurrentPageChange (page) {
      if (this.tablist[0].time) {
        this.tabform.page = page
      } else {
        this.form.page = page
      }
      this.getlist()
    },
    type (e) {
      this.form.position_label_id = e
      this.tabform.position_label_id = e
      if (e === '') {
        this.form.position_label_id = undefined
        this.tabform.position_label_id = undefined
      }
      if (this.tablist[0].time) {
        this.tabform.page = 1
      } else {
        this.form.page = 1
      }
      this.setPathQuery(this.form)
      this.getlist()
    },
    // 点击返回的今天明天获取其他时间
    tabclick (data, i) {
      if (data.time === '') return
      if (data.time !== this.typeCaching.time && data.number > 0) { // 没有新数据就不请求接口， 减少后端并发量
        deleteScheduleTabRedDotApi(data.time).then(res => { // 请求消除当前定位的红点，实际样式并未改变，当离开此按钮才会删除红点
        })
      }
      if (this.typeCaching && this.typeCaching.time && this.typeCaching.number > 0) {
        this.typeCaching.number = 0
        this.$store.dispatch('redDotfun')
      }
      this.typeCaching = data
      this.tabform.time = data.time
      this.form.start = data.time
      this.form.end = data.time
      this.time = ''
      this.tablist.map((v, k) => {
        v.cur = data === v
      })
      if (data.time) {
        this.tabform.page = 1
        this.gettablist()
      } else {
        this.form.page = 1
        this.getlist()
      }
      this.setPathQuery(this.form)
    },
    gettablist () {
      this.getLoading = true
      if (this.tabform.position_label_id === '') {
        this.tabform.position_label_id = undefined
      }
      getScheduleListApi(this.tabform).then((res) => {
        this.list = res.data.data
        this.form.total = res.data.meta.total
        this.form.totalPage = res.data.meta.lastPage
        this.getLoading = false
      }).catch(e => {
        this.getLoading = false
      })
    },
    pickchange () {
      if (this.time) {
        this.form.start = Date.parse(this.time[0]) / 1000
        this.form.end = Date.parse(this.time[1]) / 1000
      } else {
        this.form.start = undefined
        this.form.end = undefined
      }
      this.tablist.map((v, k) => {
        v.cur = false
      })
      this.tablist[0].cur = true
      this.setPathQuery(this.form)
      this.getlist()
    },
    setJob (uid, type, vo, statusid) {
      if (statusid === 1) {
        this.showResume = false
      } else {
        this.showResume = true
      }
      this.jobuid = uid
      if (vo.interviewId) {
        this.interviewId = vo.interviewId
      } else {
        this.interviewId = vo.interviewInfo.data.lastInterviewId
      }
      switch (type) {
        case 'recruiter-chat':
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
          if (vo.redDot > 0) { // 没有红点则不去请求接口，减少并发
            getdeleteInterviewTabRedDotApi(this.interviewId).then(res => {
              this.$store.dispatch('redDotfun')
              if (this.$route.query.start) {
                this.gettablist()
              } else {
                this.getlist()
              }
            })
          }
          break
        case 'confirm-interview':
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
              v.boxshow = false
            })
            this.applyrecordList = applylists
          } else {
            confirmInterviewApi({ interviewId: this.interviewId }).then((res) => {
              this.$message.success('约面成功')
              this.getScheduleList()
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
            this.arrangeobj = res.data.data
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
              if (this.arrangeobj.positionStatus === 0 && this.arrangeobj.positionId !== 0) {
                hasOnline.push({ id: this.arrangeobj.positionId, positionName: this.arrangeobj.positionName })
              }
              this.positionOption = hasOnline
            })
            // this.arrangementInfo.interviewTime = res.data.data.createdAtTime
          })
          break
        case 'interview-retract':
          let retract = { jobhunterUid: this.jobuid, interviewId: this.interviewId }
          interviewRetract(retract).then((res) => {
            this.$message.success('撤回成功')
            this.getScheduleList()
            this.pop.isShow = false
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
          break
        case 'cancel':
          break
        default:
          break
      }
    },
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
      })
    },
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
    },
    // 选择申请记录
    selectapply (item, index) {
      let applyrecordList = this.applyrecordList.slice()
      applyrecordList.map((v, k) => {
        v.hascur = k === index
      })
      this.applyrecordList = applyrecordList
    },
    // 选择不合适原因
    togglereson (data) {
      data.cur = !data.cur
    },
    cancelshow () {
      if (this.showResume) {
        this.pop.Interview = false
      } else {
        this.pop.isShow = false
      }
    },
    toAddJob () {
      this.$router.push({
        name: 'recruiterIndex'
      })
    },
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
    },
    // 点击取消
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
        console.log(this.showResume)
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
    },
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
            this.getScheduleList()
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
            this.getScheduleList()
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
              this.getScheduleList()
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
                this.getScheduleList()
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
          this.getScheduleList()
          this.pop.isShow = false
        }).catch(err => {
          this.$message.error(err.data.msg)
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
    },
    // 获取简历
    getResume (resumeId, index, interview_id) {
      getResumeIdApi({ uid: resumeId }).then(res => {
        this.nowResumeMsg = res.data.data
        this.showuid = res.data.data.uid
        this.showindex = res.data.data
        this.pop = {
          isShow: true,
          type: 'resume'
        }
        this.showResume = true
        this.getShareResume(resumeId)
        getdeleteInterviewTabRedDotApi(interview_id).then(res => {
          this.$store.dispatch('redDotfun')
          // this.gettablist()
        })
      })
    },
    // 获取简历二维码
    getShareResume (resumeId) {
      shareResumeApi({ resumeUid: resumeId, forwardType: 1 }).then(res => {
        this.shareResumeImg = res.data.data.positionQrCodeUrl
      })
    },
    // 点击其他区域关闭弹窗
    closeMsg (event) {
      if (event.target.className === 'pop') {
        this.pop.isShow = false
      }
    },
    closeload (e) {
      if ((!this.$refs.queryBox.contains(e.target)) && event.target.className !== 'iconfont icon-xiazai') {
        this.hasonload = false
      }
    },
    toggleaddress (data) {
      console.log(data)
      this.addresslist.map((v, k) => {
        v.cur = data === v
      })
    },
    sharediggle () {
      this.toworddiggle = true
    },
    cancelmessage () {
      this.toworddiggle = !this.toworddiggle
      this.pop.isShow = true
    },
    sendford (data) {
      emailtoforword(data).then((res) => {
        this.getScheduleList()
        this.pop.isShow = false
        this.toworddiggle = false
        this.$message({
          type: 'success',
          message: '转发成功!'
        })
      })
    },
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
    },
    addaddress () {
      this.pop.type = 'addaddress'
    },
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
    },
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
    },
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
    },
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
    },
    // 选择地址列表
    selectaddredd () {
      let data = { page: 1, count: 20, company_id: this.recruitDataCompanyId }
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
    },
    // 点击感觉不错
    haslike () {
      setCommentApi({ interviewId: this.jobhunterInfo.interviewId }).then((res) => {
        this.viewdetail(this.jobhunterInfo)
        this.getScheduleList()
      })
    },
    getTime (e) {
      this.model.dateLists.push({
        appointment: e,
        active: false,
        appointmentTime: Date.parse(new Date(e)) / 1000
      })
    },
    deleteTime (index) {
      this.model.dateLists.splice(index, 1)
    },
    // 点击不合适
    selereson () {
      getCommentReasonApi().then((res) => {
        let arr = res.data.data
        arr.map((v, k) => {
          v.cur = false
        })
        this.reasonlist = arr
        this.pop = {
          isShow: true,
          Interview: true,
          InterviewTitle: '选择不合适原因',
          btntext: '保存',
          type: 'inappropriate'
        }
      })
    },
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
  },
  destroyed () {
    document.body.style.overflow = 'auto'
    this.$store.dispatch('redDotfun')
  },
  mounted () {
    this.ManageList()
    this.getScheduleList()
    if (this.$route.query.start) {
      this.time[0] = moment((this.$route.query.start) * 1000).format('YYYY-MM-DD')
      this.form.start = this.$route.query.start
    }
    if (this.$route.query.end) {
      this.time[1] = moment((this.$route.query.end) * 1000).format('YYYY-MM-DD')
      this.form.end = this.$route.query.end
    }
    if (this.$route.query.position_label_id) {
      this.form.position_label_id = Number(this.$route.query.position_label_id)
      this.tabform.position_label_id = Number(this.$route.query.position_label_id)
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
.interviewrecords{
  .screen{
    margin-top: 32px;
    width: 100%;
    position: relative;
    height: 155px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 16px;
    .title{
      color:#333333;
      font-size: 24px;
      margin-top: 39px;
      font-weight: bold;
      float: left;
      padding-left: 32px;
    }
    .time{
      float: right;
      margin-top: 36px;
    }
    .mar{
      margin-right: 20px;
    }
    .select{
      float: right;
      margin-top: 36px;
      margin-left: 12px;
      margin-right: 32px;
    }
    .btn{
      float: left;
      margin-left: 25px;
    }
    .tab{
      width: 100%;
      height: 46px;
      position: absolute;
      bottom: 0;
    .tabitem{
      height: 46px;
      line-height: 46px;
      float: left;
      margin: 0 32px;
      color: #626262;
      text-align: center;
    }
    .active{
      color:#00C4CD;
      font-size: 16px;
      line-height: 46px;
      font-weight: bold;
      height: 46px;
      border-bottom: 2px solid #00C4CD;
    }
  }
  }
  .main_cont {
    .candidate_blo {
      height: 196px;
      background: rgba(255,255,255,1);
      border-radius: 8px;
      border: 1px solid#DDE1E0;
      margin-bottom: 15px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover{
        box-shadow:0px 10px 20px 0px rgba(0,0,0,0.1);
      }
      .bloTop {
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #DDE1E0;
        padding: 0 32px 0 24px;
        font-size:12px;
        font-weight:400;
        color:#92929B;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        .timer1 {
          float: left;
          margin-right: 5px;
        }
        .timer2 {
          float: left;
          color:#333333;
          font-size:12px;
          font-weight: 400;
        }
        .timer3 {
          float: left;
          margin-left: 24px;
        }
        .timer4 {
          float: left;
          margin-left: 4px;
          padding: 0px 8px;
          height: 22px;
          line-height: 22px;
          background:rgba(239,233,244,1);
          border-radius:4px;
          margin-top: 14px;
          color:rgba(101,39,145,1);
          font-size: 12px;
        }
        .topText {
          float: left;
          margin-left: 8px;
        }
        .topText2 {
          color: #333333;
        }
        .countdown{
          float: right;
          height: 32px;
          padding: 0 24px;
          border-radius: 4px;
          margin-top: 7px;
          position: relative;
          z-index: 0;
          color:#03B3BB;
          background:#E5F9FA;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          .time{
            font-size: 15px;
            margin-right: 6px;
            color: #66666E;
          }
          .time2{
            font-size: 15px;
            margin-right: 6px;
          }
          span{
            font-weight: bold;
            font-size: 16px;
          }
        }
        .bg{
          background:#fff;
          font-size: 14px;
          color: #66666E;
          padding: 0;
        }
      }
      .bloCont {
        display: flex;
        flex-direction: row;
        height: 148px;
        .cont_left {
          display: flex;
          flex-direction: row;
          width: 80%;
          padding: 20px 0px 20px 32px;
          box-sizing: border-box;
          .leftMsg {
            height:72px;
            width: 380px;
            .userBaseInfo {
              position: relative;
              height:72px;
              .avatar{
                float: left;
                width:72px;
                margin-right: 16px;
                height:72px;
                border-radius: 50%;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .userIcon {
                width:72px;
                height:72px;
                display: block;
                float: left;
                margin-right: 16px;
                border-radius: 50%;
              }
              .gender {
                width:19px;
                height:19px;
                border-radius: 50%;
                position: absolute;
                left: 50px;
                bottom: 0;
              }
              .infoRight {
                height:72px;
                text-align: left;
                padding-top: 10px;
                .infoName {
                  font-size:20px;
                  font-weight:600;
                  color:#333333;
                  line-height:28px;
                  margin-bottom: 6px;
                }
                .userLabel {
                  height: 20px;
                  li {
                    display: inline-block;
                    height:20px;
                    line-height: 20px;
                    border-radius:2px;
                    padding: 0 6px;
                    box-sizing: border-box;
                    margin-right: 8px;
                    font-size:12px;
                    font-weight:400;
                    color:#66666E;
                    background:#F4F7F7;
                  }
                }
              }
            }
            .intention {
              height:20px;
              font-size:14px;
              font-weight:400;
              color: #66666E;;
              line-height:20px;
              text-align: left;
              margin-top: 12px;
              display: flex;
              .intentionTextWidth {
                max-width: 100px;
              }
              .intentionTextWidth2 {
                max-width: 125px;
              }
              .intentionText {
                color: #333333;
              }
              .intentionText {
                color: #333333;
              }
              .intentionText2 {
                color: #FF9E40;
              }
            }
          }
          .bloExperience {
            height: 88px;
            width: 285px;
            font-size:14px;
            font-weight:400;
            color:#92929B;
            line-height:22px;
            text-align: left;
            padding-top: 10px;
            position: relative;
            padding-left: 20px;
            padding-right: 20px;
            overflow: hidden;
            box-sizing: border-box;
            &::after {
              content: '';
              width: 1px;
              height: 100px;
              background: #E8E9EB;
              position: absolute;
              left: 0;
              top: 10px;
            }
            &.educationExperience {
              width: 225px;
            }
            .experienceTitle {
              margin-bottom: 8px;
            }
            .experienceText {
              color:#333333;
              margin-bottom: 8px;
            }
          }
        }

        .userOp {
          position: relative;
          flex: 1;
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          .like_user {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            color: #03B3BB;
            cursor: pointer;
            font-size: 14px;
            margin-right: 75px;
            img {
              margin-right: 7px;
              position: relative;
              top: -2px;
            }
          }
          .btn {
            position: absolute;
            right: 0;
            height:38px;
            line-height:38px;
            border-radius:30px;
            font-size:14px;
            font-weight:400;
            color: #03B3BB;
            padding-right: 32px;
            cursor: pointer;
          }
        }
      }
    }
  }
.view{
  width: 100%;
  .viewinfo{
    .title{
      padding-left: 40px;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .item{
      padding-left: 75px;
      height: 20px;
      margin-bottom:20px;
      .name{
        float: left;
        width: 80px;
        text-align: right;
        color: #b7b7b7;
      }
      .text{
        float: left;
        margin-left: 20px;
        color:#6b6767;
        width: 207px;
      }
    }
  }
  .viewresult{
    .title{
      padding-left: 40px;
      font-weight: bold;
      font-size: 16px;
    }
    .icon{
      width: 180px;
      height: 66px;
      margin-left: 100px;
      .box{
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .desc{
      text-align: center;
      width: 180px;
      margin-left: 100px;
      font-size: 16px;
    }
    .Contacts{
      text-align: center;
      width: 180px;
      color: #dedada;
      font-size: 12px;
      padding-top: 10px;
      margin-left: 100px;
    }
  }
  }
}

      .null-product{
        height: 520px;
        margin: 0 auto;
        padding-top: 120px;
        background: #fff;
        .null-img{
          width:170px;
          height:120px;
          margin: 0 auto;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .null-text{
          color:#92929B;
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
          margin-bottom: 25px;
        }
        .null-produc-bnt{
          display: block;
          margin: 0 auto;
          border: 0;
          background: $bg-color-4;
          color: #ffffff;
          width: 134px;
          height: 40px;
        }
        .null-btn{
          width:163px;
          height:40px;
          border-radius:20px;
          display: flex;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          text-align: center;
          color:rgba(101,39,145,1);
          line-height: 40px;
          border:1px solid rgba(101,39,145,1);
        }
      }

    .pop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background:rgba(0,0,0,0.6);
    .xcxPicBox {
      width:600px;
      height:490px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 20px 0px rgba(228,232,235,1);
      border-radius:4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .clo {
        width:16px;
        height:16px;
        position: absolute;
        right: 24px;
        top: 24px;
        cursor: pointer;
      }
      .main_tit {
        font-size:22px;
        font-weight:500;
        color:#333333;
        line-height:26px;
      }
      .xcx_main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .xcx_icon {
          width:220px;
          height:220px;
          border-radius: 50%;
          box-sizing: border-box;
          padding: 5px;
          border: 1px solid #EFE9F4;
          margin: 33px 0;
        }

        .xcx_load {
          width:38px;
          height:38px;
          margin: 33px 0;
        }
        p {
          font-size:16px;
          color: #626262;
          line-height:22px;
        }
      }
    }

    .resumeBox {
      background: #fff;
      width: 940px;
      height: calc(100vh - 60px);
      position: absolute;
      left: 50%;
      top: 60px;
      transform: translate(-50%, 0%);
      .Numbering {
        padding: 28px 20px 30px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        span {
          color: #92929B;;
          font-size: 14px;
        }
      }
      .resumeLyout {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100%;
        .Code {
          width: 198px;
          display: inline-block;
          .msgCode {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 67px;
            img {
              width: 130px;
              height: 130px;
              border-radius: 50%;
            }
            span {
              font-size: 12px;
              color: #42334d;
              width: 72px;
              height: 26px;
              border-radius: 2px;
              background: rgba(237, 237, 237, 1);
              line-height: 26px;
              position: relative;
              text-align: center;
              margin-top: 6px;
              &:before {
                content: "";
                position: absolute;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #ededed;
                left: 31px;
                top: -6px;
              }
            }
          }
          .handlerpring{
            display: flex;
            justify-content: center;
            font-size:18px;
            margin-bottom: 20px;
            position: relative;
            .onload{
              width:18px;
              height:18px;
              margin: 0 16px 0px 35px;
              position: relative;
              cursor: pointer;
              &::after{
                content: '';
                position: absolute;
                background: #E8E9EB;
                width: 1px;
                height: 16px;
                right: -16px;
              }
            }
            .onloadselect{
              width:221px;
              height:199px;
              background:rgba(255,255,255,1);
              position: absolute;
              top: 26px;
              left: -137px;
              border-radius: 4px;
              z-index: 1;
              box-shadow:0px 0px 26px 0px rgba(22,39,77,0.12);
              .title{
                font-size: 14px;
                color: #333333;
                font-weight: bold;
                height:20px;
                line-height: 20px;
                padding-left: 20px;
                margin: 20px 0px 2px 0px;
              }
              .select{
                font-size: 12px;
                height: 18px;
                line-height: 18px;
                color: #6D696E;
                padding-left: 20px;
                margin-bottom: 12px;
              }
              .pdf{
                padding: 0 22px 0 20px;
                display: flex;
                margin-bottom: 20px;
                cursor: pointer;
                .p_l{
                  width:36px;
                  height:36px;
                  border-radius:4px;
                  i{
                    font-size: 36px;
                  }
                }
                .p_c{
                  font-size: 12px;
                  width: 112px;
                  color: #6D696E;
                  line-height: 42px;
                  margin-left: 6px;
                }
                .p_r{
                  width: 14px;
                  height: 14px;
                  margin-left: 11px;
                  margin-top: 11px;
                  i{
                    font-size: 14px;
                    color: #BCBEC0;;
                    vertical-align: super
                  }
                }
              }
            }
            .dayin{
              width:18px;
              height:18px;
              margin: 0 16px 0px 17px;
              position: relative;
              cursor: pointer;
              &::after{
                content: '';
                position: absolute;
                background: #E8E9EB;
                width: 1px;
                height: 16px;
                right: -17px;
              }
            }
            .share{
              width:18px;
              height:18px;
              margin: 0 35px 0px 16px;
              cursor: pointer;
            }
            i{
              font-size: 18px;
              color: #00C4CD;
            }
          }
          .btnstatus{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size:16px;
            .btn1{
              width:154px;
              height:42px;
              line-height: 42px;
              text-align: center;
              font-family:PingFangSC-Medium,PingFangSC;
              font-weight:500;
              color:rgba(255,255,255,1);
              background:#00C4CD;
              border-radius:4px;
              cursor: pointer;
              margin-bottom: 12px;
              &:hover{
                background: mix(#fff, #00C4CD, 20%);
                border-color: mix(#fff, #00C4CD, 20%);
                color: #fff;
              }
            }
            .btndisable{
              width:154px;
              height:42px;
              line-height: 42px;
              text-align: center;
              font-family:PingFangSC-Medium,PingFangSC;
              font-weight:500;
              border-radius:4px;
              cursor: pointer;
              margin-bottom: 12px;
              color: #fff;
              background: #ccc;
            }
            .btn2{
              width:152px;
              height:40px;
              line-height: 40px;
              font-weight:400;
              color:#92929B;
              text-align: center;
              border-radius:4px;
              margin-bottom: 12px;
              cursor: pointer;
              border:1px solid #BCBEC0;
            }
          }
          .like_user {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            color: $main-color-1;
            cursor: pointer;
            height: 42px;
            .img {
              margin-right: 7px;
            }
          }
          .TabSelect {
            margin-top: 20px;
            .tabList {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              margin-left: 23px;
              flex-direction: column;
              height: 184px;
              overflow-y: scroll;
              &::-webkit-scrollbar {
                display: none;
              }
              .tabItem {
                padding: 5px 10px;
                border: 1px solid #92929B;;
                border-radius: 4px;
                display: inline-block;
                margin-bottom: 8px;
                span {
                  font-size: 14px;
                  color: #000;
                }
                i {
                  margin-left: 5px;
                  cursor: pointer;
                }
              }
            }
            .addTab {
              text-align: left;
              margin-left: 23px;
              font-size: 14px;
              color: #2878ff;
              margin-bottom: 10px;
              font-weight: 700;
              cursor: pointer;
            }
          }
          .seefujian{
            margin-top: 83px;
            padding-left: 22px;
            .title{
              font-size: 14px;
              color: #333333;
              margin-bottom: 16px;;
              font-weight: bold;
            }
            a{
              width:152px;
              height:38px;
              border-radius:4px;
              font-size: 14px;
              line-height: 38px;
              display:block;
              color: #00C4CD;
              text-align: center;
              border:1px solid #00C4CD;
            }
          }
          .ContactInformation {
            margin-top: 52px;
            .contactTitle {
              text-align: left;
              margin-left: 23px;
              font-size: 14px;
              color: #42334d;
              margin-bottom: 18px;
              font-weight: 700;
            }
            .noUpload {
              text-align: center;
              font-size: 13px;
              color: #92929B;;
            }
            .Contact {
              margin-left: 23px;
              color: #66666E;;
              font-size: 14px;
              margin-bottom: 14px;
              i{
                color: #BCBEC0;;
                font-size: 14px;
                margin-right: 7px;
              }
            }
          }
          .download {
            margin-top: 30px;
            .noUpload {
              text-align: center;
              font-size: 13px;
              color: #92929B;;
            }
            .contactTitle {
              text-align: left;
              margin-left: 23px;
              font-size: 14px;
              font-weight: 700;
              color: #42334d;
              margin-bottom: 18px;
            }
            .Contact {
              width: 100px;
              height: 30px;
              border-radius: 4px;
              border: 1px solid rgba(101, 39, 145, 1);
              font-size: 14px;
              color: #00C4CD;
              line-height: 30px;
              margin: 0 auto;
              cursor: pointer;
              position: relative;
              text-align: center;
              span {
                color: rgba(101, 39, 145, 1);
                font-size: 14px;
              }
            }
          }
        }
        .ResumeDetails {
          width: 742px;
          height: 926px;
          border-right: 1px solid #ededed;
          overflow-y: auto;
          display: inline-block;
          padding-bottom: 48px;
          height: 100%;
          box-sizing: border-box;
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-track {
            background:#fff;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:20px;
          }
          &::-webkit-scrollbar-thumb {
            background:#DDE1E0;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:20px;
          }
          .base {
            padding-bottom: 20px;
            padding-left: 50px;
            .message {
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              width: 100%;
              .msgUrl {
                width: 88px;
                height: 88px;
                position: relative;
                .magimg {
                  width: 88px;
                  height: 88px;
                  border: 2px solid #EDF1F0;
                  border-radius: 50%;
                  vertical-align: middle;
                  box-sizing: border-box;
                }
                .gender2 {
                  width: 26px;
                  height: 26px;
                  border-radius: 50%;
                  position: absolute;
                  right: 0px;
                  bottom: -3px;
                  text-align: center;
                  .genderimg2{
                    width: 100%;
                    height: 100%;
                  }
                  i {
                    line-height: 26px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                  }
                }
                .gender {
                  width: 26px;
                  height: 26px;
                  border-radius: 50%;
                  position: absolute;
                  right: 0px;
                  bottom: -3px;
                  text-align: center;
                  .genderimg1{
                    width: 100%;
                    height: 100%;
                  }
                  i {
                    line-height: 26px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                  }
                }
              }

              .msgUserInfo {
                text-align: left;
                vertical-align: top;
                height: 100%;
                margin-left: 30px;
                flex: 1;
                padding-right: 28px;
            .basemsg {
                display: flex;
                align-items: baseline;
                .realName {
                  font-size: 22px;
                  font-weight: 700;
                  color: #42334d;
                  max-width: 153px;
                  white-space: nowrap;
                  margin-right: 24px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: inline-block;
                }
                .lebalList {
                  display: inline-block;
                  text-align: left;
                  .lebalItem {
                    display: inline-block;
                    margin-right: 24px;
                    height: 23px;
                    overflow: 19px;
                    &:nth-child(1) {
                      span {
                        font-weight: 400;
                      }
                    }
                    &:nth-child(2) {
                      span {
                        font-weight: 400;
                      }
                    }
                    &:nth-child(3) {
                      span {
                        font-weight: 400;
                      }
                    }
                    &:nth-child(4) {
                      height: 0px;
                      margin-right: 0px;
                    }
                    i {
                      margin-right: 7px;
                      color: #BCBEC0;;
                    }
                    span {
                      font-size: 14px;
                    }
                  }
                }
              }
              .basecenter{
                margin-top: 33px;
              }

              .status {
                padding: 3px 10px;
                background: #E5F9FA;
                color: #03B3BB;
                vertical-align: middle;
                box-sizing: border-box;
                font-size: 14px;
                line-height: 23px;
                height: 23px;
              }

                .nowWorking {
                  margin-top: 10px;
                  font-size: 15px;
                  color: #000;

                  span {
                    padding-left: 10px;
                    display: inline-block;
                  }
                }

                .education {
                  margin-top: 10px;
                  font-size: 15px;
                  color: #000;
                  span {
                    padding-left: 10px;
                    display: inline-block;
                  }
                }
              }
            }

            .description {
              margin-top: 14px;
              text-align: left;
              color: #92929B;;
              font-size: 13px;
              line-height: 21px;
              .msg {
                span {
                  font-size: 13px;
                  color: rgba(146, 146, 146, 1);
                }
                i {
                  font-weight: 600;
                  font-size: 15px;
                  color: #000;
                }
              }

              .iconList {
                margin-top: 12px;
                display: flex;
                justify-items: flex-start;
                align-items: flex-start;
                flex-wrap: wrap;
                .iconItem {
                  border: 1px solid #00C4CD;
                  background: #fff;
                  border-radius: 30px;
                  margin-right: 6px;
                  vertical-align: middle;
                  color: #00C4CD;
                  margin-bottom: 8px;
                  font-weight: 400;
                  height: 22px;
                  padding: 1px 12px;
                  text-align: center;
                  line-height: 20px;
                  font-size: 12px;
                  box-sizing: border-box;
                }
              }
            }
          }
        }
      }

    .intention {
      text-align: left;
      padding-top: 28px;
      padding-bottom: 38px;
      display: flex;
      justify-content: flex-start;
      margin-left: 82px;
      .title {
        font-size: 14px;
        font-weight: 700;
        color: #42334d;
        display: inline-block;
      }
      .intentList {
        display: inline-block;
        margin-left: 30px;
        width: 545px;
        .intentionItem {
          width: 100%;
          text-align: left;
          padding-bottom: 20px;
          .whitesize{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 460px;
            float: left;
          }
          .position {
            font-size: 14px;
            color: #333;
            margin-right: 10px;
          }
          span {
            color: #333;;
          }
          .price {
            font-size: 14px;
            color: #FF9E40;
            font-weight: 700;
            margin-left: 30px;
            float: right;
          }
        }
      }
    }

      .workExperience {
        margin-left: 82px;
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        margin-bottom: 38px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: #42334d;
          text-align: left;
          min-width: 56px;
        }
        .workList {
          width: 572px;
          margin-left: 30px;
          pre {
            text-align: left;
            white-space: pre-wrap;
            font-size: 13px;
            line-height: 22px;
            color: #92929B;;
          }
          .imgList {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-top: 10px;
            img {
              width: 86px;
              height: 86px;
              margin-right: 6px;
              margin-bottom: 6px;
              border-radius: 4px;
              &:nth-child(6n + 6) {
                margin-right: 0px;
              }
            }
            a{
              width: 86px;
              height: 86px;
              display: block;
              position: absolute;
              top: 0;;
            }
          }
          .workItem {
            margin-bottom: 28px;
            .workTime {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 0px 10px 0px;
              width: 545px;
              span {
                font-size: 14px;
                color: #92929B;;
                &:nth-child(1) {
                  color: #333;
                }
              }
            }
            .workIconList {
              text-align: left;
              margin-top: 12px;
              span {
                background: #E5F9FA;
                padding: 2px 8px;
                text-align: center;
                color: #00C4CD;
                font-size: 12px;
                margin-right: 10px;
                border-radius: 2px;
                font-weight: 400;
              }
            }
            .workContent {
              text-align: left;
              .name {
                margin-left: 0px;
                // margin-top: 0px;
                font-size: 15px;
                color: #000;
              }
              .duties {
                text-align: left;
                font-size: 13px;
                color: #92929B;;
                pre {
                  font-size: 13px;
                  color: #92929B;;
                  width: 545px;
                  line-height: 22px;
                  white-space: pre-wrap;
                  margin: 0px;
                }
              }
            }
          }
        }
      }

      .historyList {
        padding: 20px;
        padding-left: 50px;
        height: 650px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        span {
          display: block;
          text-align: left;
          margin-bottom: 20px;
          font-size: 14px;
          color: #66666E;;
          // font-weight: 700;
          line-height: 20px;
          i {
            margin-left: 34px;
          }
        }
      }
    }
    .closediggle{
    position: absolute;
    width: 42px;
    height: 42px;
    color: #fff;
    right: -79px;
    top: 19px;
    i{
      font-size: 30px!important;
    }
  }

    .changeJobBox {
      width:400px;
      height:460px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 30px 40px;
      overflow-y: scroll;
      .Job_blo {
        text-align: left;
        line-height: 24px;
        font-size: 16px;
        font-weight: 500;
        width: 100%;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        &:hover {
          background: #ececec;
        }
        .job_top {
          color: rgba(53, 64, 72, 1);
          margin-bottom: 8px;
          line-height: 24px;
        }
        .job_name {
          max-width: 430px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          float: left;
        }
        .job_emolument {
          display: inline-block;
          margin-left: 8px;
        }
        .job_info {
          span {
            font-size: 12px;
            font-weight: 400;
            color: #66666E;
            padding: 1px 6px;
            margin-right: 8px;
            background: #F4F7F7;
            border-radius: 2px;
            display: inline-block;
          }
        }

        .job_type {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ccc;
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          &.cur {
            background: green;
          }
        }
      }
      .job_btn {
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        width: 100%;
        margin-top: 10px;
        .btn_cancel {
          width:80px;
          height:32px;
          background:rgba(255,255,255,1);
          border-radius:16px;
          border:1px solid rgba(220,220,220,1);
          box-sizing: border-box;
          font-size:14px;
          font-weight:400;
          color:rgba(53,64,72,1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
      }
    }

    .noJobBox {
      width:432px;
      max-height:610px;
      padding-bottom: 30px;
      background:rgba(255,255,255,1);
      box-shadow:0px 6px 14px 2px rgba(0,0,0,0.2);
      border-radius:8px;
      position: absolute;
      left: 50%;
      top: 50%;
      padding-right: 4px;
      transform: translate(-50%, -50%);
      .close{
        width: 100%;
        position: relative;
        height: 32px;
        i{
          font-size: 10px;
          transform: scale(0.8);
          color: #BCBEC0;
          position: absolute;
          right: 20px;
          top: 20px;
          cursor: pointer;
        }
      }
      .nullimg{
        width: 179px;
        height: 98px;
        margin: 0 auto;
        margin-top: 32px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .noJobText {
        text-align: center;
        color:#66666E;
        font-size: 14px;
        margin-top: 22px;
      }
      .noJobBtn {
        width:184px;
        height:40px;
        background:rgba(101,39,145,1);
        border-radius:100px;
        line-height: 40px;
        cursor: pointer;
        margin: 0 auto;
        margin-top: 38px;
        color:rgba(255,255,255,1);
        font-size: 14px;
        text-align: center;
      }
        .content-info{
        .title{
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          line-height: 24px;
          color: #333333;
          margin: 0 0 20px 40px;
        }
        .applytext{
          color:#92929B;
          display: block;
          line-height: 20px;
          margin-bottom: 20px;
          margin-top: -19px;
          padding: 0 40px;
        }
        .arrange{
          padding: 0 40px;
          .item{
            height: 40px;
            margin-bottom: 10px;
            .name{
              color:#66666E;
              font-size: 12px;
              width: 60px;
              text-align: right;
              line-height: 40px;
              float: left;
            }
            .info{
              float: right;
              width:280px;
              border-radius:4px;
              height: 38px;
              font-size:14px;
              // padding-left: 16px;
              color:#333333;
              // border:1px solid rgba(235,235,235,1);
              .info-select{
                height: 38px;
                line-height: 38px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0px 14px;
                border: 1px solid #DCDFE6;
                border-radius: 4px;
              }
              .el-select{
                width: 100%;
              }
              .el-input.is-disabled .el-input__inner{
                background: #EBEBEB !important;
              }
            }
          }
        }
        .selectaddress{
          padding: 0 40px;
          max-height: 425px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
            }
            &::-webkit-scrollbar-track {
            background:#fff;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:20px;
            }
            &::-webkit-scrollbar-thumb {
             background:#DDE1E0;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:20px;
            }
          .addresslist{
            height: 60px;
            border-bottom:1px solid #E8E9EB;
            .icon{
              float: left;
              height: 18px;
              width: 18px;
              margin-top: 21px;
              margin-right: 12px;
              .bg{
                color:rgba(101,39,145,1);
              }
            }
            .center{
              float: left;
              width:270px;
              height:60px;
              font-size:14px;
              display: flex;
              align-items: center;
              word-break: break-all;
              font-weight:400;
              color:#333333;
            }
            .edit{
              float: right;
              width:28px;
              height:14px;
              font-size: 14px;
              cursor: pointer;
              margin-top: 23px;
              color:rgba(101,39,145,1);
            }
          }
          .addarea{
            width: 100%;
            margin-top: 24px;
            cursor: pointer;
            .add{
              width: 14px;
              height: 14px;
              float: left;
              margin-right: 8px;
              .bgcolor{
                color:#00C4CD;
              }
            }
            .add-text{
              float: left;
              line-height: 16px;
              font-size:14px;
              color:#00C4CD;
            }
          }
        }
        .arrangeinfo{
          // width: 100%;
          padding: 0 40px;
          margin-top: 4px;
          .item{
            line-height: 22px;
            color:#333333;
            font-size:14px;
            display: flex;
            margin-bottom: 20px;
            .icon{
              width: 14px;
              height: 14px;
              float: left;
              i{
                color: #BCBEC0;
                font-size: 14px;
              }
            }
            .text{
              float: left;
              padding-left: 18px;
            }
            .f-line{
              float: left;
              width:2px;
              height:12px;
              margin: 5px 7px;
              background: #E8E9EB;
            }
            .phone{
              float: left;
              // color:#00C4CD;
            }
          }
          .detail{
            width: 100%;
            margin-top: 36px;
            text-align: center;
            .detailtitle{
              font-size:18px;
              font-weight:bold;
              color:#333333;
            }
            .desc{
              font-weight:400;
              color:#66666E;
              font-size: 14px;
              margin-top: 5px;
            }
            .time{
              font-weight:500;
              font-size:28px;
              margin-top: 24px;
              color:#03B3BB;
            }
            .end-time{
              width: 100%;
              height:16px;
              font-weight: bold;
              text-align: left;
              font-size: 16px;
              color:rgba(53,64,72,1);
            }
            .stepevaluate{
              width: 100%;
              margin-top: 24px;
              .titlel{
                width: 100%;
                height: 22px;
                .dian{
                  width:4px;
                  height:4px;
                  background:#66666E;
                  float:left;
                  border-radius: 50%;
                  margin-top: 5px;
                  margin-right: 5px;
                }
                .tex{
                  color:#66666E;
                  font-size: 14px;
                  float: left;
                  font-weight: normal;
                }
              }
              .stepall{
                width: 100%;
                height:42px;
                .step{
                  width:160px;
                  height:42px;
                  float: left;
                  cursor: pointer;
                  background: #F8FAFA;
                  border-radius:21px;
                  margin-right: 16px;
                  margin-top: 16px;
                  margin-bottom: 10px;
                  .icon{
                    width:42px;
                    height:42px;
                    float: left;
                    img{
                      width: 100%;
                      height:100%;
                    }
                  }
                  .text{
                    width: 70px;
                    height: 14px;
                    margin-left: 56px;
                    margin-top: 13px;
                    font-size: 14px;
                    color: #66666E;;
                  }
                  &:hover{
                    background: #F0F3F5;
                  }
                }
              }
            }
            .end-status{
              width:352px;
              height:88px;
              margin-top: 16px;
              background:#F8FAFA;
              border-radius:8px;
              margin-bottom: 10px;
              .status-icon{
                width: 64px;
                height: 64px;
                float: left;
                margin: 12px 16px 12px 51px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .status-text{
                float: left;
                margin-top: 26px;
                .p1{
                  color:#333333;
                  font-weight: bold;
                  font-size:16px;
                }
                .p2{
                  font-weight:300;
                  font-size:14px;
                  margin-top: 6px;
                  color:#92929B;
                }
              }
              .status-text2{
                margin-top: 34px;
                float: left;
                .p1{
                  color:#333333;
                  font-weight: bold;
                  font-size:16px;
                }
                .p2{
                  font-weight:300;
                  font-size:14px;
                  margin-top: 6px;
                  color:#92929B;
                }
              }
            }
          }
          .arrangeinfo-img{
            width:128px;
            height:120px;
            margin: 0 auto;
            margin-top: 36px;
            margin-bottom: 24px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .wait{
            color:rgba(53,64,72,1);
            font-weight: bold;
            font-size:16px;
            margin-bottom: 4px;
            text-align: center;

          }
          .wait_time{
            font-size:14px;
            color:#66666E;
            text-align: center;
            margin-bottom: 30px;
          }
        }
        .intertime{
          margin-top: 34px;
          padding: 0 40px;
          .intertime_title{
            color:#333333;
            font-size:14px;
            font-weight: bold;
          }
          .time_list{
            margin-bottom: 6px;
          }
          .time_row{
             margin-top: 16px;
            cursor: pointer;
            position: relative;
            font-size: 14px;
            color: #66666E;;
            i{
              margin-right: 10px;
              color: #ED5C5C;
            }
            .circle{
              border: 1px solid #dcdfe6;
              border-radius: 100%;
              width: 14px;
              height: 14px;
              background-color: #fff;
              position: relative;
              cursor: pointer;
              display: inline-block;
              box-sizing: border-box;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;
            }
            .active{
              border-color: #3e294d;
              background: #3e294d;
            }
          }
          .add_time{
            position: relative;
            overflow: hidden;
            cursor: pointer;
            padding: 12px 0;
            color: #03b3bb;
            .el-date-editor{
              position: absolute;
              left: 0;
              right: 0;
              height: 100%;
              opacity: 0;
            }
          }
        }
        .selectposition{
          padding: 0 40px;
          max-height: 335px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
            }
            &::-webkit-scrollbar-track {
            background:#fff;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:20px;
            }
            &::-webkit-scrollbar-thumb {
             background:#DDE1E0;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:20px;
            }
          .selectitem{
            height:69px;
            margin-top: 24px;
            border-bottom:1px solid #E8E9EB;
            position: relative;
            .position{
              height:27px;
              width: 100%;
              .close{
                width:56px;
                height:18px;
                background:rgba(255,255,255,1);
                border-radius:2px;
                color:rgba(237,92,92,1);
                font-size: 12px;
                float: left;
                text-align: center;
                line-height: 18px;
                margin-right: 10px;
                border:1px solid rgba(237,92,92,1);
              }
              .name{
                color:rgba(53,64,72,1);
                font-weight: bold;
                font-size: 14px;
                float: left;
                line-height: 20px;
                max-width:227px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 18px;
              }
              .money{
                float: left;
                color:#FF9E40;
                font-weight: bold;
                line-height: 20px;
                font-size: 14px;
              }
              .hui{
                color:#BCBEC0;
              }
            }
            .info{
              width: 100%;
              color: #66666E;
              font-size:12px;
              .address{
                float: left;
                background: #F4F7F7;
                padding: 4px 6px;
                text-align: center;
                margin-right: 8px;
                border-radius: 2px;
              }
              .year{
                float: left;
                background: #F4F7F7;
                margin-right: 8px;
                padding: 4px 6px;
                border-radius: 2px;
              }
              .benke{
                float: left;
                background: #F4F7F7;
                padding: 4px 6px;
                border-radius: 2px;
              }
              .hui{
                color:#BCBEC0;
              }
            }
            .selectcur{
              position: absolute;
              width:20px;
              height:20px;
              color: #BCBEC0;;
              top: 20px;
              right: 0px;
              .bg{
                color: #00C4CD;
              }
              .circel{
                width:14px;
                height:14px;
                background: #ecebeb;
                border: 1px solid #BCBEC0;;
                border-radius: 50%;
              }
            }
          }
        }
        .inappropriate{
          padding: 0 40px;
          .resonitem{
            width:110px;
            height:32px;
            line-height: 32px;
            font-size:14px;
            text-align: center;
            background:#F4F7F7;
            color:#6D696E;
            border-radius:16px;
            float: left;
            margin-right: 11px;
            margin-bottom: 10px;
          }
          .wachitem{
            width:110px;
            height:32px;
            line-height: 32px;
            font-size:14px;
            text-align: center;
            background:#F4F7F7;
            color:#6D696E;
            border-radius:16px;
            float: left;
            margin-right: 11px;
            margin-bottom: 10px;
          }
          :nth-child(3n){
            margin-right: 0px;
          }
          .resoncur{
            background: #E5F9FA;
            color: #03B3BB;
          }
        }
        .explain{
          // width: 100%;
          padding: 0 40px;
          margin-top: 14px;
          .explaintitle{
            color:#66666E;
            margin-bottom: 12px;
            font-weight: bold;
          }
          .text{
            width:328px;
            height:78px;
            padding: 10px 14px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            color:#333333;
            border:1px solid rgba(239,233,244,1);
            textarea{
              width: 100%;
              height: 100%;
              &::placeholder{
                color:#BCBEC0;;
              }
              &:disabled{
                background: #fff;
              }
            }
          }
          .noallow{
            cursor: not-allowed;
          }
        }
        .handler{
          padding: 0 48px;
          margin-top: 52px;
          .cancel{
            width:78px;
            height:30px;
            border-radius:4px;
            color:#92929B;
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            margin-right: 16px;
            border:1px solid #BCBEC0;
            float: right;
            cursor: pointer;
            &:hover{
              border-color: #92929B;
            }
          }
          .save{
            width:108px;
            height:32px;
            background:#00C4CD;
            border-radius:4px;
            text-align: center;
            color:rgba(255,255,255,1);
            float: right;
            line-height: 32px;
            cursor: pointer;
            &:hover{
              background: mix(#fff, #00C4CD, 20%);
              border-color: mix(#fff, #00C4CD, 20%);
              color: #fff;
            }
          }
        }
      }
    }
  }
  .like {
    width:16px;
    height:16px;
    display: block;
  }
</style>
<style>
@media screen and (max-width: 1480px) {
  .interviewrecords .pop {
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
.tabitem .el-badge{
  position: absolute;
}
.tabitem .el-badge sup{
  top: -10px;
  border: 0;
  height: 8px;
  width: 8px;
}
.bloTop .el-badge{
  position: absolute;
  right: 10px;
  top: calc(-50% + 20px);
}
.bloTop .el-badge .is-dot{
  z-index: 1;
  border: 0;
  width: 8px;
  height: 8px;
}
.interviewrecords .el-loading-mask {
  z-index: 0;
}
</style>
