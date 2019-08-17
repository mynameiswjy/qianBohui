<template>
  <div>
    <div class="exhibi_wrap">
      <div class="exhibi_title">
        <h2>{{title ? title : '历届展会'}}</h2>
        <div class="selected_wrap">
          <div class="exhibi_more1" @click="openSelect">
            <span class="p1">{{selectName}}</span>
            <span class="iconfont icon-Stone-arrow-dropdown"></span>
          </div>
          <ul class="sel_options" v-show="IpOpenSelect">
            <li @click.prevent="selectOption({index: index, name: item.name})" v-for="(item, index) in successiveList.selelctYears" :key="index">{{item.name}}</li>
          </ul>
          <div @click="closeSelectMask" :class="{'mask_select': IsmaskSelect}"></div>
        </div>
      </div>
      <ul class="exhibition_news">
        <li :class="{'exhibition_news1': index != yearList.length-1}" v-for="(item, index) in yearList" v-bind:key="index">
          <router-link :to="detailPath(item.code)">
            <div class="h3">
              <p class="h3_con">{{item.title}}</p>
              <span class="iconfont icon-gengduo"></span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!--<img src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="" class="ad">-->
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
      IsmaskSelect: false
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
  .selected_wrap {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.36rem 0.24rem 0 0;
  }
  .exhibi_wrap .exhibi_title .exhibi_more1 {
    font-size: 0.22rem;
    width 1.28rem
    height 0.28rem
    background-color: #fff
    line-height 0.28rem
    box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
    border-radius: 0.04rem;
    display flex
  }
  .exhibi_more1 .p1 {
    width 0.96rem
    display flex
    justify-content center
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
    width 1.26rem
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
    color #000
  }
  .exhibition_news li .h3 .h3_con {
    overflow: hidden;
    white-space: nowrap;
    width 5rem;
    text-overflow: ellipsis;
  }
  .ad{
    width: 7rem;
    height: 1.2rem;
    max-height: 1.2rem;
    margin-top: 1rem;
    margin-left: 0.25rem;
  }
</style>
