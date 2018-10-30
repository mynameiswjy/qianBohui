<template>
    <div class="landing_wrap">
      <scroll class="news_landing_content" :data="detailObj">
        <div class="footer_position">
          <nav-bar></nav-bar>
          <div style="height: 0.58rem"></div>
          <div class="landing_title left-margin">{{detailObj.title}}</div>
          <div class="landing_time left-margin">{{detailObj.articlesTime}}</div>
          <div class="landing_content left-margin">
            <dl class="landing_text" v-html="detailObj.content">
              {{detailObj.content}}
            </dl>
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
import {getNewsContent, getShareToken} from '@/api/index'
import { wxShareTemp, againUrl } from '../utils/wx_share'
import { getURLParams } from '../utils/utils'

export default {
  name: "contactUs",
  data() {
    return {
      content: '宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。',
      detailObj: {}
    }
  },
  created() {
    againUrl(this.$route.path, getURLParams('code'))
  },
  activated() {
    document.title = '新闻资讯';
    let code = this.$route.params.code || getURLParams('code')
    console.log('code', getURLParams('code'))
    this.initData(code)
  },
  mounted() {
    this.shareWxNewLanding()
  },
  methods: {
    // 分享
    shareWxNewLanding() {
      getShareToken(this.$route.path, this.$route.params.code || getURLParams('code')).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: this.detailObj.title})
      }).catch(err => {
        console.log(err)
      })
    },
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
        font-weight 600
        line-height 0.5rem
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
