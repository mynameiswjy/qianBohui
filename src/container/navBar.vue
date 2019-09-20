<template>
    <div style="width: 100%;background-color: #F4F3F3;">
      <!--<img v-show="isShowNavImg" class="title-img" :src="imgIndex">-->
      <!--<div style="height: 0.1rem;"></div>-->
      <div style="padding: 0.12rem 0 0.12rem 0;" :class="{'sea-wrap': IsActive}">
        <div class="search_btn" @click="searchBtn">
          <div>钱币博览会</div>
          <div class="search_icon">
            <img src="https://www.chbice.com/imgFile/cut/search.png" class="search-icon" alt=""/>
          </div>
        </div>
      </div>
      <div v-if="imgIndex.length" v-show="isShowNavImg">
        <Swiper :len="imgIndex.length">
          <div v-for="(item, index) in imgIndex" :key="index" class="swiper_item">
            <img :src="item.imgIndex" alt="banner">
          </div>
        </Swiper>
      </div>
      <div class="nav-wrapper" ref="viewport" v-if="NewNav">
        <div ref="content" style="width: 100%">
          <ul class="tab-conten">
            <li class="tab-li" v-for="tab in tabs" v-bind:key="tab.id" @click="navBtn({idx: tab.id, path: tab.path})">
              <router-link class="link-go" :to="tab.path">{{tab.name}}</router-link>
            </li>
          </ul>
        </div>
        <div class="search" @click="searchBtn"><img src="../assets/images/search.png" class="search-icon" alt=""/></div>
      </div>
      <div class="nav_wrap" v-else>
        <ul class="nav_content">
          <li class="nav_item" :class="{'nav_item1': index != tabs.length-1}" v-for="(tab, index) in tabs" v-bind:key="tab.id" @click="navBtn({idx: tab.id, path: tab.path})">
            <router-link class="link-go" :to="tab.path">
              <div class="nav_img" :class="{'nav_img1': routerPath == tab.path && !IsActive}">
                <img :src="tab.selectImg" :class="{'img_node': IsActive}" alt="nav" v-if="routerPath == tab.path">
                <img :src="tab.img" :class="{'img_node': IsActive}" alt="nav" v-else>
              </div>
              <div class="nav_name" :class="{'nav_name1': routerPath == tab.path}">{{tab.name}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
//import { ease } from '../utils/ease'
import * as types from '../store/mutation-types'
import Swiper from '@/utils/swiper'

export default {
  name: "navBar",
  props: {
    isShowNavImg: {
      type: Boolean,
      default: false
    },
    NewNav: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabs: [
        {
          name: '首页',
          id: '0',
          path: '/homePage',
          show: true,
          img: 'https://www.chbice.com/imgFile/nav_icon1.png', //cut/index.png
          selectImg: 'https://www.chbice.com/imgFile/select_nav_icon1.png' //cut/index_active.png
        },
        {
          name: '关于展会',
          id: '1',
          path: '/aboutzh',
          img: 'https://www.chbice.com/imgFile/nav_icon2.png', //cut/exhibition.png
          selectImg: 'https://www.chbice.com/imgFile/select_nav_icon2.png'// cut/exhibition_active.png
        },
        {
          name: '展商专区',
          id: '2',
          path: '/goods',
          img: 'https://www.chbice.com/imgFile/nav_icon3.png', // cut/exhibitor.png
          selectImg: 'https://www.chbice.com/imgFile/select_nav_icon3.png' // cut/exhibitor_active.png
        },
        {
          name: '观众专区',
          id: '3',
          path: '/audience',
          img: 'https://www.chbice.com/imgFile/nav_icon4.png', // cut/audience.png
          selectImg: 'https://www.chbice.com/imgFile/select_nav_icon4.png' //cut/audience_active.png
        },
        {
          name: '新闻资讯',
          id: '4',
          path: '/news',
          img: 'https://www.chbice.com/imgFile/nav_icon5.png', // cut/news.png
          selectImg: 'https://www.chbice.com/imgFile/select_nav_icon5.png' // cut/news_active.png
        },
      ],
      navIdx: 0,
      images: [
        /*{img: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'},*/
        {img: 'https://www.chbice.com/imgFile/20181014165937.jpg'},
        /*{img: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'},
        {img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'}*/
      ],
      scrollToEasing: 'bounce',
      IsActive: this.$store.state.IsActive // 十一活动样式控制器
    }
  },
  created() {
  },
  mounted() {
    this.$store.commit(types.ROUTER_PATH, this.$route.path)
    console.log(this.$store.state.imgIndex);
    setTimeout(() => {
      this._initSlider()
    }, 20)
  },
  methods: {
    navBtn(e) {
      this.$store.commit(types.ROUTER_PATH, e.path)
      let idx = e.idx
      if (idx == 4) {
        // this.slider.scrollTo(-30, 0, 500, ease[this.scrollToEasing])
      } else if (idx == 1 || idx == 0) {
        // this.slider.scrollTo(0, 0, 500, ease[this.scrollToEasing])
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
        probeType: 3,
      })
      this.slider.on('scrollEnd', (pos) => {
      })
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
  computed: {
    imgIndex() {
      return this.$store.state.imgIndex
    },
    routerPath() {
      return this.$store.state.routerPath
    }
  },
  components: {
    Swiper
  }
}
</script>

<style scoped lang="stylus">
  .sea-wrap
    background-color: #e20212;
  .search_btn
    width 6.75rem
    height 0.62rem
    margin 0 0 0 0.25rem
    box-shadow: 0.03rem 0.05rem 0.06rem 0  rgba(86, 88, 89, 0.18);
    border-radius: 0.14rem;
    display flex
    font-size 0.26rem
    background-color: #fff
    color rgba(0,0,0,0.5)
    align-items center
    padding-left 0.25rem
    justify-content space-between
    .search_icon
      width 0.61rem
      height 0.62rem
      background-color: #F4BB43
      border-radius 0 0.14rem 0.14rem 0
      img
        width 0.46rem
        height auto
        display block
        margin 0.1rem auto 0
  .nav_wrap
    background-image: url("../assets/images/actve_top.jpg")
    background-repeat no-repeat
    background-size 100% 100%
    .nav_content
      display flex
      padding 0.7rem 0
      margin-left 0.38rem
      .nav_item1
        margin-right 0.46rem
      .nav_item
        width 0.98rem
        margin-left
        .nav_name1
          font-weight 600
        .nav_name
          font-size 0.24rem
          color: #000
          text-align center
          margin-top 0.14rem
        .nav_img
          width 0.98rem
          height 0.98rem
          background-color: #fff
          border-radius 0.98rem
          display flex
          justify-content center
          align-items center
          img
            width 0.6rem
            height: auto
          .img_node
            width 0.98rem
        .nav_img1
          background-color: #F4BB43;
  .nav-wrapper
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
          position: relative
        .router-link-active:after
          content: ''
          position absolute
          bottom: -0.04rem
          left -0.02rem
          width:100%
          height:0
          border-width:0 0.04rem 0.05rem 0.04rem
          border-style:none solid solid
          border-color:transparent transparent #c8a258
  .title-img{
    width: 7.5rem;
    height: 3.41rem;
  }
  .search{
    position: absolute;
    right: 0;
    width: 1.2rem;
    text-align: center;
    top 0.09rem
    height: 0.72rem;
    background rgba(255,255,255, 0.9)
  }
  .search-icon{
    width: 0.32rem;
    height: 0.32rem;
  }
</style>
