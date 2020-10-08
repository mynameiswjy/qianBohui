<template>
  <div>
    <div class="exhibi_wrap">
      <div class="exhibi_title" :class="{'exhibi_title_active': IsActive}">
        <h2 :class="{'exhibi_title_active1': IsActive}">{{title ? title : '历届展会'}}</h2>
        <div class="selected_wrap">
          <div class="exhibi_more1" @click="openSelect">
            <span class="p1">{{selectName}}</span>
            <div class="iconfont icon-jiantou"></div>
          </div>
          <ul class="sel_options" v-show="IpOpenSelect">
            <li @click.prevent="selectOption({index: index, name: item.name})" v-for="(item, index) in successiveList.selelctYears" :key="index">{{item.name}}</li>
          </ul>
          <div @click="closeSelectMask" :class="{'mask_select': IsmaskSelect}"></div>
        </div>
      </div>
      <ul class="exhibition_Exhibitions">
        <li class="exhibition_news1" v-for="(item, index) in yearList" v-bind:key="index">
          <router-link :to="detailPath(item.code)">
            <div class="h3">
              <p class="h3_con">{{item.title}}</p>
              <span class="iconfont icon-jiantou"></span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <img v-if="ad.bottom" :src="ad.bottom.imagesUrl" alt="" class="ad">
  </div>
</template>

<script>
import Slider from "../utils/slider"
import BScroll from 'better-scroll'

export default {
  name: "successiveExhibitions",
  props: {
    successiveList: {
      type: [Object, Array],
      default: function () {
        return {
          selelctYears: [],
          successiveExhibitors: []
        }
      }
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
      isScroll: false,
      yearIdx: 0,
      IpOpenSelect: false,
      selectName: '请选择',
      IsmaskSelect: false,
      IsActive: this.$store.state.IsActive
    }
  },
  created() {
    this.initList()
  },
  mounted() {
    setTimeout(() => {
      /*this._initSlider()
      this._initDocSlider()
      this._initSliderWidth()*/
    }, 20)
  },
  methods: {
    // 详情页
    detailPath(code) {
      let path = '/newsLandingPage?code=' + code
      return path
    },
    closeSelectMask() {
      this.IsmaskSelect = false
      this.IpOpenSelect = false
    },
    selectOption(e) {
      this.yearIdx = e.index
      this.selectName = e.name + '年'
      this.IpOpenSelect = false
      this.IsmaskSelect = false
      this.$router.push({
        name: "exhibitionDetail",
        params: {
          name: 'exhibitionDetail',
          time: e.name
        }
      })
    },
    openSelect() {
      this.IpOpenSelect = !this.IpOpenSelect
      this.IsmaskSelect = true
    },
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
        click: false, // 这个click 可能会在移动端出现点击的问题 因为它禁掉了 浏览器的默认行为 可以修改为false试一下
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
    }
  },
  computed: {
    yearList() {
      const successiveList = this.successiveList.successiveExhibitors
      return successiveList && successiveList[this.yearIdx].successiveExhibitors
    }
  },
  watch: {
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus">
  .exhibi_wrap {
    margin-left: 0.3rem;
    padding-top: 0.32rem;
    width: 6.9rem;
    background-color: #ffffff;
    position: relative;
  }
  .exhibi_wrap .exhibi_title {
    position: relative;
  }
  .exhibi_wrap .exhibi_title_active {
    background-color: #e20212;
  }
  .exhibi_wrap .exhibi_title_active1 {
    color #fff
  }
  .exhibi_wrap .exhibi_title h2 {
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
  .selected_wrap {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%)
  }
  .exhibi_wrap .exhibi_title .exhibi_more1 {
    font-size: 0.22rem;
    height 0.28rem
    display flex
    align-items center
    color #999
  }
  .exhibi_more1 .p1 {
    display flex
    justify-content center
  }
  .exhibi_more1 .icon-jiantou {
      font-size .2rem
      color #999
  }
  .exhibition_Exhibitions .icon-jiantou {
    color: #bfa267;
    font-size: .24rem;
  }
  .icon-Stone-arrow-dropdown {
    width 0.32rem
    display flex
    justify-content center
    background-color: #f4b024;
    color #fff
  }
  .sel_options {
    position absolute
    width 1rem
    left 0
    top: 0.29rem
    text-align center
    border 0.01rem solid #999
    background-color: #fff
    padding: 0.15rem 0
    z-index 3
  }
  .mask_select {
    width 100%
    position fixed
    top: 0
    bottom 0
    left: 0
  }
  .sel_options li{
    height 0.35rem
    line-height 0.35rem
  }
  .exhibition_news1 {
    border-bottom: 0.01rem solid #e6e6e6;
  }
  .exhibition_Exhibitions li{
    width: 6.9rem;
    height .85rem
    line-height .85rem
    font-size: 0.28rem;
  }
  .exhibition_Exhibitions li .h3{
    display: flex;
    justify-content: space-between;
    color #333
  }
  .exhibition_Exhibitions li .h3 .h3_con {
    overflow: hidden;
    white-space: nowrap;
    width 5rem;
    text-overflow: ellipsis;
  }
  .ad{
    width: 6.9rem;
    height: 1.2rem;
    max-height: 1.2rem;
    margin: 0.32rem auto 0;
    display block;
    border-radius 0.1rem
  }
</style>
