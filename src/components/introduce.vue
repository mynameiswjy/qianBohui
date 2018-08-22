<template>
    <div class="wrap">
      <div v-if="openStyle" class="title_ab">
        <h2>{{introduceObj.title}}</h2>
        <div class="">Exhibition Introduction</div>
      </div>
      <div class="title" v-else>
        <img src="../assets/images/introduce.png" alt="333" class="introduce-icon">
        <div class="title-right">
          <h2>{{introduceObj.title}}</h2>
          <div class="title-right-en">Exhibition Introduction</div>
        </div>
      </div>
      <div class="header_intro" :class="{height_hide: !introduceObj.content}">
        <div  class="header-text" :class="{show: false}" ref="contentTxt">
          {{introduceObj.content}}
        </div>
        <div class="loading-container" v-show="!introduceObj.content">
          <loading></loading>
        </div>
        <div v-if="openStyle" v-show="showBtns" class="a_full" @click="showBts">{{showText}}</div>
      </div>
    </div>
</template>

<script>
import Loading from './loading/loading'
export default {
  name: "introduce",
  props: {
    introduceObj: {
      type: Object,
      default: function () {
        return {
          title: '',
          content: ''
        }
      }
    },
    openStyle: {
      type: Boolean,
      default: false
    },
    showBtns: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      obj: {},
      show: true,
      showText: "显示全文"
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showBts() {
      if (this.show) {
        this.show = false
        this.showText = "收起全文"
      } else {
        this.show = true
        this.showText = "显示全文"
      }
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
  .title_ab
    text-align center
    margin-left -0.36rem
    h2
      margin-bottom: 0.1rem;
      font-size: 0.34rem;
      line-height: 0.3rem;
      font-family:PingFangSC-Medium;
      color:rgba(198,160,86,1);
      margin-top 0.58rem
    div
      display: block;
      font-size:0.2rem;
      font-family:PingFangSC-Light;
      color:rgba(207,194,170,1);
      line-height: 0.3rem;
      margin-bottom 0.32rem
  .height_hide
    height 1.5rem
  .header_intro
    width: 6.21rem;
    padding: 0.39rem 0.3rem 0.4rem 0.27rem;
    box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.8);
    border-radius: 0.08rem;
    position: relative
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      left 50%
      transform: translate(-50%, -50%)
    .header-text
      /*height: 3.22rem;*/
      text-align: justify;
      font-size: 0.285rem;
      font-family:PingFangSC-Regular;
      color: rgba(72,72,71,1);
      background:rgba(255,255,255,1);
      line-height: 0.42rem
    .a_full
      font-size: 0.28rem
      font-family:PingFangSC-Light;
      color: #C6A056
      padding-top 0.2rem
      width 1.5rem
  .wrap{
    width: 7.14rem;
    margin-left: 0.36rem;
  }
  .title{
    display: flex;
    margin-bottom: 0.32rem;
    font-family:PingFangSC-Medium;
  }
  .show{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;//向显示多少行就给多大值
    -webkit-box-orient: vertical;
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
  .title h2{
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
</style>
