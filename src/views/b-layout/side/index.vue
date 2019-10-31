<template>
  <aside class="page-aside">
    <section>
      <div class="logo">
        <img src="../../../assets/images/logo_white.png" class="avatar">
      </div>
      <ul class="aside-nav">
        <template v-for="(item, index) in routes">
          <router-link
            tag="li"
            :to="{ path: item.path}"
            v-if="item.meta && item.meta.useNav"
            :key="index">
            <i :class="item.meta.icon"></i>
            <span>{{ item.title }}</span>
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
  background: $page-b-bg-color;
  color: #fff;
  height: 100vh;
  float: left;
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
    cursor: pointer;
    line-height: 58px;
    i {
      padding-right: 12px;
    }
    i,span {
      vertical-align: middle;
    }
  }
  li:hover {
    color: #fff;
  }
  li.router-link-active{
    background: #544362;
    color: #fff;
  }
  li.router-link-active::before {
    background: #ffdc29;
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
    border-color: transparent transparent transparent #ffe266;
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
