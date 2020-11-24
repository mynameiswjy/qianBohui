<template>
    <div class="news_container">
      <div class="news_wrap_new">
        <div class="exhibi_title">展会新闻</div>
        <ul class="exhibition_news">
          <li :class="{'exhibition_news1': index + 1 !== listZHXW.length}" v-for="(item, index) in listZHXW" :key="item.id" @click="goToDetail(item.code)">
            <div class="h3">
              <span class="span">{{item.title}}</span>
              <span class="">{{item.newsTime}}</span>
            </div>
          </li>
        </ul>
        <div class="btns">
          <div @click="prevClick" :class="{'page_btn': pageActive}" class="prev">上一页</div>
          <div v-show="!prevHide" :class="{'page_btn': !pageActive}" @click="nextClick" class="next">下一页</div>
        </div>
      </div>
      <div class="news_detail">
        <ul class="nav_news">
          <li class="li_add_style" @click="selectNewsTitle(index)" :class="{'nav_news1':idx == index,}" v-for="(item,index) in navNews" :key="index">
            {{item}}
          </li>
        </ul>
        <ul class="news_list">
          <li class="" :class="{'news_boeder': index != listZSJS.length-1}" @click="goToDetail(item.code)" v-for="(item, index) in listZSJS" :key="index">
            <div class="news_content_list_left">{{item.title}}</div>
            <div>{{item.newsTime}}</div>
          </li>
        </ul>
        <div class="btns">
          <div class="prev" :class="{'page_btn': newsContentAct}" @click="prevZSJS">上一页</div>
          <div class="next" :class="{'page_btn': !newsContentAct}" @click="nextZSJS">下一页</div>
        </div>
      </div>
      <temp-footer class="footer-top"></temp-footer>
      <div style="height: 0.98rem"></div>
      <tabBar class="menu-tab"></tabBar>
      <reload @reloadBtn="reloadNewsBtn" v-show="IsReloadTemp"></reload>
    </div>
</template>

<script >
import tabBar from '@/container/tabBar' // 底部tabBar
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import reload from '@/components/reloadTemp' // 网络错误
import * as types from '../store/mutation-types'
import {getNewsCategory, getShareToken} from '@/api/index'
import { wxShareTemp, againUrl } from '../utils/wx_share'

export default {
  name: "aboutzh",
  data() {
    return {
      idx: 0,
      navNews: ['行业动态', '展商介绍'],
      listZHXW: [],
      pageIndex: 1,
      pageCount: '',
      pageIndexZSJS: 1,
      pageCountZSJS: '',
      prevHide: false,
      dialogVisible: true,
      type: 'ZSJS', // 展商介绍
      listZSJS: [],
      pageActive: false,
      newsContentAct: false,
      IsReloadTemp: false
    }
  },
  created() {
    againUrl(this.$route.path)
    this.initDataZHXW()// 展会新闻
    this.initDataZSJS()// 展商介绍 以及 行业动态
  },
  activated() {
    document.title = '新闻资讯';
    this.$store.commit(types.ROUTER_PATH, this.$route.path)
  },
  mounted() {
    this.shareWxNews()
  },
  methods: {
    reloadNewsBtn() {
      this.initDataZHXW()// 展会新闻
      this.initDataZSJS()// 展商介绍 以及 行业动态
    },
    // 分享
    shareWxNews() {
      getShareToken(this.$route.path).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: '北京国际钱币博览会新闻资讯'})
      }).catch(err => {
        console.log(err)
      })
    },
    goToDetail(e) {
      this.$router.push({
        name: "newsLandingPage",
        params: {
          name: 'newsLandingPage',
          code: e
        }
      })
    },
    selectNewsTitle(e) {
      this.idx = e
      if (e == 0) {
        this.type = "HYDT"
        this.pageIndexZSJS = 1
        this.initDataZSJS()
      } else {
        this.type = "ZSJS"
        this.pageIndexZSJS = 1
        this.initDataZSJS()
      }
    },
    initDataZSJS() {
      let data = {
        selelctType: this.type,
        pageIndex: this.pageIndexZSJS,
        pageSize: 5
      }
      getNewsCategory(data).then(res => {
        if (res.data.returnCode === '0000') {
          this.pageCountZSJS = res.data.returnData.pageNum
          this.listZSJS = res.data.returnData.successiveExhibitors
          if (this.IsReloadTemp) {
            this.IsReloadTemp = false
          }
        }
      }).catch(() => {
        this.IsReloadTemp = true
      })
    },
    initDataZHXW() {
      let data = {
        selelctType: 'ZHXW',
        pageIndex: this.pageIndex,
        pageSize: 5
      }
      getNewsCategory(data).then(res => {
        if (res.data.returnCode === '0000') {
          let data = res.data.returnData
          this.pageCount = data.pageNum
          this.listZHXW = data.successiveExhibitors
          if (this.IsReloadTemp) {
            this.IsReloadTemp = false
          }
        }
      }).catch(() => {
        this.IsReloadTemp = true
      })
    },
    prevClick() {
      this.pageActive = true
      --this.pageIndex
      if (this.pageIndex < 1) {
        this.pageIndex = 1
        this.$message({
          message: '这已经是第一页了，亲!',
          type: 'warning'
        });
        return false
      }
      this.initDataZHXW()
    },
    nextClick() {
      this.pageActive = false
      ++this.pageIndex
      if(this.pageIndex > this.pageCount) {
        this.pageIndex = this.pageCount
        return false
      }
      this.initDataZHXW()
    },
    prevZSJS() {
      --this.pageIndexZSJS
      this.newsContentAct = true
      if (this.pageIndexZSJS < 1) {
        this.pageIndexZSJS = 1
        this.$message({
          message: '这已经是第一页了，亲!',
          type: 'warning'
        });
        return false
      }
      this.initDataZSJS()
    },
    nextZSJS() {
      ++this.pageIndexZSJS
      this.newsContentAct = false
      if(this.pageIndexZSJS > this.pageCountZSJS) {
        this.pageIndexZSJS = this.pageCountZSJS
        return false
      }
      this.initDataZSJS()
    }
  },
  components: {
    tabBar,
    tempFooter,
    reload
  }
}
</script>

