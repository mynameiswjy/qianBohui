<template>
    <div class="details_wrap">
      <scroll class="details-content" :data="list">
        <div>
          <nav-bar></nav-bar>
          <div style="height: 0.58rem;width: 100%;"></div>
          <div class="ex_detail_title">
            <img src="../assets/images/introduce.png" alt="333" class="introduce-icon">
            <div class="title-right">
              <div class="details_select">
                <h2 class="details_h2">历届展会</h2>
                <select v-model="selectVal" @change="timeChange">
                  <option value="first">请选择</option>
                  <option v-for="item in timeList" :label="item.name" :key="item.sore" :value="item.code">{{item.name}}</option>
                </select>
              </div>
              <div class="title-right-en">Exhibition Introduction</div>
            </div>
          </div>
          <div class="news_wrap left-margin">
            <ul class="news_content">
              <li class="news_content_list" :class="{'details_border_ex': list.length - 1 !== index}" @click="goToDetail(item.code)" v-for="(item,index) in list" :key="index">
                <div class="news_content_list_left">{{item.title}}</div>
                <div>{{item.newsTime}}</div>
              </li>
            </ul>
            <div class="btns">
              <div class="prev" @click="prevNews">
                <div class="prev-txt" :class="{span_icon_houtui:pageIndexNews > 1}">上一页</div>
                <span class="iconfont icon-fanhui" :class="{span_icon_houtui:pageIndexNews > 1}"></span>
              </div>
              <div class="next" @click="nextNews">
                <span class="iconfont icon-gengduo" :class="{span_icon_qianjin:pageIndexNews >= pageCountNews}"></span>
                <div class="next-txt" :class="{span_icon_qianjin:pageIndexNews >= pageCountNews}">下一页</div>
              </div>
            </div>
          </div>
          <temp-footer class="footer-top"></temp-footer>
        </div>
      </scroll>
      <tab-bar class="menu-tab"></tab-bar>
    </div>
</template>

<script>
import tabBar from './tabBar' // 底部tabBar
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import scroll from '@/utils/scroll'
import navBar from './navBar'
import {successiveExhibitors} from '@/api/index'

export default {
  name: "exhibitionDetail",
  data() {
    return {
      timeList: [],
      list: [],
      pageIndexNews: 1,
      pageCountNews: '',
      selectVal: 'first',
      selectType: 'all'
    }
  },
  created() {
    document.title = '历届展会';
    this.initNewsList()
  },
  mounted() {
  },
  methods: {
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
      let data = {
        pageIndex: this.pageIndexNews,
        pageSize: 10,
        selelctYears: this.selectType
      }
      successiveExhibitors(data).then(res => {
        if (res.data.returnCode === '0000') {
          this.timeList = res.data.returnData.selelctYears
          this.pageCountNews = res.data.returnData.pageNum
          this.list = res.data.returnData.successiveExhibitors
        }
      })
    },
    prevNews() {
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
    navBar
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
