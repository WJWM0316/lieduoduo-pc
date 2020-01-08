import { app_qrcode } from 'IMAGES/image'

const JobStatus = [
  { label: '在职-暂不考虑', value: 1 },
  { label: '离职-随时到岗', value: 2 },
  { label: '在职-月内到岗', value: 3 },
  { label: '在职-考虑机会', value: 4 }
]

const Gender = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

const Degree = [
  { label: '初中及以下', value: 5 },
  { label: '中专/中技', value: 10 },
  { label: '高中', value: 15 },
  { label: '大专', value: 20 },
  { label: '本科', value: 25 },
  { label: '硕士', value: 30 },
  { label: '博士', value: 35 }
]

const FileType = {
  pdf: { icon: 'icon-pdf', color: '#FA3939', type: 'pdf', title: 'PDF文件' },
  jpg: { icon: 'icon-jpg', color: '#1CA976', type: 'jpg', title: 'jpg' },
  png: { icon: 'icon-png', color: '#14AEE4', type: 'png', title: 'png' },
  a4: { icon: 'icon-a', color: '#00C4CD', type: 'a4', title: 'a4' },
  doc: { icon: 'icon-word', color: '#4A90E2', type: 'doc', title: 'Word文档' },
  docx: { icon: 'icon-word', color: '#4A90E2', type: 'docx', title: 'Word文档' }
}

// 公司简介
const CompanyIntro = [
  {
    name: '有赞',
    intro: '白鸦是中国最早的用户体验设计师之一，在创立有赞之前，曾担任支付宝首席产品设计师、百度产品设计师，有着丰富的在线支付、企业服务、电子商务、互联网社区、搜索等各互联网领域经验。'
  },
  {
    name: '要出发',
    intro: '丁根芳本、硕、博均毕业于合肥工业大学，获工学博士学位。2000年在校读博期间，创立“给排水在线网”，担任CEO。2004年“给排水在线网”被网易收购，成为“土木工程”事业部，04年至08年期间担任总监，一手打造出中国最大的建筑工程网站。此后两年，热爱创业的丁根芳离开网易，凭借一腔热情，不断的尝试互联网新模式新思路，2010年成功创立要出发周边游。'
  },
  {
    name: '小米',
    intro: '雷军1992年参与创办金山软件，1998年出任金山软件CEO。1999年创办了卓越网。 2007年，金山软件上市后，雷军卸任金山软件总裁兼CEO职务，担任副董事长。 之后几年，雷军作为天使投资人，投资了凡客诚品、多玩、优视科技等多家创新型企业。 2011年7月，雷军重返金山软件，任金山软件公司董事长。 2010年4月6日，雷军选择重新创业，建立了小米公司。'
  },
  {
    name: '字节跳动',
    intro: '创始人兼CEO张一鸣毕业于南开大学软件工程学院；2006年加入旅游信息搜索公司“酷讯”，曾任“酷讯”技术委员会主席；2009年创立房产信息搜索公司“九九房”；2012年创立“字节跳动”公司并担任CEO。张一鸣与今日头条团队的愿景是成为“最懂你的信息平台，连接人与信息，促进创作和交流。”'
  }
]

const GuidedDownload = {
  html: '“Hi，对我发布的职位感兴趣？<strong>用微信扫描二维码</strong>，和我约聊吧~”',
  src: app_qrcode
}

export {
  JobStatus, Gender, Degree, FileType, CompanyIntro, GuidedDownload
}
