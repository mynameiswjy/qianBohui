<template>
  <div class="index_wrap">
    <img src="https://www.chbice.com/imgFile/ico/index/ad_big_title.png" class="img_title" alt="">
    <div class="index_content">
      <p>解/锁/辛/丑/牛/年/专/属/上/上/签</p>
      <p>领取牛年生肖币购买秘笈</p>
      <p>抽取你的牛年小幸运</p>
      <p>祝你走向人生巅峰</p>
    </div>
    <div class="test_btn" @click="startTest">开始测试</div>
    <img src="https://www.chbice.com/imgFile/ico/index/ad_logo.png" class="index_logo" alt="">
  </div>
</template>

<script>
import {getAdShareToken} from "../api";
import {wxShareTemp, againUrlAd} from "../utils/wx_share";

export default {
  name: "index",
  data() {
    return {}
  },
  created() {
    againUrlAd('/qbh_ad')
  },
  activated() {
    document.title = '解锁牛年上上签';
  },
  mounted() {
    this.shareWx()
  },
  methods: {
    startTest() {
      this.$router.push({path: 'ad_select'});
    },
    shareWx() {
      getAdShareToken('/qbh_ad').then(res => { // window.location.href
        let data = res.data.data
        wxShareTemp(data, {title: '快来解锁你的牛年专属上上签'}, true)
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
  .index_wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    background-color: #fff;
    background-image: url("https://www.chbice.com/imgFile/ico/ad_sesult/index_bg.png");
    background-repeat: no-repeat;
    background-size: 7.5rem;
    overflow: auto;
  }

  .img_title {
    display: block;
    width: 5.28rem;
    height: 1.99rem;
    margin-top: 3.82rem;
    margin-left: 1.25rem;
  }

  .test_btn {
    width: 2.45rem;
    height: .73rem;
    background-image: url("https://www.chbice.com/imgFile/ico/index/ad_border_1.png");
    background-size: 2.45rem .73rem;
    background-repeat: no-repeat;
    margin: .47rem auto 0;
    font-size: .4rem;
    color: #F4DEBA;
    text-align: center;
    line-height: .73rem;
  }
  .index_content {
    font-size: .16rem;
    text-align: center;
    line-height: 1;
    color: #000000;
    margin-top: .9rem;
  }

  .index_content p {
    margin-bottom: .12rem;
    margin-top: 0;
  }

  .index_logo {
    width: 3.04rem;
    height: .59rem;
    margin: .93rem auto 0;
    display: block;
  }
</style>
