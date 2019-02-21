import Vue from 'vue'
import Component from 'vue-class-component'
// import config from '@/configs'
import { professionalSkillsApi, getLabelPositionListApi, searchPositionApi, getPositionApi, editPositionApi, addPositionApi } from '@/api/position'
import { getAdressListApi, addCompanyAdressApi } from '@/api/company'
import { baseUrl } from '../../../config.js'
import { getMyInfoApi } from '../../api/auth'

import SearchBar from '@/components/searchBar'
import MapSearch from '@/components/map'
import {TMap} from '../../util/TMap.js'


var geocoder = {}
var searchService = {}
var citylocation = {}
@Component({
  name: 'community-edit',
  components: {
    SearchBar,
    MapSearch
  },

  filters: {
    // 活动周期过滤
    activityCycle (value, unit) {
      const option = {
        1: '天',
        2: '个星期',
        3: '个月',
        4: '年'
      }

      return `${value}${option[unit]}`
    }
  },

  watch: {
    form () {
    }
  }
})
export default class CommunityEdit extends Vue {
  // 列表
  deletePoster = []
  options= [
  ]
  //职位类别
  typeList = [
    {
      value: '选项1',
      label: '选择职位'
    }
  ]
  // 学历
  educationList = [
    {
      value: 5,
      label: '初中及以下'
    },
    {
      value: 10,
      label: '中专/中技'
    },
    {
      value: 15,
      label: '高中'
    },
    {
      value: 20,
      label: '大专'
    },
    {
      value: 25,
      label: '本科'
    },
    {
      value: 30,
      label: '硕士'
    },
    {
      value: 35,
      label: '博士'
    }
  ]
  // 经验要求
  experienceList = [
    {
      value: '1',
      label: '不限'
    },
    {
      value: '2',
      label: '应届生'
    },
    {
      value: '3',
      label: '1年以内'
    },
    {
      value: '4',
      label: '1-3年'
    },
    {
      value: '5',
      label: '3-5年'
    },
    {
      value: '6',
      label: '5-10年'
    },
    {
      value: '7',
      label: '10年以上'
    }
  ]
  // 公司地址
  addressList = [
    {
      value: '0',
      label: '添加新的公司地址',
    }
  ]

  // 社区分类标签
  communityTags = []

  // 表单数据
  form = {
    company_id: '', //公司ID
    position_name: '', // 职位名称
    type: '', // 职位类型
    address_id: '', // 选择的公司地址ID
    // area_id: '', // 区域ID(省，市，区的ID，级别最小的)
    lng: '', // 经度
    lat: '', // 纬度
    address: '', // 工作地址

    doorplate: '', // 工作地址-门牌
    labels: '', // 技能标签json数组[{’id’:1,’is_diy’:0},{’d’:12,’is_diy’:1}]
    emolument_min: '', // 薪资范围起点
    emolument_max: '', // 薪资范围终点
    work_experience: '', // integer(formData) 经验要求,1:不限, 2:应届生 , 3:一年以内, 4:1-3年, 5:3-5年, 6:5-10年, 7 10年以上
    education: '', // 学历要求,5 ：初中及以下，10： 中专 ，15：高中, 20: 大专, 25: 本科， 30: 硕士, 35：博士
    describe: '', // 职位描述
  }

  // 表单验证规则
  rules = {
    position_name: [
      { required: true, message: '请填写职位名称', trigger: 'blur' },
      { min: 2, message: '职位名称不得少于2个字', trigger: 'blur' },
      { max: 50, message: '职位名称最多输入50个字', trigger: 'blur' }
    ],
    type: [
      { required: true, message: '请选择职位类型', trigger: 'blur' },
    ],
    master_intro: [
      { required: true, message: '请填写简介', trigger: 'blur' },
      { min: 2, message: '简介不得少于2个字', trigger: 'blur' },
      { max: 25, message: '简介最多输入25个字', trigger: 'blur' }
    ],
    is_course: [
      { required: true, type: 'number', message: '请选择社区分类', trigger: 'change' }
    ]
  }

