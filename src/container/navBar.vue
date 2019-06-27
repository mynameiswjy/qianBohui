<template>
    <div style="width: 100%">
      <img v-show="isShowNavImg" class="title-img" :src="imgIndex">
      <div class="nav-wrapper" ref="viewport">
        <div ref="content" style="width: 100%">
          <ul class="tab-conten">
            <li class="tab-li" v-for="tab in tabs" v-bind:key="tab.id" @click="navBtn(tab.id)">
              <router-link class="link-go" :to="tab.path">{{tab.name}}</router-link>
            </li>
            <img src="../../../H5/images/未选中.png"/>
          </ul>
        </div>
        <div class="search" @click="searchBtn"><img src="../assets/images/search.png" class="search-icon" alt=""/></div>
      </div>
      <view class="">
        <ul class="">
          <li class="" v-for="tab in tabs" v-bind:key="tab.id" @click="navBtn(tab.id)">
            <router-link class="link-go" :to="tab.path"><img src="../../../H5/images/未选中.png"/>
              <img src="" alt="">
              <div>{{tab.name}}</div>
            </router-link>
          </li>
        </ul>
      </view>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {ease} from '../utils/ease'

export default {
  name: "navBar",
  props: {
    isShowNavImg: {
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
          img: 'https://www.chqbh.com/imgFile/cut/index.png',
          selectImg: 'https://www.chqbh.com/imgFile/cut/index_active.png'
        },
        {
          name: '关于展会',
          id: '1',
          path: '/aboutzh',
          img: 'https://www.chqbh.com/imgFile/cut/exhibition.png',
          selectImg: 'https://www.chqbh.com/imgFile/cut/exhibition_active.png'
        },
        {
          name: '展商专区',
          id: '2',
          path: '/goods',
          img: 'https://www.chqbh.com/imgFile/cut/exhibitor.png',
          selectImg: 'https://www.chqbh.com/imgFile/cut/exhibitor_active.png'
        },
        {
          name: '观众专区',
          id: '3',
          path: '/audience',
          img: 'https://www.chqbh.com/imgFile/cut/audience.png',
          selectImg: 'https://www.chqbh.com/imgFile/cut/audience_active.png'
        },
        {
          name: '新闻资讯',
          id: '4',
          path: '/news',
          img: 'https://www.chqbh.com/imgFile/cut/news.png',
          selectImg: 'https://www.chqbh.com/imgFile/cut/news_active.png'
        },
      ],
      navIdx: 0,
      scrollToEasing: 'bounce'
    }
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this._initSlider()
    }, 20)
  },
  methods: {
    navBtn(e) {
      if (e == 4) {
        this.slider.scrollTo(-30, 0, 500, ease[this.scrollToEasing])
      } else if (e == 1 || e == 0) {
        this.slider.scrollTo(0, 0, 500, ease[this.scrollToEasing])
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
    }
  },
  components: {
  }
}
</script>

<style scoped lang="stylus">
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
