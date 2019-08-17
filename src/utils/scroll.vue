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
    data: {
      type: [Array, String, Object],
      default: null
    },
    isRefrensh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  destroyed() {
    this.$refs.wrapper && this.$refs.wrapper.destroy()
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        probeType: this.probeType,
        click: this.click,
        // bounce: false //去掉回弹动画
        /*scrollbar: {
          fade: false,
          interactive: true
        },*/
      })
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  computed: {}
}
</script>

<style scoped lang="stylus">
</style>
