<template>
  <router-view />
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getUserInfosApi } from '@/api/auth.js'
import { getUserRoleInfoApi } from '@/api/auth'
import { getAccessToken } from 'API/cacheService'
import { perfectauthDetail } from 'API/common'
@Component({
  name: 'APP'
})
export default class APP extends Vue {
  getUserInfo () {
    getUserInfosApi().then(res => {
      this.$store.commit('SETLOGIN', 1)
      this.$store.commit('setUserInfo', res.data.data)
      this.getUserRoleInfo()
    }).catch(e => {
      this.$store.commit('SETLOGIN', 0)
      // 移除数据|退出登陆
      this.$store.commit('LOGOUT')
    })
  }
  getUserRoleInfo () {
    getUserRoleInfoApi().then(res => {
      if (res.data.data.isJobhunter) {
        this.$store.dispatch('getMyResume')
      }
      if (res.data.data.isRecruiter) {
        perfectauthDetail().then((res) => {
          this.$store.commit('setRecruiterinfo', res.data.data)
        })
      }
      this.$store.commit('setRoleInfos', res.data.data)
    })
  }
  created () {
    if (getAccessToken()) {
      this.getUserInfo()
    }
  }
}
</script>
<style lang="scss">
// common  css
@import './assets/css/index.css';
@import './assets/scss/common.scss';
@import './assets/scss/button.scss';
@import './eleui/element.reset.scss';

#app, .c-app {
  color: #2c3e50;
  background: $bg-color-1;
}
body, html{
  height: 100%;
  background: #F8FAFA;
}
.hidden {
  display: none;
}

.textEllipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
