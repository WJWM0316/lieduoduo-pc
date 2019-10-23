<template>
  <div id="candidate">
    <div class="main_top_warp" :class="{'isFixed':navBarFixed}">
        <div class="main_top" > 
          <div class="topBlo topStatusBlo borright " :class="{'cur':navType==='searchBrowseMyself'}" @click="changeNav('searchBrowseMyself')">
            <img class="preview" src="../../assets/images/preview.png" v-if="navType === 'searchBrowseMyself'"  />
            <img class="preview" src="../../assets/images/preview_off.png" v-else />
            看过我的({{navNum.browseMyselfCount || 0}})
          </div>
          <div class="topBlo topStatusBlo borleft "  :class="{'cur':navType==='searchCollect'}" @click="changeNav('searchCollect')">
            <span class="border"></span>
            <img class="like" src="../../assets/images/like_no.png" v-if="navType === 'searchCollect'" />
            <img class="like" src="../../assets/images/like2.png" v-else />
            对我感兴趣({{navNum.collectMyselfCount || 0}})
          </div>
          <div class="topBlo topStatusBlo2"  :class="{'cur':navType==='searchMyCollect'}" @click="changeNav('searchMyCollect')">
            <img class="like" src="../../assets/images/like_no.png" v-if="navType === 'searchMyCollect'" />
            <img class="like" src="../../assets/images/like2.png" v-else />
            我感兴趣的({{navNum.myCollectCount || 0}})
          </div>

          <div class="screen_cont">
            <div class="topSelected" @click="screenList(1)" :class="{'selected':isShowScreen}" v-if="isShowScreen">
              <img class="screen_icon" src="../../assets/images/screen.png" v-if="isShowScreen" />
              <img class="screen_icon" src="../../assets/images/screen_off.png" v-else />
              {{ selectedScreen.length > 0 || (positionTypeList.length > 0 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
            </div>

            <div class="topSelected" @click="screenList(1)" :class="{'selected':selectedScreen.length>0}" v-else>
              <img class="screen_icon" src="../../assets/images/screen.png" v-if="selectedScreen.length>0" />
              <img class="screen_icon" src="../../assets/images/screen_off.png" v-else />
              {{selectedScreen.length > 0 ||  (positionTypeList.length > 0 ? positionTypeList[positionTypeList.length-1].active:false) ? '清除筛选' :'高级筛选' }}
            </div>


            <div class="topSelected2" @click="screenList(2)">
              <img class="screen_icon" src="../../assets/images/arrows2.png" v-if="isShowScreen" />
              <img class="screen_icon" src="../../assets/images/arrows2.png" v-else />
            </div>

            <div class="screenBox" v-if="isShowScreen">
              <div class="triangle_border_top"></div>
              <div class="screen_tit">{{getPopName()}}</div>
              <div class="lable_list" >
                <span v-for="(item,index) in positionTypeList" @click="labelClick(index)" :class="{'cur':item.active}" :key="index"> {{item.name}}</span>
              </div>

              <div class="screen_btns">
                <div class="screen_btn true" @click="screenOp('confirm')">确定</div>
                <div class="screen_btn" @click="screenOp('cancel')">取消</div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="main_top_warp" v-if="navBarFixed"></div>
    <div class="recruiter_main">
      
      <div id="box" class="main_cont" v-if="candidateList.length>0">
        <div class="candidate_blo" v-for="(item,index) in candidateList" @click="todoAction('openPop',index)" :key="index">
          <div class="bloTop">
            <div class="timer">{{item.viewAt}}</div>
            <div class="topText" v-if="navType === 'searchBrowseMyself'">看过我的{{item.positionInfo && item.positionInfo.positionName ?'职位':'主页'}}</div>
            <div class="topText" v-if="navType === 'searchCollect'">对我{{item.positionInfo && item.positionInfo.positionName ?'的职位':''}}感兴趣</div>
            <div class="topText" v-if="navType === 'searchMyCollect'">对Ta感兴趣</div>

            <div class="topText topText2">
              <span v-if="item.positionInfo.area">{{item.positionInfo.area}} | </span> 
              <span v-if="item.positionInfo.positionName">{{item.positionInfo.positionName}} | </span>
              <span v-if="item.positionInfo.emolument"> {{item.positionInfo.emolument}}</span></div>
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
                      <block v-if="!item.glass">{{item.name}}</block>
                      <img v-else class="invisible2" src="https://attach.lieduoduo.ziwork.com/front-assets/images/invisible2.png">
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
              <div class="like_user" @click.stop="ownerOp(true,item.uid)" v-if="item.interested">
                <img class="like" src="../../assets/images/like.png"/>
                取消感兴趣
              </div>
              <div class="like_user" @click.stop="ownerOp(false,item.uid)" v-else >
                <img class="like" src="../../assets/images/like_no.png"/>
                  对Ta感兴趣
              </div>
              <div class="btn" v-if="!item.interviewStatus.status" @mouseover="sharePicOp(true,index)" @mouseout="sharePicOp(false,index)">开撩约面</div>
              <div class="btn" @mouseover="sharePicOp(true,index)" @mouseout="sharePicOp(false,index)" v-else>{{item.interviewStatus.statusDesc}}</div>

              <div class="xcxPic" v-if="item.isShowPic">
                  <div class="triangle_border_down" ></div>
                  <div class="xcx_main" v-if="item.src.length<1">
                    <img class="xcx_load" src="../../assets/images/loading.gif">
                    <p>正在加载中…</p>
                  </div>
                  <div class="xcx_main" v-show='item.src.length>0'>
                    <img class="xcx_icon" :class="{'xcx_border':item.src}" :src="item.src">
                    <p>微信扫码，查看简历详情</p>
                  </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="cont_none" v-else>
        <img  src="../../assets/images/ufo.png">
        <p>{{ this.navType === 'searchBrowseMyself' || this.navType === 'searchCollect'  ? '暂无候选人关注你，快去发布你的职位吧~ '  : '还没有感兴趣候选人~'}}</p>
      </div>

      <div class="loading" v-if="loading">
        <img class="loading_icon" src="../../assets/images/loading.gif" />
        加载更多
      </div>
      <div class="loading" v-else>
        - 没有更多候选人 -
      </div>
      <div class="toTop" @click="toTop" v-if="isShowTop">
          <img class="arrows" src="../../assets/images/open.png"/>
      </div>
    </div>

    <div class="pop" v-if="pop.isShow" @click="todoAction('cloPop')">
      <div class="xcxPicBox" v-if="pop.type==='clickPic'">
        <img class="clo" src="../../assets/images/clo.png" @click="todoAction('cloPop')">
        <div class="main_tit">查看简历详情</div>

        <div class="xcx_main" v-if="!selectBlo || !selectBlo.src || selectBlo.src.length<1">
          <img class="xcx_load" src="../../assets/images/loading.gif">
          <p>正在加载中…</p>
        </div>

        <div class="xcx_main" v-show='selectBlo.src && selectBlo.src.length>0'>
          <img class="xcx_icon" :src="selectBlo.src">
          <p>微信扫码，查看简历详情</p>
        </div>
      </div>
    </div>

    <div class="service"  @mouseover="isService = true" @mouseout="isService = false">
      <img class="service_icon" src="../../assets/images/service.png"/>
      客服咨询

      <div class="service_pop" v-if="isService">
        <div class="pop_tit">联系我们</div>
        <div class="pop_cont">
          <h3 class="pop_text">请拨打全国咨询热线</h3>
          <p class="pop_text2">400-065-5788</p>
          <img class="pop_code" src="../../assets/images/gzh.png"/>
          <p class="pop_text3">猎多多公众号</p>
          <p class="pop_text4">微信扫描二维码，关注官方公众号</p>
        </div>
        <!-- <div class="triangle_border_right">
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { getMyInfoApi } from '../../api/auth'
  import { getPositionTypeApi, getResumeShareApi } from '../../api/position'
  import { getSearchMyCollectApi, getSearchCollectApi, putCollectUserApi, cancelCollectUserApi } from '../../api/collect'
  import { getSearchBrowseMyselfApi, getMyNavDataApi, getJobHunterPositionTypeApi } from '../../api/browse'

  @Component({
    name: 'lighthouse-list',
    methods: {
    },
    computed: {},
    watch: {
      '$route': {
        handler() {
          this.init()
        },
        immediate: true
      }
    },
    components: {
    }
  })
  export default class CourseList extends Vue {
    userInfo = {}

    pageInfo = {
      page: 1,
      count: 20,
      totalPage: 0,
      total: 0
    }
    pop = {
      isShow: false,
      type: 'clickPic'
    }

    form = {
      page: 1,
      recruiter: 5,
      status: '1,2', // 状态
      is_online: 1,
      type: ''
    }

    navBarFixed = false // nav是否置顶
    statusTotal = {}   //  
    uid = null
    shareSelectItem = {
      qrCodeUrl: ''
    }    //分享选中
    isShowPic = false  // 分类更多
    picStyle = {
      x: '',
      y: ''
    }
    isShowTop = false //
    isService = false  

    navType = 'searchBrowseMyself' 
    loading = false //翻页 
    candidateList = []
    searchMyCollect = []
    searchCollect = []
    searchBrowseMyselfList = []
    positionTypeList = []  // 职业标签列表
    isShowScreen = false
    selectedScreen = [] // 筛选选中条件
    sharePicIds = [] // 下载中的图片
    navNum = {} // nav 数量
    selectBlo = {}
    init() {
      this.form = Object.assign(this.form, this.$route.query || {})
      this.userInfo = this.$store.state.userInfo
      let query = this.$route.query
      if(query.navType){
        switch(query.navType) {
          case 'searchMyCollect':
            this.getSearchMyCollect(1)
            this.getJobHunterPositionType()
            break
          case 'searchCollect':
            this.getSearchCollect(1)
            this.getPositionTypeList()
            break
          case 'searchBrowseMyself':
            this.getSearchBrowseMyself(1)
            this.getPositionTypeList()
            break
          default:
            this.getSearchBrowseMyself(1)
            this.getPositionTypeList()
            break
        }
        this.navType = query.navType
      }else {
        this.navType = 'searchBrowseMyself' 
        this.getSearchBrowseMyself(1)
        this.getPositionTypeList()
      }
      this.getMyNavData()
    }
    // 获取另外的选择
    getOtherActive () {
      let otherActive = this.positionTypeList.length > 0 ? this.positionTypeList[this.positionTypeList.length-1].active : false
      return otherActive
    }
    setPath (res) {
      this.pageInfo.page = 1
      this.setPathQuery(res)
    }

    sharePicOp (type,index) {
      if (type) {
        this.candidateList[index].isShowPic = true
        this.getPic(index)
      }else {
        this.candidateList[index].isShowPic = false
      }
    }

    getPopName () {
      return this.navType === 'searchBrowseMyself' ? '看过我的职位类型' : this.navType === 'searchCollect' ? '简历职位类型' : '感兴趣职位类型'
    }
    screenOp (status) {
      switch(status) {
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
      if (type === 1 ) {
        if (this.selectedScreen.length > 0 || otherActive) {
          this.setDefaultScreen()
          if (!this.isShowScreen) {
            this.getList()
          }
        }else{
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

      this.positionTypeList.map((item) => {
        item.active = false

        if (status && item.labelId === 'index') {
          item.active = true
        }
        if (!status && item.labelId === 'all') {
          item.active = true
        }
      })
    }

    // 职位操作
    positionOp (type, index) {
      if(type){
        this.candidateList[index].isShowPic = true
      }else {
        this.candidateList[index].isShowPic = false
      }
    }

    changeNav (type) {
      let type2 = this.navType
      if(type2 === type){
        return
      }

      if(type === 'searchMyCollect') {
        this.getJobHunterPositionType()
      }else {
        this.getPositionTypeList()
      }
      this.navType = type
      //this.toTop()
      this.setDefaultScreen()
      this.setPath({navType: type})
      //this.getList()
      this.isShowScreen = false
    }

    getMyNavData() {
      getMyNavDataApi().then(res => {
        this.navNum = res.data.data
      })
    }

    getList (type, page=1) {
      let status = type ? type : this.navType
      if (type) this.navType = type

      switch(status) {
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
    getSearchMyCollect (page) {
      let otherActive = this.getOtherActive()
      let data = {
        category: this.selectedScreen.length > 0 || otherActive ? 1 : 0,
        type: otherActive ? '0':this.selectedScreen.join(),
        index: this.positionTypeList.length > 0 && otherActive ? 1 : 0,
        page: page || this.pageInfo.page || 1,
        count: this.pageInfo.count
      }
      this.loading = true
      getSearchMyCollectApi(data).then(res => {
        let msg = res.data
        msg.data.map((item) => {
          item.isShowPic = false
          item.src = ''
        })
        if (data.page === 1){
          this.candidateList = msg.data
        } else {
          this.candidateList = this.candidateList.concat(msg.data)
        }
        this.loading = false
        this.pageInfo.totalPage = msg.meta.total/data.count || 0
        this.pageInfo.page = data.page
      }).catch(() => {
        this.loading = false
        this.candidateList = []
      })
    }
    // 对我感兴趣的
    getSearchCollect (page) {
      let otherActive = this.getOtherActive()
      let data = {
        category: this.selectedScreen.length > 0 || otherActive ? 1 : 0,
        type: this.selectedScreen.join(),
        index: this.positionTypeList.length > 0 && otherActive ? 1 : 0,
        page: page || this.pageInfo.page || 1,
        count: this.pageInfo.count
      }
      this.loading = true
      getSearchCollectApi(data).then(res => {
        let msg = res.data
        msg.data.map((item) => {
          item.isShowPic = false
          item.src = ''
        })
        if (data.page === 1){
          this.candidateList = msg.data
        } else {
          this.candidateList = this.candidateList.concat(msg.data)
        }
        this.loading = false
        this.pageInfo.totalPage = msg.meta.total/data.count || 0
        this.pageInfo.page = data.page
      }).catch(() => {
        this.loading = false
        this.candidateList = []
      })
    }
    // 浏览过我的求职者
    getSearchBrowseMyself (page) {
      let otherActive = this.positionTypeList.length > 0 ? this.positionTypeList[this.positionTypeList.length-1].active:false
      let data = {
        category: this.selectedScreen.length > 0 || otherActive ? 1 : 0,
        type: this.selectedScreen.join(),
        index: this.positionTypeList.length > 0 && otherActive ? 1 : 0,
        page: page || this.pageInfo.page || 1,
        count: this.pageInfo.count
      }
      this.loading = true
      getSearchBrowseMyselfApi(data).then(res => {
        let msg = res.data
        msg.data.map((item) => {
          item.isShowPic = false
          item.src = ''
        })
        if (data.page === 1){
          this.candidateList = msg.data
        } else {
          this.candidateList = this.candidateList.concat(msg.data)
        }
        this.loading = false
        this.pageInfo.totalPage = msg.meta.total/data.count || 0
        this.pageInfo.page = data.page
      }).catch(() => {
        this.loading = false
        this.candidateList = []
      })
    }
    // 职业类型列表
    getPositionTypeList () {
      getPositionTypeApi().then(res => {
        let data = res.data.data
        data.map(item=>{
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
        data.map(item=>{
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
      if( (data.labelId === 'all'||data.labelId === 'index') && data.active) {
        this.selectedScreen = []
        if(data.labelId === 'index') {
          this.setDefaultScreen('index')
        }else {
          this.setDefaultScreen()
        }
      }else {
        if (data.active) {
          this.selectedScreen.push(data.labelId)
        } else {
          this.selectedScreen.splice(this.selectedScreen.indexOf(data.labelId),1)
        }
        this.positionTypeList[0].active = false
        this.positionTypeList[this.positionTypeList.length-1].active = false
      }
    }
    //是否感兴趣操作
    ownerOp (status,uid) {
      let data = {
        uid: uid
      }

      if (!status) {
        putCollectUserApi(data).then(() => {
          this.$message({
            type: 'success',
            message: '感兴趣成功!'
          })
          this.getList()
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      } else {
        cancelCollectUserApi(data).then(() => {
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
          this.getList()
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      }
    }

    handleSearch() {
      this.form.page = 1
      this.setPathQuery(this.form)
    }

    mounted () {
      //setTimeout(function(){
        window.addEventListener('scroll', this.handleScroll)
      //},1300)
    }

    todoAction(type, index) {
      switch(type) {
        case 'cloPop':
          this.pop = {
            isShow: false,
            type: ''
          }
          break
        case 'openPop':
          this.pop = {
            isShow: true,
            type: 'clickPic'
          }
          this.selectBlo = this.candidateList[index]
          this.getPic(index)
          break
        default:
          break
      }
    }

    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let pageHeight = document.documentElement.clientHeight
      let box = document.getElementById("box")
      let contentHeight = window.getComputedStyle(box).height
      contentHeight = contentHeight.slice(0,contentHeight.length-2)
      // 148
      let otherHeight = 148+30 
      let value = pageHeight-otherHeight+scrollTop
      if(scrollTop > 155){
        this.navBarFixed = true
        if(scrollTop > 500){
          this.isShowTop = true
        }
      }else {
        this.navBarFixed = false
        this.isShowTop = false
      }

      // 翻页
      if( contentHeight - value < 20){
        if (!this.loading && this.pageInfo.page < this.pageInfo.totalPage) {
          this.getList(this.navType,this.pageInfo.page + 1)
        }
      }
    }

    getMyInfo(){
      return getMyInfoApi().then(res=>{
        this.uid = res.data.data.uid
      }).catch(e => {
        this.$message.error(e.data.msg)
       })
    }
    toTop(){
      document.documentElement.scrollTop=0;
    }

    getPic(index){
      let ids = this.sharePicIds
      let item = this.candidateList[index]
      if (item.src.length < 1 && !ids.includes[item.uid]) {
        ids.push(item.uid)
        getResumeShareApi({
          resumeUid: item.uid
        }).then(res => {
          item.src = res.data.data.positionQrCodeUrl
        }).catch(() => {
          ids.splice(ids.indexOf(item.uid), 1)
        })
      }
    }
  }
</script>
<style lang="less">
@import "./candidate.less";
</style>