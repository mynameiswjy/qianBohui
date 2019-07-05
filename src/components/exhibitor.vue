<template>
  <div><!--exhibitionNews.vue-->
    <!--<div class="title">
      <img src="../assets/images/exhibition_news.png" alt="333" class="introduce-icon">
      <div class="title-right">
        <h2>展会新闻</h2>
        <div class="title-right-en">Expo News</div>
      </div>
    </div>-->
    <div class="exhibi_wrap">
      <div class="exhibi_title">
        <h2>展商介绍</h2>
        <div class="exhibi_more" @click="moreNews">更多</div>
      </div>
      <ul class="exhibition_news">
        <li :class="{'exhibition_news1': index != exhibitorsIntroduce.length-1}" v-for="(item, index) in exhibitorsIntroduce" @click="goToDetail(item.code)" v-bind:key="index">
          <router-link :to="detailPath(item.code)">
            <div class="h3">
              <span>{{item.title}}</span>
              <span class="iconfont icon-gengduo"></span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--<img src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="" class="ad">-->
  </div>
    <!--<div class="wrap">
      <div class="title">
        <img src="../assets/images/exhibitor.png" alt="333" class="introduce-icon">
        <div class="title-right">
          <h2>展商介绍</h2>
          <div class="title-right-en">Exhibitor</div>
        </div>
      </div>
      <ul class="exhibition-news">
        <li v-for="(item, index) in exhibitorsIntroduce" v-bind:key="index" @click="goToDetail(item.code)">
          <router-link :to="detailPath(item.code)">{{item.title}}</router-link>
        </li>
      </ul>
      &lt;!&ndash;<img src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="" class="ad">&ndash;&gt;
    </div>-->
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
      /*this.$router.push({
        name: "newsLandingPage",
        params: {
          name: 'newsLandingPage',
          code: e
        }
      })*/
    },
    moreNews() {
      this.$router.push({path: 'news'});
    },
    detailPath(code) {
      let path = '/newsLandingPage?code=' + code
      return path
    }
  }
}
</script>

<style scoped>
  .exhibi_wrap {
    margin-left: 0.25rem;
    margin-top: 0.96rem;
    width: 7rem;
    height: 4.71rem;
    background-color: #ffffff;
    box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
    border-radius: 0.14rem;
  }
  .exhibi_wrap .exhibi_title {
    height: 0.94rem;
    background-color: #eed582;
    border-radius: 0.14rem 0.14rem 0 0;
    position: relative;
  }
  .exhibi_wrap .exhibi_title h2 {
    font-size: 0.36rem;
    font-weight: 600;
    text-align: center;
    line-height: 0.94rem;
  }
  .exhibi_wrap .exhibi_title .exhibi_more {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.38rem 0.24rem 0 0;
    /*z-index: 2;*/
    font-size: 0.24rem;
  }
  .exhibition_news {
    padding: 0.13rem 0 0.13rem 0.22rem;
  }
  .exhibition_news1 {
    border-bottom: 0.01rem solid #949494;
  }
  .exhibition_news li{
    width: 6.48rem;
    line-height: 0.69rem;
    font-size: 0.28rem;
  }
  .exhibition_news li .h3{
    display: flex;
    justify-content: space-between;
    height: 0.7rem;
    overflow: hidden;
    white-space: nowrap;
    color: #000;
    text-overflow: ellipsis;
  }
  .ad{
    width: 7rem;
    height: 1.2rem;
    max-height: 1.2rem;
    margin-top: 1rem;
    margin-left: 0.25rem;
  }
  /*.wrap{
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
    !*height: 5.05rem;*!
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }*/
</style>
