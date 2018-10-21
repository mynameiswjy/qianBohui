<template>
    <div class="contact_wrap">
      <scroll class="contact_content">
        <div class="contact_footer_position">
          <nav-bar></nav-bar>
          <!--<div style="height: 0.01rem"></div>-->
          <introduce :openStyle="false" :IsContactWay="true" :show="false" :showBtns="false" :introduceObj="introduceObj"></introduce>
          <temp-footer class="temp_footer"></temp-footer>
        </div>
      </scroll>
      <tab-bar class="menu-tab"></tab-bar>
    </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import scroll from '@/utils/scroll'
import tabBar from '@/container/tabBar' // 底部tabBar
import navBar from './navBar'
import {getShareToken} from '@/api/index'
import { wxShareTemp } from '../utils/wx_share'

export default {
  name: "contactUs",
  data() {
    return {
      introduceObj: {
        content: " ",
        title: '联系我们'
      }
    }
  },
  activated() {
    document.title = '联系我们';
  },
  mounted() {
    this.shareWxCon()
  },
  methods: {
    // 分享
    shareWxCon() {
      getShareToken(this.$route.path).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: '北京国家钱币博览会联系我们'})
      }).catch(err => {
        console.log(err)
      })
    },
  },
  components: {
    introduce,
    tempFooter,
    tabBar,
    scroll,
    navBar
  }
}
</script>

<style scoped lang="stylus">
.contact_wrap
  position fixed
  top: 0
  bottom 0.98rem
  width 100%
  background-color: #fff
  .contact_content
    height 100%
    overflow hidden
    .contact_footer_position
      min-height 100%
      position relative
      padding-bottom 2.736rem
      box-sizing border-box
.temp_footer
  height 2.156rem
  position absolute
  bottom 0
</style>
