<template>
	<div id="apply">
			<!-- 未上传 -->
		  <div class="resume_main no_upload" v-if="!isUpload">
		  	<div class="main_cont">
		  		<h3 class="hint">上传简附件，招聘官既可查看你的附件简历 </h3>
		  		<h3 class="hint">如需要编辑在线简历，请前往猎多多小程序进行操作</h3>

			    <el-upload
			      class=""
	          :action="fileUpload.action"
			      :on-preview="handlePreview"
			      :on-remove="handleRemove"
			      :on-error="handleFileError"
			      :on-success="handleFileSuccess"
			      :headers="fileUpload.headers"
			      :data="fileUpload.params"
			      :before-upload="beforeFileUpload"
			      multiple
			      :show-file-list='false'
			      :limit="5"
			      :on-progress="uploadFileProcess"
			      :file-list="fileList">
			      <el-button class="upload_btn" size="small" type="primary">上传附件简历</el-button>
			    </el-upload>

		  		<p class="hint2">
		  			内容附件简历类型支持word、pdf、ppt、txt、wps、jpg、png、jpeg、pptx； 允许最大上传10M；
		  		</p>
		  	</div>
		  	<img class="cont_pic" src="../../assets/images/pic_home.png"/>
		  </div>

		  <div class="resume_main" v-else>
		  	<div class="file_cont" v-if="uploadFileData[0]">
		  		<div class="cont_top">
		  			<img class="cont_pic2" src="../../assets/images/pic_resume_already.png"/>
		  			<h2 class="cont_tit">附件简历已上传</h2>
		  			<p class="top_text">{{uploadFileData[0].createdAt}}   上传</p>
		  		</div>
		  		<div class="file_msg">
		  			<img class="file_icon" v-if="filePic==='excel'" src="../../assets/images/excel.png"/>
		  			<img class="file_icon" v-if="filePic==='jpg'" src="../../assets/images/jpg.png"/>
		  			<img class="file_icon" v-if="filePic==='pdf'" src="../../assets/images/pdf.png"/>
		  			<img class="file_icon" v-if="filePic==='png'" src="../../assets/images/png.png"/>
		  			<img class="file_icon" v-if="filePic==='ppt'" src="../../assets/images/ppt.png"/>
		  			<img class="file_icon" v-if="filePic==='txt'" src="../../assets/images/txt.png"/>
		  			<img class="file_icon" v-if="filePic==='word'" src="../../assets/images/word.png"/>
		  			<img class="file_icon" v-if="filePic==='default'" src="../../assets/images/default.png"/>
		  			<div class="file_center">
		  				<p class="file_name">
		  					{{uploadFileData[0].fileName}}
		  				</p>
		  				<div class="progress" v-if="fileUpload.progress>0&&fileUpload.progress!==100">
		  					<span>{{fileUpload.progress}}%</span>
		  					<div class="progress-bar" :style="{width: fileUpload.progress + '%'}" ></div>
		  				</div>
		  				<p v-else>{{uploadFileData[0].sizeM}}</p>
		  			</div>
		  			<div class="file_op">
		  				<!-- <div class="op_btn" @click.stop="filePreview()">
		  					<img class="btn_icon" src="../../assets/images/preview.png"/>
		  					预览
		  				</div> -->
		  				<div class="op_btn" @click.stop="downFile()">
		  					<img class="btn_icon"  src="../../assets/images/down.png"/>
			  				下载
			  			</div>
		  				<div class="op_btn" @click="todoAction('openDelete')">
		  					<img class="btn_icon" src="../../assets/images/search_btn_delete.png"/>
			  				删除
			  			</div>
		  			</div>
		  		</div>
		  	</div>
		  

		  	<div class="upload_hint" @mouseover="upload_hint_pop = true" @mouseout="upload_hint_pop = false">
		  		上传简历帮助 <span>?</span>
		  		<div class="upload_hint_pop" v-if="upload_hint_pop">
				  	<p>
				  		上传简附件，招聘官既可查看你的附件简历； 
				  	</p>
				  	<p>
				  		附件简历类型支持word、pdf、ppt、txt、wps、jpg、png；  
				  	</p>
				  	<p>
				  		允许最大上传10M；若从其他平台下载的word简历，请将文件另存为.docx格式后上传。
				  	</p>
				  	<div class="triangle_border_down"></div>
				  </div>
		  	</div>
		    <el-upload
		      class=""
          :action="fileUpload.action"
		      :on-preview="handlePreview"
		      :on-remove="handleRemove"
		      :on-error="handleFileError"
		      :on-success="handleFileSuccess"
		      :headers="fileUpload.headers"
		      :data="fileUpload.params"
		      :before-upload="beforeFileUpload"
		      multiple
		      :show-file-list='false'
		      :limit="5"
		      :on-progress="uploadFileProcess"
		      :file-list="fileList">
		      <el-button class="btn_resume" size="small" type="primary">重新上传</el-button>
		    </el-upload>
		  </div>

		  
		  <div class="service"  @mouseover="isService = true" @mouseout="isService = false">
				<img class="service_icon" src="../../assets/images/service.png"/>
				客服咨询

				<div class="service_pop" v-if="isService">
					<div class="pop_tit">联系我们</div>
					<div class="pop_cont">
			  		<h3 class="pop_text">请拨打全国咨询热线</h3>
			  		<p class="pop_text2">020-6127988</p>
			  		<img class="pop_code" src="../../assets/images/gzh.png"/>
			  		<p class="pop_text3">猎多多公众号</p>
			  		<p class="pop_text4">微信扫描二维码，关注官方公众号</p>
					</div>
					<div class="triangle_border_right">
					</div>
				</div>
			</div>
	</div>
  