  positionList = []
  secondPositionList = []
  thirdPositionList = []
  searchPosition = ''
  adressInput = ''
  adress_id_Input = ''
  isEdit = false
  pop = {
    isShow: false,
    type: 'position'
  }
  // 职位类别
  selectPositionItem = {
    name: '',
    typeId: ''
  }
  
  // 技能要求个数
  limit = 4
  
  emolumentMaxList = [] //选择薪资范围
  emolumentMinList = [] //选择薪资范围
  
  addressData = {
    areaName: '',
    area_id: '',
    address: '',
    doorplate: '',
    lng: '',
    lat: ''
  }

  professionalSkillsList = []
  mounted() {
  }

  created () {
    // this.getTagList()
    this.init()
    this.setEmolumentMin()
    this.getProfessionalSkills()
    this.getLabelPositionList()

    this.getAdressList()
    this.getMyInfo()
  }
  
  getMyInfo(){
    return getMyInfoApi().then(res=>{
      this.form.company_id = res.data.data.companyId
      console.log(res.data.data)
    })
  }
  /**
   * 初始化数据
   */
  async init () {
    try {
      // 如果有id，则为编辑
      if (this.$route.query.id) {
        const id = parseInt(this.$route.query.id)
        this.isEdit = true
        const { data } = await getPositionApi({
          id:id
        })

        console.log('====',data.data)
        // // 创建编辑表单数据
        const form = {}
        form.position_name = data.data.positionName
        form.type = data.data.typeName

        form.address_id = data.data.addressId
        form.lng = data.data.lng
        form.lat = data.data.lat
        form.address = data.data.address
        form.doorplate = data.data.doorplate

        form.work_experience = data.data.workExperience
        form.education = data.data.education
        form.describe = data.data.describe

        form.type = data.data.type
        this.selectPositionItem = {
          name: data.data.typeName,
          typeId: data.data.type
        }
        // 设置技能
        if (data.data.skillsLabel.length > 0) {
          this.selectPositionItem.topPid = data.data.skillsLabel[0].topPid

          if(this.professionalSkillsList.length < 1){
            console.log(this.professionalSkillsList)
            this.getProfessionalSkills().then(()=>{
              this.setSkillsList()
            })
          }else {
            console.log(this.professionalSkillsList)

            this.setSkillsList()
          }
        }
        form.labels = []
        data.data.skillsLabel.map(item=>{
          form.labels.push(item.labelId)
        })

        this.addressList[1] = {
          value: data.data.addressId,
          label: data.data.address,
        }

        form.emolument_min = data.data.emolumentMin
        form.emolument_max = data.data.emolumentMax
        this.setEmolumentMax(data.data.emolumentMin)
        this.form = form

        this.getAdressList()

        console.log(this.form)
        //this.form = $.extend(true, {}, this.form, form)
      } else {
        // const res = await getCreateCommunityData({
        //   globalLoading: true
        // })
        // this.tags = reshaol
      }
    } catch (error) {
      // this.is_course = true;
      // this.$message.error(error.message)
    }
  }

  /**
   * 保存社区
   */
  async savePosition () {
    console.log('savePosition')
    try {
      // this.$store.dispatch('showAjaxLoading')
      const params = this.transformData(this.form)
      console.log('---', params)
      if (!this.$route.query.id) {
        addPositionApi(params).then(res=>{
          this.$message.success('创建成功')
          this.$router.push({
            name: 'recruiterIndex'
          })

        }).catch(e=>{
          this.$message.error(e.data.msg)
        })
      } else {
        params.id = this.$route.query.id
        editPositionApi(params).then(res=>{
          this.$message.success('编辑成功')
          this.$router.push({
            name: 'recruiterIndex'
          })
        }).catch(e=>{
          this.$message.error(e.data.msg)
        })
      }
      
    } catch (e) {
      this.$message.error(e.message)
    } finally {
      //this.$store.dispatch('hideAjaxLoading')
    }
  }

