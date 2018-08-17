<template>
  <div class="wrap">
    <div class="title">
      <img src="../assets/images/exhibitions.png" alt="333" class="introduce-icon">
      <div class="title-right">
        <div class="h2">
          <div>历届展会</div>
          <div class="more" @click="goDetails">
            <div class="look-more">查看更多</div>
            <img class="more-img" src="../assets/images/more.png" alt="">
          </div>
        </div>
        <div class="title-right-en">Successive exhibitions</div>
      </div>
    </div>
    <div class="slider">
      <div class="slider-wrap" ref="sliderWrap">
        <div class="slider-content">
          <ul class="successiveExhibitions-news" v-for="group in lists" :key="group.idx">
            <li @click="gotoDetails({idx: group.idx, index: item.id})" v-for="item in group.list" :class="{border: group.length !== (item.id - 1 + 2)}" :key="item.id">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="time-wrap">
        <div ref="timeYaer" style="height: 100%">
          <ul class="time-year">
            <li ref="docWidth" @click="dotsChange(index)" v-for="(item, index) in years" :key="index" :class="{dot_active:(index == dotsIdx)}">{{item.time}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "../utils/slider"
import BScroll from 'better-scroll'

export default {
  name: "successiveExhibitions",
  data() {
    return {
      lists: [
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2013', idx: 0},
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2014', idx: 1},
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2015', idx: 2},
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2016', idx: 3},
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2017', idx: 4},
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2018', idx: 5},
        {list: [{name: '贵金属纪念币知识介绍', id: '0'}, {name: '纪念币的保存、清洗及赝品识别', id: '1'}, {name: '纪念币题材及发行要素辨识', id: '2'}, {name: '购买途径及鉴定证书辨识', id: '3'}, {name: '如何成为特许零售商', id: '4'}], time: '2019', idx: 6},
      ],
      probeType: 1,
      speed: 400,
      years: [],
      dotsIdx: 0,
      isScroll: false
    }
  },
  created() {
    this.initList()
  },
  mounted() {
    setTimeout(() => {
      this._initSlider()
      this._initDocSlider()
      this._initSliderWidth()
    }, 20)
  },
  methods: {
    goDetails() {
      this.$router.push({path: 'exhibitionDetail'});
    },
    initList() {
      this.lists.map(item => {
        this.years.push({time: item.time, index: item.idx})
      })
    },
    _initDocSlider() { // 小轮播 scrollTo
      if (!this.$refs.timeYaer) return
      this.docSlider = new BScroll(this.$refs.timeYaer, {
        scrollX: true,
        click: true, // 这个click 可能会在移动端出现点击的问题 因为它禁掉了 浏览器的默认行为 可以修改为false试一下
        freeScroll: true,
        eventPassthrough: 'vertical',
      })
    },
    _initSlider() { // 大轮播
      if (!this.$refs.sliderWrap) {
        return
      }
      this.slider = new BScroll(this.$refs.sliderWrap, {
        scrollX: true,
        click: true, // 这个click 可能会在移动端出现点击的问题 因为它禁掉了 浏览器的默认行为 可以修改为false试一下
        freeScroll: true,
        eventPassthrough: 'vertical',
        momentum: false,
        snap: {
          loop: false, //loop 为 true 是为了支持循环轮播
          threshold: 0.3, // 表示可滚动到下一个的阈值，easing 表示滚动的缓动函数
          speed: this.speed
        },
        probeType: 3,
      })
      this.slider.on('scrollEnd', (pos) => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.dotsIdx = pageIndex
      })
    },
    refresh() {
      this.slider && this.slider.refrech()
    },
    docLiwidth(e) {
      if (!this.$refs.docWidth) return
      const width = this.$refs.docWidth[e].clientWidth
      return width
    },
    _initSliderWidth() {
      this.slider.on('touchstart', () => {
        this.refrech()
      })
      this.slider.on('scrollEnd', (pos) => {
        let scrollWidth = pos.x
        if (scrollWidth == -310) {
          this.docSlider.scrollTo(0, 0, 300)
        } else if (scrollWidth == -620) {
          if (this.isScroll) {
            this.docSlider.scrollTo(-60, 0, 300)
            this.isScroll = false
          }
        } else if (scrollWidth == -1240) {
          if (!this.isScroll) {
            this.docSlider.scrollTo(-60, 0, 300)
          }
        } else if (scrollWidth == -1550) {
          this.isScroll = true
          this.docSlider.scrollTo(-60 * 2, 0, 300)
        }
      })
    },
    dotsChange(e) { // 同步选项卡
      this.slider.goToPage(e, 0, 400)
      let scroll = this.docLiwidth(e)
      switch (e) {
        case 0:
          return false
        case 1:
          return this.docSlider.scrollTo(0, 0, 300)
        case 2:
          if (this.isScroll) {
            this.docSlider.scrollTo(-scroll, 0, 300)
            this.isScroll = false
          }
          return
        case 3:
          return false
        case 4:
          return this.isScroll ? '' : this.docSlider.scrollTo(-scroll, 0, 300)
        case 5:
          return this.docSlider.scrollTo(-scroll * 2, 0, 300)
        case 6:
          this.isScroll = true
          return false
      }
    },
    gotoDetails(e) {
      // console.log(e)
    }
  },
  computed: {
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus">
  .slider{
    box-shadow: 0.0rem 0rem 0.21rem rgba(198, 160, 86, 0.6);
    padding: 0.43rem 0.29rem 0.45rem 0.29rem;
    width: 6.2rem;
  }
  .slider-wrap {
    position: relative;
    /*height: 5.96rem;*/
    height: 4rem;
    overflow: hidden;
    margin-bottom: 0.41rem;
  }
  .slider-active {
    color: #C6A056;
  }
  .slider-content{
    display: flex;
    position: absolute;
    /*top: 0;
    left: 0;
    width: 100%;
    height: 100%;*/
  }

  .successiveExhibitions-news {
    width: 6.2rem;
    background: rgba(198, 160, 86, 0.08);
    padding: 0.13rem 0;
  }
  .successiveExhibitions-news li{
    height: 0.76rem;
    line-height: 0.76rem;
    margin-left: 0.35rem;
    margin-right: 0.35rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    color: #717170;
  }
  .successiveExhibitions-news .border{
    border-bottom: 0.01rem solid #e4e3e3;
  }
  .look-more {
    margin-right: 0.19rem;
    font-size: 0.32rem;
  }

  .more {
    display: flex;
    justify-content: space-between;
    line-height: 0.26rem;
  }
  .wrap{
    width: 7.14rem;
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
  .time-wrap
    position relative
    overflow hidden
    height 1.17rem
    .time-year
      position absolute
      height: 0.76rem
      background: rgba(198, 160, 86, 0.08)
      display: flex
      line-height: 0.76rem
      font-size: 0.3rem
      margin-top: 0.41rem;
      padding 0 0.1rem
      li
        width 1.2rem
        text-align: center
      .dot_active
        color: #C6A056
        position relative
    .dot_active:after
      position absolute
      display: inline-block;
      top: -0.2rem;
      left: 0.4rem;
      width: 0;
      height: 0px;
      content: '';
      border-style: solid;
      border-width: 0.2rem;
      border-color: rgba(198, 160, 86, 0.08) rgba(198, 160, 86, 0.08) transparent transparent;
      transform: rotate(315deg);
      /*box-shadow: 2px -2px 2px #ccc;*/
    .dot_active:before
      content: ''
      position absolute
      bottom: 0.13rem
      left 0.18rem
      width:58%;
      height:0;
      border-width:0 0.02 0.05rem 0.02rem;
      border-style:none solid solid;
      border-color:transparent transparent #c6a056
</style>
