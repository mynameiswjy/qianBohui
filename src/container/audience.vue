<template>
    <div>
      <introduce class="lintr_bottom" :introduceObj="introduceObj" :text="text" :openStyle="true" :newTemp="2"></introduce>
      <public-temp :aboutzhObj="aboutzhObj" :isVisitP="IsShowVisit" :newTemp="1"></public-temp>
      <temp-footer class="footer-top"></temp-footer>
      <div style="height: 0.98rem"></div>
      <tabBar class="menu-tab"></tabBar>
    </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import publicTemp from '@/components/publicTemp/publicTemp'
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们
import tabBar from '@/container/tabBar' // 底部tabBar
import {etArticlesContent, getShareToken} from '@/api/index'
import { wxShareTemp, againUrl } from '../utils/wx_share'

export default {
  name: "aboutzh",
  data() {
    return {
      introduceObj: {},
      text: 'Notice of visit',
      IsShowVisit: this.$store.state.IsShowVisit,
      aboutzhObj: {
        navList: this.$store.state.IsShowVisit ? [{name: "乘车路线"}, {name: "参观登记"}] : [{name: "乘车路线"}],
        textList: [
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            text: [
              {title: '地址', txt: '国家会议中心位于北京市朝阳区天辰东路7号'},
              {title: '途经公交线路', txt: ''},
              {title: '', txt: '新闻中心站：83路, 85路, 510路'},
              {title: '', txt: '国家体育馆站：81路, 82路, 86路, 510路'},
              {title: '', txt: '洼里南口站：328路, 379路, 419路, 484路, 617路,628路, 630路, 751路, 913路, 运通110线, 专40路'},
              {title: '', txt: '奥运村站：机场巴士6号线'},
              {title: '', txt: '中科院地理所站：328路, 379路, 419路, 484路, 607路,617路, 628路, 630路, 695路, 751路, 913路, 运通110线, 专40路'},
              {title: '地铁线路', txt: ''},
              {title: '', txt: '8号线、15号线：奥林匹克公园站下车'},
              {title: '自驾停车', txt: ''},
              {title: '', txt: '国家会议中心提倡绿色出行，欢迎公众乘坐公共交通前来参加活动。'},
              {title: '', txt: '如自驾开车前来，国家会议中心地下停车场对外开放。'},
            ]
          },
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            text: []
          }
        ]
      }
    }
  },
  created() {
    againUrl(this.$route.path)
    this.context()
  },
  activated() {
    document.title = '观众专区';
  },
  mounted() {
    this.shareWxAudien()
  },
  methods: {
    // 分享
    shareWxAudien() {
      getShareToken(this.$route.path).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: '北京国际钱币博览会观众专区'})
      }).catch(err => {
        console.log(err)
      })
    },
    context() {
      etArticlesContent({articlesCode: 'CGXZ'}).then(res => {
        if (res.data.returnCode === '0000') {
          this.introduceObj = res.data.returnData
        }
      })
    }
  },
  components: {
    introduce,
    publicTemp,
    tempFooter,
    tabBar
  }
}
</script>

<style scoped lang="stylus">
  .lintr_bottom
    margin-bottom .3rem
  .footer-top
    margin-top 0.57rem
</style>
