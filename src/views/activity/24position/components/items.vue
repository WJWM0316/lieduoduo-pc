<template>
  <div class="position-item-wrapper">
    <div class="position-header">
      <div class="header-24h-image"></div>
      <div class="header-24h-title">{{type.name}}</div>
      <p class="header-24h-desc">【 {{type.haveRecentRapidlyDesc}} 】</p>
    </div>
    <div class="position-lists-wrapper">
      <template v-for="position in positions.items">
        <position-card :key="position.id" :item="position"   />
      </template>
    </div>
  </div>
</template>
<script>
import PositionCard from '@/components/common/positionItem/24h'
export default {
  components: { PositionCard },
  props: {
    type: {
      type: Object,
      default: () => ({})
    },
    positions: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>

.position-item-wrapper {
  padding-top: 80px;
  width: 100%;
  color: #fff;
}
.position-header {
  text-align: center;
  margin-bottom: 18px;
}
.header-24h-title {
  display: inline-block;
  padding: 11px 52px 11px 62px;
  border-radius: 0px 22px 22px 0px;
  color: #fff;
  font-weight: bold;
  font-size: 21px;
  display: inline-block;
  vertical-align: bottom;
}
.header-24h-image {
  width: 85px;
  height: 62px;
  // padding: 6px 6px 0;
  // border-radius: 50%;
  margin-right: -35px;
  position: relative;
  z-index: 2;
  border-bottom-right-radius: 43px;
  background-color: #0B1538;
  display: inline-block;
  vertical-align: bottom;
  background-repeat: no-repeat;
  background-size: auto 100%;
}
.header-24h-desc {
  line-height: 22px;
  padding: 20px 0;
  font-size: 16px;
}
.position-lists-wrapper {
  display: flex;
  flex-wrap: wrap;
  .active-list-wrapper:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>
