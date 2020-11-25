<template>
    <div>
      <div class="swiper_wrap" ref="swiperWrap" style="width: 100%;">
        <div class="swiper_content">
          <slot></slot>
        </div>
        <div class="doc">
          <div v-show="len > 1" class="doc_item" :class="{'active_doc_item': index == currentIdx}" v-for="(item, index) in len" :key="index"></div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'swiper',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    len: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      swiper: null,
      currentIdx: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.initSwiper()
      if (this.autoPlay) {
        this.play()
      }
    }, 20)
  },
  activated() {
    if (this.autoPlay) {
      this.play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    initSwiper() {
      this.swiper = new BScroll(this.$refs.swiperWrap, {
        scrollX: true,
        scrollY: false,
        click: true,
        freeScroll: true,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.swiper.on('scrollEnd', (e) => {
        let page = this.swiper.getCurrentPage().pageX
        this.currentIdx = page
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this.play()
        }
      })
      this.swiper.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    play() {
      this.timer = setTimeout(() => {
        this.swiper.next()
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper_wrap
    min-height 1px
    position relative
    height: 3.45rem
    overflow hidden
    .swiper_content
      display flex
      /*width: 7.5rem*/
      position absolute
      .swiper_item
        width: 6.9rem
        height: 3.45rem
        background-color #eee
        margin 0 0.3rem
        img
          width 6.9rem
          height 3.45rem
          border-radius 0.2rem
    .doc
      position absolute
      bottom 0.2rem
      transform translateX(-50%)
      left 50%
      display flex
      .doc_item
        width 0.25rem
        height 0.25rem
        background-color: #969696
        border-radius 18px
        margin 0 0.1rem
      .active_doc_item
        background-color: #f4bb43
</style>
