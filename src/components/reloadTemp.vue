<template>
    <div>
      <div class="reload_wrap">
        <img class="reload_img" src="https://www.chqbh.com/imgFile/cut/404.png" alt="">
        <p class="reload_txt">网络不给力</p>
        <p class="reload_btn" @click="reloadBtn">重新加载</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'reload',
  data() {
    return {
    }
  },
  methods: {
    reloadBtn() {
      this.$emit("reloadBtn")
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .reload_wrap
    position fixed
    top: 0
    left 0
    bottom 0
    width 100%
    background-color: #fff
    .reload_img
      width 3.99rem
      height auto
      display block
      margin 20% auto 0.34rem
    .reload_txt
      font-size: 0.36rem
      line-height: 0.48rem
      letter-spacing: 0.04rem
      text-align center
      color: #000000;
    .reload_btn
      width: 2.16rem
      height: 0.6rem
      font-size: 0.3rem
      color: #4b494a;
      border-radius: 0.3rem
      border: solid 0.02rem #949494;
      text-align center
      line-height 0.6rem
      margin 0.28rem auto
</style>
