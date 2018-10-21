<template>
    <div>
      <introduce class="lintr_bottom" :text="text" :introduceObj="introduceObj" :openStyle="true"></introduce>
      <public-temp :aboutzhObj="aboutzhObj" class=""></public-temp>
      <temp-footer class="footer-top"></temp-footer>
      <div style="height: 0.98rem"></div>
      <tabBar class="menu-tab"></tabBar>
    </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import publicTemp from '@/components/publicTemp/publicTemp'
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import tabBar from '@/container/tabBar' // 底部tabBar
import { etArticlesContent, getShareToken } from '@/api/index'
import { wxShareTemp } from '../utils/wx_share'

export default {
  name: "aboutzh",
  data() {
    return {
      introduceObj: {},
      text: 'Exhibition Introduction',
      aboutzhObj: {
        navList: ["主办机构", "组织机构", "展位分布"],
        textList: [
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            text: [
              {title: '', txt: '北京国际钱币博览会由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合主办的专业盛会。展会围绕并服务于中央银行职能及国家货币发行政策，以普及人民币知识，弘扬金币文化为主旨，为国内外钱币企业搭建交流平台。'}
            ]
          },
          {
            showFullBtn: 0,
            show_temp: true,
            showText: '显示全文',
            text: [
              {title: '中国金币总公司', txt: '，成立于1987年，是中国人民银行直属的我国唯一经营贵金属纪念币的行业性公司，履行贵金属货币的发售职能，是中央银行货币发行职能的重要组成部分和业务延伸，是中央银行货币发行的重要支撑体系之一。'},
              {title: '中国印钞造币总公司', txt: '，是国家法定货币生产企业，下辖22家大中型企业和1个技术中心，从事印钞、造币、钞票纸、银行信用卡的研制生产、印钞造币专用机械和银行机具制造、高纯度金银精炼和印制增值税专用发票、有价证券、银行专用票据、高级防伪证书等安全印务方面的生产经营活动。'},
              {title: '中国钱币博物馆', txt: '，是直属于中国人民银行总行的国家级专题博物馆，主要从事钱币的收藏、研究和展示，肩负有指导和推动钱币收藏、研究及宣传钱币文化的任务，下设办公室、陈列宣教部、征集保管部、研究信息部、《中国钱币》编辑部、安全保卫部和开发服务部，代管中国钱币学会秘书处。'}
            ]
          },
          {
            showFullBtn: 0,
            show_temp: true,
            showText: '显示全文',
            isTableType: true, // 是否启用table表格
            text: [
              {title: '', txt: ''}
            ]
          },
        ]
      },
    }
  },
  created() {
    this.contentTxt()
  },
  activated() {
    document.title = '关于展会';
  },
  mounted() {
    this.shareWxAbouthzh()
  },
  methods: {
    contentTxt() {
      etArticlesContent({articlesCode: 'ZHJS'}).then(res => {
        if (res.data.returnCode === '0000') {
          this.introduceObj = res.data.returnData
        }
      })
    },
    // 分享
    shareWxAbouthzh() {
      getShareToken(this.$route.path).then(res => { // window.location.href
        let data = res.data.returnData
        wxShareTemp(data, {title: '北京国家钱币博览会关于展会'})
      }).catch(err => {
        console.log(err)
      })
    },
  },
  components: {
    tabBar,
    introduce,
    publicTemp,
    tempFooter
  }
}
</script>

<style scoped lang="stylus">
.lintr_bottom
  margin-bottom 0.29rem
.footer-top
  margin-top 0.57rem
</style>
