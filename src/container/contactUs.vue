<template>
    <div class="contact_wrap">
      <introduce :openStyle="true" :introduceObj="introduceObj"></introduce>
      <temp-footer class="temp_footer"></temp-footer>
      <tab-bar class="menu-tab"></tab-bar>
    </div>
</template>

<script>
import introduce from '@/components/introduce' // 展会介绍模板
import tempFooter from '@/components/tempFooter' // 关于我们 联系我们 模板
import tabBar from '@/container/tabBar' // 底部tabBar
export default {
  name: "contactUs",
  data() {
    return {
      introduceObj: {
        content: "2017北京国际钱币博览会经商务部和中国人民银行批准，由中国金币总公司、中国印钞造币总公司、中国钱币博物馆联合举办，旨在展示钱币精品、交流行业信息、传播钱币文化、推进产业发展。",
        title: '联系我们'
      }
    }
  },
  methods: {
  },
  components: {
    introduce,
    tempFooter,
    tabBar
  }
}
</script>

<style scoped lang="stylus">
.contact_wrap
  position fixed
  top: 0
  bottom 0
  width 100%
  background-color: #fff
.temp_footer
  position: absolute
  bottom: 0.98rem
</style>
