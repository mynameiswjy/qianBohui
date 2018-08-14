<template>
    <div class="temp_wrap left-margin">
      <ul class="header_nav">
        <li :class="{'text_active':idx == index, 'li_add_style': aboutzhObj.navList.length == 2}"
            @click="changeTempBtns(index)"
            v-for="(item, index) in aboutzhObj.navList"
            :key="index"
        >
          {{item}}
          <img v-show="idx == index" class="arrow" src="../../assets/images/arrow.png" alt="">
        </li>
      </ul>
      <div  class="temp_content">
        <ul>
          <li class="temp_content-li" :class="{show: show}" v-show="index == idx" v-for="(text, index) in aboutzhObj.textList" :key="index">{{text.text}}</li>
        </ul>
        <div class="a_full" @click="showBts">{{showText}}</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'publicTemp',
  props: {
    aboutzhObj: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      idx: 0,
      show: true,
      showText: "显示全文"
    }
  },
  created() {
  },
  methods: {
    changeTempBtns(e) {
      this.idx = e
    },
    showBts() {
      if (this.show) {
        this.show = false
        this.showText = "收起全文"
      } else {
        this.show = true
        this.showText = "显示全文"
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .temp_wrap
    .header_nav
      display flex
      font-size: 0.34rem
      font-family PingFangSC-Medium
      color #333
      margin-bottom 0.2rem
      margin-right 0.38rem
      justify-content space-between
      li
        padding 0.26rem 0
        position relative
        .arrow
          position absolute
          left: 38%
          top: 1.06rem
          width 0.42rem
          height 0.36rem
      .li_add_style
        margin:0 0.89rem
      .text_active
        color: #C6A056
        position relative
      .text_active:after
        content: ''
        position absolute
        bottom: 0
        left 0
        width:95%
        height:0
        border-width:0 0.04rem 0.05rem 0.04rem
        border-style:none solid solid
        border-color:transparent transparent #c8a258
    .temp_content
      width 6.21rem
      margin-top 0.55rem
      padding 0.34rem 0.3rem 0.38rem 0.27rem
      border-radius 0.08rem
      box-shadow 0rem 0 0.21rem #C6A056
      background-color: #fff
      .a_full
        font-size: 0.28rem
        font-family:PingFangSC-Light;
        color: #C6A056
        padding-top 0.2rem
        width 1.5
      .temp_content-li
        text-align: justify;
        font-size: 0.28rem
        font-family:PingFangSC-Regular;
        color:rgba(72,72,71,1);
        line-height: 0.42rem
  .show{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;//向显示多少行就给多大值
    -webkit-box-orient: vertical;
  }
</style>
