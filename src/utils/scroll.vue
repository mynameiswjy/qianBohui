<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "scroll",
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
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  created() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
      })
      console.log(this.scroll)
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refrech() {
      this.scroll && this.scroll.refrech()
    }
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

<style scoped lang="stylus">
</style>
