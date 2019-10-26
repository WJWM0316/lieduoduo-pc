class timePocessor {
	constructor(timer) {
		this.timer = null // 定时器变量
	}
	restTime (date) { // 剩余时间戳 转化具体数据
		let restTime = (new Date(date).getTime() - new Date().getTime()) / 1000,
				day 		 = parseInt(restTime / (3600 * 24)),
				hour     = parseInt((restTime - day * 3600 * 24) / 3600),
				minute	 = parseInt((restTime - day * 3600 * 24 - hour * 3600) / 60),
				second   = parseInt(restTime - day * 3600 * 24 - hour * 3600 - minute * 60)
		if (hour < 10) hour = `0${hour}`
		if (minute < 10) minute = `0${minute}`
		if (second < 10) second = `0${second}`
		return {
			day,
			hour,
			minute,
			second
		}
	}
	countDown (time) {
    clearTimeout(this.timer)
    return new Promise((resolve, reject) => {
	    this.timer= setTimeout(() => {
	      let day = parseInt(time.day),
	        hour = parseInt(time.hour),
	        minute = parseInt(time.minute),
	        second = parseInt(time.second)
	      if (second || minute|| hour || day) {
	        second--
	        if ((day || hour || minute) && second < 0) {
	          second = 60
	          minute--
	          if ((day || hour) && minute < 0) {
	            minute = 59
	            hour--
	            if (day && hour < 0) {
	              hour = 23
	              day--
	              if (day < 0) day = 0
	            }
	          }
	        }
	      }
	      
	      time.day = day >= 10 ? day : '0' + day
	      time.hour = hour >= 10 ? hour : '0' + hour
	      time.minute = minute >= 10 ? minute : '0' + minute
	      time.second = second >= 10 ? second : '0' + second
	      resolve(time)
	      if (!second && !minute && !hour && !day) {
	        clearInterval(this.timer)
	        console.log('倒计时结束')
	        return
	      } else {
	        this.countDown(time)
	      }
	    }, 1000)
    })
  }
}
export default new timePocessor()