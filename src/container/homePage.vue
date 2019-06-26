<template>
  <div>
    <!--<img class="title-img" :src="imgIndex">-->
    <Swiper></Swiper>
    <introduce :introduceObj="dataList.expositionIntroduce" :show="false" :text="text"></introduce>
    <exhibitionNews :expositionNews="dataList.expositionNews"></exhibitionNews>
    <exhibitor :exhibitorsIntroduce="dataList.exhibitorsIntroduce"></exhibitor><!--展上介绍-->
    <successive-exhibitions :successiveList="SuccessiveList"></successive-exhibitions>
    <!--<img class="footer-img left-margin" src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="">-->
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
import * as types from '../store/mutation-types'
import {indexDo, successiveExhibitors, getShareToken} from '@/api/index'
import Scroll from '@/utils/scroll' // 滑动组件
import { wxShareTemp, againUrl } from '../utils/wx_share'
import Swiper from '@/utils/swiper'

export default {
  name: "index",
  data() {
    return {
      obj: 0,
      text: 'Exhibition Introduction',
      dataList: {},
      SuccessiveList: [],
      imgIndex: ''
    }
  },
  created() {
    againUrl(this.$route.path)
    this.initIndexList()
    this.initIndexNewsList()
  },
  activated() {
    document.title = '首页';
  },
  mounted() {
    this.shareWx()
  },
  methods: {
    // 分享
    shareWx() {
      getShareToken(this.$route.path).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: '北京国际钱币博览会首页'})
      }).catch(err => {
        console.log(err)
      })
    },
    initIndexList() {
      indexDo().then((res) => {
        if (res.data.returnCode === '0000') {
          this.dataList = res.data.returnData
          console.log('this.dataList', this.dataList)
          this.imgIndex = this.dataList.banner.imgIndex
          this.$store.commit(types.INDEX_IMG, res.data.returnData.banner.imgIndex)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    initIndexNewsList() {
      let data = {
        pageIndex: 1,
        pageSize: 5,
        selelctYears: 'first'
      }
      successiveExhibitors(data).then(res => {
        this.SuccessiveList = res.data.returnData
      })
    }
  },
  components: {
    introduce,
    exhibitionNews,
    exhibitor,
    successiveExhibitions,
    tempFooter,
    tabBar,
    Scroll,
    Swiper
  }
}
</script>

<style scoped>
  body{
    /*background: rgba(198,160,86,1);*/
  }
  .title-img{
    width: 7.5rem;
    height: 3.41rem;
  }
  .footer-img{
    width: 6.78rem;
    height: 3.8rem;
    margin-top: 0.57rem;
  }
</style>
