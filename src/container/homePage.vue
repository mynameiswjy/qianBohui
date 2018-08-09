<template>
  <div>
    <introduce></introduce>
    <exhibitionNews></exhibitionNews>
    <exhibitor></exhibitor>
    <successive-exhibitions></successive-exhibitions>
    <img class="footer-img left-margin" src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="">
    <div style="height: 0.47rem"></div>
    <temp-footer></temp-footer>
    <div style="height: 0.98rem"></div>
    <tab-bar class="menu-tab"></tab-bar>
  </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import exhibitionNews from '@/components/exhibitionNews' // 展会新闻模板
import exhibitor from '@/components/exhibitor' // 展商介绍模板
import successiveExhibitions from '@/components/successiveExhibitions' // 历届展会模板
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import tabBar from '@/container/tabBar' // 底部tabBar
import ajax from '@/api/ajax'

export default {
  name: "index",
  data() {
    return {
      obj: 0,
    }
  },
  created() {
    document.title = '首页';
    ajax()
  },
  components: {
    introduce,
    exhibitionNews,
    exhibitor,
    successiveExhibitions,
    tempFooter,
    tabBar
  }
}
</script>

<style scoped>
  body{
    /*background: rgba(198,160,86,1);*/
  }
  .footer-img{
    width: 6.78rem;
    height: 3.8rem;
    margin-top: 0.57rem;
  }
</style>
