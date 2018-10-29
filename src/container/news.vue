<template>
    <div class="news_container">
      <div class="title_ab">
        <h2>展会新闻</h2>
        <div class="news-en">Expo News</div>
      </div>
      <div class="news_wrap left-margin">
        <ul class="news_content">
          <li class="news_content_list" v-for="item in listZHXW" :key="item.id" @click="goToDetail(item.code)">
            <div class="news_content_list_left">{{item.title}}</div>
            <div>{{item.newsTime}}</div>
          </li>
        </ul>
        <div class="btns">
          <div @click="prevClick" class="prev">
            <span class="iconfont icon-fanhui" :class="{span_icon_houtui: pageIndex > 1}"></span>
          </div>
          <div v-show="!prevHide" @click="nextClick" class="next">
            <span class="iconfont icon-gengduo" :class="{span_icon_qianjin: pageCount == pageIndex}"></span>
          </div>
        </div>
      </div>
      <ul class="news_title_nav">
        <li class="li_add_style" @click="selectNewsTitle(index)" :class="{'text_active':idx == index,}" v-for="(item,index) in navNews" :key="index">
          {{item}}
          <img v-show="idx == index" class="arrow" src="../assets/images/arrow.png" alt="">
        </li>
      </ul>
      <div class="news_wrap left-margin">
        <ul class="news_content">
          <li class="news_content_list" @click="goToDetail(item.code)" v-for="(item, index) in listZSJS" :key="index">
            <div class="news_content_list_left">{{item.title}}</div>
            <div>{{item.newsTime}}</div>
          </li>
        </ul>
        <div class="btns">
          <div class="prev" @click="prevZSJS">
            <span class="iconfont icon-fanhui" :class="{span_icon_houtui: pageIndexZSJS > 1}"></span>
          </div>
          <div class="next" @click="nextZSJS">
            <span class="iconfont icon-gengduo" :class="{span_icon_qianjin:pageIndexZSJS >= pageCountZSJS}"></span>
          </div>
        </div>
      </div>
      <temp-footer class="footer-top"></temp-footer>
      <div style="height: 0.98rem"></div>
      <tabBar class="menu-tab"></tabBar>
    </div>
</template>

<script>
import tabBar from '@/container/tabBar' // 底部tabBar
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
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
      listZSJS: []
    }
  },
  created() {
    againUrl(this.$route.path)
    this.initDataZHXW()// 展会新闻
    this.initDataZSJS()// 展商介绍 以及 行业动态
  },
  activated() {
    document.title = '新闻资讯';
  },
  mounted() {
    this.shareWxNews()
  },
  methods: {
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
        }
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
        }
      })
    },
    prevClick() {
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
      ++this.pageIndex
      if(this.pageIndex > this.pageCount) {
        this.pageIndex = this.pageCount
        return false
      }
      this.initDataZHXW()
    },
    prevZSJS() {
      --this.pageIndexZSJS
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
      if(this.pageIndexZSJS > this.pageCountZSJS) {
        this.pageIndexZSJS = this.pageCountZSJS
        return false
      }
      this.initDataZSJS()
    }
  },
  components: {
    tabBar,
    tempFooter
  }
}
</script>

<style scoped lang="stylus">
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
