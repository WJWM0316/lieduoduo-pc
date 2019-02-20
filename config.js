/**
 * 配置的文件
 */
import util from './src/util/util'
let urlIdentity = util.getUrlParam('identity')
let isTest = true
let identity = urlIdentity.length>0?urlIdentity:'qiuzhi'   //  zhaopin  or  qiuzhi
//export const baseHost = isTest?`https://${identity}-api.lieduoduo.ziwork.com`: `https://${identity}-api.lieduoduo.com` 

export const baseHost = function(){
	let url = `https://${identity}`
	return isTest?`${url}-api.lieduoduo.ziwork.com`: `${url}-api.lieduoduo.com` 
}

export const switchId = function(){
	identity = identity === 'zhaopin' ? 'qiuzhi' : 'zhaopin'
	console.log(identity)
	return identity
}

export const getUserIdentity = function(){
	 return identity
}
