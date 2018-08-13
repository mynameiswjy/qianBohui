<template>
    <div class="news_container">
      <div class="title_ab">
        <h2>展会新闻</h2>
        <div class="news-en">Expo News</div>
      </div>
      <div class="news_wrap left-margin">
        <ul class="news_content">
          <li class="news_content_list" v-for="item in list" v-bind:key="item.id">
            <div class="news_content_list_left">{{item.name}}</div>
            <div>{{item.time}}</div>
          </li>
        </ul>
        <div class="btns">
          <div class="prev">
            <img src="../assets/images/prev-page.png" alt="">
          </div>
          <div class="next">
            <img style="" src="../assets/images/next-page.png" alt="">
          </div>
        </div>
      </div>
      <ul class="news_title_nav">
        <li class="li_add_style" :class="{'text_active':idx == index,}" v-for="(item,index) in navNews" :key="index">{{item}}</li>
      </ul>
      <div class="news_wrap left-margin">
        <ul class="news_content">
          <li class="news_content_list" v-for="item in list" v-bind:key="item.id">
            <div class="news_content_list_left">{{item.name}}</div>
            <div>{{item.time}}</div>
          </li>
        </ul>
        <div class="btns">
          <div class="prev">
            <img src="../assets/images/prev-page.png" alt="">
          </div>
          <div class="next">
            <img style="" src="../assets/images/next-page.png" alt="">
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

export default {
  name: "aboutzh",
  data() {
    return {
      idx: 0,
      navNews: ['行业动态', '展商介绍'],
      list: [
        {name: '贵金属纪念币知识介绍', id: '0', time: '2018-07-03'},
        {name: '纪念币的保存、清洗及赝品识别', id: '1', time: '2018-07-03'},
        {name: '纪念币题材及发行要素辨识', id: '2', time: '2018-07-03'},
        {name: '购买途径及鉴定证书辨识', id: '3', time: '2018-07-03'},
        {name: '如何成为特许零售商', id: '4', time: '2018-07-03'}
      ]
    }
  },
  created() {
    document.title = '新闻资讯';
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
          img
            width 0.11rem
            height: 0.2rem
            position absolute
        .next
          width 0.5rem
          height 0.5rem
          padding-top 0.15rem
          position relative
          img
            position absolute
            width 0.11rem
            height: 0.2rem
            right 0
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
