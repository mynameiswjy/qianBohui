<template>
  <div class="bind_cart_wrap anim_ad">
    <div style="height: 2.67rem"></div>
    <img class="bank_title" src="https://www.chbice.com/imgFile/ico/ad_bind/ad_bind_title.png" alt="">
    <div class="bank_list flex">
      <div v-for="(item, index) in bindList" :key="index" :class="{'bank_item_mar_right': (index + 1) % 3 !== 0}" @click="userSelectBank(index)" class="bank_item">
        <img :src="'https://www.chbice.com/imgFile/ico/ad_bind/' + item.img + '.png'" alt="">
        <span class="iconfont icon-querenanniu" v-if="item.isSelect"></span>
      </div>
    </div>
    <div class="bank_next_question" @click="nextQuestion">提交</div>
  </div>
</template>

<script>
export default {
  name: "bindCardSelect",
  data() {
    return {
      bindList: [
        {img: 'ad_bind_1', name: '广发银行', isSelect: false},
        {img: 'd_bind_2', name: '华夏银行', isSelect: false},
        {img: 'd_bind_3', name: '中信银行', isSelect: false},
        {img: 'd_bind_4', name: '浦发银行', isSelect: false},
        {img: 'd_bind_5', name: '中国光大银行', isSelect: false},
        {img: 'd_bind_6', name: '中国银联', isSelect: false},
        {img: 'd_bind_7', name: '兴业银行', isSelect: false},
        {img: 'd_bind_8', name: '中国民生银行', isSelect: false},
        {img: 'd_bind_9', name: '招商银行', isSelect: false},
        {img: 'd_bind_10', name: '中国邮政储蓄银行', isSelect: false},
        {img: 'd_bind_11', name: '交通银行', isSelect: false},
        {img: 'd_bind_12', name: '中国银行', isSelect: false},
        {img: 'd_bind_13', name: '中国农业银行', isSelect: false},
        {img: 'd_bind_14', name: '建设银行', isSelect: false},
        {img: 'd_bind_15', name: '中国工商银行', isSelect: false}
      ],
      userSelect: []
    }
  },
  methods: {
    userSelectBank(e) {
      const bindList = this.bindList;
      bindList[e].isSelect = !bindList[e].isSelect
      this.userSelect = []
      for (let i = 0; i < bindList.length; i++) {
        const name = bindList[i].name
        if (bindList[i].isSelect && !this.userSelect.includes(name)) {
          this.userSelect.push(name)
        }
      }
    },
    nextQuestion() {
      if (!this.userSelect.length) {
        this.Toast('请选择银行');
        return false
      }
      this.$emit('select-input', {
        bankCard: this.userSelect,
        isShow: 5
      })
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .bind_cart_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: auto;
    width: 7.5rem;
  }
  .bind_cart_wrap .bank_title {
    width: 4.31rem;
    height: 1.15rem;
    margin: .5rem auto .63rem;
    display: block;
  }
  .bank_list {
    flex-wrap: wrap;
    justify-content: center;
  }
  .bank_item {
    width: 1.83rem;
    height: .55rem;
    margin-bottom: .23rem;
    position: relative;
  }
  .bank_item img {
    width: 1.83rem;
    height: .55rem;
    margin-bottom: .23rem;
  }
  .bank_item_mar_right {
    margin-right: .46rem;
  }

  .bank_next_question {
    background-image: url("https://www.chbice.com/imgFile/ico/select/ad_border_2.png");
    width: 2.19rem;
    height: .67rem;
    background-size: 2.1rem .67rem;
    background-position: center;
    margin: 1.35rem auto 0;
    text-align: center;
    line-height: .67rem;
    font-size: .36rem;
    color: #F4DEBA;
  }
  .bank_list .icon-querenanniu {
    font-size: .5rem;
    color: #4caf50;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
