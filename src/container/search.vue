<template>
    <div class="sear-wrap">
      <div class="sear">
        <div class="sear-input">
          <img class="sear-img" src="../assets/images/search.png" alt="">
          <input type="text" placeholder="搜索" style="vertical-align:middle">
        </div>
        <div>搜索</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'search',
  data() {
    return{
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sear-wrap
    position fixed
    top: 0rem
    left: 0rem
    right 0
    width 100%
    bottom: 0rem
    background-color: rgba(255,255,255,1);
    z-index 333
    .sear
      width 100%
      display: flex
      justify-content: center;
      font-size 0.26rem
      border-bottom 0.01rem solid rgba(245,245,245,1)
      .sear-input
        width 5.97rem
        height: 0.54rem
        background rgba(245,245,245,1)
        border-radius: 0.12rem
        margin 0.18rem 0 0.17rem 0
        display flex
        .sear-img
          width: 0.24rem;
          height 0.24rem
          margin 0.15rem 0.21rem 0.15rem 0
        input
          height 100%
          width 100%
          background rgba(245,245,245,1)
      div
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        padding-left 0.32rem
        margin-top 0.18rem
        line-height 0.54rem
</style>
