<template>
  <div class="wrap">
    <div class="title">
      <img src="../assets/images/exhibitions.png" alt="333" class="introduce-icon">
      <div class="title-right">
        <div class="h2">
          <div>历届展会</div>
          <div class="more">
            <div class="look-more">查看更多</div>
            <img class="more-img" src="../assets/images/more.png" alt="">
          </div>
        </div>
        <div class="title-right-en">Successive exhibitions</div>
      </div>
    </div>
    <div class="slider">
      <ul class="exhibition-news">
        <li v-for="item in list" :class="{border: list.length !== (item.id - 1 + 2)}" v-bind:key="item.id">{{item.name}}</li>
      </ul>
      <ul class="time-year">
        <li>2013</li>
        <li>2014</li>
        <li>2015</li>
        <li>2016</li>
        <li>2017</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "successiveExhibitions",
  data() {
    return {
      list: [
        {name: '贵金属纪念币知识介绍', id: '0'},
        {name: '纪念币的保存、清洗及赝品识别', id: '1'},
        {name: '纪念币题材及发行要素辨识', id: '2'},
        {name: '购买途径及鉴定证书辨识', id: '3'},
        {name: '如何成为特许零售商', id: '4'}
      ]
    }
  }
}
</script>

<style scoped>
  .look-more{
    margin-right: 0.19rem;
    font-size: 0.32rem;
  }
  .more{
    display: flex;
    justify-content: space-between;
    line-height: 0.26rem;
  }
  .wrap{
    margin-left: 0.36rem;
  }
  .more-img{
    width: 0.14rem;
    height: 0.24rem;
  }
  .title{
    width: 6.78rem;
    display: flex;
    margin-bottom: 0.32rem;
    margin-top: 0.58rem;
    font-family:PingFangSC-Medium;
  }
  .title-right{
    margin-left: 0.22rem;
  }
  .introduce-icon{
    width: 0.34rem;
    height: 0.34rem;
  }
  .title-right-en{
    display: block;
    font-size:0.2rem;
    font-family:PingFangSC-Light;
    color:rgba(207,194,170, 1);
    line-height: 0.3rem;
  }
  .h2{
    /*text-align: left;*/
    width: 6.22rem;
    margin-bottom: 0.1rem;
    font-size: 0.34rem;
    line-height: 0.3rem;
    font-family: PingFangSC-Medium;
    color: rgba(198,160,86,1);
    display: flex;
    justify-content: space-between;
  }
  .title-right-en{
    display: block;
    font-size:0.2rem;
    font-family:PingFangSC-Light;
    color:rgba(207,194,170, 1);
    line-height: 0.3rem;
  }
  .slider{
    width: 6.2rem;
    box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.6);
    padding: 0.43rem 0.29rem 0.45rem 0.29rem;
  }
  .exhibition-news{
    background:rgba(198,160,86, 0.08);
    padding: 0.13rem 0;
    margin-bottom: 0.41rem;
  }
  .exhibition-news li{
    height: 0.76rem;
    line-height: 0.76rem;
    margin-left: 0.35rem;
    margin-right: 0.35rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    color: #717170;
  }
  .exhibition-news .border{
    border-bottom: 0.01rem solid #e4e3e3;
  }
  .time-year{
    width: 100%;
    height: 0.76rem;
    background:rgba(198,160,86, 0.08);
    display: flex;
    line-height: 0.76rem;
    font-size: 0.3rem;
    /*padding: 0 0.2rem;*/
  }
  .time-year li{
    flex: 1;
    text-align: center;
  }
</style>
