<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <img src="../../assets/images/logo_white.png" class="avatar">
        </div>
        <ul>
          
          <li
            v-for="(item, index) in routes"
            v-if="item.meta && item.meta.useNav"
            :class="{'active' : $route.name === item.name}"  :key="`item.name`+index"
           >  
              <router-link :to="{ name: item.name}" class="a_warp">
               <div class="side_icon" v-if="item.name==='candidate'">
                 <img src="../../assets/images/candidate_sel.png" v-if="$route.name === item.name"  />
                 <img src="../../assets/images/candidate.png" v-else />
               </div>
               <div class="side_icon" v-if="item.name==='recruiterIndex'">
                 <img src="../../assets/images/position_sel.png" v-if="$route.name === item.name"  />
                 <img src="../../assets/images/position.png" v-else />
               </div>
               {{ item.title }}
             </router-link>
          </li>
        </ul>

        <div class="companyMsg">
          <div class="msgText">全国咨询热线</div>
          <div class="msgText">400-065-5788</div>
        </div>
      </div>
    </section>
  </aside>
</template>
<script>
import PageAsise from './index'
export default PageAsise
</script>
<style lang="less" scoped>
@import './index.less';
</style>