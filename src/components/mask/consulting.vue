<template>
    <div class="mask">
      <div class="wraps">
        <p class="p1">如需咨询请联系QQ客服</p>
        <p class="p2">QQ号码：123456789</p>
        <div class="p3" @click="closeTemp">返回</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
export default {
  name: 'consulting',
  data() {
    return {
      three: false,
    }
  },
  methods: {
    closeTemp() {
      this.$emit("closeZixun", this.three)
    }
  }
}

</script>

<style scoped lang="stylus">
  .mask
    /*padding-top 0.82rem*/
    .wraps
      position: absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      border-radius: 0.2rem;
      background-color: #fff
      background: url("../../assets/images/zixun_bg.png") no-repeat
      width 5.43rem
      height 5.3rem
      background-size cover
      background-position center center
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      color: #fff;
      .p1
        margin-left 0.24rem
        margin-top 0.88rem
      .p2
        margin-left 0.87rem
        margin-top 1.8rem
        color: #C6A056
        font-size 0.34rem
      .p3
        width 4.38rem
        height:0.8rem
        text-align center
        line-height: 0.8rem
        background-color: #C8A258
        border-radius: 0.12rem
        margin-left 0.52rem
        margin-top 0.74rem
</style>
