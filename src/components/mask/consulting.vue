<template>
    <div class="mask">
      <div class="wraps">
        <img class="consul_img" src="https://www.chbice.com/imgFile/cut/consulting.png" alt="">
        <p class="p1">如需咨询请联系QQ客服</p>
        <p class="p2" style="margin-top: 0.4rem;">QQ号码</p>
        <p class="p2">3218882435</p>
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
    .wraps
      position: absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      border-radius: 0.2rem;
      width: 4.7rem;
      /*height: 6.0rem;*/
      background-color: #f4f3f3;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      color: #fff;
      .consul_img
        width 2.14rem
        height auto
        display block
        margin 0.35rem auto 0
      .p1
        text-align center
        font-size: 0.3rem
        line-height: 0.46rem
        color: #1f1e1e;
        margin-top 0.15rem
      .p2
        font-size: 0.48rem;
        line-height 0.6rem
        letter-spacing: 0.02rem
        text-align center
        color: #1f1e1e;
      .p3
        width: 4.4rem
        height: 0.88rem
        background-color: #eed582;/*#*/
        border-radius: 0.2rem
        font-size: 0.36rem
        line-height: 0.88rem
        text-align center
        color: #000000/*#;*/
        margin 0.4rem auto 0.29rem
</style>
