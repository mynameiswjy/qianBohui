<template>
    <div class="landing_wrap">
      <scroll class="news_landing_content" :data="detailObj">
        <div class="footer_position">
          <nav-bar></nav-bar>
          <div style="height: 0.58rem"></div>
          <div class="landing_title left-margin">{{detailObj.title}}</div>
          <div class="landing_time left-margin">{{detailObj.articlesTime}}</div>
          <div class="landing_content left-margin">
            <!--<img class="landing_img" src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="">-->
            <!--<div class="landing_text">{{detailObj.content}}</div>-->
            <dl class="landing_text" v-html="detailObj.content">
              {{detailObj.content}}
            </dl>
            <!--<p>为了纪念与中国建交60周年，柬埔寨中央银行近日发行了《柬中建交60周年纪念钞》。这是柬埔寨首次发行与中国的“建交纪念钞”。中柬两国曾在建交45周年、55周年时联合发行过建交纪念邮票，对传递和加深两国人民友谊上起到了良好的作用。此次首次发行纪念钞，更是再一次证明了友谊的根深蒂固。该纪念钞面值2000瑞尔。在中国同步发行。</p >
            <p>&nbsp;</p >
            <p style="text-align: center;">
              <img title=" " src="http://www.chngc.net/upload/images/2018/8/27/s_2710134396.jpg">
              <br>
              <span></span>
            </p >
            <p>&nbsp;</p >
            <p>中柬建交六十年来，这是首次通过纪念钞的形式纪念两国友谊。《柬中建交60周年纪念钞》也是柬埔寨首个印有中文的流通纪念钞，钞面上印有“建交钞热烈庆祝柬中建交六十周年”，意义非常。当前，柬埔寨处在推进“2015-2025工业发展计划”的关键阶段，中国也处于全面建设小康社会的决胜阶段，两国具有很强互补性，发展战略高度契合。进一步弘扬柬中传统友谊、推进柬中关系发展已成为两国人民的共同心愿</p >-->
          </div>
          <temp-footer class="temp_footer"></temp-footer>
        </div>
      </scroll>
      <tab-bar class="menu-tab"></tab-bar>
    </div>
</template>

<script>
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import scroll from '@/utils/scroll'
import tabBar from '@/container/tabBar' // 底部tabBar
import navBar from './navBar'
import {getNewsContent} from '@/api/index'
export default {
  name: "contactUs",
  data() {
    return {
      content: '宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。',
      detailObj: {}
    }
  },
  created() {
    document.title = '新闻资讯';
  },
  activated() {
    this.initData(this.$route.params.code)
  },
  methods: {
    initData(code) {
      getNewsContent({selectCode: code}).then(res => {
        let data = res.data
        if (data.returnCode === '0000') {
          this.detailObj = data.returnData
        }
      })
    }
  },
  components: {
    tempFooter,
    tabBar,
    scroll,
    navBar
  }
}
</script>

<style scoped lang="stylus">
.landing_wrap
  width 100%
  position fixed
  top: 0
  bottom 0.98rem
  background-color: #fff
  .news_landing_content
    height 100%
    overflow hidden
    .footer_position
      min-height 100%
      position relative
      padding-bottom 2.736rem
      box-sizing border-box
      .landing_title
        font-size: 0.32rem
        color: #010101
        font-family:PingFangSC-Regular
        margin-bottom 0.41rem
      .landing_time
        font-size 0.24rem
        color: #4C4C4C
        margin-bottom 0.46rem
      .landing_content
        padding 0.43rem 0.29rem 0.45rem
        width 6.2rem
        border-radius: 0.08rem
        box-shadow:0 0 0.21rem rgba(198,160,86,0.2);
        .landing_img
          width 6.2rem!important
          height 4.21rem!important
          margin-bottom 0.41rem
        .landing_text
          color: #4C4C4C
          font-family:PingFangSC-Regular;
          line-height 0.42rem
          text-align justify
          font-size 0.28rem
          >>> img
            width 6.2rem!important
            height 4.21rem!important
            margin-bottom 0.41rem
  .temp_footer
    height 2.156rem
    position absolute
    bottom 0
</style>
