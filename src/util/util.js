/**
 * 工具函数类
 */
import moment from 'moment'
/* eslint-disable */
class Util {

  /**
   * 设置页面链接query参数
   * @param {*} key
   * @param {*} value
   * @param {*} replace 是否使用replace替换路由
   */
  setPathQuery(key, value, replace = false) {
    // 如果传入单个对象，则拆分
    if (key instanceof Object && !(key instanceof Array)) {
      for (let [k, v] of Object.entries(key)) {
        this.setPathQuery(k, v)
      }
      return
    }
    const path = this.$route.path
    const query = Object.assign({}, this.$route.query)
    if (value || value === 0) {
      if (value instanceof Array) {
        // 如果是数组，则用逗号拼装
        query[key] = value.join(',')
      } else if (value instanceof Object) {
        // 如果是对象，则转换成字符串
        query[key] = JSON.stringify(value)
      } else {
        query[key] = value
      }
    } else {
      delete query[key]
    }

    if (!query[key] && value !== 0) {
      delete query[key]
    }

    // 替换新路由
    const newRoute = {
      path,
      query
    }
    query.q= Date.now()
    if (replace) {
      this.$router.replace(newRoute)
    } else {
      this.$router.push(newRoute)
    }
  }

  /**
   * 过滤请求参数
   * @param {Object} params
   * @return {Object}
   */
  filterParams(params) {
    if (!(params instanceof Object) || params instanceof Array) {
      return params
    }

    const result = {}
    for (let [key, value] of Object.entries(params)) {
      // 空数组、空对象、非0的空值，跳过赋值
      if ((value instanceof Array && value.length <= 0) ||
        (value instanceof Object && Object.keys(value).length <= 0) ||
        (value !== 0 && !value)) {
        continue
      }

      result[key] = value
    }

    return result
  }

