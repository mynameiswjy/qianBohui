<template>
    <div style="width: 100%">
      <!--<img :hidden="this.idx != 0" class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">-->
      <img class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">
      <div class="nav-wrapper" ref="viewport">
        <!--<slider style="width: 100%" :data="tabs" :tab="idx">
        </slider>-->
        <div ref="content" style="width: 100%">
          <ul class="tab-conten">
            <li class="tab-li" v-for="tab in tabs" v-bind:key="tab.id" @click="navBtn(tab.id)">
              <router-link class="link-go" :to="tab.path">{{tab.name}}</router-link>
            </li>
          </ul>
        </div>
        <div class="search" @click="searchBtn"><img src="../assets/images/search.png" class="search-icon" alt=""/></div>
      </div>
    </div>
</template>

<script>
import Slider from "../utils/silder.vue"
import BScroll from 'better-scroll'

export default {
  name: "navBar",
  data() {
    return {
      tabs: [
        {name: '首页', id: '0', path: '/homePage'},
        {name: '关于展会', id: '1', path: '/aboutzh'},
        {name: '展商专区', id: '2', path: '/goods'},
        {name: '观众专区', id: '3', path: '/audience'},
        {name: '新闻资讯', id: '4', path: '/news'},
      ],
      idx: 0
    }
  },
  mounted() {
    // this._initTabListWidth()
    setTimeout(() => {
      this._initSlider()
      console.log(this.slider)
    }, 20)
  },
  methods: {
    navBtn(e) {
      if (e == 4) {
        this.slider.scrollTo(-30, 0, 300)
      } else if (e == 1) {
        this.slider.scrollTo(0, 0, 300)
      }
    },
    _initSlider() {
      if (!this.$refs.content) {
        return
      }
      this.slider = new BScroll(this.$refs.content, {
        scrollX: true,
        click: true, // 这个click 可能会在移动端出现点击的问题 因为它禁掉了 浏览器的默认行为 可以修改为false试一下
        freeScroll: true,
        eventPassthrough: 'vertical',
        /*snap: {
          loop: false, //loop 为 true 是为了支持循环轮播
          threshold: this.threshold, // 表示可滚动到下一个的阈值，easing 表示滚动的缓动函数
          speed: this.speed
        },*/
        probeType: 3,
      })
      this.slider.on('scrollEnd', (pos) => {
      })
    },
    _initTabListWidth() {
      const tabList = this.$refs.content
      const items = tabList.children
      let width = 0
      for (let i = 0; i < items.length; i++) {
        width += items[i].clientWidth
      }
      tabList.style.width = (width + 38) + 'px'
    },
    _adjust(tabId) {
      const viewportWidth = this.$refs.viewport.clientWidth
      const tabListWidth = this.$refs.content.clientWidth
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const middleTranslate = viewportWidth / 2
      const items = this.$refs.content.children
      let width = 0
      this.tabs.every((item, index) => {
        if (item.id === tabId) {
          return false
        }
        width += items[index].clientWidth
        return true
      })
      let translate = middleTranslate - width
      translate = Math.max(minTranslate, Math.min(0, translate))
      this.$refs.content.scrollTo(translate, 0, 300)
    },
    Initslider() {
      if (!this.$refs.content) {
        return
      }
      this.slider = this.$refs.content
    },
    searchBtn() {
      this.$router.push({path: 'search'});
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus">
  .nav-wrapper
    /*margin-top -0.04rem*/
    position relative
    width 100%
    border-bottom 0.01rem solid #EEECE9
    height: 0.79rem
    line-height 0.79rem
    overflow hidden
    .tab-conten
      display: flex
      width 110%
      height 100%
      line-height: 0.79rem
      text-align: center
      font-size: 0.28rem
      font-family: PingFangSC-Regular
      position: absolute
      top: 0
      left: 0
      .tab-li
        padding-left: 0.36rem;
        position: relative
        .link-go
          color #333
          width 100%
          height 100%
          /*font-size 0.3rem*/
        .router-link-active
          color: #C8A258
          padding-bottom: 0.16rem
          border-bottom: 0.06rem solid #C8A258
  .title-img{
    width: 7.5rem;
    height: 3.41rem;
  }
  .search{
    position: absolute;
    right: 0.36rem;
    width: 0.82rem;
    text-align: right;
    top 0.03rem
    height: 0.79rem;
    background rgba(255,255,255, 0.6)
  }
  .search-icon{
    width: 0.32rem;
    height: 0.32rem;
  }
  /*.active:after {
    content: '';
    position: absolute;
    left: 18px;
    top: auto;
    bottom: 0;
    right: auto;
    height: 3px;
    width: 25px;
    border-radius:5px;
    background-color: #C8A258;
  }*/
</style>
