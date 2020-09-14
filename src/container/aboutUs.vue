<template>
    <div class="us_wrap">
      <div class="us_content">
        <h2>关于我们</h2>
        <p>
          经中华人民共和国商务部、中国人民银行批准，由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合主办。博览会旨在围绕并服务于中央银行职能及国家货币发行政策，以普及人民币知识、弘扬金币文化为主旨，以培育全民爱护人民币、培育成熟的金银币收藏投资理念为己任，积极发展与促进中外钱币文化交流，为国际钱币企业的交流搭建平台，促进钱币产品的国际交融，展示和塑造中国钱币品牌的良好形象,成为广大集藏爱好者在一年一度金秋时节的收藏盛宴。
        </p>
      </div>
      <tempFooter class="us_temp_foot"></tempFooter>
      <div style="height: 0.98rem"></div>
      <tabBar class="menu-tab"></tabBar>
    </div>
</template>

<script type="text/ecmascript-6">
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import tabBar from '@/container/tabBar' // 底部tabBar
import * as types from '../store/mutation-types'

export default {
  name: "aboutUs",
  data() {
    return {
    }
  },
  activated() {
    this.$store.commit(types.ROUTER_PATH, this.$route.path)
  },
  methods: {
  },
  components: {
    tabBar,
    tempFooter
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .us_wrap
    .us_content
      width 6.9rem
      margin-left 0.3rem
      padding-top .3rem
      overflow hidden
      h2
        background-image: url("https://www.chbice.com/imgFile/icon/title_bg.png");
        background-repeat: no-repeat;
        background-size: 2.45rem 0.53rem;
        width: 2.45rem;
        height: 0.53rem;
        margin: 0 auto 0.2rem;
        font-size: 0.32rem;
        color: #fff;
        line-height: 0.53rem;
        text-align: center;
      p
        font-size: 0.28rem
        line-height: 0.6rem
        color: #333;
        width 6.9rem
        margin 0.1rem 0 0.12rem
    .us_temp_foot
      margin-top 0.9rem
</style>
