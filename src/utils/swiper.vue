<template>
    <div>
      <div class="swiper_wrap" ref="swiperWrap" style="width: 100%;">
        <div class="swiper_content">
          <div v-for="(item, index) in images" :key="index" class="swiper_item">
            <img :src="item.img" alt="">
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  name: 'swiper',
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      images: [
        {img: 'https://www.chqbh.com/imgFile/20181014165937.jpg'},
        {img: 'https://www.chqbh.com/imgFile/20181014165937.jpg'},
        {img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'}
      ],
      swiper: null,
      currentIdx: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.initSwiper()
      this.getCurrent()
    }, 20)
  },
  methods: {
    initSwiper() {
      this.swiper = new BScroll(this.$refs.swiperWrap, {
        scrollX: true,
        cilck: true,
        freeScroll: true,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 100
        },
        easing: {
          style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fn: function(t) {
            return t * (2 - t)
          }
        }
      })
    },
    getCurrent() {
      this.swiper.on('scrollEnd', () => {
        let page = this.swiper.getCurrentPage().pageX
        this.currentIdx = page
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this.play()
        }
      })
    },
    play() {
      let idx = this.currentIdx + 1
      let sliderWidth = this.$refs.swiperWrap.clientWidth
      if (idx === 2) {
        idx = 0
      }
      this.timer = setInterval(() => {
        this.swiper.scrollTo(-sliderWidth, 0, 500)
      }, 500)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper_wrap
    min-height 1px
    position relative
    height: 3.41rem
    overflow hidden
    .swiper_content
      display flex
      /*width: 7.5rem*/
      position absolute
      .swiper_item
        width: 7.5rem
        height: 3.41rem
        img
          width 7.5rem
          height 3.41rem
</style>
