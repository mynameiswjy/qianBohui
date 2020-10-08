<template>
  <div class="shopping_mode anim_ad">
    <div style="height: 2.67rem"></div>
    <img class="" src="https://www.chbice.com/imgFile/ico/ad_sesult/shopping_img.png" alt="">
    <div class="shopping_input" @click="shopping(1)">
      <p>线上点点点</p>
      <span class="iconfont icon-querenanniu" v-if="selectIdx === 1"></span>
    </div>
    <div class="shopping_input" @click="shopping(2)">
      <p>线下逛逛逛</p>
      <span class="iconfont icon-querenanniu" v-if="selectIdx === 2"></span>
    </div>
<!--    <div class="shopping_next_question" @click="nextQuestion">下一题</div>-->
  </div>
</template>

<script>
export default {
  name: "shoppingMode",
  data() {
    return {
      userSelect: '',
      selectIdx: 0
    }
  },
  methods: {
    nextQuestion() {
      if (!this.userSelect) {
        this.Toast('请选择购物方式');
        return false
      }
      this.$emit('select-input', {
        buyType: this.userSelect,
        isShow: 4,
        shoppingSelect: this.selectIdx
      })
    },
    shopping(e) {
      this.selectIdx = e
      this.userSelect = e === 1 ? '线上点点点' : '线下逛逛逛'
      this.$emit('select-input', {
        buyType: this.userSelect,
        isShow: 4,
        shoppingSelect: this.selectIdx
      })
    }
  }
}
</script>

<style scoped>
  .shopping_mode {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 7.5rem;
  }
  .shopping_mode img {
    width: 4.31rem;
    height: 1.15rem;
    margin: .5rem auto .63rem;
    display: block;
  }
  .shopping_input {
    width: 3.21rem;
    height: .73rem;
    background-image: url("https://www.chbice.com/imgFile/ico/ad_sesult/shopping_input.png");
    background-size: 3.21rem .73rem;
    font-size: .26rem;
    color: #F4DEBA;
    text-align: center;
    line-height: .73rem;
    margin: 0 auto .48rem;
    position: relative;
  }
  .shopping_next_question {
    background-image: url("https://www.chbice.com/imgFile/ico/select/ad_border_2.png");
    width: 2.19rem;
    height: .67rem;
    background-size: cover;
    margin: 3.3rem auto 0;
    text-align: center;
    line-height: .67rem;
    font-size: .36rem;
    color: #F4DEBA;
  }
  .shopping_input .icon-querenanniu {
    font-size: .5rem;
    color: #4caf50;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
