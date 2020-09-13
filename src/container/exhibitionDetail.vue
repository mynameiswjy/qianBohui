<template>
    <div class="details_wrap">
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
  .details-content
    height 100%
    overflow hidden
    .exhibition_wrap
      margin-top 0.3rem
      width 6.9rem
      margin-left 0.3rem
      overflow hidden
      h2
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
      .exhibition_list
        font-size: 0.28rem
        color: #000000;
        width 6.9rem
        .exhibition_boeder
          border-bottom: solid 0.02rem #e6e6e6;
        li
          display flex
          justify-content space-between
          width: 6.9rem;
          line-height: 0.85rem;
          font-size: 0.28rem;
          color: #333;
          height: 0.85rem;
          .news_content_list_left
            width: 3.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      .btns
        display flex
        justify-content center
        margin-top 0.45rem
        padding-bottom 0.3rem
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
          background-color: #BFA267;
  .footer-top
    margin-top 0.56rem
</style>
