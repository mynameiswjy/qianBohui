<template>
    <div class="landing_wrap">
      <scroll class="news_landing_content" :data="detailObj">
        <div class="footer_position">
          <nav-bar style="padding-top: .3rem;"></nav-bar>
          <div class="landing_container">
            <div style="height: 0.16rem"></div>
            <div class="landing_title">{{detailObj.title}}</div>
            <div class="landing_time">{{detailObj.articlesTime}}</div>
            <div class="landing_content">
              <dl class="landing_text" v-html="detailObj.content"><!--detailObj.-->
                {{detailObj.content}}
              </dl>
            </div>
          </div>
          <temp-footer class="temp_footer"></temp-footer>
        </div>
      </scroll>
      <tab-bar class="menu-tab"></tab-bar>
      <reload @reloadBtn="reloadBtn" v-show="IsOpenReloadTemp"></reload>
    </div>
</template>

<script>
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import reload from '@/components/reloadTemp' // 网络错误
import * as types from '../store/mutation-types'
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
      content: '<p>hadsfhadsjfkjadskfjadskjfk</p><p>&nbsp;<video src="https://cm15-c110-2.play.bokecc.com/flvs/FC811B3AFE595DA3/2019-08-29/123ECC033ABD9BC09C33DC5901307461-10.m3u8?t=1567597158&key=4F2A308505E02164B895FD25B82ED9D8&tpl=10" x5-playsinline="" playsinline="" style="width=100%; height=100%; object-fit: fill" poster="" controls="controls">您的浏览器不支持video播放</video>',
      detailObj: {},
      IsOpenReloadTemp: false,
      isRefrensh: false
    }
  },
  created() {
    againUrl(this.$route.path, getURLParams('code'))
  },
  activated() {
    document.title = '新闻资讯';
    let code = this.$route.params.code || getURLParams('code')
    this.initData(code)
    this.$store.commit(types.ROUTER_PATH, this.$route.path)
  },
  mounted() {
    this.shareWxNewLanding()
  },
  methods: {
    loadImg() {
      console.log(66666666666)
    },
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
          if (this.IsOpenReloadTemp) {
            this.IsOpenReloadTemp = false
          }
        }
      }).catch(() => {
        this.IsOpenReloadTemp = true
      })
    },
    reloadBtn() {
      this.initData(this.$route.params.code || getURLParams('code'))
    }
  },
  components: {
    tempFooter,
    tabBar,
    scroll,
    navBar,
    reload
  }
}
</script>

<style scoped lang="stylus">
.landing_wrap
  width 100%
  position fixed
  top: 0
  bottom 0.98rem
  background-color: #fff;
  .news_landing_content
    height 100%
    overflow hidden
    .footer_position
      min-height 100%
      position relative
      padding-bottom 2.736rem
      box-sizing border-box
      .landing_container
        background-color: #fff
        width 6.9rem
        height 100%
        margin-left 0.3rem
        .landing_title
          font-family:PingFangSC-Regular
          max-width 6.72rem
          font-size: 0.32rem
          text-align justify
          line-height: 0.46rem
          letter-spacing: 0.01rem
          color: #333;
          margin 0 auto 0.06rem
        .landing_time
          font-size: 0.26rem
          line-height: 1
          color: #888;
          margin 0.32rem 0 .32rem 0
        .landing_content
          padding-bottom 1rem
          max-width 6.9rem
          .landing_img
            width 6.2rem!important
            height 4.21rem!important
            margin-bottom 0.41rem
          .landing_text
            font-family:PingFangSC-Regular
            text-align justify
            font-size 0.28rem
            line-height: 0.5rem
            color: #333
            max-width 6.9rem
            >>> img
              width 6.2rem!important
              height 4rem!important
              margin-bottom 0.41rem
            >>> video
              width 6.75rem
              height 2.86rem
              margin 0.7rem auto
              background-repeat no-repeat
              background-size 6.75rem 2.86rem
.temp_footer
    height 2.156rem
    position absolute
    bottom 0
</style>
