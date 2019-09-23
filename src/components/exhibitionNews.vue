<template>
    <div><!--exhibitionNews.vue-->
      <div class="exhibi_wrap">
        <div class="exhibi_title" :class="{'exhibi_title_active': IsActive}">
          <h2>{{title ? title : '展会新闻'}}</h2>
          <div class="exhibi_more" @click="moreNews">更多</div>
        </div>
        <ul class="exhibition_news">
          <li :class="{'exhibition_news1': index != expositionNews.length-1}" v-for="(item, index) in expositionNews" @click="goToDetail(item.code)" v-bind:key="index">
            <p>{{item.title}}</p>
            <span class="iconfont icon-gengduo"></span>
          </li>
        </ul>
        <img src="../assets/images/yanhua1.png" class="bg_active" alt="">
      </div>
      <div v-show="ad.show == 'Y'" style="position: relative">
        <img :src="ad.url" alt="" class="ad">
        <img src="https://www.chbice.com/imgFile/deng3.png" class="ad_bg1" alt="">
        <img src="https://www.chbice.com/imgFile/deng1.png" class="ad_bg2" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: "exhibitionNews",
  props: {
    expositionNews: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      value: ''
    },
    ad: {
      type: Object,
      default: () => ({
        url: '',
        show: "N"
      })
    }
  },
  data() {
    return {
      IsActive: this.$store.state.IsActive
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
    },
    moreNews() {
      this.$router.push({path: 'news'});
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
    position: relative;
  }
  .bg_active {
    position: absolute;
    width: 1.06rem;
    height: auto;
    bottom: -1.06rem;
    left: 70%;
  }
  .exhibi_wrap .exhibi_title {
    height: 0.94rem;
    background-color: #eed582;
    border-radius: 0.14rem 0.14rem 0 0;
    position: relative;
  }
  .exhibi_wrap .exhibi_title_active {
    background-color: #e20212;
    color: #fff;
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
    height: 0.7rem;
    line-height: 0.69rem;
    font-size: 0.28rem;
    display: flex;
    color: #000;
    justify-content: space-between;
  }
  .exhibition_news li p{
    width: 5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ad{
    width: 7rem;
    height: 1.2rem;
    max-height: 1.2rem;
    margin-top: 1rem;
    margin-left: 0.25rem;
    z-index: 6;
  }
  .ad_bg1 {
    position: absolute;
    bottom: -1.2rem;
    right: 0.25rem;
    width: 0.75rem;
    height: auto;
    max-height: 1.4rem;
  }
  .ad_bg2 {
    position: absolute;
    width: 0.85rem;
    height: auto;
    left: 0.2rem;
    max-height: 0.81rem;
    bottom: -0.8rem;
  }
  .title{
    display: flex;
    margin-bottom: 0.32rem;
    margin-top: 0.58rem;
  }
  .title-right{
    margin-left: 0.22rem;
  }
  .title-right-en{
    display: block;
    font-size:0.2rem;
    color:rgba(207,194,170,1);
    line-height: 0.3rem;
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
    /*padding: 0.15rem 0.3rem 0.15rem 0.35rem;*/
    padding-left: 0.35rem;
    margin-bottom: 0.14rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    color: #717170;
    background:rgba(198,160,86, 0.08);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