</template>
<script>
	import Vue from 'vue'
	import Component from 'vue-class-component'
	import { uploadApi, waitApi, getQrCodeApi, saveResumeMsgApi, getResumeMsgApi, deleteFileMsgApi, downApi } from '../../api/auth'
	import { baseHost } from '../../../config.js'

	@Component({
	  name: 'apply',
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
	  components: {}
	})
	export default class CourseList extends Vue {
		isUpload = false
		isService = false
		uploadFileData = []   // 上传的
		userInfo = {}
		fileList= []

		fileUploadType = 'img'
		// 文件上传
		fileUpload = {
		  action: `${baseHost()}/attaches`,
		  list: [],
		  limit: 2,
		  accept: '.png, .jpg, .jpeg, .word, .pdf, .ppt, .txt, .wps ,.pptx,.PNG, .JPG, .JPEG, .WORD, .PDF, .PPT, .TXT, .WPS ,.',
		  progress: 0,
		  btnTxt: '选择文件',
		  progressText: '上传中',
		  headers: {
		    Authorization: ''
		  },
		  params: {
		  	attach_type: 'img',
		  	sadasd:'222'
		  },
		  status: 'processing',
		  infos: {},
		  show: false
		}
		upload_hint_pop = false

    imgExt = ['.png','.jpg','.jpeg']//图片文件的后缀名
    docExt = ['.doc','.docx','.pdf','.ppt','.pptx','.txt','.word','.wps']//word文件的后缀名
    filePicList = ['.excel','.jpg','.pdf','.png','.ppt','.txt','.word']
    filePic = 'default'
		/**
		 * 初始化表单、分页页面数据
		 */
		init() {
		  this.userInfo = this.$store.state.userInfo
		  console.log(this.userInfo)
		  
		  if(this.userInfo&&this.userInfo.id){
		  	this.fileUpload.headers.Authorization = this.userInfo.token 
		  	this.getResumeMsg()
		  }else {
		  	this.$router.push({name: 'login'})
		  }
		}

    saveResumeMsg(){
    	let data = {
    		attach_resume: this.uploadFileData[0].id,
    		attach_name: this.uploadFileData[0].fileName
    	}
    	saveResumeMsgApi(data).then(res => {
    	}).catch(err => {
	    	this.$message.error(err.msg);
    	})
    }

    getResumeMsg(){
    	getResumeMsgApi().then(res => {
    		if(res.data.data.id){
    			this.isUpload = true
    			this.uploadFileData = []
    			this.uploadFileData.push(res.data.data)

    			this.fileUpload.progress = 100
	    		this.setFilePic(res.data.data.fileName)
    		}
    		
    	}).catch(res => {
    		console.log(res)
    		this.isUpload = false
    		
    	})
    }

	  todoAction(type) {
	    switch(type) {
	      case 'detail':
	        this.$router.push(
	          { name: 'teacherDetail',
	            query: {
	              id: id
	            }
	          }
	        )
	        break
	      case 'service':
	        this.isService = !this.isService
	        break
	      case 'openDelete':
	      	this.$confirm('是否删除该附件简历', '删除附件简历', {
	          confirmButtonText: '删除',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          return deleteFileMsgApi()
	        }).then(()=>{
	        	this.isUpload = false
	        	this.uploadFileData = []
	        	this.$message({
	            type: 'success',
	            message: '删除成功!'
	          })
	        })
	        .catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          })          
	        });
	      default:
	        break
	    }
	  }

		filePreview () {
			let fileLink = this.uploadFileData[0].url
      let event = new MouseEvent('click')
      let a = document.createElement('a')
      a.target = 'view_window'

      if(fileLink.indexOf('.png') !=-1 || fileLink.indexOf('.jpeg') !=-1 || fileLink.indexOf('.jpg') !=-1) {
      	a.href = fileLink
      }else {

      	a.href = `https://view.officeapps.live.com/op/view.aspx?src=${fileLink}`
      }

			// let fileLink = this.uploadFileData[0].url
		  //    let event = new MouseEvent('click')
		  //    let a = document.createElement('a')
		  //    a.target = 'view_window'
		  //  	a.href = fileLink
      a.dispatchEvent(event)
    }

		downFile () {
			let fileLink = `${baseHost()}/attaches/download/${this.uploadFileData[0].vkey}?token=${this.userInfo.token}`
      let event = new MouseEvent('click')
      let a = document.createElement('a')
      a.target = 'view_window'
    	a.href = fileLink
      console.log(a.href)
      a.dispatchEvent(event)
    }

		/**
		 * @detail   文件上传成功
		 */
		handleFileSuccess(res) {
	    console.log(res)
	    this.isUpload = true
	    this.uploadFileData = []
	    this.uploadFileData.push(res.data[0])
	    
	    this.fileUpload.progress = 100
	    this.setFilePic(res.data[0].fileName)
	    console.log(this.uploadFileData)
	    this.saveResumeMsg()
		}

		/**
		 * @detail   文件上传之前的处理
		 */
		beforeFileUpload(file) {
			console.log(file)
		  // this.$refs.file.abort()
		  const isLtM = file.size / 1024 / 1024 < 10;
		  if(!isLtM){
		    this.$message.error('上传文件大小不能超过 10MB!');
		  }else {
		  	let isImg = this.typeMatch(this.imgExt,file.name)
		  	if(isImg){
		  		this.fileUpload.params.attach_type = 'img'
		  	}

		  	let isDoc = this.typeMatch(this.docExt,file.name)
		  	if(isDoc){
		  		this.fileUpload.params.attach_type = 'doc'
		  	}

		  	if(!isImg && !isDoc){
		    	this.$message.error('附件简历类型仅支持word、pdf、ppt、txt、wps、jpg、png、pptx、jpeg');
		  		this.$refs.file.abort()
		  	}

		    this.fileUpload.status = 'loading'
		    this.fileUpload.progress = 0
		    this.fileUpload.progressText = '上传中'

		    this.nowLoadUid = file.uid
		    this.fileUpload.infos = file
		    this.fileUpload.show = true
		    this.fileUpload.btnTxt = '重新上传'
		  }

		  return isLtM
		}

		/**
		 * @detail   上传进度
		 */
		uploadFileProcess(event, file, fileList){
		  this.fileUpload.progress = file.percentage.toFixed(0)
		}

		/**
		 * @detail   文件上传失败
		 */
		handleFileError(err, file, fileList) {
			console.log(err)
		  this.fileUpload.status = 'error'
		  this.fileUpload.progress = 0
		  this.fileUpload.progressText = '上传失败'
		  this.fileUpload.btnTxt = '重新上传'
    	this.$message.error(err.msg);
		}

	  handleRemove(file, fileList) {
      console.log(file, fileList);
    }
    handlePreview(file) {
      console.log(file);
    }

    //获取文件名后缀名
    extension (str){
      var ext = null;
      var name = str.toLowerCase();
      var i = name.lastIndexOf(".");
      if(i > -1){
      	var ext = name.substring(i);
      }
      return ext;
    }

    //判断Array中是否包含某个值
    contain(type,obj){
      for(var i=0; i<type.length; i++){
          if(type[i] === obj)
              return true;
      }
      return false;
    }

    setFilePic(fileName){
	    this.filePic =this.getFilePic(this.filePicList,fileName)
		  console.log(this.filePic)
    }

    getFilePic(type, fielname){
    	var ext = this.extension(fielname);

    	if(this.contain(type,ext)){
					ext = ext.substr(1)
    	    return ext;
    	}

    	if(ext === '.pptx') {
    		return 'ppt'
    	}
    	return 'default';
    }

    typeMatch(type, fielname){
      var ext = this.extension(fielname);
      if(this.contain(type,ext)){        
          return true;
      }
      return false;
    }

	}
