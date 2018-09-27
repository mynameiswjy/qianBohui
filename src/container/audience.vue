<template>
    <div>
      <introduce class="lintr_bottom" :introduceObj="introduceObj" :text="text" :openStyle="true"></introduce>
      <public-temp :aboutzhObj="aboutzhObj" class=""></public-temp>
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
import {etArticlesContent} from '@/api/index'

export default {
  name: "aboutzh",
  data() {
    return {
      introduceObj: {},
      text: 'Notice of visit',
      aboutzhObj: {
        navList: ["乘车路线", "参观登记"],
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
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            text: [
              {title: '', txt: '搭建及展览期间国家会议中心提供各类午餐，搭建及参展人员可到指定位置购买并就餐，外部餐饮、盒饭一律严禁进入。'},
              {title: '', txt: ' 国家会议中心所有建筑区域内严禁吸烟。'},
              {title: '', txt: ' 国家会议中心所有建筑区域内严禁吸烟。'},
              {title: '', txt: ' 国家会议中心所有建筑区域内严禁吸烟。'},
              {title: '', txt: ' 国家会议中心所有建筑区域内严禁吸烟。'},
              {title: '', txt: ' 国家会议中心所有建筑区域内严禁吸烟。'},
              {title: '', txt: ' 国家会议中心所有建筑区域内严禁吸烟。'},
            ]
          },
          {
            showFullBtn: 0, // 控制每个list的按钮 是否显示全文
            show_temp: true, // 是否使用隐藏8行的class
            showText: '显示全文',
            text: [
              {title: '', txt: '北京国际钱币博览会由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合主办的专业盛会。展会围绕并服务于中央银行职能及国家货币发行政策，以普及人民币知识，弘扬金币文化为主旨，为国内外钱币企业搭建交流平台。'}
            ]
          }
        ]
      }
    }
  },
  created() {
    this.context()
  },
  activated() {
    document.title = '观众专区';
  },
  methods: {
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
    margin-bottom 0.29rem
  .footer-top
    margin-top 0.57rem
</style>
