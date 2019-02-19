/**
 * 配置的文件
 */
import util from './src/util/util'
let urlIdentity = util.getUrlParam('identity')
let isTest = true
let identity = urlIdentity.length>0?urlIdentity:'zhaopin'   //  zhaopin  or  jobhunter
let domain = identity === 'jobhunter' ? 'qiuzhi' : 'zhaopin'

console.log('config-urlIdentity',urlIdentity)
//export const baseHost = isTest?`https://${domain}-api.lieduoduo.ziwork.com`: `https://${domain}-api.lieduoduo.com` 

export const baseHost = function(){
	let url = `https://${identity === 'jobhunter' ? 'qiuzhi' : 'zhaopin'}`
	console.log(url)
	return isTest?`${url}-api.lieduoduo.ziwork.com`: `${url}-api.lieduoduo.com` 
}

export const switchId = function(){
	identity = identity === 'zhaopin' ? 'jobhunter' : 'zhaopin'
	console.log(identity)
	return identity
}

export const getUserIdentity = function(){
	 return identity
}
