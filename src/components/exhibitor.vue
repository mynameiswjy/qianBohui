<template>
    <div class="wrap">
      <div class="title">
        <img src="../assets/images/exhibitor.png" alt="333" class="introduce-icon">
        <div class="title-right">
          <h2>展商介绍</h2>
          <div class="title-right-en">Exhibitor</div>
        </div>
      </div>
      <ul class="exhibition-news">
        <li v-for="(item, index) in exhibitorsIntroduce" v-bind:key="index" @click="goToDetail(item.code)">{{item.title}}</li>
      </ul>
      <img src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="" class="ad">
    </div>
</template>

<script>
export default {
  name: "exhibitor",
  props: {
    exhibitorsIntroduce: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goToDetail(e) {
      this.$router.push({
        name: "newsLandingPage",
        params: {
          name: 'newsLandingPage',
          code: e
        }
      })
    }
  }
}
</script>

<style scoped>
  .wrap{
    width: 7.14rem;
    margin-left: 0.36rem;
  }
  .ad{
    width: 6.78rem;
    height: 1.1rem;
    margin-top: 0.57rem;
  }
  .title{
    display: flex;
    margin-bottom: 0.32rem;
    margin-top: 0.58rem;
    font-family:PingFangSC-Medium;
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
  .exhibition-news{
    width: 6.2rem;
    box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.6);
    padding: 0.38rem 0.29rem 0.18rem 0.29rem;
    /*height: 5.05rem;*/
  }
  .exhibition-news li{
    height: 0.76rem;
    line-height: 0.76rem;
    padding-left: 0.35rem;
    margin-bottom: 0.14rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    color: #717170;
    background:rgba(198,160,86, 0.08);
  }
</style>
