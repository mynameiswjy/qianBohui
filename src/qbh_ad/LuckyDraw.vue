<template>
  <div class="dial_wrap">
    <div style="height: 1.97rem;"></div>
    <img class="dial_wrap_img" src="https://www.chbice.com/imgFile/ico/dial/ad_ dial_select.png" alt="">
    <div class="dial_content">
      <img class="dial" :class="{'dial_anim': IsStart}" src="https://www.chbice.com/imgFile/ico/123456789.png" alt="">
      <img class="pointer" @click="startActive" src="https://www.chbice.com/imgFile/ico/dial/ad_ dial_btn.png" alt="">
    </div>
    <div class="dial_txt_wrap">
      <h3 class="dial_txt">活动时间：即日起至2020年10月28日24:00止。</h3>
      <h3 class="dial_txt">活动规则：</h3>
      <h3 class="dial_txt">1. 每位用户有一次抽奖机会。</h3>
      <h3 class="dial_txt">2. 为防止不正当参与行为，我们将在"中国金币"官方微信上公布最终获奖名单。</h3>
      <h3 class="dial_txt">3. 本活动最终解释权归中国金币总公司所有。</h3>
    </div>
    <firstPrize v-if="IsOpenPart" @close_prize_mask="ClosePrizeMask"></firstPrize>
  </div>
</template>

<script>
import firstPrize from './template/firstPrize.vue'
import {wxShareTemp, againUrlAd} from "../utils/wx_share";
import {getAdShareToken} from "../api";
import {getURLParams} from "../utils/utils";
export default {
  data() {
    return {
      IsStart: false,
      IsOpenPart: false
    }
  },
  created() {
    againUrlAd(this.$route.path, true)
    this.ifNav(getURLParams('isShare'))
  },
  activated() {
    document.title = '解锁牛年上上签';
  },
  mounted() {
    this.shareWx()
  },
  methods: {
    shareWx() {
      getAdShareToken(this.$route.path, true).then(res => {
        let data = res.data.data
        wxShareTemp(data, {title: '快来解锁你的牛年专属上上签'}, true)
      }).catch(err => {
        console.log(err)
      })
    },
    ClosePrizeMask() {
      this.IsOpenPart = false
      this.IsStart = false
    },
    startActive() {
      this.IsStart = true
      setTimeout(() => {
        this.IsOpenPart = true
      }, 4500)

      /*let newdeg = 540;
      const style = document.styleSheets[0];
      style.insertRule("@keyframes dialAnim {from{transform: rotate(" + newdeg + "deg);transform-origin: 2.45rem 2.45rem;}}", 4);
        0% {
          transform:rotate(0deg);
          transform-origin: 2.45rem 2.45rem;
        }
        100% {
          transform:rotate(2000deg);
          transform-origin: 2.45rem 2.45rem;
        }
      */
    },
    ifNav(isShare) {
      if (isShare) {
        this.$router.push({path: 'qbh_ad'});
      }
    }
  },
  components: {
    firstPrize
  }
}
</script>

<style scoped>
  .dial_wrap {
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
  .dial_wrap_img {
    width: 3.02rem;
    height: 1.09rem;
    display: block;
    margin: 0 auto .19rem;
  }
  .dial_content {
    height: 5.2rem;
    width: 7.5rem;
    position: relative;
  }
  .dial_content .dial {
    width: 4.86rem;
    height: 4.86rem;
    display: block;
    margin: 0 auto;
  }
  .pointer {
    width: 1.59rem;
    height: 1.78rem;
    position: absolute;
    top: 1.35rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .dial_txt_wrap {
    margin-top: .13rem;
    margin-left: 1.36rem;
    display: inline-block;

  }
  .dial_txt {
    font-size: .2rem;
    line-height: .32rem;
    margin-bottom: .12rem;
    color: #F4DEBA;
  }
  .dial_anim {
    animation: dialAnim 4s ease 1 alternate forwards;
  }
  @keyframes dialAnim {
    0% {
      transform:rotate(0deg);
      transform-origin: 2.43rem 2.43rem;
    }
    100% {
      transform:rotate(2000deg);
      transform-origin: 2.43rem 2.43rem;
    }

  }
  .part_prize {
    width: 7.5rem;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
  }

  .part_prize_center img {
    width: 2.96rem;
    height: 2.36rem;
  }
  .prize_common_btn {
    width: 1.87rem;
    height: .61rem;
    background-image: url("https://www.chbice.com/imgFile/ico/lo/prize_btn.png");
    background-size: 1.87rem .61rem;
    background-color: #C33739;
    font-size: .3rem;
    color: #F4DEBA;
    text-align: center;
    line-height: .61rem;
  }
  .part_prize_btn {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -1.33rem;
  }
  .part_prize_bott {
    font-size: .10rem;
    color: #F4DEBA;
    margin: .1rem auto;
    transform: scale(.6);
    white-space: nowrap;
    display: flex;
    justify-content: center;
  }
  .Involved_content {
    width: 5.15rem;
    height: 2.52rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #C33739;
  }
  .Involved_content h3 {
    font-size: .4rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #F4DEBA;
    line-height: 1;
    text-shadow: 0 .06rem .02rem rgba(79, 4, 10, 0.53);
    margin-bottom: .4rem;
    text-align: center;
    padding-top: .5rem;
  }
  .Involved_content p {
    font-size: .26rem;
    color: #F4DEBA;
    line-height: .36rem;
    max-width: 4.32rem;
    margin: 0 auto;
  }
</style>
