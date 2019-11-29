<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in companyAddress.address" :key="index" :title="item.address" :name="index">
        <template slot="title">
          <p class="address-text">
            <i class="iconfont icon-dizhi"></i>
            <span>{{ item.address }}</span>
          </p>
        </template>
        <img v-if="item.lat" :src="'https://apis.map.qq.com/ws/staticmap/v2/?size=750*147&center=' + item.lat + ',' + item.lng + '&zoom=15&key=TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG&maptype=roadmap&markers=size:large|color:blue|'+ item.lat + ',' + item.lng" @click="addressAlert"/>
      </el-collapse-item>
    </el-collapse>

    <el-dialog :visible.sync="dialogVisible" custom-class="bpp-dialog" width = "662px" modal-append-to-body append-to-body>
      <template slot="title">
        <p class="address-text">
          <i class="iconfont icon-dizhi"></i>
          <span v-if="dialogVisible && activeName !== ''">{{ companyInformation.address[activeName].address }}</span>
        </p>
      </template>
      <div id="map" v-if="dialogVisible" style="width: 662px; height: 450px;"></div>
    </el-dialog>
  </div>
</template>
<script>
import { TMap } from '@/util/TMap.js'
export default {
  props: {
    companyAddress: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      dialogVisible: false // 地图弹窗
    }
  },
  methods: {
    addressAlert () {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.getMapLocation(this.companyInformation.address[this.activeName].lat, this.companyInformation.address[this.activeName].lng)
      })
    },
    getMapLocation (lat, lng) {
      TMap('TMZBZ-S72K6-66ISB-ES3XG-CVJC6-HKFZG').then(qq => {
        this.$nextTick(() => {
          var myLatlng = new qq.maps.LatLng(lat, lng)
          var myOptions = {
            zoom: 15,
            center: myLatlng
          }
          var map = new qq.maps.Map(document.getElementById('map'), myOptions)
          var marker = new qq.maps.Marker({
            position: myLatlng,
            animation: qq.maps.MarkerAnimation.DROP,
            map: map
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-text{
  font-size: 14px;
  color: $font-color-2;
  font-weight:400;
  i{
    font-size: 15px;
    color: $font-color-10;
    display: inline-block;
    margin: 0 7px 0 15px;
  }
}
</style>
