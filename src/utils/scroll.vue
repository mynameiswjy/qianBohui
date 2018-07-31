<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="wrapper">
      <slot></slot>
    </div>
    <div></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: { //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      type: Boolean,
      default: true
    },
    speed: { // 表示鼠标滚轮滚动的速度，invert 为 true 表示滚轮滚动和时机滚动方向相反，easeTime 表示滚动动画的缓动时长
      type: Number,
      default: 400
    },
    threshold: { // threshold 表示可滚动到下一个的阈值，
      type: Number,
      default: 0.3
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  methods: {
    update() {
      if (this.slider) {
        this.slider.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
    },
    init() {
      clearTimeout(this.timer)
      this.currentPageIndex = 0
      this._setSlideWidth()
      if (this.showDot) {
        this._initDots()
      }
      this._initSlide()

      if (this.autoPlay) {
        this._play()
      }
    },
    _onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    /*_setSlideWidth(isResize) {
      this.children = this.$refs.wrapper.children

      let width = 0
      let slideWidth = this.$refs.slide.clientWidth
      /!*for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slide-item')

        child.style.width = slideWidth + 'px'
        width += slideWidth
      }*!/
      if (this.loop && !isResize) {
        width += 2 * slideWidth
      }
      this.$refs.wrapper.style.width = width + 'px'
    },*/
    _initSlider() {
      if (!this.$refs.slider) {
        return
      }
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: false,
          threshold: this.threshold,
          speed: this.speed
        },
        bounce: false,
        stopPropagation: true,
        click: this.click
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
      /*this.slier.on('touchEnd', () => {
      })
      this.slide.on('beforeScrollStart', () => {
      })*/
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
  },
  watch: {
    loop() {
      this.update()
    },
    autoPlay() {
      this.update()
    },
    speed() {
      this.update()
    },
    threshold() {
      this.update()
    }
  }
}
</script>

<style scoped>
  .slider {
    /*min-height: 1px;*/
  }
  .slider .slider-group{
    /*width: 1250px;*/
    display: flex;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
