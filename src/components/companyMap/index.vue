<template>
  <div>
    <el-dialog :visible="visible" custom-class="bpp-dialog" width = "662px" :before-close="handleClose" modal-append-to-body append-to-body>
      <template slot="title">
        <p class="address-text">
          <i class="iconfont icon-dizhi"></i>
          <span v-if="visible && activeName !== ''">{{ companyAddress[activeName].address }} {{ companyAddress[activeName].doorplate }}</span>
        </p>
      </template>
      <div id="map" v-if="visible" style="width: 662px; height: 450px; border-radius: 0 0 8px 8px"></div>
    </el-dialog>
  </div>
</template>
<script>
import { TMap } from '@/util/TMap.js'
export default {
  props: {
    companyAddress: {
      type: Array,
      default: () => ([])
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: 0
    }
  },
  watch: {
    'visible': function (n) {
      if (n) {
        this.addressAlert()
      }
    }
  },
  methods: {
    addressAlert () {
      this.$nextTick(() => {
        this.getMapLocation(this.companyAddress[this.activeName].lat, this.companyAddress[this.activeName].lng)
      })
    },
    handleClose () {
      this.$emit('closedialog', this.visible)
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

<style lang="scss">
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
.mapImg{
  cursor: pointer;
}

.el-dialog__wrapper .bpp-dialog.el-dialog{
  border-radius: 8px;
  .el-dialog__header{
    font-size: 14px;
    padding: 0;
    line-height: 50px;
    height: 50px;
    color: $border-color-7;
    .el-dialog__headerbtn{
      font-size: 20px;
      position: absolute;
      top: 14px;
    }
  }
  .el-dialog__body {
    padding: 0px;
  }
}
</style>
