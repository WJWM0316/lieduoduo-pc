<template>
  <aside class="page-aside">
    <section>
      <div class="logo">
        <img src="../../../assets/images/logo.png" class="avatar">
      </div>
      <ul class="aside-nav">
        <template v-for="(item, index) in routes">
          <router-link
            tag="li"
            :to="{ path: item.path}"
            v-if="item.meta && item.meta.useNav"
            :key="index">
            <i :class="[item.meta.icon, item.title === '面试日程' ? 'kk' : '']"></i>
            <span>{{ item.title }}</span>
            <el-badge class="page-badge"
            v-if="item.title === '候选人库' || item.title === '面试日程'"
            :value="item.title === '候选人库' ? recruiterIntentionList + recruiterInviteList : recruiterScheduleList"
            :hidden="item.title === '候选人库' ? (recruiterIntentionList + recruiterInviteList) === 0 : recruiterScheduleList === 0">
            </el-badge>
          </router-link>
        </template>
      </ul>
      <div class="company-msg">
        <p>全国咨询热线</p>
        <p>400-065-5788</p>
      </div>
    </section>
  </aside>
</template>
<script>
import PageAsise from './index'
export default PageAsise
</script>
<style lang="scss" scoped>
$logo-wrapper-height: 160px;
$company-msg-height: 60px;
.page-aside {
  width: $page-b-side-width;
  background: $bg-color-2;
  color: #fff;
  z-index: 10;
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.logo {
  height: $logo-wrapper-height;
  width: $page-b-side-width;
  text-align: center;
  display:table-cell;
   vertical-align:middle;
  img {
    width: 90px;
    max-height: 100%;
  }
}
.aside-nav {
  height: calc(100vh - #{$logo-wrapper-height} - #{$company-msg-height});
  overflow: auto;
  width: 100%;
  li {
    height: 58px;
    position: relative;
    width: 100%;
    padding-left: 40px;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 58px;
    i {
      padding-right: 12px;
    }
    i,span {
      vertical-align: middle;
    }
    .kk{
      font-size: 12px;
    }
  }
  li:hover {
    color: #fff;
  }
  li.router-link-active{
    background: $bg-color-3;
    color: #fff;
  }
  li.router-link-active::before {
    background: #00C4CD;
    content: "";
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    height: 100%;
    width: 4px;
  }
  li.router-link-active::after{
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #00C4CD;
    display: block;
    content: "";
  }
}
.company-msg {
  text-align: center;
  p {
    margin-top: 8px;
  }
}
</style>
<style>
  .page-badge sup{
    border: 0;
    top: -1px;
    margin-left: 4px;
  }
</style>
