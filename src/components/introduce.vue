<template>
    <div class="wrap">
      <div class="title">
        <img src="../assets/images/introduce.png" alt="333" class="introduce-icon">
        <div class="title-right">
          <h2>展会介绍</h2>
          <div class="title-right-en">Exhibition Introduction</div>
        </div>
      </div>
      <div class="">
        <p class="header-text" :class="{show: show}">
          作为国际性钱币收藏交流、交易的平台，此次钱币展融合钱币交流会、精品展、现场收评、免费鉴定等诸多精彩环节，
          世界各国与地区的知名钱币机构、钱币经销商、收藏爱好者、社会各界及海内外人士前来参展、参观。
          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，
          以最大的诚意与付出，期望打造最有品质和影响力的中国。
        </p>
      </div>
      <!--<div class="show-bts" @click="showBts">{{showText}}</div>-->
    </div>
</template>

<script>
export default {
  name: "introduce",
  data() {
    return {
      obj: {},
      show: true,
      showText: "显示全文"
    }
  },
  created() {
  },
  methods: {
    showBts() {
      if (this.show) {
        this.show = false
        this.showText = "收起全文"
      } else {
        this.show = true
        this.showText = "显示全文"
      }
    }
  }
}
</script>

<style scoped>
  .header-text{
    width: 6.21rem;
    /*height: 3.22rem;*/
    padding: 0.39rem 0.3rem 0.4rem 0.27rem;
    text-align: justify;
    font-size: 0.25rem;
    font-family:PingFangSC-Regular;
    color: rgba(72,72,71,1);
    background:rgba(255,255,255,1);
    border-radius: 0.08rem;
    box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.8);
    line-height: 0.42rem;
  }
  .wrap{
    margin-left: 0.36rem;
  }
  .title{
    display: flex;
    margin-bottom: 0.32rem;
    font-family:PingFangSC-Medium;
  }
  .show{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:8;
  }
  .title-right{
    margin-left: 0.22rem;
  }
  .title-right-en{
    display: block;
    font-size:0.2rem;
    font-family:PingFangSC-Light;
    color:rgba(207,194,170,1);
    line-height: 0.3rem;
  }
  .show-bts{
    color: blue;
    width: 1.8rem;
    height: 0.2rem;
  }
  h2{
    text-align: left;
    margin-bottom: 0.1rem;
    font-size: 0.34rem;
    line-height: 0.3rem;
    font-family:PingFangSC-Medium;
    color:rgba(198,160,86,1);
  }
  .introduce-icon{
    width: 0.33rem;
    height: 0.32rem;
  }
</style>
