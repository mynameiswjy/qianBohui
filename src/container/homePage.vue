<template>
  <div style="background-color: #F4F3F3;">
    <introduce :introduceObj="dataList.expositionIntroduce" :newTemp="2" :text="text"></introduce>
    <exhibitionNews :expositionNews="dataList.expositionNews"></exhibitionNews>
    <exhibitor :exhibitorsIntroduce="dataList.exhibitorsIntroduce"></exhibitor><!--展上介绍-->
    <successive-exhibitions :successiveList="SuccessiveList"></successive-exhibitions>
    <!--<img class="footer-img left-margin" src="http://s2.mogucdn.com/mlcdn/c45406/170329_407g0k6lce0b3h78ddjg9dd39eh33_2400x800.jpg" alt="">-->
    <div style="height: 1rem"></div>
    <temp-footer></temp-footer>
    <div style="height: 0.98rem"></div>
    <tab-bar class="menu-tab"></tab-bar>
    <reload @reloadBtn="reloadBtn" v-show="IsReloadTemp"></reload>
    <Loading v-show="openLoading"></Loading>
  </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import exhibitionNews from '@/components/exhibitionNews' // 展会新闻模板
import exhibitor from '@/components/exhibitor' // 展商介绍模板
import successiveExhibitions from '@/components/successiveExhibitions' // 历届展会模板
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import tabBar from '@/container/tabBar' // 底部tabBar
import reload from '@/components/reloadTemp' // 网络错误
import Loading from '../components/loading/loading'
import * as types from '../store/mutation-types'
import {indexDo, successiveExhibitors, getShareToken} from '@/api/index'
import Scroll from '@/utils/scroll' // 滑动组件
import { wxShareTemp, againUrl } from '../utils/wx_share'

export default {
  name: "index",
  data() {
    return {
      obj: 0,
      text: 'Exhibition Introduction',
      dataList: {},
      SuccessiveList: [],
      imgIndex: '',
      IsReloadTemp: false,
      openLoading: false
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
      this.openLoading = true
      indexDo().then((res) => {
        if (res.data.returnCode === '0000') {
          this.openLoading = false
          this.dataList = res.data.returnData
          console.log('this.dataList', this.dataList)
          this.imgIndex = this.dataList.banner.imgIndex
          this.$store.commit(types.INDEX_IMG, res.data.returnData.banners)
        } else {
          setTimeout(() => {
            this.openLoading = false
          }, 6000)
        }
        if(this.IsReloadTemp) {
          this.IsReloadTemp = false
        }
      }).catch(() => {
        this.openLoading = false
        this.IsReloadTemp = true
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
        if(this.IsReloadTemp) {
          this.IsReloadTemp = false
        }
      }).catch(err => {
        console.log(err);
        this.IsReloadTemp = true
      })
    },
    reloadBtn() {
      this.initIndexList()
      this.initIndexNewsList()
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
    reload,
    Loading
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
