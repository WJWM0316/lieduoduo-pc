// 全局指令配置
import Vue from 'vue'
export const Direct = {
  onresize (doc, binding, vnode) {
    window.onresize = () => {
    }
  },
  data: [
    {
      name: 'dialogCent',
      update: (el, binding, vnode) => {
        let d = document.body.offsetHeight / 2
        setTimeout(() => {
          let _w = document.body.offsetWidth / 2
          let _t = el.offsetWidth / 2
          el.style.marginTop = d - 20 + 'px'
          el.style.marginLeft = parseInt(_w) - parseInt(_t) + 'px'
        })
      }
    }, {
      name: 'duration',
      update: (el, binding, vnode) => {
        el.style.width = binding.value.length * binding.arg + 'px'
      }
    }, {
      name: 'focus',
      update: (el, binding, vnode) => {
        el.focus()
      }
    }, {
      name: 'scroll',
      update: (el, binding, vnode) => {
        window.addEventListener('scroll', function () {
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          if (scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            let loadData = binding.value
            loadData()
          }
        })
      }
    }
  ],
  use: (arr, v) => {
    for (var i in arr.data) {
      v.directive(arr.data[i].name, arr.data[i].update)
    }
  }
}

export default Direct.use(Direct, Vue)

