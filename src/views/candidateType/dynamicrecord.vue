<template>
    <div class="popforward" v-show="visible">
      <div class="noJobBox">
        <div class="close"><i @click="quxiao()" class="iconfont icon-danchuang-guanbi"></i></div>
        <div class="content">
          <div class="title">转发简历</div>
          <div class="con-l">
            <div class="url-toword">
              <div class="u-title">链接转发</div>
              <div class="u-input">
                {{forwordurl}}
                <div class="url" @click="copy()">复制</div>
              </div>
              <div class="u-desc">可将链接转发给同事，对方即可查看简历</div>
            </div>
            <div class="email-toword">
              <div class="e-title">
                <span class="email">邮件转发</span>
                <span class="add" @click="addemail()">添加</span>
              </div>
              <div class="eachinput" :key="i" v-for="(item, i) in email">
                <input type="text" placeholder="请输入同事邮箱地址" @input="searchEmail" v-model="item.text">
                <div class="del" v-if="i > 0" @click="delect(i)">
                  <i class="iconfont icon-shouqi"></i>
                </div>
                <div class="select">
                  <div class="select-item" @click="selectemail(item)" v-for="item in 10">123456@163.com</div>
                </div>
              </div>
            </div>
            <div class="seed" @click="send()">发送</div>
          </div>
          <div class="con-r">
            <div class="code">
              <div class="code-title">微信转发</div>
              <div class="code-desc">扫一扫，转发给同事</div>
              <div class="code-qr">
                <img :src="imagesurl" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { generateUrl } from 'API/candidateType'
const debounce = (() => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  props: {
    visible: Boolean,
    info: Object,
    imagesurl: String
  },
  data () {
    return {
      email: [{ text: '' }],
      forwordurl: ''
    }
  },
  computed: {
  },
  watch: {
    'info': function (n) {
      let data = { uid: this.info.uid }
      generateUrl(data).then((res) => {
        this.forwordurl = res.data.data.url
      })
    }
  },
  mounted () {
  },
  methods: {
    quxiao () {
      this.$emit('clickcancel', this.visible)
    },
    addemail () {
      this.email.push({ text: '' })
    },
    selectemail (data) {
      console.log(data)
    },
    // 失去焦点搜索公司
    searchEmail (e) {
      debounce(() => {
        // const name = e.target.value
        // this.companyform.company_name = name
        // this.companyform.company_name && this.getCompanyNameList()
      }, 1000)
    },
    delect (i) {
      this.email.splice(i, 1)
    },
    copy () {
      this.copyStringToClipboard(this.forwordurl)
      this.$message('复制成功')
    },
    send () {
      console.log('发送')
    },
    copyStringToClipboard (str) {
      var el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
    closeMsg (event) {
      if (event.target.className === 'popforward') {
        this.visible = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popforward{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background:rgba(0,0,0,0.6);
  .noJobBox {
    width:612px;
    // max-height:392px;
    padding-bottom: 32px;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 14px 2px rgba(0,0,0,0.2);
    border-radius:8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .close{
      width: 100%;
      position: relative;
      i{
        font-size: 10px;
        color: #BCBCBC;
        margin-top: 16px;
        position: absolute;
        right: 16px;
        transform: scale(0.8);
      }
    }
  }
  .content{
    padding: 0 68px 0 40px;
    .title{
      height: 24px;
      line-height: 24px;
      color: #000000;
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 30px;
      font-weight: bold;
    }
    .con-l{
      width: 326px;
      float: left;
    }
    .url-toword{
      width: 100%;
      .u-title{
        font-size:14px;
        color: #333333;
        height: 20px;
        line-height: 20px;
        margin-bottom:10px;
      }
      .u-input{
        width:310px;
        height:38px;
        line-height: 38px;
        font-size: 14px;
        color: #282828;
        overflow: hidden;
        margin-bottom:10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: relative;
        padding-left: 14px;
        border:1px solid rgba(222,218,224,1);
        .url{
          position: absolute;
          right: -1px;
          top: -1px;
          width:74px;
          line-height: 40px;
          height:40px;
          font-size: 14px;
          text-align: center;
          color: #fff;
          background:rgba(101,39,145,1);
          border-radius:0px 4px 4px 0px;
        }
      }
      .u-desc{
        font-size: 12px;
        color: #A29CA6;
        margin-bottom: 42px;
      }
    }
    .email-toword{
      width: 100%;
      .e-title{
        font-size: 14px;
        height: 20px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 10px;
        .email{
          float: left;
        }
        .add{
          float: right;
          font-size: 12px;
          color: #652791;
          cursor: pointer;
        }
      }
      .eachinput{
        width:310px;
        height:38px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding-left: 14px;
        margin-bottom: 10px;
        color: #282828;
        position: relative;
        border:1px solid rgba(222,218,224,1);
        input{
          line-height: 38px;
          &::placeholder{
            color: #A29CA6;
            font-size: 14px;
          }
        }
        .del{
          position: absolute;
          width: 12px;
          height: 12px;
          right: 12px;
          cursor: pointer;
          top: 14px;
          i{
            font-size: 12px;
            color: #ED5C5C;
            vertical-align: super;
          }
        }
        .select{
          position: absolute;
          top: 41px;
          left: 0px;
          padding-top: 6px;
          width:326px;
          height:140px;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 30px 0px rgba(22,39,77,0.07);
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-track {
            background:#fff;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:3px;
            height: 226px;
          }
          &::-webkit-scrollbar-thumb {
            background:#EBEBEB;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius:3px;
          }
          .select-item{
            height: 32px;
            line-height: 32px;
            padding-left: 13px;
            color: #606266;
            &:hover{
              color:#652791;
              font-weight: bold;
              font-size: 14px;
              background:#EFE9F4;
            }
          }
        }
      }
    }
    .seed{
      width:116px;
      height:32px;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
      margin-left: 1px;
      text-align: center;
      background:rgba(101,39,145,1);
      border-radius:4px;
      margin-top: 30px;
      cursor: pointer;
    }
    .con-r{
      float: right;
      width: 108px;
      .code{
        width: 100%;
        .code-title{
          color: #333333;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .code-desc{
          color: #42334D;
          font-size:12px;
        }
        .code-qr{
          width:108px;
          height:108px;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 34px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.clearfix::after{
  content:"";
  height: 0;
  line-height: 0;
  display: block;
  visibility: none;
  clear: both;
}
</style>
