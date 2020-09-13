<template>
  <div><!--exhibitionNews.vue-->
    <div class="exhibitor_wrap">
      <div class="exhibi_title_exhibi" :class="{'exhibi_title_active': IsActive}">
        <h2>{{title ? title : '展商介绍'}}</h2>
        <div class="exhibi_more" @click="moreNews">
          <div>更多</div>
          <div class="iconfont icon-jiantou"></div>
        </div>
      </div>
      <ul class="exhibition_news">
        <li class="exhibition_news1"
            v-for="(item, index) in exhibitorsIntroduce" @click="goToDetail(item.code)" v-bind:key="index">
          <router-link :to="detailPath(item.code)">
            <div class="h3">
              <span>{{item.title}}</span>
              <span class="iconfont icon-jiantou item_icon"></span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div style="position: relative" v-show="ad.show == 'Y'">
      <img :src="ad.url" alt="" class="ad">
    </div>
  </div>
</template>

<script>
export default {
  name: "exhibitor",
  props: {
    exhibitorsIntroduce: {
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
  .exhibitor_wrap {
    margin-left: 0.3rem;
    padding-top: 0.32rem;
    width: 6.9rem;
    background-color: #ffffff;
    position: relative;
  }

  .exhibitor_wrap .exhibi_title_exhibi {
    position: relative;
  }

  .exhibitor_wrap .exhibi_title_active {
    background-color: #e20212;
    color: #fff;
  }

  .exhibitor_wrap .exhibi_title_exhibi h2 {
    background-image: url("https://www.chbice.com/imgFile/icon/title_bg.png");
    background-repeat: no-repeat;
    background-size: 2.45rem 0.53rem;
    width: 2.45rem;
    height: 0.53rem;
    margin: 0 auto 0.2rem;
    font-size: 0.32rem;
    color: #fff;
    line-height: 0.53rem;
    text-align: center;
  }

  .exhibitor_wrap .exhibi_title_exhibi .exhibi_more {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.15rem 0rem 0 0;
    /*z-index: 2;*/
    color: #999;
    font-size: 0.24rem;
    display: flex;
    align-items: center;
  }

  .icon-jiantou {
    font-size: 0.20rem;
  }

  .item_icon {
    color: #BFA267;
    font-size: 0.24rem;
  }

  .exhibition_news1 {
    border-bottom: 0.01rem solid #e6e6e6;
  }

  .exhibition_news li {
    width: 6.9rem;
    line-height: 0.85rem;
    font-size: 0.28rem;
    color: #333;
    height: 0.85rem;
  }

  .exhibition_news li .h3 {
    display: flex;
    justify-content: space-between;
    height: 0.7rem;
    overflow: hidden;
    white-space: nowrap;
    color: #000;
    text-overflow: ellipsis;
  }

  .ad {
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
