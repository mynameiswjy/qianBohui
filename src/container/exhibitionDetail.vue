<template>
    <div class="details_wrap" style="background-color: #F4F3F3;">
      <scroll class="details-content" :data="list">
        <div>
          <nav-bar></nav-bar>
          <div class="exhibition_wrap">
            <h2>历届展会</h2>
            <ul class="exhibition_list">
              <li class="news_content_list exhibition_boeder" @click="goToDetail(item.code)" v-for="(item,index) in list" :key="index">
                <div class="news_content_list_left">{{item.title}}</div>
                <div>{{item.newsTime}}</div>
              </li>
            </ul>
            <div class="btns">
              <div class="prev" :class="{'page_btn': exhibitionPage}" @click="prevNews">上一页</div>
              <div class="next" :class="{'page_btn': !exhibitionPage}" @click="nextNews">下一页</div>
            </div>
          </div>
          <temp-footer class="footer-top"></temp-footer>
        </div>
      </scroll>
      <tab-bar class="menu-tab"></tab-bar>
      <reload @reloadBtn="reloadExdBtn" v-show="IsExdReloadTemp"></reload>
    </div>
</template>

<script>
import tabBar from './tabBar' // 底部tabBar
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import scroll from '@/utils/scroll'
import navBar from './navBar'
import reload from '@/components/reloadTemp' // 网络错误
import {successiveExhibitors} from '@/api/index'
import * as types from '../store/mutation-types'

export default {
  name: "exhibitionDetail",
  data() {
    return {
      timeList: [],
      list: [],
      pageIndexNews: 1,
      pageCountNews: '',
      selectVal: 'all',
      selectType: 'all',
      exhibitionPage: false,
      IsExdReloadTemp: false
    }
  },
  created() {
    document.title = '历届展会';
  },
  mounted() {
  },
  activated() {
    this.initNewsList()
    this.$store.commit(types.ROUTER_PATH, this.$route.path)
  },
  methods: {
    reloadExdBtn() {
      this.initNewsList()
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
    timeChange() {
      this.selectType = this.selectVal
      console.log(this.selectVal)
      this.pageIndexNews = 1
      this.initNewsList()
    },
    initNewsList() {
      this.list = []
      const exhibitionTime = localStorage.getItem("exhibitionTime") || 'all'
      const param = this.$route.params.time
      if (param && param != exhibitionTime) {
        localStorage.setItem("exhibitionTime", this.$route.params.time)
      }
      let data = {
        pageIndex: this.pageIndexNews,
        pageSize: 10,
        selelctYears: param || exhibitionTime // this.selectType this.$route.params.time
      }
      successiveExhibitors(data).then(res => {
        if (res.data.returnCode === '0000') {
          this.timeList = res.data.returnData.selelctYears
          this.pageCountNews = res.data.returnData.pageNum
          this.list = res.data.returnData.successiveExhibitors
          if (this.IsExdReloadTemp) {
            this.IsExdReloadTemp = false
          }
        }
      }).catch(() => {
        this.IsExdReloadTemp = true
      })
    },
    prevNews() {
      this.exhibitionPage = true
      --this.pageIndexNews
      if (this.pageIndexNews < 1) {
        this.pageIndexNews = 1
        this.$message({
          message: '这已经是第一页了，亲!',
          type: 'warning'
        });
        return false
      }
      this.initNewsList()
    },
    nextNews() {
      this.exhibitionPage = false
      ++this.pageIndexNews
      if(this.pageIndexNews > this.pageCountNews) {
        this.pageIndexNews = this.pageCountNews
        return false
      }
      this.initNewsList()
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
.menu-tab{
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
select::-ms-expand { display: none; }
.details_border_ex
  border-bottom 0.01rem solid rgba(238,236,233,1)
.details_wrap
  position fixed
  top: 0
  width 100%
  bottom 0.98rem
  background-color: #fff
  /*overflow auto*/
  .details-content
    height 100%
    overflow hidden
    .exhibition_wrap
      margin-top 0.3rem
      width 7rem
      background-color: #ffffff;
      box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
      border-radius: 0.14rem
      margin-left 0.25rem
      overflow hidden
      h2
        width 100%
        height 0.94rem
        background-color: #e20212;/*#eed582*/
        font-size: 0.36rem;
        font-weight 600
        text-align center
        line-height 0.94rem
        color: #FFF/*#000000;*/
      .exhibition_list
        font-size: 0.28rem
        color: #000000;
        width 6.47rem
        /*height 3.54rem*/
        margin 0.15rem auto 0
        .exhibition_boeder
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
        margin-top 0.45rem
        padding-bottom 0.3rem
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
          background-color: #e20212;/*#eed582*/
          color: #FFF/*活动过了去掉*/
    /*old Style*/
  .ex_detail_title
    width: 6.78rem;
    display: flex;
    margin-bottom: 0.32rem;
    margin-left 0.36rem
    font-family:PingFangSC-Medium;
    .introduce-icon
      width: 0.34rem;
      height: 0.34rem;
    .title-right
      margin-left: 0.22rem;
      .details_select
        width 6.22rem
        display flex
        /*justify-content space-between*/
        select
          width: 2.6rem;
          height: 0.5rem;
          font-size: 0.24rem
          font-family:PingFangSC-Regular;
          color:rgba(198,160,86,1);
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          background: url("../assets/images/zh-drop-down.png") no-repeat scroll 92% center transparent;
          background-size: 0.22rem 0.12rem;
          border-radius 0.08rem
          padding: 0rem 0 0rem 0.16rem;
          border: 0.01rem solid rgba(198,160,86,1);
        .details_h2
          width: 6.22rem;
          margin-bottom: 0.1rem;
          font-size: 0.34rem;
          line-height: 0.3rem;
          font-family: PingFangSC-Medium;
          color: rgba(198,160,86,1);
          display: flex;
          justify-content: space-between;
        .title-right-en
          display: block;
          font-size:0.2rem;
          font-family:PingFangSC-Light;
          color:rgba(207,194,170, 1);
          line-height: 0.3rem;

  .news_wrap
    box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.6);
    width: 6.21rem;
    padding: 0.38rem 0.29rem 0rem 0.29rem; // 0.18
    border-radius: 0.08rem;
    .news_content
      background:rgba(198,160,86, 0.08)
      border-radius: 0.08rem;
      padding 0.04rem 0
      .news_content_list
        display flex
        justify-content space-between
        height: 0.8rem;
        line-height: 0.8rem;
        margin-left: 0.35rem;
        margin-right 0.35rem
        font-size: 0.3rem;
        font-family: PingFangSC-Regular;
        color: #717170;
        .news_content_list_left
          width: 3.21rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    .btns
      display flex
      justify-content: center;
      font-size 0.24rem
      .prev
        width 1.64rem
        height 0.5rem
        padding-top 0.27rem
        display flex
        justify-content flex-start
        .prev-txt
          color #AAA9A8
          margin-right 0.34rem
        .icon-fanhui
          font-size 0.23rem
          color #AAA9A8
        .span_icon_houtui
          color #C6A056
      .next
        width 1.64rem
        height 0.5rem
        padding-top 0.27rem
        display flex
        justify-content flex-end
        .next-txt
          margin-left 0.34rem
          color #C6A056
        .icon-gengduo
          font-size 0.23rem
          color #C6A056
        .span_icon_qianjin
          color #AAA9A8
  .footer-top
    margin-top 0.56rem
</style>
