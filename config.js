/**
 * 配置的文件
 */

var isTest = true
var identity = 'jobhunter'   //  zhaopin  or  jobhunter
var domain = identity === 'jobhunter' ? 'qiuzhi' : 'zhaopin'
//var baseHost = isTest?`https://${domain}-api.lieduoduo.ziwork.com`: `https://${domain}-api.lieduoduo.zike.com` 
export const baseHost = isTest?`https://${domain}-api.lieduoduo.ziwork.com`: `https://${domain}-api.lieduoduo.com` 

