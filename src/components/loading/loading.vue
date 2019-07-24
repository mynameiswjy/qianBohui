<template>
  <div>
    <div class="loading" v-show="openSmall">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
    <div class="new_load">
      <div class="load_content">
        <img width="24" height="24" src="./loading.gif">
        <p class="desc">数据加载中</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    },
    openSmall: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .new_load
    width 7.5rem
    height 100%
    position fixed
    top: 0
    bottom: 0
    /*background-color: rgba(0,0,0,0.8)*/
    .load_content
      width 2.4rem
      height 2.4rem
      position absolute
      top: 50%
      left 50%
      transform translate(-50%, -50%)
      border-radius 0.14rem
      background-color: rgba(0,0,0, 0.7)
      img
        width 0.6rem
        height auto
        max-height 0.6rem
        display block
        margin 0.71rem auto 0.35rem
      .desc
        font-size: 0.26rem;
        text-align center
        color: #ffffff;
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 0.2rem
      font-size: 0.24rem
      color: #000
</style>