  //获取地址列表
  getAdressList(){
    let data = {
      page: 1,
      count: 20,
      sort: 'desc'
    }
    getAdressListApi(data).then(res=>{
      if(res.data.data.length>0){
        res.data.data.map(item => {
          item.value = item.id
          item.label = `${item.address}${item.doorplate}`
        })

        this.addressList = [
          {
            value: '0',
            label: '添加新的公司地址',
          },
          ...res.data.data
        ]
      }
    }).catch(err => {
      this.$message.error("该手机号码的用户还不是招聘官哦~")
    })
  }

  setEmolumentMin () {
    let max = 260
    let i = 0
    let list = []

    while (i<max)
    {
      if(i<30){
        i++
      } else if(i<100){
        i+=5
      } else if(i<260){
        i+=10
      }

      list.push({
        label : `${i}k`,
        value : i
      })
    }

    this.emolumentMinList = list
  }

  changeEmolumentMin(e){
    this.setEmolumentMax(e)
  }

  setEmolumentMax (num) {
    let max = num+5
    let list = []


    for (let i = num+1; i <= max; i++) {
      list.push({
        label : `${i}k`,
        value : i
      })
    }
    this.emolumentMaxList = list
  }

  querySearch(queryString, cb){
    console.log(queryString)
    if(queryString.length>0){
      geocoder.getLocation(queryString)
    }
  }

  handleSelect(e){
  }

  // 编辑标题
  get editTitle () {
    return this.$route.query.type !== 'add' ? '编辑职位' : '添加职位'
  }

  // 技能
  getProfessionalSkills () {
    let that = this
    return professionalSkillsApi({
      type: 'skills'
    }).then(res => {
      that.professionalSkillsList = res.data.data.labelProfessionalSkills
      let options = []
      res.data.data.labelProfessionalSkills.map((item,index) => {
        options[index] = {
          label: item.name,
          value: item.labelId
        }
      })
      this.options = options
    })
  }

  // 搜索职位
  handleSearch (e) {
    console.log(e)
    searchPositionApi({
      name: e,
      page: 1,
      count: 20
    }).then(res => {
      this.secondPositionList = []
      this.thirdPositionList = res.data.data
    })
  }

  //添加工作地点
  addAdress (param) {
    param.data.areaName = param.data.area_id
    delete param.data.area_id
    console.log(param)
    addCompanyAdressApi(param.data).then(res => {
      this.pop = {
        isShow: false,
        type: ''
      }
      this.$message.success('添加成功')
      this.form.address_id = res.data.data.id
      //this.form.address = res.data.data.address
      this.getAdressList()
      console.log(res)
    }).catch(e=>{
      console.log('===',e)
      this.$message.error(e.data.msg)
    })
  }

  selectPosition (index) {
    if (!this.positionList[index].active) {
      this.positionList.map((item,index2)=>{
        if(index2===index){
          item.active = true
          item.children.map((item2)=>{
              item2.active = false
              this.thirdPositionList = item2.children
          })
          this.secondPositionList = item.children
        }else {
          item.active = false
        }
      })
    }
    this.thirdPositionList = []
  }

  selectSecondPosition (index) {

    if (!this.secondPositionList[index].active) {
      this.secondPositionList.map((item,index2)=>{
        if(index2===index){
          item.active = true
          this.thirdPositionList = item.children
        }else {
          item.active = false
        }
      })
    }else {
      this.secondPositionList[index].active = false
      this.thirdPositionList = []
    }
  }

  thirdSecondPosition (item) {
    console.log(item)
    this.pop.isShow = false
    this.selectPositionItem = {
      name: item.name,
      typeId: item.labelId,
      topPid: item.topPid,
    }

    console.log(item.topPid)
    this.form.labels = []
    this.form.type = item.labelId
    this.setSkillsList()
  }

