/**
 * 配置的文件
 */
import util from './src/util/util'

let isTest = process.env.VUE_APP_ENV === 'development' ? true : false    // 是否测试

let identity = 'qiuzhi'   // 身份 zhaopin  or  qiuzhi
// 接口域名
export const baseHost = function(){
	let url = `https://${identity}`
	return isTest ?`${url}-api.lieduoduo.ziwork.com`: `${url}-api.lieduoduo.com` 
}

// 域名
export const baseUrl = function(){
	return isTest ?`http://www.lieduoduo.ziwork.com`: `https://lieduoduo.com` 
}

// 改变身份
export const switchId = function(type){
	if(type){
		identity = type
	}else {
		identity = identity === 'zhaopin' ? 'qiuzhi' : 'zhaopin'
	}
	return identity
}

// 获取身份
export const getUserIdentity = function(){
	 return identity
}

// 改变域名
export const changeBaseHost = function(type){
	if(type === 1){
		return isTest ? `https://pub-api.lieduoduo.ziwork.com`: `https://pub-api.lieduoduo.com`
	}
}