  downFile(content, filename) {
    if(window.navigator.msSaveBlob){
      // for ie 10 and later
      try{
        var blobObject = new Blob([content]); 
        window.navigator.msSaveBlob(blobObject, filename); 
      }
      catch(e){
        alert('当前浏览器不支持下载功能')
      }
    }else {
      var eleLink = document.createElement('a')
      eleLink.download = filename
      eleLink.style.display = 'none'
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob)
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    }
  }
  /**
   * 根据键值从源对象中抽取对象
   * @param {Object} source 源对象
   * @param {Array} keys 键值数组
   * @param {Object} keyOptions 键值转换对象
   */
  getObjectByKeys(source, keys, keyOptions = {}) {
    const obj = {}
    for (let [key, value] of Object.entries(source)) {
      if (keys.indexOf(key) > -1) {
        const objKey = keyOptions[key] ? keyOptions[key] : key
        obj[objKey] = value
      }
    }

    return obj
  }

  // 获取cookie
  getcookie(name) {
    const arr = document.cookie.match(new RegExp('[sS]*' + name + '=([^;]*)'))
    if (arr !== null)
      return unescape(arr[1])
    return null
  }

  /**
   * 改变数组某项索引（直接修改源数组）
   * @param {Array} array 操作数组
   * @param {Number} index 修改索引的目标项索引
   * @param {Number} targetIndex 目标索引
   * @return {Array} 返回结果数组
   */
  changeArrayItemIndex(array, index, targetIndex) {
    const items = array.splice(index, 1)
    array.splice(targetIndex, 0, ...items)
    return array
  }

  /**
   * 判断是否是绝对url路径
   * @param {String} url
   */
  isAbsoulteURL(url) {
    const reg = /^(https?:\/\/)/
    return reg.test(url)
  }

  /**
   * 列表页从url query获取初始数据
   * @param {*} source 初始表单对象(用于判断是否赋值)
   * @param {*} queryParams url query对象
   * @param {*} types 需要强制转换的类型对象，如 { title: 'string' }
   */
  getListInitDataByQueryParams(source = {}, queryParams = {}, types = {}) {
    const form = {}
    const pagination = {}
    for (let [key, value] of Object.entries(queryParams)) {
      if (!/(page|pageSize)/.test(key)) {
        if (typeof source[key] === 'undefined') {
          continue
        }

        if (types[key]) {
          // 如果存在强制类型转换
          switch (types[key]) {
            case 'string':
              form[key] = value.toString()
              break
            case 'number':
              form[key] = parseFloat(value)
              break
            case 'array':
              form[key] = value.split(',')
              break
            case 'object':
              form[key] = JSON.parse(value)
              break
            default:
              form[key] = value
          }
        } else {
          // 如果没有强制类型转换就采用默认的类型转换
          if (Number(value)) {
            form[key] = parseFloat(value)
          } else if (source[key] instanceof Array) {
            form[key] = value.split(',')
          } else if (source[key] instanceof Object) {
            form[key] = JSON.parse(value)
          } else {
            form[key] = value
          }
        }
      } else {
        pagination[key] = parseInt(value)
      }
    }

    return {
      form,
      pagination
    }
  }

  /**
   * 换行符转换br标签
   * @param reverse 是否反向转换（将br标签转换成换行符），默认false
   */
  transformBlank(source, reverse = false) {
    if (!source) {
      return ''
    }

    source = source.toString()
    return reverse ?
      source.replace(/<br\s*\/?>/g, '\n').replace(/&nbsp;/g, ' ') :
      source.replace(/\n\s*\r/g, '<br/>').replace(/\n/g, '<br/>').replace(/\r/g, '<br/>').replace(/\s/g, '&nbsp;')
  }

  /**
   * 保留小数点后n位
   * @param {Number} num
   * @param {*} fractionDigits 位数
   * @param {*} type 保留值类型：round=>四舍五入，ceil=>往上增，floor=>直接截取
   */
  toFixed(num, fractionDigits, type = 'round') {
    if (typeof num !== 'number') {
      return
    }
    const offsets = {
      round: 0.5,
      ceil: 0.9,
      floor: 0.1
    }
    return parseInt(num * Math.pow(10, fractionDigits) + offsets[type]) / Math.pow(10, fractionDigits)
  }

  // 获取指定Url参数
  getUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  }
  /**
   * @desc 获取距离结束时间的 天数，小时，分钟，秒
   * @param {String Date} endDateStr 结束时间
   * @returns {Object}
   */
  setTimeDown(endDateStr) {
    if (endDateStr) endDateStr = endDateStr.replace(/-/g, '/')
    //结束时间
    var endDate = new Date(endDateStr)
    //当前时间
    var nowDate = new Date()
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    if (!totalSeconds || totalSeconds <= 0) {
      return {
        days: 0,
        hours: '00',
        mins: '00',
        seconds: '00'
      }
    }
    //天数
    var days = Math.floor(totalSeconds / (60 * 60 * 24));
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    return {
      days: days > 9 || days <= 0 ? days : '0' + days,
      hours: hours > 9 ? hours : '0' + hours,
      mins: minutes > 9 ? minutes : '0' + minutes,
      seconds: seconds > 9 ? seconds : '0' + seconds
    }
  }
  /**
   * @desc dom 滚动到可见区域
   * @param {HTMLDivElement} dom节点
   * @returns -
   */
  scrollToView (dom) {
    if (dom) {
      const domBounding = dom.getBoundingClientRect()
      const { top } = domBounding
      if (top === 0) return
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let to = top + scrollTop
      let duration = 500
      const s = Math.abs(scrollTop - to)
      const v = Math.ceil((s / duration) * 50)
      // eslint-disable-next-line no-inner-declarations
      function scroll (start, end, step) {
        if (start === end) return
        // console.log(start, end)
        let d = start + step > end ? end : start + step
        if (start > end) {
          d = start - step < end ? end : start - step
        }
        window.scrollTo(0, d)
        window.requestAnimationFrame(() => scroll(d, end, step))
      }
      scroll(scrollTop, to, v)
      /* window.scrollTo({
        top: end, // 滚动终点y的位置
        left: 0, // 滚动终点x的位置
        behavior: 'smooth' // 平滑滚动
      }) */
    }
  }
}

export default new Util()