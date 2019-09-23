<template>
  <div style="background-color: #F4F3F3;">
    <introduce :introduceObj="dataList.expositionIntroduce" :isOpenActive="true" :newTemp="2"></introduce>
    <exhibitionNews :expositionNews="dataList.expositionNews" :title="modelName.modelName2" :ad="adData[0]"></exhibitionNews>
    <exhibitor :exhibitorsIntroduce="dataList.exhibitorsIntroduce" :title="modelName.modelName3" :ad="adData[1]"></exhibitor><!--展上介绍-->
    <successive-exhibitions :successiveList="SuccessiveList" :title="modelName.modelName4" :ad="adData[2]"></successive-exhibitions>
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
import {indexDo, successiveExhibitors, getShareToken, modelName, advertising} from '@/api/index'
import Scroll from '@/utils/scroll' // 滑动组件
import { wxShareTemp, againUrl } from '../utils/wx_share'

export default {
  name: "index",
  data() {
    return {
      obj: 0,
      dataList: {},
      SuccessiveList: [],
      imgIndex: '',
      IsReloadTemp: false,
      openLoading: false,
      modelName: {},
      adData: [
        {
          "show": "N",
          "url": ""
        },
        {
          "show": "N",
          "url": ""
        },
        {
          "show": "N",
          "url": "#"
        }
      ]
    }
  },
  created() {
    againUrl(this.$route.path)
    this.initIndexList()
    this.initIndexNewsList()
    modelName().then(res => {
      this.modelName = JSON.parse(res.data.returnData)
    })
    advertising().then(res => {
      if (res.data.returnCode === '0000') {
        this.adData = res.data.returnData
      }
    }).catch(err => {
      console.log(err);
    })
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
          // console.log('this.dataList', this.dataList)
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
