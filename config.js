/**
 * 配置的文件
 */
import util from './src/util/util'

let isTest = true    // 是否测试
let identity = 'qiuzhi'   // 身份 zhaopin  or  qiuzhi

export const baseHost = function(){
	let url = `https://${identity}`
	return isTest?`${url}-api.lieduoduo.ziwork.com`: `${url}-api.lieduoduo.com` 
}

export const switchId = function(type){
	if(type){
		identity = type
	}else {
		identity = identity === 'zhaopin' ? 'qiuzhi' : 'zhaopin'
	}
	console.log(identity)
	return identity
}

export const getUserIdentity = function(){
	 return identity
}
