<template>
    <div class="coin_wrap anim_ad">
      <div style="height: 2.61rem;"></div>
      <img class="coin_title" src="https://www.chbice.com/imgFile/ico/coin/coin_title.png"/>
      <div class="coin_img flex">
        <div class="coin_img_li">
          <img src="https://www.chbice.com/imgFile/ico/money/1.png" alt="" @click="selectCoin(1)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 1"></span>
        </div>
        <div class="coin_img_li">
          <img src="https://www.chbice.com/imgFile/ico/money/2.png" alt="" @click="selectCoin(2)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 2"></span>
        </div>
        <div class="coin_img_li">
          <img src="https://www.chbice.com/imgFile/ico/money/3.png" alt="" @click="selectCoin(3)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 3"></span>
        </div>
      </div>
      <div class="coin_img coin_img1 flex">
        <div class="coin_img_li">
          <img src="https://www.chbice.com/imgFile/ico/money/4.png" alt="" @click="selectCoin(4)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 4"></span>
        </div>
        <div class="coin_img_li">
          <img src="https://www.chbice.com/imgFile/ico/money/5.png" alt="" @click="selectCoin(5)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 5"></span>
        </div>
      </div>
      <div class="coin_img coin_img2 flex">
        <div class="coin_img_li">
          <img class="coin_img_img" src="https://www.chbice.com/imgFile/ico/money/6.png" alt="" @click="selectCoin(6)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 6"></span>
        </div>
        <div class="coin_img_li">
          <img height="1.25rem" src="https://www.chbice.com/imgFile/ico/money/7.png" alt="" @click="selectCoin(7)"/>
          <span class="iconfont icon-querenanniu" v-if="coinImgUrl === 7"></span>
        </div>
      </div>
<!--      <div class="coin_next_question" @click="nextQuestion">下一题</div>-->
    </div>
</template>

<script>
export default {
  name: "coinTemp",
  data() {
    return {
      coinImgUrl: '',
      coinImgUrlName: ''
    }
  },
  methods: {
    selectCoin(e) {
      this.coinImgUrl = e
      switch (e) {
        case 1:
          this.coinImgUrlName = '牛耕千野万庭春'
          break;
        case 2:
          this.coinImgUrlName = '金牛接福丰稔景'
          break;
        case 3:
          this.coinImgUrlName = '牛运亨通家兴旺'
          break;
        case 4:
          this.coinImgUrlName = '小试牛刀凌云志'
          break;
        case 5:
          this.coinImgUrlName = '牛奋四蹄百事亨'
          break;
        case 6:
          this.coinImgUrlName = '牛转乾坤盛世新'
          break;
        case 7:
          this.coinImgUrlName = '牛背飘春报福音'
          break;
      }
      this.$emit('select-input', {
        patternFlag: this.coinImgUrlName,
        coinImgUrl: this.coinImgUrl,
        isShow: 3
      })
    },
    nextQuestion() {
      if (!this.coinImgUrl) {
        this.Toast('请选择钱币');
        return
      }
      this.$emit('select-input', {
        patternFlag: this.coinImgUrlName,
        coinImgUrl: this.coinImgUrl,
        isShow: 3
      })
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .coin_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 7.5rem;
    overflow: auto;
  }
  .coin_title {
    width: 4.31rem;
    height: 1.15rem;
    margin: .5rem auto .44rem;
    display: block;
  }

  .coin_img {
    flex-wrap: wrap;
    justify-content: center;
  }
  .coin_img .coin_img_img {
    width: 2rem;
  }

  .coin_img_li {
    position: relative;
  }
  .coin_img_li .icon-querenanniu {
    font-size: .5rem;
    color: #4caf50;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .coin_img img {
    width: 1.81rem;
    height: 1.64rem;
    display: block;
  }
  .coin_img1 img {
    height: 1.74rem;
  }

  .coin_img2 img {
    height: 1.3rem;
  }

  .coin_img .mar_right {
    margin-right: .46rem;
  }
  .coin_next_question {
    background-image: url("https://www.chbice.com/imgFile/ico/select/ad_border_2.png");
    width: 2.19rem;
    height: .67rem;
    background-size: 2.18rem .67rem;
    margin: .5rem auto 0;
    text-align: center;
    line-height: .67rem;
    font-size: .36rem;
    color: #F4DEBA;
  }
</style>
