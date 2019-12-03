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
export {
  JobStatus, Gender, Degree, FileType
}
