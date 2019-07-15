<template>
    <div class="news_container"  style="background-color: #F4F3F3;">
      <!--<div class="title_ab">
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
      </div>-->
      <div class="news_wrap_new">
        <div class="exhibi_title">展会新闻</div>
        <ul class="exhibition_news">
          <li :class="{'exhibition_news1': index != listZHXW.length-1}" v-for="(item, index) in listZHXW" :key="item.id" @click="goToDetail(item.code)">
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
      <!--<ul class="news_title_nav">
        <li class="li_add_style" @click="selectNewsTitle(index)" :class="{'text_active':idx == index,}" v-for="(item,index) in navNews" :key="index">
          {{item}}
          <img v-show="idx == index" class="arrow" src="../assets/images/arrow.png" alt="">
        </li>
      </ul>-->
      <!--<div class="news_wrap left-margin">
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
      </div>-->
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
    </div>
</template>

<script >
import tabBar from '@/container/tabBar' // 底部tabBar
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
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
      newsContentAct: false
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
    tempFooter
  }
}
</script>

<style scoped lang="stylus">
  .news_wrap_new
    margin-left: 0.25rem;
    width: 7rem;
    /*height: 4.71rem;*/
    background-color: #ffffff;
    box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
    border-radius: 0.14rem;
    .exhibi_title
      height: 0.94rem;
      background-color: #eed582;
      border-radius: 0.14rem 0.14rem 0 0;
      position: relative;
      font-size: 0.36rem;
      font-weight: 600;
      text-align: center;
      line-height: 0.94rem;
      color #000
      .exhibi_more
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.38rem 0.24rem 0 0;
        font-size: 0.24rem;
    .exhibition_news
      padding: 0.13rem 0 0.13rem 0.22rem;
      li
        width: 6.48rem;
        line-height: 0.69rem;
        font-size: 0.28rem;
        .h3
          display: flex;
          justify-content: space-between;
          height: 0.7rem;
          color: #000;
          .span
            width: 4.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
    .exhibition_news1
      border-bottom: 0.01rem solid #949494;
  .news_detail
    width 7rem
    height 5.4rem
    background-color: #fff
    box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
    border-radius: 0.14rem;
    margin-left 0.25rem
    margin-top 1.22rem
    overflow hidden
    .nav_news1
      background-color: #fff
      position relative
    .nav_news1:before
      content ''
      width 89.6%
      height 0.04rem
      background-color: #eed582;
      position absolute
      bottom 0
      transform transLateX(-50%)
      left 50%
    .nav_news
      display flex
      font-size 0.3rem
      color #000000
      background-color: #eed582;
      li
        width 50%
        text-align center
        line-height 0.64rem
        font-weight 600
    .news_list
      font-size: 0.28rem
      color: #000000;
      width 6.47rem
      height 3.54rem
      margin 0.15rem auto 0
      .news_boeder
        border-bottom: solid 0.02rem #949494;
      li
        display flex
        height 0.7rem
        line-height 0.7rem
        justify-content space-between
        .news_content_list_left
          width: 3.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
  .btns
    display flex
    justify-content center
    margin-top 0.15rem
    padding-bottom 0.5rem
    font-size: 0.22rem;
    color: #000000;
    .prev, .next
      width: 1.06rem;
      height: 0.37rem;
      background-color: #f4f3f3;
      border-radius: 0.18rem;
      line-height 0.37rem
      text-align center
      margin 0 0.14rem
    .page_btn
      background-color: #eed582;
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
