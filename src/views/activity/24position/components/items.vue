<template>
  <div class="position-item-wrapper">
    <div class="main-center">
      <div>{{type.name}}</div>
      <div class="position-lists-wrapper">
        <template v-for="position in positions.items">
          <position-card :key="position.id" :item="position"   />
        </template>
      </div>
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
  width: 100%;
  color: #fff
}
.position-lists-wrapper {
  display: flex;
  flex-wrap: wrap;
  .active-list-wrapper:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>
