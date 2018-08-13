<template>
    <div>
      <introduce class="lintr_bottom" :introduceObj="introduceObj" :openStyle="true"></introduce>
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

export default {
  name: "aboutzh",
  data() {
    return {
      introduceObj: {
        title: '展会介绍',
      },
      aboutzhObj: {
        navList: ["主办机构", "组织机构", "展位分布"],
        textList: [
          {text: '111作为国际性钱币收藏交流、交易的平台，此次钱币展融合钱币交流会、精品展、现场收评、免费鉴定等诸多精彩环节，\n' +
          '          世界各国与地区的知名钱币机构、钱币经销商、收藏爱好者、社会各界及海内外人士前来参展、参观。\n' +
          '          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，\n' +
          '          以最大的诚意与付出，期望打造最有品质和影响力的中国。\n' +
          '          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，\n' +
          '          以最大的诚意与付出，期望打造最有品质和影响力的中国。'},
          {text: '22222作为国际性钱币收藏交流、交易的平台，此次钱币展融合钱币交流会、精品展、现场收评、免费鉴定等诸多精彩环节，\n' +
          '          世界各国与地区的知名钱币机构、钱币经销商、收藏爱好者、社会各界及海内外人士前来参展、参观。\n' +
          '          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，\n' +
          '          以最大的诚意与付出，期望打造最有品质和影响力的中国。\n' +
          '          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，\n' +
          '          以最大的诚意与付出，期望打造最有品质和影响力的中国。'},
          {text: '33333作为国际性钱币收藏交流、交易的平台，此次钱币展融合钱币交流会、精品展、现场收评、免费鉴定等诸多精彩环节，\n' +
          '          世界各国与地区的知名钱币机构、钱币经销商、收藏爱好者、社会各界及海内外人士前来参展、参观。\n' +
          '          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，\n' +
          '          以最大的诚意与付出，期望打造最有品质和影响力的中国。\n' +
          '          本次钱币展立足于华南地区，期望在此前钱币展的基础上，将中国南、北方收藏市场持续融合，并为所有参展商及收藏爱好者提供优质、贴心的平台服务，\n' +
          '          以最大的诚意与付出，期望打造最有品质和影响力的中国。'},
        ]
      },
    }
  },
  created() {
    document.title = '关于展会';
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