<style scoped lang="stylus">
  .news_wrap_new
    margin-left: 0.3rem;
    width: 6.9rem;
    background-color: #ffffff;
    .exhibi_title
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
      .exhibi_more
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.38rem 0.24rem 0 0;
        font-size: 0.24rem;
    .exhibition_news
      li
        line-height: 0.85rem;
        font-size: 0.28rem;
        color: #333;
        height: 0.85rem;
        .h3
          display: flex;
          justify-content: space-between;
          color #333
          font-size .28rem
          .span
            width: 4.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
    .exhibition_news1
      border-bottom: 0.01rem solid #e6e6e6;
  .news_detail
    width 6.9rem
    background-color: #fff
    margin-left 0.3rem
    /*margin-top .5rem*/
    overflow hidden
    .nav_news:after
      content ''
      width .28rem
      height .53rem
      background-image url("https://www.chbice.com/imgFile/icon/title_left.png")
      background-size cover
      background-repeat no-repeat
      position absolute
      left -0.28rem
      top 0
    .nav_news:before
      content ''
      width .28rem
      height .53rem
      background-image url("https://www.chbice.com/imgFile/icon/title_right.png")
      background-size cover
      background-repeat no-repeat
      position absolute
      right -0.28rem
      top 0
    .nav_news
      font-size: 0.3rem
      width 3.2rem
      display flex
      justify-content center
      color #BFA267
      margin 0 auto
      height .53rem
      border-top .02rem solid #BFA267
      border-bottom .02rem solid #BFA267
      position relative
      li
        width 1.6rem
        background-color: #BFA267;
        text-align center
        line-height 0.53rem
        font-weight 550
        color #fff
    .nav_news1
      background-color: #fff!important
      position relative
      color #BFA267!important
    .news_list
      font-size: 0.28rem
      color: #000000;
      width 6.9rem
      margin 0.15rem auto 0
      .news_boeder
        border-bottom: solid 0.01rem #e6e6e6;
      li
        display flex
        width: 6.9rem;
        line-height: 0.85rem;
        font-size: 0.28rem;
        color: #333;
        height: 0.85rem;
        justify-content space-between
        .news_content_list_left
          width: 3.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  .btns
    display flex
    justify-content center
    margin-top 0.15rem
    padding-bottom 0.5rem
    font-size: 0.22rem;
    color: #fff;
    .prev, .next
      width: 1.06rem;
      height: 0.37rem;
      background-color: #ccc;
      border-radius: 0.18rem;
      line-height 0.37rem
      text-align center
      margin 0 0.14rem
    .page_btn
      background-color: #BFA267;/*#*/
      color #fff
    /*old style*/
  .news_container
    width: 100%
    .title_ab
      text-align center
    h2
      margin-bottom: 0.1rem;
      font-size: 0.34rem;
      line-height: 0.3rem;
      font-family:PingFangSC-Medium;
      color:rgba(198,160,86,1);
      margin-top 0.58rem
    .news-en
      display: block;
      font-size:0.2rem;
      font-family:PingFangSC-Light;
      color:rgba(207,194,170,1);
      line-height: 0.3rem;
      margin-bottom 0.32rem
    .news_wrap
      box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.6);
      width: 6.21rem;
      padding: 0.38rem 0.29rem 0rem 0.29rem; // 0.18
      border-radius: 0.08rem;
      margin-top 0.55rem
      .news_content
        .news_content_list
          display flex
          justify-content space-between
          height: 0.76rem;
          line-height: 0.76rem;
          padding-left: 0.35rem;
          padding-right 0.35rem
          margin-bottom: 0.14rem;
          font-size: 0.3rem;
          font-family: PingFangSC-Regular;
          color: #717170;
          background:rgba(198,160,86, 0.08)
          .news_content_list_left
            width: 3.21rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      .btns
        display flex
        justify-content: flex-end;
        .prev
          width 0.5rem
          height 0.5rem
          padding-top 0.15rem
          position relative
          .icon-fanhui
            font-size 0.23rem
            position absolute
            color #AAA9A8
          .span_icon_houtui
            color #C6A056
        .next
          width 0.5rem
          height 0.5rem
          padding-top 0.15rem
          position relative
          .icon-gengduo
            font-size 0.23rem
            position absolute
            color #C6A056
            right 0
          .span_icon_qianjin
            color #AAA9A8!important
    .news_title_nav
      display flex
      font-size: 0.34rem
      font-family PingFangSC-Medium
      color #333
      margin 0.35rem 0.38rem 0.15rem 0.38rem
      justify-content space-between
      li
        padding 0.26rem 0
      .li_add_style
        margin:0 0.89rem
        position relative
        .arrow
          position absolute
          left: 38%
          top: 1.06rem
          width 0.42rem
          height 0.36rem
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
    .footer-top
      margin-top 0.56rem
</style>