  //设置技能列表
  setSkillsList () {
    if (this.professionalSkillsList.length > 0){
      let topPid = this.selectPositionItem.topPid
      this.professionalSkillsList.map(item => {
        if ( item.labelId === topPid ) {
          this.options = item.children
        }
      })
    }else {}
  }

  changePosition () {
    this.pop = {
      isShow: true,
      type: 'position'
    }
  }

  // 工作地点选择 
  changeAdress (e) {
    console.log(this.form.address_id)
    // this.form.address_id = 1
    if(e==='0'){
      this.pop = {
        isShow: true,
        type: 'addAdress'
      }
      this.form.address_id = ''
    }
    return false
  }

  getLabelPositionList () {
    getLabelPositionListApi().then(res => {
      res.data.data.map((item,index)=>{
        if(index===0){
          item.active = true
          this.secondPositionList = item.children
        }else {
          item.active = false
        }
      })
      this.positionList = res.data.data
    })
  }

  /**
   * 将表单数据转换成提交服务器的格式
   * @param {*} form
   */
  transformData (form) {
    const newForm = {...form}
    // 分类标签
    console.log(newForm)
    if(newForm.labels && newForm.labels.length>0){
      let labels = []
      newForm.labels.map(item=>{
        labels.push({
          id :item,
          is_diy: '0'
        })
      })
      //var jsObject = JSON.parse(jsonString); //转换为json对象
      newForm.labels = JSON.stringify(labels); //转换为json类型的字符串　　
      console.log(newForm.labels)
    }else {
      delete newForm.labels
    }
    
    return newForm
  }

  /**
   * 检查pos
   */
  examinePos () {
    console.log('examinePos', typeof this.form.posters)
    let test = true
    let data = this.form

    if (!data.posters) { return }

    if (data.promotion_status === '3') {
      data.posters = []
      return test
    }

    if (data.posters.length < 1) {
      delete data.posters
      return test
    }

    this.form.posters.map((item, index) => {
      if (item.new_wap_file_id && item.new_applet_file_id) {
      } else {
        test = false
        this.$message.error('分销／邀请函海报上传图片不全，请重新上传')
      }
    })
    return test
  }


  /**
   * 点击提交
   */
  handleSubmit () {
    console.log(this.form, '-*****-***--*-*-')
    this.$refs.form.validate(valid => {
      if (valid) {
        let data = this.form
        this.savePosition()
      } else {}
    })
  }

  popCancel (type) {
    if(type === 'name') {
      this.selectPositionItem.name = ''
    }
    this.pop.isShow = false
  }

  /**
   * 点击取消
   */
  handleCancel () {
    this.$router.go(-1)
  }

  /**
   * 修改生效时间
   * @param {*} range
   * @param {*} start
   * @param {*} end
   */
  handleTimeRangeChange (range, start, end) {
    this.form.start_time = start
    this.form.end_time = end
  }

  /**
   * 修改活动周期
   * @param {*} value
   */
  handleActivityCycleChange (value) {
    console.log(value)
    for (let [, item] of this.activityCycles.entries()) {
      if (item.value === value) {
        this.form.activity_cycle_unit = item.unit
        break
      }
    }
  }

  /**
   * 社区介绍失去焦点
   */
  handleCommunityIntroEditorBlur () {
  //   this.$refs.form.validateField('introduce')
  }

  toIssueRule () {
    let event = new MouseEvent('click')
    let a = document.createElement('a')
    a.target = 'view_window'
    a.href = `${baseUrl()}/issueRule`
    a.dispatchEvent(event)
  }

  // 技能下拉框显示隐藏
  skillChange(e){
    console.log(this.selectPositionItem.name)
    if(e && this.selectPositionItem.name.length === 0){
      this.$message.error('请先选择职位类别')
    }
  }
}