</script>
<style lang="less">
#apply {
	display: flex;
	justify-content: center;
	align-items: center;	
	flex-direction: column;
	
	.test {
		font-size: 14px;
	}
	.resume_main {
		height: 100vh;
		width: 960px;
		display: flex;
		justify-content: center;
		align-items: center;	
		flex-direction: column;
		&.no_upload {
			flex-direction: row;
		}
		.main_cont {
			width: 460px;
			text-align: left;
			margin-right: 170px;
			.hint {
				font-size:20px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(101,39,145,1);
				line-height:32px;
			}
			.hint2 {
				font-size:16px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(146,146,146,1);
				line-height:28px;
			}
			.upload_btn {
				width: 226px;
				height: 54px;
				background: rgba(101,39,145,1);
				box-shadow: 0px 10px 18px 0px rgba(101,39,145,0.3);
				border-radius: 27px;
				text-align: center;
				font-size:16px;
				font-family:PingFang-SC-Bold;
				font-weight:bold;
				color:rgba(255,255,255,1);
				margin: 64px 0 24px 0;
				border-color: rgba(101,39,145,1);
			}
		}
		.cont_pic {
			width:385px;
			height:304px;
			display: block;
		}
		.file_cont {
			.cont_top {
				.cont_pic2 {
					width:138px;
					height:104px;
				}
				.cont_tit {
					font-size:40px;
					font-family:PingFang-SC-Heavy;
					font-weight:800;
					color:rgba(101,39,145,1);
					line-height:48px;
					margin: 20px 0 15px 0;
				}
				.top_text {
					font-size:20px;
					font-family:SFUIDisplay-Regular;
					font-weight:400;
					color:rgba(146,146,146,1);
					line-height:28px;
				}
			}
			.file_msg {
				margin: 52px auto 116px auto;
				width:772px;
				height:78px;
				background:rgba(255,255,255,1);
				border-radius:4px;
				border:1px solid rgba(239,233,244,1);
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 12px 16px;
				.file_icon {
					width:54px;
					height:54px;
					background:rgba(250,57,57,1);
					border-radius:4px;
					box-sizing: border-box;
					margin-right: 12px;
				}
				.file_center {
					flex: 1;
					text-align: left;
			 		overflow: hidden;
					margin-right: 20px;
					.progress-bar{
					  display: block;
					  position: absolute;
					  left: 0;
					  top: 0;
					  background: #FFDC29;
					  width: 0%;
					  height: 100%;
					  border-radius: 2px;
					  z-index:1;
					}
					.progress {
						flex: 1;
						height: 14px;
						position: relative;
						background: #F5F4F7;
						font-size: 12px;
						text-align: center;
						color: #333;
						span {
							position: relative;
							z-index: 2;
						}
					}

					p {
						font-size:14px;
						font-family:SFUIDisplay-Regular;
						font-weight:400;
						color:rgba(146,146,146,1);
						line-height:22px;
					 	&.file_name {
					 		font-size:14px;
					 		font-family:PingFang-SC-Medium;
					 		font-weight:500;
					 		color:rgba(17,17,17,1);
					 		margin-bottom: 2px;
					 		width: 100%;
					 		text-overflow:ellipsis;
					 		white-space: nowrap;
					 		overflow: hidden;
					 	}
					}
				}
				.file_op {
					display: flex;
					flex-direction: row;
					align-items: center;
					.op_btn {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-right: 30px;

						font-size:12px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:rgba(101,39,145,1);
						line-height:20px;
					}
					.btn_icon {
						width: 16px;
						height: 16px;
						margin-right: 5px;
					}
				}
				
			}

		}
		.upload_hint {
			font-size:16px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(146,146,146,1);
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 24px;
			position: relative;
			span {
				width:16px;
				height:16px;
				line-height:16px;
				background:#CDCBCF;
				font-size: 12px;
				color: #fff;
				display: block;
				margin-left: 5px;
				border-radius: 50%;
			}
			.upload_hint_pop {
				position: absolute;
				left: 50%;
				top: -100px;
				margin: 0px 0 0 -287px;
				width:580px;
				height:80px;
				background:rgba(98,98,98,1);
				box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
				border-radius: 4px;
				text-align: left;
				box-sizing: border-box;
				padding: 8px 16px;
				p {
					font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(255,255,255,1);
					line-height:22px;
					white-space: nowrap;
				}
			}
		}
		.btn_resume {
			display: block;
			width:226px;
			height:54px;
			background:rgba(101,39,145,1);
			border-radius:27px;
			border:1px solid rgba(101,39,145,1);
			font-size:16px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}

	.service {
		font-size:16px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(101,39,145,1);
		line-height:18px;
		position: fixed;
		right: 0;
		width:36px;
		height:120px;
		background:rgba(239,233,244,1);
		border-radius:4px 0px 0px 4px;
		box-sizing: border-box;
		padding: 10px;
		cursor: pointer;
		.service_icon {
			width:16px;
			height:16px;
			margin-bottom: 8px;
		}
		.service_pop {
			width:300px;
			height:440px;
			background:rgba(255,255,255,1);
			box-shadow:0px 8px 12px 0px rgba(48,50,51,0.1);
			border-radius:4px;
			position: absolute;
			left: -320px;
			top: 50%;
			margin-top: -220px;
			.pop_tit {
				width:300px;
				height:58px;
				line-height:58px;
				background:rgba(101,39,145,1);
				border-radius:4px 4px 0px 0px;
				font-size:20px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			.pop_cont {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.pop_code {
					width: 112px;
					height: 112px;
					margin: 48px auto 10px auto;
				}
				.pop_text {
					font-size:20px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(98,98,98,1);
					margin: 48px 0 12px 0;
				}
				.pop_text2 {
					font-size:24px;
					font-family:DINAlternate-Bold;
					font-weight:bold;
					color:rgba(40,40,40,1);
				}
				.pop_text3 {
					font-size:18px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(53,64,72,1);
					margin-bottom: 24px;
				}
				.pop_text4 {
					font-size:14px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(98,98,98,1);
				}
			}
		}
	}

	.triangle_border_right{
    width: 0;
    height: 0;
    border-width:10px 0  10px 14px ;
    border-style: solid;
    border-color: transparent transparent transparent #fff ;
    position: absolute;
    right: -12px;
    top: 50%;
    margin-top: -20px;
	}

	.triangle_border_down{
	    width:0;
	    height:0;
	    border-width:10px 10px 0;
	    border-style:solid;
	    border-color:rgba(98,98,98,1) transparent transparent;/*灰 透明 透明 */
	    position:absolute;
	    bottom: -9px;
	    left: 50%;
	    margin-left: -10px;
	}
}
</style>