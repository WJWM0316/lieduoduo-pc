<template>
  <div>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" v-if="isWheel">
      <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
        <slot></slot>
      </div>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
const padding = 15

export default {
  name: 'scrollPane',
  props: {
    width: {
      type: [Number, String],
      default: 'auto'
    },
    maxWidth: {
      type: Number,
      default: 1200
    }
  },
  data () {
    return {
      left: 0
    }
  },
  computed: {
    isWheel () {
      if (this.width === 'auto') return true
      return this.width > this.maxWidth
    }
  },
  methods: {
    handleScroll (e) {
      // console.log(e)
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(
              this.left + eventDelta,
              $containerWidth - $wrapperWidth - padding
            )
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget ($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if (
        $targetLeft + padding > -this.left &&
        $targetLeft + $targetWidth < -this.left + $containerWidth - padding
      ) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .scroll-wrapper {
    position: absolute;
  }
}
</style>
