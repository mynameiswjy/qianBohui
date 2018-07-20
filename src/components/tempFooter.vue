<template>
  <div class="left-margin wrap">
    <div class="about">
      <div class="call-us">联系我们</div>
      <div class="border"></div>
      <div class="about-us">关于我们</div>
    </div>
    <div class="copyright">
      <div>Copyright © 2000—2018 chngc.net All Rights Reserved</div>
      <div>本网站由中国金币总公司主办</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tempFooter",
  data() {
    return {}
  }
}
</script>

<style scoped>
  .wrap{margin-right: 0.36rem;display: flex;flex-direction: column;}
  .about {
    align-self: center;
    display: flex;
    font-size: 0.3rem;
    font-family:PingFangSC-Regular;
    color: #232323;
    line-height: 0.44rem;
    margin-bottom: 0.3rem;
  }
  .border{
    width: 0.01rem;
    height: 0.26rem;
    background-color: #CECCCC;
    margin-top: 0.09rem;
  }
  .call-us{
    padding-right: 0.37rem;
  }
  .about-us{
    padding-left: 0.37rem;
  }
  .copyright{
    font-size: 0.24rem;
    font-family:PingFangSC-Regular;
    color: #9B9A9A;
    line-height: 0.44rem;
    text-align: center;
    margin-bottom: 0.56rem;
  }
</style>
