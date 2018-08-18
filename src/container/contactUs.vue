<template>
    <div class="contact_wrap">
      <scroll class="contact_content" :data="introduceObj">
        <div class="contact_footer_position">
          <div style="height: 0.01rem"></div>
          <introduce :openStyle="true" :showBtns="false" :introduceObj="introduceObj"></introduce>
          <temp-footer class="temp_footer"></temp-footer>
        </div>
      </scroll>
      <tab-bar class="menu-tab"></tab-bar>
    </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import scroll from '@/utils/scroll'
import tabBar from '@/container/tabBar' // 底部tabBar
export default {
  name: "contactUs",
  data() {
    return {
      introduceObj: {
        content: "中国金币网于2000年10月正式开通，以弘扬钱币文化，普及钱币知识，引导钱币市场的健康发展为宗旨，现拥有中英繁三个版本，设置视点、信息中心、政策法规、奥运会纪念币、国际金银币、电子商城等11个栏目，被誉为“永不落幕的钱币博览会”。中 国金币网依托中国人民银行、中国金币总公司等权威机构的信息优势，全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注国内外钱关注国内关钱关注国中国人民银行、中国金币总公司等权威机构的信息优势，全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。2017北京国际钱币博览会经商务部和中国人民银行批准，由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合举办，旨在展示钱币精品、交流行业信息、传播钱币文化、推进产业发展。中国金币网于2000年10月正式开通，以弘扬钱币文化，普及钱币知识，引导钱币市场的健康发展为宗旨，现拥有中英繁三个版本，设置视点、信息中心、政策法规、奥运会纪念币、国际金银币、电子商城等11个栏目，被誉为“永不落幕的钱币博览会”。中 国金币网依托中国人民银行、中国金币总公司等权威机构的信息优势，全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注国内外钱关注国内关钱关注国中国人民银行、中国金币总公司等权威机构的信息优势，全面关注国内外钱币信息，宣传我国货币金银政策币金银机构的信息关注中国人民银行、中国金币总公司等权威机构的信息关注。2017北京国际钱币博览会经商务部和中国人民银行批准，由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合举办，旨在展示钱币精品、交流行业信息、传播钱币文化、推进产业发展。",
        title: '联系我们'
      }
    }
  },
  methods: {
  },
  components: {
    introduce,
    tempFooter,
    tabBar,
    scroll
  }
}
</script>

<style scoped lang="stylus">
.contact_wrap
  position fixed
  top: 0
  bottom 0.98rem
  width 100%
  background-color: #fff
  .contact_content
    height 100%
    overflow hidden
    .contact_footer_position
      min-height 100%
      position relative
      padding-bottom 2.736rem
      box-sizing border-box
.temp_footer
  height 2.156rem
  position absolute
  bottom 0
</style>
