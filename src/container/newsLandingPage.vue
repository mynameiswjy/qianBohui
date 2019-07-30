<template>
    <div class="landing_wrap">
      <scroll class="news_landing_content" :data="detailObj">
        <div class="footer_position">
          <nav-bar></nav-bar>
          <div class="landing_container">
            <div style="height: 0.16rem"></div>
            <div class="landing_title">{{detailObj.title}}</div>
            <div class="landing_time">{{detailObj.articlesTime}}</div>
            <div class="landing_content">
              <dl class="landing_text" v-html="content"><!--detailObj.-->
                {{content}}
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
      content: '<p>最后，我们贴心的从隔壁中国金币编辑部为大家要来了活动现场录音，一起来听听中国金币总公司设计部的郝望舒小姐姐讲述书法纪念币的设计故事吧~</p >' +
      '<p>最后，我们贴心的从隔壁中国金币编辑部为大家要来了活动现场录音，一起来听听中国金币总公司设计部的郝望舒小姐姐讲述书法纪念币的设计故事吧~</p>' +
      '<p>最后，我们贴心的从隔壁中国金币编辑部为大家要来了活动现场录音，一起来听听中国金币总公司设计部的郝望舒小姐姐讲述书法纪念币的设计故事吧~ </p>' +
      '<p><img width="6.75" height="auto" src="https://images.unsplash.com/photo-1551446591-142875a901a1?w=640" alt="" style=""></p><p></p><p>' +
      '<video src="http://113.18.195.11/hc.yinyuetai.com/uploads/videos/common/E63C013133463BFF9547498EDD0A02CA.flv?sc=d677f5261e6de6df&br=726&vid=212678&aid=1589&area=KR&vst=3" ' +
      'poster="" controls="controls">您的浏览器不支持video播放</video> <br></p><p><br></p><p></p ><p>&nbsp;' +
      '<audio src=" http://localhost:8081/qbh/news/getPicture.do?fileUrl=E:/imgFile/20190727160720fdd1115ac2c3e1dc84ea878082741e1b.mp3" ' +
      'controls="controls">您的浏览器不支持audio播放</audio>&nbsp;</p >' +
      '<br><p></p><p><br></p ><p><br></p><br><p></p><p><br></p><p><br></p><p><br></p><p><br></p ><p><br></p>',
      detailObj: {},
      IsOpenReloadTemp: false
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
  background-color: #F4F3F3;
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
        width 7rem
        height 100%
        margin-left 0.25rem
        box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
        border-radius: 0.14rem
        .landing_title
          font-family:PingFangSC-Regular
          margin-left 0.27rem
          max-width 6.48rem
          font-size: 0.36rem
          font-weight: 600
          text-align justify
          line-height: 0.6rem
          letter-spacing: 0.01rem
          color: #000000;
          margin-bottom 0.06rem
        .landing_time
          font-size: 0.24rem
          line-height: 1
          margin-left 0.25rem
          color: #232323;
          margin-bottom 0.4rem
        .landing_content
          /*padding 0.43rem 0.29rem 0.45rem*/
          padding-bottom 1rem
          margin-left 0.25rem
          max-width 6.48rem
          .landing_img
            width 6.2rem!important
            height 4.21rem!important
            margin-bottom 0.41rem
          .landing_text
            font-family:PingFangSC-Regular
            text-align justify
            font-size 0.28rem
            line-height: 0.6rem
            color: #000000
            max-width 6.48rem
            >>> img
              width 6.2rem!important
              height 4.21rem!important
              margin-bottom 0.41rem
            >>> video
              width 6.75rem
              height 2.86rem
              margin 0.7rem auto
              background-image
              background-image url("https://images.unsplash.com/photo-1551446591-142875a901a1?w=640")
              background-repeat no-repeat
              background-size 6.75rem 2.86rem
.temp_footer
    height 2.156rem
    position absolute
    bottom 0
</style>
