<template>
    <div class="first_prize_wrap">
      <div class="first_prize_content">
        <img class="first_prize_title" src="https://www.chbice.com/imgFile/ico/12111.png" alt="">
        <div class="prize_type">恭喜你获得参与奖</div>
        <div class="first_prize_img">
          <img src="https://www.chbice.com/imgFile/ico/prize/5-1.png" alt="">
        </div>
        <div class="first_prize_bott">
          <span class="iconfont icon-ic_gonggao"></span>
          <span class="">获得《中国金币文化》一本</span>
        </div>
        <div class="first_prize_btn">
          <p style="margin-right: .4rem" @click="shareFriends">分享给好友</p>
          <p @click="getPrize">领取奖品</p>
        </div>
      </div>
      <div class="share_friends" v-if="showShareTemp">
        <span>点击这里分享</span>
        <span class="iconfont icon-huabanfuben"></span>
      </div>
    </div>
</template>

<script>

export default {
  name: "firstPrize",
  data() {
    return {
      showShareTemp: false
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    shareFriends() {
      if(this.showShareTemp) {
        return false
      }
      this.showShareTemp = true
      setTimeout(() => {
        this.showShareTemp = false
      }, 5000)
    },
    getPrize() {
      this.$router.push({path: 'getPrize'});
      this.$emit('close_prize_mask')
    },
  }
}
</script>

<style scoped>
  .first_prize_wrap {
    position: fixed;
    top: 0;
    width: 7.5rem;
    bottom: 0;
    background-image: url("https://www.chbice.com/imgFile/ico/lo/getPrizeBg.png");
    background-size: 7.5rem;
    background-repeat: no-repeat;
  }
  .first_prize_content {
    width: 5.2rem;
    height: 7.7rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1.9rem;
  }
  .first_prize_content .first_prize_title {
    width: 3.21rem;
    height: 1rem;
    display: block;
    margin: 1.3rem auto 0;
  }
  .first_prize_img {
    width: 2.96rem;
    height: 2.36rem;
    background-color: #A40812;
    margin: 0 auto;
  }
  .first_prize_img img {
    width: 2.96rem;
    height: 2.36rem;
  }
  .first_prize_bott {
    font-size: .15rem;
    color: #F4DEBA;
    margin: .1rem auto;
    white-space: nowrap;
    display: flex;
    justify-content: center;
  }
  .first_prize_bott .icon-ic_gonggao {
    font-size: .15rem;
    color: #F4DEBA;
    margin-right: .05rem;
  }
  .first_prize_btn {
    display: flex;
    position: absolute;
    bottom: .25rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .first_prize_btn p {
    width: 1.87rem;
    height: .61rem;
    text-align: center;
    line-height: .61rem;
    font-size: .3rem;
    color: #F4DEBA;
    background-image: url("https://www.chbice.com/imgFile/ico/lo/prize_btn.png");
    background-size: 1.87rem .61rem;
    background-color: #C33739;
  }
  .first_prize_img img {

  }
  .prize_type {
    font-size: .4rem;
    text-align: center;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #F4DEBA;
    line-height: 1;
    text-shadow: .01rem .06rem .03rem rgba(79, 5, 11, 0.53);
    margin: .3rem 0 .34rem;
  }
  .share_friends {
    position: absolute;
    top: .2rem;
    right: .2rem;
    font-size: .28rem;
    color: #fff;
    background-color: rgba(0,0,0, .6);
    width: 3rem;
    line-height: .45rem;
    text-align: center;
    border-radius: .1rem;
  }
  .share_friends .icon-huabanfuben {

  }
</style>
