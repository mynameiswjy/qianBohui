<template>
  <div class="select_wrap">
    <selectInput v-if="isShow === 1" @select-input="selectInput"></selectInput>
    <coinTemp v-if="isShow === 2" @select-input="selectInput"></coinTemp>
    <shoppingMode v-if="isShow === 3" @select-input="selectInput"></shoppingMode>
    <bindCardSelect v-if="isShow === 4" @select-input="selectInput"></bindCardSelect>
    <analysisTemp v-if="isShow === 5" @select-input="selectInput"></analysisTemp>
  </div>
</template>

<script>
import selectInput from './template/selectInput.vue'// 出生日期以及地址输入框选择
import coinTemp from './template/coinTemp.vue'// 钱币选择
import shoppingMode from './template/shoppingMode.vue'// 购物方式选择
import bindCardSelect from './template/bindCardSelect.vue'// 银行卡选择
import analysisTemp from './template/analysisTemp.vue'
import * as types from "../store/mutation-types";
// 解析
export default {
  data() {
    return {
      isShow: 1,
      params: {}
    }
  },
  created() {
  },
  activated() {
    document.title = '解锁牛年上上签';
  },
  methods: {
    selectInput(e) {
      const {birthday, isShow, province, city, District, patternFlag, buyType, bankCard, coinImgUrl, shoppingSelect} = e;
      if (birthday) {
        this.params.birthday = birthday
      }
      if (province) {
        this.params.province = province
        this.params.city = city
        this.params.district = District
      }
      if (patternFlag) {
        this.params.patternFlag = patternFlag
      }
      if (buyType) {
        this.params.buyType = buyType
      }
      if (bankCard) {
        this.params.bankCard = bankCard
      }
      if (coinImgUrl) {
        this.params.coinImgUrl = coinImgUrl
      }
      if (shoppingSelect) {
        this.params.shoppingSelect = shoppingSelect
      }
      this.$store.commit(types.AD_REQ_PARAMS, this.params)
      this.isShow = isShow
    },
  },
  components: {
    selectInput,
    coinTemp,
    shoppingMode,
    bindCardSelect,
    analysisTemp
  }
}
</script>

<style scoped>
  .select_wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    background-color: #fff;
    background-image: url("https://www.chbice.com/imgFile/ico/ad_sesult/select_bg.png");
    background-repeat: no-repeat;
    background-size: 7.5rem;
  }
</style>
