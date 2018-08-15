<template>
  <div class="slider" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  name: "slider",
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: { //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      type: Boolean,
      default: true
    },
    /*speed: { // 表示鼠标滚轮滚动的速度，invert 为 true 表示滚轮滚动和时机滚动方向相反，easeTime 表示滚动动画的缓动时长
      type: Number,
      default: 400
    },
    threshold: { // threshold 表示可滚动到下一个的阈值，
      type: Number,
      default: 0.3
    },*/
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this._initSlider()
      // this._initSliderWidth()
      console.log(this.slider)
    }, 20)
  },
  methods: {
    _initSlider() {
      if (!this.$refs.wrapper) {
        return
      }
      this.slider = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true, // 这个click 可能会在移动端出现点击的问题 因为它禁掉了 浏览器的默认行为 可以修改为false试一下
        freeScroll: true,
        eventPassthrough: 'vertical',
        /*snap: {
          loop: false, //loop 为 true 是为了支持循环轮播
          threshold: this.threshold, // 表示可滚动到下一个的阈值，easing 表示滚动的缓动函数
          speed: this.speed
        },*/
        probeType: 3,
      })
      this.slider.on('scrollEnd', (pos) => {
      })
      console.log(this.slider)
    },
    refresh() {
      this.slider && this.slider.refrech()
    },
    _initSliderWidth() {
      this.slider.on('touchstart', () => {
        this.refrech()
      })
      this.slider.on('touchEnd', (pos) => {
        console.log('touchEnd', pos.x)
      })
      /*this.slider.on('scrollEnd', (pos) => {
        console.log('scrollEnd', pos.x)
      })*/
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refrech()
      }, 20)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slider
  min-height: 1px
</style>
