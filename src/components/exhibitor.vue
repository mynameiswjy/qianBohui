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
    <div style="position: relative" v-show="ad.center" @click="adNavBtn">
      <img :src="ad.center.imagesUrl" v-if="ad.center" alt="" class="ad">
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
      default: () => null
    }
  },
  data() {
    return {
      IsActive: this.$store.state.IsActive,
      adData: this.ad.bottom
    }
  },
  created() {},
  mounted() {},
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
    adNavBtn() {
      const url = this.ad.center.jumpAddress;
      if (!url) return false
      window.location.href = url
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
    width: 6.9rem;
    height: 1.2rem;
    display: block;
    max-height: 1.2rem;
    margin: 0.32rem auto 0;
    background: #EEEEEE;
    border-radius: 0.1rem;
  }
</style>
