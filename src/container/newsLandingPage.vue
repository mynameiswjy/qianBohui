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
              <div class="audio_wrap">
                <audio ref="audio" src="https://www.chbice.com/imgFile/202011031355331111.mp3"></audio>
                <div @click="playAudioBtn" class="iconfont" :class="!audioState?'icon-bofang':'icon-zanting'"></div>
                <div class="progress">
                  <div class="progress_center" :style="{width:progressWidth+'rem'}"></div>
                </div>
                <div class="iconfont icon-zyt-yinpinbofang"></div><!---->
              </div>
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
      isRefrensh: false,
      audioState: false,
      AudioStartTime: 0,
      AudioEndTime: 0,
      progressWidth: 0,
      AudioTotalTime: 0
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
    this.getAudioTime()
    this.audiointerval = null
  },
  mounted() {
    this.shareWxNewLanding()
  },
  methods: {
    getAudioTime() {
      const audio = new Audio('https://www.chbice.com/imgFile/202011031355331111.mp3');
      audio.load()
      audio.oncanplay = () => {
        const time = audio.duration;
        //分钟
        let minute = time / 60;
        let minutes = parseInt(minute);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //秒
        let second = time % 60;
        let seconds = Math.round(second);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        //总共时长的秒数
        this.AudioEndTime = `${minutes}:${seconds}`;
        this.AudioTotalTime = minutes * 60 + seconds
      }
    },
    playAudioBtn() {
      if (!this.audioState) {
        this.$refs.audio.play()
        this.audioState = true
        this.audiointerval = setInterval(() => {
          const audio = this.$refs.audio;
          const coe = audio.currentTime / this.AudioTotalTime;
          if (this.progressWidth > 5) {
            this.progressWidth = 0
            audio.pause()
            this.audiointerval = null
            this.audioState = false
          } else {
            this.progressWidth = coe * 5
          }
        }, 1000)
      } else {
        this.$refs.audio.pause();
        this.audioState = false;
        this.audiointerval = null
      }
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
  watch: {
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
  .audio_wrap
    width 6.9rem
    height .88rem
    background-color #F8F8FF
    border-radius .45rem
    display flex
    justify-content space-between
    align-items center
    .icon-bofang, .icon-zanting
      padding-left .45rem
    .icon-zyt-yinpinbofang
      margin-right .2rem
      width .6rem
      height .6rem
      color #4caf50
      border-radius .3rem
      text-align center
      line-height .6rem
      background-color #fff
    .progress
      width 5rem
      height 0.05rem
      background-color #fff
      position: relative;
    .progress_center
      height 0.05rem
      position absolute
      left 0
      top 0
      background-color #4caf50
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
              width 6.9rem
              height 5.5rem
              margin 0 auto
              background-repeat no-repeat
              background-size 6.75rem 2.86rem
            >>> audio
              width 6.9rem
              margin 0
              padding 0
.temp_footer
    height 2.156rem
    position absolute
    bottom 0
</style>
