<template>
    <div><!--exhibitionNews.vue-->
      <div class="exhibi_wrap_news">
        <div class="exhibi_title_news" :class="{'exhibi_title_active': IsActive}">
          <h2>{{title ? title : '展会新闻'}}</h2>
          <div class="exhibi_more" @click="moreNews">
            <span>更多</span>
            <div class="iconfont icon-jiantou"></div>
          </div>
        </div>
        <ul class="exhibition_news">
          <li class="exhibition_news1" v-for="(item, index) in expositionNews" @click="goToDetail(item.code)" v-bind:key="index">
            <p>{{item.title}}</p>
            <span class="iconfont icon-jiantou item_icon"></span>
          </li>
        </ul>
      </div>
      <div v-show="ad.show == 'Y'" style="position: relative">
        <img :src="ad.url" alt="" class="ad">
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
  .exhibi_wrap_news {
    margin-left: 0.3rem;
    margin-top: 0.32rem;
    width: 6.9rem;
    background-color: #ffffff;
    position: relative;
  }
  .exhibi_wrap_news .exhibi_title_news {
    border-radius: 0.14rem 0.14rem 0 0;
    position: relative;
  }
  .icon-jiantou {
    font-size: 0.2rem;
  }
  .item_icon {
    color: #BFA267;
    font-size: 0.24rem;
  }
  .exhibi_wrap_news .exhibi_title_active {
    background-color: #e20212;
    color: #fff;
  }
  .exhibi_wrap_news .exhibi_title_news h2 {
    background-image: url("https://www.chbice.com/imgFile/icon/title_bg.png");
    background-repeat: no-repeat;
    background-size: 2.45rem 0.53rem;
    width: 2.45rem;
    height: 0.53rem;
    margin: 0.3rem auto 0.2rem;
    font-size: 0.32rem;
    color: #fff;
    line-height: 0.53rem;
    text-align: center;
  }
  .exhibi_wrap_news .exhibi_title_news .exhibi_more {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0.15rem 0rem 0 0;
    color: #999;
    font-size: 0.24rem;
  }
  .exhibition_news1 {
    border-bottom: 0.01rem solid #e6e6e6;
  }
  .exhibition_news li{
    width: 6.9rem;
    height: 0.85rem;
    line-height: 0.85rem;
    font-size: 0.28rem;
    display: flex;
    color: #333;
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
